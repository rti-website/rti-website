import { q } from '@/lib/db'
import { guard, json } from '@/lib/admin-route'
import { canSeeVisitors } from '@/lib/visitor/config'

/**
 * Everything the admin needs the moment it loads, in one request: the signed-in
 * user, the counts behind the navigation, the category list and the site
 * settings. Six round trips on a cold open would be six spinners.
 *
 * The Enquiries badge counts new enquiries; for an agent (db/010) only the
 * ones assigned to them, which is all they can see.
 */
export const GET = guard(async ({ user }) => {
  const [counts] = await q<{ published: string; draft: string; scheduled: string; subs: string; leads: string; media: string }>(`
    SELECT (SELECT count(*) FROM posts WHERE status = 'published')  AS published,
           (SELECT count(*) FROM posts WHERE status = 'draft')      AS draft,
           (SELECT count(*) FROM posts WHERE status = 'scheduled')  AS scheduled,
           (SELECT count(*) FROM subscribers WHERE status <> 'unsubscribed') AS subs,
           (SELECT count(*) FROM leads WHERE status = 'new' AND lead_type = 'form' ${user.role === 'agent' ? 'AND assigned_to = $1' : ''}) AS leads,
           (SELECT count(*) FROM media)                             AS media
  `, user.role === 'agent' ? [user.id] : [])
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

  /* Visitor identification (db/018): whether this person may open Admin ->
     Visitors and Visitor leads (VISITOR_ADMIN_ROLES / VISITOR_ADMIN_EMAILS,
     which the browser cannot read), and the new Business IP Visitor leads for
     the badge. Visitor leads never count in `leads` above. */
  const visitors = canSeeVisitors(user)
  let visitorLeads = 0
  if (visitors) {
    try {
      const [v] = await q<{ n: string }>(`SELECT count(*) AS n FROM leads WHERE lead_type = 'visitor' AND is_business_ip AND visitor_status = 'new'`)
      visitorLeads = Number(v?.n ?? 0)
    } catch { /* db/018 not run yet */ }
  }

  return json({
    user,
    visitors,
    counts: {
      published: Number(counts?.published ?? 0),
      draft: Number(counts?.draft ?? 0),
      scheduled: Number(counts?.scheduled ?? 0),
      subscribers: Number(counts?.subs ?? 0),
      leads: Number(counts?.leads ?? 0),
      media: Number(counts?.media ?? 0),
      visitorLeads,
    },
    categories,
    authors,
    social,
    settings: Object.fromEntries(settings.map((s) => [s.key, s.value])),
  })
})
