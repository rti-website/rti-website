import { buildMetadata } from '@/lib/seo'
import { content } from '@/lib/page-content'
import { CityServicePage } from '@/components/sections/locations/CityServicePage'
import { CHICAGO_BATTERY as PAGE } from '@/data/city-pages/chicago-battery'

/**
 * "Battery Recycling in Chicago, Illinois" — beside /electronic-recycling-chicago/
 * (Asim, 27 Sep 2026: "reuse existing, add Chicago ones"). Reached by URL and
 * the sitemap only; nothing in the menus links here. Copy in
 * src/data/city-pages/chicago-battery.ts, build in CityServicePage.
 */
export const metadata = buildMetadata({ url: PAGE.url, title: PAGE.seo.title, description: PAGE.seo.description })

export default async function Page() {
  return <CityServicePage page={await content('city/chicago-battery')} />
}
