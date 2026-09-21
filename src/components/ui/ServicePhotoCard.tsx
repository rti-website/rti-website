import Image from 'next/image'
import Link from 'next/link'
import type { ServiceCard } from '@/data/services'

/**
 * One homepage service card — Figma component 6542:12459 and its instances
 * (6563:2102 … 6563:2130 for the other two tabs).
 *
 * 261 x 374 · bg #f6f6f6 · r16
 *   title  IBM Plex Sans SemiBold 18 / 1.22, #132119, at (20, 20), wraps in
 *          the 221px column, hard-broken after l1 as every card in the frame is
 *   photo  221 x 270 at (20, 84), r14, object-cover
 *
 * The frame also carries a blurb and a "Learn More" row, but both sit outside
 * the card's clip (blurb at x267, link at y408 in a 374-tall card), so neither
 * is visible in the design. They are not drawn here either: the whole card is
 * the link.
 *
 * A card with no photo (Phone Shredding, until Aqeel supplies one) draws its
 * line icon on a soft-teal plate in the photo's place, so /services/ can show
 * every live service without a hole in the grid. The homepage tabs only take
 * cards that have a photo — see SERVICE_CARDS in src/data/home.ts.
 */
export function ServicePhotoCard({ card, scale = 1 }: {
  card: ServiceCard
  /**
   * Uniform scale of the whole card. /services/ (Figma 6142:1559 in file
   * drzg9BI08Dy8eWZNBfXBzD) draws the same component at 239.4 x 343.05, which
   * is 261 x 374 at 0.9172 — every inner measure included — so it is one CSS
   * zoom rather than a second set of numbers. The design canvas already
   * relies on zoom, so nothing new is being asked of the browser.
   */
  scale?: number
}) {
  const cls = 'relative block h-[374px] w-[261px] shrink-0 overflow-hidden rounded-[16px] bg-card transition-shadow hover:shadow-md'
  const style = scale === 1 ? undefined : { zoom: scale }
  const inner = (
    <>
      <span className="absolute left-[20px] right-[20px] top-[20px] font-sans text-[18px] font-semibold leading-[1.22] text-heading">
        {card.l1}<br />{card.l2}
      </span>
      {card.photo ? (
        <Image
          src={card.photo}
          alt=""
          width={442}
          height={540}
          className="absolute left-[20px] top-[84px] h-[270px] w-[221px] rounded-[14px] object-cover"
        />
      ) : (
        <span className="absolute left-[20px] top-[84px] grid h-[270px] w-[221px] place-items-center rounded-[14px] bg-brand-soft">
          {card.icon && (
            <Image src={card.icon} alt="" width={card.iw * 2} height={card.ih * 2} style={{ width: card.iw * 2, height: card.ih * 2 }} className="object-contain" />
          )}
        </span>
      )}
    </>
  )
  return card.external
    ? <a href={card.href} target="_blank" rel="noopener noreferrer" className={cls} style={style}>{inner}</a>
    : <Link href={card.href} className={cls} style={style}>{inner}</Link>
}
