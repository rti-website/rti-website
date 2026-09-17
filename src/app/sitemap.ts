import type { MetadataRoute } from 'next'
import { allContent } from '@/lib/content'
import { sitemapEntry } from '@/lib/seo'
import { allDbPosts, liveDbCategories } from '@/lib/posts-db'
import { blogPagePath, categoryPagePath, pageCount } from '@/lib/blog-index'

/**
 * Only KEEP URLs. Never a redirected URL, never a noindexed URL — a sitemap
 * full of 301s is one of the flags the launch gate checks for.
 *
 * !! THE IMPORTED POSTS HAVE TO BE IN HERE. This file used to list the static
 * routes and the MDX manifest, which was the whole site until `npm run
 * wp:import` brought 307 posts in from WordPress. Those posts are built, they
 * are linked from /blog/, and they were silently absent from the sitemap —
 * exactly the kind of quiet regression CLAUDE.md is written to prevent. A post
 * is included unless the row says otherwise: in_sitemap false, or robots_index
 * false, both of which come straight off Rank Math.
 *
 * Async because it reads the database. That is build-time data, the same
 * argument as lib/posts-db.ts, and the output is still a prerendered file —
 * the build guard reports /sitemap.xml as static.
 *
 * Note: Next does not apply `trailingSlash` to strings you emit here, so the
 * slash comes from sitemapEntry() -> urls.path(). Do not build these by hand.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ['/', '/blog/', '/services/', '/all-locations/', '/faqs/', '/contact-us/', '/quote/']
  const [posts, categories] = await Promise.all([allDbPosts(), liveDbCategories()])

  const entries = [
    ...staticPages.map((u) => sitemapEntry(u)),
    ...allContent().map((e) => sitemapEntry(e.url, e.updated ?? e.date)),
    ...posts
      .filter((p) => p.inSitemap && !p.noindex)
      .map((p) => sitemapEntry(p.url, p.updated ?? p.date)),
    ...categories.map((c) => sitemapEntry(c.path)),
    // Pagination, for /blog/ and for each archive. Deep posts are otherwise
    // several clicks from anything Google has a reason to crawl.
    ...Array.from({ length: pageCount(posts.length) - 1 }, (_, i) => sitemapEntry(blogPagePath(i + 2))),
    ...categories.flatMap((c) =>
      // c.count is counted through post_categories, which is the same set the
      // archive route lists — see dbPostsInCategory().
      Array.from({ length: pageCount(c.count) - 1 }, (_, i) => sitemapEntry(categoryPagePath(c.slug, i + 2)))),
  ]

  /* A slug can arrive twice — content/posts/recycle-symbol.mdx and the imported
     row for the same URL both exist while the migration is half done. First
     one wins, which is the MDX file, because that is what the catch-all route
     actually serves. */
  const seen = new Set<string>()
  return entries.filter((e) => (seen.has(e.url) ? false : (seen.add(e.url), true)))
}
