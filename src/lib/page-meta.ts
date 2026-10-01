import 'server-only'
import type { Metadata } from 'next'
import { buildMetadata, type SeoInput } from '@/lib/seo'
import { content } from '@/lib/page-content'
import { SEO_OWNER, type PageMeta } from '@/content/registry'

/**
 * A page's metadata with the title and description from Admin -> Pages laid
 * over it (1 Oct 2026). Every route's `generateMetadata` calls this rather
 * than buildMetadata, so a page whose document has a META entry for its URL
 * (src/content/registry.ts, SEO_OWNER) takes the edited words; every other
 * page is exactly as buildMetadata makes it.
 *
 * Read through content(), so the same rules hold as for the page's copy:
 * the published words for visitors, the draft in the admin's preview, and
 * the page stays static (it is rebuilt when someone publishes).
 */
export async function pageMetadata(raw: SeoInput): Promise<Metadata> {
  return buildMetadata(raw, await editedMeta(raw.url))
}

export async function editedMeta(url: string): Promise<PageMeta | null> {
  const owner = SEO_OWNER[url]
  if (!owner) return null
  const doc = (await content(owner)) as { META?: PageMeta[] }
  return doc.META?.find((m) => m.url === url) ?? null
}
