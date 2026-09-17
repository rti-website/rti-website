import { Section } from '@/components/design/Frame'
import { ServiceTile } from '@/components/ui/ServiceTile'
import { SERVICE_GROUPS, type ServiceGroup } from '@/data/services'

/**
 * The full catalogue — Figma 6142:1559. 1282 wide at x319, 1814.83 tall.
 *
 * Built as flow, not absolute offsets. The frame is auto-layout in Figma and
 * card height depends on how the blurb wraps, so pinning the rows to hardcoded
 * y values is what made the homepage CTA land on top of its own cards. Every
 * gap below is the measured distance between two Figma nodes:
 *
 *   pt 150     canvas top -> "Recycling Services" heading (y150)
 *   gap 48     heading bottom (210)     -> cards (258)
 *   gap 48     cards bottom (713.93)    -> heading 2 (761.93)
 *   gap 48     heading 2 bottom (856.93)-> cards (904.93)
 *   gap 48     cards bottom (1402.86)   -> heading 3 (1450.86)
 *   gap 48     heading 3 bottom(1545.86)-> cards (1593.86)
 *              cards bottom             = 1814.83 = frame height
 */
export function ServicesCatalog() {
  return (
    <Section top={610} left={319} width={1282} height={1814.83} label="6142:1559" className="bg-white">
      <div className="flex flex-col gap-[48px] pt-[150px]">
        {SERVICE_GROUPS.map((g) => (
          <GroupBlock key={g.id} group={g} />
        ))}
      </div>
    </Section>
  )
}

function GroupBlock({ group }: { group: ServiceGroup }) {
  // menuOnly: live service Figma has no card for — menu only.
  // unbuilt:   no page yet, so it would link to a 404 — hidden everywhere.
  const cards = group.cards.filter((c) => !c.menuOnly && !c.unbuilt)
  return (
    <div className="flex flex-col gap-[48px]">
      <GroupHeading group={group} />
      <div className="flex flex-col gap-[14px]">
        {group.rows.map((row, i) => (
          <div
            key={i}
            className="flex w-full items-center justify-center"
            style={{ gap: row.gap }}
          >
            {cards.slice(row.from, row.to).map((card) => (
              <ServiceTile
                key={`${card.l1}-${card.l2}`}
                card={card}
                className={row.w === null ? 'flex-1 min-w-px' : 'shrink-0'}
                {...(row.w === null ? {} : { style: { width: row.w } })}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
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
