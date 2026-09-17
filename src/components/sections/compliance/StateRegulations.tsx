import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { STATE_LAW } from '@/data/compliance-center'

/**
 * Minnesota & Wisconsin law — Figma 6389:1528. py 100 on #fcfcfc, gap 50: a
 * 780px heading block, then two 629px cards on a 24px gutter (1282, x319).
 *
 * The bullet dots sit at y0 of their row in Figma, which is the top of the text
 * box rather than the first baseline; 8px down lines them up with the first
 * line of 14.5/1.55 Poppins, the same correction the other bullet lists in this
 * build use.
 */
export function StateRegulations({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6389:1528"
      className="flex flex-col items-center gap-[50px] bg-[#fcfcfc] py-[100px]">
      {/* Heading block — 6389:1572 */}
      <div className="flex w-[780px] flex-col items-center gap-[10px] text-center">
        <Eyebrow>{STATE_LAW.eyebrow}</Eyebrow>
        <h2 className="w-[780px] font-sans text-[40px] font-semibold leading-[1.3] text-black">
          {STATE_LAW.heading}
        </h2>
        <p className="w-[780px] font-roboto text-[17px] leading-[1.175] text-muted">{STATE_LAW.lead}</p>
      </div>

      {/* Cards — 6389:1577 */}
      <div className="flex items-start gap-[24px]">
        {STATE_LAW.cards.map((c) => (
          <article key={c.tag}
            className="flex w-[629px] shrink-0 flex-col items-start gap-[18px] rounded-[12px] border border-line bg-white p-[36px]">
            <span className="inline-flex h-[28px] items-center whitespace-nowrap rounded-full bg-accent-soft px-[14px] font-roboto text-[11px] font-bold uppercase tracking-[0.6px] text-accent">
              {c.tag}
            </span>
            <h3 className="w-[557px] font-sans text-[22px] font-medium leading-[1.3] text-heading">{c.title}</h3>
            <ul className="flex w-[557px] flex-col gap-[12px]">
              {c.points.map((t) => (
                <li key={t} className="flex items-start gap-[10px]">
                  <span className="mt-[8px] size-[6px] shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  <span className="w-[545px] font-poppins text-[14.5px] leading-[1.55] text-[#333]">{t}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
