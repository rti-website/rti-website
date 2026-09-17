import { Canvas } from '@/components/design/Frame'
import { FOOTER_H } from '@/lib/layout'
import { buildMetadata } from '@/lib/seo'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import { AboutStory } from '@/components/sections/about/AboutStory'
import { AboutValues } from '@/components/sections/about/AboutValues'
import { AboutImpact } from '@/components/sections/about/AboutImpact'
import { AboutLeadership } from '@/components/sections/about/AboutLeadership'
import { AboutFacilities } from '@/components/sections/about/AboutFacilities'
import { CTA_H, ClosingCta } from '@/components/sections/ClosingCta'
import { CTA, HERO, LIVE_SEO } from '@/data/about'

/**
 * About Us — a 1:1 build of Figma frame 6371:3478.
 *
 * Like /contact-us/, this frame runs its sections flush: no 150px gap, each
 * section starts where the last ended. Figma's own heights and what the doc's
 * copy actually needs:
 *
 *   Section        Node        Figma h    built h   why
 *   Header         —           140        140
 *   Hero           6371:3480   470        470
 *   Company story  6372:841    519        H.story   doc paragraphs run longer
 *   Mission/V/V    6372:842    642        H.values
 *   Impact         6372:843    386        H.impact
 *   Leadership     6372:844    475        H.leader  doc paragraph runs shorter
 *   Facilities     6372:845    598        H.facils  extra phone row per card
 *   Closing CTA    6372:846    444.05     H.cta
 *   Footer         6371:3592   681        681
 *
 * The built heights below are MEASURED, not guessed — every section is an
 * auto-layout column in Figma, so its true height is its content plus its own
 * padding, and the doc's copy is not the copy Aqeel laid the frame out around.
 * Re-measure with `node scripts/measure-sections.mjs --route about-us-commercial-recycling-solutions`.
 *
 * !! H1 !! Live has five H1s; the first is "ABOUT US" and this page renders
 * "About Us". A capitalisation difference, the mildest instance of the H1
 * conflict that the whole build carries into gate 2.
 */
const H = {
  story:  542,   // Figma 519 — the doc's two paragraphs run two lines longer
  values: 644,   // Figma 642
  impact: 386,   // Figma 386 exactly
  leader: 448,   // Figma 475 — the doc's paragraph is a line shorter
  facils: 636,   // Figma 598 — plus a phone row on each licensed facility
  cta:    CTA_H,  // the shared closing band; this frame drew 444.05 before the 16 Sep redesign
}

const HERO_TOP = 140
const HERO_H = 470
const STORY_TOP  = HERO_TOP + HERO_H
const VALUES_TOP = STORY_TOP + H.story
const IMPACT_TOP = VALUES_TOP + H.values
const LEADER_TOP = IMPACT_TOP + H.impact
const FACILS_TOP = LEADER_TOP + H.leader
const CTA_TOP    = FACILS_TOP + H.facils
const FOOTER_TOP = CTA_TOP + H.cta

export const metadata = buildMetadata({
  url: '/about-us-commercial-recycling-solutions/',
  title: LIVE_SEO.title,
  description: LIVE_SEO.description,
})

export default function AboutPage() {
  return (
    <Canvas height={Math.round(FOOTER_TOP + FOOTER_H)}>
      <Header />
      <main>
        <ServiceHero
          label="6371:3480" crumbs={HERO.crumbs} h1={HERO.h1} lead={HERO.lead}
          image="/images/pages/hero-about.png"
        />
        <AboutStory      top={STORY_TOP}  height={H.story} />
        <AboutValues     top={VALUES_TOP} height={H.values} />
        <AboutImpact     top={IMPACT_TOP} height={H.impact} />
        <AboutLeadership top={LEADER_TOP} height={H.leader} />
        <AboutFacilities top={FACILS_TOP} height={H.facils} />
        <ClosingCta top={CTA_TOP} label="6372:846" content={CTA} />
      </main>
      <Footer top={FOOTER_TOP} />
    </Canvas>
  )
}
