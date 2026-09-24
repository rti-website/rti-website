import Link from 'next/link'
import { Section } from '@/components/design/Frame'
import { href } from '@/lib/urls'
import { Eyebrow, Lead } from '@/components/ui/Bits'
import { GLYPHS } from '@/components/ui/Glyph'
import { NATIONWIDE, type NationwideFacility } from '@/data/facilities'

/**
 * "Additional Facilities Nationwide" — Figma 6831:2663 on /all-locations/,
 * under the two facility cards. Built 24 Sep 2026.
 *
 * Desktop: py90, an 820px centred heading block, then a 1250px grid of 613px
 * cards two to a row, 24 apart both ways; the ninth card sits alone on the
 * left. Each card is the facility card from LocationCards without its
 * buttons and certification mark: a 110px navy-to-green header with the pin
 * disc and the city at 21px, then address, phone and hours rows, a hairline,
 * "Materials Accepted" and four chips.
 *
 * MOBILE — 6833:3043 in "Locations - Mobile" (6747:2557). Cards stack at 350,
 * 20 apart; the header drops to 72 (40px disc, city at 18px), the body to 20
 * padding with 16px glyphs and 12.5px text, the hairline goes, and the chips
 * run two to a row as drawn. The heading block spaces its parts 24 apart and
 * uses the frame's shorter lead.
 *
 * NOT CLICKABLE until a site has a page (Asim, 24 Sep 2026: "make it
 * unclickable for now"). Since the location pages (Admin -> Locations, the
 * same day) a card's city links to its /locations/<site>/ page once that page
 * is PUBLISHED, and each material chip links to that service's page once it
 * is. Drafts stay plain text, so nothing links to an unfinished page.
 */
export type SiteLinks = Record<string, { hub?: string; materials: Record<string, string> }>

export function NationwideFacilities({ top, height, links = {} }: {
  top: number; height: number
  /** Card slug -> its published hub and material pages. */
  links?: SiteLinks
}) {
  return (
    <Section
      top={top} height={height} label="6831:2663"
      className="flex flex-col items-center gap-[24px] bg-white px-[20px] py-[44px] lg:gap-[44px] lg:px-0 lg:py-[90px]"
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
          wraps its address (Atlanta's does on the phone). */}
      <ul className="grid w-full grid-cols-1 gap-[20px] lg:w-[1250px] lg:grid-cols-[613px_613px] lg:gap-[24px]">
        {NATIONWIDE.facilities.map((f) => <Card key={f.name} f={f} links={f.slug ? links[f.slug] : undefined} />)}
      </ul>
    </Section>
  )
}

function Card({ f, links }: { f: NationwideFacility; links?: SiteLinks[string] }) {
  const rows = [
    { glyph: 'pin' as const,   text: f.address },
    { glyph: 'phone' as const, text: f.phone },
    { glyph: 'clock' as const, text: f.hours },
  ]
  return (
    <li className="flex flex-col overflow-hidden rounded-[16px] border border-[#e6e6e6] bg-white">
      {/* Header — 6833:2670 / 6834:2669 */}
      <div
        className="flex items-center gap-[8px] px-[20px] py-[16px] lg:h-[110px] lg:gap-[16px] lg:px-[28px] lg:py-0"
        style={{ backgroundImage: 'linear-gradient(163.945deg, #0b1f3a 7.25%, #1b7a3d 79.71%)' }}
      >
        <span className="grid size-[40px] shrink-0 place-items-center rounded-full bg-white/15 lg:size-[48px]">
          <svg viewBox="0 0 16 16" className="size-[18px] fill-white lg:size-[21.6px]" aria-hidden="true"><path d={GLYPHS.pin} /></svg>
        </span>
        <h3 className="min-w-px font-sans text-[18px] font-semibold leading-normal text-white lg:text-[21px]">
          {links?.hub
            ? <Link href={href(links.hub)} className="underline-offset-4 hover:underline">{f.name} <span aria-hidden="true">&rarr;</span></Link>
            : f.name}
        </h3>
      </div>

      {/* Body — 6833:2681 / 6834:2678 */}
      <div className="flex flex-1 flex-col gap-[14px] p-[20px] lg:gap-[18px] lg:p-[28px]">
        {rows.map((r) => (
          <div key={r.glyph} className="flex items-center gap-[10px] lg:gap-[12px]">
            <svg viewBox="0 0 16 16" className="size-[16px] shrink-0 fill-brand lg:size-[18px]" aria-hidden="true"><path d={GLYPHS[r.glyph]} /></svg>
            <span className="min-w-px font-poppins text-[12.5px] leading-normal text-[#4d4d4d] lg:text-[14px]">{r.text}</span>
          </div>
        ))}

        <span className="h-px w-full bg-[#ebebeb] max-lg:hidden" aria-hidden="true" />
        <p className="font-sans text-[12px] font-medium leading-normal text-heading lg:text-[13px]">{NATIONWIDE.materialsLabel}</p>

        {/* Chips — 6833:2701 / 6834:2697. Two to a row on the phone, as the
            frame draws them; one row at lg. */}
        <ul className="grid grid-cols-[repeat(2,max-content)] gap-x-[6px] gap-y-[14px] lg:flex lg:flex-wrap lg:gap-[8px]">
          {f.materials.map((m) => {
            const chip = 'flex h-[26px] items-center rounded-full border bg-white px-[10px] font-roboto text-[11.5px] lg:h-[28px] lg:px-[12px] lg:text-[12.5px]'
            const to = links?.materials[m]
            return (
              <li key={m} className="flex">
                {to
                  ? <Link href={href(to)} className={`${chip} border-brand text-brand hover:bg-[#eaf4f5]`}>{m}</Link>
                  : <span className={`${chip} border-[#e0e0e0] text-[#4d4d4d]`}>{m}</span>}
              </li>
            )
          })}
        </ul>
      </div>
    </li>
  )
}
