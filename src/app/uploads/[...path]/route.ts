import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { Readable } from 'node:stream'
import path from 'node:path'
import { MEDIA_ROOT } from '@/lib/media-store'
import { KINDS } from '@/lib/media-kinds'

/**
 * Serves uploaded files.
 *
 * !! WHY THIS EXISTS AT ALL, because the obvious thing does not work: `next
 * start` enumerates public/ AT BUILD TIME. A file written into public/ after the
 * build is not served — it 404s in production while working perfectly in dev,
 * which is the worst shape a bug can have. So uploads live in var/uploads,
 * outside both public/ and .next/, and this route hands them out.
 *
 * It is a route handler, so app/layout.tsx's `dynamic = 'error'` does not apply
 * (CLAUDE.md rule 2 is untouched) and it appears under ƒ in the build alongside
 * the admin endpoints. That is expected: rule 2's "zero dynamic routes" check is
 * about PAGES Google has to read.
 *
 * Filenames carry a random suffix and are never reused, so the bytes at a given
 * URL cannot change — hence immutable, and hence no revalidation traffic.
 */

const TYPES: Record<string, string> = Object.fromEntries(
  Object.entries(KINDS).map(([mime, ext]) => [ext, mime]))
TYPES.jpeg = 'image/jpeg'

export async function GET(_req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await ctx.params

  // Path traversal: resolve against the root and insist the answer is inside it.
  // "../../.env.local" gets no further than this line.
  const target = path.resolve(MEDIA_ROOT, ...segments)
  if (!target.startsWith(path.resolve(MEDIA_ROOT) + path.sep)) {
    return new Response('Not found', { status: 404 })
  }

  let info
  try {
    info = await stat(target)
    if (!info.isFile()) throw new Error('not a file')
  } catch {
    return new Response('Not found', { status: 404 })
  }

  const ext = path.extname(target).slice(1).toLowerCase()
  const type = TYPES[ext]
  // Only the types the uploader accepts are served. An unknown extension on
  // disk is not something to guess a Content-Type for.
  if (!type) return new Response('Not found', { status: 404 })

  const stream = Readable.toWeb(createReadStream(target)) as ReadableStream
  return new Response(stream, {
    headers: {
      'content-type': type,
      'content-length': String(info.size),
      'cache-control': 'public, max-age=31536000, immutable',
      'x-content-type-options': 'nosniff',
      // A PDF opens in the browser; nothing here is ever executed as a document
      // on our origin because the type list has no HTML or SVG in it.
      'content-disposition': 'inline',
    },
  })
}
