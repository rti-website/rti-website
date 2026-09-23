'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import type { Story } from '@/data/home'

/**
 * Client's Stories carousel — Figma 6557:12824 (the track) and 6557:12876
 * (the pager), both inside 6557:12903.
 *
 * Three slots on a 1920 canvas, measured off the frame:
 *   left    671 x 428 at x-160.5 y48    60% opacity, no gradient
 *   centre  821 x 524 at x554.5  y0     the dark one: full opacity, the
 *                                       35%→88% bottom gradient, larger type
 *   right   671 x 428 at x1417.5 y48    60% opacity, no gradient
 * The side cards run off the canvas edges on purpose; the section clips them.
 *
 * Previous / Next rotate which story is in the middle. A card keeps its DOM
 * node across the change (keyed by story), so the slot geometry animates:
 * the side card slides and grows into the centre while the centre card slides
 * out and fades to 60%. That is the "main becomes dark, the other becomes
 * light" Asim asked for on 21 Sep 2026.
 *
 * Client only because it owns the active index.
 *
 * ===========================================================================
 * TOUCH, AND WHERE THIS RENDERS AT ALL — 22 Sep 2026
 * ===========================================================================
 * This is a 1920-canvas board: the three slots below are absolute design
 * coordinates and the side cards hang off both edges on purpose. It therefore
 * only ever renders at lg and up — the mobile frame (6617:2334) drops the
 * cards entirely, so CaseStudies wraps this Box in `max-lg:hidden`. There is
 * no phone layout to build here; if the cards are ever wanted back on a phone
 * they want a snap rail, not this.
 *
 * lg is 1024, which an iPad in landscape and every touchscreen laptop clear,
 * so the board is reachable by finger and is built for one:
 *
 *   - Previous / Next are 66px discs, comfortably past the 44px target.
 *   - A horizontal drag of SWIPE_PX or more, travelling further across than
 *     down, rotates the carousel the way the finger went.
 *   - `touch-pan-y` leaves VERTICAL panning entirely to the browser, so a
 *     scroll that starts on a card scrolls the page. Nothing is hijacked:
 *     there is no scroll container here to fight over, and the swipe is read
 *     from pointer coordinates rather than from a scroll position.
 *   - A drag that crosses the threshold swallows the click it ends on, so a
 *     swipe never navigates to the story it started on. Mouse pointers are
 *     ignored outright — a mouse has the two buttons and dragging a link is
 *     the browser's job, not ours.
 */
type Slot = { x: number; y: number; w: number; h: number; on: boolean }

const SLOTS: Slot[] = [
  { x: -160.5, y: 48, w: 671, h: 428, on: false },
  { x: 554.5,  y: 0,  w: 821, h: 524, on: true },
  { x: 1417.5, y: 48, w: 671, h: 428, on: false },
]

/** Where the pager sits, relative to the track's top. Frame: y867.96 - y284.96. */
const PAGER_Y = 583

/**
 * How far a drag has to travel across before it is a swipe. It also has to
 * beat its own vertical travel, so a finger on its way down the page never
 * turns the carousel on the way past.
 */
const SWIPE_PX = 44

/**
 * The stories arrive as props from CaseStudies (a server component) rather
 * than being imported from src/data/home.ts here: that module also builds the
 * FAQ, services and step data, none of which belongs in this client bundle.
 */
