/**
 * THE MISSING SLASH IN THE IMPORTED POSTS — 26 Sep 2026.
 *
 * The SEO team's crawl found ~210 images and ~36 links per post pointing at
 *   https://www.recycletechnologies.comwp-content/uploads/...
 *   https://www.recycletechnologies.comelectronic-recycle/
 * — the domain and the path run together, no slash between them. Browsers
 * read "www.recycletechnologies.comwp-content" as the HOST, which does not
 * exist, so every one of them fails with "Could not resolve DNS".
 *
 * The markup came in that way from WordPress: scripts/wp-import.mjs stores
 * each post's HTML exactly as the old site served it, and the old site
 * already had these (a search-and-replace on the WordPress database at some
 * point ate the slash after the domain). The import could not tell: to it
 * they were images on some other host that would not load, and it left them
 * as found. So they were broken on WordPress too; now they are ours to fix.
 *
 * Two fixes, and both are needed:
 *  1. db/009_legacy_url_slash.sql repairs the stored rows once, on each
 *     database (dev and live).
 *  2. fixLegacyUrls() below repairs the same thing at read time, so a row the
 *     SQL has not reached yet (or a future import) still renders right.
 *
 * The site's own hostnames are also normalised: the crawl reached pages on
 * `ww.` and `www.ww.` variants, and any such link in a body would keep
 * visitors on the wrong host. Everything becomes the canonical www.
 */

const BAD_JOIN = /(https?:\/\/(?:www\.)?recycletechnologies\.com)(?=[A-Za-z0-9_])/g
const ODD_HOST = /https?:\/\/(?:www\.)?(?:ww\.)+recycletechnologies\.com/gi

export function fixLegacyUrls(s: string): string {
  if (!s || !s.includes('recycletechnologies.com')) return s
  return s
    .replace(ODD_HOST, 'https://www.recycletechnologies.com')
    .replace(BAD_JOIN, '$1/')
}

/** For a single URL field (og:image, canonical). Empty stays empty. */
export function fixLegacyUrl(s: string | null | undefined): string | null {
  if (!s) return null
  return fixLegacyUrls(s)
}
