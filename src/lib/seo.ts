import type { Metadata } from 'next'
import { SITE } from './site'
import { absolute, path } from './urls'
import { PAGE_SEO } from '@/data/page-seo'
import { pageContextMeta } from './page-context'

/**
 * Every page's metadata is produced here. No page writes a `metadata` export
 * by hand — that is how a template quietly ships without a canonical.
 *
 * Titles and descriptions are ported VERBATIM from url-map.csv at launch —
 * EXCEPT the pages in src/data/page-seo.ts, where the SEO sheet Asim approved
 * on 23 Sep 2026 replaces them (and adds a focus keyword). That lookup is by
 * the page's URL and happens here, so no page file has to change and a page
 * missing from the sheet simply keeps its old title.
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
  /** A post's blog category — its page_category in the dataLayer. */
  category?: string
  /**
   * The post editor's "SEO & Tracking" switches (db/006). Written as
   * <meta name="rti:…"> tags the tracking bootstrap reads; no script goes into
   * the page for them. See src/lib/tracking.ts.
   */
  tracking?: {
    disabled?: boolean
    excluded?: boolean
    /** Extra keys for this page's page_view_custom push. */
    dataLayer?: Record<string, unknown> | null
    trackingId?: string | null
  }
}

export function buildMetadata(raw: SeoInput): Metadata {
  const sheet = PAGE_SEO[raw.url]
  const input: SeoInput = sheet ? { ...raw, title: sheet.title, description: sheet.description } : raw
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
    ...(sheet ? { keywords: [sheet.focusKeyword] } : {}),
    // Page context and tracking switches for the dataLayer (src/lib/tracking.ts).
    other: trackingMeta(input),
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

function trackingMeta(input: SeoInput): Record<string, string> {
  const out = pageContextMeta({
    url: input.url, title: input.title, isPost: Boolean(input.publishedTime), category: input.category,
  })
  const t = input.tracking
  if (t?.disabled) out['rti:tracking'] = 'off'
  if (t?.excluded) out['rti:analytics'] = 'exclude'
  if (t?.trackingId) out['rti:tracking-id'] = t.trackingId
  if (t?.dataLayer && typeof t.dataLayer === 'object' && Object.keys(t.dataLayer).length) {
    out['rti:datalayer'] = JSON.stringify(t.dataLayer)
  }
  return out
}
