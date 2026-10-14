import { Canvas } from '@/components/design/Frame'
import { FOOTER_H } from '@/lib/layout'
import { href } from '@/lib/urls'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { LocationCenterBar } from '@/components/sections/locations/LocationCenterBar'
import { LocationFaq } from '@/components/sections/locations/LocationFaq'
import { StateHero, StateMaterials, StateCounties, StateCta, StateMailIn } from '@/components/sections/locations/StateSections'
import type { HubSite, StateHubPage as Hub } from '@/data/state-hubs'
import { content } from '@/lib/page-content'
import { faqNode, graph } from '@/lib/schema'

/**
 * A state hub — /arizona-recycling/, /california-recycling/ and the rest of
 * the seven of 14 Oct 2026 (src/data/state-hubs.ts). The Minnesota and
 * Wisconsin template (LocationDetailPage), band for band, with the facility
 * linked the same way (Aaqib, 14 Oct 2026):
 *
 *   Header         140
 *   Hero           579        StateHero; Home / Locations / <state>
 *   Center card    L.center   LocationCenterBar, once per facility: "View Center" to the
 *                             facility page, its address, phone and hours in the same card
 *   Services       L.mat      StateMaterials, nine tiles to the national pages
 *   Counties       L.counties StateCounties, the city chip to the facility page
 *   Pickup CTA     L.cta      StateCta
 *   Mail-in        L.mailIn   StateMailIn
 *   FAQ            L.faq      LocationFaq, with FAQPage JSON-LD
 *   Footer         681
 *
 * Tennessee has two facilities, so two cards (Lewisburg, then Johnson City). The facility pages keep their own URLs;
 * their breadcrumb runs Home / Locations / <state> / <city>, the state
 * linking back here (hero.parent in src/data/county-pages/areas/).
 *
 * Re-measure with `node scripts/measure-sections.mjs --route <slug>`.
 */
export type HubLayout = { center: number; mat: number; counties: number; cta: number; mailIn: number; faq: number }

const HERO_TOP = 140
const HERO_H = 579

/** A hub's facility in the shape the Minnesota and Wisconsin bars read. */
function asFacility(s: HubSite) {
  return {
    center: {
      eyebrow: s.eyebrow, name: s.name, href: s.href,
      addressLabel: 'Address:', address: s.address, phoneLabel: 'Phone:', phone: s.phone,
      primary: s.view, secondary: 'Get Directions',
    },
    mapsHref: s.mapsHref,
    addressShort: s.address,
    phone: s.phone,
    hoursShort: s.hours,
  }
}

export async function StateHubPage({ f, layout: L }: { f: Hub; layout: HubLayout }) {
  const { DETAIL_COPY } = await content('facilities')
  const PER_SITE = L.center
  const SITES_TOP    = HERO_TOP + HERO_H
  const MAT_TOP      = SITES_TOP + PER_SITE * f.sites.length
  const COUNTIES_TOP = MAT_TOP + L.mat
  const CTA_TOP      = COUNTIES_TOP + L.counties
  const MAILIN_TOP   = CTA_TOP + L.cta
  const FAQ_TOP      = MAILIN_TOP + L.mailIn
  const FOOTER_TOP   = FAQ_TOP + L.faq

  const crumbs = [
    { label: DETAIL_COPY.crumbs.home,      href: href('/') },
    { label: DETAIL_COPY.crumbs.locations, href: href('/all-locations/') },
    { label: f.state, href: null },
  ]

  return (
    <Canvas height={Math.round(FOOTER_TOP + FOOTER_H)}>
      <Header />
      <main>
        <StateHero f={f} crumbs={crumbs} top={HERO_TOP} height={HERO_H} />
        {f.sites.map((s, i) => {
          const top = SITES_TOP + PER_SITE * i
          const site = asFacility(s)
          return <LocationCenterBar key={i} top={top} height={L.center} f={site} />
        })}
        <StateMaterials top={MAT_TOP}      height={L.mat}      f={f} />
        <StateCounties  top={COUNTIES_TOP} height={L.counties} f={f} />
        <StateCta       top={CTA_TOP}      height={L.cta}      f={f} />
        <StateMailIn    top={MAILIN_TOP}   height={L.mailIn}   f={f} />
        <LocationFaq    top={FAQ_TOP}      height={L.faq}      f={f} />
      </main>
      <Footer top={FOOTER_TOP} />
      {/* FAQPage JSON-LD from the list the FAQ shows; answer links as plain words. */}
      {f.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph(faqNode(f.faqs.map((x) => ({ q: x.q, a: x.a.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') })))) }} />
      )}
    </Canvas>
  )
}
