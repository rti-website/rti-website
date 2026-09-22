import Image from 'next/image'
import { Section } from '@/components/design/Frame'

/**
 * The two-column prose blocks on a service detail page, both on #f8faf9:
 *
 *   media="right"  Figma 6197:4463 — px320 py100, gap 80, photo 568 wide,
 *                  rounded 20, text column 632.
 *   media="left"   Figma 6173:4386 — gap 110, pr310, photo on the left.
 *
 * The design bleeds that left photo off the canvas edge. It reads as a mistake
 * next to a page where everything else starts at x319, so the photo is inset
 * instead: an 80px left gutter, 60px top and bottom, and the same rounded-[20px]
 * as the first block's photo, which makes it a placed image rather than a
 * cropped one. The vertical padding moved from the text column to the section
 * so both sides share it.
 *
 * The heading box is 566 wide and 63 tall in both.
 *
 * MOBILE — Figma 6638:10510 (media right) and 6655:2297 (media left) in file
 * BVtf2AOuUOcYbiMIlcKmbC. Both are the SAME shape, and both put the PHOTO
 * FIRST: px20 / pt40 / pb8, a 20px column, a 220-tall full-width picture at
 * r16, then the heading at 24/1.2 and the prose at 15/1.5. So `media` stops
 * meaning anything below lg — the art gets `order-first` in the right-hand
 * variant and the two columns become one.
 *
 * The designer named the second block "(duplicate content)": it repeats the
 * first block's heading and copy rather than drawing the process section, so
 * everything except the shape of it comes from the page data, not the frame.
 */
export function ServiceSplit({
  top, height, media, id, label, heading, image, imageAlt, children, footer,
}: {
  top: number
  height: number
  media: 'left' | 'right'
  id?: string
  label?: string
  heading: string
  image: string
  imageAlt: string
  /** The prose. Styled by the caller so each block can set its own rhythm. */
  children: React.ReactNode
  /** Optional row under the prose — the "Read More" link on the first block. */
  footer?: React.ReactNode
}) {
  const text = (
    <div className="flex w-full min-w-px flex-col items-start gap-[20px] lg:w-auto lg:flex-1 lg:gap-[11px]">
      {/* Figma draws this box 566x63 — one line of its placeholder heading.
          Real headings wrap, so the width (which controls where the line
          breaks) is kept and the height becomes a minimum. Clamping it to 63
          put the second line straight through the paragraph below.
          Below lg the width would be 566px of heading on a 350px screen, so it
          and the min-height are `lg:` only. */}
      <h2 className="w-full font-sans text-[24px] font-semibold leading-[1.2] text-black lg:flex lg:min-h-[63px] lg:w-[566px] lg:items-center lg:text-[40px] lg:leading-[1.15]">
        {heading}
      </h2>
      {children}
      {footer}
    </div>
  )

  const art = media === 'right'
    ? (
      <div className="relative h-[220px] w-full overflow-hidden rounded-[16px] max-lg:order-first lg:h-[295px] lg:w-[568px] lg:shrink-0 lg:rounded-[20px]">
        <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 568px, 100vw" className="object-cover" />
      </div>
    )
    : (
      <div className="relative h-[220px] w-full overflow-hidden rounded-[16px] lg:h-full lg:min-w-px lg:w-auto lg:flex-1 lg:self-stretch lg:rounded-[20px]">
        <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 710px, 100vw" className="object-cover" />
      </div>
    )

  return (
    <Section
      top={top} height={height} label={label}
      className={`flex flex-col gap-[20px] bg-mist px-[20px] pb-[8px] pt-[40px] lg:flex-row lg:items-center lg:justify-center ${
        media === 'right'
          ? 'lg:gap-[80px] lg:px-[320px] lg:py-[100px]'
          : 'lg:gap-[110px] lg:py-[60px] lg:pl-[80px] lg:pr-[310px]'
      }`}
    >
      {/* The anchor lives on an empty span so the section's own layout is
          untouched; the header is 140 tall, hence scroll-mt. */}
      {id && <span id={id} className="absolute -top-[140px] scroll-mt-[140px]" aria-hidden="true" />}
      {media === 'left' ? art : text}
      {media === 'left' ? text : art}
    </Section>
  )
}
