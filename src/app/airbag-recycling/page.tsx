import { ServiceDetailPage } from '@/components/sections/service/ServiceDetailPage'
import { buildMetadata } from '@/lib/seo'
import { content } from '@/lib/page-content'
import { CONTENT } from '@/data/airbag-recycling'

/**
 * Airbag Recycling — Figma 6142:2048 "Service Details".
 *
 * All the copy lives in src/data/airbag-recycling.ts; the layout is the shared
 * ServiceDetailPage. `layout` carries the only two per-page numbers: the
 * heights of the two prose blocks, measured in a browser against this page's
 * real copy (Figma sizes them 495 and 579 around placeholder text).
 * Re-measure with `node scripts/measure-service-pages.mjs` after a copy change.
 */
export const metadata = buildMetadata({
  url: CONTENT.url,
  title: CONTENT.liveSeo.title,
  description: CONTENT.liveSeo.description,
})

export default async function Page() {
  // The copy with the admin's edits (Admin -> Pages); metadata above stays on the static import.
  const { CONTENT: copy } = await content('airbag-recycling')
  return <ServiceDetailPage content={copy} layout={{ intro: 779, process: 571, accept: 632, certifications: 392 }} />
}
