'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'

/**
 * The admin's dialogs.
 *
 * !! WHY NOT window.prompt/confirm. Three reasons, and the third is the one that
 * actually bit us. They cannot be styled, so they look like a 1998 browser in
 * the middle of the product. They block the whole tab, so nothing can render
 * behind them. And `prompt()` returns null when the user presses Cancel, which
 * reads as falsy but is easy to coalesce away — `prompt(...) ?? ''` is how the
 * New post button ended up creating an untitled post every time somebody backed
 * out of it. Here, cancelling calls onCancel and nothing else happens, because
 * there is no value to mistake for a decision.
 *
 * <dialog showModal()> was the other option. It brings its own focus trap and
 * ::backdrop, but it also brings a top-layer that ignores our stacking context
 * and a Safari history of quirks. This is 60 lines and behaves the same
 * everywhere.
 */

export function Dialog({ title, intro, children, footer, onClose, wide = false, labelledBy }: {
  title: string
  intro?: React.ReactNode
  children?: React.ReactNode
  footer: React.ReactNode
  onClose: () => void
  wide?: boolean
  labelledBy?: string
}) {
  const panel = useRef<HTMLDivElement>(null)
  const headingId = useId()

  useEffect(() => {
    const returnTo = document.activeElement as HTMLElement | null

    /* Focus the first thing worth typing in, or the confirming button, or the
       panel itself — in that order. NOT one querySelector with a comma list:
       that returns the first match in DOCUMENT order, which is the close X, so
       every dialog would open with the keyboard on "dismiss". And a destructive
       dialog deliberately falls through to the panel, so that Enter on a
       "delete this" confirmation does nothing. */
    const body = panel.current
    const first =
      body?.querySelector<HTMLElement>('.a-dlgbody input:not([type="hidden"]):not([disabled]), .a-dlgbody textarea, .a-dlgbody select')
      ?? body?.querySelector<HTMLElement>('.a-dlgfoot .a-btn.p')
      ?? body
    first?.focus()

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { e.stopPropagation(); onClose(); return }
      if (e.key !== 'Tab' || !panel.current) return
      // Keep Tab inside the dialog — otherwise it walks the page behind it,
      // which for a screen reader means the dialog has quietly disappeared.
      const stops = [...panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')]
        .filter((el) => el.offsetParent !== null)
      if (stops.length === 0) return
      const first = stops[0]!, last = stops[stops.length - 1]!
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }

    document.addEventListener('keydown', onKey, true)
    const scroll = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey, true)
      document.body.style.overflow = scroll
      returnTo?.focus?.()
    }
  }, [onClose])

  return (
    <div className="a-scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className={`a-dlg${wide ? ' wide' : ''}`} role="dialog" aria-modal="true"
        aria-labelledby={labelledBy ?? headingId} ref={panel} tabIndex={-1}>
        <header className="a-dlghead">
          <h2 id={headingId}>{title}</h2>
          <button className="a-x" onClick={onClose} aria-label="Close">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </header>
        {intro && <div className="a-dlgintro">{intro}</div>}
        {children && <div className="a-dlgbody">{children}</div>}
        <footer className="a-dlgfoot">{footer}</footer>
      </div>
    </div>
  )
}

/** One text field and two buttons. Cancel does nothing at all. */
export function AskDialog({ title, label, help, intro, placeholder, initial = '', confirmLabel = 'Create',
  required = true, multiline = false, onCancel, onSubmit }: {
  title: string; label: string; help?: React.ReactNode; intro?: React.ReactNode
  placeholder?: string; initial?: string; confirmLabel?: string
  required?: boolean; multiline?: boolean
  onCancel: () => void
  onSubmit: (value: string) => void | Promise<void>
}) {
  const [value, setValue] = useState(initial)
  const [busy, setBusy] = useState(false)
  const id = useId()

  const go = useCallback(async () => {
    const v = value.trim()
    if (required && !v) return
    setBusy(true)
    try { await onSubmit(v) } finally { setBusy(false) }
  }, [value, required, onSubmit])

  return (
    <Dialog title={title} intro={intro} onClose={onCancel} footer={
      <>
        <button className="a-btn" onClick={onCancel} disabled={busy}>Cancel</button>
        <button className="a-btn p" onClick={() => void go()} disabled={busy || (required && !value.trim())}>
          {busy ? 'Working…' : confirmLabel}
        </button>
      </>
    }>
      <div className="a-field">
        <label htmlFor={id}>{label}</label>
        {multiline
          ? <textarea id={id} className="a-inp a-ta" rows={3} placeholder={placeholder} value={value}
              onChange={(e) => setValue(e.target.value)} />
          : <input id={id} className="a-inp" placeholder={placeholder} value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); void go() } }} />}
        {help && <p className="a-hint">{help}</p>}
      </div>
    </Dialog>
  )
}

/** Yes or no, where yes is destructive and is never the default focus. */
export function ConfirmDialog({ title, children, confirmLabel = 'Delete', onCancel, onConfirm, busyLabel = 'Deleting…' }: {
  title: string; children: React.ReactNode; confirmLabel?: string; busyLabel?: string
  onCancel: () => void; onConfirm: () => void | Promise<void>
}) {
  const [busy, setBusy] = useState(false)
  return (
    <Dialog title={title} onClose={onCancel} footer={
      <>
        <button className="a-btn" onClick={onCancel} disabled={busy}>Cancel</button>
        <button className="a-btn stop" disabled={busy} onClick={async () => {
          setBusy(true)
          try { await onConfirm() } finally { setBusy(false) }
        }}>{busy ? busyLabel : confirmLabel}</button>
      </>
    }>
      <div className="a-dlgtext">{children}</div>
    </Dialog>
  )
}
