import { pageMetadata } from '@/lib/page-meta'
import { StateHubPage } from '@/components/sections/locations/StateHubPage'
import { TENNESSEE_HUB } from '@/data/state-hubs'
import { content } from '@/lib/page-content'

/**
 * /tennessee/ (until 3 Nov 2026 /tennessee-recycling/; that URL is deleted, no redirect) — the Tennessee state hub (14 Oct 2026), the Minnesota and
 * Wisconsin template. Copy, title and description: the SEO team's Tennessee doc,
 * in src/data/state-hubs.ts and the url-map row. Edited in Admin -> Pages.
 */
export const generateMetadata = () => pageMetadata({
  url: TENNESSEE_HUB.url,
  title: TENNESSEE_HUB.seo.title,
  description: TENNESSEE_HUB.seo.description,
})

export default async function TennesseeHubPage() {
  const f = await content('hub/tennessee')
  return <StateHubPage f={f} layout={LAYOUT} />
}

/* mat re-measured 3 Nov 2026: four service tiles, one row. Measured 14 Oct 2026 (scripts/measure-sections.mjs): center 296 is the one card with address,
   phone and hours (Aaqib); cta 442 as on Minnesota;
   faq leaves room for the longest answer open. */
const LAYOUT = { center: 296, mat: 581, counties: 495, cta: 442, mailIn: 230, faq: 696 }
