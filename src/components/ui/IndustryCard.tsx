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
 *
 * ===========================================================================
 * HOVER REVEAL — homepage only (`reveal`), Asim 23 Sep 2026
 * ===========================================================================
 * Figma component set 6801:10924 ("Industries Card 1", at rest) and
 * 6801:10932 ("Variant2", hovered), smart-animated between the two.
 *
 *   at rest   the photo and its dark ramp (to 0.7), the title alone at the
 *             bottom — IBM Plex Sans Bold 24, box top 163 — the blurb parked
 *             off the right edge (x325) and "Learn More ->" under the card
 *             (y226), both clipped.
 *   hovered   the photo slides out left (x-8 -> x-348) and fades, the ramp
 *             drops out the bottom (+250) and fades, leaving the card's own
 *             black-to-teal gradient (-90deg, #05838b 0% -> #000 102.1%); the
 *             title rises to y21, the blurb slides in to (25, 66) in
 *             rgba(186,186,186,0.8), and the link rises to y186 in white
 *             IBM Plex Mono Medium 14.
 *
 * Transforms and opacity only, so nothing reflows while it runs; keyboard
 * focus shows the same state. Desktop only — below lg the card is the same
 * photo-and-title tile as without `reveal`, because a phone has no hover.
 * /industries/ keeps the always-visible blurb it was designed with.
 */
export type Industry = {
  t: string
  img: string
  b: string
  /** Set once the per-industry page exists. Unlinked until then. */
  href?: string
}

const EASE = 'duration-500 ease-out motion-reduce:transition-none'

export function IndustryCard({ ind, reveal = false }: { ind: Industry; reveal?: boolean }) {
  const card = reveal ? (
    <article
      className="group relative h-[140px] w-full overflow-hidden rounded-[12px] bg-white lg:h-[226px] lg:w-[310px] lg:flex-none lg:rounded-[20px]"
      // The hovered variant's ground. At rest the photo covers all of it.
      style={{ backgroundImage: 'linear-gradient(270deg, rgb(5,131,139) 0%, rgb(0,0,0) 102.1%)' }}
    >
      {/* 326x239 at (-8, -6) — the frame bleeds the photo past every edge. */}
      <div className={`absolute inset-0 transition-[translate,opacity] lg:inset-auto lg:left-[-8px] lg:top-[-6px] lg:h-[239px] lg:w-[326px] lg:group-hover:-translate-x-[340px] lg:group-hover:opacity-0 lg:group-focus-visible:-translate-x-[340px] lg:group-focus-visible:opacity-0 ${EASE}`}>
        <Image src={ind.img} alt="" fill sizes="(min-width: 1024px) 326px, 50vw" className="object-cover" />
      </div>
      <div
        className="absolute inset-0 lg:hidden"
        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(10,15,12,0) 25%, rgba(10,15,12,0.85) 100%)' }}
      />
      <div
        className={`absolute inset-0 transition-[translate,opacity] max-lg:hidden lg:group-hover:translate-y-[250px] lg:group-hover:opacity-0 lg:group-focus-visible:translate-y-[250px] lg:group-focus-visible:opacity-0 ${EASE}`}
        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(10,15,12,0) 31.25%, rgba(10,15,12,0.7) 77.885%)' }}
      />
      <h3 className={`absolute bottom-[10px] left-[12px] right-[12px] font-sans text-[15px] font-bold leading-[22px] text-white transition-[translate] lg:bottom-auto lg:left-[25px] lg:right-auto lg:top-[163px] lg:w-[253px] lg:text-[24px] lg:leading-[32px] lg:group-hover:-translate-y-[142px] lg:group-focus-visible:-translate-y-[142px] ${EASE}`}>
        {ind.t}
      </h3>
      <p className={`absolute left-[25px] top-[66px] hidden w-[275px] translate-x-[300px] translate-y-[12px] font-roboto text-[14px] leading-[18px] text-white/80 transition-[translate,color] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-[rgba(186,186,186,0.8)] group-focus-visible:translate-x-0 group-focus-visible:translate-y-0 group-focus-visible:text-[rgba(186,186,186,0.8)] lg:block ${EASE}`}>
        {ind.b}
      </p>
      <span aria-hidden="true" className={`absolute left-[20px] right-[22px] top-[186px] hidden h-[16px] translate-y-[40px] items-center justify-between transition-[translate] group-hover:translate-y-0 group-focus-visible:translate-y-0 lg:flex ${EASE}`}>
        <span className="font-mono text-[14px] font-medium leading-[15.95px] text-white">Learn More</span>
        <Image src="/images/icons/arrow-white.svg" alt="" width={20} height={16} className="h-[15.66px] w-[20px]" />
      </span>
    </article>
  ) : (
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
