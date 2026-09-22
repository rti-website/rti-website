import Image from 'next/image'
import Link from 'next/link'

/**
 * One industry card — Figma component 6040:18309 and its variants (desktop),
 * 6605:5139 and its seven siblings in file BVtf2AOuUOcYbiMIlcKmbC (mobile).
 *
 * DESKTOP — 310x226 · r20 · #2e3033 under the photo · gradient from transparent
 * at 31.25% to rgba(10,15,12,0.88) at 77.885% · title IBM Plex Sans Bold 20/1.35
 * · blurb Roboto 14/18 · both 25px from the left, text block starting at y102.
 *
 * Figma pins the title and the blurb to separate absolute offsets (y102 and
 * y138), which works only while every title is one line — true on the homepage,
 * not on /industries/, where "Financial Services & Banking" and "Education
 * (K-12 & Higher Ed)" wrap and the second line lands on top of the blurb. So
 * the two are one top-anchored flex column with a 9px gap, which reproduces the
 * design's offsets exactly for a one-line title and lets a two-line title push
 * the blurb down instead of through it. Titles stay aligned across a row,
 * which is what pinning them to y102 was for.
 *
 * MOBILE — the card is half a 390 screen: two per row, so 169 wide at that
 * width, 140 tall, r12. Three things change with it.
 *
 *   1. THE BLURB IS NOT DRAWN. A 140px card with a 15px title 10px off its
 *      bottom edge has no room for four lines of Roboto, and the frame does not
 *      try: every one of the eight mobile cards is a photo and a title. It is
 *      hidden rather than dropped, so the copy stays in the one DOM this site
 *      has and /industries/ keeps it at lg. (Mobile-first indexing still reads
 *      CSS-hidden body text; what it must not see is a second copy of it.)
 *
 *   2. THE TEXT BLOCK IS ANCHORED TO THE BOTTOM, not to a y offset. The frame
 *      pins the title to y119 in a 140 card, which is 10px of bottom padding —
 *      fine for "Retail", wrong for "Distribution & Logistics", which wraps to
 *      two lines in a 169px column and would then hang out of the card. Bottom
 *      anchoring grows it upward instead. Same argument as the flex column
 *      above, one axis over. At lg it goes back to top:102.
 *
 *   3. THE GRADIENT IS A DIFFERENT RAMP — 0% at 25% to 0.85 at 100%, against
 *      the desktop's 31.25%/77.885%/0.88. Two layers rather than one, each
 *      hidden at the other's breakpoint, because a background-image cannot be
 *      switched from an inline style attribute. They are decoration, not copy,
 *      so this is not the duplicate DOM the pattern forbids.
 *
 * Sizing lives on `w-full` rather than on a flex property so the card answers
 * whatever its parent is: a `1fr` grid track on the homepage, a flex row on
 * /industries/. `lg:w-[310px] lg:flex-none` is the desktop's old
 * `w-[310px] shrink-0` exactly.
 *
 * Used by the homepage's Industries section and by /industries/.
 */
export type Industry = {
  t: string
  img: string
  b: string
  /** Set once the per-industry page exists. Unlinked until then. */
  href?: string
}

export function IndustryCard({ ind }: { ind: Industry }) {
  const card = (
    <article className="relative h-[140px] w-full overflow-hidden rounded-[12px] bg-white lg:h-[226px] lg:w-[310px] lg:flex-none lg:rounded-[20px] lg:bg-slate">
      <Image src={ind.img} alt="" fill sizes="(min-width: 1024px) 310px, 50vw" className="object-cover" />
      <div
        className="absolute inset-0 lg:hidden"
        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(10,15,12,0) 25%, rgba(10,15,12,0.85) 100%)' }}
      />
      <div
        className="absolute inset-0 max-lg:hidden"
        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(10,15,12,0) 31.25%, rgba(10,15,12,0.88) 77.885%)' }}
      />
      <div className="absolute bottom-[10px] left-[12px] right-[12px] flex flex-col gap-[9px] lg:bottom-auto lg:left-[25px] lg:right-auto lg:top-[102px] lg:w-[275px]">
        <h3 className="font-sans text-[15px] font-bold leading-[22px] text-white lg:text-[20px] lg:leading-[1.35]">{ind.t}</h3>
        <p className="hidden font-roboto text-[14px] leading-[18px] text-white/80 lg:block">{ind.b}</p>
      </div>
    </article>
  )
  // Linked once the industry has a page; the homepage's categories do not all
  // map to one, so those stay plain. The link carries a definite width below lg
  // so the article's `w-full` has something to resolve against; at lg it is
  // `auto` again, which is what it has always been.
  return ind.href
    ? <Link href={ind.href} className="block w-full rounded-[20px] transition-shadow hover:shadow-lg lg:w-auto">{card}</Link>
    : card
}
