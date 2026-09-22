import Image from 'next/image'

export type Logo = { src: string; w: number; h: number; o: string }

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
 * SPACING ON DESKTOP IS A FIXED ITEM WIDTH, NOT PADDING. The homepage frame
 * (6044:19764) does not space the marks by a constant edge gap — it lays eight
 * 113.16px cells on a 163.771px pitch and centres each mark in its cell, so the
 * visible gap between two marks varies from 74px to 108px depending on how wide
 * they are. Giving every item the pitch as its width and centring the mark
 * inside reproduces that exactly, and because every item is then the same
 * width the seam between the two copies is spaced like every other join for
 * free. A uniform `px-[45px]` was the old approximation of the same grid.
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
                className={`flex shrink-0 items-center justify-center px-[18px] lg:w-[var(--cert-pitch)] lg:px-0 ${l.o}`}
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
                <Image
                  src={l.src}
                  alt={copy === 1 ? '' : 'Certification'}
                  unoptimized
                  width={Math.round(l.w)}
                  height={Math.round(l.h)}
                  style={{ '--lw': `${l.w}px`, '--lh': `${l.h}px` } as React.CSSProperties}
                  className="h-[calc(var(--lh)*0.75)] w-[calc(var(--lw)*0.75)] max-w-none object-contain lg:h-[var(--lh)] lg:w-[var(--lw)]"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
