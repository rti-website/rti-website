import { q } from '@/lib/db'
import { guard, json } from '@/lib/admin-route'

/**
 * Everything the admin needs the moment it loads, in one request: the signed-in
 * user, the counts behind the navigation, the category list and the site
 * settings. Six round trips on a cold open would be six spinners.
 */
export const GET = guard(async ({ user }) => {
  const [counts] = await q<{ published: string; draft: string; scheduled: string; subs: string; leads: string; media: string }>(`
    SELECT (SELECT count(*) FROM posts WHERE status = 'published')  AS published,
           (SELECT count(*) FROM posts WHERE status = 'draft')      AS draft,
           (SELECT count(*) FROM posts WHERE status = 'scheduled')  AS scheduled,
           (SELECT count(*) FROM subscribers WHERE status <> 'unsubscribed') AS subs,
           (SELECT count(*) FROM leads WHERE status = 'new')        AS leads,
           (SELECT count(*) FROM media)                             AS media
  `)
  /* Ordered so a sub-category always follows its parent — the editor's Category
     dropdown renders that order straight through as optgroups. */
  const categories = await q(`
    SELECT c.id, c.name, c.slug, c.landing_built, c.parent_id, parent.name AS parent_name
      FROM categories c
      LEFT JOIN categories parent ON parent.id = c.parent_id
     ORDER BY coalesce(parent.sort_order, c.sort_order), coalesce(parent.name, c.name),
              (c.parent_id IS NOT NULL), c.sort_order, c.name`)
  const authors = await q("SELECT id, name FROM users WHERE active ORDER BY name")
  const settings = await q<{ key: string; value: unknown }>('SELECT key, value FROM settings')
  const social = await q('SELECT id, platform, url FROM social_links ORDER BY sort_order')

  return json({
    user,
    counts: {
      published: Number(counts?.published ?? 0),
      draft: Number(counts?.draft ?? 0),
      scheduled: Number(counts?.scheduled ?? 0),
      subscribers: Number(counts?.subs ?? 0),
      leads: Number(counts?.leads ?? 0),
      media: Number(counts?.media ?? 0),
    },
    categories,
    authors,
    social,
    settings: Object.fromEntries(settings.map((s) => [s.key, s.value])),
  })
})
