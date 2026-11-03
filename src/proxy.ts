import { NextResponse, type NextRequest } from 'next/server'
import CASE_REDIRECTS from '../data/case-redirects.json'

/**
 * Redirects that differ from their destination only in letter case (1 Oct
 * 2026: /benefits-of-recycling-E-waste/ -> /benefits-of-recycling-e-waste/,
 * which a cell.com link points at).
 *
 * next.config redirects match without regard to case, so such a rule would
 * also catch the lowercase page and loop. These come from data/url-map.csv
 * like every other redirect; scripts/build-redirects.mjs writes them to
 * data/case-redirects.json instead of redirects.json. Here the path is
 * compared exactly.
 *
 * The matcher keeps this off every other request. It must list each source
 * in case-redirects.json (build-redirects.mjs fails if one is missing); it is
 * a literal because Next reads it at build time. It matches the lowercase
 * page too (matching ignores case), which passes straight through.
 */
const BY_PATH = new Map(CASE_REDIRECTS.map((r) => [r.source, r.destination]))

/**
 * JUNK URLS (4 Nov 2026, the live error log). Bots keep requesting old
 * WordPress links with a Google search string glued onto the path, e.g.
 *   /minnesota-recycling/washington-county/yts&q=washington+county+mn&ved=…
 * The catch-all renders them, 404s, and Next then tries to save that 404 to
 * its page cache under the URL as a folder name: "ENAMETOOLONG" in the log,
 * and for the shorter ones a cache file per junk URL on disk. They get a
 * plain 404 here instead, before anything renders.
 *
 * Junk: a path with & = " < > ; or a backslash in it, or any one segment over
 * 150 characters. No real page has either: the longest real segment is 66
 * characters (data/url-map.csv), and query strings are not part of the path.
 */
const JUNK_CHARS = /[&="<>;\\]/
function isJunk(pathname: string): boolean {
  let p = pathname
  try { p = decodeURIComponent(pathname) } catch { return true }
  return JUNK_CHARS.test(p) || p.split('/').some((seg) => seg.length > 150)
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (isJunk(pathname)) {
    return new NextResponse('Not found', {
      status: 404,
      headers: { 'content-type': 'text/plain; charset=utf-8', 'x-robots-tag': 'noindex', 'cache-control': 'public, max-age=86400' },
    })
  }
  const to = BY_PATH.get(pathname)
  if (!to) return NextResponse.next()
  const url = request.nextUrl.clone()
  url.pathname = to
  return NextResponse.redirect(url, 301)
}

/*
 * Every page path, for the junk check; not Next's own files, the API, or the
 * WordPress uploads and images, which never reach the catch-all. The case
 * redirect sources stay listed by name too (scripts/build-redirects.mjs
 * checks that each appears here).
 */
export const config = {
  matcher: [
    '/benefits-of-recycling-E-waste/',
    '/((?!_next/|api/|wp-content/|images/|uploads/|favicon\\.ico).*)',
  ],
}
