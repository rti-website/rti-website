import type { MetadataRoute } from 'next'

/**
 * <changefreq> and <priority> for /sitemap.xml, from the SEO team's
 * sitemap-updated.xml (9 Oct 2026). Their file listed 109 URLs, every one
 * of which this sitemap already carried; what it added was these two fields.
 * The URL list itself stays generated (src/app/sitemap.ts), so the posts,
 * the city service pages and every new location page stay in, and <lastmod>
 * stays each page's real date rather than one date for every URL.
 *
 * Google ignores both fields; other crawlers may read them. Exact values for
 * the SEO file's URLs; the same scheme for the rest:
 *   location pages   monthly 0.6 (the state and shredding hubs 0.7)
 *   blog posts       monthly 0.5
 *   pagination       weekly  0.3
 *   anything else    monthly 0.5
 */
type Freq = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>
type Rank = { changeFrequency: Freq; priority: number }

const m = (priority: number): Rank => ({ changeFrequency: 'monthly', priority })

const EXACT: Record<string, Rank> = {
  '/': { changeFrequency: 'weekly', priority: 1.0 },
  // Core pages
  '/about-us-commercial-recycling-solutions/': m(0.8),
  '/why-choose-us/': m(0.8),
  '/certifications/': m(0.8),
  '/sustainability/': m(0.7),
  '/compliance-center/': m(0.6),
  '/case-studies/': m(0.6),
  '/resources/': m(0.6),
  '/downloads/': m(0.5),
  '/faqs/': m(0.6),
  '/contact-us/': m(0.8),
  '/quote/': m(0.9),
  '/request-a-pickup/': m(0.9),
  '/dropoff/': m(0.7),
  '/all-locations/': m(0.8),
  // Services
  '/services/': m(0.9),
  '/it-asset-disposition/': m(0.9),
  '/itad-recycling-guides/': m(0.6),
  '/hard-drive-destruction-services/': m(0.9),
  '/paper-shredding-services/': m(0.9),
  '/off-site-shredding/': m(0.8),
  '/phone-shredding-service/': m(0.8),
  '/electronics-recycling-kit/': m(0.9),
  '/mail-in-recycling/': m(0.9),
  '/light-bulbs/': m(0.8),
  '/electronic-recycle/': m(0.8),
  '/battery-recycling/': m(0.8),
  '/ballasts/': m(0.7),
  '/tv-recycling/': m(0.8),
  '/airbag-recycling/': m(0.7),
  // Blog
  '/blog/': { changeFrequency: 'weekly', priority: 0.6 },
  '/category/uncategorized/': { changeFrequency: 'weekly', priority: 0.3 },
  // Location hubs
  '/minnesota-recycling/': m(0.7),
  '/wisconsin-recycling/': m(0.7),
  '/shredding-minnesota/': m(0.7),
  '/shredding-wisconsin/': m(0.7),
  // Legal
  '/privacy-policy/': { changeFrequency: 'yearly', priority: 0.3 },
  '/terms-of-services/': { changeFrequency: 'yearly', priority: 0.3 },
  '/cookies-and-personal-information/': { changeFrequency: 'yearly', priority: 0.3 },
}

/** The rank for one sitemap path (with its trailing slash). */
export function sitemapRank(path: string, kind: { location: boolean; post: boolean }): Rank {
  const exact = EXACT[path]
  if (exact) return exact
  if (/\/page\/\d+\/$/.test(path)) return { changeFrequency: 'weekly', priority: 0.3 }
  if (path.startsWith('/category/')) return { changeFrequency: 'weekly', priority: 0.4 }
  if (path.startsWith('/industries/')) return m(0.7)
  if (kind.location) return m(0.6)
  if (kind.post) return m(0.5)
  return m(0.5)
}
