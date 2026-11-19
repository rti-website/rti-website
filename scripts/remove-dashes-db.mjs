/**
 * Removes the em dash (—) and en dash (–) from the copy that lives in the
 * database (management, 19 Nov 2026; the code pages were changed in the same
 * commit). Same rules as the code: scripts/lib/no-dashes.mjs. Hyphens are
 * not touched.
 *
 *   posts         title, meta_title, meta_description, excerpt, og_title,
 *                 og_description, featured_alt, content_html (text and alt /
 *                 title only, never links), content_json (the editor's copy,
 *                 so the next save keeps the change), toc
 *   categories    name, description
 *   media         alt
 *   page_content  published and draft (Admin -> Pages edits)
 *   service_sites / site_services   data (Admin -> Locations)
 *
 * Revisions (post_revisions, page_content_revisions) are left as they were.
 *
 * DRY RUN BY DEFAULT: prints how many rows would change and a few examples.
 * With --apply it first copies every row it changes into a backup table
 * (backup_dashes_<table>), then updates, all in one transaction.
 *
 *   DATABASE_URL=… node scripts/remove-dashes-db.mjs            # look
 *   DATABASE_URL=… node scripts/remove-dashes-db.mjs --apply    # change
 *
 * Undo (per table):  UPDATE posts p SET … FROM backup_dashes_posts b WHERE p.id = b.id
 * Pages built from posts are prerendered: rebuild (or republish) after.
 *
 * --redo (19 Nov 2026, after the first run): the rules were improved (an en
 * dash joining two names, "Dallas–Fort Worth", had become "Dallas: Fort
 * Worth"). --redo works the rules out again from the ORIGINAL text in the
 * backup tables and fixes the rows that come out differently, every change
 * printed. Only rows nobody has edited since the first run (same updated_at /
 * published_at) are touched. Dry run unless --apply.
 *
 * --report: every piece of text that had a dash, before and after, from the
 * backup tables, for a read through. Changes nothing.
 */
import pg from 'pg'
import { hasDash, undash, undashHtml, undashJson } from './lib/no-dashes.mjs'

const APPLY = process.argv.includes('--apply')
const REDO = process.argv.includes('--redo')
const REPORT = process.argv.includes('--report')
const url = process.env.DATABASE_URL
if (!url) { console.error('DATABASE_URL is not set.'); process.exit(1) }

/** table, primary key columns, and how each column is rewritten. */
const PLAN = [
  { table: 'posts', key: ['id'], cols: {
    title: 'text', meta_title: 'text', meta_description: 'text', excerpt: 'text', og_title: 'text',
    og_description: 'text', featured_alt: 'text', content_html: 'html', content_json: 'json', toc: 'json',
  } },
  { table: 'categories', key: ['id'], cols: { name: 'text', description: 'text' } },
  { table: 'media', key: ['id'], cols: { alt: 'text' } },
  { table: 'page_content', key: ['key'], cols: { published: 'json', draft: 'json' } },
  { table: 'service_sites', key: ['slug'], cols: { data: 'json' } },
  { table: 'site_services', key: ['site_slug', 'service'], cols: { data: 'json' } },
]

const fix = (kind, v) => {
  if (v === null || v === undefined) return v
  if (kind === 'text') return undash(v)
  if (kind === 'html') return undashHtml(v)
  return undashJson(v)
}
const differs = (kind, a, b) => (kind === 'json' ? JSON.stringify(a) !== JSON.stringify(b) : a !== b)

/** Columns that change when someone edits the row, to leave edited rows alone. */
const STAMPS = { posts: ['updated_at'], page_content: ['published_at', 'draft_updated_at'], service_sites: ['updated_at'], site_services: ['updated_at'] }

