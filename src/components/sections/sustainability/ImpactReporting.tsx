import { Section } from '@/components/design/Frame'
import { REPORTING } from '@/data/sustainability'

/**
 * Environmental impact reporting — Figma 6383:1163. py 90, gap 50, on a
 * left-to-right navy-to-teal gradient (#0b1f3a → #0c4e5a). A 780px heading
 * block, four 240px stat columns on a 60px gutter (1140, x390), then the
 * note bar.
 *
 * The note frame is drawn 60px tall with the text clipped; built at min-height
 * 60 so the sentence wraps instead of being cut. The stat labels are the doc's
 * wording — see the note above REPORTING in src/data/sustainability.ts for why
 * stat 2 follows the doc and stat 1 follows the frame.
 */
export function ImpactReporting({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6383:1163"
      className="flex flex-col items-center gap-[50px] py-[90px]"
      style={{ backgroundImage: 'linear-gradient(90deg, #0b1f3a 0%, #0c4e5a 100%)' }}>
      {/* Heading block — 6383:1218 */}
      <div className="flex w-[780px] flex-col items-center gap-[10px] text-center">
        <h2 className="w-[780px] font-sans text-[36px] font-semibold leading-[1.3] text-white">
          {REPORTING.heading}
        </h2>
        <p className="w-[780px] font-roboto text-[16px] leading-[1.175] text-white/75">{REPORTING.lead}</p>
      </div>

      {/* Stats — 6383:1221 */}
      <div className="flex items-start gap-[60px] text-center">
        {REPORTING.stats.map((s) => (
          <div key={s.label} className="flex w-[240px] flex-col items-center gap-[6px]">
            <p className="w-[240px] font-sans text-[40px] font-semibold leading-[1.3] text-white">{s.value}</p>
            <p className="w-[240px] font-roboto text-[14px] leading-[1.175] text-white/75">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Note bar — 6383:1234 */}
      <div className="flex min-h-[60px] items-center justify-center rounded-[12px] bg-white/10 px-[28px] py-[18px]">
        <p className="w-[700px] text-center font-roboto text-[14.5px] leading-[1.175] text-white/90">
          {REPORTING.note}
        </p>
      </div>
    </Section>
  )
}
