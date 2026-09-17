'use client'

/**
 * The three fragments more than one admin screen draws.
 *
 * They lived inside AdminApp until the SEO desk and the Users screen became
 * their own files and wanted the same table. Moving them here rather than
 * copying ten lines twice keeps one definition of what an admin table looks
 * like — and a circular import (AdminApp -> SeoDesk -> AdminApp) is the thing
 * copying them would have been working around.
 */

export function Icon({ d, w = 2 }: { d: string; w?: number }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
  )
}

/** Shown in place of a list that could not be loaded. A network blip is not a
 *  reason to lose the screen — it is a reason to offer a second go. */
export function Retry({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="a-err" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ flex: 1 }}>{error}</span>
      <button className="a-btn sm" onClick={onRetry}>Try again</button>
    </div>
  )
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <tr><td colSpan={9} style={{ color: 'var(--a-muted)' }}>{children}</td></tr>
}

export function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <div className="a-tablewrap"><div className="a-scroll"><table>
      <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
      <tbody>{children}</tbody>
    </table></div></div>
  )
}
