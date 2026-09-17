import Image from 'next/image'

export type Logo = { src: string; w: number; h: number; o: string }

/**
 * Continuously scrolling logo strip.
 *
 * The list is rendered twice and the track translated by exactly -50%, so the
 * second copy lands where the first started and the loop is seamless. CSS only
 * — no JS, no layout thrash. Pauses on hover and honours prefers-reduced-motion
 * (where it falls back to a normal horizontal scroll the user can drag).
 */
export function LogoMarquee({ logos, speed = 40 }: { logos: Logo[]; speed?: number }) {
  return (
    <div className="logo-marquee w-full overflow-hidden" aria-label="Certifications and partners">
      <div className="logo-marquee__track flex w-max items-center" style={{ animationDuration: `${speed}s` }}>
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {logos.map((l, i) => (
              <li key={`${copy}-${i}`} className={`flex shrink-0 items-center justify-center px-[45px] ${l.o}`}>
                <Image
                  src={l.src}
                  alt={copy === 1 ? '' : 'Certification'}
                  width={l.w}
                  height={l.h}
                  style={{ width: l.w, height: l.h }}
                  className="object-contain"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
