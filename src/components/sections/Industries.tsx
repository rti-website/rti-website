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
 * !! THE MOBILE FRAME'S CARD LABELS DISAGREE WITH THE SHIPPED CONTENT in three
 * places — it draws "Logistics", "Automotive" and "Education" where the site
 * says "Distribution & Logistics", "Food Services" and "Education & Government".
 * Automotive is not an industry this site serves at all; it is a different card,
 * not a shortened one. INDUSTRIES in src/data/home.ts is left alone: CLAUDE.md
 * rule 6, and a responsive pass is not where a content change belongs. Flagged
 * for Asim — if the frame is right, the data file is the place to fix it and
 * /industries/ has to agree.
 *
 * Cards are NOT linked: none of these pages exist on the live site yet, and
 * linking to URLs that 404 wastes crawl budget and fails the link-integrity
 * gate. Add hrefs once the industry pages are built.
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
        className="grid grid-cols-2 gap-[12px] self-stretch lg:grid-cols-4 lg:gap-x-[14px]"
      >
        {INDUSTRIES.map((ind) => (
          <IndustryCard key={ind.t} ind={ind} />
        ))}
      </Box>
    </Section>
  )
}
