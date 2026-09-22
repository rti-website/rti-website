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
 *
 * ===========================================================================
 * MOBILE — the frame splits this single section in TWO, in this order:
 *   "Section - Get a Quote"   6638:8418   white,    px20 py48, gap 24
 *   "Section - Facilities"    6638:8870   #f9fafb,  px20 py48, gap 24
 * (file BVtf2AOuUOcYbiMIlcKmbC, frame "Contact Us - Mobile" 6638:2221)
 *
 * Below lg the two desktop columns already stack in source order, and that
 * order IS the frame's order — so rather than splitting the component the
 * padding and the plate move onto each column and switch off again at lg.
 * The #f9fafb on the second column is what separates the two halves once they
 * are stacked; on the board they sit side by side on one white section, so it
 * is a `lg:bg-transparent` away from the desktop being untouched.
 *
 * Inside each column the frame groups eyebrow + heading + lead as a 12-gap
 * "Heading Block", where the desktop spaces all four children by 24. That
 * wrapper is `lg:contents`, so at lg it generates no box at all and the column
 * is the same four-child flex it has always been.
 * ===========================================================================
 */
const HEADING = 'font-sans text-[28px] font-semibold leading-[34px] tracking-[-0.5px] text-heading lg:text-[36px] lg:leading-[1.2] lg:tracking-normal'
const LEAD = 'font-roboto text-[15px] leading-[22px] text-muted lg:text-[16px] lg:leading-[1.6]'
/** 6638:8419 / 6638:8871 — the mobile-only 12-gap heading group. */
const HEAD_BLOCK = 'flex w-full flex-col items-start gap-[12px] lg:contents'
/** A column: full bleed and self-padding on a phone, 601px on the board. */
const COLUMN = 'flex w-full shrink-0 flex-col items-start gap-[24px] px-[20px] py-[48px] lg:w-[601px] lg:p-0'

export function ContactSection({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6369:757" className="bg-white">
      <Box x={319} y={100} w={1282} className="flex flex-col items-start gap-0 lg:flex-row lg:gap-[80px]">
        <div className={COLUMN} data-figma="6638:8418">
          <div className={HEAD_BLOCK}>
            <Eyebrow>{FORM.eyebrow}</Eyebrow>
            <h2 className={HEADING}>{FORM.heading}</h2>
            <p className={LEAD}>{FORM.lead}</p>
          </div>
          <ContactForm />
        </div>

        <div className={`${COLUMN} bg-[#f9fafb] lg:bg-transparent`} data-figma="6638:8870">
          <div className={HEAD_BLOCK}>
            <Eyebrow>{FACILITIES.eyebrow}</Eyebrow>
            <h2 className={HEADING}>{FACILITIES.heading}</h2>
            <p className={LEAD}>{FACILITIES.lead}</p>
          </div>

          {/* Cards are 16 apart on the phone (6638:8876), 20 on the board. The
              card itself is the same object at both widths — p28, r12, #eaf4f5,
              gap 16 — so only the rail between them moves. */}
          <div className="flex w-full flex-col gap-[16px] lg:gap-[20px]">
            {FACILITIES.cards.map((c) => (
              /* The two `[&_span:last-child]` rules reach into InfoRow (shared,
                 not this task's file) to give its text the `min-w-px` and the
                 break-on-overflow the frame draws on it. Without them
                 "widispatch@recycletechnologies.com" is one unbreakable
                 271px word in a 248px slot and it prints through the card.
                 No-ops at lg, where the slot is 499px — kept unprefixed so the
                 selector is stated once. */
              <article key={c.name} className="flex w-full flex-col gap-[16px] rounded-[12px] bg-[#eaf4f5] p-[28px] [&_span:last-child]:min-w-px [&_span:last-child]:break-words">
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
