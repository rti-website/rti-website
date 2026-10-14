import { pageMetadata } from '@/lib/page-meta'
import { StateHubPage } from '@/components/sections/locations/StateHubPage'
import { ARIZONA_HUB } from '@/data/state-hubs'
import { content } from '@/lib/page-content'

/**
 * /arizona-recycling/ — the Arizona state hub (14 Oct 2026), the Minnesota and
 * Wisconsin template. Copy, title and description: the SEO team's Arizona doc,
 * in src/data/state-hubs.ts and the url-map row. Edited in Admin -> Pages.
 */
export const generateMetadata = () => pageMetadata({
  url: ARIZONA_HUB.url,
  title: ARIZONA_HUB.seo.title,
  description: ARIZONA_HUB.seo.description,
})

export default async function ArizonaHubPage() {
  const f = await content('hub/arizona')
  return <StateHubPage f={f} layout={LAYOUT} />
}

/* Measured 14 Oct 2026 (scripts/measure-sections.mjs): center 219 and cta 442 as on Minnesota;
   faq leaves room for the longest answer open. */
const LAYOUT = { center: 219, info: 199, mat: 812, counties: 495, cta: 442, mailIn: 230, faq: 696 }
