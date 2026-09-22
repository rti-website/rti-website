import { NextResponse } from 'next/server'
import { one } from '@/lib/db'

/**
 * Newsletter sign-ups — the footer form and the blog inline form.
 *
 * ===========================================================================
 * WHY THIS EXISTS — Asim, 22 Sep 2026: "in footer the -> button and yes please
 * buttons is not working"
 * ===========================================================================
 * The third instance of the same story on this build, after `leads` and
 * `social_links`: the `subscribers` table has existed since 001_init.sql, the
 * admin has a whole Subscribers screen reading it (and a dashboard tile
 * counting it), and NOTHING HAS EVER WRITTEN A ROW. Both newsletter forms
 * called preventDefault() and stopped, with a TODO saying so. A visitor typed
 * an address, ticked the consent box, clicked, and nothing happened anywhere.
 *
 * Same shape as /api/leads deliberately — honeypot, per-IP throttle, loose
 * email check, database first. Read the notes there; they apply here too.
 *
 * NO NOTIFICATION EMAIL. A lead is someone waiting for a human to reply, so it
 * pings an inbox. A subscriber is a row in a list nobody has to action today,
 * and mailing the team on every sign-up trains them to ignore the address that
 * also carries real enquiries. The admin screen is where these are read.
 *
 * STATUS IS 'pending', NOT 'confirmed'. This endpoint records that someone
 * asked; it does not prove they own the address. Confirmation needs a mail with
 * a one-time link, which needs the `unsubscribe_token` pattern the schema
 * already provides and a route to land on — not built yet. Until it is, treat
 * 'pending' as "asked to join, not yet verified" and do not bulk-send to them.
 * See the TODO at the bottom.
 */

/** Which form sent this. The column's CHECK constraint lists the valid set. */
const SOURCES = ['footer', 'blog_inline', 'gated_pdf', 'quote_form_optin'] as const
type Source = (typeof SOURCES)[number]

type Payload = { email?: unknown; name?: unknown; source?: unknown; sourcePage?: unknown; website?: unknown }

function clean(v: unknown, max: number): string | null {
  if (typeof v !== 'string') return null
  const s = v.trim().slice(0, max)
  return s.length ? s : null
}

/* Same in-memory speed bump as /api/leads, with its own counter so a burst of
   sign-ups cannot lock someone out of the contact form. Resets on deploy and
   does not survive more than one process — see the note there. */
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

  // Honeypot — answer 200 so the bot thinks it worked. See /api/leads.
  if (typeof payload.website === 'string' && payload.website.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
  if (ip && tooMany(ip)) {
    return NextResponse.json(
      { error: 'That is a lot of sign-ups. Give it a few minutes.' },
      { status: 429 },
    )
  }

  const email = clean(payload.email, 200)
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please check the email address.' }, { status: 400 })
  }

  const source: Source = SOURCES.includes(payload.source as Source)
    ? (payload.source as Source)
    : 'footer'
  const name = clean(payload.name, 120)
  const sourcePage = clean(payload.sourcePage, 300)
  const ua = clean(req.headers.get('user-agent'), 500)

  try {
    /*
     * ON CONFLICT rather than a pre-check: the email column is UNIQUE, and
     * someone signing up twice is a normal thing to do, not an error to show
     * them. A second sign-up refreshes the consent evidence — which is the
     * point of storing it — but must NEVER resurrect an unsubscribed row.
     * Someone who opted out and later hits the footer form by accident stays
     * opted out; re-subscribing has to be a deliberate act, and this endpoint
     * cannot tell the difference.
     */
    await one(
      `INSERT INTO subscribers (email, name, status, source_page, source_type,
                                consent_ip, consent_user_agent)
       VALUES ($1, $2, 'pending', $3, $4, $5, $6)
       ON CONFLICT (email) DO UPDATE
         SET consent_at         = now(),
             consent_ip         = EXCLUDED.consent_ip,
             consent_user_agent = EXCLUDED.consent_user_agent,
             source_page        = COALESCE(EXCLUDED.source_page, subscribers.source_page),
             name               = COALESCE(EXCLUDED.name, subscribers.name)
         WHERE subscribers.status <> 'unsubscribed'
       RETURNING id`,
      [email, name, sourcePage, source, ip, ua],
    )
  } catch (err) {
    console.error('[subscribe] insert failed:', (err as Error).message)
    return NextResponse.json(
      { error: 'We could not sign you up just now. Please try again shortly.' },
      { status: 500 },
    )
  }

  /*
   * Always 200 from here, including for the unsubscribed row the WHERE clause
   * declined to touch. Telling a visitor "you previously unsubscribed" leaks
   * that an address is on the list to anyone who can type it into a public
   * form, and this one is on every page of the site.
   *
   * TODO(phase-2): double opt-in. Mail a one-time link built from
   * unsubscribe_token, set status='confirmed' and confirmed_at on click, and
   * add the unsubscribe route the token was designed for. Until that ships,
   * nothing should bulk-send to a 'pending' row.
   */
  return NextResponse.json({ ok: true })
}
