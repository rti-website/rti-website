import { q, one } from '@/lib/db'
import { guard, json, body } from '@/lib/admin-route'
import { slugify } from '@/lib/post-content'

/**
 * Blog categories.
 *
 * A category's slug is part of a public URL — /blog/<slug>/ — so this endpoint
 * treats renaming the NAME and renaming the SLUG as two different acts. The name
 * is a label and changes freely. The slug is an address: once a landing page is
 * built and indexed, changing it needs a redirect, and this refuses to do it
 * silently. Today no landing page exists for any of the ten, so the guard costs
 * nothing and will matter the week after they are built.
 */

/* One query, parameterised by its WHERE rather than by a string replace on the
   ORDER BY. The previous version did the latter, and the moment the ORDER BY
   grew a second line the replace silently stopped matching — leaving a query
   with no $1 being handed a parameter, which Postgres rejects outright. */
const LIST = (where = '') => `
  SELECT c.id, c.name, c.slug, c.description, c.landing_built, c.sort_order, c.parent_id,
         parent.name AS parent_name,
         (SELECT count(*) FROM posts p WHERE p.category_id = c.id)                          AS post_count,
         (SELECT count(*) FROM posts p WHERE p.category_id = c.id AND p.status = 'published') AS published_count
    FROM categories c
    LEFT JOIN categories parent ON parent.id = c.parent_id
   ${where}
   ORDER BY coalesce(parent.sort_order, c.sort_order), coalesce(parent.name, c.name),
            (c.parent_id IS NOT NULL), c.sort_order, c.name
`

const shape = (r: Record<string, unknown>) => ({
  ...r,
  post_count: Number(r.post_count ?? 0),
  published_count: Number(r.published_count ?? 0),
})

export const GET = guard(async () => {
  const rows = await q<Record<string, unknown>>(LIST())
  return json({ categories: rows.map(shape) })
})

type Input = { name: string; slug: string; description: string; landing_built: boolean; parent_id: number | null }

/**
 * ONE LEVEL OF NESTING, and this is where that is enforced.
 *
 * A category may have a parent, and that parent may not itself have one. Deeper
 * trees look free and are not — each extra level is a breadcrumb decision, a URL
 * shape decision and a menu layout decision, and nobody has asked for one. The
 * column allows it; this does not.
 */
async function checkParent(parentId: number | null, selfId?: number): Promise<string | null> {
  if (!parentId) return null
  if (selfId && parentId === selfId) return 'A category cannot be its own main category.'
  const parent = await one<{ parent_id: number | null; name: string }>(
    'SELECT parent_id, name FROM categories WHERE id = $1', [parentId])
  if (!parent) return 'That main category no longer exists.'
  if (parent.parent_id) return `${parent.name} is already a sub-category. Categories go one level deep.`
  if (selfId) {
    const children = await one<{ n: number }>('SELECT count(*)::int AS n FROM categories WHERE parent_id = $1', [selfId])
    if (Number(children?.n ?? 0) > 0) return 'This category has sub-categories of its own, so it cannot become one.'
  }
  return null
}

export const POST = guard(async ({ req }) => {
  const input = await body<Input>(req)
  const name = (input.name ?? '').trim()
  if (!name) return json({ error: 'A category needs a name.' }, 400)

  const slug = slugify(input.slug || name)
  if (!slug) return json({ error: 'That name does not make a usable web address. Add a slug by hand.' }, 400)
  if (await one('SELECT 1 FROM categories WHERE slug = $1', [slug])) {
    return json({ error: `/blog/${slug}/ is already taken by another category.` }, 409)
  }

  const parentId = input.parent_id ?? null
  const badParent = await checkParent(parentId)
  if (badParent) return json({ error: badParent }, 409)

  const next = await one<{ n: number }>('SELECT coalesce(max(sort_order), 0) + 1 AS n FROM categories')
  const row = await one(
    `INSERT INTO categories (name, slug, description, sort_order, parent_id) VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, slug, description, landing_built, sort_order, parent_id`,
    [name, slug, (input.description ?? '').trim() || null, next?.n ?? 1, parentId])
  return json({ category: { ...row, post_count: 0, published_count: 0 } }, 201)
}, { role: ['administrator', 'editor'] })

