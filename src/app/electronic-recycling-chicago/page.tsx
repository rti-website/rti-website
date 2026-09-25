import { buildMetadata } from '@/lib/seo'
import { ChicagoPage } from '@/components/sections/locations/ChicagoPage'
import { SEO, URL } from '@/data/chicago'

/**
 * "Recycling in Chicago, Illinois" at the old WordPress Chicago URL — see
 * src/data/chicago.ts for why this address, and ChicagoPage for the build.
 * The Chicago card on /all-locations/ links here.
 */
export const metadata = buildMetadata({ url: URL, title: SEO.title, description: SEO.description })

export default function Page() {
  return <ChicagoPage />
}
