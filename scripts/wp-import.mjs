#!/usr/bin/env node
/**
 * Imports recycletechnologies.com's WordPress content into the Publisher's
 * database, with every URL preserved exactly.
 *
 *   npm run wp:import -- --dry          see what it would do, write nothing
 *   npm run wp:import                   do it
 *   npm run wp:import -- --limit 5      the first five posts, for a trial run
 *
 * !! RUN THIS ON A MACHINE THAT CAN REACH THE SITE. Claude's sandbox cannot —
 * the egress policy refuses recycletechnologies.com — so this is written as a
 * plain node script with no dependencies beyond psql, to be run by a person on
 * their own laptop, the same way db:setup is.
 *
 * ------------------------------------------------------------------ what it
 * does, and the reasoning behind each decision
 *
 * 1. CATEGORIES COME FROM WORDPRESS, NOT FROM THE ADMIN'S TEN.
 *    WordPress has six (Blog, Recycling, News, Customer Spotlight, From Another
 *    Publication, Uncategorized) and they answer at /category/<slug>/, which is
 *    what is indexed today. The ten categories in the new Blogs menu are a
 *    planned structure with no pages behind them. CLAUDE.md rule 6: this is a
 *    replatform, not a restructure. Both sets live side by side, told apart by
 *    categories.source, and reconciling them is deliberate second-wave work.
 *
 * 2. THE POST BODY IS STORED AS WORDPRESS WROTE IT.
 *    content_html gets the original markup byte for byte and source is set to
 *    'wordpress'. The public page renders that, so a migrated page is identical
 *    to the one Google crawled yesterday.
 *
 *    This matters more than it sounds. These posts contain inline-styled callout
 *    boxes, gradient CTA panels, hand-built comparison tables and
 *    <script type="application/ld+json"> blocks carrying Article and FAQPage
 *    schema. A rich-text editor's schema has no node for any of that: converting
 *    on import would DELETE them, silently, on 300 live pages. So conversion
 *    happens the first time a human opens a post to edit it, where they can see
 *    the result — see the RawHtml node in src/lib/editor-raw.ts.
 *
 * 3. META COMES FROM THE RENDERED PAGE, NOT THE API.
 *    The site runs Rank Math, whose title and description live in post meta that
 *    this install does not expose over REST. Reading <title>, meta description
 *    and canonical off the rendered page is not a workaround — it is strictly
 *    better, because it captures what Google actually sees rather than what a
 *    plugin's settings claim.
 *
 * 4. HOTLINKED IMAGES ARE PULLED IN. THE SITE'S OWN IMAGES ARE NOT MOVED.
 *    Two different cases, and the difference is CLAUDE.md rule 8.
 *
 *    Many posts embed images straight from lh7-rt.googleusercontent.com — Google
 *    Docs' temporary CDN. Those links rot; some are probably dead already. Those
 *    are downloaded into the media library and the HTML is rewritten to point at
 *    our own copy. Pass --keep-remote-images to leave them alone.
 *
 *    !! ANYTHING ALREADY AT /wp-content/uploads/ KEEPS THAT EXACT PATH. It is
 *    downloaded into public/wp-content/uploads/ at the same path it has today
 *    and the markup is left pointing at it, root-relative. An earlier version of
 *    this script rehosted these too, which silently changed ~300 posts' worth of
 *    image URLs — every one of them a URL Google Images has already indexed and
 *    that other sites hotlink. Rule 8 exists because image rankings recover far
 *    more slowly than HTML does. Do not "tidy" these paths.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs'
import { randomBytes } from 'node:crypto'
import os from 'node:os'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
/* Overridable so the migration can be rehearsed against a staging copy — or,
   as it was built, against a stand-in that reproduces the awkward parts. */
const SITE = (process.env.WP_SITE || 'https://www.recycletechnologies.com').replace(/\/+$/, '')
const argv = process.argv.slice(2)
const flag = (n) => argv.includes(`--${n}`)
const opt = (n, d) => { const i = argv.indexOf(`--${n}`); return i === -1 ? d : argv[i + 1] }

const DRY = flag('dry')
const LIMIT = Number(opt('limit', 0)) || 0
const KEEP_REMOTE = flag('keep-remote-images')

const c = {
  b: (s) => `\x1b[1m${s}\x1b[0m`, dim: (s) => `\x1b[2m${s}\x1b[0m`,
  ok: (s) => `\x1b[32m${s}\x1b[0m`, warn: (s) => `\x1b[33m${s}\x1b[0m`, bad: (s) => `\x1b[31m${s}\x1b[0m`,
}
const say = (...a) => console.log(...a)

