/**
 * Every admin fetch goes through here.
 *
 * ! THE TRAILING SLASH IS NOT COSMETIC. next.config sets `trailingSlash: true`,
 * so a request to /api/admin/posts is answered with a 308 to /api/admin/posts/
 * before the handler runs. It happens to survive for GET; for a POST it is an
 * extra round trip on every save, and it is the kind of thing that works in dev
 * and confuses everyone in production. One helper, one slash, no surprises.
 */
export function api(path: string, params?: URLSearchParams): string {
  const base = `/api/admin${path}`.replace(/\/+$/, '')
  const query = params?.toString()
  return `${base}/${query ? `?${query}` : ''}`
}

/**
 * A read that cannot take the whole admin down.
 *
 * !! WHY THIS EXISTS. Every list in here was written as
 *      fetch(api('/media')).then(r => r.json()).then(setRows)
 * with no catch. `fetch` rejects on a NETWORK failure — the dev server
 * recompiling, a dropped wifi, a database that went away — and an unhandled
 * rejection inside a useEffect is a full-screen "Runtime TypeError: Failed to
 * fetch" with a fifty-frame React stack. The data did not matter and the request
 * would have succeeded a second later, but the editor is gone and so is anything
 * unsaved.
 *
 * This never throws. Callers get `error` and show a line with a Try again on it.
 */
export type Read<T> = { ok: true; data: T } | { ok: false; error: string }

export async function getJSON<T>(path: string, params?: URLSearchParams): Promise<Read<T>> {
  let res: Response
  try {
    res = await fetch(api(path, params))
  } catch {
    // No status, no body: the request never reached the server.
    return { ok: false, error: 'Could not reach the server. It may still be starting up.' }
  }
  if (res.status === 401) return { ok: false, error: 'Your session has expired. Sign in again.' }
  let data: unknown
  try { data = await res.json() } catch { return { ok: false, error: 'The server sent something unreadable.' } }
  if (!res.ok) return { ok: false, error: (data as { error?: string }).error ?? `Request failed (${res.status}).` }
  return { ok: true, data: data as T }
}

/** The same guarantee for a write. `extra` is anything fetch takes. */
export async function sendJSON<T>(
  path: string, method: string, body?: unknown, params?: URLSearchParams,
): Promise<Read<T>> {
  let res: Response
  try {
    res = await fetch(api(path, params), {
      method,
      ...(body === undefined ? {} : { headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) }),
    })
  } catch {
    return { ok: false, error: 'Could not reach the server — nothing was saved. Try again.' }
  }
  let data: unknown
  try { data = await res.json() } catch { data = {} }
  if (!res.ok) return { ok: false, error: (data as { error?: string }).error ?? `Request failed (${res.status}).` }
  return { ok: true, data: data as T }
}
