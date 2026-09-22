import { buildMetadata } from '@/lib/seo'
import { LocationDetailPage } from '@/components/sections/locations/LocationDetailPage'
import { WISCONSIN } from '@/data/facilities'

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
export const metadata = buildMetadata({
  url: WISCONSIN.url,
  title: WISCONSIN.liveSeo.title,
  description: WISCONSIN.liveSeo.description,
})

export default function WisconsinFacilityPage() {
  return (
    <LocationDetailPage
      f={WISCONSIN}
      layout={{ info: 200, map: 520, mat: 503, steps: 532, faq: 486 }}
    />
  )
}
