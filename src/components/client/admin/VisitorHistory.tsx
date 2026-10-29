'use client'

import { useEffect, useState } from 'react'
import { getJSON } from './api'

/**
 * The Visitor history panel (visitor identification, brief section 8): the
 * organisation the browser came from, Business IP, first touch, and the
 * visit-by-visit journey. Two places use it (CLAUDE.md rule 7, part of the
 * admin client app):
 *   - under an enquiry's details (leadId): the visits before the form was sent;
 *   - Admin -> Visitor leads, a row's Journey (visitorId): every visit.
 *
 * 30 Oct 2026 (management): "pages viewed in order, with time on each page"
 * and "how they found us". Visits run oldest first, each with how that visit
 * started (Google Ads, Organic: Google, LinkedIn, Direct …), where from, and
 * its pages in the order viewed with the time on each.
 */

export type JourneyPage = { path: string; title: string | null; at: string; seconds: number | null }
export type JourneySession = {
  id: number; started_at: string; ended_at: string; device_type: string | null; page_count: number
  source: string; source_kind: string; campaign: string | null; landing: string | null; place: string | null
  pages: JourneyPage[]
}
type History = {
  company: { name: string; domain: string | null; type: string; city: string | null; region: string | null } | null
  visitor: { first_seen: string; last_seen?: string; visit_count: number; source: string; first_touch: Record<string, string> | null } | null
  sessions: JourneySession[]
}

const T = (iso: string) => new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
const HM = (iso: string) => new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
const DT = { color: 'var(--a-muted)', fontSize: 13 } as const

/** 45 -> "45s", 125 -> "2m 05s", 3600 -> "60m 00s"; null (left before it was measured) -> "not measured". */
export function timeOnPage(seconds: number | null): string {
  if (seconds === null || seconds === undefined) return 'not measured'
  if (seconds < 60) return `${seconds}s`
  return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, '0')}s`
}

/** Total measured time of a visit, "3m 10s". */
function visitTime(pages: JourneyPage[]): string | null {
  const s = pages.reduce((n, p) => n + (p.seconds ?? 0), 0)
  return s > 0 ? timeOnPage(s) : null
}

/** Every visit, oldest first, each with its pages in order and the time on each. */
export function Journey({ sessions, newestFirst = false }: { sessions: JourneySession[]; newestFirst?: boolean }) {
  if (sessions.length === 0) return <p className="a-hint">No pages recorded.</p>
  const n = sessions.length
  const list = newestFirst ? [...sessions].reverse() : sessions
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {list.map((s) => {
        const idx = sessions.indexOf(s) + 1
        const total = visitTime(s.pages)
        return (
          <div key={s.id} style={{ border: '1px solid var(--a-line, #e3e7ea)', borderRadius: 8, padding: '8px 12px', background: '#fff' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 14px', alignItems: 'baseline', fontSize: 13 }}>
              <b>Visit {idx}{n > 1 ? ` of ${n}` : ''}</b>
              <span>{T(s.started_at)}</span>
              <span><span style={DT}>Found us:</span> {s.source}{s.campaign ? <span style={DT}> · campaign {s.campaign}</span> : null}</span>
              {s.place && <span><span style={DT}>From:</span> {s.place}</span>}
              {s.device_type && <span style={DT}>{s.device_type}</span>}
              <span style={DT}>{s.pages.length} page{s.pages.length === 1 ? '' : 's'}{total ? `, ${total}` : ''}</span>
            </div>
            <ol style={{ margin: '6px 0 0', paddingLeft: 22, fontSize: 13 }}>
              {s.pages.map((p, i) => (
                <li key={i} style={{ marginBottom: 2 }}>
                  <span className="a-mono">{p.path}</span>
                  {p.title ? <span className="a-hint"> · {p.title}</span> : null}
                  <span className="a-hint"> · {HM(p.at)} · </span>
                  <span style={p.seconds === null ? DT : undefined}>{timeOnPage(p.seconds)}</span>
                </li>
              ))}
            </ol>
          </div>
        )
      })}
    </div>
  )
}

export function VisitorHistory({ leadId, visitorId, title = 'Visitor history' }: { leadId?: number; visitorId?: string; title?: string | null }) {
  const [h, setH] = useState<History | null>(null)
  const [error, setError] = useState('')
  useEffect(() => {
    const p = visitorId ? new URLSearchParams({ visitor: visitorId }) : new URLSearchParams({ lead: String(leadId) })
    void getJSON<History>('/visitor-history', p).then((r) => {
      if (r.ok) setH(r.data); else setError(r.error)
    })
  }, [leadId, visitorId])

  return (
    <div style={{ margin: '14px 4px 8px' }}>
      {title && <p style={{ margin: '0 0 6px', fontWeight: 600 }}>{title}</p>}
      {error && <p className="a-hint">{error}</p>}
      {!h && !error && <p className="a-hint">Loading…</p>}
      {h && (
        <>
          <dl style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, max-content) 1fr', gap: '6px 20px', margin: '0 0 10px' }}>
            <dt style={DT}>Company</dt>
            <dd style={{ margin: 0 }}>
              {h.company ? <>{h.company.name}{h.company.domain ? ` · ${h.company.domain}` : ''} <span className="a-pill live">Business IP</span>
                <span className="a-meta">{h.company.type}{h.company.city ? ` · ${[h.company.city, h.company.region].filter(Boolean).join(', ')}` : ''}</span></>
                : <span className="a-hint">Not identified (home, mobile or VPN connection, or not looked up)</span>}
            </dd>
            {h.visitor && (<>
              <dt style={DT}>Visits</dt>
              <dd style={{ margin: 0 }}>{h.visitor.visit_count} · first seen {T(h.visitor.first_seen)}{h.visitor.last_seen ? ` · last seen ${T(h.visitor.last_seen)}` : ''}</dd>
              <dt style={DT}>First found us</dt>
              <dd style={{ margin: 0, wordBreak: 'break-all' }}>{h.visitor.source}
                {h.visitor.first_touch?.landing_page && <span className="a-meta">Landed on {h.visitor.first_touch.landing_page}</span>}
                {h.visitor.first_touch?.utm_campaign && <span className="a-meta">Campaign {h.visitor.first_touch.utm_campaign}</span>}
              </dd>
            </>)}
          </dl>
          <Journey sessions={h.sessions} />
        </>
      )}
    </div>
  )
}
