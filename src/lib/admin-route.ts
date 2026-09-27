import 'server-only'
import { NextResponse } from 'next/server'
import { currentUser, type AdminUser } from '@/lib/auth'

/**
 * The wrapper every admin endpoint goes through.
 *
 * ! THESE ROUTES ARE DYNAMIC, AND THAT IS THE POINT. CLAUDE.md's "zero dynamic
 * routes" check is about PAGES — content Google has to see. A route handler is
 * not wrapped by app/layout.tsx, so `dynamic = 'error'` never applies to it, and
 * the admin can read cookies without loosening anything on the public site. The
 * build will list these under ƒ; that is expected and is the only such entry.
 *
 * Auth is checked here rather than in a proxy so there is exactly one place to
 * get it wrong — and so an endpoint that forgets to use this helper is obvious
 * in review.
 */
export type Handler = (ctx: { user: AdminUser; req: Request }) => Promise<Response>

/**
 * Roles that may only CHANGE things in part of the admin (28 Sep 2026).
 * Any request other than GET or HEAD from one of these roles, to an endpoint
 * outside its list, is refused here, whatever the endpoint itself allows:
 *
 *   ads    the Ads manager: enquiries (and the lead workflow, same endpoint),
 *          Google & Tracking (tracking, maps), subscribers. Everything else
 *          it may only look at.
 *   agent  the Sales agent: enquiries. (Its own screens never wrote anywhere
 *          else; this makes the server say so too.)
 *
 * Reading is still decided by each endpoint's `role` list.
 */
const WRITES: Partial<Record<AdminUser['role'], RegExp>> = {
  ads: /^\/api\/admin\/(leads|tracking|maps|subscribers|session)(\/|$)/,
  agent: /^\/api\/admin\/(leads|session)(\/|$)/,
}

export function guard(handler: Handler, opts: { role?: AdminUser['role'][] } = {}) {
  return async (req: Request): Promise<Response> => {
    let user: AdminUser | null = null
    try {
      user = await currentUser()
    } catch (err) {
      // A missing DATABASE_URL or secret is a setup problem, not a 401 — saying
      // so saves an hour of "why does login not work".
      return NextResponse.json({ error: (err as Error).message, setup: true }, { status: 500 })
    }
    if (!user) return NextResponse.json({ error: 'Not signed in' }, { status: 401 })
    if (opts.role && !opts.role.includes(user.role)) {
      return NextResponse.json({ error: 'Your account cannot do that' }, { status: 403 })
    }
    const writes = WRITES[user.role]
    if (writes && req.method !== 'GET' && req.method !== 'HEAD' && !writes.test(new URL(req.url).pathname)) {
      return NextResponse.json({ error: 'Your account can look at this but not change it.' }, { status: 403 })
    }
    try {
      return await handler({ user, req })
    } catch (err) {
      console.error('[admin]', err)
      return NextResponse.json({ error: (err as Error).message ?? 'Something went wrong' }, { status: 500 })
    }
  }
}

export const json = (data: unknown, status = 200) => NextResponse.json(data, { status })

/** Reads a JSON body, returning {} rather than throwing on an empty one. */
export async function body<T>(req: Request): Promise<Partial<T>> {
  try { return (await req.json()) as Partial<T> } catch { return {} }
}
