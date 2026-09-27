import 'server-only'
import { cache as perRequest } from 'react'
import { draftMode } from 'next/headers'
import { q } from '@/lib/db'
import { applyPatch, type Patch } from '@/lib/content-patch'
import { DOCS, type DocData, type DocKey } from '@/content/registry'

/**
 * Page copy with the admin's edits laid over it (Admin -> Pages, 27 Sep 2026).
 *
 *   const { HERO, STORY } = await content('about')
 *
 * is what a server component writes instead of importing HERO and STORY from
 * '@/data/about'. It returns the same shape, data only (functions and types
 * are still imported from the module as before).
 *
 * WHEN IT READS THE DATABASE. Same as the blog (src/lib/posts-db.ts): once
 * per build process while the site is prerendered, and again whenever a page
 * is revalidated after a publish, so every public page stays static and
 * CLAUDE.md rule 2 holds.
 *
 * PREVIEW. In Next draft mode (the __prerender_bypass cookie, which only
 * /api/admin/pages/preview/ sets, for a signed in administrator or editor)
 * the page renders on request and the DRAFT patch is used where there is
 * one. Everyone else keeps getting the static published page.
 *
 * WHEN THE DATABASE IS NOT THERE:
 *   - db/011 not run yet (no table)      -> defaults, quietly. A build before
 *                                           the migration still works.
 *   - no DATABASE_URL (a clone, CI)       -> defaults.
 *   - configured but failing              -> throws. At build that stops the
 *     build (like the blog); on a revalidation Next keeps serving the page
 *     it had, instead of quietly putting the defaults back over the edits.
 */

type Row = { key: string; draft: Patch | null; published: Patch | null }

async function readRows(): Promise<Map<string, Row>> {
  try {
    const rows = await q<Row>('SELECT key, draft, published FROM page_content')
    return new Map(rows.map((r) => [r.key, r]))
  } catch (err) {
    const code = (err as { code?: string }).code
    if (code === '42P01' || !process.env.DATABASE_URL) return new Map()
    throw new Error(`Could not read page copy (page_content): ${(err as Error).message}`, { cause: err })
  }
}

const BUILD = process.env.NEXT_PHASE === 'phase-production-build'
let kept: Promise<Map<string, Row>> | null = null
const rowsThisRequest = perRequest(readRows)
const rows = () => (BUILD ? (kept ??= readRows()) : rowsThisRequest())

/** True in the admin's preview. Never throws: false outside a request. */
export async function isPreview(): Promise<boolean> {
  if (BUILD) return false
  try {
    return (await draftMode()).isEnabled
  } catch {
    return false
  }
}

const merged = perRequest(async (key: DocKey, preview: boolean) => {
  const row = (await rows()).get(key)
  const patch = row ? (preview && row.draft ? row.draft : row.published) : null
  return applyPatch(DOCS[key].data(), patch)
})

export async function content<K extends DocKey>(key: K): Promise<DocData<K>> {
  return (await merged(key, await isPreview())) as DocData<K>
}

/** The published copy only, for things sent from the server (the auto-reply email). */
export async function publishedContent<K extends DocKey>(key: K): Promise<DocData<K>> {
  return (await merged(key, false)) as DocData<K>
}
