import { Box, Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { ContactForm } from '@/components/client/ContactForm'
import { FACILITIES, FORM } from '@/data/contact'
import { InfoRow } from '@/components/ui/Glyph'

/**
 * Contact form + facility cards — Figma 6369:757. 1920x871.
 * Row at x319 y100, 1282 wide: two 601px columns with an 80px gutter.
 *
 * Each column heads with an eyebrow pill, a 36px heading and a lead, then its
 * content. Column gap is 24 down to the content block.
 */
const HEADING = 'font-sans text-[36px] font-semibold leading-[1.2] text-heading'
const LEAD = 'font-roboto text-[16px] leading-[1.6] text-muted'

export function ContactSection({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6369:757" className="bg-white">
      <Box x={319} y={100} w={1282} className="flex items-start gap-[80px]">
        <div className="flex w-[601px] shrink-0 flex-col items-start gap-[24px]">
          <Eyebrow>{FORM.eyebrow}</Eyebrow>
          <h2 className={HEADING}>{FORM.heading}</h2>
          <p className={LEAD}>{FORM.lead}</p>
          <ContactForm />
        </div>

        <div className="flex w-[601px] shrink-0 flex-col items-start gap-[24px]">
          <Eyebrow>{FACILITIES.eyebrow}</Eyebrow>
          <h2 className={HEADING}>{FACILITIES.heading}</h2>
          <p className={LEAD}>{FACILITIES.lead}</p>

          <div className="flex w-full flex-col gap-[20px]">
            {FACILITIES.cards.map((c) => (
              <article key={c.name} className="flex w-full flex-col gap-[16px] rounded-[12px] bg-[#eaf4f5] p-[28px]">
                <h3 className="font-sans text-[19px] font-medium leading-none text-heading">{c.name}</h3>
                <InfoRow glyph="pin" text={c.address} />
                <InfoRow glyph="phone" text={c.phone} href={`tel:${c.phone.replace(/[^+\d]/g, '')}`} />
                <InfoRow glyph="mail" text={c.email} href={`mailto:${c.email}`} />
              </article>
            ))}
          </div>
        </div>
      </Box>
    </Section>
  )
}
