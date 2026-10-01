import { Canvas } from '@/components/design/Frame'
import { pageMetadata } from '@/lib/page-meta'
import { FOOTER_H } from '@/lib/layout'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import { ContactSection } from '@/components/sections/ContactSection'
import { PICKUP_PAGE } from '@/data/contact'
import { content } from '@/lib/page-content'
import { HERO_PHOTOS } from '@/data/hero-photos'

/**
 * Schedule a Pickup — /request-a-pickup/ (29 Sep 2026).
 *
 * The old WordPress URL, 301'd to /contact-us/ at launch and back as its own
 * page (Asim: "Two CTAs sitewide: Schedule a Pickup (/request-a-pickup/) and
 * Get a Quote (/quote/)"). Built from the Contact Us page's parts, as there
 * is no frame of its own: the same hero photo and the same form section with
 * its facility cards, the form in its 'pickup' variant (see ContactForm).
 *
 * Title, description and H1 are the WordPress ones from data/url-map.csv
 * (CLAUDE.md rule 6), kept in PICKUP_PAGE in src/data/contact.ts.
 *
 * FORM_H: 100 above, the form column, and 100 below plus room for the ZIP
 * hint (see the note in src/app/contact-us/page.tsx). Re-measure with
 * `node scripts/measure-sections.mjs --route request-a-pickup`.
 */
export const generateMetadata = () => pageMetadata({
  url: '/request-a-pickup/',
  title: PICKUP_PAGE.seo.title,
  description: PICKUP_PAGE.seo.description,
})

const FORM_TOP = 610
const FORM_H = 1380 // the business notice on top makes this column ~120 taller than Contact Us'
const FOOTER_TOP = FORM_TOP + FORM_H

export default async function PickupPage() {
  const { PICKUP_PAGE: PAGE } = await content('contact')
  return (
    <Canvas height={FOOTER_TOP + FOOTER_H}>
      <Header />
      <main>
        <ServiceHero label="6365:1084" {...HERO_PHOTOS.contact} crumbs={PAGE.crumbs} h1={PAGE.h1} lead={PAGE.lead} />
        <ContactSection top={FORM_TOP} height={FORM_H} variant="pickup" />
      </main>
      <Footer top={FOOTER_TOP} />
    </Canvas>
  )
}
