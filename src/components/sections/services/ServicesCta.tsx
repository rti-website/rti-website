import { ClosingCta, type CtaContent } from '@/components/sections/ClosingCta'
import { content as pageContent } from '@/lib/page-content'

/**
 * The closing CTA on /services/ (6142:1153), the service detail pages
 * (6146:2431), /industries/ (6246:1081) and /contact-us/ (6365:3459).
 *
 * Nothing is built here any more — see ClosingCta, which is the one band every
 * page on the site now renders. This stays because four callers pass nothing
 * but a `top` and expect the services copy by default, and because the node
 * labels belong with the pages that own them.
 */
export type { CtaContent }

export async function ServicesCta({
  top = 3374.86, label = '6142:1153', content,
}: {
  top?: number
  label?: string
  content?: CtaContent
} = {}) {
  // No `content`: the services page's own closing CTA, as edited in the admin.
  const cta = content ?? (await pageContent('services')).SERVICES_CTA
  return <ClosingCta top={top} label={label} content={cta} />
}
