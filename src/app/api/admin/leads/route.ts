import { q, one } from '@/lib/db'
import { guard, json, body } from '@/lib/admin-route'
import { fillMissingLocations, locateLead } from '@/lib/lead-location'
import { geoipAvailable } from '@/lib/geoip'
import { getMaps } from '@/lib/maps'
import { toE164 } from '@/lib/phone'
import { stateCode } from '@/lib/us-address'
import { adminOrigin, emailAssignee } from '@/lib/lead-assign-mail'
import type { AdminUser } from '@/lib/auth'
import { after } from 'next/server'

/**
 * Contact, quote and gated-download submissions — business records, not a list.
 *
 * Every field the forms collect comes back: the columns, plus `details`, which
 * holds everything the table has no column for (first / last name, address,
 * city, state, zip, what they want to recycle, "Is it for?", how they heard,
 * consent and when it was given). The Enquiries screen shows all of it —
 * Asim, 23 Sep 2026: "when someone submits the form it must show on [the]
 * admin side … all the entries that are available". 2000 rows is years of
 * enquiries at this site's volume; past that it wants paging, not a bigger
 * number.
 *
 * THE LEAD WORKFLOW (db/010, 26 Sep 2026). Three more things live here now:
 *
 *   - phone enquiries: POST adds one by hand, with how it came in (`channel`
 *     and `channel_detail`: "phone", "MN line") and who took it;
 *   - assignment: PATCH { assigned_to } hands an enquiry to an agent, and
 *     GET returns `agents`, the people it can be handed to;
 *   - the story: lead_activity records every assignment, status change and
 *     note, and GET returns it as `activity` on each row;
 *   - the email: whoever an enquiry is assigned to gets it by email
 *     (src/lib/lead-assign-mail.ts, 27 Sep 2026), noted under its activity.
 *
 * An AGENT sees only the enquiries assigned to them, can change their status
 * and add notes, and can log a phone enquiry (assigned to themselves). They
 * cannot reassign. Administrators and editors see and do everything.
 */

const STATUSES = ['new', 'contacted', 'qualified', 'won', 'lost', 'spam']
const CHANNELS = ['website', 'phone', 'email', 'walk_in', 'referral', 'other']
const TYPES = ['contact', 'quote', 'download', 'callback']

const isAgent = (u: AdminUser) => u.role === 'agent'
const canAssign = (u: AdminUser) => u.role === 'administrator' || u.role === 'editor'
const canWork = (u: AdminUser) => canAssign(u) || isAgent(u)

/** The people an enquiry can be assigned to: agents first, then the managers. */
async function agents() {
  return q<{ id: number; name: string; role: string }>(`
    SELECT id, name, role FROM users
     WHERE active AND role IN ('agent', 'administrator', 'editor') AND password_hash <> ''
     ORDER BY (role <> 'agent'), name`)
}

async function log(leadId: number, userId: number, kind: string, text: string | null) {
  await q('INSERT INTO lead_activity (lead_id, user_id, kind, body) VALUES ($1, $2, $3, $4)', [leadId, userId, kind, text])
}

