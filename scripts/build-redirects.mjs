#!/usr/bin/env node
/**
 * url-map.csv  ->  data/redirects.json  (+ host-level equivalents)
 *
 * data/url-map.csv is the single source of truth, produced in Phase 1 of the
 * migration plan. Never hand-edit data/redirects.json — regenerate it.
 *
 * IMPORTANT — 301 vs 308
 * Next.js `permanent: true` emits **308**, not 301. The migration plan and its
 * QA script both specify 301, so this generator writes an explicit
 * `statusCode: 301`. You may use one or the other, never both.
 * (Google treats 301 and 308 equivalently, but the assertion has to match what
 * the server actually sends or every redirect test fails.)
 *
 * Usage:  node scripts/build-redirects.mjs [--nginx] [--cloudflare]
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const SRC = path.join(ROOT, 'data', 'url-map.csv')
const OUT = path.join(ROOT, 'data', 'redirects.json')

/** Minimal RFC4180 CSV parser — handles quoted fields containing commas. */
function parseCsv(text) {
  const rows = []
  let row = [], field = '', quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ } else quoted = false
      } else field += c
    } else if (c === '"') quoted = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = '' }
    else if (c !== '\r') field += c
  }
  if (field.length || row.length) { row.push(field); rows.push(row) }
  const [head, ...body] = rows.filter((r) => r.some((c) => c.trim() !== ''))
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] ?? '').trim()])))
}

function normalise(u) {
  if (!u) return u
  const p = u.replace(/^https?:\/\/[^/]+/i, '')
  const withLeading = p.startsWith('/') ? p : `/${p}`
  if (/\.[a-z0-9]{2,5}$/i.test(withLeading)) return withLeading
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}

const SAMPLE = path.join(ROOT, 'data', 'url-map.sample.csv')
if (!fs.existsSync(SRC)) {
  if (fs.existsSync(SAMPLE)) {
    fs.copyFileSync(SAMPLE, SRC)
    console.log('  data/url-map.csv not found — seeded it from url-map.sample.csv.')
    console.log('  Replace it with the real Phase 1 map when Rizwan has the crawl.\n')
  } else {
    console.error(`\n  Missing ${path.relative(ROOT, SRC)} and no sample to seed from.\n`)
    process.exit(1)
  }
}

const rows = parseCsv(fs.readFileSync(SRC, 'utf8'))
const keep = new Set()
const redirects = []
const errors = []

for (const r of rows) {
  const action = (r.action || '').toUpperCase()
  const from = normalise(r.old_url)
  if (action === 'KEEP') { keep.add(from); continue }
  if (action === 'DROP') continue          // served as 410 by the host config
  if (action !== '301') { errors.push(`Unknown action "${r.action}" for ${from}`); continue }
  const to = normalise(r.new_url)
  if (!to) { errors.push(`301 row with no new_url: ${from}`); continue }
  if (to === from) { errors.push(`Redirect to itself: ${from}`); continue }
  redirects.push({ source: from, destination: to, statusCode: 301 })
}

// --- integrity checks that must pass before the file is written -------------

// 1. No chains: a destination may not itself be a redirect source.
const sources = new Map(redirects.map((r) => [r.source, r.destination]))
for (const r of redirects) {
  if (sources.has(r.destination)) {
    errors.push(`Chain: ${r.source} -> ${r.destination} -> ${sources.get(r.destination)}`)
  }
}
// 2. Destinations that are not KEEP rows. These are legitimate when the target
//    is a NEW url (e.g. /page/2/ -> /blog/page/2/), so this is a warning, not a
//    hard error. verify-redirects.mjs is the authoritative check: it requests
//    every destination against a running server and asserts 200.
const newDestinations = []
for (const r of redirects) {
  if (!keep.has(r.destination) && !sources.has(r.destination)) {
    newDestinations.push(`${r.source} -> ${r.destination}`)
  }
}
// 3. No duplicate sources.
const seen = new Set()
for (const r of redirects) {
  if (seen.has(r.source)) errors.push(`Duplicate source: ${r.source}`)
  seen.add(r.source)
}

if (errors.length) {
  console.error(`\n  ${errors.length} problem(s) in url-map.csv:\n`)
  for (const e of errors.slice(0, 40)) console.error(`   - ${e}`)
  if (errors.length > 40) console.error(`   ... and ${errors.length - 40} more`)
  console.error('')
  process.exit(1)
}

fs.writeFileSync(OUT, JSON.stringify(redirects, null, 2) + '\n')
console.log(`  ${redirects.length} redirects -> ${path.relative(ROOT, OUT)}`)
console.log(`  ${keep.size} KEEP URLs`)

if (newDestinations.length) {
  console.warn(`\n  ${newDestinations.length} redirect(s) point at URLs that are not KEEP rows.`)
  console.warn('  Legitimate if the destination is a new page. Confirm each one:')
  for (const d of newDestinations.slice(0, 20)) console.warn(`   - ${d}`)
  if (newDestinations.length > 20) console.warn(`   ... and ${newDestinations.length - 20} more`)
  console.warn('  verify-redirects.mjs will fail if any of them does not return 200.\n')
}

// Vercel caps next.config redirects at 1,024. Warn well before that.
if (redirects.length > 900) {
  console.warn(`\n  WARNING: ${redirects.length} redirects. Vercel's limit is 1,024.`)
  console.warn('  Above ~1000 the Next docs recommend a lookup map in proxy.ts instead.\n')
}

// --- optional host-level output --------------------------------------------
// Needed if the site is served by nginx or Cloudflare in front of the app, or
// if anyone ever switches on `output: export` (where redirects() stops working).
if (process.argv.includes('--nginx')) {
  const map = redirects.map((r) => `  "${r.source}" "${r.destination}";`).join('\n')
  fs.writeFileSync(
    path.join(ROOT, 'data', 'redirects.nginx.conf'),
    `map $request_uri $rti_redirect {\n  default "";\n${map}\n}\n\n` +
      `# in server block:\n# if ($rti_redirect != "") { return 301 $rti_redirect; }\n`,
  )
  console.log('  wrote data/redirects.nginx.conf')
}
if (process.argv.includes('--cloudflare')) {
  fs.writeFileSync(
    path.join(ROOT, 'data', '_redirects'),
    redirects.map((r) => `${r.source} ${r.destination} 301`).join('\n') + '\n',
  )
  console.log('  wrote data/_redirects')
}
