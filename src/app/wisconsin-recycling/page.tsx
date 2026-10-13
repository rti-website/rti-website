import { pageMetadata } from '@/lib/page-meta'
import { LocationDetailPage } from '@/components/sections/locations/LocationDetailPage'
import { WISCONSIN } from '@/data/facilities'
import { content } from '@/lib/page-content'

/**
 * /wisconsin-recycling/ — the Wisconsin facility, Figma 6746:8471.
 *
 * A LIVE, INDEXED URL: the hub of the live site's Wisconsin location tree
 * ("Recycling in Wisconsin", with ~20 city links under it). Title and
 * description are the live values, verbatim — CLAUDE.md rule 6. See the note
 * at the top of src/data/facilities.ts.
 *
 * The materials band is taller than Minnesota's: its lead wraps to two lines
 * and the frame grew to fit. Heights measured 22 Sep 2026; re-measure with
 *   node scripts/measure-sections.mjs --route wisconsin-recycling --port <p>
 */
export const generateMetadata = () => pageMetadata({
  url: WISCONSIN.url,
  title: WISCONSIN.liveSeo.title,
  description: WISCONSIN.liveSeo.description,
})

export default async function WisconsinFacilityPage() {
  const { WISCONSIN: f } = await content('facilities')
  return (
    <LocationDetailPage
      f={f}
      /* Redrawn 13 Oct 2026 (Figma 7329:5698): the frame's band heights, services and counties as measured (py90 kept); center 219 is the
         unchanged center bar; faq 720 leaves room for the longest answer open (measured 12 Oct). */
      layout={{ center: 219, info: 198, mat: 646, counties: 688, cta: 442, mailIn: 230, faq: 720 }}
    />
  )
}
