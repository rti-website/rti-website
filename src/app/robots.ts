import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'
import { absolute } from '@/lib/urls'

export default function robots(): MetadataRoute.Robots {
  // Staging blocks everything. Production allows everything, including the AI
  // crawlers — they read raw HTML and this site is fully prerendered, so there
  // is nothing to gain by blocking them and visibility to lose.
  if (SITE.noindex) {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }
  return {
    rules: [{
      userAgent: '*',
      allow: '/',
      // The admin is already noindex, but there is no reason to spend anyone's
      // crawl budget on a login screen, and /api/admin/* answers 401 to a
      // crawler, which shows up as a wall of errors in Search Console.
      disallow: ['/admin/', '/api/'],
    }],
    // The location pages have their own file (SEO brief, 24 Sep 2026).
    sitemap: [absolute('/sitemap.xml'), absolute('/sitemap-locations.xml')],
    host: SITE.origin,
  }
}
