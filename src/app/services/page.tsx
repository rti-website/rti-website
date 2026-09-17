import { Canvas } from '@/components/design/Frame'
import { buildMetadata } from '@/lib/seo'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { ServicesHero } from '@/components/sections/services/ServicesHero'
import { ServicesCatalog } from '@/components/sections/services/ServicesCatalog'
import { ServicesEnquiry } from '@/components/sections/services/ServicesEnquiry'
import { CertificationsBand } from '@/components/sections/services/CertificationsBand'
import { ServicesCta } from '@/components/sections/services/ServicesCta'

/**
 * All Services — a 1:1 build of Figma frame 6142:784 (1920 x 4512).
 *
 * Section offsets, all taken from the Figma canvas:
 *   Header          6142:1304   y0          h140
 *   Hero            6142:786    y140        h470
 *   Catalogue       6142:1559   y610        h1814.83   (x319, w1282)
 *   Enquiry panel   6166:2746   y2574.83    h201       (x319, w1282)
 *   Certifications  6142:1622   y2925.83    h299.035
 *   Closing CTA     6142:1153   y3374.86    h456
 *   Footer          6142:1161   y3830.86    h681
 *                                           = 4511.86, drawn as 4512
 *
 * Title and meta description are VERBATIM from the live /services/ page,
 * captured 15 Sep 2026. Per the migration plan they are not rewritten at launch.
 *
 * !! H1 CONFLICT !! The live H1 is "Services"; the redesign's is "Our Services".
 * Built as designed — the staging crawl diffs H1s, so this surfaces at gate 2
 * alongside the homepage H1 for one decision rather than two.
 *
 * Every card URL is the live URL, including the two that do not follow the
 * pattern you would guess (/electronic-recycle/, /paper-shredding-services/).
 * See src/data/services.ts.
 */
export const metadata = buildMetadata({
  url: '/services/',
  title: 'Recycling Services | Call (800) 969-5166',
  description:
    'Recycling services for electronics, batteries, light bulbs, paper, shredding, and more. Call (800) 969-5166 for recycling services today.',
})

export default function ServicesPage() {
  return (
    <Canvas height={4452}>
      <Header />
      <main>
        <ServicesHero />
        <ServicesCatalog />
        <ServicesEnquiry />
        <CertificationsBand />
        <ServicesCta />
      </main>
      <Footer top={3830.86} />
    </Canvas>
  )
}
