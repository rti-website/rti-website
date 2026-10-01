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

export function proxy(request: NextRequest) {
  const to = BY_PATH.get(request.nextUrl.pathname)
  if (!to) return NextResponse.next()
  const url = request.nextUrl.clone()
  url.pathname = to
  return NextResponse.redirect(url, 301)
}

export const config = {
  matcher: ['/benefits-of-recycling-E-waste/'],
}
