import { NextResponse } from 'next/server'
import { one } from '@/lib/db'
import { mailConfigured, notifyAddress, sendMail } from '@/lib/mail'

/**
 * Where the public forms post — the first public endpoint in the build.
 *
 * Until 21 Sep 2026 every form on this site called preventDefault() and did
 * nothing else: three of them carried a TODO saying so, the `leads` table had
 * existed since 001_init.sql with nothing ever writing to it, and the admin's
 * Leads screen read a table that could only ever be empty. A visitor filling in
 * the contact form got no error and no reply, because their enquiry went
 * nowhere at all. This closes that.
 *
 * ORDER MATTERS: write the row, THEN try to mail. The database is the record;
 * the email is a notification about it. If SMTP is down, the enquiry is still
 * captured and shows up in the admin, and the visitor still sees a thank-you.
 * The reverse order loses enquiries whenever mail has a bad minute.
 *
 * Dynamic by design, like the admin routes — a route handler is not wrapped by
 * app/layout.tsx, so `dynamic = 'error'` (CLAUDE.md rule 2) does not apply and
 * nothing about the prerendered public pages changes. See lib/admin-route.ts.
 */

/** Cap every field. A form post is untrusted input, not a document store. */
const LIMITS: Record<string, number> = {
  name: 120, email: 200, phone: 40, company: 160, message: 5000,
  address: 200, city: 80, state: 80, zip: 20, item: 80, audience: 40, referral: 80,
}

const TYPES = ['contact', 'quote', 'download', 'callback'] as const
type LeadType = (typeof TYPES)[number]

type Payload = Record<string, unknown> & { type?: string; website?: string }

function clean(v: unknown, max: number): string | null {
  if (typeof v !== 'string') return null
  const s = v.trim().slice(0, max)
  return s.length ? s : null
}

/* A dumb-but-effective throttle: same IP, more than 5 posts in 10 minutes.
   In-memory, so it resets on deploy and does not survive more than one process.
   That is fine for what it is — a speed bump in front of a form, not a WAF.
   If this ever needs to be real, it belongs in nginx or Cloudflare, not here. */
const hits = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_IN_WINDOW = 5

function tooMany(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > MAX_IN_WINDOW
}

export async function POST(req: Request): Promise<Response> {
  let payload: Payload
  try {
    payload = (await req.json()) as Payload
  } catch {
    return NextResponse.json({ error: 'Could not read that.' }, { status: 400 })
  }

  /* Honeypot. A real person never fills a field they cannot see; most bots
     fill every input they find. Answer 200 so the bot believes it worked and
     does not come back to try a different shape. */
  if (typeof payload.website === 'string' && payload.website.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
  if (ip && tooMany(ip)) {
    return NextResponse.json(
      { error: 'That is a lot of messages. Give it a few minutes, or call us.' },
      { status: 429 },
    )
  }

  const email = clean(payload.email, LIMITS.email ?? 200)
  // Deliberately loose. Anything stricter rejects addresses that are perfectly
  // valid, and the cost of a bad address here is one unanswerable enquiry.
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please check the email address.' }, { status: 400 })
  }

  const type: LeadType = TYPES.includes(payload.type as LeadType)
    ? (payload.type as LeadType)
    : 'contact'

  const name = clean(payload.name, LIMITS.name ?? 120)
  const phone = clean(payload.phone, LIMITS.phone ?? 40)
  const company = clean(payload.company, LIMITS.company ?? 160)
  const message = clean(payload.message, LIMITS.message ?? 5000)
  const sourcePage = clean(payload.sourcePage, 300)

  /* Everything the leads table has no column for. The schema comment on
     `details` asks for exactly this rather than twenty sparse columns. */
  const details: Record<string, string> = {}
  // `referral` is the ITAD pickup form's "How did you hear about us?"
  // (PickupForm, 23 Sep 2026).
  for (const key of ['address', 'city', 'state', 'zip', 'item', 'audience', 'referral']) {
    const v = clean(payload[key], LIMITS[key] ?? 120)
    if (v) details[key] = v
  }

  let id: number | null = null
  try {
    const row = await one<{ id: number }>(
      `INSERT INTO leads (type, name, email, phone, company, message, details, source_page, ip)
       VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8, $9) RETURNING id`,
      [type, name, email, phone, company, message, JSON.stringify(details), sourcePage, ip],
    )
    id = row?.id ?? null
  } catch (err) {
    console.error('[leads] insert failed:', (err as Error).message)
    return NextResponse.json(
      { error: 'We could not save that just now. Please call us instead.' },
      { status: 500 },
    )
  }

  // --------------------------------------------------------------- notify --
  const to = notifyAddress()
  let notified = false
  if (to && mailConfigured()) {
    const lines = [
      `A new ${type} enquiry came in from the website.`,
      '',
      `Name:     ${name ?? '(not given)'}`,
      `Email:    ${email}`,
      `Phone:    ${phone ?? '(not given)'}`,
      `Company:  ${company ?? '(not given)'}`,
      ...Object.entries(details).map(([k, v]) => `${(k[0]!.toUpperCase() + k.slice(1) + ':').padEnd(10)}${v}`),
      '',
      'Message:',
      message ?? '(none)',
      '',
      `Page:     ${sourcePage ?? '(unknown)'}`,
      `Lead ID:  ${id ?? '(unknown)'}`,
    ]
    const result = await sendMail({
      to,
      subject: `Website enquiry — ${name ?? email}`,
      text: lines.join('\n'),
      // Replying to the notification replies to the person who wrote in.
      replyTo: email,
    })
    notified = result.sent
  } else if (!to) {
    console.warn('[leads] saved, but LEAD_NOTIFY_TO is not set — nobody was emailed.')
  } else {
    console.warn('[leads] saved, but SMTP is not configured — nobody was emailed.')
  }

  // `notified` is for the server log and for QA on staging. The visitor is told
  // their message arrived, which it did — whether an inbox pinged is our
  // problem, not theirs.
  return NextResponse.json({ ok: true, notified })
}
