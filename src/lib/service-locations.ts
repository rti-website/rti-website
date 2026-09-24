import 'server-only'
import { cache as perRequest } from 'react'
import { q, tx } from '@/lib/db'
import { milesBetween, type LatLng } from '@/lib/geo'
import { zipPoint } from '@/lib/zips'
import { path } from '@/lib/urls'
import {
  SERVICES, SERVICE_SLUGS, SITE_SEEDS, STARTERS,
  type Faq, type PageData, type Pair, type Pickup, type Review, type ServiceSlug, type SiteData,
} from '@/data/service-locations'

/**
 * Location based service pages: reading, shaping and judging them. The
 * brief, the URLs and the starters are explained in
 * src/data/service-locations.ts; the tables in db/008.
 *
 * Read the same way as the blog posts (src/lib/posts-db.ts): at build time
 * for the prerendered pages, and again when an admin save revalidates them,
 * so this is build time data and CLAUDE.md rule 2 holds. A database that has
 * not run db/008 builds the site from the starters, every page a draft.
 */

export type Site = { slug: string; hubPath: string; published: boolean; sort: number; data: SiteData; updatedAt: string | null }
export type Page = {
  site: string; service: ServiceSlug; offered: boolean; published: boolean
  publishedAt: string | null; data: PageData; updatedAt: string | null
}
export type Locations = { sites: Site[]; pages: Page[]; fromDb: boolean }

/* ------------------------------------------------------------ cleaning -- */

const str = (v: unknown, max = 4000) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const bool = (v: unknown) => v === true
const strs = (v: unknown, max = 40) =>
  (Array.isArray(v) ? v : []).map((x) => str(x, 300)).filter(Boolean).slice(0, max)
const pairs = (v: unknown): Pair[] =>
  (Array.isArray(v) ? v : []).map((x) => ({ label: str(x?.label, 120), text: str(x?.text, 600) }))
    .filter((p) => p.label || p.text).slice(0, 30)
const faqs = (v: unknown): Faq[] =>
  (Array.isArray(v) ? v : []).map((x) => ({ q: str(x?.q, 240), a: str(x?.a, 1500) }))
    .filter((f) => f.q && f.a).slice(0, 20)
const reviews = (v: unknown): Review[] =>
  (Array.isArray(v) ? v : []).map((x) => ({ quote: str(x?.quote, 800), author: str(x?.author, 120), place: str(x?.place, 120) }))
    .filter((r) => r.quote).slice(0, 12)
const date = (v: unknown) => (/^\d{4}-\d{2}-\d{2}$/.test(str(v)) ? str(v) : '')

export function cleanSite(raw: unknown, base?: SiteData): SiteData {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
  const b = base
  const pickup = (['yes', 'no', 'ask'] as Pickup[]).includes(r.pickup as Pickup) ? (r.pickup as Pickup) : (b?.pickup ?? 'ask')
  return {
    name: str(r.name, 80) || b?.name || '',
    city: str(r.city, 80) || b?.city || '',
    state: (str(r.state, 2) || b?.state || '').toUpperCase(),
    address: str(r.address, 200),
    addressConfirmed: bool(r.addressConfirmed),
    phone: str(r.phone, 40),
    hours: str(r.hours, 300),
    hoursConfirmed: bool(r.hoursConfirmed),
    operator: r.operator === 'rti' ? 'rti' : r.operator === 'partner' ? 'partner' : (b?.operator ?? 'partner'),
    dropoff: r.dropoff === undefined ? (b?.dropoff ?? true) : bool(r.dropoff),
    pickup,
    mailin: r.mailin === undefined ? (b?.mailin ?? true) : bool(r.mailin),
    intro: str(r.intro, 1500),
    logistics: str(r.logistics, 1000),
    nearby: strs(r.nearby, 30),
    certifications: strs(r.certifications, 10),
    photo: str(r.photo, 500),
    seoTitle: str(r.seoTitle, 120),
    seoDescription: str(r.seoDescription, 320),
    notes: str(r.notes, 2000),
  }
}

