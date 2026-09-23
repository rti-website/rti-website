import Image from 'next/image'
import { Section } from '@/components/design/Frame'
import { Btn, Eyebrow } from '@/components/ui/Bits'
import { PickupForm } from '@/components/client/PickupForm'
import { FEATURES, INTRO, PICKUP, PROCESS, SERVICES, WHY } from '@/data/itad'

/**
 * The six body sections of /it-asset-disposition/ — Figma 6778:2946 on the
 * board, 6778:3335 on the phone. One file because they share one heading
 * block and are used nowhere else; the copy is in src/data/itad.ts.
 *
 * Every section is flow layout inside its fixed-height Section: the heights
 * in the route file are measured (scripts/measure-sections.mjs), not copied
 * off the frame, the same as every other page.
 *
 * LINE HEIGHTS ARE NUMBERS, NOT `leading-normal`. Figma's "normal" is the
 * font's own line height (1.3 for IBM Plex Sans, ~1.19 for Roboto); Tailwind's
 * `leading-normal` is 1.5, which made every heading block 18px taller than
 * the frame on the first pass.
 *
 * BOARD: centred heading blocks (eyebrow · 36px title · 16px lead, gap 10)
 * over the content on a 44px gap, py90 — the intro alone is py100 and
 * left-aligned. PHONE: px20, py44, gap 20-24, titles 22px, and the three
 * leads the phone frame drops are hidden there (see the note in itad.ts).
 */

function Heading({ eyebrow, title, lead, width = 780, hideLeadOnPhone = false, phoneTitle = 'text-[22px]' }: {
  eyebrow: string
  title: string
  lead?: string
  width?: number
  hideLeadOnPhone?: boolean
  phoneTitle?: string
}) {
  return (
    <div
      className="flex w-full flex-col items-center gap-[20px] text-center lg:w-[var(--hw)] lg:gap-[10px]"
      style={{ '--hw': `${width}px` } as React.CSSProperties}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className={`w-full font-sans ${phoneTitle} font-semibold leading-[1.28] text-black lg:text-[36px] lg:leading-[1.3]`}>{title}</h2>
      {lead && (
        <p className={`w-full font-roboto text-[14px] leading-[1.19] text-muted lg:text-[16px] ${hideLeadOnPhone ? 'max-lg:hidden' : ''}`}>{lead}</p>
      )}
    </div>
  )
}

