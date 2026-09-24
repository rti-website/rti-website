import { Canvas } from '@/components/design/Frame'
import { FOOTER_H } from '@/lib/layout'
import { href } from '@/lib/urls'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import { CTA_H, ClosingCta } from '@/components/sections/ClosingCta'
import { LocationQuickInfo } from '@/components/sections/locations/LocationQuickInfo'
import { LocationDirections } from '@/components/sections/locations/LocationDirections'
import { LocationMaterials } from '@/components/sections/locations/LocationMaterials'
import { LocationSteps } from '@/components/sections/locations/LocationSteps'
import { LocationFaq } from '@/components/sections/locations/LocationFaq'
import type { Facility } from '@/data/facilities'

/**
 * A facility page — Figma "Location Details - Minnesota" 6744:8392 and
 * "Location Details - Wisconsin" 6746:8471, which are the one template drawn
 * twice. One component, two routes: /minnesota-recycling/ and
 * /wisconsin-recycling/.
 *
 *   Section        Node        Figma h     built     why
 *   Header         —           140         140
 *   Hero           6744:8394   470         470       ServiceHero, as every interior page
 *   Quick info     6744:8794   198         L.info
 *   Directions     6744:8795   520         L.map
 *   Materials      6744:8796   467 / 486   L.mat     Wisconsin's lead wraps to two lines
 *   Steps          6744:8797   525         L.steps
 *   FAQ            6744:8798   473.26      L.faq
 *   Closing CTA    6744:8799   373.05      CTA_H     the shared band, see below
 *   Footer         —           681         681
 *
 * THE CTA IS THE SHARED BAND, NOT THE FRAME'S 373. Asim, 16 Sep 2026: "do it
 * exactly like this in all pages" — every page ends in ClosingCta at CTA_H.
 * The frame drew a shorter version of the same thing; the copy and the two
 * buttons are its own.
 *
 * Heights are per-facility, in `layout`, because Wisconsin's materials lead
 * wraps to two lines. Measured 22 Sep 2026 with
 * `node scripts/measure-sections.mjs --route <slug>` — the doc copy runs a
 * few pixels past the frame in four of the five bands.
 *
 * !! H1 !! The live pages say "Recycling Center in Minnesota" and "Recycling
 * in Wisconsin"; the frames say "Minnesota Facility" / "Wisconsin Facility".
 * Built as designed, like every interior page, and carried into gate 2 with
 * the rest — see the H1 CONFLICT notes on the service pages.
 *
 * MOBILE — "Location Details - Mobile" 6747:2787. Each section answers its own
 * node; the page needs nothing here beyond the heights going out as custom
 * properties that only apply at lg.
 */
export type LocationLayout = { info: number; map: number; mat: number; steps: number; faq: number }

const HERO_TOP = 140
const HERO_H = 470

export function LocationDetailPage({ f, layout: L, links }: {
  f: Facility; layout: LocationLayout
  /** Material label -> this facility's published service page (Admin -> Locations). */
  links?: Record<string, string>
}) {
  const INFO_TOP   = HERO_TOP + HERO_H
  const MAP_TOP    = INFO_TOP + L.info
  const MAT_TOP    = MAP_TOP + L.map
  const STEPS_TOP  = MAT_TOP + L.mat
  const FAQ_TOP    = STEPS_TOP + L.steps
  const CTA_TOP    = FAQ_TOP + L.faq
  const FOOTER_TOP = CTA_TOP + CTA_H

  const crumbs = [
    { label: 'Home',      href: href('/') },
    { label: 'Locations', href: href('/all-locations/') },
    { label: f.state,     href: null },
  ]

  return (
    <Canvas height={Math.round(FOOTER_TOP + FOOTER_H)}>
      <Header />
      <main>
        <ServiceHero
          label="6744:8394" crumbs={crumbs} h1={f.hero.h1}
          /* 6745:6485 — the phone frame drops the zip and the state's full name. */
          lead={<><span className="lg:hidden">{f.hero.leadShort}</span><span className="max-lg:hidden">{f.hero.lead}</span></>}
          image="/images/pages/hero-locations.png"
        />
        <LocationQuickInfo  top={INFO_TOP}  height={L.info}  f={f} />
        <LocationDirections top={MAP_TOP}   height={L.map}   f={f} />
        <LocationMaterials  top={MAT_TOP}   height={L.mat}   f={f} links={links} />
        <LocationSteps      top={STEPS_TOP} height={L.steps} f={f} />
        <LocationFaq        top={FAQ_TOP}   height={L.faq}   f={f} />
        <ClosingCta top={CTA_TOP} label="6744:8799" content={f.cta} />
      </main>
      <Footer top={FOOTER_TOP} />
    </Canvas>
  )
}
