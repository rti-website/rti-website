import { ServiceDetailPage } from '@/components/sections/service/ServiceDetailPage'
import { pageMetadata } from '@/lib/page-meta'
import { content } from '@/lib/page-content'
import { CONTENT } from '@/data/industries/government-municipal'

/**
 * Government & Municipal — Figma 6246:1390, the industry detail frame.
 *
 * That frame is the service detail template with the second prose block
 * removed, so this reuses ServiceDetailPage and omits `process`. All the copy
 * lives in src/data/industries/government-municipal.ts; `layout` carries the one
 * per-page number, the height of the challenges block, measured against this
 * page's real copy. Re-measure with `npm run measure -- --write`.
 */
export const generateMetadata = () => pageMetadata({
  url: CONTENT.url,
  title: CONTENT.liveSeo.title,
  description: CONTENT.liveSeo.description,
})

export default async function Page() {
  // The copy with the admin's edits (Admin -> Pages); metadata above stays on the static import.
  const { CONTENT: copy } = await content('industries/government-municipal')
  return <ServiceDetailPage content={copy} layout={{ intro: 750, accept: 799 }} />
}
