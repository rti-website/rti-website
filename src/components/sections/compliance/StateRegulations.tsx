import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { STATE_LAW } from '@/data/compliance-center'

/**
 * Minnesota & Wisconsin law — Figma 6389:1528, and on a phone 6674:5334 in
 * "Compliance Center - Mobile" (6638:8303, file BVtf2AOuUOcYbiMIlcKmbC).
 *
 * py 100 on #fcfcfc, gap 50: a 780px heading block, then two 629px cards on a
 * 24px gutter (1282, x319).
 *
 * The bullet dots sit at y0 of their row in Figma, which is the top of the text
 * box rather than the first baseline; 8px down lines them up with the first
 * line of 14.5/1.55 Poppins, the same correction the other bullet lists in this
 * build use. It lines up with the mobile 14/21 too.
 *
 * MOBILE — 6674:5340. px20 / py48 / gap24, the heading block left-aligned at
 * 26/32 over 16/24, and the two cards stacked full width on a 16px gap at
 * p24 / gap16, 20/26 title, 14/21 bullets on a 10px rhythm.
 *
 * ! The frame fills the card #fcfcfc, which is the SECTION's own colour — the
 * card would be invisible. Kept white-on-border, as drawn on the board.
 */
export function StateRegulations({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6389:1528"
      className="flex flex-col items-start gap-[24px] bg-[#fcfcfc] px-[20px] py-[48px] lg:items-center lg:gap-[50px] lg:px-0 lg:py-[100px]">
      {/* Heading block — 6389:1572 */}
      <div className="flex w-full flex-col items-start gap-[24px] text-left lg:w-[780px] lg:items-center lg:gap-[10px] lg:text-center">
        <Eyebrow>{STATE_LAW.eyebrow}</Eyebrow>
        <h2 className="w-[780px] font-sans text-[40px] font-semibold leading-[1.3] text-black max-lg:w-full max-lg:text-[26px] max-lg:leading-[32px]">
          {STATE_LAW.heading}
        </h2>
        <p className="w-[780px] font-roboto text-[17px] leading-[1.175] text-muted max-lg:w-full max-lg:text-[16px] max-lg:leading-[24px]">{STATE_LAW.lead}</p>
      </div>

      {/* Cards — 6389:1577 */}
      <div className="flex items-start gap-[24px] max-lg:w-full max-lg:flex-col max-lg:gap-[16px]">
        {STATE_LAW.cards.map((c) => (
          <article key={c.tag}
            className="flex w-[629px] shrink-0 flex-col items-start gap-[18px] rounded-[12px] border border-line bg-white p-[36px] max-lg:w-full max-lg:gap-[16px] max-lg:p-[24px]">
            <span className="inline-flex h-[28px] items-center whitespace-nowrap rounded-full bg-accent-soft px-[14px] font-roboto text-[11px] font-bold uppercase tracking-[0.6px] text-accent">
              {c.tag}
            </span>
            <h3 className="w-[557px] font-sans text-[22px] font-medium leading-[1.3] text-heading max-lg:w-full max-lg:text-[20px] max-lg:leading-[26px]">{c.title}</h3>
            <ul className="flex w-[557px] flex-col gap-[12px] max-lg:w-full max-lg:gap-[10px]">
              {c.points.map((t) => (
                <li key={t} className="flex items-start gap-[10px]">
                  <span className="mt-[8px] size-[6px] shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {/* `flex-1` rather than a width below lg: `w-full` here would
                      be the whole list, and the dot and its 10px gap would push
                      that much off the right edge. */}
                  <span className="w-[545px] font-poppins text-[14.5px] leading-[1.55] text-[#333] max-lg:w-auto max-lg:min-w-px max-lg:flex-1 max-lg:text-[14px] max-lg:leading-[21px]">{t}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
