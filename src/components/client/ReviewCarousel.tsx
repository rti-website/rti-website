'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

/**
 * The Google reviews rail on the homepage — Client's Testimonials, 6024:14149.
 *
 * WHY THIS IS A CLIENT COMPONENT (CLAUDE.md rule 7): Asim, 23 Sep 2026 — "make
 * it movable, 4 on screen and one appear when move". Six real reviews in a
 * four-card row need something to move them, and that is state. The cards
 * themselves are rendered by the server component (Testimonials) and arrive
 * here as `children`, so every review is in the prerendered HTML whichever
 * one is showing — this file only owns the offset and the two buttons.
 *
 * DESKTOP (lg): the frame's four 300px cards on a 22px gap, 1266 wide. The
 * track slides one card (322px) per press; Previous is disabled at the start
 * and Next once the last card is in view, so it never slides into empty
 * space. A transform, not a scroll position: the canvas is scaled with CSS
 * `zoom` at lg, and a transform scales with it exactly where scroll offsets
 * are browser-dependent under zoom. A horizontal touch drag does the same as
 * the buttons, with the thresholds StoryCarousel uses.
 *
 * PHONE (below lg): no buttons and no transform. The row is a native
 * horizontal scroller with snap points, bled to the screen edges, and the
 * 300px cards leave the next one peeking in at the right — the platform's own
 * swipe, momentum and accessibility, and nothing to hydrate before it works.
 */

const CARD_W = 300
const GAP = 22
const STEP = CARD_W + GAP
const VISIBLE = 4
const SWIPE_PX = 44

export function ReviewCarousel({
  count, summary, children,
}: {
  count: number
  /** The rating line, shown to the left of the buttons. */
  summary: React.ReactNode
  children: React.ReactNode
}) {
  const last = Math.max(0, count - VISIBLE)
  const [index, setIndex] = useState(0)
  const go = (d: number) => setIndex((i) => Math.min(last, Math.max(0, i + d)))

  const from = useRef<{ x: number; y: number } | null>(null)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return
    from.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e: React.PointerEvent) => {
    const start = from.current
    from.current = null
    if (!start || !window.matchMedia('(width >= 64rem)').matches) return
    const dx = e.clientX - start.x
    const dy = e.clientY - start.y
    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) <= Math.abs(dy)) return
    go(dx < 0 ? 1 : -1)
  }

  const btn = 'btn-pop grid size-[48px] place-items-center rounded-full border border-[#e2e2e2] bg-white transition-colors hover:border-brand hover:bg-brand-soft disabled:cursor-default disabled:opacity-40 disabled:hover:border-[#e2e2e2] disabled:hover:bg-white'

  return (
    <div
      className="flex w-full flex-col gap-[24px] lg:gap-[30px]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Google reviews"
    >
      {/* Viewport. Below lg it is the scroller, pulled out to the screen
          edges with -mx and given the gutter back as padding + scroll-padding
          so the first card still lines up with the heading. */}
      <div
        className="max-lg:-mx-[20px] max-lg:snap-x max-lg:snap-mandatory max-lg:scroll-px-[20px] max-lg:overflow-x-auto max-lg:px-[20px] max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden lg:h-[350px] lg:touch-pan-y lg:overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { from.current = null }}
      >
        <div
          className="flex items-stretch gap-[16px] lg:gap-[22px] lg:[transform:translateX(var(--rv-x))] lg:transition-transform lg:duration-500 lg:ease-out"
          style={{ '--rv-x': `${-index * STEP}px` } as React.CSSProperties}
        >
          {children}
        </div>
      </div>

      <div className="flex items-center justify-center gap-[16px] lg:h-[48px] lg:justify-between">
        {summary}
        <div className="flex items-center gap-[12px] max-lg:hidden">
          <button type="button" onClick={() => go(-1)} disabled={index === 0} aria-label="Previous reviews" className={btn}>
            <Image src="/images/icons/chevron-16.svg" alt="" width={24} height={24} className="size-[24px] rotate-90" />
          </button>
          <button type="button" onClick={() => go(1)} disabled={index === last} aria-label="More reviews" className={btn}>
            <Image src="/images/icons/chevron-16.svg" alt="" width={24} height={24} className="size-[24px] -rotate-90" />
          </button>
        </div>
      </div>
    </div>
  )
}
