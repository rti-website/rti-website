import { q, one } from '@/lib/db'
import { guard, json, body } from '@/lib/admin-route'

/** Contact, quote and gated-download submissions — business records, not a list. */
export const GET = guard(async () => {
  const rows = await q(`
    SELECT id, type, name, email, phone, company, message, details,
           source_page, status, created_at
      FROM leads ORDER BY created_at DESC LIMIT 300`)
  return json({ leads: rows })
})

export const PATCH = guard(async ({ req }) => {
  const { id, status, notes } = await body<{ id: number; status: string; notes: string }>(req)
  if (!id) return json({ error: 'Which enquiry?' }, 400)
  const allowed = ['new', 'contacted', 'qualified', 'won', 'lost', 'spam']
  if (status && !allowed.includes(status)) return json({ error: 'Unknown status' }, 400)
  await one(`UPDATE leads SET status = COALESCE($2, status), notes = COALESCE($3, notes)
             WHERE id = $1 RETURNING id`, [id, status ?? null, notes ?? null])
  return json({ ok: true })
})
