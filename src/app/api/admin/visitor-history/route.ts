import { guard, json } from '@/lib/admin-route'
import { canSeeVisitors } from '@/lib/visitor/config'
import { historyForLead, journeyForVisitor } from '@/lib/visitor/admin-data'

/**
 * GET ?lead= — the Visitor history panel on an enquiry (brief section 8): the
 * company if identified, Business IP, first touch, and the visits and pages
 * before the form was sent. Same rule as the Enquiries list: an agent sees it
 * only for an enquiry assigned to them.
 *
 * GET ?visitor=<uuid> — the journey on Admin -> Visitor leads (30 Oct 2026):
 * every visit, pages in order with the time on each. Visitor leads' own rule
 * (VISITOR_ADMIN_ROLES / VISITOR_ADMIN_EMAILS).
 */
export const GET = guard(async ({ req, user }) => {
  const sp = new URL(req.url).searchParams
  const visitor = sp.get('visitor')
  if (visitor !== null) {
    if (!canSeeVisitors(user)) return json({ error: 'Your account cannot see visitors.' }, 403)
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(visitor)) return json({ error: 'Which visitor?' }, 400)
    const j = await journeyForVisitor(visitor)
    if (!j) return json({ error: 'That visitor does not exist.' }, 404)
    return json(j)
  }
  const id = Number(sp.get('lead'))
  if (!Number.isInteger(id) || id <= 0) return json({ error: 'Which enquiry?' }, 400)
  const h = await historyForLead(id)
  if (!h) return json({ error: 'That enquiry does not exist.' }, 404)
  if (user.role === 'agent' && h.lead.assigned_to !== user.id) return json({ error: 'That enquiry is not assigned to you.' }, 403)
  return json(h)
})
