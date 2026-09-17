/**
 * The marks used across /why-choose-us/ — Figma draws them at 22px in the
 * differentiator cards, 28px in the Certified & Accountable callout and 20px in
 * the trust cards, all from a 22-unit box, so one table serves all three.
 *
 * Drawn inline for the same reason as every other glyph in this build:
 * figma.com is unreachable from the build sandbox, so an exported asset costs a
 * manual fetch step on someone's machine. The originals sit under 6379:1045,
 * 6379:1068 and 6379:1096 if a byte-exact swap is ever wanted.
 */
export const WHY_MARKS = {
  shield: [
    'M11 1.4 3.1 4.6v6.2c0 4.9 3.3 9.4 7.9 10.6 4.6-1.2 7.9-5.7 7.9-10.6V4.6L11 1.4Zm0 2.3 5.7 2.3v4.8c0 3.7-2.4 7.2-5.7 8.3-3.3-1.1-5.7-4.6-5.7-8.3V6l5.7-2.3Z',
    'M14.6 8 10 12.6l-1.8-1.8-1.5 1.5 3.3 3.3 6.1-6.1L14.6 8Z',
  ],
  rosette: [
    'M11 1.4a5.9 5.9 0 1 0 0 11.8 5.9 5.9 0 0 0 0-11.8Zm0 2.1a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Z',
    'M6.9 13.9 5.2 20.6 11 18.3l5.8 2.3-1.7-6.7a7.9 7.9 0 0 1-8.2 0Z',
  ],
  clock: [
    'M11 1.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 0 0 0-19.2Zm0 2.1a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Z',
    'M10 5.8h2v5.5l4 2.4-1 1.8-5-3V5.8Z',
  ],
  doc: [
    'M5 1.4h7.6L17.4 6v14.6H5V1.4Zm2.1 2.1v15h8.2V7.6h-3.9V3.5H7.1Z',
    'M9.6 12.6 8.1 14l3.1 3.1 5.1-5.1-1.5-1.5-3.6 3.6-1.6-1.5Z',
  ],
  chat: [
    'M3.1 2.8h15.8a1.7 1.7 0 0 1 1.7 1.7v9.6a1.7 1.7 0 0 1-1.7 1.7H8.6l-4.7 4v-4h-.8a1.7 1.7 0 0 1-1.7-1.7V4.5a1.7 1.7 0 0 1 1.7-1.7Zm.4 2.1v8.8h2.5v2l2.4-2h10.1V4.9H3.5Z',
  ],
  truck: [
    'M1.3 4.6h11.4v9.7H1.3V4.6Z',
    'M14 7.4h3.4l3.3 3.7v3.2H14V7.4Z',
    'M5.4 15.2a2 2 0 1 0 0 4.1 2 2 0 0 0 0-4.1Zm11 0a2 2 0 1 0 0 4.1 2 2 0 0 0 0-4.1Z',
  ],
} as const

export type WhyMark = keyof typeof WHY_MARKS

/** One mark, at whatever pixel size the frame draws it. */
export function Mark({ glyph, size }: { glyph: WhyMark; size: number }) {
  return (
    <svg viewBox="0 0 22 22" style={{ width: size, height: size }} className="shrink-0" aria-hidden="true">
      {WHY_MARKS[glyph].map((d) => <path key={d} d={d} />)}
    </svg>
  )
}
