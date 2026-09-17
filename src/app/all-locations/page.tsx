import { Canvas } from '@/components/design/Frame'
import { FOOTER_H } from '@/lib/layout'
import { buildMetadata } from '@/lib/seo'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import { CTA_H, ClosingCta } from '@/components/sections/ClosingCta'
import { LocationsFinder } from '@/components/sections/locations/LocationsFinder'
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
 *   Finder         6377:967    902        H.finder
 *   Coverage       6377:968    493        H.cover   doc paragraphs differ
 *   Closing CTA    6377:969    399.05     H.cta
 *   Footer         6374:4353   681        681
 *
 * Heights are measured, not copied off the frame — every section is an
 * auto-layout column whose true height is its content plus its own padding, and
 * the doc's copy is not the copy the frame was drawn around. Re-measure with
 * `node scripts/measure-sections.mjs --route all-locations`.
 *
 * !! H1 !! Live is "All Locations"; the design says "Locations". Same H1
 * conflict the rest of the build carries into gate 2.
 */
const H = {
  finder: 902,    // Figma 902 exactly
  cover:  491,    // Figma 493 — the doc's second paragraph is two pixels shorter
  cta:    CTA_H,  // the shared closing band; this frame drew 399.05 before the 16 Sep redesign
}

const HERO_TOP = 140
const HERO_H = 470
const FINDER_TOP = HERO_TOP + HERO_H
const COVER_TOP  = FINDER_TOP + H.finder
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
        <LocationsCoverage top={COVER_TOP}  height={H.cover} />
        <ClosingCta top={CTA_TOP} label="6377:969" content={CTA} />
      </main>
      <Footer top={FOOTER_TOP} />
    </Canvas>
  )
}
