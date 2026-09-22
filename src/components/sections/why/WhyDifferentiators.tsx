import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { Mark } from '@/components/sections/why/WhyMarks'
import { DIFFERENTIATORS } from '@/data/why-choose-us'

/**
 * What sets us apart — Figma 6379:1033. py 100, gap 50: heading block on a
 * 780px column, then three 410px cards on a 24px gutter (1278 total, x321).
 * The same card frame as the About Us mission/vision/values row.
 *
 * MOBILE — Figma 6638:8761 ("Why Choose Us - Mobile" 6638:8261). 390 wide:
 * px20 / py48 on white, a flat 24px gap, and the heading block LEFT-aligned
 * rather than centred. The cards stack full width 16 apart and change dress:
 * the board's white card with a #e5e5e5 hairline becomes a borderless
 * #f6f6f6 plate at r16 / p24, because a white card on a white section needs
 * the border and a grey one does not.
 */
export function WhyDifferentiators({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6379:1033"
      className="flex flex-col items-start gap-[24px] bg-white px-[20px] py-[48px] lg:items-center lg:gap-[50px] lg:px-0 lg:py-[100px]">
      {/* Heading block — 6379:1037 / 6638:8762..8765. */}
      <div className="flex w-full flex-col items-start gap-[24px] lg:w-[780px] lg:items-center lg:gap-[10px] lg:text-center">
        <Eyebrow>{DIFFERENTIATORS.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[26px] font-semibold leading-[32px] text-black lg:text-[40px] lg:leading-[1.3]">{DIFFERENTIATORS.heading}</h2>
        <p className="font-roboto text-[16px] leading-[24px] text-muted lg:text-[17px] lg:leading-[1.175]">{DIFFERENTIATORS.lead}</p>
      </div>

      {/* Cards — 6379:1042 / 6638:8766. */}
      <ul className="flex w-full flex-col items-stretch gap-[16px] lg:w-auto lg:flex-row lg:items-start lg:gap-[24px]">
        {DIFFERENTIATORS.cards.map((c) => (
          <li key={c.title} className="grad-card flex w-full flex-col items-start gap-[16px] rounded-[16px] border-0 bg-card p-[24px] lg:w-[410px] lg:shrink-0 lg:rounded-[12px] lg:border lg:border-line lg:bg-white lg:p-[32px]">
            <span className="grad-card__disc grid size-[48px] shrink-0 place-items-center rounded-full bg-brand fill-white transition-colors">
              <Mark glyph={c.glyph} size={22} />
            </span>
            <h3 className="font-sans text-[19px] font-medium leading-[25px] text-heading lg:text-[20px] lg:leading-[1.3]">{c.title}</h3>
            <p className="font-roboto text-[14px] leading-[21px] text-muted lg:text-[15px] lg:leading-[1.6]">{c.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
