import { ServiceDetailPage } from '@/components/sections/service/ServiceDetailPage'
import { pageMetadata } from '@/lib/page-meta'
import { content } from '@/lib/page-content'
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
export const generateMetadata = () => pageMetadata({
  url: CONTENT.url,
  title: CONTENT.liveSeo.title,
  description: CONTENT.liveSeo.description,
})

export default async function Page() {
  // The copy with the admin's edits (Admin -> Pages); metadata above stays on the static import.
  const { CONTENT: copy } = await content('electronics-recycling-kit')
  return <ServiceDetailPage content={copy} layout={{ intro: 704, process: 654, audience: 451 }} />
}
