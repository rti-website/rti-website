import Image from 'next/image'
import Link from 'next/link'
import type { ServiceCard } from '@/data/services'
import { SERVICE_MARKS } from '@/components/ui/ServiceMarks'

/**
 * One service card — Figma component 6032:17570 and its variants.
 *
 * bg #f6f6f6 · r16.676 · px30 py27.669 · column, gap 14.757, centred
 *   icon well  52.114 square, r10, rgba(5,131,139,0.2)
 *   title      IBM Plex Sans Medium 16 / 1.25, #212529, hard-broken in two
 *   blurb      Roboto 14 / 21.6, #7e7e7e, fixed 188.15 wide
 *
 * The blurb's fixed width is what makes some cards taller than others (three
 * lines instead of two). That is in the design — do not normalise it, and do
 * not pin a row to a fixed height because of it.
 */
export function ServiceTile({ card, className = '', style }: {
  card: ServiceCard
  className?: string
  style?: React.CSSProperties
}) {
  const cls = `flex flex-col items-center gap-[14.757px] rounded-[16.676px] bg-card px-[30px] py-[27.669px] transition-shadow hover:shadow-md ${className}`
  const inner = (
    <>
      {/* A service with no Figma artwork carries a drawn mark instead of a PNG
          — see src/components/ui/ServiceMarks.ts. No card uses that path today
          (the only such service is menu-only, so it never reaches a tile), but
          the well draws either rather than nothing if that flag ever comes off. */}
      <span className="grid size-[52.114px] shrink-0 place-items-center rounded-[10px] bg-[rgba(5,131,139,0.2)]">
        {card.icon
          ? (
            <Image
              src={card.icon}
              alt=""
              width={card.iw}
              height={card.ih}
              style={{ width: card.iw, height: card.ih }}
              className="object-contain"
            />
          )
          : card.mark && (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
              className="size-[30px] stroke-brand" aria-hidden="true">
              <path d={SERVICE_MARKS[card.mark]} />
            </svg>
          )}
      </span>
      <span className="text-center font-sans text-[16px] font-medium leading-[1.25] text-ink">
        {card.l1}<br />{card.l2}
      </span>
      <span className="w-[188.15px] text-center font-roboto text-[14px] leading-[21.6px] text-muted">
        {card.blurb}
      </span>
    </>
  )
  return card.external
    ? <a href={card.href} target="_blank" rel="noopener noreferrer" className={cls} style={style}>{inner}</a>
    : <Link href={card.href} className={cls} style={style}>{inner}</Link>
}
