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
    /*
     * The gap is a CUSTOM PROPERTY, not an inline `gap`: an inline style applies
     * at every viewport, and the mobile rows sit 4px apart (6618:2344) against
     * the board's 14/15. Same trick the Frame primitives use.
     */
    <ul
      className="flex w-full flex-col gap-[var(--faq-gap-m)] lg:gap-[var(--faq-gap)]"
      /* The phone gap is 4 on the homepage band (6618:2344) and 10 on /faqs/
         (6638:9810), so it follows the same prop rather than being fixed at
         the homepage's number: `gap` is 15 there and 14 by default, and the
         two frames scale the same way. Clamped so a big desktop gap does not
         become a big phone gap. Asim's /faqs/ frame, 22 Sep 2026. */
      style={{
        '--faq-gap': `${gap}px`,
        '--faq-gap-m': `${gap >= 15 ? 10 : 4}px`,
      } as React.CSSProperties}
    >
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
              /* py14 / gap12 on the phone (6618:2345), the board's 7 or 10 at lg. */
              className={`flex w-full items-center justify-between gap-[12px] px-[20px] py-[14px] text-left lg:gap-0 ${ring ? 'lg:py-[10px]' : 'lg:py-[7px]'}`}
            >
              <span className={`flex-1 font-sans text-[16px] leading-[normal] text-black lg:flex-initial ${ring
                ? 'lg:pr-[20px] lg:leading-[24px]'
                : 'font-normal lg:font-medium lg:leading-[28px] lg:text-ink'}`}>
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
                /* The phone draws the HOMEPAGE band's rows with the FAQs page's
                   ringed +: 6618:2345 instantiates 6107:512, the `ring` row.
                   So this is the ring below lg and the board's bare + at lg —
                   one span with every mobile property reset at `lg:`, rather
                   than a second element that would double the markup. */
                <span className={`grid size-[22px] shrink-0 place-items-center rounded-full border border-[#d6e6de] font-sans text-[15px] font-semibold leading-none text-brand transition-transform lg:ml-4 lg:block lg:size-auto lg:rounded-none lg:border-0 lg:text-[22px] lg:font-normal ${isOpen ? 'rotate-45' : ''}`}>
                  +
                </span>
              )}
            </button>
            {/*
              ALWAYS RENDERED, hidden when closed — never `{isOpen && …}`.
              Conditional mounting kept every answer out of the prerendered
              HTML: on 21 Sep 2026 all 114 answers on /faqs/, the six on
              /contact-us/ and every service and industry FAQ existed only
              inside the FAQPage JSON-LD. That is a crawler-visible hole in a
              replatform whose whole point is full HTML for Googlebot
              (CLAUDE.md rule 2), and Google retired FAQ rich results in
              May 2026, so the JSON-LD no longer compensates.

              `hidden` is display:none, so the collapsed row measures exactly
              as before and no section height budget moves.
            */}
            <div
              id={id}
              hidden={!isOpen}
              className="px-[20px] pb-[16px] font-roboto text-[15px] leading-[24px] text-muted"
            >
              {/* TODO(content): pages whose copy doc has no answers yet still
                  fall through to this line. Musaveer to supply per page. */}
              {a ?? 'Answer copy to be supplied.'}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
