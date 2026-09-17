import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { CaseStudyCardView } from '@/components/ui/CaseStudyCard'
import { CASE_STUDIES } from '@/data/compliance-center'
import { CASE_STUDY_CARDS, COMPLIANCE_CASE_IDS } from '@/data/case-studies'

/**
 * How we solve compliance challenges — Figma 6389:1529. py 100 on white,
 * gap 50: an 820px heading block, then three 410px cards on a 24px gutter
 * (1278, x321).
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
      className="flex flex-col items-center gap-[50px] bg-white py-[100px]">
      {/* Heading block — 6390:1527 */}
      <div className="flex w-[820px] flex-col items-center gap-[10px] text-center">
        <Eyebrow>{CASE_STUDIES.eyebrow}</Eyebrow>
        <h2 className="w-[820px] font-sans text-[40px] font-semibold leading-[1.3] text-black">
          {CASE_STUDIES.heading}
        </h2>
        <p className="w-[820px] font-roboto text-[17px] leading-[1.175] text-muted">{CASE_STUDIES.lead}</p>
      </div>

      {/* Cards — 6390:1532 */}
      <div className="flex items-start gap-[24px]">
        {cards.map((c) => <CaseStudyCardView key={c.id} card={c} />)}
      </div>
    </Section>
  )
}
