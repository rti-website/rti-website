import { FOOTER_H } from '@/lib/layout'
import { ServiceLocationsBand, placesBandHeight, type Place } from '@/components/sections/service/ServiceLocationsBand'
import { Canvas, Section } from '@/components/design/Frame'
import Image from 'next/image'
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
import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { Btn } from '@/components/ui/Bits'
import { KitTip } from '@/components/ui/KitTip'
import { content as pageContent } from '@/lib/page-content'

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
 *
 * BELOW lg every one of those offsets and heights is ignored (see Frame.tsx)
 * and the sections stack in source order — which is precisely the order of the
 * mobile frame, 6638:8236 in file BVtf2AOuUOcYbiMIlcKmbC: hero, intro split,
 * What We Accept, process split, certifications, case studies, FAQ, CTA. So
 * the arithmetic above is desktop-only and nothing here needs a mobile branch;
 * each section answers the phone itself. The seven /industries/* pages render
 * through this same component, so they inherit the same treatment.
 */

const HERO_TOP = 140
const HERO_H = 470
/** The step strip under the hero (Mail-In, 6 Oct 2026): py40 + a 96 card row. */
const HERO_STEPS_H = 260
/** White space the design leaves between mid-page sections. */
const GAP = 150
const ACCEPT_H_DEFAULT = 446.36
const CERT_H_DEFAULT = 299.035
const CASE_H = CASE_STUDIES_H
const FAQ_H_DEFAULT = 676.93
const CTA_H = 456

/*
 * Body copy is 15/1.5 on a phone against the board's 17.018/27.654 — the size
 * every mobile frame in BVtf2AOuUOcYbiMIlcKmbC sets (6638:10513 for the prose,
 * 6638:10566 for a step row at 15/1.4). Set here rather than inside
 * ServiceSplit because the caller owns the rhythm of its own children.
 */
const PROSE = 'font-roboto text-[15px] leading-[1.5] text-muted lg:text-[17.018px] lg:leading-[27.654px]'
const STEP = 'font-roboto text-[15px] leading-[1.4] text-muted lg:text-[16px] lg:leading-[24px]'

/** A section's closing copy is one paragraph on most pages and several on some. */
function toParagraphs(v: string | string[] | undefined): string[] {
  if (!v) return []
  return Array.isArray(v) ? v : [v]
}

