'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * A draggable divider between a main column and a right-hand rail.
 *
 * WHY IT EXISTS: two screens put a live preview in a fixed 328–340px rail beside
 * a form — the post editor's Search Appearance panel and the SEO desk's Google
 * preview. Asim asked on 17 Sep 2026 for the preview to take half the page, and
 * in the same breath said a divider he could drag himself would be better. He is
 * right: the right width depends on the monitor and on whether you are writing
 * the article or tuning the snippet, and no single number serves both.
 *
 * So the rail's width is a number the person owns. It is remembered per screen
 * in localStorage, and double-clicking the divider puts it back.
 *
 * !! THE WIDTH IS APPLIED AS A CSS CUSTOM PROPERTY, NOT AS A WIDTH ON THE RAIL.
 * Both layouts are CSS grids whose track sizes have to stay in the stylesheet —
 * the media queries collapse them to a single column below 1100px, and a width
 * set on the rail element would survive that collapse and squash the narrow
 * layout. The host element carries `--rail-w` and the grid reads it, so a media
 * query that simply does not mention the property wins for free.
 *
 * !! THE HOST IS HELD IN STATE BEHIND A CALLBACK REF, NOT IN A useRef. Both the
 * maximum width and the aria-valuemax on the grip are worked out from the host's
 * measured width, and a ref read during render gives you the width from the
 * PREVIOUS commit — so the first drag after a window resize clamps against a
 * stale bound. State re-renders when the element arrives and when it changes
 * size, which is exactly when those numbers need recomputing.
 */

type Opts = {
  /** The rail may not go below this. */
  min?: number
  /** The main column may not go below this; the rail's maximum follows from it. */
  mainMin?: number
  /** Used when nothing has been stored yet. Given the width the two columns
      actually have to share — the host minus the grip and any other fixed
      column — so that `(w) => w / 2` really is half of what you can see. */
  initial?: (available: number) => number
}

const clamp = (n: number, lo: number, hi: number) => Math.min(Math.max(n, lo), Math.max(lo, hi))