/** The pieces of one value that held a dash: [before, after] each. */
function pieces(kind, v) {
  const out = []
  if (v === null || v === undefined) return out
  if (kind === 'text') { if (hasDash(v)) out.push([v, undash(v)]); return out }
  if (kind === 'html') {
    for (const m of String(v).matchAll(/>([^<]*)</g)) if (hasDash(m[1])) out.push([m[1], undash(m[1])])
    for (const m of String(v).matchAll(/\b(?:alt|title)="([^"]*)"/g)) if (hasDash(m[1])) out.push([m[1], undash(m[1])])
    return out
  }
  const walk = (x) => {
    if (typeof x === 'string') { if (hasDash(x)) out.push([x, undash(x)]) }
    else if (Array.isArray(x)) x.forEach(walk)
    else if (x && typeof x === 'object') Object.values(x).forEach(walk)
  }
  walk(v)
  return out
}

/** Where two strings first differ, with some text either side. */
function where(a, b) {
  let i = 0
  while (i < a.length && a[i] === b[i]) i++
  let ea = a.length, eb = b.length
  while (ea > i && eb > i && a[ea - 1] === b[eb - 1]) { ea--; eb-- }
  return [a.slice(Math.max(0, i - 60), ea + 60), b.slice(Math.max(0, i - 60), eb + 60)]
}

async function fromBackups(client) {
  let total = 0
  for (const { table, key, cols } of PLAN) {
    const backup = `backup_dashes_${table}`
    const exists = (await client.query('SELECT to_regclass($1) AS t', [backup])).rows[0].t
    if (!exists) continue
    const have = (await client.query('SELECT column_name FROM information_schema.columns WHERE table_name = $1', [table])).rows.map((r) => r.column_name)
    const use = Object.entries(cols).filter(([c]) => have.includes(c))
    const stamps = (STAMPS[table] ?? []).filter((c) => have.includes(c))
    const list = [...key, ...use.map(([c]) => c), ...stamps].join(', ')
    const originals = (await client.query(`SELECT DISTINCT ON (${key.join(', ')}) ${list} FROM ${backup}`)).rows
    for (const orig of originals) {
      const where_ = key.map((k, i) => `${k} = $${i + 1}`).join(' AND ')
      const keyVals = key.map((k) => orig[k])
      const label = `${table} ${keyVals.join('/')}`
      if (REPORT) {
        for (const [c, kind] of use) for (const [a, b] of pieces(kind, orig[c])) {
          console.log(`${label} ${c}\n   - ${a.trim().slice(0, 300)}\n   + ${b.trim().slice(0, 300)}`)
          total++
        }
        continue
      }
      const cur = (await client.query(`SELECT ${list} FROM ${table} WHERE ${where_}`, keyVals)).rows[0]
      if (!cur) continue
      const edited = stamps.some((c) => String(cur[c]) !== String(orig[c]))
      const set = {}
      for (const [c, kind] of use) {
        if (orig[c] === null) continue
        const out = fix(kind, orig[c])
        if (differs(kind, cur[c], out)) set[c] = { kind, out }
      }
      if (!Object.keys(set).length) continue
      if (edited) { console.log(`${label}: edited since the first run, left alone (check it by hand)`); continue }
      total++
      for (const [c, { kind, out }] of Object.entries(set)) {
        const a = kind === 'json' ? JSON.stringify(cur[c]) : cur[c]
        const b = kind === 'json' ? JSON.stringify(out) : out
        const [x, y] = where(a, b)
        console.log(`${label} ${c}\n   now: …${x}…\n   fix: …${y}…`)
      }
      if (APPLY) {
        const cs = Object.keys(set)
        const vals = cs.map((c) => (set[c].kind === 'json' ? JSON.stringify(set[c].out) : set[c].out))
        await client.query(
          `UPDATE ${table} SET ${cs.map((c, i) => `${c} = $${key.length + i + 1}${set[c].kind === 'json' ? '::jsonb' : ''}`).join(', ')} WHERE ${where_}`,
          [...keyVals, ...vals])
      }
    }
  }
  return total
}

