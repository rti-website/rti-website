import { notFound } from 'next/navigation'
import { allContent, byUrl, toSegments } from '@/lib/content'
import { allDbPosts, dbPostBySlug } from '@/lib/posts-db'
import { ImportedArticle } from '@/components/blocks/ImportedArticle'
import { buildMetadata } from '@/lib/seo'
import { ArticleTemplate } from '@/components/blocks/ArticleTemplate'
import { LocationTemplate } from '@/components/blocks/LocationTemplate'
import { PageTemplate } from '@/components/blocks/PageTemplate'
import { ServiceTemplate } from '@/components/blocks/ServiceTemplate'

/**
 * Catch-all route driven by the content manifest.
 *
 * Why a catch-all rather than a folder per page: the current site has ~600 URLs
 * at arbitrary root-level paths — flat blog slugs like
 * /how-to-get-rid-of-a-microwave/ sitting beside deep location paths like
 * /minnesota-recycling/hennepin-county-recycling-center/bloomington-recycling-center/.
 * Hand-authoring a route folder per URL is how one quietly goes missing.
 *
 * Explicit routes (app/blog/page.tsx, app/quote/page.tsx, ...) take precedence
 * over this file, so hand-built pages stay hand-built.
 */

/**
 * !! THIS WAS `false` AND IS NOW `true`, DELIBERATELY. Read before changing it.
 *
 * `false` meant an undeclared URL 404s AT BUILD TIME. That was the right
 * setting while every page came from a file on disk: the manifest was complete
 * by definition, so anything outside it was a mistake.
 *
 * Posts now also come from the database, and a writer who publishes at 10am
 * cannot wait for a deploy to see their post. `true` lets a slug that was not in
 * the manifest at build time render on first request — which is what
 * revalidatePath in the publish endpoint has always assumed.
 *
 * The guarantee it used to provide is NOT lost, because the page below calls
 * notFound() for any slug that is in neither the manifest nor the database. An
 * unknown URL still 404s; it just does so on first request instead of at build.
 * `npm run verify:static` still asserts every declared URL is prerendered, and
 * that is what actually enforces "no KEEP URL goes missing".
 */
export const dynamicParams = true

export async function generateStaticParams() {
  // Two sources, one manifest: MDX on disk (derived from url-map.csv) and
  // published posts in the database (imported from WordPress, or written in the
  // Publisher). Both are prerendered; neither is fetched at request time.
  const fromFiles = allContent().map((entry) => ({ slug: toSegments(entry.url) }))
  const fromDb = (await allDbPosts()).map((post) => ({ slug: [post.slug] }))

  // A post whose slug collides with an MDX page loses: the file is the one a
  // person deliberately built, and duplicate params make Next build the same
  // route twice.
  const taken = new Set(fromFiles.map((e) => e.slug.join('/')))
  return [...fromFiles, ...fromDb.filter((e) => !taken.has(e.slug.join('/')))]
}

type Props = { params: Promise<{ slug: string[] }> }

// Next 16: params is a Promise. Synchronous access was removed in v16.
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const entry = byUrl('/' + slug.join('/'))
  if (entry) {
    return buildMetadata({
      url: entry.url,
      title: entry.title,
      description: entry.description,
      image: entry.image,
      publishedTime: entry.date,
      modifiedTime: entry.updated,
    })
  }

  const post = slug.length === 1 && slug[0] ? await dbPostBySlug(slug[0]) : null
  if (!post) return {}
  return buildMetadata({
    url: post.url,
    // These came off the live page at import, so the title and description a
    // migrated post ships with are the ones Google already has.
    title: post.title,
    description: post.description,
    image: post.image,
    publishedTime: post.date,
    modifiedTime: post.updated,
    canonicalOverride: post.canonical ?? undefined,
    noindex: post.noindex,
    category: post.category,
    tracking: post.tracking,
  })
}

export default async function CatchAllPage({ params }: Props) {
  const { slug } = await params
  const entry = byUrl('/' + slug.join('/'))

  if (!entry) {
    // Not a file — try the database before giving up. This is what keeps an
    // unknown URL a real 404 even though dynamicParams is now true.
    const post = slug.length === 1 && slug[0] ? await dbPostBySlug(slug[0]) : null
    if (!post) notFound()
    return <ImportedArticle post={post} />
  }

  // Static prefix is required for a dynamic import to be analysable.
  const { default: Body } = await import(`~/content/${entry.rel}`)

  switch (entry.type) {
    case 'service':
      return (
        <ServiceTemplate entry={entry}>
          <Body />
        </ServiceTemplate>
      )
    case 'location':
      return (
        <LocationTemplate entry={entry}>
          <Body />
        </LocationTemplate>
      )
    case 'post':
      return (
        <ArticleTemplate entry={entry}>
          <Body />
        </ArticleTemplate>
      )
    default:
      return (
        <PageTemplate entry={entry}>
          <Body />
        </PageTemplate>
      )
  }
}
