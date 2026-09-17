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
    <div className="px-[319px] pb-[64px] pt-[42px]">
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
      */}
      <div className="sticky top-0 z-[2] -mx-[319px] bg-white px-[319px] pb-[14px] pt-[18px]">
        <div className="h-[4px] w-full overflow-hidden rounded-full bg-[#ececec]" aria-hidden="true">
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-150 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Row — 6497:1751. Article 760, gap 70, sidebar 380. */}
      <div className="flex items-start gap-[70px] pt-[14px]">
        <article id="post-body" className="w-[760px] shrink-0">
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
        <aside className="sticky top-[48px] flex w-[380px] shrink-0 flex-col gap-[24px]">
          {/* 6501:1750. Hidden until the headings are read, so no empty card. */}
          {headings.length > 0 && (
            <nav className="flex w-[380px] flex-col gap-[4px] rounded-[12px] border border-[#e5e5e5] bg-white p-[26px]" aria-label="On this page">
              <div className="flex h-[30px] items-center justify-between pb-[10px]">
                <span className="font-sans text-[16px] font-medium text-[#132119]">On This Page</span>
                <span className="font-roboto text-[12px] text-brand tabular-nums">{pct}%</span>
              </div>
              {headings.map((h) => {
                const active = h.id === activeId
                return (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    aria-current={active ? 'true' : undefined}
                    className={`flex h-[38px] items-center gap-[10px] rounded-[8px] px-[12px] transition-colors duration-200 ${
                      active ? 'bg-[#eaf4f5]' : 'hover:bg-[#f4f9f9]'
                    }`}
                  >
                    <span
                      className={`h-[16px] w-[3px] shrink-0 rounded-full transition-colors duration-200 ${
                        active ? 'bg-brand' : 'bg-[#d9d9d9]'
                      }`}
                    />
                    <span
                      className={`truncate transition-colors duration-200 ${
                        active
                          ? 'font-sans text-[14px] font-medium text-brand'
                          : 'font-roboto text-[14px] text-[#666]'
                      }`}
                    >
                      {h.text}
                    </span>
                  </a>
                )
              })}
            </nav>
          )}

          {sidebar}
        </aside>
      </div>
    </div>
  )
}
