import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { FactsCard } from '@/components/ui/FactsCard'
import { COVERAGE } from '@/data/locations'

/**
 * Coverage note — Figma 6377:968. The same two-column shape as the About Us
 * story section: a 700px prose column and the 502px teal facts card with an
 * 80px gutter, inside 100px of section padding.
 *
 * MOBILE — Figma 6750:8487 (redrawn; 25 Sep 2026). 390 wide: px20 / py44,
 * everything centred and 24 apart, the heading at 24/1.28, the frame's two
 * SHORTER paragraphs at 14.5/1.6, and the facts card full width at p24 with
 * its title at 17 and 13.5/1.5 bullets 14 apart. On white, where the board
 * is #fcfcfc.
 */
export function LocationsCoverage({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6377:968"
      className="flex flex-col items-start gap-[24px] bg-white px-[20px] py-[44px] lg:items-center lg:gap-0 lg:bg-[#fcfcfc] lg:px-0 lg:py-[100px]">
      {/* One row at lg, two items in the section's own column below it. */}
      <div className="flex w-[1282px] items-start gap-[80px] max-lg:contents">
        <div className="flex w-full flex-col items-center gap-[24px] text-center lg:w-[700px] lg:shrink-0 lg:items-start lg:gap-[20px] lg:text-left">
          <Eyebrow>{COVERAGE.eyebrow}</Eyebrow>
          <h2 className="font-sans text-[24px] font-semibold leading-[1.28] text-heading lg:text-[36px] lg:leading-[1.2]">{COVERAGE.heading}</h2>
          {COVERAGE.body.map((p) => (
            <p key={p} className="font-roboto text-[16px] leading-[1.6] text-muted max-lg:hidden">{p}</p>
          ))}
          {COVERAGE.bodyMobile.map((p) => (
            <p key={p} className="font-roboto text-[14.5px] leading-[1.6] text-muted lg:hidden">{p}</p>
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
          max-lg:[&>div]:w-full! max-lg:[&>div]:gap-[14px]! max-lg:[&>div>p]:text-[17px]! max-lg:[&_ul]:gap-[14px]!
          max-lg:[&_li]:items-start! max-lg:[&_li]:gap-[10px]! max-lg:[&_li>span:first-child]:mt-[7px]! max-lg:[&_li>span:first-child]:size-[6px]!
          max-lg:[&_li>span:last-child]:w-auto! max-lg:[&_li>span:last-child]:min-w-0! max-lg:[&_li>span:last-child]:flex-1! max-lg:[&_li>span:last-child]:text-[13.5px]! max-lg:[&_li>span:last-child]:leading-[1.5]!">
          <FactsCard title={COVERAGE.cardTitle} items={COVERAGE.card} />
        </div>
      </div>
    </Section>
  )
}
