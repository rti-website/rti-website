import Link from 'next/link'
import { Box, FlowCanvas } from '@/components/design/Frame'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { InteriorHeroArt } from '@/components/ui/InteriorHeroArt'
import { Btn } from '@/components/ui/Bits'
import { ArticleBody } from '@/components/client/ArticleReader'
import { RelatedArticles } from '@/components/sections/blog/RelatedArticles'
import { FOOTER_H } from '@/lib/layout'
import { href } from '@/lib/urls'
import type { ContentEntry } from '@/lib/content'

/**
 * A blog post — Figma 6491:6032 "Blog Details" in RJFB6BtCpcCW1C3isO8809.
 *
 * Rules for every template in this folder:
 *  - The H1 comes from entry.h1, ported verbatim from url-map.csv. Never
 *    hardcode or rewrite it — the staging crawl diffs H1s against baseline.
 *  - No 'use client' here. Interactive widgets live in src/components/client/
 *    and are imported as islands; this page has exactly one, ArticleBody.
 *  - Internal links use href() from lib/urls, never a raw string.
 *
 * ! THIS PAGE IS THE ONE THAT DOES NOT USE `Canvas`. Every other page pins its
 * sections to absolute Figma coordinates, which works because the designer
 * decided how tall each one is. A post cannot — the body is as long as the
 * writer made it — so it uses FlowCanvas: same 1920 canvas, same zoom, same
 * gutter, but children in normal flow. The hero is still a fixed 470 Section
 * because that part IS fixed.
 *
 *   Section          Node        Figma h
 *   Header           —           140
 *   Hero             6491:6034   470
 *   Article body     6494:1749   3455 for the sample post; variable in truth
 *   Related articles 6494:1750   471
 *   Footer           6491:6190   681
 */
export function ArticleTemplate({
  entry,
  children,
}: {
  entry: ContentEntry
  children: React.ReactNode
}) {
  const meta = [entry.category, entry.date && formatDate(entry.date), entry.readingTime]
    .filter(Boolean)
    .join('  ·  ')

  return (
    <FlowCanvas>
      <Header />
      <main>
        {/* Hero — 6491:6034. Same art as every interior page; the text block is
            taller (240 not 192) because it carries the byline line under the
            headline. */}
        <div data-figma="6491:6034" className="relative h-[470px] overflow-hidden bg-navy">
          <InteriorHeroArt src={entry.heroImage} />
          <Box x={319} y={115} w={871} h={240}>
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-[13px] font-roboto text-[11.011px] font-bold uppercase leading-[16.517px] tracking-[0.8909px]">
                <li><Link href={href('/')} className="text-white/50 hover:text-white">Home</Link></li>
                <li aria-hidden="true" className="text-white/50">/</li>
                <li><Link href={href('/blog/')} className="text-white/50 hover:text-white">Blogs</Link></li>
              </ol>
            </nav>
            {/* 6491:6042 — 871 wide, two lines at 60/74. entry.h1 is the ported
                value; the frame's placeholder is the sample post's own title. */}
            <h1 className="mt-[21px] w-[871px] font-sans text-[54px] font-semibold leading-[1.22] tracking-[-1.2px] text-white">
              {entry.h1}
            </h1>
            {meta && (
              <p className="mt-[18px] font-roboto text-[15px] leading-[22px] text-white/70">{meta}</p>
            )}
          </Box>
        </div>

        {/* Article body — 6494:1749. The only client island on the page. */}
        <div className="bg-white" data-figma="6494:1749">
          <ArticleBody
            article={children}
            sidebar={
              <>
                {/* Ask Our Team — 6501:1772, the same diagonal gradient the old
                    GradientCta used before the closing band was unified. */}
                <div
                  className="flex w-[380px] flex-col gap-[14px] rounded-[12px] p-[32px]"
                  style={{ backgroundImage: 'linear-gradient(138.443deg, #0b1f3a 7.2464%, #1b7a3d 79.71%)' }}
                >
                  <p className="w-[316px] font-sans text-[20px] font-semibold text-white">Ask Our Team</p>
                  <p className="w-[316px] font-roboto text-[14.5px] leading-[1.55] text-white/85">
                    Not sure how to recycle something specific? Our ITAD &amp; e-waste specialists can help.
                  </p>
                  <Btn href={href('/contact-us/')} variant="whiteFill">Contact Us</Btn>
                </div>

                {/* Share This Guide — 6501:1778. Copy-link, Facebook, LinkedIn,
                    email. They are <a>s with real targets rather than buttons
                    that need JS, so the card works without hydration. */}
                <div className="flex w-[380px] flex-col gap-[14px] rounded-[12px] border border-[#e5e5e5] bg-white px-[26px] py-[24px]">
                  <p className="font-sans text-[15px] font-medium text-[#132119]">Share This Guide</p>
                  <ul className="flex items-start gap-[10px]">
                    {SHARE.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href(entry.url)}
                          target={s.label === 'Email' ? undefined : '_blank'}
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="grid size-[38px] place-items-center rounded-full bg-[#eaf4f5] transition-colors hover:bg-[#dbeced]"
                        >
                          <svg viewBox="0 0 16 16" className="size-[16px] fill-brand" aria-hidden="true">
                            <path d={s.path} />
                          </svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            }
          />
        </div>

        <RelatedArticles current={entry.url} />
      </main>

      {/* The footer is absolutely positioned inside its own box, because Footer
          is built for the pinned canvas. Giving it a relative parent of exactly
          FOOTER_H puts it back into the flow without touching that component. */}
      <div className="relative" style={{ height: FOOTER_H }}>
        <Footer top={0} />
      </div>
    </FlowCanvas>
  )
}

