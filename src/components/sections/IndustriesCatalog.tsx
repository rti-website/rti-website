import { Section } from '@/components/design/Frame'
import { IndustryCard, type Industry } from '@/components/ui/IndustryCard'

/**
 * All Industries grid — Figma 6246:1023 (desktop, 1282 wide at x319, 722 tall)
 * and 6638:9014 "All Industries Grid" inside 6638:8497 (mobile, 390 wide).
 *
 * DESKTOP — unchanged, to the pixel.
 *
 *   pt 150   canvas top -> "All Industries" heading (y150, h60)
 *   gap 48   heading bottom (210) -> cards (258)
 *   cards    two rows of 310x226, 14px between cards, 12px between rows
 *            258 + 464 = 722 = frame height
 *
 * The heading rule is the same treatment as the /services/ category titles
 * (Figma 6142:2018): flex, gap 36, hairlines taking whatever the fixed-width
 * title leaves.
 *
 * MOBILE — px20 / py48, a 24px column gap, and the heading rule redrawn: 12px
 * gaps, hairlines a fixed 40px rather than flex-1, and the title 26/32 IBM Plex
 * Sans SemiBold in black instead of 35px normal in accent green. Those are the
 * parts of 6638:9014 that are genuinely a mobile design, and they are taken off
 * the frame literally.
 *
 * TWO HAND-SLICED ROWS OF FOUR ARE NOW ONE CSS GRID, the same move
 * sections/Industries.tsx made on the homepage and for the same reason: a grid
 * answers both breakpoints without slicing the array a second way for the
 * phone. It lands on the identical desktop pixels — 1282 - 3x14 = 1240, four
 * 310s, rows 226 + 12 + 226 = 464 — and the seven industries still leave the
 * second row three wide and left-aligned. The rows carried `items-center`,
 * which never did anything: every card in a row is exactly 226 tall. The
 * `perRow` prop went with the slicing; nothing ever passed it, and a grid's
 * column count cannot be a runtime value in Tailwind.
 *
 * !! THE FRAME'S OWN CARD GRID IS NOT FOLLOWED, DELIBERATELY !!
 * 6638:9019 draws ONE column of 350x226 cards with their blurbs showing. That
 * is not a mobile card: it is the desktop card pasted into a phone column,
 * keeping desktop radius (20), desktop gradient stops (31.25%/77.885%/0.88),
 * desktop title size (20px), desktop left inset (25px) and even desktop's
 * stray `leading-[54.7px]`. Its eight cards are also the HOMEPAGE's placeholder
 * categories (Retail, Construction, Distribution & Logistics, Food Services...)
 * rather than this page's seven real industries, so the grid in that frame is
 * un-updated boilerplate rather than a considered layout for this page.
 *
 * Aqeel did draw a real mobile industry card — 6605:5139 and its seven siblings
 * in the "Home - Mobile" frame — and ui/IndustryCard.tsx already implements it:
 * half-width, 140 tall, r12, blurb hidden. A full-width 350x140 card appears in
 * neither frame, so the cards go two-up here exactly as they do on the
 * homepage. If Aqeel redraws 6638:9019 with the real mobile card and still
 * wants one column, `grid-cols-2` below becomes `grid-cols-1` and nothing else
 * changes.
 */
export function IndustriesCatalog({
  top, height, label, heading, industries,
}: {
  top: number
  height: number
  label?: string
  heading: string
  industries: Industry[]
}) {
  return (
    <Section
      top={top} left={319} width={1282} height={height} label={label}
      className="bg-white px-[20px] py-[48px] lg:p-0"
    >
      <div className="flex flex-col gap-[24px] lg:gap-[48px] lg:pt-[150px]">
        <div className="flex items-center justify-center gap-[12px] lg:h-[60px] lg:gap-[36px]">
          <span aria-hidden="true" className="h-px w-[40px] bg-[#d9d9d9] lg:w-auto lg:flex-1 lg:bg-line" />
          <h2 className="text-center font-sans text-[26px] font-semibold leading-[32px] text-black lg:flex lg:h-[60px] lg:w-[345px] lg:shrink-0 lg:items-center lg:justify-center lg:text-[35px] lg:font-normal lg:leading-none lg:text-accent">
            {heading}
          </h2>
          <span aria-hidden="true" className="h-px w-[40px] bg-[#d9d9d9] lg:w-auto lg:flex-1 lg:bg-line" />
        </div>

        <div className="grid grid-cols-2 gap-[16px] lg:grid-cols-4 lg:gap-x-[14px] lg:gap-y-[12px]">
          {industries.map((ind) => <IndustryCard key={ind.t} ind={ind} />)}
        </div>
      </div>
    </Section>
  )
}