/** Intro — 6779:2661 (py100, a 700 column and the 502 "What's Included" card, gap 80) / 6783:2667. */
export function ItadIntro({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6779:2661"
      className="flex flex-col bg-white px-[20px] pb-[40px] pt-[44px] lg:items-center lg:px-0 lg:py-[100px]">
      <div className="flex w-full flex-col gap-[18px] lg:w-[1282px] lg:flex-row lg:items-start lg:gap-[80px]">
        <div className="flex w-full flex-col items-start gap-[18px] lg:w-[700px] lg:shrink-0 lg:gap-[20px]">
          <Eyebrow>{INTRO.eyebrow}</Eyebrow>
          <h2 className="font-sans text-[26px] font-semibold leading-[1.25] text-heading lg:text-[36px] lg:leading-[1.2]">{INTRO.heading}</h2>
          {INTRO.paragraphs.map((p) => (
            <p key={p} className="font-roboto text-[14.5px] leading-[1.6] text-muted lg:text-[16px] lg:leading-[1.65]">{p}</p>
          ))}
          <Btn href={INTRO.cta.href} variant="colored" className="max-lg:h-[46px] max-lg:w-full max-lg:justify-center">{INTRO.cta.label}</Btn>
        </div>

        {/* What's Included — 6779:2677 / 6783:2681. */}
        <div className="flex w-full flex-col items-start gap-[16px] rounded-[12px] bg-brand-soft p-[24px] lg:w-[502px] lg:shrink-0 lg:gap-[20px] lg:p-[32px]">
          <h3 className="font-sans text-[17px] font-medium leading-[1.3] text-heading lg:text-[19px]">{INTRO.included.title}</h3>
          <ul className="flex flex-col gap-[16px] lg:gap-[20px]">
            {INTRO.included.items.map((it) => (
              <li key={it} className="flex items-center gap-[10px] font-poppins text-[13.5px] leading-[1.5] text-[#333] lg:gap-[12px] lg:text-[14.5px]">
                <span className="size-[7px] shrink-0 rounded-full bg-brand lg:size-[8px]" aria-hidden="true" />
                {it}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

/** Why it matters — 6779:2662 (three 410 cards, gap 24) / 6783:2668 (stacked, gap 20). */
export function ItadWhy({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6779:2662"
      className="flex flex-col items-center gap-[20px] bg-[#fcfcfc] px-[20px] py-[44px] lg:gap-[44px] lg:px-0 lg:py-[90px]">
      <Heading eyebrow={WHY.eyebrow} title={WHY.heading} lead={WHY.lead} width={820} hideLeadOnPhone />
      <div className="flex w-full flex-col gap-[20px] lg:w-auto lg:flex-row lg:items-stretch lg:gap-[24px]">
        {WHY.cards.map((c) => (
          <article key={c.title} className="flex w-full flex-col gap-[12px] rounded-[12px] border border-line bg-white p-[23px] lg:w-[410px] lg:shrink-0 lg:gap-[16px] lg:p-[32px]">
            <h3 className="font-sans text-[17px] font-medium leading-[1.3] text-heading lg:text-[20px]">{c.title}</h3>
            <p className="font-roboto text-[14px] leading-[1.5] text-muted lg:text-[15px] lg:leading-[1.6]">{c.body}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

/** Complete IT disposal services — 6779:2663 (four 302 cards, gap 20) / 6783:2669. */
export function ItadServices({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6779:2663"
      className="flex flex-col items-center gap-[20px] bg-white px-[20px] py-[44px] lg:gap-[44px] lg:px-0 lg:py-[90px]">
      <Heading eyebrow={SERVICES.eyebrow} title={SERVICES.heading} lead={SERVICES.lead} hideLeadOnPhone />
      <div className="flex w-full flex-col gap-[20px] lg:w-auto lg:flex-row lg:items-stretch">
        {SERVICES.cards.map((c) => (
          <article key={c.title} className="flex w-full flex-col items-start gap-[14px] rounded-[12px] bg-[#f4f4f4] px-[24px] py-[28px] lg:w-[302px] lg:shrink-0">
            <div className="relative aspect-[2048/1152] w-full overflow-hidden rounded-[20px]">
              <Image src={c.img} alt="" fill sizes="(min-width: 1024px) 254px, 302px" className="object-cover" />
            </div>
            <h3 className="font-sans text-[17px] font-medium leading-[1.3] text-heading">{c.title}</h3>
            <p className="font-roboto text-[14px] leading-[1.55] text-muted">{c.body}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

/**
 * How our ITAD services work — 6779:2664: four 260 cards with a 20px arrow
 * between each, 20 either side of it (1220 in all). 6783:2670 on the phone:
 * the cards stack 14 apart and the arrows go — a vertical list reads in order
 * without them, which is what the frame draws.
 */
export function ItadProcess({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6779:2664"
      className="flex flex-col items-center gap-[24px] bg-[#fcfcfc] px-[20px] py-[44px] lg:gap-[44px] lg:px-0 lg:py-[90px]">
      <Heading eyebrow={PROCESS.eyebrow} title={PROCESS.heading} />
      {/* The arrow sits INSIDE each step, hung in the 60px gap to its right
          (20 + 20 arrow + 20), so the list is four items to a screen reader
          and not seven. */}
      <ol className="flex w-full flex-col gap-[14px] lg:w-auto lg:flex-row lg:items-stretch lg:gap-[60px]">
        {PROCESS.steps.map((s, i) => (
          <li key={s.title} className="relative flex w-full flex-col gap-[6px] rounded-[12px] border border-[#e6e6e6] bg-white p-[20px] lg:w-[260px] lg:shrink-0 lg:gap-[14px] lg:px-[24px] lg:py-[28px]">
            <h3 className="font-sans text-[16px] font-medium leading-[1.3] text-heading lg:text-[17px]">{s.title}</h3>
            <p className="font-roboto text-[13px] leading-[1.5] text-muted lg:w-[212px] lg:text-[13.5px]">{s.body}</p>
            {i < PROCESS.steps.length - 1 && (
              <Image src="/images/itad/step-arrow.svg" alt="" width={20} height={20} aria-hidden="true"
                className="absolute -right-[41px] top-1/2 size-[20px] -translate-y-1/2 max-lg:hidden" />
            )}
          </li>
        ))}
      </ol>
    </Section>
  )
}

/** Our prominent features — 6779:2665 (two 410 columns, 24 across and 44 down) / 6783:2671. */
export function ItadFeatures({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6779:2665"
      className="flex flex-col items-center gap-[20px] bg-white px-[20px] py-[44px] lg:gap-[44px] lg:px-0 lg:py-[90px]">
      <Heading eyebrow={FEATURES.eyebrow} title={FEATURES.heading} lead={FEATURES.lead} hideLeadOnPhone />
      <ul className="grid w-full grid-cols-1 gap-[20px] lg:w-[844px] lg:grid-cols-[repeat(2,410px)] lg:gap-x-[24px] lg:gap-y-[44px]">
        {FEATURES.items.map((f) => (
          <li key={f.text} className="flex h-[80px] items-center gap-[16px] rounded-[12px] bg-brand-soft px-[20px] lg:h-[90px] lg:gap-[18px] lg:px-[24px]">
            <span className="grid size-[40px] shrink-0 place-items-center rounded-full bg-brand lg:size-[44px]">
              <Image src={f.icon} alt="" width={20} height={20} unoptimized className="size-[18px] lg:size-[20px]" />
            </span>
            <span className="font-sans text-[14px] font-medium leading-[1.35] text-heading lg:w-[300px] lg:text-[15.5px]">{f.text}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}

/** Book a pickup — 6779:2666 (pt90 pb100, the 900 form card) / 6783:2672 (pt44 pb56). */
export function ItadPickup({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6779:2666"
      className="flex flex-col items-center gap-[24px] bg-[#fcfcfc] px-[20px] pb-[56px] pt-[44px] lg:gap-[44px] lg:px-0 lg:pb-[100px] lg:pt-[90px]">
      {/* A scroll target for anything that wants to send people straight to
          the form. Offset for the sticky header, as on /contact-us/. */}
      <span id="book-a-pickup" className="absolute -top-[140px]" aria-hidden="true" />
      <Heading eyebrow={PICKUP.eyebrow} title={PICKUP.heading} lead={PICKUP.lead} phoneTitle="text-[24px]" />
      <PickupForm />
    </Section>
  )
}
