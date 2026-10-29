'use client'

import { Fragment, useCallback, useEffect, useState } from 'react'
import { Empty, Icon, Table } from './Bits'
import { api, getJSON, sendJSON } from './api'
import { when } from './Leads'
import { ORG_TYPES, TypeBadge } from './Visitors'
import { VisitorHistory } from './VisitorHistory'
import { SOURCE_KINDS } from '@/lib/visitor/source'

/**
 * Admin -> Visitor leads (visitor identification, brief section 7): one lead
 * per browser that accepted Analytics cookies. Business IP leads (the visit
 * came from an identified organisation) first; anonymous ones one filter away.
 * They are never emailed and never counted in Enquiries. Part of the admin
 * client app (CLAUDE.md rule 7). Paged on the server: there are far more of
 * these than enquiries.
 *
 * 30 Oct 2026 (management): each row shows where the visitor is (city or
 * state), how they found us, visits and last seen, and the Hot lead flag with
 * why (src/lib/visitor/hot.ts: quote page, a service page, or came back).
 * Journey opens every visit's pages in order with the time on each.
 */

type Row = {
  id: number; name: string; is_business_ip: boolean; visitor_status: string; created_at: string
  converted_lead_id: number | null; visitor_id: string; org_type: string | null; domain: string | null
  city: string | null; region: string | null; visit_count: number; page_count: number; first_seen: string; last_seen: string
  place: string | null; source: string; source_kind: string; landing_page: string | null
  hot: string[]; hot_text: string
}

const STATUS: Record<string, string> = { new: 'New', reviewed: 'Reviewed', converted: 'Converted', ignore: 'Ignore' }

