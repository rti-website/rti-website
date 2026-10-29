import 'server-only'
import { one, q } from '@/lib/db'
import { chicago, chicagoDayBounds } from './schedule.ts'
import { INTENT_PATHS, sourceOf } from './source.ts'

/**
 * The queries behind Admin -> Visitors, Visitor leads and the Visitor history
 * panel on an enquiry (brief section 8). Read only, admin only: the route
 * handlers that call these check the session and VISITOR_ADMIN_ROLES first,
 * and nothing here is reachable from the public site.
 */

export type Range = { start: Date; end: Date; from: string; to: string }

/** ?from=YYYY-MM-DD&to=YYYY-MM-DD (Chicago days, both included), default the last 7 days. */
export function rangeFrom(sp: URLSearchParams, defaultDays = 7): Range {
  const ok = (s: string | null) => (s && /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : null)
  const today = chicago(new Date()).ymd
  const to = ok(sp.get('to')) ?? today
  let from = ok(sp.get('from'))
  if (!from) {
    const d = new Date(`${to}T12:00:00Z`)
    d.setUTCDate(d.getUTCDate() - (defaultDays - 1))
    from = d.toISOString().slice(0, 10)
  }
  return { start: chicagoDayBounds(from).start, end: chicagoDayBounds(to).end, from, to }
}

export type CompanyRow = {
  id: number; name: string; domain: string | null; type: string; city: string | null; region: string | null
  status: string; notes: string | null; first_seen: string; last_seen: string
  visits: number; pages: number; top_pages: string[]; intent: boolean; has_form_lead: boolean
  first_touch: Record<string, string> | null; source: string; source_kind: string
  visitor_count: number; lead_visitor_id: string | null
}

export async function listCompanies(r: Range, f: { type?: string; status?: string; q?: string }): Promise<CompanyRow[]> {
  const rows = await q<Omit<CompanyRow, 'source' | 'source_kind'>>(`
    WITH s AS (
      SELECT v.company_id, v.id AS vid, x.id AS visit_id, x.ended_at
        FROM visits x JOIN visitors v ON v.id = x.visitor_id
       WHERE v.company_id IS NOT NULL AND x.started_at >= $1 AND x.started_at < $2),
    agg AS (SELECT company_id, count(DISTINCT visit_id)::int AS visits, max(ended_at) AS last,
                   count(DISTINCT vid)::int AS visitor_count FROM s GROUP BY company_id),
    pv AS (SELECT s.company_id, p.path, count(*)::int AS n FROM s JOIN page_views p ON p.visit_id = s.visit_id GROUP BY 1, 2),
    pg AS (SELECT company_id, count(*)::int AS pages, (array_agg(path ORDER BY n DESC, path))[1:5] AS top_pages,
                  bool_or(path = ANY($3::text[])) AS intent FROM pv GROUP BY company_id)
    SELECT c.id, c.name, c.domain, c.type, c.city, c.region, c.status, c.notes, c.first_seen, agg.last AS last_seen,
           agg.visits, coalesce(pg.pages, 0) AS pages, coalesce(pg.top_pages, '{}') AS top_pages,
           coalesce(pg.intent, false) AS intent, agg.visitor_count,
           EXISTS (SELECT 1 FROM visitors v JOIN leads l ON l.visitor_id = v.id AND l.lead_type = 'form'
                    WHERE v.company_id = c.id) AS has_form_lead,
           (SELECT v.first_touch FROM visitors v WHERE v.company_id = c.id ORDER BY v.first_seen LIMIT 1) AS first_touch,
           (SELECT v.id FROM visitors v WHERE v.company_id = c.id ORDER BY v.last_seen DESC LIMIT 1) AS lead_visitor_id
      FROM companies c JOIN agg ON agg.company_id = c.id LEFT JOIN pg ON pg.company_id = c.id
     WHERE ($4::text IS NULL OR c.type = $4)
       AND ($5::text IS NULL OR c.status = $5)
       AND ($6::text IS NULL OR c.name ILIKE '%' || $6 || '%' OR c.domain ILIKE '%' || $6 || '%')
     ORDER BY agg.last DESC LIMIT 1000`,
    [r.start, r.end, INTENT_PATHS, f.type || null, f.status || null, f.q?.trim() || null])
  return rows.map((row) => {
    const s = sourceOf(row.first_touch)
    // Intent means viewing those pages WITHOUT sending a form (brief section 7).
    return { ...row, intent: row.intent && !row.has_form_lead, source: s.label, source_kind: s.kind }
  })
}

export async function companyDetail(id: number) {
  const company = await one(`SELECT * FROM companies WHERE id = $1`, [id])
  if (!company) return null
  const sessions = await q(`
    SELECT x.id, x.visitor_id, x.started_at, x.ended_at, x.device_type, x.entry_path, x.exit_path, x.page_count,
           x.source, x.attribution,
           coalesce((SELECT json_agg(json_build_object('path', p.path, 'title', p.title, 'at', p.viewed_at, 'seconds', p.seconds_on_page)
                                     ORDER BY p.viewed_at) FROM page_views p WHERE p.visit_id = x.id), '[]'::json) AS pages
      FROM visits x JOIN visitors v ON v.id = x.visitor_id
     WHERE v.company_id = $1 ORDER BY x.started_at DESC LIMIT 200`, [id])
  const leads = await q(`
    SELECT l.id, l.lead_type, l.name, l.email, l.company, l.status, l.visitor_status, l.is_business_ip, l.created_at,
           l.converted_lead_id, l.visitor_id
      FROM leads l JOIN visitors v ON v.id = l.visitor_id
     WHERE v.company_id = $1 ORDER BY l.created_at DESC`, [id])
  const visitors = await q(`SELECT id, first_seen, last_seen, visit_count, first_touch FROM visitors WHERE company_id = $1 ORDER BY last_seen DESC`, [id])
  return { company, sessions, leads, visitors }
}

