import type { MetadataRoute } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { allContent } from '@/lib/content'
import { sitemapEntry } from '@/lib/seo'
import { allDbPosts, dbPostsInCategory, liveDbCategories } from '@/lib/posts-db'
import { blogPagePath, categoryPagePath, pageCount, pageSlice } from '@/lib/blog-index'
import { LOCAL_FACILITY_URLS as FIXED_FACILITY_URLS } from '@/data/local-pages'
import { COUNTY_URLS } from '@/data/county-pages'
import { sitemapRank } from '@/lib/sitemap-priority'
import { absolute } from '@/lib/urls'

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
  /* The six fixed city service pages under /minnesota-recycling/ and
     /wisconsin-recycling/ (27 Sep 2026) live in [service] folders, which the
     walk below skips, so they are listed by name. Indexed by Asim's choice
     ("yes, index them"), though nothing in the menus links to them. */
  // The eleven county pages (29 Sep 2026) live in the same [service] folders.
  const staticPages = ['/', ...explicitRoutes(), ...FIXED_FACILITY_URLS, ...COUNTY_URLS]
  const [posts, categories] = await Promise.all([allDbPosts(), liveDbCategories()])
  const listed = posts.filter((p) => p.inSitemap && !p.noindex)
  const locationPaths = new Set([...FIXED_FACILITY_URLS, ...COUNTY_URLS])
  const postPaths = new Set(listed.map((p) => p.url))

  /*
   * EVERY URL CARRIES A <lastmod> — 26 Sep 2026. The SEO team's audit found
   * 41 static pages and every category and pagination URL without one (the
   * posts and the MDX pages already had theirs). Three sources, none of
   * them invented:
   *
   *   static page   the last git commit that touched the page and the data
   *                 and section files it renders (pageLastModified below);
   *   /blog/ and    the newest post's date, because that is what changed on
   *   /blog/page/N  the page: the posts it lists;
   *   category      the newest post in that category, same reasoning.
   *
   * This file prerenders at build time, so every `npm run build` (every
   * deploy) regenerates the whole sitemap with today's dates for whatever
   * changed, and publishing from the admin revalidates it in between. There
   * is no separate step to run.
   */
  const newest = (ps: { updated?: string; date?: string }[]): string | undefined =>
    ps.map((p) => p.updated ?? p.date).filter((x): x is string => Boolean(x)).sort().at(-1)
  const inCategory = new Map(await Promise.all(
    categories.map(async (c) => [c.slug, (await dbPostsInCategory(c.slug)).filter((p) => p.inSitemap && !p.noindex)] as const),
  ))

  const entries = [
    ...staticPages.map((u) => sitemapEntry(u, u === '/blog/' ? newest(listed) : pageLastModified(u))),
    // Never a noindexed page (/thank-you/, 1 Oct 2026).
    ...allContent().filter((e) => !e.noindex).map((e) => sitemapEntry(e.url, e.updated ?? e.date)),
    ...listed.map((p) => sitemapEntry(p.url, p.updated ?? p.date)),
    ...categories.map((c) => sitemapEntry(c.path, newest(inCategory.get(c.slug) ?? []))),
    // Pagination, for /blog/ and for each archive. Deep posts are otherwise
    // several clicks from anything Google has a reason to crawl.
    ...Array.from({ length: pageCount(posts.length) - 1 }, (_, i) =>
      sitemapEntry(blogPagePath(i + 2), newest(pageSlice(listed, i + 2)))),
    ...categories.flatMap((c) =>
      // c.count is counted through post_categories, which is the same set the
      // archive route lists — see dbPostsInCategory().
      Array.from({ length: pageCount(c.count) - 1 }, (_, i) =>
        sitemapEntry(categoryPagePath(c.slug, i + 2), newest(pageSlice(inCategory.get(c.slug) ?? [], i + 2))))),
  ].map((e) => ({ ...e, lastModified: e.lastModified ?? BUILD_TIME }))
    // changefreq and priority, the SEO team's scheme (9 Oct 2026, lib/sitemap-priority.ts).
    .map((e) => {
      const p = e.url.slice(absolute('/').length - 1)
      return { ...e, ...sitemapRank(p, { location: locationPaths.has(p) || /-chicago\/$/.test(p), post: postPaths.has(p) }) }
    })

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

/** The build's own time, the honest fallback for a page nothing else dates. */
const BUILD_TIME = new Date().toISOString()

/**
 * When a static page last changed: the newest git commit touching its
 * page.tsx OR any file it renders from — the src/data/ file that holds its
 * copy, and the section components under src/app/<route>/ and
 * src/components/sections/ (not the shared header, footer and ui pieces,
 * which would move every page's date whenever the footer is edited).
 *
 * `git log -1 -- <files>` gives the latest commit across the whole set in
 * one call, so this is one git invocation per page, about fifty at build
 * time. On a checkout without git history (a tarball, a sandbox) it falls
 * back to the newest mtime of those files, and if even that fails, to the
 * build time. Never throws: a sitemap date is not worth a failed build.
 */
function pageLastModified(route: string): string | undefined {
  const APP = path.join(process.cwd(), 'src', 'app')
  const parts = route.split('/').filter(Boolean)
  let page = path.join(APP, ...parts, 'page.tsx')
  // The fixed city service pages render from a [service] folder.
  if (!fs.existsSync(page)) page = path.join(APP, ...parts.slice(0, -1), '[service]', 'page.tsx')
  if (!fs.existsSync(page)) return undefined
  const files = renderedFiles(page)
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...files], {
      cwd: process.cwd(), encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 5000,
    }).trim()
    if (out) return new Date(out).toISOString()
  } catch { /* no git, or not a repository */ }
  try {
    const t = Math.max(...files.map((f) => fs.statSync(f).mtimeMs))
    if (Number.isFinite(t)) return new Date(t).toISOString()
  } catch { /* fall through */ }
  return undefined
}

/** page.tsx plus the data and section files it imports, three levels deep. */
function renderedFiles(page: string): string[] {
  const SRC = path.join(process.cwd(), 'src')
  const seen = new Set<string>()
  const walk = (file: string, depth: number) => {
    if (seen.has(file) || depth > 3) return
    seen.add(file)
    let text = ''
    try { text = fs.readFileSync(file, 'utf8') } catch { return }
    for (const m of text.matchAll(/from\s+['"](@\/(?:data|components\/sections)\/[^'"]+|\.\.?\/[^'"]+)['"]/g)) {
      const spec = m[1]!
      if (/\/sections\/(Header|Footer|TopBar)\b/.test(spec)) continue
      const base = spec.startsWith('@/') ? path.join(SRC, spec.slice(2)) : path.resolve(path.dirname(file), spec)
      const hit = ['', '.ts', '.tsx', '/index.ts', '/index.tsx'].map((x) => base + x).find((f) => fs.existsSync(f) && fs.statSync(f).isFile())
      if (hit && hit.startsWith(SRC)) walk(hit, depth + 1)
    }
  }
  walk(page, 0)
  return [...seen]
}
