'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'

export type RailStory = { id: string; img: string; title: string; href: string; pdf: string }

/**
 * The case study carousel on the Google Ads landing pages — Figma 7444:9183
 * (board, inside 7444:9120) and 7444:9252 (phone, inside 7444:9199),
 * 28 Oct 2026.
 *
 *   board  three cards on one 1920 row, px22 gap28, centred on each other:
 *          a 520 side card (cover 250, title 18, 45% opacity), the 780 active
 *          card (cover 380, title 26, View case study + Download PDF side by
 *          side) and the other 520 side card.
 *   phone  a 494 tall window: the 300 active card at the centre (top 20) and
 *          the 230 side cards peeking in 14 either side (top 129), clipped.
 *
 * Previous / Next (48px discs) move which story is in the middle, wrapping
 * round; a horizontal swipe does the same on a touch screen. Side cards are
 * buttons that bring themselves to the middle.
 *
 * Client only because it owns the active index.
 */
const SWIPE_PX = 40

export function CaseStudyRail({ stories, start = 1 }: { stories: RailStory[]; start?: number }) {
  const n = stories.length
  const [active, setActive] = useState(Math.min(start, n - 1))
  const at = (d: number) => stories[(active + d + n) % n]!
  const go = (d: number) => setActive((a) => (a + d + n) % n)
  const touch = useRef<{ x: number; y: number } | null>(null)

  const left = at(-1), mid = at(0), right = at(1)

  return (
    <div className="flex w-full flex-col items-center gap-[24px] lg:gap-[44px]">
      <div
        className="relative h-[494px] w-full touch-pan-y overflow-hidden lg:h-auto lg:overflow-visible"
        onPointerDown={(e) => { if (e.pointerType !== 'mouse') touch.current = { x: e.clientX, y: e.clientY } }}
        onPointerUp={(e) => {
          const t = touch.current; touch.current = null
          if (!t) return
          const dx = e.clientX - t.x, dy = e.clientY - t.y
          if (Math.abs(dx) >= SWIPE_PX && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
        }}
        aria-roledescription="carousel"
        aria-label="Case studies"
      >
        {/* Phone: absolute slots in the window. Board: one centred flex row. */}
        <div className="lg:flex lg:w-full lg:items-center lg:justify-center lg:gap-[28px] lg:px-[22px]">
          <Side story={left} onPick={() => go(-1)} className="left-[calc(50%-150px-14px-230px)]" />
          <Active story={mid} />
          <Side story={right} onPick={() => go(1)} className="left-[calc(50%+150px+14px)]" />
        </div>
      </div>

      <div className="flex items-center gap-[16px] lg:gap-[20px]">
        <button type="button" aria-label="Previous case study" onClick={() => go(-1)}
          className="grid size-[48px] place-items-center rounded-[24px] border border-brand bg-white transition-colors hover:bg-[#eaf4f5]">
          <Image src="/images/landing/cs-prev.svg" alt="" width={20} height={20} unoptimized className="size-[20px]" />
        </button>
        <button type="button" aria-label="Next case study" onClick={() => go(1)}
          className="grid size-[48px] place-items-center rounded-[24px] border border-brand bg-white transition-colors hover:bg-[#eaf4f5]">
          <Image src="/images/landing/cs-next.svg" alt="" width={20} height={20} unoptimized className="size-[20px]" />
        </button>
      </div>
    </div>
  )
}

function Side({ story, onPick, className }: { story: RailStory; onPick: () => void; className: string }) {
  return (
    <button
      type="button"
      onClick={onPick}
      aria-label={`Show case study: ${story.title}`}
      className={`absolute top-[129px] flex w-[230px] flex-col overflow-hidden rounded-[16px] border border-[#e6e6e6] bg-white text-left opacity-45 transition-opacity hover:opacity-70 lg:static lg:w-[520px] lg:shrink-0 lg:border-[#bfbfbf] ${className}`}
    >
      <span className="relative block h-[130px] w-full lg:h-[250px]">
        <Image src={story.img} alt="" fill sizes="(min-width: 1024px) 520px, 230px" className="object-cover" />
      </span>
      <span className="block w-full p-[16px] font-sans text-[14px] font-semibold leading-[1.28] text-[#132119] lg:px-[24px] lg:py-[22px] lg:text-[18px]">{story.title}</span>
    </button>
  )
}

function Active({ story }: { story: RailStory }) {
  const btn = 'btn-pop flex w-full items-center justify-center gap-[8px] rounded-[10px] px-[18px] py-[13px] font-sans text-[14.5px] font-semibold leading-[1.3] lg:min-w-px lg:flex-1'
  return (
    <article className="absolute left-[calc(50%-150px)] top-[20px] flex w-[300px] flex-col overflow-hidden rounded-[20px] border border-[#e6e6e6] bg-white lg:static lg:w-[780px] lg:shrink-0 lg:border-[#d3d3d3]">
      <div className="relative h-[170px] w-full lg:h-[380px]">
        <Image src={story.img} alt="" fill sizes="(min-width: 1024px) 780px, 300px" className="object-cover" />
      </div>
      <div className="flex w-full flex-col gap-[16px] p-[20px] lg:px-[32px] lg:py-[28px]">
        <h3 className="font-sans text-[17px] font-semibold leading-[1.28] text-[#132119] lg:text-[26px]">{story.title}</h3>
        <div className="flex w-full flex-col gap-[12px] lg:flex-row">
          <Link href={story.href} className={`${btn} bg-brand text-white hover:bg-[#04717a] max-lg:flex-row-reverse`}>
            View case study
            <Image src="/images/landing/cs-external.svg" alt="" width={16} height={16} unoptimized className="size-[16px]" />
          </Link>
          <a href={story.pdf} download target="_blank" rel="noopener" className={`${btn} border border-brand text-brand hover:bg-[#eaf4f5] max-lg:flex-row-reverse`}>
            Download PDF
            <Image src="/images/landing/cs-download.svg" alt="" width={16} height={16} unoptimized className="size-[16px]" />
          </a>
        </div>
      </div>
    </article>
  )
}
