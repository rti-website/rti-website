'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

/**
 * Repeats the dataLayer page view on in-app navigations.
 *
 * The tracking bootstrap in <head> (src/lib/tracking.ts) pushes
 * page_view_custom once, on the page a visit starts on. Links inside the site
 * navigate without reloading the document, so that script never runs again;
 * this does, on every route change after the first, once Next has swapped
 * the new page's <meta name="rti:…"> tags in.
 *
 * Client only because it has to watch the route. It renders nothing.
 */
export function PageViewTracker() {
  const pathname = usePathname()
  const search = useSearchParams()
  const first = useRef(true)
  useEffect(() => {
    if (first.current) { first.current = false; return }
    const t = window.setTimeout(() => {
      const w = window as unknown as { __rtiPageView?: () => void }
      w.__rtiPageView?.()
    }, 50)
    return () => window.clearTimeout(t)
  }, [pathname, search])
  return null
}
