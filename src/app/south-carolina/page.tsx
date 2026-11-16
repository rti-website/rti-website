import { pageMetadata } from '@/lib/page-meta'
import { StateHubPage } from '@/components/sections/locations/StateHubPage'
import { SOUTH_CAROLINA_HUB } from '@/data/state-hubs'
import { content } from '@/lib/page-content'

/**
 * /south-carolina/ — the South Carolina state hub (16 Nov 2026), the content
 * team's "Location Page / South Carolina" doc, in the Georgia and Texas hub
 * template. Copy in src/data/state-hubs.ts and the url-map row. Edited in
 * Admin -> Pages ("South Carolina (state page)").
 */
export const generateMetadata = () => pageMetadata({
  url: SOUTH_CAROLINA_HUB.url,
  title: SOUTH_CAROLINA_HUB.seo.title,
  description: SOUTH_CAROLINA_HUB.seo.description,
})

export default async function SouthCarolinaHubPage() {
  const f = await content('hub/south-carolina')
  return <StateHubPage f={f} layout={LAYOUT} />
}

/* Georgia's heights (16 Nov 2026, scripts/measure-sections.mjs --route south-carolina): the bands
   need the same or less (cta 352, faq 546 with the four FAQs); the cta and faq
   keep Georgia's room, as on every hub. */
const LAYOUT = { center: 296, mat: 527, counties: 495, cta: 442, mailIn: 230, faq: 672 }
