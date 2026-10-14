import { pageMetadata } from '@/lib/page-meta'
import { StateHubPage } from '@/components/sections/locations/StateHubPage'
import { TEXAS_HUB } from '@/data/state-hubs'
import { content } from '@/lib/page-content'

/**
 * /texas-recycling/ — the Texas state hub (14 Oct 2026), the Minnesota and
 * Wisconsin template. Copy, title and description: the SEO team's Texas doc,
 * in src/data/state-hubs.ts and the url-map row. Edited in Admin -> Pages.
 */
export const generateMetadata = () => pageMetadata({
  url: TEXAS_HUB.url,
  title: TEXAS_HUB.seo.title,
  description: TEXAS_HUB.seo.description,
})

export default async function TexasHubPage() {
  const f = await content('hub/texas')
  return <StateHubPage f={f} layout={LAYOUT} />
}

/* Measured 14 Oct 2026 (scripts/measure-sections.mjs): center 219 and cta 442 as on Minnesota;
   faq leaves room for the longest answer open. */
const LAYOUT = { center: 219, info: 199, mat: 788, counties: 495, cta: 442, mailIn: 230, faq: 672 }
