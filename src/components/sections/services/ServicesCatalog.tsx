import { Section } from '@/components/design/Frame'
import { ServicePhotoCard } from '@/components/ui/ServicePhotoCard'
import { SERVICE_GROUPS, type ServiceGroup } from '@/data/services'

/**
 * The full catalogue — Figma 6142:1559 in file drzg9BI08Dy8eWZNBfXBzD (the
 * 21 Sep 2026 redraw), 1282 wide at x319.
 *
 * The homepage's photo cards (ServicePhotoCard) at 0.9172 scale — 239.4 x
 * 343.05 — in the frame's arrangement:
 *
 *   Recycling Services        full width: heading, 48, five cards spread
 *                             across the 1282 (gap 21.25)
 *   Destruction & Shredding   a 746.2 column: heading, 48, three per row,
 *                             gap 14
 *   Recycling Programs        a 487.8 column beside it (48 between): heading,
 *                             48, its card centred
 *
 * Built as flow, not absolute offsets. The gaps are the frame's: 150 above
 * the first heading, 48 between every heading and its cards and between the
 * two blocks. A fourth Destruction card would wrap onto a second row of that
 * column (Phone Shredding did, until Asim took it off the page — see its row
 * in src/data/services.ts).
 *
 * CATALOG_H is that flow added up, so the services page can place what
 * follows without anyone measuring a screenshot.
 *
 * MOBILE — Figma 6638:8546 "Our Services Content" in file BVtf2AOuUOcYbiMIlcKmbC.
 * px20 / pt32 / pb8, the three groups stacked 32 apart, each one a plain
 * heading over a single column of full-width cards 16 apart. The cards need
 * nothing here: ServicePhotoCard is already `w-full lg:w-[261px]`. What did
 * need doing is the INLINE widths and gaps around it — `style={{ width: 746.2 }}`
 * and `style={{ gap: 48 }}` apply at every viewport, so they are custom
 * properties now, read only by an `lg:` utility.
 *
 * NOT BUILT: the frame opens the section with a "Chips Scroll" rail (6638:8547)
 * — three gradient/outline chips carrying the group names and an icon each.
 * It has no desktop counterpart, needs three icon assets that are not in the
 * repo, and would put a second copy of all three headings in the DOM. Flagged
 * for Aqeel/Asim rather than invented here.
 */
const SCALE = 239.4 / 261
const CARD_W = 261 * SCALE
const CARD_H = 374 * SCALE
const PT = 150
const BLOCK_GAP = 48
const COL_GAP = 48
const WIDE_W = 1282
const LEFT_W = 746.2
const RIGHT_W = 487.8
const LEFT_GAP = 14
const LEFT_PER_ROW = 3

function visible(group: ServiceGroup) {
  // menuOnly: live service Figma has no card for — menu only.
  // unbuilt:   no page yet, so it would link to a 404 — hidden everywhere.
  return group.cards.filter((c) => !c.menuOnly && !c.unbuilt)
}

/** The frame names its three blocks; a missing group is a build error, not a blank. */
function group(id: string): ServiceGroup {
  const g = SERVICE_GROUPS.find((x) => x.id === id)
  if (!g) throw new Error(`ServicesCatalog: no service group "${id}" in src/data/services.ts`)
  return g
}
const RECYCLING = group('recycling')
const DESTRUCTION = group('destruction')
const PROGRAMS = group('programs')

const LEFT_ROWS = Math.ceil(visible(DESTRUCTION).length / LEFT_PER_ROW)
const LEFT_CARDS_H = LEFT_ROWS * CARD_H + (LEFT_ROWS - 1) * LEFT_GAP
const RIGHT_ROWS = Math.ceil(visible(PROGRAMS).length / 2)
const RIGHT_CARDS_H = RIGHT_ROWS * CARD_H + (RIGHT_ROWS - 1) * LEFT_GAP

const WIDE_H = RECYCLING.headingH + BLOCK_GAP + CARD_H
const PAIR_H = Math.max(
  DESTRUCTION.headingH + BLOCK_GAP + LEFT_CARDS_H,
  PROGRAMS.headingH + BLOCK_GAP + RIGHT_CARDS_H,
)
export const CATALOG_H = PT + WIDE_H + BLOCK_GAP + PAIR_H

