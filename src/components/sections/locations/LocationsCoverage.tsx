import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { FactsCard } from '@/components/ui/FactsCard'
import { COVERAGE } from '@/data/locations'

/**
 * Coverage note — Figma 6377:968. The same two-column shape as the About Us
 * story section: a 700px prose column and the 502px teal facts card with an
 * 80px gutter, inside 100px of section padding.
 *
 * MOBILE — Figma 6670:2383. 390 wide: px20 / py48, the two columns stacked 32
 * apart, prose left-aligned at 28/34 over 15/22, and the facts card full width
 * with its 32px padding and 20px gap unchanged. The frame draws the section on
 * white rather than the board's #fcfcfc.
 */
export function LocationsCoverage({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6377:968"
      className="flex flex-col items-start gap-[32px] bg-white px-[20px] py-[48px] lg:items-center lg:gap-0 lg:bg-[#fcfcfc] lg:px-0 lg:py-[100px]">
      {/* One row at lg, two items in the section's own column below it. */}
      <div className="flex w-[1282px] items-start gap-[80px] max-lg:contents">
        <div className="flex w-full flex-col items-start gap-[16px] lg:w-[700px] lg:shrink-0 lg:gap-[20px]">
          <Eyebrow>{COVERAGE.eyebrow}</Eyebrow>
          <h2 className="font-sans text-[28px] font-semibold leading-[34px] text-heading lg:text-[36px] lg:leading-[1.2]">{COVERAGE.heading}</h2>
          {COVERAGE.body.map((p) => (
            <p key={p} className="font-roboto text-[15px] leading-[22px] text-muted lg:text-[16px] lg:leading-[1.6]">{p}</p>
          ))}
        </div>
        {/*
          6670:2390 draws the card full width with its bullet text filling the
          row. `ui/FactsCard.tsx` still pins 502 and 400 and belongs to another
          pass, so both are out-ranked from here and handed straight back at lg,
          where `lg:contents` leaves the card a direct child of the row exactly
          as before. Delete these utilities once FactsCard answers the frame.
        */}
        <div className="w-full lg:contents
          max-lg:[&>div]:w-full! max-lg:[&_li>span:last-child]:w-auto! max-lg:[&_li>span:last-child]:min-w-0! max-lg:[&_li>span:last-child]:flex-1!">
          <FactsCard title={COVERAGE.cardTitle} items={COVERAGE.card} />
        </div>
      </div>
    </Section>
  )
}
