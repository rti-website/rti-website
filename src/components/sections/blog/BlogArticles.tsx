import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { PostCard, type CardPost } from '@/components/ui/PostCard'
import { CategoryChips, type Chip } from '@/components/ui/CategoryChips'
import { Pager } from '@/components/ui/Pager'
import { INTRO } from '@/data/blog'

/**
 * Latest articles — Figma 6384:1225. pt 90, pb 100, 44px between the heading
 * block, the category chips and the grid.
 *
 * No client component any more. The chips became links when the list became
 * paginated (lib/blog-index.ts explains), so this whole section — heading,
 * chips, twelve cards and the pager — is server-rendered and ships no JS.
 *
 * THE HEIGHT IS COMPUTED, NOT MEASURED. Every other section in this build hands
 * `Canvas` a number read off the frame, which works because a designer decided
 * how tall it is. This one cannot: the last page of the archive has fewer cards
 * than the rest. So the geometry is written down below as the parts it is made
 * of, and `blogListHeight` adds them up. The arithmetic is checked against the
 * measured original: ten cards and no pager gives 1398, which is exactly the
 * number `scripts/measure-sections.mjs --route blog` produced before.
 */

/** Every vertical number in 6384:1225, in design px. */
const G = {
  padTop: 90,
  /** Eyebrow 34 + 10 + h2 40x1.3 + 10 + lead 17x1.175. */
  heading: 126,
  gap: 44,
  chips: 38,
  card: 221,
  cardGap: 24,
  pager: 44,
  padBottom: 100,
} as const

export function blogListHeight(cards: number, withPager: boolean): number {
  const rows = Math.ceil(cards / 3)
  const grid = rows > 0 ? rows * G.card + (rows - 1) * G.cardGap : 0
  return (
    G.padTop
    + G.heading + G.gap
    + G.chips + G.gap
    + grid
    + (withPager ? G.gap + G.pager : 0)
    + G.padBottom
  )
}

export function BlogArticles({
  top, height, posts, chips, page, pages, pathFor, heading,
}: {
  top: number
  height: number
  posts: CardPost[]
  chips: Chip[]
  page: number
  pages: number
  pathFor: (n: number) => string
  /** Overridden on page 2 and beyond so the H2 is not the same on 26 pages. */
  heading?: string | undefined
}) {
  return (
    <Section top={top} height={height} label="6384:1225"
      className="flex flex-col items-center gap-[44px] bg-white pb-[100px] pt-[90px]">
      <div className="flex w-[780px] flex-col items-center gap-[10px] text-center">
        <Eyebrow>{INTRO.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[40px] font-semibold leading-[1.3] text-black">
          {heading ?? INTRO.heading}
        </h2>
        <p className="font-roboto text-[17px] leading-[1.175] text-muted">{INTRO.lead}</p>
      </div>

      <CategoryChips chips={chips} />

      {/* Three 410px columns on a 24px gutter, rows fixed at the frame's 221px.
          Cards STRETCH to fill the row rather than sitting at the top of it: the
          frame happens to draw a short one-line card at 198, but with real
          titles that reads as a ragged row of different-sized boxes, which Asim
          asked to even out on 17 Sep 2026. Every card is exactly 221 now. */}
      <div className="grid w-[1278px] auto-rows-[221px] grid-cols-3 gap-[24px]">
        {posts.map((p) => <PostCard key={p.url} post={p} />)}
      </div>

      <Pager page={page} count={pages} pathFor={pathFor} />
    </Section>
  )
}
