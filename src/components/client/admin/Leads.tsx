'use client'

import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Dialog } from './Dialog'
import { Empty, Icon, Table } from './Bits'
import { LOCATION_CSV_HEAD, LocationBlock, LocationCell, locationCsv, locationText, type LeadGeo } from './LeadLocation'
import { getJSON, sendJSON } from './api'

/**
 * Enquiries — the leads screen, moved out of AdminApp on 26 Sep 2026 when it
 * grew the lead workflow (db/010):
 *
 *   - RECEIVED shows the exact date and time, not "3 days ago" (Asim:
 *     "show the exact time and date to management"); the relative form
 *     sits under it in grey.
 *   - "+ Add enquiry" logs one that came by phone, email or in person, with
 *     how it came in (which line they called, who referred them) and who
 *     took it. Same fields as the website form, none required except a way
 *     to reach the person.
 *   - ASSIGNED: an administrator or editor hands an enquiry to an agent from
 *     the row; the agent signs in and sees only their own list, changes the
 *     status and adds notes. Every assignment, status change and note is
 *     kept under the enquiry as its activity.
 *
 * LeadWorkflow.tsx is the management view of the same data: who has what,
 * and assigning in bulk.
 */

export type Agent = { id: number; name: string; role: string }
export type Activity = { id: number; kind: 'created' | 'assigned' | 'status' | 'note'; body: string | null; at: string; who: string | null }
export type Me = { id: number; role: string }

export type LeadRow = {
  id: number; type: string; name: string | null; email: string | null; phone: string | null
  company: string | null; message: string | null; details: Record<string, string> | null
  source_page: string | null; status: string; notes: string | null; created_at: string
  /** db/010: how it came in, who took it, who it is assigned to, what happened. */
  channel?: string | null; channel_detail?: string | null; created_by_name?: string | null
  assigned_to?: number | null; assigned_at?: string | null; assigned_name?: string | null
  activity?: Activity[] | null
  /** lead_attribution (db/006): UTM tags, click IDs, landing page… or null. */
  attribution?: Record<string, string | null> | null
  /** Where they are (db/007, src/lib/lead-location.ts), or null before it ran. */
  geo?: LeadGeo | null
}

/** How they found us — the attribution fields, in the order the brief lists them. */
const ATTR_FIELDS: [string, string][] = [
  ['utm_source', 'Source (utm_source)'], ['utm_medium', 'Medium (utm_medium)'], ['utm_campaign', 'Campaign (utm_campaign)'],
  ['utm_term', 'Term (utm_term)'], ['utm_content', 'Content (utm_content)'],
  ['gclid', 'Google click ID (gclid)'], ['gbraid', 'gbraid'], ['wbraid', 'wbraid'], ['fbclid', 'Facebook click ID (fbclid)'],
  ['msclkid', 'Microsoft click ID (msclkid)'], ['campaign_id', 'Campaign ID'], ['adgroup_id', 'Ad group ID'],
  ['keyword', 'Keyword'], ['matchtype', 'Match type'], ['device', 'Device'],
  ['landing_page', 'Landing page'], ['referrer', 'Referrer'], ['submit_page', 'Submitted from'],
  ['captured_at', 'First seen (click time)'], ['user_agent', 'Browser'],
]

/** A tap on a phone number on the site (src/app/api/call-click/route.ts). */
const isCallClick = (l: LeadRow) => Boolean(l.details?.callClick)

/** One-word answer to "where did this lead come from?" for the list. */
export function leadSource(l: LeadRow): string {
  // Not the website: say how it came in, and the detail (which line, who referred).
  if (isCallClick(l)) return l.channel_detail ?? 'Tapped to call'
  if (l.channel && l.channel !== 'website') return l.channel_detail ? `${CHANNELS[l.channel] ?? l.channel} · ${l.channel_detail}` : (CHANNELS[l.channel] ?? l.channel)
  const a = l.attribution ?? {}
  if (a.utm_source) return a.utm_medium ? `${a.utm_source} / ${a.utm_medium}` : a.utm_source
  if (a.gclid || a.gbraid || a.wbraid) return 'google / cpc'
  if (a.fbclid) return 'facebook'
  if (a.msclkid) return 'bing / cpc'
  if (a.referrer) { try { return new URL(a.referrer).hostname.replace(/^www\./, '') } catch { return 'referral' } }
  return l.attribution ? '(direct)' : '—'
}

/**
 * Every field a lead can carry, in the order a person reads a form, with the
 * label the Enquiries screen shows. Columns first, then the `details` keys.
 * Any details key NOT listed here is still shown, under its own name, so a
 * field added to a form later is never silently hidden.
 */
