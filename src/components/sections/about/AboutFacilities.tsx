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
 */
export function AboutFacilities({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6372:845"
      className="flex flex-col items-center gap-[50px] bg-[#f4f9f6] py-[100px]">
      <div className="flex w-[780px] flex-col items-center gap-[10px] text-center">
        <Eyebrow>{FACILITIES.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[40px] font-semibold leading-[1.3] text-black">{FACILITIES.heading}</h2>
        <p className="font-roboto text-[17px] leading-[1.175] text-muted">{FACILITIES.lead}</p>
      </div>

      <div className="flex items-start gap-[24px]">
        {FACILITIES.cards.map((c) => (
          <article key={c.name} className="flex w-[429px] shrink-0 flex-col items-start gap-[18px] rounded-[12px] bg-brand-soft p-[32px]">
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
