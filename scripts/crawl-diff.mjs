#!/usr/bin/env node
/**
 * Launch gate #1 and #2: staging is at parity with the live site.
 *
 * Compares a Screaming Frog baseline export against a staging export and
 * reports, per URL:
 *   - KEEP URLs missing from staging or not returning 200
 *   - title / meta description / H1 / canonical mismatches
 *   - inlink counts more than 20% below baseline (internal link structure loss)
 *   - orphan pages on staging (zero inlinks)
 *
 * Export both crawls from Screaming Frog as CSV with these columns:
 *   Address, Status Code, Title 1, Meta Description 1, H1-1,
 *   Canonical Link Element 1, Inlinks
 *
 * Usage:
 *   node scripts/crawl-diff.mjs baseline-crawl.csv staging-crawl.csv \
 *        --staging-origin https://staging.example.com
 */
import fs from 'node:fs'

const [baseFile, stageFile] = process.argv.slice(2).filter((a) => !a.startsWith('--'))
const args = process.argv.slice(2)
const arg = (n, d) => { const i = args.indexOf(n); return i === -1 ? d : args[i + 1] }
const STAGING_ORIGIN = arg('--staging-origin', '')
const LIVE_ORIGIN = arg('--live-origin', 'https://www.recycletechnologies.com')
const INLINK_TOLERANCE = Number(arg('--inlink-tolerance', '0.2'))

if (!baseFile || !stageFile) {
  console.error('  usage: crawl-diff.mjs <baseline.csv> <staging.csv> --staging-origin <url>')
  process.exit(1)
}

function parseCsv(text) {
  const rows = []
  let row = [], field = '', quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quoted) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++ } else quoted = false }
      else field += c
    } else if (c === '"') quoted = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = '' }
    else if (c !== '\r') field += c
  }
  if (field.length || row.length) { row.push(field); rows.push(row) }
  const [head, ...body] = rows.filter((r) => r.some((c) => c.trim() !== ''))
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] ?? '').trim()])))
}

const norm = (u, origin) => (u || '').replace(origin, '').replace(/^https?:\/\/[^/]+/, '') || '/'
const pick = (row, ...names) => names.map((n) => row[n]).find((v) => v !== undefined) ?? ''

function index(rows, origin) {
  const map = new Map()
  for (const r of rows) {
    const url = norm(pick(r, 'Address', 'URL'), origin)
    map.set(url, {
      url,
      status: Number(pick(r, 'Status Code', 'Status')) || 0,
      title: pick(r, 'Title 1', 'Title'),
      description: pick(r, 'Meta Description 1', 'Meta Description'),
      h1: pick(r, 'H1-1', 'H1'),
      canonical: norm(pick(r, 'Canonical Link Element 1', 'Canonical'), origin),
      inlinks: Number(pick(r, 'Inlinks', 'Unique Inlinks')) || 0,
    })
  }
  return map
}

const base = index(parseCsv(fs.readFileSync(baseFile, 'utf8')), LIVE_ORIGIN)
const stage = index(parseCsv(fs.readFileSync(stageFile, 'utf8')), STAGING_ORIGIN)

const problems = { missing: [], status: [], title: [], description: [], h1: [], canonical: [], inlinks: [], orphans: [] }

for (const [url, b] of base) {
  if (b.status !== 200) continue            // only KEEP URLs that were live and indexable
  const s = stage.get(url)
  if (!s) { problems.missing.push(url); continue }
  if (s.status !== 200) { problems.status.push(`${url}  ${s.status}`); continue }
  if (s.title !== b.title) problems.title.push(`${url}\n      was: ${b.title}\n      now: ${s.title}`)
  if (s.description !== b.description) problems.description.push(`${url}`)
  if (s.h1 !== b.h1) problems.h1.push(`${url}\n      was: ${b.h1}\n      now: ${s.h1}`)
  if (s.canonical !== url) problems.canonical.push(`${url}  canonical -> ${s.canonical}`)
  if (b.inlinks > 0 && s.inlinks < b.inlinks * (1 - INLINK_TOLERANCE)) {
    problems.inlinks.push(`${url}  ${b.inlinks} -> ${s.inlinks}`)
  }
}
for (const [url, s] of stage) {
  if (s.status === 200 && s.inlinks === 0 && url !== '/') problems.orphans.push(url)
}

const labels = {
  missing: 'KEEP URLs missing from staging',
  status: 'URLs not returning 200 on staging',
  title: 'Title mismatches',
  description: 'Meta description mismatches',
  h1: 'H1 mismatches',
  canonical: 'Canonical not self-referencing',
  inlinks: `Inlinks dropped more than ${INLINK_TOLERANCE * 100}%`,
  orphans: 'Orphan pages on staging (zero inlinks)',
}
const BLOCKING = ['missing', 'status', 'title', 'description', 'h1', 'canonical']

console.log(`\n  Baseline: ${base.size} URLs   Staging: ${stage.size} URLs\n`)
let blocked = 0
for (const [key, list] of Object.entries(problems)) {
  const mark = list.length === 0 ? 'ok  ' : BLOCKING.includes(key) ? 'FAIL' : 'warn'
  if (list.length && BLOCKING.includes(key)) blocked += list.length
  console.log(`  [${mark}] ${labels[key]}: ${list.length}`)
  for (const item of list.slice(0, 15)) console.log(`      - ${item}`)
  if (list.length > 15) console.log(`      ... and ${list.length - 15} more`)
}

if (blocked) {
  console.error(`\n  ${blocked} blocking difference(s). Launch gate 1 and 2 not met.\n`)
  process.exit(1)
}
console.log('\n  Parity checks passed.\n')