/* ------------------------------------------------------------ the database */
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
const DB = env().DATABASE_URL
if (!DB && !DRY) { console.error('  DATABASE_URL is not set. Run `npm run db:setup` first.'); process.exit(1) }

function findPsql() {
  const win = process.platform === 'win32'
  const exe = win ? 'psql.exe' : 'psql'
  try { execFileSync(exe, ['--version'], { stdio: 'ignore' }); return exe } catch { /* keep looking */ }
  const roots = win ? ['C:\\Program Files\\PostgreSQL'] : ['/usr/lib/postgresql']
  for (const root of roots) {
    if (!existsSync(root)) continue
    for (const v of readdirSync(root).sort().reverse()) {
      const p = path.join(root, v, 'bin', exe)
      if (existsSync(p)) return p
    }
  }
  console.error('  PostgreSQL not found.'); process.exit(1)
}
const PSQL = DRY ? null : findPsql()
const TMP = path.join(os.tmpdir(), `rti-wp-${process.pid}.sql`)
const PSQL_ENV = { ...process.env, PGCLIENTENCODING: 'UTF8' }
process.on('exit', () => { try { unlinkSync(TMP) } catch { /* gone */ } })

/* Statements go to psql through a UTF-8 FILE, never as a command-line argument:
   Windows converts argv to the console code page on the way into a child
   process, which turns every em dash in 300 blog posts into a byte PostgreSQL
   rejects. This is the same lesson db-seed.mjs learned the hard way. */
function sql(text) {
  if (DRY) return ''
  writeFileSync(TMP, text, 'utf8')
  return execFileSync(PSQL, [DB, '-v', 'ON_ERROR_STOP=1', '-q', '-t', '-A', '-f', TMP],
    { encoding: 'utf8', env: PSQL_ENV, maxBuffer: 64 * 1024 * 1024 }).trim()
}
/** Dollar-quoting with a random tag, so a post that contains $$ cannot break out. */
const q = (v) => {
  if (v === null || v === undefined) return 'NULL'
  const tag = `x${randomBytes(4).toString('hex')}`
  return `$${tag}$${String(v)}$${tag}$`
}
const qnum = (v) => (v === null || v === undefined || Number.isNaN(Number(v)) ? 'NULL' : String(Number(v)))

