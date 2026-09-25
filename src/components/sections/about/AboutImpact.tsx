import { Section } from '@/components/design/Frame'
import { IMPACT } from '@/data/about'

/**
 * Impact numbers — Figma 6372:843. Navy-to-teal horizontal gradient, py 90,
 * gap 50; four 240px stat columns with a 60px gap (1140 total).
 *
 * MOBILE — Figma 6663:2378 ("Section - Impact Numbers" in "About Us - Mobile"
 * 6638:2224, file BVtf2AOuUOcYbiMIlcKmbC). This is the one section on the page
 * the frame genuinely REDRAWS rather than just reflows: the four-up row becomes
 * a left-aligned list, one stat per line, separated by 1px white/15 rules.
 *
 *   heading   36/1.3 centred      -> 26/32 centred
 *   lead      16/1.175 white/75   -> 15/22, unchanged colour
 *   figure    44px centred        -> 32/38, left
 *   label     14.5 white/75       -> 14/19.5 Roboto Medium, white/80, left
 *   rails     60px between cols   -> 20px above and below each row, rule between
 *
 * Still one <dl>. The rules are a border on each row rather than a `divide-*`
 * utility so the "no rule after the last row" case reads in the markup, and
 * they are switched off again at lg where the columns sit side by side.
 */
export function AboutImpact({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6372:843"
      className="flex flex-col items-center gap-[32px] bg-gradient-to-r from-navy to-[#0c4e5a] px-[20px] py-[48px] text-center lg:gap-[50px] lg:px-0 lg:py-[90px]">
      {/* The frame gives the heading, the lead and the list one flat 32px rail,
          where the board groups the first two in a 780px column 10 apart — so
          the wrapper carries the section's own gap below lg and the board's at
          lg, and the result is the same spacing on both. */}
      <div className="flex w-full flex-col items-center gap-[32px] lg:w-[780px] lg:gap-[10px]">
        <h2 className="font-sans text-[26px] font-semibold leading-[32px] text-white lg:text-[36px] lg:leading-[1.3]">{IMPACT.heading}</h2>
        <p className="font-roboto text-[15px] leading-[22px] text-white/75 lg:text-[16px] lg:leading-[1.175]">{IMPACT.lead}</p>
      </div>

      <dl className="flex w-full flex-col items-stretch text-left lg:w-auto lg:flex-row lg:items-start lg:gap-[60px] lg:text-center">
        {IMPACT.stats.map((s) => (
          <div
            key={s.l}
            className="flex w-full flex-col items-start gap-[4px] border-b border-white/15 py-[20px] first:pt-0 last:border-b-0 lg:w-[240px] lg:shrink-0 lg:items-center lg:gap-[6px] lg:border-b-0 lg:py-0"
          >
            <dt className="font-sans text-[32px] font-semibold leading-[38px] text-white lg:text-[44px] lg:leading-[1.3]">
              {/* R2v3 opens SERI's directory listing, as every R2v3 mark does. */}
              {'href' in s && s.href ? (
                <a href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={`${s.v}, ${s.l}: see Recycle Technologies in the R2 certified facility directory (opens in a new tab)`}
                  className="underline decoration-white/40 underline-offset-[6px] transition-opacity hover:opacity-80">
                  {s.v}
                </a>
              ) : s.v}
            </dt>
            <dd className="font-roboto text-[14px] font-medium leading-[19.5px] text-white/80 lg:text-[14.5px] lg:font-normal lg:leading-[1.175] lg:text-white/75">{s.l}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
