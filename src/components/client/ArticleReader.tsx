'use client'

import { useEffect, useState } from 'react'

/**
 * The body of a blog post: the reading-progress track, the article column and
 * the sticky sidebar — Figma 6494:1749 in RJFB6BtCpcCW1C3isO8809.
 *
 * WHY THIS IS A CLIENT COMPONENT (CLAUDE.md rule 7 wants a reason): Asim asked
 * for two behaviours by name — the progress line filling as you scroll, and the
 * heading in the sidebar changing colour as you reach it. Neither is expressible
 * without scroll position. It adds no dependency, it is the only interactive
 * island on a post, and with no JS it degrades to the article and the sidebar's
 * other two cards, which is a readable page.
 *
 * The track and the list cannot be separate islands — they are one scroll
 * calculation rendered in two places — so this component owns the whole row and
 * takes the server-rendered article and the rest of the sidebar as children.
 *
 * ! THE HEADINGS ARE READ OUT OF THE DOM, NOT PASSED IN. The body is MDX
 * compiled at build time, so the server has no list of its <h2>s without a
 * rehype plugin — and CLAUDE.md warns that Turbopack can only take plugins
 * named as strings, which is a config change plus a dependency for something
 * this does in a few lines. It also means the list can never disagree with the
 * article: one source, the rendered headings.
 *
 * Ids are assigned here too. An anchor therefore does not resolve until
 * hydration — the trade for no rehype-slug and no MDX plugin config.
 */

type Heading = { id: string; text: string }

/** "Why These Symbols Matter" -> "why-these-symbols-matter" */
function slug(text: string) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-')
}

