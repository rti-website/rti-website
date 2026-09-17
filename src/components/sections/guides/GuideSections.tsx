import Link from 'next/link'
import { Section } from '@/components/design/Frame'
import { DownloadTile, MARKS } from '@/components/sections/downloads/DownloadGrid'
import { GUIDE_MARKS } from '@/components/sections/resources/ResourceSections'
import { DOCS, GUIDES, type GuideRow } from '@/data/guides'

/**
 * The two bands of /itad-recycling-guides/ — Figma 6386:1349 and 6386:1350.
 *
 * Both are py-100 with a 50px gap under a centred header (34px eyebrow pill,
 * 40px heading, 17px lead, all on a 780 column), so the header is one function.
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
    <div className="flex w-[780px] flex-col items-center gap-[10px]">
      <span className="flex h-[34px] items-center rounded-full bg-[#e8f5ec] px-[20px] font-roboto text-[11px] font-bold tracking-[0.89px] text-[#1b7a3d]">
        {eyebrow}
      </span>
      <h2 className="text-center font-sans text-[40px] font-semibold leading-[52px] text-black">{heading}</h2>
      <p className="text-center font-roboto text-[17px] leading-[20px] text-[#7e7e7e]">{lead}</p>
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
 */
export function GuideList({ top, height }: { top: number; height: number }) {
  return (
    <Section
      top={top} height={height} label={GUIDES.label}
      className="flex flex-col items-center gap-[50px] bg-white py-[100px]"
    >
      <BandHeader eyebrow={GUIDES.eyebrow} heading={GUIDES.heading} lead={GUIDES.lead} />

      <div className="flex w-[1282px] flex-col items-start gap-[16px]">
        {GUIDES.rows.map((g) => (
          <Link
            key={g.title}
            href={g.href}
            className="flex w-[1282px] items-center gap-[20px] rounded-[10px] bg-[#eaf4f5] px-[28px] py-[24px] transition-colors hover:bg-[#dfeef0]"
          >
            <span className="grid size-[44px] shrink-0 place-items-center rounded-full bg-brand">
              <svg viewBox="0 0 22 22" fillRule="evenodd" className="size-[20px] fill-white" aria-hidden="true">
                <path d={ROW_MARKS[g.glyph]} />
              </svg>
            </span>

            <span className="flex min-w-px flex-1 flex-col items-start gap-[4px]">
              <span className="w-full font-sans text-[18px] font-medium leading-[23px] text-[#132119]">{g.title}</span>
              <span className="w-full font-roboto text-[14px] leading-[16px] text-[#7e7e7e]">{g.body}</span>
            </span>

            <span className="shrink-0 whitespace-nowrap font-roboto text-[14px] font-medium text-brand">
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
      className="flex flex-col items-center gap-[50px] bg-[#fcfcfc] py-[100px]"
    >
      <BandHeader eyebrow={DOCS.eyebrow} heading={DOCS.heading} lead={DOCS.lead} />

      <div className="flex items-start gap-[24px]">
        {DOCS.cards.map((c) => <DownloadTile key={c.title} card={c} />)}
      </div>
    </Section>
  )
}
