import { ServiceDetailPage } from '@/components/sections/service/ServiceDetailPage'
import { buildMetadata } from '@/lib/seo'
import { CONTENT } from '@/data/ballasts'

/**
 * Ballasts Recycling — Figma 6142:2048 "Service Details".
 *
 * All the copy lives in src/data/ballasts.ts; the layout is the shared
 * ServiceDetailPage. `layout` carries the only per-page numbers: the heights of
 * the two prose blocks, measured in a browser against this page's real copy
 * (Figma sizes them 495 and 579 around placeholder text).
 * Re-measure with `node scripts/measure-service-pages.mjs` after a copy change.
 */
export const metadata = buildMetadata({
  url: CONTENT.url,
  title: CONTENT.liveSeo.title,
  description: CONTENT.liveSeo.description,
})

export default function Page() {
  return <ServiceDetailPage content={CONTENT} layout={{ intro: 732, process: 812, accept: 632 }} />
}
