import Link from 'next/link'
import { Section } from '@/components/design/Frame'
import type { DownloadCard, DownloadSection } from '@/data/downloads'

/**
 * A band of download cards — Figma 6393:1579, 6393:1580 and 6393:1581, and on
 * a phone 6638:10255, 6638:10328 and 6638:10372 in "Downloads - Mobile"
 * (6638:10182, file BVtf2AOuUOcYbiMIlcKmbC).
 *
 * All three sections are the same shape and differ only in copy, card count and
 * background, so one component builds them: py-90, a 44px gap, a centred header
 * (eyebrow pill, 36px heading, 16px lead) and a row of 410-wide cards with a
 * 24px gap. Two cards or three, the row is centred either way.
 *
 * MOBILE. px20 / py48 on a flat 20px rhythm: the eyebrow pill sits LEFT while
 * the heading and lead stay centred across the full column (24px heading,
 * 15px lead), and the card row becomes one full-width column on a 16px gap.
 * The card itself is unchanged apart from its width — except that the frame
 * gives "Request Download" py14, which is what turns a 16px text line into a
 * 44px tap target.
 *
 * ! THE MARKS ARE DRAWN, NOT EXPORTED. Figma has eight one-colour SVGs here.
 * Exporting them would mean eight more assets fetched by hand on Asim's machine
 * (figma.com is blocked from this sandbox and from the desktop bridge), so they
 * are inline paths like the rest of the site's small marks — see Glyph.tsx and
 * SustainabilityMarks.tsx for the same call.
 *
 * !! HOLES MUST LIVE IN THE SAME PATH STRING AS THEIR OUTLINE. `fillRule` is
 * evenodd on the <svg>, but a counter cut into a separate <path> is a separate
 * shape and fills solid. This bit the alert triangle on /sustainability/ and
 * the loop on /compliance-center/.
 */

export const MARKS: Record<DownloadCard['glyph'], string> = {
  /** Shield with a tick — recycling certificate. */
  shield: 'M10 1.5 3.6 4v5.1c0 4 2.7 7.7 6.4 8.6 3.7-.9 6.4-4.6 6.4-8.6V4L10 1.5Zm-.9 11.9L5.9 10.2l1.3-1.3 1.9 1.9 4.2-4.2 1.3 1.3-5.5 5.5Z',
  /** Padlock — certificate of destruction. */
  lock: 'M10 1.7a3.7 3.7 0 0 0-3.7 3.7v1.7H5.1c-.6 0-1.1.5-1.1 1.1v8.2c0 .6.5 1.1 1.1 1.1h9.8c.6 0 1.1-.5 1.1-1.1V8.2c0-.6-.5-1.1-1.1-1.1h-1.2V5.4A3.7 3.7 0 0 0 10 1.7Zm0 1.8c1 0 1.9.8 1.9 1.9v1.7H8.1V5.4c0-1 .9-1.9 1.9-1.9Zm0 7.1a1.5 1.5 0 0 1 .8 2.8v1.5a.8.8 0 0 1-1.6 0v-1.5a1.5 1.5 0 0 1 .8-2.8Z',
  /** Stacked rules — checklist. */
  list: 'M3 4.6h14v1.8H3V4.6Zm0 4.5h14v1.8H3V9.1Zm0 4.5h9.3v1.8H3v-1.8Z',
  /** Rosette — certification seal. */
  seal: 'M10 1.6a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 1.8a2.8 2.8 0 1 1 0 5.6 2.8 2.8 0 0 1 0-5.6Zm-3.4 8.2-1.5 6.4L10 15.8l4.9 2.2-1.5-6.4a6.4 6.4 0 0 1-6.8 0Z',
  /** Globe with two parallels — state regulation. */
  globe: 'M10 1.7a8.3 8.3 0 1 0 0 16.6 8.3 8.3 0 0 0 0-16.6Zm6.3 7.4h-2.7a12.6 12.6 0 0 0-1-4.3 6.6 6.6 0 0 1 3.7 4.3ZM10 3.6c.7.9 1.4 2.7 1.6 5.5H8.4c.2-2.8.9-4.6 1.6-5.5ZM6.4 4.8a12.6 12.6 0 0 0-1 4.3H2.7a6.6 6.6 0 0 1 3.7-4.3Zm-3.7 6.1h2.7c.1 1.6.4 3.1 1 4.3a6.6 6.6 0 0 1-3.7-4.3Zm7.3 5.5c-.7-.9-1.4-2.7-1.6-5.5h3.2c-.2 2.8-.9 4.6-1.6 5.5Zm3.6-1.2c.5-1.2.9-2.7 1-4.3h2.7a6.6 6.6 0 0 1-3.7 4.3Z',
  /** Luggage tag — prepaid shipping label. */
  tag: 'M17.3 9.1 10.9 2.7a2 2 0 0 0-1.4-.6H3.6c-.8 0-1.5.7-1.5 1.5v5.9c0 .5.2 1 .6 1.4l6.4 6.4c.6.6 1.5.6 2.1 0l6.1-6.1c.6-.6.6-1.5 0-2.1ZM5.7 7.1a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8Z',
  /** Open carton — packaging guide. */
  box: 'M10 1.7 2.5 5.4v9.2L10 18.3l7.5-3.7V5.4L10 1.7Zm0 2 5 2.5-5 2.5-5-2.5 5-2.5Zm-5.7 4 4.8 2.4v5.5l-4.8-2.4V7.7Zm6.6 7.9V10l4.8-2.4v5.5l-4.8 2.5Z',
  /** Page with a folded corner — a one-page overview or summary. */
  doc: 'M5.4 1.7h6.2l4.1 4.1v12.5H5.4c-.7 0-1.2-.5-1.2-1.2V2.9c0-.7.5-1.2 1.2-1.2Zm5.6 1.8v3.4h3.4L11 3.5ZM6.7 9.1h6.6v1.6H6.7V9.1Zm0 3.4h6.6v1.6H6.7v-1.6Z',
  /** Envelope — kit instructions. */
  mail: 'M2.5 5.4c0-.8.7-1.5 1.5-1.5h12c.8 0 1.5.7 1.5 1.5v9.2c0 .8-.7 1.5-1.5 1.5H4c-.8 0-1.5-.7-1.5-1.5V5.4Zm2.1.4L10 10l5.4-4.2H4.6Zm10.9 1.9-4.9 3.8a1 1 0 0 1-1.2 0L4.5 7.7v6.5h11V7.7Z',
}

