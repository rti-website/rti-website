#!/usr/bin/env node
/**
 * Crawl a running build and report every internal link and image that answers
 * 400 or worse, plus the <head> facts that decide how the site looks in a SERP.
 *
 *   npm run build && npm run start
 *   npm run verify:links                      # http://127.0.0.1:3000
 *   npm run verify:links -- --base https://staging.recycletechnologies.com
 *   npm run verify:links -- --auth user:pass  # staging is behind basic auth
 *
 * WHY IT EXISTS: check-static.mjs proves every DECLARED url got prerendered.
 * Nothing proved the opposite direction — that every url the pages LINK TO
 * exists. The end-to-end QA on 17 Sep 2026 found fourteen dead internal targets
 * linked from as many as 415 pages each, and ten pagination URLs that were
 * prerendered, listed in sitemap.xml, linked from the pager, and then refused
 * by their own route. Both classes are invisible to a build that succeeds.
 *
 * It reads .next/prerender-manifest.json for the route list, so it needs a
 * build next to it — but it fetches over HTTP, so it works against staging too.
 *
 * Plain node, no dependencies, same as every other script in here.
 */
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const argv = process.argv.slice(2)
const opt = (n, d) => { const i = argv.indexOf(`--${n}`); return i === -1 ? d : argv[i + 1] }

const BASE = String(opt('base', 'http://127.0.0.1:3000')).replace(/\/+$/, '')
const AUTH = opt('auth', null)
const CONCURRENCY = Number(opt('concurrency', 8))
const QUIET = argv.includes('--quiet')

const c = {
  b: (s) => `\x1b[1m${s}\x1b[0m`, dim: (s) => `\x1b[2m${s}\x1b[0m`,
  ok: (s) => `\x1b[32m${s}\x1b[0m`, warn: (s) => `\x1b[33m${s}\x1b[0m`, bad: (s) => `\x1b[31m${s}\x1b[0m`,
}
const headers = AUTH ? { authorization: `Basic ${Buffer.from(AUTH).toString('base64')}` } : {}

/* ------------------------------------------------------------ route list -- */
const manifestPath = path.join(ROOT, '.next', 'prerender-manifest.json')
if (!existsSync(manifestPath)) {
  console.error(`\n  ${c.bad('No .next/prerender-manifest.json.')} Run \`npm run build\` first.\n`)
  process.exit(1)
}
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
const routes = Object.keys(manifest.routes)
  .filter((r) => !r.startsWith('/_next') && !/\.(xml|txt|json|ico|png|svg)$/.test(r))
  .map((r) => (r.endsWith('/') ? r : `${r}/`))
const pageUrls = [...new Set(['/', ...routes])].sort()

/* --------------------------------------------------------------- helpers -- */
/* Entities must be decoded before a URL is fetched. Next writes srcset and
   href with &amp;, which is correct HTML; sending it literally makes the image
   optimiser answer 400 and this script report a broken image that is not
   broken. That false positive cost a whole pass of the original audit. */
const unesc = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'")
  .replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')

const tagsOf = (html, el) => html.match(new RegExp(`<${el}\\b[^>]*>`, 'gi')) || []
const attrOf = (tag, name) => {
  const m = new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i').exec(tag)
  return m ? unesc(m[2] ?? m[3] ?? '') : null
}

async function get(url, method = 'GET') {
  try {
    const r = await fetch(BASE + url, { method, headers, redirect: 'manual' })
    const body = method === 'GET' ? await r.text() : ''
    return { status: r.status, html: body, bytes: Buffer.byteLength(body),
             type: r.headers.get('content-type') || '' }
  } catch (e) {
    return { status: 0, html: '', bytes: 0, type: '', err: String(e) }
  }
}

async function pool(items, fn) {
  const q = [...items]
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (q.length) await fn(q.shift())
  }))
}

