import { notFound } from 'next/navigation'
import { ServiceLocationPage } from '@/components/sections/locations/ServiceLocation'
import { findServicePage, offeredServices, servicePageMetadata } from '@/lib/service-location-route'

/**
 * /wisconsin-recycling/<service>/ — the Wisconsin service pages from the SEO brief
 * (24 Sep 2026). The existing /wisconsin-recycling/ facility page is their hub;
 * Asim kept it where it is rather than moving it under /locations/.
 * Content from Admin -> Locations.
 */
export const dynamicParams = true

export async function generateStaticParams() {
  return offeredServices('wisconsin')
}

type Props = { params: Promise<{ service: string }> }

export async function generateMetadata({ params }: Props) {
  const { service } = await params
  return servicePageMetadata(await findServicePage('wisconsin', service, false))
}

export default async function WisconsinServicePage({ params }: Props) {
  const { service } = await params
  const found = await findServicePage('wisconsin', service, false)
  if (!found) notFound()
  return <ServiceLocationPage {...found} />
}
