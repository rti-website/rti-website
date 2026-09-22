import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { CERTS, INTRO } from '@/data/certifications-page'

/**
 * Certifications grid — Figma 6380:1097. py 100, gap 50: heading block on an
 * 820px column, then a 2x2 grid of 410px cards on a 24px gutter (844 total).
 *
 * On a phone — 6704:2383 in BVtf2AOuUOcYbiMIlcKmbC, 22 Sep 2026 — the section
 * is px20 / py40 on a 24px rhythm, the heading drops to 26 / 15, and the cards
 * stack one per row at p24 with the disc and the status pill sitting side by
 * side (gap 12) instead of at opposite ends of the row.
 *
 * Each card carries a status sentence the frame has no room for, so the cards
 * run taller than the 239 the frame draws. See src/data/certifications-page.ts.
 * The mobile frame omits that sentence too; it stays, because it is where the
 * "pursuing" qualifier on the Wisconsin card lives.
 *
 * Marks are drawn inline, like every other glyph in this build — figma.com is
 * unreachable from the build sandbox, so an exported asset costs a manual fetch
 * step on someone's machine.
 */
const MARKS: Record<string, string[]> = {
  shield: [
    'M11 1.4 3.1 4.6v6.2c0 4.9 3.3 9.4 7.9 10.6 4.6-1.2 7.9-5.7 7.9-10.6V4.6L11 1.4Zm0 2.3 5.7 2.3v4.8c0 3.7-2.4 7.2-5.7 8.3-3.3-1.1-5.7-4.6-5.7-8.3V6l5.7-2.3Z',
    'M14.6 8 10 12.6l-1.8-1.8-1.5 1.5 3.3 3.3 6.1-6.1L14.6 8Z',
  ],
  rosette: [
    'M11 1.4a5.9 5.9 0 1 0 0 11.8 5.9 5.9 0 0 0 0-11.8Zm0 2.1a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Z',
    'M6.9 13.9 5.2 20.6 11 18.3l5.8 2.3-1.7-6.7a7.9 7.9 0 0 1-8.2 0Z',
  ],
  doc: [
    'M5 1.4h7.6L17.4 6v14.6H5V1.4Zm2.1 2.1v15h8.2V7.6h-3.9V3.5H7.1Z',
    'M9.6 12.6 8.1 14l3.1 3.1 5.1-5.1-1.5-1.5-3.6 3.6-1.6-1.5Z',
  ],
  truck: [
    'M1.3 4.6h11.4v9.7H1.3V4.6Z',
    'M14 7.4h3.4l3.3 3.7v3.2H14V7.4Z',
    'M5.4 15.2a2 2 0 1 0 0 4.1 2 2 0 0 0 0-4.1Zm11 0a2 2 0 1 0 0 4.1 2 2 0 0 0 0-4.1Z',
  ],
}

export function CertGrid({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6380:1097"
      className="flex flex-col items-center gap-[24px] bg-white px-[20px] py-[40px] lg:gap-[50px] lg:px-0 lg:py-[100px]">
      <div className="flex w-full flex-col items-center gap-[10px] text-center lg:w-[820px]">
        <Eyebrow>{INTRO.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[26px] font-semibold leading-normal text-black lg:text-[40px] lg:leading-[1.3]">{INTRO.heading}</h2>
        <p className="font-roboto text-[15px] leading-normal text-muted lg:text-[17px] lg:leading-[1.175]">{INTRO.lead}</p>
      </div>

      <ul className="grid w-full grid-cols-1 items-start gap-[24px] lg:w-[844px] lg:grid-cols-2">
        {CERTS.map((c) => (
          <li key={c.title} className="grad-card flex w-full flex-col items-start gap-[16px] rounded-[12px] border border-line bg-white p-[24px] lg:w-[410px] lg:p-[32px]">
            <div className="flex h-[48px] w-full items-center gap-[12px] lg:w-[346px] lg:justify-between lg:gap-0">
              <span className="grad-card__disc grid size-[48px] shrink-0 place-items-center rounded-full bg-brand transition-colors">
                <svg viewBox="0 0 22 22" className="size-[22px] fill-white" aria-hidden="true">
                  {(MARKS[c.glyph] ?? []).map((d) => <path key={d} d={d} />)}
                </svg>
              </span>
              <span className="grad-card__badge flex h-[26px] items-center whitespace-nowrap rounded-full bg-accent-soft px-[12px] font-roboto text-[10.5px] font-bold uppercase leading-[1.175] tracking-[0.4px] text-accent">
                {c.badge}
              </span>
            </div>
            <h3 className="w-full font-sans text-[20px] font-medium leading-normal text-heading lg:w-[346px] lg:leading-[1.3]">{c.title}</h3>
            <p className="w-full font-roboto text-[14px] leading-[1.6] text-muted lg:w-[346px] lg:text-[14.5px]">{c.body}</p>
            <p className="w-full font-roboto text-[13.5px] leading-[1.6] text-muted/80 lg:w-[346px]">{c.status}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
