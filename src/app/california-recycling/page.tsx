import { pageMetadata } from '@/lib/page-meta'
import { StateHubPage } from '@/components/sections/locations/StateHubPage'
import { CALIFORNIA_HUB } from '@/data/state-hubs'
import { content } from '@/lib/page-content'

/**
 * /california-recycling/ — the California state hub (14 Oct 2026), the Minnesota and
 * Wisconsin template. Copy, title and description: the SEO team's California doc,
 * in src/data/state-hubs.ts and the url-map row. Edited in Admin -> Pages.
 */
export const generateMetadata = () => pageMetadata({
  url: CALIFORNIA_HUB.url,
  title: CALIFORNIA_HUB.seo.title,
  description: CALIFORNIA_HUB.seo.description,
})

export default async function CaliforniaHubPage() {
  const f = await content('hub/california')
  return <StateHubPage f={f} layout={LAYOUT} />
}

/* Measured 14 Oct 2026 (scripts/measure-sections.mjs): center 296 is the one card with address,
   phone and hours (Aaqib); cta 442 as on Minnesota;
   faq leaves room for the longest answer open. */
const LAYOUT = { center: 296, mat: 812, counties: 495, cta: 442, mailIn: 230, faq: 672 }
