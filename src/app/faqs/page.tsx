import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Box, FlowCanvas } from '@/components/design/Frame'
import Link from 'next/link'
import { InteriorHeroArt } from '@/components/ui/InteriorHeroArt'
import { Accordion } from '@/components/client/Accordion'
import { FOOTER_H } from '@/lib/layout'
import { buildMetadata } from '@/lib/seo'
import { absolute, href } from '@/lib/urls'
import { breadcrumbNode, faqNode, graph } from '@/lib/schema'
import { ALL_FAQS, FAQ_GROUPS, FAQ_HERO, FAQ_SEO } from '@/data/faqs'

/**
 * /faqs/ — Figma 6382:6819.
 *
 *   Header     —           140
 *   Hero       6478:5152   470
 *   Group      6392:1531   py90, gap44, heading block + a 900-wide list
 *   Footer     6382:6837   681
 *
 * !! THIS URL WAS ALREADY IN sitemap.ts AND HAD NO PAGE. `/faqs/` has been in
 * the static list since the sitemap was written, so every crawl of sitemap.xml
 * has been handed a 404. Building the page fixes that as a side effect; there
 * is nothing to redirect because the URL never existed on WordPress either.
 *
 * !! IT USES FlowCanvas, NOT Canvas. Seventeen groups and 114 questions is not
 * a height a designer decided — and every row can open, which changes it again.
 * Same reasoning as the blog post template: the 1920 canvas and its zoom, with
 * children in normal flow. The hero is still a fixed 470 because that part is.
 *
 * The frame draws four groups of four. The pattern is reproduced exactly and
 * repeated over the real content, alternating white and #f4f9f6 the way the
 * frame alternates its four.
 */

export const metadata = buildMetadata({
  url: '/faqs/',
  title: FAQ_SEO.title,
  description: FAQ_SEO.description,
})

