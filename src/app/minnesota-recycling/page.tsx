import { pageMetadata } from '@/lib/page-meta'
import { LocationDetailPage } from '@/components/sections/locations/LocationDetailPage'
import { MINNESOTA } from '@/data/facilities'
import { content } from '@/lib/page-content'

/**
 * /minnesota-recycling/ — the Minnesota facility, Figma 6744:8392.
 *
 * A LIVE, INDEXED URL: the hub of the live site's Minnesota location tree
 * ("Recycling Center in Minnesota", with ~20 city links under it). Title and
 * description are the live values, verbatim — CLAUDE.md rule 6. See the note
 * at the top of src/data/facilities.ts for what this page does and does not
 * carry over from the live one.
 *
 * Heights measured 22 Sep 2026 — the doc copy runs a few px past the frame
 * in four of the five bands. Re-measure with
 *   node scripts/measure-sections.mjs --route minnesota-recycling --port <p>
 */
export const generateMetadata = () => pageMetadata({
  url: MINNESOTA.url,
  title: MINNESOTA.liveSeo.title,
  description: MINNESOTA.liveSeo.description,
})

export default async function MinnesotaFacilityPage() {
  const { MINNESOTA: f } = await content('facilities')
  return (
    <LocationDetailPage
      f={f}
      /* Redrawn 13 Oct 2026 (Figma 7329:6088): the frame's band heights, services and counties as measured (py90 kept); center 296 is the
         one center card with address, phone and hours (14 Oct 2026, was 219 + a 198 quick-info band); faq 672 leaves room for the longest answer open (14 Oct FAQs, measured 581 + py90). */
      layout={{ center: 296, mat: 622, counties: 813, cta: 442, mailIn: 230, faq: 672 }}
    />
  )
}
