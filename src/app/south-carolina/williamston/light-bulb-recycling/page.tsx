import { pageMetadata } from '@/lib/page-meta'
import { content } from '@/lib/page-content'
import { LandingServicePage } from '@/components/sections/locations/LandingServicePage'
import { landingDocKey } from '@/data/landing-pages'
import type { LandingPage } from '@/data/local-pages/types'
import { LANDING_WILLIAMSTON_LIGHT_BULB_RECYCLING as PAGE } from '@/data/landing-pages/williamston-light-bulb-recycling'

/**
 * south-carolina/williamston/light-bulb-recycling: "Light Bulb Recycling in Williamston, SC", a Google Ads page (Aaqib, 11 Nov 2026).
 * noindex, not in the menus or the sitemap (sitemap.ts skips any page.tsx that sets noindex), no breadcrumb.
 * Copy in src/data/landing-pages/williamston-light-bulb-recycling.ts, build in LandingServicePage.
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
