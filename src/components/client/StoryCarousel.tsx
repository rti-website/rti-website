'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { CASE_STUDIES, CASE_STUDIES_START } from '@/data/home'

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
 */
type Slot = { x: number; y: number; w: number; h: number; on: boolean }

const SLOTS: Slot[] = [
  { x: -160.5, y: 48, w: 671, h: 428, on: false },
  { x: 554.5,  y: 0,  w: 821, h: 524, on: true },
  { x: 1417.5, y: 48, w: 671, h: 428, on: false },
]

/** Where the pager sits, relative to the track's top. Frame: y867.96 - y284.96. */
const PAGER_Y = 583

export function StoryCarousel() {
  const n = CASE_STUDIES.length
  const [active, setActive] = useState(CASE_STUDIES_START)
  const go = (d: number) => setActive((i) => (i + d + n) % n)

  return (
    <div className="absolute left-0 top-0 h-[649px] w-[1920px]" aria-roledescription="carousel">
      {CASE_STUDIES.map((story, i) => {
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
            {s.on && (
              <div
                className="absolute bottom-0 left-0 w-full"
                style={{ height: 843, backgroundImage: 'linear-gradient(to bottom, rgba(10,15,12,0) 35%, rgba(10,15,12,0.88) 100%)' }}
              />
            )}
            {s.on ? (
              <>
                <span className="absolute bottom-[159px] left-[38.5px] rounded-[5.323px] border-[1.331px] border-white bg-white px-[11.884px] py-[6.602px] font-sans text-[16.103px] capitalize leading-[20.495px] tracking-[1.2776px] text-black">
                  {story.tag}
                </span>
                <span className="absolute left-[38.5px] top-[384px] w-[420px] font-sans text-[20px] leading-[26.205px] text-white">
                  {story.title}
                </span>
                <span className="absolute bottom-[81px] right-[50px] flex items-center gap-[10px] font-sans text-[16px] leading-[19.351px] tracking-[0.126px] text-white">
                  Read Story
                  <Image src="/images/icons/arrow-white.svg" alt="" width={18} height={14} className="h-[14px] w-[18px]" />
                </span>
              </>
            ) : (
              <>
                <span className="absolute bottom-[140px] left-[25px] rounded-[4.031px] border-[1.008px] border-white bg-white px-[9px] py-[5px] font-sans text-[12.195px] capitalize leading-[15.521px] tracking-[0.9676px] text-black">
                  {story.tag}
                </span>
                <span className="absolute left-[25px] top-[298px] w-[592px] font-sans text-[18.746px] leading-[26.205px] text-white">
                  {story.title}
                </span>
                <span className="absolute bottom-[50px] left-[25px] flex items-center gap-[8px] font-sans text-[12px] leading-[19.351px] tracking-[0.126px] text-white">
                  Read Story
                  <Image src="/images/icons/arrow-white.svg" alt="" width={14} height={11} className="h-[11px] w-[14px]" />
                </span>
              </>
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
          className="grid size-[66px] place-items-center rounded-full bg-[#ededed] transition-colors hover:bg-[#e2e2e2]"
        >
          <Image src="/images/icons/chevron-16.svg" alt="" width={36} height={36} className="size-[36px] rotate-90" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next story"
          className="grid size-[66px] place-items-center rounded-full bg-[#ededed] transition-colors hover:bg-[#e2e2e2]"
        >
          <Image src="/images/icons/chevron-16.svg" alt="" width={36} height={36} className="size-[36px] -rotate-90" />
        </button>
      </div>
    </div>
  )
}
