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
 *
 * MOBILE — Figma 6638:10287 ("Section - Company Story" in "About Us - Mobile"
 * 6638:2224, file BVtf2AOuUOcYbiMIlcKmbC). px20 / py48, one column, gap 32:
 * the prose block (gap 16, heading 28/34) and then the facts card, full width.
 * Nothing is reordered — the row simply becomes a column.
 */
export function AboutStory({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6372:841"
      className="flex flex-col items-center bg-white px-[20px] py-[48px] lg:px-0 lg:py-[100px]">
      <div className="flex w-full flex-col items-start gap-[32px] lg:w-[1282px] lg:flex-row lg:items-start lg:gap-[80px]">
        <div className="flex w-full shrink-0 flex-col items-start gap-[16px] lg:w-[700px] lg:gap-[20px]">
          <Eyebrow>{STORY.eyebrow}</Eyebrow>
          <h2 className="font-sans text-[28px] font-semibold leading-[34px] tracking-[-0.5px] text-heading lg:text-[36px] lg:leading-[1.2] lg:tracking-normal">{STORY.heading}</h2>
          {STORY.body.map((p) => (
            <p key={p} className="font-roboto text-[15px] leading-[22px] text-muted lg:text-[16px] lg:leading-[1.6]">{p}</p>
          ))}
        </div>

        {/*
          FactsCard is shared with /all-locations/ and is not this task's file to
          edit. It hard-codes `w-[502px]` on the card and `w-[400px]` on each
          fact's text, and both of those overflow a 390px screen. They are
          overridden from here instead: scoped to this wrapper, below lg only,
          so the other page is untouched — and `lg:contents` means the wrapper
          generates no box at lg, leaving the card a direct flex child of the
          row exactly as before. Delete the overrides if FactsCard ever takes
          responsive widths of its own; they are a no-op then.
        */}
        <div className="w-full max-lg:[&>div]:w-full max-lg:[&_li_span:last-child]:w-full lg:contents">
          <FactsCard title={STORY.factsTitle} items={STORY.facts} />
        </div>
      </div>
    </Section>
  )
}
