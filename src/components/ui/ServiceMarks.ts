/**
 * Drawn marks for service menu rows that have no artwork in Figma.
 *
 * Unlike IndustryMarks these are STROKED, not filled, because the service rows
 * they sit beside are the designer's thin teal line art (svc-bulb, svc-tv and
 * friends). A solid silhouette next to them reads as a different weight.
 *
 * Airbag Recycling is the only one so far. It is live on /services/ and linked
 * from the live site, but it is absent from Figma 6142:784, so it has never had
 * a card or an icon — the menu row borrowed the TELEVISION icon, which is what
 * Asim caught on 16 Sep 2026. Drawn rather than exported for the usual reason:
 * figma.com is unreachable from this sandbox and from the desktop bridge, so an
 * exported asset costs a manual fetch on his machine. Replace it the moment
 * Aqeel draws a real one.
 */
export const SERVICE_MARKS = {
  /**
   * A steering wheel seen face on: rim, three spokes, and the squared centre
   * pad — which is literally the airbag module. Drawn as one big simple object
   * because the row renders it at ~22px, where the first attempt (a wheel with
   * a separate inflated cushion beside it) collapsed into a blob.
   */
  airbag:
    'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0'
    + ' M10.1 9.2h3.8a1.1 1.1 0 0 1 1.1 1.1v3.4a1.1 1.1 0 0 1-1.1 1.1h-3.8A1.1 1.1 0 0 1 9 13.7v-3.4a1.1 1.1 0 0 1 1.1-1.1Z'
    + ' M3.1 12.4H9 M15 12.4h5.9 M12 15.8V21',
} as const

export type ServiceMark = keyof typeof SERVICE_MARKS
