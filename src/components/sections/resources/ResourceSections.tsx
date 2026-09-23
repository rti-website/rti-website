import Link from 'next/link'
import { Section } from '@/components/design/Frame'
import { ARTICLES, GUIDES, SEARCH, type Guide } from '@/data/resources'

/**
 * The three bands of /resources/ — Figma 6375:905, 6375:906 and 6375:907, and
 * on a phone 6667:2356, 6667:5092 and 6667:5149 in "Resources - Mobile"
 * (6638:2227, file BVtf2AOuUOcYbiMIlcKmbC).
 *
 * They share a centred header (eyebrow pill, 40px heading, 17px lead) and a
 * 90px vertical pad; only the body differs, so they live in one file rather
 * than three near-identical ones.
 *
 * MOBILE. All three bands are the same shell below lg — px20 / py48 / gap24,
 * still centred — and the header keeps its centre alignment, at 28/34 over
 * 15/22. The three bodies each collapse to one column at full width. The only
 * real reflow is the search band: the frame lifts the Search button OUT of the
 * input and stretches it underneath, and turns the topic chips into a
 * horizontal scroll rail (the five chips measure 621px against a 350px
 * column). Both are done by restyling the markup that is already there — the
 * DOM is the same one the desktop board uses.
 *
 * ! THE MARKS ARE DRAWN, NOT EXPORTED, for the reason given in DownloadGrid:
 * figma.com is unreachable from this sandbox and from the desktop bridge, so
 * every exported asset costs a manual fetch on Asim's machine. Holes live in
 * the same path string as their outline — see the note there.
 */

const SEARCH_MARK = 'M9 2a7 7 0 1 0 4.2 12.6l4.1 4.1 1.4-1.4-4.1-4.1A7 7 0 0 0 9 2Zm0 2a5 5 0 1 1 0 10A5 5 0 0 1 9 4Z'

export const GUIDE_MARKS: Record<Guide['glyph'], string> = {
  /** Laptop. */
  laptop: 'M4.4 4.4h13.2v8.8H4.4V4.4Zm1.8 1.8v5.2h9.6V6.2H6.2ZM2.2 15.4h17.6v1.8H2.2v-1.8Z',
  /** Phone. */
  phone: 'M6.6 1.8h8.8c.9 0 1.6.7 1.6 1.6v15.2c0 .9-.7 1.6-1.6 1.6H6.6c-.9 0-1.6-.7-1.6-1.6V3.4c0-.9.7-1.6 1.6-1.6Zm.2 2.4v12.2h8.4V4.2H6.8ZM11 17.1a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z',
  /** Printer. */
  printer: 'M6.2 2.4h9.6v3.4H6.2V2.4ZM3.4 7.2h15.2c.7 0 1.2.5 1.2 1.2v5.2c0 .7-.5 1.2-1.2 1.2h-2.8v4.8H6.2v-4.8H3.4c-.7 0-1.2-.5-1.2-1.2V8.4c0-.7.5-1.2 1.2-1.2Zm4.6 7.6v3h6v-3H8Zm8.2-4.6a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z',
  /** Recycling loop — two chevrons and a ring, one path so the ring stays open. */
  loop: 'M11 2.2a8.8 8.8 0 0 1 8.1 5.4l-1.7.7A7 7 0 0 0 11 4a7 7 0 0 0-6.3 4h2.6l-3.5 4.4L0 8h2.8A8.8 8.8 0 0 1 11 2.2Zm8.1 6.6L22 13h-2.8a8.8 8.8 0 0 1-15.8 1.8l1.6-.9A7 7 0 0 0 17.4 13h-2.6l3.4-4.2Z',
}

function Header({ eyebrow, heading, lead }: { eyebrow?: string; heading: string; lead: string }) {
  return (
    <div className="flex w-full flex-col items-center gap-[24px] lg:w-[780px] lg:gap-[10px]">
      {eyebrow && (
        <span className="flex h-[34px] shrink-0 items-center rounded-full bg-[#e8f5ec] px-[20px] font-roboto text-[11px] font-bold tracking-[0.89px] text-[#1b7a3d]">
          {eyebrow}
        </span>
      )}
      <h2 className="text-center font-sans text-[40px] font-semibold text-black max-lg:w-full max-lg:text-[28px] max-lg:leading-[34px]">{heading}</h2>
      <p className="text-center font-roboto text-[17px] text-[#7e7e7e] max-lg:w-full max-lg:text-[15px] max-lg:leading-[22px]">{lead}</p>
    </div>
  )
}

