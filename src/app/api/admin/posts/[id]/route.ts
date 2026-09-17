import { revalidatePath } from 'next/cache'
import { q, one, tx } from '@/lib/db'
import { guard, json, body } from '@/lib/admin-route'
import { deriveContent, slugify, type PostJSON } from '@/lib/post-content'

type PostPatch = {
  title: string; slug: string; meta_title: string; meta_description: string
  excerpt: string; focus_keyword: string; canonical_url: string | null
  robots_index: boolean; robots_follow: boolean; allow_ai_answers: boolean; in_sitemap: boolean
  category_id: number | null; author_id: number | null
  featured_media_id: number | null; featured_alt: string
  source: 'editor' | 'wordpress'
  content_json: PostJSON
  scheduled_for: string | null
}

const idOf = (req: Request) => Number(new URL(req.url).pathname.split('/').filter(Boolean).at(-1))

export const GET = guard(async ({ req }) => {
  const post = await one(`
    SELECT p.*,
           m.url AS featured_url, m.filename AS featured_filename,
           m.width AS featured_width, m.height AS featured_height, m.alt AS featured_media_alt
      FROM posts p LEFT JOIN media m ON m.id = p.featured_media_id
     WHERE p.id = $1`, [idOf(req)])
  if (!post) return json({ error: 'No such post' }, 404)
  const revisions = await q(
    `SELECT r.id, r.created_at, u.name AS saved_by
       FROM post_revisions r LEFT JOIN users u ON u.id = r.saved_by
      WHERE r.post_id = $1 ORDER BY r.created_at DESC LIMIT 20`, [idOf(req)])
  return json({ post, revisions })
})

export const PATCH = guard(async ({ user, req }) => {
  const id = idOf(req)
  const input = await body<PostPatch>(req)

  const existing = await one<{ slug: string; status: string; title: string; source: string }>(
    'SELECT slug, status, title, source FROM posts WHERE id = $1', [id])
  if (!existing) return json({ error: 'No such post' }, 404)

  const sets: string[] = []
  const params: unknown[] = []
  const set = (col: string, value: unknown) => { params.push(value); sets.push(`${col} = $${params.length}`) }

  for (const col of ['title', 'meta_title', 'meta_description', 'excerpt', 'focus_keyword'] as const) {
    if (input[col] !== undefined) set(col, input[col])
  }
  for (const col of ['robots_index', 'robots_follow', 'allow_ai_answers', 'in_sitemap'] as const) {
    if (input[col] !== undefined) set(col, input[col])
  }
  if (input.canonical_url !== undefined) set('canonical_url', input.canonical_url || null)
  if (input.category_id !== undefined) set('category_id', input.category_id || null)
  if (input.featured_media_id !== undefined) set('featured_media_id', input.featured_media_id || null)
  if (input.featured_alt !== undefined) set('featured_alt', input.featured_alt || null)
  // A post flips to 'editor' the moment somebody converts it, and never back.
  if (input.source === 'editor') set('source', 'editor')
  if (input.author_id !== undefined) set('author_id', input.author_id || null)
  if (input.scheduled_for !== undefined) set('scheduled_for', input.scheduled_for || null)

  /* -------- slug, and the redirect that has to come with it ---------------
   * Changing the slug of a PUBLISHED post breaks every link anyone already has
   * to it. A 301 is written in the same transaction, and any rule that used to
   * point at the old path is repointed so A -> B -> C collapses to A -> C
   * rather than becoming a chain Google gives up following.                */
  let newSlug: string | null = null
  if (input.slug !== undefined) {
    const cleaned = slugify(input.slug)
    if (cleaned && cleaned !== existing.slug) {
      const taken = await one('SELECT 1 FROM posts WHERE slug = $1 AND id <> $2', [cleaned, id])
      if (taken) return json({ error: `The slug "${cleaned}" is already used by another post.` }, 409)
      newSlug = cleaned
      set('slug', cleaned)
    }
  }

  /* -------- body -------- */
  /* !! AN IMPORTED POST MUST NOT BE SAVED EMPTY.
     A post with source='wordpress' holds the original markup in content_html and
     an EMPTY content_json — the editor has nothing to show until somebody
     converts it. If a save arrived carrying that empty document, deriveContent
     would render it to an empty string and overwrite the article. Three hundred
     live pages, blanked by opening them. */
  /* !! AN UNCONVERTED POST NEVER ACCEPTS A BODY. READ THIS BEFORE RELAXING IT.
     The first version of this guard tested the incoming document for emptiness
     with `!content.length` — and Tiptap's empty document is NOT empty by that
     test. It is `{type:'doc',content:[{type:'paragraph'}]}`: one blank
     paragraph, length 1. So the guard passed, deriveContent rendered "<p></p>",
     and touching the TITLE of an imported post overwrote the article with seven
     characters. On the live site that is three hundred pages, blanked by opening
     them and typing.
     The rule is not "refuse empty bodies", which needs a definition of empty
     that is easy to get wrong. It is: while source is still 'wordpress', the
     body is not the editor's to write. Titles, meta and settings save normally;
     the body is ignored until somebody converts, which is the one request that
     sets source='editor' and is allowed through. */
  const bodyLocked = existing.source === 'wordpress' && input.source !== 'editor'

  if (input.content_json && !bodyLocked) {
    const derived = deriveContent(input.content_json)
    set('content_json', JSON.stringify(input.content_json))
    set('content_html', derived.html)
    set('toc', JSON.stringify(derived.toc))
    set('word_count', derived.wordCount)
    set('reading_minutes', derived.readingMinutes)
  }

  if (!sets.length) return json({ ok: true, unchanged: true })
  set('updated_at', new Date())
  params.push(id)

  await tx(async (run) => {
    await run(`UPDATE posts SET ${sets.join(', ')} WHERE id = $${params.length}`, params)

    if (newSlug && existing.status === 'published') {
      const from = `/${existing.slug}/`
      const to = `/${newSlug}/`
      await run(`INSERT INTO redirects (from_path, to_path, source) VALUES ($1, $2, 'slug-change')
                 ON CONFLICT (from_path) DO UPDATE SET to_path = EXCLUDED.to_path`, [from, to])
      // Flatten: anything that pointed at the old path now points at the new one.
      await run(`UPDATE redirects SET to_path = $1 WHERE to_path = $2 AND from_path <> $1`, [to, from])
    }

    /* !! AN IMPORTED POST MUST NOT BE SAVED EMPTY.
     A post with source='wordpress' holds the original markup in content_html and
     an EMPTY content_json — the editor has nothing to show until somebody
     converts it. If a save arrived carrying that empty document, deriveContent
     would render it to an empty string and overwrite the article. Three hundred
     live pages, blanked by opening them. */
  if (input.content_json) {
      await run(`INSERT INTO post_revisions (post_id, title, content_json, saved_by) VALUES ($1,$2,$3,$4)`,
        [id, input.title ?? existing.title, JSON.stringify(input.content_json), user.id])
      // Twenty is plenty to recover from a bad afternoon, and keeps the table small.
      await run(`DELETE FROM post_revisions WHERE id IN (
                   SELECT id FROM post_revisions WHERE post_id = $1
                   ORDER BY created_at DESC OFFSET 20)`, [id])
    }
  })

  return json({
    ok: true,
    slug: newSlug ?? existing.slug,
    redirected: Boolean(newSlug && existing.status === 'published'),
    // Told plainly rather than hidden: the caller sent a body and it was not
    // written, and the editor says so instead of showing "Saved".
    bodyLocked: bodyLocked && Boolean(input.content_json),
  })
})

