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
    <div className="flex min-w-px flex-1 flex-col items-start gap-[11px]">
      {/* Figma draws this box 566x63 — one line of its placeholder heading.
          Real headings wrap, so the width (which controls where the line
          breaks) is kept and the height becomes a minimum. Clamping it to 63
          put the second line straight through the paragraph below. */}
      <h2 className="flex min-h-[63px] w-[566px] items-center font-sans text-[40px] font-semibold leading-[1.15] text-black">
        {heading}
      </h2>
      {children}
      {footer}
    </div>
  )

  const art = media === 'right'
    ? (
      <div className="relative h-[295px] w-[568px] shrink-0 overflow-hidden rounded-[20px]">
        <Image src={image} alt={imageAlt} fill sizes="568px" className="object-cover" />
      </div>
    )
    : (
      <div className="relative h-full min-w-px flex-1 self-stretch overflow-hidden rounded-[20px]">
        <Image src={image} alt={imageAlt} fill sizes="710px" className="object-cover" />
      </div>
    )

  return (
    <Section
      top={top} height={height} label={label}
      className={`flex items-center justify-center bg-mist ${
        media === 'right'
          ? 'gap-[80px] px-[320px] py-[100px]'
          : 'gap-[110px] py-[60px] pl-[80px] pr-[310px]'
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
