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
 *
 * MOBILE — Figma 6638:10308. 390 wide: px20 / py48 on the same gradient, gap
 * 32, everything LEFT-aligned, and the four stats as a 2x2 grid (16 across,
 * 24 down) at 34px rather than one 1140px row. The note bar goes full width at
 * p20 with its sentence left-aligned.
 *
 * !! The mobile frame relabels stat 2 "R2v3-Scoped Facilities", which is the
 * same overstatement of the Wisconsin certification the desktop frame makes.
 * The doc's "Licensed Facilities" is kept. See TODO_FOR_DESIGN.
 */
export function ImpactReporting({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6383:1163"
      className="flex flex-col items-start gap-[32px] px-[20px] py-[48px] lg:items-center lg:gap-[50px] lg:px-0 lg:py-[90px]"
      style={{ backgroundImage: 'linear-gradient(90deg, #0b1f3a 0%, #0c4e5a 100%)' }}>
      {/* Heading block — 6383:1218 / 6638:10309..10310 */}
      <div className="flex w-full flex-col items-start gap-[32px] lg:w-[780px] lg:items-center lg:gap-[10px] lg:text-center">
        <h2 className="w-full font-sans text-[26px] font-semibold leading-[32px] text-white lg:w-[780px] lg:text-[36px] lg:leading-[1.3]">
          {REPORTING.heading}
        </h2>
        <p className="w-full font-roboto text-[16px] leading-[24px] text-white/75 lg:w-[780px] lg:leading-[1.175]">{REPORTING.lead}</p>
      </div>

      {/* Stats — 6383:1221 / 6638:10311, a 2x2 grid on the phone. */}
      <div className="grid w-full grid-cols-2 gap-x-[16px] gap-y-[24px] text-left lg:flex lg:w-auto lg:items-start lg:gap-x-[60px] lg:gap-y-[60px] lg:text-center">
        {REPORTING.stats.map((s) => (
          <div key={s.label} className="flex min-w-0 flex-col items-start gap-[6px] lg:w-[240px] lg:items-center">
            <p className="w-full font-sans text-[34px] font-semibold leading-[1.3] text-white lg:w-[240px] lg:text-[40px]">{s.value}</p>
            <p className="w-full font-roboto text-[13.5px] leading-[1.175] text-white/75 lg:w-[240px] lg:text-[14px]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Note bar — 6383:1234 / 6638:10326 */}
      <div className="flex min-h-[60px] w-full items-center rounded-[12px] bg-white/10 px-[20px] py-[20px] lg:w-auto lg:justify-center lg:px-[28px] lg:py-[18px]">
        <p className="w-full font-roboto text-[14.5px] leading-[22px] text-white/90 lg:w-[700px] lg:text-center lg:leading-[1.175]">
          {REPORTING.note}
        </p>
      </div>
    </Section>
  )
}
