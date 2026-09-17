import 'server-only'
import { q } from '@/lib/db'
import type { ContentMeta } from '@/lib/content'

/**
 * Published posts, read from PostgreSQL AT BUILD TIME.
 *
 * !! THIS DOES NOT BREAK CLAUDE.md RULE 2. `dynamic = 'error'` forbids a page
 * from reading REQUEST-time data — cookies, headers, searchParams. Reading a
 * database inside generateStaticParams and a page body is build-time data
 * fetching, exactly like reading MDX off the disk, and the output is the same:
 * fully prerendered HTML. The build guard still reports the pages as static.
 *
 * !! IT ALSO MUST NOT BREAK A BUILD WITH NO DATABASE. Until the import has run,
 * and on any machine that has never set DATABASE_URL, every function here
 * returns nothing and says so once. A migration in progress must never be able
 * to stop the existing site from building.
 */

export type DbPost = ContentMeta & {
  slug: string
  /** 'wordpress' — content is the original markup. 'editor' — ours. */
  source: 'wordpress' | 'editor'
  html: string
  canonical: string | null
  noindex: boolean
  inSitemap: boolean
  categorySlug: string | null
  categoryPath: string | null
  author: string | null
  words: number
}

export type DbCategory = {
  slug: string
  name: string
  description: string | null
  /** The URL this category answers at — /category/<slug>/ for the imported six. */
  path: string
  source: 'planned' | 'wordpress'
  count: number
}

let warned = false
function noDatabase(err: unknown): [] {
  if (!warned) {
    warned = true
    console.warn(
      `\n  [posts-db] No database, so no imported posts are in this build.`
      + `\n             ${(err as Error).message}`
      + `\n             This is expected before \`npm run wp:import\` has run.\n`,
    )
  }
  return []
}

type Row = Record<string, unknown>
const str = (v: unknown) => (v === null || v === undefined ? null : String(v))

function toPost(r: Row): DbPost {
  const slug = String(r.slug)
  const title = String(r.meta_title || r.title || '')
  return {
    slug,
    url: `/${slug}/`,
    type: 'post',
    // meta_title is what Rank Math had on the live page; title is the H1.
    // Keeping them separate is the whole point — they are different strings and
    // the parity crawl diffs both.
    title,
    description: String(r.meta_description ?? ''),
    h1: String(r.title ?? ''),
    date: r.published_at ? new Date(String(r.published_at)).toISOString() : undefined,
    updated: r.updated_at ? new Date(String(r.updated_at)).toISOString() : undefined,
    image: str(r.og_image_url) ?? undefined,
    heroImage: str(r.og_image_url) ?? undefined,
    category: str(r.category_name) ?? undefined,
    readingTime: `${Number(r.reading_minutes ?? 1)} min read`,
    source: r.source === 'wordpress' ? 'wordpress' : 'editor',
    html: String(r.content_html ?? ''),
    canonical: str(r.canonical_url),
    noindex: r.robots_index === false,
    inSitemap: r.in_sitemap !== false,
    categorySlug: str(r.category_slug),
    categoryPath: str(r.category_path),
    author: str(r.author_name),
    words: Number(r.word_count ?? 0),
  }
}

const SELECT = `
  SELECT p.slug, p.title, p.meta_title, p.meta_description, p.content_html, p.source,
         p.canonical_url, p.robots_index, p.in_sitemap, p.og_image_url,
         p.word_count, p.reading_minutes, p.published_at, p.updated_at,
         c.name AS category_name, c.slug AS category_slug, c.archive_path AS category_path,
         u.name AS author_name
    FROM posts p
    LEFT JOIN categories c ON c.id = p.category_id
    LEFT JOIN users u      ON u.id = p.author_id
   WHERE p.status = 'published'
`

let cache: DbPost[] | null = null

export async function allDbPosts(): Promise<DbPost[]> {
  if (cache) return cache
  try {
    const rows = await q<Row>(`${SELECT} ORDER BY p.published_at DESC NULLS LAST, p.id DESC`)
    cache = rows.map(toPost)
    return cache
  } catch (err) {
    cache = noDatabase(err)
    return cache
  }
}

export async function dbPostBySlug(slug: string): Promise<DbPost | null> {
  const all = await allDbPosts()
  return all.find((p) => p.slug === slug) ?? null
}

/**
 * Cached for the same reason allDbPosts is, and more urgently: the header's
 * Blogs menu reads this, and the header is on every one of the ~380 pages the
 * build prerenders. Uncached that is 380 round trips to Postgres to render the
 * same six rows.
 */
let catCache: DbCategory[] | null = null

export async function dbCategories(): Promise<DbCategory[]> {
  if (catCache) return catCache
  try {
    const rows = await q<Row>(`
      SELECT c.slug, c.name, c.description, c.archive_path, c.source,
             -- counted through the join, for the same reason the archive is
             (SELECT count(*) FROM post_categories pc
                JOIN posts p ON p.id = pc.post_id
               WHERE pc.category_id = c.id AND p.status = 'published') AS n
        FROM categories c
       WHERE c.archive_path IS NOT NULL
       ORDER BY c.sort_order, c.name`)
    catCache = rows.map((r) => ({
      slug: String(r.slug),
      name: String(r.name),
      description: str(r.description),
      path: String(r.archive_path),
      source: r.source === 'wordpress' ? 'wordpress' : 'planned',
      count: Number(r.n ?? 0),
    }))
    return catCache
  } catch (err) {
    catCache = noDatabase(err)
    return catCache
  }
}

/** The categories that actually have posts and therefore deserve an archive. */
export async function liveDbCategories(): Promise<DbCategory[]> {
  return (await dbCategories()).filter((c) => c.source === 'wordpress' && c.count > 0)
}

/**
 * !! READS post_categories, NOT posts.category_id.
 *
 * A post belongs to one category in the editor and to as many as WordPress gave
 * it in reality — nearly all of them are in both "Blog" and something useful.
 * Filtering on the single editorial column would leave /category/blog/ empty,
 * which is an indexed URL with 252 posts behind it. See db/003_wordpress.sql.
 */
export async function dbPostsInCategory(slug: string): Promise<DbPost[]> {
  try {
    const rows = await q<Row>(`${SELECT}
       AND p.id IN (
             SELECT pc.post_id FROM post_categories pc
               JOIN categories cc ON cc.id = pc.category_id
              WHERE cc.slug = $1)
     ORDER BY p.published_at DESC NULLS LAST, p.id DESC`, [slug])
    return rows.map(toPost)
  } catch (err) {
    return noDatabase(err)
  }
}
