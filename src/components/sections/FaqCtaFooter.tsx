import { Box, CenterBox, Section } from '@/components/design/Frame'
import { Eyebrow, Lead, Title } from '@/components/ui/Bits'
import { FAQS, HOME_CTA } from '@/data/home'
import { Accordion } from '@/components/client/Accordion'
import { Footer } from '@/components/sections/Footer'
import { CTA_H, ClosingCtaBand } from '@/components/sections/ClosingCta'
import { FOOTER_H, HOME_BELOW_CASES_SHIFT } from '@/lib/layout'

/**
 * FAQ + final CTA + footer — Figma 6044:20133, 1920x1873.
 *   FAQ    6044:19905  y0    h736   bg #f4f9f6
 *   CTA    6107:2950   y736  h456   bg #0c4e5a
 *   Footer 6044:19944  y1192 h681   bg #fcfcfc
 *
 * Mobile (BVtf2AOuUOcYbiMIlcKmbC) draws the three as separate 390-wide frames:
 *   FAQ    6618:2338  390x718
 *   CTA    6619:2356  390x462
 *   Footer 6620:2370  390x1486
 *
 * ONE Section still holds all three. Its `height` goes out as the `--sh` custom
 * property and globals.css only applies it at lg, so below lg the section is a
 * plain block as tall as its content and the three bands stack in flow at their
 * own frames' paddings. Nothing here needs to know the number.
 */
export function FaqCtaFooter() {
  return (
    <Section top={8518 - HOME_BELOW_CASES_SHIFT} height={1192 + FOOTER_H} label="6044:20133">
      {/* ---------------------------------------------------------------- FAQ
          6618:2338: px20 / py48 / gap20, and the phone frame draws this band on
          WHITE rather than the board's #f4f9f6 wash. */}
      <Box x={0} y={0} w={1920} h={736} className="flex flex-col items-center gap-[20px] bg-white px-[20px] py-[48px] lg:block lg:bg-[#f4f9f6] lg:p-0">
        <CenterBox y={80} w={400} className="flex justify-center"><Eyebrow>FAQs</Eyebrow></CenterBox>
        <CenterBox y={130} w={900}><Title className="text-center">Frequently Asked Questions</Title></CenterBox>
        <CenterBox y={205} w={900}>
          <Lead className="text-center">
            Recycling helps conserve resources, reduce pollution and support economic sustainability.
          </Lead>
        </CenterBox>
        <CenterBox y={270} w={780}>
          <Accordion items={FAQS} />
        </CenterBox>
      </Box>

      {/* ---------------------------------------------------------------- CTA
          Nothing is laid out here any more. The band is shared with every other
          page — see ClosingCta — after Asim asked on 16 Sep 2026 for the
          redesigned, centred version everywhere.

          The BAND is shared; the COPY is not. It read SERVICES_CTA until
          21 Sep 2026, when Asim's homepage copy doc turned out to word this
          band differently from the Our Services doc. His call: the homepage
          carries its own wording and every other page keeps SERVICES_CTA. See
          HOME_CTA in src/data/home.ts. */}
      <Box x={0} y={736} w={1920} h={CTA_H}>
        <ClosingCtaBand content={HOME_CTA} />
      </Box>

      <Footer />
    </Section>
  )
}
