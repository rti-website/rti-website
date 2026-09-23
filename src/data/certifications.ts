import type { Logo } from '@/components/ui/LogoMarquee'

/**
 * The certifications strip, shared by the homepage (Figma 6044:19764) and
 * /services/ (Figma 6142:1622).
 *
 * !! THE HOMEPAGE FRAME IS THE AUTHORITY. It is the only one of the three
 * frames that carries real artwork — /services/ (6142:1628) and the phone
 * frame (6605:2332) still draw seven EMPTY placeholder boxes named
 * "Image (Partner)". So all three surfaces render this one list; the two
 * placeholder frames are stale, not a second design.
 *
 * ===========================================================================
 * REAL ARTWORK, 22 Sep 2026 — Asim: "use this exact logo as you see in Figma"
 * ===========================================================================
 * It used to be five placeholder exports with marks 3 and 4 shown twice each
 * to fill seven slots. The frame now carries eight distinct marks, and each
 * one here is that slot's own node exported at 2x from
 * BVtf2AOuUOcYbiMIlcKmbC — see data/figma-assets.json for the node ids.
 *
 * ORDER AND COUNT ARE THE DESIGNER'S, RE-READ FROM 6044:19764 ON 22 Sep 2026.
 * She reordered the strip and added GLBA as an eighth mark, so RCRA moved from
 * sixth to fourth and IEEE/NAID each moved down one. Note that the frame's
 * WRAPPER layers are misnamed — three in a row are called "Image (IEEE 2883)"
 * and the one holding RCRA is called "Image (FCRA Disposal Rule)". The artwork
 * node inside each wrapper is what this list follows, never the layer name.
 *
 * NO `o` CLASS, AND THE EXPORTS ARE THE ARTWORK NODES, NOT THEIR CONTAINERS.
 * The frame fades the marks 40/60/80/100/80/60/40 by setting opacity on each
 * CONTAINER, and a container export bakes that in. In a still drawing that
 * reads as a soft edge; in a scrolling strip it does not, because the fade
 * travels with the logo — Asim saw the pale ones sitting in the middle and the
 * strong ones at the edges (22 Sep 2026). So each mark is exported from its own
 * artwork node at full colour, and the fade is a mask on the window instead —
 * see `.logo-marquee` in globals.css.
 *
 * Sizes are each mark's own drawn size, so they keep their real proportions
 * rather than all being letterboxed into one 113x91 box.
 *
 * ===========================================================================
 * !! SIX OF THESE EIGHT ARE A COMPLIANCE PROBLEM, NOT A DESIGN ONE
 * ===========================================================================
 * Shipped as drawn on Asim's instruction, and flagged to him on 22 Sep 2026.
 * Rizwan/Asim to decide before launch:
 *
 *   3.png   The frame calls this slot "FACTA", but the artwork is the logo of
 *           a BRAZILIAN CONSUMER-LOAN COMPANY ("facta — empréstimo rápido e
 *           fácil"), not the US Fair and Accurate Credit Transactions Act.
 *           Someone searched the acronym and took the first hit. It is also
 *           another company's trademark on our certifications strip.
 *   5.png   NAID AAA CERTIFIED. Asim removed exactly this claim from the
 *           compliance table on 15 Sep 2026 because nothing supports it, and
 *           /certifications/ omits it for the same reason. A badge on the
 *           homepage is the same claim in a stronger form.
 *   6.svg, 4.png, 7.svg, 8.png  RCRA, IEEE, FCRA and now GLBA are a standards
 *           body and three federal statutes. None is a certification a company
 *           holds. GLBA in particular is the Gramm-Leach-Bliley Act, a banking
 *           privacy statute with no official logo at all — so the blue "GLBA"
 *           wordmark drawn here belongs to some third party, which is the same
 *           trademark risk as the FACTA slot above. A strip headed
 *           "Certifications & Standards" reads all four as ours.
 *
 * Only R2v3 (1.png) and RIOS (2.png) are certifications Recycle Technologies
 * actually holds.
 */
