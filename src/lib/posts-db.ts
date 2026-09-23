import 'server-only'
import { cache as perRequest } from 'react'
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
 * !! IT MUST NOT BREAK A BUILD ON A MACHINE WITH NO DATABASE CONFIGURED. On a
 * fresh clone, or in CI, DATABASE_URL is unset: every function here returns
 * nothing and says so once. A migration in progress must never stop the
 * existing site from building.
 *
 * !! BUT A CONFIGURED DATABASE THAT FAILS TO ANSWER STOPS THE BUILD. That is a
 * different thing entirely and it used to be silent — see noDatabase() below.
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
  /** The post editor's tracking switches (db/006) — see src/lib/tracking.ts. */
  tracking: { disabled: boolean; excluded: boolean; dataLayer: Record<string, unknown> | null; trackingId: string | null }
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

/**
 * What to do when a read fails.
 *
 * !! IT DEPENDS ENTIRELY ON WHETHER DATABASE_URL IS SET, AND IT DID NOT USED TO.
 * Two completely different situations were taking the same path:
 *
 *   1. There is no database configured. A fresh clone, a contributor working on
 *      the static pages, CI. Building without the imported posts is correct, and
 *      a warning is the right response.
 *
 *   2. A database IS configured and the read failed anyway — it is down, the
 *      password is wrong, or the pool timed out under build load. Returning an
 *      empty list here ships a blog index with no articles, a sitemap missing
 *      304 URLs and category pages with nothing on them, and the build still
 *      exits 0. Nothing downstream can tell the difference.
 *
 * The second one is the dangerous one, and it happened on the dev server on
 * 18 Sep 2026: the connect timeout was exceeded mid-build and the only trace was
 * one warning in several hundred lines of output. So a configured-but-unreachable
 * database now throws and stops the build, which is the same reasoning as
 * `dynamic = 'error'` in app/layout.tsx — a loud failure beats a quiet lie.
 */
