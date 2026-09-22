import { Section } from '@/components/design/Frame'
import { Btn, Eyebrow, Lead } from '@/components/ui/Bits'
import { GLYPHS } from '@/components/ui/Glyph'
import { FACILITIES, HUB_CARDS, type Facility } from '@/data/facilities'

/**
 * "Licensed Facilities Ready to Serve You" — Figma 6743:2450 on /all-locations/,
 * added to the frame by the designer on 22 Sep 2026 and built the same day.
 *
 * Desktop: py90, a 780px heading block, then two 613px cards 28 apart on a
 * 1254px row. Each card is a 110px gradient header (navy to green at 163.94°)
 * carrying a 48px disc, the name at 22px and a status pill, over a white body
 * with three detail rows, a hairline, the "Materials Accepted" chips and two
 * buttons. The first button opens the facility's own page; the second opens
 * Google Maps directions, in a new tab, because it is not this site.
 *
 * MOBILE — 6750:2563 in "Locations - Mobile" (6747:2557). The cards stack at
 * 350 wide; the header drops to 96 and puts the disc and the pill on one row
 * with the name UNDER them rather than beside; detail-row glyphs go 18 → 16,
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
      className="flex flex-col items-center gap-[28px] bg-white px-[20px] py-[44px] lg:gap-[44px] lg:px-0 lg:py-[90px]"
    >
      <div className="flex w-full flex-col items-center gap-[10px] text-center lg:w-[780px]">
        <Eyebrow>{HUB_CARDS.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[26px] font-semibold leading-[30px] text-black lg:text-[38px] lg:leading-[1.3]">{HUB_CARDS.heading}</h2>
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
    { glyph: 'pin' as const,   text: f.address },
    { glyph: 'phone' as const, text: f.phone, href: `tel:${f.phone.replace(/[^+\d]/g, '')}` },
    { glyph: 'clock' as const, text: f.hours },
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
          {/* The name sits between the disc and the pill at lg, and under both
              on the phone; `order` moves it without a second copy. */}
          <h3 className="order-3 font-sans text-[20px] font-semibold leading-[25px] text-white lg:order-none lg:ml-[16px] lg:mr-auto lg:text-[22px] lg:leading-normal">{f.name}</h3>
          <span className="flex h-[24px] shrink-0 items-center rounded-full bg-white/[0.18] px-[10px] font-roboto text-[10px] font-bold uppercase tracking-[0.4px] text-white lg:h-[28px] lg:px-[12px] lg:text-[11px]">
            {f.cert.badge}
          </span>
        </div>
      </div>

      {/* Body — 6744:2466 / 6750:2578. `flex-1` so it fills the stretched
          card; the button row carries `mt-auto` and lands on the bottom edge. */}
      <div className="flex flex-1 flex-col gap-[14px] p-[20px] lg:gap-[18px] lg:p-[28px]">
        {rows.map((r) => {
          const inner = (
            <>
              <svg viewBox="0 0 16 16" className="size-[16px] shrink-0 fill-brand lg:size-[18px]" aria-hidden="true"><path d={GLYPHS[r.glyph]} /></svg>
              <span className="min-w-px font-poppins text-[13.5px] leading-[19px] text-[#4d4d4d] lg:text-[14px] lg:leading-normal">{r.text}</span>
            </>
          )
          return r.href
            ? <a key={r.glyph} href={r.href} className="flex items-center gap-[10px] hover:[&>span]:text-brand lg:gap-[12px]">{inner}</a>
            : <div key={r.glyph} className="flex items-center gap-[10px] lg:gap-[12px]">{inner}</div>
        })}

        <span className="h-px w-full bg-[#ebebeb] max-lg:hidden" aria-hidden="true" />
        <p className="font-sans text-[13px] font-medium leading-normal text-heading max-lg:hidden">{HUB_CARDS.materialsLabel}</p>

        {/* Chips — 6744:8377. The frame breaks them into two rows by hand;
            a wrapping flex row lands on the same break at 557 and keeps
            working when the list changes. */}
        <ul className="flex flex-wrap gap-[6px] lg:gap-[8px]">
          {f.materials.map((m) => (
            <li key={m.label} className="flex h-[26px] items-center rounded-full border border-[#e0e0e0] bg-white px-[11px] font-roboto text-[12px] text-[#4d4d4d] lg:h-[28px] lg:px-[12px] lg:text-[12.5px]">
              {m.label}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-[10px] pt-[4px] lg:flex-row lg:gap-[12px] lg:pt-[6px]">
          <Btn href={f.url} variant="colored" className="w-full justify-center max-lg:h-[44px] lg:w-auto">{HUB_CARDS.primary}</Btn>
          <Btn href={f.mapsHref} variant="bordered" external className="w-full justify-center max-lg:h-[44px] lg:w-auto">{HUB_CARDS.secondary}</Btn>
        </div>
      </div>
    </article>
  )
}
