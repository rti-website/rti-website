import Image from 'next/image'
import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { CERTS, INTRO, type CertLogo } from '@/data/certifications-page'

/**
 * Certifications grid — Figma 6380:1097. py 100, gap 50: heading block on an
 * 820px column, then the card grid.
 *
 * ===========================================================================
 * REDRAWN 23 Sep 2026 — ten logo cards, 6774:2592
 * ===========================================================================
 * The four glyph cards became ten cards that each carry the standard's own
 * logo, three to a row on a 1278 grid (x321): 410 wide, p30, gap 16, a 48-tall
 * row with the logo in a 120x48 slot on the left and the status pill on the
 * right, then the name at 19 and the body at 14.5/1.6. The last row holds
 * GLBA alone, on the left, as drawn.
 *
 * The title under each logo is the FULL name — Asim: "we have to add the full
 * name". Several of those run to two lines at 19px, so the rows are
 * `items-stretch`: every card in a row takes the tallest one's height, and
 * the section height is measured, not the frame's 1392.
 *
 * No hover gradient: the old glyph cards had `grad-card`, which turns the card
 * navy on hover. Half of these logos are black wordmarks (RCRA, FCRA, NIST,
 * GLBA) and would vanish on navy.
 *
 * MOBILE — 6766:2854. The same card at 350 wide, which the designer drew as
 * the desktop card scaled by 0.854: p26, gap 14, r10, a 41-tall top row with
 * every logo at 0.854 of its desktop size, a 22-tall pill at 9px, the name at
 * 16 and the body at 14/1.6. Stacked 20 apart.
 *
 * Logos render `unoptimized`, for the reason given in LogoMarquee: they are a
 * few KB each, and the optimizer caches by URL, so a re-exported logo would
 * keep showing the old one until .next is cleared.
 */
export function CertGrid({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6380:1097"
      className="flex flex-col items-center gap-[24px] bg-white px-[20px] py-[40px] lg:gap-[50px] lg:px-0 lg:py-[100px]">
      <div className="flex w-full flex-col items-center gap-[10px] text-center lg:w-[820px]">
        <Eyebrow>{INTRO.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[26px] font-semibold leading-normal text-black lg:text-[40px] lg:leading-[1.3]">{INTRO.heading}</h2>
        <p className="font-roboto text-[15px] leading-normal text-muted lg:text-[17px] lg:leading-[1.175]">{INTRO.lead}</p>
      </div>

      <ul className="grid w-full grid-cols-1 items-stretch gap-[20px] lg:w-[1278px] lg:grid-cols-3 lg:gap-[24px]">
        {CERTS.map((c) => (
          <li key={c.name} className="flex w-full flex-col items-start gap-[14px] rounded-[10px] border border-line bg-white p-[26px] lg:gap-[16px] lg:rounded-[12px] lg:p-[30px]">
            <div className="flex h-[41px] w-full items-center justify-between lg:h-[48px]">
              <span className="flex h-full w-[102px] items-center lg:w-[120px]">
                <Logo logo={c.logo} alt={c.name} />
              </span>
              <span className="flex h-[22px] items-center whitespace-nowrap rounded-full bg-accent-soft px-[10px] font-roboto text-[9px] font-bold uppercase leading-normal tracking-[0.34px] text-accent lg:h-[26px] lg:px-[12px] lg:text-[10.5px] lg:tracking-[0.4px]">
                {c.badge}
              </span>
            </div>
            <h3 className="w-full font-sans text-[16px] font-medium leading-[1.3] text-heading lg:text-[19px]">{c.title}</h3>
            <p className="w-full font-roboto text-[14px] leading-[1.6] text-muted lg:text-[14.5px]">{c.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

/**
 * One logo in its drawn box — desktop size at lg, 0.854 of it below. A `crop`
 * places the picture inside the box the way Figma crops an image fill; every
 * other logo simply fills, contains or covers its box.
 */
function Logo({ logo: l, alt }: { logo: CertLogo; alt: string }) {
  const box = { '--lw': `${l.w}px`, '--lh': `${l.h}px` } as React.CSSProperties
  const fit = l.fit === 'contain' ? 'object-contain' : l.fit === 'cover' ? 'object-cover' : 'object-fill'
  return (
    <span className="relative block h-[calc(var(--lh)*0.854)] w-[calc(var(--lw)*0.854)] shrink-0 overflow-hidden lg:h-[var(--lh)] lg:w-[var(--lw)]" style={box}>
      {l.crop ? (
        <span className="absolute block" style={{ left: `${l.crop.left}%`, top: `${l.crop.top}%`, width: `${l.crop.w}%`, height: `${l.crop.h}%` }}>
          <Image src={l.src} alt={alt} fill unoptimized sizes="120px" className="object-fill" />
        </span>
      ) : (
        <Image src={l.src} alt={alt} fill unoptimized sizes="120px" className={fit} />
      )}
    </span>
  )
}
