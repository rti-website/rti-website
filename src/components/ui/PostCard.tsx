import Link from 'next/link'
import { href } from '@/lib/urls'

/**
 * The article card — Figma 6385:1225. 410 wide, 221 tall, 28px padding:
 * a 44px brand disc, an 11px uppercase category, an 18px title and a row of
 * date + "Read →".
 *
 * It lives in ui/ rather than next to the blog grid because three places draw
 * it now: /blog/, /blog/page/N/ and the six /category/ archives. One card, one
 * set of numbers to diff against the frame.
 *
 * THE DISC IS A GLYPH, NOT THE FEATURED IMAGE, and that is the design's choice
 * rather than a missing-asset workaround — the frame draws a mark, not a
 * thumbnail. Most imported posts do have an og:image now, so a photo card is a
 * real option; it is a design change and it is logged in TODO_FOR_DESIGN.
 *
 * The marks are drawn inline for the same reason as every other glyph in this
 * build — figma.com is unreachable from the build sandbox, so an exported asset
 * costs a manual fetch step on someone's machine.
 */
const MARKS: Record<string, string[]> = {
  recycle:      ['M10 1.4 13.4 7.2h-2.2v3.1H8.8V7.2H6.6L10 1.4Z', 'M2.2 15.1 5.6 9.3l1.9 1.1-1.5 2.7 2.7 1.5-1.1 1.9-5.4.6Z', 'M17.8 15.1l-5.4-.6-1.1-1.9 2.7-1.5-1.5-2.7 1.9-1.1 3.4 5.8Z'],
  laptop:       ['M4 4.6h12a1 1 0 0 1 1 1v7.2H3V5.6a1 1 0 0 1 1-1Zm1 1.8v4.6h10V6.4H5Z', 'M1.8 13.8h16.4v1a1.6 1.6 0 0 1-1.6 1.6H3.4a1.6 1.6 0 0 1-1.6-1.6v-1Z'],
  printer:      ['M6 2.4h8v3.2H6V2.4Z', 'M3.2 6.8h13.6a1.4 1.4 0 0 1 1.4 1.4v4.4a1.4 1.4 0 0 1-1.4 1.4H15v-2.6H5V14H3.2a1.4 1.4 0 0 1-1.4-1.4V8.2a1.4 1.4 0 0 1 1.4-1.4Zm11.6 1.5a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z', 'M6.4 12.8h7.2v4.8H6.4v-4.8Z'],
  phone:        ['M6.6 1.6h6.8a1.6 1.6 0 0 1 1.6 1.6v13.6a1.6 1.6 0 0 1-1.6 1.6H6.6A1.6 1.6 0 0 1 5 16.8V3.2a1.6 1.6 0 0 1 1.6-1.6Zm0 2.6v10.4h6.8V4.2H6.6ZM10 15.3a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z'],
  battery:      ['M2.4 5.6h12.4a1.4 1.4 0 0 1 1.4 1.4v6a1.4 1.4 0 0 1-1.4 1.4H2.4A1.4 1.4 0 0 1 1 13V7a1.4 1.4 0 0 1 1.4-1.4Zm.4 1.9v5h11.6v-5H2.8Z', 'M17.2 8.2H19v3.6h-1.8V8.2Z', 'M4.2 8.7h4.2v3.1H4.2V8.7Z'],
  car:          ['M3.6 8.4 5 4.9a1.6 1.6 0 0 1 1.5-1h7a1.6 1.6 0 0 1 1.5 1l1.4 3.5a2 2 0 0 1 1.2 1.8v4.2h-2.2v-1.6H4.6v1.6H2.4v-4.2a2 2 0 0 1 1.2-1.8Zm2-.5h8.8l-1-2.6H6.6l-1 2.6Zm.3 2.6a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm8.2 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z'],
  fridge:       ['M5 1.8h10a1.4 1.4 0 0 1 1.4 1.4v13.6a1.4 1.4 0 0 1-1.4 1.4H5a1.4 1.4 0 0 1-1.4-1.4V3.2A1.4 1.4 0 0 1 5 1.8Zm.5 1.9v3.5h9V3.7h-9Zm0 5.4v7.2h9V9.1h-9ZM7 4.5h1.4v2H7v-2Zm0 5.4h1.4v2.4H7V9.9Z'],
  extinguisher: ['M12.4 1.6h3.2v1.8h-3.2V1.6Z', 'M11.2 3.9h2.2v2.2h-2.2V3.9Z', 'M8.4 4.4h2.6l-.9 2.1a4.6 4.6 0 0 1 3.1 4.4v6.1a1.4 1.4 0 0 1-1.4 1.4H7.4A1.4 1.4 0 0 1 6 17V10.9a4.6 4.6 0 0 1 2.4-4V4.4Zm-.4 6.9v5.4h4V11.3H8Z'],
  droplet:      ['M10 1.6c3.3 4.2 5.4 7 5.4 9.6a5.4 5.4 0 0 1-10.8 0c0-2.6 2.1-5.4 5.4-9.6Zm0 3.4c-2 2.7-3.3 4.7-3.3 6.2a3.3 3.3 0 0 0 6.6 0c0-1.5-1.3-3.5-3.3-6.2Z'],
  compare:      ['M9.1 1.6h1.8v16.8H9.1V1.6Z', 'M1.4 5.4h6.2v2.2H1.4V5.4Zm1.4 3.9h3.4v6.8H2.8V9.3Z', 'M12.4 5.4h6.2v2.2h-6.2V5.4Zm1.4 3.9h3.4v6.8h-3.4V9.3Z'],
  news:         ['M1.8 3.2h12.4v13.6H3.4a1.6 1.6 0 0 1-1.6-1.6V3.2Zm1.9 1.8v2.4h8.6V5H3.7Zm0 4.2v1.5h8.6V9.2H3.7Zm0 3.2v1.5h5.6v-1.5H3.7Z', 'M15.6 6.8h2.6v8.2a1.8 1.8 0 0 1-2.6 1.6V6.8Z'],
  solar:        ['M10 1.4a.9.9 0 0 1 .9.9v1.6h-1.8V2.3a.9.9 0 0 1 .9-.9Z', 'M10 5.6a3.4 3.4 0 1 1 0 6.8 3.4 3.4 0 0 1 0-6.8Zm0 1.8a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z', 'M2.6 14.2h14.8l-.9 3.4H3.5l-.9-3.4Z'],
}

