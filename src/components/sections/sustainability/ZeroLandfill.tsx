import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { Mark } from './SustainabilityMarks'
import { ZERO_LANDFILL } from '@/data/sustainability'

/**
 * Zero-landfill commitment — Figma 6383:1162. py 100 on #fcfcfc, gap 50:
 * an 820px heading block, then three 410px cards on a 24px gutter (1278, x321).
 *
 * The copy here overrules the content doc on a factual claim, not on phrasing.
 * Read the note above ZERO_LANDFILL in src/data/sustainability.ts before
 * changing any of these three cards.
 *
 * MOBILE — Figma 6638:10228. 390 wide: px20 / py48 on the same #fcfcfc, a flat
 * 24px gap, heading block left-aligned at 26/32 over 16/24, and the three
 * bordered white cards stacked full width 16 apart at r16 / p24.
 *
 * The mobile frame carries the SAME softened copy the board does — "processed
 * for recovery, not sent straight to a dump", and the PCB-capacitor
 * incineration exception intact. Nothing here needed defending.
 */
export function ZeroLandfill({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6383:1162"
      className="flex flex-col items-start gap-[24px] bg-[#fcfcfc] px-[20px] py-[48px] lg:items-center lg:gap-[50px] lg:px-0 lg:py-[100px]">
      {/* Heading block — 6383:1191 / 6638:10229..10232 */}
      <div className="flex w-full flex-col items-start gap-[24px] lg:w-[820px] lg:items-center lg:gap-[10px] lg:text-center">
        <Eyebrow>{ZERO_LANDFILL.eyebrow}</Eyebrow>
        <h2 className="w-full font-sans text-[26px] font-semibold leading-[32px] text-black lg:w-[820px] lg:text-[40px] lg:leading-[1.3]">
          {ZERO_LANDFILL.heading}
        </h2>
        <p className="w-full font-roboto text-[16px] leading-[24px] text-muted lg:w-[820px] lg:text-[17px] lg:leading-[1.175]">{ZERO_LANDFILL.lead}</p>
      </div>

      {/* Cards — 6383:1196 / 6638:10233 */}
      <div className="flex w-full flex-col items-stretch gap-[16px] lg:w-auto lg:flex-row lg:items-start lg:gap-[24px]">
        {ZERO_LANDFILL.cards.map((c) => (
          <article key={c.title}
            className="flex w-full flex-col items-start gap-[16px] rounded-[16px] border border-line bg-white p-[24px] lg:w-[410px] lg:shrink-0 lg:rounded-[12px] lg:p-[32px]">
            <span className="grid size-[48px] shrink-0 place-items-center rounded-full bg-brand fill-white">
              <Mark glyph={c.glyph} size={22} />
            </span>
            <h3 className="w-full font-sans text-[19px] font-medium leading-[25px] text-heading lg:w-[346px] lg:leading-[1.3]">{c.title}</h3>
            <p className="w-full font-roboto text-[14px] leading-[21px] text-muted lg:w-[346px] lg:text-[14.5px] lg:leading-[1.6]">{c.body}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