/**
 * Where the R2v3 mark goes. Asim, 22 Sep 2026: "when user click on R2V3 it
 * must land on this". SERI's own directory entry for the facility — the only
 * mark on this strip that can be verified by a third party, which is exactly
 * why it is the only one carrying a link.
 *
 * Long because it is SERI's own deep link, backto parameter and all, given
 * verbatim. Not built by hand, so CLAUDE.md rule 3 does not reach it — that
 * rule is about URLs on THIS site.
 *
 * Exported since 23 Sep 2026, when the footer grew its own logo grid and the
 * R2v3 mark there had to land on the same page — Asim: "on r2v3 add the url
 * that we add in Certifications & Standards". One constant, two links, so
 * they cannot drift apart.
 */
export const R2_DIRECTORY =
  'https://sustainableelectronics.org/find-an-r2-certified-facility/'
  + '?appids=001UQ00000P5w8DYAR&tab=2'
  + '&backto=https://sustainableelectronics.org/find-an-r2-certified-facility/'
  + '?type=byalias&alias=minnesota%2520computers'

export const CERT_LOGOS: Logo[] = [
  /* 1 — 6695:3630, R2v3. The one mark that links; see R2_DIRECTORY above. */
  { src: '/images/certs/1.png', w: 44.601593, h: 46.459991, o: '', name: 'R2v3 certified', href: R2_DIRECTORY },
  /* 2 — 6695:3635, RIOS */
  { src: '/images/certs/2.png', w: 67.619995, h: 31.739996, o: '', name: 'RIOS certified' },
  /* 3 — 6695:3646, labelled FACTA; see the note above */
  { src: '/images/certs/3.png', w: 85.763351, h: 30.288174, o: '', name: 'FACTA' },
  /* 4 — 6695:5832, RCRA wordmark. Fourth since 22 Sep 2026; it was sixth.
     The Figma vector export wrapped the paths in the whole clipped page — a
     #2F2F2F backdrop and an opacity group — so the file here is those same
     four paths with the scaffolding stripped. */
  { src: '/images/certs/6.svg', w: 74,         h: 22, o: '', name: 'RCRA' },
  /* 5 — 6695:5825, IEEE */
  { src: '/images/certs/4.png', w: 104.192444, h: 30.561665, o: '', name: 'IEEE' },
  /* 6 — 6695:5830, NAID AAA. STAYS — Asim, 22 Sep 2026: "do not remove the
     AAA logo", after a screenshot of it at its drawn 44px had read as
     something else and it was briefly taken out. The compliance note above
     still applies: the badge asserts a certification that was removed from
     the compliance table on 15 Sep, and nothing in the build supports it.
     At 44x46 the "NAID CERTIFIED" lettering is not legible — it reads as a
     blue disc, which is what the screenshot showed. The size is the
     designer's; raising it is her call. */
  { src: '/images/certs/5.png', w: 43.931847,  h: 45.777725, o: '', name: 'NAID AAA certified' },
  /* 7 — 6695:5838, FCRA wordmark, same treatment as 6.svg */
  { src: '/images/certs/7.svg', w: 69,         h: 20.699999, o: '', name: 'FCRA' },
  /* 8 — 6721:5861, GLBA. New on 22 Sep 2026.
     8-black.png, NOT 8.png — Asim, 22 Sep 2026: "make the GLBA colour black".
     The Figma export is the blue wordmark on an opaque white ground; the
     -black file is the same pixels with every non-white one turned to #000
     and the ground made transparent (scripts/recolour-glba.py is the recipe,
     so a re-export from Figma can be re-blacked in one command). A CSS
     filter would have been simpler and wrong: brightness(0) on an opaque
     export paints the white ground black too. */
  { src: '/images/certs/8-black.png', w: 86,   h: 22, o: '', name: 'GLBA' },
  /* 9 — 6754:2597, NIST. Added 22 Sep 2026.
     DRAWN 128x34 IN FIGMA, RENDERED 83x22 — Asim, 22 Sep 2026: "the size of
     NIST and HIPPA same as other logo". The designer placed these two at
     their raw export size, half again the height of every other mark on the
     strip. Set to the wordmark height RCRA and FCRA use (22), aspect kept.
     The file is unchanged; only the drawn size is. */
  { src: '/images/certs/9.png', w: 82.82,      h: 22, o: '', name: 'NIST' },
  /* 10 — 6754:2594, the badge the designer drew as "HIPPA".
     !! THE ARTWORK IS MISSPELLED. The statute is HIPAA — Health Insurance
     Portability and Accountability Act. The exported badge reads HIPPA, and
     that is what will render, because this is a picture of a word and there is
     no way to correct it in code. It is the same misspelling that is already
     in the footer of all three case-study PDFs.
     Shipping it means a misspelled compliance badge on the homepage of a
     company that recycles hospital equipment. Aqeel has to re-export it; the
     `name` below is spelt correctly so at least the alt text and the link
     label are right. Flagged to Asim 22 Sep 2026. */
  /* Drawn 121.45x50.13, rendered 72.7x30 — same instruction as NIST above.
     30 is the badge height RIOS and IEEE sit at; a badge is heavier than a
     wordmark, so it gets the badge height rather than 22. Aspect kept. */
  { src: '/images/certs/10.svg', w: 72.68,     h: 30, o: '', name: 'HIPAA' },
]

