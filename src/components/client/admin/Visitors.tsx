'use client'

import { Fragment, useCallback, useEffect, useState } from 'react'
import { Dialog } from './Dialog'
import { Empty, Icon, Table } from './Bits'
import { api, getJSON, sendJSON } from './api'
import { LeadDialog, when, type Agent, type Me } from './Leads'
import { Journey, type JourneySession } from './VisitorHistory'
import { SOURCE_KINDS } from '@/lib/visitor/source'

/**
 * Admin -> Visitors (visitor identification, brief section 8): the companies
 * whose networks visited the site, newest first, with what they read and
 * where they came from. Part of the admin client app (CLAUDE.md rule 7).
 *
 * Business IP is a signal, not proof: an office network resolves, home,
 * mobile and VPN traffic does not, and a shared network can name the wrong
 * organisation. The note at the top says so to whoever reads it.
 */

type Company = {
  id: number; name: string; domain: string | null; type: string; city: string | null; region: string | null
  status: string; notes: string | null; first_seen: string; last_seen: string
  visits: number; pages: number; top_pages: string[]; has_form_lead: boolean
  source: string; source_kind: string; visitor_count: number; lead_visitor_id: string | null
  hot: string[]; hot_text: string
}
type Detail = {
  company: Company & { first_seen: string }
  sessions: (JourneySession & { visitor_id: string })[]
  leads: { id: number; lead_type: string; name: string | null; email: string | null; status: string; visitor_status: string | null; created_at: string; converted_lead_id: number | null }[]
  visitors: { id: string; first_seen: string; last_seen: string; visit_count: number }[]
}

export const COMPANY_STATUS: Record<string, string> = { new: 'New', reviewed: 'Reviewed', lead_created: 'Lead created', ignore: 'Ignore' }
export const ORG_TYPES: Record<string, string> = { business: 'Business', education: 'Education', government: 'Government', banking: 'Banking' }
const T = (iso: string) => new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

