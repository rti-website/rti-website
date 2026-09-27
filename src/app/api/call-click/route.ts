import { NextResponse, after } from 'next/server'
import { one, q } from '@/lib/db'
import { ATTRIBUTION_KEYS, readAttribution } from '@/lib/tracking'
import { locateLead } from '@/lib/lead-location'

/**
 * A visitor tapped a phone number on the site — 27 Sep 2026.
 *
 * Asim: "if a lead comes to our website and, instead of Get a Quick Quote,
 * clicks the number and calls, we want his data: the number, anything
 * possible." The browser never learns the caller's own number — only the
 * phone company does — so what the site CAN keep is everything around the
 * tap: which number they tapped, on which page, when, where they are (IP),
 * their device, and how they found the site (the ad click or search that
 * brought them, from the attribution cookie). That is saved as an enquiry
 * with channel "phone" and no name, so it sits in Admin -> Enquiries next to
 * the phone call it turned into; whoever answers matches the two by time and
 * fills in the caller's details.
 *
 * The tracking bootstrap (src/lib/tracking.ts) sends this with sendBeacon the
 * moment a tel: link is tapped, so the record is made even though the page
 * is about to hand over to the phone app. GTM gets a `click_to_call` event
 * at the same time, for Ads and GA4.
 *
 * Only tel: links count (a US number: the two 800 lines, the two facilities,
 * and the partner sites on the location pages), and the same visitor tapping
 * the same number twice within ten minutes is one record, not two (people
 * tap, get the "call?" prompt, and tap again).
 * A crawler cannot reach this: it needs a POST with a JSON body.
 */

const hits = new Map<string, number>()   // `${ip}|${number}` -> last accepted time
const DEDUPE_MS = 10 * 60 * 1000

export async function POST(req: Request) {
  let body: { number?: unknown; page?: unknown; label?: unknown } = {}
  try { body = await req.json() } catch { return NextResponse.json({ ok: false }, { status: 400 }) }

  const digits = String(body.number ?? '').replace(/\D/g, '').replace(/^1?(\d{10})$/, '1$1')
  if (!/^1[2-9]\d{9}$/.test(digits)) return NextResponse.json({ ok: false }, { status: 400 })
  const pretty = `+1 ${digits.slice(1, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`
  const page = typeof body.page === 'string' ? body.page.slice(0, 500) : null
  const label = typeof body.label === 'string' ? body.label.trim().slice(0, 80) : ''

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
  const key = `${ip ?? '-'}|${digits}`
  const now = Date.now()
  const last = hits.get(key)
  if (last && now - last < DEDUPE_MS) return NextResponse.json({ ok: true, dup: true })
  hits.set(key, now)
  if (hits.size > 5000) hits.clear()

  const path = page ? (() => { try { return new URL(page).pathname } catch { return page } })() : null
  const detail = `Tapped ${pretty}${path ? ` on ${path}` : ''}`

  let id: number | null = null
  try {
    const row = await one<{ id: number }>(`
      INSERT INTO leads (type, name, email, phone, company, message, details, source_page, ip, status, channel, channel_detail)
      VALUES ('callback', NULL, NULL, NULL, NULL, NULL, $1::jsonb, $2, $3, 'new', 'phone', $4)
      RETURNING id`,
      [JSON.stringify({ callClick: pretty, clickedFrom: path ?? '', clickLabel: label }), path, ip, detail])
    id = row?.id ?? null
  } catch (err) {
    // A database without db/010 has no channel column; the tap is simply not kept.
    console.error('[call-click] not saved:', (err as Error).message)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
  if (!id) return NextResponse.json({ ok: false }, { status: 500 })

  // How they found us, same as a form lead (lead_attribution, db/006).
  const attr = readAttribution(req.headers.get('cookie'))
  try {
    const cols = [...ATTRIBUTION_KEYS, 'landing_page', 'referrer'] as const
    await q(
      `INSERT INTO lead_attribution (lead_id, ${cols.join(', ')}, submit_page, user_agent, captured_at)
       VALUES ($1, ${cols.map((_, i) => `$${i + 2}`).join(', ')}, $${cols.length + 2}, $${cols.length + 3}, $${cols.length + 4})
       ON CONFLICT (lead_id) DO NOTHING`,
      [id, ...cols.map((k) => attr?.[k] ?? null), page,
        (req.headers.get('user-agent') ?? '').slice(0, 500),
        attr?.captured_at && !Number.isNaN(Date.parse(attr.captured_at)) ? attr.captured_at : null])
  } catch (err) {
    console.error('[call-click] attribution not saved:', (err as Error).message)
  }
  try { await q("INSERT INTO lead_activity (lead_id, kind, body) VALUES ($1, 'created', $2)", [id, detail]) } catch { /* pre-010 */ }

  const leadId = id
  after(() => locateLead(leadId))
  return NextResponse.json({ ok: true })
}