/**
 * Which mark a post gets. WordPress categories are editorial buckets ("Blog",
 * "News", "Recycling"), so categorising by them would put the same disc on 252
 * cards. The slug is the only per-post signal available without new data, and
 * these titles are unusually literal about their subject — "how-to-dispose-of-
 * old-laptop", "lithium-ion-battery-recycling" — so matching on it is reliable
 * and, being pure, renders identically on server and client.
 *
 * Order matters: the first rule that matches wins.
 */
const GLYPH_RULES: ReadonlyArray<readonly [RegExp, string]> = [
  [/(^|-)(vs|versus)(-|$)|compar|geek-squad|best-buy|alternative/, 'compare'],
  [/laptop|computer|macbook|desktop|\bpc\b|monitor|server/,        'laptop'],
  [/printer|copier|scanner|toner|cartridge|fax/,                   'printer'],
  [/iphone|phone|mobile|tablet|ipad|smart-?watch/,                 'phone'],
  [/batter|lithium|alkaline|e-bike|ebike|power-?bank/,             'battery'],
  [/refrigerat|fridge|freezer|microwave|dishwasher|washer|dryer|appliance|air-condition|\bac\b|\btv\b|televis/, 'fridge'],
  [/extinguisher|smoke-detector|alarm|propane|aerosol|fire/,       'extinguisher'],
  [/fluid|paint|\boil\b|chemical|water|pfas|mercury|bulb|fluorescent|hazardous|landfill/, 'droplet'],
  [/solar|panel|energy|renewable/,                                 'solar'],
  [/electric-vehicle|\bev\b|vehicle|\bcar\b|tesla|automotive|truck/, 'car'],
  [/\bepa\b|news|report|announce|award|acquire|regulation|\bact\b|law|fine|study|university/, 'news'],
]

