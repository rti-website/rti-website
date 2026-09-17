import { Section } from '@/components/design/Frame'
import { Mark } from '@/components/sections/why/WhyMarks'
import { CALLOUT } from '@/data/why-choose-us'

/**
 * Certified & Accountable — Figma 6379:1034. py 70, gap 40, on the teal tint:
 * a 30px centred heading, three 220px columns on a 60px gutter (780 total), and
 * the Wisconsin footnote underneath.
 */
export function WhyCallout({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6379:1034"
      className="flex flex-col items-center gap-[40px] bg-brand-soft py-[70px]">
      <h2 className="w-[780px] text-center font-sans text-[30px] font-semibold leading-[1.3] text-heading">
        {CALLOUT.heading}
      </h2>

      <ul className="flex items-start gap-[60px]">
        {CALLOUT.items.map((i) => (
          <li key={i.title} className="flex w-[220px] flex-col items-center gap-[10px] text-center">
            <span className="grid size-[64px] shrink-0 place-items-center rounded-full bg-white fill-brand shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]">
              <Mark glyph={i.glyph} size={28} />
            </span>
            <span className="whitespace-nowrap font-sans text-[16px] font-medium leading-[1.3] text-heading">{i.title}</span>
            <span className="font-roboto text-[13px] leading-[1.175] text-muted">{i.sub}</span>
          </li>
        ))}
      </ul>

      <p className="w-[600px] text-center font-roboto text-[13.5px] leading-[1.175] text-muted">
        {CALLOUT.footnote}
      </p>
    </Section>
  )
}
