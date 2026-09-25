import Link from 'next/link'
import { Section } from '@/components/design/Frame'
import { href } from '@/lib/urls'
import { Eyebrow, Lead } from '@/components/ui/Bits'
import { GLYPHS } from '@/components/ui/Glyph'
import { NATIONWIDE, type NationwideFacility } from '@/data/facilities'

/**
 * "Additional Facilities Nationwide" — Figma 6831:2663 on /all-locations/
 * (phone 6833:3043), under the two facility cards. Built 24 Sep 2026,
 * REDRAWN 25 Sep 2026 to the updated frames (Asim: "make it exactly like the
 * figma").
 *
 * Desktop: pt90 pb100, an 820px centred heading block, then a 1250px grid of
 * 613px cards two to a row, 24 apart both ways; the ninth card sits alone on
 * the left. Each card is a 110px navy-to-green header (the pin disc and the
 * city at 21px, and on Chicago a "Drop-off Location" label at the right) over
 * a white body with two rows: the partner's name and street address, and its
 * phone. The hours row, the hairline and the "Materials Accepted" chips were
 * taken out of the frame.
 *
 * MOBILE — 6833:3043 in "Locations - Mobile" (6747:2557). Cards stack at 350,
 * 20 apart; the header drops to 72 (40px disc, city at 18px, the label at
 * 10px), the body to 20 padding with 16px glyphs and 12.5px text. The phone
 * frame lists the cards in its OWN order (Chicago, Ontario, Phoenix,
 * Greenwood, Ocala, Fort Worth, Johnson City, Atlanta, Lewisburg), so each
 * card carries `phoneOrder` and takes it as a CSS `order` below lg: one list
 * in the markup, two orders on screen.
 *
 * LINKS. Chicago has a page of its own, /electronic-recycling-chicago/, so its
 * whole card links there (`href` in NATIONWIDE: the city is the link,
 * stretched over the card). A partner card's city links to its
 * /locations/<site>/ page once that page is PUBLISHED in Admin -> Locations;
 * until then it is plain text, so nothing links to an unfinished page.
 */
export type SiteLinks = Record<string, { hub?: string; materials: Record<string, string> }>

export function NationwideFacilities({ top, height, links = {} }: {
  top: number; height: number
  /** Card slug -> its published hub (and material pages, no longer shown here). */
  links?: SiteLinks
}) {
  return (
    <Section
      top={top} height={height} label="6831:2663"
      className="flex flex-col items-center gap-[24px] bg-white px-[20px] py-[44px] lg:gap-[44px] lg:px-0 lg:pb-[100px] lg:pt-[90px]"
    >
      <div className="flex w-full flex-col items-center gap-[24px] text-center lg:w-[820px] lg:gap-[10px]">
        <Eyebrow>{NATIONWIDE.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[26px] font-semibold leading-[30px] text-black lg:text-[38px] lg:leading-[1.3]">{NATIONWIDE.heading}</h2>
        <Lead>
          <span className="max-lg:hidden">{NATIONWIDE.lead}</span>
          <span className="lg:hidden">{NATIONWIDE.leadMobile}</span>
        </Lead>
      </div>

      {/* A grid, so the two cards in a row are the same height whichever one
          wraps its address. */}
      <ul className="grid w-full grid-cols-1 gap-[20px] lg:w-[1250px] lg:grid-cols-[613px_613px] lg:gap-[24px]">
        {NATIONWIDE.facilities.map((f) => <Card key={f.name} f={f} hub={f.slug ? links[f.slug]?.hub : undefined} />)}
      </ul>
    </Section>
  )
}

function Card({ f, hub }: { f: NationwideFacility; hub?: string }) {
  const rows = [
    { glyph: 'pin' as const,   text: f.address },
    { glyph: 'phone' as const, text: f.phone },
  ]
  /* A card with a page of its own (Chicago) is clickable all over: its city
     is the link, stretched across the card with ::after, so there is one link
     and one tab stop rather than a link wrapped round a list. */
  const whole = f.href
  return (
    <li
      style={{ '--phone-order': f.phoneOrder } as React.CSSProperties}
      className={`relative flex flex-col overflow-hidden rounded-[16px] border border-[#e6e6e6] bg-white max-lg:order-[var(--phone-order)] ${whole ? 'transition-[border-color,box-shadow] hover:border-brand hover:shadow-[0_10px_30px_rgba(5,131,139,0.12)]' : ''}`}
    >
      {/* Header — 6833:2998 / 6896:15930 */}
      <div
        className="flex items-center justify-between gap-[8px] px-[20px] py-[16px] lg:h-[110px] lg:px-[28px] lg:py-0"
        style={{ backgroundImage: 'linear-gradient(163.945deg, #0b1f3a 7.25%, #1b7a3d 79.71%)' }}
      >
        <div className="flex min-w-px items-center gap-[8px] lg:gap-[16px]">
          <span className="grid size-[40px] shrink-0 place-items-center rounded-full bg-white/15 lg:size-[48px]">
            <svg viewBox="0 0 16 16" className="size-[18px] fill-white lg:size-[21.6px]" aria-hidden="true"><path d={GLYPHS.pin} /></svg>
          </span>
          <h3 className="min-w-px font-sans text-[18px] font-semibold leading-normal text-white lg:text-[21px]">
            {whole
              ? <Link href={whole} className="underline-offset-4 after:absolute after:inset-0 after:content-[''] hover:underline">{f.name}</Link>
              : hub
                ? <Link href={href(hub)} className="underline-offset-4 hover:underline">{f.name} <span aria-hidden="true">&rarr;</span></Link>
                : f.name}
          </h3>
        </div>
        {/* "Drop-off Location" — 6902:15978 (13.5) / 6902:15980 (10). */}
        {f.tag && <span className="shrink-0 whitespace-nowrap font-sans text-[10px] font-medium leading-normal text-white lg:text-[13.5px]">{f.tag}</span>}
      </div>

      {/* Body — 6833:3009 / 6896:15937 */}
      <div className="flex flex-1 flex-col gap-[14px] p-[20px] lg:gap-[18px] lg:p-[28px]">
        {rows.map((r) => (
          <div key={r.glyph} className="flex items-center gap-[10px] lg:gap-[12px]">
            <svg viewBox="0 0 16 16" className="size-[16px] shrink-0 fill-brand lg:size-[18px]" aria-hidden="true"><path d={GLYPHS[r.glyph]} /></svg>
            <span className="min-w-px font-poppins text-[12.5px] leading-normal text-[#4d4d4d] lg:text-[14px]">{r.text}</span>
          </div>
        ))}
      </div>
    </li>
  )
}
