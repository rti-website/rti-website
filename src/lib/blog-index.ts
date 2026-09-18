import 'server-only'
import { allDbPosts, liveDbCategories, type DbCategory, type DbPost } from '@/lib/posts-db'
import { ARTICLES as FALLBACK_ARTICLES } from '@/data/blog'
import type { CardPost } from '@/components/ui/PostCard'

/**
 * What /blog/ and /blog/page/N/ put on the page.
 *
 * WHY THIS IS PAGINATED AND NOT ONE LONG LIST: the import brought in 307 posts.
 * Three hundred cards is roughly a third of a megabyte of HTML on a page the
 * header links to from every route, and Asim's brief for this build is
 * "milliseconds". WordPress paginated this URL too — data/url-map.csv carries a
 * 301 from /page/2/ to /blog/page/2/ — so paginating is also the replatform
 * answer rather than a new structure. Twelve per page is four full rows of the
 * frame's three-up grid.
 *
 * WHY THE CHIPS ARE LINKS AND NOT A FILTER: they used to be a client component
 * holding useState over ten hardcoded rows. With pagination a client-side
 * filter would only ever filter the twelve cards on screen, which is worse than
 * useless. The six WordPress categories already answer at /category/<slug>/ —
 * those pages exist and are indexed — so each chip is simply that link. The
 * side effect is that the blog index ships no client JavaScript at all.
 */

export const PER_PAGE = 12

/**
 * The categories the site offers as navigation — the ones that came out of
 * WordPress and have at least one published post behind them.
 *
 * ALL OF THEM, including "Blog" and "Uncategorized". I had filtered those two
 * out on the grounds that Blog holds 252 of the 307 and therefore duplicates
 * "All Articles", and that Uncategorized is WordPress's default bucket rather
 * than a subject. Asim asked on 17 Sep 2026 for the categories we fetched from
 * WordPress, so the categories we fetched from WordPress is what these are.
 * Tidying the taxonomy is the second-wave job that needs 301s anyway.
 *
 * Feeds both the chip row on /blog/ and /category/, and the Blogs menu in the
 * header, so those three can never disagree about what a category is.
 */
export async function blogChips(): Promise<DbCategory[]> {
  return liveDbCategories()
}

/**
 * The Blogs mega-menu's two columns — Figma 6503:8116 draws five rows in each.
 *
 * Split down the middle rather than filling the first column to five, because
 * six categories would otherwise render as a column of five beside a column of
 * one. If the list ever grows past ten the panel grows with it, which is
 * better than silently dropping a category out of the nav.
 *
 * Empty when there is no database. The menu then falls back to a single row
 * pointing at /blog/ — see src/components/sections/Header.tsx. It used to hold
 * ten rows with href="#", every one of them inert.
 */
export async function blogMenuColumns(): Promise<{ title: string; href: string }[][]> {
  const cats = await blogChips()
  if (cats.length === 0) return []
  const half = Math.ceil(cats.length / 2)
  const rows = cats.map((c) => ({ title: c.name, href: c.path }))
  return [rows.slice(0, half), rows.slice(half)]
}

function toCard(p: DbPost): CardPost {
  return {
    url: p.url,
    // The H1, not the SEO title: the frame's cards carry the headline, and a
    // Rank Math title is written for a SERP ("... | Recycle Technologies").
    title: p.h1 || p.title,
    category: p.category,
    date: p.date,
  }
}

/**
 * Every published post, newest first, as cards.
 *
 * Falls back to the ten hardcoded rows when there is no database — a fresh
 * clone, or CI. That is the behaviour this page had before the import, so
 * nothing regresses on a machine that has never run `npm run wp:import`.
 */
export async function blogCards(): Promise<CardPost[]> {
  const posts = await allDbPosts()
  if (posts.length > 0) return posts.map(toCard)
  return FALLBACK_ARTICLES.map((a) => ({
    url: a.href, title: a.title, category: a.category, date: a.date, glyph: a.glyph,
  }))
}

export function pageCount(total: number): number {
  return Math.max(1, Math.ceil(total / PER_PAGE))
}

/** 1-based. Page 1 is /blog/; page N is /blog/page/N/. */
export function pageSlice<T>(all: T[], page: number): T[] {
  return all.slice((page - 1) * PER_PAGE, page * PER_PAGE)
}

/** /blog/ for page 1 — never /blog/page/1/, which would be a duplicate URL. */
export function blogPagePath(page: number): string {
  return page <= 1 ? '/blog/' : `/blog/page/${page}/`
}

/** The same rule for a category archive: page 1 is the bare archive URL. */
export function categoryPagePath(slug: string, page: number): string {
  return page <= 1 ? `/category/${slug}/` : `/category/${slug}/page/${page}/`
}

/**
 * "2" -> 2. Anything else — "1", "0", "02", "abc", "2.5" — is not a page.
 *
 * Page 1 is rejected on purpose: /blog/page/1/ and /category/x/page/1/ would be
 * second URLs for lists that already answer at /blog/ and /category/x/, which
 * is the duplicate-content problem a replatform exists to avoid.
 *
 * !! THIS WAS /^[2-9]\d*$/ AND IT 404ed PAGES 10 TO 19. The class was written
 * to exclude page 1 and it excluded every number that *starts* with a 1 — so
 * with 307 posts at twelve a page, ten of the twenty-six pages were built,
 * listed in the sitemap, linked from the pager, and then refused by the route
 * that had just prerendered them. The digit test and the page-1 test are two
 * different rules; they are now two different lines.
 */
export function pageNumberParam(raw: string): number | null {
  if (!/^[1-9]\d*$/.test(raw)) return null
  const n = Number(raw)
  return n >= 2 ? n : null
}
