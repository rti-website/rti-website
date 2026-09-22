import { Canvas } from '@/components/design/Frame'
import { FOOTER_H } from '@/lib/layout'
import { buildMetadata } from '@/lib/seo'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import { StandardsTable } from '@/components/sections/compliance/StandardsTable'
import { StateRegulations } from '@/components/sections/compliance/StateRegulations'
import { ComplianceCaseStudies } from '@/components/sections/compliance/ComplianceCaseStudies'
import { ComplianceDownloads } from '@/components/sections/compliance/ComplianceDownloads'
import { HERO, SEO } from '@/data/compliance-center'

/**
 * Compliance Center — a 1:1 build of Figma frame 6382:6227, and of 6638:8303
 * ("Compliance Center - Mobile", file BVtf2AOuUOcYbiMIlcKmbC) below lg.
 *
 * The section coordinates and heights below apply at lg and up ONLY — see the
 * note at the top of components/design/Frame.tsx. Below lg each Section is an
 * ordinary block in normal flow and styles itself, and the standards table
 * restyles into one card per standard rather than scrolling sideways — read
 * the note in StandardsTable.tsx.
 *
 * NEW URL. /compliance-center/ does not resolve on the live site: it serves the
 * homepage, titled "E-Waste, Electronics & Industrial Recycling Services" with
 * canonical "https://www.recycletechnologies.com/". So there is no live title,
 * description or H1 to preserve and CLAUDE.md rule 6 does not bite.
 *
 *   Section              Node        Figma h    built h   why
 *   Header               —           140        140
 *   Hero                 6382:6229   470        470
 *   Standards table      6389:1527   776        H.std     4 rows, not 5 — see below
 *   State regulations    6389:1528   697        H.law
 *   Case studies         6389:1529   732        H.cases
 *   Downloads            6389:1530   617        H.dl
 *   Footer               6382:6385   681        681
 *
 * Heights are measured, not copied off the frame:
 * `node scripts/measure-sections.mjs --route compliance-center`.
 *
 * !! THE STANDARDS TABLE IS ONE ROW SHORTER THAN THE FRAME. The frame's
 * "NAID AAA — Certified" row is not published; nothing supports the claim and
 * the Certifications page already omits it. Asim decided this on 15 Sep 2026.
 * Read the note above STANDARDS in src/data/compliance-center.ts first.
 *
 * NOTE: this frame has no closing CTA, unlike every other interior page here.
 * Built as drawn; flagged in TODO_FOR_DESIGN.
 */
const H = {
  std:   698, // Figma 776 — one 80px row fewer
  law:   701, // Figma 697
  /* Figma 732. Re-measured 22 Sep 2026: the three case-study cards gained a
     key-benefits list, a customer quote and a download link when the invented
     stories were replaced with Asim's real ones, then shrank again when the
     cards became small PDF-preview tiles the same day: 856, not 733.
     node scripts/measure-sections.mjs --route compliance-center --port 3200 */
  cases: 856,
  dl:    647, // Figma 617 — the "Request Download" link is a real focusable row
}

const HERO_TOP = 140
const HERO_H = 470
const STD_TOP   = HERO_TOP + HERO_H
const LAW_TOP   = STD_TOP + H.std
const CASE_TOP  = LAW_TOP + H.law
const DL_TOP    = CASE_TOP + H.cases
const FOOTER_TOP = DL_TOP + H.dl

export const metadata = buildMetadata({
  url: '/compliance-center/',
  title: SEO.title,
  description: SEO.description,
})

export default function ComplianceCenterPage() {
  return (
    <Canvas height={Math.round(FOOTER_TOP + FOOTER_H)}>
      <Header />
      <main>
        <ServiceHero
          label="6382:6229" crumbs={HERO.crumbs} h1={HERO.h1} lead={HERO.lead}
          image="/images/pages/hero-compliance.png"
        />
        <StandardsTable         top={STD_TOP}  height={H.std} />
        <StateRegulations       top={LAW_TOP}  height={H.law} />
        <ComplianceCaseStudies  top={CASE_TOP} height={H.cases} />
        <ComplianceDownloads    top={DL_TOP}   height={H.dl} />
      </main>
      <Footer top={FOOTER_TOP} />
    </Canvas>
  )
}
