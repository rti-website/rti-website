'use client'

import { useCallback, useEffect, useState } from 'react'
import { Empty, Table } from './Bits'
import { getJSON, sendJSON } from './api'
import { CHANNELS, LEAD_STATUSES, LeadDialog, LeadFormDialog, exactTime, leadSource, recent, when, type Activity, type Agent, type LeadRow, type Me } from './Leads'

/**
 * Lead workflow — the management view (Asim, 26 Sep 2026: "another place,
 * lead workflow, where admin has to assign leads to agents").
 *
 * Top: one card per agent — how many they hold and how those split by
 * status — plus the unassigned pile. Below: every open enquiry with an
 * Assigned select on the row, and tick boxes for handing several to one
 * agent at once. Won, lost and spam are hidden by default; the status filter
 * brings them back.
 *
 * Same data and same endpoint as the Enquiries screen; this one is arranged
 * around WHO rather than WHAT.
 */
/** The last thing that happened to an enquiry, as a short sentence. */
function lastText(a: Activity): string {
  const body = (a.body ?? '').trim()
  if (a.kind === 'assigned') return body ? `Assigned to ${body}` : 'Unassigned'
  if (a.kind === 'status') return `Status: ${body}`
  if (a.kind === 'created') return body || 'Logged'
  return body
}