export const PATCH = guard(async ({ req }) => {
  const input = await body<Input & { id: number }>(req)
  if (!input.id) return json({ error: 'Which category?' }, 400)

  const existing = await one<{ slug: string; landing_built: boolean }>(
    'SELECT slug, landing_built FROM categories WHERE id = $1', [input.id])
  if (!existing) return json({ error: 'No such category' }, 404)

  const sets: string[] = []
  const params: unknown[] = [input.id]
  const set = (col: string, value: unknown) => { params.push(value); sets.push(`${col} = $${params.length}`) }

  if (input.name !== undefined) {
    if (!input.name.trim()) return json({ error: 'A category needs a name.' }, 400)
    set('name', input.name.trim())
  }
  if (input.description !== undefined) set('description', input.description.trim() || null)
  if (input.landing_built !== undefined) set('landing_built', input.landing_built)
  if (input.parent_id !== undefined) {
    const badParent = await checkParent(input.parent_id ?? null, input.id)
    if (badParent) return json({ error: badParent }, 409)
    set('parent_id', input.parent_id ?? null)
  }

  if (input.slug !== undefined) {
    const slug = slugify(input.slug)
    if (!slug) return json({ error: 'That is not a usable web address.' }, 400)
    if (slug !== existing.slug) {
      // The address is only load-bearing once something answers at it.
      if (existing.landing_built) {
        return json({ error: `/blog/${existing.slug}/ is a live page. Changing its address needs a redirect, so do that deliberately rather than as a rename.` }, 409)
      }
      if (await one('SELECT 1 FROM categories WHERE slug = $1 AND id <> $2', [slug, input.id])) {
        return json({ error: `/blog/${slug}/ is already taken by another category.` }, 409)
      }
      set('slug', slug)
    }
  }

  if (sets.length === 0) return json({ error: 'Nothing to change.' }, 400)
  const row = await one(`UPDATE categories SET ${sets.join(', ')} WHERE id = $1
                         RETURNING id, name, slug, description, landing_built, sort_order, parent_id`, params)
  const counts = await one<Record<string, unknown>>(LIST('WHERE c.id = $1'), [input.id])
  return json({ category: counts ? shape(counts) : row })
}, { role: ['administrator', 'editor'] })

/**
 * Deleting a category does NOT delete its posts — posts.category_id is
 * ON DELETE SET NULL, so they land back in "no category" where someone can see
 * and refile them. Silently deleting somebody's writing because they tidied a
 * menu would be indefensible.
 */
export const DELETE = guard(async ({ req }) => {
  const id = Number(new URL(req.url).searchParams.get('id'))
  if (!id) return json({ error: 'Which category?' }, 400)

  const row = await one<{ name: string; landing_built: boolean }>(
    'SELECT name, landing_built FROM categories WHERE id = $1', [id])
  if (!row) return json({ error: 'No such category' }, 404)
  if (row.landing_built) {
    return json({ error: `${row.name} has a live landing page. Take the page down first, with a redirect, then delete the category.` }, 409)
  }

  const kids = await one<{ n: number }>('SELECT count(*)::int AS n FROM categories WHERE parent_id = $1', [id])
  if (Number(kids?.n ?? 0) > 0) {
    return json({ error: `${row.name} has ${kids?.n} sub-categor${kids?.n === 1 ? 'y' : 'ies'} under it. Move or delete those first.` }, 409)
  }

  const used = await one<{ n: number }>('SELECT count(*)::int AS n FROM posts WHERE category_id = $1', [id])
  const orphans = Number(used?.n ?? 0)
  if (orphans > 0 && new URL(req.url).searchParams.get('force') !== '1') {
    return json({ error: 'in-use', orphans, name: row.name }, 409)
  }

  await q('DELETE FROM categories WHERE id = $1', [id])
  return json({ ok: true, orphans })
}, { role: ['administrator', 'editor'] })
