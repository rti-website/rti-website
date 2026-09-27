'use client'

import { useState } from 'react'

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

/**
 * A password box with an eye that shows the password while it is held
 * down or clicked (Asim, 27 Sep 2026: "in password make an eye so the user
 * can see their password"). Used on the sign in card and the People &
 * access dialog. The eye is a real button: keyboard reachable, labelled.
 */
export function PasswordInput({ id, value, onChange, autoComplete, required, placeholder, mono = false, label = 'password' }: {
  id: string; value: string; onChange: (v: string) => void; autoComplete: string; required?: boolean
  placeholder?: string
  /** Monospace, for keys and tokens (the Maps key card, 27 Sep 2026). */
  mono?: boolean
  /** What the eye says it shows: "password" (default) or, say, "key". */
  label?: string
}) {
  const [shown, setShown] = useState(false)
  return (
    <span className="a-pw">
      <input id={id} className={`a-inp${mono ? ' a-mono' : ''}`} type={shown ? 'text' : 'password'} autoComplete={autoComplete} required={required}
        placeholder={placeholder} spellCheck={false} value={value} onChange={(e) => onChange(e.target.value)} />
      <button type="button" className="a-pweye" aria-label={shown ? `Hide ${label}` : `Show ${label}`} aria-pressed={shown}
        title={shown ? `Hide ${label}` : `Show ${label}`} onClick={() => setShown((s) => !s)}>
        {shown
          ? <Icon d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.1A10.4 10.4 0 0 1 12 5c5 0 8.6 4 10 7a15.3 15.3 0 0 1-3.2 4M6.2 6.2C4 7.8 2.7 10 2 12c1.4 3 5 7 10 7 1.5 0 2.9-.3 4.1-.9" />
          : <Icon d="M2 12c1.4-3 5-7 10-7s8.6 4 10 7c-1.4 3-5 7-10 7S3.4 15 2 12ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />}
      </button>
    </span>
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