/**
 * Every measurement the Figma board asks for, as custom properties. They used
 * to be inline `style={{ width }}` / `style={{ gap }}`, which no media query
 * can switch off — 746.2px of column on a 350px screen. Only `lg:` utilities
 * read these, so below lg the same markup is a plain single column.
 */
const BOARD = {
  '--cat-pt': `${PT}px`,
  '--cat-block': `${BLOCK_GAP}px`,
  '--cat-col': `${COL_GAP}px`,
  '--cat-card': `${LEFT_GAP}px`,
  '--cat-left': `${LEFT_W}px`,
  '--cat-right': `${RIGHT_W}px`,
} as React.CSSProperties

export function ServicesCatalog({ top = 610 }: { top?: number } = {}) {
  return (
    <Section
      top={top} left={319} width={WIDE_W} height={CATALOG_H} label="6142:1559"
      className="bg-white px-[20px] pb-[8px] pt-[32px] lg:p-0"
    >
      <div
        className="flex flex-col gap-[32px] lg:gap-[var(--cat-block)] lg:pt-[var(--cat-pt)]"
        style={BOARD}
      >
        {/* Recycling Services — 6142:2018 over 6142:1587; 6638:8568 on the phone. */}
        <div className="flex flex-col gap-[16px] lg:gap-[var(--cat-block)]">
          <GroupHeading group={RECYCLING} />
          <div className="flex w-full flex-col gap-[16px] lg:flex-row lg:items-start lg:justify-between lg:gap-0">
            {visible(RECYCLING).map((card) => <ServicePhotoCard key={card.href} card={card} scale={SCALE} />)}
          </div>
        </div>

        {/* Destruction & Shredding beside Recycling Programs — 6593:5943.
            One under the other on a phone: 6638:8681 then 6638:8705. */}
        <div className="flex flex-col gap-[32px] lg:flex-row lg:items-start lg:gap-[var(--cat-col)]">
          <div className="flex w-full flex-col gap-[16px] lg:w-[var(--cat-left)] lg:shrink-0 lg:gap-[var(--cat-block)]">
            <GroupHeading group={DESTRUCTION} />
            <div className="flex flex-col gap-[16px] lg:flex-row lg:flex-wrap lg:gap-[var(--cat-card)]">
              {visible(DESTRUCTION).map((card) => <ServicePhotoCard key={card.href} card={card} scale={SCALE} />)}
            </div>
          </div>
          <div className="flex w-full flex-col gap-[16px] lg:w-[var(--cat-right)] lg:shrink-0 lg:gap-[var(--cat-block)]">
            <GroupHeading group={PROGRAMS} />
            <div className="flex flex-col gap-[16px] lg:flex-row lg:flex-wrap lg:justify-center lg:gap-[var(--cat-card)]">
              {visible(PROGRAMS).map((card) => <ServicePhotoCard key={card.href} card={card} scale={SCALE} />)}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

/**
 * The rule-flanked green title — Figma 6142:2018 / 2028 / 2038.
 * Flex, gap 36, hairlines take whatever the fixed-width title leaves.
 *
 * The mobile frames (6638:8569 / 8682 / 8706) drop the rules and set the title
 * left, full width, Inter Bold 20 on black — not centred IBM Plex 35 in accent
 * green. So the hairlines are hidden below lg and the h2 carries two skins.
 * Its Figma width and height are custom properties for the same reason the
 * block's are: an inline `width` would follow it onto the phone.
 */
function GroupHeading({ group }: { group: ServiceGroup }) {
  return (
    <div
      className="flex items-center gap-[36px] lg:h-[var(--gh-h)]"
      style={{ '--gh-h': `${group.headingH}px`, '--gh-w': `${group.headingW}px` } as React.CSSProperties}
    >
      <span aria-hidden="true" className="hidden h-px flex-1 bg-line lg:block" />
      <h2 className="block w-full font-inter text-[20px] font-bold leading-normal text-black lg:flex lg:h-[var(--gh-h)] lg:w-[var(--gh-w)] lg:shrink-0 lg:items-center lg:justify-center lg:text-center lg:font-sans lg:text-[35px] lg:font-normal lg:leading-none lg:text-accent">
        {group.heading}
      </h2>
      <span aria-hidden="true" className="hidden h-px flex-1 bg-line lg:block" />
    </div>
  )
}

// Keep the unused-width guard honest: five cards must fit the wide row.
if (5 * CARD_W > WIDE_W) throw new Error('ServicesCatalog: five cards no longer fit the 1282 row')
