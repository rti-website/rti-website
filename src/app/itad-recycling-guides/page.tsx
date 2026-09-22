import { Canvas } from '@/components/design/Frame'
import { FOOTER_H } from '@/lib/layout'
import { buildMetadata } from '@/lib/seo'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import { GuideList, ReferenceDocs } from '@/components/sections/guides/GuideSections'
import { HERO, SEO } from '@/data/guides'

/**
 * ITAD & Recycling Guides — a 1:1 build of Figma frame 6382:5883 in
 * fFS1bD6V6j1RhhmzfPxpHk. Asim, 16 Sep 2026: "also make this page and add it in
 * footer below resource heading".
 *
 * Below lg it is a build of 6638:8289 ("ITAD & Recycling Guides - Mobile",
 * file BVtf2AOuUOcYbiMIlcKmbC). The coordinates and heights below apply at lg
 * and up ONLY — see the note at the top of components/design/Frame.tsx. Both
 * bands carry their own mobile shell in GuideSections.
 *
 * NEW URL, like /resources/ and /downloads/: it does not resolve on the live
 * site, so there is no live title, description or H1 to preserve and CLAUDE.md
 * rule 6 does not bite.
 *
 *   Section          Node        Figma h    built h   why
 *   Header           -           140        140
 *   Hero             6478:4384   470        470
 *   Guide list       6386:1349   1008       H.guides
 *   Reference docs   6386:1350   639        H.docs
 *   Footer           6382:6013   681        FOOTER_H
 *
 * ! NO CLOSING CTA, same as /resources/ and /downloads/. The frame runs the
 * last card row straight into the footer.
 *
 * Heights are measured, not copied off the frame:
 * `node scripts/measure-sections.mjs --route itad-recycling-guides`.
 *
 * Read src/data/guides.ts before changing a link here: none of the six guides
 * exists as a post, and each row's destination is a deliberate stand-in.
 */
const H = {
  guides: 1008, // Figma 1008 — matches exactly
  // Figma 639. The two extra pixels are the shared DownloadTile's, which rounds
  // a hair taller than the frame's card; measured, per the note below.
  docs:    641,
}

const HERO_TOP = 140
const HERO_H = 470
const GUIDES_TOP = HERO_TOP + HERO_H
const DOCS_TOP   = GUIDES_TOP + H.guides
const FOOTER_TOP = DOCS_TOP + H.docs

export const metadata = buildMetadata({
  url: '/itad-recycling-guides/',
  title: SEO.title,
  description: SEO.description,
})

export default function ItadRecyclingGuidesPage() {
  return (
    <Canvas height={Math.round(FOOTER_TOP + FOOTER_H)}>
      <Header />
      <main>
        <ServiceHero
          label="6478:4384" crumbs={HERO.crumbs} h1={HERO.h1} lead={HERO.lead}
          image="/images/pages/hero-guides.png"
        />
        <GuideList     top={GUIDES_TOP} height={H.guides} />
        <ReferenceDocs top={DOCS_TOP}   height={H.docs} />
      </main>
      <Footer top={FOOTER_TOP} />
    </Canvas>
  )
}
