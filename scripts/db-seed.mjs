#!/usr/bin/env node
/**
 * Optional sample content, so the admin has something in it the first time you
 * open it:
 *
 *   npm run db:seed          add the samples
 *   npm run db:seed -- --clear   remove them again
 *
 * Every row it writes is tagged, so --clear removes exactly what it added and
 * nothing a person typed. Real content never gets this tag.
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, unlinkSync, existsSync, readdirSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const TAG = 'sample-seed'

function env() {
  const out = {}
  for (const f of ['.env.local', '.env']) {
    const p = path.join(ROOT, f)
    if (!existsSync(p)) continue
    for (const line of readFileSync(p, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m) out[m[1]] ??= m[2].replace(/^["']|["']$/g, '')
    }
  }
  return { ...out, ...process.env }
}
const URL_ = env().DATABASE_URL
if (!URL_) { console.error('  DATABASE_URL is not set. Run `npm run db:setup` first.'); process.exit(1) }

function findPsql() {
  const win = process.platform === 'win32'
  const exe = win ? 'psql.exe' : 'psql'
  try { execFileSync(exe, ['--version'], { stdio: 'ignore' }); return exe } catch { /* keep looking */ }
  const roots = win ? ['C:\\Program Files\\PostgreSQL'] : ['/usr/lib/postgresql']
  for (const root of roots) {
    if (!existsSync(root)) continue
    for (const v of readdirSync(root).sort().reverse()) {
      const c = path.join(root, v, 'bin', exe)
      if (existsSync(c)) return c
    }
  }
  console.error('  PostgreSQL not found. Run `npm run db:setup` first.')
  process.exit(1)
}
const PSQL = findPsql()
/* Every statement goes to psql through a UTF-8 file rather than as a command
 * line argument. Windows hands argv to a child process in the console code
 * page, so an em dash or a middle dot arrives as a single byte (0x97, 0xb7)
 * that PostgreSQL rejects: `invalid byte sequence for encoding "UTF8"`. */
const TMP = path.join(os.tmpdir(), `rti-seed-${process.pid}.sql`)
const PSQL_ENV = { ...process.env, PGCLIENTENCODING: 'UTF8' }
process.on('exit', () => { try { unlinkSync(TMP) } catch { /* already gone */ } })

const run = (sql) => {
  writeFileSync(TMP, sql, 'utf8')
  return execFileSync(PSQL, [URL_, '-v', 'ON_ERROR_STOP=1', '-q', '-t', '-A', '-f', TMP],
    { encoding: 'utf8', env: PSQL_ENV }).trim()
}

if (process.argv.includes('--clear')) {
  run(`DELETE FROM posts       WHERE focus_keyword = '${TAG}'`)
  run(`DELETE FROM subscribers WHERE '${TAG}' = ANY(tags)`)
  run(`DELETE FROM leads       WHERE notes = '${TAG}'`)
  run(`DELETE FROM media       WHERE filename LIKE 'sample-%'`)
  console.log('  Sample content removed.')
  process.exit(0)
}

const BODY = {
  type: 'doc',
  content: [
    { type: 'paragraph', content: [{ type: 'text', text: 'Every device we take in carries a small printed language: a triangle of arrows, a number, two or three letters underneath. Most people read it as one symbol meaning "recyclable". It is not.' }] },
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Why the symbols matter' }] },
    { type: 'paragraph', content: [{ type: 'text', text: 'Recycling is a sorting problem before it is anything else. A polypropylene housing and an ABS housing look identical and behave completely differently once they are shredded and melted. The resin code is how a sorting line knows which is which.' }] },
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'The seven resin codes' }] },
    { type: 'paragraph', content: [{ type: 'text', text: 'The number inside the triangle is a resin identification code, not a promise that your programme accepts it. Codes 1 and 2 are widely collected; 3 through 7 depend entirely on who is doing the collecting.' }] },
    { type: 'bulletList', content: [
      { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'bold' }], text: '1 — PET' }, { type: 'text', text: ' · drink bottles, some device packaging. Widely accepted.' }] }] },
      { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'bold' }], text: '2 — HDPE' }, { type: 'text', text: ' · toner bottles, rigid casings. Widely accepted.' }] }] },
      { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'bold' }], text: '5 — PP' }, { type: 'text', text: ' · battery casings, appliance parts. Accepted at our facilities.' }] }] },
    ] },
    { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: 'The crossed-out wheelie bin' }] },
    { type: 'paragraph', content: [{ type: 'text', text: 'This one is a legal instruction, not a suggestion. It means the item must not go in general waste. In Minnesota and Wisconsin it appears on almost everything with a plug or a battery.' }] },
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'What Recycle Technologies accepts' }] },
    { type: 'paragraph', content: [{ type: 'text', text: 'We have processed electronics, lamps, ballasts and batteries since 1993, and our Blaine facility holds R2v3 certification. If you cannot read a mark, photograph it and send it over.' }] },
  ],
}

