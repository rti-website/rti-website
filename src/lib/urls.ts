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
 */
export const QUOTE_HREF = path('/contact-us/')
