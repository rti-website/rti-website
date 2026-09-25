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
 * ORDER, 25 Sep 2026 — Asim: "move the text below the moving icons", with
 * the homepage frame. Heading, logos, then the paragraph, as the frame draws
 * it (it was paragraph-above-logos for a day, 24 Sep). On the phone the
 * shared compliance line is not shown ("remove the text in mobile version",
 * homepage 6605:2326); a page's OWN paragraph (airbags, the electronics ad
 * pages' facility sentence) still shows there, because it says something
 * the logos do not.
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
      <div className="order-1 w-full lg:h-[68px]">
        <LogoMarquee logos={CERT_LOGOS} speed={45} />
      </div>

      {/* The frame's 830, balanced. The compliance line (24 Sep 2026, second
          wording) is about 1,060px of text: at 1084 it only just fitted one
          line here and would break on Windows' wider Roboto with one word
          left over. At 830 it is always two even lines, which is what the
          frame's paragraph was and what the band's 299 height is sized for.
          The airbag page's own long paragraph keeps its measured height. */}
      <p className={`w-full text-center font-roboto text-[15px] leading-[22px] text-muted order-2 lg:w-[830px] lg:text-balance lg:text-[17.018px] lg:leading-[27.654px] ${!body || body === CERT_COPY.body ? 'max-lg:hidden' : ''}`}>
        {body ?? CERT_COPY.body}
      </p>
    </Section>
  )
}