export function cleanPage(raw: unknown): PageData {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
  return {
    intro: str(r.intro, 1500),
    audiences: strs(r.audiences, 12),
    accepted: pairs(r.accepted),
    acceptedConfirmed: bool(r.acceptedConfirmed),
    notAccepted: strs(r.notAccepted, 20),
    steps: pairs(r.steps).slice(0, 8),
    packaging: strs(r.packaging, 12),
    certificate: str(r.certificate, 600),
    compliance: str(r.compliance, 3000),
    complianceSource: str(r.complianceSource, 500),
    complianceVerifiedBy: str(r.complianceVerifiedBy, 120),
    complianceVerifiedAt: date(r.complianceVerifiedAt),
    reviews: reviews(r.reviews),
    faqs: faqs(r.faqs),
    trackingPhone: str(r.trackingPhone, 40),
    h1: str(r.h1, 120),
    seoTitle: str(r.seoTitle, 120),
    seoDescription: str(r.seoDescription, 320),
    notes: str(r.notes, 2000),
  }
}

/* ------------------------------------------------------------- reading -- */

const BUILD = process.env.NEXT_PHASE === 'phase-production-build'
function buildOnce<T>(load: () => Promise<T>): () => Promise<T> {
  const once = perRequest(load)
  let kept: Promise<T> | null = null
  return () => (BUILD ? (kept ??= once()) : once())
}

/** The starters as rows: what a database without db/008 (or a fresh clone) builds from. */
function fromSeeds(): Locations {
  const sites = SITE_SEEDS.map((s) => ({
    slug: s.slug, hubPath: s.hubPath, published: s.data.operator === 'rti', sort: s.sort, data: s.data, updatedAt: null,
  }))
  const pages = SITE_SEEDS.flatMap((s) => SERVICE_SLUGS.map((svc) => ({
    site: s.slug, service: svc, offered: s.offered[svc], published: false, publishedAt: null,
    data: STARTERS[svc], updatedAt: null,
  })))
  return { sites, pages, fromDb: false }
}

let seeded = false
/**
 * Create any site or page row that does not exist yet, from the starters.
 * Never overwrites. Minnesota and Wisconsin start "published" because their
 * hubs are the existing facility pages.
 *
 * !! ONE TRANSACTION BEHIND AN ADVISORY LOCK, AND `ON CONFLICT DO NOTHING`
 * WITH NO TARGET. `next build` collects pages in several worker processes at
 * once and each one seeds on its first read. On the dev server's first build
 * (24 Sep 2026) two workers inserted the same site together and one failed on
 * the hub_path index: "duplicate key value violates unique constraint
 * service_sites_hub_path_key". `ON CONFLICT (slug)` only covered the slug
 * index. Now the lock queues the workers (the second finds every row there
 * and inserts nothing), and a conflict on any unique index is skipped.
 */
export async function ensureSeeded(): Promise<void> {
  if (seeded) return
  await tx(async (run) => {
    await run(`SELECT pg_advisory_xact_lock(hashtext('rti.service_locations.seed'))`)
    for (const s of SITE_SEEDS) {
      await run(
        `INSERT INTO service_sites (slug, hub_path, published, sort_order, data)
         VALUES ($1, $2, $3, $4, $5::jsonb) ON CONFLICT DO NOTHING`,
        [s.slug, s.hubPath, s.data.operator === 'rti', s.sort, JSON.stringify(s.data)])
      for (const svc of SERVICE_SLUGS) {
        await run(
          `INSERT INTO site_services (site_slug, service, offered, data)
           VALUES ($1, $2, $3, $4::jsonb) ON CONFLICT DO NOTHING`,
          [s.slug, svc, s.offered[svc], JSON.stringify(STARTERS[svc])])
      }
    }
  })
  seeded = true
}

type SiteRow = { slug: string; hub_path: string; published: boolean; sort_order: number; data: unknown; updated_at: string | null }
type PageRow = {
  site_slug: string; service: ServiceSlug; offered: boolean; published: boolean
  published_at: string | null; data: unknown; updated_at: string | null
}

async function read(): Promise<Locations> {
  await ensureSeeded()
  const [siteRows, pageRows] = await Promise.all([
    q<SiteRow>(`SELECT slug, hub_path, published, sort_order, data, updated_at FROM service_sites ORDER BY sort_order, slug`),
    q<PageRow>(`SELECT site_slug, service, offered, published, published_at, data, updated_at FROM site_services`),
  ])
  const seedBySlug = new Map(SITE_SEEDS.map((s) => [s.slug, s.data]))
  return {
    fromDb: true,
    sites: siteRows.map((r) => ({
      slug: r.slug, hubPath: r.hub_path, published: r.published, sort: r.sort_order,
      data: cleanSite(r.data, seedBySlug.get(r.slug)), updatedAt: r.updated_at,
    })),
    pages: pageRows
      .filter((r) => (SERVICE_SLUGS as readonly string[]).includes(r.service))
      .map((r) => ({
        site: r.site_slug, service: r.service, offered: r.offered, published: r.published && r.offered,
        publishedAt: r.published_at, data: cleanPage(r.data), updatedAt: r.updated_at,
      })),
  }
}

