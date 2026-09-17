import { Section } from '@/components/design/Frame'
import { IndustryCard, type Industry } from '@/components/ui/IndustryCard'

/**
 * All Industries grid — Figma 6246:1023. 1282 wide at x319, 722 tall.
 *
 *   pt 150   canvas top -> "All Industries" heading (y150, h60)
 *   gap 48   heading bottom (210) -> cards (258)
 *   cards    two rows of 310x226, 14px between cards, 12px between rows
 *            258 + 464 = 722 = frame height
 *
 * The heading rule is the same treatment as the /services/ category titles
 * (Figma 6142:2018): flex, gap 36, hairlines taking whatever the fixed-width
 * title leaves.
 */
export function IndustriesCatalog({
  top, height, label, heading, industries, perRow = 4,
}: {
  top: number
  height: number
  label?: string
  heading: string
  industries: Industry[]
  perRow?: number
}) {
  const rows: Industry[][] = []
  for (let i = 0; i < industries.length; i += perRow) rows.push(industries.slice(i, i + perRow))

  return (
    <Section top={top} left={319} width={1282} height={height} label={label} className="bg-white">
      <div className="flex flex-col gap-[48px] pt-[150px]">
        <div className="flex h-[60px] items-center gap-[36px]">
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
          <h2 className="flex h-[60px] w-[345px] shrink-0 items-center justify-center text-center font-sans text-[35px] font-normal leading-none text-accent">
            {heading}
          </h2>
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
        </div>

        <div className="flex flex-col gap-[12px]">
          {rows.map((row, i) => (
            <div key={i} className="flex items-center gap-[14px]">
              {row.map((ind) => <IndustryCard key={ind.t} ind={ind} />)}
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