export type VisitorLeadFilter = {
  business?: 'yes' | 'no' | 'all'; type?: string; status?: string; source?: string; intent?: boolean; q?: string
}

export type VisitorLeadRow = {
  id: number; name: string; company: string | null; is_business_ip: boolean; visitor_status: string
  created_at: string; converted_lead_id: number | null; visitor_id: string
  org_type: string | null; domain: string | null; city: string | null; region: string | null; company_id: number | null
  visit_count: number; page_count: number; last_seen: string; first_touch: Record<string, string> | null
  intent: boolean; source: string; source_kind: string
}

export async function listVisitorLeads(r: Range, f: VisitorLeadFilter, page = 1, perPage = 50) {
  const where: string[] = ["l.lead_type = 'visitor'", 'v.last_seen >= $1', 'l.created_at < $2']
  const args: unknown[] = [r.start, r.end]
  const add = (sql: string, v: unknown) => { args.push(v); where.push(sql.replace('?', `$${args.length}`)) }
  if (f.business === 'yes') where.push('l.is_business_ip')
  if (f.business === 'no') where.push('NOT l.is_business_ip')
  if (f.type) add('c.type = ?', f.type)
  if (f.status) add('coalesce(l.visitor_status, \'new\') = ?', f.status)
  if (f.q?.trim()) {
    args.push(f.q.trim())
    where.push(`(l.name ILIKE '%' || $${args.length} || '%' OR c.domain ILIKE '%' || $${args.length} || '%')`)
  }
  args.push(INTENT_PATHS)
  const intentArg = `$${args.length}`
  const rows = await q<Omit<VisitorLeadRow, 'source' | 'source_kind'>>(`
    SELECT l.id, l.name, l.company, l.is_business_ip, coalesce(l.visitor_status, 'new') AS visitor_status, l.created_at,
           l.converted_lead_id, l.visitor_id, c.type AS org_type, c.domain, c.city, c.region, c.id AS company_id,
           v.visit_count, v.last_seen, v.first_touch,
           (SELECT count(*)::int FROM visits x JOIN page_views p ON p.visit_id = x.id WHERE x.visitor_id = v.id) AS page_count,
           (EXISTS (SELECT 1 FROM visits x JOIN page_views p ON p.visit_id = x.id
                     WHERE x.visitor_id = v.id AND p.path = ANY(${intentArg}::text[]))
            AND l.converted_lead_id IS NULL) AS intent
      FROM leads l JOIN visitors v ON v.id = l.visitor_id LEFT JOIN companies c ON c.id = v.company_id
     WHERE ${where.join(' AND ')}
     ORDER BY l.is_business_ip DESC, v.last_seen DESC
     LIMIT 5000`, args)
  let list: VisitorLeadRow[] = rows.map((row) => {
    const s = sourceOf(row.first_touch)
    return { ...row, source: s.label, source_kind: s.kind }
  })
  if (f.source) list = list.filter((x) => x.source_kind === f.source)
  if (f.intent) list = list.filter((x) => x.intent)
  const total = list.length
  const business = list.filter((x) => x.is_business_ip).length
  return { total, business, page, perPage, rows: list.slice((page - 1) * perPage, page * perPage), all: list }
}

/** The Visitor history panel on an enquiry: the visitor's company, first touch and sessions up to the form. */
export async function historyForLead(leadId: number) {
  const lead = await one<{ id: number; visitor_id: string | null; created_at: string; assigned_to: number | null }>(
    "SELECT id, visitor_id, created_at, assigned_to FROM leads WHERE id = $1 AND lead_type = 'form'", [leadId])
  if (!lead) return null
  if (!lead.visitor_id) return { lead, visitor: null, company: null, sessions: [] }
  const visitor = await one<{ id: string; first_seen: string; visit_count: number; first_touch: Record<string, string> | null; company_id: number | null }>(
    'SELECT id, first_seen, visit_count, first_touch, company_id FROM visitors WHERE id = $1', [lead.visitor_id])
  const company = visitor?.company_id ? await one('SELECT id, name, domain, type, city, region FROM companies WHERE id = $1', [visitor.company_id]) : null
  const sessions = await q(`
    SELECT x.id, x.started_at, x.ended_at, x.device_type, x.source, x.attribution, x.page_count,
           coalesce((SELECT json_agg(json_build_object('path', p.path, 'title', p.title, 'at', p.viewed_at, 'seconds', p.seconds_on_page)
                                     ORDER BY p.viewed_at) FROM page_views p WHERE p.visit_id = x.id AND p.viewed_at <= $2), '[]'::json) AS pages
      FROM visits x WHERE x.visitor_id = $1 AND x.started_at <= $2
     ORDER BY x.started_at DESC LIMIT 50`, [lead.visitor_id, lead.created_at])
  return {
    lead, company, sessions,
    visitor: visitor ? { ...visitor, source: sourceOf(visitor.first_touch).label } : null,
  }
}

/** CSV with a header row; every value quoted. */
export function toCsv(head: string[], rows: unknown[][]): string {
  const cell = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""').replace(/^([=+\-@])/, "'$1")}"`
  return [head.map(cell).join(','), ...rows.map((r) => r.map(cell).join(','))].join('\r\n') + '\r\n'
}
