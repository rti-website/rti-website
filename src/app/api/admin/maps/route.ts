import { one } from '@/lib/db'
import { guard, json, body } from '@/lib/admin-route'
import { MAPS_KEY_FORMAT, cleanMaps, getMaps, type MapsSettings } from '@/lib/maps'

/**
 * Admin -> Google & Tracking -> Google Maps (24 Sep 2026). Administrators and
 * the SEO desk, the same people who look after the tracking IDs beside it.
 * See src/lib/maps.ts for what the key is used for and why it is a website key.
 *
 * No revalidation: nothing on the public pages reads this. The admin's
 * Enquiries screen asks for it each time it loads.
 */
export const GET = guard(async () => json({ maps: await getMaps() }), { role: ['administrator', 'seo'] })

export const PUT = guard(async ({ req }) => {
  const input = await body<MapsSettings>(req)
  const key = typeof input.browserKey === 'string' ? input.browserKey.trim() : ''
  if (key && !MAPS_KEY_FORMAT.test(key)) {
    return json({ error: 'That does not look like a Google API key. It starts with AIza and is 39 characters long.' }, 400)
  }
  const value = cleanMaps({ browserKey: key })
  await one(
    `INSERT INTO settings (key, value, updated_at) VALUES ('maps', $1::jsonb, now())
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now() RETURNING key`,
    [JSON.stringify(value)],
  )
  return json({ ok: true, maps: value })
}, { role: ['administrator', 'seo'] })