const POSTS = [
  ['recycle-symbol', 'Recycling Symbols Explained: A Complete Guide',
   'Recycling Symbols Explained | Recycle Technologies',
   'What the numbers and arrows on electronics, batteries and packaging actually mean, and which ones we accept.', 'published', 'guides'],
  ['it-asset-disposition', 'What Is IT Asset Disposition (ITAD)?', '', '', 'draft', 'itad-guide'],
  ['data-destruction-guide', 'Data Destruction & Hard Drive Wiping Guide', '', '', 'draft', 'data-security'],
  ['bulk-electronics-pickup', 'Preparing Your Business for a Bulk Electronics Pickup',
   'Bulk Electronics Pickup Checklist | Recycle Technologies',
   'What to sort, label and document before a scheduled commercial pickup, so the process goes smoothly.', 'draft', 'industry-solutions'],
]
for (const [slug, title, mt, md, status, cat] of POSTS) {
  run(`INSERT INTO posts (slug, title, meta_title, meta_description, status, focus_keyword,
         content_json, category_id, author_id, published_at)
       VALUES ($$${slug}$$, $$${title}$$, $$${mt}$$, $$${md}$$, '${status}', '${TAG}',
         $$${JSON.stringify(BODY)}$$::jsonb,
         (SELECT id FROM categories WHERE slug = '${cat}'),
         (SELECT id FROM users ORDER BY id LIMIT 1),
         ${status === 'published' ? 'now()' : 'NULL'})
       ON CONFLICT (slug) DO NOTHING`)
}

const SUBS = [
  ['facilities@northlandclinic.org', 'confirmed', '/downloads/', 'gated_pdf'],
  ['procurement@brightpathmfg.com', 'confirmed', '/resources/', 'footer'],
  ['it@midwestcreditunion.com', 'pending', '/itad-recycling-guides/', 'footer'],
  ['office@vandenbergautogroup.com', 'confirmed', '/quote/', 'quote_form_optin'],
  ['sustainability@harborlogistics.net', 'unsubscribed', '/blog/', 'blog_inline'],
]
for (const [email, status, page, type] of SUBS) {
  run(`INSERT INTO subscribers (email, status, source_page, source_type, tags, confirmed_at)
       VALUES ($$${email}$$, '${status}', $$${page}$$, '${type}', ARRAY['${TAG}'],
         ${status === 'confirmed' ? 'now()' : 'NULL'})
       ON CONFLICT (email) DO NOTHING`)
}

const LEADS = [
  ['quote', 'Dana Whitfield', 'dana@northlandclinic.org', 'Northland Clinic', '42 desktops, 18 monitors, secure wipe — Blaine MN 55449'],
  ['quote', 'Marcus Lee', 'marcus@brightpathmfg.com', 'BrightPath Manufacturing', 'Pallet of ballasts plus a four-drum bulb pickup — New Berlin WI'],
  ['download', 'Priya Raman', 'priya@example.com', null, 'ITAD Service Overview'],
  ['contact', 'Tom Gierke', 'tgierke@lakeshoreschools.org', 'Lakeshore Schools', 'Asking whether we take CRT televisions'],
]
for (const [type, name, email, company, message] of LEADS) {
  run(`INSERT INTO leads (type, name, email, company, message, source_page, notes)
       VALUES ('${type}', $$${name}$$, $$${email}$$, ${company ? `$$${company}$$` : 'NULL'},
               $$${message}$$, '/contact-us/', '${TAG}')`)
}

/* No sample media. Uploading works now, so a row pointing at a file that was
   never there is not a demo — it is a broken thumbnail somebody has to
   investigate. --clear still removes any left over from an earlier seed. */

const SOCIAL = {
  TikTok: 'https://www.tiktok.com/@recycletechnologies',
  Instagram: 'https://www.instagram.com/recycletechnologies',
  Facebook: 'https://www.facebook.com/RecycleTechnologies',
  LinkedIn: 'https://www.linkedin.com/company/recycle-technologies-inc',
  YouTube: 'https://www.youtube.com/@recycletechnologies',
}
for (const [platform, url] of Object.entries(SOCIAL)) {
  run(`UPDATE social_links SET url = $$${url}$$ WHERE platform = '${platform}' AND url = ''`)
}

console.log(`
  Sample content added: ${POSTS.length} posts, ${SUBS.length} subscribers, ${LEADS.length} enquiries.

  Remove it whenever you like:  npm run db:seed -- --clear
`)
