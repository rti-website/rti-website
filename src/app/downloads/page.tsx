import { Canvas } from '@/components/design/Frame'
import { FOOTER_H } from '@/lib/layout'
import { buildMetadata } from '@/lib/seo'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import { DownloadGrid } from '@/components/sections/downloads/DownloadGrid'
import { CERTIFICATES, CHECKLISTS, HERO, SEO, SHIPPING } from '@/data/downloads'

/**
 * Downloads — a 1:1 build of Figma frame 6382:7043, and of 6638:10182
 * ("Downloads - Mobile", file BVtf2AOuUOcYbiMIlcKmbC) below lg.
 *
 * The section coordinates and heights below apply at lg and up ONLY — see the
 * note at the top of components/design/Frame.tsx. Below lg each Section is an
 * ordinary block in normal flow and styles itself; DownloadGrid carries the
 * mobile shell for all three bands.
 *
 * NEW URL, like /sustainability/ and /case-studies/ before it: /downloads/ does
 * not resolve on the live site, so there is no live title, description or H1 to
 * preserve and CLAUDE.md rule 6 does not bite.
 *
 *   Section          Node        Figma h    built h   why
 *   Header           —           140        140
 *   Hero             6478:5167   470        470
 *   Certificates     6393:1579   607        H.certs
 *   Checklists       6393:1580   585        H.lists
 *   Shipping         6393:1581   585        H.ship
 *   Footer           6382:7059   681        FOOTER_H
 *
 * ! NO CLOSING CTA. Every other interior page ends with the shared band; this
 * frame goes straight from the last card row to the footer, and so does the
 * build. Add one only if Aqeel draws one.
 *
 * Heights are measured, not copied off the frame:
 * `node scripts/measure-sections.mjs --route downloads`.
 *
 * ! THEY WERE NOT, UNTIL 16 SEP 2026. The three numbers below were the frame's,
 * and every band was clipping ~26px off its own bottom padding. Caught while
 * building /itad-recycling-guides/, which reuses the card. Half of it was the
 * card's inherited line-height, now pinned to the frame in DownloadGrid; the
 * rest is the band header's, which every section header on the site shares.
 * Run the script after any change to the card or the header.
 */
const H = {
  certs: 621, // Figma 607, measured 621
  lists: 599, // Figma 585, measured 599
  ship:  599, // Figma 585, measured 599
}

const HERO_TOP = 140
const HERO_H = 470
const CERTS_TOP  = HERO_TOP + HERO_H
const LISTS_TOP  = CERTS_TOP + H.certs
const SHIP_TOP   = LISTS_TOP + H.lists
const FOOTER_TOP = SHIP_TOP + H.ship

export const metadata = buildMetadata({
  url: '/downloads/',
  title: SEO.title,
  description: SEO.description,
})

export default function DownloadsPage() {
  return (
    <Canvas height={Math.round(FOOTER_TOP + FOOTER_H)}>
      <Header />
      <main>
        <ServiceHero
          label="6478:5167" crumbs={HERO.crumbs} h1={HERO.h1} lead={HERO.lead}
          image="/images/pages/hero-downloads.png"
        />
        <DownloadGrid top={CERTS_TOP} height={H.certs} tone="white" section={CERTIFICATES} />
        <DownloadGrid top={LISTS_TOP} height={H.lists} tone="mist"  section={CHECKLISTS} />
        <DownloadGrid top={SHIP_TOP}  height={H.ship}  tone="white" section={SHIPPING} />
      </main>
      <Footer top={FOOTER_TOP} />
    </Canvas>
  )
}
