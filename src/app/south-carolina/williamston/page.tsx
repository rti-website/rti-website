import { pageMetadata } from '@/lib/page-meta'
import { content } from '@/lib/page-content'
import { CountyPage } from '@/components/sections/locations/CountyPage'
import type { CountyPage as CountyPageData } from '@/data/county-pages/types'
import { WILLIAMSTON_SOUTH_CAROLINA as PAGE } from '@/data/landing-pages/williamston-south-carolina'

/**
 * south-carolina/williamston: "Recycle Technologies In Williamston, SC", a Google Ads page (Aaqib, 11 Nov 2026),
 * in the facility page design. noindex, not in the menus, the directory or the sitemap (sitemap.ts skips
 * any page.tsx that sets noindex), no breadcrumb. Its four service pages are the folders beside this file.
 * Copy in src/data/landing-pages/williamston-south-carolina.ts, build in CountyPage.
 */
export const generateMetadata = () => pageMetadata({
  url: PAGE.url,
  title: PAGE.seo.title,
  description: PAGE.seo.description,
  noindex: true,
})

export default async function Page() {
  return <CountyPage page={(await content('landing/south-carolina-williamston')) as CountyPageData} />
}
