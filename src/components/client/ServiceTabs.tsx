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
 * Client only because it owns the active tab.
 */
const CARD_H = 374
const ROW_GAP = 24
const BANNER_H = 140
const PER_ROW = 3

/**
 * How long each tab holds before the next one opens — Asim, 21 Sep 2026.
 * Set to 3s, then to 1s the same day. At 1s the whole set cycles in three
 * seconds, so the four stops below carry more weight than they did: the tabs
 * are different heights and every switch moves the page under this section.
 *
 * Four things stop the timer, and the first is not optional:
 *
 *  1. THE SECTION BEING OFF SCREEN. The tabs are not the same height — a
 *     one-row tab is 398px shorter than a two-row one, which is the whole
 *     point of HOME_SERVICES_DELTA_VAR below. Rotating while the reader is
 *     further down the page would jerk everything under them by 398px every
 *     few seconds, with no idea why. So it only runs while the section is
 *     actually in view.
 *  2. A pointer over it, or focus inside it. Nobody wants a card to vanish
 *     mid-read, or the email field to move while they are typing in it.
 *  3. A click on any tab. They have chosen; stop deciding for them. This is
 *     also what makes the rotation meet WCAG 2.2.2, which wants a way to stop
 *     anything that moves on its own.
 *  4. prefers-reduced-motion. For some people this kind of movement is not a
 *     matter of taste.
 */
const AUTO_MS = 1000

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

  /** Cleared for good by a click on any tab. */
  const [auto, setAuto] = useState(true)
  /** Pointer over the section, or focus inside it. */
  const [held, setHeld] = useState(false)
  const [onScreen, setOnScreen] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    // The variable lives on the canvas, which is where every reader sits.
    const canvas = host.current?.closest<HTMLElement>('.design-canvas')
    if (!canvas) return
    canvas.style.setProperty(HOME_SERVICES_DELTA_VAR, `${panelH(cards.length) - TALLEST}px`)
    return () => { canvas.style.removeProperty(HOME_SERVICES_DELTA_VAR) }
  }, [cards.length])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const read = () => setReduced(mq.matches)
    read()
    mq.addEventListener('change', read)
    return () => { mq.removeEventListener('change', read) }
  }, [])

  useEffect(() => {
    const el = host.current
    if (!el) return
    // A third of the section showing counts as watching it. Any less and the
    // rotation runs while it is only just clipping into view at the bottom.
    const io = new IntersectionObserver(
      ([entry]) => { setOnScreen(Boolean(entry?.isIntersecting)) },
      { threshold: 0.34 },
    )
    io.observe(el)
    return () => { io.disconnect() }
  }, [])

  useEffect(() => {
    if (!auto || held || !onScreen || reduced) return
    const id = window.setInterval(() => {
      setActive((current) => {
        const i = SERVICE_TABS.findIndex((t) => t.id === current)
        return SERVICE_TABS[(i + 1) % SERVICE_TABS.length]?.id ?? current
      })
    }, AUTO_MS)
    return () => { window.clearInterval(id) }
  }, [auto, held, onScreen, reduced])

  return (
    <div
      ref={host}
      className="flex w-full items-start gap-[32px]"
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={(e) => {
        // Focus moving between two children is not focus leaving the section.
        if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false)
      }}
    >
      <div role="tablist" aria-label="Service categories" aria-orientation="vertical" className="flex w-[417px] shrink-0 flex-col gap-[12px]">
        {SERVICE_TABS.map((tab) => {
          const on = tab.id === active
          return (
            <button
              key={tab.id} role="tab" type="button" id={`tab-${tab.id}`}
              aria-selected={on} aria-controls={`panel-${tab.id}`}
              onClick={() => { setActive(tab.id); setAuto(false) }}
              className={`flex h-[102px] w-full cursor-pointer items-center gap-[16px] rounded-[12px] px-[22px] text-left transition-colors ${
                on
                  ? 'bg-gradient-to-r from-navy to-brand text-white'
                  : 'border border-[#e6e6e6] bg-white text-heading hover:border-brand/40'
              }`}
            >
              <span className={`grid size-[44px] shrink-0 place-items-center rounded-[10px] ${on ? 'bg-white/[0.18]' : 'bg-accent-soft'}`}>
                <Image src={on ? tab.iconOn : tab.iconOff} alt="" width={22} height={22} className="size-[22px]" />
              </span>
              <span className="flex min-w-px flex-col gap-[3px]">
                <span className="whitespace-nowrap font-sans text-[17px] font-medium leading-normal">{tab.label}</span>
                <span className={`whitespace-nowrap font-roboto text-[13px] leading-normal ${on ? 'text-white/75' : 'text-muted'}`}>{tab.sub}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        className="flex w-[833px] shrink-0 flex-col gap-[24px]"
      >
        <div className="flex flex-wrap gap-[24px]">
          {cards.map((c) => <ServicePhotoCard key={c.href} card={c} />)}
        </div>

        {/* Ballast Banner Card — 6534:2011 */}
        <div className="flex h-[140px] w-full items-center rounded-[16px] bg-brand-soft px-[36px]">
          <div className="flex w-full flex-col gap-[6px]">
            <p className="font-roboto text-[11px] font-bold leading-normal tracking-[0.7px] text-brand">{SERVICES_ENQUIRY.sub}</p>
            <p className="font-sans text-[21px] font-semibold leading-normal text-heading">{SERVICES_ENQUIRY.heading}</p>
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
  )
}