if (REDO || REPORT) {
  const client = new pg.Client({ connectionString: url })
  await client.connect()
  try {
    if (APPLY && !REPORT) await client.query('BEGIN')
    const n = await fromBackups(client)
    if (APPLY && !REPORT) await client.query('COMMIT')
    console.log(REPORT ? `${n} piece(s) of text.` : APPLY ? `Done: ${n} row(s) fixed.` : `Dry run: ${n} row(s) would be fixed. Run again with --redo --apply.`)
  } catch (err) {
    if (APPLY) await client.query('ROLLBACK').catch(() => {})
    console.error('Stopped, nothing changed:', err.message)
    process.exitCode = 1
  } finally {
    await client.end()
  }
  process.exit()
}

const client = new pg.Client({ connectionString: url })
await client.connect()
let total = 0
try {
  if (APPLY) await client.query('BEGIN')
  for (const { table, key, cols } of PLAN) {
    const have = (await client.query(
      'SELECT column_name FROM information_schema.columns WHERE table_name = $1', [table])).rows.map((r) => r.column_name)
    if (!have.length) { console.log(`${table}: not in this database, skipped`); continue }
    const use = Object.entries(cols).filter(([c]) => have.includes(c))
    const dashCheck = use.map(([c]) => `${c}::text ~ '[–—]'`).join(' OR ')
    const rows = (await client.query(
      `SELECT ${[...key, ...use.map(([c]) => c)].join(', ')} FROM ${table} WHERE ${dashCheck}`)).rows
    let n = 0
    const shown = []
    for (const row of rows) {
      const set = {}
      for (const [c, kind] of use) {
        if (row[c] === null || !hasDash(kind === 'json' ? JSON.stringify(row[c]) : row[c])) continue
        const out = fix(kind, row[c])
        if (differs(kind, row[c], out)) set[c] = { kind, out }
      }
      if (!Object.keys(set).length) continue
      n++
      if (shown.length < 3) {
        const [c, { kind, out }] = Object.entries(set)[0]
        const before = kind === 'json' ? JSON.stringify(row[c]) : row[c]
        const i = before.search(/[–—]/)
        const after = kind === 'json' ? JSON.stringify(out) : out
        shown.push(`   ${key.map((k) => row[k]).join('/')} ${c}: …${before.slice(Math.max(0, i - 50), i + 60)}…\n      -> …${after.slice(Math.max(0, i - 50), i + 60)}…`)
      }
      if (APPLY) {
        const backup = `backup_dashes_${table}`
        await client.query(`CREATE TABLE IF NOT EXISTS ${backup} AS SELECT * FROM ${table} WITH NO DATA`)
        const where = key.map((k, i) => `${k} = $${i + 1}`).join(' AND ')
        const keyVals = key.map((k) => row[k])
        await client.query(`INSERT INTO ${backup} SELECT * FROM ${table} WHERE ${where}`, keyVals)
        const cs = Object.keys(set)
        const vals = cs.map((c) => (set[c].kind === 'json' ? JSON.stringify(set[c].out) : set[c].out))
        await client.query(
          `UPDATE ${table} SET ${cs.map((c, i) => `${c} = $${key.length + i + 1}${set[c].kind === 'json' ? '::jsonb' : ''}`).join(', ')} WHERE ${where}`,
          [...keyVals, ...vals])
      }
    }
    total += n
    console.log(`${table}: ${n} row(s) ${APPLY ? 'changed' : 'would change'}${rows.length > n ? ` (${rows.length - n} only had a dash standing alone, left as is)` : ''}`)
    for (const s of shown) console.log(s)
  }
  if (APPLY) await client.query('COMMIT')
  console.log(APPLY ? `Done: ${total} row(s) changed. Backups are in the backup_dashes_* tables.` : `Dry run: ${total} row(s) would change. Run again with --apply to change them.`)
} catch (err) {
  if (APPLY) await client.query('ROLLBACK').catch(() => {})
  console.error('Stopped, nothing changed:', err.message)
  process.exitCode = 1
} finally {
  await client.end()
}
