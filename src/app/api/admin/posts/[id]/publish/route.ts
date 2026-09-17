import { revalidatePath } from 'next/cache'
import { one } from '@/lib/db'
import { guard, json, body } from '@/lib/admin-route'

/**
 * Publish, schedule or unpublish.
 *
 * !! TWO THINGS ABOUT revalidatePath THAT FAIL SILENTLY IF YOU GET THEM WRONG:
 *
 *  1. The ROUTE GROUP has to be in the pattern. If the blog route ever moves
 *     into app/(site)/, this becomes '/(site)/blog/[slug]'. A wrong pattern
 *     throws nothing and revalidates nothing.
 *  2. In a route handler this only MARKS the page stale — the first visitor
 *     after publishing pays the render. The fetch below warms it so that
 *     visitor is us and not Google.
 *
 * And the one that bites hardest: a page that did not exist at build time
 * cannot be conjured by revalidating. The blog route must NOT set
 * `dynamicParams = false` — see claude/admin-dashboard-plan.md §2.
 */
export const POST = guard(async ({ req }) => {
  const id = Number(new URL(req.url).pathname.split('/').filter(Boolean).at(-2))
  const { action = 'publish' } = await body<{ action: 'publish' | 'unpublish' | 'schedule' }>(req)

  const post = await one<{ slug: string; meta_title: string; meta_description: string; title: string }>(
    'SELECT slug, meta_title, meta_description, title FROM posts WHERE id = $1', [id])
  if (!post) return json({ error: 'No such post' }, 404)

  if (action === 'publish') {
    if (!post.title.trim()) return json({ error: 'Give the post a title before publishing.' }, 400)
    await one(`UPDATE posts SET status = 'published',
                 published_at = COALESCE(published_at, now()), updated_at = now()
               WHERE id = $1 RETURNING id`, [id])
  } else if (action === 'unpublish') {
    await one(`UPDATE posts SET status = 'draft', updated_at = now() WHERE id = $1 RETURNING id`, [id])
  } else {
    await one(`UPDATE posts SET status = 'scheduled', updated_at = now() WHERE id = $1 RETURNING id`, [id])
  }

  const path = `/${post.slug}/`
  revalidatePath(path)
  revalidatePath('/blog')
  revalidatePath('/sitemap.xml')

  // Warm it, so the first real visitor gets a cached page. Failure here is not
  // an error — the page is still correct, just cold.
  const origin = new URL(req.url).origin
  void fetch(origin + path, { cache: 'no-store' }).catch(() => {})

  return json({ ok: true, status: action === 'publish' ? 'published' : action === 'schedule' ? 'scheduled' : 'draft', path })
}, { role: ['administrator', 'editor'] })
