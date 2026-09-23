import { Canvas } from '@/components/design/Frame'
import { buildMetadata } from '@/lib/seo'
import { FOOTER_H } from '@/lib/layout'
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
 *   Form + facilities    6369:757    610         FORM_H
 *   FAQ                  6369:759    ...         715.52
 *   Closing CTA          6365:3459   ...         456
 *   Footer               6365:1098   ...         681
 *
 * The form section is auto-layout in Figma (100px above and below the taller
 * column), so its height follows the form. It was 871 with the four-field
 * form; the ten-field form of 21 Sep 2026 makes the column 850, so the
 * section is 100 + 850 + 100 and everything under it moves down with it.
 *
 * Figma labels the frame 3321.57 tall, short of what its own sections add up
 * to — a stale auto-size on the frame, not a layout instruction. The sections
 * are authoritative.
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

/** Form + facilities — 100 + the form column + 100. The column measured 850
 *  with the frame's ten fields; 754 when the form moved to the lead-form
 *  spec's nine; 1034 later on 23 Sep 2026, when address, city, state and
 *  "Is it for?" came back (see FORM in src/data/contact.ts).
 *
 *  !! measure-sections reports what the content NEEDS (100 + column), not the
 *  100 below it. 1134 was set from that and left the form's last line flush
 *  on the FAQ band — and once the ZIP hint could appear under City / State /
 *  Zip (up to ~55px), it pushed the button under the band, which paints over
 *  it. 1234 is the frame's 100 below again, and room for the hint.
 *  Re-measure: `node scripts/measure-sections.mjs --route contact-us`, then
 *  add the 100. */
const FORM_TOP = 610
const FORM_H = 1234
const FAQ_TOP = FORM_TOP + FORM_H
const FAQ_H = 715.52
const CTA_TOP = FAQ_TOP + FAQ_H
const CTA_H = 456
const FOOTER_TOP = CTA_TOP + CTA_H

export default function ContactPage() {
  return (
    <Canvas height={FOOTER_TOP + FOOTER_H}>
      <Header />
      <main>
        <ServiceHero
          label="6365:1084"
          image="/images/pages/hero-contact.png"
          crumbs={HERO.crumbs}
          h1={HERO.h1}
          lead={HERO.lead}
        />

        <ContactSection top={FORM_TOP} height={FORM_H} />

        <ServiceFaq
          top={FAQ_TOP} height={FAQ_H} listTop={276} label="6369:759"
          eyebrow={FAQ.eyebrow}
          heading={FAQ.heading}
          lead={FAQ.lead}
          items={FAQ.items}
        />

        <ServicesCta top={CTA_TOP} label="6365:3459" content={CTA} />
      </main>
      <Footer top={FOOTER_TOP} />
    </Canvas>
  )
}
