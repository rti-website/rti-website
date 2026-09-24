'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'

/**
 * Tawk.to live chat — the widget the WordPress site had, restored on
 * management's request on 24 Sep 2026 with their embed IDs (TAWK in
 * src/lib/site.ts).
 *
 * Why a component and not the pasted snippet: the snippet inserts its script
 * the moment the page parses. `lazyOnload` waits until the page has finished
 * loading, so the chat (a few hundred KB of third party script) never slows
 * the first paint or the Largest Contentful Paint Google measures. The
 * visitor sees the bubble a moment later; nothing else changes.
 *
 * Not on /admin: the team's own admin screens are not a place to offer
 * visitors a chat. Client only because it needs the current path.
 */
export function TawkChat({ propertyId, widgetId }: { propertyId: string; widgetId: string }) {
  const path = usePathname()
  if (!propertyId || !widgetId || path?.startsWith('/admin')) return null
  const src = `https://embed.tawk.to/${encodeURIComponent(propertyId)}/${encodeURIComponent(widgetId)}`
  return (
    <Script id="tawk-to" strategy="lazyOnload">
      {`var Tawk_API=Tawk_API||{},Tawk_LoadStart=new Date();(function(){var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];s1.async=true;s1.src=${JSON.stringify(src)};s1.charset="UTF-8";s1.setAttribute("crossorigin","*");s0.parentNode.insertBefore(s1,s0);})();`}
    </Script>
  )
}
