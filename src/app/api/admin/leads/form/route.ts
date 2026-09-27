import { one } from '@/lib/db'
import { guard, json } from '@/lib/admin-route'
import { leadNotification, spokenTime, type LeadForEmail } from '@/lib/lead-email'

/**
 * GET ?id= — one enquiry laid out as the notification email lays it out
 * (Asim, 27 Sep 2026: "view form ... it show the details in form format that
 * was sent on email"). Admin -> Enquiries shows the HTML in a frame.
 *
 * A website form enquiry comes back exactly as the team's inbox got it. One
 * that never sent that email (a phone call logged by hand, a tap to call)
 * comes back in the same layout under a heading that says so.
 *
 * Same rule as the list: an agent sees only the enquiries assigned to them.
 */
type LeadRow = LeadForEmail & {
  created_at: Date; channel: string | null; channel_detail: string | null
  assigned_to: number | null; created_by_name: string | null
}

export const GET = guard(async ({ req, user }) => {
  const id = Number(new URL(req.url).searchParams.get('id'))
  if (!Number.isInteger(id) || id <= 0) return json({ error: 'Which enquiry?' }, 400)
  let lead: LeadRow | null
  try {
    lead = await one<LeadRow>(`
      SELECT l.type, l.name, l.email, l.phone, l.company, l.message, COALESCE(l.details, '{}'::jsonb) AS details,
             l.created_at, l.channel, l.channel_detail, l.assigned_to, u.name AS created_by_name
        FROM leads l LEFT JOIN users u ON u.id = l.created_by WHERE l.id = $1`, [id])
  } catch {
    // A database without db/010: no channel or assignment columns.
    lead = await one<LeadRow>(`
      SELECT type, name, email, phone, company, message, COALESCE(details, '{}'::jsonb) AS details, created_at,
             NULL AS channel, NULL AS channel_detail, NULL AS assigned_to, NULL AS created_by_name
        FROM leads WHERE id = $1`, [id])
  }
  if (!lead) return json({ error: 'That enquiry does not exist.' }, 404)
  if (user.role === 'agent' && lead.assigned_to !== user.id) return json({ error: 'That enquiry is not assigned to you.' }, 403)

  const d = lead.details ?? {}
  const when = spokenTime(new Date(lead.created_at))
  const intro = d.callClick
    ? { title: 'Tap to call', line: `Someone tapped ${d.callClick}${d.clickedFrom ? ` on ${d.clickedFrom}` : ''} on ${when}. No form was sent; below is what the team has filled in.` }
    : lead.channel && lead.channel !== 'website'
      ? { title: 'Enquiry logged by the team', line: `${lead.channel_detail ? `${lead.channel_detail}. ` : ''}Logged${lead.created_by_name ? ` by ${lead.created_by_name}` : ''} on ${when}. No notification email was sent for it; this is the same layout.` }
      : undefined
  const mail = leadNotification({ ...lead, details: d, submittedAt: new Date(lead.created_at) }, intro)
  return json({ subject: mail.subject, html: mail.html, emailed: !intro })
})
