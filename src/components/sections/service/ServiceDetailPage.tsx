import Link from 'next/link'
import { FOOTER_H } from '@/lib/layout'
import { Canvas } from '@/components/design/Frame'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { CASE_STUDIES_H, CaseStudies } from '@/components/sections/CaseStudies'
import { CertificationsBand } from '@/components/sections/services/CertificationsBand'
import { ServicesCta } from '@/components/sections/services/ServicesCta'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import { ServiceSplit } from '@/components/sections/service/ServiceSplit'
import { ServiceAcceptBand } from '@/components/sections/service/ServiceAcceptBand'
import { ServiceFaq } from '@/components/sections/service/ServiceFaq'
import type { ServicePageContent, ServicePageLayout } from '@/data/service-page'
import { href } from '@/lib/urls'

/**
 * Every service detail page — Figma frame 6142:2048 "Service Details".
 *
 * Aqeel drew this frame once, for Electronics Recycling. Ten services use it,
 * so they use one component: pass the content and the two measured prose
 * heights and the whole canvas falls out.
 *
 * WHY THE OFFSETS ARE COMPUTED, NOT LISTED
 * The frame's two prose blocks were laid out around placeholder copy and the
 * real copy is longer — by 100px on one page, 260 on another. Every other
 * section keeps its exact Figma height, and the design's 150px gap sits
 * between them. So the only per-page numbers are those two heights; the rest
 * is arithmetic, which means a page can never drift out of alignment because
 * someone updated a height and forgot a table.
 *
 * Figma's own values for the two variable blocks are 495 and 579. Anything
 * larger is real copy that would otherwise be clipped — flag the frame to
 * Aqeel rather than cutting the writer's sentences.
 */

const HERO_TOP = 140
const HERO_H = 470
/** White space the design leaves between mid-page sections. */
const GAP = 150
const ACCEPT_H_DEFAULT = 446.36
const CERT_H_DEFAULT = 299.035
const CASE_H = CASE_STUDIES_H
const FAQ_H_DEFAULT = 676.93
const CTA_H = 456

const PROSE = 'font-roboto text-[17.018px] leading-[27.654px] text-muted'
const STEP = 'font-roboto text-[16px] leading-[24px] text-muted'

/** A section's closing copy is one paragraph on most pages and several on some. */
function toParagraphs(v: string | string[] | undefined): string[] {
  if (!v) return []
  return Array.isArray(v) ? v : [v]
}

export function ServiceDetailPage({
  content, layout,
}: {
  content: ServicePageContent
  layout: ServicePageLayout
}) {
  const acceptH    = layout.accept ?? ACCEPT_H_DEFAULT
  const faqH       = layout.faq ?? FAQ_H_DEFAULT
  const certH      = layout.certifications ?? CERT_H_DEFAULT
  const introTop   = HERO_TOP + HERO_H
  const acceptTop  = introTop + layout.intro + GAP
  // The industry frames have no second prose block, so that section and the
  // gap after it drop out of the stack entirely.
  const processTop = acceptTop + acceptH + GAP
  const afterAccept = acceptTop + acceptH
  const certTop    = content.process
    ? processTop + (layout.process ?? 0) + GAP
    : afterAccept + GAP
  const caseTop    = certTop + certH + GAP
  const faqTop     = caseTop + CASE_H + GAP
  const ctaTop     = faqTop + faqH
  const footerTop  = ctaTop + CTA_H

  const { hero, intro, accept, faqs } = content

  return (
    <Canvas height={Math.round(footerTop + FOOTER_H)}>
      <Header />
      <main>
        <ServiceHero
          label="6142:2050"
          crumbs={hero.trail ?? [
            { label: 'Home',         href: href('/') },
            { label: 'Our Services', href: href('/services/') },
            { label: hero.crumb,     href: null },
          ]}
          h1={hero.h1}
          lead={hero.lead}
          pickerPlaceholder={hero.cta ? 'Select Your Location' : undefined}
          pickerOptions={hero.cta ? ['Minnesota', 'Wisconsin', 'Nationwide (Mail-In)'] : undefined}
          cta={hero.cta}
          image={hero.image}
        />

        <ServiceSplit
          top={introTop} height={layout.intro} media="right" label="6197:4463"
          heading={intro.heading}
          image={intro.image}
          imageAlt=""
          footer={intro.more && (
            <Link
              href={intro.more.href}
              className="font-mono text-[14px] font-medium uppercase leading-[15.95px] tracking-[1.32px] text-brand hover:underline"
            >
              {intro.more.label}
            </Link>
          )}
        >
          {intro.body.map((p) => <p key={p} className={PROSE}>{p}</p>)}
        </ServiceSplit>

        <ServiceAcceptBand
          top={acceptTop} height={acceptH} label="6142:2067" id="services"
          heading={accept.heading}
          intro={accept.intro}
          items={accept.items}
          outro={accept.outro}
        />

        {content.process && (
          <ServiceSplit
            top={processTop} height={layout.process ?? 0} media="left" label="6173:4386"
            id="how-we-recycle"
            heading={content.process.heading}
            image={content.process.image}
            imageAlt=""
          >
            {content.process.intro && <p className={PROSE}>{content.process.intro}</p>}
            {content.process.steps.length > 0 && (
              <ul className="flex flex-col gap-[2px]">
                {content.process.steps.map((st) => (
                  <li key={st.label} className={STEP}>
                    <strong className="font-medium text-ink">{st.label}</strong> {st.text}
                  </li>
                ))}
              </ul>
            )}
            {toParagraphs(content.process.outro).map((p) => <p key={p} className={STEP}>{p}</p>)}
          </ServiceSplit>
        )}

        <CertificationsBand top={certTop} height={certH} label="6173:2828" body={content.certifications?.body} />

        <CaseStudies top={caseTop} label="6146:2403" />

        <ServiceFaq
          top={faqTop} height={faqH} label="6146:2417"
          eyebrow="FAQs"
          heading="Frequently Asked Questions"
          lead="Recycling helps conserve resources, reduce pollution and support economic sustainability."
          items={faqs}
        />

        <ServicesCta top={ctaTop} label="6146:2431" content={content.cta} />
      </main>
      <Footer top={footerTop} />
    </Canvas>
  )
}
