import { pageMetadata } from '@/lib/page-meta'
import { StateHubPage } from '@/components/sections/locations/StateHubPage'
import { INDIANA_HUB } from '@/data/state-hubs'
import { content } from '@/lib/page-content'

/**
 * /indiana-recycling/ — the Indiana state hub (14 Oct 2026), the Minnesota and
 * Wisconsin template. Copy, title and description: the SEO team's Indiana doc,
 * in src/data/state-hubs.ts and the url-map row. Edited in Admin -> Pages.
 */
export const generateMetadata = () => pageMetadata({
  url: INDIANA_HUB.url,
  title: INDIANA_HUB.seo.title,
  description: INDIANA_HUB.seo.description,
})

export default async function IndianaHubPage() {
  const f = await content('hub/indiana')
  return <StateHubPage f={f} layout={LAYOUT} />
}

/* Measured 14 Oct 2026 (scripts/measure-sections.mjs): center 219 and cta 442 as on Minnesota;
   faq leaves room for the longest answer open. */
const LAYOUT = { center: 219, info: 199, mat: 812, counties: 495, cta: 442, mailIn: 230, faq: 672 }
