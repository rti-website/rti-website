import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { CaseStudyFilter } from '@/components/client/CaseStudyFilter'
import { GRID } from '@/data/case-studies'

/**
 * Filters + case study grid — Figma 6391:1527. pt 90 / pb 100 on white, gap 44:
 * a 780px heading block, the filter row, then the 1278px grid (x321).
 *
 * The section keeps its full measured height whichever filter is active, so
 * nothing below it moves — the page is an absolutely positioned canvas, and a
 * section that grew or shrank at runtime would slide the CTA and footer over
 * each other. The cost is whitespace under a one-card result, which is the
 * right side to err on.
 */
export function CaseStudyGrid({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6391:1527"
      className="flex flex-col items-center gap-[44px] bg-white pb-[100px] pt-[90px]">
      {/* Heading block — 6391:1529 */}
      <div className="flex w-[780px] flex-col items-center gap-[10px] text-center">
        <Eyebrow>{GRID.eyebrow}</Eyebrow>
        <h2 className="w-[780px] font-sans text-[40px] font-semibold leading-[1.3] text-black">{GRID.heading}</h2>
        <p className="w-[780px] font-roboto text-[17px] leading-[1.175] text-muted">{GRID.lead}</p>
      </div>

      <CaseStudyFilter />
    </Section>
  )
}
