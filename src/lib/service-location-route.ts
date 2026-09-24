import 'server-only'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { SERVICE_SLUGS, type ServiceSlug } from '@/data/service-locations'
import {
  hubDescription, hubTitle, isPartnerHub, loadLocations, pageDescription, pageTitle, pageUrl,
  type Locations, type Page, type Site,
} from '@/lib/service-locations'

/**
 * What the four location route files share (src/app/locations/[site]/…,
 * src/app/minnesota-recycling/[service]/, src/app/wisconsin-recycling/[service]/),
 * so each file is a few lines and the rules live in one place:
 *
 *   - a site hub renders only for a partner site (MN and WI hubs are the
 *     existing facility pages);
 *   - a service page renders only for a service the site offers — anything
 *     else is a 404, never an empty page;
 *   - a draft renders at its URL with noindex (the admin's "View page"), is in
 *     no sitemap and nothing links to it.
 */

export type Found = { all: Locations; site: Site; page: Page }

export async function findServicePage(siteSlug: string, service: string, partnerOnly: boolean): Promise<Found | null> {
  if (!(SERVICE_SLUGS as readonly string[]).includes(service)) return null
  const all = await loadLocations()
  const site = all.sites.find((s) => s.slug === siteSlug)
  if (!site || (partnerOnly && !isPartnerHub(site)) || (!partnerOnly && isPartnerHub(site))) return null
  const page = all.pages.find((p) => p.site === site.slug && p.service === (service as ServiceSlug))
  if (!page || !page.offered) return null
  return { all, site, page }
}

export async function findHub(siteSlug: string): Promise<{ all: Locations; site: Site } | null> {
  const all = await loadLocations()
  const site = all.sites.find((s) => s.slug === siteSlug && isPartnerHub(s))
  return site ? { all, site } : null
}

export function servicePageMetadata(f: Found | null): Metadata {
  if (!f) return {}
  return buildMetadata({
    url: pageUrl(f.site, f.page.service),
    title: pageTitle(f.site, f.page),
    description: pageDescription(f.site, f.page),
    noindex: !f.page.published,
  })
}

export function hubMetadata(h: { all: Locations; site: Site } | null): Metadata {
  if (!h) return {}
  return buildMetadata({
    url: h.site.hubPath,
    title: hubTitle(h.site),
    description: hubDescription(h.site, h.all.pages.filter((p) => p.site === h.site.slug)),
    noindex: !h.site.published,
  })
}

/** Offered services of one site, for generateStaticParams. */
export async function offeredServices(siteSlug: string): Promise<{ service: string }[]> {
  const all = await loadLocations()
  return all.pages.filter((p) => p.site === siteSlug && p.offered).map((p) => ({ service: p.service }))
}
