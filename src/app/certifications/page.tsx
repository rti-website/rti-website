import { Canvas } from '@/components/design/Frame'
import { FOOTER_H } from '@/lib/layout'
import { buildMetadata } from '@/lib/seo'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import { CTA_H, ClosingCta } from '@/components/sections/ClosingCta'
import { CertGrid } from '@/components/sections/certifications/CertGrid'
import { CertAccountability } from '@/components/sections/certifications/CertAccountability'
import { CTA, HERO, SEO } from '@/data/certifications-page'

/**
 * Certifications — a 1:1 build of Figma frame 6374:4886.
 *
 * NEW URL. /certifications/ does not resolve on the live site — it soft-404s to
 * the homepage — so there is no live title, description or H1 to preserve and
 * CLAUDE.md rule 6 does not bite. The SEO here is ours.
 *
 *   Section          Node        Figma h    built h   why
 *   Header           —           140        140
 *   Hero             6374:4888   470        470
 *   Certifications   6380:1097   1392       H.certs   ten logo cards, full names
 *   Accountability   6380:1098   762        H.acct
 *   Closing CTA      6380:1099   399.05     H.cta
 *   Footer           6374:4994   681        681
 *
 * Heights are measured, not copied off the frame:
 * `node scripts/measure-sections.mjs --route certifications`.
 *
 * The card grid is the designer's ten logo cards (6774:2592) since 23 Sep
 * 2026, with full names as titles and three bodies corrected on the facts.
 * Read the note at the top of src/data/certifications-page.ts before
 * changing it.
 */
const H = {
  certs: 1537,   // Figma 1392 — ten logo cards since 23 Sep 2026; the full names run to two lines
  acct:  693,    // Figma 762 — the doc's bullets are shorter than the frame's
  cta:   CTA_H,  // the shared closing band; this frame drew 399.05 before the 16 Sep redesign
}

const HERO_TOP = 140
const HERO_H = 470
const CERTS_TOP = HERO_TOP + HERO_H
const ACCT_TOP  = CERTS_TOP + H.certs
const CTA_TOP   = ACCT_TOP + H.acct
const FOOTER_TOP = CTA_TOP + H.cta

export const metadata = buildMetadata({
  url: '/certifications/',
  title: SEO.title,
  description: SEO.description,
})

export default function CertificationsPage() {
  return (
    <Canvas height={Math.round(FOOTER_TOP + FOOTER_H)}>
      <Header />
      <main>
        <ServiceHero
          label="6374:4888" crumbs={HERO.crumbs} h1={HERO.h1} lead={HERO.lead}
          image="/images/pages/hero-certifications.png"
        />
        <CertGrid           top={CERTS_TOP} height={H.certs} />
        <CertAccountability top={ACCT_TOP}  height={H.acct} />
        <ClosingCta top={CTA_TOP} label="6380:1099" content={CTA} />
      </main>
      <Footer top={FOOTER_TOP} />
    </Canvas>
  )
}
