import { ServiceDetailPage } from '@/components/sections/service/ServiceDetailPage'
import { buildMetadata } from '@/lib/seo'
import { loadLocations, servicePlaces } from '@/lib/service-locations'
import { CONTENT } from '@/data/battery-recycling'

/**
 * Battery Recycling — Figma 6142:2048 "Service Details".
 *
 * All the copy lives in src/data/battery-recycling.ts; the layout is the shared
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

// Async since 24 Sep 2026: the "Near You" band lists this service's published
// location pages (Admin -> Locations), read at build and revalidated on save.
export default async function Page() {
  const places = servicePlaces(await loadLocations(), 'battery-recycling')
  return <ServiceDetailPage content={CONTENT} layout={{ intro: 658, process: 573, accept: 660 }} places={places} placesTitle="Battery Recycling Near You" />
}
