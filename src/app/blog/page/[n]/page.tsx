import { notFound } from 'next/navigation'
import { Canvas } from '@/components/design/Frame'
import { FOOTER_H } from '@/lib/layout'
import { buildMetadata } from '@/lib/seo'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import { BlogArticles, blogListHeight } from '@/components/sections/blog/BlogArticles'
import { BlogNewsletter } from '@/components/sections/blog/BlogNewsletter'
import { blogCards, blogChips, blogPagePath, pageCount, pageNumberParam, pageSlice } from '@/lib/blog-index'
import { HERO, INTRO } from '@/data/blog'

/**
 * /blog/page/2/ and beyond — the same frame as /blog/, a different slice.
 *
 * !! THE FOLDER IS LITERALLY NAMED `page`. `app/blog/page.tsx` is the index
 * route and `app/blog/page/[n]/page.tsx` is this one; Next tells the special
 * file apart from a directory of the same name, so the two coexist. It looks
 * like a mistake and is not — the URL shape is WordPress's, kept because
 * data/url-map.csv 301s /page/2/ to /blog/page/2/ and verify-redirects.mjs
 * fails the build if that destination does not return 200.
 *
 * Page 1 deliberately has no route here. /blog/page/1/ would be a second URL
 * for the same twelve cards, which is the duplicate-content problem a
 * replatform is supposed to avoid, so it 404s and blogPagePath() never emits it.
 */

const H = { news: 357 }
const HERO_TOP = 140
const HERO_H = 470
const LIST_TOP = HERO_TOP + HERO_H

type Props = { params: Promise<{ n: string }> }

export const dynamicParams = true

export async function generateStaticParams() {
  const pages = pageCount((await blogCards()).length)
  return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({ n: String(i + 2) }))
}

export async function generateMetadata({ params }: Props) {
  const { n } = await params
  const page = pageNumberParam(n)
  if (page === null) return {}
  const pages = pageCount((await blogCards()).length)
  return buildMetadata({
    url: blogPagePath(page),
    /*
     * NOT `${LIVE_SEO.title} — Page N`, AND NOT `${LIVE_SEO.description} Page
     * N of M` EITHER, which is what the first pass at this wrote.
     *
     * Two things had to be true at once and the obvious version got one of
     * them. Every page of the set used to send a byte-identical title stem and
     * a byte-identical description, so twenty-six URLs read as twenty-six
     * copies of one page to a crawler that weighs head tags before body text —
     * that is what the page number fixes. But the live title is already 66
     * characters and the live description 157, so appending to them produced 77
     * and 172: both past the point a SERP truncates, on every page of the set.
     *
     * So page 1 — /blog/, the URL that actually ranks — keeps the live strings
     * verbatim under rule 6, and pages 2+ get their own short ones. These URLs
     * are new, so no rule 6 string is being touched here.
     */
    title: `Blog — Page ${page} of ${pages} | Recycle Technologies`,
    description:
      `Recycling and e-waste articles from Recycle Technologies — page ${page} of ${pages}.`,
  })
}

export default async function BlogArchivePage({ params }: Props) {
  const { n } = await params
  const page = pageNumberParam(n)
  if (page === null) notFound()

  const [all, chips] = await Promise.all([blogCards(), blogChips()])
  const pages = pageCount(all.length)
  if (page > pages) notFound()

  const posts = pageSlice(all, page)
  const listH = blogListHeight(posts.length, pages > 1)
  const NEWS_TOP = LIST_TOP + listH
  const FOOTER_TOP = NEWS_TOP + H.news

  return (
    <Canvas height={Math.round(FOOTER_TOP + FOOTER_H)}>
      <Header />
      <main>
        <ServiceHero
          label="6382:5543" crumbs={HERO.crumbs} h1={HERO.h1} lead={HERO.lead}
          image="/images/pages/hero-blog.png"
        />
        <BlogArticles
          top={LIST_TOP} height={listH}
          posts={posts} chips={chips}
          page={page} pages={pages} pathFor={blogPagePath}
          heading={`${INTRO.heading} — Page ${page}`}
        />
        <BlogNewsletter top={NEWS_TOP} height={H.news} />
      </main>
      <Footer top={FOOTER_TOP} />
    </Canvas>
  )
}
