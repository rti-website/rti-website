import type { Metadata } from 'next'
import '@/styles/globals.css'
import { SITE } from '@/lib/site'
import { graph, organizationNode, facilityNodes, websiteNode } from '@/lib/schema'

/**
 * `dynamic = 'error'` makes the BUILD FAIL if any page reaches for request-time
 * data — the guard that guarantees Googlebot and the AI crawlers get full HTML.
 * Do not remove it, and do not enable `cacheComponents` in next.config.
 */
export const dynamic = 'error'

export const metadata: Metadata = { metadataBase: new URL(SITE.origin) }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: browser extensions (ColorZilla's
    // cz-shortcut-listen, Grammarly, LastPass) inject attributes onto <html>
    // and <body> before React hydrates, which React reports as a mismatch.
    // It is scoped to these two elements only — real mismatches inside the page
    // still surface.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: graph(organizationNode(), ...facilityNodes(), websiteNode()) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
