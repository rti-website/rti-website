import Image from 'next/image'
import { Section } from '@/components/design/Frame'
import { Btn, Eyebrow, Lead } from '@/components/ui/Bits'
import { GLYPHS } from '@/components/ui/Glyph'
import { FACILITIES, HUB_CARDS, type Facility } from '@/data/facilities'

/**
 * "Licensed Facilities Ready to Serve You" — Figma 6743:2450 on /all-locations/,
 * added to the frame by the designer on 22 Sep 2026 and built the same day.
 *
 * Desktop: pt90 pb100 on #fcfcfc, a 780px heading block, then two 613px
 * cards 28 apart on a 1254px row. Each card is a 110px gradient header (navy
 * to green at 163.94°) carrying a 48px disc, the name at 22px and the R2v3
 * mark, over a white body with the address and phone rows, a hairline and two
 * buttons. The first button opens the facility's own page; the second opens
 * Google Maps directions, in a new tab, because it is not this site.
 *
 * REDRAWN 25 Sep 2026 (Asim: "make it exactly like the figma"): the hours row
 * and the "Materials Accepted" chips are gone from the cards (both still show
 * on each facility's own page), the section went to #fcfcfc with 100 below,
 * and the R2v3 mark sits bare on the gradient, 44.6 x 46.46, as drawn.
 * The frame still draws Wisconsin with the NAID AAA badge; it keeps R2v3, as
 * Asim asked on 24 Sep 2026 ("in Wisconsin add the R2v3 and remove the AAA
 * logo"), which is also what the phone frame draws.
 *
 * MOBILE — 6750:2563 in "Locations - Mobile" (6747:2557). The cards stack at
 * 350 wide; the header is one row like the desktop's — pin disc left, name,
 * R2v3 mark right (24 Sep 2026; the frame put the name under them); detail-row glyphs go 18 → 16,
 * chips 28 → 26, and the two buttons stack full width at 44 tall. Same DOM,
 * two flows.
 *
 * The card header's gradient is the same navy-to-green the closing CTA and
 * the contact page's facility cards use, drawn at the frame's own angle.
 */