const LEAD_FIELDS: { key: string; label: string; from: 'col' | 'details' }[] = [
  { key: 'firstName', label: 'First name', from: 'details' },
  { key: 'lastName', label: 'Last name', from: 'details' },
  { key: 'name', label: 'Name', from: 'col' },
  { key: 'email', label: 'Email', from: 'col' },
  { key: 'phone', label: 'Phone', from: 'col' },
  { key: 'company', label: 'Company', from: 'col' },
  { key: 'address', label: 'Address', from: 'details' },
  { key: 'city', label: 'City', from: 'details' },
  { key: 'state', label: 'State', from: 'details' },
  { key: 'zip', label: 'Zip code', from: 'details' },
  { key: 'service', label: 'What they want to recycle', from: 'details' },
  { key: 'item', label: 'Item', from: 'details' },
  { key: 'audience', label: 'Is it for', from: 'details' },
  { key: 'referral', label: 'How they heard about us', from: 'details' },
  { key: 'message', label: 'Message', from: 'col' },
  { key: 'source_page', label: 'Sent from page', from: 'col' },
  { key: 'consent', label: 'Consent', from: 'details' },
  { key: 'consentAt', label: 'Consent given', from: 'details' },
  { key: 'callClick', label: 'Tapped to call', from: 'details' },
  { key: 'clickedFrom', label: 'Tapped on page', from: 'details' },
  { key: 'clickLabel', label: 'Link text', from: 'details' },
  { key: 'autoReply', label: 'Drop off email sent', from: 'details' },
]
const KNOWN_DETAILS = new Set(LEAD_FIELDS.filter((f) => f.from === 'details').map((f) => f.key))
export const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'won', 'lost', 'spam']
export const CHANNELS: Record<string, string> = {
  website: 'Website form', phone: 'Phone call', email: 'Email', walk_in: 'Walk in', referral: 'Referral', other: 'Other',
}
/** The services the contact form offers — the same list, so a phone enquiry
 *  files under the same names (src/data/contact.ts SERVICE_INTEREST). */
const SERVICES = ['IT Asset Disposition (ITAD)', 'Electronics Recycling', 'Battery Recycling', 'Light Bulb Recycling',
  'Ballast Recycling', 'TV Recycling', 'Airbag Recycling', 'Hard Drive Destruction', 'Paper Shredding',
  'Off-Site Shredding', 'Phone Shredding', 'Mail-In Program', 'Other']
const LEAD_TYPES: Record<string, string> = { contact: 'Contact form', quote: 'Pickup / quote', download: 'Download', callback: 'Callback' }

/** Every field of one lead as label/value pairs, empty ones left out. */
function leadFields(l: LeadRow): [string, string][] {
  const d = l.details ?? {}
  const out: [string, string][] = []
  for (const f of LEAD_FIELDS) {
    const raw = f.from === 'col' ? (l as unknown as Record<string, unknown>)[f.key] : d[f.key]
    if (raw === null || raw === undefined || String(raw).trim() === '') continue
    // Name is already split into first / last when the form sent both.
    if (f.key === 'name' && d.firstName) continue
    out.push([f.label, f.key === 'consentAt' || f.key === 'autoReply' ? when(String(raw)) : String(raw)])
  }
  for (const [k, v] of Object.entries(d)) if (!KNOWN_DETAILS.has(k) && v) out.push([k, String(v)])
  return out
}

