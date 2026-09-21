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

export function ServicesCatalog({ top = 610 }: { top?: number } = {}) {
  return (
    <Section top={top} left={319} width={WIDE_W} height={CATALOG_H} label="6142:1559" className="bg-white">
      <div className="flex flex-col" style={{ paddingTop: PT, gap: BLOCK_GAP }}>
        {/* Recycling Services — 6142:2018 over 6142:1587 */}
        <div className="flex flex-col" style={{ gap: BLOCK_GAP }}>
          <GroupHeading group={RECYCLING} />
          <div className="flex w-full items-start justify-between">
            {visible(RECYCLING).map((card) => <ServicePhotoCard key={card.href} card={card} scale={SCALE} />)}
          </div>
        </div>

        {/* Destruction & Shredding beside Recycling Programs — 6593:5943 */}
        <div className="flex items-start" style={{ gap: COL_GAP }}>
          <div className="flex shrink-0 flex-col" style={{ width: LEFT_W, gap: BLOCK_GAP }}>
            <GroupHeading group={DESTRUCTION} />
            <div className="flex flex-wrap" style={{ gap: LEFT_GAP }}>
              {visible(DESTRUCTION).map((card) => <ServicePhotoCard key={card.href} card={card} scale={SCALE} />)}
            </div>
          </div>
          <div className="flex shrink-0 flex-col" style={{ width: RIGHT_W, gap: BLOCK_GAP }}>
            <GroupHeading group={PROGRAMS} />
            <div className="flex flex-wrap justify-center" style={{ gap: LEFT_GAP }}>
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
 */
function GroupHeading({ group }: { group: ServiceGroup }) {
  return (
    <div className="flex items-center gap-[36px]" style={{ height: group.headingH }}>
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
      <h2
        className="flex shrink-0 items-center justify-center text-center font-sans text-[35px] font-normal leading-none text-accent"
        style={{ width: group.headingW, height: group.headingH }}
      >
        {group.heading}
      </h2>
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
    </div>
  )
}

// Keep the unused-width guard honest: five cards must fit the wide row.
if (5 * CARD_W > WIDE_W) throw new Error('ServicesCatalog: five cards no longer fit the 1282 row')
