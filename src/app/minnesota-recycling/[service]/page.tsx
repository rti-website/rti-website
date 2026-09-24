import { notFound } from 'next/navigation'
import { ServiceLocationPage } from '@/components/sections/locations/ServiceLocation'
import { findServicePage, offeredServices, servicePageMetadata } from '@/lib/service-location-route'

/**
 * /minnesota-recycling/<service>/ — the Minnesota service pages from the SEO brief
 * (24 Sep 2026). The existing /minnesota-recycling/ facility page is their hub;
 * Asim kept it where it is rather than moving it under /locations/.
 * Content from Admin -> Locations.
 */
export const dynamicParams = true

export async function generateStaticParams() {
  return offeredServices('minnesota')
}

type Props = { params: Promise<{ service: string }> }

export async function generateMetadata({ params }: Props) {
  const { service } = await params
  return servicePageMetadata(await findServicePage('minnesota', service, false))
}

export default async function MinnesotaServicePage({ params }: Props) {
  const { service } = await params
  const found = await findServicePage('minnesota', service, false)
  if (!found) notFound()
  return <ServiceLocationPage {...found} />
}
