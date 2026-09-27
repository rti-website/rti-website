import { notFound } from 'next/navigation'
import { ServiceLocationPage } from '@/components/sections/locations/ServiceLocation'
import { CityServicePage } from '@/components/sections/locations/CityServicePage'
import { findServicePage, offeredServices, servicePageMetadata } from '@/lib/service-location-route'
import { cityDocKey, fixedFacilityPage } from '@/data/city-pages'
import { content } from '@/lib/page-content'
import { buildMetadata } from '@/lib/seo'

/**
 * /minnesota-recycling/<service>/ — the Minnesota service pages from the SEO brief
 * (24 Sep 2026). The existing /minnesota-recycling/ facility page is their hub;
 * Asim kept it where it is rather than moving it under /locations/.
 *
 * SINCE 27 SEP 2026 THE THREE PAGES ARE FIXED COPY, not Admin -> Locations
 * content: the designer drew each one (Figma BVtf2AOuUOcYbiMIlcKmbC; copy in
 * src/data/city-pages/) and Asim chose to keep these URLs for them. They are
 * indexed and in the sitemap, and nothing in the menus links to them. The
 * admin-managed rendering below stays for any service the fixed set does not
 * cover, and for the partner sites under /locations/.
 */
export const dynamicParams = true

const SITE = 'minnesota'

export async function generateStaticParams() {
  const fromAdmin = await offeredServices(SITE)
  const fixed = ['battery-recycling', 'light-bulb-recycling', 'electronic-recycling'].filter((s) => fixedFacilityPage(SITE, s))
  return [...new Set([...fixed, ...fromAdmin.map((p) => p.service)])].map((service) => ({ service }))
}

type Props = { params: Promise<{ service: string }> }

export async function generateMetadata({ params }: Props) {
  const { service } = await params
  const fixed = fixedFacilityPage(SITE, service)
  if (fixed) return buildMetadata({ url: fixed.url, title: fixed.seo.title, description: fixed.seo.description })
  return servicePageMetadata(await findServicePage(SITE, service, false))
}

export default async function MinnesotaServicePage({ params }: Props) {
  const { service } = await params
  const fixed = fixedFacilityPage(SITE, service)
  if (fixed) return <CityServicePage page={await content(cityDocKey(fixed))} />
  const found = await findServicePage(SITE, service, false)
  if (!found) notFound()
  return <ServiceLocationPage {...found} />
}
