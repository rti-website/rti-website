import { NextResponse } from 'next/server'
import { guard, json } from '@/lib/admin-route'
import { embedUrl, getMaps } from '@/lib/maps'

/**
 * /api/admin/maps/embed/?q=<place>&zoom=<n> — where every map iframe in the
 * admin points (Enquiries, and the preview under Google & Tracking). Adds the
 * saved Maps key on the server and redirects the browser to Google's Maps
 * Embed API, so the key is never in a page, the DOM or a JSON answer
 * (management, 27 Sep 2026: "mask this api so it is not showing"). Without a
 * saved key it redirects to Google's keyless embed, which draws the same map
 * a little less crisply.
 *
 * The redirect keeps the admin page as the request's referrer, which is what
 * Google checks the website key against, so the domain restriction still
 * works exactly as before: a map on the live or dev admin, an error box on a
 * laptop (the screens choose the keyless map there themselves).
 */
export const GET = guard(async ({ req }) => {
  const url = new URL(req.url)
  const q = (url.searchParams.get('q') ?? '').trim().slice(0, 300)
  if (!q) return json({ error: 'q is required' }, 400)
  const zoom = Math.min(20, Math.max(1, Number(url.searchParams.get('zoom')) || 12))
  const { browserKey } = await getMaps()
  return NextResponse.redirect(embedUrl(browserKey, q, zoom), { status: 302, headers: { 'cache-control': 'no-store' } })
})
