#!/usr/bin/env node
/**
 * One command to get the admin's database ready:
 *
 *   npm run db:setup
 *
 * It finds PostgreSQL (even when the installer did not put it on PATH, which on
 * Windows it often does not), creates the database if it is missing, applies any
 * migration in db/ that has not run yet, and seeds the first administrator.
 *
 * Plain node, no build step — same as every other script in this folder.
 * Safe to run as many times as you like: migrations are recorded in
 * schema_migrations and the seed only fills gaps.
 */
import { readFileSync, writeFileSync, unlinkSync, readdirSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import os from 'node:os'
import path from 'node:path'
import { randomBytes, scryptSync } from 'node:crypto'
import readline from 'node:readline/promises'

const ROOT = path.resolve(import.meta.dirname, '..')
const DB_DIR = path.join(ROOT, 'db')

const c = {
  b: (s) => `\x1b[1m${s}\x1b[0m`, dim: (s) => `\x1b[2m${s}\x1b[0m`,
  ok: (s) => `\x1b[32m${s}\x1b[0m`, warn: (s) => `\x1b[33m${s}\x1b[0m`, bad: (s) => `\x1b[31m${s}\x1b[0m`,
}
const say = (...a) => console.log(...a)
const die = (msg, extra) => { say(`\n  ${c.bad('✗')} ${msg}`); if (extra) say(extra); process.exit(1) }

/* ------------------------------------------------------------ find psql --
 * The Windows installer does not add bin/ to PATH by default, so a plain
 * `psql` almost always fails on a fresh machine. Look where it actually is
 * before telling anyone to install something they already have.
 */
function findPsql() {
  const win = process.platform === 'win32'
  const exe = win ? 'psql.exe' : 'psql'
  try {
    execFileSync(exe, ['--version'], { stdio: 'ignore' })
    return exe
  } catch { /* not on PATH — keep looking */ }

  const roots = win
    ? ['C:\\Program Files\\PostgreSQL', 'C:\\Program Files (x86)\\PostgreSQL']
    : ['/usr/lib/postgresql', '/opt/homebrew/opt', '/usr/local/opt']
  for (const root of roots) {
    if (!existsSync(root)) continue
    const versions = readdirSync(root).sort().reverse()
    for (const v of versions) {
      for (const candidate of [path.join(root, v, 'bin', exe), path.join(root, v, exe)]) {
        if (existsSync(candidate)) return candidate
      }
    }
  }
  return null
}

const PSQL = findPsql()
if (!PSQL) {
  die('PostgreSQL is not installed on this machine.', `
  ${c.b('Install it, then run this again.')}

  ${c.b('Windows')} — one command in PowerShell:
    ${c.ok('winget install -e --id PostgreSQL.PostgreSQL.18')}

    The installer asks for a password for the ${c.b('postgres')} user.
    Write it down — you need it in the next step.
    Installer instead: https://www.postgresql.org/download/windows/

  ${c.b('macOS')}:   ${c.ok('brew install postgresql@18 && brew services start postgresql@18')}
  ${c.b('Linux')}:   ${c.ok('sudo apt install postgresql')}
`)
}
say(`  ${c.ok('✓')} Found PostgreSQL  ${c.dim(PSQL)}`)

/* ------------------------------------------------------- connection URL -- */
function readEnvFile() {
  const out = {}
  for (const f of ['.env.local', '.env']) {
    const p = path.join(ROOT, f)
    if (!existsSync(p)) continue
    for (const line of readFileSync(p, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m) out[m[1]] ??= m[2].replace(/^["']|["']$/g, '')
    }
  }
  return out
}
const env = { ...readEnvFile(), ...process.env }
const URL_KEY = 'DATABASE_URL'

if (!env[URL_KEY]) {
  die('No DATABASE_URL yet.', `
  Create ${c.b('.env.local')} in the project root with the password you set
  when you installed PostgreSQL:

    ${c.ok('DATABASE_URL=postgres://postgres:YOUR_PASSWORD@localhost:5432/rti_admin')}
    ${c.ok(`ADMIN_SESSION_SECRET=${randomBytes(32).toString('hex')}`)}

  ${c.dim('(that second line is a fresh random secret — you can use it as is)')}

  Then run ${c.b('npm run db:setup')} again.
`)
}

const url = new URL(env[URL_KEY])
const dbName = url.pathname.replace(/^\//, '') || 'rti_admin'
const adminUrl = new URL(url); adminUrl.pathname = '/postgres'

/* Statements reach psql through a UTF-8 file, never as a command line
 * argument: Windows converts argv to the console code page on the way into a
 * child process, which mangles any character outside ASCII (an accented name,
 * an em dash) into a byte PostgreSQL refuses. */
const SQL_TMP = path.join(os.tmpdir(), `rti-setup-${process.pid}.sql`)
const PSQL_ENV = { ...process.env, PGCLIENTENCODING: 'UTF8' }
process.on('exit', () => { try { unlinkSync(SQL_TMP) } catch { /* already gone */ } })

function psql(connection, sql, { quiet = false } = {}) {
  try {
    writeFileSync(SQL_TMP, sql, 'utf8')
    return execFileSync(PSQL, [connection.toString(), '-v', 'ON_ERROR_STOP=1', '-t', '-A', '-f', SQL_TMP],
      { encoding: 'utf8', env: PSQL_ENV, stdio: quiet ? ['ignore', 'pipe', 'pipe'] : ['ignore', 'pipe', 'inherit'] }).trim()
  } catch (err) {
    const detail = (err.stderr || err.stdout || err.message || '').toString().trim()
    if (/password authentication failed/i.test(detail)) {
      die('PostgreSQL refused that password.', `
  The password in ${c.b('.env.local')} is not the one you set when you installed
  PostgreSQL. Fix DATABASE_URL and run this again.
`)
    }
    if (/could not connect|Connection refused/i.test(detail)) {
      die('PostgreSQL is installed but not running.', `
  ${c.b('Windows')}: open Services, find ${c.b('postgresql-x64-18')}, press Start.
  ${c.b('macOS')}:   ${c.ok('brew services start postgresql@18')}
`)
    }
    die('The database rejected a statement.', '\n' + detail + '\n')
  }
}
function psqlFile(connection, file) {
  try {
    execFileSync(PSQL, [connection.toString(), '-v', 'ON_ERROR_STOP=1', '-q', '-f', file], { env: PSQL_ENV, stdio: ['ignore', 'pipe', 'inherit'] })
  } catch {
    die(`Migration failed: ${path.basename(file)}`, '  Nothing was half-applied — each migration runs in one transaction.')
  }
}

/* ---------------------------------------------------------- the database -- */
const exists = psql(adminUrl, `SELECT 1 FROM pg_database WHERE datname = '${dbName}'`, { quiet: true })
if (exists === '1') {
  say(`  ${c.ok('✓')} Database ${c.b(dbName)} already exists`)
} else {
  psql(adminUrl, `CREATE DATABASE ${JSON.stringify(dbName).replace(/"/g, '"')}`, { quiet: true })
  say(`  ${c.ok('✓')} Created database ${c.b(dbName)}`)
}

/* gen_random_uuid() lives in pgcrypto before PG 13 and in core after it.
   Creating the extension is harmless either way. */
psql(url, 'CREATE EXTENSION IF NOT EXISTS pgcrypto', { quiet: true })

/* ------------------------------------------------------------ migrations -- */
psql(url, `CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())`, { quiet: true })
const applied = new Set(psql(url, 'SELECT name FROM schema_migrations', { quiet: true }).split('\n').filter(Boolean))
const files = readdirSync(DB_DIR).filter((f) => /^\d+.*\.sql$/.test(f)).sort()

let ran = 0
for (const f of files) {
  if (applied.has(f)) continue
  psqlFile(url, path.join(DB_DIR, f))
  psql(url, `INSERT INTO schema_migrations (name) VALUES ('${f}') ON CONFLICT DO NOTHING`, { quiet: true })
  say(`  ${c.ok('✓')} Applied ${c.b(f)}`)
  ran++
}
if (!ran) say(`  ${c.ok('✓')} Schema already up to date (${files.length} migration${files.length === 1 ? '' : 's'})`)

/* ------------------------------------------------------------- reference -- */
const CATEGORIES = [
  ['Universal Waste & Lighting Recycling', 'universal-waste'],
  ['E-Waste & Electronics Disposal', 'e-waste'],
  ['Battery & Hazardous Disposal', 'battery-hazardous'],
  ['Data Security & Shredding Services', 'data-security'],
  ['Newsroom & Industry Trends', 'newsroom'],
  ['Certifications & Brand Trust', 'certifications'],
  ['Sustainability & Circular Economy', 'sustainability'],
  ['Industry-Specific Solutions', 'industry-solutions'],
  ['Guides, How-Tos & Checklists', 'guides'],
  ['ITAD Recycling Guide', 'itad-guide'],
]
CATEGORIES.forEach(([name, slug], i) => {
  psql(url, `INSERT INTO categories (name, slug, sort_order) VALUES ($$${name}$$, '${slug}', ${i})
             ON CONFLICT (slug) DO NOTHING`, { quiet: true })
})

const SOCIAL = ['TikTok', 'Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'X']
SOCIAL.forEach((p, i) => {
  psql(url, `INSERT INTO social_links (platform, sort_order) VALUES ('${p}', ${i}) ON CONFLICT (platform) DO NOTHING`, { quiet: true })
})

const SETTINGS = {
  site_name: 'Recycle Technologies',
  title_template: '%s | Recycle Technologies',
  // Training crawlers take content and send almost no traffic back; answering
  // crawlers send referrals. Editable in Settings so this never needs a deploy.
  ai_training_crawlers: 'block',
  ai_answer_crawlers: 'allow',
}
for (const [k, v] of Object.entries(SETTINGS)) {
  psql(url, `INSERT INTO settings (key, value) VALUES ('${k}', $$${JSON.stringify(v)}$$::jsonb) ON CONFLICT (key) DO NOTHING`, { quiet: true })
}
say(`  ${c.ok('✓')} Reference data in place  ${c.dim(`${CATEGORIES.length} categories, ${SOCIAL.length} social slots`)}`)

/* Redirects, straight out of the migration map that already exists. */
const mapPath = path.join(ROOT, 'data', 'url-map.csv')
if (existsSync(mapPath)) {
  const lines = readFileSync(mapPath, 'utf8').split('\n').slice(1)
  let added = 0
  for (const line of lines) {
    // action is column 5, new_url column 6 — see the header row.
    const cols = line.split(',')
    if (cols.length < 6) continue
    const [from, , , , action, to] = cols
    if (action !== '301' || !from || !to || from === to) continue
    const before = psql(url, `SELECT count(*) FROM redirects WHERE from_path = $$${from}$$`, { quiet: true })
    if (before !== '0') continue
    psql(url, `INSERT INTO redirects (from_path, to_path, source) VALUES ($$${from}$$, $$${to}$$, 'url-map')
               ON CONFLICT (from_path) DO NOTHING`, { quiet: true })
    added++
  }
  if (added) say(`  ${c.ok('✓')} Imported ${c.b(added)} redirects from data/url-map.csv`)
}

/* ------------------------------------------------- the first administrator -- */
const anyUser = psql(url, 'SELECT count(*) FROM users', { quiet: true })
if (anyUser !== '0') {
  say(`  ${c.ok('✓')} ${anyUser} user account${anyUser === '1' ? '' : 's'} already set up`)
} else {
  // Flags win over prompts, so this can run unattended in a setup script or CI.
  const flag = (name) => {
    const i = process.argv.indexOf(`--${name}`)
    return i > -1 ? process.argv[i + 1] : undefined
  }
  let email = flag('email'), name = flag('name'), pass = flag('password')

  if (!email || !pass) {
    if (!process.stdin.isTTY) {
      die('No administrator account yet, and nothing to read from.', `
  Run this again in a terminal, or pass the details:

    ${c.ok('npm run db:setup -- --email you@example.com --name "Your Name" --password "a good password"')}
`)
    }
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    say(`\n  ${c.b('Create the first administrator')}`)
    email = (await rl.question('  Email: ')).trim()
    name = (await rl.question('  Name:  ')).trim()
    pass = (await rl.question('  Password (8+ characters): ')).trim()
    rl.close()
  }
  name = (name || '').trim() || (email ?? '').split('@')[0]
  if (!email || !pass || pass.length < 8) die('Need an email and a password of at least 8 characters.')

  // Must match verify() in src/lib/auth.ts exactly.
  const N = 16384, r = 8, p = 1, keylen = 64
  const salt = randomBytes(16)
  const hash = scryptSync(pass, salt, keylen, { N, r, p, maxmem: 64 * 1024 * 1024 })
  const stored = `scrypt$${N}$${r}$${p}$${salt.toString('hex')}$${hash.toString('hex')}`
  psql(url, `INSERT INTO users (email, name, password_hash, role)
             VALUES ($$${email}$$, $$${name}$$, $$${stored}$$, 'administrator')`, { quiet: true })
  say(`  ${c.ok('✓')} Administrator created`)
}

say(`
  ${c.ok(c.b('Database ready.'))}

  ${c.b('npm run dev')}   then open  ${c.ok('http://localhost:3000/admin')}
`)
