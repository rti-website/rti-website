import { Canvas } from '@/components/design/Frame'
import { buildMetadata } from '@/lib/seo'
import { FOOTER_H } from '@/lib/layout'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { ServicesHero } from '@/components/sections/services/ServicesHero'
import { CATALOG_H, ServicesCatalog } from '@/components/sections/services/ServicesCatalog'
import { ServicesEnquiry } from '@/components/sections/services/ServicesEnquiry'
import { CertificationsBand } from '@/components/sections/services/CertificationsBand'
import { ServicesCta } from '@/components/sections/services/ServicesCta'

/**
 * All Services — a 1:1 build of Figma frame 6142:784 (1920 x 4512).
 *
 * Section offsets. The frame drew the catalogue 1814.83 tall with its icon
 * tiles; since 21 Sep 2026 it holds the homepage's photo cards (see
 * ServicesCatalog), so its height comes from that component and everything
 * under it keeps the frame's 150px gaps relative to it:
 *   Header          6142:1304   y0          h140
 *   Hero            6142:786    y140        h470
 *   Catalogue       6142:1559   y610        CATALOG_H  (x319, w1282)
 *   Enquiry panel   6166:2746   +150        h201       (x319, w1282)
 *   Certifications  6142:1622   +150        h299.035
 *   Closing CTA     6142:1153   +150        h456
 *   Footer          6142:1161   flush       FOOTER_H
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

const GAP = 150
const CATALOG_TOP = 610
const ENQUIRY_TOP = CATALOG_TOP + CATALOG_H + GAP
const ENQUIRY_H = 201
const CERT_TOP = ENQUIRY_TOP + ENQUIRY_H + GAP
const CERT_H = 299.035
const CTA_TOP = CERT_TOP + CERT_H + GAP
const CTA_H = 456
const FOOTER_TOP = CTA_TOP + CTA_H

export default function ServicesPage() {
  return (
    <Canvas height={Math.round(FOOTER_TOP + FOOTER_H)}>
      <Header />
      <main>
        <ServicesHero />
        <ServicesCatalog top={CATALOG_TOP} />
        <ServicesEnquiry top={ENQUIRY_TOP} />
        <CertificationsBand top={CERT_TOP} height={CERT_H} />
        <ServicesCta top={CTA_TOP} />
      </main>
      <Footer top={FOOTER_TOP} />
    </Canvas>
  )
}
