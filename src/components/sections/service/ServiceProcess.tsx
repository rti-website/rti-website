import Image from 'next/image'
import { Section } from '@/components/design/Frame'
import { Btn, Eyebrow } from '@/components/ui/Bits'
import { ProcessSteps } from '@/components/client/ProcessSteps'
import type { ServicePageContent } from '@/data/service-page'

/**
 * "How Do We Recycle …" on every service page — Figma "Section — How We
 * Recycle Light Bulbs (Option 2)" (TL, 6 Nov 2026: "rti ke all service pages
 * pr ya update hoga design according to figma"):
 *
 *   desktop 7615:12852  1920 wide on #f8faf9, px320 py100, a 16 column:
 *                       the pill, the heading (IBM Plex 40/1.2 #132119), the
 *                       intro (Roboto 18/29 #7e7e7e, 1000 wide), then the
 *                       1280x520 body — step tabs 340 | step text | photo 500
 *                       (gaps 40). See ProcessSteps.
 *   mobile  7615:13977  white, px20 py48, a 12 column, centred: pill, heading
 *                       26/1.2, intro 15/24, a 12 spacer, the 200-tall photo,
 *                       then the steps as an accordion.
 *
 * It replaces the photo-left prose block (ServiceSplit media="left",
 * 6173:4386) that listed the steps as one paragraph each. Only this section
 * was redrawn; the rest of the service frame is unchanged.
 *
 * The frame draws the light bulb page; every other service passes its own
 * steps, heading, intro and photo through the same section. A page's closing
 * paragraphs (`outro`) and sub-sections (`extra`), which the frame does not
 * draw, follow the body in the intro's style.
 *
 * Heights: measured like the block it replaces (scripts/measure-service-pages.mjs
 * reads the column that holds the h2 plus the section's padding). All the
 * steps' text is laid out at once (see ProcessSteps), so the number holds for
 * whichever tab is open.
 */
export const PROCESS_FIGMA = '7615:12852'

/** "Step 1: Collection", "1. Collection", "Collection." -> "Collection". The words are the doc's. */
export function stepTitle(label: string): string {
  const t = label.replace(/^\s*(step\s*)?\d+\s*[.:)]\s*/i, '').replace(/\s*[.:]\s*$/, '').trim()
  return t || label.trim()
}

const OUTRO = 'font-roboto text-[15px] leading-[24px] text-muted lg:text-[18px] lg:leading-[29px]'

export function ServiceProcess({
  top, height, process, eyebrow, nextLabel,
}: {
  top: number
  height: number
  process: NonNullable<ServicePageContent['process']>
  /** SERVICE_PAGE_TEXT.process — the pill and "Next:", editable in Admin. */
  eyebrow: string
  nextLabel: string
}) {
  const p = process
  const outro = !p.outro ? [] : Array.isArray(p.outro) ? p.outro : [p.outro]

  /* The photo. A page's `imageCrop` was drawn for the old 750x655 box and is
     kept, as percentages, so the same part of the picture shows (it crops a
     baked-in photo credit off the TV picture). `imagePosition` is for a photo
     placed by the new frame instead (light bulbs: 926x521 at x-179 in 500x520). */
  const img = <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 1000px, 100vw" className="object-cover" style={p.imagePosition ? { objectPosition: p.imagePosition } : undefined} />
  const c = p.imageCrop
  const image = c
    ? <span className="absolute block" style={{ left: `${(c.x / c.fw) * 100}%`, top: `${(c.y / c.fh) * 100}%`, width: `${(c.w / c.fw) * 100}%`, height: `${(c.h / c.fh) * 100}%` }}>{img}</span>
    : img

  return (
    <Section
      top={top} height={height} label={PROCESS_FIGMA}
      className="bg-white px-[20px] py-[48px] lg:flex lg:items-center lg:bg-mist lg:px-[320px] lg:py-[100px]"
    >
      {/* The old block's anchor, kept: the header is 140 tall, hence -140. */}
      <span id="how-we-recycle" className="absolute -top-[140px]" aria-hidden="true" />
      <div className="flex w-full flex-col items-center gap-[12px] lg:items-start lg:gap-[16px]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="w-full text-center font-sans text-[26px] font-semibold leading-[1.2] text-heading lg:text-left lg:text-[40px]">
          {p.heading}
        </h2>
        {p.intro && (
          <p className="w-full text-center font-roboto text-[15px] leading-[24px] text-muted max-lg:mb-[12px] lg:max-w-[1000px] lg:text-left lg:text-[18px] lg:leading-[29px]">
            {p.intro}
          </p>
        )}
        <ProcessSteps
          steps={p.steps.map((s) => ({ title: stepTitle(s.label), text: s.text }))}
          nextLabel={nextLabel}
          image={image}
        />
        {(outro.length > 0 || p.extra?.length) ? (
          <div className="flex w-full flex-col gap-[12px] pt-[12px] lg:max-w-[1280px] lg:gap-[16px] lg:pt-[24px]">
            {outro.map((t) => <p key={t} className={OUTRO}>{t}</p>)}
            {p.extra?.map((x) => (
              <div key={x.heading} className="flex flex-col gap-[8px] pt-[6px]">
                <h3 className="font-sans text-[18px] font-semibold leading-[1.3] text-heading lg:text-[20px]">{x.heading}</h3>
                {x.body?.map((t) => <p key={t} className={OUTRO}>{t}</p>)}
                {x.items && x.items.length > 0 && (
                  <ul className="flex flex-col gap-[2px]">
                    {x.items.map((it) => (
                      <li key={it.label} className={OUTRO}>
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
          </div>
        ) : null}
      </div>
    </Section>
  )
}
