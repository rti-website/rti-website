import type { ContentEntry } from '@/lib/content'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { FlowCanvas } from '@/components/design/Frame'
import { InteriorHeroArt } from '@/components/ui/InteriorHeroArt'
import { FOOTER_H } from '@/lib/layout'

/**
 * Page template — plain content pages from content/pages/*.mdx. Today that is
 * one page, /thank-you/, where the contact forms land.
 *
 * Rules for every template in this folder:
 *  - The H1 comes from entry.h1, ported verbatim from url-map.csv. Never
 *    hardcode or rewrite it — the staging crawl diffs H1s against baseline.
 *  - No 'use client'. Templates are server components. Interactive widgets live
 *    in src/components/client/ and are imported as islands.
 *  - Internal links use href() from lib/urls, never a raw string.
 *
 * SITE CHROME SINCE 23 Sep 2026. This was the Phase 1 scaffold — a bare <h1>
 * and the MDX body, no header, no footer, no styling — and /thank-you/ was the
 * one page on the site without the footer. Found by the footer audit when Asim
 * asked for "same footer in all pages". It now wears the same chrome as the
 * 404 page (src/app/not-found.tsx): header, a navy interior hero carrying the
 * H1, the body in a readable column, the footer. There is no Figma frame for
 * it, so it sits in normal flow on a FlowCanvas like /faqs/ and the posts.
 */
export function PageTemplate({
  entry,
  children,
}: {
  entry: ContentEntry
  children: React.ReactNode
}) {
  return (
    <FlowCanvas>
      <Header />
      <main>
        <div className="relative overflow-hidden bg-navy py-[48px] lg:h-[380px] lg:py-0">
          <InteriorHeroArt />
          <div className="relative flex h-full flex-col justify-center px-[20px] lg:px-[319px]">
            <h1 className="font-sans text-[32px] font-semibold leading-[40px] text-white lg:text-[60px] lg:leading-[74.7px]">
              {entry.h1}
            </h1>
          </div>
        </div>

        <section className="bg-white px-[20px] py-[48px] lg:px-0 lg:py-[90px]">
          <article className="mx-auto flex w-full flex-col gap-[16px] font-roboto text-[16px] leading-[26px] text-muted lg:w-[820px] lg:text-[18px] lg:leading-[30px] [&_a]:text-brand [&_a]:underline [&_strong]:font-medium [&_strong]:text-ink">
            {children}
          </article>
        </section>
      </main>

      {/* lg-only height, as on the 404 page: below lg the footer is an ordinary
          block about twice FOOTER_H tall. */}
      <div className="relative lg:h-[var(--footer-h)]" style={{ '--footer-h': `${FOOTER_H}px` } as React.CSSProperties}>
        <Footer top={0} />
      </div>
    </FlowCanvas>
  )
}
