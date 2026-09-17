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
import { ALL_FAQS, FAQ_GROUPS, FAQ_HERO, FAQ_INTRO, FAQ_SEO } from '@/data/faqs'

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
        <div data-figma="6478:5152" className="relative h-[470px] overflow-hidden bg-navy">
          <InteriorHeroArt />
          <Box x={319} y={139} w={504} h={192}>
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-[13px] font-roboto text-[11.011px] font-bold uppercase leading-[16.517px] tracking-[0.8909px]">
                <li><Link href={href('/')} className="text-white/50 hover:text-white">Home</Link></li>
                <li aria-hidden="true" className="text-white/50">/</li>
                <li className="text-white">FAQs</li>
              </ol>
            </nav>
            <h1 className="mt-[21px] font-sans text-[60px] font-semibold leading-[74.7px] text-white">
              {FAQ_HERO.h1}
            </h1>
            <p className="mt-[19px] w-[504px] font-roboto text-[20px] leading-[30.031px] text-white/70">
              {FAQ_HERO.lead}
            </p>
          </Box>
        </div>

        {/* The page's own heading, above the first group. The frame gives each
            group a heading block but no page-level one; the content document
            opens with this, and a page of seventeen accordions with no sentence
            at the top reads as a wall. */}
        <section className="bg-white pb-[10px] pt-[90px]">
          <div className="mx-auto flex w-[900px] flex-col items-center gap-[14px] text-center">
            <h2 className="font-sans text-[40px] font-semibold leading-[1.25] text-black">
              {FAQ_INTRO.heading}
            </h2>
            <p className="font-roboto text-[17px] leading-[27px] text-muted">{FAQ_INTRO.lead}</p>
          </div>
        </section>

        {FAQ_GROUPS.map((g, i) => (
          <section
            key={g.id}
            id={g.id}
            data-figma="6392:1531"
            /* scroll-margin so a link to #batteries does not land the heading
               under the header on the way in. */
            className={`scroll-mt-[120px] py-[90px] ${i % 2 === 0 ? 'bg-white' : 'bg-[#f4f9f6]'}`}
          >
            <div className="mx-auto flex w-[900px] flex-col items-center gap-[44px]">
              <div className="flex w-[780px] flex-col items-center gap-[10px] text-center">
                <span className="inline-flex h-[34px] items-center whitespace-nowrap rounded-full bg-accent-soft px-[20px] font-roboto text-[11px] font-bold uppercase tracking-[0.89px] text-accent">
                  {g.eyebrow}
                </span>
                <h2 className="w-[780px] font-sans text-[36px] font-semibold leading-[1.2] text-black">
                  {g.heading}
                </h2>
                <p className="w-[780px] font-roboto text-[16px] leading-[1.5] text-muted">{g.lead}</p>
              </div>

              <Accordion items={g.items} gap={15} variant="ring" idPrefix={g.id} />
            </div>
          </section>
        ))}
      </main>

      {/* Footer is built for the pinned canvas — a Box at an absolute y — so it
          needs a relative parent of exactly FOOTER_H to sit in the flow. Same
          fix as blocks/ArticleTemplate.tsx. */}
      <div className="relative" style={{ height: FOOTER_H }}>
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