/* ----------------------------------------------------------------- crawl -- */
if (!QUIET) console.log(`\n  ${c.b('Link and image check')}  ${c.dim(BASE)}  ${c.dim(`${pageUrls.length} pages`)}\n`)

const pages = new Map()
let done = 0
await pool(pageUrls, async (u) => {
  pages.set(u, await get(u))
  if (!QUIET && ++done % 100 === 0) process.stdout.write(`  ${c.dim(`${done}/${pageUrls.length}`)}\n`)
})

const unreachable = [...pages].filter(([, p]) => p.status === 0)
if (unreachable.length === pages.size) {
  console.error(`\n  ${c.bad(`Nothing answered at ${BASE}.`)} Is the server running?\n`)
  process.exit(1)
}

/* ---------------------------------------------------- collect the targets -- */
const links = new Map()   // "/path/" -> Set(page that links to it)
const images = new Map()
for (const [u, p] of pages) {
  if (!p.type.includes('html')) continue
  for (const a of tagsOf(p.html, 'a')) {
    const h = attrOf(a, 'href')
    if (!h || !h.startsWith('/')) continue
    const t = h.split('#')[0].split('?')[0]
    if (!t) continue
    ;(links.get(t) ?? links.set(t, new Set()).get(t)).add(u)
  }
  for (const i of tagsOf(p.html, 'img')) {
    const s = attrOf(i, 'src')
    if (!s || !s.startsWith('/')) continue
    ;(images.get(s) ?? images.set(s, new Set()).get(s)).add(u)
  }
}

async function probe(map) {
  const bad = []
  await pool([...map.keys()], async (t) => {
    const known = pages.get(t)
    const r = known ?? await get(t, 'HEAD')
    if (r.status >= 400 || r.status === 0) bad.push({ target: t, status: r.status, from: map.get(t) })
  })
  return bad.sort((a, b) => b.from.size - a.from.size)
}

const badLinks = await probe(links)
const badImages = await probe(images)

/* ------------------------------------------------------------------ head -- */
const titles = new Map(), descs = new Map()
const noH1 = [], manyH1 = [], noDesc = [], noCanon = [], longTitle = [], longDesc = []
let checked = 0
/* The admin is not a public page: it is behind a login, it carries
   NEXT_PUBLIC_NOINDEX, and its <h1> is rendered by React after hydration, so a
   head check run against the served HTML reports a missing heading that a
   person never sees. Skip it here rather than weaken the check for real pages
   — scripts/check-admin.mjs is what exercises that screen. */
const PRIVATE = (u) => u === '/admin/' || u.startsWith('/admin/')

for (const [u, p] of pages) {
  if (p.status !== 200 || !p.type.includes('html') || PRIVATE(u)) continue
  checked++
  const title = (/<title>([\s\S]*?)<\/title>/i.exec(p.html) || [])[1]?.trim()
  const dm = /<meta[^>]+name="description"[^>]*>/i.exec(p.html)
  const desc = dm ? attrOf(dm[0], 'content') : null
  const h1 = (p.html.match(/<h1\b/gi) || []).length

  if (title) (titles.get(title) ?? titles.set(title, []).get(title)).push(u)
  if (desc) (descs.get(desc) ?? descs.set(desc, []).get(desc)).push(u); else noDesc.push(u)
  if (!/<link[^>]+rel="canonical"/i.test(p.html)) noCanon.push(u)
  if (h1 === 0) noH1.push(u)
  if (h1 > 1) manyH1.push(`${u} (${h1})`)
  if (title && title.length > 62) longTitle.push(`${u} (${title.length})`)
  if (desc && desc.length > 165) longDesc.push(`${u} (${desc.length})`)
}
const dupes = (m) => [...m].filter(([, v]) => v.length > 1).sort((a, b) => b[1].length - a[1].length)

/* ---------------------------------------------------------------- report -- */
const statuses = {}
for (const [, p] of pages) statuses[p.status] = (statuses[p.status] ?? 0) + 1
const notOk = Object.entries(statuses).filter(([s]) => s !== '200')