/** The download arrow next to "Request Download" — 16px. */
export const DOWNLOAD_MARK = 'M8.7 1.7h1.6v6.6l2.2-2.2 1.1 1.1L9.5 12 5.4 7.2l1.1-1.1 2.2 2.2V1.7ZM2.7 12.3h1.6v2.4h11.4v-2.4h1.6v2.8c0 .7-.6 1.2-1.2 1.2H3.9c-.7 0-1.2-.5-1.2-1.2v-2.8Z'

export function DownloadGrid({
  top, height, tone = 'white', section,
}: {
  top: number
  height: number
  /** The design alternates white and #fcfcfc down the page. */
  tone?: 'white' | 'mist'
  section: DownloadSection
}) {
  return (
    <Section
      top={top} height={height} label={section.label}
      className={`flex flex-col items-start gap-[20px] px-[20px] py-[48px] lg:items-center lg:gap-[44px] lg:px-0 lg:py-[90px] ${tone === 'white' ? 'bg-white' : 'bg-[#fcfcfc]'}`}
    >
      <div className="flex w-full flex-col items-start gap-[20px] lg:w-[820px] lg:items-center lg:gap-[10px]">
        <span className="flex h-[34px] shrink-0 items-center rounded-full bg-[#e8f5ec] px-[20px] font-roboto text-[11px] font-bold tracking-[0.89px] text-[#1b7a3d]">
          {section.eyebrow}
        </span>
        <h2 className="text-center font-sans text-[36px] font-semibold text-black max-lg:w-full max-lg:text-[24px]">{section.heading}</h2>
        <p className="text-center font-roboto text-[16px] text-[#7e7e7e] max-lg:w-full max-lg:text-[15px]">{section.lead}</p>
      </div>

      <div className="flex items-start gap-[24px] max-lg:w-full max-lg:flex-col max-lg:gap-[16px]">
        {section.cards.map((c) => <DownloadTile key={c.title} card={c} />)}
      </div>
    </Section>
  )
}

/**
 * One 410-wide card — 6388:1534 and its siblings, 6638:10261 on a phone.
 * Exported because /itad-recycling-guides/ draws the identical tile under a
 * header of its own.
 *
 * ! THE TWO MOBILE FRAMES DISAGREE ABOUT THIS CARD. 6638:10261 (Downloads)
 * keeps p32 / r12 / the download mark and pads the action row to 44px;
 * 6674:2454 (ITAD & Recycling Guides) redraws it at p24 / r16 with a 13px
 * bold link and no mark. Built to the Downloads frame, which is this tile's
 * home and the only one of the two that gives the link a tap target.
 */
export function DownloadTile({ card: c }: { card: DownloadCard }) {
  return (
    <Link
      href={c.href}
      className="flex w-[410px] flex-col items-start gap-[16px] rounded-[12px] border border-[#e5e5e5] bg-white p-[32px] transition-shadow hover:shadow-[0_4px_18px_rgba(0,0,0,0.06)] max-lg:w-full"
    >
      <span className="flex h-[44px] w-[346px] items-center justify-between max-lg:w-full">
        <span className="grid size-[44px] place-items-center rounded-full bg-brand">
          <svg viewBox="0 0 20 20" fillRule="evenodd" className="size-[20px] fill-white" aria-hidden="true">
            <path d={MARKS[c.glyph]} />
          </svg>
        </span>
        <span className="font-roboto text-[11px] font-bold tracking-[0.6px] text-[#a6a6a6]">{c.kind}</span>
      </span>

      <span className="w-[346px] font-sans text-[19px] font-medium leading-[25px] text-[#132119] max-lg:w-full">{c.title}</span>
      <span className="w-[346px] font-roboto text-[14.5px] leading-[22px] text-[#7e7e7e] max-lg:w-full">{c.body}</span>

      <span className="flex items-center gap-[8px] max-lg:py-[14px]">
        <svg viewBox="0 0 20 18" className="size-[16px] fill-brand" aria-hidden="true">
          <path d={DOWNLOAD_MARK} />
        </svg>
        <span className="font-roboto text-[14px] font-bold leading-[16px] text-brand">Request Download</span>
      </span>
    </Link>
  )
}
