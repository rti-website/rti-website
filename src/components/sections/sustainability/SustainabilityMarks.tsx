/**
 * The marks used across /sustainability/ — Figma draws them at 22px in the
 * zero-landfill cards and 20px in the goals cards, both from a 22-unit box, so
 * one table serves both.
 *
 * Drawn inline for the same reason as WhyMarks and every other glyph in this
 * build: figma.com is unreachable from the build sandbox, so an exported asset
 * costs a manual fetch step on someone's machine. The originals sit under
 * 6383:1199, 6383:1206, 6383:1214 (zero-landfill) and 6383:1244, 6383:1250,
 * 6383:1257, 6383:1264 (goals) if a byte-exact swap is ever wanted.
 *
 * `shield`, `rosette` and `doc` are the same outlines WhyMarks draws, repeated
 * here rather than imported: /why-choose-us/ and this page can have their glyph
 * sets re-cut independently, and a shared table would make one page's swap
 * silently change the other.
 *
 * !! HOLES. The <svg> sets fill-rule: evenodd, so a subpath drawn INSIDE
 * another subpath OF THE SAME PATH STRING is a hole whichever way it winds.
 * That is why the triangle outline and the globe's meridian each keep their
 * outer and inner outlines in one string, while marks that sit ON TOP of a
 * shape — the shield's check, the rosette's ribbon — are separate strings.
 * Splitting a hole across two strings fills it solid; that is exactly how the
 * first cut of `alert` came out as a plain triangle.
 */
export const SUSTAINABILITY_MARKS = {
  /** Shield with a check — "The Commitment". */
  shield: [
    'M11 1.4 3.1 4.6v6.2c0 4.9 3.3 9.4 7.9 10.6 4.6-1.2 7.9-5.7 7.9-10.6V4.6L11 1.4Zm0 2.3 5.7 2.3v4.8c0 3.7-2.4 7.2-5.7 8.3-3.3-1.1-5.7-4.6-5.7-8.3V6l5.7-2.3Z',
    'M14.6 8 10 12.6l-1.8-1.8-1.5 1.5 3.3 3.3 6.1-6.1L14.6 8Z',
  ],
  /**
   * Circular arrow — the loop. A 330° band (outer r8, inner r5.6, centred on
   * 11,11) with its gap at the top, plus an arrowhead on the clockwise end.
   */
  loop: [
    'M13.74 3.48A8 8 0 1 1 9.61 3.12L10.03 5.48A5.6 5.6 0 1 0 12.92 5.74Z',
    'M14.15 2.35 12.5 6.86 17.09 5.98Z',
  ],
  /** Warning triangle — "The One Exception". */
  alert: [
    'M11 2.2 1.4 19.3h19.2L11 2.2Zm0 4.2L5.1 17.2h11.8L11 6.4Z',
    'M10 9.6h2v4.4h-2Z',
    'M10 15.1h2v2h-2Z',
  ],
  /** Globe — reaching more communities. */
  globe: [
    'M11 1.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 0 0 0-19.2Zm0 2.1a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Z',
    'M11 3.5a3.2 7.5 0 1 0 0 15 3.2 7.5 0 0 0 0-15Zm0 2a1.5 5.5 0 1 1 0 11 1.5 5.5 0 0 1 0-11Z',
    'M3.5 10h15v2h-15Z',
  ],
  /** Award rosette — wider certified capacity. */
  rosette: [
    'M11 1.4a5.9 5.9 0 1 0 0 11.8 5.9 5.9 0 0 0 0-11.8Zm0 2.1a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Z',
    'M6.9 13.9 5.2 20.6 11 18.3l5.8 2.3-1.7-6.7a7.9 7.9 0 0 1-8.2 0Z',
  ],
  /** Document with a check — staying transparent. */
  doc: [
    'M5 1.4h7.6L17.4 6v14.6H5V1.4Zm2.1 2.1v15h8.2V7.6h-3.9V3.5H7.1Z',
    'M9.6 12.6 8.1 14l3.1 3.1 5.1-5.1-1.5-1.5-3.6 3.6-1.6-1.5Z',
  ],
} as const

export type SustainabilityMark = keyof typeof SUSTAINABILITY_MARKS

/** One mark, at whatever pixel size the frame draws it. */
export function Mark({ glyph, size }: { glyph: SustainabilityMark; size: number }) {
  return (
    <svg
      viewBox="0 0 22 22"
      fillRule="evenodd"
      style={{ width: size, height: size }}
      className="shrink-0"
      aria-hidden="true"
    >
      {SUSTAINABILITY_MARKS[glyph].map((d) => <path key={d} d={d} />)}
    </svg>
  )
}
