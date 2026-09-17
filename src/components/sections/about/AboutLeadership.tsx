import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { LEADERSHIP } from '@/data/about'

/** Leadership — Figma 6372:844. One centred 900px column, py 100, gap 20. */
export function AboutLeadership({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6372:844"
      className="flex flex-col items-center bg-white py-[100px]">
      <div className="flex w-[900px] flex-col items-center gap-[20px] text-center">
        <Eyebrow>{LEADERSHIP.eyebrow}</Eyebrow>
        <h2 className="w-[780px] font-sans text-[36px] font-semibold leading-[1.3] text-heading">{LEADERSHIP.heading}</h2>
        <p className="w-[780px] font-roboto text-[16px] leading-[1.6] text-muted">{LEADERSHIP.body}</p>
        <ul className="flex items-start gap-[16px] pt-[12px]">
          {LEADERSHIP.pills.map((p) => (
            <li key={p} className="flex h-[44px] items-center whitespace-nowrap rounded-full bg-brand-soft px-[20px] font-sans text-[14px] font-medium text-brand">
              {p}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
