import { Box, CenterBox, Section } from '@/components/design/Frame'
import { Eyebrow, Lead, Title } from '@/components/ui/Bits'
import { FAQS } from '@/data/home'
import { SERVICES_CTA } from '@/data/services'
import { Accordion } from '@/components/client/Accordion'
import { Footer } from '@/components/sections/Footer'
import { CTA_H, ClosingCtaBand } from '@/components/sections/ClosingCta'
import { FOOTER_H, HOME_BELOW_CERT_SHIFT } from '@/lib/layout'

/**
 * FAQ + final CTA + footer — Figma 6044:20133, 1920x1873.
 *   FAQ    6044:19905  y0    h736   bg #f4f9f6
 *   CTA    6107:2950   y736  h456   bg #0c4e5a
 *   Footer 6044:19944  y1192 h681   bg #fcfcfc
 */
export function FaqCtaFooter() {
  return (
    <Section top={8518 - HOME_BELOW_CERT_SHIFT} height={1192 + FOOTER_H} label="6044:20133">
      {/* ---------------------------------------------------------------- FAQ */}
      <Box x={0} y={0} w={1920} h={736} className="bg-[#f4f9f6]">
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

          It takes SERVICES_CTA rather than copy of its own because the redesign
          put the services paragraph and its two buttons on the homepage frame
          too; one source means the wording cannot drift page to page. */}
      <Box x={0} y={736} w={1920} h={CTA_H}>
        <ClosingCtaBand content={SERVICES_CTA} />
      </Box>

      <Footer />
    </Section>
  )
}
