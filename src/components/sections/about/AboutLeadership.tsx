import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { LEADERSHIP } from '@/data/about'

/**
 * Leadership — Figma 6372:844. One centred 900px column, py 100, gap 20.
 *
 * MOBILE — Figma 6665:2350 ("Section - Leadership" in "About Us - Mobile"
 * 6638:2224, file BVtf2AOuUOcYbiMIlcKmbC). px20 / py48, the same centred
 * column at gap 24, heading 28/34 and lead 15/22 — and the three pills go from
 * a 16-gap row to a 12-gap stack of full-width plates, px20 / py10 rather than
 * a fixed 44px bar.
 */
export function AboutLeadership({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6372:844"
      className="flex flex-col items-center bg-white px-[20px] py-[48px] lg:px-0 lg:py-[100px]">
      <div className="flex w-full flex-col items-center gap-[24px] text-center lg:w-[900px] lg:gap-[20px]">
        <Eyebrow>{LEADERSHIP.eyebrow}</Eyebrow>
        <h2 className="w-full font-sans text-[28px] font-semibold leading-[34px] text-heading lg:w-[780px] lg:text-[36px] lg:leading-[1.3]">{LEADERSHIP.heading}</h2>
        <p className="w-full font-roboto text-[15px] leading-[22px] text-muted lg:w-[780px] lg:text-[16px] lg:leading-[1.6]">{LEADERSHIP.body}</p>
        <ul className="flex w-full flex-col items-stretch gap-[12px] lg:w-auto lg:flex-row lg:items-start lg:gap-[16px] lg:pt-[12px]">
          {LEADERSHIP.pills.map((p) => (
            <li key={p} className="flex items-center justify-center whitespace-nowrap rounded-full bg-brand-soft px-[20px] py-[10px] font-sans text-[14px] font-medium text-brand lg:h-[44px] lg:py-0">
              {p}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
