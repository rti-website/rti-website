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
 *
 * MOBILE — Figma 6605:2341 in file BVtf2AOuUOcYbiMIlcKmbC, 390 x 1826.
 *
 * The same six blocks, flattened into one 20px-gapped column inside a
 * 20 / 48 pad: eyebrow, title, lead, the tab strip (a horizontal chip rail
 * down here, see ServiceTabs), the cards stacked one per row, and the
 * "Don't See Your Item?" banner. `lg:block lg:p-0` hands the board back.
 *
 * The height expression and its easing are lg-only for the same reason the
 * whole delta mechanism is: below lg the section is as tall as its content.
 * `--sh` is only read inside `@media (width >= 64rem)` (globals.css), so the
 * calc() above is already inert on a phone — but `transition-[height]` is
 * not scoped by anything, so it is prefixed here rather than left to be
 * harmless by accident.
 */
export function OurServices() {
  return (
    <Section
      top={1679 - HOME_BELOW_CERT_SHIFT} left={319} width={1282}
      height={`calc(1133px + var(${HOME_SERVICES_DELTA_VAR}, 0px))`}
      label="6532:2049"
      className="flex flex-col bg-white px-[20px] py-[48px] lg:block lg:p-0 lg:transition-[height] lg:duration-300 lg:ease-out"
    >
      <div className="flex w-full flex-col items-center gap-[20px] lg:gap-[48px]">
        <div className="flex w-full flex-col items-center gap-[20px] lg:w-[829px] lg:gap-[6px]">
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
