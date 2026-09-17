import { Section } from '@/components/design/Frame'
import { HOME_BELOW_CERT_SHIFT } from '@/lib/layout'
import { Btn, Eyebrow, Lead, Title } from '@/components/ui/Bits'
import { href } from '@/lib/urls'
import { ServiceTabs } from '@/components/client/ServiceTabs'

/**
 * Our Services — Figma 6107:1552. 1282x860 at x319.
 *
 * This frame is auto-layout in Figma (flex column, gap 48, centred), so it is
 * built as flex rather than absolutely positioned. Fixing the CTA row to a
 * hardcoded y was what made it overlap the second row of cards — card height
 * depends on how the blurb wraps, so the row below has to flow.
 */
export function OurServices() {
  return (
    <Section top={1679 - HOME_BELOW_CERT_SHIFT} left={319} width={1282} height={880} label="6107:1552" className="bg-white">
      <div className="flex w-full flex-col items-center gap-[48px]">
        <div className="flex w-[829px] flex-col items-center gap-[6px]">
          <Eyebrow>What We Do</Eyebrow>
          <Title className="text-center">Our Services</Title>
          <Lead className="text-center">
            Responsible recycling, destruction, and shredding solutions for materials that need proper handling.
          </Lead>
        </div>

        <ServiceTabs />

        <div className="flex items-center justify-center gap-[12px]">
          <Btn href={href('/services/')} variant="bordered">Read More About Our Services</Btn>
          <Btn href={href('/quote/')} variant="coloredWhite">Get a Free Estimate</Btn>
        </div>
      </div>
    </Section>
  )
}
