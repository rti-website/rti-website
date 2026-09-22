import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { Accordion } from '@/components/client/Accordion'
import { DETAIL_COPY, type Facility } from '@/data/facilities'

/**
 * "Questions About This Location" — Figma 6744:8798 / 6746:8610.
 *
 * Not ServiceFaq, though it looks like it: that band is 780 wide on #f4f9f6
 * with a lead line under the title; this one is 900 wide on white, has no
 * lead, and starts its list at y221 rather than 296.5. Three differences in a
 * component that takes no options for any of them, so it gets its own.
 *
 * The rows are the FAQs page's 'ring' variant — 6746:8448 is an instance of
 * the same component (py10, the + in a 22px ring, 15px gaps).
 *
 * ONLY THE QUESTIONS ARE DRAWN. The accordion is closed in the frame, so the
 * answers in src/data/facilities.ts are written from copy the site already
 * publishes. See the note there.
 *
 * MOBILE — 6751:8477: px20 / py44, the list at full width 12 apart.
 */
export function LocationFaq({ top, height, f }: { top: number; height: number; f: Facility }) {
  return (
    <Section top={top} height={height} label="6744:8798" className="flex flex-col items-center gap-[24px] bg-white px-[20px] py-[44px] lg:gap-[40px] lg:px-0 lg:py-[90px]">
      <div className="flex w-full flex-col items-center gap-[10px] text-center lg:w-[780px]">
        <Eyebrow>{DETAIL_COPY.faq.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[24px] font-semibold leading-[28px] text-black lg:text-[36px] lg:leading-normal">{DETAIL_COPY.faq.heading}</h2>
      </div>
      <div className="w-full lg:w-[900px]">
        <Accordion items={f.faqs} gap={15} variant="ring" idPrefix={`faq-${f.slug}`} />
      </div>
    </Section>
  )
}
