import Image from 'next/image'
import { HOME_BELOW_SERVICES_SHIFT } from '@/lib/layout'
import { Box, CenterBox, Section } from '@/components/design/Frame'
import { Eyebrow, Title } from '@/components/ui/Bits'
import { TESTIMONIALS, TESTIMONIAL_STATS } from '@/data/home'

/**
 * Client's Testimonials — Figma 6024:14149 in file L79HFCNBww8pW6pPGfQi3e,
 * the four-card version of 21 Sep 2026. 1920 x 826 on #f5f5f5.
 *
 * Auto-layout in the frame: 90 above, then the heading block (95), 50, the
 * cards row (350), 50, the stats strip (121), 70 below. Built to those y's.
 *
 *   heading   eyebrow "Why Enterprises Choose Us", 16, the 40px title
 *   cards     four 300 x 350 white cards, r14, gap 22, in a 1266 row at x327.
 *             px28 py32, space-between: stars + quote on top, a rule and the
 *             reviewer at the bottom.
 *   stats     a rule, 30, four 316-wide columns of a 34px teal number over a
 *             13.5px label, rules between them.
 *
 * The three-card row with a pager (594 tall) is gone with it; the section is
 * 232 taller, and Client's Stories moves down by that (HOME_TESTIMONIALS_GROWTH).
 *
 * ===========================================================================
 * MOBILE — Figma 6613:2334 in BVtf2AOuUOcYbiMIlcKmbC, 390 x 1319
 * ===========================================================================
 * Below lg the section is px20 py48 with ONE 24px gap between every child:
 * eyebrow, title, the cards stacked full width, a rule, the stats.
 *
 *   card    350 wide, auto height, the same r14 / px28 / py32 and the same
 *           17.018/24.7 quote as desktop — but the stars and the quote are
 *           CENTRED and the two halves sit on a 20 gap instead of being pushed
 *           apart by a fixed 350 height. The reviewer block is byte-identical
 *           to the desktop one (40 disc, 12 gap, 16/12.5/10 type).
 *   stats   a 2 x 2 grid of 167-wide columns, 16 across and 28 down, number
 *           still 34px teal over a 13.5px label on a 6 gap. NO vertical rules —
 *           `border-r` is now `lg:border-r`, so below lg the width is 0.
 *
 * !! THE FRAME DRAWS THREE CARDS, THIS RENDERS FOUR. The desktop row is four
 * and `TESTIMONIALS` is four copies of one placeholder review, so the frame's
 * third-vs-fourth card is not a content decision anybody made — hiding one at
 * random would quietly drop a real Google review the day the TODO(content) in
 * src/data/home.ts is closed. Flagged rather than followed.
 *
 * `grad-card` stays on the card. :hover and :focus-within never fire on a
 * touch device and nothing in the mobile layout depends on them: every colour
 * the hover state overrides (bg-white, the quote grey, the #e6e6e6 rule, the
 * teal disc) is set explicitly in the base classes, so the untouched state is
 * the designed state.
 */
export const TESTIMONIALS_H = 826

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

      {/* Cards Row — 6554:2055 desktop, 6593:5951 et al on the phone. */}
      <Box x={327} y={235} w={1266} h={350} className="flex items-start gap-[22px] max-lg:w-full max-lg:flex-col max-lg:gap-[24px]">
        {TESTIMONIALS.map((t, i) => (
          <article key={i} className="grad-card flex h-[350px] w-[300px] shrink-0 flex-col justify-between overflow-hidden rounded-[14px] bg-white px-[28px] py-[32px] max-lg:h-auto max-lg:w-full max-lg:gap-[20px]">
            <div className="flex flex-col gap-[22px] max-lg:items-center">
              <div className="flex h-[23px] w-[112px] items-center gap-[0.5px]" aria-label="Five stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Image key={s} src="/images/icons/star.svg" alt="" width={22} height={22} className="size-[22px]" />
                ))}
              </div>
              <p className="w-[244px] font-roboto text-[17.018px] leading-[24.7px] text-[rgba(126,126,126,0.8)] max-lg:w-full max-lg:text-center">
                {t.quote}
              </p>
            </div>

            <div className="flex flex-col gap-[16px]">
              <div className="grad-card__rule h-px w-[244px] bg-[#e6e6e6] transition-colors max-lg:w-full" />
              <div className="flex w-[244px] items-start gap-[12px] max-lg:w-full">
                <span className="grad-card__disc mt-[7px] grid size-[40px] shrink-0 place-items-center rounded-full bg-brand font-sans text-[24px] font-semibold leading-none text-white transition-colors">
                  {t.name.charAt(0)}
                </span>
                <div className="flex flex-col gap-[2px]">
                  <p className="font-sans text-[16px] font-semibold leading-normal text-muted">{t.name}</p>
                  <p className="font-roboto text-[12.5px] leading-[1.3] text-[#b9b9b9]">{t.role} {t.reviews}</p>
                  <span className="mt-[2px] flex items-center gap-[10px]">
                    <Image src="/images/icons/google.svg" alt="" width={11} height={11} className="size-[11px]" />
                    <span className="font-sans text-[10px] font-semibold leading-normal text-[#505050]">Google Review</span>
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </Box>

      {/* Footer Stats — 6554:2121 desktop, 6613:2406 on the phone. */}
      <Box x={327} y={635} w={1266} h={121} className="flex flex-col items-center gap-[30px] max-lg:w-full max-lg:gap-[24px]">
        <div className="h-px w-full bg-black/15" />
        <dl className="flex w-full items-start text-center max-lg:grid max-lg:grid-cols-2 max-lg:gap-x-[16px] max-lg:gap-y-[28px]">
          {TESTIMONIAL_STATS.map((s, i) => (
            <div key={s.l} className={`flex h-[90px] w-[316px] flex-col items-center gap-[8px] max-lg:h-auto max-lg:w-full max-lg:gap-[6px] ${i < TESTIMONIAL_STATS.length - 1 ? 'border-black/15 lg:border-r' : ''}`}>
              <dt className="order-2 w-[260px] font-roboto text-[13.5px] leading-normal text-black/65 max-lg:w-full">{s.l}</dt>
              <dd className="order-1 whitespace-nowrap font-sans text-[34px] font-semibold leading-normal text-brand">{s.n}</dd>
            </div>
          ))}
        </dl>
      </Box>
    </Section>
  )
}
