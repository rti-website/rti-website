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
 *
 *  4. NO INTERNAL LINKS THAT REDIRECT (9 Oct 2026, SEO sheet "Technical
 *     Fixes 09/10/26", Redirects tab: 187 links in posts pointed at URLs that
 *     301). A link to this site whose path is a redirect in data/redirects.json
 *     (or data/case-redirects.json) points straight at the destination; a
 *     path without its trailing slash gets one first ("/i" -> "/i/"), as the
 *     server would. Query and #hash are kept. Applies to every post, so a
 *     redirect added later is followed too.
 *
 *  5. NO PAGE BUILDER CODE (same sheet, Other Fixes): Divi's [et_pb_...]
 *     shortcodes left in /better-recycling/ and
 *     /five-every-day-items-to-recycle/ were printed as text. They are
 *     removed; an [et_pb_image src=... alt=...] becomes the <img> it stood for.
 */
import DEAD from '../../data/dead-legacy-images.json'
import REDIRECTS from '../../data/redirects.json'
import CASE_REDIRECTS from '../../data/case-redirects.json'

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

/* ---------------------------------------------------------- 4. redirects -- */

const REDIRECT_TO = new Map<string, string>()
for (const r of REDIRECTS as { source: string; destination: string }[]) REDIRECT_TO.set(r.source.toLowerCase(), r.destination)
const CASE_TO = new Map<string, string>((CASE_REDIRECTS as { source: string; destination: string }[]).map((r) => [r.source, r.destination]))

const OWN_ABS = /^https?:\/\/(?:[a-z0-9-]+\.)*recycletechnologies\.com(?=[/?#]|$)/i

/** Where a path ends up after the site's redirects, or null when it does not redirect. */
function finalPath(path: string): string | null {
  let p = path
  // The server adds the trailing slash to a page path ("/i" -> "/i/"); a file keeps its extension.
  const slashed = (x: string) => (x.endsWith('/') || /\.[a-z0-9]{2,5}$/i.test(x) ? x : `${x}/`)
  let moved = false
  for (let hop = 0; hop < 5; hop++) {
    const next = CASE_TO.get(p) ?? REDIRECT_TO.get(p.toLowerCase()) ?? REDIRECT_TO.get(slashed(p).toLowerCase())
    if (next && next !== p) { p = next; moved = true; continue }
    if (!moved && slashed(p) !== p) { p = slashed(p); moved = true }
    break
  }
  return moved ? p : null
}

function followRedirects(href: string): string {
  const abs = OWN_ABS.exec(href)
  const rest = abs ? href.slice(abs[0].length) || '/' : href
  if (!rest.startsWith('/') || rest.startsWith('//')) return href
  const m = /^([^?#]*)(.*)$/.exec(rest)!
  const to = finalPath(m[1]!)
  return to ? `${to}${m[2]}` : href
}

/* ------------------------------------------------------------- 5. et_pb -- */

const SHORTCODE = /\[\/?et_pb_[a-z_]*(?:[^\]"]|"[^"]*")*\]/gi
const attr = (code: string, name: string) => new RegExp(`\\b${name}=\\\\?"(.*?)\\\\?"`, 'i').exec(code)?.[1] ?? ''

function stripPageBuilder(html: string): string {
  if (!/\[\/?et_pb_/i.test(html)) return html
  // Inside a <script> (the posts' JSON-LD) the shortcodes are just removed:
  // nothing there is shown, and markup would break the JSON.
  const scripts: string[] = []
  const out = html.replace(/<script\b[\s\S]*?<\/script>/gi, (sc) => {
    scripts.push(sc.replace(/\[\/?et_pb_[a-z_]*(?:[^\]"\\]|\\"(?:[^"\\]|\\.)*?\\"|"[^"]*")*\]/gi, ''))
    return `\u0000${scripts.length - 1}\u0000`
  })
    .replace(SHORTCODE, (code) => {
      if (!/^\[et_pb_image\b/i.test(code)) return ''
      const src = attr(code, 'src')
      if (!src) return ''
      const alt = attr(code, 'alt').replace(/"/g, '&quot;')
      return `<img src="${src}" alt="${alt}" loading="lazy" />`
    })
    .replace(/<p>(?:\s|&nbsp;|\u00a0)*<\/p>/gi, '')
  return out.replace(/\u0000(\d+)\u0000/g, (_m, i: string) => scripts[Number(i)]!)
}

export function tidyPostHtml(html: string): string {
  if (!html) return html
  return stripPageBuilder(html)
    .replace(/<a\b[^>]*>\s*(<img\b[^>]*>)\s*<\/a>/gi, (whole, img: string) => (deadImage(img) ? '' : whole))
    .replace(/<img\b[^>]*>/gi, (img) => (deadImage(img) ? '' : img))
    .replace(/<figure\b[^>]*>\s*<\/figure>/gi, '')
    .replace(/<(\/?)h1(?=[\s>])/gi, '<$1h2')
    // 4. links that redirect point at their destination.
    .replace(/(<a\b[^>]*?\shref\s*=\s*)(["'])(.*?)\2/gi, (_m, pre: string, q: string, h: string) => `${pre}${q}${followRedirects(h.trim())}${q}`)
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
