import Image from 'next/image'
import Link from 'next/link'

/**
 * One industry card — Figma component 6040:18309 and its variants.
 * 310x226 · r20 · #2e3033 under the photo · gradient from transparent at
 * 31.25% to rgba(10,15,12,0.88) at 77.885% · title IBM Plex Sans Bold 20/1.35 ·
 * blurb Roboto 14/18 · both 25px from the left, text block starting at y102.
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
    <article className="relative h-[226px] w-[310px] shrink-0 overflow-hidden rounded-[20px] bg-slate">
      <Image src={ind.img} alt="" fill sizes="310px" className="object-cover" />
      <div
        className="absolute inset-0"
        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(10,15,12,0) 31.25%, rgba(10,15,12,0.88) 77.885%)' }}
      />
      <div className="absolute left-[25px] top-[102px] flex w-[275px] flex-col gap-[9px]">
        <h3 className="font-sans text-[20px] font-bold leading-[1.35] text-white">{ind.t}</h3>
        <p className="font-roboto text-[14px] leading-[18px] text-white/80">{ind.b}</p>
      </div>
    </article>
  )
  // Linked once the industry has a page; the homepage's categories do not all
  // map to one, so those stay plain.
  return ind.href
    ? <Link href={ind.href} className="block rounded-[20px] transition-shadow hover:shadow-lg">{card}</Link>
    : card
}
