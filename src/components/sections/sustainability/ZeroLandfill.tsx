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
 */
export function ZeroLandfill({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6383:1162"
      className="flex flex-col items-center gap-[50px] bg-[#fcfcfc] py-[100px]">
      {/* Heading block — 6383:1191 */}
      <div className="flex w-[820px] flex-col items-center gap-[10px] text-center">
        <Eyebrow>{ZERO_LANDFILL.eyebrow}</Eyebrow>
        <h2 className="w-[820px] font-sans text-[40px] font-semibold leading-[1.3] text-black">
          {ZERO_LANDFILL.heading}
        </h2>
        <p className="w-[820px] font-roboto text-[17px] leading-[1.175] text-muted">{ZERO_LANDFILL.lead}</p>
      </div>

      {/* Cards — 6383:1196 */}
      <div className="flex items-start gap-[24px]">
        {ZERO_LANDFILL.cards.map((c) => (
          <article key={c.title}
            className="flex w-[410px] shrink-0 flex-col items-start gap-[16px] rounded-[12px] border border-line bg-white p-[32px]">
            <span className="grid size-[48px] shrink-0 place-items-center rounded-full bg-brand fill-white">
              <Mark glyph={c.glyph} size={22} />
            </span>
            <h3 className="w-[346px] font-sans text-[19px] font-medium leading-[1.3] text-heading">{c.title}</h3>
            <p className="w-[346px] font-roboto text-[14.5px] leading-[1.6] text-muted">{c.body}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
