import { pageMetadata } from '@/lib/page-meta'
import { LocationDetailPage } from '@/components/sections/locations/LocationDetailPage'
import { MINNESOTA } from '@/data/facilities'
import { loadLocations, materialLinks } from '@/lib/service-locations'
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

// Async since 24 Sep 2026: the material tiles link to this facility's
// published service pages (Admin -> Locations), read at build time.
export default async function MinnesotaFacilityPage() {
  const [all, { MINNESOTA: f }] = await Promise.all([loadLocations(), content('facilities')])
  const links = materialLinks(all, 'minnesota')
  return (
    <LocationDetailPage
      f={f} links={links}
      layout={{ center: 219, info: 200, map: 520, mat: 498, steps: 532, faq: 486 }}
    />
  )
}
