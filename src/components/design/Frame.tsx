import { CHROME_SHIFT, HEADER_H } from '@/lib/layout'

/**
 * Primitives for building a page at the Figma canvas's exact geometry.
 *
 * Every value passed to these is read straight off the Figma node, so a diff
 * against the design is a diff against these numbers.
 *
 * ===========================================================================
 * !! THE GEOMETRY ONLY APPLIES AT lg (1024px) AND UP — 22 Sep 2026
 * ===========================================================================
 * These used to write `position: absolute` and the Figma left/top/width/height
 * straight into the style attribute, which is what made the desktop build
 * exact and what made it impossible to reflow. Aqeel delivered mobile frames
 * (file BVtf2AOuUOcYbiMIlcKmbC, "Home - Mobile" 6588:2308) and Asim asked for
 * the site to answer them.
 *
 * The numbers now go out as CUSTOM PROPERTIES and a class name, and
 * globals.css applies them inside `@media (width >= 64rem)` only. So:
 *
 *   at 1024 and up   identical to before — same absolute boxes, same canvas,
 *                    same zoom. The rendered desktop page is unchanged.
 *   below 1024       every Section and Box is an ordinary block in normal
 *                    flow, stacked in source order, and each section styles
 *                    itself with plain mobile-first Tailwind that it turns off
 *                    again with `lg:` prefixes.
 *
 * ONE DOM, NOT TWO. The alternative — a <MobileHome/> beside the desktop tree
 * with one of them hidden — would duplicate the body copy and every internal
 * link on a site whose whole purpose is to carry ~600 ranking URLs across a
 * replatform intact. Two copies of every link is not a thing to do to that.
 *
 * WHY EVERY CUSTOM PROPERTY IS ALWAYS WRITTEN, even when the value is `auto`:
 * custom properties inherit. A Box nested in a Box that left `--bw` unset would
 * pick up its parent's width — the header's announcement bar is 1920 wide and
 * holds three boxes that set no width of their own, so leaving them unset would
 * have made all three 1920. Writing `auto` explicitly stops the inheritance.
 */

const len = (v: number | string | undefined): string =>
  v === undefined ? 'auto' : typeof v === 'number' ? `${v}px` : v

/**
 * The 1920-wide page canvas. See .design-canvas in globals.css.
 *
 * `height` is the DESIGN height, measured with Figma's 140px header. The header
 * is built shorter than that, so the rendered canvas is CHROME_SHIFT shorter
 * too and <main> is pulled up by the same amount — doing it here means no page
 * has to know, and no page is left with a band of white under its footer.
 *
 * Below lg none of that applies: the canvas is as tall as its content and the
 * header is an ordinary block above it, so the height goes out as `--canvas-h`
 * rather than as a height, and the media query decides whether to use it.
 */
export function Canvas({
  height, grow, children,
}: {
  height: number
  /**
   * Name of a CSS custom property, set somewhere inside the canvas at runtime,
   * that is ADDED to the height — e.g. `--home-svc-delta`, which the homepage's
   * service tabs set to a negative length when the open tab needs fewer rows
   * (see ServiceTabs). Unset, the variable reads as 0px. The change is eased
   * so the page does not jump.
   */
  grow?: string
  children: React.ReactNode
}) {
  const h = height - CHROME_SHIFT
  return (
    <div className="design-shell">
      <div
        className="design-canvas"
        style={{
          '--canvas-h': grow ? `calc(${h}px + var(${grow}, 0px))` : `${h}px`,
          '--chrome-shift': `${CHROME_SHIFT}px`,
          transition: grow ? 'height 300ms ease-out' : undefined,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  )
}

/** A section at its exact offset in the canvas — absolutely, at lg and up. */
export function Section({
  top, left = 0, width = 1920, height, className = '', style, children, label,
  overflow = 'hidden',
}: {
  top: number
  left?: number
  width?: number
  /** A number in design px, or a CSS length expression for the one section whose height moves at runtime. */
  height: number | string
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
   *
   * Below lg NOTHING clips, whatever this says: a section that is as tall as
   * its content has nothing to crop, and a leftover `overflow: hidden` would
   * cut off the first line of anything that grew.
   */
  overflow?: 'hidden' | 'visible'
}) {
  return (
    <section
      data-figma={label}
      className={`design-section ${overflow === 'visible' ? 'design-section--visible' : ''} ${className}`}
      style={{
        '--sx': len(left),
        '--sy': len(top),
        '--sw': len(width),
        '--sh': len(height),
        ...style,
      } as React.CSSProperties}
    >
      {children}
    </section>
  )
}

/** A box inside a section — absolutely positioned at lg and up. */
export function Box({
  x, y, w, h, fill = false, className = '', style, children,
}: {
  x: number
  y: number
  w?: number
  h?: number
  /**
   * This box is a LAYER, not content: a full-bleed photo, a tint, a gradient
   * wash. Those keep covering their section below lg instead of joining the
   * flow, where a wrapper around an `<Image fill>` would collapse to nothing
   * and the picture would vanish.
   */
  fill?: boolean
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}) {
  return (
    <div
      className={`design-box ${fill ? 'design-box--fill' : ''} ${className}`}
      style={{
        '--bx': len(x),
        '--by': len(y),
        '--bw': len(w),
        '--bh': len(h),
        ...style,
      } as React.CSSProperties}
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
      className={`design-center ${className}`}
      style={{
        '--cx': `${offset}px`,
        '--cy': len(y),
        '--cw': len(w),
        '--ch': len(h),
      } as React.CSSProperties}
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
