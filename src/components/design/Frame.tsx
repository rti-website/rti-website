import { CHROME_SHIFT, HEADER_H } from '@/lib/layout'

/**
 * Primitives for building a page at the Figma canvas's exact geometry.
 *
 * Every value passed to these is read straight off the Figma node, so a diff
 * against the design is a diff against these numbers.
 */

/**
 * The 1920-wide page canvas. See .design-canvas in globals.css.
 *
 * `height` is the DESIGN height, measured with Figma's 140px header. The header
 * is built shorter than that, so the rendered canvas is CHROME_SHIFT shorter
 * too and <main> is pulled up by the same amount — doing it here means no page
 * has to know, and no page is left with a band of white under its footer.
 */
export function Canvas({
  height, children,
}: {
  height: number
  children: React.ReactNode
}) {
  return (
    <div className="design-shell">
      <div
        className="design-canvas"
        style={{ height: height - CHROME_SHIFT, '--chrome-shift': `${CHROME_SHIFT}px` } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  )
}

/** An absolutely positioned section at its exact offset in the canvas. */
export function Section({
  top, left = 0, width = 1920, height, className = '', style, children, label,
  overflow = 'hidden',
}: {
  top: number
  left?: number
  width?: number
  height: number
  className?: string
  /** For a background a Tailwind class cannot express — the About Us closing
   *  CTA (6372:846) is a gradient at 159.649deg with explicit colour stops. */
  style?: React.CSSProperties
  children: React.ReactNode
  /** Figma node id, kept in the DOM so a design diff can be traced back. */
  label?: string
  /**
   * Sections clip by default, because most of them crop oversized art on
   * purpose (the hero photo, the CTA plate). The header opts out so its
   * Services dropdown can hang below the 140px bar instead of being cut off.
   */
  overflow?: 'hidden' | 'visible'
}) {
  return (
    <section
      data-figma={label}
      className={`absolute ${overflow === 'visible' ? 'overflow-visible' : 'overflow-hidden'} ${className}`}
      style={{ top, left, width, height, ...style }}
    >
      {children}
    </section>
  )
}

/** Absolutely positioned box inside a section. */
export function Box({
  x, y, w, h, className = '', style, children,
}: {
  x: number
  y: number
  w?: number
  h?: number
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{ left: x, top: y, width: w, height: h, ...style }}
    >
      {children}
    </div>
  )
}

/** Horizontally centred box — the design uses this constantly for headings. */
export function CenterBox({
  y, w, h, offset = 0, className = '', children,
}: {
  y: number
  w: number
  h?: number
  /** Figma's `left: calc(50% + Npx)` offset. */
  offset?: number
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{ left: `calc(50% + ${offset}px)`, top: y, width: w, height: h, transform: 'translateX(-50%)' }}
    >
      {children}
    </div>
  )
}

/**
 * The canvas for a page whose height is not known at design time.
 *
 * `Canvas` takes an explicit height because every other page pins its sections
 * to absolute Figma coordinates. A blog post cannot: the body is as long as the
 * writer made it. This keeps the 1920 canvas and its zoom — so an article sits
 * at the same scale and gutter as the rest of the site — but lets its children
 * lay out in normal flow. See `.design-canvas--flow` in globals.css.
 */
export function FlowCanvas({ children }: { children: React.ReactNode }) {
  return (
    <div className="design-shell">
      <div
        className="design-canvas design-canvas--flow"
        style={{ '--header-h': `${HEADER_H}px` } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  )
}