/**
 * Delete a post.
 *
 * !! DELETING A PUBLISHED POST DELETES A LIVE URL. Whatever linked to it — other
 * pages, Google's index, somebody's newsletter — now hits a 404. That is
 * occasionally the right answer and usually is not, so the caller must say which
 * it meant: pass `redirect_to` and a 301 is written in the same transaction, or
 * pass `accept404: true` to state plainly that the address should die. Refusing
 * to guess is the whole point; CLAUDE.md rule 6 is about not losing what already
 * ranks.
 *
 * Drafts have no address and skip all of it.
 *
 * Who may: administrators and editors delete anything. An author may delete
 * their own draft and nothing else — they cannot unpublish, so they must not be
 * able to delete instead.
 */
export const DELETE = guard(async ({ user, req }) => {
  const id = idOf(req)
  const input = await body<{ redirect_to: string; accept404: boolean }>(req)

  const post = await one<{ slug: string; status: string; title: string; author_id: number | null }>(
    'SELECT slug, status, title, author_id FROM posts WHERE id = $1', [id])
  if (!post) return json({ error: 'No such post' }, 404)

  if (user.role === 'author' && (post.status !== 'draft' || post.author_id !== user.id)) {
    return json({ error: 'Authors can delete their own drafts. Ask an editor to remove anything published.' }, 403)
  }

  const live = post.status === 'published'
  let to: string | null = null

  if (live) {
    const wants = (input.redirect_to ?? '').trim()
    if (!wants && !input.accept404) {
      return json({ error: 'published', slug: post.slug, title: post.title }, 409)
    }
    if (wants) {
      to = wants.startsWith('http') ? wants : `/${wants.replace(/^\/+|\/+$/g, '')}/`
      if (to === `/${post.slug}/`) return json({ error: 'That redirect points at the page being deleted.' }, 400)
    }
  }

  const from = `/${post.slug}/`
  await tx(async (run) => {
    if (to) {
      await run(`INSERT INTO redirects (from_path, to_path, source) VALUES ($1, $2, 'manual')
                 ON CONFLICT (from_path) DO UPDATE SET to_path = EXCLUDED.to_path`, [from, to])
      // Same flattening as a slug change: anything aimed at the dead path is
      // repointed, so A -> B -> C never becomes a chain.
      await run(`UPDATE redirects SET to_path = $1 WHERE to_path = $2 AND from_path <> $1`, [to, from])
    }
    // post_revisions is ON DELETE CASCADE; media is not touched, because a
    // picture is usually on more than one page.
    await run('DELETE FROM posts WHERE id = $1', [id])
  })

  if (live) {
    revalidatePath(from)
    revalidatePath('/blog')
    revalidatePath('/sitemap.xml')
  }

  return json({ ok: true, title: post.title, redirected: to })
})
