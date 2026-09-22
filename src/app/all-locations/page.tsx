import { Canvas } from '@/components/design/Frame'
import { FOOTER_H } from '@/lib/layout'
import { buildMetadata } from '@/lib/seo'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import { CTA_H, ClosingCta } from '@/components/sections/ClosingCta'
import { LocationsFinder } from '@/components/sections/locations/LocationsFinder'
import { LocationCards } from '@/components/sections/locations/LocationCards'
import { LocationsCoverage } from '@/components/sections/locations/LocationsCoverage'
import { CTA, HERO, LIVE_SEO } from '@/data/locations'

/**
 * Locations — a 1:1 build of Figma frame 6374:4194, at the live URL
 * /all-locations/ (the homepage's "See all Locations" button, 1 referring
 * domain, H1 "All Locations").
 *
 * Sections run flush, like /contact-us/ and /about-us.../:
 *
 *   Section        Node        Figma h    built h   why
 *   Header         —           140        140
 *   Hero           6374:4196   470        470
 *   Finder         6377:967    822        H.finder  map now full width, list gone
 *   Cards          6743:2450   852.05     H.cards   NEW 22 Sep 2026 — two facility cards
 *   Coverage       6377:968    493        H.cover   doc paragraphs differ
 *   Closing CTA    6491:6580   456        H.cta
 *   Footer         6374:4353   681        681
 *
 * UPDATED 22 Sep 2026 to the designer's revised frame — Asim: "update the
 * location page". The finder lost its facility-row list and grew its map to
 * the full 1282; the rows came back as two full cards in a section of their
 * own, each linking to the facility's new page (/minnesota-recycling/ and
 * /wisconsin-recycling/). The frame went from 3910 to 3910 — it is a
 * coincidence of the finder shrinking by 80 and the cards adding 852 against
 * the old CTA's 399 — so do not read the unchanged total as "nothing moved".
 *
 * Heights are measured, not copied off the frame — every section is an
 * auto-layout column whose true height is its content plus its own padding, and
 * the doc's copy is not the copy the frame was drawn around. Re-measure with
 * `node scripts/measure-sections.mjs --route all-locations`.
 *
 * !! H1 !! Live is "All Locations"; the design says "Locations". Same H1
 * conflict the rest of the build carries into gate 2.
 *
 * MOBILE — "Locations - Mobile" 6638:2230 in file BVtf2AOuUOcYbiMIlcKmbC.
 * Nothing changes here: the heights and tops above go out as custom properties
 * and globals.css only applies them at lg, so below it every section is an
 * ordinary block in source order. Each section answers its own mobile node —
 * 6669:2420 for the finder, 6670:2383 for the coverage note.
 */
const H = {
  finder: 822,    // Figma 822 — the revised frame, map at full width
  cards:  861,    // Figma 852.05 — measured; the lead sets a line longer than drawn
  cover:  491,    // Figma 493 — the doc's second paragraph is two pixels shorter
  cta:    CTA_H,  // the shared closing band
}

const HERO_TOP = 140
const HERO_H = 470
const FINDER_TOP = HERO_TOP + HERO_H
const CARDS_TOP  = FINDER_TOP + H.finder
const COVER_TOP  = CARDS_TOP + H.cards
const CTA_TOP    = COVER_TOP + H.cover
const FOOTER_TOP = CTA_TOP + H.cta

export const metadata = buildMetadata({
  url: '/all-locations/',
  title: LIVE_SEO.title,
  description: LIVE_SEO.description,
})

export default function LocationsPage() {
  return (
    <Canvas height={Math.round(FOOTER_TOP + FOOTER_H)}>
      <Header />
      <main>
        <ServiceHero
          label="6374:4196" crumbs={HERO.crumbs} h1={HERO.h1} lead={HERO.lead}
          image="/images/pages/hero-locations.png"
        />
        <LocationsFinder   top={FINDER_TOP} height={H.finder} />
        <LocationCards     top={CARDS_TOP}  height={H.cards} />
        <LocationsCoverage top={COVER_TOP}  height={H.cover} />
        <ClosingCta top={CTA_TOP} label="6377:969" content={CTA} />
      </main>
      <Footer top={FOOTER_TOP} />
    </Canvas>
  )
}
