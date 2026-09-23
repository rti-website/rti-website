import { HOME_BELOW_TESTIMONIALS_SHIFT } from '@/lib/layout'
import { Box, CenterBox, Section } from '@/components/design/Frame'
import { Btn, Eyebrow, Lead, Title } from '@/components/ui/Bits'
import { StoryCarousel } from '@/components/client/StoryCarousel'
import { QUOTE_HREF, href } from '@/lib/urls'
import { CASE_STUDIES, CASE_STUDIES_START } from '@/data/home'

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
 *
 * ===========================================================================
 * MOBILE — Figma 6617:2334 in BVtf2AOuUOcYbiMIlcKmbC, 390 x 446
 * ===========================================================================
 * px20 py48, a 20 gap, everything centred: eyebrow, the 26/32 title, the lead,
 * then the two buttons stacked full width on a 12 gap. The 64.5 title box goes
 * to auto height — at 26px it would otherwise leave 32px of dead air.
 *
 * !! THE FRAME HAS NO STORY CARDS. 446px against the desktop 934 is the
 * heading and the buttons and nothing else, so the carousel is `max-lg:hidden`
 * below lg — hidden, not removed, so the three story titles and their links to
 * their cards on /case-studies/ stay in the one DOM exactly as on desktop. "View All Stories"
 * still reaches the same destination on a phone.
 *
 * !! AND IT STILL DRAWS A PAGER. The frame's last child (6617:5090) is a 56x8
 * dot-pagination graphic sitting under the buttons with nothing above it to
 * page through. Not built: a pager that moves nothing is worse than no pager,
 * and the asset would have to land in public/. Almost certainly the card rail
 * was deleted from the frame and its dots were missed — worth asking Aqeel
 * whether the cards were meant to survive on mobile as a swipe rail, because
 * if they were, this is the section that gets them.
 */
export const CASE_STUDIES_H = 934

export function CaseStudies({ top = 7483 - HOME_BELOW_TESTIMONIALS_SHIFT, label = '6557:12903' }: {
  top?: number
  label?: string
} = {}) {
  return (
    <Section
      top={top}
      height={CASE_STUDIES_H}
      label={label}
      className="flex flex-col items-center gap-[20px] bg-white px-[20px] py-[48px] lg:block lg:p-0"
    >
      <CenterBox y={0} w={645} className="flex flex-col items-center gap-[10px] max-lg:gap-[20px]">
        <Eyebrow>Case Studies</Eyebrow>
        <div className="flex h-[64.5px] items-center max-lg:h-auto"><Title className="text-center">Client&rsquo;s Stories</Title></div>
        <Lead className="text-center">
          Real results from real partnerships. See how organizations simplify ITAD,<br className="max-lg:hidden" />
          strengthen data security, and recover value from retired hardware.
        </Lead>
        <div className="flex items-center justify-center gap-[12px] max-lg:w-full max-lg:flex-col">
          <Btn href={href('/case-studies/')} variant="colored" className="max-lg:w-full max-lg:justify-center">View All Stories</Btn>
          <Btn href={QUOTE_HREF} variant="coloredWhite" className="max-lg:w-full max-lg:justify-center">Get a Free Estimate</Btn>
        </div>
      </CenterBox>

      {/* Track — 6557:12824 at y284.96, with the pager 583 below its top.
          Desktop only: the mobile frame drops the cards (see the note above). */}
      <Box x={0} y={284.96} w={1920} h={649} className="max-lg:hidden">
        <StoryCarousel stories={CASE_STUDIES} start={CASE_STUDIES_START} />
      </Box>
    </Section>
  )
}
