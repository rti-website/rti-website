import { pageMetadata } from '@/lib/page-meta'
import { StateHubPage } from '@/components/sections/locations/StateHubPage'
import { FLORIDA_HUB } from '@/data/state-hubs'
import { content } from '@/lib/page-content'

/**
 * /florida/ (until 4 Nov 2026 /florida-recycling/; that URL is deleted, no redirect) — the Florida state hub (14 Oct 2026), the Minnesota and
 * Wisconsin template. Copy, title and description: the SEO team's Florida doc,
 * in src/data/state-hubs.ts and the url-map row. Edited in Admin -> Pages.
 */
export const generateMetadata = () => pageMetadata({
  url: FLORIDA_HUB.url,
  title: FLORIDA_HUB.seo.title,
  description: FLORIDA_HUB.seo.description,
})

export default async function FloridaHubPage() {
  const f = await content('hub/florida')
  return <StateHubPage f={f} layout={LAYOUT} />
}

/* mat: four service tiles, one row (4 Nov 2026). Measured 14 Oct 2026 (scripts/measure-sections.mjs): center 296 is the one card with address,
   phone and hours (Aaqib); cta 442 as on Minnesota;
   faq leaves room for the longest answer open. */
const LAYOUT = { center: 296, mat: 527, counties: 495, cta: 442, mailIn: 230, faq: 672 }
