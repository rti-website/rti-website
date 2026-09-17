import Link from 'next/link'
import { href } from '@/lib/urls'

/**
 * The category filter row — Figma 6384:1232, drawn exactly as it is there: a
 * 38px pill, 18px of side padding, 12px apart, teal fill when selected and a
 * teal-tint fill when not.
 *
 * These are LINKS, not toggles. See the note in lib/blog-index.ts for why; the
 * short version is that a client-side filter over a paginated list can only
 * filter the twelve cards it can see.
 *
 * The chip labels are the WordPress category names as imported. They are not
 * the six the frame draws (Electronics, Batteries, Appliances…), because those
 * belong to the planned taxonomy that nothing is filed under yet — logged in
 * TODO_FOR_DESIGN.
 */
export type Chip = { slug: string; name: string; path: string }

const BASE = 'flex h-[38px] items-center whitespace-nowrap rounded-full px-[18px] font-sans text-[13.5px] font-medium leading-[1.3] transition-colors'
const ON = 'bg-brand text-white'
const OFF = 'bg-brand-soft text-brand hover:bg-[#dbecee]'

export function CategoryChips({
  chips, active,
}: {
  chips: Chip[]
  /** Slug of the archive being shown, or undefined on /blog/ itself. */
  active?: string | undefined
}) {
  return (
    <nav aria-label="Filter articles by category" className="flex items-start gap-[12px]">
      <Link
        href={href('/blog/')}
        aria-current={active ? undefined : 'page'}
        className={`${BASE} ${active ? OFF : ON}`}
      >
        All Articles
      </Link>
      {chips.map((c) => (
        <Link
          key={c.slug}
          href={href(c.path)}
          aria-current={c.slug === active ? 'page' : undefined}
          className={`${BASE} ${c.slug === active ? ON : OFF}`}
        >
          {c.name}
        </Link>
      ))}
    </nav>
  )
}
