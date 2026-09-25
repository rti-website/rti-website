/**
 * What kind of page a URL is, for the dataLayer's page_view_custom event
 * (page_type / page_name / page_category — the SEO brief, 23 Sep 2026).
 *
 * GTM should not have to guess this from the URL itself; the site knows. The
 * result is written into every page as <meta name="rti:page-type"> etc. by
 * buildMetadata() and read by the tracking bootstrap (src/lib/tracking.ts).
 *
 * A new page falls through to 'page' until it is listed here — worth a line
 * whenever a page is added, so reports group it with its siblings.
 */

export type PageType =
  | 'home' | 'service_hub' | 'service' | 'service_state' | 'industry_hub' | 'industry'
  | 'location_hub' | 'location' | 'location_service' | 'resource' | 'blog' | 'blog_category' | 'blog_post'
  | 'company' | 'contact' | 'legal' | 'utility' | 'page'

const SERVICES = new Set([
  '/electronic-recycle/', '/battery-recycling/', '/light-bulbs/', '/ballasts/', '/tv-recycling/',
  '/airbag-recycling/', '/hard-drive-destruction-services/', '/paper-shredding-services/',
  '/off-site-shredding/', '/phone-shredding-service/', '/it-asset-disposition/', '/mail-in-recycling/',
  '/electronics-recycling-kit/',
])
const RESOURCES = new Set([
  '/resources/', '/downloads/', '/faqs/', '/case-studies/', '/compliance-center/', '/itad-recycling-guides/',
])
const COMPANY = new Set([
  '/about-us-commercial-recycling-solutions/', '/why-choose-us/', '/certifications/', '/sustainability/',
])
const LEGAL = new Set(['/privacy-policy/', '/terms-of-services/', '/cookies-and-personal-information/'])

const CATEGORY: Record<PageType, string> = {
  home: 'Home', service_hub: 'Services', service: 'Services', service_state: 'Services', industry_hub: 'Industries', industry: 'Industries',
  location_hub: 'Locations', location: 'Locations', location_service: 'Locations', resource: 'Resources', blog: 'Blog', blog_category: 'Blog',
  blog_post: 'Blog', company: 'Company', contact: 'Contact', legal: 'Legal', utility: 'Utility', page: 'Other',
}

export function pageType(url: string, isPost: boolean): PageType {
  if (isPost) return 'blog_post'
  if (url === '/') return 'home'
  if (url === '/services/') return 'service_hub'
  if (SERVICES.has(url)) return 'service'
  // The Google Ads state pages, /light-bulbs/Minnesota/ and the like.
  if (/^\/(light-bulbs|electronic-recycle|battery-recycling)\/(Minnesota|Wisconsin)\/$/.test(url)) return 'service_state'
  if (url === '/industries/') return 'industry_hub'
  if (url.startsWith('/industries/')) return 'industry'
  if (url === '/all-locations/') return 'location_hub'
  // The location based service pages (SEO brief, 24 Sep 2026), before the
  // facility rule below would call the Minnesota and Wisconsin ones 'location'.
  if (/^\/(locations\/[^/]+|minnesota-recycling|wisconsin-recycling)\/(light-bulb|electronic|battery)-recycling\/$/.test(url)) return 'location_service'
  if (/^\/locations\/[^/]+\/$/.test(url)) return 'location'
  // The Chicago service area page (25 Sep 2026) lives at the old WordPress
  // Chicago URL, outside /locations/, so it is named here.
  if (url === '/electronic-recycling-chicago/') return 'location'
  if (url.startsWith('/minnesota-recycling/') || url.startsWith('/wisconsin-recycling/')) return 'location'
  if (url === '/blog/') return 'blog'
  if (url.startsWith('/category/')) return 'blog_category'
  if (RESOURCES.has(url)) return 'resource'
  if (COMPANY.has(url)) return 'company'
  if (url === '/contact-us/') return 'contact'
  if (LEGAL.has(url)) return 'legal'
  if (url === '/thank-you/') return 'utility'
  return 'page'
}

/**
 * The <meta name="rti:…"> tags for a page. page_name is the title without
 * the brand suffix ("Electronics Recycling Services | Recycle Technologies"
 * -> "Electronics Recycling Services"); for a post, `category` is its blog
 * category, which is more useful than "Blog" in a report.
 */
export function pageContextMeta(opts: {
  url: string; title: string; isPost: boolean; category?: string
}): Record<string, string> {
  const type = pageType(opts.url, opts.isPost)
  const name = opts.title.split(/\s+[|–—-]\s+/)[0]?.trim() || opts.title
  return {
    'rti:page-type': type,
    'rti:page-name': name,
    'rti:page-category': opts.isPost && opts.category ? opts.category : CATEGORY[type],
  }
}
