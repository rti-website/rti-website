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
      className="flex flex-col items-center justify-center gap-[30px] bg-white px-[330px]"
    >
      <div className="flex w-[829px] flex-col items-center gap-[6px]">
        <Eyebrow>{CERT_COPY.eyebrow}</Eyebrow>
        <h2 className="flex h-[75px] w-full items-center justify-center text-center font-sans text-[40px] font-semibold leading-none text-black">
          {CERT_COPY.title}
        </h2>
      </div>

      <div className="h-[68px] w-full">
        <LogoMarquee logos={CERT_LOGOS} speed={45} />
      </div>

      <p className="w-[830px] text-center font-roboto text-[17.018px] leading-[27.654px] text-muted">
        {body ?? CERT_COPY.body}
      </p>
    </Section>
  )
}
