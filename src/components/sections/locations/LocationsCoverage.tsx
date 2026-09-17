import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { FactsCard } from '@/components/ui/FactsCard'
import { COVERAGE } from '@/data/locations'

/**
 * Coverage note — Figma 6377:968. The same two-column shape as the About Us
 * story section: a 700px prose column and the 502px teal facts card with an
 * 80px gutter, inside 100px of section padding.
 */
export function LocationsCoverage({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6377:968"
      className="flex flex-col items-center bg-[#fcfcfc] py-[100px]">
      <div className="flex w-[1282px] items-start gap-[80px]">
        <div className="flex w-[700px] shrink-0 flex-col items-start gap-[20px]">
          <Eyebrow>{COVERAGE.eyebrow}</Eyebrow>
          <h2 className="font-sans text-[36px] font-semibold leading-[1.2] text-heading">{COVERAGE.heading}</h2>
          {COVERAGE.body.map((p) => (
            <p key={p} className="font-roboto text-[16px] leading-[1.6] text-muted">{p}</p>
          ))}
        </div>
        <FactsCard title={COVERAGE.cardTitle} items={COVERAGE.card} />
      </div>
    </Section>
  )
}