export async function ServiceDetailPage({
  content, layout, places = [], placesTitle = '',
}: {
  content: ServicePageContent
  layout: ServicePageLayout
  /**
   * Published location pages of this service (Admin -> Locations, 24 Sep
   * 2026), for the "Near You" band. Only the three service hubs pass these;
   * with none, the band and its height are not there at all.
   */
  places?: Place[]
  placesTitle?: string
}) {
  const acceptH    = layout.accept ?? ACCEPT_H_DEFAULT
  const faqH       = layout.faq ?? FAQ_H_DEFAULT
  const certH      = layout.certifications ?? CERT_H_DEFAULT
  const stepsH     = content.heroSteps?.length ? HERO_STEPS_H : 0
  const introTop   = HERO_TOP + HERO_H + stepsH
  const acceptTop  = introTop + layout.intro + GAP
  // The industry frames have no second prose block, so that section and the
  // gap after it drop out of the stack entirely.
  const processTop = acceptTop + acceptH + GAP
  const afterAccept = acceptTop + acceptH
  const afterProcess = content.process ? processTop + (layout.process ?? 0) : afterAccept
  // The optional second tick-row band (the kit page's "Who Is the Program
  // For?") sits between the process block and certifications, GAP either side.
  const audienceH  = content.audience ? (layout.audience ?? ACCEPT_H_DEFAULT) : 0
  const audienceTop = afterProcess + GAP
  const certTop    = content.audience
    ? audienceTop + audienceH + GAP
    : afterProcess + GAP
  const caseTop    = certTop + certH + GAP
  const placesH    = placesBandHeight(places.length)
  const placesTop  = caseTop + CASE_H + GAP
  const faqTop     = placesTop + placesH
  const ctaTop     = faqTop + faqH
  const footerTop  = ctaTop + CTA_H

  const { hero, intro, accept, faqs } = content
  /* The words this template writes around every page's own copy (the crumb
     trail, the picker, the FAQ heading): SERVICE_PAGE_TEXT in
     src/data/services.ts, edited under Admin -> Pages -> Services page. */
  const text = (await pageContent('services')).SERVICE_PAGE_TEXT
  /* The certifications paragraph: the page's own when it has one, else the
     shared compliance line (the band's fallback), optionally followed by a
     sentence of the page's own (`after`, the Wisconsin electronics ad page).
     The shared line is read from its document, so an edit there reaches the
     pages that add to it as well. */
  const { CERT_COPY } = await pageContent('certifications')
  const certAfter = content.certifications?.after
  const certBody = content.certifications?.body ?? (certAfter ? `${CERT_COPY.body} ${certAfter}` : undefined)
  /* The hero's buttons (30 Sep 2026): Schedule a Pickup, where the location
     picker was, then Get a Quote — on every page whose frame draws buttons.
     The page's own quote link is kept when its button is a quote (it may
     carry ?service=); anything else it had (a kit, a pickup) gives way. */
  const own = [hero.cta, hero.secondaryCta].find((c) => c && /quote/i.test(c.label))
  const heroQuote = hero.cta ? { label: 'Get a Quote', href: own?.href ?? QUOTE_HREF } : undefined
  const heroPickup = hero.cta && !hero.kitCta ? { label: 'Schedule a Pickup', href: PICKUP_HREF } : undefined

  return (
    <Canvas height={Math.round(footerTop + FOOTER_H)}>
      <Header />
      <main>
        <ServiceHero
          label="6142:2050"
          centerY
          crumbs={hero.trail ?? [
            { label: text.crumbs.home,     href: href('/') },
            { label: text.crumbs.services, href: href('/services/') },
            { label: hero.crumb,     href: null },
          ]}
          h1={hero.h1}
          h1OneLine={hero.h1OneLine}
          lead={hero.lead}
          pickupCta={heroPickup}
          {...(hero.kitCta
            ? { cta: { ...hero.kitCta, external: true }, ctaFill: 'whiteFill' as const, secondaryCta: heroQuote ?? { label: 'Get a Quote', href: QUOTE_HREF } }
            : content.kitTip
              /* The kit-tip pages (6 Oct 2026): Schedule a Pickup first and white,
                 Get a Quote outlined, the kit tip under them. */
              ? { pickupCta: undefined, cta: heroPickup, ctaFill: 'whiteFill' as const, secondaryCta: heroQuote, note: <KitTip tip={content.kitTip} className="max-lg:justify-center max-lg:text-center lg:mt-[-4px]" /> }
              : { cta: heroQuote })}
          image={hero.image}
          imageFill={hero.imageFill}
          washes={hero.washes}
          tone={hero.tone}
        />

        {content.heroSteps?.length ? <HeroSteps top={HERO_TOP + HERO_H} steps={content.heroSteps} /> : null}

        <ServiceSplit
          top={introTop} height={layout.intro} media="right" label="6197:4463"
          heading={intro.heading}
          image={intro.image}
          imageFlip={intro.imageFlip}
          imageCrop={intro.imageCrop}
          imageAlt=""
          /* READ MORE IS GONE — Asim, 22 Sep 2026: "remove the read more from
             all the services subpages". It was a jump link to #how-we-recycle,
             a section already two screens down the same page, so it saved a
             scroll at the cost of a control that looked like a truncation cue
             on prose that was not truncated.

             `intro.more` is still in every service data file and on the
             ServicePageContent type: the INDUSTRY template renders its own
             Read More (to #services) and shares that shape. Removing the field
             would mean touching both templates for one page family's change. */
        >
          {intro.body.map((p) => <p key={p} className={PROSE}>{p}</p>)}
        </ServiceSplit>

        <ServiceAcceptBand
          top={acceptTop} height={acceptH} label="6142:2067" id="services"
          heading={accept.heading}
          intro={accept.intro}
          itemsHeading={accept.itemsHeading}
          items={accept.items}
          outro={accept.outro}
        />

        {content.process && (
          <ServiceSplit
            top={processTop} height={layout.process ?? 0} media="left" label="6173:4386"
            id="how-we-recycle"
            heading={content.process.heading}
            image={content.process.image}
            imageCrop={content.process.imageCrop}
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
            {content.process.extra?.map((x) => (
              <div key={x.heading} className="flex flex-col gap-[8px] pt-[6px]">
                <h3 className="font-sans text-[18px] font-semibold leading-[1.3] text-heading lg:text-[20px]">{x.heading}</h3>
                {x.body?.map((p) => <p key={p} className={STEP}>{p}</p>)}
                {x.items && x.items.length > 0 && (
                  <ul className="flex flex-col gap-[2px]">
                    {x.items.map((it) => (
                      <li key={it.label} className={STEP}>
                        <strong className="font-medium text-ink">{it.label}</strong> {it.text}
                      </li>
                    ))}
                  </ul>
                )}
                {x.cta && (
                  <div className="pt-[4px]">
                    <Btn href={x.cta.href} variant="colored" external={x.cta.external} className="max-lg:w-full max-lg:justify-center">
                      {x.cta.label}
                    </Btn>
                  </div>
                )}
              </div>
            ))}
          </ServiceSplit>
        )}

        {content.audience && (
          /* No Figma node: the kit doc's extra section, drawn as the accept
             band's twin. `audience-band` is what measure-service-pages.mjs
             looks for. */
          <ServiceAcceptBand
            top={audienceTop} height={audienceH} label="audience-band"
            heading={content.audience.heading}
            intro={content.audience.intro}
            itemsHeading={content.audience.itemsHeading}
            items={content.audience.items}
            outro={content.audience.outro}
          />
        )}

        <CertificationsBand top={certTop} height={certH} label="6173:2828" body={certBody} />

        <CaseStudies top={caseTop} label="6146:2403" />

        <ServiceLocationsBand top={placesTop} height={placesH} title={placesTitle} places={places} />

        <ServiceFaq
          top={faqTop} height={faqH} label="6146:2417"
          eyebrow={text.faq.eyebrow}
          heading={text.faq.heading}
          lead={text.faq.lead}
          items={faqs}
        />

        <ServicesCta top={ctaTop} label="6146:2431" content={content.kitTip ? { ...content.cta, tip: content.cta.tip ?? content.kitTip } : content.cta} />
      </main>
      <Footer top={footerTop} />
    </Canvas>
  )
}

