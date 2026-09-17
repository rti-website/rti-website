import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { FactsCard } from '@/components/ui/FactsCard'
import { STORY } from '@/data/about'

/**
 * Company story — Figma 6372:841. Row at x319, 1282 wide: a 700px text column
 * and a 502px facts card with an 80px gutter, inside 100px of section padding.
 *
 * The frame draws the row 319 tall around its own shorter copy. The doc's two
 * paragraphs run longer, so the height comes from the page file and is measured
 * in a browser — see the note there.
 */
export function AboutStory({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6372:841"
      className="flex flex-col items-center bg-white py-[100px]">
      <div className="flex w-[1282px] items-start gap-[80px]">
        <div className="flex w-[700px] shrink-0 flex-col items-start gap-[20px]">
          <Eyebrow>{STORY.eyebrow}</Eyebrow>
          <h2 className="font-sans text-[36px] font-semibold leading-[1.2] text-heading">{STORY.heading}</h2>
          {STORY.body.map((p) => (
            <p key={p} className="font-roboto text-[16px] leading-[1.6] text-muted">{p}</p>
          ))}
        </div>

        <FactsCard title={STORY.factsTitle} items={STORY.facts} />
      </div>
    </Section>
  )
}
