import type { CaseStudyCard as Card } from '@/data/case-studies'

/**
 * One 410px case-study card — Figma 6391:1549 on /case-studies/ and 6390:1533
 * on /compliance-center/. Byte-identical frames, so one component serves both.
 *
 * bg #eaf4f5, r12, p32, gap 14: a 44px teal disc with a 20px mark, the industry
 * tag, the title, then the challenge and approach paragraphs. "Challenge:" and
 * "Approach:" are drawn in the same regular run as the rest of the paragraph in
 * Figma, so they are not emphasised here either.
 *
 * Glyphs are drawn inline for the same reason as every other glyph in this
 * build: figma.com is unreachable from the build sandbox. Originals sit under
 * 6391:1551, 6391:1560, 6391:1568, 6391:1578 and 6391:1587.
 *
 * !! HOLES. The <svg> sets fill-rule: evenodd, so a subpath drawn INSIDE
 * another subpath OF THE SAME PATH STRING is a hole whichever way it winds, and
 * subpaths sitting side by side in one string are all filled. Splitting a hole
 * across two strings fills it solid instead.
 */
const MARKS: Record<Card['glyph'], string[]> = {
  /** Laptop — Corporate IT. Screen outline plus the base bar. */
  laptop: [
    'M3.5 4h15v10.5h-15V4Zm2 2v6.5h11V6H5.5Z',
    'M1.5 16h19v2h-19Z',
  ],
  /** Medical cross — Healthcare. */
  cross: [
    'M9 3h4v6h6v4h-6v6H9v-6H3V9h6V3Z',
  ],
  /** Civic building — Government. Pediment, columns, plinth. */
  civic: [
    'M11 2 1.5 7.5h19L11 2Z',
    'M4.5 9.5h2.5v7.5H4.5Zm5.25 0h2.5v7.5h-2.5Zm5.25 0h2.5v7.5H15Z',
    'M1.5 18h19v2h-19Z',
  ],
  /** Mortarboard — Education. Cap, body, tassel. */
  school: [
    'M11 2.5 1.5 7 11 11.5 20.5 7 11 2.5Z',
    'M5.5 11.2v4.3c0 1.6 2.5 2.9 5.5 2.9s5.5-1.3 5.5-2.9v-4.3L11 13.7 5.5 11.2Z',
    'M18.8 8.2h1.6v5.6h-1.6Z',
  ],
  /** Factory — Manufacturing. Saw-tooth roofline with a chimney block. */
  factory: [
    'M1.5 19.5V10l5 3.2V10l5 3.2V10l5 3.2V6h2v13.5h-17Z',
  ],
}

export function CaseStudyCardView({ card }: { card: Card }) {
  return (
    /*
     * MOBILE — 6638:8929. Identical to the board apart from its width: 350 in a
     * 390 frame, so p32, the 14px stack, the 44px disc and every type size are
     * the frame's own numbers at both breakpoints. The card is `w-full` rather
     * than a second fixed number, and the three 346px text runs go fluid with
     * it — 410 and 346 were the only two things here that could not fit a phone.
     */
    <article className="flex w-full flex-col items-start gap-[14px] rounded-[12px] bg-brand-soft p-[32px] lg:w-[410px] lg:shrink-0">
      <span className="grid size-[44px] shrink-0 place-items-center rounded-full bg-brand fill-white">
        <svg viewBox="0 0 22 22" fillRule="evenodd" className="size-[20px] shrink-0" aria-hidden="true">
          {MARKS[card.glyph].map((d) => <path key={d} d={d} />)}
        </svg>
      </span>
      <p className="whitespace-nowrap font-roboto text-[11px] font-bold uppercase tracking-[0.6px] text-brand">
        {card.industry}
      </p>
      <h3 className="w-full font-sans text-[19px] font-medium leading-[1.3] text-heading lg:w-[346px]">{card.title}</h3>
      <p className="w-full font-roboto text-[14px] leading-[1.55] text-muted lg:w-[346px]">Challenge: {card.challenge}</p>
      <p className="w-full font-roboto text-[14px] leading-[1.55] text-muted lg:w-[346px]">Approach: {card.approach}</p>
    </article>
  )
}
