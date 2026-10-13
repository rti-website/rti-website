import { Canvas } from '@/components/design/Frame'
import { FOOTER_H } from '@/lib/layout'
import { href } from '@/lib/urls'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { LocationCenterBar } from '@/components/sections/locations/LocationCenterBar'
import { LocationQuickInfo } from '@/components/sections/locations/LocationQuickInfo'
import { LocationFaq } from '@/components/sections/locations/LocationFaq'
import { StateHero, StateMaterials, StateCounties, StateCta, StateMailIn } from '@/components/sections/locations/StateSections'
import type { Facility } from '@/data/facilities'
import { content } from '@/lib/page-content'
import { faqNode, graph } from '@/lib/schema'

/**
 * A facility page — Figma "Location Details - Minnesota" 6744:8392 and
 * "Location Details - Wisconsin" 6746:8471, which are the one template drawn
 * twice. One component, two routes: /minnesota-recycling/ and
 * /wisconsin-recycling/.
 *
 *   REDRAWN 13 Oct 2026 — "Location Details - Minnesota New" 7329:6088 and
 *   "- Wisconsin New" 7329:5698 (phones 7329:6801 / 7329:6503). Asim: keep the
 *   center bar as it was, update the rest.
 *
 *   Section        Node (MN / WI)          board h        built
 *   Header         —                       140            140
 *   Hero           7329:6090 / 5700        579            StateHero
 *   Center bar     6744:8794               219            LocationCenterBar, unchanged
 *   Quick info     7329:6119 / 5730        198            LocationQuickInfo (3 items)
 *   Services       7329:6144 / 5755        610 / 629      StateMaterials
 *   Counties       7329:6198 / 5809        803 / 671      StateCounties (no Load More)
 *   Pickup CTA     7329:6279 / 5864        442            StateCta
 *   Mail-in        7329:6286 / 5871        230            StateMailIn
 *   FAQ            7329:6292 / 5877        591            LocationFaq, 720 (room for an open answer)
 *   Footer         —                       681            681
 *
 * Gone with the redraw: Getting Here, the drop-off steps and the closing
 * "Ready to Bring Materials" band (already off since 12 Oct), the old
 * "What This Location Accepts" tiles and the county card grid with Load More.
 *
 * Heights are per-facility, in `layout`: the two frames' services and county
 * bands differ. Re-measure with
 * `node scripts/measure-sections.mjs --route <slug>`.
 *
 * !! H1 AND LEAD !! The 13 Oct frames say "Electronics Recycling and
 * Shredding in <state>" with their own lead and FAQ questions. The page keeps
 * the H1, lead and FAQs of the "RTI State & Country Pages Content
 * Corrections" sheet (12 Oct 2026, M-01/M-03/M-10, W-02/W-03/W-10), which
 * management signed off and the url-map rows carry. Change f.hero / f.faqs in
 * src/data/facilities.ts to switch.
 *
 * MOBILE — "Location Details - Mobile" 6747:2787. Each section answers its own
 * node; the page needs nothing here beyond the heights going out as custom
 * properties that only apply at lg.
 */
export type LocationLayout = {
  /** The "Our <state> Recycling Center" bar (6744:8794), when the facility has `center`. */
  center?: number
  info: number
  /** 13 Oct 2026 bands (StateSections): services, counties, pickup CTA, mail-in. */
  mat: number; counties: number; cta: number; mailIn: number
  faq: number
}

const HERO_TOP = 140
/** 579 since 13 Oct 2026 (7329:6090); was 470. */
const HERO_H = 579

export async function LocationDetailPage({ f, layout: L }: { f: Facility; layout: LocationLayout }) {
  const CENTER_TOP   = HERO_TOP + HERO_H
  const CENTER_H     = f.center ? (L.center ?? 0) : 0
  const INFO_TOP     = CENTER_TOP + CENTER_H
  const MAT_TOP      = INFO_TOP + L.info
  const COUNTIES_TOP = MAT_TOP + L.mat
  const CTA_TOP      = COUNTIES_TOP + L.counties
  const MAILIN_TOP   = CTA_TOP + L.cta
  const FAQ_TOP      = MAILIN_TOP + L.mailIn
  const FOOTER_TOP   = FAQ_TOP + L.faq
  const { DETAIL_COPY } = await content('facilities')

  const crumbs = [
    { label: DETAIL_COPY.crumbs.home,      href: href('/') },
    { label: DETAIL_COPY.crumbs.locations, href: href('/all-locations/') },
    { label: f.state,     href: null },
  ]

  return (
    <Canvas height={Math.round(FOOTER_TOP + FOOTER_H)}>
      <Header />
      <main>
        <StateHero f={f} crumbs={crumbs} top={HERO_TOP} height={HERO_H} />
        {/* Kept exactly as it was (Asim, 13 Oct 2026). */}
        {f.center && <LocationCenterBar top={CENTER_TOP} height={CENTER_H} f={f} />}
        <LocationQuickInfo top={INFO_TOP}     height={L.info}     f={f} />
        <StateMaterials    top={MAT_TOP}      height={L.mat}      f={f} />
        <StateCounties     top={COUNTIES_TOP} height={L.counties} f={f} />
        <StateCta          top={CTA_TOP}      height={L.cta}      f={f} />
        <StateMailIn       top={MAILIN_TOP}   height={L.mailIn}   f={f} />
        <LocationFaq       top={FAQ_TOP}      height={L.faq}      f={f} />
      </main>
      <Footer top={FOOTER_TOP} />
      {/* FAQPage JSON-LD from the same list the FAQ section shows (14 Oct 2026). */}
      {f.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph(faqNode(f.faqs)) }} />
      )}
    </Canvas>
  )
}
