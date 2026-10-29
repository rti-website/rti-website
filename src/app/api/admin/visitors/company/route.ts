import { guard, json } from '@/lib/admin-route'
import { canSeeVisitors } from '@/lib/visitor/config'
import { companyDetail } from '@/lib/visitor/admin-data'

/** GET ?id= — one company: its sessions with page views, visitors and leads (brief section 8, company detail). */
export const GET = guard(async ({ req, user }) => {
  if (!canSeeVisitors(user)) return json({ error: 'Your account cannot see visitors.' }, 403)
  const id = Number(new URL(req.url).searchParams.get('id'))
  if (!Number.isInteger(id) || id <= 0) return json({ error: 'Which company?' }, 400)
  const d = await companyDetail(id)
  if (!d) return json({ error: 'That company does not exist.' }, 404)
  return json(d)
})
