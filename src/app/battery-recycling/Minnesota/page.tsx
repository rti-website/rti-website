import { pageMetadata } from '@/lib/page-meta'
import { content } from '@/lib/page-content'
import { LandingServicePage } from '@/components/sections/locations/LandingServicePage'
import { landingDocKey } from '@/data/landing-pages'
import type { LandingPage } from '@/data/local-pages/types'
import { LANDING_MINNESOTA_BATTERY_RECYCLING as PAGE } from '@/data/landing-pages/minnesota-battery-recycling'

/**
 * battery-recycling/Minnesota: "Battery Recycling in Minnesota", a landing page for Google Ads only (Asim, 30 Sep 2026). Replaces the ad page of 24 Sep 2026 at this URL (its SEO title and description kept).
 * noindex, not in the menus, and left out of the sitemap (sitemap.ts skips
 * any page.tsx that sets noindex). Reachable only by its URL. Copy in
 * src/data/landing-pages/minnesota-battery-recycling.ts, build in LandingServicePage.
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