/**
 * 6375:905 — heading, search bar, topic chips.
 *
 * The bar is deliberately a static row, not a form: there is no search index to
 * post to, and a box that swallows a query is worse than one that plainly does
 * not accept one yet. The chips ARE links, so the band still leads somewhere.
 * See the note in src/data/resources.ts.
 */
export function ResourceSearch({ top, height }: { top: number; height: number }) {
  return (
    <Section
      top={top} height={height} label="6375:905"
      className="flex flex-col items-center gap-[24px] bg-white px-[20px] pb-[40px] pt-[48px] lg:gap-[32px] lg:px-0 lg:pb-[70px] lg:pt-[90px]"
    >
      <Header heading={SEARCH.heading} lead={SEARCH.lead} />

      {/*
        6667:2359 + 6667:2364. On the board this is ONE 56px bar with the
        button tucked inside its right padding; on a phone the frame splits it
        into a 50px input and a full-width button 24px below. Same two
        children, so the wrapper simply stops being a bar below lg and the
        border moves onto the input itself.
      */}
      {/* The button sits FLUSH with the bar's right edge, full height —
          Asim, 23 Sep 2026: "there is a small gap on right side, remove
          this". It used to float 8px in from the edge (pr-8), with a sliver
          of white bar showing past it. Now the bar clips it to its own
          rounded corner, like the footer's newsletter arrow. */}
      <div className="flex w-full flex-col gap-[24px] lg:h-[56px] lg:w-[680px] lg:flex-row lg:items-stretch lg:justify-between lg:gap-0 lg:overflow-hidden lg:rounded-[10px] lg:border lg:border-[#e2e2e2] lg:bg-white lg:pl-[20px]">
        <span className="flex items-center gap-[12px] max-lg:h-[50px] max-lg:rounded-[8px] max-lg:border max-lg:border-[#e2e2e2] max-lg:bg-white max-lg:px-[16px]">
          <svg viewBox="0 0 20 20" className="size-[20px] shrink-0 fill-[#7e7e7e]" aria-hidden="true"><path d={SEARCH_MARK} /></svg>
          <span className="font-poppins text-[15px] text-[#7e7e7e]">{SEARCH.placeholder}</span>
        </span>
        <Link
          href={SEARCH.searchHref}
          className="flex h-[48.05px] items-center rounded-[8px] bg-brand px-[28.029px] font-roboto text-[15.016px] font-medium tracking-[-0.0801px] text-white transition-colors hover:bg-[#04737a] max-lg:w-full max-lg:justify-center lg:h-auto lg:rounded-none lg:px-[32px]"
        >
          {SEARCH.button}
        </Link>
      </div>

      {/*
        6667:2367 "Chips Scroll". The five chips are 621px wide against a 350px
        column, so on a phone the row scrolls instead of wrapping — which is
        also what keeps the page itself from overflowing 390px.
      */}
      <div className="flex items-start gap-[12px] max-lg:w-full max-lg:gap-[10px] max-lg:overflow-x-auto max-lg:[-ms-overflow-style:none] max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden">
        {SEARCH.chips.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="btn-pop flex h-[38px] shrink-0 items-center rounded-full bg-[#eaf4f5] px-[18px] font-sans text-[13.5px] font-medium text-brand"
          >
            {c.label}
          </Link>
        ))}
      </div>
    </Section>
  )
}

/**
 * 6375:906 — four 617-wide guide cards, two per row. Mobile 6667:5092: the
 * same four cards in one full-width column on a 16px gap, each card otherwise
 * unchanged (p32, gap16, 21px title, 15/1.6 body — the frame redraws it at
 * 350 wide and alters nothing else).
 */
