import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { VALUES } from '@/data/about'

/**
 * Mission, vision and values — Figma 6372:842. Heading block centred on a
 * 780px column, then three 410px cards with a 24px gap (1278 total, x321).
 *
 * Laid out in flow rather than at pinned offsets: the frame is an auto-layout
 * column (py 100, gap 50) and every pinned-offset section in this build has
 * eventually printed one block through another when real copy ran a line long.
 *
 * MOBILE — Figma 6663:2350 ("Section - Mission Vision Values" in "About Us -
 * Mobile" 6638:2224, file BVtf2AOuUOcYbiMIlcKmbC). px20 / py48, gap 32; the
 * heading block is a 12-gap centred column (26/32 title, 15/22 lead) and the
 * three cards stack full width 16 apart. The card itself is unchanged — p32,
 * r12, 48px disc, 20px title, 15/1.6 body — so only the rail turns.
 *
 * The three marks are drawn inline for the same reason as the detail-row
 * glyphs in components/ui/Glyph.tsx: figma.com is unreachable from the build
 * sandbox, so every exported asset costs someone a manual fetch step, and these
 * are three ordinary 22px shapes. The exported originals are Figma 6372:876
 * (target), 6372:884 (eye) and 6372:891 (heart) if a byte-exact swap is wanted.
 */
const MARKS = {
  target: [
    'M11 0a11 11 0 1 0 0 22 11 11 0 0 0 0-22Zm0 2.1a8.9 8.9 0 1 1 0 17.8 8.9 8.9 0 0 1 0-17.8Z',
    'M11 5.4a5.6 5.6 0 1 0 0 11.2 5.6 5.6 0 0 0 0-11.2Zm0 2.1a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z',
    'M11 9.2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Z',
  ],
  eye: [
    'M11 4C6.2 4 2.1 7.1.6 11c1.5 3.9 5.6 7 10.4 7s8.9-3.1 10.4-7c-1.5-3.9-5.6-7-10.4-7Zm0 2.1c3.6 0 6.8 2.1 8.1 4.9-1.3 2.8-4.5 4.9-8.1 4.9S4.2 13.8 2.9 11C4.2 8.2 7.4 6.1 11 6.1Z',
    'M11 8.1a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Z',
  ],
  heart: [
    'M11 19.6 9.4 18.1C4.3 13.5 1 10.5 1 6.9 1 3.9 3.4 1.6 6.4 1.6c1.7 0 3.4.8 4.6 2.1 1.2-1.3 2.9-2.1 4.6-2.1 3 0 5.4 2.3 5.4 5.3 0 3.6-3.3 6.6-8.4 11.2L11 19.6Z',
  ],
}

export function AboutValues({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6372:842"
      className="flex flex-col items-center gap-[32px] bg-[#fcfcfc] px-[20px] py-[48px] lg:gap-[50px] lg:px-0 lg:py-[100px]">
      <div className="flex w-full flex-col items-center gap-[12px] text-center lg:w-[780px] lg:gap-[10px]">
        <Eyebrow>{VALUES.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[26px] font-semibold leading-[32px] text-black lg:text-[40px] lg:leading-[1.3]">{VALUES.heading}</h2>
        <p className="font-roboto text-[15px] leading-[22px] text-muted lg:text-[17px] lg:leading-[1.175]">{VALUES.lead}</p>
      </div>

      <div className="flex w-full flex-col items-stretch gap-[16px] lg:w-auto lg:flex-row lg:items-start lg:gap-[24px]">
        {VALUES.cards.map((c) => (
          <article key={c.title} className="grad-card flex w-full shrink-0 flex-col items-start gap-[16px] rounded-[12px] border border-line bg-white p-[32px] lg:w-[410px]">
            <span className="grad-card__disc grid size-[48px] shrink-0 place-items-center rounded-full bg-brand transition-colors">
              <svg viewBox="0 0 22 22" className="size-[22px] fill-white" aria-hidden="true">
                {MARKS[c.glyph].map((d) => <path key={d} d={d} />)}
              </svg>
            </span>
            <h3 className="font-sans text-[20px] font-medium leading-[1.3] text-heading">{c.title}</h3>
            <p className="font-roboto text-[15px] leading-[1.6] text-muted">{c.body}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
