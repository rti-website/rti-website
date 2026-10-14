import { pageMetadata } from '@/lib/page-meta'
import { StateHubPage } from '@/components/sections/locations/StateHubPage'
import { GEORGIA_HUB } from '@/data/state-hubs'
import { content } from '@/lib/page-content'

/**
 * /georgia-recycling/ — the Georgia state hub (14 Oct 2026), the Minnesota and
 * Wisconsin template. Copy, title and description: the SEO team's Georgia doc,
 * in src/data/state-hubs.ts and the url-map row. Edited in Admin -> Pages.
 */
export const generateMetadata = () => pageMetadata({
  url: GEORGIA_HUB.url,
  title: GEORGIA_HUB.seo.title,
  description: GEORGIA_HUB.seo.description,
})

export default async function GeorgiaHubPage() {
  const f = await content('hub/georgia')
  return <StateHubPage f={f} layout={LAYOUT} />
}

/* Measured 14 Oct 2026 (scripts/measure-sections.mjs): center 219 and cta 442 as on Minnesota;
   faq leaves room for the longest answer open. */
const LAYOUT = { center: 219, info: 199, mat: 788, counties: 495, cta: 442, mailIn: 230, faq: 672 }
