import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { Mark } from './SustainabilityMarks'
import { GOALS } from '@/data/sustainability'

/**
 * Where we're headed — Figma 6383:1164. py 100 on white, gap 50: a 780px
 * heading block, then four 302px cards on a 24px gutter (1280, x320).
 *
 * The four goals are the content doc's, not the frame's — the frame names a
 * different four. See the note above GOALS in src/data/sustainability.ts; the
 * geometry is identical either way if the frame's set is the newer thinking.
 */
export function SustainabilityGoals({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6383:1164"
      className="flex flex-col items-center gap-[50px] bg-white py-[100px]">
      {/* Heading block — 6383:1236 */}
      <div className="flex w-[780px] flex-col items-center gap-[10px] text-center">
        <Eyebrow>{GOALS.eyebrow}</Eyebrow>
        <h2 className="w-[780px] font-sans text-[40px] font-semibold leading-[1.3] text-black">{GOALS.heading}</h2>
        <p className="w-[780px] font-roboto text-[17px] leading-[1.175] text-muted">{GOALS.lead}</p>
      </div>

      {/* Cards — 6383:1241 */}
      <div className="flex items-start gap-[24px]">
        {GOALS.cards.map((c) => (
          <article key={c.title}
            className="flex w-[302px] shrink-0 flex-col items-start gap-[14px] rounded-[12px] bg-brand-soft p-[28px]">
            <span className="grid size-[44px] shrink-0 place-items-center rounded-full bg-brand fill-white">
              <Mark glyph={c.glyph} size={20} />
            </span>
            <h3 className="w-[246px] font-sans text-[17px] font-medium leading-[1.3] text-heading">{c.title}</h3>
            <p className="w-[246px] font-roboto text-[14px] leading-[1.55] text-muted">{c.body}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
