import { pageMetadata } from '@/lib/page-meta'
import { content } from '@/lib/page-content'
import { LocalServicePage } from '@/components/sections/locations/LocalServicePage'
import { localDocKey, type LocalPage } from '@/data/local-pages'
import { CHICAGO_TV_RECYCLING as PAGE } from '@/data/local-pages/chicago-tv-recycling'

/**
 * "Television Recycling in Chicago, Illinois" (Asim, 30 Sep 2026). Reached by URL and the sitemap only;
 * nothing in the menus links here. Copy in
 * src/data/local-pages/chicago-tv-recycling.ts, build in LocalServicePage.
 */
export const generateMetadata = () => pageMetadata({ url: PAGE.url, title: PAGE.seo.title, description: PAGE.seo.description })

export default async function Page() {
  return <LocalServicePage page={(await content(localDocKey(PAGE))) as LocalPage} />
}
