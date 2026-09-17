import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { STANDARDS } from '@/data/compliance-center'

/**
 * Standards we're held to — Figma 6389:1527. py 100, gap 50: an 820px heading
 * block, then the 1282px table (x319).
 *
 * Built as a real <table>. The frame draws it as stacked flex rows, but this is
 * genuinely tabular — a standard, what it covers, and our status against it —
 * and the row header/status relationship is worth having in the markup rather
 * than only in the pixels.
 *
 * Column widths reproduce the frame exactly: 32 left pad + 260 name + 24 gap =
 * 316; status column 143 (the widest chip) + 32 right pad = 175; the detail
 * column takes what's left, which is the 767 the frame leaves for its 760px
 * text run.
 *
 * !! THE TABLE HAS FOUR ROWS AND THE FRAME DRAWS FIVE. The missing row is
 * NAID AAA. That is a compliance decision, not a layout one — read the note
 * above STANDARDS in src/data/compliance-center.ts before adding it back.
 */
const TONE = {
  ok:   'bg-accent-soft text-accent',
  warn: 'bg-[#fef3c7] text-[#99730d]',
} as const

export function StandardsTable({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6389:1527"
      className="flex flex-col items-center gap-[50px] bg-white py-[100px]">
      {/* Heading block — 6389:1531 */}
      <div className="flex w-[820px] flex-col items-center gap-[10px] text-center">
        <Eyebrow>{STANDARDS.eyebrow}</Eyebrow>
        <h2 className="w-[820px] font-sans text-[40px] font-semibold leading-[1.3] text-black">
          {STANDARDS.heading}
        </h2>
        <p className="w-[820px] font-roboto text-[17px] leading-[1.175] text-muted">{STANDARDS.lead}</p>
      </div>

      {/* Table — 6389:1536 */}
      {/* border-separate + spacing-0: Tailwind's preflight sets border-collapse
          on every table, and a collapsed table ignores both its own border and
          the overflow-hidden that rounds its corners. */}
      <table className="w-[1282px] table-fixed border-separate border-spacing-0 overflow-hidden rounded-[12px] border border-line bg-white">
        <tbody>
          {STANDARDS.rows.map((r, i) => {
            /* In border-separate mode a <tr> border is never painted, so the
               rule between rows lives on the cells. */
            const rule = i < STANDARDS.rows.length - 1 ? 'border-b border-[#ebebeb]' : ''
            return (
            <tr key={r.name} className="h-[80px] bg-white">
              <th scope="row"
                className={`w-[316px] pl-[32px] pr-[24px] text-left align-middle font-sans text-[17px] font-medium leading-[1.3] text-heading ${rule}`}>
                {r.name}
              </th>
              <td className={`pr-[24px] align-middle ${rule}`}>
                <p className="w-[760px] font-roboto text-[14.5px] leading-[1.45] text-muted">{r.detail}</p>
              </td>
              <td className={`w-[175px] pr-[32px] text-right align-middle ${rule}`}>
                <span className={`inline-flex h-[26px] items-center whitespace-nowrap rounded-full px-[12px] font-roboto text-[10.5px] font-bold uppercase tracking-[0.4px] ${TONE[r.tone]}`}>
                  {r.status}
                </span>
              </td>
            </tr>
            )
          })}
        </tbody>
      </table>
    </Section>
  )
}