export const GET = guard(async ({ user }) => {
  /* Where each enquiry is from (db/007, 24 Sep 2026). Rows from before it,
     or any the after-submit step missed, are filled in here first. `hasMapsKey`
     says whether the detail view's map can use the Maps key (through
     /api/admin/maps/embed/); the key itself never leaves the server
     (management, 27 Sep 2026). */
  await fillMissingLocations()
  const maps = await getMaps()
  const extra = { hasMapsKey: Boolean(maps.browserKey), ipDatabase: geoipAvailable(), me: { id: user.id, role: user.role } }

  /* With its attribution (db/006, the SEO brief of 23 Sep 2026): how each
     person found us — UTM tags, ad click IDs, landing page, referrer, the page
     they submitted from — and, since db/010, who it is assigned to and what
     has happened to it. A database that has not run 010 yet has none of those
     columns; the list still loads without them (and without assignment). */
  const mine = isAgent(user) ? 'WHERE l.assigned_to = $1' : ''
  const params = isAgent(user) ? [user.id] : []
  try {
    const rows = await q(`
      SELECT l.id, l.type, l.name, l.email, l.phone, l.company, l.message, l.details,
             l.source_page, l.status, l.notes, l.created_at, to_jsonb(l)->'geo' AS geo,
             l.channel, l.channel_detail, l.assigned_to, l.assigned_at,
             asg.name AS assigned_name, crt.name AS created_by_name,
             to_jsonb(a) - 'lead_id' - 'created_at' AS attribution,
             COALESCE((SELECT json_agg(json_build_object('id', x.id, 'kind', x.kind, 'body', x.body, 'at', x.at, 'who', u.name)
                                        ORDER BY x.at DESC)
                         FROM lead_activity x LEFT JOIN users u ON u.id = x.user_id
                        WHERE x.lead_id = l.id), '[]'::json) AS activity
        FROM leads l
        LEFT JOIN lead_attribution a ON a.lead_id = l.id
        LEFT JOIN users asg ON asg.id = l.assigned_to
        LEFT JOIN users crt ON crt.id = l.created_by
        ${mine}
       ORDER BY l.created_at DESC LIMIT 2000`, params)
    return json({ leads: rows, agents: canAssign(user) ? await agents() : [], ...extra })
  } catch {
    if (isAgent(user)) return json({ leads: [], agents: [], ...extra, setup: 'Run db/010_lead_workflow.sql first.' })
    const rows = await q(`
      SELECT id, type, name, email, phone, company, message, details,
             source_page, status, notes, created_at
        FROM leads ORDER BY created_at DESC LIMIT 2000`)
    return json({ leads: rows, agents: [], ...extra })
  }
})

/** A status change, an assignment, a note, the caller's details — or any
 *  combination, in one call. */
export const PATCH = guard(async ({ req, user }) => {
  const { id, status, notes, assigned_to, note, contact } =
    await body<{ id: number; status: string; notes: string; assigned_to: number | null; note: string
      /** Filling in who a tap-to-call enquiry turned out to be (27 Sep 2026). */
      contact: { name?: string; phone?: string; email?: string; company?: string } }>(req)
  if (!id) return json({ error: 'Which enquiry?' }, 400)
  if (status && !STATUSES.includes(status)) return json({ error: 'Unknown status' }, 400)

  const cur = await one<{ id: number; status: string; assigned_to: number | null }>(
    'SELECT id, status, assigned_to FROM leads WHERE id = $1', [id])
  if (!cur) return json({ error: 'That enquiry does not exist.' }, 404)
  // An agent works their own list and nobody else's.
  if (isAgent(user) && cur.assigned_to !== user.id) return json({ error: 'That enquiry is not assigned to you.' }, 403)
  if (assigned_to !== undefined && !canAssign(user)) return json({ error: 'Only an administrator or editor can assign enquiries.' }, 403)

  if (status && status !== cur.status) {
    await q('UPDATE leads SET status = $2 WHERE id = $1', [id, status])
    await log(id, user.id, 'status', status)
  }
  if (typeof notes === 'string') await q('UPDATE leads SET notes = $2 WHERE id = $1', [id, notes])
  if (assigned_to !== undefined && assigned_to !== cur.assigned_to) {
    let name: string | null = null
    if (assigned_to !== null) {
      const who = await one<{ name: string }>('SELECT name FROM users WHERE id = $1 AND active', [assigned_to])
      if (!who) return json({ error: 'That person does not exist or is deactivated.' }, 400)
      name = who.name
    }
    await q('UPDATE leads SET assigned_to = $2, assigned_at = CASE WHEN $2::bigint IS NULL THEN NULL ELSE now() END, assigned_by = $3 WHERE id = $1',
      [id, assigned_to, user.id])
    await log(id, user.id, 'assigned', name)
    // The agent hears about it by email (27 Sep 2026), after the answer goes back.
    if (assigned_to !== null) {
      const origin = adminOrigin(req)
      after(() => emailAssignee({ leadId: id, agentId: assigned_to, by: user, origin }))
    }
  }
  if (typeof note === 'string' && note.trim()) await log(id, user.id, 'note', note.trim().slice(0, 4000))
  if (contact && typeof contact === 'object') {
    if (!canWork(user)) return json({ error: 'Your account cannot change enquiries.' }, 403)
    const s = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
    const name = s(contact.name, 120), company = s(contact.company, 160)
    const email = s(contact.email, 200).toLowerCase()
    const rawPhone = s(contact.phone, 40)
    const phone = rawPhone ? (toE164(rawPhone) ?? rawPhone) : ''
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'That email does not look right.' }, 400)
    await q('UPDATE leads SET name = $2, phone = $3, email = $4, company = $5 WHERE id = $1',
      [id, name || null, phone || null, email || null, company || null])
    await log(id, user.id, 'note', `Contact details set: ${[name, phone, email, company].filter(Boolean).join(', ') || '(cleared)'}`)
  }
  return json({ ok: true })
})

