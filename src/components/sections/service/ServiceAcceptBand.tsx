import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/design/Frame'

/**
 * "What We Accept" — Figma 6142:2067, inside frame 6142:2048.
 *
 * ===========================================================================
 * REDRAWN 22 Sep 2026 — Asim: "the design is changed"
 * ===========================================================================
 *   BEFORE  two columns of bordered cells (Figma's "Paragraph+Border"), each a
 *           1px #e5e5e5 box with a 145px IBM Plex Mono label beside the text.
 *   NOW     one column of check rows: a 30px green tick, then a 18px SemiBold
 *           title over a 16px description, 5px apart. No border on the row —
 *           a 1px hairline sits BETWEEN rows instead, and the row keeps its
 *           r10 and px24/py10 from the old component so the hover target on a
 *           linked row is still a card-shaped area.
 *
 * The section also gained a closing paragraph (6692:3592), same measure and
 * alignment as the intro. `outro` already existed on this component and in
 * every page's data, so nothing new had to be threaded through — see the
 * `outro` field in src/data/service-page.ts.
 *
 * !! THE HEIGHT IS MEASURED, NOT DRAWN. The frame's 446.36 was sized around
 * four short two-column cells. One column of taller rows plus an outro needs
 * roughly twice that, so every page's `layout.accept` has to be re-measured:
 *     npm run build && npx next start -p 3200
 *     node scripts/measure-service-pages.mjs --write --port 3200
 * A band that is too short clips silently, which on this section means an
 * accepted-materials row nobody notices is missing.
 *
 * MOBILE — 6638:10560 ("What We Accept": heading + intro) and 6638:10563
 * ("Process Steps": the rows and the outro) in file BVtf2AOuUOcYbiMIlcKmbC,
 * which split this one band into two stacked frames. px20 / pt40 / pb8, the
 * heading and intro LEFT aligned at 24/1.2 and 15/1.5, and the row (6695:5800)
 * drops its horizontal padding, aligns to the top of the tick rather than the
 * middle, and sets 14/1.22 over 15/1.4.
 */

/**
 * The tick — Figma "image 437" (node 6695:5813), 30 x 27.604, exported at 3x.
 *
 * This was an inline ring-and-check for one day, because figma.com is blocked
 * by this project's egress proxy. It was not the designer's mark: hers is an
 * open circle with a heavy check that breaks out over the top-right of the
 * ring. Asim caught it on 22 Sep 2026 — "the logo is not that one in Figma".
 * The real export is in public/images/icons/ and recorded in
 * data/figma-assets.json, fetched through the browser on his machine.
 */
function Tick() {
  return (
    <Image
      src="/images/icons/accept-tick.png"
      alt=""
      width={90}
      height={83}
      className="h-[27.604px] w-[30px] shrink-0 object-contain"
    />
  )
}

export function ServiceAcceptBand({
  top, height = 446.36, label, heading, intro, items, outro, id,
}: {
  top: number
  /** Anchor target for the preceding block's "Read More" link. */
  id?: string
  height?: number
  label?: string
  heading: string
  intro?: string
  /** May be empty: the mail-in doc has no published eligibility list yet. */
  items: { label: string; text: string; href?: string; external?: boolean }[]
  outro?: string
}) {
  return (
    <Section
      top={top} height={height} label={label}
      className="flex flex-col items-start justify-center gap-[16px] bg-white px-[20px] pb-[8px] pt-[40px] lg:items-center lg:gap-[30px] lg:px-[340px] lg:py-0"
    >
      {id && <span id={id} className="absolute -top-[140px]" aria-hidden="true" />}
      {/* 75px is Figma's box for a one-line heading; longer ones wrap, so the
          height is a minimum. Same fix as ServiceSplit's heading. The 829px
          width and the centring are `lg:` only — the phone frame sets it left
          and full width at 24px. */}
      <h2 className="w-full font-sans text-[24px] font-semibold leading-[1.2] text-black lg:flex lg:min-h-[75px] lg:w-[829px] lg:items-center lg:justify-center lg:text-center lg:text-[40px] lg:leading-[1.15]">
        {heading}
      </h2>

      {intro && (
        <p className="w-full font-roboto text-[15px] leading-[1.5] text-muted lg:w-[942px] lg:text-center lg:text-[17.018px] lg:leading-[27.654px]">
          {intro}
        </p>
      )}

      {/* A plain div rather than ul/li: the hairline is a flex ITEM, not a
          border, so the gap falls either side of it the way Figma stacks them.
          Wrapping each pair in an li would need `display: contents` to keep
          that, and a contents-display list item drops out of the accessibility
          tree in several browsers.

          The gap is 12, not the frame's 20 — Asim, 22 Sep 2026: "make the gap
          a little small". Because the hairline is an item in this column, the
          gap lands on BOTH sides of it: the frame's 20 put 41px between one
          row and the next, this puts 25. */}
      {items.length > 0 && (
        <div className="flex w-full flex-col gap-[12px] max-lg:mt-[8px]">
          {items.map((item, i) => (
            <Fragment key={item.label}>
              <Row item={item} />
              {/* 6695:5818 — between rows only, never after the last. */}
              {i < items.length - 1 && <span className="h-px w-full bg-line" aria-hidden="true" />}
            </Fragment>
          ))}
        </div>
      )}

      {outro && (
        <p className="w-full font-roboto text-[15px] leading-[1.5] text-muted lg:w-[942px] lg:text-center lg:text-[17.018px] lg:leading-[27.654px]">
          {outro}
        </p>
      )}
    </Section>
  )
}

/**
 * One row. On the industry pages each names a service and links to its page,
 * so the whole row is the link; on the service pages there is nothing to link
 * to and it stays a plain div.
 *
 * The old cell had a border that turned teal on hover. There is no border to
 * turn any more, so a linked row tints instead — it still has to be visible
 * that seven of these rows go somewhere and the rest do not.
 */
function Row({ item }: { item: { label: string; text: string; href?: string; external?: boolean } }) {
  const cls = 'flex w-full items-start gap-[15px] rounded-[10px] py-[10px] lg:items-center lg:px-[24px]'
  const inner = (
    <>
      <Tick />
      <span className="flex min-w-px flex-1 flex-col gap-[5px]">
        <span className="font-sans text-[14px] font-semibold leading-[1.22] text-heading lg:text-[18px]">
          {item.label}
        </span>
        <span className="font-roboto text-[15px] leading-[1.4] text-muted lg:text-[16px] lg:leading-[27.654px]">
          {item.text}
        </span>
      </span>
    </>
  )
  if (!item.href) {
    return <div className={cls}>{inner}</div>
  }
  const linked = `${cls} transition-colors hover:bg-brand-soft`
  return item.external
    ? <a href={item.href} target="_blank" rel="noopener noreferrer" className={linked}>{inner}</a>
    : <Link href={item.href} className={linked}>{inner}</Link>
}