export function ResourceGuides({ top, height }: { top: number; height: number }) {
  return (
    <Section
      top={top} height={height} label="6375:906"
      className="flex flex-col items-center gap-[24px] bg-[#fcfcfc] px-[20px] py-[48px] lg:gap-[50px] lg:px-0 lg:py-[90px]"
    >
      <Header eyebrow={GUIDES.eyebrow} heading={GUIDES.heading} lead={GUIDES.lead} />

      <div className="flex flex-col items-start gap-[24px] max-lg:w-full max-lg:gap-[16px]">
        {[GUIDES.cards.slice(0, 2), GUIDES.cards.slice(2)].map((row, i) => (
          <div key={i} className="flex items-start gap-[24px] max-lg:w-full max-lg:flex-col max-lg:gap-[16px]">
            {row.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="flex w-[617px] flex-col items-start gap-[16px] rounded-[12px] border border-[#e5e5e5] bg-white p-[32px] transition-shadow hover:shadow-[0_4px_18px_rgba(0,0,0,0.06)] max-lg:w-full"
              >
                <span className="flex h-[48px] w-[553px] items-center justify-between max-lg:w-full">
                  <span className="grid size-[48px] place-items-center rounded-full bg-brand">
                    <svg viewBox="0 0 22 22" fillRule="evenodd" className="size-[22px] fill-white" aria-hidden="true">
                      <path d={GUIDE_MARKS[c.glyph]} />
                    </svg>
                  </span>
                  <span className="font-roboto text-[11px] font-bold uppercase tracking-[0.7px] text-brand">{c.category}</span>
                </span>
                <span className="w-[553px] font-sans text-[21px] font-medium leading-[1.3] text-[#132119] max-lg:w-full">{c.title}</span>
                <span className="w-[553px] font-roboto text-[15px] leading-[1.6] text-[#7e7e7e] max-lg:w-full">{c.body}</span>
                <span className="flex h-[20px] w-[553px] items-center justify-between max-lg:w-full">
                  <span className="font-roboto text-[13px] text-[#a6a6a6]">Guide</span>
                  <span className="font-roboto text-[14px] font-medium text-brand">Read Guide &nbsp;&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </Section>
  )
}

/**
 * 6375:907 — six 1282-wide article rows on #eaf4f5 plates. Mobile 6667:5149:
 * the row keeps its shape exactly — px28 / py24, a flexible text column and
 * "Read →" pinned right — and only loses its fixed width; the list gap comes
 * down from 16 to 12.
 *
 * ! The mobile frame draws the plate as #f9fafb on an r12 corner rather than
 * the shipped #eaf4f5 on r10. Kept teal, so the row does not change colour
 * when the viewport crosses 1024px; see the note in the agent report.
 */
export function ResourceArticles({ top, height }: { top: number; height: number }) {
  return (
    <Section
      top={top} height={height} label="6375:907"
      className="flex flex-col items-center gap-[24px] bg-white px-[20px] py-[48px] lg:gap-[50px] lg:px-0 lg:py-[90px]"
    >
      <Header eyebrow={ARTICLES.eyebrow} heading={ARTICLES.heading} lead={ARTICLES.lead} />

      <div className="flex w-[1282px] flex-col items-start gap-[16px] max-lg:w-full max-lg:gap-[12px]">
        {ARTICLES.rows.map((a) => (
          <Link
            key={a.title}
            href={a.href}
            className="flex w-[1282px] items-center gap-[24px] rounded-[10px] bg-[#eaf4f5] px-[28px] py-[24px] transition-colors hover:bg-[#dfeef0] max-lg:w-full"
          >
            <span className="flex min-w-px flex-1 flex-col items-start gap-[6px]">
              <span className="flex items-center gap-[10px] whitespace-nowrap">
                <span className="font-roboto text-[11px] font-bold uppercase tracking-[0.6px] text-brand">{a.category}</span>
                <span className="font-roboto text-[11px] text-[#b3b3b3]">&bull;</span>
                <span className="font-roboto text-[12px] text-[#808080]">{a.date}</span>
              </span>
              <span className="w-full font-sans text-[18px] font-medium text-[#132119]">{a.title}</span>
              <span className="w-full font-roboto text-[14px] text-[#7e7e7e]">{a.body}</span>
            </span>
            <span className="shrink-0 whitespace-nowrap font-roboto text-[14px] font-medium text-brand">Read &rarr;</span>
          </Link>
        ))}
      </div>
    </Section>
  )
}
