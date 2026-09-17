import Link from 'next/link'
import { GUIDES, ARTICLES } from '@/data/resources'

/**
 * Related articles — Figma 6494:1750, 1920x471.
 *
 * Four 302-wide cards on a 1280 row at x320, each a teal disc, a category, a
 * title and a date/Read row.
 *
 * The four in the frame are the same posts /resources/ features, so the list is
 * read from src/data/resources.ts rather than typed again — one source means a
 * retired post cannot linger here after it has been pulled from Resources. The
 * current post is filtered out, and the first four of what is left are shown.
 */
export function RelatedArticles({ current }: { current: string }) {
  const pool = [
    ...GUIDES.cards.map((g) => ({ category: g.category, title: g.title, href: g.href, date: 'Dec 24, 2024' })),
    ...ARTICLES.rows.map((a) => ({ category: a.category, title: a.title, href: a.href, date: a.date })),
  ]
  const cards = pool.filter((c) => !c.href.startsWith(current) || current === '/').slice(0, 4)

  return (
    <section data-figma="6494:1750" className="bg-[#fcfcfc] py-[80px]">
      <h2 className="text-center font-sans text-[34px] font-semibold text-black">Related Articles</h2>
      {/* No `items-start`: flex stretches the four cards to the tallest of them,
          so a one-line title and a three-line title give the same box. Asim
          asked for that on 17 Sep 2026 — "the size of article must be same" —
          and it is the one thing the frame cannot show, because the frame's
          four titles happen to be the same length.

          Heights are equalised rather than the titles being clamped: at 16px in
          a 244px column these run to three lines, and truncating a related-post
          title to make the boxes match would be fixing the wrong end of it. */}
      <div className="mx-auto mt-[40px] flex w-[1280px] gap-[24px]">
        {cards.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            /* .post-card is the gradient hover shared with the blog index's
               cards — see globals.css. Same card, two sizes: this one is
               6494:1750's 302-wide variant, the index's is 6385:1225 at 410. */
            className="post-card flex w-[302px] flex-col rounded-[12px] border border-[#e5e5e5] bg-white p-[29px] hover:shadow-[0_10px_28px_rgba(13,39,80,0.18)]"
          >
            <span className="post-card__disc grid size-[44px] place-items-center rounded-full bg-brand transition-colors">
              <svg viewBox="0 0 20 20" className="size-[20px] fill-white transition-colors" aria-hidden="true">
                <path d="M4.5 3h11a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm1.2 3v1.6h8.6V6H5.7Zm0 3.4V11h8.6V9.4H5.7Zm0 3.4v1.6h5.4v-1.6H5.7Z" />
              </svg>
            </span>
            <span className="post-card__cat mt-[14px] font-roboto text-[11px] font-bold uppercase tracking-[0.7px] text-brand transition-colors">
              {c.category}
            </span>
            <span className="post-card__title mt-[14px] font-sans text-[16px] font-medium leading-[1.3] text-[#132119] transition-colors">
              {c.title}
            </span>
            {/* mt-auto pins the date row to the bottom edge of the stretched
                card instead of leaving it under a short title. */}
            <span className="mt-auto flex items-center justify-between pt-[14px]">
              <span className="post-card__date font-roboto text-[12px] text-[#a6a6a6] transition-colors">{c.date}</span>
              <span className="post-card__read font-roboto text-[13px] font-medium text-brand transition-colors">Read &rarr;</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