export function LeadWorkflow({ onToast, adding, onAdded }: { onToast: (m: string) => void; adding: boolean; onAdded: () => void }) {
  const [rows, setRows] = useState<LeadRow[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [me, setMe] = useState<Me>({ id: 0, role: '' })
  const [loaded, setLoaded] = useState(false)
  const [setup, setSetup] = useState('')
  const [who, setWho] = useState('')        // '' any, 'none', or agent id
  const [status, setStatus] = useState('open')   // 'open' = new, contacted, qualified
  const [picked, setPicked] = useState<Set<number>>(new Set())
  const [bulkTo, setBulkTo] = useState('')
  const [formFor, setFormFor] = useState<LeadRow | null>(null)

  const reload = useCallback(() => {
    void getJSON<{ leads: LeadRow[]; agents?: Agent[]; me?: Me; setup?: string }>('/leads').then((r) => {
      if (r.ok) {
        setRows(r.data.leads ?? []); setAgents(r.data.agents ?? []); setSetup(r.data.setup ?? '')
        if (r.data.me) setMe(r.data.me)
      }
      setLoaded(true)
    })
  }, [])
  useEffect(reload, [reload])

  const OPEN = new Set(['new', 'contacted', 'qualified'])
  const shown = rows.filter((l) =>
    (status === 'open' ? OPEN.has(l.status) : status === '' ? true : l.status === status)
    && (!who || (who === 'none' ? !l.assigned_to : String(l.assigned_to) === who)))

  async function assign(ids: number[], to: number | null) {
    let ok = 0
    for (const id of ids) {
      const r = await sendJSON('/leads', 'PATCH', { id, assigned_to: to })
      if (r.ok) ok++
      else onToast(r.error)
    }
    const name = to ? agents.find((a) => a.id === to)?.name ?? 'agent' : 'nobody'
    onToast(`${ok} ${ok === 1 ? 'enquiry' : 'enquiries'} assigned to ${name}`)
    setPicked(new Set()); setBulkTo('')
    reload()
  }

  /* Per-agent totals over every enquiry, not just the filtered ones. */
  const tally = (pred: (l: LeadRow) => boolean) => {
    const t: Record<string, number> = { total: 0 }
    for (const l of rows) if (pred(l)) { t.total = (t.total ?? 0) + 1; t[l.status] = (t[l.status] ?? 0) + 1 }
    return t
  }
  const cards = [
    { id: 'none', name: 'Unassigned', role: '', t: tally((l) => !l.assigned_to) },
    ...agents.map((a) => ({ id: String(a.id), name: a.name, role: a.role, t: tally((l) => l.assigned_to === a.id) })),
  ]
  const togglePick = (id: number) => setPicked((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n })
  const allPicked = shown.length > 0 && shown.every((l) => picked.has(l.id))

  return (
    <main className="a-sheet">
      {setup && <div className="a-err" style={{ marginBottom: 14 }}>{setup}</div>}
      <div className="a-note"><span>
        <b>Who is working what.</b> Each card is one agent&rsquo;s list; click it to see only theirs. Hand an enquiry over with the
        <b> Assigned</b> select on its row, or tick several and assign them together. An agent signs in with their own account
        (People &amp; access, role <b>Sales agent</b>) and sees only the enquiries assigned to them. Whoever you assign an
        enquiry to gets it by email straight away, with a link to open it; the email is noted under the enquiry&rsquo;s activity.
      </span></div>

      <div className="a-tiles" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        {cards.map((c) => (
          <button key={c.id} className="a-tile" style={{ textAlign: 'left', cursor: 'pointer', outline: who === c.id ? '2px solid var(--brand, #05838b)' : undefined }}
            onClick={() => setWho(who === c.id ? '' : c.id)} aria-pressed={who === c.id}>
            <div className="k">{c.name}{c.role && c.role !== 'agent' ? ` · ${c.role === 'ads' ? 'ads manager' : c.role}` : ''}</div>
            <div className="v a-tnum">{(c.t.new ?? 0) + (c.t.contacted ?? 0) + (c.t.qualified ?? 0)}</div>
            <div className="n" style={{ fontSize: 12, color: 'var(--a-muted)', marginTop: 6 }}>
              open · {c.t.new ?? 0} new, {c.t.contacted ?? 0} contacted, {c.t.qualified ?? 0} qualified
              {c.id !== 'none' && <><br />{c.t.won ?? 0} won, {c.t.lost ?? 0} lost</>}
            </div>
          </button>
        ))}
        {agents.length === 0 && loaded && (
          <div className="a-tile"><div className="k">No agents yet</div>
            <div className="n" style={{ fontSize: 13, marginTop: 6 }}>Add people with the role <b>Sales agent</b> under People &amp; access.</div></div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 12 }}>
        <select className="a-inp" style={{ width: 'auto' }} value={who} onChange={(e) => setWho(e.target.value)} aria-label="Filter by agent">
          <option value="">Anyone</option>
          <option value="none">Unassigned</option>
          {agents.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
        <select className="a-inp" style={{ width: 'auto' }} value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
          <option value="open">Open (new, contacted, qualified)</option>
          <option value="">All statuses</option>
          {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <span style={{ color: 'var(--a-muted)', fontSize: 13 }}>{shown.length} of {rows.length}</span>
        {picked.size > 0 && (
          <span style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 13 }}>{picked.size} selected</span>
            <select className="a-inp" style={{ width: 'auto' }} value={bulkTo} onChange={(e) => setBulkTo(e.target.value)} aria-label="Assign selected to">
              <option value="">Assign to…</option>
              <option value="none">Nobody (unassign)</option>
              {agents.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
            <button className="a-btn sm p" disabled={!bulkTo} onClick={() => void assign([...picked], bulkTo === 'none' ? null : Number(bulkTo))}>Assign</button>
          </span>
        )}
      </div>

      <Table head={['', 'From', 'Contact', 'What they want', 'Came in by', 'Received', 'Status', 'Assigned', 'Last activity', '']}>
        {loaded && rows.length === 0 && <Empty>No enquiries yet.</Empty>}
        {rows.length > 0 && shown.length === 0 && <Empty>Nothing matches those filters.</Empty>}
        {shown.length > 0 && (
          <tr>
            <td><input type="checkbox" checked={allPicked} aria-label="Select all shown"
              onChange={() => setPicked(allPicked ? new Set() : new Set(shown.map((l) => l.id)))} /></td>
            <td colSpan={9} style={{ color: 'var(--a-muted)', fontSize: 12 }}>Select all shown</td>
          </tr>
        )}
        {shown.map((l) => {
          const d = l.details ?? {}
          const last = l.activity?.[0]
          return (
            <tr key={l.id}>
              <td><input type="checkbox" checked={picked.has(l.id)} onChange={() => togglePick(l.id)} aria-label={`Select enquiry ${l.id}`} /></td>
              <td><span className="a-ttl">{l.name ?? l.email ?? 'Anonymous'}</span>{l.company && <span className="a-meta">{l.company}</span>}</td>
              <td>
                {l.phone && <div><a className="a-link" href={`tel:${l.phone}`}>{l.phone}</a></div>}
                {l.email && <div style={{ marginTop: 2 }}><a className="a-link" href={`mailto:${l.email}`}>{l.email}</a></div>}
              </td>
              <td>{[d.service ?? d.item, d.audience].filter(Boolean).join(' · ') || (l.message ? `${l.message.slice(0, 70)}…` : '—')}</td>
              <td>{l.channel && l.channel !== 'website' ? leadSource(l) : (CHANNELS.website ?? 'Website form')}</td>
              <td><div style={{ whiteSpace: 'nowrap' }}>{exactTime(l.created_at)}</div>{recent(l.created_at) && <div className="a-meta">{when(l.created_at)}</div>}</td>
              <td>
                <select className="a-inp" style={{ height: 28, fontSize: 12, width: 'auto' }} value={l.status} aria-label="Status"
                  onChange={async (e) => { const r = await sendJSON('/leads', 'PATCH', { id: l.id, status: e.target.value }); onToast(r.ok ? 'Status updated' : r.error); reload() }}>
                  {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
              <td>
                <select className="a-inp" style={{ height: 28, fontSize: 12, width: 'auto', maxWidth: 170 }} value={l.assigned_to ?? ''} aria-label="Assigned to"
                  onChange={(e) => void assign([l.id], e.target.value ? Number(e.target.value) : null)}>
                  <option value="">Unassigned</option>
                  {agents.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
                {l.assigned_at && <div className="a-meta" style={{ whiteSpace: 'nowrap' }}>Since {exactTime(l.assigned_at)}</div>}
              </td>
              <td style={{ minWidth: 180, maxWidth: 260 }}>
                {last ? <>
                  <div className="a-lastact" title={lastText(last)}>{lastText(last)}</div>
                  <div className="a-meta">{when(last.at)}{last.who ? ` · ${last.who}` : ''}</div>
                </> : <span className="a-hint">—</span>}
              </td>
              <td><button className="a-btn sm" style={{ whiteSpace: 'nowrap' }} onClick={() => setFormFor(l)}>View form</button></td>
            </tr>
          )
        })}
      </Table>

      {adding && (
        <LeadDialog agents={agents} me={me} onClose={onAdded}
          onSaved={(id) => { onToast(`Enquiry #${id} added`); onAdded(); reload() }} />
      )}
      {formFor && <LeadFormDialog lead={formFor} onClose={() => setFormFor(null)} />}
    </main>
  )
}
