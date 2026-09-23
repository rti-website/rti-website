'use client'

import { useEffect, useState } from 'react'
import { CaseStudyCardView } from '@/components/ui/CaseStudyCard'
import { CASE_STUDY_CARDS, GRID } from '@/data/case-studies'

/**
 * The industry filter and the card grid — Figma 6391:1534 + 6391:1547.
 *
 * WHY THIS IS A CLIENT COMPONENT (CLAUDE.md rule 7): the design draws a real
 * filter row, and the honest build of a filter is one that filters. The
 * alternatives were both worse — query-string links would need request-time
 * data, which `export const dynamic = 'error'` rejects, and decorative pills
 * that do nothing are a promise the page does not keep. It is ~1KB of state and
 * a click handler, no dependency.
 *
 * EVERY CARD IS ALWAYS IN THE DOM. Non-matching ones are hidden with the
 * `hidden` attribute rather than unmounted, so the prerendered HTML a crawler
 * sees always carries every story regardless of which pill is active.
 *
 * The grid is a 1278px wrapping row of 410px cards on a 24px gutter (410x3 +
 * 24x2 = 1278). The frame drew five in a 3 + 2 layout; since 22 Sep 2026 there
 * are three real ones and they fill exactly one row. The row is `items-stretch`
 * so all three cards match the tallest — without it the download link floats
 * mid-card on the shorter two, because the card pins it with `mt-auto`.
 */
export function CaseStudyFilter() {
  const [active, setActive] = useState<string | null>(null)

  /*
   * ARRIVING FROM A STORY — Asim, 23 Sep 2026: a story in the homepage (and
   * service page) carousel should "land on their respective case study page".
   * Those links are /case-studies/#<card id> (caseStudyHref in lib/urls.ts).
   * On arrival, and on any later hash change, the filter switches to that
   * story's industry so it is the card on screen, then the card's anchor is
   * scrolled to AFTER the re-render — on a phone the cards stack, so hiding
   * the ones above moves the target up and the browser's own jump would land
   * short. A hash that is not a card id is left alone.
   *
   * Read in an effect, never during render: the prerendered HTML is the same
   * for every visitor (CLAUDE.md rule 2), and all three cards are in it.
   */
  useEffect(() => {
    const apply = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      const card = CASE_STUDY_CARDS.find((c) => c.id === id)
      if (!card) return
      setActive(card.industry)
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }))
    }
    apply()
    window.addEventListener('hashchange', apply)
    return () => window.removeEventListener('hashchange', apply)
  }, [])

  const pill = 'btn-pop flex h-[38px] shrink-0 items-center whitespace-nowrap rounded-full px-[18px] font-sans text-[13.5px] font-medium transition-colors'
  const on   = 'bg-brand text-white'
  const off  = 'bg-brand-soft text-brand hover:bg-brand hover:text-white'

  return (
    <>
      {/* Filter row — 6391:1534 */}
      <div className="flex items-start gap-[12px]" role="group" aria-label="Filter case studies by industry">
        <button type="button" onClick={() => setActive(null)} aria-pressed={active === null}
          className={`${pill} ${active === null ? on : off}`}>
          {GRID.allLabel}
        </button>
        {GRID.filters.map((f) => (
          <button key={f} type="button" onClick={() => setActive(f)} aria-pressed={active === f}
            className={`${pill} ${active === f ? on : off}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Grid — 6391:1547 */}
      {/* A GRID AT lg, NOT A WRAPPING ROW — Asim, 23 Sep 2026: "in Firefox the
          3rd case study is coming to the next line but in Chrome it is one
          line". Three 410px cards and two 24px gaps are EXACTLY 1278, and a
          wrapping flex row that fits to the pixel is at the mercy of how each
          browser rounds under the canvas zoom: Firefox lays out in 1/60px
          units and scales each length separately, so the three cards can sum
          a hair wider than the row, and the third one wraps. A grid places
          its three columns explicitly; there is nothing to wrap. Below lg,
          CaseStudyGrid's descendant rules still turn this into a column.
          scripts/check-wrap-slack.mjs finds rows like this across the site. */}
      <div className="flex w-[1278px] flex-wrap items-stretch gap-[24px] lg:grid lg:grid-cols-[repeat(3,410px)]">
        {CASE_STUDY_CARDS.map((c) => (
          <div key={c.id} hidden={active !== null && c.industry !== active} className="relative flex">
            {/* Scroll target for caseStudyHref(). An offset span, not an id
                on the card: the sticky 120px header would cover the card's
                top. Same trick as #contact-form on /contact-us/. */}
            <span id={c.id} className="absolute -top-[150px]" aria-hidden="true" />
            <CaseStudyCardView card={c} />
          </div>
        ))}
      </div>
    </>
  )
}
