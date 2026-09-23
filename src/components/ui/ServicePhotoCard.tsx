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
 * The frame also carries a blurb and a "Learn More" row, parked outside the
 * card's clip (blurb at x267, link at y408 in a 374-tall card), so neither is
 * visible at rest. They are the HOVER state — see `reveal` below.
 *
 * HOVER — Figma 6651:2415, Asim 23 Sep 2026 ("show this on hover for our
 * services section"). The photo slides out to the left (x20 -> x-248) as it
 * blurs (37px) and fades; the blurb slides in from the right to (19, 84),
 * Roboto 14.5/1.55 #7e7e7e in the same 221 column; the "Learn More ->" row
 * rises from y408 to y329, IBM Plex Mono Medium 14 in brand teal. Figma
 * smart-animates between the two variants; here it is a CSS transition on
 * transform, opacity and filter, so nothing reflows while it runs. Keyboard
 * focus shows the same state as the pointer. Desktop only: a phone has no
 * hover, and the phone card is a different layout.
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
export function ServicePhotoCard({ card, scale = 1, reveal = false }: {
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
  /** Draw the hover reveal. The homepage cards only. */
  reveal?: boolean
}) {
  const cls = 'group relative block w-full overflow-hidden rounded-[16px] bg-card transition-shadow hover:shadow-md lg:h-[374px] lg:w-[261px] lg:shrink-0'
  const zoom = scale === 1 ? '' : ' lg:[zoom:var(--svc-card-zoom)]'
  const style = scale === 1 ? undefined : ({ '--svc-card-zoom': String(scale) } as React.CSSProperties)
  // Out left, blurred, faded — lg and hover-capable pointers only (Tailwind
  // v4 wraps `hover:` in `@media (hover: hover)`).
  const slide = reveal
    ? ' lg:transition-[translate,opacity,filter] lg:duration-500 lg:ease-out lg:group-hover:-translate-x-[268px] lg:group-hover:opacity-0 lg:group-hover:blur-[37px] lg:group-focus-visible:-translate-x-[268px] lg:group-focus-visible:opacity-0 lg:group-focus-visible:blur-[37px] motion-reduce:lg:transition-none'
    : ''
  const inner = (
    <>
      {card.photo ? (
        <Image
          src={card.photo}
          alt=""
          width={442}
          height={540}
          className={'h-[180px] w-full object-cover lg:absolute lg:left-[20px] lg:top-[84px] lg:h-[270px] lg:w-[221px] lg:rounded-[14px]' + slide}
        />
      ) : (
        <span className={'grid h-[180px] w-full place-items-center bg-brand-soft lg:absolute lg:left-[20px] lg:top-[84px] lg:h-[270px] lg:w-[221px] lg:rounded-[14px]' + slide}>
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
      {reveal && (
        <>
          {/* In from the right: parked 248px over (the frame's x267), which
              the card's own clip hides. */}
          <span className="absolute left-[19px] top-[84px] hidden w-[221px] translate-x-[248px] font-roboto text-[14.5px] leading-[1.55] text-[#7e7e7e] transition-transform duration-500 ease-out group-hover:translate-x-0 group-focus-visible:translate-x-0 motion-reduce:transition-none lg:block">
            {card.homeBlurb ?? card.blurb}
          </span>
          {/* Up from below: parked at the frame's y408, 79px under y329. */}
          <span aria-hidden="true" className="absolute inset-x-[20px] top-[329px] hidden h-[16px] translate-y-[79px] items-center justify-between transition-transform duration-500 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none lg:flex">
            <span className="font-mono text-[14px] font-medium leading-[15.95px] text-brand">Learn More</span>
            <Image src="/images/icons/arrow-teal.svg" alt="" width={20} height={16} className="h-[15.66px] w-[20px]" />
          </span>
        </>
      )}
    </>
  )
  return card.external
    ? <a href={card.href} target="_blank" rel="noopener noreferrer" className={cls + zoom} style={style}>{inner}</a>
    : <Link href={card.href} className={cls + zoom} style={style}>{inner}</Link>
}
