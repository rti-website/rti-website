/**
 * The server's own reading of the visitor's consent (brief section 9), so a
 * request that skipped the banner still stores nothing. Pure, see ip.ts.
 *
 * The banner (src/components/client/CookieConsent.tsx, src/lib/tracking.ts)
 * stores the choice in the rti_consent cookie as {"v":1,"a":true|false,"t":…}.
 * The browser's Global Privacy Control arrives as the Sec-GPC: 1 header.
 */

export function readCookie(header: string | null | undefined, name: string): string | null {
  if (!header) return null
  for (const part of header.split(';')) {
    const i = part.indexOf('=')
    if (i < 0) continue
    if (part.slice(0, i).trim() === name) {
      try { return decodeURIComponent(part.slice(i + 1).trim()) } catch { return part.slice(i + 1).trim() }
    }
  }
  return null
}

export function analyticsConsent(cookieHeader: string | null | undefined): boolean {
  const raw = readCookie(cookieHeader, 'rti_consent')
  if (!raw) return false
  try { return (JSON.parse(raw) as { a?: unknown }).a === true } catch { return false }
}

export function gpcSignal(headers: Headers): boolean {
  return headers.get('sec-gpc') === '1'
}

/** The visitor cookie (brief section 4): a random UUID, nothing else. */
export const VISITOR_COOKIE = 'rti_vid'
/** 13 months. */
export const VISITOR_COOKIE_MAX_AGE = 395 * 24 * 60 * 60

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function visitorIdFrom(cookieHeader: string | null | undefined): string | null {
  const v = readCookie(cookieHeader, VISITOR_COOKIE)
  return v && UUID.test(v) ? v.toLowerCase() : null
}
