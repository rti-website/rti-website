import { renderToHTMLString } from '@tiptap/static-renderer/pm/html-string'
import { EDITOR_EXTENSIONS } from '@/lib/editor-extensions'
import { slugify } from '@/lib/slug'

export type TocEntry = { id: string; level: number; text: string }
export type PostJSON = { type: string; content?: unknown[] }

/**
 * Everything derived from a post's body, computed once when it is saved.
 *
 * The stored JSON is the source of truth — it is what survives changing editor
 * and what a schema migration can be written against. The HTML beside it exists
 * so the public page can be prerendered by reading one column, with no renderer
 * and no sanitiser in the request path.
 *
 * `renderToHTMLString` runs with no DOM, which is what makes that work inside a
 * server component at build time.
 */
export function deriveContent(json: PostJSON) {
  const html = renderToHTMLString({
    content: json as never,
    extensions: EDITOR_EXTENSIONS as never,
  })

  const text = html.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ')
  const words = text.trim().split(/\s+/).filter(Boolean).length

  return {
    html: addHeadingIds(html),
    toc: tableOfContents(html),
    wordCount: words,
    // 225 wpm is the usual figure for adult non-fiction reading.
    readingMinutes: Math.max(1, Math.round(words / 225)),
  }
}

/** "Why These Symbols Matter" -> "why-these-symbols-matter" */
export { slugify }

/**
 * !! THE PUBLIC PAGE AND THE EDITOR'S OUTLINE MUST AGREE ON THESE IDS, or every
 * link in the published table of contents points at nothing. Both go through
 * this one function.
 */
function headingIds(html: string): Map<string, string> {
  const ids = new Map<string, string>()
  const seen = new Set<string>()
  const re = /<h([234])[^>]*>([\s\S]*?)<\/h\1>/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html))) {
    const inner = m[2] ?? ''
    const text = inner.replace(/<[^>]+>/g, '').trim()
    const base = slugify(text) || 'section'
    let id = base
    let n = 2
    while (seen.has(id)) id = `${base}-${n++}`
    seen.add(id)
    ids.set(m[0], id)
  }
  return ids
}

function addHeadingIds(html: string): string {
  let out = html
  for (const [tag, id] of headingIds(html)) {
    const withId = tag.replace(/^<h([234])/i, `<h$1 id="${id}"`)
    out = out.replace(tag, withId)
  }
  return out
}

function tableOfContents(html: string): TocEntry[] {
  const out: TocEntry[] = []
  for (const [tag, id] of headingIds(html)) {
    const level = Number(tag.match(/^<h([234])/i)?.[1] ?? 2)
    const text = tag.replace(/<[^>]+>/g, '').trim()
    out.push({ id, level, text })
  }
  return out
}
