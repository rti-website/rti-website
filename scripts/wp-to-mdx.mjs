#!/usr/bin/env node
/**
 * WordPress -> MDX, driven by url-map.csv so that titles, descriptions and H1s
 * come from the approved map rather than from whatever the REST API returns.
 *
 * Pulls posts and pages from the public WP REST API, converts the HTML body to
 * MDX, and writes one file per KEEP URL with the exact frontmatter the site
 * expects. Image src values are left untouched so /wp-content/uploads/ paths
 * stay identical.
 *
 * Usage:
 *   node scripts/wp-to-mdx.mjs --site https://www.recycletechnologies.com \
 *        [--type posts|pages] [--limit 0] [--dry]
 *
 * This is a first pass, not a finished migration. The plan requires a manual
 * review of the top 50 pages by impressions — do that review.
 */
import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const arg = (n, d) => { const i = args.indexOf(n); return i === -1 ? d : args[i + 1] }
const SITE = (arg('--site') || '').replace(/\/$/, '')
const TYPE = arg('--type', 'posts')
const LIMIT = Number(arg('--limit', '0'))
const DRY = args.includes('--dry')
if (!SITE) { console.error('  --site <url> required'); process.exit(1) }

const ROOT = process.cwd()
const OUT = path.join(ROOT, 'content', TYPE === 'posts' ? 'posts' : 'pages')

// --- url-map lookup so frontmatter comes from the approved source -----------
function parseCsv(text) {
  const rows = []; let row = [], field = '', q = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (q) { if (c === '"') { if (text[i+1] === '"') { field += '"'; i++ } else q = false } else field += c }
    else if (c === '"') q = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = '' }
    else if (c !== '\r') field += c
  }
  if (field.length || row.length) { row.push(field); rows.push(row) }
  const [head, ...body] = rows.filter(r => r.some(c => c.trim() !== ''))
  return body.map(r => Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] ?? '').trim()])))
}
const norm = (u) => { const p = (u||'').replace(/^https?:\/\/[^/]+/, ''); const l = p.startsWith('/') ? p : `/${p}`; return l.endsWith('/') ? l : `${l}/` }

const mapPath = path.join(ROOT, 'data', 'url-map.csv')
if (!fs.existsSync(mapPath)) { console.error('  data/url-map.csv not found. Phase 1 produces it.'); process.exit(1) }
const urlMap = new Map(
  parseCsv(fs.readFileSync(mapPath, 'utf8'))
    .filter(r => (r.action || '').toUpperCase() === 'KEEP')
    .map(r => [norm(r.old_url), r]),
)

// --- minimal HTML -> MDX ----------------------------------------------------
const decode = (s) => s
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
  .replace(/&#8217;/g, '’').replace(/&#8216;/g, '‘')
  .replace(/&#8220;/g, '“').replace(/&#8221;/g, '”')
  .replace(/&#8211;/g, '–').replace(/&#8212;/g, '—')

function toMdx(html) {
  let s = html
  s = s.replace(/<!--[\s\S]*?-->/g, '')
  s = s.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')
  for (let n = 6; n >= 1; n--) {
    s = s.replace(new RegExp(`<h${n}[^>]*>([\\s\\S]*?)<\\/h${n}>`, 'gi'),
      (_, t) => `\n\n${'#'.repeat(n)} ${decode(t.replace(/<[^>]+>/g, '')).trim()}\n\n`)
  }
  s = s.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, t) => `\n- ${decode(t.replace(/<[^>]+>/g, '')).trim()}`)
  s = s.replace(/<\/?(ul|ol)[^>]*>/gi, '\n')
  s = s.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => `**${decode(t.replace(/<[^>]+>/g, '')).trim()}**`)
  s = s.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => `*${decode(t.replace(/<[^>]+>/g, '')).trim()}*`)
  // Keep img as JSX so alt text survives and the src path stays identical.
  s = s.replace(/<img([^>]*)\/?>/gi, (m, attrs) => {
    const src = (attrs.match(/src="([^"]*)"/i) || [])[1] || ''
    const alt = decode((attrs.match(/alt="([^"]*)"/i) || [])[1] || '')
    const w = (attrs.match(/width="(\d+)"/i) || [])[1]
    const h = (attrs.match(/height="(\d+)"/i) || [])[1]
    return `\n\n<img src="${src}" alt="${alt}"${w ? ` width={${w}}` : ''}${h ? ` height={${h}}` : ''} />\n\n`
  })
  s = s.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi,
    (_, href, t) => `[${decode(t.replace(/<[^>]+>/g, '')).trim()}](${href})`)
  s = s.replace(/<p[^>]*>/gi, '\n\n').replace(/<\/p>/gi, '\n\n')
  s = s.replace(/<br\s*\/?>/gi, '  \n')
  s = s.replace(/<[^>]+>/g, '')
  s = decode(s).replace(/\n{3,}/g, '\n\n').trim()
  // Curly braces are JSX in MDX — escape stray ones.
  s = s.replace(/(?<!\\)\{(?!\s*\d)/g, '\\{')
  return s
}

const yaml = (v) => `"${String(v).replace(/"/g, '\\"')}"`

let page = 1, written = 0, skipped = 0, unmapped = []
if (!DRY) fs.mkdirSync(OUT, { recursive: true })

while (true) {
  const url = `${SITE}/wp-json/wp/v2/${TYPE}?per_page=100&page=${page}&_fields=id,slug,link,title,content,date,modified,excerpt`
  const res = await fetch(url)
  if (res.status === 400) break                 // past the last page
  if (!res.ok) { console.error(`  ${res.status} fetching page ${page}`); process.exit(1) }
  const items = await res.json()
  if (!items.length) break

  for (const item of items) {
    const u = norm(item.link)
    const mapped = urlMap.get(u)
    if (!mapped) { unmapped.push(u); skipped++; continue }

    const body = toMdx(item.content?.rendered ?? '')
    const fm = [
      '---',
      `url: ${u}`,
      `type: ${mapped.type || (TYPE === 'posts' ? 'post' : 'page')}`,
      `title: ${yaml(mapped.title || decode(item.title?.rendered ?? ''))}`,
      `description: ${yaml(mapped.meta_description || '')}`,
      `h1: ${yaml(mapped.h1 || decode(item.title?.rendered ?? ''))}`,
      `date: ${(item.date || '').slice(0, 10)}`,
      `updated: ${(item.modified || '').slice(0, 10)}`,
      'wp_id: ' + item.id,
      '---',
      '',
    ].join('\n')

    const file = path.join(OUT, `${item.slug}.mdx`)
    if (!DRY) fs.writeFileSync(file, fm + body + '\n')
    written++
    if (LIMIT && written >= LIMIT) { page = Infinity; break }
  }
  if (page === Infinity) break
  page++
  process.stdout.write(`\r  fetched page ${page - 1}, written ${written}`)
}

console.log(`\n\n  ${DRY ? '[dry run] ' : ''}${written} file(s) written to ${path.relative(ROOT, OUT)}`)
console.log(`  ${skipped} skipped (not KEEP in url-map.csv)`)
if (unmapped.length) {
  console.log(`\n  URLs found in WordPress but absent from url-map.csv — add them or confirm they are intentional:`)
  for (const u of unmapped.slice(0, 25)) console.log(`   - ${u}`)
  if (unmapped.length > 25) console.log(`   ... and ${unmapped.length - 25} more`)
}
console.log(`\n  Next: review conversions manually, starting with the top 50 by GSC impressions.\n`)
