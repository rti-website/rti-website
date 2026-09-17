import Link from 'next/link'
import { Box, Section } from '@/components/design/Frame'
import { InteriorHeroArt } from '@/components/ui/InteriorHeroArt'
import { SERVICES_HERO } from '@/data/services'

/**
 * Services hero — Figma 6142:786. 1920x470 on #0b1f3a.
 *
 * The art lives in InteriorHeroArt. This page carries its OWN photograph — the
 * recycling floor, not the green-roof building the other interior pages still
 * show — swapped into node 6472:3862 in the 17 Sep file and asked for by Asim
 * the same day. See InteriorHeroArt for why every page now needs its own.
 */
export function ServicesHero() {
  return (
    <Section top={140} height={470} label="6142:786" className="bg-navy">
      <InteriorHeroArt src="/images/services/hero-services.png" />

      {/* Breadcrumb — 6142:1548 at x322 y112, gap 13. */}
      <Box x={322} y={112}>
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-[13px] font-roboto text-[11.011px] font-bold uppercase leading-[16.517px] tracking-[0.8909px]">
            {SERVICES_HERO.crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-[13px]">
                {i > 0 && <span aria-hidden="true" className="text-white/50">/</span>}
                {c.href
                  ? <Link href={c.href} className="text-white/50 hover:text-white">{c.label}</Link>
                  : <span aria-current="page" className="text-white">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
      </Box>

      {/* H1 — 6142:794 at x319 y150, w473. Live /services/ H1 is "Services";
          the redesign's is "Our Services". Ported as designed; flagged in the
          SEO diff at gate 2 along with the homepage H1. */}
      <Box x={319} y={150} w={473}>
        <h1 className="font-sans text-[60px] font-semibold leading-[70px] tracking-[-1.5px] text-white">
          {SERVICES_HERO.h1}
        </h1>
      </Box>

      {/* Lead — 6142:793 at x319 y243, w504. */}
      <Box x={319} y={243} w={504}>
        <p className="font-roboto text-[18px] leading-[27px] text-white/70">
          {SERVICES_HERO.lead}
        </p>
      </Box>
    </Section>
  )
}
