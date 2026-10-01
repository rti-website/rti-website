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

/**
 * Our own absolute image URL as a site path, for next/image — 1 Oct 2026.
 *
 * The SEO crawl of 29 Sep found two post heroes answering 400:
 *   /_next/image/?url=https://www.recycletechnologies.com/wp-content/uploads/...
 * A post's og_image_url is stored absolute (it is also the og:image, which
 * must stay absolute), and next/image refuses an absolute URL on a host that
 * is not in images.remotePatterns, even our own. The picture itself is fine
 * at its path, so the hero gets the path. Other hosts are left as they are.
 */
const OWN_ORIGIN = /^https?:\/\/(?:www\.)?recycletechnologies\.com(?=\/)/i

export function localImagePath(s: string | null | undefined): string | null {
  const url = fixLegacyUrl(s)
  return url ? url.replace(OWN_ORIGIN, '') : null
}
