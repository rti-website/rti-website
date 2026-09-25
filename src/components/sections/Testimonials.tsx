import Image from 'next/image'
import { HOME_BELOW_SERVICES_SHIFT } from '@/lib/layout'
import { Box, CenterBox, Section } from '@/components/design/Frame'
import { Eyebrow, Title } from '@/components/ui/Bits'
import { TESTIMONIALS } from '@/data/home'

/**
 * Client's Testimonials — Figma 6024:14149 in BVtf2AOuUOcYbiMIlcKmbC as
 * redrawn by 25 Sep 2026. 1920 x 698 on #f5f5f5.
 *
 * Auto-layout in the frame: 90 above, the heading block (95), 50, the cards
 * row (393), 70 below.
 *
 *   heading   eyebrow "Why Enterprises Choose Us", 16, the 40px title
 *   cards     four 300 x 393 white cards, r14, gap 22, in a 1266 row at x327.
 *
 * WHAT CAME OUT, 25 Sep 2026 — Asim: "make the testimonial section like this,
 * remove the extra things from it". The review rail's Previous / Next, the
 * "Google rating score" line, the "Google Review" mark on each card, and the
 * four figures under the row (the frame moved figures up under Our Services;
 * see ImpactStats). The section went 904 -> 698 and everything below moved up
 * with HOME_TESTIMONIALS_GROWTH.
 *
 * THE CARDS: the first four entries of TESTIMONIALS (src/data/home.ts). Since
 * 25 Sep 2026 those are the four clients in the frame (Rachel Simmons, Marcus
 * Chen, Sarah Okonkwo, David Hartwell), word for word with their job titles,
 * on every build. Until then they showed only on `next dev` and the dev server
 * as a design preview; Asim confirmed they are new RTI clients who gave or
 * approved these words and agreed to be named, so the preview switch and its
 * note came out. The real Google reviews follow them in the data and show
 * with their date if a client entry is removed.
 *
 * MOBILE: the heading stacks over a sideways swipe row of the same cards
 * (CSS scroll-snap; there are no buttons and no script).
 */
export const TESTIMONIALS_H = 698

/**
 * How many testimonials the section shows: the frame's four cards, no rail.
 * The first four of TESTIMONIALS in src/data/home.ts; the rest stay in the
 * data for when the cards rotate again.
 */
const SHOWN = 4

/** What a card draws: a client's job title, or a Google review's date. */
type Card = { quote: string; name: string; sub: React.ReactNode; stars: number; truncated?: boolean }

/** A function, not a module constant: reviewDate() reads MONTHS, which is
 *  declared further down the file. */
function cards(): Card[] {
  return TESTIMONIALS.slice(0, SHOWN).map((t) => ({
    quote: t.quote, name: t.name, stars: t.stars, truncated: t.truncated,
    sub: t.role ?? (t.date ? <time dateTime={t.date}>{reviewDate(t.date)}</time> : null),
  }))
}

export function Testimonials() {
  return (
    <Section
      top={6739 - HOME_BELOW_SERVICES_SHIFT}
      height={TESTIMONIALS_H}
      label="6024:14149"
      className="flex flex-col items-center gap-[24px] bg-[#f5f5f5] px-[20px] py-[48px] lg:block lg:p-0"
    >
      <CenterBox y={90} w={900} className="flex flex-col items-center gap-[16px] max-lg:gap-[24px]">
        <Eyebrow>Why Enterprises Choose Us</Eyebrow>
        {/* leading-[44.7px] is unprefixed and would follow the 26px mobile
            title down, so the phone figure is restated as a max-lg override
            rather than by touching the desktop value. */}
        <Title className="text-center leading-[44.7px] max-lg:leading-[32px]">Client&rsquo;s Testimonials</Title>
      </CenterBox>

      {/* Cards Row — 6554:2055: four 300 x 393 cards, 22 apart, 1266 wide at
          x327, 50 under the heading. On a phone it is a sideways swipe row
          (CSS scroll-snap, no script), one card and a bit in view. */}
      <Box x={327} y={235} w={1266} h={393} className="max-lg:w-full">
        <div className="flex gap-[22px] max-lg:-mx-[20px] max-lg:snap-x max-lg:snap-mandatory max-lg:overflow-x-auto max-lg:px-[20px] max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden lg:h-full">
          {cards().map((t) => <ReviewCard key={t.name} t={t} />)}
        </div>
      </Box>
    </Section>
  )
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "2023-04-03" → "Apr 3, 2023". By hand, not Intl/Date: a Date parsed from an
 *  ISO day is UTC midnight, and formatting it in a US timezone prints the day
 *  before. */
function reviewDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number) as [number, number, number]
  return `${MONTHS[m - 1]} ${d}, ${y}`
}

/**
 * One review card — 6554:2056: 300 x 393, r14, px28 py32, the three parts
 * top and bottom: stars and quote above, a 244 rule over the reviewer below (a 40px
 * teal initial disc, 12 from the name over a 12.5 line). The frame's second
 * line is a job title, as drawn; a Google review shows its date there. The text
 * fades with the hover gradient (220ms, the .grad-card timing) so the two
 * never disagree mid-transition.
 * The "Google Review" mark and the rating line under the row came out on
 * 25 Sep 2026 (Asim: "remove the extra things from it as you see the figma").
 */
function ReviewCard({ t }: { t: Card }) {
  return (
    <article className="grad-card flex h-[393px] w-[300px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[14px] bg-white px-[28px] py-[32px] max-lg:h-auto max-lg:gap-[20px]">
      <div className="flex flex-col gap-[22px]">
        <div className="flex h-[23px] w-[112px] items-center gap-[0.5px]" role="img" aria-label={`Rated ${t.stars} out of 5`}>
          {Array.from({ length: t.stars }).map((_, s) => (
            <Image key={s} src="/images/icons/star.svg" alt="" width={22} height={22} className="size-[22px]" />
          ))}
        </div>
        <p className="w-[244px] font-roboto text-[17.018px] leading-[24.7px] text-[rgba(126,126,126,0.8)] transition-colors duration-[220ms]">
          {t.quote}{t.truncated ? ' …' : ''}
        </p>
      </div>

      {/* Rule and reviewer travel together, the rule 24 above the reviewer, so
          the rules line up across the row. The frame spreads three parts
          (rule in the middle) because its sample quotes fill the card; the
          real reviews are short, and a floating rule sat at a different
          height in each card. At 393 tall this puts the rule at y273, where
          the frame's first card has it. */}
      <div className="flex flex-col gap-[24px]">
      <div className="grad-card__rule h-px w-[244px] bg-[#e6e6e6] transition-colors" />

      <div className="flex w-[244px] items-center gap-[12px]">
        <span className="grad-card__disc my-[7px] grid size-[40px] shrink-0 place-items-center rounded-full bg-brand font-sans text-[24px] font-semibold uppercase leading-none text-white transition-colors" aria-hidden="true">
          {t.name.charAt(0)}
        </span>
        <div className="flex flex-col gap-[2px]">
          <p className="font-sans text-[16px] font-semibold leading-normal text-muted transition-colors duration-[220ms]">{t.name}</p>
          <p className="font-roboto text-[12.5px] leading-[1.3] text-[#b9b9b9] transition-colors duration-[220ms]">{t.sub}</p>
        </div>
      </div>
      </div>
    </article>
  )
}
