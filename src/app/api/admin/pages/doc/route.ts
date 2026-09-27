import { revalidatePath } from 'next/cache'
import { one, q, tx } from '@/lib/db'
import { guard, json, body } from '@/lib/admin-route'
import { applyPatch, diffPatch, type Patch } from '@/lib/content-patch'
import { DOCS, defaultsOf, isDocKey, type DocKey } from '@/content/registry'
import RENDERED from '@/content/rendered-fields.json'

/**
 * One document in Admin -> Pages (27 Sep 2026): read it, save a draft,
 * publish, discard, go back to the original, or put an older version back.
 * Administrators and editors. `?key=` rather than a path segment because
 * keys have slashes in them (city/chicago-battery).
 *
 * What is stored is a patch against the code's defaults (see
 * src/lib/content-patch.ts): the editor sends the whole edited document, the
 * server works out what differs, so a field the editor did not touch never
 * gets pinned to today's text.
 */
type Row = {
  key: string; draft: Patch | null; published: Patch
  draft_updated_at: string | null; draft_by: string | null
  published_at: string | null; published_by: string | null
}

const ROLES = { role: ['administrator', 'editor'] as ('administrator' | 'editor')[] }
/** A document's patch may not be larger than this (the biggest page is ~60 KB). */
const MAX_BYTES = 400_000

function keyOf(req: Request): DocKey | null {
  const k = new URL(req.url).searchParams.get('key')
  return isDocKey(k) ? k : null
}

async function state(key: DocKey) {
  const row = await one<Row>(`
    SELECT c.key, c.draft, c.published, c.draft_updated_at, d.name AS draft_by, c.published_at, p.name AS published_by
    FROM page_content c
    LEFT JOIN users d ON d.id = c.draft_updated_by
    LEFT JOIN users p ON p.id = c.published_by
    WHERE c.key = $1`, [key])
  const revisions = await q<{ id: number; published_at: string; by: string | null; edits: number }>(`
    SELECT r.id, r.published_at, u.name AS by, (SELECT count(*)::int FROM jsonb_object_keys(r.content)) AS edits
    FROM page_content_revisions r LEFT JOIN users u ON u.id = r.published_by
    WHERE r.key = $1 ORDER BY r.published_at DESC, r.id DESC LIMIT 30`, [key])
  const defaults = defaultsOf(key)
  const published = row?.published ?? {}
  const draft = row?.draft ?? null
  const d = DOCS[key] as { title: string; group: string; urls: string[]; note?: string }
  return {
    key, title: d.title, group: d.group, urls: d.urls, note: d.note ?? null,
    defaults,
    /** What the editor starts from: the draft if there is one, else what is live. */
    current: applyPatch(defaults, draft ?? published),
    live: applyPatch(defaults, published),
    hasDraft: draft !== null,
    editsLive: Object.keys(published).length,
    editsDraft: draft ? Object.keys(draft).length : null,
    draftUpdatedAt: row?.draft_updated_at ?? null, draftBy: row?.draft_by ?? null,
    publishedAt: row?.published_at ?? null, publishedBy: row?.published_by ?? null,
    /** Field shapes seen on the page by scripts/check-page-fields.mjs; null = not checked. */
    rendered: (RENDERED as Record<string, string[]>)[key] ?? null,
    revisions,
  }
}

export const GET = guard(async ({ req }) => {
  const key = keyOf(req)
  if (!key) return json({ error: 'No such page' }, 404)
  return json(await state(key))
}, ROLES)

/** Save draft. Body: { data } — the whole edited document. */
export const PUT = guard(async ({ req, user }) => {
  const key = keyOf(req)
  if (!key) return json({ error: 'No such page' }, 404)
  const { data } = await body<{ data: unknown }>(req)
  if (!data || typeof data !== 'object') return json({ error: 'Nothing to save' }, 400)
  const patch = diffPatch(defaultsOf(key), data)
  const text = JSON.stringify(patch)
  if (text.length > MAX_BYTES) return json({ error: 'That is more text than a page can take. Split it up or shorten it.' }, 400)
  await one(`
    INSERT INTO page_content (key, draft, draft_updated_at, draft_updated_by) VALUES ($1, $2::jsonb, now(), $3)
    ON CONFLICT (key) DO UPDATE SET draft = EXCLUDED.draft, draft_updated_at = now(), draft_updated_by = EXCLUDED.draft_updated_by
    RETURNING key`, [key, text, user.id])
  return json(await state(key))
}, ROLES)

/**
 * Body: { action }
 *   publish   the draft goes live (a revision is kept), the site is revalidated
 *   discard   throw the draft away; the live copy is untouched
 *   original  start a draft that is the code's copy (publish to apply)
 *   restore   start a draft from an older published version: { revision }
 */
export const POST = guard(async ({ req, user }) => {
  const key = keyOf(req)
  if (!key) return json({ error: 'No such page' }, 404)
  const { action, revision } = await body<{ action: string; revision: number }>(req)

  if (action === 'publish') {
    const done = await tx(async (run) => {
      const [row] = await run<{ draft: Patch | null }>('SELECT draft FROM page_content WHERE key = $1 FOR UPDATE', [key])
      if (!row?.draft) return false
      await run(`UPDATE page_content SET published = draft, draft = NULL, published_at = now(), published_by = $2,
                   draft_updated_at = NULL, draft_updated_by = NULL WHERE key = $1`, [key, user.id])
      await run('INSERT INTO page_content_revisions (key, content, published_by) VALUES ($1, $2::jsonb, $3)',
        [key, JSON.stringify(row.draft), user.id])
      return true
    })
    if (!done) return json({ error: 'There is no draft to publish. Save your changes first.' }, 400)
    /*
     * Every page, not just this one: a document can show on many pages (the
     * footer, the facilities, the service cards on the homepage), and a
     * missed page would keep the old copy until the next deploy. Pages are
     * rebuilt one by one as they are next visited, so this costs nothing up
     * front. Same as saving the tracking settings.
     */
    revalidatePath('/', 'layout')
    return json(await state(key))
  }

  if (action === 'discard') {
    await one('UPDATE page_content SET draft = NULL, draft_updated_at = NULL, draft_updated_by = NULL WHERE key = $1 RETURNING key', [key])
    return json(await state(key))
  }

  if (action === 'original' || action === 'restore') {
    let patch: Patch = {}
    if (action === 'restore') {
      const rev = await one<{ content: Patch }>('SELECT content FROM page_content_revisions WHERE id = $1 AND key = $2', [Number(revision), key])
      if (!rev) return json({ error: 'That version no longer exists.' }, 404)
      patch = rev.content
    }
    await one(`
      INSERT INTO page_content (key, draft, draft_updated_at, draft_updated_by) VALUES ($1, $2::jsonb, now(), $3)
      ON CONFLICT (key) DO UPDATE SET draft = EXCLUDED.draft, draft_updated_at = now(), draft_updated_by = EXCLUDED.draft_updated_by
      RETURNING key`, [key, JSON.stringify(patch), user.id])
    return json(await state(key))
  }

  return json({ error: 'Unknown action' }, 400)
}, ROLES)
