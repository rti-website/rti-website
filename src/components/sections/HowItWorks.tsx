import { Fragment } from 'react'
import Image from 'next/image'
import { HOME_BELOW_SERVICES_SHIFT } from '@/lib/layout'
import { Box, CenterBox, Section } from '@/components/design/Frame'
import { Btn, Eyebrow, Lead, Title } from '@/components/ui/Bits'
import { STEPS } from '@/data/home'
import { QUOTE_HREF } from '@/lib/urls'

/**
 * How It Works — Figma 6040:18591 (desktop, 1920x559) and 6607:2322 (mobile,
 * 390x818).
 *
 * Desktop: steps at x319 / 666 / 1013 / 1360, y218.81, glyph over centred text,
 * with the arrow art (6044:18843/18845/18846) at y270, x569 / 916 / 1263.
 *
 * Mobile: px20 / py48 / gap28 column — eyebrow, title, lead, the stepper, the
 * two buttons stacked full width. A step turns on its side: the glyph block on
 * the left, the text beside it left-aligned, gap 20.
 *
 * THE CONNECTORS MOVED IN THE SOURCE, and that is the whole reason this file
 * changed shape. They used to be rendered as a block of three before the four
 * steps, which is invisible on the board — every Box there is absolutely
 * positioned, so DOM order reaches nothing. Below lg DOM order is the layout,
 * and three arrows followed by four steps is not a stepper. They are now
 * emitted between the steps they join, inside a wrapper that gives the phone a
 * gapless column (the connectors ARE the 24px of spacing, so the section's own
 * gap-28 must not apply between steps). At lg that wrapper is an empty
 * zero-height block and every child is back on its absolute coordinate.
 *
 * THE ARROW ART IS HORIZONTAL and the frame replaces it rather than rotating
 * it: a 24px vertical dashed teal rule, inset 32px — the centre of the 64px
 * glyph column. So the arrow is hidden below lg and the rule above it, rather
 * than either one being deleted; the desktop keeps the PNG it has always had.
 *
 * THE GLYPH BLOCK IS ONE UNIFORM SCALE, not a second set of numbers: every
 * measure in the mobile frame is the desktop's at 0.6809 (94 -> 64,
 * 95.72 -> 65.171, the 89.415 dashed square -> 60.878, the 25.793 badge ->
 * 17.561, 18.043pt -> 12.285pt). So it rides `zoom`, the way ServicePhotoCard
 * does for the /services/ card, instead of eleven more breakpointed lengths.
 * `max-lg:` so not one declaration of it reaches the board.
 */
const X: readonly number[] = [319, 666, 1013, 1360]
const CONNECTOR_X: readonly number[] = [569, 916, 1263]

export function HowItWorks() {
  return (
    <Section
      top={3726 - HOME_BELOW_SERVICES_SHIFT}
      height={559}
      label="6040:18591"
      className="flex flex-col items-center gap-[28px] bg-white px-[20px] py-[48px] lg:block lg:p-0"
    >
      <CenterBox y={0} w={400} offset={-0.47} className="flex justify-center"><Eyebrow>Simple &amp; Secure</Eyebrow></CenterBox>
      <CenterBox y={52} w={500}><Title className="text-center">How It Works</Title></CenterBox>
      <CenterBox y={126} w={594}>
        <Lead className="text-center">
          Responsible recycling made simple — from ordering your kit to receiving your
          recycling documentation.
        </Lead>
      </CenterBox>

      <div className="flex w-full flex-col lg:block">
        {STEPS.map((s, i) => (
          <Fragment key={s.n}>
            <Box x={X[i] ?? 319} y={218.81} w={240} className="flex items-center gap-[20px] lg:flex-col lg:gap-[30px]">
              <div className="relative h-[95.72px] w-[94px] shrink-0 max-lg:[zoom:0.6809]">
                <div className="absolute left-[4.59px] top-[6.3px] grid size-[89.415px] place-items-center rounded-[5.732px] border border-dashed border-black">
                  <Image src={s.glyph} alt="" width={53} height={53} className="size-[52.732px]" />
                </div>
                <div className="absolute left-0 top-0 size-[25.793px]">
                  <Image src="/images/icons/step-badge.svg" alt="" fill className="object-contain" />
                  <span className="absolute inset-0 grid place-items-center font-condensed text-[18.043px] font-semibold leading-[1.25] text-white">
                    {s.n}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[4px] max-lg:min-w-0 max-lg:flex-1 lg:items-center lg:gap-[12px] lg:text-center">
                <h3 className="w-full font-sans text-[17px] font-semibold leading-[1.25] text-ink lg:w-auto lg:text-[20px]">{s.t}</h3>
                <p className="w-full font-roboto text-[14px] leading-[20px] text-muted lg:w-[240px] lg:text-[16px]">{s.b}</p>
              </div>
            </Box>

            {/* connectors — 6044:18843/18845/18846 at y274, x569 / 916 / 1263 */}
            {i < CONNECTOR_X.length && (
              <Box
                x={CONNECTOR_X[i] ?? 569}
                y={270}
                w={88}
                h={8}
                className="max-lg:flex max-lg:h-[24px] max-lg:items-start max-lg:pl-[32px]"
              >
                <Image src="/images/icons/step-arrow.png" alt="" width={88} height={8} className="size-full object-contain max-lg:hidden" />
                <span aria-hidden="true" className="h-[24px] w-0 border-l-2 border-dashed border-brand lg:hidden" />
              </Box>
            )}
          </Fragment>
        ))}
      </div>

      {/* ONE BUTTON, CENTRED — Asim, 23 Sep 2026: "remove the learn complete
          process text and in that button add the text of get a free quote and
          central aligned it from left and right". The frame's pair was a filled
          "Learn Complete Process" (to /it-asset-disposition/, which has no page
          in this build and 404'd) beside a text-style "Get a Free Quote". Now
          the quote link wears the filled button, alone. The frame's +13.78
          offset centred the PAIR; one button centres on the page axis, the
          same line as the title and the lead above it. */}
      <CenterBox y={511} w={700} className="flex flex-col lg:flex-row lg:items-center lg:justify-center">
        <Btn href={QUOTE_HREF} variant="colored" className="w-full justify-center lg:w-auto">Get a Free Quote</Btn>
      </CenterBox>
    </Section>
  )
}