/** "YYYY-MM-DD" n days before today, in the viewer's calendar (the server reads the dates as Chicago days). */
function daysAgo(n: number): string {
  const d = new Date(); d.setDate(d.getDate() - n)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function TypeBadge({ type }: { type: string | null }) {
  if (!type) return null
  return <span className="a-pill sched" style={{ marginLeft: 6 }}>{ORG_TYPES[type] ?? type}</span>
}

export function Visitors({ onToast }: { onToast: (m: string) => void }) {
  const [rows, setRows] = useState<Company[]>([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
  const [from, setFrom] = useState(() => daysAgo(6))
  const [to, setTo] = useState(() => daysAgo(0))
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [source, setSource] = useState('')
  const [hot, setHot] = useState(false)
  const [q, setQ] = useState('')
  const [expanded, setExpanded] = useState<number | null>(null)
  const [detail, setDetail] = useState<number | null>(null)
  const [creating, setCreating] = useState<Company | null>(null)
  const [who, setWho] = useState<{ agents: Agent[]; me: Me } | null>(null)

  const params = useCallback(() => {
    const p = new URLSearchParams({ from, to })
    if (type) p.set('type', type)
    if (status) p.set('status', status)
    if (source) p.set('source', source)
    if (hot) p.set('hot', '1')
    if (q.trim()) p.set('q', q.trim())
    return p
  }, [from, to, type, status, source, hot, q])

  const reload = useCallback(() => {
    void getJSON<{ companies: Company[] }>('/visitors', params()).then((r) => {
      if (r.ok) { setRows(r.data.companies); setError('') } else setError(r.error)
      setLoaded(true)
    })
  }, [params])
  useEffect(() => { const t = setTimeout(reload, 250); return () => clearTimeout(t) }, [reload])

  async function setCompanyStatus(id: number, next: string) {
    const r = await sendJSON('/visitors', 'PATCH', { id, status: next })
    if (!r.ok) { onToast(r.error); return }
    setRows((rs) => rs.map((c) => (c.id === id ? { ...c, status: next } : c)))
  }

  async function startCreate(c: Company) {
    if (!who) {
      const r = await getJSON<{ agents: Agent[]; me: Me }>('/leads', new URLSearchParams({ agents: '1' }))
      if (!r.ok) { onToast(r.error); return }
      setWho(r.data)
    }
    setCreating(c)
  }

  return (
    <main className="a-sheet">
      <div className="a-note"><span>
        <b>Companies whose office networks visited the site</b> (visitors who accepted Analytics cookies). Home, mobile and VPN
        visits stay anonymous, and a shared network can name the wrong organisation: treat a company here as a sales signal,
        not proof of who visited. <b>Hot</b> means someone from it viewed the quote page, a pickup or contact page, or a service
        page, or came back for another visit, and nobody from it has sent a form yet.
      </span></div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', margin: '0 0 16px' }}>
        <span className="a-search" style={{ flex: '1 1 260px', maxWidth: 380 }}>
          <Icon d="M11 4a7 7 0 1 1-.01 0M20 20l-3.5-3.5" />
          <input className="a-inp" type="search" style={{ width: '100%' }} placeholder="Company name or domain"
            aria-label="Search companies" value={q} onChange={(e) => setQ(e.target.value)} />
        </span>
        <span className="a-daterange">
          <input className="a-inp" type="date" aria-label="From" value={from} max={to} onChange={(e) => setFrom(e.target.value)} />
          <span className="a-hint">to</span>
          <input className="a-inp" type="date" aria-label="To" value={to} min={from} onChange={(e) => setTo(e.target.value)} />
        </span>
        <select className="a-inp" style={{ width: 'auto' }} value={type} onChange={(e) => setType(e.target.value)} aria-label="Type">
          <option value="">All types</option>
          {Object.entries(ORG_TYPES).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </select>
        <select className="a-inp" style={{ width: 'auto' }} value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
          <option value="">All statuses</option>
          {Object.entries(COMPANY_STATUS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </select>
        <select className="a-inp" style={{ width: 'auto' }} value={source} onChange={(e) => setSource(e.target.value)} aria-label="Source">
          <option value="">How they found us: all</option>
          {SOURCE_KINDS.map((k) => <option key={k.kind} value={k.kind}>{k.label}</option>)}
        </select>
        <label style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13 }}>
          <input type="checkbox" checked={hot} onChange={(e) => setHot(e.target.checked)} /> Hot only
        </label>
        <span style={{ color: 'var(--a-muted)', fontSize: 13 }}>{rows.length} compan{rows.length === 1 ? 'y' : 'ies'}</span>
        <a className="a-btn sm" style={{ marginLeft: 'auto' }} href={api('/visitors', new URLSearchParams([...params(), ['format', 'csv']]))}>Download CSV</a>
      </div>
      {error && <div className="a-err" style={{ marginBottom: 14 }}>{error}</div>}
      <Table head={['Company', 'Location', 'Last seen', 'Visits', 'Pages', 'How they found us', 'Hot lead', 'Status', '']}>
        {loaded && rows.length === 0 && !error && <Empty>No identified companies in these dates.</Empty>}
        {rows.map((c) => (
          <Fragment key={c.id}>
            <tr>
              <td><span className="a-ttl">{c.name}</span><TypeBadge type={c.type} />
                {c.domain && <a className="a-meta a-link" href={`https://${c.domain}`} target="_blank" rel="noopener noreferrer">{c.domain}</a>}</td>
              <td>{[c.city, c.region].filter(Boolean).join(', ') || '—'}</td>
              <td style={{ whiteSpace: 'nowrap' }}>{when(c.last_seen)}</td>
              <td>{c.visits}</td>
              <td>
                <button className="a-btn sm" onClick={() => setExpanded(expanded === c.id ? null : c.id)} aria-expanded={expanded === c.id}>
                  {c.pages} page{c.pages === 1 ? '' : 's'}
                </button>
              </td>
              <td>{c.source}</td>
              <td>{c.hot.length > 0 ? <><span className="a-pill bad">Hot</span><span className="a-meta">{c.hot_text}</span></> : c.has_form_lead ? <span className="a-pill live">Enquired</span> : ''}</td>
              <td>
                <select className="a-inp" style={{ height: 28, fontSize: 12, width: 'auto' }} value={c.status}
                  onChange={(e) => void setCompanyStatus(c.id, e.target.value)} aria-label="Status">
                  {Object.entries(COMPANY_STATUS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                </select>
              </td>
              <td>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <button className="a-btn sm" onClick={() => setDetail(c.id)}>Details</button>
                  <button className="a-btn sm p" onClick={() => void startCreate(c)}>Create lead</button>
                </div>
              </td>
            </tr>
            {expanded === c.id && (
              <tr><td colSpan={9} style={{ background: 'var(--panel, #f7f8fa)' }}>
                <b style={{ fontSize: 13 }}>Most viewed pages</b>
                <ol style={{ margin: '6px 0 0', paddingLeft: 18 }}>{c.top_pages.map((p) => <li key={p} className="a-mono">{p}</li>)}</ol>
              </td></tr>
            )}
          </Fragment>
        ))}
      </Table>
      {detail !== null && <CompanyDetail id={detail} onClose={() => setDetail(null)} onToast={onToast} onChanged={reload} />}
      {creating && who && (
        <LeadDialog agents={who.agents} me={who.me} onClose={() => setCreating(null)}
          prefill={{ company: creating.name, domain: creating.domain, visitorId: creating.lead_visitor_id, companyId: creating.id }}
          onSaved={(id) => { onToast(`Enquiry #${id} created from ${creating.name}`); setCreating(null); reload() }} />
      )}
    </main>
  )
}

function CompanyDetail({ id, onClose, onToast, onChanged }: { id: number; onClose: () => void; onToast: (m: string) => void; onChanged: () => void }) {
  const [d, setD] = useState<Detail | null>(null)
  const [error, setError] = useState('')
  const [notes, setNotes] = useState('')
  useEffect(() => {
    void getJSON<Detail>('/visitors/company', new URLSearchParams({ id: String(id) })).then((r) => {
      if (r.ok) { setD(r.data); setNotes(r.data.company.notes ?? '') } else setError(r.error)
    })
  }, [id])

  async function save(patch: { status?: string; notes?: string }) {
    const r = await sendJSON('/visitors', 'PATCH', { id, ...patch })
    if (!r.ok) { onToast(r.error); return }
    onToast('Saved'); onChanged()
    if (patch.status && d) setD({ ...d, company: { ...d.company, status: patch.status } })
  }

  const c = d?.company
  return (
    <Dialog title={c ? c.name : 'Company'} wide onClose={onClose}
      footer={<button className="a-btn" onClick={onClose}>Close</button>}>
      {error && <div className="a-err">{error}</div>}
      {!d && !error && <p className="a-hint">Loading…</p>}
      {c && d && (
        <div className="a-stack">
          <dl style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, max-content) 1fr', gap: '6px 20px', margin: 0 }}>
            <dt className="a-hint">Domain</dt><dd style={{ margin: 0 }}>{c.domain ? <a className="a-link" href={`https://${c.domain}`} target="_blank" rel="noopener noreferrer">{c.domain}</a> : '—'}<TypeBadge type={c.type} /></dd>
            <dt className="a-hint">Location</dt><dd style={{ margin: 0 }}>{[c.city, c.region].filter(Boolean).join(', ') || '—'}</dd>
            <dt className="a-hint">First seen</dt><dd style={{ margin: 0 }}>{T(c.first_seen)}</dd>
            <dt className="a-hint">Last seen</dt><dd style={{ margin: 0 }}>{T(c.last_seen)}</dd>
            <dt className="a-hint">Visits</dt><dd style={{ margin: 0 }}>{d.sessions.length} session{d.sessions.length === 1 ? '' : 's'} from {d.visitors.length} browser{d.visitors.length === 1 ? '' : 's'}</dd>
            <dt className="a-hint">Status</dt>
            <dd style={{ margin: 0 }}>
              <select className="a-inp" style={{ width: 'auto' }} value={c.status} onChange={(e) => void save({ status: e.target.value })}>
                {Object.entries(COMPANY_STATUS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
              </select>
            </dd>
          </dl>
          <div className="a-field">
            <label htmlFor="company-notes">Notes</label>
            <textarea id="company-notes" className="a-inp" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
            <div><button className="a-btn sm" style={{ marginTop: 6 }} onClick={() => void save({ notes })}>Save notes</button></div>
          </div>
          {d.leads.length > 0 && (
            <div>
              <b style={{ fontSize: 13 }}>Leads</b>
              <ul style={{ margin: '6px 0 0', paddingLeft: 18 }}>
                {d.leads.map((l) => (
                  <li key={l.id}>
                    {l.lead_type === 'form'
                      ? <>Enquiry <a className="a-link" href={`/admin/?lead=${l.id}`}>#{l.id}</a>: {l.name ?? l.email ?? '—'} · {l.status}</>
                      : <>Visitor lead #{l.id}: {l.visitor_status ?? 'new'}{l.converted_lead_id ? <> · converted to <a className="a-link" href={`/admin/?lead=${l.converted_lead_id}`}>#{l.converted_lead_id}</a></> : null}</>}
                    <span className="a-hint"> · {T(l.created_at)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <b style={{ fontSize: 13 }}>Visits, newest first: how each started, and its pages in order with the time on each</b>
            <div style={{ marginTop: 6 }}><Journey sessions={[...d.sessions].reverse()} newestFirst /></div>
          </div>
        </div>
      )}
    </Dialog>
  )
}
