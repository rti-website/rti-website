import { Section } from '@/components/design/Frame'
import { IMPACT } from '@/data/about'

/**
 * Impact numbers — Figma 6372:843. Navy-to-teal horizontal gradient, py 90,
 * gap 50; four 240px stat columns with a 60px gap (1140 total).
 */
export function AboutImpact({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6372:843"
      className="flex flex-col items-center gap-[50px] bg-gradient-to-r from-navy to-[#0c4e5a] py-[90px] text-center">
      <div className="flex w-[780px] flex-col items-center gap-[10px]">
        <h2 className="font-sans text-[36px] font-semibold leading-[1.3] text-white">{IMPACT.heading}</h2>
        <p className="font-roboto text-[16px] leading-[1.175] text-white/75">{IMPACT.lead}</p>
      </div>

      <dl className="flex items-start gap-[60px]">
        {IMPACT.stats.map((s) => (
          <div key={s.l} className="flex w-[240px] shrink-0 flex-col items-center gap-[6px]">
            <dt className="font-sans text-[44px] font-semibold leading-[1.3] text-white">{s.v}</dt>
            <dd className="font-roboto text-[14.5px] leading-[1.175] text-white/75">{s.l}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
