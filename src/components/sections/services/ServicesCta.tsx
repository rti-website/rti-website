import { ClosingCta, type CtaContent } from '@/components/sections/ClosingCta'
import { SERVICES_CTA } from '@/data/services'

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

export function ServicesCta({
  top = 3374.86, label = '6142:1153', content = SERVICES_CTA,
}: {
  top?: number
  label?: string
  content?: CtaContent
} = {}) {
  return <ClosingCta top={top} label={label} content={content} />
}
