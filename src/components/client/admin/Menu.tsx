'use client'

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * A toolbar dropdown.
 *
 * Google Docs puts a caret beside the alignment, spacing and list buttons and
 * opens a small panel of choices; that is what Asim asked for, so that is what
 * this is. The alternative — one flat row of twenty buttons — is what the
 * toolbar was, and it could not grow.
 *
 * Behaviour that has to be right or it feels broken: Escape closes it, a click
 * anywhere else closes it, choosing something closes it, and it never opens off
 * the right edge of the window.
 */
export function Menu({ label, icon, children, width = 200, active = false, grid = false }: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode | ((close: () => void) => React.ReactNode)
  width?: number
  active?: boolean
  grid?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [box, setBox] = useState({ top: 0, left: 0 })
  const button = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (!button.current?.contains(t) && !panel.current?.contains(t)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); setOpen(false) } }
    // The toolbar lives in a scrolling panel; scrolling it would leave the menu
    // hanging in mid-air, so scrolling anywhere closes it.
    const onScroll = () => setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey, true)
    document.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onScroll)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey, true)
      document.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onScroll)
    }
  }, [open])

  /* !! THE PANEL IS A PORTAL, AND THAT IS NOT OVER-ENGINEERING. The toolbar sits
     inside .a-edmid, which scrolls — and a scroll container CLIPS its children
     on both axes, so an absolutely positioned panel was cut off at the edge of
     the writing column no matter what z-index it had. Fixed positioning against
     the button's own rect is the only way out of the box. */
  useLayoutEffect(() => {
    if (!open || !button.current) return
    const b = button.current.getBoundingClientRect()
    const panelWidth = grid ? width : width
    const left = Math.min(b.left, window.innerWidth - panelWidth - 12)
    setBox({ top: b.bottom + 5, left: Math.max(12, left) })
  }, [open, width, grid])

  return (
    <>
      <button type="button" ref={button} className={`a-tb caret${active ? ' on' : ''}`} title={label} aria-label={label}
        aria-haspopup="true" aria-expanded={open} aria-controls={id}
        onClick={() => setOpen((o) => !o)}>
        {icon}
        <svg width="7" height="7" viewBox="0 0 8 8" aria-hidden="true" className="chev">
          <path d="M1 2.5 4 5.5 7 2.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && createPortal(
        <div className={`a-menupanel${grid ? ' grid' : ''}`} id={id} role="menu" ref={panel}
          style={{ width, top: box.top, left: box.left }}>
          {typeof children === 'function' ? children(() => setOpen(false)) : children}
        </div>,
        /* !! INTO .rti-admin, NOT document.body. Every colour, font and shadow in
           the admin is a custom property declared ON .rti-admin, so a panel
           parked outside it inherits none of them and renders as bare text on no
           background — which is exactly what happened the first time. Fixed
           positioning still escapes the scrolling column from in here, because
           .rti-admin sets no transform, filter or contain and so never becomes
           the containing block for a fixed child. */
        document.querySelector('.rti-admin') ?? document.body,
      )}
    </>
  )
}

export function MenuItem({ on, onClick, children, note }: {
  on?: boolean; onClick: () => void; children: React.ReactNode; note?: string
}) {
  return (
    <button type="button" role="menuitem" className={`a-menuitem${on ? ' on' : ''}`} onClick={onClick}>
      <span className="tick" aria-hidden="true">{on ? '✓' : ''}</span>
      <span className="lbl">{children}{note && <small>{note}</small>}</span>
    </button>
  )
}

export function MenuDivider() { return <span className="a-menudiv" role="separator" /> }

export function MenuNote({ children }: { children: React.ReactNode }) {
  return <p className="a-menunote">{children}</p>
}

/** A tile in a picker grid — the list-marker choosers. */
export function MenuTile({ on, onClick, label, children }: {
  on?: boolean; onClick: () => void; label: string; children: React.ReactNode
}) {
  return (
    <button type="button" role="menuitem" className={`a-menutile${on ? ' on' : ''}`}
      onClick={onClick} title={label} aria-label={label}>
      {children}
    </button>
  )
}
