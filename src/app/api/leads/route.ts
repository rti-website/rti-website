import { NextResponse } from 'next/server'
import { one } from '@/lib/db'
import { mailConfigured, notifyAddress, sendMail } from '@/lib/mail'
import { toE164 } from '@/lib/phone'
import { stateCode } from '@/lib/us-address'
import { FORM, SERVICE_INTEREST } from '@/data/contact'
import { fail, formDone, readBody } from '@/lib/form-post'
import { RESIDENTIAL_REPLY, residentialReplyHtml, residentialReplyText } from '@/data/emails'
import { ATTRIBUTION_KEYS, readAttribution } from '@/lib/tracking'

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
  firstName: 60, lastName: 60, service: 80,
}

/**
 * The contact form's rules — the lead-form spec Asim sent on 23 Sep 2026
 * ("2.1 Visible fields"; the table is in src/data/contact.ts above FORM).
 * Applied when a post carries firstName/lastName, which only that form sends;
 * the other forms keep the looser checks below. The browser runs the same
 * rules first (ContactForm), but this is the copy that decides.
 *
 * Returns the cleaned values, or the field that failed and why — the form
 * focuses that field and shows the message.
 */
function validateSpecForm(p: Payload):
  | { ok: true; name: string; phone: string; zip: string; service: string; message: string | null; details: Record<string, string> }
  | { ok: false; field: string; error: string } {
  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')
  const first = str(p.firstName)
  const last = str(p.lastName)
  if (first.length < 2 || first.length > 60) return { ok: false, field: 'firstName', error: 'Please enter your first name (2 to 60 characters).' }
  if (last.length < 2 || last.length > 60) return { ok: false, field: 'lastName', error: 'Please enter your last name (2 to 60 characters).' }

  const phone = toE164(str(p.phone))
  if (!phone) return { ok: false, field: 'phone', error: 'Please enter a US phone number, e.g. (763) 559-5130.' }

  // Required since 23 Sep 2026 (Asim: "make optional only the address and
  // message, other things are compulsory"). The messages match ContactForm's.
  if (!str(p.company)) return { ok: false, field: 'company', error: 'Please enter your company name.' }
  if (!str(p.city)) return { ok: false, field: 'city', error: 'Please enter your city.' }
  // Stored as the postal code ("Minnesota" -> "MN"), so every lead reads alike.
  const state = stateCode(str(p.state))
  if (!state) return { ok: false, field: 'state', error: 'Please enter a US state, e.g. MN or Minnesota.' }
  const zip = str(p.zip)
  if (!/^\d{5}$/.test(zip)) return { ok: false, field: 'zip', error: 'Please enter a 5 digit ZIP code.' }
  // Whether the ZIP matches the city is NOT checked here. The form points out
  // a mismatch and offers the fix, but a real enquiry is never refused over
  // it: the table can be out of date, and towns go by more than one name.

  // One of the listed services — anything else is refused rather than stored,
  // so the Lead Hub can route on it.
  const wanted = str(p.service)
  const service = (SERVICE_INTEREST as readonly string[]).includes(wanted) ? wanted : null
  if (!service) return { ok: false, field: 'service', error: 'Please choose what you would like to recycle.' }

  const message = str(p.message) || null
  if (message && message.length > FORM.messageMax) {
    return { ok: false, field: 'message', error: `Please keep the message under ${FORM.messageMax} characters.` }
  }

  if (p.consent !== true) return { ok: false, field: 'consent', error: 'Please tick the box so we can contact you.' }

  const details: Record<string, string> = {
    firstName: first,
    lastName: last,
    consent: FORM.consent,
    consentAt: new Date().toISOString(),
  }
  details.service = service
  // Address fields and "Is it for?" — back on the form 23 Sep 2026. Stored in
  // `details` with the rest (the leads table has no columns for them).
  for (const key of ['address', 'city'] as const) {
    const v = str(p[key]).slice(0, LIMITS[key] ?? 120)
    if (v) details[key] = v
  }
  details.state = state
  details.zip = zip
  const audience = str(p.audience)
  if ((FORM.audiences as readonly string[]).includes(audience)) details.audience = audience
  return { ok: true, name: `${first} ${last}`, phone, zip, service, message, details }
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

/**
 * A plain form post (no script yet — see src/lib/form-post.ts) carries the raw
 * fields, where the script sends them already shaped. Shape them the same way
 * so the rules below see one payload whichever way it arrived.
 */
function fromForm(p: Payload, from: string | null): Payload {
  const out: Payload = { ...p }
  // A ticked checkbox posts its value ("yes"); an unticked one posts nothing.
  out.consent = p.consent === 'yes' || p.consent === 'on'
  // The ITAD pickup form (type=quote) asks for first and last name but posts
  // one `name`, and calls "How did you hear about us?" `heard`.
  if (p.type === 'quote') {
    out.name = [p.firstName, p.lastName].filter((v) => typeof v === 'string' && v.trim()).join(' ')
    delete out.firstName
    delete out.lastName
    if (typeof p.heard === 'string') out.referral = p.heard
  }
  if (typeof out.sourcePage !== 'string' && from) out.sourcePage = from
  return out
}

export async function POST(req: Request): Promise<Response> {
  const body = await readBody(req)
  if (!body) return NextResponse.json({ error: 'Could not read that.' }, { status: 400 })
  const payload: Payload = body.isForm ? fromForm(body.payload as Payload, body.from) : (body.payload as Payload)

  /* Honeypot. A real person never fills a field they cannot see; most bots
     fill every input they find. Answer 200 so the bot believes it worked and
     does not come back to try a different shape. */
  if (typeof payload.website === 'string' && payload.website.trim() !== '') {
    return body.isForm ? formDone() : NextResponse.json({ ok: true })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
  if (ip && tooMany(ip)) {
    return fail(body, 'That is a lot of messages. Give it a few minutes, or call us.', 429)
  }

  // Lowercased on save (the spec's rule; harmless for every other form).
  const email = clean(payload.email, LIMITS.email ?? 200)?.toLowerCase() ?? null
  // Deliberately loose. Anything stricter rejects addresses that are perfectly
  // valid, and the cost of a bad address here is one unanswerable enquiry.
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return fail(body, 'Please check the email address.', 400, { field: 'email' })
  }

  const spec = typeof payload.firstName === 'string' || typeof payload.lastName === 'string'
    ? validateSpecForm(payload)
    : null
  if (spec && !spec.ok) {
    return fail(body, spec.error, 400, { field: spec.field })
  }

  const type: LeadType = TYPES.includes(payload.type as LeadType)
    ? (payload.type as LeadType)
    : 'contact'

  const name = spec?.ok ? spec.name : clean(payload.name, LIMITS.name ?? 120)
  const phone = spec?.ok ? spec.phone : clean(payload.phone, LIMITS.phone ?? 40)
  const company = clean(payload.company, LIMITS.company ?? 160)
  const message = spec?.ok ? spec.message : clean(payload.message, LIMITS.message ?? 5000)
  const sourcePage = clean(payload.sourcePage, 300)

  /* Everything the leads table has no column for. The schema comment on
     `details` asks for exactly this rather than twenty sparse columns. */
  const details: Record<string, string> = spec?.ok ? { ...spec.details } : {}
  if (!spec) {
    // `referral` is the ITAD pickup form's "How did you hear about us?"
    // (PickupForm, 23 Sep 2026).
    for (const key of ['address', 'city', 'state', 'zip', 'item', 'audience', 'referral']) {
      const v = clean(payload[key], LIMITS[key] ?? 120)
      if (v) details[key] = v
    }
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
    return fail(body, 'We could not save that just now. Please call us instead.', 500)
  }

  // ---------------------------------------------------------- attribution --
  /*
   * How this person found us, from the rti_attr cookie the tracking bootstrap
   * wrote when they arrived (src/lib/tracking.ts) — possibly days ago, on
   * another page. The browser sends it with this request, so it works for a
   * script-less form post too. Plus the page the form was sent from and the
   * browser. Its own table (lead_attribution, db/006); a failure here is
   * logged and never costs the lead.
   */
  const attr = readAttribution(req.headers.get('cookie'))
  const submitPage = clean(payload.submitPage, 500) ?? (body.from ? body.from : sourcePage)
  if (id) {
    try {
      const cols = [...ATTRIBUTION_KEYS, 'landing_page', 'referrer'] as const
      await one(
        `INSERT INTO lead_attribution (lead_id, ${cols.join(', ')}, submit_page, user_agent, captured_at)
         VALUES ($1, ${cols.map((_, i) => `$${i + 2}`).join(', ')}, $${cols.length + 2}, $${cols.length + 3}, $${cols.length + 4})
         ON CONFLICT (lead_id) DO NOTHING RETURNING lead_id`,
        [id, ...cols.map((k) => attr?.[k] ?? null), submitPage,
          clean(req.headers.get('user-agent'), 500),
          attr?.captured_at && !Number.isNaN(Date.parse(attr.captured_at)) ? attr.captured_at : null],
      )
    } catch (err) {
      console.error('[leads] attribution not saved:', (err as Error).message)
    }
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
      `Source:   ${attr?.utm_source ?? (attr?.gclid ? 'google (gclid)' : attr?.referrer ?? '(direct)')}${attr?.utm_medium ? ` / ${attr.utm_medium}` : ''}`,
      ...(attr?.utm_campaign ? [`Campaign: ${attr.utm_campaign}`] : []),
      ...(attr?.utm_term || attr?.keyword ? [`Keyword:  ${attr.utm_term ?? attr.keyword}`] : []),
      ...(attr?.landing_page ? [`Landed:   ${attr.landing_page}`] : []),
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

  // ------------------------------------------------------ residential reply --
  /*
   * A household asking for a pickup gets the drop off locations by email
   * straight away (Asim, 23 Sep 2026; copy in src/data/emails.ts). Pickup is
   * for business customers only.
   *
   * ONCE A DAY PER ADDRESS. An auto reply goes to whatever address was typed
   * in, so without a limit this form is a way to make the company's mail
   * server send the same message to a stranger over and over. The per IP
   * throttle above stops one sender; this stops one recipient being hit from
   * many. A lead that did get it is marked `autoReply` in details, which is
   * also what the admin's Enquiries screen shows.
   *
   * Never throws and never changes the visitor's answer: the enquiry is saved
   * and they see a thank you either way.
   */
  if (id && details.audience === 'Residential' && mailConfigured()) {
    try {
      const recent = await one<{ n: number }>(
        `SELECT count(*)::int AS n FROM leads
          WHERE lower(email) = lower($1) AND details ? 'autoReply'
            AND created_at > now() - interval '24 hours'`, [email])
      if ((recent?.n ?? 0) === 0) {
        const first = details.firstName || name?.split(/\s+/)[0] || null
        const reply = await sendMail({
          to: email,
          subject: RESIDENTIAL_REPLY.subject,
          text: residentialReplyText(first),
          html: residentialReplyHtml(first),
          from: process.env.CUSTOMER_MAIL_FROM || undefined,
          replyTo: notifyAddress() ?? undefined,
        })
        if (reply.sent) {
          await one(`UPDATE leads SET details = details || jsonb_build_object('autoReply', $2::text)
                      WHERE id = $1 RETURNING id`, [id, new Date().toISOString()])
        }
      }
    } catch (err) {
      console.error('[leads] residential reply failed:', (err as Error).message)
    }
  }

  // `notified` is for the server log and for QA on staging. The visitor is told
  // their message arrived, which it did — whether an inbox pinged is our
  // problem, not theirs.
  return body.isForm ? formDone() : NextResponse.json({ ok: true, notified })
}
