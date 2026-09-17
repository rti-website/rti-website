import { Canvas } from '@/components/design/Frame'
import { FOOTER_H } from '@/lib/layout'
import { buildMetadata } from '@/lib/seo'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import { CTA_H, ClosingCta } from '@/components/sections/ClosingCta'
import { WhyDifferentiators } from '@/components/sections/why/WhyDifferentiators'
import { WhyCallout } from '@/components/sections/why/WhyCallout'
import { WhyTrust } from '@/components/sections/why/WhyTrust'
import { CTA, HERO, SEO } from '@/data/why-choose-us'

/**
 * Why Choose Us — a 1:1 build of Figma frame 6374:4567.
 *
 * NEW URL. /why-choose-us/ does not resolve on the live site — it soft-404s to
 * the homepage — so there is no live title, description or H1 to preserve and
 * rule 6 does not bite. The SEO here is ours.
 *
 *   Section            Node        Figma h    built h
 *   Header             —           140        140
 *   Hero               6374:4569   470        470
 *   Differentiators    6379:1033   642        H.diff
 *   Certified callout  6379:1034   395        H.callout
 *   Trust              6379:1035   606        H.trust
 *   Closing CTA        6379:1036   399.05     H.cta
 *   Footer             6374:4668   681        681
 *
 * Heights are measured, not copied off the frame:
 * `node scripts/measure-sections.mjs --route why-choose-us`.
 *
 * !! One factual correction: the doc's R2v3 card claims Wisconsin is certified.
 * It is not. See the note in src/data/why-choose-us.ts.
 */
const H = {
  diff:    644,    // Figma 642 — the doc's Minority-Owned card is two pixels longer
  callout: 395,    // Figma 395 exactly
  trust:   606,    // Figma 606 exactly
  cta:     CTA_H,  // the shared closing band; this frame drew 399.05 before the 16 Sep redesign
}

const HERO_TOP = 140
const HERO_H = 470
const DIFF_TOP    = HERO_TOP + HERO_H
const CALLOUT_TOP = DIFF_TOP + H.diff
const TRUST_TOP   = CALLOUT_TOP + H.callout
const CTA_TOP     = TRUST_TOP + H.trust
const FOOTER_TOP  = CTA_TOP + H.cta

export const metadata = buildMetadata({
  url: '/why-choose-us/',
  title: SEO.title,
  description: SEO.description,
})

export default function WhyChooseUsPage() {
  return (
    <Canvas height={Math.round(FOOTER_TOP + FOOTER_H)}>
      <Header />
      <main>
        <ServiceHero
          label="6374:4569" crumbs={HERO.crumbs} h1={HERO.h1} lead={HERO.lead}
          image="/images/pages/hero-why-choose-us.png"
        />
        <WhyDifferentiators top={DIFF_TOP}    height={H.diff} />
        <WhyCallout         top={CALLOUT_TOP} height={H.callout} />
        <WhyTrust           top={TRUST_TOP}   height={H.trust} />
        <ClosingCta top={CTA_TOP} label="6379:1036" content={CTA} />
      </main>
      <Footer top={FOOTER_TOP} />
    </Canvas>
  )
}
