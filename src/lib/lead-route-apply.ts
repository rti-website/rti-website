import 'server-only'
import { one, q } from '@/lib/db'
import { lookupIp } from '@/lib/geoip'
import { stateCode } from '@/lib/us-address'
import { lookupZip } from '@/lib/zips'
import {
  CHRISTINE_STATES, ROUTES, decideRoute, routeText, stateFromAddress, zipFromAddress,
  type RouteDecision, type StateFrom,
} from '@/lib/lead-routing'

/**
 * The server half of the state routing (the rules are in
 * src/lib/lead-routing.ts): which state a new website enquiry is from, who
 * its notification email goes to, and the assignment and Activity lines.
 * Called by /api/leads for every website form enquiry. Tap to call records
 * (/api/call-click) and enquiries the team logs by hand are not routed: they
 * are phone calls someone already answered.
 */

/**
 * The enquiry's state, best source first:
 *   form     the State field (Contact Us, Get a Quote)
 *   zip      the ZIP the visitor typed, or the one in a one line address
 *   address  the state written in a one line address (Schedule a Pickup)
 *   ip       where the connection came from, US only
 */
export function leadState(d: { state?: string | null; zip?: string | null; address?: string | null }, ip: string | null):
  { state: string | null; from: StateFrom | null } {
  const typed = stateCode(d.state ?? '')
  if (typed) return { state: typed, from: 'form' }
  const zip = /^\d{5}$/.test((d.zip ?? '').trim()) ? d.zip!.trim() : zipFromAddress(d.address)
  if (zip) {
    try {
      const info = lookupZip(zip)
      const code = info ? stateCode(info.state) : null
      if (code) return { state: code, from: 'zip' }
    } catch { /* the ZIP table is missing: carry on */ }
  }
  const written = stateFromAddress(d.address)
  if (written) return { state: written, from: 'address' }
  try {
    const place = lookupIp(ip)
    const code = place?.countryCode === 'US' ? stateCode(place.region) : null
    if (code) return { state: code, from: 'ip' }
  } catch { /* no IP database: carry on */ }
  return { state: null, from: null }
}

export function routeLead(l: {
  name: string | null; email: string | null; company: string | null; message: string | null
  details: Record<string, string>; ip: string | null
}): RouteDecision {
  const { state, from } = leadState(l.details, l.ip)
  return decideRoute({ ...l, audience: l.details.audience ?? null, state, stateFrom: from })
}

/** The two fields stored on the enquiry (details), shown in Admin -> Enquiries. */
export function routeDetails(d: RouteDecision): Record<string, string> {
  return d.route
    ? { routedTo: ROUTES[d.route].label, routing: routeText(d) }
    : { routing: routeText(d) }
}

/**
 * LEAD_ROUTE_EMAIL_OVERRIDE (comma separated), for the dev server: routed
 * emails go there instead of to Christine, Jason or Umer, with no CC, and the
 * enquiry is not assigned. So routing can be tried end to end from dev
 * without the team getting test enquiries. Never set it on live.
 */
export function routeOverride(): string | null {
  return process.env.LEAD_ROUTE_EMAIL_OVERRIDE?.trim() || null
}

/**
 * Who a routed enquiry's notification goes to. The people in ROUTES are To;
 * the CC the server already adds to business enquiries stays, minus anyone
 * now in To. With the override, only the override, and the subject says who
 * it would have gone to.
 */
export function routeRecipients(d: RouteDecision, cc: string | null):
  { to: string; cc: string | null; subjectPrefix: string; line: string } | null {
  if (!d.route) return null
  const people = ROUTES[d.route].people
  const to = people.map((p) => p.email).join(', ')
  const firsts = people.map((p) => p.name.split(' ')[0]).join(' and ')
  const states = `${CHRISTINE_STATES.slice(0, -1).join(', ')} and ${CHRISTINE_STATES[CHRISTINE_STATES.length - 1]}`
  const why = d.state
    ? `${d.state} lead. ${d.route === 'christine' ? `${states} enquiries come to you.` : `Enquiries outside ${states} come to you to hand out.`}`
    : 'state not known, so it comes to you to hand out.'
  const line = `Routed to ${firsts} automatically: ${why}`
  const override = routeOverride()
  if (override) return { to: override, cc: null, subjectPrefix: `[Routing test, would go to ${to}] `, line }
  const toList = to.toLowerCase().split(', ')
  const keep = (cc ?? '').split(',').map((a) => a.trim()).filter((a) => a && !toList.includes(a.toLowerCase()))
  return { to, cc: keep.length ? keep.join(', ') : null, subjectPrefix: '', line }
}

/**
 * After the enquiry is saved: an enquiry routed to Christine is assigned to
 * her Publisher account (the active account with her email), if she has one
 * and nobody else has it yet. Jason and Umer share theirs, so it stays
 * unassigned for them to hand out. Everything goes under the enquiry's
 * Activity. Never throws: the enquiry is already saved.
 */
export async function recordRoute(leadId: number, d: RouteDecision, mail: { sent: boolean; to: string | null; reason?: string }) {
  const note = (kind: 'assigned' | 'note', text: string) =>
    q('INSERT INTO lead_activity (lead_id, user_id, kind, body) VALUES ($1, NULL, $2, $3)', [leadId, kind, text]).catch(() => {})
  try {
    if (!d.route) {
      await note('note', routeText(d))
      return
    }
    const override = routeOverride()
    const people = ROUTES[d.route].people
    if (d.route === 'christine') {
      const who = await one<{ id: number; name: string }>(
        'SELECT id, name FROM users WHERE active AND lower(email) = lower($1) ORDER BY id LIMIT 1', [people[0]!.email])
      if (override) {
        await note('note', `${routeText(d)} Test mode on this server: not assigned${who ? ` (would be assigned to ${who.name})` : ''}.`)
      } else if (who) {
        const row = await one<{ id: number }>(
          'UPDATE leads SET assigned_to = $2, assigned_at = now() WHERE id = $1 AND assigned_to IS NULL RETURNING id', [leadId, who.id])
        await note(row ? 'assigned' : 'note', row
          ? `Assigned automatically to ${who.name}. ${routeText(d)}`
          : `${routeText(d)} Already assigned, so left as it is.`)
      } else {
        await note('note', `${routeText(d)} Not assigned: no active Publisher account uses ${people[0]!.email}.`)
      }
    } else {
      await note('note', `${routeText(d)} Left unassigned for Jason and Umer to hand out.`)
    }
    await note('note', mail.sent
      ? `Routing email sent to ${mail.to}${override ? ' (test mode on this server)' : ''}`
      : `Routing email to ${mail.to ?? people.map((p) => p.email).join(', ')} not sent: ${mail.reason ?? 'unknown error'}`)
  } catch (err) {
    console.error('[leads] routing not recorded:', (err as Error).message)
  }
}
