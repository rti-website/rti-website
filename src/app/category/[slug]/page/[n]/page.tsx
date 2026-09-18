import { notFound } from 'next/navigation'
import { CategoryArchive } from '@/components/blocks/CategoryArchive'
import { buildMetadata } from '@/lib/seo'
import { dbCategories, dbPostsInCategory, liveDbCategories } from '@/lib/posts-db'
import { categoryPagePath, pageCount, pageNumberParam } from '@/lib/blog-index'

/**
 * /category/<slug>/page/2/ and beyond.
 *
 * !! THE FOLDER IS LITERALLY NAMED `page`, inside [slug]. Next tells the
 * special `page.tsx` file apart from a directory of the same name, so
 * /category/[slug]/page.tsx and /category/[slug]/page/[n]/page.tsx coexist.
 * It looks like a mistake and is not — the URL shape is WordPress's own, the
 * same reason /blog/page/[n]/ is shaped that way.
 *
 * Page 1 has no route here: /category/x/page/1/ would be a second URL for the
 * list that already answers at /category/x/.
 */

export const dynamicParams = true

/**
 * Every real page of every category with posts. Six categories at twelve a page
 * is a couple of dozen routes — cheap, and it means the pager never links at
 * something rendered on demand.
 */
export async function generateStaticParams() {
  const cats = await liveDbCategories()
  const out: { slug: string; n: string }[] = []
  for (const c of cats) {
    const pages = pageCount((await dbPostsInCategory(c.slug)).length)
    for (let n = 2; n <= pages; n++) out.push({ slug: c.slug, n: String(n) })
  }
  return out
}

type Props = { params: Promise<{ slug: string; n: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug, n } = await params
  const page = pageNumberParam(n)
  const cat = (await dbCategories()).find((c) => c.slug === slug && c.source === 'wordpress')
  if (page === null || !cat) return {}
  const pages = pageCount((await dbPostsInCategory(cat.slug)).length)
  return buildMetadata({
    url: categoryPagePath(cat.slug, page),
    /* Same reasoning as /blog/page/[n]/: page 1 keeps the category's own
       description, and pages 2+ get a short one that names the page, so an
       archive of sixteen pages is not sixteen identical <head>s. Built here
       rather than appended to cat.description, which can be long enough on its
       own to push the result past a SERP's cut-off. */
    title: `${cat.name} — Page ${page} of ${pages} | Recycle Technologies`,
    description:
      `${cat.name} articles from Recycle Technologies — page ${page} of ${pages}.`,
  })
}

export default async function CategoryArchivePage({ params }: Props) {
  const { slug, n } = await params
  const page = pageNumberParam(n)
  if (page === null) notFound()
  return <CategoryArchive slug={slug} page={page} />
}
