import { q, tx } from '@/lib/db'
import { guard, json, body } from '@/lib/admin-route'
import { canEditSeo } from '@/lib/auth'

/**
 * The SEO desk's index: every post with the numbers the list sorts on, plus the
 * site-wide defaults every page falls back to.
 *
 * !! THE SCORES HERE ARE THE LAST ONES STORED, NOT LIVE. Re-analysing 307 post
 * bodies to draw one table would take seconds and produce a page that is stale
 * the moment somebody edits a paragraph anyway. The list says when each was
 * checked; opening a post recomputes it in the browser from the current body.
 * See src/lib/seo-analysis.ts.
 */

const SEO_SETTING_KEYS = [
  'site_name', 'title_template', 'seo_title_separator', 'seo_default_og_image',
  'seo_twitter_site', 'seo_twitter_card', 'seo_org_name', 'seo_org_logo',
  'seo_org_type', 'seo_default_schema', 'seo_noindex_paginated',
  'ai_training_crawlers', 'ai_answer_crawlers',
]

export const GET = guard(async () => {
  const posts = await q(`
    SELECT p.id, p.slug, p.title, p.status, p.source,
           p.meta_title, p.meta_description, p.focus_keyword, p.secondary_keywords,
           p.canonical_url, p.robots_index, p.robots_follow, p.in_sitemap,
           p.redirect_to, p.redirect_type, p.schema_type,
           p.seo_score, p.readability_score, p.seo_checked_at,
           p.word_count, p.published_at, p.updated_at,
           c.name AS category_name
      FROM posts p
      LEFT JOIN categories c ON c.id = p.category_id
     ORDER BY p.updated_at DESC`)

  const settings = await q<{ key: string; value: unknown }>(
    'SELECT key, value FROM settings WHERE key = ANY($1)', [SEO_SETTING_KEYS])

  const redirects = await q(`SELECT id, from_path, to_path, status_code, source, hits
                               FROM redirects ORDER BY hits DESC, from_path LIMIT 500`)

  /* One pass for the whole table rather than a per-row query: the panel needs
     to know whether a focus keyword is already spoken for, and 307 round trips
     to answer that is how a list screen ends up taking four seconds. */
  const dupes = await q<{ focus_keyword: string; n: number }>(`
    SELECT lower(focus_keyword) AS focus_keyword, count(*)::int AS n
      FROM posts WHERE coalesce(focus_keyword, '') <> ''
     GROUP BY 1 HAVING count(*) > 1`)

  return json({
    posts,
    settings: Object.fromEntries(settings.map((s) => [s.key, s.value])),
    redirects,
    duplicateKeywords: Object.fromEntries(dupes.map((d) => [d.focus_keyword, d.n])),
  })
}, { role: ['administrator', 'editor', 'seo'] })

/** Site-wide SEO defaults. Administrators and the SEO desk; not writers. */
export const PUT = guard(async ({ req, user }) => {
  if (!canEditSeo(user)) return json({ error: 'Your account cannot do that' }, 403)
  const input = await body<{ settings: Record<string, unknown> }>(req)

  const entries = Object.entries(input.settings ?? {})
    .filter(([k]) => SEO_SETTING_KEYS.includes(k))
  if (entries.length === 0) return json({ error: 'Nothing to save.' }, 400)

  await tx(async (run) => {
    for (const [key, value] of entries) {
      await run(`INSERT INTO settings (key, value, updated_at) VALUES ($1, $2::jsonb, now())
                 ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
        [key, JSON.stringify(value)])
    }
  })
  return json({ ok: true })
}, { role: ['administrator', 'editor', 'seo'] })
