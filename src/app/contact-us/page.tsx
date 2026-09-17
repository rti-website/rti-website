import { Canvas } from '@/components/design/Frame'
import { buildMetadata } from '@/lib/seo'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import { ContactSection } from '@/components/sections/ContactSection'
import { ServiceFaq } from '@/components/sections/service/ServiceFaq'
import { ServicesCta } from '@/components/sections/services/ServicesCta'
import { CTA, FAQ, HERO, LIVE_SEO } from '@/data/contact'

/**
 * Contact Us — a 1:1 build of Figma frame 6365:1082.
 *
 * Unlike the service and industry frames, this one runs its sections flush:
 * there is no 150px gap anywhere, each section starts where the last ended.
 *
 *   Section              Node        y           h
 *   Header               6365:1284   0           140
 *   Hero                 6365:1084   140         470
 *   Form + facilities    6369:757    610         871
 *   FAQ                  6369:759    1481        715.52
 *   Closing CTA          6365:3459   2196.52     456
 *   Footer               6365:1098   2652.52     681
 *                                                = 3333.52, drawn as 3334
 *
 * Figma labels the frame 3321.57 tall, 12px short of what its own sections add
 * up to — a stale auto-size on the frame, not a layout instruction. The
 * sections are authoritative.
 *
 * Title and meta description are VERBATIM from the live /contact-us/ page,
 * captured 15 Sep 2026. The live title misspells "inquiries"; rule 6 says port
 * it and fix it in the second wave.
 *
 * !! H1 !! Live is "contact us" in lowercase; built as designed, like every
 * other page in this project.
 */
export const metadata = buildMetadata({
  url: '/contact-us/',
  title: LIVE_SEO.title,
  description: LIVE_SEO.description,
})

export default function ContactPage() {
  return (
    <Canvas height={3274}>
      <Header />
      <main>
        <ServiceHero
          label="6365:1084"
          image="/images/pages/hero-contact.png"
          crumbs={HERO.crumbs}
          h1={HERO.h1}
          lead={HERO.lead}
        />

        <ContactSection top={610} height={871} />

        <ServiceFaq
          top={1481} height={715.52} listTop={276} label="6369:759"
          eyebrow={FAQ.eyebrow}
          heading={FAQ.heading}
          lead={FAQ.lead}
          items={FAQ.items}
        />

        <ServicesCta top={2196.52} label="6365:3459" content={CTA} />
      </main>
      <Footer top={2652.52} />
    </Canvas>
  )
}
