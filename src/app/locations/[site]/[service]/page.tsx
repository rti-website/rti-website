import { notFound } from 'next/navigation'
import { ServiceLocationPage } from '@/components/sections/locations/ServiceLocation'
import { isPartnerHub, loadLocations } from '@/lib/service-locations'
import { findServicePage, servicePageMetadata } from '@/lib/service-location-route'

/**
 * /locations/<site>/<service>/ — e.g. /locations/phoenix-az/battery-recycling/
 * (SEO brief, 24 Sep 2026). Content from Admin -> Locations.
 */
export const dynamicParams = true

export async function generateStaticParams() {
  const all = await loadLocations()
  const partners = new Set(all.sites.filter(isPartnerHub).map((s) => s.slug))
  return all.pages.filter((p) => p.offered && partners.has(p.site)).map((p) => ({ site: p.site, service: p.service }))
}

type Props = { params: Promise<{ site: string; service: string }> }

export async function generateMetadata({ params }: Props) {
  const { site, service } = await params
  return servicePageMetadata(await findServicePage(site, service, true))
}

export default async function LocationServicePage({ params }: Props) {
  const { site, service } = await params
  const found = await findServicePage(site, service, true)
  if (!found) notFound()
  return <ServiceLocationPage {...found} />
}
