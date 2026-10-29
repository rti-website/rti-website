import { guard, json } from '@/lib/admin-route'
import { historyForLead } from '@/lib/visitor/admin-data'

/**
 * GET ?lead= — the Visitor history panel on an enquiry (brief section 8): the
 * company if identified, Business IP, first touch, and the sessions and pages
 * before the form was sent. Same rule as the Enquiries list: an agent sees it
 * only for an enquiry assigned to them.
 */
export const GET = guard(async ({ req, user }) => {
  const id = Number(new URL(req.url).searchParams.get('lead'))
  if (!Number.isInteger(id) || id <= 0) return json({ error: 'Which enquiry?' }, 400)
  const h = await historyForLead(id)
  if (!h) return json({ error: 'That enquiry does not exist.' }, 404)
  if (user.role === 'agent' && h.lead.assigned_to !== user.id) return json({ error: 'That enquiry is not assigned to you.' }, 403)
  return json(h)
})
