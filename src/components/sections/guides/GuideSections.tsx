import Link from 'next/link'
import { Section } from '@/components/design/Frame'
import { DownloadTile, MARKS } from '@/components/sections/downloads/DownloadGrid'
import { GUIDE_MARKS } from '@/components/sections/resources/ResourceSections'
import { DOCS, GUIDES, type GuideRow } from '@/data/guides'

/**
 * The two bands of /itad-recycling-guides/ — Figma 6386:1349 and 6386:1350,
 * and on a phone 6674:2385 and 6674:2448 in "ITAD & Recycling Guides - Mobile"
 * (6638:8289, file BVtf2AOuUOcYbiMIlcKmbC).
 *
 * Both are py-100 with a 50px gap under a centred header (34px eyebrow pill,
 * 40px heading, 17px lead, all on a 780 column), so the header is one function.
 *
 * MOBILE. px20 / py48 / gap24, and the header goes LEFT-ALIGNED at 26/32 over
 * 16/24 — this page's frames are the only ones of the four that do, so the
 * alignment lives here rather than in a shared header. The big reflow is the
 * guide row: see GuideList.
 *
 * ! THAT HEADER IS NOT THE ONE IN DownloadGrid. /downloads/ draws its own at
 * 36/16 on an 820 column; this page's frames say 40/17 on 780. Two numbers
 * apart, but they are two different frame sets and the smaller one would be
 * visibly lighter here, so they stay separate rather than being merged behind a
 * prop nobody can read.
 *
 * ! THE MARKS ARE DRAWN, NOT EXPORTED, as everywhere else on the site —
 * figma.com is unreachable from this sandbox and from the desktop bridge, so
 * every exported asset costs a manual fetch on Asim's machine. The six guide
 * rows borrow from both existing sets: laptop and loop from /resources/, lock,
 * seal, box and mail from /downloads/.
 */

const ROW_MARKS: Record<GuideRow['glyph'], string> = {
  laptop: GUIDE_MARKS.laptop,
  loop:   GUIDE_MARKS.loop,
  lock:   MARKS.lock,
  seal:   MARKS.seal,
  box:    MARKS.box,
  mail:   MARKS.mail,
}

function BandHeader({ eyebrow, heading, lead }: { eyebrow: string; heading: string; lead: string }) {
  return (
    <div className="flex w-full flex-col items-start gap-[24px] lg:w-[780px] lg:items-center lg:gap-[10px]">
      <span className="flex h-[34px] shrink-0 items-center rounded-full bg-[#e8f5ec] px-[20px] font-roboto text-[11px] font-bold tracking-[0.89px] text-[#1b7a3d] max-lg:h-[29px] max-lg:px-[16px]">
        {eyebrow}
      </span>
      <h2 className="text-center font-sans text-[40px] font-semibold leading-[52px] text-black max-lg:w-full max-lg:text-left max-lg:text-[26px] max-lg:leading-[32px]">{heading}</h2>
      <p className="text-center font-roboto text-[17px] leading-[20px] text-[#7e7e7e] max-lg:w-full max-lg:text-left max-lg:text-[16px] max-lg:leading-[24px]">{lead}</p>
    </div>
  )
}

/**
 * Section - Guide List, 6386:1349. Six 1282x92 rows on #eaf4f5, gapped 16.
 *
 * The row is px28 py24 with a 20px gap: a 44px teal disc, a flexible text
 * column (18px title, 4px gap, 14px body) and "Read Guide →" pinned right.
 *
 * Every row is a link to a real URL rather than to an invented guide slug —
 * src/data/guides.ts explains each mapping and which one is weakest.
 *
 * MOBILE — 6674:2391. The row stops being one line and becomes three: the
 * disc and the title share the first, the body spans the full width on the
 * second, "Read Guide →" sits bottom-LEFT on the third. That is a grid, not a
 * flex row, and the middle span goes `display: contents` below lg so its two
 * children can be placed on the grid directly. ONE DOM either way — nothing is
 * duplicated and nothing is re-ordered in the source.
 *
 * ! The frame draws the plate as #f6f6f6 on an r16 corner rather than the
 * shipped #eaf4f5 on r10. Kept teal, so the row does not change colour when
 * the viewport crosses 1024px; see the note in the agent report.
 */
export function GuideList({ top, height }: { top: number; height: number }) {
  return (
    <Section
      top={top} height={height} label={GUIDES.label}
      className="flex flex-col items-center gap-[24px] bg-white px-[20px] py-[48px] lg:gap-[50px] lg:px-0 lg:py-[100px]"
    >
      <BandHeader eyebrow={GUIDES.eyebrow} heading={GUIDES.heading} lead={GUIDES.lead} />

      <div className="flex w-[1282px] flex-col items-start gap-[16px] max-lg:w-full">
        {GUIDES.rows.map((g) => (
          <Link
            key={g.title}
            href={g.href}
            className="items-center rounded-[10px] bg-[#eaf4f5] transition-colors hover:bg-[#dfeef0] max-lg:grid max-lg:w-full max-lg:grid-cols-[44px_1fr] max-lg:gap-x-[14px] max-lg:gap-y-[12px] max-lg:px-[20px] max-lg:py-[20px] lg:flex lg:w-[1282px] lg:gap-[20px] lg:px-[28px] lg:py-[24px]"
          >
            <span className="grid size-[44px] shrink-0 place-items-center rounded-full bg-brand">
              <svg viewBox="0 0 22 22" fillRule="evenodd" className="size-[20px] fill-white" aria-hidden="true">
                <path d={ROW_MARKS[g.glyph]} />
              </svg>
            </span>

            {/* `max-lg:contents` — the title and the body are placed on the
                row's grid themselves below lg. Every flex property here is
                `lg:` so there is no display utility to out-specify. */}
            <span className="max-lg:contents lg:flex lg:min-w-px lg:flex-1 lg:flex-col lg:items-start lg:gap-[4px]">
              <span className="w-full font-sans text-[18px] font-medium leading-[23px] text-[#132119] max-lg:text-[17px] max-lg:leading-[22px]">{g.title}</span>
              <span className="w-full font-roboto text-[14px] leading-[16px] text-[#7e7e7e] max-lg:col-span-2 max-lg:leading-[21px]">{g.body}</span>
            </span>

            <span className="shrink-0 whitespace-nowrap font-roboto text-[14px] font-medium text-brand max-lg:col-span-2 max-lg:text-[13px] max-lg:font-bold">
              Read Guide &rarr;
            </span>
          </Link>
        ))}
      </div>
    </Section>
  )
}

/**
 * Section - Downloads, 6386:1350. Three 410-wide cards on #fcfcfc.
 *
 * The cards are byte-for-byte the ones /downloads/ draws, so they come from
 * DownloadTile rather than from a second copy here. Only the header differs.
 */
export function ReferenceDocs({ top, height }: { top: number; height: number }) {
  return (
    <Section
      top={top} height={height} label={DOCS.label}
      className="flex flex-col items-center gap-[24px] bg-[#fcfcfc] px-[20px] py-[48px] lg:gap-[50px] lg:px-0 lg:py-[100px]"
    >
      <BandHeader eyebrow={DOCS.eyebrow} heading={DOCS.heading} lead={DOCS.lead} />

      <div className="flex items-start gap-[24px] max-lg:w-full max-lg:flex-col max-lg:gap-[16px]">
        {DOCS.cards.map((c) => <DownloadTile key={c.title} card={c} />)}
      </div>
    </Section>
  )
}
