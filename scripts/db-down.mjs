#!/usr/bin/env node
/**
 * Runs one down migration from db/down/ (docs/visitor-identification/BRIEF.md:
 * "every migration is reversible").
 *
 *   npm run db:down -- 018_visitor_identification
 *
 * Reads DATABASE_URL from the environment, or from .env.local the way the
 * other scripts do (never printed). Asks before running unless --yes is given.
 * Down files live in db/down/, a folder the forward runner (db-setup.mjs) does
 * not read, so they can never run by accident.
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import readline from 'node:readline/promises'

const ROOT = path.resolve(import.meta.dirname, '..')
const name = process.argv.slice(2).find((a) => !a.startsWith('--'))
const yes = process.argv.includes('--yes')
if (!name) { console.error('Which one? e.g.  npm run db:down -- 018_visitor_identification'); process.exit(1) }
const file = path.join(ROOT, 'db', 'down', `${name.replace(/\.down\.sql$|\.sql$/, '')}.down.sql`)
if (!fs.existsSync(file)) { console.error(`No such down file: ${path.relative(ROOT, file)}`); process.exit(1) }

let url = process.env.DATABASE_URL
if (!url) {
  for (const f of ['.env.local', '.env']) {
    const p = path.join(ROOT, f)
    if (!fs.existsSync(p)) continue
    const m = fs.readFileSync(p, 'utf8').match(/^DATABASE_URL\s*=\s*(.+)$/m)
    if (m) { url = m[1].trim().replace(/^["']|["']$/g, ''); break }
  }
}
if (!url) { console.error('DATABASE_URL is not set (environment or .env.local).'); process.exit(1) }

if (!yes) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const host = (() => { try { return new URL(url).host } catch { return 'the database' } })()
  const a = await rl.question(`Run ${path.relative(ROOT, file)} against ${host}? This deletes data. Type yes: `)
  rl.close()
  if (a.trim().toLowerCase() !== 'yes') { console.log('Nothing done.'); process.exit(0) }
}
execFileSync(process.platform === 'win32' ? 'psql.exe' : 'psql', [url, '-v', 'ON_ERROR_STOP=1', '-q', '-f', file], { stdio: 'inherit' })
console.log(`Done: ${path.relative(ROOT, file)}`)
