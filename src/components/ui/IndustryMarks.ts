/**
 * The seven industry marks in the header's Industries panel — Figma
 * lRkITk6QLzsscWUO40karx 6491:6934, rows 6503:7513 and siblings.
 *
 * ! DRAWN, NOT EXPORTED, like every other small mark on this site. The frame
 * fills each 36px box with a raster image ("image 426" ... "image 432"), so
 * matching it exactly would mean seven more assets fetched by hand on Asim's
 * machine — figma.com is blocked from this sandbox AND from the desktop bridge.
 * These are solid silhouettes in the same 24-unit box as Glyph.tsx and
 * SustainabilityMarks.tsx; the frame's are thin teal line art. Say the word and
 * they become real exports instead.
 *
 * !! HOLES MUST LIVE IN THE SAME PATH STRING AS THEIR OUTLINE. `fillRule` is
 * evenodd on the <svg>, but a counter cut into a separate <path> is a separate
 * shape and fills solid.
 *
 * Five of the seven correspond to a mark the frame draws (retail, manufacturing,
 * healthcare, banking, education). Two do not: the frame's list is the
 * HOMEPAGE's eight categories, which include Construction and Distribution &
 * Logistics and have no pages, while ours has Government & Municipal and
 * Automotive & Fleet, which do. See src/lib/nav.ts.
 */
export const INDUSTRY_MARKS = {
  /** Shopping cart. */
  retail: 'M1.4 2.6h3.4l.9 3.4h16.9l-2.3 8.6H8l.3 1.5h12.4v2H6.6L3.3 4.6H1.4v-2Zm4.8 5.4 1.2 4.6h11.5l1.2-4.6H6.2Zm2.6 11.2a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4Zm9.2 0a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4Z',
  /** Factory — a stepped roofline over a plinth. */
  manufacturing: 'M2.2 21.8V9.3l5.6 3.4V9.3l5.6 3.4V9.3l4.5 2.7V3.6h3.9v18.2H2.2Zm2-2h15.6v-3.1H4.2v3.1Z',
  /** Shield with a cross. */
  healthcare: 'M12 1.7 4.2 4.6v6.2c0 4.9 3.3 9.4 7.8 10.5 4.5-1.1 7.8-5.6 7.8-10.5V4.6L12 1.7Zm1.2 5.4v2.9h2.9v2.4h-2.9v2.9h-2.4v-2.9H7.9V10h2.9V7.1h2.4Z',
  /** Payment card with a magnetic stripe. */
  banking: 'M2.6 4.9h18.8c.9 0 1.6.7 1.6 1.6v11c0 .9-.7 1.6-1.6 1.6H2.6c-.9 0-1.6-.7-1.6-1.6v-11c0-.9.7-1.6 1.6-1.6Zm.4 2.5v2h18v-2H3Zm0 4.4v5.3h18v-5.3H3Zm1.8 2h5.4v1.7H4.8v-1.7Z',
  /** Mortarboard over an open book. */
  education: 'M12 2.4 1 8.3l11 5.9 8.9-4.8v6.2h2V8.3L12 2.4ZM5.1 12.6v4.1L12 20.5l6.9-3.8v-4.1L12 16.3l-6.9-3.7Z',
  /** Courthouse — pediment on columns. */
  government: 'M12 1.8 2.5 7v1.9h19V7L12 1.8Zm-6.7 9.1v7.4H3.2v2.8h17.6v-2.8h-2.1v-7.4h-2.3v7.4h-2.9v-7.4h-2.3v7.4H8.3v-7.4H5.3Z',
  /** Saloon car. */
  automotive: 'M5.3 5.4h13.4l2.1 5.6h1.1c.7 0 1.2.5 1.2 1.2v3.9c0 .7-.5 1.2-1.2 1.2h-1v1.3a1.5 1.5 0 0 1-3 0v-1.3H6.1v1.3a1.5 1.5 0 0 1-3 0v-1.3h-1c-.7 0-1.2-.5-1.2-1.2v-3.9c0-.7.5-1.2 1.2-1.2h1.1l2.1-5.6Zm1.4 2-1.3 3.6h13.2l-1.3-3.6H6.7ZM5.2 12.9a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Zm13.6 0a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z',
} as const

export type IndustryMark = keyof typeof INDUSTRY_MARKS
