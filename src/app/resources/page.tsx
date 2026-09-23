import { Canvas } from '@/components/design/Frame'
import { FOOTER_H } from '@/lib/layout'
import { buildMetadata } from '@/lib/seo'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import { CTA_H, ClosingCta } from '@/components/sections/ClosingCta'
import { HOME_CTA } from '@/data/home'
import { ResourceArticles, ResourceGuides, ResourceSearch } from '@/components/sections/resources/ResourceSections'
import { HERO, SEO } from '@/data/resources'

/**
 * Resources — a 1:1 build of Figma frame 6374:3828, and of 6638:2227
 * ("Resources - Mobile", file BVtf2AOuUOcYbiMIlcKmbC) below lg.
 *
 * The section coordinates and heights below apply at lg and up ONLY — see the
 * note at the top of components/design/Frame.tsx. Below lg each Section is an
 * ordinary block in normal flow and styles itself; nothing on this page needs
 * to change for that, the three bands carry their own mobile shells.
 *
 * NEW URL, like /downloads/ alongside it: /resources/ does not resolve on the
 * live site, so there is no live title, description or H1 to preserve and
 * CLAUDE.md rule 6 does not bite.
 *
 *   Section          Node        Figma h    built h   why
 *   Header           —           140        140
 *   Hero             6472:3904   470        470
 *   Search band      6375:905    400        H.search
 *   Featured guides  6375:906    890        H.guides
 *   Popular articles 6375:907    1124       H.articles
 *   Footer           6374:3980   681        FOOTER_H
 *
 *   Closing CTA      —           —          CTA_H     (Asim, 23 Sep 2026)
 *
 * THE CLOSING CTA IS ASIM'S, NOT THE FRAME'S. The frame runs the last article
 * row straight into the footer; on 23 Sep 2026 Asim asked for the homepage's
 * "Ready to Recycle Responsibly?" band here too. It is the shared ClosingCta
 * with the homepage's own copy (HOME_CTA), so the two cannot drift.
 *
 * Heights are measured, not copied off the frame:
 * `node scripts/measure-sections.mjs --route resources`.
 *
 * Read src/data/resources.ts before changing any link here: the guides and
 * articles point at real ranking URLs that this app does not serve yet.
 */
/*
 * ! MEASURED, NOT COPIED — and they were copied until 16 Sep 2026, so all three
 * bands were clipping their own bottom padding, the articles band by 82px. Same
 * bug as /downloads/, caught the same day while building
 * /itad-recycling-guides/. The gap is line-height: the frames are drawn at the
 * fonts' natural leading and the site's body sets 1.5, so every card and row
 * runs a little taller than its box. Re-run the script after any change to a
 * card, a row or the band header.
 */
const H = {
  search:   408,  // Figma 400,  measured 408
  guides:   909,  // Figma 890,  measured 909
  articles: 1206, // Figma 1124, measured 1206
}

const HERO_TOP = 140
const HERO_H = 470
const SEARCH_TOP   = HERO_TOP + HERO_H
const GUIDES_TOP   = SEARCH_TOP + H.search
const ARTICLES_TOP = GUIDES_TOP + H.guides
const CTA_TOP      = ARTICLES_TOP + H.articles
const FOOTER_TOP   = CTA_TOP + CTA_H

export const metadata = buildMetadata({
  url: '/resources/',
  title: SEO.title,
  description: SEO.description,
})

export default function ResourcesPage() {
  return (
    <Canvas height={Math.round(FOOTER_TOP + FOOTER_H)}>
      <Header />
      <main>
        <ServiceHero
          label="6472:3904" crumbs={HERO.crumbs} h1={HERO.h1} lead={HERO.lead}
          image="/images/pages/hero-resources.png"
        />
        <ResourceSearch   top={SEARCH_TOP}   height={H.search} />
        <ResourceGuides   top={GUIDES_TOP}   height={H.guides} />
        <ResourceArticles top={ARTICLES_TOP} height={H.articles} />
        <ClosingCta       top={CTA_TOP} content={HOME_CTA} />
      </main>
      <Footer top={FOOTER_TOP} />
    </Canvas>
  )
}
