import { ServiceDetailPage } from '@/components/sections/service/ServiceDetailPage'
import { pageMetadata } from '@/lib/page-meta'
import { content } from '@/lib/page-content'
import { loadLocations, servicePlaces } from '@/lib/service-locations'
import { CONTENT } from '@/data/light-bulbs'

/**
 * Light Bulb Recycling — Figma 6142:2048 "Service Details".
 *
 * All the copy lives in src/data/light-bulbs.ts; the layout is the shared
 * ServiceDetailPage. `layout` carries the only two per-page numbers: the
 * heights of the two prose blocks, measured in a browser against this page's
 * real copy (Figma sizes them 495 and 579 around placeholder text).
 * Re-measure with `node scripts/measure-service-pages.mjs` after a copy change.
 */
export const generateMetadata = () => pageMetadata({
  url: CONTENT.url,
  title: CONTENT.liveSeo.title,
  description: CONTENT.liveSeo.description,
})

// Async since 24 Sep 2026: the "Near You" band lists this service's published
// location pages (Admin -> Locations), read at build and revalidated on save.
export default async function Page() {
  const places = servicePlaces(await loadLocations(), 'light-bulb-recycling')
  // The copy with the admin's edits (Admin -> Pages); metadata above stays on the static import.
  const { CONTENT: copy } = await content('light-bulbs')
  return <ServiceDetailPage content={copy} layout={{ intro: 724, process: 682 }} places={places} placesTitle={copy.placesTitle ?? ''} />
}