/* ---------------------------------------------------------------- fetching */
async function getJSON(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'RTI-migration/1.0' } })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`)
  return { data: await res.json(), headers: res.headers }
}

const decode = (s) => String(s ?? '')
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
  .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
  .replace(/&nbsp;/g, '\u00a0').replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&hellip;/g, '…').replace(/&ndash;/g, '–').replace(/&mdash;/g, '—')
  .replace(/&rsquo;/g, '’').replace(/&lsquo;/g, '‘')
  .replace(/&rdquo;/g, '”').replace(/&ldquo;/g, '“')

/**
 * What Google sees on this URL today: the rendered <title>, the meta
 * description, the canonical and the og:image. Rank Math writes all four, and
 * none of them are in this install's REST output.
 */
async function pageMeta(url) {
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'RTI-migration/1.0' } })
    if (!res.ok) return {}
    const html = await res.text()
    const meta = (re) => { const m = html.match(re); return m ? decode(m[1]).trim() : null }
    return {
      title: meta(/<title[^>]*>([\s\S]*?)<\/title>/i),
      description: meta(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)
        ?? meta(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i),
      canonical: meta(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i),
      ogImage: meta(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i),
      robots: meta(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i),
    }
  } catch {
    return {}
  }
}

/* ----------------------------------------------------------------- images */
const MEDIA_DIR = process.env.MEDIA_DIR || path.join(ROOT, 'var', 'uploads')
const seenImages = new Map()   // source url -> our url
const dryImages = new Set()    // what a dry run would have moved
const movedImages = new Set()  // distinct files actually brought across
const deadImages = new Set()   // links that would not load — already broken

function safeName(url, mime) {
  const ext = ({ 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif' })[mime]
    ?? (path.extname(new URL(url).pathname).slice(1).toLowerCase() || 'jpg')
  const stem = path.basename(new URL(url).pathname, path.extname(new URL(url).pathname))
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 50) || 'image'
  return `${stem}-${randomBytes(3).toString('hex')}.${ext}`
}

const PUBLIC_DIR = path.join(ROOT, 'public')
const keptImages = new Set()   // legacy files fetched into public/ at their own path

/**
 * The site's own /wp-content/ path for a src, or null if it is somebody else's.
 *
 * Matches the configured origin with or without the www, and http as well as
 * https, because fifteen years of WordPress editors produced all four. A src
 * that is already root-relative counts too.
 */
const bareHost = (h) => h.toLowerCase().replace(/^www\./, '')

function legacyPath(src) {
  let p = null
  if (src.startsWith('/wp-content/')) p = src
  else {
    let u
    try { u = new URL(src) } catch { return null }
    // `host`, not `hostname`, so a port survives — WP_SITE points at a local
    // stand-in on :8791 when this is rehearsed.
    if (bareHost(u.host) === bareHost(new URL(SITE).host) && u.pathname.startsWith('/wp-content/')) p = u.pathname
  }
  if (!p) return null
  // The path came off our own domain, but it still reaches writeFileSync, so it
  // is resolved and checked rather than trusted.
  const clean = path.posix.normalize(p.split('?')[0].split('#')[0])
  if (!clean.startsWith('/wp-content/')) return null
  const onDisk = path.resolve(PUBLIC_DIR, `.${clean}`)
  if (!onDisk.startsWith(path.join(PUBLIC_DIR, 'wp-content') + path.sep)) return null
  return clean
}

/**
 * A legacy image: fetched into public/ at the path it already has, and the
 * markup left pointing at that same path. Root-relative rather than absolute so
 * staging serves it too; on the live domain it resolves to the identical URL,
 * which is the whole point.
 *
 * No media row. These are not library uploads — nobody should be able to delete
 * one from the admin's Media screen and break a ranking post.
 */
async function keepLegacy(rel, src) {
  seenImages.set(src, rel)
  const onDisk = path.resolve(PUBLIC_DIR, `.${rel}`)
  if (existsSync(onDisk)) return rel
  if (DRY) { dryImages.add(src); return rel }

  let res
  try {
    res = await fetch(src.startsWith('/') ? `${SITE}${src}` : src, { headers: { 'user-agent': 'RTI-migration/1.0' } })
  } catch { deadImages.add(src); return rel }
  if (!res.ok) { deadImages.add(src); return rel }
  const mime = (res.headers.get('content-type') ?? '').split(';')[0].trim()
  if (!/^image\/(png|jpeg|webp|gif|svg\+xml|avif)$/.test(mime)) { deadImages.add(src); return rel }
  const bytes = Buffer.from(await res.arrayBuffer())
  if (bytes.length === 0) { deadImages.add(src); return rel }

  mkdirSync(path.dirname(onDisk), { recursive: true })
  writeFileSync(onDisk, bytes)
  keptImages.add(rel)
  // The URL does not change, so a failure here costs a broken image, not a
  // broken link — which is why it returns `rel` on every path above.
  return rel
}

/** Downloads one image into the media library and returns our URL for it. */
async function rehost(src) {
  if (!src || KEEP_REMOTE) return null
  if (seenImages.has(src)) return seenImages.get(src)
  if (src.startsWith('/uploads/')) return src
  // Rule 8: our own images keep their path. Everything else gets rehosted.
  const legacy = legacyPath(src)
  if (legacy) return keepLegacy(legacy, src)
  // A dry run reports what it would move without pulling 300 images over the
  // wire — otherwise "show me what this would do" costs as much as doing it.
  if (DRY) { seenImages.set(src, src); dryImages.add(src); return null }

  const known = sql(`SELECT url FROM media WHERE source_url = ${q(src)} LIMIT 1`)
  if (known) { seenImages.set(src, known); return known }

  let res
  try {
    res = await fetch(src, { headers: { 'user-agent': 'RTI-migration/1.0' } })
  } catch { deadImages.add(src); return null }
  if (!res.ok) { deadImages.add(src); return null }
  const mime = (res.headers.get('content-type') ?? '').split(';')[0].trim()
  if (!/^image\/(png|jpeg|webp|gif)$/.test(mime)) { deadImages.add(src); return null }
  const bytes = Buffer.from(await res.arrayBuffer())
  if (bytes.length === 0 || bytes.length > 20 * 1024 * 1024) { deadImages.add(src); return null }

  const now = new Date()
  const folder = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}`
  const filename = safeName(src, mime)
  if (!DRY) {
    mkdirSync(path.join(MEDIA_DIR, folder), { recursive: true })
    writeFileSync(path.join(MEDIA_DIR, folder, filename), bytes)
  }
  const url = `/uploads/${folder}/${filename}`
  const size = imageSize(bytes)
  sql(`INSERT INTO media (filename, url, mime, width, height, bytes, source_url)
       VALUES (${q(filename)}, ${q(url)}, ${q(mime)}, ${qnum(size?.width)}, ${qnum(size?.height)},
               ${qnum(bytes.length)}, ${q(src)})`)
  seenImages.set(src, url)
  movedImages.add(src)
  return url
}