export function useSplit(storageKey: string, opts: Opts = {}) {
  const { min = 300, mainMin = 460, initial = () => 340 } = opts

  const [host, setHost] = useState<HTMLDivElement | null>(null)
  const [hostWidth, setHostWidth] = useState(0)
  const [width, setWidth] = useState<number | null>(null)
  const [dragging, setDragging] = useState(false)

  /* Options arrive as a fresh object literal on every render, so they are frozen
     on the first one rather than listed as effect dependencies — otherwise every
     render re-runs the restore and rebuilds the observer. A lazy state
     initialiser, not a ref written during render: this runs exactly once and
     never on a re-render, which a `cfg.current = …` at the top of the body
     does not. The three values are call-site literals and never change. */
  const [cfg] = useState(() => ({ min, mainMin, initial }))

  /* Everything in the host that is neither the main column nor the rail: the
     grip's own grid track, and in the post editor the 208px outline rail as
     well. Those pixels come out of the main column, so the rail's ceiling is the
     host minus the form's minimum minus THIS, and leaving it out let a drag to
     the far end squeeze the writing column to 352px against a stated minimum of
     560. Two passes of the browser check found it twice — once for the grip and
     once for the outline rail — which is why it is now measured rather than
     configured: a number passed in as an option cannot know that full screen
     has just hidden a column. */
  const [reserved, setReserved] = useState(0)

  const max = hostWidth ? Math.max(min, hostWidth - mainMin - reserved) : undefined

  /** Clamp a candidate width against the host as it is measured right now. */
  const fit = useCallback((n: number | null, w: number, other: number) => {
    if (!w) return n                     // not measured yet; leave it alone
    const c = cfg
    const room = Math.max(0, w - other)
    return clamp(n ?? c.initial(room), c.min, Math.max(c.min, room - c.mainMin))
  }, [cfg])

  /* The element's width, and every later change to it. A window resize — or
     entering full screen, which is the same thing to the layout — can leave a
     remembered width wider than the space now available. */
  useEffect(() => {
    if (!host) return
    /* The grid's children are […, main, grip, rail]. Measuring the two either
       side of the grip and subtracting from the host gives the reserved width
       without this hook needing to know a selector for either layout — and
       without it going stale when full screen drops a column. */
    const grip = () => host.querySelector<HTMLElement>(':scope > .a-grip')
    const measure = () => {
      const w = host.clientWidth
      setHostWidth(w)
      const g = grip()
      if (!g) { setReserved(0); return }
      const main = g.previousElementSibling as HTMLElement | null
      const rail = g.nextElementSibling as HTMLElement | null
      const inner = (main?.getBoundingClientRect().width ?? 0) + (rail?.getBoundingClientRect().width ?? 0)
      setReserved(Math.max(0, Math.round(w - inner)))
    }
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(measure)
    ro.observe(host)
    /* Also the main column: full screen hides the outline rail without changing
       the host's width, so the host alone would never report that change. */
    const main = grip()?.previousElementSibling
    if (main) ro.observe(main)
    return () => ro.disconnect()
  }, [host])

  /* The stored value is read in an effect, not in a useState initialiser:
     the admin route is prerendered, and an initialiser touching localStorage
     would run on the server, where it does not exist, and then disagree with
     the first client render. */
  const restored = useRef(false)
  useEffect(() => {
    if (!hostWidth) return
    if (!restored.current) {
      restored.current = true
      let stored: number | null = null
      try {
        const raw = localStorage.getItem(storageKey)
        if (raw) { const n = Number(raw); if (Number.isFinite(n) && n > 0) stored = n }
      } catch { /* private window, or site data blocked. The default is fine. */ }
      setWidth(fit(stored, hostWidth, reserved))
      return
    }
    setWidth((w) => fit(w, hostWidth, reserved))
  }, [hostWidth, reserved, storageKey, fit])

  const commit = useCallback((n: number) => {
    const next = fit(n, hostWidth, reserved)
    setWidth(next)
    if (next !== null) {
      try { localStorage.setItem(storageKey, String(Math.round(next))) } catch { /* fine */ }
    }
  }, [fit, hostWidth, reserved, storageKey])

  const reset = useCallback(() => {
    setWidth(hostWidth ? fit(cfg.initial(Math.max(0, hostWidth - reserved)), hostWidth, reserved) : null)
    try { localStorage.removeItem(storageKey) } catch { /* fine */ }
  }, [cfg, fit, hostWidth, reserved, storageKey])

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !host) return
    /* !! NO e.preventDefault() HERE, AND THAT IS THE WHOLE REASON THIS COMMENT
       EXISTS. preventDefault on a pointerdown suppresses the compatibility mouse
       events the browser would otherwise synthesise from it — click and
       dblclick among them — so with it in place the double-click-to-reset on the
       divider silently never fired. Text selection is held off by user-select:
       none on .a-grip and on the host while .dragging, which is where that
       belongs anyway. */
    const right = host.getBoundingClientRect().right
    const w = host.clientWidth
    const other = reserved
    setDragging(true)

    /* Listeners go on the window, not on the grip. An 18px grip cannot keep up
       with a fast drag and the pointer leaves it constantly — with the events
       on the grip the divider stops dead halfway across the screen. */
    const move = (ev: PointerEvent) => setWidth(fit(right - ev.clientX, w, other))
    const up = (ev: PointerEvent) => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      setDragging(false)
      commit(right - ev.clientX)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
  }, [host, reserved, fit, commit])

  /* Arrow keys, because a divider you can only reach with a mouse is a control
     that some of the people using this screen do not have at all. */
  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 64 : 16
    const now = width ?? cfg.initial(Math.max(0, (hostWidth || 1200) - reserved))
    if (e.key === 'ArrowLeft') { e.preventDefault(); commit(now + step) }
    else if (e.key === 'ArrowRight') { e.preventDefault(); commit(now - step) }
    else if (e.key === 'Home' || e.key === 'Enter') { e.preventDefault(); reset() }
  }, [cfg, width, hostWidth, reserved, commit, reset])

  return {
    /** A callback ref for the grid that owns both columns. */
    hostRef: setHost,
    /** `--rail-w`, for that same grid's style attribute. */
    hostStyle: {
      '--rail-w': width === null ? undefined : `${Math.round(width)}px`,
    } as React.CSSProperties,
    /** True while the pointer is down; put `.dragging` on the host. */
    dragging,
    width,
    reset,
    /** Spread onto <SplitGrip>. */
    grip: {
      onPointerDown,
      onKeyDown,
      onDoubleClick: reset,
      valueNow: width === null ? undefined : Math.round(width),
      valueMin: min,
      valueMax: max,
    },
  }
}

type GripProps = {
  label: string
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void
  onDoubleClick: () => void
  valueNow?: number
  valueMin?: number
  valueMax?: number
}

/**
 * The divider itself.
 *
 * `role="separator"` with `aria-orientation="vertical"` and a tab stop is what
 * makes a screen reader announce something resizable rather than a stray
 * eighteen-pixel div — and it is what makes the arrow keys above discoverable.
 */
export function SplitGrip({ label, valueNow, valueMin, valueMax, ...handlers }: GripProps) {
  return (
    <div
      className="a-grip"
      role="separator"
      aria-orientation="vertical"
      aria-label={label}
      aria-valuenow={valueNow}
      aria-valuemin={valueMin}
      aria-valuemax={valueMax}
      tabIndex={0}
      title={`${label} — drag to resize, double-click to reset`}
      {...handlers}
    >
      <span className="a-grip__bar" aria-hidden="true" />
    </div>
  )
}
