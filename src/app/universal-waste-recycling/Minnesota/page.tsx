import { pageMetadata } from '@/lib/page-meta'
import { content } from '@/lib/page-content'
import { LandingServicePage } from '@/components/sections/locations/LandingServicePage'
import { landingDocKey } from '@/data/landing-pages'
import type { LandingPage } from '@/data/local-pages/types'
import { LANDING_MINNESOTA_UNIVERSAL_WASTE as PAGE } from '@/data/landing-pages/minnesota-universal-waste-recycling'

/**
 * universal-waste-recycling/Minnesota: "Universal Waste Recycling in Minnesota", a landing page for Google Ads only (Aaqib, 27 Oct 2026).
 * noindex, not in the menus, and left out of the sitemap (sitemap.ts skips
 * any page.tsx that sets noindex). Reachable only by its URL. Copy in
 * src/data/landing-pages/minnesota-universal-waste-recycling.ts, build in LandingServicePage.
 */
export const generateMetadata = () => pageMetadata({
  url: PAGE.url,
  title: PAGE.seo.title,
  description: PAGE.seo.description,
  noindex: true,
})

export default async function Page() {
  return <LandingServicePage page={(await content(landingDocKey(PAGE))) as LandingPage} />
}
