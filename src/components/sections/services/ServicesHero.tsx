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
 *
 * MOBILE — Figma 6640:2305 in file BVtf2AOuUOcYbiMIlcKmbC (frame 6638:8235).
 * 390x276 on the same navy: one centred column, H1 32/1.2 and lead 15/1.5, and
 * NO breadcrumb — the frame parks the two crumb layers off the left edge of the
 * canvas, so they are hidden rather than deleted (the links stay in the DOM).
 */
export function ServicesHero() {
  return (
    <Section
      top={140} height={470} label="6142:786"
      className="flex flex-col items-center justify-center gap-[10px] bg-navy px-[20px] py-[48px] max-lg:min-h-[276px] lg:block lg:p-0"
    >
      {/*
        InteriorHeroArt is not part of this change and still builds its photo
        and its two washes out of plain `Box`es. A Box with no `fill` prop is an
        ordinary zero-height block below lg, so the `<Image fill>` inside it has
        nothing to cover and the hero goes flat navy. Until that component takes
        `fill` (see Frame.tsx), the layer behaviour is forced on from out here:
        one absolute wrapper below lg, `lg:contents` so the board is untouched.
        The `!` is required — `.design-box { position: relative }` is unlayered
        in globals.css and outranks any Tailwind utility. Delete this wrapper
        the day InteriorHeroArt passes `fill`; it will be a no-op by then.
      */}
      <div className="max-lg:absolute max-lg:inset-0 max-lg:[&_.design-box]:absolute! max-lg:[&_.design-box]:inset-0! lg:contents">
        <InteriorHeroArt src="/images/services/hero-services.png" />
      </div>

      {/* Breadcrumb — 6142:1548 at x322 y112, gap 13. Off-canvas on the phone. */}
      <Box x={322} y={112} className="max-lg:hidden">
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
      <Box x={319} y={150} w={473} className="max-lg:w-full">
        <h1 className="text-center font-sans text-[32px] font-semibold leading-[1.2] text-white lg:text-left lg:text-[60px] lg:leading-[70px] lg:tracking-[-1.5px]">
          {SERVICES_HERO.h1}
        </h1>
      </Box>

      {/* Lead — 6142:793 at x319 y243, w504; 6640:2313 caps it at 273 on a phone. */}
      <Box x={319} y={243} w={504} className="max-lg:max-w-[273px]">
        <p className="text-center font-roboto text-[15px] leading-[1.5] text-white/70 lg:text-left lg:text-[18px] lg:leading-[27px]">
          {SERVICES_HERO.lead}
        </p>
      </Box>
    </Section>
  )
}
