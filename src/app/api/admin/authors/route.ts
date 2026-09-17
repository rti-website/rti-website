import { q, one } from '@/lib/db'
import { guard, json, body } from '@/lib/admin-route'

/**
 * Bylines.
 *
 * !! AN AUTHOR ADDED HERE CANNOT SIGN IN, AND THAT IS THE POINT. It is a users
 * row with no password hash, which `verifyPassword` can never match — so a
 * byline is just a name on a page, and handing someone an account is a separate,
 * deliberate act (an administrator sets a password for them).
 *
 * The alternative — making the byline field free text on the post — was worse:
 * "Rizwan Haider", "Rizwan", "rizwan haider" become three authors inside a
 * month, and an author archive page can then never be built.
 */
export const GET = guard(async () => {
  const authors = await q(`
    SELECT u.id, u.name, u.email, u.role, u.active,
           (u.password_hash IS NOT NULL AND u.password_hash <> '') AS can_sign_in,
           (SELECT count(*) FROM posts p WHERE p.author_id = u.id) AS post_count
      FROM users u WHERE u.active ORDER BY u.name`)
  return json({ authors: authors.map((a) => ({ ...(a as object), post_count: Number((a as { post_count: string }).post_count) })) })
})

export const POST = guard(async ({ req }) => {
  const input = await body<{ name: string; email: string }>(req)
  const name = (input.name ?? '').trim()
  if (!name) return json({ error: 'An author needs a name.' }, 400)

  const email = (input.email ?? '').trim().toLowerCase()
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ error: 'That does not look like an email address.' }, 400)
  }
  if (email && await one('SELECT 1 FROM users WHERE lower(email) = $1', [email])) {
    return json({ error: 'Somebody already has that email address.' }, 409)
  }
  if (await one('SELECT 1 FROM users WHERE lower(name) = lower($1) AND active', [name])) {
    return json({ error: `${name} is already on the list.` }, 409)
  }

  /* The email column is NOT NULL and unique, and a byline may not have one — so
     a placeholder that is obviously not an address stands in. It cannot collide
     and it cannot be mistaken for something to write to. */
  const stored = email || `no-login-${Date.now().toString(36)}@invalid.local`

  const row = await one(
    `INSERT INTO users (email, name, role, password_hash) VALUES ($1, $2, 'author', '')
     RETURNING id, name, email, role`, [stored, name])
  return json({ author: { ...row, can_sign_in: false, post_count: 0 } }, 201)
}, { role: ['administrator', 'editor'] })
