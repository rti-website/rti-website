import { NextResponse } from 'next/server'
import { one } from '@/lib/db'
import { createSession, currentUser, destroySession, verifyPassword } from '@/lib/auth'

/** GET = who am I · POST = sign in · DELETE = sign out. */

export async function GET() {
  try {
    const user = await currentUser()
    return NextResponse.json({ user })
  } catch (err) {
    return NextResponse.json({ user: null, error: (err as Error).message, setup: true }, { status: 500 })
  }
}

export async function POST(req: Request) {
  let payload: { email?: string; password?: string } = {}
  try { payload = await req.json() } catch { /* empty body */ }
  // The field is called email because the column is. It also accepts a short
  // username — "admin" — which is stored in that same column.
  const email = (payload.email ?? '').trim().toLowerCase()
  const password = payload.password ?? ''
  if (!email || !password) {
    return NextResponse.json({ error: 'Enter your email or username, and your password.' }, { status: 400 })
  }

  try {
    const row = await one<{ id: number; name: string; email: string; role: string; password_hash: string; active: boolean }>(
      'SELECT id, name, email, role, password_hash, active FROM users WHERE lower(email) = $1',
      [email],
    )
    // Same message either way: telling an attacker which half was wrong is free
    // account enumeration.
    const bad = NextResponse.json({ error: 'That sign-in and password do not match.' }, { status: 401 })
    if (!row || !row.active) return bad
    if (!(await verifyPassword(password, row.password_hash))) return bad

    await createSession(row.id, req.headers.get('user-agent') ?? undefined)
    await one('UPDATE users SET last_active_at = now() WHERE id = $1 RETURNING id', [row.id])
    return NextResponse.json({ user: { id: row.id, email: row.email, name: row.name, role: row.role } })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message, setup: true }, { status: 500 })
  }
}

export async function DELETE() {
  await destroySession()
  return NextResponse.json({ ok: true })
}
