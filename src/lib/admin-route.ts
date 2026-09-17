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
