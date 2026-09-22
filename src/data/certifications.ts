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
export const CERT_LOGOS: Logo[] = [
  /* 1 — 6695:3630, R2v3 */
  { src: '/images/certs/1.png', w: 44.601593, h: 46.459991, o: '' },
  /* 2 — 6695:3635, RIOS */
  { src: '/images/certs/2.png', w: 67.619995, h: 31.739996, o: '' },
  /* 3 — 6695:3646, labelled FACTA; see the note above */
  { src: '/images/certs/3.png', w: 85.763351, h: 30.288174, o: '' },
  /* 4 — 6695:5832, RCRA wordmark. Fourth since 22 Sep 2026; it was sixth.
     The Figma vector export wrapped the paths in the whole clipped page — a
     #2F2F2F backdrop and an opacity group — so the file here is those same
     four paths with the scaffolding stripped. */
  { src: '/images/certs/6.svg', w: 74,         h: 22, o: '' },
  /* 5 — 6695:5825, IEEE */
  { src: '/images/certs/4.png', w: 104.192444, h: 30.561665, o: '' },
  /* 6 — 6695:5830, NAID AAA; see the note above */
  { src: '/images/certs/5.png', w: 43.931847,  h: 45.777725, o: '' },
  /* 7 — 6695:5838, FCRA wordmark, same treatment as 6.svg */
  { src: '/images/certs/7.svg', w: 69,         h: 20.699999, o: '' },
  /* 8 — 6721:5861, GLBA. New on 22 Sep 2026. */
  { src: '/images/certs/8.png', w: 86,         h: 22, o: '' },
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