/** Everything, for pages and the sitemap. Starters when there is no db/008. */
export const loadLocations = buildOnce(async (): Promise<Locations> => {
  if (!process.env.DATABASE_URL) return fromSeeds()
  try {
    return await read()
  } catch (err) {
    const code = (err as { code?: string }).code
    // 42P01: the tables are not there — db/008 has not been run. Build from
    // the starters (all drafts) rather than fail; anything else is a real fault.
    if (code === '42P01') {
      console.warn('[locations] db/008_service_locations.sql has not been run; building location pages as drafts.')
      return fromSeeds()
    }
    throw err
  }
})

/** Fresh, uncached — for the admin. */
export async function readLocationsForAdmin(): Promise<Locations> {
  return read()
}

/* ---------------------------------------------------- urls and wording -- */

export const serviceInfo = (svc: ServiceSlug) => SERVICES[svc]

export function pageUrl(site: Site, svc: ServiceSlug): string {
  return path(`${site.hubPath}/${svc}`)
}

/** Partner sites have hubs we render; MN and WI hubs are the existing facility pages. */
export const isPartnerHub = (site: Site) => site.hubPath.startsWith('/locations/')

export function pageH1(site: Site, page: Page): string {
  return page.data.h1 || `${SERVICES[page.service].name} in ${site.data.name}`
}

export function pageTitle(site: Site, page: Page): string {
  return page.data.seoTitle || `${pageH1(site, page)} | Recycle Technologies`
}

const PICKUP_WORDS: Record<Pickup, string> = { yes: 'business pickup', no: '', ask: '' }

export function pageDescription(site: Site, page: Page): string {
  if (page.data.seoDescription) return page.data.seoDescription
  const s = SERVICES[page.service]
  const ways = [
    site.data.dropoff ? `drop-off in ${site.data.city}` : '',
    PICKUP_WORDS[site.data.pickup],
    site.data.mailin ? 'mail-in kits' : '',
  ].filter(Boolean)
  const how = ways.length > 1 ? `${ways.slice(0, -1).join(', ')} and ${ways.at(-1)}` : ways[0] ?? ''
  const text = `${s.name} in ${site.data.name} from Recycle Technologies${how ? `: ${how}` : ''}. See what we accept and get a quote.`
  return text.length > 160 ? `${text.slice(0, 157).replace(/\s+\S*$/, '')}…` : text
}

