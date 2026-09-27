import fs from 'node:fs'
import path from 'node:path'

/**
 * The plain content pages written as MDX files (content/pages/*.mdx: the
 * three legal pages and /thank-you/) as Admin -> Pages documents (Asim,
 * 27 Sep 2026: "add all the pages here ... we need all the things").
 *
 * A document is `{ BODY: string[] }`: the file's body split into its blocks
 * (a paragraph, a heading line, a list), each one Markdown, in order. The
 * editor shows one box per block, and blocks can be added, removed and
 * moved like any other list.
 *
 * WHAT RENDERS. While a page has no edits the site renders the MDX file
 * exactly as before. Once an edit is published (or previewed), the blocks
 * are rendered by src/components/ui/Markdown.tsx with the same components,
 * so a one word change shows as one word. See the catch-all route.
 *
 * Read from disk on first use, at build time and on the server; never in a
 * browser (the admin reads documents through /api/admin/pages/).
 */
export type MdxDoc = { BODY: string[] }

const cache = new Map<string, MdxDoc>()

export function mdxDoc(rel: string): () => MdxDoc {
  return () => {
    const hit = cache.get(rel)
    if (hit) return hit
    const src = fs.readFileSync(path.join(process.cwd(), 'content', rel), 'utf8')
    const doc = { BODY: splitBlocks(stripMdx(src)) }
    cache.set(rel, doc)
    return doc
  }
}

/** The body of an MDX page: without imports, the meta export and JSX comments. */
export function stripMdx(src: string): string {
  let s = src.replace(/^import .*$/gm, '')
  const start = s.indexOf('export const meta')
  if (start !== -1) {
    const open = s.indexOf('{', start)
    let depth = 0
    for (let i = open; i < s.length; i++) {
      if (s[i] === '{') depth++
      else if (s[i] === '}' && --depth === 0) { s = s.slice(0, start) + s.slice(i + 1); break }
    }
  }
  return s.replace(/\{\/\*[\s\S]*?\*\/\}/g, '').trim()
}

export const splitBlocks = (body: string) =>
  body.split(/\n[ \t]*\n/).map((b) => b.replace(/^\n+|\s+$/g, '')).filter((b) => b.trim().length > 0)
