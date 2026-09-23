import { Box, CenterBox, Section } from '@/components/design/Frame'
import { HOME_BELOW_SERVICES_SHIFT } from '@/lib/layout'
import { Eyebrow, Lead, Title } from '@/components/ui/Bits'
import { INDUSTRIES } from '@/data/home'
import { IndustryCard } from '@/components/ui/IndustryCard'

/**
 * Industries We Serve — Figma 6023:12500 (desktop, 1920x887 on #f8faf9) and
 * 6605:5131 (mobile, 390x928).
 *
 * Desktop: cards 310x226, two rows of four, gap 14, grid starts x319.33 y312.78.
 * Mobile: the same eight cards two-up — px20 / py48 / gap20 column, grid gap 12
 * both ways, cards 140 tall and half the width.
 *
 * ONE CSS GRID DOES BOTH, which is why the two hand-sliced rows of four are
 * gone. `grid-cols-2 gap-[12px]` is the phone; `lg:grid-cols-4 lg:gap-x-[14px]`
 * is the board, and it lands on the same pixels the flex rows did —
 * 1282 - 3x14 = 1240, four 310s, rows 226 + 12 + 226 = 464. The row wrappers
 * carried `items-center`, which never did anything: every card in a row is
 * exactly 226 tall. Reading order is unchanged, so the phone's four rows of two
 * come out in the frame's order without slicing the array a second way.
 *
 * `self-stretch` rather than `w-full` on the grid, for the reason spelled out
 * in Certifications: it stretches the cross axis of the section's flex column
 * and so leaves the `width` property alone, where `w-full` would fight the
 * `width: var(--bw)` that the lg media query puts on every .design-box.
 *
 * SEVEN CARDS, NOT THE FRAME'S EIGHT, and every one links to its industry
 * page — Asim, 22 Sep 2026. The frame's eight were marketing categories that
 * had never been checked against the pages that exist; the list in
 * src/data/home.ts is now the seven built industries, and the note there has
 * the reasoning. The mobile frame turns out to have been closer to right than
 * the desktop one: it drew "Automotive" and "Education", which are real
 * industry pages, where the desktop drew "Food Services" and "Education &
 * Government", which are not.
 *
 * 4 + 3, WITH THE THREE CENTRED — Asim, 23 Sep 2026 ("align the 2nd row in
 * center"). A 4-column grid left-aligns the short row. So at lg it is an
 * 8-column grid, 148 wide with 14 gaps, every card spanning two: 148 + 14 +
 * 148 = 310, the card, and 8x148 + 7x14 = 1282, the box. The fifth card
 * starts in column 2, one half-card (162px) in, which centres the row of
 * three exactly. NOT a centred flex-wrap: four 310s and three gaps fill the
 * 1282 box to the pixel, so a browser that rounds a zoomed width up by a
 * fraction would wrap the first row to three. A grid cannot wrap.
 * Below lg it is still the 2-column grid, 4 rows of 2 with one on the last.
 *
 * The cards reveal their blurb on hover — see `reveal` in IndustryCard.
 */
export function Industries() {
  return (
    <Section
      top={2689 - HOME_BELOW_SERVICES_SHIFT}
      height={887}
      label="6023:12500"
      className="flex flex-col items-center gap-[20px] bg-mist px-[20px] py-[48px] lg:block lg:p-0"
    >
      <CenterBox y={80} w={400} className="flex justify-center"><Eyebrow>Who We Serve</Eyebrow></CenterBox>
      <CenterBox y={125} w={600}><Title className="text-center">Industries We Serve</Title></CenterBox>
      <CenterBox y={199} w={857}>
        <Lead className="text-center">
          From corporate facilities to schools and healthcare networks, we provide reliable
          recycling, secure shredding, ITAD, and data destruction solutions for organizations
          with different waste and equipment needs.
        </Lead>
      </CenterBox>

      <Box
        x={319.33}
        y={312.78}
        w={1282}
        className="grid grid-cols-2 gap-[12px] self-stretch lg:grid-cols-8 lg:gap-x-[14px] lg:[&>*]:col-span-2 lg:[&>*:nth-child(5)]:col-start-2"
      >
        {INDUSTRIES.map((ind) => (
          <IndustryCard key={ind.t} ind={ind} reveal />
        ))}
      </Box>
    </Section>
  )
}
