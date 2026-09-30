import { notFound } from 'next/navigation'
import { ServiceLocationPage } from '@/components/sections/locations/ServiceLocation'
import { LocalServicePage } from '@/components/sections/locations/LocalServicePage'
import { findServicePage, offeredServices, servicePageMetadata } from '@/lib/service-location-route'
import { LOCAL_FACILITY_PAGES, localDocKey, localFacilityPage, type LocalPage } from '@/data/local-pages'
import { content } from '@/lib/page-content'
import { buildMetadata } from '@/lib/seo'
import { CountyPage } from '@/components/sections/locations/CountyPage'
import { countyDocKey, countyPage, countySlugs } from '@/data/county-pages'

/**
 * /wisconsin-recycling/<service>/ — the Wisconsin service pages from the SEO brief
 * (24 Sep 2026). The existing /wisconsin-recycling/ facility page is their hub;
 * Asim kept it where it is rather than moving it under /locations/.
 *
 * SINCE 27 SEP 2026 THE THREE PAGES ARE FIXED COPY, not Admin -> Locations
 * content: the designer drew each one (Figma BVtf2AOuUOcYbiMIlcKmbC; copy in
 * src/data/city-pages/) and Asim chose to keep these URLs for them. They are
 * indexed and in the sitemap, and nothing in the menus links to them. The
 * admin-managed rendering below stays for any service the fixed set does not
 * cover, and for the partner sites under /locations/.
 */
/*
 * THE COUNTY PAGES (29 Sep 2026) share this folder: /wisconsin-recycling/
 * <county>/ were 301'd to the facility page at launch and are back at their
 * own URLs on the county template (src/data/county-pages/). A county slug is
 * matched before the service pages; no service slug is also a county slug.
 */
export const dynamicParams = true

const SITE = 'wisconsin'

export async function generateStaticParams() {
  const fromAdmin = await offeredServices(SITE)
  const fixed = Object.keys(LOCAL_FACILITY_PAGES[SITE])
  return [...new Set([...fixed, ...countySlugs(SITE), ...fromAdmin.map((p) => p.service)])].map((service) => ({ service }))
}

type Props = { params: Promise<{ service: string }> }

export async function generateMetadata({ params }: Props) {
  const { service } = await params
  const county = countyPage(SITE, service)
  if (county) return buildMetadata({ url: county.url, title: county.seo.title, description: county.seo.description })
  const local = localFacilityPage(SITE, service)
  if (local) return buildMetadata({ url: local.url, title: local.seo.title, description: local.seo.description })
  return servicePageMetadata(await findServicePage(SITE, service, false))
}

export default async function WisconsinServicePage({ params }: Props) {
  const { service } = await params
  const county = countyPage(SITE, service)
  if (county) return <CountyPage page={await content(countyDocKey(county))} />
  const local = localFacilityPage(SITE, service)
  if (local) return <LocalServicePage page={(await content(localDocKey(local))) as LocalPage} />
  const found = await findServicePage(SITE, service, false)
  if (!found) notFound()
  return <ServiceLocationPage {...found} />
}
