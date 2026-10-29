import { NextResponse, after } from 'next/server'
import { randomUUID } from 'node:crypto'
import { visitorConfig } from '@/lib/visitor/config'
import { analyticsConsent, gpcSignal, visitorIdFrom, VISITOR_COOKIE, VISITOR_COOKIE_MAX_AGE } from '@/lib/visitor/consent'
import { isBotUserAgent } from '@/lib/visitor/bot'
import { clientIpFrom, maskIp } from '@/lib/visitor/ip'
import { cleanAttribution } from '@/lib/visitor/source'
import { inTurn, recordLeave, recordPageView, resolveVisitor } from '@/lib/visitor/store'

/**
 * /api/e/ — the visitor identification endpoint (docs/visitor-identification/
 * BRIEF.md section 3). Named "e", not "track", because ad blockers block
 * "track" paths. Called with the trailing slash (next.config trailingSlash).
 *
 * Every request is checked, in this order, and answered 204 with nothing
 * stored when a check fails:
 *   1. VISITOR_CAPTURE is on (off by default: production stays dark);
 *   2. the request comes from this site (Origin header);
 *   3. Analytics consent in the rti_consent cookie, and no Global Privacy
 *      Control (Sec-GPC). A visitor who declined or withdrew also loses their
 *      rti_vid cookie here;
 *   4. not a crawler or script (user agent), and not a flood (store.ts);
 *   5. not from a cloud or data centre network already looked up
 *      (classify.ts 'datacenter'; management, 30 Oct 2026).
 *
 * Then it sets rti_vid (a random UUID, HttpOnly, 13 months) and stores the
 * page view after the response (after()), so the page never waits.
 *
 * Bodies, as sent by src/components/client/VisitorTracker.tsx:
 *   { t: 'pv', path, title, ref, qs: {gclid…}, attr: {…}, sec }   a page view
 *   { t: 'leave', sec }                                             seconds on the last page
 *   { t: 'forget' }                                                 consent withdrawn
 *
 * Nothing about a visitor, a company or a Visitor lead is ever readable here:
 * it only accepts writes (brief section 9: no endpoint exposes that data).
 */

export const dynamic = 'force-dynamic'

const MAX_BODY = 4096

/* A per process ceiling per IP, to keep a misbehaving client off the database
   (the brief's per visitor flood rule is checked in the database by store.ts). */
const hits = new Map<string, { n: number; reset: number }>()
function tooFast(key: string): boolean {
  const now = Date.now()
  const h = hits.get(key)
  if (!h || h.reset < now) { hits.set(key, { n: 1, reset: now + 60_000 }); if (hits.size > 5000) hits.clear(); return false }
  h.n += 1
  return h.n > 120
}

function secure(): boolean {
  // Same rule as the admin session cookie (src/lib/auth.ts): explicit, never
  // inferred from a proxy header.
  if (process.env.NODE_ENV !== 'production') return false
  return process.env.ADMIN_ALLOW_HTTP !== 'true'
}

function setVisitorCookie(res: NextResponse, id: string) {
  res.cookies.set(VISITOR_COOKIE, id, {
    httpOnly: true, sameSite: 'lax', secure: secure(), path: '/', maxAge: VISITOR_COOKIE_MAX_AGE,
  })
}

function clearVisitorCookie(res: NextResponse) {
  res.cookies.set(VISITOR_COOKIE, '', { httpOnly: true, sameSite: 'lax', secure: secure(), path: '/', maxAge: 0 })
}

const empty = () => new NextResponse(null, { status: 204, headers: { 'cache-control': 'no-store' } })

function sameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin')
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host')
  if (!origin) return false
  try {
    const o = new URL(origin)
    // Behind a proxy that does not pass Host through, fall back to our own domains.
    return o.host === host || /(^|\.)recycletechnologies\.com$/i.test(o.hostname) || o.hostname === 'localhost' || o.hostname === '127.0.0.1'
  } catch { return false }
}

export async function POST(req: Request): Promise<Response> {
  if (!visitorConfig.captureOn()) return empty()
  if (!sameOrigin(req)) return new NextResponse(null, { status: 403 })

  const ip = clientIpFrom(req.headers, visitorConfig.clientIpHeader())
  if (visitorConfig.debugIp()) {
    const seen = ['x-forwarded-for', 'x-real-ip', 'forwarded', 'cf-connecting-ip', 'true-client-ip']
      .map((h) => `${h}=${req.headers.get(h) ? req.headers.get(h)!.split(',').map((x) => maskIp(x.trim())).join('|') : '-'}`)
      .join(' ')
    console.log(`[visitor] debug ip: using ${visitorConfig.clientIpHeader()} -> ${maskIp(ip)} · ${seen}`)
  }

  const cookieHeader = req.headers.get('cookie')
  const known = visitorIdFrom(cookieHeader)

  let raw = ''
  try { raw = (await req.text()).slice(0, MAX_BODY) } catch { return empty() }
  let b: Record<string, unknown> = {}
  try { b = JSON.parse(raw) as Record<string, unknown> } catch { return empty() }

  // Consent withdrawn, never given, or Global Privacy Control: nothing kept,
  // and the visitor cookie goes.
  if (b.t === 'forget' || !analyticsConsent(cookieHeader) || gpcSignal(req.headers)) {
    const res = empty()
    if (known) clearVisitorCookie(res)
    return res
  }

  const ua = req.headers.get('user-agent') ?? ''
  if (isBotUserAgent(ua)) return empty()
  if (tooFast(ip ?? known ?? 'none')) return empty()

  if (b.t === 'leave') {
    const sec = Number(b.sec)
    if (known && Number.isFinite(sec)) after(() => inTurn(known, () => recordLeave(known, sec)).catch((e) => console.error('[visitor] leave:', (e as Error).message)))
    return empty()
  }
  if (b.t !== 'pv' || typeof b.path !== 'string' || !b.path.startsWith('/')) return empty()
  if (b.path.startsWith('/admin') || b.path.startsWith('/api/')) return empty()

  // The same visitor for the same IP (store.ts resolveVisitor); nothing at all
  // from a cloud or data centre network already looked up.
  let resolved: { id: string; excluded: boolean }
  try { resolved = await resolveVisitor(known, ip, ua) } catch { resolved = { id: known ?? randomUUID(), excluded: false } }
  if (resolved.excluded) return empty()
  const visitorId = resolved.id
  const sec = Number(b.sec)
  const input = {
    visitorId,
    ip,
    userAgent: ua,
    path: b.path.split('?')[0]!.split('#')[0]!,
    title: typeof b.title === 'string' ? b.title : null,
    referrer: typeof b.ref === 'string' ? b.ref : null,
    params: cleanAttribution(b.qs),
    firstTouch: cleanAttribution(b.attr),
    previousSeconds: Number.isFinite(sec) && sec >= 0 ? sec : null,
  }
  after(async () => {
    try {
      const r = await inTurn(visitorId, () => recordPageView(input))
      if (r === 'flood') console.warn(`[visitor] flood: ${visitorId.slice(0, 8)} over the page view limit, not stored`)
    } catch (err) {
      console.error('[visitor] page view not stored:', (err as Error).message)
    }
  })

  const res = empty()
  setVisitorCookie(res, visitorId)
  return res
}
