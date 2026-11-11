import { pageMetadata } from '@/lib/page-meta'
import { content } from '@/lib/page-content'
import { FacilityAdPage } from '@/components/sections/locations/FacilityAdPage'
import type { FacilityAdPage as FacilityAdPageData } from '@/data/local-pages/types'
import { WILLIAMSTON_QUOTE_ANCHOR, WILLIAMSTON_SOUTH_CAROLINA as PAGE } from '@/data/landing-pages/williamston-south-carolina'

/**
 * south-carolina/williamston: "Commercial Recycling in Williamston, SC", a Google Ads page (Aaqib, 11 Nov 2026;
 * management's copy of 12 Nov 2026),
 * in its own design (FacilityAdPage, 12 Nov 2026). noindex, not in the menus, the directory or the sitemap
 * (sitemap.ts skips any page.tsx that sets noindex), no breadcrumb, Get a Quote only. Its four service
 * pages are the folders beside this file.
 * Copy in src/data/landing-pages/williamston-south-carolina.ts, build in FacilityAdPage.
 */
export const generateMetadata = () => pageMetadata({
  url: PAGE.url,
  title: PAGE.seo.title,
  description: PAGE.seo.description,
  noindex: true,
})

export default async function Page() {
  return <FacilityAdPage page={(await content('landing/south-carolina-williamston')) as FacilityAdPageData} quoteAnchor={WILLIAMSTON_QUOTE_ANCHOR} />
}
