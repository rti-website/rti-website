/**
 * The county recycling pages — eleven legacy URLs under /minnesota-recycling/
 * and /wisconsin-recycling/ that had been 301'd to the facility pages since
 * launch and were brought back on 29 Sep 2026 (Asim: "keep the same url
 * mentioned in document and land it on the new design"; the list is the
 * "PRJ/013 - RTI - Missing County & City Pages" sheet, tab County Pages).
 *
 * One Figma frame per county (file BVtf2AOuUOcYbiMIlcKmbC, board and phone
 * ids on each page), all one template drawn by
 * src/components/sections/locations/CountyPage.tsx:
 *
 *   Hero · About (paragraphs, sometimes a bordered list of county recycling
 *   laws or services) · three Service Options cards · CTA banner · Items We
 *   Accept (or, on Scott and Benton, four "Pioneers" feature cards) · Top
 *   Sights · a Recycle Technologies contact card.
 *
 * The Service Options, the CTA banner and the Items We Accept pills are the
 * same on every frame and live in ./shared.ts.
 *
 * COPY. Word for word from the frames, which carry the old WordPress page
 * copy, with these corrections (29 Sep 2026, flagged to Asim):
 *   - Calumet's Top Sights heading read "Sheboygan County Top Sights" and
 *     Olmsted's "Hennepin County Top Sights"; both use their own county.
 *   - Anoka's electronics law gave the drop-off address as "10040 Davenport
 *     Street NE, Blaine MN 55449"; it is the facility's 1525 99th Ln NE.
 *   - Phone numbers written four ways ("+1-763-…", "+1763-…") are written one
 *     way and dial.
 *   - The Items We Accept pills are one clean list (see ./shared.ts).
 *   - "this form" / "click here" in the old copy link to the quote form (the
 *     one "Click here" about the mail-in program links to /mail-in-recycling/).
 * Not corrected, because the fix is a matter of fact for RTI to supply:
 * Benton County's Top Sights are places in Benton County, OREGON.
 */

export type AboutBlock =
  | { p: string }
  | { h: string }
  /** A bordered card of title + text rows. `padded`: Anoka's card, 8px inside its border. */
  | { list: { title: string; text: string }[]; padded?: boolean }

export type CountyPage = {
  /** The page's own path, with trailing slash (unchanged from WordPress). */
  url: string
  state: 'Minnesota' | 'Wisconsin'
  /** "Anoka County" — the JSON-LD areaServed. */
  county: string
  figma: { board: string; phone: string }
  seo: { title: string; description: string }
  hero: {
    h1: string
    /** Last breadcrumb segment (after Home / Locations). */
    crumb: string
    lead: string
    image: string
    /** The photo's top in the 470 band on the board (1920x1081, object-cover). */
    imageTop: number
    /** A tint over the photo on the board (Washington, WI only). */
    overlay?: string
    /** A tint over the photo on the phone. */
    phoneOverlay?: string
    button: { label: string; href: string }
  }
  about: { heading: string; blocks: AboutBlock[] }
  /** Items We Accept, with its heading as that frame writes it. Absent on Scott and Benton. */
  items?: { heading: string }
  /** The "Pioneers" feature cards that take Items' place on Scott and Benton. */
  features?: { title: string; text: string }[]
  /** Absent on Ramsey. */
  sights?: { heading: string; items: string[] }
  company: {
    name: string
    text: string
    lines: ({ kind: 'hours'; text: string } | { kind: 'phone'; text: string; tel: string })[]
  }
}
