import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { Mark } from './SustainabilityMarks'
import { GOALS } from '@/data/sustainability'

/**
 * Where we're headed — Figma 6383:1164. py 100 on white, gap 50: a 780px
 * heading block, then four 302px cards on a 24px gutter (1280, x320).
 *
 * The four goals are Asim's revised copy (23 Sep 2026), not the frame's — the
 * frame names a different four; the geometry is identical either way.
 *
 * EQUAL HEIGHTS — Asim, 23 Sep 2026: "make the size of all cards equal". The
 * row is `lg:items-stretch`, so all four take the tallest one's height.
 *
 * MOBILE — Figma 6638:10515. 390 wide: px20 / py48 on white, a flat 24px gap,
 * heading block left-aligned, and the four cards stacked full width 16 apart on
 * #f6f6f6 at r16 / p24 with their title up to 19/25.
 *
 * !! The mobile frame names the SAME four goals the desktop frame does
 * ("Expand Certified Capacity", "Widen Accessible Recycling", "Maintain Full
 * Transparency", "Strengthen the Circular Loop") — so that is now two frames
 * against the doc's four. Still built as the doc's, per doc-wins-on-words, but
 * it is worth a decision. See TODO_FOR_DESIGN.
 */
export function SustainabilityGoals({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6383:1164"
      className="flex flex-col items-start gap-[24px] bg-white px-[20px] py-[48px] lg:items-center lg:gap-[50px] lg:px-0 lg:py-[100px]">
      {/* Heading block — 6383:1236 / 6638:10516..10519 */}
      <div className="flex w-full flex-col items-center gap-[24px] text-center lg:w-[780px] lg:items-center lg:gap-[10px] lg:text-center">
        <Eyebrow>{GOALS.eyebrow}</Eyebrow>
        <h2 className="w-full font-sans text-[26px] font-semibold leading-[32px] text-black lg:w-[780px] lg:text-[40px] lg:leading-[1.3]">{GOALS.heading}</h2>
        <p className="w-full font-roboto text-[16px] leading-[24px] text-muted lg:w-[780px] lg:text-[17px] lg:leading-[1.175]">{GOALS.lead}</p>
      </div>

      {/* Cards — 6383:1241 / 6638:10520 */}
      <div className="flex w-full flex-col items-stretch gap-[16px] lg:w-auto lg:flex-row lg:items-stretch lg:gap-[24px]">
        {GOALS.cards.map((c) => (
          <article key={c.title}
            className="flex w-full flex-col items-start gap-[16px] rounded-[16px] bg-card p-[24px] lg:w-[302px] lg:shrink-0 lg:gap-[14px] lg:rounded-[12px] lg:bg-brand-soft lg:p-[28px]">
            <span className="grid size-[44px] shrink-0 place-items-center rounded-full bg-brand fill-white">
              <Mark glyph={c.glyph} size={20} />
            </span>
            <h3 className="w-full font-sans text-[19px] font-medium leading-[25px] text-heading lg:w-[246px] lg:text-[17px] lg:leading-[1.3]">{c.title}</h3>
            <p className="w-full font-roboto text-[14px] leading-[21px] text-muted lg:w-[246px] lg:leading-[1.55]">{c.body}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
