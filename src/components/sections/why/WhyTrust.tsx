import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { Mark } from '@/components/sections/why/WhyMarks'
import { TRUST } from '@/data/why-choose-us'

/**
 * Why businesses trust us — Figma 6379:1035. py 100, gap 50; three 410px cards
 * on a 24px gutter. These cards carry no border — the #fcfcfc section is what
 * separates them — and their disc and title run a size smaller than the
 * differentiator cards above.
 *
 * MOBILE — Figma 6638:9114. 390 wide: px20 / py48, flat 24px gap, heading block
 * left-aligned, cards stacked full width 16 apart. The section goes to white
 * and the cards to #f6f6f6 — the inverse of the board, which is what keeps a
 * borderless card readable once the two tones swap.
 */
export function WhyTrust({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6379:1035"
      className="flex flex-col items-start gap-[24px] bg-white px-[20px] py-[48px] lg:items-center lg:gap-[50px] lg:bg-[#fcfcfc] lg:px-0 lg:py-[100px]">
      {/* Heading block — 6379:1060 / 6638:9115..9118. */}
      <div className="flex w-full flex-col items-center gap-[24px] text-center lg:w-[780px] lg:items-center lg:gap-[10px] lg:text-center">
        <Eyebrow>{TRUST.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[26px] font-semibold leading-[32px] text-black lg:text-[40px] lg:leading-[1.3]">{TRUST.heading}</h2>
        <p className="font-roboto text-[16px] leading-[24px] text-muted lg:text-[17px] lg:leading-[1.175]">{TRUST.lead}</p>
      </div>

      {/* Cards — 6379:1065 / 6638:9119. */}
      <ul className="flex w-full flex-col items-stretch gap-[16px] lg:w-auto lg:flex-row lg:items-start lg:gap-[24px]">
        {TRUST.cards.map((c) => (
          <li key={c.title} className="grad-card flex w-full flex-col items-start gap-[16px] rounded-[16px] bg-card p-[24px] lg:w-[410px] lg:shrink-0 lg:gap-[14px] lg:rounded-[12px] lg:bg-white lg:p-[32px]">
            <span className="grad-card__disc grid size-[44px] shrink-0 place-items-center rounded-full bg-brand fill-white transition-colors">
              <Mark glyph={c.glyph} size={20} />
            </span>
            <h3 className="font-sans text-[19px] font-medium leading-[25px] text-heading lg:leading-[1.3]">{c.title}</h3>
            <p className="font-roboto text-[14px] leading-[21px] text-muted lg:text-[14.5px] lg:leading-[1.6]">{c.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