export function hubH1(site: Site): string {
  return `Recycling in ${site.data.name}`
}
export function hubTitle(site: Site): string {
  return site.data.seoTitle || `${hubH1(site)} | Recycle Technologies`
}
export function hubDescription(site: Site, pages: Page[]): string {
  if (site.data.seoDescription) return site.data.seoDescription
  const names = pages.filter((p) => p.offered).map((p) => SERVICES[p.service].noun)
  const list = names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names.at(-1)}` : names[0] ?? 'recyclables'
  return `Recycle ${list} in ${site.data.name} with Recycle Technologies. Drop-off address, hours, what is accepted and how to get a quote.`
}

/** The contact page, prefilled with this service and place. */
export function quoteLink(site: Site, svc: ServiceSlug): { service: string; location: string } {
  return { service: SERVICES[svc].quoteService, location: `${site.data.city}, ${site.data.state}` }
}

/* --------------------------------------------------------------- places -- */

/** A site's point: the centre of the ZIP in its address. */
export function sitePoint(site: Site): LatLng | null {
  const zip = site.data.address.match(/\b(\d{5})(?:-\d{4})?\b(?!.*\b\d{5}\b)/)?.[1]
  const p = zip ? zipPoint(zip) : null
  return p ? { lat: p.lat, lng: p.lng } : null
}

/** The same service, published, at the nearest other sites. */
export function nearbyPages(all: Locations, site: Site, svc: ServiceSlug, max = 3): { site: Site; page: Page; miles: number | null }[] {
  const here = sitePoint(site)
  return all.pages
    .filter((p) => p.service === svc && p.published && p.site !== site.slug)
    .map((p) => {
      const s = all.sites.find((x) => x.slug === p.site)!
      const there = s ? sitePoint(s) : null
      return { site: s, page: p, miles: here && there ? Math.round(milesBetween(here, there)) : null }
    })
    .filter((x) => x.site)
    .sort((a, b) => (a.miles ?? 1e9) - (b.miles ?? 1e9))
    .slice(0, max)
}

/* ------------------------------------------------------------ readiness -- */

export type Check = { label: string; done: boolean; required: boolean }

const isStarterIntro = (t: string) => t.trim().length < 120

export function pageChecks(site: Site, page: Page): Check[] {
  const d = page.data
  return [
    { label: 'Service offered at this site', done: page.offered, required: true },
    { label: 'Site address confirmed as current', done: site.data.addressConfirmed, required: true },
    { label: 'Site phone and hours confirmed', done: Boolean(site.data.phone) && site.data.hoursConfirmed, required: true },
    { label: isPartnerHub(site) ? 'Site page published' : 'Site page (existing facility page)', done: site.published, required: true },
    { label: 'Intro written for this page (2 to 3 sentences, 120+ characters)', done: !isStarterIntro(d.intro), required: true },
    { label: 'Accepted items checked for this site (at least 3)', done: d.acceptedConfirmed && d.accepted.length >= 3, required: true },
    { label: 'Local rules written and verified (who and when)', done: d.compliance.length >= 80 && Boolean(d.complianceVerifiedBy) && Boolean(d.complianceVerifiedAt), required: true },
    { label: 'At least 5 FAQs', done: d.faqs.length >= 5, required: true },
    { label: 'Nearby cities served (on the site, at least 3)', done: site.data.nearby.length >= 3, required: false },
    { label: 'What is not accepted', done: d.notAccepted.length > 0, required: false },
    { label: 'A real review from the area', done: d.reviews.length > 0, required: false },
    { label: 'A real photo of the site', done: Boolean(site.data.photo), required: false },
  ]
}

export function siteChecks(site: Site): Check[] {
  const d = site.data
  return [
    { label: 'Address confirmed as current', done: d.addressConfirmed, required: true },
    { label: 'Phone and hours confirmed', done: Boolean(d.phone) && d.hoursConfirmed, required: true },
    { label: 'Intro written for this site (80+ characters)', done: d.intro.trim().length >= 80, required: true },
    { label: 'Nearby cities served (at least 3)', done: d.nearby.length >= 3, required: true },
    { label: 'Pickup answered (yes or no, not "ask")', done: d.pickup !== 'ask', required: false },
    { label: 'A real photo of the site', done: Boolean(d.photo), required: false },
  ]
}

export const ready = (checks: Check[]) => checks.every((c) => !c.required || c.done)

/** Every public URL a save can change, for revalidatePath. */
export function affectedPaths(all: Locations): string[] {
  const out = new Set<string>(['/all-locations/', '/sitemap-locations.xml'])
  for (const s of SERVICE_SLUGS) out.add(SERVICES[s].hub)
  for (const site of all.sites) {
    out.add(site.hubPath)
    for (const svc of SERVICE_SLUGS) out.add(pageUrl(site, svc))
  }
  return [...out]
}

/* ------------------------------------------------------------- linking -- */

/** Published service pages of one site, by service. Nothing for a draft site. */
export function publishedLinks(all: Locations, siteSlug: string): Partial<Record<ServiceSlug, string>> {
  const site = all.sites.find((s) => s.slug === siteSlug)
  if (!site?.published) return {}
  const out: Partial<Record<ServiceSlug, string>> = {}
  for (const p of all.pages) if (p.site === siteSlug && p.published) out[p.service] = pageUrl(site, p.service)
  return out
}

/** The material and chip labels the location cards and facility pages already use. */
export const MATERIAL_SERVICE: Record<string, ServiceSlug> = {
  'Electronics': 'electronic-recycling',
  'Batteries': 'battery-recycling',
  'Light Bulbs': 'light-bulb-recycling',
}

/** Label -> URL for the published service pages of a site, keyed by material label. */
export function materialLinks(all: Locations, siteSlug: string): Record<string, string> {
  const links = publishedLinks(all, siteSlug)
  const out: Record<string, string> = {}
  for (const [label, svc] of Object.entries(MATERIAL_SERVICE)) if (links[svc]) out[label] = links[svc]!
  return out
}

/** Every published page of one service, in site order (Minnesota, Wisconsin, then the partners). */
export function servicePlaces(all: Locations, svc: ServiceSlug): { name: string; href: string }[] {
  return all.sites
    .filter((s) => s.published)
    .map((s) => ({ s, p: all.pages.find((p) => p.site === s.slug && p.service === svc) }))
    .filter((x) => x.p?.published)
    .map((x) => ({ name: x.s.data.name, href: pageUrl(x.s, svc) }))
}
