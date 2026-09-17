import { CategoryArchive } from '@/components/blocks/CategoryArchive'
import { buildMetadata } from '@/lib/seo'
import { dbCategories, liveDbCategories } from '@/lib/posts-db'

/**
 * /category/<slug>/ — page 1 of a WordPress category archive.
 *
 * Everything it draws lives in components/blocks/CategoryArchive.tsx, which
 * /category/<slug>/page/<n>/ renders too, so the two cannot drift.
 */

export const dynamicParams = true

export async function generateStaticParams() {
  return (await liveDbCategories()).map((c) => ({ slug: c.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const cat = (await dbCategories()).find((c) => c.slug === slug && c.source === 'wordpress')
  if (!cat) return {}
  return buildMetadata({
    url: `/category/${cat.slug}/`,
    title: `${cat.name} | Recycle Technologies`,
    description: cat.description
      ?? `Articles on ${cat.name.toLowerCase()} from Recycle Technologies.`,
  })
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  return <CategoryArchive slug={slug} page={1} />
}
