import type { Metadata } from 'next'
import { SITE } from './site'
import { absolute, path } from './urls'

/**
 * Every page's metadata is produced here. No page writes a `metadata` export
 * by hand — that is how a template quietly ships without a canonical.
 *
 * Titles and descriptions are ported VERBATIM from url-map.csv at launch.
 * Rewriting them is second-wave work (see the migration plan, section 8).
 */
export type SeoInput = {
  /** Site-relative path, e.g. '/it-asset-disposition/' */
  url: string
  /** Exact <title> from url-map.csv. Not templated, not suffixed. */
  title: string
  description: string
  /** Only for blog posts. */
  publishedTime?: string
  modifiedTime?: string
  /** Site-relative or absolute image URL. */
  image?: string
  /** Set true only for pages that must stay out of the index. */
  noindex?: boolean
  /**
   * Overrides the self-referencing canonical, and only ever points OUTWARD.
   *
   * A page is its own canonical unless it is a copy of one that lives somewhere
   * else — a piece syndicated to a partner, or a near-duplicate that should
   * credit one original. Imported WordPress posts carry whatever Rank Math had
   * on the live page, so a canonical that was already set stays set and the
   * ranking does not move. Everything else keeps the self-reference, which is
   * what rule 3 is about.
   */
  canonicalOverride?: string
}

export function buildMetadata(input: SeoInput): Metadata {
  const canonical = input.canonicalOverride
    ? absolute(input.canonicalOverride)
    : absolute(input.url)
  const image = input.image ? absolute(input.image) : `${SITE.origin}/og-default.png`
  // Staging sets NEXT_PUBLIC_NOINDEX=true. The production build refuses to run
  // with it set — see scripts/check-static.mjs and the CI workflow.
  const blocked = SITE.noindex || input.noindex === true

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical },
    robots: blocked
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: input.publishedTime ? 'article' : 'website',
      url: canonical,
      siteName: SITE.name,
      title: input.title,
      description: input.description,
      images: [{ url: image }],
      ...(input.publishedTime ? {
        publishedTime: input.publishedTime,
        modifiedTime: input.modifiedTime ?? input.publishedTime,
      } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [image],
    },
  }
}

/** Helper for sitemap entries so the slash rule is applied there too. */
export function sitemapEntry(url: string, lastModified?: string) {
  return { url: absolute(path(url)), lastModified }
}
