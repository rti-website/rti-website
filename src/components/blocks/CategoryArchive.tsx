import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Box, FlowCanvas } from '@/components/design/Frame'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { InteriorHeroArt } from '@/components/ui/InteriorHeroArt'
import { PostCard } from '@/components/ui/PostCard'
import { CategoryChips } from '@/components/ui/CategoryChips'
import { Pager } from '@/components/ui/Pager'
import { FOOTER_H } from '@/lib/layout'
import { href } from '@/lib/urls'
import { dbCategories, dbPostsInCategory } from '@/lib/posts-db'
import { blogChips, categoryPagePath, pageCount, pageSlice } from '@/lib/blog-index'

/**
 * One page of a WordPress category archive.
 *
 * Shared by /category/<slug>/ and /category/<slug>/page/<n>/ so the two cannot
 * drift. Both routes are thin: resolve the page number, hand it here.
 *
 * !! /category/<slug>/ IS NOT A URL WE CHOSE — it is the one WordPress has been
 * serving for years, and six of them are indexed. Rule 6: a replatform changes
 * the technology and nothing else. The ten categories in the admin's Blogs menu
 * are a different, planned structure at /blog/<slug>/; when somebody decides to
 * merge the two, these paths need 301s and that is deliberate second-wave work.
 * Until then both exist and categories.archive_path says which is which.
 *
 * PAGINATED FOR THE SAME REASON /blog/ IS, and more sharply: /category/blog/
 * holds 252 of the 307 imported posts, and since 17 Sep 2026 it is the first
 * chip on /blog/ and the first row of the header's Blogs menu, so it is now one
 * click from every page on the site. Three hundred cards in one response is not
 * the "milliseconds" this build is being held to. WordPress paginated these
 * archives at /category/<slug>/page/<n>/ too, so the shape is its own.
 */
export async function CategoryArchive({ slug, page }: { slug: string; page: number }) {
  const cat = (await dbCategories()).find((c) => c.slug === slug && c.source === 'wordpress')
  if (!cat) notFound()

  const [all, chips] = await Promise.all([dbPostsInCategory(slug), blogChips()])
  // Only categories with posts get a page. An empty archive is a soft 404 —
  // a page Google indexes, ranks for nothing, and counts against the site.
  if (all.length === 0) notFound()

  const pages = pageCount(all.length)
  if (page > pages) notFound()
  const posts = pageSlice(all, page)

  return (
    <FlowCanvas>
      <Header />
      <main>
        {/*
          MOBILE. There is no frame for /category/<slug>/ — Aqeel's phone set
          covers /blog/ (6638:2235) and not the archives — so this follows the
          hero shape every other interior page got: navy, px20, one centred
          column, no breadcrumb, H1 at 32/1.2. Same reasoning as the cards
          below, which were always the blog index's on purpose.
        */}
        <div className="relative flex min-h-[276px] flex-col justify-center overflow-hidden bg-navy px-[20px] py-[48px] lg:block lg:h-[380px] lg:p-0">
          <InteriorHeroArt />
          <Box x={319} y={104} w={871} h={180} className="flex flex-col items-center lg:block">
            <nav aria-label="Breadcrumb" className="max-lg:hidden">
              <ol className="flex items-center gap-[13px] font-roboto text-[11.011px] font-bold uppercase leading-[16.517px] tracking-[0.8909px]">
                <li><Link href={href('/')} className="text-white/50 hover:text-white">Home</Link></li>
                <li aria-hidden="true" className="text-white/50">/</li>
                <li><Link href={href('/blog/')} className="text-white/50 hover:text-white">Blogs</Link></li>
              </ol>
            </nav>
            <h1 className="w-full text-center font-sans text-[32px] font-semibold leading-[1.2] text-white lg:mt-[21px] lg:w-auto lg:text-left lg:text-[48px] lg:tracking-[-1.1px]">
              {cat.name}
            </h1>
            <p className="mt-[16px] w-full text-center font-roboto text-[15px] leading-[22px] text-white/70 lg:mt-[14px] lg:w-auto lg:text-left">
              {all.length} article{all.length === 1 ? '' : 's'}
              {pages > 1 && ` · page ${page} of ${pages}`}
            </p>
          </Box>
        </div>

        {/* Box pins to absolute Figma coordinates, which a list of unknown
            length cannot use — so this band keeps the same 319px gutter by hand
            and flows. Same reasoning as FlowCanvas in ArticleTemplate.

            The cards and the chip row are the blog index's, deliberately: an
            archive is the same list of articles filtered, and drawing it in a
            second style made the chips look like they led somewhere else. One
            card, one set of numbers to diff against 6385:1225. */}
        <div className="bg-white px-[20px] py-[40px] lg:px-0 lg:py-[70px]">
          <div className="mx-auto flex w-full flex-col items-start gap-[20px] lg:w-[1282px] lg:items-center lg:gap-[44px]">
            <CategoryChips chips={chips} active={cat.slug} />
            {/* One column on a phone, 16 apart and free to size to their titles
                — 6638:8126, the same list /blog/ draws. */}
            <div className="flex w-full flex-col gap-[16px] lg:grid lg:w-[1278px] lg:auto-rows-[221px] lg:grid-cols-3 lg:gap-[24px]">
              {posts.map((p) => (
                <PostCard
                  key={p.slug}
                  post={{ url: p.url, title: p.h1, category: p.category, date: p.date }}
                />
              ))}
            </div>
            <Pager page={page} count={pages} pathFor={(n) => categoryPagePath(slug, n)} />
          </div>
        </div>
      </main>

      {/* Footer is built for the pinned canvas — it is a Box at an absolute y,
          and bare <Footer /> defaults that y to 1192, which printed the whole
          footer through the middle of the card grid. A relative parent of
          exactly FOOTER_H puts it back in the flow. Same fix as
          blocks/ArticleTemplate.tsx. */}
      <div
        className="relative lg:h-[var(--footer-h)]"
        style={{ '--footer-h': `${FOOTER_H}px` } as React.CSSProperties}
      >
        <Footer top={0} />
      </div>
    </FlowCanvas>
  )
}
