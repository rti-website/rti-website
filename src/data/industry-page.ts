import type { ServicePageContent } from '@/data/service-page'
import { href } from '@/lib/urls'

/**
 * Shared scaffolding for the seven industry detail pages — Figma 6246:1390.
 *
 * That frame is the service detail template minus the second prose block:
 * hero -> "Recycling Challenges in X" -> the bordered services list ->
 * certifications -> case studies -> FAQ -> CTA -> footer. So the pages reuse
 * ServiceDetailPage and only omit `process`.
 *
 * !! THESE ARE ALL NEW URLS !!
 * The live site has no industry pages. It returns HTTP 200 for any path, so
 * "does this exist" was checked by title and H1, not status code — see
 * src/data/industries.ts for the full note. There is nothing ranking on these
 * URLs, so the docs' own SEO metadata is what ships.
 *
 * !! PHONE NUMBER CONFLICT, SIX DOCS DEEP !!
 * Every closing CTA in these docs gives the Wisconsin line as (800) 305-3040.
 * The live site and this build's header both say (800) 205-3040. Rather than
 * guess, the published number is used everywhere and the discrepancy is
 * flagged once here. Confirm with Asim which is right; if it is the docs, the
 * header needs changing too, not just these pages.
 */

/** Breadcrumb trail for an industry page: Home / Industries / <name>. */
export function industryTrail(name: string) {
  return [
    { label: 'Home',       href: href('/') },
    { label: 'Industries', href: href('/industries/') },
    { label: name,         href: null },
  ]
}

/** The service pages an industry's "Recycling Services for X" list can point at. */
export const SERVICE_LINKS = {
  electronics:  href('/electronic-recycle/'),
  itad:         href('/it-asset-disposition/'),
  hardDrive:    href('/hard-drive-destruction-services/'),
  paper:        href('/paper-shredding-services/'),
  offSite:      href('/off-site-shredding/'),
  battery:      href('/battery-recycling/'),
  lightBulbs:   href('/light-bulbs/'),
  ballasts:     href('/ballasts/'),
  tv:           href('/tv-recycling/'),
  airbag:       href('/airbag-recycling/'),
  mailIn:       href('/mail-in-recycling/'),
} as const

/** Every industry doc closes the same way. */
export const CTA_BUTTONS = {
  primary:   { label: 'Get a Quote', href: href('/quote/') },
  secondary: { label: 'Contact Us',  href: href('/contact-us/') },
}

/** Every industry doc uses this compliance line verbatim. */
export const CERT_BODY =
  'Recycle Technologies follows recognized industry certification standards for responsible '
  + 'recycling, including R2v3.'

/**
 * Builds the parts of a ServicePageContent that never vary between industries,
 * so each industry file carries only its own copy.
 */
export function industryPage(input: {
  url: string
  name: string
  seo: { title: string; description: string }
  h1: string
  lead: string
  challengesHeading: string
  challenges: string[]
  servicesHeading: string
  services: { label: string; text: string; href?: string; external?: boolean }[]
  faqs: { q: string; a: string }[]
  /**
   * This industry's own hero photograph. Aqeel drew one hero frame per industry
   * on 16 Sep 2026 (6478:5242 and siblings). Omit it and the page falls back to
   * the shared interior hero.
   */
  heroImage?: string
  ctaHeading: string
  ctaBody: string[]
  todo?: string[]
}): ServicePageContent {
  return {
    url: input.url,
    liveSeo: input.seo,
    proposedSeo: input.seo,
    hero: {
      crumb: input.name,
      trail: industryTrail(input.name),
      h1: input.h1,
      lead: input.lead,
      image: input.heroImage,
      // Figma's industry hero has no button row; the docs' "[Get a Quote]" is
      // served by the closing CTA instead of adding one the design lacks.
    },
    intro: {
      heading: input.challengesHeading,
      body: input.challenges,
      more: { label: 'Read More', href: '#services' },
      image: '/images/services/detail-intro.png',
    },
    accept: {
      heading: input.servicesHeading,
      items: input.services,
    },
    certifications: { body: CERT_BODY },
    faqs: input.faqs,
    cta: {
      heading: input.ctaHeading,
      headingWidth: 686,
      body: input.ctaBody,
      ...CTA_BUTTONS,
    },
    ...(input.todo ? { todo: input.todo } : {}),
  }
}
