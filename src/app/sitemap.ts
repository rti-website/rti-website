import type { MetadataRoute } from 'next'
import fs from 'node:fs'
import path from 'node:path'
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
  // /quote/ came out on 21 Sep 2026: it is a KEEP row in url-map.csv with no
  // page in this build, so listing it here advertised a 404 to Google. It goes
  // back the day that page exists — until then every "Get a Quote" button
  // points at /contact-us/ instead (see QUOTE_HREF in lib/urls.ts).
  /*
   * EVERY EXPLICIT ROUTE, READ OFF THE APP FOLDER — not a hand-kept list.
   *
   * Until 22 Sep 2026 this was six strings: '/', '/blog/', '/services/',
   * '/all-locations/', '/faqs/', '/contact-us/'. Thirteen service pages, eight
   * industry pages, About, Why Choose Us, Certifications, Sustainability,
   * Compliance Center, Case Studies, Resources, Downloads, the ITAD guides and
   * Mail-In — thirty-odd built pages — were not in the sitemap at all, and the
   * two facility pages built that day would have joined them. Same quiet
   * regression as the imported posts, one layer up.
   *
   * So the list is now the folders under src/app that carry a page.tsx, walked
   * at build time (this file prerenders to a static sitemap.xml — the build
   * guard says so — so reading the filesystem here is build-time, not
   * request-time, and rule 2 is untouched). /admin and /api are not pages;
   * the catch-all is covered by allContent() below.
   */
  const staticPages = ['/', ...explicitRoutes()]
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

/**
 * Every folder under src/app with a page.tsx, as a URL path — the same walk
 * scripts/check-overlaps.mjs and check-clickable.mjs use to find pages to test,
 * so what QA covers and what the sitemap advertises cannot drift apart.
 */
function explicitRoutes(): string[] {
  const APP = path.join(process.cwd(), 'src', 'app')
  const out: string[] = []
  const walk = (dir: string, prefix: string) => {
    for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!d.isDirectory() || d.name.startsWith('[') || d.name.startsWith('_')) continue
      if (prefix === '' && (d.name === 'admin' || d.name === 'api')) continue
      const route = `${prefix}/${d.name}`
      const page = path.join(dir, d.name, 'page.tsx')
      // A page that sets `noindex: true` (the Google Ads state pages, e.g.
      // /light-bulbs/Minnesota/) stays out: never list a noindexed URL.
      if (fs.existsSync(page) && !/\bnoindex:\s*true\b/.test(fs.readFileSync(page, 'utf8'))) out.push(`${route}/`)
      walk(path.join(dir, d.name), route)
    }
  }
  walk(APP, '')
  return out.sort()
}
