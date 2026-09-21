import { HOME_BELOW_TESTIMONIALS_SHIFT } from '@/lib/layout'
import { Box, CenterBox, Section } from '@/components/design/Frame'
import { Btn, Eyebrow, Lead, Title } from '@/components/ui/Bits'
import { StoryCarousel } from '@/components/client/StoryCarousel'
import { QUOTE_HREF, href } from '@/lib/urls'

/**
 * Client's Stories — Figma 6557:12903 on the homepage. 1920 x 934.
 *
 * Replaced the three-up row (6026:14726, 885 tall) on 21 Sep 2026: the heading
 * block now carries the two buttons, and under it a carousel shows one story
 * large and dark in the middle with the neighbours small and faded either
 * side — see StoryCarousel. The service detail pages share this band (their
 * frame, 6146:2403, was the old row; one component, one band).
 *
 * Heading block is auto-layout in the frame: eyebrow, 10, a 64.5 title box,
 * 10, a two-line lead, 10, the buttons — 226 tall, centred.
 */
export const CASE_STUDIES_H = 934

export function CaseStudies({ top = 7483 - HOME_BELOW_TESTIMONIALS_SHIFT, label = '6557:12903' }: {
  top?: number
  label?: string
} = {}) {
  return (
    <Section top={top} height={CASE_STUDIES_H} label={label} className="bg-white">
      <CenterBox y={0} w={645} className="flex flex-col items-center gap-[10px]">
        <Eyebrow>Case Studies</Eyebrow>
        <div className="flex h-[64.5px] items-center"><Title className="text-center">Client&rsquo;s Stories</Title></div>
        <Lead className="text-center">
          Real results from real partnerships. See how organizations simplify ITAD,<br />
          strengthen data security, and recover value from retired hardware.
        </Lead>
        <div className="flex items-center justify-center gap-[12px]">
          <Btn href={href('/case-studies/')} variant="colored">View All Stories</Btn>
          <Btn href={QUOTE_HREF} variant="coloredWhite">Get a Free Estimate</Btn>
        </div>
      </CenterBox>

      {/* Track — 6557:12824 at y284.96, with the pager 583 below its top. */}
      <Box x={0} y={284.96} w={1920} h={649}>
        <StoryCarousel />
      </Box>
    </Section>
  )
}
