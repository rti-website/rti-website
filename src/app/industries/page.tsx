import { Canvas } from '@/components/design/Frame'
import { buildMetadata } from '@/lib/seo'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import { IndustriesCatalog } from '@/components/sections/IndustriesCatalog'
import { CertificationsBand } from '@/components/sections/services/CertificationsBand'
import { ServicesCta } from '@/components/sections/services/ServicesCta'
import {
  CATALOGUE_HEADING, CERTIFICATIONS_BODY, CTA, HERO, INDUSTRIES, SEO,
} from '@/data/industries'

/**
 * All Industries — a 1:1 build of Figma frame 6246:1006 (1920 x 3068).
 *
 * Every section keeps its exact Figma height and the design's 150px gap.
 * Nothing needed resizing here: unlike the service detail pages, this frame
 * has no long-form prose, and the doc's seven industries fit the grid the
 * design drew (Figma fills it with eight cards but only five distinct ones).
 *
 *   Section          Node        y           h
 *   Header           6246:1232   0           140
 *   Hero             6246:1008   140         470
 *   All Industries   6246:1023   610         722       (x319, w1282)
 *   Certifications   6246:1064   1482        299.035
 *   Closing CTA      6246:1081   1931.035    456
 *   Footer           6246:1089   2387.035    681
 *                                            = 3068.035, drawn as 3068
 *
 * !! NEW URL !! The live site has no industries page — /industries/ returns
 * the homepage, as every unresolvable path on that site does. So there is no
 * live title, description or H1 to port, and the metadata here was written
 * from the content doc. See src/data/industries.ts for the full note.
 *
 * MOBILE — frame 6638:8497 "All Industries - Mobile" (390 wide), which stacks
 * the same six sections in this source order. Only the catalogue is styled for
 * it here; IndustriesCatalog carries that work. The hero, certifications band
 * and closing CTA are ServiceHero / CertificationsBand / ServicesCta, shared
 * with the ten service detail pages, /blog/, /contact-us/ and a dozen others,
 * and are converted by whoever owns those components — not from here.
 *
 * THE MOBILE FRAME'S COPY IS PLACEHOLDER THROUGHOUT and is not followed;
 * CLAUDE.md rule 6. It draws the shared boilerplate lead, certifications
 * paragraph and closing CTA rather than this page's own, and its card grid is
 * the homepage's eight placeholder categories rather than these seven
 * industries — the same "only five distinct cards" tell src/data/industries.ts
 * already records about the desktop frame. Flagged for Aqeel, not acted on.
 */
export const metadata = buildMetadata({
  url: '/industries/',
  title: SEO.title,
  description: SEO.description,
})

export default function IndustriesPage() {
  return (
    <Canvas height={3008}>
      <Header />
      <main>
        <ServiceHero
          label="6246:1008"
          crumbs={HERO.crumbs}
          h1={HERO.h1}
          lead={HERO.lead}
          image="/images/industries/hero-industries.png"
        />

        <IndustriesCatalog
          top={610} height={722} label="6246:1023"
          heading={CATALOGUE_HEADING}
          industries={INDUSTRIES}
        />

        <CertificationsBand top={1482} label="6246:1064" body={CERTIFICATIONS_BODY} />

        <ServicesCta top={1931.035} label="6246:1081" content={CTA} />
      </main>
      <Footer top={2387.035} />
    </Canvas>
  )
}
