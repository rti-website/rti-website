import { q, one } from '@/lib/db'
import { guard, json, body } from '@/lib/admin-route'
import { put, remove } from '@/lib/media-store'
import { describeRejection } from '@/lib/media-kinds'

/**
 * The media library.
 *
 * Files land on the disk that runs the site — see src/lib/media-store.ts, which
 * is the one place that knows that and the one place to change when hosting is
 * settled. This file only ever deals in a URL and a row.
 */

export const GET = guard(async () => {
  const rows = await q(`SELECT id, filename, url, mime, width, height, bytes, alt, created_at
                          FROM media ORDER BY created_at DESC LIMIT 300`)
  return json({ media: rows, missingAlt: rows.filter((m) => !(m as { alt?: string }).alt).length })
})

/** Upload. Several files in one go, each judged on its own. */
export const POST = guard(async ({ user, req }) => {
  let form: FormData
  try { form = await req.formData() } catch { return json({ error: 'That upload did not arrive in one piece. Try again.' }, 400) }

  const files = form.getAll('files').filter((f): f is File => f instanceof File && f.size > 0)
  if (files.length === 0) return json({ error: 'No file was attached.' }, 400)
  if (files.length > 20) return json({ error: 'Twenty files at a time, please.' }, 400)

  const added: unknown[] = []
  const refused: string[] = []

  for (const file of files) {
    const no = describeRejection(file)
    if (no) { refused.push(`${file.name} — ${no}`); continue }

    const stored = await put(file)
    const row = await one(
      `INSERT INTO media (filename, url, mime, width, height, bytes, alt, uploaded_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, filename, url, mime, width, height, bytes, alt, created_at`,
      [stored.filename, stored.url, stored.mime, stored.width, stored.height, stored.bytes,
       // Alt text is the uploader's job, and the editor nags for it. Seeding it
       // from the filename would produce "dsc-0429" on a live page, which reads
       // to a screen reader as noise and to Google as nothing.
       null, user.id],
    )
    added.push(row)
  }

  if (added.length === 0) return json({ error: refused.join('\n') }, 400)
  return json({ media: added, refused }, 201)
})

/** Alt text, and nothing else — the filename and URL are the file's identity. */
export const PATCH = guard(async ({ req }) => {
  const input = await body<{ id: number; alt: string }>(req)
  if (!input.id) return json({ error: 'Which file?' }, 400)
  const row = await one(
    `UPDATE media SET alt = $2 WHERE id = $1
     RETURNING id, filename, url, mime, width, height, bytes, alt, created_at`,
    [input.id, (input.alt ?? '').trim() || null])
  if (!row) return json({ error: 'No such file' }, 404)
  return json({ media: row })
})

/**
 * Delete, bytes and all.
 *
 * Editors and administrators only: a picture can be on a live page, and this is
 * the one action in the library that cannot be undone from the admin.
 */
export const DELETE = guard(async ({ req }) => {
  const id = Number(new URL(req.url).searchParams.get('id'))
  if (!id) return json({ error: 'Which file?' }, 400)

  const row = await one<{ url: string; filename: string }>('SELECT url, filename FROM media WHERE id = $1', [id])
  if (!row) return json({ error: 'No such file' }, 404)

  // Which posts still point at it. Deleting anyway is allowed — sometimes the
  // whole point is that the picture should not be anywhere — but the admin says
  // so first, and this is what it says.
  const used = await q<{ id: number; title: string; slug: string; status: string }>(
    `SELECT id, title, slug, status FROM posts WHERE content_html LIKE $1 ORDER BY status, title LIMIT 20`,
    [`%${row.url}%`])

  if (used.length > 0 && new URL(req.url).searchParams.get('force') !== '1') {
    return json({ error: 'in-use', usedBy: used }, 409)
  }

  await remove(row.url)
  await q('DELETE FROM media WHERE id = $1', [id])
  return json({ ok: true, filename: row.filename })
}, { role: ['administrator', 'editor'] })

/* Twenty photographs over a slow office connection is not a 10-second job. */
export const maxDuration = 60
