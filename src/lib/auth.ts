import 'server-only'
import { createHmac, randomBytes, scrypt as _scrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import { cookies } from 'next/headers'
import { one, q } from '@/lib/db'

/**
 * Login and sessions for the admin, on node:crypto alone.
 *
 * WHY NO AUTH LIBRARY (CLAUDE.md rule 10). This protects one internal dashboard
 * used by four named people. Auth.js went into maintenance-only in Sep 2025 and
 * its own maintainers point new projects elsewhere; Better Auth or Clerk would
 * each add a dependency, a config surface and a vendor for something that is a
 * hashed password, a random token and an HMAC. Revisit the day SSO or 2FA is
 * actually required — the session table is already shaped for it.
 *
 * Passwords: scrypt with a per-user salt, stored as
 *   scrypt$<N>$<r>$<p>$<salt-hex>$<hash-hex>
 * `scripts/db-setup.mjs` writes the first one and MUST use these same numbers.
 *
 * Sessions: a random id stored in the database — so revoking one really revokes
 * it — carried in a cookie alongside an HMAC of that id, so a guessed or
 * tampered cookie is rejected before it ever reaches Postgres.
 */
/* promisify() picks the 3-argument overload, which drops the cost parameters we
   need, so the promise form is typed here rather than inferred. */
type ScryptOpts = { N: number; r: number; p: number; maxmem: number }
const scrypt = promisify(_scrypt) as unknown as
  (password: string, salt: Buffer, keylen: number, opts: ScryptOpts) => Promise<Buffer>

const N = 16384, r = 8, p = 1, KEYLEN = 64
const COOKIE = 'rti_admin_session'
const DAYS = 14

export type Role = 'administrator' | 'editor' | 'author' | 'seo'
export type AdminUser = { id: number; email: string; name: string; role: Role }

/**
 * The roles, with the words the admin screens print.
 *
 * `author` is labelled "Content writer" because that is what Asim calls the job
 * and what the people doing it call themselves; the column keeps the old value
 * so nothing has to be migrated and so `canPublish` reads the way it always did.
 *
 * `seo` was added 17 Sep 2026 for the SEO desk. It can change any SEO field on
 * any post — title tag, description, keywords, robots, schema, redirects — and
 * nothing else: not the body, not publishing, not accounts. That is narrower
 * than editor and wider than author, which is why it is its own role rather
 * than a reused one.
 */
export const ROLES = [
  { id: 'administrator', label: 'Administrator', blurb: 'Everything, including accounts and site settings.' },
  { id: 'editor', label: 'Editor', blurb: 'Write, edit and publish anybody\u2019s posts.' },
  { id: 'author', label: 'Content writer', blurb: 'Write and edit their own posts. Cannot publish.' },
  { id: 'seo', label: 'SEO', blurb: 'Every SEO field on every post. Cannot edit the body or publish.' },
] as const satisfies ReadonlyArray<{ id: Role; label: string; blurb: string }>

export const roleLabel = (r: string) => ROLES.find((x) => x.id === r)?.label ?? r

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET
  if (!s || s.length < 32) {
    throw new Error('ADMIN_SESSION_SECRET must be set to at least 32 characters. See .env.example.')
  }
  return s
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16)
  const hash = await scrypt(password, salt, KEYLEN, { N, r, p, maxmem: 64 * 1024 * 1024 })
  return `scrypt$${N}$${r}$${p}$${salt.toString('hex')}$${hash.toString('hex')}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split('$')
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false
  const [, sN, sr, sp, saltHex, hashHex] = parts
  const salt = Buffer.from(saltHex ?? '', 'hex')
  const expected = Buffer.from(hashHex ?? '', 'hex')
  const got = await scrypt(password, salt, expected.length, {
    N: Number(sN), r: Number(sr), p: Number(sp), maxmem: 64 * 1024 * 1024,
  })
  // Constant time: a length check first, because timingSafeEqual throws on a mismatch.
  return got.length === expected.length && timingSafeEqual(got, expected)
}

const sign = (id: string) => createHmac('sha256', secret()).update(id).digest('base64url')

export async function createSession(userId: number, userAgent?: string): Promise<string> {
  const id = randomBytes(32).toString('base64url')
  const expires = new Date(Date.now() + DAYS * 86_400_000)
  await q('INSERT INTO sessions (id, user_id, expires_at, user_agent) VALUES ($1,$2,$3,$4)',
    [id, userId, expires, userAgent ?? null])
  const jar = await cookies()
  jar.set(COOKIE, `${id}.${sign(id)}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: secureCookie(),
    path: '/',
    expires,
  })
  return id
}

