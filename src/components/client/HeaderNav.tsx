'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HEADER_H } from '@/lib/layout'

/**
 * The main nav row and everything that drops out of it — Figma
 * Zr9obaa2Aj1R9qnYgOBmmD 6107:1618 "MainMenu Module 2", which has three
 * variants: the bare bar (6107:1812), the Services mega-menu open (6107:1619)
 * and the search panel open (6107:1701).
 *
 * The search icon was REMOVED on 23 Sep 2026 — Asim: "remove this search
 * from navbar". It opened a panel whose field did nothing (there is no site
 * search to send it to), so the icon, the panel and its sentinel key are
 * gone. The mobile drawer's inert search field went with it. If site search
 * is ever built, 6107:1701 is the frame to rebuild the panel from.
 *
 * That component set lives in a DIFFERENT Figma file from the page frames this
 * site is otherwise built from. It is the canonical header, per Asim on
 * 16 Sep 2026 — "make the drop down and navbar and search like this".
 *
 * WHY THIS IS A CLIENT COMPONENT (CLAUDE.md rule 7). The panels are full-bleed:
 * 1920 wide, flush under the 140px bar, spanning the whole window. A CSS-only
 * hover menu cannot do that from inside the nav row, because the panel would be
 * positioned against the row rather than against the header. Owning open/closed
 * in state lets the panels be siblings of the row, positioned against the
 * header itself, which is the only way the geometry comes out right.
 *
 * !! EVERY LINK IS ALWAYS RENDERED. The panels are hidden with CSS, never
 * unmounted, so the prerendered HTML carries the full menu whether or not
 * JavaScript runs. Internal link structure is the one thing this migration must
 * not lose (CLAUDE.md, the paragraph above rule 1), and a menu whose links only
 * exist after a click is a menu that loses it.
 *
 * Opening is hover with a 120ms close grace, because the design leaves a 41px
 * gap between the bottom of a nav item (y99) and the top of the panel (y140)
 * and the pointer has to cross it. Escape closes, and every item is reachable
 * by keyboard through focus-within.
 */

export type MenuItem = {
  title: string
  desc?: string
  /** A 24px image from public/. Services rows use these. */
  icon?: string
  /** A FILLED SVG path in a 24-unit box, in brand teal — the Industries rows.
   *  See src/components/ui/IndustryMarks.ts for why they are not images. */
  mark?: string
  /** A STROKED path in the same box, for a row sitting beside the designer's
   *  line-art icons — see src/components/ui/ServiceMarks.ts. A row sets exactly
   *  one of icon, mark and markLine. */
  markLine?: string
  href: string
  external?: boolean
}

/**
 * One column of an open panel.
 *
 * Every field but `items` is optional because the three mega panels use the
 * same column in three different ways: Services gives every column a heading
 * and rows; About and Blogs give the FIRST column a heading and a blurb and no
 * rows, and the other two rows and nothing else.
 */
export type MenuColumn = {
  heading?: string
  href?: string
  /** Intro copy under the heading — About and Blogs column 1 only. */
  blurb?: string
  /**
   * Gap between a row's mark and its text. The frame's two row variants
   * disagree: 10 in the Services rows (6029:15806), 15 in the Industries rows
   * (6503:7513). Per COLUMN rather than per row, because it is a property of
   * which panel the row is in, not of what the row happens to carry.
   */
  rowGap?: 10 | 15
  items: MenuItem[]
}

export type NavEntry = {
  label: string
  href: string
  /** All four panels are the same three-column layout; only the data differs. */
  menu?: { columns: MenuColumn[] }
}

