import type { Metadata } from 'next'
import '@/styles/globals.css'
import { SITE, TAWK } from '@/lib/site'
import { Suspense } from 'react'
import { graph, organizationNode, facilityNodes, websiteNode } from '@/lib/schema'
import { trackingBootstrap, trackingRuntime } from '@/lib/tracking'
import { PageViewTracker } from '@/components/client/PageViewTracker'
import { TawkChat } from '@/components/client/TawkChat'
import { canvasZoomScript } from '@/lib/canvas-zoom'
import { isPreview } from '@/lib/page-content'
import { PreviewBar } from '@/components/client/PreviewBar'
import { CookieConsent } from '@/components/client/CookieConsent'
import { QuotePicker } from '@/components/client/QuotePicker'
import { VisitorTracker } from '@/components/client/VisitorTracker'
import { visitorConfig } from '@/lib/visitor/config'

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
  const [live, preview] = await Promise.all([trackingRuntime(), isPreview()])
  /* An editor previewing unpublished copy (Admin -> Pages) is not a visitor:
     no GTM, no gtag, no call number swap, so previews never reach analytics
     or Google Ads. Draft mode only exists for a signed in editor. */
  const tracking = preview ? { ...live, gtm: null, gtag: false, calls: [] } : live
  return (
    // suppressHydrationWarning: browser extensions (ColorZilla's
    // cz-shortcut-listen, Grammarly, LastPass) inject attributes onto <html>
    // and <body> before React hydrates, which React reports as a mismatch.
    // It is scoped to these two elements only — real mismatches inside the page
    // still surface.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Sets --canvas-zoom before the body paints, so the desktop board is
            scaled right in Safari too. See src/lib/canvas-zoom.ts. */}
        <script dangerouslySetInnerHTML={{ __html: canvasZoomScript }} />
        <script dangerouslySetInnerHTML={{ __html: trackingBootstrap(tracking) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: graph(organizationNode(), ...facilityNodes(), websiteNode()) }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* No GTM <noscript> fallback since 27 Oct 2026: Google's tags load only
            after Analytics consent, and a browser without JavaScript can never
            give it (src/components/client/CookieConsent.tsx). */}
        {children}
        {/* useSearchParams needs a Suspense boundary to stay static. */}
        <Suspense fallback={null}><PageViewTracker /></Suspense>
        {/* Visitor identification (docs/visitor-identification/, 29 Oct 2026):
            only when VISITOR_CAPTURE is on for this build, never in a preview,
            and it sends nothing until Analytics consent. */}
        {visitorConfig.captureOn() && !preview && <Suspense fallback={null}><VisitorTracker /></Suspense>}
        {/* Live chat, loaded after the page (management, 24 Sep 2026). */}
        <TawkChat propertyId={TAWK.propertyId} widgetId={TAWK.widgetId} />
        {/* Cookie banner and settings panel (management, 27 Oct 2026). */}
        {!preview && <CookieConsent orgLookup={visitorConfig.captureOn()} />}
        {/* Get a Quote asks "Who is this for?" first (28 Oct 2026). */}
        <QuotePicker />
        {preview && <PreviewBar />}
      </body>
    </html>
  )
}
