import { q, tx } from '@/lib/db'
import { guard, json, body } from '@/lib/admin-route'

/** Site settings, the social links the footer reads, and the redirect table. */
export const GET = guard(async () => {
  const settings = await q<{ key: string; value: unknown }>('SELECT key, value FROM settings ORDER BY key')
  const social = await q('SELECT id, platform, url, sort_order FROM social_links ORDER BY sort_order')
  const redirects = await q(`SELECT id, from_path, to_path, status_code, source, hits
                               FROM redirects ORDER BY hits DESC, from_path LIMIT 500`)
  return json({ settings: Object.fromEntries(settings.map((s) => [s.key, s.value])), social, redirects })
})

export const PUT = guard(async ({ req }) => {
  const input = await body<{ settings: Record<string, unknown>; social: { id: number; url: string }[] }>(req)

  await tx(async (run) => {
    for (const [key, value] of Object.entries(input.settings ?? {})) {
      await run(`INSERT INTO settings (key, value, updated_at) VALUES ($1, $2::jsonb, now())
                 ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
        [key, JSON.stringify(value)])
    }
    for (const link of input.social ?? []) {
      // An empty URL is meaningful: the site hides that icon rather than
      // rendering one that links nowhere.
      await run('UPDATE social_links SET url = $2 WHERE id = $1', [link.id, (link.url ?? '').trim()])
    }
  })

  return json({ ok: true })
}, { role: ['administrator'] })
