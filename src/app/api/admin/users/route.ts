import { q, one } from '@/lib/db'
import { guard, json, body } from '@/lib/admin-route'
import { hashPassword, ROLES, type Role } from '@/lib/auth'

/**
 * Accounts.
 *
 * !! THIS IS NOT THE SAME LIST AS /api/admin/authors. A byline is a users row
 * with an empty password hash that can never sign in; an account is one with a
 * hash. Both live in `users` so a writer's name and their login are the same
 * person, and this endpoint is the half that hands out access — so it is
 * administrators only, all four verbs.
 *
 * An account is DEACTIVATED, never deleted, once it has written anything: the
 * posts reference author_id, and a byline that resolves to nothing is worse
 * than a name on a page belonging to someone who left.
 */

const isEmail = (s: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s)

/* A username is allowed instead of an email — "admin" is one. Kept narrow so it
   can never be confused for a half-typed address. */
const isUsername = (s: string) => /^[a-z0-9][a-z0-9._-]{1,30}$/.test(s)

export const GET = guard(async () => {
  const users = await q(`
    SELECT u.id, u.email, u.name, u.role, u.active, u.last_active_at, u.created_at,
           (u.password_hash IS NOT NULL AND u.password_hash <> '') AS can_sign_in,
           (SELECT count(*) FROM posts p WHERE p.author_id = u.id) AS post_count
      FROM users u
     ORDER BY u.active DESC, u.name`)
  return json({
    users: users.map((u) => ({ ...(u as object), post_count: Number((u as { post_count: string }).post_count) })),
    roles: ROLES,
  })
}, { role: ['administrator'] })

export const POST = guard(async ({ req }) => {
  const input = await body<{ name: string; login: string; password: string; role: Role }>(req)
  const name = (input.name ?? '').trim()
  const login = (input.login ?? '').trim().toLowerCase()
  const password = input.password ?? ''
  const role = (input.role ?? 'author') as Role

  if (!name) return json({ error: 'Enter a name.' }, 400)
  if (!login) return json({ error: 'Enter an email address or a username.' }, 400)
  if (!isEmail(login) && !isUsername(login)) {
    return json({ error: 'Use an email address, or a short username of letters, numbers, dots, dashes and underscores.' }, 400)
  }
  if (!ROLES.some((r) => r.id === role)) return json({ error: 'Unknown role.' }, 400)
  if (password.length < 6) return json({ error: 'A password needs at least 6 characters.' }, 400)
  if (await one('SELECT 1 FROM users WHERE lower(email) = $1', [login])) {
    return json({ error: 'Somebody already signs in with that.' }, 409)
  }

  const row = await one(
    `INSERT INTO users (email, name, role, password_hash, active)
     VALUES ($1, $2, $3, $4, true)
     RETURNING id, email, name, role, active, created_at`,
    [login, name, role, await hashPassword(password)])

  return json({ user: { ...row, can_sign_in: true, post_count: 0, last_active_at: null } }, 201)
}, { role: ['administrator'] })
