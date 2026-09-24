import { absolute } from '@/lib/urls'
import { SERVICE_SLUGS } from '@/data/service-locations'
import { isPartnerHub, loadLocations, pageUrl } from '@/lib/service-locations'

/**
 * /sitemap-locations.xml — the location pages' own sitemap, as the SEO brief
 * asks (24 Sep 2026): every PUBLISHED partner hub (/locations/<site>/) and
 * every PUBLISHED service page, at any site. Drafts are never in it. The
 * Minnesota and Wisconsin hubs are the facility pages, already in
 * /sitemap.xml. robots.txt lists both files.
 *
 * Static, like /sitemap.xml, and regenerated every five minutes: a page
 * published or taken down in Admin -> Locations shows here within five
 * minutes. revalidatePath() from the admin save does NOT refresh a static
 * route handler (tested 24 Sep 2026: the pages updated at once, this file
 * did not), so the time based period is what keeps it current; without it
 * the file would only change on the next deploy.
 */
export const dynamic = 'force-static'
export const revalidate = 300

export async function GET(): Promise<Response> {
  const all = await loadLocations()
  const urls: { loc: string; lastmod: string | null }[] = []
  for (const site of all.sites) {
    if (isPartnerHub(site) && site.published) urls.push({ loc: absolute(site.hubPath), lastmod: site.updatedAt })
    for (const svc of SERVICE_SLUGS) {
      const page = all.pages.find((p) => p.site === site.slug && p.service === svc)
      if (page?.published && site.published) urls.push({ loc: absolute(pageUrl(site, svc)), lastmod: page.updatedAt })
    }
  }
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${esc(u.loc)}</loc>${u.lastmod ? `<lastmod>${new Date(u.lastmod).toISOString()}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`
  return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8' } })
}
