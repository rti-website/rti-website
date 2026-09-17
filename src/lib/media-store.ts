import 'server-only'
import { mkdir, writeFile, unlink } from 'node:fs/promises'
import { randomBytes } from 'node:crypto'
import path from 'node:path'
import { KINDS } from './media-kinds'

/**
 * Where an uploaded file's bytes actually go.
 *
 * ONE SEAM, ON PURPOSE. Nothing above this file knows whether a picture lives on
 * a disk or in a bucket — it deals in a URL and a row id. Today the bytes go on
 * the disk that runs the site, under public/uploads/<year>/<month>/, which is
 * what any Node host gives you for nothing and what the content team needs in
 * order to work at all. They are handed back out by the /uploads route.
 *
 * ! WHEN HOSTING IS DECIDED, READ THIS. Only put() and remove() change. But if
 * the answer is a platform with a throwaway filesystem — Vercel and Netlify both
 * are — this MUST be swapped for R2/S3/Blob BEFORE launch, or every image
 * uploaded since the last deploy vanishes at the next one. MEDIA_DIR and
 * MEDIA_BASE_URL exist so a VPS can point at a mounted volume without a code
 * change in the meantime.
 */

/**
 * ! NOT public/. `next start` lists public/ at build time, so a file written
 * there afterwards 404s in production while working fine in dev. Uploads live
 * beside the app and are served by src/app/uploads/[...path]/route.ts.
 */
export const MEDIA_ROOT = process.env.MEDIA_DIR || path.join(process.cwd(), 'var', 'uploads')
const BASE_URL = (process.env.MEDIA_BASE_URL || '/uploads').replace(/\/+$/, '')

export type Stored = {
  filename: string; url: string; mime: string; bytes: number
  width: number | null; height: number | null
}

/** A filename that is safe on every filesystem and readable in a URL. */
function safeName(original: string, mime: string): string {
  const ext = KINDS[mime] ?? 'bin'
  const stem = path.basename(original, path.extname(original))
    .toLowerCase()
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'file'
  // The suffix is not decoration: two people uploading their own "logo.png" in
  // the same month must not overwrite each other.
  return `${stem}-${randomBytes(3).toString('hex')}.${ext}`
}

export async function put(file: File): Promise<Stored> {
  const bytes = Buffer.from(await file.arrayBuffer())
  const now = new Date()
  const folder = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}`
  const filename = safeName(file.name, file.type)

  await mkdir(path.join(MEDIA_ROOT, folder), { recursive: true })
  await writeFile(path.join(MEDIA_ROOT, folder, filename), bytes)

  const size = file.type === 'application/pdf' ? null : imageSize(bytes)
  return {
    filename,
    url: `${BASE_URL}/${folder}/${filename}`,
    mime: file.type,
    bytes: bytes.length,
    width: size?.width ?? null,
    height: size?.height ?? null,
  }
}

export async function remove(url: string): Promise<void> {
  if (!url.startsWith(`${BASE_URL}/`)) return   // not ours to delete
  const rel = url.slice(BASE_URL.length + 1)
  // Belt and braces against a doctored row: the resolved path must stay inside
  // ROOT, so "../../src/app/page.tsx" cannot be talked into being deleted.
  const target = path.resolve(MEDIA_ROOT, rel)
  if (target !== path.normalize(target) || !target.startsWith(path.resolve(MEDIA_ROOT) + path.sep)) return
  try { await unlink(target) } catch { /* already gone; the row still goes */ }
}

/* ------------------------------------------------------------ dimensions --
 * Read width and height out of the file header rather than adding an image
 * library for two numbers (CLAUDE.md rule 10). sharp arrives with Next as a
 * transitive dependency, which means it is not ours and could be gone after any
 * upgrade — a bad thing to have an upload endpoint depend on.
 *
 * The numbers are not cosmetic: next/image needs them to reserve space, and a
 * page that reflows as its pictures arrive is a page that fails Cumulative
 * Layout Shift.                                                             */
export function imageSize(b: Buffer): { width: number; height: number } | null {
  // PNG: 8-byte signature, then an IHDR chunk whose first two fields are the size.
  if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47 && b.toString('ascii', 12, 16) === 'IHDR') {
    return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) }
  }
  // GIF: "GIF87a"/"GIF89a" then two little-endian 16-bit numbers.
  if (b.length > 10 && b.toString('ascii', 0, 3) === 'GIF') {
    return { width: b.readUInt16LE(6), height: b.readUInt16LE(8) }
  }
  // WebP: RIFF container, three different chunk layouts.
  if (b.length > 30 && b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = b.toString('ascii', 12, 16)
    if (chunk === 'VP8 ') return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff }
    if (chunk === 'VP8L') {
      const bits = b.readUInt32LE(21)
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 }
    }
    if (chunk === 'VP8X') {
      const read24 = (at: number) => b.readUIntLE(at, 3) + 1
      return { width: read24(24), height: read24(27) }
    }
    return null
  }
  // JPEG: walk the marker chain to the frame header. Markers are 0xFF followed
  // by a type byte; the SOFn types carry the size, and everything else carries
  // a length we skip over.
  if (b.length > 4 && b.readUInt16BE(0) === 0xffd8) {
    let at = 2
    while (at + 9 < b.length) {
      if (b[at] !== 0xff) { at++; continue }        // resync past padding
      const marker = b[at + 1]
      if (marker === undefined) return null
      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { at += 2; continue }
      if (marker === 0xda || marker === 0xd9) return null   // reached the image data
      const len = b.readUInt16BE(at + 2)
      const isFrame = (marker >= 0xc0 && marker <= 0xc3)
        || (marker >= 0xc5 && marker <= 0xc7)
        || (marker >= 0xc9 && marker <= 0xcb)
        || (marker >= 0xcd && marker <= 0xcf)
      if (isFrame) return { height: b.readUInt16BE(at + 5), width: b.readUInt16BE(at + 7) }
      at += 2 + len
    }
  }
  return null
}
