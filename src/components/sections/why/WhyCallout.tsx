import { Section } from '@/components/design/Frame'
import { Mark } from '@/components/sections/why/WhyMarks'
import { CALLOUT } from '@/data/why-choose-us'

/**
 * Certified & Accountable — Figma 6379:1034. py 70, gap 40, on the teal tint:
 * a 30px centred heading, three 220px columns on a 60px gutter (780 total), and
 * the Wisconsin footnote underneath.
 *
 * MOBILE — Figma 6638:8989. 390 wide: px20 / py48, gap 32, on #f6f6f6 rather
 * than the teal tint, and the three badges stay side by side as equal thirds
 * (116.67 each, no gutter) instead of stacking. The titles lose their
 * `nowrap` so "Minority-Owned" can take two lines, which is what the frame
 * draws.
 */
export function WhyCallout({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6379:1034"
      className="flex flex-col items-center gap-[32px] bg-card px-[20px] py-[48px] lg:gap-[40px] lg:bg-brand-soft lg:px-0 lg:py-[70px]">
      <h2 className="w-full text-center font-sans text-[26px] font-semibold leading-[32px] text-heading lg:w-[780px] lg:text-[30px] lg:leading-[1.3]">
        {CALLOUT.heading}
      </h2>

      {/* 6379:1050 / 6638:8991 — three equal thirds on the phone, three fixed
          220px columns on the board. */}
      <ul className="flex w-full items-start gap-0 lg:w-auto lg:gap-[60px]">
        {CALLOUT.items.map((i) => (
          <li key={i.title} className="flex min-w-0 flex-1 flex-col items-center gap-[12px] text-center lg:w-[220px] lg:flex-none lg:gap-[10px]">
            <span className="grid size-[64px] shrink-0 place-items-center rounded-full bg-white fill-brand shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]">
              <Mark glyph={i.glyph} size={28} />
            </span>
            <span className="font-sans text-[17px] font-medium leading-[22px] text-heading lg:whitespace-nowrap lg:text-[16px] lg:leading-[1.3]">{i.title}</span>
            <span className="font-roboto text-[13px] leading-[18px] text-muted lg:leading-[1.175]">{i.sub}</span>
          </li>
        ))}
      </ul>

      <p className="w-full text-center font-roboto text-[13px] leading-[18px] text-muted lg:w-[600px] lg:text-[13.5px] lg:leading-[1.175]">
        {CALLOUT.footnote}
      </p>
    </Section>
  )
}