/**
 * An enquiry that did not come through the website: a phone call, an email,
 * somebody at the counter. Typed in by whoever took it. No notification email
 * (the team already knows) and no attribution row (there was no click), but
 * the location lookup runs the same, so the map and the distance work.
 */
export const POST = guard(async ({ req, user }) => {
  if (!canWork(user)) return json({ error: 'Your account cannot add enquiries.' }, 403)
  const b = await body<{
    channel: string; channel_detail: string; type: string; name: string; phone: string; email: string
    company: string; service: string; audience: string; address: string; city: string; state: string; zip: string
    referral: string; message: string; assigned_to: number | null; status: string
  }>(req)

  const s = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
  const channel = CHANNELS.includes(b.channel ?? '') ? b.channel! : 'phone'
  const type = TYPES.includes(b.type ?? '') ? b.type! : 'contact'
  const status = STATUSES.includes(b.status ?? '') ? b.status! : 'new'
  const name = s(b.name, 120)
  const email = s(b.email, 200).toLowerCase() || null
  const rawPhone = s(b.phone, 40)
  const phone = rawPhone ? (toE164(rawPhone) ?? rawPhone) : null
  if (!name && !phone && !email) return json({ error: 'A name, a phone number or an email is needed.', field: 'name' }, 400)
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'That email does not look right.', field: 'email' }, 400)

  const details: Record<string, string> = {}
  const put = (k: string, v: string) => { if (v) details[k] = v }
  put('service', s(b.service, 80)); put('audience', s(b.audience, 40)); put('address', s(b.address, 200))
  put('city', s(b.city, 80)); put('state', stateCode(s(b.state, 80)) ?? s(b.state, 80)); put('zip', s(b.zip, 20))
  put('referral', s(b.referral, 80))

  // An agent's phone enquiry is theirs unless a manager says otherwise.
  let assigned: number | null = null
  if (canAssign(user) && typeof b.assigned_to === 'number') assigned = b.assigned_to
  else if (isAgent(user)) assigned = user.id

  const row = await one<{ id: number }>(`
    INSERT INTO leads (type, name, email, phone, company, message, details, status, channel, channel_detail,
                       created_by, assigned_to, assigned_at, assigned_by)
    VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8, $9, $10, $11, $12, CASE WHEN $12::bigint IS NULL THEN NULL ELSE now() END, $13)
    RETURNING id`,
    [type, name || null, email, phone, s(b.company, 160) || null, s(b.message, 5000) || null, JSON.stringify(details),
      status, channel, s(b.channel_detail, 160) || null, user.id, assigned, assigned ? user.id : null])
  if (!row) return json({ error: 'Could not save the enquiry.' }, 500)

  const how = channel === 'phone' ? 'Phone enquiry' : channel === 'walk_in' ? 'Walk in' : `${channel.charAt(0).toUpperCase()}${channel.slice(1)} enquiry`
  await log(row.id, user.id, 'created', `${how} logged by ${user.name}`)
  if (assigned) {
    const who = await one<{ name: string }>('SELECT name FROM users WHERE id = $1', [assigned])
    await log(row.id, user.id, 'assigned', who?.name ?? null)
    const leadId = row.id, agentId = assigned, origin = adminOrigin(req)
    after(() => emailAssignee({ leadId, agentId, by: user, origin }))
  }
  // Same location lookup the website forms get, so the distance and the map work.
  try { await locateLead(row.id) } catch { /* best effort */ }
  return json({ id: row.id }, 201)
})