export function glyphFor(slug: string): string {
  const s = slug.toLowerCase()
  for (const [re, mark] of GLYPH_RULES) if (re.test(s)) return mark
  return 'recycle'
}

/**
 * "Dec 24, 2024" — built by hand rather than with toLocaleDateString, which
 * reads the runtime's locale and time zone and would therefore print a
 * different string on the build machine than in the reader's browser. That is a
 * hydration mismatch waiting to happen; UTC and a fixed table cannot drift.
 */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const

export function cardDate(iso: string | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return `${MONTHS[d.getUTCMonth()] ?? ''} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

export type CardPost = {
  /** Site-relative, e.g. /how-to-dispose-of-old-laptop/. */
  url: string
  title: string
  category?: string | undefined
  /** ISO string, or an already-formatted date for the hardcoded fallback rows. */
  date?: string | undefined
  /** Overrides the slug-derived mark. Used by the pre-import fallback list. */
  glyph?: string | undefined
}

export function PostCard({ post }: { post: CardPost }) {
  const slug = post.url.replace(/^\/|\/$/g, '')
  const mark = MARKS[post.glyph ?? glyphFor(slug)] ?? MARKS.recycle ?? []
  // A fallback row already carries "Dec 24, 2024"; a DB row carries an ISO
  // string. Anything that does not parse as a date is printed as given.
  const date = /^\d{4}-/.test(post.date ?? '') ? cardDate(post.date) : (post.date ?? '')

  return (
    /* .post-card carries the hover state — the sidebar CTA's gradient fading in
       behind the content, with the disc and the type inverting to match.
       globals.css has the reasoning.

       MOBILE — 6638:8127. The same card at 350 (the 20px gutter either side of
       a 390 frame), p24 and a 16px stack. It takes `w-full` rather than a second
       fixed number so it survives 320 and 430 as well, and the two 354px runs
       below go fluid with it. Cards are no longer a fixed 221 high either: the
       frame draws 196 for a one-line title and 219 for two, and `auto-rows` only
       applies at lg. */
    <Link
      href={href(post.url)}
      className="post-card flex w-full flex-col items-start gap-[16px] rounded-[12px] border border-line bg-white p-[24px] hover:shadow-[0px_10px_28px_0px_rgba(13,39,80,0.18)] lg:w-[410px] lg:gap-[14px] lg:p-[28px]"
    >
      <span className="post-card__disc grid size-[44px] shrink-0 place-items-center rounded-full bg-brand transition-colors">
        <svg viewBox="0 0 20 20" className="size-[20px] fill-white transition-colors" aria-hidden="true">
          {mark.map((d) => <path key={d} d={d} />)}
        </svg>
      </span>
      {post.category && (
        <span className="post-card__cat font-roboto text-[11px] font-bold uppercase leading-[1.175] tracking-[0.7px] text-brand transition-colors">
          {post.category}
        </span>
      )}
      {/*
        line-clamp, not truncation: the full title stays in the HTML, so a
        crawler and a screen reader get all of it while the card keeps the
        two-line box the frame draws. Real WordPress titles run to 90
        characters, which is three lines at 18px in 354px.
      */}
      <h3 className="post-card__title line-clamp-2 w-full font-sans text-[18px] font-medium leading-[1.3] text-heading transition-colors lg:w-[354px]">
        {post.title}
      </h3>
      {/* mt-auto, so the date row sits on the bottom edge whatever the title
          did. The grid gives every card the frame's 221px row (below), and
          without this a one-line title left its date floating in the middle of
          an otherwise empty card. */}
      <span className="mt-auto flex h-[20px] w-full items-center justify-between whitespace-nowrap lg:w-[354px]">
        <span className="post-card__date font-roboto text-[13px] leading-[1.175] text-[#a6a6a6] transition-colors">{date}</span>
        <span className="post-card__read font-roboto text-[13.5px] font-medium leading-[1.175] text-brand transition-colors">Read &rarr;</span>
      </span>
    </Link>
  )
}
