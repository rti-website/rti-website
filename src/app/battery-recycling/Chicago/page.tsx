import { buildMetadata } from '@/lib/seo'
import { content } from '@/lib/page-content'
import { LandingServicePage } from '@/components/sections/locations/LandingServicePage'
import { landingDocKey } from '@/data/landing-pages'
import type { LandingPage } from '@/data/local-pages/types'
import { LANDING_CHICAGO_BATTERY_RECYCLING as PAGE } from '@/data/landing-pages/chicago-battery-recycling'

/**
 * battery-recycling/Chicago: "Battery Recycling in Chicago, Illinois", a landing page for Google Ads only (Asim, 30 Sep 2026).
 * noindex, not in the menus, and left out of the sitemap (sitemap.ts skips
 * any page.tsx that sets noindex). Reachable only by its URL. Copy in
 * src/data/landing-pages/chicago-battery-recycling.ts, build in LandingServicePage.
 */
export const metadata = buildMetadata({
  url: PAGE.url,
  title: PAGE.seo.title,
  description: PAGE.seo.description,
  noindex: true,
})

export default async function Page() {
  return <LandingServicePage page={(await content(landingDocKey(PAGE))) as LandingPage} />
}
