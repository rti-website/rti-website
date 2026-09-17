/**
 * Deprecated — kept only so a stray import does not break the build.
 *
 * This was the centred column on a diagonal navy-to-green gradient that
 * /about-us.../, /certifications/, /all-locations/, /why-choose-us/,
 * /sustainability/ and /case-studies/ ended with (Figma 6372:846 and friends).
 * On 16 Sep 2026 Asim asked for the homepage's redesigned band on every page,
 * so all six now render ClosingCta instead and nothing imports this.
 *
 * Note the height changed with it: those frames drew 399.05 (About 444.05) and
 * the band is 456, so each page's H.cta moved to CTA_H. Their footers follow
 * from CTA_TOP + H.cta, so nothing else had to move.
 */
export { ClosingCta as GradientCta, CTA_H, type CtaContent } from '@/components/sections/ClosingCta'
