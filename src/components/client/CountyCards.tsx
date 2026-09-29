'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { COUNTIES_DELTA_VAR } from '@/lib/layout'

/**
 * The cards of Counties We Serve (Figma 7079:6454, phone 7079:6464) and its
 * Load More (7079:6457 / 7079:6553). Client-side for the button only: every
 * card is in the HTML, the ones past the first ten are `hidden` until asked
 * for, so a crawler follows all of them.
 *
 * The board is a pinned canvas, so a taller grid has to move what is under
 * it: this writes the extra rows' height into COUNTIES_DELTA_VAR on the
 * canvas, which the section's height, the wrapper round the CTA and footer,
 * and the canvas itself all add (LocationDetailPage) — the homepage's
 * service tabs do the same. Cards are a fixed 72 tall at lg, one or two
 * lines of label, so a row is always 72 + 20.
 */
const FIRST = 10
const PER_ROW = 5
const ROW = 72 + 20

export function CountyCards({ cards, more }: { cards: { label: string; href: string }[]; more: string }) {
  const [shown, setShown] = useState(FIRST)
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = host.current?.closest<HTMLElement>('.design-canvas')
    if (!canvas) return
    const rows = Math.ceil(Math.min(shown, cards.length) / PER_ROW)
    const base = Math.ceil(Math.min(FIRST, cards.length) / PER_ROW)
    // The board's 620 includes Load More and the 44 above it; once every card
    // is out the button goes, and so does its room.
    const button = cards.length > FIRST && shown >= cards.length ? 44 + 48 : 0
    canvas.style.setProperty(COUNTIES_DELTA_VAR, `${(rows - base) * ROW - button}px`)
    return () => { canvas.style.removeProperty(COUNTIES_DELTA_VAR) }
  }, [shown, cards.length])

  return (
    <div ref={host} className="flex w-full flex-col items-center gap-[24px] lg:gap-[44px]">
      <ul className="grid w-full grid-cols-2 gap-x-[12px] gap-y-[24px] lg:w-[1276px] lg:grid-cols-5 lg:gap-[20px]">
        {cards.map((c, i) => (
          <li key={c.href} hidden={i >= shown}>
            <Link href={c.href}
              className="group relative flex h-[64px] items-center justify-center rounded-[12px] border border-transparent bg-[#eaf4f5] px-[16px] text-center font-sans text-[13px] font-medium leading-[1.3] text-[#132119] transition-colors hover:border-brand lg:h-[72px] lg:px-[36px] lg:text-[14.5px]">
              {c.label}
              {/* 7080:63727 — the board's hover card: the teal arrow at 45deg, 20 in from the right. */}
              <span aria-hidden="true" className="absolute right-[12px] top-1/2 grid size-[23px] -translate-y-1/2 place-items-center opacity-0 transition-opacity group-hover:opacity-100 lg:right-[14px]">
                <Image src="/images/icons/arrow-teal.svg" alt="" width={18} height={14} className="h-[14.25px] w-[18.21px] -rotate-45" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {shown < cards.length && (
        <button type="button" onClick={() => setShown((n) => n + FIRST)}
          className="btn-pop inline-flex h-[46px] w-full items-center justify-center gap-[8px] rounded-[8px] border border-brand bg-white font-roboto text-[15px] font-medium leading-[22.5px] tracking-[-0.08px] text-brand lg:h-[48px] lg:w-auto lg:border-transparent lg:px-[28px]">
          {more}
          <Image src="/images/icons/arrow-teal.svg" alt="" width={18} height={14} className="h-[14.25px] w-[18.21px]" />
        </button>
      )}
    </div>
  )
}
