import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { LogoMarquee } from '@/components/ui/LogoMarquee'
import { CERT_COPY, CERT_LOGOS } from '@/data/certifications'

/**
 * Certifications band — Figma 6142:1622 on /services/, 6173:2828 on the
 * service detail pages. Identical frame, 1920x299.035, so one component with
 * a `top`.
 *
 * Same content as the homepage's Certifications section but a different frame:
 * auto-layout, column, gap 30, px330, and no slack. The height is exactly its
 * contents: 34.035 + 6 + 75 (heading group) + 30 + 68 (logos) + 30 + 56 = 299.035.
 *
 * The logo row is static in Figma; it scrolls here because that is what was
 * asked for on the homepage, and two identical strips behaving differently on
 * two pages reads as a bug.
 *
 * MOBILE — 6638:9594 on /services/ and 6655:5015 on a service detail page,
 * both in file BVtf2AOuUOcYbiMIlcKmbC and both identical: px20 / py48, a
 * centred column 16 apart, and the compliance paragraph ABOVE the logo strip.
 *
 * !! px-[330px] WAS THE BUG. It had no `lg:` reset, so a 390px phone was
 * handed 660px of padding and the section overflowed the window. It is
 * `lg:px-[330px]` now — the one place this band could break the page.
 *
 * !! THE PARAGRAPH IS REORDERED WITH `order`, NOT IN THE SOURCE. Unlike the
 * homepage's Certifications — whose children are absolutely placed boxes, so
 * moving them in the source costs the desktop nothing — this band is a real
 * auto-layout column at every width. Re-ordering the markup would re-order the
 * board too. `max-lg:order-*` exists only below lg, so the desktop column is
 * untouched and the phone gets the frame's order.
 */
export function CertificationsBand({
  top = 2925.83, label = '6142:1622', body, height = 299.035,
}: {
  top?: number
  label?: string
  /** Grows when a page's own compliance copy runs longer than two lines. */
  height?: number
  /** Page-specific compliance copy; falls back to the shared paragraph. */
  body?: string
} = {}) {
  return (
    <Section
      top={top} height={height} label={label}
      className="flex flex-col items-center justify-center gap-[16px] bg-white px-[20px] py-[48px] lg:gap-[30px] lg:px-[330px] lg:py-0"
    >
      <div className="flex w-full flex-col items-center gap-[16px] lg:w-[829px] lg:gap-[6px]">
        <Eyebrow>{CERT_COPY.eyebrow}</Eyebrow>
        <h2 className="w-full text-center font-sans text-[26px] font-semibold leading-[32px] text-black lg:flex lg:h-[75px] lg:items-center lg:justify-center lg:text-[40px] lg:leading-none">
          {CERT_COPY.title}
        </h2>
      </div>

      {/* The mobile height was a flat h-[60px] with the 35px-tall marks sitting
          at the TOP of it, so all 25px of slack fell BELOW them and the strip
          still hugged the paragraph above. Below lg the box is its contents now
          and LogoMarquee owns the breathing room — Asim, 22 Sep 2026. */}
      <div className="w-full max-lg:order-2 lg:h-[68px]">
        <LogoMarquee logos={CERT_LOGOS} speed={45} />
      </div>

      <p className="w-full text-center font-roboto text-[15px] leading-[22px] text-muted max-lg:order-1 lg:w-[830px] lg:text-[17.018px] lg:leading-[27.654px]">
        {body ?? CERT_COPY.body}
      </p>
    </Section>
  )
}