export function HeaderNav({
  nav, cta,
}: {
  nav: NavEntry[]
  /** The button at the end of the nav row (Get a Quote since 25 Sep 2026). */
  cta: { label: string; href: string }
}) {
  const [open, setOpen] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const show = useCallback((key: string) => {
    if (timer.current) clearTimeout(timer.current)
    setOpen(key)
  }, [])

  const scheduleHide = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setOpen(null), 120)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null) }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  /*
   * A nav item — 6029:15574 and friends. IBM Plex Medium 16/20, tracking 0.32,
   * #212529.
   *
   * THE HOVER. Each item in the design is a 28px box with `overflow-clip`
   * holding a 3px #05838b bar that is parked at `left: -<item width>` — the
   * full width of the bar, entirely outside the box — and sits at `left: 0` in
   * the open/active variants (6032:16932, 6029:15621). So it is a wipe: the bar
   * travels in from the left rather than growing.
   *
   * Built as a translate rather than by animating `left`, because `left`
   * animates on the layout thread and a transform does not; the motion is the
   * same and it cannot jank. `overflow-hidden` on the item is what makes the
   * parked bar invisible, exactly as `overflow-clip` does in the frame.
   */
  const itemCls = 'group relative flex h-[28px] shrink-0 items-center gap-[3px] overflow-hidden font-sans text-[16px] font-medium capitalize leading-[20px] tracking-[0.32px] text-ink'
  // Parked 2px further than its own width: at a fractional canvas zoom a
  // plain -100% can round to leave a 1px green sliver under the first letter
  // of every item (visible under "About" and "Services", 23 Sep 2026).
  const bar = <span aria-hidden="true" className="absolute bottom-0 left-0 h-[3px] w-full -translate-x-[calc(100%+2px)] bg-brand transition-transform duration-300 ease-out group-hover:translate-x-0 group-focus-visible:translate-x-0" />

  return (
    <>
      {/* Nav row — 6107:1842. The design pins it to x869, which is simply where
          its own 732px of content lands against the 319px gutter. Anchored to
          that gutter instead so the row can never run past it, whatever the nav
          comes to hold — the failure the old x869 pin produced once Industries
          was added. */}
      {/* VERTICALLY CENTRED ON THE WHITE BAND — Asim, 23 Sep 2026 ("center
          align this place in heading"). The row used to be pinned at
          41 + (79 - 28) / 2, which centres a 28px row — the height of a nav
          item — but the Mail In button makes the row 36 tall, so its centre
          sat 4px below the band's and the whole row read low next to the
          logo. Now the row IS the band (top 41, 79 tall) and items-center
          does the centring, whatever the tallest thing in it is. */}
      <div className="absolute right-[319px] z-40 flex items-center gap-[30px]"
        style={{ top: 41, height: HEADER_H - 41 }}>
        {nav.map((item) => (
          item.menu
            ? (
              <div key={item.label} className="flex h-[28px] items-center"
                onMouseEnter={() => show(item.label)} onMouseLeave={scheduleHide}>
                <Link href={item.href} className={itemCls}
                  aria-expanded={open === item.label} onFocus={() => show(item.label)}>
                  {item.label}
                  <svg viewBox="0 0 14 14" aria-hidden="true"
                    className={`size-[14px] shrink-0 fill-current transition-transform ${open === item.label ? 'rotate-180' : ''}`}>
                    <path d="M3.2 5.1 7 8.9l3.8-3.8-1.1-1.1L7 6.7 4.3 4 3.2 5.1Z" />
                  </svg>
                  {bar}
                </Link>
              </div>
            )
            : (
              <Link key={item.label} href={item.href} className={itemCls} onMouseEnter={scheduleHide}>
                {item.label}
                {bar}
              </Link>
            )
        ))}

        {/* Get a Quote — 6225:5014 in the 25 Sep 2026 frame: the teal
            "Button Bordered colored", h36 px20 r8, Roboto Medium 15, no mark.
            It was the green Mail In Program pill to ezontheearth.com; Asim:
            "remove the mail in program button and make it get a quote". */}
        <Link href={cta.href}
          className="btn-pop flex h-[36px] shrink-0 items-center rounded-[8px] bg-brand px-[20px] font-roboto text-[15.016px] font-medium leading-[22.523px] tracking-[-0.0801px] text-white backdrop-blur-[4.004px]">
          {cta.label}
        </Link>
      </div>

      {/* Panels — 6107:2234. Full-bleed, flush under the 140px bar. Positioned
          against the header section, which is why they are siblings of the row
          rather than children of it. */}
      {nav.filter((n) => n.menu).map((item) => (
        <Panel key={item.label} on={open === item.label} onEnter={() => show(item.label)} onLeave={scheduleHide}>
          <MegaColumns columns={item.menu!.columns} />
        </Panel>
      ))}

    </>
  )
}