/** "2024-12-24" -> "December 24, 2024", the format the frame prints. */
function formatDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
}

const SITE = 'https://www.recycletechnologies.com'

const SHARE = [
  {
    label: 'Copy link',
    href: (url: string) => `${SITE}${url}`,
    path: 'M6.9 9.1a3.4 3.4 0 0 0 5.1.4l2-2a3.4 3.4 0 0 0-4.8-4.8l-1.2 1.1a.8.8 0 0 0 1.1 1.2l1.2-1.2a1.8 1.8 0 0 1 2.5 2.6l-2 2a1.8 1.8 0 0 1-2.7-.2.8.8 0 0 0-1.2 1Zm2.2-2.2a3.4 3.4 0 0 0-5.1-.4l-2 2a3.4 3.4 0 0 0 4.8 4.8l1.2-1.1a.8.8 0 0 0-1.1-1.2l-1.2 1.2a1.8 1.8 0 0 1-2.5-2.6l2-2a1.8 1.8 0 0 1 2.7.2.8.8 0 0 0 1.2-1Z',
  },
  {
    label: 'Facebook',
    href: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE + url)}`,
    path: 'M10.4 8.6h-1.6v5.6H6.4V8.6H5.2V6.5h1.2V5.2c0-1.6.7-2.6 2.6-2.6h1.6v2.1H9.6c-.5 0-.8.2-.8.7v1.1h1.9l-.3 2.1Z',
  },
  {
    label: 'LinkedIn',
    href: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE + url)}`,
    path: 'M3.6 2.4a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4ZM2.6 5.9h2v7.7h-2V5.9Zm3.6 0h1.9v1.1h.1c.3-.5.9-1.2 2-1.2 2.1 0 2.5 1.4 2.5 3.2v4.6h-2V9.4c0-.9 0-2-1.2-2s-1.4.9-1.4 1.9v4.3h-2V5.9Z',
  },
  {
    label: 'Email',
    href: (url: string) => `mailto:?body=${encodeURIComponent(SITE + url)}`,
    path: 'M2 4.2c0-.6.5-1.1 1.1-1.1h9.8c.6 0 1.1.5 1.1 1.1v7.6c0 .6-.5 1.1-1.1 1.1H3.1c-.6 0-1.1-.5-1.1-1.1V4.2Zm1.6.5L8 8l4.4-3.3H3.6Zm8.8 1.4L8.4 9.2a.7.7 0 0 1-.8 0L3.6 6.1v5.3h8.8V6.1Z',
  },
]
