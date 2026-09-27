import { q } from '@/lib/db'
import { guard, json } from '@/lib/admin-route'
import { DOCS, DOC_KEYS } from '@/content/registry'
import { allContent } from '@/lib/content'
import { path } from '@/lib/urls'
import { isPartnerHub, pageUrl, readLocationsForAdmin, serviceInfo } from '@/lib/service-locations'
import { fixedFacilityPage } from '@/data/city-pages'

/**
 * Admin -> Pages: every editable document with where it stands (27 Sep 2026).
 * Administrators and editors. See src/content/registry.ts for the list and
 * db/011_page_content.sql for the tables.
 *
 *   status  'original'   never edited, the site shows the code's copy
 *           'published'  edited and published, nothing waiting
 *           'draft'      a saved draft visitors do not see yet
 *
 * EVERY OTHER PAGE TOO (Asim, 27 Sep 2026: "add all the pages here ... so
 * we can access everything from here"). `others` lists the pages whose
 * words live somewhere else in the admin, each with where: blog posts
 * (All Posts), category archives (Categories), partner location pages
 * (Locations), and the one MDX post. The list shows them beside the
 * documents with a button to the screen that edits them. Blog and category
 * page 2, 3 ... are not listed: they are the same page, further on.
 */
export type Other = {
  key: string; title: string; group: string; url: string; note: string | null
  /** Which admin screen edits it; 'code' is a file in the repository. */
  manage: 'posts' | 'cats' | 'locations' | 'code'
  /** The post id, for opening it straight in the post editor. */
  id: number | null
  live: boolean; updatedAt: string | null
}

async function others(): Promise<Other[]> {
  const out: Other[] = []
  try {
    const posts = await q<{ id: number; slug: string; title: string; status: string; updated_at: string }>(
      `SELECT id, slug, title, status, updated_at FROM posts ORDER BY COALESCE(published_at, updated_at) DESC, id DESC`)
    for (const p of posts) {
      out.push({ key: `post:${p.id}`, title: p.title || 'Untitled', group: 'Blog posts', url: path(p.slug), note: null,
        manage: 'posts', id: p.id, live: p.status === 'published', updatedAt: p.updated_at })
    }
  } catch { /* no posts table */ }
  for (const e of allContent().filter((c) => c.type === 'post')) {
    out.push({ key: `mdx:${e.rel}`, title: e.h1, group: 'Blog posts', url: e.url, manage: 'code', id: null, live: true, updatedAt: null,
      note: `Written in code (content/${e.rel}), so it is changed by the developers, not here.` })
  }
  try {
    const cats = await q<{ slug: string; name: string; archive_path: string; source: string; n: number }>(`
      SELECT c.slug, c.name, c.archive_path, c.source,
             (SELECT count(*)::int FROM post_categories pc JOIN posts p ON p.id = pc.post_id
               WHERE pc.category_id = c.id AND p.status = 'published') AS n
        FROM categories c WHERE c.archive_path IS NOT NULL ORDER BY c.sort_order, c.name`)
    for (const c of cats.filter((x) => x.source === 'wordpress' && x.n > 0)) {
      out.push({ key: `cat:${c.slug}`, title: `${c.name} (category)`, group: 'Blog categories', url: path(c.archive_path),
        note: `${c.n} published post${c.n === 1 ? '' : 's'}. The list of posts fills itself; the name is edited under Categories.`,
        manage: 'cats', id: null, live: true, updatedAt: null })
    }
  } catch { /* no categories table */ }
  try {
    const all = await readLocationsForAdmin()
    for (const site of all.sites) {
      const partner = isPartnerHub(site)
      if (partner) {
        out.push({ key: `site:${site.slug}`, title: `${site.data.name || site.slug} (location hub)`, group: 'Partner location pages',
          url: path(site.hubPath), note: null, manage: 'locations', id: null, live: site.published, updatedAt: site.updatedAt })
      }
      for (const pg of all.pages.filter((x) => x.site === site.slug && x.offered)) {
        // The Minnesota and Wisconsin battery, bulb and electronics pages are documents here already.
        if (!partner && fixedFacilityPage(site.slug, pg.service)) continue
        out.push({ key: `loc:${site.slug}/${pg.service}`, title: `${serviceInfo(pg.service).name} in ${site.data.city || site.data.name}`,
          group: 'Partner location pages', url: pageUrl(site, pg.service), note: null, manage: 'locations', id: null,
          live: site.published && pg.published, updatedAt: pg.updatedAt })
      }
    }
  } catch { /* db/008 not run */ }
  return out
}

type Row = {
  key: string; has_draft: boolean; edits: number
  draft_updated_at: string | null; draft_by: string | null
  published_at: string | null; published_by: string | null
}

export const GET = guard(async () => {
  let rows: Row[] = []
  let migrated = true
  try {
    rows = await q<Row>(`
      SELECT c.key, c.draft IS NOT NULL AS has_draft,
             (SELECT count(*)::int FROM jsonb_object_keys(c.published)) AS edits,
             c.draft_updated_at, d.name AS draft_by, c.published_at, p.name AS published_by
      FROM page_content c
      LEFT JOIN users d ON d.id = c.draft_updated_by
      LEFT JOIN users p ON p.id = c.published_by`)
  } catch (err) {
    if ((err as { code?: string }).code !== '42P01') throw err
    migrated = false
  }
  const byKey = new Map(rows.map((r) => [r.key, r]))
  const docs = DOC_KEYS.map((key) => {
    const d = DOCS[key] as { title: string; group: string; urls: string[]; note?: string }
    const r = byKey.get(key)
    return {
      key, title: d.title, group: d.group, urls: d.urls, note: d.note ?? null,
      status: r?.has_draft ? 'draft' : r && r.edits > 0 ? 'published' : 'original',
      draftUpdatedAt: r?.draft_updated_at ?? null, draftBy: r?.draft_by ?? null,
      publishedAt: r?.published_at ?? null, publishedBy: r?.published_by ?? null,
    }
  })
  return json({ docs, others: await others(), migrated })
}, { role: ['administrator', 'editor', 'ads'] })