/* Width and height from the file header — the same reader as src/lib/media-store.ts,
   inlined because this script deliberately has no imports from the app. */
function imageSize(b) {
  if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) }
  if (b.length > 10 && b.toString('ascii', 0, 3) === 'GIF') return { width: b.readUInt16LE(6), height: b.readUInt16LE(8) }
  if (b.length > 30 && b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = b.toString('ascii', 12, 16)
    if (chunk === 'VP8 ') return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff }
    if (chunk === 'VP8L') { const bits = b.readUInt32LE(21); return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 } }
    if (chunk === 'VP8X') { const r = (at) => b.readUIntLE(at, 3) + 1; return { width: r(24), height: r(27) } }
    return null
  }
  if (b.length > 4 && b.readUInt16BE(0) === 0xffd8) {
    let at = 2
    while (at + 9 < b.length) {
      if (b[at] !== 0xff) { at++; continue }
      const m = b[at + 1]
      if (m === undefined) return null
      if (m === 0xd8 || m === 0x01 || (m >= 0xd0 && m <= 0xd7)) { at += 2; continue }
      if (m === 0xda || m === 0xd9) return null
      const len = b.readUInt16BE(at + 2)
      const frame = (m >= 0xc0 && m <= 0xc3) || (m >= 0xc5 && m <= 0xc7) || (m >= 0xc9 && m <= 0xcb) || (m >= 0xcd && m <= 0xcf)
      if (frame) return { height: b.readUInt16BE(at + 5), width: b.readUInt16BE(at + 7) }
      at += 2 + len
    }
  }
  return null
}

/** Rewrites every <img src> in a post to our own copy. */
async function rehostBody(html) {
  const srcs = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map((m) => m[1])
  let out = html
  let moved = 0
  for (const src of [...new Set(srcs)]) {
    const before = dryImages.size
    const ours = await rehost(src)
    if (DRY) { moved += dryImages.size - before; continue }
    if (!ours) continue
    out = out.split(src).join(ours)
    moved++
  }
  return { html: out, moved }
}

/* ------------------------------------------------------------------- main */
const slugify = (t) => String(t).toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 80)

say(`\n  ${c.b('WordPress import')}  ${c.dim(SITE)}${DRY ? c.warn('   DRY RUN — nothing will be written') : ''}\n`)

/* ---- categories ---- */
const { data: wpCats } = await getJSON(`${SITE}/wp-json/wp/v2/categories?per_page=100&_fields=id,name,slug,description,count,parent`)
say(`  ${c.ok('✓')} ${wpCats.length} categories on WordPress`)

const catByWpId = new Map()
for (const cat of wpCats) {
  // 100+ so the six WordPress categories sort after the ten planned ones
  // rather than interleaving with them by accident of their WordPress ids.
  const archive = `/category/${cat.slug}/`
  // A category the admin already has under the same slug is reused rather than
  // duplicated; otherwise it is created and marked as coming from WordPress.
  const id = sql(`
    INSERT INTO categories (name, slug, description, sort_order, wp_id, archive_path, source, landing_built)
    VALUES (${q(decode(cat.name))}, ${q(cat.slug)}, ${q(decode(cat.description) || null)},
            ${qnum(100 + wpCats.indexOf(cat))}, ${qnum(cat.id)}, ${q(archive)}, 'wordpress', true)
    ON CONFLICT (slug) DO UPDATE
      SET wp_id = EXCLUDED.wp_id, archive_path = EXCLUDED.archive_path,
          source = 'wordpress', landing_built = true,
          description = COALESCE(categories.description, EXCLUDED.description)
    RETURNING id`)
  // A dry run writes nothing, so there is no id to come back — the WordPress id
  // stands in, which is enough for the counting this mode does.
  catByWpId.set(cat.id, DRY ? cat.id : Number(id))
  say(`     ${c.dim(archive.padEnd(36))} ${decode(cat.name)}  ${c.dim(`${cat.count} posts`)}`)
}

