'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { SERVICE_CARDS, SERVICE_TABS } from '@/data/home'
import { SERVICES_ENQUIRY } from '@/data/services'
import { HOME_SERVICES_DELTA_VAR } from '@/lib/layout'
import { ServicePhotoCard } from '@/components/ui/ServicePhotoCard'
import { ConnectForm } from '@/components/client/ConnectForm'

/**
 * Vertical tabs beside a card grid — Figma 6533:1967, 1282 x 936.
 *
 *   tabs   417 wide, gap 12. Each 102 tall, r12, px22, gap 16: a 44px icon
 *          well (r10) and a label over a one-line summary.
 *            selected  navy→teal gradient, white text, well white/18
 *            others    white, 1px #e6e6e6, #132119 text, well #e8f5ec
 *   cards  833 wide, 32 from the tabs. Rows of three 261px cards, gap 24,
 *          left-aligned, then the "Don't See Your Item?" banner (6534:2011)
 *          140 tall on #eaf4f5.
 *
 * The banner follows the cards at the same 24px whatever the count, so a tab
 * with one row shows it right under that row — and the section shrinks with
 * it. The frame's 1133 fits the two-row Recycling tab; a one-row tab is 398
 * shorter, and Asim asked for that gap to close ("make it dynamic",
 * 21 Sep 2026). So on every change this writes the difference between the
 * open tab's panel and the tallest one into HOME_SERVICES_DELTA_VAR on the
 * canvas, and OurServices, the wrapper under it in page.tsx and the Canvas
 * height all read it. Nothing is measured: the panel height is arithmetic on
 * the card count, the same arithmetic the layout uses.
 *
 * ===========================================================================
 * MOBILE — Figma 6605:2341 in file BVtf2AOuUOcYbiMIlcKmbC, 390 x 1826
 * ===========================================================================
 *
 * The 417px column becomes a HORIZONTAL CHIP RAIL — frame node 6605:2347,
 * "Chips Scroll": a 350-wide window clipping a 637-wide track, which is the
 * designer drawing a scroller in a tool that has no scrollers. So it is built
 * as one: `overflow-x-auto` with x-snapping, inside the section's own 20px
 * gutter, exactly as the frame places it (x20, w350 — it does not bleed).
 *
 *   chip   r12, gap 8, pl14 pr16 py10 — 52 tall, or 54 with the 1px border
 *          the unselected ones carry, which is why the track centres them.
 *          A 32px icon well (r10) holding the same 22px glyph as the desktop
 *          tab, then the label at 14. NO summary line: the mobile frame drops
 *          it, so `tab.sub` is display:none below lg rather than deleted.
 *   cards  one per row, full width, gap 16. Photo band on top, title under —
 *          see ServicePhotoCard.
 *   banner p24 rather than the desktop's 140 x px36 bar, gap 16, and its form
 *          stacks (see the override on it below).
 *
 * THE DELTA VARIABLE IS INERT BELOW lg AND IS STILL WRITTEN. All four readers
 * are behind `@media (width >= 64rem)` or an `lg:` prefix — `.design-canvas`
 * is `height: auto` below lg, `.design-section` only takes `--sh` inside the
 * lg query, and page.tsx's wrapper is `lg:absolute`, so its inline `top` has
 * nothing to move. Writing it costs one style property on a div nobody reads
 * down here; branching on viewport width to avoid that would add a resize
 * listener and a second source of truth for where the breakpoint is.
 *
 * Client only because it owns the active tab.
 */
const CARD_H = 374
const ROW_GAP = 24
const BANNER_H = 140
const PER_ROW = 3

/*
 * NO AUTO-ROTATION since 23 Sep 2026 — Asim: "remove the animation from it,
 * the 3 sec". The tabs used to advance on their own every 3 seconds (1s for a
 * day on 21 Sep), with four holds bolted on to keep it from misbehaving:
 * off-screen, pointer over the cards, focus, reduced motion. With the cards
 * now revealing their blurb on hover, a panel that changes under the pointer
 * would fight that directly. A tab opens when it is clicked, and only then.
 */

/** Height of a tab's panel: its rows of cards, the gap, the banner. */
function panelH(count: number): number {
  const rows = Math.max(1, Math.ceil(count / PER_ROW))
  return rows * CARD_H + (rows - 1) * ROW_GAP + ROW_GAP + BANNER_H
}

const TALLEST = Math.max(...SERVICE_TABS.map((t) => panelH((SERVICE_CARDS[t.id] ?? []).length)))

