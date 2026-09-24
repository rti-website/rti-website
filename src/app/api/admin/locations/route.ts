import { revalidatePath } from 'next/cache'
import { one } from '@/lib/db'
import { guard, json, body } from '@/lib/admin-route'
import { SERVICES, SERVICE_SLUGS, SITE_SEEDS, STARTERS, type ServiceSlug } from '@/data/service-locations'
import {
  affectedPaths, cleanPage, cleanSite, isPartnerHub, pageChecks, pageDescription, pageH1, pageTitle, pageUrl,
  hubDescription, hubH1, hubTitle, readLocationsForAdmin, ready, siteChecks,
  type Locations, type Page, type Site,
} from '@/lib/service-locations'

/**
 * Admin -> Locations (the SEO brief, 24 Sep 2026): the ten sites and their
 * thirty service pages. Everyone signed in can look; administrators, editors
 * and the SEO desk can save and publish.
 *
 * PUBLISHING IS CHECKED HERE, not only in the browser: a page cannot go live
 * until its required checklist items are met (src/lib/service-locations.ts,
 * pageChecks / siteChecks). That is the brief's "unique content" and
 * "pitfalls" turned into rules: no starter intro, no unverified local rules,
 * no unconfirmed address, no page for a service the site does not offer.
 *
 * Every save revalidates all the location URLs, the three service hubs,
 * /all-locations/ and /sitemap-locations.xml, since a publish changes the
 * links on all of them. Forty-odd paths; revalidation is cheap.
 */

const EDITORS = ['administrator', 'editor', 'seo'] as const

function shape(all: Locations) {
  const site = (s: Site) => ({
    ...s,
    partner: isPartnerHub(s),
    checks: siteChecks(s),
    ready: ready(siteChecks(s)),
    seo: { h1: hubH1(s), title: hubTitle(s), description: hubDescription(s, all.pages.filter((p) => p.site === s.slug)) },
  })
  const page = (p: Page) => {
    const s = all.sites.find((x) => x.slug === p.site)!
    const checks = pageChecks(s, p)
    return {
      ...p,
      url: pageUrl(s, p.service),
      checks,
      ready: ready(checks),
      seo: { h1: pageH1(s, p), title: pageTitle(s, p), description: pageDescription(s, p) },
    }
  }
  return {
    sites: all.sites.map(site),
    pages: all.pages.filter((p) => all.sites.some((s) => s.slug === p.site)).map(page),
    services: SERVICE_SLUGS.map((s) => SERVICES[s]),
    starters: STARTERS,
  }
}

export const GET = guard(async () => {
  try {
    return json(shape(await readLocationsForAdmin()))
  } catch (err) {
    if ((err as { code?: string }).code === '42P01') {
      return json({ error: 'This database has not been set up for location pages yet. Run npm run db:setup (db/008_service_locations.sql).', setup008: true }, 503)
    }
    throw err
  }
})

/** kind 'site' saves a site (slug); kind 'page' saves one service page (site + service). */
type Put = {
  kind: 'site' | 'page'; slug: string; site: string; service: ServiceSlug
  data: unknown; offered: boolean; published: boolean
}

export const PUT = guard(async ({ req, user }) => {
  const input = await body<Put>(req)
  const all = await readLocationsForAdmin()

  if (input.kind === 'site') {
    const site = all.sites.find((s) => s.slug === input.slug)
    if (!site) return json({ error: 'Which site?' }, 400)
    const seed = SITE_SEEDS.find((s) => s.slug === site.slug)?.data
    const data = cleanSite(input.data, seed ?? site.data)
    // Minnesota and Wisconsin: their hub is the existing facility page, always live.
    const published = isPartnerHub(site) ? input.published === true : true
    const next: Site = { ...site, data, published }
    if (published && !site.published && !ready(siteChecks(next))) {
      return json({ error: 'This site page is not ready to publish yet: finish the required items in its checklist.' }, 400)
    }
    await one(
      `UPDATE service_sites SET data = $2::jsonb, published = $3, updated_at = now(), updated_by = $4 WHERE slug = $1 RETURNING slug`,
      [site.slug, JSON.stringify(data), published, user.id])
    // Taking a partner hub down takes its service pages down with it, so no
    // live page's breadcrumb points at a hidden one.
    if (!published && site.published) {
      await one(`UPDATE site_services SET published = false, updated_at = now() WHERE site_slug = $1 RETURNING site_slug`, [site.slug])
    }
  } else if (input.kind === 'page') {
    const site = all.sites.find((s) => s.slug === input.site)
    const page = all.pages.find((p) => p.site === input.site && p.service === input.service)
    if (!site || !page) return json({ error: 'Which page?' }, 400)
    const data = cleanPage(input.data)
    const offered = input.offered !== false
    const published = offered && input.published === true
    const next: Page = { ...page, data, offered, published }
    if (published && !page.published && !ready(pageChecks(site, next))) {
      return json({ error: 'This page is not ready to publish yet: finish the required items in its checklist.' }, 400)
    }
    await one(
      `UPDATE site_services SET data = $3::jsonb, offered = $4, published = $5,
              published_at = CASE WHEN $5 THEN COALESCE(published_at, now()) ELSE published_at END,
              updated_at = now(), updated_by = $6
        WHERE site_slug = $1 AND service = $2 RETURNING site_slug`,
      [site.slug, page.service, JSON.stringify(data), offered, published, user.id])
  } else {
    return json({ error: 'Nothing to save.' }, 400)
  }

  const fresh = await readLocationsForAdmin()
  for (const p of affectedPaths(fresh)) revalidatePath(p)
  return json({ ok: true, ...shape(fresh) })
}, { role: [...EDITORS] })
