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
        <div className="relative h-[380px] overflow-hidden bg-navy">
          <InteriorHeroArt />
          <Box x={319} y={104} w={871} h={180}>
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-[13px] font-roboto text-[11.011px] font-bold uppercase leading-[16.517px] tracking-[0.8909px]">
                <li><Link href={href('/')} className="text-white/50 hover:text-white">Home</Link></li>
                <li aria-hidden="true" className="text-white/50">/</li>
                <li><Link href={href('/blog/')} className="text-white/50 hover:text-white">Blogs</Link></li>
              </ol>
            </nav>
            <h1 className="mt-[21px] font-sans text-[48px] font-semibold leading-[1.2] tracking-[-1.1px] text-white">
              {cat.name}
            </h1>
            <p className="mt-[14px] font-roboto text-[15px] leading-[22px] text-white/70">
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
        <div className="bg-white py-[70px]">
          <div className="mx-auto flex w-[1282px] flex-col items-center gap-[44px]">
            <CategoryChips chips={chips} active={cat.slug} />
            <div className="grid w-[1278px] auto-rows-[221px] grid-cols-3 gap-[24px]">
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
      <div className="relative" style={{ height: FOOTER_H }}>
        <Footer top={0} />
      </div>
    </FlowCanvas>
  )
}
