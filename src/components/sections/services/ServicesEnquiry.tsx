import { Section } from '@/components/design/Frame'
import { ConnectForm } from '@/components/client/ConnectForm'
import { SERVICES_ENQUIRY } from '@/data/services'

/**
 * "Don't See Your Item? Reach out to Us!" — Figma 6166:2746.
 * 1282x201 at x319, #05838b, r20, px57 py35, column gap 10.
 * Content box is 1168 wide; 71 (heading row) + 10 + 50 (form) = 131 tall.
 *
 * MOBILE — 6638:8915 wraps 6638:8916 in file BVtf2AOuUOcYbiMIlcKmbC: a white
 * band, px20 / pt40 / pb8, holding the teal panel at r20 with px24 / py32 and
 * a 20px column — heading (26, centred), sub, then the stacked form.
 *
 * The teal panel therefore moved OFF the Section and onto an inner div. A
 * Section is full-bleed below lg, so styling it as the panel would run the
 * teal to both screen edges with no way to inset it — `.design-section` sets
 * `width: 100%` unlayered, which no margin utility can answer. At lg the inner
 * div is `h-full w-full` inside the same 1282x201 box, so the board is
 * pixel-identical.
 */
export function ServicesEnquiry({ top = 2574.83 }: { top?: number } = {}) {
  return (
    <Section
      top={top} left={319} width={1282} height={201} label="6166:2746"
      className="bg-white px-[20px] pb-[8px] pt-[40px] lg:bg-transparent lg:p-0"
    >
      <div className="flex w-full flex-col gap-[20px] rounded-[20px] bg-brand px-[24px] py-[32px] lg:h-full lg:gap-[10px] lg:px-[57px] lg:py-[35px]">
        <div className="flex w-full flex-col gap-[20px] lg:flex-row lg:items-center lg:gap-[10px]">
          <h2 className="w-full text-center font-sans text-[26px] font-semibold leading-[1.2] text-white lg:flex lg:h-[71px] lg:w-[391px] lg:shrink-0 lg:items-center lg:justify-center lg:text-[40px] lg:leading-none">
            {SERVICES_ENQUIRY.heading}
          </h2>
          <p className="font-inter text-[15px] leading-[24.239px] text-white/80 lg:shrink-0 lg:whitespace-nowrap lg:text-[16px]">
            {SERVICES_ENQUIRY.sub}
          </p>
        </div>

        <ConnectForm placeholder={SERVICES_ENQUIRY.placeholder} cta={SERVICES_ENQUIRY.cta} />
      </div>
    </Section>
  )
}