let warned = false
function noDatabase(err: unknown): [] {
  const message = (err as Error).message

  if (process.env.DATABASE_URL) {
    throw new Error(
      `Could not read posts, and DATABASE_URL is set — so this is a broken `
      + `connection, not a missing one:\n    ${message}\n`
      + `  Refusing to build a site with no articles in it. Check the database `
      + `is running and that DATABASE_URL is right.`,
    )
  }

  if (!warned) {
    warned = true
    console.warn(
      `\n  [posts-db] No DATABASE_URL, so no imported posts are in this build.`
      + `\n             ${message}`
      + `\n             This is expected before \`npm run db:setup\` has run.\n`,
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
    tracking: {
      disabled: r.tracking_disabled === 'true' || r.tracking_disabled === true,
      excluded: r.analytics_excluded === 'true' || r.analytics_excluded === true,
      dataLayer: r.custom_datalayer && typeof r.custom_datalayer === 'object' && !Array.isArray(r.custom_datalayer)
        ? r.custom_datalayer as Record<string, unknown> : null,
      trackingId: str(r.custom_tracking_id),
    },
  }
}

const SELECT = `
  SELECT p.slug, p.title, p.meta_title, p.meta_description, p.content_html, p.source,
         p.canonical_url, p.robots_index, p.in_sitemap, p.og_image_url,
         p.word_count, p.reading_minutes, p.published_at, p.updated_at,
         c.name AS category_name, c.slug AS category_slug, c.archive_path AS category_path,
         u.name AS author_name,
         -- db/006 tracking switches, read through to_jsonb so a database that
         -- has not run 006 yet reads NULL instead of failing the build.
         (to_jsonb(p) ->> 'tracking_disabled')  AS tracking_disabled,
         (to_jsonb(p) ->> 'analytics_excluded') AS analytics_excluded,
         (to_jsonb(p) ->  'custom_datalayer')   AS custom_datalayer,
         (to_jsonb(p) ->> 'custom_tracking_id') AS custom_tracking_id
    FROM posts p
    LEFT JOIN categories c ON c.id = p.category_id
    LEFT JOIN users u      ON u.id = p.author_id
   WHERE p.status = 'published'
`

/*
 * !! CACHED FOR THE WHOLE PROCESS DURING A BUILD, AND PER REQUEST AFTER IT.
 *
 * A build prerenders ~430 pages in a handful of workers, and every page reads
 * these lists (the header's Blogs menu alone is on all of them), so each worker
 * keeps one copy for the whole build. That was the only mode until 23 Sep 2026
 * and at run time it was wrong: after the build, `next start` regenerates a page
 * on demand when the admin calls revalidatePath(), and a process-wide copy
 * handed that regeneration the rows read BEFORE the save. The admin said
 * "saved", the page never changed, and nothing logged a thing. Found testing
 * the per-post tracking switches; it applied to every post edit.
 *
 * So the long copy is build-only (NEXT_PHASE is set by `next build` before its
 * workers start). At run time React's cache() shares one read between
 * generateMetadata, the page and the header of a single request, and the next
 * request reads again.
 */
const BUILD = process.env.NEXT_PHASE === 'phase-production-build'

function buildOnce<T>(load: () => Promise<T>): () => Promise<T> {
  const once = perRequest(load)
  let kept: Promise<T> | null = null
  return () => (BUILD ? (kept ??= once()) : once())
}

export const allDbPosts = buildOnce(async (): Promise<DbPost[]> => {
  try {
    const rows = await q<Row>(`${SELECT} ORDER BY p.published_at DESC NULLS LAST, p.id DESC`)
    return rows.map(toPost)
  } catch (err) {
    return noDatabase(err)
  }
})

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
export const dbCategories = buildOnce(async (): Promise<DbCategory[]> => {
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
    return rows.map((r) => ({
      slug: String(r.slug),
      name: String(r.name),
      description: str(r.description),
      path: String(r.archive_path),
      source: r.source === 'wordpress' ? 'wordpress' : 'planned',
      count: Number(r.n ?? 0),
    }))
  } catch (err) {
    return noDatabase(err)
  }
})

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
/*
 * !! THIS USED TO RUN A QUERY PER CALL, AND THE QUERY RETURNED FULL POST BODIES.
 * Every category page calls it three times — generateStaticParams, then
 * generateMetadata, then the page itself — and the "blog" category holds 252
 * posts, so each call shipped several megabytes of content_html over one of a
 * worker's four connections. Forty-three category URLs across seven workers
 * made that ~90 heavy queries in a burst; the build passed once by luck and on
 * the next run the pool waited out its 30 seconds and the guard above stopped
 * it. Found on the dev server, 18 Sep 2026.
 *
 * allDbPosts() and dbCategories() are cached for exactly this reason and this
 * one had been missed. Now membership is one small cached query — two columns,
 * no bodies — and the posts themselves come from the already-cached list. Per
 * worker that is two queries for the whole build instead of ninety.
 *
 * Order is preserved: allDbPosts() is sorted the way the old query was, and a
 * filter does not reorder.
 */
const categoryMembership = buildOnce(async (): Promise<Map<string, Set<string>>> => {
  try {
    const rows = await q<{ cat: string; post: string }>(`
      SELECT cc.slug AS cat, p.slug AS post
        FROM post_categories pc
        JOIN categories cc ON cc.id = pc.category_id
        JOIN posts p       ON p.id  = pc.post_id
       WHERE p.status = 'published'`)
    const m = new Map<string, Set<string>>()
    for (const r of rows) {
      let set = m.get(r.cat)
      if (!set) { set = new Set(); m.set(r.cat, set) }
      set.add(r.post)
    }
    return m
  } catch (err) {
    noDatabase(err)            // throws when DATABASE_URL is set; warns otherwise
    return new Map()
  }
})

export async function dbPostsInCategory(slug: string): Promise<DbPost[]> {
  const [all, m] = await Promise.all([allDbPosts(), categoryMembership()])
  const wanted = m.get(slug)
  if (!wanted) return []
  return all.filter((p) => wanted.has(p.slug))
}
