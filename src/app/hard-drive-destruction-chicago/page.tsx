import { buildMetadata } from '@/lib/seo'
import { content } from '@/lib/page-content'
import { LocalServicePage } from '@/components/sections/locations/LocalServicePage'
import { localDocKey, type LocalPage } from '@/data/local-pages'
import { CHICAGO_HARD_DRIVE_DESTRUCTION as PAGE } from '@/data/local-pages/chicago-hard-drive-destruction'

/**
 * "Hard Drive Destruction in Chicago, Illinois" (Asim, 30 Sep 2026). Reached by URL and the sitemap only;
 * nothing in the menus links here. Copy in
 * src/data/local-pages/chicago-hard-drive-destruction.ts, build in LocalServicePage.
 */
export const metadata = buildMetadata({ url: PAGE.url, title: PAGE.seo.title, description: PAGE.seo.description })

export default async function Page() {
  return <LocalServicePage page={(await content(localDocKey(PAGE))) as LocalPage} />
}
