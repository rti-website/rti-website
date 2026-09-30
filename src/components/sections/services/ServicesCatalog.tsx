import { Section } from '@/components/design/Frame'
import { ServicePhotoCard } from '@/components/ui/ServicePhotoCard'
import { SERVICE_GROUPS, type ServiceGroup } from '@/data/services'
import { content } from '@/lib/page-content'

/**
 * The full catalogue — Figma 6142:1559 (file BVtf2AOuUOcYbiMIlcKmbC, redrawn
 * by 30 Sep 2026), 1282 wide at x319.
 *
 * Laid out as the 30 Sep 2026 redraw below describes (see the note above
 * CARD_W). Built as flow, not absolute offsets.
 *
 * MOBILE — Figma 6638:8546 "Our Services Content" in file BVtf2AOuUOcYbiMIlcKmbC.
 * px20 / pt32 / pb8, the three groups stacked 32 apart, each one a plain
 * heading over a single column of full-width cards 16 apart. The cards need
 * nothing here: ServicePhotoCard is already `w-full lg:w-[261px]`. What did
 * need doing is the widths and gaps around it: they are custom properties,
 * read only by `lg:` utilities, so the phone is a plain single column.
 *
 * NOT BUILT: the frame opens the section with a "Chips Scroll" rail (6638:8547)
 * — three gradient/outline chips carrying the group names and an icon each.
 * It has no desktop counterpart, needs three icon assets that are not in the
 * repo, and would put a second copy of all three headings in the DOM. Flagged
 * for Aqeel/Asim rather than invented here.
 */
/*
 * 30 SEP 2026 — the redrawn frame (6142:1559 in file BVtf2AOuUOcYbiMIlcKmbC).
 * Asim: "make the design like the figma", with Airbag Recycling, Phone
 * Shredding and the Electronic Recycling Kit on the page. The three groups
 * now stack full width, the cards at full size (261 x 374, no zoom) and with
 * the homepage's hover reveal:
 *
 *   Recycling Services        heading 60, 48, four a row (gap 20) and the
 *                             rest centred under them, rows 48 apart
 *   Destruction & Shredding   48 under that: heading 95, 48, four a row
 *                             (gap 14), centred
 *   Recycling Programs        48 under that: heading 95, 48, the cards
 *                             centred, gap 14
 *
 * 150 above the first heading. With six, four and two cards that is the
 * frame's 2184. CATALOG_H adds the same flow up from the data, so a card
 * added or taken away moves everything under the catalogue.
 */
const CARD_W = 261
const CARD_H = 374
const PT = 150
const BLOCK_GAP = 48
const WIDE_W = 1282
const PER_ROW = 4
/** Across and down, per group: the frame's gaps. */
const GAPS: Record<string, { x: number; y: number }> = {
  recycling: { x: 20, y: 48 },
  destruction: { x: 14, y: 48 },
  programs: { x: 14, y: 48 },
}

function visible(group: ServiceGroup) {
  // unbuilt: no page yet, so it would link to a 404 — hidden everywhere.
  // menuOnly: a service kept in the header menu but off the cards.
  return group.cards.filter((c) => !c.menuOnly && !c.unbuilt)
}

/** The frame names its three blocks; a missing group is a build error, not a blank. */
function group(id: string, groups: ServiceGroup[] = SERVICE_GROUPS): ServiceGroup {
  const g = groups.find((x) => x.id === id)
  if (!g) throw new Error(`ServicesCatalog: no service group "${id}" in src/data/services.ts`)
  return g
}
/*
 * The layout below is measured from the groups as written in src/data (card
 * counts and heading boxes are configuration, not copy). What renders comes
 * from the admin's edited copy, found by the same ids, inside the component.
 */
const ORDER = ['recycling', 'destruction', 'programs'] as const

function blockH(g: ServiceGroup): number {
  const rows = Math.max(1, Math.ceil(visible(g).length / PER_ROW))
  const gap = GAPS[g.id] ?? GAPS.destruction!
  return g.headingH + BLOCK_GAP + rows * CARD_H + (rows - 1) * gap.y
}

export const CATALOG_H = PT + ORDER.map((id) => blockH(group(id))).reduce((a, b) => a + b, 0) + (ORDER.length - 1) * BLOCK_GAP

export async function ServicesCatalog({ top = 610 }: { top?: number } = {}) {
  const { SERVICE_GROUPS: groups } = await content('services')
  return (
    <Section
      top={top} left={319} width={WIDE_W} height={CATALOG_H} label="6142:1559"
      className="bg-white px-[20px] pb-[8px] pt-[32px] lg:p-0"
    >
      <div
        className="flex flex-col gap-[32px] lg:gap-[var(--cat-block)] lg:pt-[var(--cat-pt)]"
        style={{ '--cat-pt': `${PT}px`, '--cat-block': `${BLOCK_GAP}px` } as React.CSSProperties}
      >
        {ORDER.map((id) => {
          const g = group(id, groups)
          const gap = GAPS[id] ?? GAPS.destruction!
          return (
            /* 6142:2018 over 6142:1587, 6142:1653, 6142:1688; one column of
               full-width cards on the phone (6638:8568 / 8681 / 8705). */
            <div key={id} className="flex flex-col gap-[16px] lg:gap-[var(--cat-block)]">
              <GroupHeading group={g} />
              <div
                className="mx-auto flex w-full flex-col gap-[16px] lg:w-[var(--row-w)] lg:flex-row lg:flex-wrap lg:justify-center lg:gap-x-[var(--gx)] lg:gap-y-[var(--gy)]"
                style={{ '--row-w': `${PER_ROW * CARD_W + (PER_ROW - 1) * gap.x}px`, '--gx': `${gap.x}px`, '--gy': `${gap.y}px` } as React.CSSProperties}
              >
                {visible(g).map((card) => <ServicePhotoCard key={card.href} card={card} reveal />)}
              </div>
            </div>
          )
        })}
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
      <h2 className="block w-full text-center font-inter text-[20px] font-bold leading-normal text-black lg:flex lg:h-[var(--gh-h)] lg:w-[var(--gh-w)] lg:shrink-0 lg:items-center lg:justify-center lg:text-center lg:font-sans lg:text-[35px] lg:font-normal lg:leading-none lg:text-accent">
        {group.heading}
      </h2>
      <span aria-hidden="true" className="hidden h-px flex-1 bg-line lg:block" />
    </div>
  )
}