/**
 * The shared panel shell. `before:` bridges the 41px of white bar between a nav
 * item and the panel so the pointer can cross without the menu closing.
 */
function Panel({
  on, white = false, onEnter, onLeave, children,
}: {
  on: boolean
  white?: boolean
  onEnter: () => void
  onLeave: () => void
  children: React.ReactNode
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      aria-hidden={!on}
      style={{ top: HEADER_H }}
      className={`absolute left-0 z-30 w-[1920px] border-b border-line shadow-[0_18px_40px_rgba(11,31,58,0.08)] transition-[opacity,visibility] duration-150 before:absolute before:inset-x-0 before:-top-[30px] before:h-[30px] before:content-[''] ${white ? 'bg-white' : 'bg-[#f7f8fa]'} ${on ? 'visible opacity-100' : 'invisible opacity-0'}`}
    >
      {children}
    </div>
  )
}

/**
 * The three mega panels — Services (6107:1619), About (6503:7718) and Blogs
 * (6503:8158). One renderer, because they are one layout: three equal columns,
 * each px80 py40, each on its own tint, divided by a 1px rule.
 *
 * What differs between them is only what a column holds, and that is data:
 *   Services  heading + icon/title/blurb rows, in all three columns
 *   About     intro (heading + blurb) | title/desc rows | title/desc rows
 *   Blogs     intro (heading + blurb) | bare title rows | bare title rows
 */

/** Column tints, left to right — 6503:7719 / 7742 / 7758. */
const COL_BG = ['#f7f8fa', '#fbfbfb', '#ffffff']

