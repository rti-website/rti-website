#!/usr/bin/env node
/**
 * Which fields of each Admin -> Pages document actually show on the site.
 *
 *   BASE=http://localhost:3000 ADMIN_USER=you@example.com ADMIN_PASS=… \
 *     node scripts/check-page-fields.mjs [--write] [key …]
 *
 * For every document (or the keys given) it saves a DRAFT in which every
 * text field holds a unique marker, opens the document's pages in preview
 * (draft mode), and looks for each marker in the HTML (visible text, and the
 * data handed to client components, which is in the same HTML). Pictures and
 * links are checked by looking for their original value. Then it throws the
 * marker draft away.
 *
 * It prints, per document, the fields that did NOT show: either copy the page
 * does not use (fine, the editor hides it) or a component still importing the
 * constant instead of reading content() (a bug to fix).
 *
 * --write saves the shapes that did show to src/content/rendered-fields.json,
 * which the editor uses to hide fields that would change nothing.
 *
 * !! RUN IT AGAINST A LOCAL DATABASE ONLY. It writes drafts (and discards
 * them, which also throws away any real draft on that document). It refuses
 * to run on a document that already has a draft, and on any BASE that is not
 * localhost, unless --force.
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const BASE = (process.env.BASE ?? 'http://localhost:3000').replace(/\/$/, '')
const USER = process.env.ADMIN_USER
const PASS = process.env.ADMIN_PASS
const args = process.argv.slice(2)
const WRITE = args.includes('--write')
const FORCE = args.includes('--force')
const only = args.filter((a) => !a.startsWith('--'))

if (!USER || !PASS) { console.error('Set ADMIN_USER and ADMIN_PASS (an administrator or editor).'); process.exit(1) }
if (!/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(BASE) && !FORCE) {
  console.error(`Refusing to write marker drafts to ${BASE}. Run it against a local server, or pass --force.`); process.exit(1)
}

/* --------------------------------------------------------------- session -- */
let jar = {}
const cookieHeader = () => Object.entries(jar).map(([k, v]) => `${k}=${v}`).join('; ')
function keep(res) {
  for (const c of res.headers.getSetCookie?.() ?? []) {
    const [pair] = c.split(';'); const i = pair.indexOf('=')
    jar[pair.slice(0, i).trim()] = pair.slice(i + 1).trim()
  }
}
async function req(p, opts = {}) {
  const res = await fetch(BASE + p, { redirect: 'manual', ...opts, headers: { ...(opts.headers ?? {}), cookie: cookieHeader() } })
  keep(res)
  return res
}
async function jsonReq(p, method = 'GET', body) {
  const res = await req(p, { method, headers: body ? { 'content-type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`${method} ${p}: ${res.status} ${data.error ?? ''}`)
  return data
}

/* ------------------------------------------------------------------ walk -- */
// Kept in step with src/lib/content-patch.ts (plain node cannot import TS).
const src = fs.readFileSync(path.join(ROOT, 'src/lib/content-patch.ts'), 'utf8')
const HIDDEN = new Set([...src.match(/const HIDDEN_KEYS = new Set\(\[([\s\S]*?)\]\)/)[1].matchAll(/'([^']+)'/g)].map((m) => m[1]))
const VALUE_ONLY = new Set([...src.match(/const VALUE_ONLY = new Set\(\[([\s\S]*?)\]\)/)[1].matchAll(/'([^']+)'/g)].map((m) => m[1]))
const hidden = (k, v) => !(VALUE_ONLY.has(k) && v !== null && typeof v === 'object') && (HIDDEN.has(k) || /(^|_)(SEO|TODO)/i.test(k) || /^todo/i.test(k))
const IMAGE_RE = /\.(png|jpe?g|webp|gif|svg|avif)(\?.*)?$/i
const kindOf = (k, v) => (IMAGE_RE.test(v) || /^(image|photo|src|logo|icon|picture|thumbnail|avatar|poster)$/i.test(k) ? 'image'
  : /^(href|link|to)$/i.test(k) || (/^(\/|https?:\/\/|mailto:|#)/.test(v) && !/\s/.test(v)) ? 'link' : 'text')
/**
 * Copy that only shows in some states, so a run on a fresh database cannot
 * see it: the "Near You" band on a service page (only once a location page
 * there is published) and the Related Articles band (under blog posts, which
 * are not any document's URL). Always kept in the manifest.
 */
const CONDITIONAL = [/^SERVICE_PAGE_TEXT\.nearYou\./, /(^|\.)placesTitle$/, /^RELATED_ARTICLES\./]
const shape = (p) => p.split('.').map((s) => (/^\d+$/.test(s) ? '*' : s)).join('.')

function fields(v, p = '', k = '', out = []) {
  if (typeof v === 'string') { if (!/^\d+:\d+$/.test(v) && v.trim()) out.push({ path: p, key: k, value: v, kind: kindOf(k, v) }) }
  else if (Array.isArray(v)) v.forEach((x, i) => fields(x, p ? `${p}.${i}` : String(i), k, out))
  else if (v && typeof v === 'object') for (const [kk, x] of Object.entries(v)) if (!hidden(kk, x)) fields(x, p ? `${p}.${kk}` : kk, kk, out)
  return out
}
function setAt(root, p, val) {
  const segs = p.split('.'); let cur = root
  for (const s of segs.slice(0, -1)) cur = cur[s]
  cur[segs.at(-1)] = val
}

/* ------------------------------------------------------------------ main -- */
await jsonReq('/api/admin/session/', 'POST', { email: USER, password: PASS })
const { docs } = await jsonReq('/api/admin/pages/')
const todo = docs.filter((d) => (!only.length || only.includes(d.key)) && d.urls.length)
const manifestPath = path.join(ROOT, 'src/content/rendered-fields.json')
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : {}
let problems = 0

for (const d of todo) {
  const q = `?key=${encodeURIComponent(d.key)}`
  const doc = await jsonReq(`/api/admin/pages/doc/${q}`)
  if (doc.hasDraft && !FORCE) { console.log(`- ${d.key}: skipped, it has a real draft`); continue }
  const all = fields(doc.defaults)
  const marked = JSON.parse(JSON.stringify(doc.defaults))
  const texts = all.filter((f) => f.kind === 'text')
  texts.forEach((f, i) => setAt(marked, f.path, `QXQ${i}QXQ`))
  await jsonReq(`/api/admin/pages/doc/${q}`, 'PUT', { data: marked })

  let html = ''
  try {
    for (const u of d.urls) {
      const r1 = await req(`/api/admin/pages/preview/?to=${encodeURIComponent(u)}`)
      if (r1.status !== 307) throw new Error(`preview ${u}: ${r1.status}`)
      const r2 = await req(u)
      html += await r2.text()
    }
  } finally {
    await jsonReq(`/api/admin/pages/doc/${q}`, 'POST', { action: 'discard' })
  }
  const decoded = html.replace(/\\u0026/g, '&').replace(/&amp;/g, '&')
  const seen = new Set(), missing = []
  texts.forEach((f, i) => (html.includes(`QXQ${i}QXQ`) ? seen.add(shape(f.path)) : missing.push(f)))
  for (const f of all.filter((x) => x.kind !== 'text')) {
    const v = f.value
    const hit = decoded.includes(v) || decoded.includes(encodeURIComponent(v)) || decoded.includes(v.replace(/\/$/, ''))
    if (hit) seen.add(shape(f.path)); else missing.push(f)
  }
  // A shape counts if any instance showed (a list's later items may be off screen).
  for (const f of missing) if (CONDITIONAL.some((r) => r.test(f.path))) seen.add(shape(f.path))
  const missed = missing.filter((f) => !seen.has(shape(f.path)))
  manifest[d.key] = [...seen].sort()
  const tag = missed.length ? `${missed.length} not shown` : 'all shown'
  console.log(`- ${d.key} (${d.urls.join(', ')}): ${all.length} fields, ${tag}`)
  for (const f of missed.slice(0, 40)) console.log(`    ${f.path} [${f.kind}] ${JSON.stringify(f.value).slice(0, 70)}`)
  if (missed.length > 40) console.log(`    … and ${missed.length - 40} more`)
  problems += missed.length
}

if (WRITE) {
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`\nWrote ${path.relative(ROOT, manifestPath)} (${Object.keys(manifest).length} documents).`)
}
console.log(`\n${problems} field(s) not seen on their pages.`)