/**
 * Three step cards under the hero — Figma 7246:10418 "Mail In" (6 Oct 2026),
 * used on Mail-In and the six kit-tip service pages.
 *
 * A 260 band on #f7fafa, three 497x160 cards (1.5px #deeaeb, r16) with an
 * 81 wide arrow between them, 1653 in all, centred. Each card: a 106 #e5f3f0
 * tile (r28) holding the 60px line icon, then STEP n (Inter 15/20 bold
 * #049c88) over the step in Inter 23/30 bold #102d30.
 *
 * MOBILE: no phone frame. The cards stack full width, the tile drops to 84,
 * the arrows go.
 */
const STEP_ICONS = {
  // Group 7246:10456 sits at 13.33/6.67/6.67/8.33% of its 60 frame; the SVG
  // carries its own stroke bleed (-2.55% / -2.71%).
  package: { src: '/images/steps/package-plus.svg', w: 50.6, h: 53.6, box: 'inset-[6.67%_6.67%_8.33%_13.33%]', bleed: 'inset-[-2.55%_-2.71%]' },
  // Group 7246:10482: 18.33/8.33%, bleed -2.8% / -3.68%.
  shield:  { src: '/images/steps/shield-check.svg', w: 40.8, h: 52.8, box: 'inset-[8.33%_18.33%]',          bleed: 'inset-[-2.8%_-3.68%]' },
} as const

function HeroSteps({ top, steps }: { top: number; steps: NonNullable<ServicePageContent['heroSteps']> }) {
  return (
    <Section top={top} height={HERO_STEPS_H} label="7246:10448" className="flex flex-col items-center bg-[#f7fafa] px-[20px] py-[28px] lg:justify-center lg:px-0 lg:py-[50px]">
      <ol className="flex w-full flex-col gap-[12px] lg:w-auto lg:flex-row lg:gap-0">
        {steps.map((s, i) => {
          const icon = STEP_ICONS[s.glyph] ?? STEP_ICONS.package
          return (
            <li key={s.label} className="flex items-center lg:items-stretch">
              {i > 0 ? (
                <Image src="/images/steps/step-arrow.svg" alt="" width={81} height={160} unoptimized className="hidden lg:block" />
              ) : null}
              <div className="flex w-full items-center gap-[18px] rounded-[16px] border-[1.5px] border-[#deeaeb] bg-[#f7fafa] px-[16px] py-[16px] lg:h-[160px] lg:w-[497px] lg:items-start lg:gap-[34px] lg:px-[27.5px] lg:py-[31.5px]">
                <span className="relative size-[84px] shrink-0 rounded-[22px] bg-[#e5f3f0] lg:size-[106px] lg:rounded-[28px]">
                  <span className="absolute left-1/2 top-1/2 size-[60px] -translate-x-1/2 -translate-y-1/2 overflow-clip max-lg:scale-[0.85]">
                    <span className={`absolute ${icon.box}`}>
                      <span className={`absolute ${icon.bleed}`}>
                        <Image src={icon.src} alt="" width={icon.w} height={icon.h} unoptimized className="block size-full max-w-none" />
                      </span>
                    </span>
                  </span>
                </span>
                <span className="flex min-w-px flex-col gap-[4px] lg:gap-[7.5px] lg:pt-[7px]">
                  <span className="font-inter text-[13px] font-bold uppercase leading-[20px] text-[#049c88] lg:text-[15px]">{s.label || `Step ${i + 1}`}</span>
                  <span className="font-inter text-[18px] font-bold leading-[24px] text-[#102d30] text-balance lg:w-[323px] lg:text-[23px] lg:leading-[30px]">{s.text}</span>
                </span>
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
