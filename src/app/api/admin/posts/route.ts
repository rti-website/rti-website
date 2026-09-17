import { q, one } from '@/lib/db'
import { guard, json, body } from '@/lib/admin-route'
import { slugify } from '@/lib/post-content'

const LIST = `
  SELECT p.id, p.slug, p.title, p.status, p.updated_at, p.published_at,
         p.meta_title, p.meta_description, p.word_count, p.reading_minutes,
         c.name AS category, u.name AS author, p.author_id,
         (p.meta_title <> '' AND p.meta_description <> '') AS seo_ready
    FROM posts p
    LEFT JOIN categories c ON c.id = p.category_id
    LEFT JOIN users u      ON u.id = p.author_id
`

export const GET = guard(async ({ req }) => {
  const url = new URL(req.url)
  const search = (url.searchParams.get('q') ?? '').trim()
  const status = url.searchParams.get('status') ?? ''

  const where: string[] = []
  const params: unknown[] = []
  if (search) {
    params.push(`%${search.toLowerCase()}%`)
    where.push(`(lower(p.title) LIKE $${params.length} OR lower(p.slug) LIKE $${params.length})`)
  }
  if (status) { params.push(status); where.push(`p.status = $${params.length}`) }

  /* Date filter. It reads published_at for anything published and updated_at
     otherwise, because "last 7 days" means two different things depending on
     which you are looking for and this is the one people mean: when did this
     post last matter. `from`/`to` are plain dates from <input type="date">. */
  const when = `coalesce(p.published_at, p.updated_at)`
  const range = url.searchParams.get('range') ?? ''
  const DAYS: Record<string, number> = { '7d': 7, '30d': 30, '90d': 90, '365d': 365 }
  if (DAYS[range]) where.push(`${when} >= now() - interval '${DAYS[range]} days'`)
  else if (range === 'custom') {
    const from = url.searchParams.get('from')
    const to = url.searchParams.get('to')
    if (from) { params.push(from); where.push(`${when} >= $${params.length}::date`) }
    // A date with no time is midnight, so "to 30 Sep" would exclude the 30th.
    if (to) { params.push(to); where.push(`${when} < $${params.length}::date + interval '1 day'`) }
  }

  const rows = await q(`${LIST} ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
                        ORDER BY p.updated_at DESC LIMIT 200`, params)
  return json({ posts: rows })
})

export const POST = guard(async ({ user, req }) => {
  const input = await body<{ title: string }>(req)
  const title = (input.title ?? '').trim()

  // A new post needs a slug that is free, and two people clicking "New post" in
  // the same minute must not collide — hence the suffix loop rather than a
  // straight insert that would throw on the unique index.
  const base = slugify(title) || `untitled-${Date.now().toString(36)}`
  let slug = base
  for (let n = 2; await one('SELECT 1 FROM posts WHERE slug = $1', [slug]); n++) slug = `${base}-${n}`

  const row = await one<{ id: number }>(
    `INSERT INTO posts (slug, title, author_id) VALUES ($1, $2, $3) RETURNING id`,
    [slug, title, user.id],
  )
  return json({ id: row?.id, slug }, 201)
})
