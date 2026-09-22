import { buildMetadata } from '@/lib/seo'
import { LocationDetailPage } from '@/components/sections/locations/LocationDetailPage'
import { MINNESOTA } from '@/data/facilities'

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
export const metadata = buildMetadata({
  url: MINNESOTA.url,
  title: MINNESOTA.liveSeo.title,
  description: MINNESOTA.liveSeo.description,
})

export default function MinnesotaFacilityPage() {
  return (
    <LocationDetailPage
      f={MINNESOTA}
      layout={{ info: 200, map: 520, mat: 498, steps: 532, faq: 486 }}
    />
  )
}
