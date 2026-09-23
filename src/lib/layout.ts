/**
 * Page chrome heights, in design pixels.
 *
 * These were hard-coded as 140 and 681 in every route file and every hero
 * component, which meant trimming the header meant editing twenty files and
 * missing one meant a page whose hero sat 20px below its own header. They live
 * here now so the chrome can be resized in one place.
 *
 * Both were reduced on Asim's instruction, 16 Sep 2026: the header had too much
 * space above and below the nav row, and the footer had a dead band between its
 * last content and the bottom bar.
 */

/**
 * Header — Figma draws 140 (41px teal bar + 99px white bar). Built at 120
 * (41 + 79), which takes 20px out of the white bar without crowding the 46px
 * logo or the 36px Mail In Program pill.
 *
 * Everything that sits under the header derives its top from this: the heroes,
 * every page's HERO_TOP, and the dropdown panels in HeaderNav.
 */
export const HEADER_H = 120

/**
 * Footer — Figma draws 681. Built at 621.
 *
 * The column block ends at y496 and the bottom bar began at y580, leaving 84px
 * of nothing. The bar now starts at y520, which keeps a normal 24px of breathing
 * room under the last content instead of a visible hole.
 */
export const FOOTER_H = 621

/** Where the footer's bottom bar starts, inside the footer. */
export const FOOTER_BAR_Y = 520

/**
 * How far the whole canvas slides up under the shortened header.
 *
 * ! READ THIS BEFORE MOVING A SECTION. Every section on this site is pinned to
 * its Figma y, and Figma draws a 140px header. Shortening the header to 120
 * would have meant subtracting 20 from several hundred hard-coded offsets — and
 * missing one leaves a visible seam, which is exactly what happened on the
 * first pass.
 *
 * So the coordinates stay exactly as Figma draws them, header included, and
 * <main> is shifted up by this much instead (see `.design-canvas > main` in
 * globals.css, fed by the --chrome-shift variable the Canvas sets). A section
 * keeps its Figma number and still lands in the right place.
 */
export const CHROME_SHIFT = 140 - HEADER_H

/**
 * Homepage hero — Figma 6023:13152 draws 940. Built at 715.
 *
 * Two constraints meet here, both Asim's, both 16 Sep 2026: the stats strip has
 * to be on screen when the page opens, and the band has to reach the bottom of
 * the window so there is no white under it. 715 + the 120 header is 835 design
 * px, which fills a ~957px browser viewport at 1920 wide once the gutter trim's
 * 1.15x zoom is applied.
 *
 * It is a fixed number rather than a viewport unit because every section below
 * is pinned to an absolute y — a hero that changed height with the window would
 * drag the whole page with it.
 */
export const HERO_H = 715

/**
 * The extra distance every homepage section BELOW the hero moves up, on top of
 * CHROME_SHIFT, to close the gap the shorter hero leaves. Applied in each of
 * those section components, which pin their own Figma y.
 */
export const HOME_HERO_SHIFT = 940 - HERO_H

/**
 * How much comes off the top of the Certifications band, which Figma pads by
 * 150 before its eyebrow. The rendered hero-to-"Environmental Compliances" gap
 * is 150 - CERT_TRIM, and this one number is the whole control: the band's own
 * height drops by the same amount, and everything below it subtracts the same
 * again via HOME_BELOW_CERT_SHIFT.
 *
 * Back to 0 — Figma's own 150 — on Asim's instruction, 16 Sep 2026. It went
 * 125 (gap 25), then 50 (gap 100), then back to the original.
 */
export const CERT_TRIM = 0

/**
 * What every homepage section BELOW the Certifications band subtracts: the
 * hero's reduction plus the band's. Certifications itself uses HOME_HERO_SHIFT,
 * because it sits directly under the hero and only loses its own padding.
 */
export const HOME_BELOW_CERT_SHIFT = HOME_HERO_SHIFT + CERT_TRIM

/**
 * Our Services grew on 21 Sep 2026. Figma 6107:1552 (860 tall: a tab strip
 * over a row of icon tiles) was replaced by 6532:2049 (1133 tall: vertical
 * tabs beside a grid of photo cards and an enquiry banner). Every homepage
 * section below it keeps its ORIGINAL Figma y and moves down by this much —
 * which is exactly where the new frame draws them (Industries 6023:12500 sits
 * at 2962 there, and 2689 + 273 = 2962).
 */
export const HOME_SERVICES_GROWTH = 1133 - 860

/**
 * What every homepage section BELOW Our Services subtracts from its Figma y:
 * the hero and band reductions, less the room the new services frame needs.
 */
export const HOME_BELOW_SERVICES_SHIFT = HOME_BELOW_CERT_SHIFT - HOME_SERVICES_GROWTH

/**
 * The CSS custom property that carries the OPEN tab's height difference on the
 * homepage: 0px with the Recycling tab (two rows of cards, the 1133 the frame
 * draws), -398px with either one-row tab. ServiceTabs sets it on the canvas;
 * OurServices adds it to its height; page.tsx moves everything below by it;
 * Canvas adds it to the page height. One variable, so the four cannot drift.
 */
export const HOME_SERVICES_DELTA_VAR = '--home-svc-delta'

/**
 * Client's Testimonials grew on 21 Sep 2026: three cards and a pager (594)
 * became four cards over a stats strip (6024:14149 in file L79HFCNBww8pW6pPGfQi3e,
 * 826). Client's Stories and everything under it move down by this much.
 */
export const HOME_TESTIMONIALS_GROWTH = 904 - 594
/* 904, not the frame's 826, since 23 Sep 2026: the reviews became a rail with
   a rating line and Previous / Next under it. Keep in step with TESTIMONIALS_H
   in src/components/sections/Testimonials.tsx. */

/** What Client's Stories subtracts from its Figma y. */
export const HOME_BELOW_TESTIMONIALS_SHIFT = HOME_BELOW_SERVICES_SHIFT - HOME_TESTIMONIALS_GROWTH

/**
 * Client's Stories grew on 21 Sep 2026 too: the three-up row (6026:14726, 885)
 * became the carousel (6557:12903, 934). The FAQ / CTA / footer block under it
 * moves down by this much on top of everything above.
 */
export const HOME_CASES_GROWTH = 934 - 885

/** What the homepage's FAQ / CTA / footer block subtracts from its Figma y. */
export const HOME_BELOW_CASES_SHIFT = HOME_BELOW_TESTIMONIALS_SHIFT - HOME_CASES_GROWTH