console.log(`\n  ${c.b('Pages')}`)
console.log(`    ${c.ok(`${statuses[200] ?? 0} answered 200`)}`)
for (const [s, n] of notOk) {
  const which = [...pages].filter(([, p]) => String(p.status) === s).map(([u]) => u)
  console.log(`    ${c.bad(`${n} answered ${s}`)}  ${which.slice(0, 8).join(', ')}${which.length > 8 ? ' …' : ''}`)
}

console.log(`\n  ${c.b('Internal links')}  ${c.dim(`${links.size} distinct targets`)}`)
if (badLinks.length === 0) console.log(`    ${c.ok('all reachable')}`)
for (const b of badLinks) {
  console.log(`    ${c.bad(String(b.status))}  ${b.target}`)
  console.log(`         ${c.dim(`linked from ${b.from.size} page(s): ${[...b.from].slice(0, 3).join(', ')}${b.from.size > 3 ? ' …' : ''}`)}`)
}

console.log(`\n  ${c.b('Images')}  ${c.dim(`${images.size} distinct sources`)}`)
if (badImages.length === 0) console.log(`    ${c.ok('all reachable')}`)
for (const b of badImages) {
  console.log(`    ${c.bad(String(b.status))}  ${b.target.slice(0, 100)}`)
  console.log(`         ${c.dim(`on ${b.from.size} page(s): ${[...b.from].slice(0, 3).join(', ')}${b.from.size > 3 ? ' …' : ''}`)}`)
}

console.log(`\n  ${c.b('Head tags')}  ${c.dim(`${checked} pages`)}`)
const line = (label, list, hard = true) => {
  if (list.length === 0) { console.log(`    ${c.ok('✓')} ${label}`); return }
  console.log(`    ${hard ? c.bad('✗') : c.warn('!')} ${label}: ${list.length}  ${c.dim(list.slice(0, 6).join(', '))}`)
}
line('every page has exactly one <h1>', [...noH1.map((u) => `${u} (0)`), ...manyH1])
line('every page has a meta description', noDesc)
line('every page has a canonical', noCanon)
line('titles within 62 characters', longTitle, false)
line('descriptions within 165 characters', longDesc, false)
line('titles are unique', dupes(titles).map(([t, v]) => `"${t.slice(0, 40)}" x${v.length}`), false)
line('descriptions are unique', dupes(descs).map(([t, v]) => `"${t.slice(0, 40)}" x${v.length}`), false)

/* Weight is reported, never failed on: what is acceptable depends on the page,
   and every one of these is gzipped to roughly an eighth over the wire. */
const weights = [...pages].filter(([, p]) => p.status === 200 && p.type.includes('html'))
  .sort((a, b) => b[1].bytes - a[1].bytes)
if (weights.length) {
  const kb = (n) => `${Math.round(n / 1024)} KB`
  const mid = weights[Math.floor(weights.length / 2)][1].bytes
  console.log(`\n  ${c.b('HTML weight')}  ${c.dim(`median ${kb(mid)}`)}`)
  for (const [u, p] of weights.slice(0, 5)) console.log(`    ${String(kb(p.bytes)).padStart(7)}  ${u}`)
}

/* Only dead links, dead images and missing head tags fail. Length and
   uniqueness warnings do not: most of those strings are ported verbatim from
   WordPress and CLAUDE.md rule 6 forbids touching them before launch. */
const fatal = badLinks.length + badImages.length + noH1.length + manyH1.length
  + noDesc.length + noCanon.length + notOk.reduce((s, [st, n]) => s + (st === '404' ? n : 0), 0)

console.log('')
if (fatal === 0) {
  console.log(`  ${c.ok(c.b('Link check passed'))}\n`)
  process.exit(0)
}
console.log(`  ${c.bad(c.b(`${fatal} problem(s).`))} Dead links and images are listed above.\n`)
process.exit(1)
