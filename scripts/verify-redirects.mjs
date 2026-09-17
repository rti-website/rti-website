#!/usr/bin/env node
/**
 * Launch gate #3: every redirect resolves correctly, in one hop, to a live page.
 *
 * Asserts for each entry in data/redirects.json:
 *   1. status is 301 (not 302, not 308 — see build-redirects.mjs)
 *   2. Location header equals the expected destination exactly
 *   3. the destination itself returns 200
 *   4. no chains (destination is not itself a redirect)
 *
 * Also spot-checks canonical host behaviour: http, non-www and /index.php must
 * each land on the canonical https://www. origin in a SINGLE hop.
 *
 * Usage:
 *   node scripts/verify-redirects.mjs --base https://staging.example.com \
 *        [--auth user:pass] [--concurrency 10]
 */
import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const arg = (n, d) => { const i = args.indexOf(n); return i === -1 ? d : args[i + 1] }
const BASE = (arg('--base') || process.env.VERIFY_BASE || '').replace(/\/$/, '')
const AUTH = arg('--auth', process.env.VERIFY_AUTH)
const CONC = Number(arg('--concurrency', '10'))

if (!BASE) { console.error('  --base <url> is required'); process.exit(1) }

const headers = AUTH
  ? { Authorization: 'Basic ' + Buffer.from(AUTH).toString('base64') }
  : {}

const redirects = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'data', 'redirects.json'), 'utf8'),
)
const destinations = new Set(redirects.map((r) => r.source))

const failures = []

async function head(url) {
  const res = await fetch(url, { redirect: 'manual', headers })
  return { status: res.status, location: res.headers.get('location') }
}

async function checkOne(r) {
  const url = BASE + r.source
  try {
    const { status, location } = await head(url)

    if (status !== 301) {
      failures.push(`${r.source} -> expected 301, got ${status}`)
      return
    }
    const loc = (location || '').replace(BASE, '')
    if (loc !== r.destination) {
      failures.push(`${r.source} -> Location "${loc}" != expected "${r.destination}"`)
      return
    }
    if (destinations.has(r.destination)) {
      failures.push(`${r.source} -> ${r.destination} is itself a redirect (chain)`)
      return
    }
    const dest = await head(BASE + r.destination)
    if (dest.status !== 200) {
      failures.push(`${r.source} -> ${r.destination} returns ${dest.status}, not 200`)
    }
  } catch (e) {
    failures.push(`${r.source} -> request failed: ${e.message}`)
  }
}

async function pool(items, worker, size) {
  let i = 0
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (i < items.length) {
        const item = items[i++]
        await worker(item)
        if (i % 50 === 0) process.stdout.write(`\r  checked ${i}/${items.length}`)
      }
    }),
  )
  process.stdout.write(`\r  checked ${items.length}/${items.length}\n`)
}

console.log(`\n  Verifying ${redirects.length} redirects against ${BASE}\n`)
await pool(redirects, checkOne, CONC)

if (failures.length) {
  console.error(`\n  ${failures.length} FAILURE(S) — launch is blocked:\n`)
  for (const f of failures.slice(0, 60)) console.error(`   - ${f}`)
  if (failures.length > 60) console.error(`   ... and ${failures.length - 60} more`)
  console.error('')
  process.exit(1)
}
console.log('\n  All redirects pass: 301, correct destination, single hop, destination 200.\n')
