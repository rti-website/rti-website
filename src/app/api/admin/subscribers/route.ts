import { q } from '@/lib/db'
import { guard, json } from '@/lib/admin-route'

/**
 * The newsletter list.
 *
 * ! THIS IS NOT THE ENQUIRY LIST, and the two must never be joined. Someone who
 * asked for a quote has not consented to marketing; a lead that ticked the
 * newsletter box gets its own row here with its own consent timestamp. Merging
 * them is the usual way a company breaks CAN-SPAM and GDPR in one move.
 */
export const GET = guard(async ({ req }) => {
  const url = new URL(req.url)
  const search = (url.searchParams.get('q') ?? '').trim().toLowerCase()
  const params: unknown[] = []
  let where = ''
  if (search) { params.push(`%${search}%`); where = 'WHERE lower(email) LIKE $1' }

  const rows = await q(`
    SELECT id, email, name, status, source_page, source_type, consent_at, confirmed_at, tags
      FROM subscribers ${where}
     ORDER BY consent_at DESC LIMIT 500`, params)

  const [totals] = await q<{ confirmed: string; pending: string; gone: string }>(`
    SELECT count(*) FILTER (WHERE status = 'confirmed')    AS confirmed,
           count(*) FILTER (WHERE status = 'pending')      AS pending,
           count(*) FILTER (WHERE status = 'unsubscribed') AS gone
      FROM subscribers`)

  return json({ subscribers: rows, totals })
})
