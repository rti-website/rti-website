import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { CaseStudyCardView } from '@/components/ui/CaseStudyCard'
import { CASE_STUDIES } from '@/data/compliance-center'
import { CASE_STUDY_CARDS, COMPLIANCE_CASE_IDS } from '@/data/case-studies'

/**
 * How we solve compliance challenges — Figma 6389:1529, and on a phone
 * 6674:5368 in "Compliance Center - Mobile" (6638:8303, file
 * BVtf2AOuUOcYbiMIlcKmbC).
 *
 * py 100 on white, gap 50: an 820px heading block, then three 410px cards on a
 * 24px gutter (1278, x321).
 *
 * MOBILE — 6674:5374. px20 / py48 / gap24, the heading block left-aligned, the
 * three cards stacked full width on a 16px gap and repadded from 32 to 24.
 *
 * !! THE CARD'S OWN WIDTHS ARE RESET FROM OUT HERE, not inside it.
 * CaseStudyCardView is shared with /case-studies/ and is another agent's file
 * in this pass, so its `w-[410px]` and its two `w-[346px]` text runs are
 * neutralised below lg with descendant variants on this wrapper. If that
 * component is ever made fluid itself, delete these four `max-lg:[&…]` rules
 * rather than leaving both.
 *
 * NOT the homepage's CaseStudies.tsx (6032:15975), which is a carousel of named
 * client stories on a dark plate.
 *
 * The three cards are the first three of the five in src/data/case-studies.ts,
 * shared with /case-studies/ — this frame and 6391:1547 draw byte-identical
 * copy, so the stories are defined once and read from both places. Only this
 * section's own heading block lives in src/data/compliance-center.ts.
 */
export function ComplianceCaseStudies({ top, height }: { top: number; height: number }) {
  const cards = COMPLIANCE_CASE_IDS
    .map((id) => CASE_STUDY_CARDS.find((c) => c.id === id))
    .filter((c) => c !== undefined)

  return (
    <Section top={top} height={height} label="6389:1529"
      className="flex flex-col items-start gap-[24px] bg-white px-[20px] py-[48px] lg:items-center lg:gap-[50px] lg:px-0 lg:py-[100px]">
      {/* Heading block — 6390:1527 */}
      <div className="flex w-full flex-col items-center gap-[24px] text-center lg:w-[820px] lg:items-center lg:gap-[10px] lg:text-center">
        <Eyebrow>{CASE_STUDIES.eyebrow}</Eyebrow>
        <h2 className="w-[820px] font-sans text-[40px] font-semibold leading-[1.3] text-black max-lg:w-full max-lg:text-[26px] max-lg:leading-[32px]">
          {CASE_STUDIES.heading}
        </h2>
        <p className="w-[820px] font-roboto text-[17px] leading-[1.175] text-muted max-lg:w-full max-lg:text-[16px] max-lg:leading-[24px]">{CASE_STUDIES.lead}</p>
      </div>

      {/* Cards — 6390:1532 */}
      <div className="flex items-start gap-[24px] max-lg:w-full max-lg:flex-col max-lg:gap-[16px] max-lg:[&>article]:w-full max-lg:[&>article]:p-[24px] max-lg:[&_h3]:w-full max-lg:[&_p]:w-full">
        {cards.map((c) => <CaseStudyCardView key={c.id} card={c} />)}
      </div>
    </Section>
  )
}
