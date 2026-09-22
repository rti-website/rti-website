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
    /*
     * MOBILE — 6638:8106 "Section - Latest Articles Heading" and 6638:8126
     * "Articles List", which Aqeel drew as two frames and this builds as the one
     * section it already is: px20, pt40, a 12px heading stack, then the cards
     * 16 apart with pb40. The heading block is LEFT aligned on the phone and
     * centred on the board.
     *
     * The 32px between the chip row and the first card is the frame's 24 of
     * pb on the heading frame plus 8 of pt on the list frame; it lands on the
     * grid as a 20px top margin on top of the section's own 12px gap.
     */
    <Section top={top} height={height} label="6384:1225"
      className="flex flex-col items-start gap-[12px] bg-white px-[20px] py-[40px] lg:items-center lg:gap-[44px] lg:px-0 lg:pb-[100px] lg:pt-[90px]">
      <div className="flex w-full flex-col items-start gap-[12px] text-left lg:w-[780px] lg:items-center lg:gap-[10px] lg:text-center">
        <Eyebrow>{INTRO.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[26px] font-semibold leading-[1.3] text-black lg:text-[40px]">
          {heading ?? INTRO.heading}
        </h2>
        <p className="font-roboto text-[14px] leading-[1.175] text-muted lg:text-[17px]">{INTRO.lead}</p>
      </div>

      <CategoryChips chips={chips} />

      {/* Three 410px columns on a 24px gutter, rows fixed at the frame's 221px.
          Cards STRETCH to fill the row rather than sitting at the top of it: the
          frame happens to draw a short one-line card at 198, but with real
          titles that reads as a ragged row of different-sized boxes, which Asim
          asked to even out on 17 Sep 2026. Every card is exactly 221 now.

          One column on the phone (6638:8126), 16 apart, and the rows are NOT
          fixed there — the frame itself draws 196 and 219 side by side, so the
          cards are left to size to their titles. */}
      <div className="flex w-full flex-col gap-[16px] max-lg:mt-[20px] lg:grid lg:w-[1278px] lg:auto-rows-[221px] lg:grid-cols-3 lg:gap-[24px]">
        {posts.map((p) => <PostCard key={p.url} post={p} />)}
      </div>

      <Pager page={page} count={pages} pathFor={pathFor} />
    </Section>
  )
}
