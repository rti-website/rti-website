/**
 * The marks used across /compliance-center/ — Figma draws them at 20px in the
 * download discs and 16px on the "Request Download" link, both from a 22-unit
 * box, so one table serves both.
 *
 * Drawn inline for the same reason as WhyMarks and SustainabilityMarks:
 * figma.com is unreachable from the build sandbox. The originals sit under
 * 6390:1568, 6390:1580, 6390:1593 (the download kinds) and 6390:1574 (the
 * arrow).
 *
 * The three case-study marks this file used to carry moved to
 * src/components/ui/CaseStudyCard.tsx when that card became shared with
 * /case-studies/ — the glyph belongs with the card, not with the page.
 *
 * !! HOLES. The <svg> sets fill-rule: evenodd, so a subpath drawn INSIDE
 * another subpath OF THE SAME PATH STRING is a hole whichever way it winds,
 * and subpaths that sit side by side in one string are all filled. Splitting a
 * hole across two strings fills it solid instead.
 */
export const COMPLIANCE_MARKS = {
  /** Award rosette — the R2v3 certificate summary. */
  badge: [
    'M11 1.4a5.9 5.9 0 1 0 0 11.8 5.9 5.9 0 0 0 0-11.8Zm0 2.1a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Z',
    'M6.9 13.9 5.2 20.6 11 18.3l5.8 2.3-1.7-6.7a7.9 7.9 0 0 1-8.2 0Z',
  ],
  /** Document with ruled lines — the sample certificate. */
  doc: [
    'M5 1.4h7.6L17.4 6v14.6H5V1.4Zm2.1 2.1v15h8.2V7.6h-3.9V3.5H7.1Z',
    'M8.6 11h6.5v1.7H8.6Zm0 3.4h6.5v1.7H8.6Z',
  ],
  /** Open book — the regulation summary. Outer cover with two page wells. */
  book: [
    'M3 3.5h16v15H3v-15Zm2 2v11h4.9v-11H5Zm7.1 0v11H17v-11h-4.9Z',
  ],
  /** Download arrow over a tray — the "Request Download" link. */
  arrow: [
    'M10 2h2v7h4.5L11 15.5 5.5 9H10V2Z',
    'M3.5 17h15v2h-15Z',
  ],
} as const

export type ComplianceMark = keyof typeof COMPLIANCE_MARKS

/** One mark, at whatever pixel size the frame draws it. */
export function Mark({ glyph, size }: { glyph: ComplianceMark; size: number }) {
  return (
    <svg
      viewBox="0 0 22 22"
      fillRule="evenodd"
      style={{ width: size, height: size }}
      className="shrink-0"
      aria-hidden="true"
    >
      {COMPLIANCE_MARKS[glyph].map((d) => <path key={d} d={d} />)}
    </svg>
  )
}
