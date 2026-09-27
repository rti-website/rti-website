import 'server-only'
import { one, q } from '@/lib/db'
import { leadAssignedEmail, type LeadForEmail } from '@/lib/lead-email'
import { mailConfigured, notifyAddress, sendMail } from '@/lib/mail'
import { SITE } from '@/lib/site'

/**
 * Emails an agent the enquiry they were just given (Asim, 27 Sep 2026: "when
 * we assign the task to agent he also receive the mail automatically like
 * admin or someone assign lead to him").
 *
 * Called after the assignment is saved, from Admin -> Enquiries, the Lead
 * workflow screen (one email per enquiry, bulk included) and "+ Add enquiry"
 * when it is assigned on the way in. Not sent when someone assigns an
 * enquiry to themselves, or to an account whose sign in is a username
 * rather than an email address.
 *
 * Whether it went is written under the enquiry's Activity as a note, so a
 * manager can see the agent was told, or why they were not. Never throws:
 * the assignment is already saved.
 */
export async function emailAssignee(opts: { leadId: number; agentId: number; by: { id: number; name: string }; origin: string }) {
  if (opts.agentId === opts.by.id) return
  const note = (text: string) =>
    q("INSERT INTO lead_activity (lead_id, user_id, kind, body) VALUES ($1, NULL, 'note', $2)", [opts.leadId, text]).catch(() => {})
  try {
    const agent = await one<{ name: string; email: string }>('SELECT name, email FROM users WHERE id = $1 AND active', [opts.agentId])
    if (!agent) return
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(agent.email)) {
      await note(`Assignment email not sent: ${agent.name} signs in with a username, not an email address.`)
      return
    }
    if (!mailConfigured()) {
      await note(`Assignment email not sent to ${agent.email}: email is not set up on this server.`)
      return
    }
    const lead = await one<LeadForEmail & { created_at: Date; channel: string | null; channel_detail: string | null }>(`
      SELECT type, name, email, phone, company, message, COALESCE(details, '{}'::jsonb) AS details, created_at,
             channel, channel_detail
        FROM leads WHERE id = $1`, [opts.leadId])
    if (!lead) return
    const how = lead.details.callClick ? 'from a tap to call on the website'
      : (HOW[lead.channel ?? 'website'] ?? 'from the website')
    const mail = leadAssignedEmail({
      lead: { ...lead, submittedAt: new Date(lead.created_at) },
      id: opts.leadId,
      agentName: agent.name,
      assignedBy: opts.by.name,
      link: `${opts.origin}/admin/?lead=${opts.leadId}`,
      how,
    })
    const r = await sendMail({
      to: agent.email, subject: mail.subject, text: mail.text, html: mail.html,
      // A reply goes to the team inbox, not back into the void.
      replyTo: notifyAddress() ?? undefined,
    })
    await note(r.sent ? `Assignment email sent to ${agent.email}` : `Assignment email to ${agent.email} failed: ${r.reason ?? 'unknown error'}`)
  } catch (err) {
    console.error('[leads] assignment email:', (err as Error).message)
  }
}

const HOW: Record<string, string> = {
  website: 'from the website', phone: 'by phone', email: 'by email', walk_in: 'in person', referral: 'by referral', other: 'logged by the team',
}

/**
 * Where the link in the email points: the admin the manager is using, read
 * off the request's Origin (dev.recycletechnologies.com on the dev server,
 * localhost on a laptop), but only for this site's own hosts and localhost,
 * so the header cannot turn the email into a link somewhere else. Anything
 * else gets the live site.
 */
export function adminOrigin(req: Request): string {
  const raw = req.headers.get('origin')
  try {
    if (raw) {
      const u = new URL(raw)
      const ok = /(^|\.)recycletechnologies\.com$/i.test(u.hostname) || u.hostname === 'localhost' || u.hostname === '127.0.0.1'
      if (ok && /^https?:$/.test(u.protocol)) return u.origin
    }
  } catch { /* fall through */ }
  return SITE.origin
}