function daysAgo(n: number): string {
  const d = new Date(); d.setDate(d.getDate() - n)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function VisitorLeads({ onToast }: { onToast: (m: string) => void }) {
  const [rows, setRows] = useState<Row[]>([])
  const [total, setTotal] = useState(0)
  const [perPage, setPerPage] = useState(50)
  const [page, setPage] = useState(1)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
  const [business, setBusiness] = useState<'yes' | 'no' | 'all'>('yes')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [source, setSource] = useState('')
  const [hot, setHot] = useState(false)
  const [open, setOpen] = useState<number | null>(null)
  const [from, setFrom] = useState(() => daysAgo(29))
  const [to, setTo] = useState(() => daysAgo(0))
  const [q, setQ] = useState('')

  const params = useCallback((p = page) => {
    const s = new URLSearchParams({ business, from, to, page: String(p) })
    if (type) s.set('type', type)
    if (status) s.set('status', status)
    if (source) s.set('source', source)
    if (hot) s.set('hot', '1')
    if (q.trim()) s.set('q', q.trim())
    return s
  }, [business, from, to, type, status, source, hot, q, page])

  const reload = useCallback(() => {
    void getJSON<{ leads: Row[]; total: number; perPage: number }>('/visitor-leads', params()).then((r) => {
      if (r.ok) { setRows(r.data.leads); setTotal(r.data.total); setPerPage(r.data.perPage); setError('') } else setError(r.error)
      setLoaded(true)
    })
  }, [params])
  useEffect(() => { const t = setTimeout(reload, 250); return () => clearTimeout(t) }, [reload])
  // A new filter starts on page 1.
  useEffect(() => { setPage(1) }, [business, from, to, type, status, source, hot, q])

  async function setLeadStatus(id: number, next: string) {
    const r = await sendJSON('/visitor-leads', 'PATCH', { id, status: next })
    if (!r.ok) { onToast(r.error); return }
    setRows((rs) => rs.map((x) => (x.id === id ? { ...x, visitor_status: next } : x)))
  }

  const pages = Math.max(1, Math.ceil(total / perPage))
  const csv = new URLSearchParams([...params(1)].filter(([k]) => k !== 'page'))
  csv.set('format', 'csv')

  return (
    <main className="a-sheet">
      <div className="a-note"><span>
        <b>Every visitor who accepted Analytics cookies becomes a Visitor lead.</b> <b>Business IP</b> means the visit came from an
        identified organisation&apos;s network (a sales signal, not proof of who it was). These never go to the enquiry emails and never
        count in Enquiries; when the same browser sends a form, its Visitor lead turns <b>Converted</b> and links to the enquiry.
        {' '}<b>Hot</b> means they viewed the quote page, a pickup or contact page, or a service page, or came back for another visit,
        without sending a form yet. <b>Journey</b> shows every visit: how it started and the pages in order, with the time on each.
      </span></div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', margin: '0 0 16px' }}>
        <span className="a-search" style={{ flex: '1 1 220px', maxWidth: 320 }}>
          <Icon d="M11 4a7 7 0 1 1-.01 0M20 20l-3.5-3.5" />
          <input className="a-inp" type="search" style={{ width: '100%' }} placeholder="Name or domain" aria-label="Search Visitor leads"
            value={q} onChange={(e) => setQ(e.target.value)} />
        </span>
        <select className="a-inp" style={{ width: 'auto' }} value={business} onChange={(e) => setBusiness(e.target.value as 'yes' | 'no' | 'all')} aria-label="Business IP">
          <option value="yes">Business IP</option><option value="no">Anonymous</option><option value="all">All</option>
        </select>
        <select className="a-inp" style={{ width: 'auto' }} value={type} onChange={(e) => setType(e.target.value)} aria-label="Organisation type">
          <option value="">All types</option>
          {Object.entries(ORG_TYPES).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </select>
        <select className="a-inp" style={{ width: 'auto' }} value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
          <option value="">All statuses</option>
          {Object.entries(STATUS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </select>
        <select className="a-inp" style={{ width: 'auto' }} value={source} onChange={(e) => setSource(e.target.value)} aria-label="Source">
          <option value="">How they found us: all</option>
          {SOURCE_KINDS.map((k) => <option key={k.kind} value={k.kind}>{k.label}</option>)}
        </select>
        <label style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13 }}>
          <input type="checkbox" checked={hot} onChange={(e) => setHot(e.target.checked)} /> Hot leads only
        </label>
        <span className="a-daterange">
          <input className="a-inp" type="date" aria-label="Seen from" value={from} max={to} onChange={(e) => setFrom(e.target.value)} />
          <span className="a-hint">to</span>
          <input className="a-inp" type="date" aria-label="Seen to" value={to} min={from} onChange={(e) => setTo(e.target.value)} />
        </span>
        <span style={{ color: 'var(--a-muted)', fontSize: 13 }}>{total.toLocaleString()} lead{total === 1 ? '' : 's'}</span>
        <a className="a-btn sm" style={{ marginLeft: 'auto' }} href={api('/visitor-leads', csv)}>Download CSV</a>
      </div>
      {error && <div className="a-err" style={{ marginBottom: 14 }}>{error}</div>}
      <Table head={['Visitor', 'Location', 'How they found us', 'Visits', 'Last seen', 'Hot lead', 'Status', '']}>
        {loaded && rows.length === 0 && !error && <Empty>No Visitor leads match. Business IP is the default view; switch to Anonymous or All to see the rest.</Empty>}
        {rows.map((r) => (
          <Fragment key={r.id}>
            <tr>
              <td>
                <span className="a-ttl">{r.name}</span>{r.is_business_ip && <span className="a-pill live" style={{ marginLeft: 6 }}>Business IP</span>}<TypeBadge type={r.org_type} />
                {r.domain && <span className="a-meta">{r.domain}</span>}
              </td>
              <td>{r.place || '—'}</td>
              <td>{r.source}{r.landing_page && <span className="a-meta" style={{ wordBreak: 'break-all' }}>Landed on {r.landing_page.replace(/^https?:\/\/(www\.)?recycletechnologies\.com/, '')}</span>}</td>
              <td style={{ whiteSpace: 'nowrap' }}>{r.visit_count} visit{r.visit_count === 1 ? '' : 's'}<span className="a-meta">{r.page_count} page{r.page_count === 1 ? '' : 's'}</span></td>
              <td style={{ whiteSpace: 'nowrap' }}>{when(r.last_seen)}</td>
              <td>{r.hot.length > 0 ? <><span className="a-pill bad">Hot</span><span className="a-meta">{r.hot_text}</span></> : ''}</td>
              <td>
                {r.converted_lead_id
                  ? <a className="a-link" href={`/admin/?lead=${r.converted_lead_id}`}>Converted → #{r.converted_lead_id}</a>
                  : (
                    <select className="a-inp" style={{ height: 28, fontSize: 12, width: 'auto' }} value={r.visitor_status}
                      onChange={(e) => void setLeadStatus(r.id, e.target.value)} aria-label="Status">
                      {Object.entries(STATUS).filter(([k]) => k !== 'converted').map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                    </select>
                  )}
              </td>
              <td>
                <button className="a-btn sm" onClick={() => setOpen(open === r.id ? null : r.id)} aria-expanded={open === r.id}>
                  {open === r.id ? 'Hide' : 'Journey'}
                </button>
              </td>
            </tr>
            {open === r.id && (
              <tr><td colSpan={8} style={{ background: 'var(--panel, #f7f8fa)' }}>
                <VisitorHistory visitorId={r.visitor_id} title={null} />
              </td></tr>
            )}
          </Fragment>
        ))}
      </Table>
      {pages > 1 && (
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 12 }}>
          <button className="a-btn sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
          <span className="a-hint">Page {page} of {pages}</span>
          <button className="a-btn sm" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      )}
    </main>
  )
}
