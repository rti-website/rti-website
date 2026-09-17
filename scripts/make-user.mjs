#!/usr/bin/env node
/**
 * Create or reset one admin account from the command line.
 *
 *   npm run user:add                                   -> admin / admin123, administrator
 *   npm run user:add -- --login rizwan@99tech.com --password ... --name "Rizwan Haider" --role editor
 *   npm run user:add -- --login admin --password something-better   (resets the password)
 *
 * WHY IT EXISTS: `db:setup` asks for the first administrator interactively and
 * then never again, so the only other way to add somebody was a psql prompt and
 * a hand-rolled scrypt hash. Now there are four roles and a team, this is the
 * front door for the first one; everybody after that gets added in the admin
 * under People & access.
 *
 * !! THE DEFAULT PASSWORD IS admin123 BECAUSE ASIM ASKED FOR IT, 17 Sep 2026.
 * It is six characters of dictionary word plus a counter and it must not be the
 * password on anything reachable from the internet. Staging is behind HTTP
 * basic auth (CLAUDE.md rule 9); before production, change it — this same
 * command with a real password does that.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs'
import { randomBytes, scryptSync } from 'node:crypto'
import os from 'node:os'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const argv = process.argv.slice(2)
const opt = (n, d) => { const i = argv.indexOf(`--${n}`); return i === -1 ? d : argv[i + 1] }

const c = {
  b: (s) => `\x1b[1m${s}\x1b[0m`, dim: (s) => `\x1b[2m${s}\x1b[0m`,
  ok: (s) => `\x1b[32m${s}\x1b[0m`, warn: (s) => `\x1b[33m${s}\x1b[0m`, bad: (s) => `\x1b[31m${s}\x1b[0m`,
}
const say = (...a) => console.log(...a)
const die = (m) => { console.error(`\n  ${c.bad(m)}\n`); process.exit(1) }

/* DATABASE_URL out of .env.local, so this behaves the same as every other
   script in here and does not need the variable exported in the shell. */
function databaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL
  const file = path.join(ROOT, '.env.local')
  if (!existsSync(file)) die('No .env.local. Run `npm run db:setup` first.')
  const m = /^DATABASE_URL\s*=\s*(.+)$/m.exec(readFileSync(file, 'utf8'))
  if (!m) die('DATABASE_URL is not in .env.local. Run `npm run db:setup` first.')
  return m[1].trim().replace(/^["']|["']$/g, '')
}

/* Windows hands argv to a child process in the console code page, so a name
   with an accent in it arrives mangled. Everything goes through a UTF-8 file
   for the same reason db-seed.mjs does. */
const PSQL = process.env.PSQL || (process.platform === 'win32'
  ? ['C:/Program Files/PostgreSQL/18/bin/psql.exe', 'C:/Program Files/PostgreSQL/17/bin/psql.exe',
     'C:/Program Files/PostgreSQL/16/bin/psql.exe'].find((p) => existsSync(p)) || 'psql'
  : 'psql')
const TMP = path.join(os.tmpdir(), `rti-user-${process.pid}.sql`)
const ENV = { ...process.env, PGCLIENTENCODING: 'UTF8' }

function sql(url, text) {
  try {
    writeFileSync(TMP, text, 'utf8')
    return execFileSync(PSQL, [url, '-v', 'ON_ERROR_STOP=1', '-q', '-t', '-A', '-f', TMP],
      { encoding: 'utf8', env: ENV }).trim()
  } catch (err) {
    die((err.stderr || err.message || '').toString().trim() || 'psql failed.')
  } finally {
    try { unlinkSync(TMP) } catch { /* already gone */ }
  }
}

const ROLES = ['administrator', 'editor', 'author', 'seo']

const login = String(opt('login', 'admin')).trim().toLowerCase()
const password = String(opt('password', 'admin123'))
const name = String(opt('name', login === 'admin' ? 'Administrator' : login))
const role = String(opt('role', 'administrator'))

if (!login) die('--login is required.')
if (password.length < 6) die('A password needs at least 6 characters.')
if (!ROLES.includes(role)) die(`--role must be one of ${ROLES.join(', ')}.`)

// Must match hashPassword() in src/lib/auth.ts exactly, parameters included.
const N = 16384, r = 8, p = 1, keylen = 64
const salt = randomBytes(16)
const hash = scryptSync(password, salt, keylen, { N, r, p, maxmem: 64 * 1024 * 1024 })
const stored = `scrypt$${N}$${r}$${p}$${salt.toString('hex')}$${hash.toString('hex')}`

const url = databaseUrl()

/* An existing login is UPDATED rather than refused: "reset the password" and
   "create the account" are the same command, which is what you want at 2am. */
const existing = sql(url, `SELECT id FROM users WHERE lower(email) = $$${login}$$`)

if (existing) {
  sql(url, `UPDATE users SET password_hash = $$${stored}$$, name = $$${name}$$,
                             role = $$${role}$$, active = true
              WHERE lower(email) = $$${login}$$`)
  say(`\n  ${c.ok('✓')} Updated ${c.b(login)} — password reset, role ${c.b(role)}`)
} else {
  sql(url, `INSERT INTO users (email, name, password_hash, role, active)
            VALUES ($$${login}$$, $$${name}$$, $$${stored}$$, $$${role}$$, true)`)
  say(`\n  ${c.ok('✓')} Created ${c.b(login)} as ${c.b(role)}`)
}

say(`
  Sign in at ${c.ok('http://localhost:3000/admin')}
    ${c.dim('Email or username')}  ${c.b(login)}
    ${c.dim('Password         ')}  ${c.b(password)}
`)

if (password === 'admin123') {
  say(`  ${c.warn(c.b('This password is fine for a laptop and not for anything else.'))}
  ${c.dim('Before this site is reachable from the internet, run the same command')}
  ${c.dim('with --password and something real. Staging is behind basic auth too.')}
`)
}
