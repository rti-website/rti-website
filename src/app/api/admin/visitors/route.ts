import { NextResponse } from 'next/server'
import { q } from '@/lib/db'
import { guard, json, body } from '@/lib/admin-route'
import { canSeeVisitors } from '@/lib/visitor/config'
import { listCompanies, rangeFrom, toCsv } from '@/lib/visitor/admin-data'

/**
 * Admin -> Visitors (brief section 8): the identified companies.
 *   GET   ?from&to (Chicago days, default last 7) &type &status &source &hot=1 &q &format=csv
 *   PATCH { id, status?, notes? }
 * Only for VISITOR_ADMIN_ROLES / VISITOR_ADMIN_EMAILS (src/lib/visitor/config.ts).
 */

const STATUSES = ['new', 'reviewed', 'lead_created', 'ignore']

export const GET = guard(async ({ req, user }) => {
  if (!canSeeVisitors(user)) return json({ error: 'Your account cannot see visitors.' }, 403)
  const sp = new URL(req.url).searchParams
  const range = rangeFrom(sp)
  let rows = await listCompanies(range, { type: sp.get('type') ?? undefined, status: sp.get('status') ?? undefined, q: sp.get('q') ?? undefined })
  const source = sp.get('source')
  if (source) rows = rows.filter((r) => r.source_kind === source)
  if (sp.get('hot') === '1' || sp.get('intent') === '1') rows = rows.filter((r) => r.hot.length > 0)
  if (sp.get('format') === 'csv') {
    const csv = toCsv(
      ['Company', 'Domain', 'Type', 'City', 'Region', 'Last seen', 'Visits', 'Pages', 'Top pages', 'How they found us', 'Hot lead', 'Why hot', 'Status'],
      rows.map((r) => [r.name, r.domain, r.type, r.city, r.region, new Date(r.last_seen).toISOString(), r.visits, r.pages,
        r.top_pages.join(' | '), r.source, r.hot.length ? 'yes' : '', r.hot_text, r.status]))
    return new NextResponse(csv, { headers: {
      'content-type': 'text/csv; charset=utf-8', 'cache-control': 'no-store',
      'content-disposition': `attachment; filename="rti-visitors-${range.from}-to-${range.to}.csv"`,
    } })
  }
  return json({ range: { from: range.from, to: range.to }, companies: rows })
})

export const PATCH = guard(async ({ req, user }) => {
  if (!canSeeVisitors(user)) return json({ error: 'Your account cannot see visitors.' }, 403)
  const b = await body<{ id: number; status: string; notes: string }>(req)
  if (!Number.isInteger(b.id)) return json({ error: 'Which company?' }, 400)
  if (b.status !== undefined && !STATUSES.includes(b.status)) return json({ error: 'Unknown status' }, 400)
  if (b.status) await q('UPDATE companies SET status = $2 WHERE id = $1', [b.id, b.status])
  if (typeof b.notes === 'string') await q('UPDATE companies SET notes = $2 WHERE id = $1', [b.id, b.notes.slice(0, 4000)])
  return json({ ok: true })
})