export default function FaqsPage() {
  return (
    <FlowCanvas>
      <Header />
      <main>
        {/*
          Hero — 6478:5152, 470 tall, the text block 504x192 centred vertically
          at x319: crumbs at 0, the H1 at 38, the lead at 131.

          !! NOT <ServiceHero />, AND THAT IS THE POINT. ServiceHero is built for
          the pinned canvas — it positions itself absolutely and every section
          after it is given an explicit `top`. Dropped into a FlowCanvas page it
          leaves the flow, so the intro heading and the first group's eyebrow
          rendered underneath it. blocks/ArticleTemplate.tsx and
          blocks/CategoryArchive.tsx build their heroes inline for the same
          reason; this is the third.

          No `src`, so InteriorHeroArt uses the shared photograph. The frame has
          its own (node 6478:5155) and it is registered in
          data/figma-assets.json — figma.com is unreachable from this sandbox,
          so pull it on a machine that can see it:
            node scripts/fetch-figma-assets.mjs --missing
          then pass src="/images/pages/hero-faqs.png" below.
        */}
        {/*
          MOBILE — 6687:3554. 276 tall on the same navy, one centred column at
          px20: no breadcrumb (hidden, not deleted — the crumb link stays in the
          DOM), the H1 at 32/1.2 and the lead at 15/1.5 capped at 273 wide, both
          centred. `min-h` rather than `h` so a longer H1 cannot be clipped.
        */}
        <div data-figma="6478:5152" className="relative flex min-h-[276px] flex-col justify-center overflow-hidden bg-navy px-[20px] py-[48px] lg:block lg:h-[470px] lg:p-0">
          <InteriorHeroArt />
          {/* 24 Sep 2026: the H1 became "Frequently Asked Questions" and the lead
              the doc's opening sentence, so the text block is the service
              hero's (x319, 946 wide, 60/70 over 18/27) rather than the frame's
              504 box, which would set that H1 on two lines and the lead on
              five. Centred in the 470 rather than pinned at y139, so it holds
              whatever the copy's height is. */}
          <Box x={319} y={0} w={946} h={470} className="flex flex-col items-center lg:items-start lg:justify-center">
            <nav aria-label="Breadcrumb" className="max-lg:hidden">
              <ol className="flex items-center gap-[13px] font-roboto text-[11.011px] font-bold uppercase leading-[16.517px] tracking-[0.8909px]">
                <li><Link href={href('/')} className="text-white/50 hover:text-white">Home</Link></li>
                <li aria-hidden="true" className="text-white/50">/</li>
                <li className="text-white">FAQs</li>
              </ol>
            </nav>
            <h1 className="w-full text-center font-sans text-[32px] font-semibold leading-[1.2] text-white lg:mt-[20px] lg:w-auto lg:text-left lg:text-[60px] lg:leading-[70px] lg:tracking-[-1.5px]">
              {FAQ_HERO.h1}
            </h1>
            <p className="mt-[16px] w-full text-center font-roboto text-[15px] leading-[1.5] text-white/70 lg:mt-[20px] lg:text-left lg:text-[18px] lg:leading-[27px] lg:text-balance">
              {FAQ_HERO.lead}
            </p>
          </Box>
        </div>

        {FAQ_GROUPS.map((g, i) => (
          <section
            key={g.id}
            id={g.id}
            data-figma="6392:1531"
            /* scroll-margin so a link to #batteries does not land the heading
               under the header on the way in. */
            /* MOBILE — 6638:9805 and its three siblings: px20 / py48 and a flat
               20px rhythm through the eyebrow, heading, lead and list. The
               eyebrow pill sits on the left margin while the heading and lead
               are centred, which is how 6638:9806..9809 are drawn. */
            className={`scroll-mt-[120px] px-[20px] py-[48px] lg:px-0 lg:py-[90px] ${i % 2 === 0 ? 'bg-white' : 'bg-[#f4f9f6]'}`}
          >
            <div className="mx-auto flex w-full flex-col items-start gap-[20px] lg:w-[900px] lg:items-center lg:gap-[44px]">
              <div className="flex w-full flex-col items-center gap-[20px] lg:w-[780px] lg:items-center lg:gap-[10px] lg:text-center">
                {/* Wraps below lg — "COMPLIANCE, CERTIFICATIONS & RESPONSIBLE
                    RECYCLING" is ~370px at this size and was cut off at the
                    edge of a 390px screen. Same treatment as the shared
                    Eyebrow in ui/Bits.tsx. */}
                <span className="inline-flex min-h-[34px] items-center justify-center rounded-full bg-accent-soft px-[20px] py-[7px] text-center font-roboto text-[11px] font-bold uppercase leading-[16.5px] tracking-[0.89px] text-accent lg:h-[34px] lg:py-0 lg:whitespace-nowrap">
                  {g.eyebrow}
                </span>
                <h2 className="w-full text-center font-sans text-[26px] font-semibold leading-[1.3] text-black lg:w-[780px] lg:text-[36px] lg:leading-[1.2]">
                  {g.heading}
                </h2>
                <p className="w-full text-center font-roboto text-[15px] leading-[1.2] text-muted lg:w-[780px] lg:text-[16px] lg:leading-[1.5]">{g.lead}</p>
              </div>

              <Accordion items={g.items} gap={15} variant="ring" idPrefix={g.id} />
            </div>
          </section>
        ))}
      </main>

      {/* Footer is built for the pinned canvas — a Box at an absolute y — so it
          needs a relative parent of exactly FOOTER_H to sit in the flow. Same
          fix as blocks/ArticleTemplate.tsx. */}
      <div
        className="relative lg:h-[var(--footer-h)]"
        style={{ '--footer-h': `${FOOTER_H}px` } as React.CSSProperties}
      >
        <Footer top={0} />
      </div>

      {/*
        FAQPage schema over all 114 questions.

        Google removed FAQ rich results from Search on 7 May 2026 and deleted
        the documentation on 15 June 2026, so this earns no stars in a SERP and
        the Rich Results Test will not report it — CLAUDE.md says as much. It is
        emitted anyway because it is an accurate description of what the page
        contains, and the answer engines that now read this site parse it.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: graph(
            breadcrumbNode([
              { name: 'Home', url: absolute('/') },
              { name: 'FAQs', url: absolute('/faqs/') },
            ]),
            faqNode(ALL_FAQS),
          ),
        }}
      />
    </FlowCanvas>
  )
}