/* ---- tags ----
   Stored as names, not the numeric ids WordPress hands back: an id means
   nothing outside the old install, and the whole point of keeping tags is that
   somebody can read them later. */
const tagBySlug = new Map()
for (let tp = 1; ; tp++) {
  let batch
  try { ({ data: batch } = await getJSON(`${SITE}/wp-json/wp/v2/tags?per_page=100&page=${tp}&_fields=id,name,slug`)) }
  catch { break }
  if (!Array.isArray(batch) || batch.length === 0) break
  for (const t of batch) tagBySlug.set(t.id, decode(t.name))
  if (batch.length < 100) break
}
say(`  ${c.ok('✓')} ${tagBySlug.size} tags`)

/* ---- the author every imported post is filed under ---- */
const authorId = Number(sql(`
  INSERT INTO users (email, name, role, password_hash)
  VALUES ('no-login-wordpress@invalid.local', 'Recycle Technologies', 'author', '')
  ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
  RETURNING id`) || 0) || null

/* ---- posts ---- */
let page = 1, imported = 0, skipped = 0, images = 0
const seenSlugs = new Set()
const report = []

for (;;) {
  const url = `${SITE}/wp-json/wp/v2/posts?per_page=20&page=${page}&status=publish`
    + `&_fields=id,date_gmt,modified_gmt,slug,link,title,content,excerpt,categories,tags,featured_media,author`
  let batch
  try {
    ({ data: batch } = await getJSON(url))
  } catch (err) {
    if (String(err.message).startsWith('400')) break   // past the last page
    throw err
  }
  if (!Array.isArray(batch) || batch.length === 0) break

  for (const post of batch) {
    if (LIMIT && imported >= LIMIT) { batch.length = 0; break }
    const slug = post.slug
    if (seenSlugs.has(slug)) { skipped++; continue }
    seenSlugs.add(slug)

    const live = `${SITE}/${slug}/`
    const meta = await pageMeta(live)

    let body = post.content?.rendered ?? ''
    const { html, moved } = await rehostBody(body)
    body = html; images += moved

    const featured = await rehost(meta.ogImage)
    const catIds = (post.categories ?? []).map((wp) => catByWpId.get(wp)).filter(Boolean)
    // WordPress allows many; the admin's model has one. The first that is not
    // the catch-all "Blog" bucket is the useful one.
    const primary = catIds.find((id) => id !== catByWpId.get(1)) ?? catIds[0] ?? null

    const words = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
    const noindex = /noindex/i.test(meta.robots ?? '')

    sql(`
      INSERT INTO posts (
        slug, title, meta_title, meta_description, excerpt,
        canonical_url, robots_index, in_sitemap,
        content_json, content_html, source, wp_id, og_image_url,
        word_count, reading_minutes, status, category_id, author_id,
        published_at, updated_at, imported_at, tags
      ) VALUES (
        ${q(slug)}, ${q(decode(post.title?.rendered))},
        ${q(meta.title ?? '')}, ${q(meta.description ?? '')},
        ${q(decode(post.excerpt?.rendered ?? '').replace(/<[^>]+>/g, '').trim())},
        ${meta.canonical && meta.canonical !== live ? q(meta.canonical) : 'NULL'},
        ${noindex ? 'false' : 'true'}, ${noindex ? 'false' : 'true'},
        '{"type":"doc","content":[]}'::jsonb, ${q(body)}, 'wordpress', ${qnum(post.id)},
        ${q(featured ?? meta.ogImage ?? null)},
        ${qnum(words)}, ${qnum(Math.max(1, Math.round(words / 225)))},
        'published', ${qnum(primary)}, ${qnum(authorId)},
        ${q(post.date_gmt + 'Z')}::timestamptz, ${q(post.modified_gmt + 'Z')}::timestamptz, now(),
        ${post.tags?.length
          ? `ARRAY[${post.tags.map((t) => q(tagBySlug.get(t) ?? String(t))).join(',')}]::text[]`
          : `'{}'::text[]`}
      )
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title, meta_title = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description, excerpt = EXCLUDED.excerpt,
        canonical_url = EXCLUDED.canonical_url,
        content_html = EXCLUDED.content_html, og_image_url = EXCLUDED.og_image_url,
        word_count = EXCLUDED.word_count, reading_minutes = EXCLUDED.reading_minutes,
        category_id = EXCLUDED.category_id, published_at = EXCLUDED.published_at,
        imported_at = now(), wp_id = EXCLUDED.wp_id
        -- !! source and content_json are NOT overwritten. A post somebody has
        -- already edited in the Publisher stays theirs; re-running the import
        -- must never quietly revert a person's work to the WordPress copy.
        WHERE posts.source = 'wordpress'
    `)

    /* Every category the post is in, not just the primary one. /category/blog/
       has 252 posts behind it on WordPress and almost none of them have Blog as
       their most useful category — reading archives from posts.category_id alone
       would empty that page and 404 an indexed URL. */
    if (catIds.length > 0 && !DRY) {
      const pid = sql(`SELECT id FROM posts WHERE slug = ${q(slug)}`)
      if (pid) {
        sql(`DELETE FROM post_categories WHERE post_id = ${qnum(pid)};
             INSERT INTO post_categories (post_id, category_id) VALUES
             ${catIds.map((cid) => `(${qnum(pid)}, ${qnum(cid)})`).join(', ')}
             ON CONFLICT DO NOTHING`)
      }
    }

    imported++
    report.push({
      slug, url: `/${slug}/`, title: decode(post.title?.rendered),
      description: meta.description ?? '', meta: Boolean(meta.description), images: moved,
    })
    if (imported % 10 === 0) say(`  ${c.dim(`… ${imported} posts`)}`)
  }
  if (LIMIT && imported >= LIMIT) break
  page++
}

