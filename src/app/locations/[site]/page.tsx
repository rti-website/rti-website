import { notFound } from 'next/navigation'
import { SiteHubPage } from '@/components/sections/locations/ServiceLocation'
import { isPartnerHub, loadLocations } from '@/lib/service-locations'
import { findHub, hubMetadata } from '@/lib/service-location-route'

/**
 * /locations/<site>/ — a partner drop-off site's hub: address, phone, hours,
 * map, and every service offered there (SEO brief, 24 Sep 2026). The content
 * is edited in Admin -> Locations; see src/data/service-locations.ts.
 * Not in the explicit-route sitemap (bracket folder); published hubs are in
 * /sitemap-locations.xml.
 */
export const dynamicParams = true

export async function generateStaticParams() {
  const all = await loadLocations()
  return all.sites.filter(isPartnerHub).map((s) => ({ site: s.slug }))
}

type Props = { params: Promise<{ site: string }> }

export async function generateMetadata({ params }: Props) {
  const { site } = await params
  return hubMetadata(await findHub(site))
}

export default async function LocationHub({ params }: Props) {
  const { site } = await params
  const found = await findHub(site)
  if (!found) notFound()
  return <SiteHubPage all={found.all} site={found.site} />
}
