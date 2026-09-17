import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { Mark } from '@/components/sections/why/WhyMarks'
import { TRUST } from '@/data/why-choose-us'

/**
 * Why businesses trust us — Figma 6379:1035. py 100, gap 50; three 410px cards
 * on a 24px gutter. These cards carry no border — the #fcfcfc section is what
 * separates them — and their disc and title run a size smaller than the
 * differentiator cards above.
 */
export function WhyTrust({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6379:1035"
      className="flex flex-col items-center gap-[50px] bg-[#fcfcfc] py-[100px]">
      <div className="flex w-[780px] flex-col items-center gap-[10px] text-center">
        <Eyebrow>{TRUST.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[40px] font-semibold leading-[1.3] text-black">{TRUST.heading}</h2>
        <p className="font-roboto text-[17px] leading-[1.175] text-muted">{TRUST.lead}</p>
      </div>

      <ul className="flex items-start gap-[24px]">
        {TRUST.cards.map((c) => (
          <li key={c.title} className="flex w-[410px] shrink-0 flex-col items-start gap-[14px] rounded-[12px] bg-white p-[32px]">
            <span className="grid size-[44px] shrink-0 place-items-center rounded-full bg-brand fill-white">
              <Mark glyph={c.glyph} size={20} />
            </span>
            <h3 className="font-sans text-[19px] font-medium leading-[1.3] text-heading">{c.title}</h3>
            <p className="font-roboto text-[14.5px] leading-[1.6] text-muted">{c.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
