'use client'

import { useState } from 'react'

/**
 * A question, with an answer when one has been written. Pages that still have
 * no answers pass plain strings; /electronic-recycle/ passes both.
 */
export type FaqItem = string | { q: string; a: string }

/**
 * FAQ accordion — Figma 6044:19905. Rows 780 wide, border #e5e5e5, r8, px20.
 *
 * py is 7, not 10. Figma's row is 44.086 tall; the row is the li, so its 1px
 * border top and bottom count toward that, leaving 42 for the button:
 * 7 + 28 (the question's line-height) + 7. At py10 each row came out 48, which
 * put five rows 20px over the band's height budget and made every page ask for
 * a taller FAQ section than the design actually specifies.
 */
export function Accordion({ items, gap = 14, variant = 'plain', idPrefix = 'faq' }: {
  items: FaqItem[]
  gap?: number
  /**
   * 'plain'  — 6044:19905, the homepage band: py7, a bare + in brand teal.
   * 'ring'   — 6107:512, the FAQs page: py10, the + inside a 22px ring.
   * Two rows in two frames, so two variants rather than two components — the
   * open/close behaviour and the markup are identical.
   */
  variant?: 'plain' | 'ring'
  /** Ids must be unique when a page draws several of these. */
  idPrefix?: string
}) {
  const [open, setOpen] = useState<number | null>(null)
  const ring = variant === 'ring'

  return (
    <ul className="flex w-full flex-col" style={{ gap }}>
      {items.map((item, i) => {
        const q = typeof item === 'string' ? item : item.q
        const a = typeof item === 'string' ? null : item.a
        const isOpen = open === i
        const id = `${idPrefix}-${i}`
        return (
          <li key={q} className="w-full rounded-[8px] border border-line bg-white">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={id}
              className={`flex w-full items-center justify-between px-[20px] text-left ${ring ? 'py-[10px]' : 'py-[7px]'}`}
            >
              <span className={ring
                ? 'pr-[20px] font-sans text-[16px] leading-[24px] text-black'
                : 'font-sans text-[16px] font-medium leading-[28px] text-ink'}>
                {q}
              </span>
              {ring ? (
                /* 22.086 square, 1.004px #d6e6de ring, the + in DM Sans at
                   15.059 — the frame's numbers, rounded where a browser cannot
                   render the fraction anyway. */
                <span className={`grid size-[22px] shrink-0 place-items-center rounded-full border border-[#d6e6de] font-sans text-[15px] font-semibold leading-none text-brand transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                  +
                </span>
              ) : (
                <span className={`ml-4 shrink-0 font-sans text-[22px] leading-none text-brand transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                  +
                </span>
              )}
            </button>
            {isOpen && (
              <div id={id} className="px-[20px] pb-[16px] font-roboto text-[15px] leading-[24px] text-muted">
                {/* TODO(content): pages whose copy doc has no answers yet still
                    fall through to this line. Musaveer to supply per page. */}
                {a ?? 'Answer copy to be supplied.'}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