export function ServiceTabs() {
  // SERVICE_TABS is derived from a non-empty literal, but noUncheckedIndexedAccess
  // does not know that — fall back rather than assert.
  const [active, setActive] = useState<string>(SERVICE_TABS[0]?.id ?? 'recycling')
  const cards = SERVICE_CARDS[active] ?? []
  const host = useRef<HTMLDivElement>(null)
  const strip = useRef<HTMLDivElement>(null)

  const [reduced, setReduced] = useState(false)
  /** Below lg the tab list is a horizontal rail, so it says so to a screen reader. */
  const [horizontal, setHorizontal] = useState(false)

  useEffect(() => {
    // The variable lives on the canvas, which is where every reader sits.
    // Below lg nothing reads it — see the header comment.
    const canvas = host.current?.closest<HTMLElement>('.design-canvas')
    if (!canvas) return
    canvas.style.setProperty(HOME_SERVICES_DELTA_VAR, `${panelH(cards.length) - TALLEST}px`)
    return () => { canvas.style.removeProperty(HOME_SERVICES_DELTA_VAR) }
  }, [cards.length])

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    // Tailwind's own `lg`, spelled the way globals.css spells the switch.
    const narrow = window.matchMedia('(width < 64rem)')
    const read = () => { setReduced(motion.matches); setHorizontal(narrow.matches) }
    read()
    motion.addEventListener('change', read)
    narrow.addEventListener('change', read)
    return () => {
      motion.removeEventListener('change', read)
      narrow.removeEventListener('change', read)
    }
  }, [])

  /**
   * Keep the open chip in the rail. Below lg the tab list scrolls sideways and
   * the third chip starts past its right edge, so a click on a half-visible
   * chip would otherwise leave the selection off screen while
   * the cards under it changed for no visible reason.
   *
   * The rail is scrolled directly rather than with scrollIntoView, which would
   * be free to scroll the PAGE as well and yank the reader around.
   * Offsets come off getBoundingClientRect so no offsetParent has to be
   * arranged for, and the whole thing no-ops at lg, where the list is a column
   * with nothing to scroll.
   */
  useEffect(() => {
    const rail = strip.current
    if (!rail || rail.scrollWidth <= rail.clientWidth) return
    const i = SERVICE_TABS.findIndex((t) => t.id === active)
    const chip = rail.children[i]
    if (!chip) return
    const box = chip.getBoundingClientRect()
    const frame = rail.getBoundingClientRect()
    const left = rail.scrollLeft + (box.left - frame.left) - (frame.width - box.width) / 2
    rail.scrollTo({ left: Math.max(0, left), behavior: reduced ? 'auto' : 'smooth' })
  }, [active, reduced])

  return (
    <div
      ref={host}
      className="flex w-full flex-col gap-[20px] lg:flex-row lg:items-start lg:gap-[32px]"
    >
      {/* Chips Scroll 6605:2347 below lg — a 350 window over a 637 track. */}
      <div
        ref={strip}
        role="tablist"
        aria-label="Service categories"
        aria-orientation={horizontal ? 'horizontal' : 'vertical'}
        className="flex w-full snap-x snap-mandatory items-center gap-[10px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:w-[417px] lg:shrink-0 lg:snap-none lg:flex-col lg:items-stretch lg:gap-[12px] lg:overflow-visible"
      >
        {SERVICE_TABS.map((tab) => {
          const on = tab.id === active
          return (
            <button
              key={tab.id} role="tab" type="button" id={`tab-${tab.id}`}
              aria-selected={on} aria-controls={`panel-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={`flex shrink-0 snap-start cursor-pointer items-center gap-[8px] rounded-[12px] py-[10px] pl-[14px] pr-[16px] text-left transition-colors lg:h-[102px] lg:w-full lg:gap-[16px] lg:py-0 lg:pl-[22px] lg:pr-[22px] ${
                on
                  ? 'bg-gradient-to-r from-navy to-brand text-white'
                  : 'border border-[#e6e6e6] bg-white text-heading hover:border-brand/40'
              }`}
            >
              <span className={`grid size-[32px] shrink-0 place-items-center rounded-[10px] lg:size-[44px] ${on ? 'bg-white/[0.18]' : 'bg-accent-soft'}`}>
                <Image src={on ? tab.iconOn : tab.iconOff} alt="" width={22} height={22} className="size-[22px]" />
              </span>
              <span className="flex min-w-px flex-col gap-[3px]">
                <span className="whitespace-nowrap font-sans text-[14px] font-medium leading-normal lg:text-[17px]">{tab.label}</span>
                {/* The mobile frame draws the chip label alone. */}
                <span className={`hidden whitespace-nowrap font-roboto text-[13px] leading-normal lg:block ${on ? 'text-white/75' : 'text-muted'}`}>{tab.sub}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        className="flex w-full flex-col gap-[20px] lg:w-[833px] lg:shrink-0 lg:gap-[24px]"
      >
        <div className="flex w-full flex-col gap-[16px] lg:flex-row lg:flex-wrap lg:gap-[24px]">
          {cards.map((c) => <ServicePhotoCard key={c.href} card={c} reveal />)}
        </div>

        {/* Ballast Banner Card — 6534:2011, and 6605:2394 on the phone. */}
        <div className="flex w-full items-center rounded-[16px] bg-brand-soft p-[24px] lg:h-[140px] lg:px-[36px] lg:py-0">
          <div className="flex w-full flex-col gap-[16px] lg:gap-[6px]">
            <p className="font-roboto text-[11px] font-bold leading-normal tracking-[0.7px] text-brand">{SERVICES_ENQUIRY.sub}</p>
            <p className="font-sans text-[21px] font-semibold leading-normal text-heading">{SERVICES_ENQUIRY.heading}</p>
            {/*
             * The form stacks below lg (frame 6605:2397: input then button,
             * both full width, gap 12). That used to be forced from out here
             * with `max-lg:[&_form]:…` overrides, because ConnectForm pinned
             * its input to an inline `inputWidth` — 588px against a 302px
             * column. ConnectForm answers its own frame now (the width is a
             * custom property only an `lg:` utility reads), so the overrides
             * were deleted on 22 Sep 2026 rather than left to rot. One of them
             * had never matched anyway: `[&>div]` looked for a div where
             * ConnectForm's root is a form.
             */}
            <div>
              <ConnectForm
                tone="light"
                inputWidth={588}
                id="home-services-email"
                placeholder={SERVICES_ENQUIRY.placeholder}
                cta={SERVICES_ENQUIRY.cta}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
