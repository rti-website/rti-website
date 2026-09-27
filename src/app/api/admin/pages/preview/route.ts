import { draftMode } from 'next/headers'
import { guard, json } from '@/lib/admin-route'

/**
 * Admin -> Pages -> Preview (27 Sep 2026). Turns on Next draft mode for this
 * browser and sends it to the page, which then renders on request with the
 * saved DRAFT copy (src/lib/page-content.ts) instead of the static published
 * page. Administrators and editors only; the cookie Next sets is a secret
 * that changes with every build, so it cannot be forged or reused.
 *
 * The redirect is a relative Location on purpose: behind nginx, req.url is
 * the app's own localhost address, and an absolute redirect built from it
 * would send the editor there.
 */
export const GET = guard(async ({ req }) => {
  const to = safePath(new URL(req.url).searchParams.get('to'))
  if (!to) return json({ error: 'Nothing to preview' }, 400)
  ;(await draftMode()).enable()
  return new Response(null, { status: 307, headers: { Location: to, 'Cache-Control': 'no-store' } })
}, { role: ['administrator', 'editor', 'ads'] })

/** A path on this site, never another host ("//evil.com", "https://…"). */
function safePath(raw: string | null): string | null {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//') || raw.includes('\\')) return null
  return raw
}
