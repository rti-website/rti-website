import { Box, CenterBox, Section } from '@/components/design/Frame'
import { CERT_TRIM, HOME_HERO_SHIFT } from '@/lib/layout'
import { Eyebrow, Lead, Title } from '@/components/ui/Bits'
import { LogoMarquee } from '@/components/ui/LogoMarquee'
import { CERT_COPY, CERT_LOGOS } from '@/data/certifications'

/**
 * Certifications & Standards — Figma 6044:19732. 1920x449, pt150 — built
 * CERT_TRIM shorter at the top, so the gap under the hero is 25px rather than
 * 150. Every internal offset comes down by the same amount.
 * Per-logo opacity is taken from the design. The strip scrolls continuously.
 * /services/ draws the same band at a different height — see CertificationsBand.
 */
export function Certifications() {
  return (
    <Section top={1080 - HOME_HERO_SHIFT} height={449 - CERT_TRIM} label="6044:19732" className="bg-white">
      <CenterBox y={150 - CERT_TRIM} w={829} className="flex flex-col items-center gap-[6px]">
        <Eyebrow>{CERT_COPY.eyebrow}</Eyebrow>
        <Title className="text-center">{CERT_COPY.title}</Title>
      </CenterBox>

      <Box x={330} y={282 - CERT_TRIM} w={1260}>
        <LogoMarquee logos={CERT_LOGOS} speed={45} />
      </Box>

      <CenterBox y={372 - CERT_TRIM} w={830}>
        <Lead className="text-center">{CERT_COPY.body}</Lead>
      </CenterBox>
    </Section>
  )
}