function MegaColumns({ columns }: { columns: MenuColumn[] }) {
  return (
    <div className="flex gap-[2px]">
      {columns.map((col, i) => {
        /*
         * Figma sets a column's row gap by what its rows carry: 10 where a row
         * has a description under the title (6503:7743), 15 where the title is
         * the whole row (6503:8166). Derived rather than passed in, so a menu
         * that gains descriptions cannot forget to change it.
         */
        const gap = col.items.some((it) => it.desc) ? 10 : 15
        return (
          <div
            key={col.heading ?? i}
            /* items-START, not center: Figma's columns are all one height so
               centring them lined their headings up, but ours are driven by the
               real catalogue and differ in length — centred, each heading sat
               at its own height. */
            className="flex flex-1 items-start overflow-hidden border-r border-line py-[40px]"
            style={{
              background: COL_BG[i % COL_BG.length],
              /* The outer padding also has to clear the canvas gutter trim (see
                 --canvas-inset in globals.css), which crops px off each edge of
                 the window. At a flat px-80 the first column's heading was cut
                 in half. */
              paddingLeft:  i === 0 ? 'calc(80px + var(--canvas-inset, 0px))' : 80,
              paddingRight: i === columns.length - 1 ? 'calc(80px + var(--canvas-inset, 0px))' : 80,
            }}
          >
            <div className="flex min-w-0 flex-1 flex-col" style={{ gap }}>
              {col.heading && <MenuHeading heading={col.heading} href={col.href} />}

              {/* 6503:7721 — Roboto 14/20 #7e7e7e, 416 wide. */}
              {col.blurb && (
                <div className="flex w-full items-center px-[20px]">
                  <p className="w-[416px] max-w-full font-roboto text-[14px] leading-[20px] text-muted">
                    {col.blurb}
                  </p>
                </div>
              )}

              {col.items.map((it) => <MenuRow key={it.href + it.title} item={it} gap={col.rowGap ?? 10} />)}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/**
 * A column heading and its badge — 6503:8460. IBM Plex SemiBold 20 then a 20px
 * gap then the badge.
 *
 * ! THE BADGE IS A RING, NOT A DISC. 6503:8463 is a 26px circle with a 1px
 * brand stroke, a transparent middle and a teal arrow. It was built as a filled
 * teal disc with a white arrow until 16 Sep 2026, from the older header module
 * in Zr9obaa2Aj1R9qnYgOBmmD; lRkITk6QLzsscWUO40karx supersedes that file and
 * draws the ring in every variant.
 */
function MenuHeading({ heading, href }: { heading: string; href?: string }) {
  const inner = (
    <>
      <span className="whitespace-nowrap font-sans text-[20px] font-semibold capitalize text-ink">{heading}</span>
      <span className="grid size-[26px] shrink-0 place-items-center rounded-full border border-brand transition-transform group-hover:scale-110">
        <svg viewBox="0 0 16 16" className="size-[12px] fill-brand" aria-hidden="true">
          <path d="M8.8 3.3 7.7 4.4l2.8 2.8H2.7v1.6h7.8l-2.8 2.8 1.1 1.1L13.5 8 8.8 3.3Z" />
        </svg>
      </span>
    </>
  )
  return (
    <div className="flex w-full items-center justify-between px-[20px] py-[10px]">
      {href
        ? <Link href={href} className="group flex items-center gap-[20px]">{inner}</Link>
        : <span className="flex items-center gap-[20px]">{inner}</span>}
    </div>
  )
}

/**
 * One row — 6503:7984 and friends. px20 py10; a 36px mark box, then the title at
 * IBM Plex Medium 16, a 5px gap and Roboto 14/20 #7e7e7e at 302 wide if the row
 * carries a description.
 *
 * THE HOVER IS 6029:15806, the row component's hover variant: the whole row
 * fills with a 90deg #012325 -> #05838b wash at radius 10, the title goes white
 * and the body goes #b1b1b1. Asim asked for it by name on 16 Sep 2026 — until
 * then the build used a 6% brand tint, because the older header file drew no
 * hover state for a row at all.
 *
 * Written as an arbitrary `background-image` rather than `bg-gradient-to-r`
 * because Tailwind v4 renamed that utility to `bg-linear-to-r`; the long form
 * is the same CSS and cannot break on an upgrade.
 *
 * A one-colour icon has to invert on that wash or it disappears into it — the
 * frame swaps in a white version of the artwork, which we cannot do with the
 * site's own PNGs, so `brightness-0 invert` paints them white instead. The
 * drawn marks just change fill.
 *
 * The icon gap comes from the column — see MenuColumn.rowGap for why.
 */
function MenuRow({ item, gap }: { item: MenuItem; gap: 10 | 15 }) {
  const inner = (
    <>
      {(item.icon || item.mark || item.markLine) && (
        <span className="flex size-[36px] shrink-0 items-center justify-center rounded-[7px]">
          {item.icon && (
            <Image src={item.icon} alt="" width={26} height={26}
              className="size-[26px] object-contain transition group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert" />
          )}
          {item.mark && (
            <svg viewBox="0 0 24 24" fillRule="evenodd"
              className="size-[26px] fill-brand transition-colors group-hover:fill-white group-focus-visible:fill-white" aria-hidden="true">
              <path d={item.mark} />
            </svg>
          )}
          {item.markLine && (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
              className="size-[26px] stroke-brand transition-colors group-hover:stroke-white group-focus-visible:stroke-white" aria-hidden="true">
              <path d={item.markLine} />
            </svg>
          )}
        </span>
      )}
      <span className="flex min-w-0 flex-col gap-[5px]">
        <span className="font-sans text-[16px] font-medium capitalize leading-[21px] text-ink transition-colors group-hover:text-white group-focus-visible:text-white">
          {item.title}
        </span>
        {item.desc && (
          <span className="w-[302px] max-w-full font-roboto text-[14px] leading-[20px] text-muted transition-colors group-hover:text-[#b1b1b1] group-focus-visible:text-[#b1b1b1]">
            {item.desc}
          </span>
        )}
      </span>
    </>
  )
  /* Written out in full, not interpolated: Tailwind scans source text for whole
     class names, so a `hover:${...}` template would generate no CSS at all. */
  const cls = 'group flex w-full items-center rounded-[10px] px-[20px] py-[10px]'
    + (gap === 15 ? ' gap-[15px]' : ' gap-[10px]')
    + ' hover:[background-image:linear-gradient(90deg,#012325_0%,#05838b_100%)]'
    + ' focus-visible:[background-image:linear-gradient(90deg,#012325_0%,#05838b_100%)]'
  return item.external
    ? <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
    : <Link href={item.href} className={cls}>{inner}</Link>
}
