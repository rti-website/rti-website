/**
 * Two fixes to a blog post's body HTML at read time (1 Oct 2026, management,
 * from the SEO audit). Applied in src/lib/posts-db.ts beside fixLegacyUrls(),
 * so every post is fixed without touching the stored rows, and a post saved
 * later from the editor gets the same treatment.
 *
 *  1. ONE H1 PER POST. The page template prints the post's title as the H1;
 *     WordPress posts also carry headings set as <h1> in the body (6 to 8 on
 *     some, e.g. /benefits-of-recycling-e-waste/). Those become <h2>, which is
 *     what they are: section headings under the title. Classes and the rest
 *     of the tag stay.
 *
 *  2. NO NOFOLLOW ON OUR OWN LINKS. Imported posts link to the site's own
 *     pages with rel="noreferrer noopener nofollow", which tells Google not
 *     to pass anything through internal links. `nofollow` is taken off links
 *     to this site (relative, or recycletechnologies.com); links to other
 *     sites keep whatever they had.
 *
 *  3. NO IMAGES THAT EXIST NOWHERE (1 Oct 2026, SEO crawl of 29 Sep). 69
 *     pictures the posts point at are gone for good: not in the WordPress
 *     uploads backup, not in its media library, not in the Wayback Machine,
 *     and WordPress itself logged them as 404 since July 2024. Visitors saw a
 *     broken picture on the old site too. The <img> is dropped, along with a
 *     link that only wraps it (those link to the same missing file) and a
 *     <figure> left empty. The list is data/dead-legacy-images.json.
 */
import DEAD from '../../data/dead-legacy-images.json'

const OWN_HREF = /^(?:\/(?!\/)|#|https?:\/\/(?:[a-z0-9-]+\.)*recycletechnologies\.com(?:[/?#]|$))/i

const DEAD_IMAGES = new Set<string>(DEAD.paths)

/** True when an <img> tag's src is one of the missing WordPress files. */
function deadImage(img: string): boolean {
  const src = /\ssrc\s*=\s*(["'])(.*?)\1/i.exec(img)?.[2] ?? ''
  const m = /\/wp-content\/uploads\/([^"'?#\s]+)/i.exec(src)
  if (!m?.[1]) return false
  let p = m[1]
  try { p = decodeURI(p) } catch { /* keep as written */ }
  return DEAD_IMAGES.has(p)
}

export function tidyPostHtml(html: string): string {
  if (!html) return html
  return html
    .replace(/<a\b[^>]*>\s*(<img\b[^>]*>)\s*<\/a>/gi, (whole, img: string) => (deadImage(img) ? '' : whole))
    .replace(/<img\b[^>]*>/gi, (img) => (deadImage(img) ? '' : img))
    .replace(/<figure\b[^>]*>\s*<\/figure>/gi, '')
    .replace(/<(\/?)h1(?=[\s>])/gi, '<$1h2')
    .replace(/<a\b[^>]*>/gi, (tag) => {
      if (!/\bnofollow\b/i.test(tag)) return tag
      const href = /\shref\s*=\s*(["'])(.*?)\1/i.exec(tag)?.[2]?.trim() ?? ''
      if (!OWN_HREF.test(href)) return tag
      return tag.replace(/\srel\s*=\s*(["'])(.*?)\1/i, (_m, q: string, rel: string) => {
        const kept = rel.split(/\s+/).filter((t) => t && t.toLowerCase() !== 'nofollow')
        return kept.length ? ` rel=${q}${kept.join(' ')}${q}` : ''
      })
    })
}
