import Link from 'next/link'
import { href } from '@/lib/urls'

/**
 * Numbered pagination for the blog index.
 *
 * !! THIS IS NOT IN THE FIGMA FILE. The frame draws ten cards and stops; the
 * live site has 307 posts and a /page/2/. TODO_FOR_DESIGN has carried "pagination
 * is not designed" since the page was built. This is the smallest thing that
 * could work, using the button family's own colours so it does not invent a new
 * visual language for Aqeel to undo later: 44px pills, the teal fill for the
 * current page, the teal outline for the rest.
 *
 * Every page is a real <a href>. A "load more" button would hide 295 posts
 * behind JavaScript on a site whose whole reason for existing is that Google
 * can read it.
 */
const PILL = 'grid h-[44px] min-w-[44px] place-items-center rounded-full px-[16px] font-sans text-[14px] font-medium transition-colors'
const CURRENT = 'bg-brand text-white'
const OTHER = 'border border-line text-heading hover:border-brand hover:text-brand'
const STEP = 'grid h-[44px] items-center rounded-full border border-line px-[20px] font-sans text-[14px] font-medium text-heading transition-colors hover:border-brand hover:text-brand'

/**
 * First, last, and the current page with a neighbour either side; a gap
 * anywhere else. 26 pages will not fit on one line, and a pager that wraps to
 * two rows breaks the section's measured height.
 */
function window_(page: number, count: number): Array<number | 'gap'> {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1)
  const keep = new Set([1, count, page, page - 1, page + 1])
  const out: Array<number | 'gap'> = []
  for (let n = 1; n <= count; n++) {
    if (keep.has(n)) out.push(n)
    else if (out[out.length - 1] !== 'gap') out.push('gap')
  }
  return out
}

export function Pager({
  page, count, pathFor,
}: {
  page: number
  count: number
  /** Page number -> site-relative path. Pagination shapes differ per section. */
  pathFor: (n: number) => string
}) {
  if (count <= 1) return null

  return (
    <nav aria-label="Pagination" className="flex h-[44px] items-center gap-[10px]">
      {page > 1 && (
        <Link href={href(pathFor(page - 1))} rel="prev" className={STEP}>&larr;&nbsp;Previous</Link>
      )}

      {window_(page, count).map((n, i) =>
        n === 'gap' ? (
          // eslint-disable-next-line react/no-array-index-key -- gaps have no identity
          <span key={`gap-${i}`} aria-hidden="true" className="px-[4px] font-sans text-[14px] text-muted">…</span>
        ) : (
          <Link
            key={n}
            href={href(pathFor(n))}
            aria-label={`Page ${n}`}
            aria-current={n === page ? 'page' : undefined}
            className={`${PILL} ${n === page ? CURRENT : OTHER}`}
          >
            {n}
          </Link>
        ),
      )}

      {page < count && (
        <Link href={href(pathFor(page + 1))} rel="next" className={STEP}>Next&nbsp;&rarr;</Link>
      )}
    </nav>
  )
}
