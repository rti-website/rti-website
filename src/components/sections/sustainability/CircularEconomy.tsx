import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { CIRCULAR } from '@/data/sustainability'

/**
 * Keeping materials in circulation — Figma 6383:1161.
 *
 * py 100 on white, one centred row (6383:1166) of 700 + 80 gutter + 502 = 1282,
 * which lands at x319 like every other content row on this page.
 *
 * The card is a single flex column at gap 18 holding the title and the four
 * steps, so the <ol> carries the same 18px gap rather than a gap of its own —
 * same spacing, better semantics for a numbered sequence.
 */
export function CircularEconomy({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6383:1161"
      className="flex flex-col items-center bg-white py-[100px]">
      <div className="flex items-start gap-[80px]">
        {/* Prose column — 6383:1167 */}
        <div className="flex w-[700px] flex-col items-start gap-[20px]">
          <Eyebrow>{CIRCULAR.eyebrow}</Eyebrow>
          <h2 className="w-[700px] font-sans text-[36px] font-semibold leading-[1.2] text-heading">
            {CIRCULAR.heading}
          </h2>
          {CIRCULAR.paragraphs.map((p) => (
            <p key={p} className="w-[700px] font-roboto text-[16px] leading-[1.6] text-muted">{p}</p>
          ))}
        </div>

        {/* Numbered steps card — 6383:1173 */}
        <div className="flex w-[502px] shrink-0 flex-col items-start gap-[18px] rounded-[12px] bg-brand-soft p-[32px]">
          <h3 className="w-[438px] font-sans text-[19px] font-medium leading-[1.3] text-heading">
            {CIRCULAR.card.title}
          </h3>
          <ol className="flex flex-col gap-[18px]">
            {CIRCULAR.card.steps.map((s, i) => (
              <li key={s} className="flex items-start gap-[14px]">
                <span className="grid size-[24px] shrink-0 place-items-center rounded-full bg-brand font-roboto text-[12px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="w-[380px] font-poppins text-[14.5px] leading-[1.4] text-[#333]">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
