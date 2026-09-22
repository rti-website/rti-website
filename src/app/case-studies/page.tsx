import { Canvas } from '@/components/design/Frame'
import { FOOTER_H } from '@/lib/layout'
import { buildMetadata } from '@/lib/seo'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import { CTA_H, ClosingCta } from '@/components/sections/ClosingCta'
import { CaseStudyGrid } from '@/components/sections/case-studies/CaseStudyGrid'
import { CTA, HERO, SEO } from '@/data/case-studies'

/**
 * Case Studies — a 1:1 build of Figma frame 6382:6595.
 *
 * NEW URL. /case-studies/ does not resolve on the live site: it serves the
 * homepage, titled "E-Waste, Electronics & Industrial Recycling Services" with
 * canonical "https://www.recycletechnologies.com/". So there is no live title,
 * description or H1 to preserve and CLAUDE.md rule 6 does not bite.
 *
 *   Section          Node        Figma h    built h   why
 *   Header           —           140        140
 *   Hero             6382:6597   470        470
 *   Filters + grid   6391:1527   1178       H.grid   taller cards, see below
 *   Closing CTA      6391:1528   399.05     H.cta
 *   Footer           6382:6611   681        681
 *
 * Heights are measured, not copied off the frame:
 * `node scripts/measure-sections.mjs --route case-studies`.
 *
 * The grid's height is fixed whichever industry filter is active — see the note
 * on CaseStudyGrid. The three stories themselves live in src/data/case-studies.ts
 * and are shared with /compliance-center/, which shows all three.
 */
const H = {
  /* Measured, not drawn. The frame's 1178 was sized around five short cards
     (challenge + approach only). The three real case studies carry a key-benefits
     list, a customer quote and a download link each, so the row is taller — hence
     922 — the cards became small PDF-preview tiles on 22 Sep 2026, so the row
     is shorter than the frame's 1178, not taller. Re-run after any card change:
     node scripts/measure-sections.mjs --route case-studies --port 3200 */
  grid: 922,
  cta:  CTA_H,  // the shared closing band; this frame drew 399.05 before the 16 Sep redesign
}

const HERO_TOP = 140
const HERO_H = 470
const GRID_TOP = HERO_TOP + HERO_H
const CTA_TOP  = GRID_TOP + H.grid
const FOOTER_TOP = CTA_TOP + H.cta

export const metadata = buildMetadata({
  url: '/case-studies/',
  title: SEO.title,
  description: SEO.description,
})

export default function CaseStudiesPage() {
  return (
    <Canvas height={Math.round(FOOTER_TOP + FOOTER_H)}>
      <Header />
      <main>
        <ServiceHero
          label="6382:6597" crumbs={HERO.crumbs} h1={HERO.h1} lead={HERO.lead}
          image="/images/pages/hero-case-studies.png"
        />
        <CaseStudyGrid top={GRID_TOP} height={H.grid} />
        <ClosingCta top={CTA_TOP} label="6391:1528" content={CTA} />
      </main>
      <Footer top={FOOTER_TOP} />
    </Canvas>
  )
}