export function StoryCarousel({ stories, start }: { stories: Story[]; start: number }) {
  const n = stories.length
  const [active, setActive] = useState(start)
  const go = (d: number) => setActive((i) => (i + d + n) % n)

  /** Where the current touch started, and whether it ended up a swipe. */
  const from = useRef<{ x: number; y: number } | null>(null)
  const swiped = useRef(false)

  const onPointerDown = (e: React.PointerEvent) => {
    swiped.current = false
    if (e.pointerType === 'mouse') return
    from.current = { x: e.clientX, y: e.clientY }
  }

  const onPointerUp = (e: React.PointerEvent) => {
    const start = from.current
    from.current = null
    if (!start) return
    const dx = e.clientX - start.x
    const dy = e.clientY - start.y
    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) <= Math.abs(dy)) return
    swiped.current = true
    go(dx < 0 ? 1 : -1)
  }

  /**
   * A swipe ends on whichever card was under the finger, and that card is a
   * link. Capture phase, so this runs before the Link's own handler: the
   * default is prevented (the anchor) and propagation stopped (Next's client
   * navigation), and the flag is spent either way.
   */
  const onClickCapture = (e: React.MouseEvent) => {
    if (!swiped.current) return
    swiped.current = false
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div
      className="absolute left-0 top-0 h-[649px] w-[1920px] touch-pan-y"
      role="group"
      aria-roledescription="carousel"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => { from.current = null }}
      onClickCapture={onClickCapture}
    >
      {stories.map((story, i) => {
        // -1, 0, +1 for the three visible positions; anything else is parked
        // off-canvas so a fourth story, if one is added, has somewhere to be.
        const rel = ((i - active + n + 1) % n) - 1
        const slot = rel >= -1 && rel <= 1 ? SLOTS[rel + 1] : null
        const s = slot ?? { x: rel < 0 ? -900 : 2100, y: 48, w: 671, h: 428, on: false }
        return (
          <Link
            key={story.href + i}
            href={story.href}
            aria-hidden={!slot}
            tabIndex={slot ? 0 : -1}
            className={`absolute block overflow-hidden rounded-[30px] bg-slate transition-[left,top,width,height,opacity] duration-500 ease-out ${s.on ? 'opacity-100' : 'opacity-60'} ${slot ? '' : 'pointer-events-none'}`}
            style={{ left: s.x, top: s.y, width: s.w, height: s.h, zIndex: s.on ? 2 : 1 }}
          >
            <Image src={story.img} alt="" fill sizes="821px" className="object-cover" />
            {/* The centre card keeps the frame's 35%→88% gradient. The side
                cards had none in the frame, which left white type sitting on
                the brightest part of a daylight photo (Asim's 4th screenshot,
                23 Sep 2026: the left card's title was barely readable); they
                get a lighter one of the same shape. */}
            <div
              className="absolute inset-0"
              style={{ backgroundImage: s.on
                ? 'linear-gradient(to bottom, rgba(10,15,12,0) 35%, rgba(10,15,12,0.88) 100%)'
                : 'linear-gradient(to bottom, rgba(10,15,12,0) 40%, rgba(10,15,12,0.6) 100%)' }}
            />
            {s.on ? (
              /* Tag, title and the one-line summary stack from the bottom.
                 Read Story shares the column's bottom edge.

                 TITLES ARE ONE LINE — Asim, 23 Sep 2026: "fix these headings in
                 one line". The title had a 440px box and broke "…years of
                 old / electronics" and "…and waste- / free". It now runs the
                 card's full inner width (821 - 2 x 38.5 = 744) with nowrap;
                 the longest of the three (the hospital one) is 512px, so there is room for a
                 longer one. Only the SUMMARY keeps a 540px measure, because it
                 is the line that shares the bottom row with Read Story. */
              <>
                <span className="absolute bottom-[48px] left-[38.5px] flex w-[744px] flex-col items-start gap-[12px]">
                  <span className="rounded-[5.323px] border-[1.331px] border-white bg-white px-[11.884px] py-[6.602px] font-sans text-[16.103px] capitalize leading-[20.495px] tracking-[1.2776px] text-black">
                    {story.tag}
                  </span>
                  <span className="whitespace-nowrap font-sans text-[20px] leading-[26.205px] text-white">
                    {story.title}
                  </span>
                  <span className="w-[540px] font-roboto text-[15px] leading-[22px] text-white/80">
                    {story.blurb}
                  </span>
                </span>
                <span className="absolute bottom-[48px] right-[44px] flex items-center gap-[10px] font-sans text-[16px] leading-[22px] tracking-[0.126px] text-white">
                  Read Story
                  <Image src="/images/icons/arrow-white.svg" alt="" width={18} height={14} className="h-[14px] w-[18px]" />
                </span>
              </>
            ) : (
              /* Side cards: one line too, across the card's inner width
                 (671 - 2 x 25 = 621). */
              <span className="absolute bottom-[40px] left-[25px] flex w-[621px] flex-col items-start gap-[10px]">
                <span className="rounded-[4.031px] border-[1.008px] border-white bg-white px-[9px] py-[5px] font-sans text-[12.195px] capitalize leading-[15.521px] tracking-[0.9676px] text-black">
                  {story.tag}
                </span>
                <span className="whitespace-nowrap font-sans text-[18.746px] leading-[26.205px] text-white">
                  {story.title}
                </span>
                <span className="flex items-center gap-[8px] font-sans text-[12px] leading-[19.351px] tracking-[0.126px] text-white">
                  Read Story
                  <Image src="/images/icons/arrow-white.svg" alt="" width={14} height={11} className="h-[11px] w-[14px]" />
                </span>
              </span>
            )}
          </Link>
        )
      })}

      {/* Pager — 6557:12876. Two 66px discs, 16 apart, centred. */}
      <div className="absolute left-[890px] flex items-center gap-[16px]" style={{ top: PAGER_Y }}>
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous story"
          className="btn-pop grid size-[66px] place-items-center rounded-full bg-[#ededed] transition-colors hover:bg-[#e2e2e2]"
        >
          <Image src="/images/icons/chevron-16.svg" alt="" width={36} height={36} className="size-[36px] rotate-90" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next story"
          className="btn-pop grid size-[66px] place-items-center rounded-full bg-[#ededed] transition-colors hover:bg-[#e2e2e2]"
        >
          <Image src="/images/icons/chevron-16.svg" alt="" width={36} height={36} className="size-[36px] -rotate-90" />
        </button>
      </div>
    </div>
  )
}
