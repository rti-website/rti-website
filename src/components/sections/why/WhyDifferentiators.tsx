import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { Mark } from '@/components/sections/why/WhyMarks'
import { DIFFERENTIATORS } from '@/data/why-choose-us'

/**
 * What sets us apart — Figma 6379:1033. py 100, gap 50: heading block on a
 * 780px column, then three 410px cards on a 24px gutter (1278 total, x321).
 * The same card frame as the About Us mission/vision/values row.
 */
export function WhyDifferentiators({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6379:1033"
      className="flex flex-col items-center gap-[50px] bg-white py-[100px]">
      <div className="flex w-[780px] flex-col items-center gap-[10px] text-center">
        <Eyebrow>{DIFFERENTIATORS.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[40px] font-semibold leading-[1.3] text-black">{DIFFERENTIATORS.heading}</h2>
        <p className="font-roboto text-[17px] leading-[1.175] text-muted">{DIFFERENTIATORS.lead}</p>
      </div>

      <ul className="flex items-start gap-[24px]">
        {DIFFERENTIATORS.cards.map((c) => (
          <li key={c.title} className="flex w-[410px] shrink-0 flex-col items-start gap-[16px] rounded-[12px] border border-line bg-white p-[32px]">
            <span className="grid size-[48px] shrink-0 place-items-center rounded-full bg-brand fill-white">
              <Mark glyph={c.glyph} size={22} />
            </span>
            <h3 className="font-sans text-[20px] font-medium leading-[1.3] text-heading">{c.title}</h3>
            <p className="font-roboto text-[15px] leading-[1.6] text-muted">{c.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
