import 'server-only'
import { NextResponse } from 'next/server'
import { path } from '@/lib/urls'

/**
 * Plain HTML form posts for the public API routes — RTI-10 in the launch
 * audit, 23 Sep 2026.
 *
 * Every public form is a client component that `fetch()`es JSON from its
 * onSubmit. Until it hydrates, though, a <form> with no method and no action
 * is a GET to the page it sits on, so a visitor who hit "Send" in the first
 * second on a slow phone put their name, email and phone into the address
 * bar, the server log and the analytics referrer. The forms now carry
 * `method="post"` and an `action` pointing at the same route the script
 * uses, and the routes accept that body as well as JSON:
 *
 *   JSON (the script)  -> JSON back, exactly as before
 *   form (no script)   -> 303 to /thank-you/ on success, a small 400 page
 *                         with a way back on a validation error
 *
 * The validation, honeypot and throttle in each route are untouched; this
 * only decides how the body is read and how the answer is written.
 */

export type Body = {
  payload: Record<string, unknown>
  /** True for application/x-www-form-urlencoded or multipart bodies. */
  isForm: boolean
  /** Path of the page the post came from (Referer), or null. Path only. */
  from: string | null
}

export async function readBody(req: Request): Promise<Body | null> {
  const ct = req.headers.get('content-type') ?? ''
  const isForm = ct.includes('application/x-www-form-urlencoded') || ct.includes('multipart/form-data')
  let from: string | null = null
  try {
    const ref = req.headers.get('referer')
    // Path only: it is used as a link back and as the lead's source page,
    // and nothing here should echo another origin.
    if (ref) from = new URL(ref).pathname.slice(0, 300)
  } catch { /* no usable referer */ }

  try {
    if (isForm) {
      const fd = await req.formData()
      const payload: Record<string, unknown> = {}
      for (const [k, v] of fd) if (typeof v === 'string') payload[k] = v
      return { payload, isForm, from }
    }
    const json = await req.json()
    if (!json || typeof json !== 'object') return null
    return { payload: json as Record<string, unknown>, isForm, from }
  } catch {
    return null
  }
}

/** Where a script-less post lands when it worked. Relative on purpose: behind
 *  nginx `req.url` is 127.0.0.1, and a relative Location is valid HTTP. */
export function formDone(): Response {
  return new Response(null, { status: 303, headers: { Location: path('/thank-you/') } })
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

/** The error page for a script-less post. Plain, readable, one link back. */
export function formError(message: string, status: number, from: string | null): Response {
  const back = from && from.startsWith('/') ? from : path('/contact-us/')
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Please check the form | Recycle Technologies</title>
<style>body{font-family:system-ui,sans-serif;max-width:560px;margin:15vh auto;padding:0 20px;color:#212529;line-height:1.5}a{color:#046c73}</style></head>
<body><h1>Please check the form</h1><p>${esc(message)}</p><p><a href="${esc(back)}">Go back and try again</a></p></body></html>`
  return new Response(html, { status, headers: { 'content-type': 'text/html; charset=utf-8' } })
}

/**
 * One answer for both kinds of caller: JSON for the script, the page above
 * for a plain form post. `extra` rides along in the JSON only (e.g. `field`,
 * which the script uses to focus the input that failed).
 */
export function fail(body: Pick<Body, 'isForm' | 'from'>, error: string, status: number, extra: Record<string, unknown> = {}): Response {
  return body.isForm ? formError(error, status, body.from) : NextResponse.json({ error, ...extra }, { status })
}
