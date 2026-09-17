import { one } from '@/lib/db'
import { guard, json, body } from '@/lib/admin-route'
import { hashPassword, ROLES, type Role } from '@/lib/auth'

/**
 * One account: change its role, rename it, reset its password, turn it off.
 *
 * !! AN ADMINISTRATOR CANNOT LOCK THEMSELVES OUT. Demoting or deactivating your
 * own account, or the last remaining administrator, is refused here rather than
 * in the UI — the UI can be bypassed with one fetch from the console, and the
 * result is a site nobody can administer without a psql prompt.
 */

function idFrom(req: Request): number {
  const parts = new URL(req.url).pathname.split('/').filter(Boolean)
  return Number(parts[parts.length - 1])
}

export const PATCH = guard(async ({ req, user }) => {
  const id = idFrom(req)
  if (!Number.isFinite(id)) return json({ error: 'Bad id.' }, 400)

  const input = await body<{ name: string; role: Role; active: boolean; password: string }>(req)
  const target = await one<{ id: number; role: string; active: boolean }>(
    'SELECT id, role, active FROM users WHERE id = $1', [id])
  if (!target) return json({ error: 'No such account.' }, 404)

  const losingAnAdmin =
    target.role === 'administrator'
    && ((input.role !== undefined && input.role !== 'administrator') || input.active === false)

  if (losingAnAdmin) {
    if (target.id === user.id) {
      return json({ error: 'You cannot remove your own administrator access. Ask another administrator.' }, 409)
    }
    const others = await one<{ n: number }>(
      `SELECT count(*)::int AS n FROM users
        WHERE role = 'administrator' AND active AND id <> $1`, [id])
    if ((others?.n ?? 0) === 0) {
      return json({ error: 'This is the only administrator. Promote somebody else first.' }, 409)
    }
  }

  if (input.role !== undefined && !ROLES.some((r) => r.id === input.role)) {
    return json({ error: 'Unknown role.' }, 400)
  }
  if (input.password !== undefined && input.password !== '' && input.password.length < 6) {
    return json({ error: 'A password needs at least 6 characters.' }, 400)
  }

  const row = await one(
    `UPDATE users SET
       name          = COALESCE($2, name),
       role          = COALESCE($3, role),
       active        = COALESCE($4, active),
       password_hash = COALESCE($5, password_hash)
     WHERE id = $1
     RETURNING id, email, name, role, active, last_active_at, created_at`,
    [
      id,
      input.name?.trim() || null,
      input.role ?? null,
      input.active ?? null,
      input.password ? await hashPassword(input.password) : null,
    ])

  return json({ user: row })
}, { role: ['administrator'] })

/**
 * Deactivate. There is deliberately no hard delete: posts point at author_id,
 * and an administrator who wants the row gone can say so at a psql prompt where
 * the consequences are visible.
 */
export const DELETE = guard(async ({ req, user }) => {
  const id = idFrom(req)
  if (id === user.id) return json({ error: 'You cannot deactivate your own account.' }, 409)

  const target = await one<{ role: string }>('SELECT role FROM users WHERE id = $1', [id])
  if (!target) return json({ error: 'No such account.' }, 404)
  if (target.role === 'administrator') {
    const others = await one<{ n: number }>(
      `SELECT count(*)::int AS n FROM users WHERE role = 'administrator' AND active AND id <> $1`, [id])
    if ((others?.n ?? 0) === 0) return json({ error: 'This is the only administrator.' }, 409)
  }

  await one('UPDATE users SET active = false WHERE id = $1 RETURNING id', [id])
  return json({ ok: true })
}, { role: ['administrator'] })
