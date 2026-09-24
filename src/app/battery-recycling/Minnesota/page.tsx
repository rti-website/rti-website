import { ServiceDetailPage } from '@/components/sections/service/ServiceDetailPage'
import { buildMetadata } from '@/lib/seo'
import { STATE_PAGES } from '@/data/state-pages'

/**
 * battery-recycling/Minnesota: a landing page for Google Ads only (Asim, 24 Sep 2026).
 * Same design as /battery-recycling/, the copy is in src/data/state-pages.ts.
 * noindex, not in the menus, and left out of the sitemap (sitemap.ts skips
 * any page.tsx that sets noindex). Reachable only by its URL.
 * Re-measure `layout` with `node scripts/measure-service-pages.mjs` after a copy change.
 */
const PAGE = STATE_PAGES['battery-recycling'].Minnesota

export const metadata = buildMetadata({
  url: PAGE.content.url,
  title: PAGE.seo.title,
  description: PAGE.seo.description,
  noindex: true,
})

export default function Page() {
  return <ServiceDetailPage content={PAGE.content} layout={{ intro: 582, process: 840, accept: 660 }} />
}
