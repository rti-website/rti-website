'use client'

import { Fragment, useEffect, useState } from 'react'
import { getJSON } from './api'

/**
 * The Visitor history panel under an enquiry's details (visitor
 * identification, brief section 8): the organisation the browser came from,
 * Business IP, first touch, and the sessions and pages before the form was
 * sent. Only shown for an enquiry whose browser had given Analytics consent
 * (it carries visitor_id). Part of the admin client app (CLAUDE.md rule 7).
 */

type Page = { path: string; title: string | null; at: string; seconds: number | null }
type Session = { id: number; started_at: string; ended_at: string; device_type: string | null; source: string | null; page_count: number; pages: Page[] }
type History = {
  company: { name: string; domain: string | null; type: string; city: string | null; region: string | null } | null
  visitor: { first_seen: string; visit_count: number; source: string; first_touch: Record<string, string> | null } | null
  sessions: Session[]
}

const T = (iso: string) => new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
const DT = { color: 'var(--a-muted)', fontSize: 13 } as const

export function VisitorHistory({ leadId }: { leadId: number }) {
  const [h, setH] = useState<History | null>(null)
  const [error, setError] = useState('')
  const [open, setOpen] = useState<number | null>(null)
  useEffect(() => {
    void getJSON<History>('/visitor-history', new URLSearchParams({ lead: String(leadId) })).then((r) => {
      if (r.ok) setH(r.data); else setError(r.error)
    })
  }, [leadId])

  return (
    <div style={{ margin: '14px 4px 8px' }}>
      <p style={{ margin: '0 0 6px', fontWeight: 600 }}>Visitor history</p>
      {error && <p className="a-hint">{error}</p>}
      {!h && !error && <p className="a-hint">Loading…</p>}
      {h && (
        <>
          <dl style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, max-content) 1fr', gap: '6px 20px', margin: 0 }}>
            <dt style={DT}>Company</dt>
            <dd style={{ margin: 0 }}>
              {h.company ? <>{h.company.name}{h.company.domain ? ` · ${h.company.domain}` : ''} <span className="a-pill live">Business IP</span>
                <span className="a-meta">{h.company.type}{h.company.city ? ` · ${[h.company.city, h.company.region].filter(Boolean).join(', ')}` : ''}</span></>
                : <span className="a-hint">Not identified (home, mobile or VPN connection, or not looked up)</span>}
            </dd>
            {h.visitor && (<>
              <dt style={DT}>First seen</dt><dd style={{ margin: 0 }}>{T(h.visitor.first_seen)} · {h.visitor.visit_count} visit{h.visitor.visit_count === 1 ? '' : 's'}</dd>
              <dt style={DT}>First touch</dt>
              <dd style={{ margin: 0, wordBreak: 'break-all' }}>{h.visitor.source}
                {h.visitor.first_touch?.landing_page && <span className="a-meta">Landed on {h.visitor.first_touch.landing_page}</span>}
                {h.visitor.first_touch?.utm_campaign && <span className="a-meta">Campaign {h.visitor.first_touch.utm_campaign}</span>}
              </dd>
            </>)}
          </dl>
          {h.sessions.length > 0 && (
            <div className="a-tablewrap" style={{ marginTop: 10 }}><div className="a-scroll"><table>
              <thead><tr><th>Session</th><th>Device</th><th>Source</th><th>Pages</th><th /></tr></thead>
              <tbody>
                {h.sessions.map((s) => (
                  <Fragment key={s.id}>
                    <tr>
                      <td style={{ whiteSpace: 'nowrap' }}>{T(s.started_at)}</td>
                      <td>{s.device_type ?? '—'}</td>
                      <td>{s.source ?? '—'}</td>
                      <td>{s.pages.length}</td>
                      <td><button className="a-btn sm" onClick={() => setOpen(open === s.id ? null : s.id)}>{open === s.id ? 'Hide' : 'Pages'}</button></td>
                    </tr>
                    {open === s.id && (
                      <tr><td colSpan={5}>
                        <ol style={{ margin: 0, paddingLeft: 18 }}>
                          {s.pages.map((p, i) => (
                            <li key={i} style={{ marginBottom: 2 }}>
                              <span className="a-mono">{p.path}</span>{p.title ? <span className="a-hint"> · {p.title}</span> : null}
                              <span className="a-hint"> · {new Date(p.at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}{p.seconds !== null ? ` · ${p.seconds}s` : ''}</span>
                            </li>
                          ))}
                        </ol>
                      </td></tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table></div></div>
          )}
        </>
      )}
    </div>
  )
}