/** CSV of the rows on screen, every field, for a spreadsheet. */
function leadsCsv(rows: LeadRow[]): string {
  const extra = [...new Set(rows.flatMap((l) => Object.keys(l.details ?? {}).filter((k) => !KNOWN_DETAILS.has(k))))]
  const head = ['ID', 'Received', 'Type', 'Status', 'Came in by', 'Came in detail', 'Logged by', 'Assigned to',
    ...LEAD_FIELDS.map((f) => f.label), ...extra, 'Notes',
    ...LOCATION_CSV_HEAD, ...ATTR_FIELDS.map(([, label]) => label)]
  const cell = (v: unknown) => {
    const s = v === null || v === undefined ? '' : String(v)
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  const lines = rows.map((l) => {
    const d = l.details ?? {}
    const r = l as unknown as Record<string, unknown>
    return [l.id, l.created_at, l.type, l.status, CHANNELS[l.channel ?? 'website'] ?? l.channel, l.channel_detail, l.created_by_name, l.assigned_name,
      ...LEAD_FIELDS.map((f) => (f.from === 'col' ? r[f.key] : d[f.key])),
      ...extra.map((k) => d[k]), l.notes, ...locationCsv(l.geo),
      ...ATTR_FIELDS.map(([k]) => l.attribution?.[k] ?? '')].map(cell).join(',')
  })
  return [head.map(cell).join(','), ...lines].join('\r\n')
}

/**
 * Enquiries — every contact form, pickup/quote form and download lead, with
 * EVERY field it arrived with. Asim, 23 Sep 2026: "when someone submits the
 * form it must show on [the] admin side … all the entries that are
 * available". The table shows who, how to reach them and what they want at a
 * glance; "View" opens the whole submission under its row. The global search,
 * the status filter and the date range (24 Sep 2026) narrow the list;
 * "Download CSV" exports what is on screen.
 */
export function Leads({ onToast, adding, onAdded, openId = null }: {
  onToast: (m: string) => void
  /** The "+ Add enquiry" button lives in the page header; the shell flips this. */
  adding: boolean
  onAdded: () => void
  /** Opened from a link (/admin/?lead=123, the assignment email): that
   *  enquiry's details open and scroll into view once the list loads. */
  openId?: number | null
}) {
  const [rows, setRows] = useState<LeadRow[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [me, setMe] = useState<Me>({ id: 0, role: '' })
  const [setup, setSetup] = useState('')
  const [hasMapsKey, setHasMapsKey] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [open, setOpen] = useState<number | null>(null)
  const [formFor, setFormFor] = useState<LeadRow | null>(null)
  const deepLinked = useRef(false)
  const [q, setQ] = useState('')
  const [status, setStatusFilter] = useState('')
  const [who, setWho] = useState('')   // '' any, 'none' unassigned, or an agent id
  // Date range — management's request, 24 Sep 2026 ("date-range filters and
  // a global search bar"). Same choices as the Posts list.
  const [range, setRange] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  /* The cut-off for the preset ranges, worked out when the range is picked
     (reading the clock during render is not allowed; it would change under
     React). "Today" is local midnight; the others count back whole days. */
  const [since, setSince] = useState<number | null>(null)
  function pickRange(next: string) {
    setRange(next)
    const now = new Date()
    if (next === 'today') { now.setHours(0, 0, 0, 0); setSince(now.getTime()) }
    else {
      const days = ({ '7d': 7, '30d': 30, '90d': 90, '365d': 365 } as Record<string, number>)[next]
      setSince(days ? now.getTime() - days * 86_400_000 : null)
    }
  }
  const reload = useCallback(() => {
    void getJSON<{ leads: LeadRow[]; agents?: Agent[]; me?: Me; hasMapsKey?: boolean; setup?: string }>('/leads').then((r) => {
      if (r.ok) {
        setRows(r.data.leads ?? []); setAgents(r.data.agents ?? []); setHasMapsKey(Boolean(r.data.hasMapsKey))
        if (r.data.me) setMe(r.data.me)
        setSetup(r.data.setup ?? '')
      }
      setLoaded(true)
    })
  }, [])
  useEffect(reload, [reload])
  // The link in the assignment email: open that enquiry once, when it is on screen.
  useEffect(() => {
    if (!openId || deepLinked.current || !rows.some((l) => l.id === openId)) return
    deepLinked.current = true
    setOpen(openId)
    requestAnimationFrame(() => document.getElementById(`lead-${openId}`)?.scrollIntoView({ block: 'start', behavior: 'smooth' }))
  }, [openId, rows])

  async function setStatus(id: number, next: string) {
    const r = await sendJSON('/leads', 'PATCH', { id, status: next })
    onToast(r.ok ? 'Enquiry updated' : r.error)
    reload()
  }
  async function assign(id: number, to: number | null) {
    const r = await sendJSON('/leads', 'PATCH', { id, assigned_to: to })
    onToast(r.ok ? (to ? `Assigned to ${agents.find((a) => a.id === to)?.name ?? 'agent'}` : 'Unassigned') : r.error)
    reload()
  }
  async function addNote(id: number, note: string) {
    const r = await sendJSON('/leads', 'PATCH', { id, note })
    onToast(r.ok ? 'Note added' : r.error)
    reload()
  }
  const canAssign = me.role === 'administrator' || me.role === 'editor'
  const agent = me.role === 'agent'

  /* GLOBAL SEARCH: every word typed must appear somewhere in the enquiry —
     any form field, the message, notes, status, type, enquiry number, the
     date, and every "How they found us" value (source, campaign, keyword,
     landing page…). "bing light bulb" finds Bing leads about light bulbs. */
  const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const haystack = (l: LeadRow) => [
    ...leadFields(l).map(([, v]) => v), leadSource(l), l.status, LEAD_TYPES[l.type] ?? l.type,
    l.notes ?? '', `#${l.id}`, String(l.id), new Date(l.created_at).toLocaleDateString(), when(l.created_at), exactTime(l.created_at),
    l.assigned_name ?? 'unassigned', CHANNELS[l.channel ?? 'website'] ?? '', l.channel_detail ?? '',
    ...(l.activity ?? []).map((a) => a.body ?? ''),
    ...Object.values(l.attribution ?? {}).map((v) => v ?? ''), locationText(l.geo),
  ].join('\n').toLowerCase()

  /* DATE RANGE on when the enquiry arrived, in the admin's own time zone:
     "Today" starts at local midnight; "Between" includes both whole days. */
  const inRange = (iso: string) => {
    if (!range) return true
    const t = new Date(iso).getTime()
    if (Number.isNaN(t)) return true
    if (range === 'custom') {
      if (from && t < new Date(`${from}T00:00:00`).getTime()) return false
      if (to && t > new Date(`${to}T23:59:59.999`).getTime()) return false
      return true
    }
    return since === null || t >= since
  }

  const shown = rows.filter((l) =>
    (!status || l.status === status)
    && (!who || (who === 'none' ? !l.assigned_to : String(l.assigned_to) === who))
    && inRange(l.created_at)
    && (words.length === 0 || ((h) => words.every((w) => h.includes(w)))(haystack(l))))
  const filtering = Boolean(q || status || range || who)

  function download() {
    const blob = new Blob([leadsCsv(shown)], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `enquiries-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const wants = (l: LeadRow) => {
    const d = l.details ?? {}
    const bits = [d.service ?? d.item, d.audience].filter(Boolean)
    return bits.length ? bits.join(' · ') : (l.message ? (l.message.length > 90 ? `${l.message.slice(0, 90)}…` : l.message) : '—')
  }

  return (
    <main className="a-sheet">
      {setup && <div className="a-err" style={{ marginBottom: 14 }}>{setup}</div>}
      {agent ? (
        <div className="a-note"><span>
          <b>These are the enquiries assigned to you.</b> Change the status as you work each one and add a note after
          every call. <b>View details</b> shows the whole enquiry, the map and the history; <b>View form</b> shows it the way the email lays it out. Took a call? <b>+ Add enquiry</b> logs it under your name.
        </span></div>
      ) : (
        <div className="a-note"><span>
          <b>Every enquiry lands here: the website forms, and the ones the team logs from phone calls, emails and walk ins.</b>{' '}
          <b>View details</b> shows the whole enquiry, where they are on a map, how they found us and everything that has happened to it;
          <b>View form</b> shows it the way the notification email laid it out.
          <b>Assigned</b> hands it to an agent, who then sees it in their own list. The <b>mi</b> under Location is the distance to the
          nearer facility: green is inside the 100 mile pickup area.
        </span></div>
      )}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
        <span className="a-search" style={{ flex: '1 1 320px', maxWidth: 520 }}>
          <Icon d="M11 4a7 7 0 1 1-.01 0M20 20l-3.5-3.5" />
          <input className="a-inp" type="search" style={{ width: '100%' }}
            placeholder="Search everything: name, email, phone, company, city, county, ZIP, message, source, campaign…"
            aria-label="Search all enquiries" value={q} onChange={(e) => setQ(e.target.value)} />
        </span>
        <select className="a-inp" style={{ width: 'auto' }} value={status} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter by status">
          <option value="">All statuses</option>
          {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {canAssign && (
          <select className="a-inp" style={{ width: 'auto' }} value={who} onChange={(e) => setWho(e.target.value)} aria-label="Filter by agent">
            <option value="">Anyone</option>
            <option value="none">Unassigned</option>
            {agents.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        )}
        <select className="a-inp" style={{ width: 'auto' }} aria-label="Filter by date received"
          value={range} onChange={(e) => pickRange(e.target.value)}>
          <option value="">Any date</option>
          <option value="today">Today</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 3 months</option>
          <option value="365d">Last 12 months</option>
          <option value="custom">Between…</option>
        </select>
        {range === 'custom' && (
          <span className="a-daterange">
            <input className="a-inp" type="date" aria-label="From" value={from} max={to || undefined}
              onChange={(e) => setFrom(e.target.value)} />
            <span className="a-hint">to</span>
            <input className="a-inp" type="date" aria-label="To" value={to} min={from || undefined}
              onChange={(e) => setTo(e.target.value)} />
          </span>
        )}
        {filtering && (
          <button className="a-btn sm" onClick={() => { setQ(''); setStatusFilter(''); setWho(''); pickRange(''); setFrom(''); setTo('') }}>
            Clear filters
          </button>
        )}
        <span style={{ color: 'var(--a-muted)', fontSize: 13 }}>{shown.length} of {rows.length}</span>
        <button className="a-btn sm" style={{ marginLeft: 'auto' }} disabled={shown.length === 0} onClick={download}>Download CSV</button>
      </div>
      <Table head={['From', 'Contact', 'Location', 'Type', 'What they want', 'Source', 'Received', 'Assigned', 'Status', '']}>
        {loaded && rows.length === 0 && <Empty>No enquiries yet. They arrive here from the contact and pickup forms.</Empty>}
        {rows.length > 0 && shown.length === 0 && <Empty>Nothing matches those filters.</Empty>}
        {shown.map((l) => (
          <Fragment key={l.id}>
            <tr id={`lead-${l.id}`} style={{ scrollMarginTop: 80 }}>
              <td><span className="a-ttl">{l.name ?? l.email ?? (isCallClick(l) ? 'Unknown caller' : 'Anonymous')}</span>
                {l.company && <span className="a-slug">{l.company}</span>}
                {isCallClick(l) && !l.name && <span className="a-slug">tap to call · fill in below</span>}</td>
              <td>
                {l.email && <div><a className="a-link" href={`mailto:${l.email}`}>{l.email}</a></div>}
                {l.phone && <div style={{ marginTop: 2 }}><a className="a-link" href={`tel:${l.phone}`}>{l.phone}</a></div>}
              </td>
              <td><LocationCell geo={l.geo} /></td>
              <td>{isCallClick(l) ? 'Tapped to call' : l.channel && l.channel !== 'website' && l.type === 'contact' ? 'Enquiry' : (LEAD_TYPES[l.type] ?? l.type)}</td>
              <td>{wants(l)}</td>
              <td><div>{leadSource(l)}</div>{l.attribution?.utm_campaign && <div className="a-slug">{l.attribution.utm_campaign}</div>}</td>
              {/* The exact moment, for management; the "3 days ago" under it
                  is for the eye. Local time of whoever is looking. */}
              <td><div style={{ whiteSpace: 'nowrap' }}>{exactTime(l.created_at)}</div><div className="a-slug">{when(l.created_at)}</div></td>
              <td>
                {canAssign ? (
                  <select className="a-inp" style={{ height: 28, fontSize: 12, width: 'auto', maxWidth: 160 }}
                    value={l.assigned_to ?? ''} onChange={(e) => void assign(l.id, e.target.value ? Number(e.target.value) : null)} aria-label="Assigned to">
                    <option value="">Unassigned</option>
                    {agents.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                ) : (l.assigned_name ?? <span className="a-hint">—</span>)}
              </td>
              <td>
                <select className="a-inp" style={{ height: 28, fontSize: 12, width: 'auto' }}
                  value={l.status} onChange={(e) => void setStatus(l.id, e.target.value)} aria-label="Status">
                  {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
              <td>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'stretch' }}>
                  <button className="a-btn sm" style={{ whiteSpace: 'nowrap', justifyContent: 'center' }} aria-expanded={open === l.id}
                    onClick={() => setOpen(open === l.id ? null : l.id)}>
                    {open === l.id ? 'Hide details' : 'View details'}
                  </button>
                  <button className="a-btn sm" style={{ whiteSpace: 'nowrap', justifyContent: 'center' }} onClick={() => setFormFor(l)}>
                    View form
                  </button>
                </div>
              </td>
            </tr>
            {open === l.id && (
              <tr>
                <td colSpan={10} style={{ background: 'var(--panel, #f7f8fa)' }}>
                  <dl style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, max-content) 1fr', gap: '6px 20px', margin: 0, padding: '8px 4px' }}>
                    {leadFields(l).map(([k, v]) => (
                      <Fragment key={k}>
                        <dt style={{ color: 'var(--a-muted)', fontSize: 13 }}>{k}</dt>
                        <dd style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{v}</dd>
                      </Fragment>
                    ))}
                    <dt style={{ color: 'var(--a-muted)', fontSize: 13 }}>Came in by</dt>
                    <dd style={{ margin: 0 }}>{CHANNELS[l.channel ?? 'website'] ?? l.channel}{l.channel_detail ? ` · ${l.channel_detail}` : ''}{l.created_by_name ? ` · logged by ${l.created_by_name}` : ''}</dd>
                    <dt style={{ color: 'var(--a-muted)', fontSize: 13 }}>Received</dt>
                    <dd style={{ margin: 0 }}>{exactTime(l.created_at)}</dd>
                    <dt style={{ color: 'var(--a-muted)', fontSize: 13 }}>Enquiry #</dt>
                    <dd style={{ margin: 0 }} className="a-mono">{l.id}</dd>
                  </dl>
                  {(canAssign || agent) && <ContactEditor lead={l} onSaved={() => { onToast('Contact details saved'); reload() }} onError={onToast} />}
                  <ActivityPanel lead={l} onNote={(t) => addNote(l.id, t)} />
                  <LocationBlock geo={l.geo} details={l.details} hasMapsKey={hasMapsKey} />
                  <p style={{ margin: '14px 4px 6px', fontWeight: 600 }}>How they found us</p>
                  {l.attribution ? (
                    <dl style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, max-content) 1fr', gap: '6px 20px', margin: 0, padding: '0 4px 8px' }}>
                      {ATTR_FIELDS.filter(([k]) => l.attribution?.[k]).map(([k, label]) => (
                        <Fragment key={k}>
                          <dt style={{ color: 'var(--a-muted)', fontSize: 13 }}>{label}</dt>
                          <dd style={{ margin: 0, wordBreak: 'break-all' }}>{k === 'captured_at' ? when(String(l.attribution?.[k])) : l.attribution?.[k]}</dd>
                        </Fragment>
                      ))}
                    </dl>
                  ) : (
                    <p style={{ margin: '0 4px 8px', color: 'var(--a-muted)', fontSize: 13 }}>
                      Nothing recorded — this enquiry came in before tracking was switched on.
                    </p>
                  )}
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </Table>
      {adding && (
        <LeadDialog agents={agents} me={me} onClose={onAdded}
          onSaved={(id) => { onToast(`Enquiry #${id} added`); onAdded(); reload() }} />
      )}
      {formFor && <LeadFormDialog lead={formFor} onClose={() => setFormFor(null)} />}
    </main>
  )
}

/* ----------------------------------------------------------------- form */

/**
 * "View form" (Asim, 27 Sep 2026): the enquiry the way the notification
 * email lays it out, built by the same code that sends that email
 * (src/lib/lead-email.ts through /api/admin/leads/form/), shown in a frame
 * so the email's own styles apply and nothing of the admin's leaks in.
 * The frame is sandboxed: no scripts, and the values in it are escaped.
 */
export function LeadFormDialog({ lead, onClose }: { lead: LeadRow; onClose: () => void }) {
  const [mail, setMail] = useState<{ subject: string; html: string; emailed: boolean } | null>(null)
  const [error, setError] = useState('')
  const [height, setHeight] = useState(520)
  useEffect(() => {
    void getJSON<{ subject: string; html: string; emailed: boolean }>('/leads/form', new URLSearchParams({ id: String(lead.id) }))
      .then((r) => { if (r.ok) setMail(r.data); else setError(r.error) })
  }, [lead.id])
  function print() {
    const w = window.open('', '_blank', 'width=520,height=720')
    if (!w || !mail) return
    w.document.write(mail.html); w.document.close(); w.focus(); w.print()
  }
  return (
    <Dialog title={`Enquiry #${lead.id}: the form`} onClose={onClose}
      intro={mail ? (mail.emailed
        ? <>As the notification email showed it. Subject: <b>{mail.subject}</b></>
        : <>This enquiry did not come from a website form, so no notification email was sent. Here it is in the same layout.</>) : undefined}
      footer={<>
        <button className="a-btn" onClick={print} disabled={!mail}>Print</button>
        <button className="a-btn p" onClick={onClose}>Close</button>
      </>}>
      {error && <div className="a-err">{error}</div>}
      {!mail && !error && <p className="a-hint">Loading…</p>}
      {mail && (
        <iframe title={`Enquiry ${lead.id} as emailed`} srcDoc={mail.html} sandbox="allow-same-origin"
          style={{ width: '100%', height, border: '1px solid var(--rule, #e5e5e5)', borderRadius: 8, background: '#fff' }}
          onLoad={(e) => {
            // Grow to the email's height so there is one scrollbar, not two.
            const doc = e.currentTarget.contentDocument
            if (doc?.body) setHeight(Math.min(Math.max(doc.body.scrollHeight + 52, 200), 2000))
          }} />
      )}
    </Dialog>
  )
}

/* -------------------------------------------------------------- contact */

/**
 * Who this turned out to be. Made for the tap-to-call enquiries, which
 * arrive with no name or number (the site cannot see the caller's number;
 * whoever answered the phone knows it) — but it works on any enquiry.
 */
function ContactEditor({ lead, onSaved, onError }: { lead: LeadRow; onSaved: () => void; onError: (m: string) => void }) {
  const [open, setOpen] = useState(isCallClick(lead) && !lead.name && !lead.phone)
  const [v, setV] = useState({ name: lead.name ?? '', phone: lead.phone ?? '', email: lead.email ?? '', company: lead.company ?? '' })
  const [busy, setBusy] = useState(false)
  if (!open) return <p style={{ margin: '8px 4px' }}><button className="a-btn sm" onClick={() => setOpen(true)}>Edit contact details</button></p>
  const inp = (k: keyof typeof v, label: string, ph = '') => (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: 'var(--a-muted)' }}>{label}
      <input className="a-inp" value={v[k]} placeholder={ph} onChange={(e) => setV((o) => ({ ...o, [k]: e.target.value }))} />
    </label>
  )
  return (
    <div style={{ margin: '10px 4px 4px', padding: 12, border: '1px solid var(--rule, #e5e5e5)', borderRadius: 10, background: '#fff', maxWidth: 720 }}>
      <p style={{ margin: '0 0 8px', fontWeight: 600 }}>{isCallClick(lead) && !lead.name ? 'Who called? Fill in what the caller told you.' : 'Contact details'}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10 }}>
        {inp('name', 'Name')}{inp('phone', 'Phone number', '(XXX) XXX-XXXX')}{inp('email', 'Email')}{inp('company', 'Company')}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <button className="a-btn sm p" disabled={busy} onClick={async () => {
          setBusy(true)
          const r = await sendJSON('/leads', 'PATCH', { id: lead.id, contact: v })
          setBusy(false)
          if (!r.ok) { onError(r.error); return }
          setOpen(false); onSaved()
        }}>{busy ? 'Saving…' : 'Save details'}</button>
        <button className="a-btn sm" disabled={busy} onClick={() => setOpen(false)}>Cancel</button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- activity */

