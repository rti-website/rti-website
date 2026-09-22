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
    /*
     * MOBILE — 6638:8851. px20 / py48 and a flat 20px rhythm: eyebrow, heading,
     * lead, filter rail, then the five cards one per row 16 apart. The eyebrow
     * pill sits on the left margin while the heading and the lead are centred,
     * exactly as 6638:8852..8855 draw them.
     *
     * !! THE FILTER ROW AND THE CARD GRID LIVE IN client/CaseStudyFilter.tsx,
     * which is another agent's file, so they are reached from here with
     * descendant rules rather than edited there. Its two top-level divs are the
     * only children of this Section after the heading block: the filter row
     * carries role="group", the grid is the last child. Its cards are each
     * wrapped in a bare <div hidden> whose width has to be forced too — the
     * card itself is now fluid, and a fluid child of a shrink-to-fit wrapper
     * resolves against max-content, which is far wider than the phone.
     *
     * Move all of this into CaseStudyFilter when that file is next touched.
     */
    <Section top={top} height={height} label="6391:1527"
      className="flex flex-col items-start gap-[20px] bg-white px-[20px] py-[48px] max-lg:[&>div[role=group]]:w-full max-lg:[&>div[role=group]]:gap-[10px] max-lg:[&>div[role=group]]:overflow-x-auto max-lg:[&>div[role=group]]:[-ms-overflow-style:none] max-lg:[&>div[role=group]]:[scrollbar-width:none] max-lg:[&>div[role=group]::-webkit-scrollbar]:hidden max-lg:[&>div[role=group]>button]:h-[44px] max-lg:[&>div:last-child]:w-full max-lg:[&>div:last-child]:flex-col max-lg:[&>div:last-child]:gap-[16px] max-lg:[&>div:last-child>div]:w-full lg:items-center lg:gap-[44px] lg:px-0 lg:pb-[100px] lg:pt-[90px]">
      {/* Heading block — 6391:1529 / 6638:8852 */}
      <div className="flex w-full flex-col items-start gap-[20px] lg:w-[780px] lg:items-center lg:gap-[10px] lg:text-center">
        <Eyebrow>{GRID.eyebrow}</Eyebrow>
        <h2 className="w-full text-center font-sans text-[26px] font-semibold leading-[1.3] text-black lg:w-[780px] lg:text-[40px]">{GRID.heading}</h2>
        <p className="w-full text-center font-roboto text-[14px] leading-[1.175] text-muted lg:w-[780px] lg:text-[17px]">{GRID.lead}</p>
      </div>

      <CaseStudyFilter />
    </Section>
  )
}
