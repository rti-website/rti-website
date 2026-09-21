import type { Industry } from '@/components/ui/IndustryCard'
import { QUOTE_HREF, href } from '@/lib/urls'

/**
 * /industries/ — copy from the "Industries We Serve" doc, geometry from
 * Figma 6246:1006 "All Industries".
 *
 * !! THIS IS A NEW URL, NOT A MIGRATED ONE !!
 * The live WordPress site has no industries page. It LOOKS like it does —
 * https://www.recycletechnologies.com/industries/ returns HTTP 200 — but the
 * body is the homepage. So does every other unknown path: the site serves the
 * homepage instead of a 404 for anything it cannot resolve (verified against a
 * nonsense URL, 15 Sep 2026). There is therefore no live title, description or
 * H1 to port, and nothing ranking on this URL to protect.
 *
 * Two consequences worth carrying into the migration:
 *   1. A 200 from this site does not prove a page exists. Every URL this repo
 *      treats as verified was confirmed by a DISTINCT title and H1, not by a
 *      status code. Any future check must do the same.
 *   2. The soft-404 behaviour is itself worth fixing — it lets crawlers
 *      generate unlimited duplicate-homepage URLs. The Next build returns real
 *      404s, so the replatform fixes it by default.
 */

/* ------------------------------------------------------------------ SEO --
 * No live values and no SEO block in the content doc, so these are written
 * from the doc's own H1 and intro. Rizwan should review before launch — this
 * is the one page whose metadata nobody has signed off.
 */
export const SEO = {
  title: 'Industries We Serve | Recycle Technologies',
  description:
    'Recycle Technologies serves healthcare, finance, education, government, automotive, '
    + 'manufacturing and retail organizations retiring computers, IT equipment and electronics.',
}

/* ----------------------------------------------------------------- hero --
 * Figma's H1 is "Industries" (6246:1014); the doc titles the page "Industries
 * We Serve". Built as designed, as on every other page. The hero here has no
 * button row — the service detail frames do, this one does not — so the doc's
 * "[Get a Quote]" is served by the closing CTA instead of a second button.
 */
export const HERO = {
  crumbs: [
    { label: 'Home',       href: href('/') },
    { label: 'Industries', href: null },
  ],
  h1: 'Industries',
  lead:
    'Recycle Technologies works with organizations across a range of industries that need to '
    + 'retire computers, IT equipment, and other electronics responsibly.',
}

/** Rule-flanked green section title — Figma 6246:1024. */
export const CATALOGUE_HEADING = 'All Industries'

/**
 * Figma draws eight cards, but only five distinct ones — the frame repeats
 * Cards 2, 3 and 4 to fill the grid, which marks it as placeholder. The doc
 * names seven real industries, so the grid runs 4 + 3.
 *
 * TODO(design): two of these have no matching photo in the file yet and borrow
 * one — marked below. Aqeel to supply Government and Automotive art.
 * Each card links to its industry page (Figma 6246:1390). The homepage's
 * Industries section stays unlinked: it draws EIGHT categories with different
 * names (Construction, Food Services, Distribution & Logistics) that do not
 * map onto these seven, so half its cards would link and half would not.
 * Aqeel and Musaveer should reconcile the two lists.
 */
export const INDUSTRIES: Industry[] = [
  { t: 'Healthcare',                    img: '/images/home/ind-healthcare.png',    b: 'Hospitals and clinics can recycle retired computers and IT equipment through our licensed services.', href: href('/industries/healthcare/') },
  { t: 'Financial Services & Banking',  img: '/images/home/ind-banking.png',       b: 'Banks and financial offices can recycle retired computers and IT equipment through our licensed services.', href: href('/industries/financial-services-banking/') },
  { t: 'Education (K-12 & Higher Ed)',  img: '/images/home/ind-education.png',     b: 'Schools and universities can recycle retired computers and IT equipment through our licensed services.', href: href('/industries/education/') },
  // placeholder art
  { t: 'Government & Municipal',        img: '/images/home/ind-logistics.png',     b: 'Government offices can recycle retired computers and IT equipment through our licensed services.', href: href('/industries/government-municipal/') },
  // placeholder art
  { t: 'Automotive & Fleet',            img: '/images/home/ind-construction.png',  b: 'Auto shops and fleets can recycle airbags, computers, and IT equipment through our licensed services.', href: href('/industries/automotive-fleet/') },
  { t: 'Manufacturing & Industrial',    img: '/images/home/ind-manufacturing.png', b: 'Manufacturers and plants can recycle retired computers, batteries, and IT equipment through our licensed services.', href: href('/industries/manufacturing-industrial/') },
  { t: 'Retail & Corporate Offices',    img: '/images/home/ind-retail.png',        b: 'Retailers and offices can recycle retired computers, batteries, and IT equipment through our licensed services.', href: href('/industries/retail-corporate-offices/') },
]

/** Overrides the shared certifications paragraph — the doc writes its own. */
export const CERTIFICATIONS_BODY =
  'Recycle Technologies’ Blaine, Minnesota facilities hold active R2v3 certification, and the '
  + 'New Berlin, Wisconsin facility is currently pursuing R2v3 certification, which is pending approval.'

/* ------------------------------------------------------------ closing CTA --
 * !! PHONE NUMBER CONFLICT !! The doc gives the Wisconsin line as
 * (800) 305-3040. Every page of the live site, and this build's header, says
 * (800) 205-3040. One of them is a typo and it is not safe to guess, so the
 * published number is used here and the doc's is flagged. Confirm with Asim.
 */
export const CTA = {
  heading: 'Ready to Recycle Your Organization’s Electronics?',
  // Longer than any other page's closing heading; Figma's 417px box would
  // break it over three lines, so it takes the full 686 the body uses.
  headingWidth: 686,
  body: [
    'Get a quote for your industry, or call MN: (800) 969-5166 / WI: (800) 205-3040 to discuss '
    + 'retired electronics, IT equipment, batteries, or lighting from your organization.',
  ],
  primary:   { label: 'Get a Quote', href: QUOTE_HREF },
  secondary: { label: 'Contact Us',  href: href('/contact-us/') },
}
