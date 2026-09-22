import { Section } from '@/components/design/Frame'
import { GLYPHS } from '@/components/ui/Glyph'
import { DETAIL_COPY, type Facility } from '@/data/facilities'

/**
 * Quick-info bar — Figma 6744:8794 (Minnesota) / 6746:8487 (Wisconsin).
 *
 * A white section, py50, holding one 1282x98 plate (#fcfcfc, 1px #e6e6e6,
 * r16, px36 py28) with four items spread across it: a 40px white tile carrying
 * an 18px glyph, then a 12px grey label over a 14.5px medium value.
 *
 * The four tiles are laid out with `justify-between`, as the frame does —
 * their x positions (37, 417, 728, 1095 on Minnesota; 37, 470, 754, 1094 on
 * Wisconsin) are the result of the frame's own justify, not hand placement,
 * which is why the two pages differ: Wisconsin's longer address pushes the
 * others right.
 *
 * MOBILE — 6750:8517. The plate becomes a 350px card with the four items
 * stacked, 18 apart, tiles at 38 with a 17px glyph.
 */
export function LocationQuickInfo({ top, height, f }: { top: number; height: number; f: Facility }) {
  const items = [
    { glyph: 'pin' as const,   label: DETAIL_COPY.quickInfo.address, value: f.addressShort },
    { glyph: 'phone' as const, label: DETAIL_COPY.quickInfo.phone,   value: f.phone, href: `tel:${f.phone.replace(/[^+\d]/g, '')}` },
    { glyph: 'clock' as const, label: DETAIL_COPY.quickInfo.hours,   value: f.hoursShort },
    { glyph: 'badge' as const, label: DETAIL_COPY.quickInfo.cert,    value: f.cert.status },
  ]
  return (
    <Section top={top} height={height} label="6744:8794" className="flex flex-col items-center bg-white px-[20px] py-[32px] lg:px-0 lg:py-[50px]">
      <div className="flex w-full flex-col gap-[18px] rounded-[16px] border border-[#e6e6e6] bg-[#fcfcfc] px-[21px] py-[21px] lg:w-[1282px] lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:px-[36px] lg:py-[28px]">
        {items.map((it) => {
          const inner = (
            <>
              <span className="grid size-[38px] shrink-0 place-items-center rounded-[10px] bg-white lg:size-[40px]">
                <svg viewBox="0 0 16 16" className="size-[17px] fill-brand lg:size-[18px]" aria-hidden="true"><path d={GLYPHS[it.glyph]} /></svg>
              </span>
              <span className="flex min-w-px flex-col gap-[2px]">
                <span className="font-roboto text-[12px] uppercase leading-normal text-muted">{it.label}</span>
                <span className="font-sans text-[14.5px] font-medium leading-normal text-heading lg:whitespace-nowrap">{it.value}</span>
              </span>
            </>
          )
          return it.href
            ? <a key={it.label} href={it.href} className="flex items-center gap-[12px] hover:[&_span:last-child]:text-brand lg:gap-[14px]">{inner}</a>
            : <div key={it.label} className="flex items-center gap-[12px] lg:gap-[14px]">{inner}</div>
        })}
      </div>
    </Section>
  )
}
