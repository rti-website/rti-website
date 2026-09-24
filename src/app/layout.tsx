import type { Metadata } from 'next'
import '@/styles/globals.css'
import { SITE, TAWK } from '@/lib/site'
import { Suspense } from 'react'
import { graph, organizationNode, facilityNodes, websiteNode } from '@/lib/schema'
import { trackingBootstrap, trackingRuntime } from '@/lib/tracking'
import { PageViewTracker } from '@/components/client/PageViewTracker'
import { TawkChat } from '@/components/client/TawkChat'

/**
 * `dynamic = 'error'` makes the BUILD FAIL if any page reaches for request-time
 * data — the guard that guarantees Googlebot and the AI crawlers get full HTML.
 * Do not remove it, and do not enable `cacheComponents` in next.config.
 */
export const dynamic = 'error'

export const metadata: Metadata = { metadataBase: new URL(SITE.origin) }

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  /*
   * Tracking is installed HERE and only here — GTM, UTM capture, the
   * dataLayer — so it is on every public page, including any the CMS creates
   * later, and no editor ever pastes a tag into a page (the SEO brief,
   * 23 Sep 2026). Settings come from Admin -> Settings -> Analytics &
   * Tracking; see src/lib/tracking.ts for what loads where.
   */
  const tracking = await trackingRuntime()
  return (
    // suppressHydrationWarning: browser extensions (ColorZilla's
    // cz-shortcut-listen, Grammarly, LastPass) inject attributes onto <html>
    // and <body> before React hydrates, which React reports as a mismatch.
    // It is scoped to these two elements only — real mismatches inside the page
    // still surface.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: trackingBootstrap(tracking) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: graph(organizationNode(), ...facilityNodes(), websiteNode()) }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* GTM's no-JavaScript fallback, straight after <body> as Google asks. */}
        {tracking.gtm && (
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${tracking.gtm}`}
              height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} title="Google Tag Manager" />
          </noscript>
        )}
        {children}
        {/* useSearchParams needs a Suspense boundary to stay static. */}
        <Suspense fallback={null}><PageViewTracker /></Suspense>
        {/* Live chat, loaded after the page (management, 24 Sep 2026). */}
        <TawkChat propertyId={TAWK.propertyId} widgetId={TAWK.widgetId} />
      </body>
    </html>
  )
}
