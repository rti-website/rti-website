import Image from 'next/image'

export type Logo = {
  src: string
  w: number
  h: number
  o: string
  /** What the mark says, for alt text. Falls back to "Certification". */
  name?: string
  /**
   * Where the mark links, if anywhere. Only R2v3 has one today — Asim, 22 Sep
   * 2026, pointing it at Recycle Technologies' own entry in the R2 certified
   * facility directory, which is the only mark on this strip that can prove
   * itself. Opens in a new tab: it is a third-party registry, not this site.
   */
  href?: string
}

/**
 * Continuously scrolling logo strip.
 *
 * The list is rendered twice and the track translated by exactly -50%, so the
 * second copy lands where the first started and the loop is seamless. CSS only
 * — no JS, no layout thrash. Pauses on hover and honours prefers-reduced-motion
 * (where it falls back to a normal horizontal scroll the user can drag).
 *
 * SPACING IS PADDING, NOT GAP, and that is load-bearing: the seam between the
 * two copies has to be spaced exactly like every other join, or the loop visibly
 * stutters once per cycle. Half the spacing on each side of every item gives
 * that for free — `gap` on the two <ul>s would not, because the join between
 * them is a track-level gap, not a list-level one.
 *
 * SPACING ON DESKTOP IS AN EQUAL GAP, NOT THE FRAME'S GRID — Asim, 22 Sep
 * 2026: "make the space equal between all cards". The homepage frame
 * (6044:19764) lays the marks on a 163.771px pitch and centres each in its
 * cell, and for a day this strip did the same; but a cell grid makes the
 * VISIBLE gap depend on how wide the neighbours are — 74px between two wide
 * wordmarks, 108px either side of the small R2v3 badge — and once NIST and
 * HIPAA joined the row the unevenness was plain. So each item now carries
 * 45px of padding a side: a constant 90px of white between any two marks,
 * whatever their widths. Padding rather than `gap` for the reason above —
 * the seam between the two copies is then spaced like every other join.
 * `--cert-pitch` still exists for a caller that wants the grid back.
 *
 * The phone frame (6605:2332) is a different grid — 36px between cells — and
 * is still seven EMPTY placeholder boxes, so below lg the marks keep the flat
 * px-[18px] spacing and render at 75%. Both desktop consumers (the homepage
 * Certifications section and the /services/ CertificationsBand) draw the same
 * eight marks at the same sizes, so the breakpoint lives here rather than
 * being passed in.
 *
 * THE `max-lg:py-[16px]` IS ASIM'S, 22 Sep 2026 — "give some space from above
 * the logos so it look good on mobile". At 75% the marks are only 35px tall, so
 * the frame's flat 16px gap left them crowded right under the paragraph. The
 * padding lives here rather than in either consumer because both had the same
 * problem in different shapes: the homepage strip had no height at all below lg
 * (16px above, 16px below), and the /services/ band gave its box a flat 60px
 * that the marks sat at the TOP of, so all 25px of slack fell below them. Now
 * both get 32px either side. The phone frame is placeholder-only — seven empty
 * boxes — so there is no drawn number to take this from.
 */
export function LogoMarquee({
  logos,
  speed = 40,
  /** Cell pitch from the frame, in px. See CERT_PITCH in src/data/certifications.ts. */
  pitch = 163.771,
}: {
  logos: Logo[]
  speed?: number
  pitch?: number
}) {
  return (
    <div
      className="logo-marquee w-full overflow-hidden max-lg:py-[16px]"
      style={{ '--cert-pitch': `${pitch}px` } as React.CSSProperties}
      aria-label="Certifications and partners"
    >
      <div className="logo-marquee__track flex w-max items-center" style={{ animationDuration: `${speed}s` }}>
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {logos.map((l, i) => (
              <li
                key={`${copy}-${i}`}
                className={`flex shrink-0 items-center justify-center px-[18px] lg:px-[45px] ${l.o}`}
              >
                {/* The size was an inline `style`, which applies at every
                    width. It is a pair of custom properties now, and below lg
                    every mark renders at 75% — the frame's mobile strip is a
                    68px band (6605:2332) against the board's 91. 22 Sep 2026. */}
                {/* `unoptimized` on purpose. These are 3-7KB brand marks and
                    the optimizer saves nothing on them — but it caches by URL,
                    so every time the artwork behind a path is replaced it keeps
                    serving the old bytes until .next is cleared. That bit twice
                    on 22 Sep 2026: first as blank 1x1s left over from the
                    placeholder era, then as one logo stuck at the previous
                    export's aspect ratio. Serving the file as-is means a logo
                    swap is just a file swap, here and on the dev server. */}
                <Mark logo={l} duplicate={copy === 1} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

/**
 * One mark, linked or not.
 *
 * BOTH COPIES ARE LINKS; ONLY THE FIRST IS IN THE TAB ORDER. The track renders
 * the list twice to loop seamlessly, and the second copy is on screen exactly
 * as often as the first — so on 22 Sep 2026 the duplicate R2v3 was the one
 * Asim clicked, and it did nothing: "the r2v3 logo clickable, it is not". The
 * first cut of this made the duplicate a bare image, reasoning that a
 * focusable anchor inside an aria-hidden subtree is a keyboard trap. It is,
 * so the duplicate's anchor takes `tabIndex={-1}`: a mouse can click it, the
 * Tab key skips it, and the aria-hidden <ul> above keeps it out of the
 * screen-reader tree. That is the standard marquee recipe; the bare image
 * was a mouse trap instead.
 */
function Mark({ logo: l, duplicate }: { logo: Logo; duplicate: boolean }) {
  const img = (
    <Image
      src={l.src}
      alt={duplicate ? '' : (l.name ?? 'Certification')}
      unoptimized
      width={Math.round(l.w)}
      height={Math.round(l.h)}
      style={{ '--lw': `${l.w}px`, '--lh': `${l.h}px` } as React.CSSProperties}
      className="h-[calc(var(--lh)*0.75)] w-[calc(var(--lw)*0.75)] max-w-none object-contain lg:h-[var(--lh)] lg:w-[var(--lw)]"
    />
  )
  if (!l.href) return img
  return (
    <a
      href={l.href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={duplicate ? -1 : undefined}
      aria-label={duplicate ? undefined : `${l.name ?? 'Certification'} — verify this certification (opens in a new tab)`}
      className="inline-flex items-center rounded-[4px] transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
    >
      {img}
    </a>
  )
}
