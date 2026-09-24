import { ServiceDetailPage } from '@/components/sections/service/ServiceDetailPage'
import { buildMetadata } from '@/lib/seo'
import { CONTENT } from '@/data/electronics-recycling-kit'

/**
 * Electronics Recycling Kit — the shared "Service Details" frame (6142:2048)
 * with the kit doc's copy (src/data/electronics-recycling-kit.ts), Asim,
 * 24 Sep 2026. It is the one page with the optional `audience` band ("Who Is
 * the Program For?") after the process block.
 *
 * `layout` is measured, not guessed: after a copy change rebuild, start the
 * server and run `node scripts/measure-service-pages.mjs --write`.
 */
export const metadata = buildMetadata({
  url: CONTENT.url,
  title: CONTENT.liveSeo.title,
  description: CONTENT.liveSeo.description,
})

export default function Page() {
  return <ServiceDetailPage content={CONTENT} layout={{ intro: 704, process: 654, audience: 451 }} />
}
