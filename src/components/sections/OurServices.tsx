import { Section } from '@/components/design/Frame'
import { HOME_BELOW_CERT_SHIFT, HOME_SERVICES_DELTA_VAR } from '@/lib/layout'
import { Eyebrow, Lead, Title } from '@/components/ui/Bits'
import { ServiceTabs } from '@/components/client/ServiceTabs'

/**
 * Our Services — Figma 6532:2049. 1282 x 1133 at x319.
 *
 * Replaced the tab-strip layout (6107:1552, 860 tall) on 21 Sep 2026: the
 * heading block is unchanged, but the services are now picked from a column
 * of vertical tabs and drawn as photo cards, with the "Don't See Your Item?"
 * banner under them. The two buttons that closed the old frame are not in
 * the new one. Everything below moves down by HOME_SERVICES_GROWTH.
 *
 * Auto-layout in Figma (flex column, gap 48, centred), so built as flex.
 *
 * 1133 is the height with the Recycling tab open — two rows of cards. The
 * other tabs need one row, and Asim asked for the gap that left to go
 * ("make it dynamic", 21 Sep 2026): ServiceTabs sets HOME_SERVICES_DELTA_VAR
 * to the difference, this section adds it to its height, and page.tsx moves
 * every section below by the same variable. The change is eased.
 */
export function OurServices() {
  return (
    <Section
      top={1679 - HOME_BELOW_CERT_SHIFT} left={319} width={1282}
      height={`calc(1133px + var(${HOME_SERVICES_DELTA_VAR}, 0px))`}
      label="6532:2049" className="bg-white transition-[height] duration-300 ease-out"
    >
      <div className="flex w-full flex-col items-center gap-[48px]">
        <div className="flex w-[829px] flex-col items-center gap-[6px]">
          <Eyebrow>What We Do</Eyebrow>
          <Title className="text-center">Our Services</Title>
          <Lead className="text-center">
            Responsible recycling, destruction, and shredding solutions for materials that need proper handling.
          </Lead>
        </div>

        <ServiceTabs />
      </div>
    </Section>
  )
}
