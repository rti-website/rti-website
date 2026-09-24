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
 *
 * MOBILE — Figma 6638:10158 ("Sustainability & Environmental Impact - Mobile"
 * 6638:8275). 390 wide: px20 / py48, a flat 24px gap that the prose column
 * joins rather than nesting inside, heading 28/35 and prose 15/23. The loop
 * card goes full width on #f6f6f6 at r16 / p24 with a 20px gap and its step
 * text filling the row instead of a fixed 380.
 */
export function CircularEconomy({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6383:1161"
      className="flex flex-col items-start gap-[24px] bg-white px-[20px] py-[48px] lg:items-center lg:gap-0 lg:px-0 lg:py-[100px]">
      {/* One row at lg; below it the prose column and the card are two more
          items in the section's own 24px column. */}
      <div className="flex items-start gap-[80px] max-lg:contents">
        {/* Prose column — 6383:1167 / 6638:10159..10163 */}
        <div className="flex w-full flex-col items-center gap-[24px] text-center lg:w-[700px] lg:items-start lg:gap-[20px] lg:text-left">
          <Eyebrow>{CIRCULAR.eyebrow}</Eyebrow>
          <h2 className="w-full font-sans text-[28px] font-semibold leading-[35px] text-heading lg:w-[700px] lg:text-[36px] lg:leading-[1.2]">
            {CIRCULAR.heading}
          </h2>
          {CIRCULAR.paragraphs.map((p) => (
            <p key={p} className="w-full font-roboto text-[15px] leading-[23px] text-muted lg:w-[700px] lg:text-[16px] lg:leading-[1.6]">{p}</p>
          ))}
        </div>

        {/* Numbered steps card — 6383:1173 / 6638:10164 */}
        <div className="flex w-full flex-col items-start gap-[20px] rounded-[16px] bg-card p-[24px] lg:w-[502px] lg:shrink-0 lg:gap-[18px] lg:rounded-[12px] lg:bg-brand-soft lg:p-[32px]">
          <h3 className="w-full font-sans text-[19px] font-medium leading-[25px] text-heading lg:w-[438px] lg:leading-[1.3]">
            {CIRCULAR.card.title}
          </h3>
          <ol className="flex w-full flex-col gap-[20px] lg:w-auto lg:gap-[18px]">
            {CIRCULAR.card.steps.map((s, i) => (
              <li key={s} className="flex items-start gap-[14px]">
                <span className="grid size-[24px] shrink-0 place-items-center rounded-full bg-brand font-roboto text-[12px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1 font-poppins text-[14px] leading-[20px] text-[#333] lg:w-[380px] lg:flex-none lg:text-[14.5px] lg:leading-[1.4]">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
