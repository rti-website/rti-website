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
 * BELOW lg the mobile frame (6605:2369 and its four siblings in file
 * BVtf2AOuUOcYbiMIlcKmbC) turns the card inside out: full width, the photo
 * FIRST as a 180px full-bleed band with no radius of its own — the card's own
 * r16 clip rounds its top corners — and the title under it, centred, in a
 * 20/16 pad. So the photo is drawn before the title in the DOM and the two are
 * ordinary blocks; at lg they go back to being absolutely placed, where DOM
 * order does not reach them and nothing moves.
 *
 * The two title lines are ONE line on a phone. The frame joins them, so the
 * `<br>` is display:none below lg and the space beside it carries the join.
 * A space that lands at the end of a line is removed by normal white-space
 * processing, so the desktop break is byte-identical to the old `l1<br>l2`.
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
   *
   * It rides a custom property applied only at lg, not an inline `zoom`, so
   * the phone layout — where the card is full width and there is no 261px
   * board to scale down from — is left at 1:1 instead of being shrunk to
   * 91.7% of its column and leaving a gutter.
   */
  scale?: number
}) {
  const cls = 'relative block w-full overflow-hidden rounded-[16px] bg-card transition-shadow hover:shadow-md lg:h-[374px] lg:w-[261px] lg:shrink-0'
  const zoom = scale === 1 ? '' : ' lg:[zoom:var(--svc-card-zoom)]'
  const style = scale === 1 ? undefined : ({ '--svc-card-zoom': String(scale) } as React.CSSProperties)
  const inner = (
    <>
      {card.photo ? (
        <Image
          src={card.photo}
          alt=""
          width={442}
          height={540}
          className="h-[180px] w-full object-cover lg:absolute lg:left-[20px] lg:top-[84px] lg:h-[270px] lg:w-[221px] lg:rounded-[14px]"
        />
      ) : (
        <span className="grid h-[180px] w-full place-items-center bg-brand-soft lg:absolute lg:left-[20px] lg:top-[84px] lg:h-[270px] lg:w-[221px] lg:rounded-[14px]">
          {card.icon && (
            <Image src={card.icon} alt="" width={card.iw * 2} height={card.ih * 2} style={{ width: card.iw * 2, height: card.ih * 2 }} className="object-contain" />
          )}
        </span>
      )}
      <span className="block px-[20px] py-[16px] text-center font-sans text-[18px] font-semibold leading-[1.22] text-heading lg:absolute lg:inset-x-[20px] lg:top-[20px] lg:px-0 lg:py-0 lg:text-left">
        {card.l1}{' '}
        <br className="hidden lg:inline" />
        {card.l2}
      </span>
    </>
  )
  return card.external
    ? <a href={card.href} target="_blank" rel="noopener noreferrer" className={cls + zoom} style={style}>{inner}</a>
    : <Link href={card.href} className={cls + zoom} style={style}>{inner}</Link>
}