/**
 * Whether the login cookie carries the Secure flag.
 *
 * Secure means a browser will only send it over HTTPS. That is exactly right
 * for the live site and must never be turned off there — an admin cookie that
 * travels in the clear is an admin cookie somebody else can pick up.
 *
 * !! BUT IT ALSO MEANS THE ADMIN CANNOT WORK OVER PLAIN HTTP TO AN IP ADDRESS,
 * which is what a dev box on a LAN is until somebody puts a proxy and a
 * certificate in front of it. On 18 Sep 2026 the dev server answered every
 * login with a 401 on the very next request: the browser accepted the cookie
 * and then, correctly, refused to send it back over http://192.168.90.152.
 * Nothing in the logs said why. `next dev` never hits this because Chrome
 * treats localhost as secure; `next start` on a LAN address hits it every time.
 *
 * ADMIN_ALLOW_HTTP=true is the opt-out, and it is spelled out as a separate
 * variable rather than inferred from the request for two reasons: inferring
 * from x-forwarded-proto trusts whatever proxy happens to be in front, and an
 * explicit flag is something scripts/check-static.mjs can refuse to let into a
 * production build, which it does. Take it out of .env.local once the dev site
 * is served over HTTPS again — it should be true for as short a time as it can.
 */
function secureCookie(): boolean {
  if (process.env.NODE_ENV !== 'production') return false   // next dev, localhost
  return process.env.ADMIN_ALLOW_HTTP !== 'true'
}

export async function destroySession(): Promise<void> {
  const jar = await cookies()
  const raw = jar.get(COOKIE)?.value
  if (raw) {
    const [id] = raw.split('.')
    if (id) await q('DELETE FROM sessions WHERE id = $1', [id])
  }
  jar.delete(COOKIE)
}

/** The signed-in user, or null. Every admin route handler starts here. */
export async function currentUser(): Promise<AdminUser | null> {
  const jar = await cookies()
  const raw = jar.get(COOKIE)?.value
  if (!raw) return null
  const [id, mac] = raw.split('.')
  if (!id || !mac) return null

  const expect = sign(id)
  if (mac.length !== expect.length || !timingSafeEqual(Buffer.from(mac), Buffer.from(expect))) return null

  const row = await one<{ id: number; email: string; name: string; role: Role; active: boolean }>(
    `SELECT u.id, u.email, u.name, u.role, u.active
       FROM sessions s JOIN users u ON u.id = s.user_id
      WHERE s.id = $1 AND s.expires_at > now()`,
    [id],
  )
  if (!row || !row.active) return null
  return { id: row.id, email: row.email, name: row.name, role: row.role }
}

/** Only an editor or administrator may publish. Writers draft; SEO does not write. */
export const canPublish = (u: AdminUser) => u.role === 'administrator' || u.role === 'editor'
export const canManageSite = (u: AdminUser) => u.role === 'administrator'

/** Who may change a title tag, a description, robots, schema or a redirect. */
export const canEditSeo = (u: AdminUser) =>
  u.role === 'administrator' || u.role === 'editor' || u.role === 'seo'

/** Who may change the words in a post. The SEO desk deliberately may not. */
export const canEditBody = (u: AdminUser) => u.role !== 'seo'
