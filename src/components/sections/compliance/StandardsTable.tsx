import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { STANDARDS } from '@/data/compliance-center'

/**
 * Standards we're held to — Figma 6389:1527, and on a phone 6674:5298 in
 * "Compliance Center - Mobile" (6638:8303, file BVtf2AOuUOcYbiMIlcKmbC).
 *
 * py 100, gap 50: an 820px heading block, then the 1282px table (x319).
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
 * !! MOBILE: THE TABLE BECOMES CARDS, NOT A SCROLLER — 6674:5304. A four-column
 * rule set cannot reflow into 350px and the frame does not ask it to: it draws
 * one #f6f6f6 card per standard, p20 / r16, the name and the status pill
 * sharing a top row and the detail underneath. So below lg the <table> and
 * <tbody> go `display: block`, each <tr> becomes a two-column grid, and the
 * three cells are placed on it explicitly — name at 1/1, pill at 2/1, detail
 * spanning row 2. The cells are still <th scope="row"> and <td>: the table
 * semantics and the row header/status relationship survive the restyle, which
 * a stack of <div>s would have thrown away. The page never scrolls sideways.
 *
 * !! THE TABLE HAS FOUR ROWS AND THE FRAME DRAWS FIVE — and the MOBILE frame
 * draws five too, 6674:5310 being "NAID AAA — Certified". That is a compliance
 * decision, not a layout one: nothing supports the claim and the Certifications
 * page already omits it (Asim, 15 Sep 2026). Read the note above STANDARDS in
 * src/data/compliance-center.ts before adding it back. The mobile frame is NOT
 * a reason to.
 */
const TONE = {
  ok:   'bg-accent-soft text-accent',
  warn: 'bg-[#fef3c7] text-[#99730d]',
} as const

export function StandardsTable({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6389:1527"
      className="flex flex-col items-start gap-[24px] bg-white px-[20px] py-[48px] lg:items-center lg:gap-[50px] lg:px-0 lg:py-[100px]">
      {/* Heading block — 6389:1531, 6674:5299..5302 on a phone (left-aligned,
          26/32 over 16/24, on a flat 24px rhythm). */}
      <div className="flex w-full flex-col items-start gap-[24px] text-left lg:w-[820px] lg:items-center lg:gap-[10px] lg:text-center">
        <Eyebrow>{STANDARDS.eyebrow}</Eyebrow>
        <h2 className="w-[820px] font-sans text-[40px] font-semibold leading-[1.3] text-black max-lg:w-full max-lg:text-[26px] max-lg:leading-[32px]">
          {STANDARDS.heading}
        </h2>
        <p className="w-[820px] font-roboto text-[17px] leading-[1.175] text-muted max-lg:w-full max-lg:text-[16px] max-lg:leading-[24px]">{STANDARDS.lead}</p>
      </div>

      {/* Table — 6389:1536 */}
      {/* border-separate + spacing-0: Tailwind's preflight sets border-collapse
          on every table, and a collapsed table ignores both its own border and
          the overflow-hidden that rounds its corners. */}
      <table className="border-separate border-spacing-0 max-lg:block max-lg:w-full lg:table lg:w-[1282px] lg:table-fixed lg:overflow-hidden lg:rounded-[12px] lg:border lg:border-line lg:bg-white">
        <tbody className="max-lg:block max-lg:space-y-[16px]">
          {STANDARDS.rows.map((r, i) => {
            /* In border-separate mode a <tr> border is never painted, so the
               rule between rows lives on the cells — and below lg there are no
               rules at all, because each row is its own card. */
            const rule = i < STANDARDS.rows.length - 1 ? 'lg:border-b lg:border-[#ebebeb]' : ''
            return (
            <tr key={r.name}
              className="items-center max-lg:grid max-lg:grid-cols-[1fr_auto] max-lg:gap-x-[12px] max-lg:gap-y-[12px] max-lg:rounded-[16px] max-lg:bg-card max-lg:px-[20px] max-lg:py-[20px] lg:h-[80px] lg:bg-white">
              <th scope="row"
                className={`text-left align-middle font-sans font-medium text-heading max-lg:col-start-1 max-lg:row-start-1 max-lg:text-[18px] max-lg:leading-[24px] lg:w-[316px] lg:pl-[32px] lg:pr-[24px] lg:text-[17px] lg:leading-[1.3] ${rule}`}>
                {r.name}
              </th>
              <td className={`align-middle max-lg:col-span-2 max-lg:col-start-1 max-lg:row-start-2 lg:pr-[24px] ${rule}`}>
                <p className="w-[760px] font-roboto text-[14.5px] leading-[1.45] text-muted max-lg:w-full max-lg:text-[14px] max-lg:leading-[21px]">{r.detail}</p>
              </td>
              <td className={`text-right align-middle max-lg:col-start-2 max-lg:row-start-1 lg:w-[175px] lg:pr-[32px] ${rule}`}>
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