export function ArticleBody({
  article, sidebar,
}: {
  /** The compiled MDX, rendered on the server and handed in. */
  article: React.ReactNode
  /** The "Ask Our Team" and "Share This Guide" cards, under the contents list. */
  sidebar: React.ReactNode
}) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState('')
  const [progress, setProgress] = useState(0)

  // Collect the h2s once the article is in the DOM, giving each an id so the
  // sidebar can scroll to it.
  useEffect(() => {
    const el = document.getElementById('post-body')
    if (!el) return
    const found: Heading[] = []
    const seen = new Set<string>()
    el.querySelectorAll('h2').forEach((h) => {
      const text = (h.textContent ?? '').trim()
      if (!text) return
      const base = slug(text)
      let id = base
      let n = 2
      // Two sections with the same name would otherwise fight over one anchor.
      while (seen.has(id)) id = `${base}-${n++}`
      seen.add(id)
      h.id = id
      found.push({ id, text })
    })
    setHeadings(found)
  }, [])

  useEffect(() => {
    const el = document.getElementById('post-body')
    if (!el) return

    let frame = 0
    const measure = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const viewport = window.innerHeight

      // How far through the ARTICLE the reader is, not the document: measuring
      // against the article keeps the hero and the footer out of the sum, which
      // is what makes the number feel honest.
      const total = rect.height - viewport
      setProgress(total <= 0 ? 1 : Math.min(1, Math.max(0, -rect.top / total)))

      // The active heading is the last one whose top has passed a line a third
      // of the way down the viewport. An IntersectionObserver flickers between
      // two headings that share the fold; this cannot.
      const line = viewport * 0.33
      let current = ''
      el.querySelectorAll<HTMLHeadingElement>('h2[id]').forEach((h) => {
        if (h.getBoundingClientRect().top <= line) current = h.id
      })
      setActiveId(current)
    }

    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure) }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [headings.length])

  const pct = Math.round(progress * 100)

  return (
    /*
     * MOBILE — 6638:8639 / 6638:8666 / 6638:8714. The 319px gutter is the whole
     * page's worst overflow below lg (638px of padding in a 390px window), so it
     * becomes the frame's 20.
     *
     * The frame re-orders this band rather than restyling it: the share row
     * first, then "ON THIS PAGE" as a horizontal chip rail, then the article,
     * then "Ask Our Team" at the very end. That is done with `order`, not with a
     * second copy of the markup — the aside goes `display: contents` below lg so
     * its three children become siblings of the article and can be ordered
     * against it. ArticleTemplate sets the orders on the two cards it owns.
     *
     * NOT BUILT, deliberately: 6638:8639 also draws a GUIDES pill and an author
     * row — an "RT" avatar over "Recycle Technologies Team". The pill repeats
     * the category the hero meta line already prints, and the byline is copy
     * this page has never carried: a DB post's `author` is the admin user who
     * typed it (posts-db.ts) and an MDX post has no author field at all, so
     * "Recycle Technologies Team" would be a string invented here. That is a
     * content decision, not a layout one — flagged, not guessed.
     */
    <div className="px-[20px] pb-[48px] pt-[24px] lg:px-[319px] lg:pb-[64px] lg:pt-[42px]">
      {/*
        Reading progress — 6497:1749, 1282x4 across the full column width.

        STICKY, because the line is the point. Asim: "this is progress line and
        it is filling when we move… when it move to that place than only scroll
        the inside blog contant." Pinned at the top of the window it stays on
        screen and fills while the article runs underneath it, and it releases
        with the rest of the column when the article ends.

        The negative margin plus matching padding stretches its white backdrop
        across the canvas so body text and the sidebar cards are covered as they
        pass behind, rather than showing through beside a 4px line.

        The padding here is the row's old padding moved up: 42 + 18 puts the
        track at y60 and 14 + 14 puts the article at y92, exactly where they
        were before this became its own band.

        BOARD ONLY. 6638:8525 draws no progress track and no percentage, and a
        4px line pinned to the top of a phone window would be fighting the
        header for the same 4px. Both are hidden below lg rather than removed,
        so the desktop band and its negative margins are untouched; the scroll
        measurement keeps running either way, which costs one rAF per scroll.
      */}
      <div className="sticky top-0 z-[2] -mx-[319px] bg-white px-[319px] pb-[14px] pt-[18px] max-lg:hidden">
        <div className="h-[4px] w-full overflow-hidden rounded-full bg-[#ececec]" aria-hidden="true">
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-150 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Row — 6497:1751. Article 760, gap 70, sidebar 380. One column 24 apart
          below lg, where `order` decides what the frame puts where. */}
      <div className="flex flex-col gap-[24px] lg:flex-row lg:items-start lg:gap-[70px] lg:pt-[14px]">
        <article id="post-body" className="order-3 w-full lg:order-none lg:w-[760px] lg:shrink-0">
          {article}
        </article>

        {/*
          Sticky and NOT capped, NOT scrollable. It was briefly both: a
          one-window cap with its own overflow, on my reading that "scroll the
          blog internal space" meant this rail. It meant the article. A rail
          with its own scrollbar was the wrong answer twice over — Asim asked
          for it gone, and the cap clipped the Share card on a tall contents
          list. It sits below the sticky progress band, which is 36px tall.
        */}
        {/* `contents` below lg: the aside's own box disappears so the contents
            list and the two cards become siblings of the article and can be
            ordered around it. It is a full sticky column again at lg. */}
        <aside className="contents lg:sticky lg:top-[48px] lg:flex lg:w-[380px] lg:shrink-0 lg:flex-col lg:gap-[24px]">
          {/* 6501:1750. Hidden until the headings are read, so no empty card.
              6638:8666 on the phone: the card loses its border and padding and
              becomes a label over a horizontal rail of 44px chips. */}
          {headings.length > 0 && (
            <nav className="order-2 flex w-full flex-col gap-[10px] lg:order-none lg:w-[380px] lg:gap-[4px] lg:rounded-[12px] lg:border lg:border-[#e5e5e5] lg:bg-white lg:p-[26px]" aria-label="On this page">
              <div className="flex items-center justify-between lg:h-[30px] lg:pb-[10px]">
                <span className="font-roboto text-[12px] font-bold uppercase tracking-[0.6px] text-brand lg:font-sans lg:text-[16px] lg:font-medium lg:normal-case lg:tracking-normal lg:text-[#132119]">On This Page</span>
                <span className="font-roboto text-[12px] text-brand tabular-nums max-lg:hidden">{pct}%</span>
              </div>
              {/* `lg:contents` so the chips are still direct children of the nav
                  on the board and nothing about that column moves. */}
              <div className="flex gap-[10px] overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:contents">
                {headings.map((h) => {
                  const active = h.id === activeId
                  return (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      aria-current={active ? 'true' : undefined}
                      className={`flex h-[44px] shrink-0 items-center rounded-[22px] px-[16px] transition-colors duration-200 lg:h-[38px] lg:shrink lg:gap-[10px] lg:rounded-[8px] lg:px-[12px] ${
                        active ? 'bg-[#eaf4f5]' : 'bg-[#f6f6f6] lg:bg-transparent lg:hover:bg-[#f4f9f9]'
                      }`}
                    >
                      <span
                        className={`h-[16px] w-[3px] shrink-0 rounded-full transition-colors duration-200 max-lg:hidden ${
                          active ? 'bg-brand' : 'bg-[#d9d9d9]'
                        }`}
                      />
                      <span
                        className={`truncate transition-colors duration-200 ${
                          active
                            ? 'font-sans text-[13.5px] font-medium text-brand lg:text-[14px]'
                            : 'font-roboto text-[13.5px] font-medium text-[#212529] lg:text-[14px] lg:font-normal lg:text-[#666]'
                        }`}
                      >
                        {h.text}
                      </span>
                    </a>
                  )
                })}
              </div>
            </nav>
          )}

          {sidebar}
        </aside>
      </div>
    </div>
  )
}