/**
 * The frame lays these out on a uniform grid: eight 113.16px cells whose left
 * edges sit 163.771px apart, each mark centred in its cell. That pitch is
 * LogoMarquee's `pitch` default rather than a constant here, so the one number
 * lives next to the CSS that uses it — see the note in that file for why the
 * grid is an item width and not a gap.
 */

export const CERT_COPY = {
  eyebrow: 'Environmental Compliances',
  title: 'Certifications & Standards',
  body:
    'Recycle Technologies follows recognized environmental standards and holds leading '
    + 'industry certifications, ensuring e-waste is handled responsibly from collection '
    + 'through final processing.',
}

/**
 * ===========================================================================
 * THE FOOTER'S LOGO ROW — three marks since 23 Sep 2026
 * ===========================================================================
 * The footer took the certification marks on 23 Sep 2026 (Figma 6778:3897 on
 * the board, 6778:9672 on the phone), nine of them 3x3 under the chat card.
 * The same day Asim cut it to three: "remove the other logo, only leave the
 * r2v3, rios, and AAA logo". So it is one row of three, in thirds of the
 * board's 188px column and of the phone's full width, with a rule between.
 *
 * Files are the ones the two frames draw for these three marks. Phone sizes
 * are the phone frame's; board sizes are about 1.25x the board frame's (30x34,
 * 50x21, 28x28), which were set for a nine-mark grid and read as specks once
 * three marks had a row to themselves.
 * The rasters share their Figma asset hashes with the certifications page
 * files (4aed2 R2v3, 5cc60 RIOS, d1fc7 NAID), so nothing new is fetched.
 * `crop` repeats how the frame crops the R2v3 fill inside its box.
 *
 * Only R2v3 links, to SERI's directory (R2_DIRECTORY above). The compliance
 * note on NAID AAA in CERT_LOGOS applies here too.
 */
export type FooterCert = {
  name: string
  src: string
  href?: string
  fit?: 'contain' | 'cover' | 'fill'
  crop?: { left: number; top: number; w: number; h: number }
  /** Drawn size on the board (6778:4122) and on the phone (6778:9672). */
  board: { w: number; h: number }
  phone: { w: number; h: number }
}

const C = '/images/certifications'

export const FOOTER_CERTS: FooterCert[] = [
  { name: 'R2v3 certified', src: `${C}/r2v3.png`, href: R2_DIRECTORY,
    crop: { left: -1.23, top: 0, w: 104.73, h: 100 },
    board: { w: 36, h: 41 },          phone: { w: 41.833, h: 47.41 } },
  { name: 'RIOS certified', src: `${C}/rios.png`, fit: 'contain',
    board: { w: 56, h: 24 },          phone: { w: 69.721, h: 29.283 } },
  { name: 'NAID AAA certified', src: `${C}/naid-aaa.png`, fit: 'contain',
    board: { w: 36, h: 36 },          phone: { w: 39.018, h: 39.018 } },
]
