import fs from 'node:fs'
import path from 'node:path'
import { path as canonicalPath } from './urls'

/**
 * Manifest-driven content and routing.
 *
 * Why the catch-all: the live site has ~600 URLs at arbitrary root-level paths
 * — flat blog slugs like /how-to-get-rid-of-a-microwave/ sitting beside deep
 * location paths like
 * /minnesota-recycling/hennepin-county-recycling-center/bloomington-recycling-center/.
 * Hand-authoring a route folder per URL is how one quietly goes missing. Here
 * every page declares its own URL and one route builds them all, so "every KEEP
 * URL has a page" is a build guarantee rather than a QA hope.
 *
 * Why `export const meta` instead of YAML frontmatter: MDX supports ESM exports
 * natively, so the same object is readable by this build-time walk AND by the
 * route at render time. YAML frontmatter would need a remark plugin, and every
 * current remark plugin is ESM-only while @next/mdx resolves plugins with
 * require.resolve — which throws.
 */

export type PageType = 'service' | 'location' | 'post' | 'page'

export type ContentMeta = {
  /** Exact canonical path, with trailing slash. Ported from url-map.csv. */
  url: string
  type: PageType
  /** Verbatim from url-map.csv. Never rewritten at launch. */
  title: string
  description: string
  h1: string
  date?: string
  updated?: string
  image?: string
  /**
   * Post-only, all optional — the blog detail frame (6491:6032) prints a
   * category, a reading time and its own hero photograph above the headline.
   * A post without them renders the same page with those lines absent.
   */
  category?: string
  readingTime?: string
  heroImage?: string
}

export type ContentEntry = ContentMeta & {
  /** Absolute path of the MDX file on disk. */
  file: string
  /** Path relative to content/, e.g. 'posts/how-to-get-rid-of-a-microwave.mdx'. */
  rel: string
}

const ROOT = path.join(process.cwd(), 'content')
const REQUIRED = ['url', 'type', 'title', 'description', 'h1'] as const

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) return walk(full)
    return /\.mdx?$/.test(e.name) ? [full] : []
  })
}

/** Pull `export const meta = { ... }` out of an MDX file without compiling it. */
function readMeta(file: string): ContentMeta {
  const src = fs.readFileSync(file, 'utf8')
  const start = src.indexOf('export const meta')
  if (start === -1) {
    throw new Error(`No "export const meta" in ${path.relative(process.cwd(), file)}`)
  }
  const open = src.indexOf('{', start)
  let depth = 0
  let end = -1
  for (let i = open; i < src.length; i++) {
    if (src[i] === '{') depth++
    else if (src[i] === '}') { depth--; if (depth === 0) { end = i + 1; break } }
  }
  if (end === -1) throw new Error(`Unterminated meta object in ${file}`)

  // Repo-authored files only, evaluated at build time.
  const meta = Function(`"use strict"; return (${src.slice(open, end)})`)() as ContentMeta

  const missing = REQUIRED.filter((k) => !meta[k])
  if (missing.length) {
    // Fail the build loudly. A page missing a title or canonical is exactly the
    // silent regression this migration must not ship.
    throw new Error(
      `Content meta incomplete in ${path.relative(process.cwd(), file)}: missing ${missing.join(', ')}`,
    )
  }
  return meta
}

let cache: ContentEntry[] | null = null

export function allContent(): ContentEntry[] {
  if (cache) return cache
  const entries = walk(ROOT).map((file) => {
    const meta = readMeta(file)
    return {
      ...meta,
      url: canonicalPath(meta.url),
      file,
      rel: path.relative(ROOT, file).split(path.sep).join('/'),
    } satisfies ContentEntry
  })

  const seen = new Map<string, string>()
  for (const e of entries) {
    const prev = seen.get(e.url)
    if (prev) throw new Error(`Duplicate URL ${e.url} in ${e.file} and ${prev}`)
    seen.set(e.url, e.file)
  }

  cache = entries
  return entries
}

export function byUrl(url: string): ContentEntry | undefined {
  const target = canonicalPath(url)
  return allContent().find((e) => e.url === target)
}

export function byType(type: PageType): ContentEntry[] {
  return allContent().filter((e) => e.type === type)
}

/** Route params for the catch-all: ['minnesota-recycling','hennepin-...']. */
export function toSegments(url: string): string[] {
  return canonicalPath(url).split('/').filter(Boolean)
}
