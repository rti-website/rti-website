'use client'

import { useEffect, useId, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { NavEntry } from '@/components/client/HeaderNav'

/**
 * The phone header and its drawer — Figma BVtf2AOuUOcYbiMIlcKmbC, the
 * "MainMenu Module 2 - Mobile" component set. Six frames, all 390 wide:
 *
 *   6630:2209   1 Closed                   390 x 120   utility strip + header row
 *   6630:2220   2 Drawer Base              390 x 600   all five rows collapsed
 *   6630:7976   3 About Open
 *   6630:8031   4 Services Open
 *   6630:8086   5 Industries Open
 *   6630:8141   6 Blogs Open
 *
 * Only one row is ever open — every "open" frame draws the other four
 * collapsed — so `open` is a single id, not a set.
 *
 * ===========================================================================
 * WHY THIS DUPLICATES THE DESKTOP MENU'S LINKS, AND WHY THAT IS THE ONE PLACE
 * IT IS ALLOWED TO
 * ===========================================================================
 * Everything else on this site now reflows from ONE tree (see Frame.tsx): a
 * section is absolute at lg and in flow below it, and no body copy is written
 * twice. A hamburger drawer cannot be the mega-menu with different CSS — one is
 * a 1920-wide panel hanging under a bar, the other is a stack of accordions
 * over the page — so the header, alone, renders both and hides one. That costs
 * a second copy of ~40 nav links per page, which is what every responsive site
 * on the web does and what Google has handled for fifteen years. A second copy
 * of the page's PROSE would be a different matter, and there isn't one.
 *
 * The data is the same object the desktop menu gets — `buildNav()` in
 * Header.tsx — so the two can never drift: a service added to the catalogue
 * appears in both, and a row filtered out of one is filtered out of the other.
 *
 * ===========================================================================
 * !! EVERY LINK IS RENDERED, OPEN OR NOT
 * ===========================================================================
 * The panels are hidden with `hidden`, never unmounted, for the same reason
 * HeaderNav's are and the same reason Accordion's answers are: a link that only
 * exists after a click is a link that is not in the prerendered HTML. Internal
 * link structure is the one thing this migration must not lose.
 */

/** Chevron — 14px in the frame, rotated 180deg on the open row. */
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 14 14" aria-hidden="true"
      className={`size-[14px] shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <path d="M3 5.25 7 9.25l4-4" fill="none" stroke="#212529" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** The 22px ring-and-arrow badge beside a subgroup heading (Frame 1000007468). */
function GroupArrow() {
  return (
    <svg viewBox="0 0 22 22" aria-hidden="true" className="size-[22px] shrink-0">
      <circle cx="11" cy="11" r="10.25" fill="none" stroke="#05838b" strokeWidth="1" />
      <path d="M8 13.5 14 7.5M9 7.5h5v5" fill="none" stroke="#05838b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MobileNav({
  nav, topBar, announce, quoteHref, pickupHref,
}: {
  nav: NavEntry[]
  topBar: {
    dropOff: { label: string; href: string }
    phoneMn: { label: string; tel: string }
    phoneWi: { label: string; tel: string }
    contact: { label: string; href: string }
  }
  announce: { text: string; cta: string; href: string }
  quoteHref: string
  /** The header row's Arrange Pickup button — the contact form. */
  pickupHref: string
}) {
  const [drawer, setDrawer] = useState(false)
  const [open, setOpen] = useState<string | null>(null)
  const panelId = useId()

  /* Escape closes the drawer — the same key that closes the desktop panels. */
  useEffect(() => {
    if (!drawer) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setDrawer(false) }
    window.addEventListener('keydown', onKey)
    /* The drawer covers the page; letting the page scroll under it is the
       classic mobile-menu bug where a flick moves the wrong thing. */
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [drawer])

  return (
    /* Sticky rather than static: the homepage is 12,065 design px tall on a
       phone and a nav you have to scroll to the top to reach is a nav nobody
       uses. z-50 clears every section, including the header's own dropdowns. */
    <div className="sticky top-0 z-50 lg:hidden">
      {/* ---- Utility Strip — 6681:2697, 390 x 36 -------------------------- */}
      <div className="flex items-center justify-between gap-[10px] bg-brand px-[16px] py-[10px]">
        {/* TODO(content): lorem ipsum in the Figma file, exactly as the desktop
            announcement bar carries it. One line here — the strip is 36 tall. */}
        <p className="truncate font-roboto text-[12px] leading-[16px] text-white">{announce.text}</p>
        <Link href={announce.href} className="shrink-0 font-roboto text-[12px] capitalize leading-[16px] text-white underline-offset-2 hover:underline">
          {announce.cta}
        </Link>
      </div>

      {/* ---- Header Row — 6588:2309, 390 x 69 in the frame, 56 here ------
          Asim, 24 Sep 2026: "make the gap less inside above and below". The
          row is 56 with 6 above and below: the 44px menu button (the touch
          target) is what sets the minimum. Phone only; this whole bar is
          lg:hidden. */}
      <div className="flex h-[56px] items-center justify-between border-b border-line bg-white py-[6px] pl-[20px] pr-[16px]">
        <Link href="/" aria-label="Recycle Technologies — home" className="block h-[34px] w-[143.39px]">
          <Image src="/images/logo.png" alt="Recycle Technologies" width={287} height={68} priority className="size-full object-contain object-left" />
        </Link>
        {/* Frame 1000007602 — the Arrange Pickup button and the menu button,
            side by side with no gap. Asim, 24 Sep 2026: on the phone only
            (this whole bar is lg:hidden), and it lands on the contact form.
            "Button Bordered colored" 6857:12139: 93 x 24, #05838b fill and
            1px border, r4, Roboto Medium 10 in white. The 1px word-spacing
            is ours: at 10px Roboto's space all but vanished and it read
            "ArrangePickup". */}
        <div className="flex shrink-0 items-center">
        <Link
          href={pickupHref}
          className="btn-pop flex h-[24px] w-[93px] shrink-0 items-center justify-center whitespace-nowrap rounded-[4px] border border-brand bg-brand font-roboto text-[10px] font-medium leading-[22.523px] tracking-[-0.0801px] text-white backdrop-blur-[4.004px] [word-spacing:1px]"
        >
          Arrange Pickup
        </Link>
        <button
          type="button"
          onClick={() => setDrawer(true)}
          aria-expanded={drawer}
          aria-controls={panelId}
          aria-label="Open menu"
          className="grid size-[44px] shrink-0 cursor-pointer place-items-center"
        >
          {/* icon/menu, 24px. Three bars — drawn here rather than shipped as a
              file because it is three rectangles, not artwork. */}
          <span className="flex size-[24px] flex-col justify-center gap-[5px]">
            <span className="block h-[2px] w-full rounded-full bg-ink" />
            <span className="block h-[2px] w-full rounded-full bg-ink" />
            <span className="block h-[2px] w-full rounded-full bg-ink" />
          </span>
        </button>
        </div>
      </div>

      {/* ---- Scrim ------------------------------------------------------- */}
      <div
        onClick={() => setDrawer(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 ${
          drawer ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* ---- Drawer — 6630:2220 ------------------------------------------ */}
      <div
        id={panelId}
        // Full width, no max: it was capped at 390 and on anything wider than
        // a phone — a tablet, a narrow desktop window — a strip of the page
        // showed through beside it. Asim, 22 Sep 2026: "it must cover the
        // full screen". The frame is a whole-viewport panel, not a side sheet.
        className={`fixed inset-y-0 right-0 z-50 flex w-full flex-col overflow-y-auto overscroll-contain bg-white transition-transform duration-300 ease-out ${
          drawer ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header — p-16, logo + 44px close */}
        <div className="flex shrink-0 items-center justify-between p-[16px]">
          <Link href="/" aria-label="Recycle Technologies — home" onClick={() => setDrawer(false)} className="block h-[34px] w-[143.39px]">
            <Image src="/images/logo.png" alt="Recycle Technologies" width={287} height={68} className="size-full object-contain object-left" />
          </Link>
          <button
            type="button"
            onClick={() => setDrawer(false)}
            aria-label="Close menu"
            className="grid size-[44px] shrink-0 cursor-pointer place-items-center"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[24px]">
              <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="#212529" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* No search field — removed with the desktop search icon, 23 Sep 2026
            (Asim: "remove this search from navbar"). It was inert: there is
            no site search yet. */}

        {/* Nav Accordion List */}
        <nav aria-label="Main" className="shrink-0">
          {nav.map((entry, i) => {
            const last = i === nav.length - 1
            const on = open === entry.label
            const rowClass = `flex w-full items-center justify-between bg-white p-[16px] text-left ${last ? '' : 'border-b border-[#e6e6e6]'}`
            const labelClass = 'font-sans text-[16px] font-medium leading-[20px] text-ink'

            /* Locations has no panel in any frame — it is a plain link row,
               with no chevron and a touch of tracking the others do not have. */
            if (!entry.menu) {
              return (
                <Link key={entry.label} href={entry.href} onClick={() => setDrawer(false)} className={rowClass}>
                  <span className={`${labelClass} capitalize tracking-[0.32px]`}>{entry.label}</span>
                </Link>
              )
            }

            return (
              <div key={entry.label}>
                {/*
                  THE LABEL IS A LINK AND THE CHEVRON IS A BUTTON — Asim,
                  22 Sep 2026: "when I click on About, Services or any other
                  page, open that page". The whole row used to be one button
                  that only expanded, which left About, Services, Industries and
                  Blogs with no way to reach their own pages from a phone at
                  all — four landing pages unreachable from the menu.

                  Splitting them is also what the desktop bar does: the item is
                  a link, the panel opens on hover. Here the chevron carries a
                  44px tap box pulled out to the row's own 16px edge, so it does
                  not steal taps from the label beside it.
                */}
                <div className={`flex w-full items-center bg-white ${last ? '' : 'border-b border-[#e6e6e6]'}`}>
                  {/* The row's 16px padding lives on the link, not on the row,
                      so the whole left-hand strip is tappable rather than just
                      the 20px of text. */}
                  <Link
                    href={entry.href}
                    onClick={() => setDrawer(false)}
                    className={`${labelClass} flex-1 py-[16px] pl-[16px] pr-[8px]`}
                  >
                    {entry.label}
                  </Link>
                  {/* 44 wide with 1px of margin puts the 14px chevron exactly
                      16px off the edge, where the frame draws it. */}
                  <button
                    type="button"
                    onClick={() => setOpen(on ? null : entry.label)}
                    aria-expanded={on}
                    aria-controls={`${panelId}-${entry.label}`}
                    aria-label={`${on ? 'Hide' : 'Show'} ${entry.label} links`}
                    className="mr-[1px] grid size-[44px] shrink-0 cursor-pointer place-items-center"
                  >
                    <Chevron open={on} />
                  </button>
                </div>

                {/* Panel — bg #fafafa, pt-8 pb-16. Hidden, never unmounted. */}
                <div id={`${panelId}-${entry.label}`} hidden={!on} className="bg-[#fafafa] pb-[16px] pt-[8px]">
                  {entry.menu.columns.map((col, c) => (
                    <div key={c}>
                      {col.heading && (
                        /* Subgroup Header — px-20 pt-12 pb-8. The heading is a
                           link to the group's own page, as it is on the desktop
                           panel, and the badge is part of the link. */
                        <Link
                          href={col.href ?? entry.href}
                          onClick={() => setDrawer(false)}
                          className="flex items-center justify-between px-[20px] pb-[8px] pt-[12px]"
                        >
                          <span className="font-sans text-[15px] font-semibold capitalize leading-normal text-ink">{col.heading}</span>
                          <GroupArrow />
                        </Link>
                      )}

                      {/* About and Blogs put a blurb where Services puts rows. */}
                      {col.blurb && (
                        <div className="px-[20px] pb-[8px]">
                          <p className="font-roboto text-[13px] leading-[19px] text-muted">{col.blurb}</p>
                        </div>
                      )}

                      {col.items.map((item) => {
                        const art = item.icon
                          ? <Image src={item.icon} alt="" width={26} height={26} className="size-[26px] object-contain" />
                          : (item.mark || item.markLine)
                            ? (
                              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[26px]">
                                <path
                                  d={(item.mark ?? item.markLine) as string}
                                  fill={item.mark ? 'var(--color-brand)' : 'none'}
                                  stroke={item.markLine ? 'var(--color-brand)' : undefined}
                                  strokeWidth={item.markLine ? 1.6 : undefined}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )
                            : null

                        const body = (
                          <span className="flex min-w-px flex-1 flex-col gap-[2px]">
                            <span className="font-sans text-[14px] font-medium capitalize leading-normal text-ink">{item.title}</span>
                            {item.desc && (
                              <span className="font-roboto text-[12.5px] leading-[20px] text-muted">{item.desc}</span>
                            )}
                          </span>
                        )

                        /* Two row shapes in the frames, and which one you get
                           depends on whether the row has art: the Services and
                           Industries rows are icon + text on py-8, the About and
                           Blogs rows are text alone on py-10. */
                        const cls = art
                          ? 'flex items-center gap-[12px] px-[20px] py-[8px]'
                          : 'flex flex-col gap-[2px] px-[20px] py-[10px]'

                        const inner = art
                          ? (<>
                              <span className="grid size-[36px] shrink-0 place-items-center overflow-hidden">{art}</span>
                              {body}
                            </>)
                          : body

                        /* A row with no page (About's Leadership Team) is href
                           '#' in the nav data — rendered as text, not as a link
                           that goes nowhere. Same call the desktop panel makes. */
                        if (item.href === '#') {
                          return <div key={item.title} className={cls}>{inner}</div>
                        }
                        return item.external
                          ? (
                            <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" onClick={() => setDrawer(false)} className={cls}>
                              {inner}
                            </a>
                          )
                          : (
                            <Link key={item.title} href={item.href} onClick={() => setDrawer(false)} className={cls}>
                              {inner}
                            </Link>
                          )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </nav>

        {/* CTA Wrap — px-16 py-20, gap-12 */}
        <div className="flex shrink-0 flex-col gap-[12px] px-[16px] py-[20px]">
          {/* The green Mail In Program button that led this block came out
              on 25 Sep 2026 (Asim: "also remove the mail in program from the
              mobile side drop down"), with the desktop one. */}

          {/* Utility Buttons — 6630:8011. TWO buttons here, which is NOT a
              regression of 21 Sep 2026. Asim dropped Get a Quote from the
              desktop announcement bar that day because the frame pinned the two
              to fixed x's and the white one printed 2.6px over the bordered one
              at the rendered text width. Nothing overlaps in a flex-1 row, and
              the mobile frame draws both, so both are here. */}
          <div className="flex items-start gap-[10px]">
            <Link
              href={quoteHref} onClick={() => setDrawer(false)}
              className="flex h-[44px] flex-1 items-center justify-center rounded-[2.426px] border-[0.606px] border-brand bg-white px-[19.406px] text-center font-sans text-[12.129px] font-semibold capitalize leading-[12.129px] tracking-[0.2426px] text-brand"
            >
              Get a quote
            </Link>
            <Link
              href={topBar.contact.href} onClick={() => setDrawer(false)}
              className="flex h-[44px] flex-1 items-center justify-center rounded-[2.426px] border-[0.606px] border-ink px-[19.406px] text-center font-sans text-[12.129px] font-semibold capitalize leading-[12.129px] tracking-[0.2426px] text-ink"
            >
              {topBar.contact.label}
            </Link>
          </div>

          <div className="flex flex-col gap-[8px]">
            <Link href={topBar.dropOff.href} onClick={() => setDrawer(false)} className="font-roboto text-[14px] leading-[14px] text-brand">
              {topBar.dropOff.label}
            </Link>
            <div className="flex items-start gap-[16px]">
              <a href={topBar.phoneMn.tel} className="font-roboto text-[14px] leading-[14px] text-muted">{topBar.phoneMn.label}</a>
              <a href={topBar.phoneWi.tel} className="font-roboto text-[14px] leading-[14px] text-muted">{topBar.phoneWi.label}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
