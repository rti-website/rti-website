import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { DETAIL_COPY, type Facility } from '@/data/facilities'

/**
 * "Dropping Off at This Location" — Figma 6744:8797 / 6746:8589. Identical on
 * both frames, copy included.
 *
 * #fcfcfc, py90, gap 44: a 780px heading block (eyebrow + 36px title, no lead)
 * over three 302x210 cards 24 apart — white, 1px #e6e6e6, r12, p28, gap 14,
 * each a 36px teal disc with the step number, a 17px title and a 14/1.55 body.
 *
 * MOBILE — 6751:8458. Cards stack at 350x165, 24 apart, p23, disc 32, and the
 * body is the frame's SHORT wording. Both wordings ship from
 * src/data/facilities.ts; the phone hides one and the board the other.
 */
export function LocationSteps({ top, height, f }: { top: number; height: number; f: Facility }) {
  return (
    <Section top={top} height={height} label="6744:8797" className="flex flex-col items-center gap-[24px] bg-[#fcfcfc] px-[20px] py-[44px] lg:gap-[44px] lg:px-0 lg:py-[90px]">
      <div className="flex w-full flex-col items-center gap-[10px] text-center lg:w-[780px]">
        <Eyebrow>{DETAIL_COPY.steps.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[24px] font-semibold leading-[30px] text-black lg:text-[36px] lg:leading-normal">{DETAIL_COPY.steps.heading}</h2>
      </div>

      <ol className="flex w-full flex-col gap-[24px] lg:w-auto lg:flex-row lg:items-start">
        {f.steps.map((s, i) => (
          <li key={s.title} className="flex w-full flex-col gap-[12px] rounded-[12px] border border-[#e6e6e6] bg-white p-[23px] lg:h-[210px] lg:w-[302px] lg:gap-[14px] lg:p-[28px]">
            <span className="grid size-[32px] place-items-center rounded-full bg-brand font-sans text-[14px] font-medium text-white lg:size-[36px] lg:text-[15px]" aria-hidden="true">
              {i + 1}
            </span>
            <h3 className="font-sans text-[16px] font-medium leading-normal text-heading lg:text-[17px]">
              <span className="sr-only">Step {i + 1}: </span>{s.title}
            </h3>
            <p className="font-roboto text-[14px] leading-[1.5] text-muted lg:hidden">{s.bodyShort}</p>
            <p className="font-roboto text-[14px] leading-[1.55] text-muted max-lg:hidden">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
