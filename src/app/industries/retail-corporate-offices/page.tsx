import { ServiceDetailPage } from '@/components/sections/service/ServiceDetailPage'
import { buildMetadata } from '@/lib/seo'
import { CONTENT } from '@/data/industries/retail-corporate-offices'

/**
 * Retail & Corporate Offices — Figma 6246:1390, the industry detail frame.
 *
 * That frame is the service detail template with the second prose block
 * removed, so this reuses ServiceDetailPage and omits `process`. All the copy
 * lives in src/data/industries/retail-corporate-offices.ts; `layout` carries the one
 * per-page number, the height of the challenges block, measured against this
 * page's real copy. Re-measure with `npm run measure -- --write`.
 */
export const metadata = buildMetadata({
  url: CONTENT.url,
  title: CONTENT.liveSeo.title,
  description: CONTENT.liveSeo.description,
})

export default function Page() {
  return <ServiceDetailPage content={CONTENT} layout={{ intro: 678, accept: 826, faq: 715 }} />
}