/* ---- the URL map, so the build guard knows about every one of them ---- */
const mapPath = path.join(ROOT, 'data', 'wp-urls.csv')
if (!DRY) {
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const rows = ['old_url,type,action,new_url,title,meta_description,source']
  for (const r of report) {
    rows.push([r.url, 'post', 'KEEP', r.url, esc(r.title), esc(r.description), 'wordpress'].join(','))
  }
  for (const cat of wpCats) {
    const u = `/category/${cat.slug}/`
    rows.push([u, 'category', 'KEEP', u, esc(decode(cat.name)), '""', 'wordpress'].join(','))
  }
  writeFileSync(mapPath, rows.join('\n') + '\n', 'utf8')
}

const noMeta = report.filter((r) => !r.meta).length
const moved = DRY ? dryImages.size : movedImages.size

say(`
  ${c.ok(c.b('Done.'))}
    ${c.b(String(imported))} posts     ${c.dim(`${skipped} duplicate slugs skipped`)}
    ${c.b(String(moved))} hotlinked images rehosted    ${c.dim(KEEP_REMOTE ? '(--keep-remote-images was set)' : '')}
    ${c.b(String(keptImages.size))} legacy images kept at their own /wp-content/ path  ${c.dim('-> public/')}
    ${noMeta ? c.warn(`${noMeta} posts have no meta description on the live page`) : c.ok('every post has a meta description')}
    ${DRY ? c.dim('(dry run — nothing written, no images fetched)') : c.dim('URL list written to data/wp-urls.csv')}
`)

/* A dry run counts the image links it FINDS; it does not try to load them,
   because that is the slow half of the job. So it cannot know which are dead —
   only the real run reports that. Saying so beats letting the number look like
   a clean bill of health. */
if (DRY) {
  say(`  ${c.dim('The image count is links found, not links that load — the real run checks.')}\n`)
}

/* !! A LINK THAT WOULD NOT LOAD IS ALREADY BROKEN ON THE LIVE SITE. Most of
   these are lh7-rt.googleusercontent.com — Google Docs' temporary CDN, which a
   writer pasted straight out of a doc. Those URLs expire. This is not damage the
   migration did; it is damage the migration FOUND, and it is worth fixing before
   the pages move, because after the move it will look like the new site's
   fault. */
if (deadImages.size > 0) {
  const google = [...deadImages].filter((u) => u.includes('googleusercontent')).length
  say(`  ${c.warn(c.b(`${deadImages.size} images could not be downloaded.`))}`)
  say(`  ${c.dim('They are already broken on the live site — the HTML still points at them.')}`)
  if (google) say(`  ${c.dim(`${google} are googleusercontent links pasted from Google Docs, which expire.`)}`)
  const list = path.join(ROOT, 'data', 'wp-broken-images.txt')
  if (!DRY) { writeFileSync(list, [...deadImages].join('\n') + '\n', 'utf8'); say(`  ${c.dim(`Full list: data/wp-broken-images.txt`)}`) }
  say('')
}

say(`  Every post is stored exactly as WordPress had it and answers at its original
  address. Opening one in the Publisher converts it to the editor's format —
  nothing on the site changes until somebody saves it.
`)
