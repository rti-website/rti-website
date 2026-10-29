import { NextResponse } from 'next/server'
import { q } from '@/lib/db'
import { guard, json, body } from '@/lib/admin-route'
import { canSeeVisitors } from '@/lib/visitor/config'
import { listVisitorLeads, rangeFrom, toCsv, type VisitorLeadFilter } from '@/lib/visitor/admin-data'

/**
 * Admin -> Visitor leads (brief section 7): one per consented visitor,
 * Business IP first. Never in Enquiries, never emailed, never counted there.
 *   GET   ?business=yes|no|all (default yes) &type &status &source &intent=1 &q
 *         &from &to (Chicago days, default last 30) or &day=YYYY-MM-DD, &page, &format=csv
 *   PATCH { id, status }   new | reviewed | converted | ignore
 */

const STATUSES = ['new', 'reviewed', 'converted', 'ignore']

export const GET = guard(async ({ req, user }) => {
  if (!canSeeVisitors(user)) return json({ error: 'Your account cannot see visitors.' }, 403)
  const sp = new URL(req.url).searchParams
  const day = sp.get('day')
  if (day && /^\d{4}-\d{2}-\d{2}$/.test(day)) { sp.set('from', day); sp.set('to', day) }
  const range = rangeFrom(sp, 30)
  const b = sp.get('business')
  const f: VisitorLeadFilter = {
    // The digest's CSV link asks for all types ("yesterday's Visitor leads, all types").
    business: b === 'no' || b === 'all' ? b : day ? 'all' : 'yes',
    type: sp.get('type') ?? undefined, status: sp.get('status') ?? undefined, source: sp.get('source') ?? undefined,
    intent: sp.get('intent') === '1', q: sp.get('q') ?? undefined,
  }
  const page = Math.max(1, Number(sp.get('page')) || 1)
  const out = await listVisitorLeads(range, f, page)
  if (sp.get('format') === 'csv') {
    const csv = toCsv(
      ['Lead #', 'Name', 'Business IP', 'Org type', 'Domain', 'City', 'Region', 'Visits', 'Pages viewed', 'Last seen', 'Source', 'Intent', 'Status', 'Created', 'Converted to enquiry #'],
      out.all.map((r) => [r.id, r.name, r.is_business_ip ? 'yes' : 'no', r.org_type, r.domain, r.city, r.region, r.visit_count, r.page_count,
        new Date(r.last_seen).toISOString(), r.source, r.intent ? 'yes' : '', r.visitor_status, new Date(r.created_at).toISOString(), r.converted_lead_id]))
    return new NextResponse(csv, { headers: {
      'content-type': 'text/csv; charset=utf-8', 'cache-control': 'no-store',
      'content-disposition': `attachment; filename="rti-visitor-leads-${range.from}-to-${range.to}.csv"`,
    } })
  }
  return json({ range: { from: range.from, to: range.to }, total: out.total, business: out.business, page, perPage: out.perPage, leads: out.rows })
})

export const PATCH = guard(async ({ req, user }) => {
  if (!canSeeVisitors(user)) return json({ error: 'Your account cannot see visitors.' }, 403)
  const b = await body<{ id: number; status: string }>(req)
  if (!Number.isInteger(b.id)) return json({ error: 'Which lead?' }, 400)
  if (!STATUSES.includes(b.status ?? '')) return json({ error: 'Unknown status' }, 400)
  const rows = await q("UPDATE leads SET visitor_status = $2 WHERE id = $1 AND lead_type = 'visitor' RETURNING id", [b.id, b.status])
  if (rows.length === 0) return json({ error: 'That Visitor lead does not exist.' }, 404)
  return json({ ok: true })
})
