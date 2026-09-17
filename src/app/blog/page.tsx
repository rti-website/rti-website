import { Canvas } from '@/components/design/Frame'
import { FOOTER_H } from '@/lib/layout'
import { buildMetadata } from '@/lib/seo'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import { BlogArticles, blogListHeight } from '@/components/sections/blog/BlogArticles'
import { BlogNewsletter } from '@/components/sections/blog/BlogNewsletter'
import { blogCards, blogChips, blogPagePath, pageCount, pageSlice } from '@/lib/blog-index'
import { HERO, LIVE_SEO } from '@/data/blog'

/**
 * Blog index — a 1:1 build of Figma frame 6382:5541 at the live /blog/ URL.
 *
 *   Section        Node        Figma h    built h   why
 *   Header         —           140        140
 *   Hero           6382:5543   470        470
 *   Articles       6384:1225   1398       computed  the frame draws ten cards;
 *                                                   this lists twelve and a pager
 *   Newsletter     6384:1226   357        H.news
 *   Footer         6382:5671   681        681
 *
 * The articles band is the one section in this build whose height is added up
 * rather than measured — blogListHeight() in BlogArticles.tsx says why, and
 * reproduces the measured 1398 for the frame's own ten cards.
 *
 * H1 is "Blogs" on the live page and "Blogs" in the design — the first page in
 * this build with no H1 conflict to carry into gate 2.
 *
 * Pagination lives at /blog/page/N/. WordPress paginated this URL at /page/N/
 * and data/url-map.csv already 301s /page/2/ here.
 */
const H = { news: 357 }

const HERO_TOP = 140
const HERO_H = 470
const LIST_TOP = HERO_TOP + HERO_H

export const metadata = buildMetadata({
  url: '/blog/',
  title: LIVE_SEO.title,
  description: LIVE_SEO.description,
})

export default async function BlogPage() {
  const [all, chips] = await Promise.all([blogCards(), blogChips()])
  const pages = pageCount(all.length)
  const posts = pageSlice(all, 1)

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
          page={1} pages={pages} pathFor={blogPagePath}
        />
        <BlogNewsletter top={NEWS_TOP} height={H.news} />
      </main>
      <Footer top={FOOTER_TOP} />
    </Canvas>
  )
}
