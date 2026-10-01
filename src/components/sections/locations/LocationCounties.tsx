import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { CountyCards } from '@/components/client/CountyCards'
import { COUNTIES_DELTA_VAR } from '@/lib/layout'
import { countyCards } from '@/data/county-pages/directory'
import type { Facility } from '@/data/facilities'
import { content } from '@/lib/page-content'

/**
 * "Counties We Serve" — Figma 7079:6388 in 6744:8392 (phone 7079:6460 in
 * 6747:2787), between the FAQ and the CTA. Asim, 29 Sep 2026: "we have to add
 * the county pages in location page see the figma file like this … the 11 we
 * already make also add that in location".
 *
 * The frame draws ten counties five a row with Load More under them. The
 * cards are the state's county pages, then its city and service pages (see
 * countyCards in src/data/county-pages/directory.ts): ten at first, ten more
 * per Load More. Carver, St. Louis and Stearns, which the frame shows, have
 * no pages and are left out rather than drawn as cards that go nowhere.
 *
 * Board: py90, the heading block 780 wide (eyebrow, 36px heading, 16px lead
 * 674 wide, 10 apart), 44 to the grid, 44 to Load More: 620 with two rows.
 * Phone: py44, two a row, 64 tall, 12 across and 24 down, a full-width
 * Load More.
 */
export const COUNTIES_H = 620

/** The section's height at lg before Load More: 620 with two rows and the button. */
export function countiesHeight(cards: number): number {
  const rows = Math.ceil(Math.min(10, cards) / 5)
  return COUNTIES_H - (2 - rows) * 92 - (cards > 10 ? 0 : 92)
}

export async function LocationCounties({ top, f }: { top: number; f: Facility }) {
  const [{ DETAIL_COPY }, { DIRECTORY_COPY }] = await Promise.all([content('facilities'), content('locations-directory')])
  const copy = DETAIL_COPY.counties
  const state = f.state === 'Wisconsin' ? 'Wisconsin' : 'Minnesota'
  const cards = countyCards(state, DIRECTORY_COPY.groups)
  return (
    <Section top={top} height={`calc(${countiesHeight(cards.length)}px + var(${COUNTIES_DELTA_VAR}, 0px))`} label="7079:6388"
      className="flex flex-col items-center gap-[24px] bg-white px-[20px] py-[44px] lg:gap-[44px] lg:px-0 lg:py-[90px]">
      <div id="counties-we-serve" className="flex w-full scroll-mt-[140px] flex-col items-center gap-[10px] text-center lg:w-[780px]">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[24px] font-semibold leading-[28px] text-black lg:text-[36px] lg:leading-[normal]">{copy.heading}</h2>
        <p className="mt-[14px] font-roboto text-[15px] leading-[22px] text-[#7e7e7e] lg:mt-0 lg:w-[674px] lg:text-[16px] lg:leading-[normal]">
          {copy.lead.replace('{state}', state)}
        </p>
      </div>
      <CountyCards cards={cards} more={copy.more} />
    </Section>
  )
}
