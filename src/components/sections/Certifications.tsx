import { Box, CenterBox, Section } from '@/components/design/Frame'
import { CERT_TRIM, HOME_HERO_SHIFT } from '@/lib/layout'
import { Eyebrow, Lead, Title } from '@/components/ui/Bits'
import { LogoMarquee } from '@/components/ui/LogoMarquee'
import { CERT_COPY, CERT_LOGOS } from '@/data/certifications'

/**
 * Certifications & Standards — Figma 6044:19732 (desktop, 1920x449) and
 * 6605:2326 (mobile, 390x358).
 *
 * Desktop: 1920x449, pt150 — built CERT_TRIM shorter at the top, so the gap
 * under the hero is 25px rather than 150. Every internal offset comes down by
 * the same amount. Per-logo opacity is taken from the design. The strip scrolls
 * continuously. /services/ draws the same band at a different height — see
 * CertificationsBand.
 *
 * Mobile: a plain column — px20 / py48 / gap16 — and the section's four
 * children in the frame's order.
 *
 * !! THE LEAD PARAGRAPH SITS ABOVE THE LOGO STRIP IN THE SOURCE, which is the
 * reverse of how the desktop board reads top-to-bottom (heading 150, logos 282,
 * lead 372). The mobile frame puts the paragraph second and the strip last, and
 * below lg the children stack in SOURCE ORDER — so source order is the only
 * lever there is. It costs the desktop nothing: at lg all three are absolutely
 * positioned at y offsets that do not overlap, so the paint order change is not
 * observable. Do not "fix" this back into visual order.
 */
export function Certifications() {
  return (
    <Section
      top={1080 - HOME_HERO_SHIFT}
      height={449 - CERT_TRIM}
      label="6044:19732"
      className="flex flex-col items-center gap-[16px] bg-white px-[20px] py-[48px] lg:block lg:p-0"
    >
      <CenterBox
        y={150 - CERT_TRIM}
        w={829}
        className="flex flex-col items-center gap-[16px] lg:gap-[6px]"
      >
        <Eyebrow>{CERT_COPY.eyebrow}</Eyebrow>
        <Title className="text-center">{CERT_COPY.title}</Title>
      </CenterBox>

      <CenterBox y={372 - CERT_TRIM} w={830}>
        <Lead className="text-center">{CERT_COPY.body}</Lead>
      </CenterBox>

      {/*
        `self-stretch` is what makes the strip full width below lg. A Box has no
        width of its own there, and it is a flex item of an `items-center`
        column, so it would otherwise be as wide as its content — and its
        content is a `w-max` marquee track, which would run off the screen.
        Stretching the cross axis rather than setting `w-full` deliberately
        leaves the `width` property alone, so there is nothing to fight the
        `width: var(--bw)` the lg media query puts on .design-box.
      */}
      <Box x={330} y={282 - CERT_TRIM} w={1260} className="self-stretch">
        <LogoMarquee logos={CERT_LOGOS} speed={45} />
      </Box>
    </Section>
  )
}
