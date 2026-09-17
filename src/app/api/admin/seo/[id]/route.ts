import { one, q, tx } from '@/lib/db'
import { guard, json, body } from '@/lib/admin-route'

/**
 * Every SEO field on one post — read, and write.
 *
 * The field list is PRJ/002 "SEO Fields for CMS" in full. Where the doc names a
 * field twice (Canonical URL appears under Core and again under Advanced) there
 * is one column and one input; db/004_seo.sql maps the rest.
 *
 * !! THIS ENDPOINT CANNOT TOUCH THE BODY. Not content_json, not content_html,
 * not status. The SEO role exists so somebody can fix three hundred title tags
 * without being able to rewrite an article by accident, and a whitelist here is
 * what makes that true rather than a promise the UI makes.
 */

/** Exactly the columns the SEO desk owns. Nothing else is writable here. */
const FIELDS = [
  'meta_title', 'meta_description', 'focus_keyword', 'secondary_keywords',
  'canonical_url', 'robots_index', 'robots_follow', 'in_sitemap', 'allow_ai_answers',
  'robots_archive', 'robots_max_snippet', 'robots_image_preview', 'robots_max_video',
  'breadcrumb_title', 'redirect_to', 'redirect_type',
  'og_title', 'og_description', 'og_image_url',
  'twitter_title', 'twitter_description', 'twitter_image_url', 'twitter_card',
  'schema_type', 'schema_headline', 'schema_description', 'schema_image_url',
  'schema_author', 'schema_publisher', 'schema_published_at', 'schema_modified_at',
  'schema_custom', 'seo_score', 'readability_score',
] as const

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 80)

function idFrom(req: Request): number {
  const parts = new URL(req.url).pathname.split('/').filter(Boolean)
  return Number(parts[parts.length - 1])
}

export const GET = guard(async ({ req }) => {
  const id = idFrom(req)
  if (!Number.isFinite(id)) return json({ error: 'Bad id.' }, 400)

  const post = await one(`
    SELECT p.*, c.name AS category_name, u.name AS author_name
      FROM posts p
      LEFT JOIN categories c ON c.id = p.category_id
      LEFT JOIN users u      ON u.id = p.author_id
     WHERE p.id = $1`, [id])
  if (!post) return json({ error: 'No such post.' }, 404)

  const p = post as Record<string, unknown>
  // Never ship the editor document to the SEO screen: it is large, it is not
  // used there, and not having it is the cheapest guarantee it cannot be saved.
  delete p.content_json

  const kw = String(p.focus_keyword ?? '').trim()
  const usedBy = kw
    ? (await q<{ slug: string }>(
      `SELECT slug FROM posts WHERE lower(focus_keyword) = lower($1) AND id <> $2 LIMIT 5`, [kw, id]))
      .map((r) => r.slug)
    : []

  return json({ post: p, keywordUsedBy: usedBy })
}, { role: ['administrator', 'editor', 'seo'] })

export const PUT = guard(async ({ req }) => {
  const id = idFrom(req)
  if (!Number.isFinite(id)) return json({ error: 'Bad id.' }, 400)

  const input = await body<Record<string, unknown>>(req)
  const existing = await one<{ slug: string; status: string }>(
    'SELECT slug, status FROM posts WHERE id = $1', [id])
  if (!existing) return json({ error: 'No such post.' }, 404)

  const sets: string[] = []
  const params: unknown[] = [id]
  const set = (col: string, value: unknown) => { params.push(value); sets.push(`${col} = $${params.length}`) }

  for (const col of FIELDS) {
    if (!(col in input)) continue
    let v = input[col]
    if (col === 'secondary_keywords') {
      v = Array.isArray(v) ? v.map(String).map((s) => s.trim()).filter(Boolean) : []
    } else if (col === 'schema_custom') {
      // Stored as jsonb. An empty box clears it; anything that is not JSON is
      // refused here rather than blowing up at render time on a live page.
      if (v === '' || v === null || v === undefined) v = null
      else if (typeof v === 'string') {
        try { v = JSON.parse(v) } catch { return json({ error: 'Custom schema is not valid JSON.' }, 400) }
      }
      v = v === null ? null : JSON.stringify(v)
    } else if (typeof v === 'string' && v.trim() === '' && col !== 'meta_title' && col !== 'meta_description') {
      // Blank means "unset" for every optional field; the two that are NOT NULL
      // keep their empty string.
      v = null
    }
    set(col, v)
  }

  /* -------- slug, and the redirect that has to come with it ----------------
   * Same rule as the post editor, deliberately duplicated rather than shared:
   * changing a published post's slug breaks every link to it, so a 301 is
   * written in the same transaction and any rule that pointed at the old path
   * is repointed, so A -> B -> C collapses to A -> C.                       */
  let newSlug: string | null = null
  if (typeof input.slug === 'string') {
    const cleaned = slugify(input.slug)
    if (cleaned && cleaned !== existing.slug) {
      if (await one('SELECT 1 FROM posts WHERE slug = $1 AND id <> $2', [cleaned, id])) {
        return json({ error: `The slug "${cleaned}" is already used by another post.` }, 409)
      }
      newSlug = cleaned
      set('slug', cleaned)
    }
  }

  if (sets.length === 0) return json({ error: 'Nothing to save.' }, 400)
  sets.push('seo_checked_at = now()', 'updated_at = now()')

  const row = await tx(async (run) => {
    const updated = (await run(
      `UPDATE posts SET ${sets.join(', ')} WHERE id = $1 RETURNING id, slug, seo_score, readability_score, seo_checked_at`,
      params))[0]

    if (newSlug && existing.status === 'published') {
      const from = `/${existing.slug}/`
      const to = `/${newSlug}/`
      await run(`INSERT INTO redirects (from_path, to_path, source) VALUES ($1, $2, 'slug-change')
                 ON CONFLICT (from_path) DO UPDATE SET to_path = EXCLUDED.to_path`, [from, to])
      await run(`UPDATE redirects SET to_path = $1 WHERE to_path = $2 AND from_path <> $1`, [to, from])
    }

    /* A per-post redirect is a real redirect rule, so it goes in the table the
       build reads rather than living only on the post. Clearing the field
       removes the rule again — otherwise a mistake is permanent. */
    if ('redirect_to' in input) {
      const to = String(input.redirect_to ?? '').trim()
      const from = `/${newSlug ?? existing.slug}/`
      if (to) {
        const code = Number(input.redirect_type) || 301
        await run(`INSERT INTO redirects (from_path, to_path, status_code, source) VALUES ($1,$2,$3,'manual')
                   ON CONFLICT (from_path) DO UPDATE SET to_path = EXCLUDED.to_path, status_code = EXCLUDED.status_code`,
          [from, to, code])
      } else {
        await run(`DELETE FROM redirects WHERE from_path = $1 AND source = 'manual'`, [from])
      }
    }

    return updated
  })

  return json({ post: row })
}, { role: ['administrator', 'editor', 'seo'] })
