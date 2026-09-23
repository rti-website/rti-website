import { Canvas } from '@/components/design/Frame'
import { FOOTER_H } from '@/lib/layout'
import { buildMetadata } from '@/lib/seo'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import {
  ItadFeatures, ItadIntro, ItadPickup, ItadProcess, ItadServices, ItadWhy,
} from '@/components/sections/itad/ItadSections'
import { HERO, SEO } from '@/data/itad'

/**
 * IT Asset Disposition — Figma 6778:2946 (desktop) / 6778:3335 (mobile).
 *
 * A KEEP URL from data/url-map.csv, built 23 Sep 2026. Title, description and
 * H1 are the url-map row's, verbatim (CLAUDE.md rule 6) — see src/data/itad.ts
 * for why the H1 is not the frame's "ITAD".
 *
 *   Section              Node        Figma h    built h
 *   Header               —           140        140
 *   Hero                 6778:2948   470        470
 *   Intro                6779:2661   561.05     H.intro
 *   Why It Matters       6779:2662   543        H.why
 *   Complete Services    6779:2663   658.875    H.services
 *   Our Process          6779:2664   469        H.process
 *   Prominent Features   6779:2665   702        H.features
 *   Book a Pickup        6779:2666   1002       H.pickup
 *   Footer               6778:3100   681        FOOTER_H
 *
 * The frame has no closing CTA band — the pickup form IS the call to action —
 * so the footer follows it directly, as drawn.
 *
 * Heights are measured, not copied off the frame:
 * `node scripts/measure-sections.mjs --route it-asset-disposition`.
 */
const H = {
  intro:    564,   // Figma 561.05
  why:      543,
  services: 659,
  process:  490,   // Figma 469 — one step's text runs to a fourth line at 212px in the browser's Roboto
  features: 702,
  pickup:   1002,
}

const HERO_TOP = 140
const HERO_H = 470
const INTRO_TOP    = HERO_TOP + HERO_H
const WHY_TOP      = INTRO_TOP + H.intro
const SERVICES_TOP = WHY_TOP + H.why
const PROCESS_TOP  = SERVICES_TOP + H.services
const FEATURES_TOP = PROCESS_TOP + H.process
const PICKUP_TOP   = FEATURES_TOP + H.features
const FOOTER_TOP   = PICKUP_TOP + H.pickup

export const metadata = buildMetadata({
  url: '/it-asset-disposition/',
  title: SEO.title,
  description: SEO.description,
})

export default function ItadPage() {
  return (
    <Canvas height={Math.round(FOOTER_TOP + FOOTER_H)}>
      <Header />
      <main>
        <ServiceHero label="6778:2948" crumbs={HERO.crumbs} h1={HERO.h1} lead={HERO.lead} image={HERO.image}
          imageFill={HERO.imageFill} washes={HERO.washes}
        />
        <ItadIntro    top={INTRO_TOP}    height={H.intro} />
        <ItadWhy      top={WHY_TOP}      height={H.why} />
        <ItadServices top={SERVICES_TOP} height={H.services} />
        <ItadProcess  top={PROCESS_TOP}  height={H.process} />
        <ItadFeatures top={FEATURES_TOP} height={H.features} />
        <ItadPickup   top={PICKUP_TOP}   height={H.pickup} />
      </main>
      <Footer top={FOOTER_TOP} />
    </Canvas>
  )
}