const KIND_LABEL: Record<Activity['kind'], string> = { created: 'Logged', assigned: 'Assigned to', status: 'Status', note: 'Note' }

/** What has happened to one enquiry, newest first, and a box to add a note. */
function ActivityPanel({ lead, onNote }: { lead: LeadRow; onNote: (text: string) => Promise<void> | void }) {
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const items = lead.activity ?? []
  return (
    <div style={{ margin: '10px 4px 4px' }}>
      <p style={{ margin: '0 0 6px', fontWeight: 600 }}>Activity</p>
      {items.length === 0 && <p style={{ margin: '0 0 8px', color: 'var(--a-muted)', fontSize: 13 }}>Nothing yet. Assign it, change its status or add a note and it shows here.</p>}
      {items.length > 0 && (
        <ul style={{ listStyle: 'none', margin: '0 0 10px', padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {items.map((a) => (
            <li key={a.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(150px, max-content) 1fr', gap: '0 16px', fontSize: 13 }}>
              <span style={{ color: 'var(--a-muted)', whiteSpace: 'nowrap' }}>{exactTime(a.at)}{a.who ? ` · ${a.who}` : ''}</span>
              <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                <b>{KIND_LABEL[a.kind] ?? a.kind}</b>{a.kind === 'assigned' && !a.body ? ': nobody (unassigned)' : a.body ? `: ${a.body}` : ''}
              </span>
            </li>
          ))}
        </ul>
      )}
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', maxWidth: 640 }}>
        <textarea className="a-inp" rows={2} style={{ flex: 1, resize: 'vertical' }} placeholder="Add a note: what was said, what happens next…"
          value={text} onChange={(e) => setText(e.target.value)} aria-label="Add a note" />
        <button className="a-btn sm" disabled={busy || !text.trim()} onClick={async () => {
          setBusy(true); await onNote(text.trim()); setText(''); setBusy(false)
        }}>{busy ? 'Saving…' : 'Add note'}</button>
      </div>
    </div>
  )
}

/* --------------------------------------------------------- add enquiry */

/* Module level, not inside LeadDialog: a component defined inside another
   is a new type on every render, so React would remount every field on each
   keystroke and the input would lose focus. */
function F({ id, label, children, hint }: { id: string; label: string; children: React.ReactNode; hint?: string }) {
  return <div className="a-field"><label htmlFor={id}>{label}</label>{children}{hint && <p className="a-hint">{hint}</p>}</div>
}

/**
 * Logging an enquiry that came by phone, email or in person. Nothing is
 * required except a way to reach the person; the rest is filled in as far
 * as the caller gave it. The service list is the contact form's, so phone
 * enquiries file under the same names as website ones.
 */
export function LeadDialog({ agents, me, onClose, onSaved }: {
  agents: Agent[]; me: Me; onClose: () => void; onSaved: (id: number) => void
}) {
  const [v, setV] = useState({
    channel: 'phone', channel_detail: '', type: 'contact', name: '', phone: '', email: '', company: '',
    service: '', audience: '', address: '', city: '', state: '', zip: '', referral: '', message: '',
    assigned_to: me.role === 'agent' ? String(me.id) : '', status: 'new',
  })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setV((o) => ({ ...o, [k]: e.target.value }))
  const canAssign = me.role === 'administrator' || me.role === 'editor'
  const two = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } as const

  return (
    <Dialog title="Add an enquiry" wide onClose={onClose}
      intro="For an enquiry that did not come through the website: a phone call, an email, somebody at the counter."
      footer={
        <>
          <button className="a-btn" onClick={onClose} disabled={busy}>Cancel</button>
          <button className="a-btn p" disabled={busy} onClick={async () => {
            setBusy(true); setError('')
            const r = await sendJSON<{ id: number }>('/leads', 'POST', {
              ...v, assigned_to: v.assigned_to ? Number(v.assigned_to) : null,
            })
            setBusy(false)
            if (!r.ok) { setError(r.error); return }
            onSaved(r.data.id)
          }}>{busy ? 'Saving…' : 'Add enquiry'}</button>
        </>
      }>
      {error && <div className="a-err">{error}</div>}
      <div className="a-stack">
        <div style={two}>
          <F id="l-channel" label="How it came in">
            <select id="l-channel" className="a-inp" value={v.channel} onChange={set('channel')}>
              {Object.entries(CHANNELS).filter(([k]) => k !== 'website').map(([k, l]) => <option key={k} value={k}>{l}</option>)}
            </select>
          </F>
          <F id="l-detail" label="Detail" hint="Which number they called, who referred them, which inbox.">
            <input id="l-detail" className="a-inp" value={v.channel_detail} onChange={set('channel_detail')}
              placeholder={v.channel === 'phone' ? 'MN line (763) 559-5130' : v.channel === 'referral' ? 'Referred by…' : ''} />
          </F>
        </div>
        <div style={two}>
          <F id="l-name" label="Name"><input id="l-name" className="a-inp" value={v.name} onChange={set('name')} /></F>
          <F id="l-phone" label="Phone number"><input id="l-phone" className="a-inp" value={v.phone} onChange={set('phone')} placeholder="(XXX) XXX-XXXX" /></F>
        </div>
        <div style={two}>
          <F id="l-email" label="Email"><input id="l-email" className="a-inp" type="email" value={v.email} onChange={set('email')} /></F>
          <F id="l-company" label="Company"><input id="l-company" className="a-inp" value={v.company} onChange={set('company')} /></F>
        </div>
        <div style={two}>
          <F id="l-service" label="What they want to recycle or shred">
            <select id="l-service" className="a-inp" value={v.service} onChange={set('service')}>
              <option value="">Not said</option>
              {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </F>
          <F id="l-aud" label="Is it for">
            <select id="l-aud" className="a-inp" value={v.audience} onChange={set('audience')}>
              <option value="">Not said</option><option>Commercial</option><option>Residential</option>
            </select>
          </F>
        </div>
        <F id="l-addr" label="Address"><input id="l-addr" className="a-inp" value={v.address} onChange={set('address')} /></F>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12 }}>
          <F id="l-city" label="City"><input id="l-city" className="a-inp" value={v.city} onChange={set('city')} /></F>
          <F id="l-state" label="State"><input id="l-state" className="a-inp" value={v.state} onChange={set('state')} placeholder="MN" /></F>
          <F id="l-zip" label="ZIP"><input id="l-zip" className="a-inp" value={v.zip} onChange={set('zip')} /></F>
        </div>
        <div style={two}>
          <F id="l-type" label="Type of enquiry">
            <select id="l-type" className="a-inp" value={v.type} onChange={set('type')}>
              <option value="contact">Enquiry</option><option value="quote">Pickup / quote</option><option value="callback">Callback</option>
            </select>
          </F>
          <F id="l-ref" label="How they heard about us"><input id="l-ref" className="a-inp" value={v.referral} onChange={set('referral')} /></F>
        </div>
        <F id="l-msg" label="What they said" hint="The gist of the call: what, how much, when, anything promised.">
          <textarea id="l-msg" className="a-inp" rows={4} style={{ resize: 'vertical' }} value={v.message} onChange={set('message')} />
        </F>
        <div style={two}>
          <F id="l-assign" label="Assign to">
            {canAssign ? (
              <select id="l-assign" className="a-inp" value={v.assigned_to} onChange={set('assigned_to')}>
                <option value="">Nobody yet</option>
                {agents.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            ) : <input id="l-assign" className="a-inp" value="You" disabled />}
          </F>
          <F id="l-status" label="Status">
            <select id="l-status" className="a-inp" value={v.status} onChange={set('status')}>
              {LEAD_STATUSES.filter((s) => s !== 'spam').map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </F>
        </div>
      </div>
    </Dialog>
  )
}

/* ---------------------------------------------------------------- time */

/** "26 Sep 2026, 14:05" in the viewer's own time zone. */
export function exactTime(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export function when(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  const mins = Math.round((Date.now() - d.getTime()) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  if (mins < 60 * 24) return `${Math.round(mins / 60)} hours ago`
  if (mins < 60 * 24 * 7) return `${Math.round(mins / (60 * 24))} days ago`
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
