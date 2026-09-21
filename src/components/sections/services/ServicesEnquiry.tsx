import { Section } from '@/components/design/Frame'
import { ConnectForm } from '@/components/client/ConnectForm'
import { SERVICES_ENQUIRY } from '@/data/services'

/**
 * "Don't See Your Item? Reach out to Us!" — Figma 6166:2746.
 * 1282x201 at x319, #05838b, r20, px57 py35, column gap 10.
 * Content box is 1168 wide; 71 (heading row) + 10 + 50 (form) = 131 tall.
 */
export function ServicesEnquiry({ top = 2574.83 }: { top?: number } = {}) {
  return (
    <Section
      top={top} left={319} width={1282} height={201} label="6166:2746"
      className="flex flex-col gap-[10px] rounded-[20px] bg-brand px-[57px] py-[35px]"
    >
      <div className="flex w-full items-center gap-[10px]">
        <h2 className="flex h-[71px] w-[391px] shrink-0 items-center justify-center text-center font-sans text-[40px] font-semibold leading-none text-white">
          {SERVICES_ENQUIRY.heading}
        </h2>
        <p className="shrink-0 whitespace-nowrap font-inter text-[16px] leading-[24.239px] text-white/80">
          {SERVICES_ENQUIRY.sub}
        </p>
      </div>

      <ConnectForm placeholder={SERVICES_ENQUIRY.placeholder} cta={SERVICES_ENQUIRY.cta} />
    </Section>
  )
}
