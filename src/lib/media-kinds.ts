/**
 * What may be uploaded — shared by the server that enforces it and the browser
 * that explains it. No 'server-only' here on purpose: the two must agree, and
 * two copies of a list like this drift within a month.
 *
 * The browser's copy is a courtesy that keeps someone from waiting on a 20 MB
 * upload only to be told no. src/app/api/admin/media/route.ts is the authority
 * and re-checks every file; nothing here is a security boundary.
 */

/** 20 MB. A photograph off a phone is 3–8; a press-kit PDF is rarely over 15. */
export const MAX_BYTES = 20 * 1024 * 1024

/**
 * ! SVG IS DELIBERATELY ABSENT. An SVG is a document that can carry <script>,
 * and it would be served from our own origin — an upload form that accepts one
 * is a stored-XSS hole with a nice preview. If a logo has to be an SVG it goes
 * into the repo through a pull request, where a person reads it first.
 */
export const KINDS: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'application/pdf': 'pdf',
}

export const ACCEPT = Object.keys(KINDS).join(',')

export function describeRejection(file: { name?: string; type: string; size: number }): string | null {
  if (!KINDS[file.type]) return `${file.type || 'that file type'} is not allowed — pictures (PNG, JPG, WebP, GIF) and PDFs only`
  if (file.size > MAX_BYTES) return `it is ${(file.size / 1024 / 1024).toFixed(1)} MB and the limit is ${MAX_BYTES / 1024 / 1024} MB`
  return null
}

export const isImage = (mime: string) => mime.startsWith('image/')
