import { SITE } from './site'

/**
 * The ONLY place in this repo where a URL is constructed.
 *
 * Why this file exists: trailing-slash drift between internal links, canonical
 * tags and the sitemap is the most common way a migration doubles its URL
 * footprint in Google's index. One function, one behaviour, everywhere.
 *
 * Rule: never write `${SITE.origin}${path}` anywhere else. Import from here.
 */

/** Normalise any path to the site's canonical form: leading and trailing slash. */
export function path(input: string): string {
  if (!input || input === '/') return '/'
  // Strip origin if someone passed a full URL.
  const p = input.replace(/^https?:\/\/[^/]+/i, '')
  // Leave real files and .well-known alone — Next does not slash these either.
  if (/\.[a-z0-9]{2,5}$/i.test(p) || p.startsWith('/.well-known')) {
    return p.startsWith('/') ? p : `/${p}`
  }
  const withLeading = p.startsWith('/') ? p : `/${p}`
  const collapsed = withLeading.replace(/\/{2,}/g, '/')
  return collapsed.endsWith('/') ? collapsed : `${collapsed}/`
}

/** Absolute canonical URL. Use for canonical tags, sitemap, og:url, JSON-LD. */
export function absolute(input: string): string {
  return `${SITE.origin}${path(input)}`
}

/** Internal <Link href> value. Identical to path() — kept separate for intent. */
export function href(input: string): string {
  return path(input)
}

/** True when the given href points off-site. */
export function isExternal(input: string): boolean {
  return /^https?:\/\//i.test(input) && !input.startsWith(SITE.origin)
}

/**
 * Where every "Get a Quote" button goes.
 *
 * It used to be `/quote/`, which is a KEEP row in url-map.csv but has no page
 * in this build — so all thirty-odd of those buttons 404'd, the hero's
 * included. Asim caught the hero one on 21 Sep 2026 ("when user click on get a
 * quote land on contact page"), so they now all go to /contact-us/, whose form
 * IS the quote form (its heading is literally "Get a Quote").
 *
 * ONE constant rather than thirty edits: when /quote/ gets built, or gets a
 * 301 to /contact-us/ in url-map.csv, this line is the only thing to change.
 * /quote/ still needs one of those two before launch — it ranks today.
 *
 * Since 25 Sep 2026 it lands ON THE FORM, not at the top of /contact-us/
 * (Asim: "when someone click on get a quote land them here directly in form
 * not on top of the page, do this in all get a quote places"). Same anchor as
 * CONTACT_FORM_HREF and quoteHref() below, so every quote button on the site,
 * with or without a preselected service, arrives at the same place.
 */
export const QUOTE_HREF = `${path('/contact-us/')}#contact-form`

/**
 * The contact form itself, rather than the top of the page it sits on.
 *
 * Used by the "Don't See Your Item?" email band, which captures an address and
 * had nowhere to send it — Asim, 22 Sep 2026: "on click it should go to form".
 * The anchor is rendered by ContactSection; see the note there for why it is an
 * offset span and not an id on the form element.
 *
 * Built here, not at the call site: rule 3 in CLAUDE.md. If /contact-us/ ever
 * moves, this and QUOTE_HREF are the two lines that change.
 */
export const CONTACT_FORM_HREF = `${path('/contact-us/')}#contact-form`

/**
 * The contact form with its service and/or location already chosen — what the
 * homepage hero's quote card submits, as a plain link. ContactForm reads both
 * (`?service=` selects the service, `?location=` fills State; see
 * HERO_LOCATIONS). Used by the state landing pages, 24 Sep 2026.
 */
export function quoteHref(q: { service?: string; location?: string }): string {
  const params = new URLSearchParams()
  if (q.service) params.set('service', q.service)
  if (q.location) params.set('location', q.location)
  const qs = params.toString()
  return `${path('/contact-us/')}${qs ? `?${qs}` : ''}#contact-form`
}

/**
 * One case study on /case-studies/, rather than the top of the page.
 *
 * The homepage and service-page story carousel links each story here — Asim,
 * 23 Sep 2026: "when user click on it land on their respective case study
 * page". There is no page per case study (each one is a PDF, opened from its
 * card), so the destination is that card: CaseStudyFilter renders an offset
 * anchor per card and, on arrival, sets the industry filter to match, so the
 * visitor lands looking at the story they clicked.
 *
 * `id` is a CaseStudyCard id from src/data/case-studies.ts.
 */
export function caseStudyHref(id: string): string {
  return `${path('/case-studies/')}#${id}`
}
