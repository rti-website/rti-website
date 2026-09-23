import { Canvas } from '@/components/design/Frame'
import { FOOTER_H } from '@/lib/layout'
import { buildMetadata } from '@/lib/seo'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import { CTA_H, ClosingCta } from '@/components/sections/ClosingCta'
import { CircularEconomy } from '@/components/sections/sustainability/CircularEconomy'
import { ZeroLandfill } from '@/components/sections/sustainability/ZeroLandfill'
import { ImpactReporting } from '@/components/sections/sustainability/ImpactReporting'
import { SustainabilityGoals } from '@/components/sections/sustainability/SustainabilityGoals'
import { CTA, HERO, SEO } from '@/data/sustainability'

/**
 * Sustainability & Environmental Impact — a 1:1 build of Figma frame 6374:5211.
 *
 * NEW URL. /sustainability/ does not resolve on the live site: it serves the
 * homepage, titled "E-Waste, Electronics & Industrial Recycling Services" with
 * canonical "https://www.recycletechnologies.com/". So there is no live title,
 * description or H1 to preserve and CLAUDE.md rule 6 does not bite.
 *
 *   Section            Node        Figma h    built h   why
 *   Header             —           140        140
 *   Hero               6374:5213   470        470
 *   Circular Economy   6383:1161   521        H.circ
 *   Zero-Landfill      6383:1162   637        H.zero
 *   Impact Reporting   6383:1163   490        H.report  note bar wraps, not clipped
 *   Goals              6383:1164   614        H.goals
 *   Closing CTA        6383:1165   399.05     H.cta
 *   Footer             6374:5325   681        681
 *
 * Heights are measured, not copied off the frame:
 * `node scripts/measure-sections.mjs --route sustainability`.
 *
 * Copy is Asim's revised content of 23 Sep 2026, set word for word — see
 * src/data/sustainability.ts.
 *
 * MOBILE — "Sustainability & Environmental Impact - Mobile" 6638:8275 in file
 * BVtf2AOuUOcYbiMIlcKmbC. The heights and tops above are lg-only custom
 * properties, so this file needs nothing: each section answers its own mobile
 * node — 6638:10158 (circular economy), 6638:10228 (zero-landfill),
 * 6638:10308 (impact reporting), 6638:10515 (goals).
 *
 * !! The mobile frame does NOT restore the absolute landfill claims: 6638:10228
 * carries the same softened wording as the board, and 6638:10311 still reads
 * "100% Shipments Documented" rather than "Materials Diverted from Landfill".
 * It does repeat the desktop frame's "R2v3-Scoped Facilities" stat, which
 * overstates Wisconsin; the doc's "Licensed Facilities" is kept.
 */
const H = {
  circ:   523,   // Figma 521 — the doc's two paragraphs run two lines longer
  zero:   663,   // Figma 637 — the revised copy of 23 Sep 2026 runs a line longer
  report: 490,   // Figma 490 exactly
  goals:  656,   // Figma 614 — the revised goal bodies are longer than the frame's
  cta:    CTA_H,  // the shared closing band; this frame drew 399.05 before the 16 Sep redesign
}

const HERO_TOP = 140
const HERO_H = 470
const CIRC_TOP   = HERO_TOP + HERO_H
const ZERO_TOP   = CIRC_TOP + H.circ
const REPORT_TOP = ZERO_TOP + H.zero
const GOALS_TOP  = REPORT_TOP + H.report
const CTA_TOP    = GOALS_TOP + H.goals
const FOOTER_TOP = CTA_TOP + H.cta

export const metadata = buildMetadata({
  url: '/sustainability/',
  title: SEO.title,
  description: SEO.description,
})

export default function SustainabilityPage() {
  return (
    <Canvas height={Math.round(FOOTER_TOP + FOOTER_H)}>
      <Header />
      <main>
        <ServiceHero label="6374:5213" crumbs={HERO.crumbs} h1={HERO.h1} lead={HERO.lead} />
        <CircularEconomy      top={CIRC_TOP}   height={H.circ} />
        <ZeroLandfill         top={ZERO_TOP}   height={H.zero} />
        <ImpactReporting      top={REPORT_TOP} height={H.report} />
        <SustainabilityGoals  top={GOALS_TOP}  height={H.goals} />
        <ClosingCta top={CTA_TOP} label="6383:1165" content={CTA} />
      </main>
      <Footer top={FOOTER_TOP} />
    </Canvas>
  )
}
