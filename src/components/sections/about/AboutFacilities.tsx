import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { InfoRow } from '@/components/ui/Glyph'
import { FACILITIES } from '@/data/about'

/**
 * Facilities — Figma 6372:845. Heading block on a 780px column, then three
 * 429px cards with a 24px gap (1335 total), py 100, gap 50.
 *
 * The cards carry a phone row the frame does not draw, because the doc gives a
 * number for each licensed site. See the note in src/data/about.ts.
 *
 * MOBILE — Figma 6665:2362 ("Section - Facilities" in "About Us - Mobile"
 * 6638:2224, file BVtf2AOuUOcYbiMIlcKmbC). px20 / py48, everything on one
 * 24-gap rail — eyebrow, 28/34 heading, 15/22 lead, then the three cards full
 * width and 16 apart. The card is the same object at both widths (p32, r12,
 * gap 18, brand-soft), so only its width and the rail between them move. The
 * mobile frame drops the phone row along with the desktop frame; it is kept
 * here for the same reason it was kept there.
 */
export function AboutFacilities({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6372:845"
      className="flex flex-col items-center gap-[24px] bg-[#f4f9f6] px-[20px] py-[48px] lg:gap-[50px] lg:px-0 lg:py-[100px]">
      {/* Below lg the frame spaces all four children equally, so the heading
          group carries the section's own 24 and takes the board's 10 back at
          lg. Same trick as AboutImpact. */}
      <div className="flex w-full flex-col items-center gap-[24px] text-center lg:w-[780px] lg:gap-[10px]">
        <Eyebrow>{FACILITIES.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[28px] font-semibold leading-[34px] text-black lg:text-[40px] lg:leading-[1.3]">{FACILITIES.heading}</h2>
        <p className="font-roboto text-[15px] leading-[22px] text-muted lg:text-[17px] lg:leading-[1.175]">{FACILITIES.lead}</p>
      </div>

      <div className="flex w-full flex-col items-stretch gap-[16px] lg:w-auto lg:flex-row lg:items-start lg:gap-[24px]">
        {FACILITIES.cards.map((c) => (
          /* `[&_span:last-child]` is InfoRow's text (shared file, not this
             task's): the frame gives it `min-w-px` and a break-on-overflow, and
             without them a long unbroken token in an address would print
             through the card at 390. A no-op on the 429px board card. */
          <article key={c.name} className="grad-card flex w-full shrink-0 flex-col items-start gap-[18px] rounded-[12px] bg-brand-soft p-[32px] lg:w-[429px] [&_span:last-child]:min-w-px [&_span:last-child]:break-words">
            <h3 className="font-sans text-[20px] font-medium leading-[1.3] text-heading">{c.name}</h3>
            <InfoRow glyph="pin" text={c.address} />
            {c.phone && (
              <InfoRow glyph="phone" text={c.phone} href={`tel:${c.phone.replace(/[^+\d]/g, '')}`} />
            )}
            <InfoRow glyph="badge" text={c.status} />
          </article>
        ))}
      </div>
    </Section>
  )
}