export function LocationCards({ top, height }: { top: number; height: number }) {
  return (
    <Section
      top={top} height={height} label="6743:2450"
      className="flex flex-col items-center gap-[28px] bg-[#fcfcfc] px-[20px] py-[44px] lg:gap-[44px] lg:px-0 lg:pb-[100px] lg:pt-[90px]"
    >
      <div className="flex w-full flex-col items-center gap-[10px] text-center lg:w-[780px]">
        <Eyebrow>{HUB_CARDS.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[24px] font-semibold leading-[1.25] text-black lg:text-[38px] lg:leading-[1.3]">{HUB_CARDS.heading}</h2>
        <Lead className="max-lg:hidden">{HUB_CARDS.lead}</Lead>
      </div>

      {/* `items-stretch`, not the frame's `items-start`: Figma draws the two
          cards at their own heights (475 and 439 — Minnesota's six chips
          wrap to a second row), and Asim asked for them equal on 22 Sep 2026.
          The row stretches both to the taller one, and the body below pins
          its buttons to the bottom so the two button rows sit level. */}
      <div className="flex w-full flex-col gap-[28px] lg:w-[1254px] lg:flex-row lg:items-stretch">
        {FACILITIES.map((f) => <Card key={f.slug} f={f} />)}
      </div>
    </Section>
  )
}

function Card({ f }: { f: Facility }) {
  const rows = [
    { glyph: 'pin' as const,   text: f.cardAddress ?? f.address },
    { glyph: 'phone' as const, text: f.phone, href: `tel:${f.phone.replace(/[^+\d]/g, '')}` },
  ]
  return (
    <article className="flex w-full flex-col overflow-hidden rounded-[16px] border border-[#e6e6e6] bg-white lg:w-[613px] lg:shrink-0">
      {/* Header — 6744:2457 / 6750:2569 */}
      <div
        className="flex flex-col gap-[10px] px-[20px] py-[18px] lg:h-[110px] lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:px-[28px] lg:py-0"
        style={{ backgroundImage: 'linear-gradient(163.945deg, #0b1f3a 7.25%, #1b7a3d 79.71%)' }}
      >
        <div className="flex items-center justify-between lg:contents">
          <span className="grid size-[40px] shrink-0 place-items-center rounded-full bg-white/15 lg:size-[48px]">
            <svg viewBox="0 0 16 16" className="size-[18px] fill-white lg:size-[21.6px]" aria-hidden="true"><path d={GLYPHS.pin} /></svg>
          </span>
          {/* The name sits between the pin disc and the certification mark at
              every width: pin on the left, R2v3 on the right. On the phone it
              used to drop under both; Asim, 24 Sep 2026: "in the mobile
              version move the icons to the right side … place this [pin]
              icon on the left as it is and move the R2v3 to the right". */}
          <h3 className="ml-[12px] mr-auto min-w-px font-sans text-[20px] font-semibold leading-[25px] text-white lg:ml-[16px] lg:text-[22px] lg:leading-normal">{f.name}</h3>
          <BadgeLogo f={f} />
        </div>
      </div>

      {/* Body — 6744:2466 / 6750:2578. `flex-1` so it fills the stretched
          card; the button row carries `mt-auto` and lands on the bottom edge. */}
      <div className="flex flex-1 flex-col gap-[14px] p-[20px] lg:gap-[18px] lg:p-[28px]">
        {rows.map((r) => {
          const inner = (
            <>
              <svg viewBox="0 0 16 16" className="size-[16px] shrink-0 fill-brand lg:size-[18px]" aria-hidden="true"><path d={GLYPHS[r.glyph]} /></svg>
              <span className="min-w-px font-poppins text-[12.5px] leading-[19px] text-[#4d4d4d] lg:text-[14px] lg:leading-normal">{r.text}</span>
            </>
          )
          return r.href
            ? <a key={r.glyph} href={r.href} className="flex items-center gap-[10px] hover:[&>span]:text-brand lg:gap-[12px]">{inner}</a>
            : <div key={r.glyph} className="flex items-center gap-[10px] lg:gap-[12px]">{inner}</div>
        })}

        <span className="h-px w-full bg-[#ebebeb] max-lg:hidden" aria-hidden="true" />

        <div className="mt-auto flex flex-col gap-[10px] pt-[4px] lg:flex-row lg:gap-[12px] lg:pt-[6px]">
          <Btn href={f.url} variant="colored" className="w-full justify-center max-lg:h-[44px] lg:w-auto">{HUB_CARDS.primary}</Btn>
          <Btn href={f.mapsHref} variant="bordered" external className="w-full justify-center max-lg:h-[44px] lg:w-auto">{HUB_CARDS.secondary}</Btn>
        </div>
      </div>
    </article>
  )
}

/**
 * The certification mark in the header's right slot — Asim, 23 Sep 2026: the
 * R2v3 logo "without bg", clickable, for Minnesota, and the NAID AAA logo for
 * Wisconsin, where the text pills used to be. Since 24 Sep 2026 both cards
 * carry R2v3 (Asim: "in Wisconsin add the R2v3 and remove the AAA logo"); the
 * white-disc branch stays for any mark that brings its own white ground. R2v3 opens SERI's directory in
 * a new tab, like every R2v3 mark on the site. The NAID badge brings its own
 * white ground, so it sits on a white disc (see Facility.badgeLogo); the
 * disc's edge trims only the export's white corners.
 */
function BadgeLogo({ f }: { f: Facility }) {
  const l = f.badgeLogo
  /* Bare on the gradient since 25 Sep 2026, at the frames' size: 44.6 x 46.46
     on the board (6797:10704), 39 x 40 on the phone (6816:11025). The glass
     disc it used to sit on is gone, as the frame draws it. A mark that brings
     its own white ground (`disc`, the old NAID badge) keeps its white disc. */
  const body = l.disc ? (
    <span className="grid size-[44px] place-items-center overflow-hidden rounded-full bg-white lg:size-[56px]">
      <Image src={l.src} alt={l.href ? '' : l.alt} width={l.w * 2} height={l.h * 2} unoptimized className="size-[80%] object-contain" />
    </span>
  ) : (
    <Image src={l.src} alt={l.href ? '' : l.alt} width={90} height={94} unoptimized
      className="h-[40px] w-[39px] object-contain lg:h-[46.46px] lg:w-[44.602px]" />
  )
  return l.href ? (
    <a href={l.href} target="_blank" rel="noopener noreferrer"
      aria-label={`${l.alt} — see ${f.name} in the R2 certified facility directory (opens in a new tab)`}
      className="btn-pop grid min-h-[44px] min-w-[44px] shrink-0 place-items-center transition-opacity hover:opacity-80">
      {body}
    </a>
  ) : (
    <span className="grid shrink-0 place-items-center">{body}</span>
  )
}
