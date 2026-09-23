import { revalidatePath } from 'next/cache'
import { one } from '@/lib/db'
import { guard, json, body } from '@/lib/admin-route'
import { TRACKING_DEFAULTS, TRACKING_FORMATS, cleanTracking, type TrackingSettings } from '@/lib/tracking'

/**
 * Admin -> Settings -> Analytics & Tracking (the SEO brief, 23 Sep 2026).
 * Administrators and the SEO desk. One settings row, key 'tracking'.
 *
 * Saving revalidates the whole site from the root layout down, so the new
 * container is on every page as soon as each is next requested — no rebuild,
 * no deploy. The layout reads these values; no page carries its own copy.
 */
export const GET = guard(async () => {
  const row = await one<{ value: unknown }>(`SELECT value FROM settings WHERE key = 'tracking'`)
  return json({ tracking: row ? cleanTracking(row.value) : TRACKING_DEFAULTS })
}, { role: ['administrator', 'seo'] })

export const PUT = guard(async ({ req }) => {
  const input = await body<TrackingSettings>(req)
  // Say which field is wrong rather than silently dropping it.
  const labels: Record<keyof typeof TRACKING_FORMATS, string> = {
    gtmId: 'GTM Container ID (GTM-XXXXXXX)',
    ga4Id: 'GA4 Measurement ID (G-XXXXXXXXXX)',
    adsConversionId: 'Google Ads Conversion ID (AW-XXXXXXXXX)',
    adsConversionLabel: 'Google Ads Conversion Label',
  }
  for (const k of Object.keys(labels) as (keyof typeof TRACKING_FORMATS)[]) {
    const v = typeof input[k] === 'string' ? (input[k] as string).trim() : ''
    const check = k === 'adsConversionLabel' ? v : v.toUpperCase()
    if (v && !TRACKING_FORMATS[k].test(check)) return json({ error: `That ${labels[k]} does not look right.` }, 400)
  }
  const value = cleanTracking(input)
  if (value.gtmEnabled && !value.gtmId) return json({ error: 'Enter a GTM Container ID, or untick "Enable GTM".' }, 400)
  if (Boolean(value.adsConversionId) !== Boolean(value.adsConversionLabel)) {
    return json({ error: 'Google Ads needs both the Conversion ID and the Conversion Label, or neither.' }, 400)
  }
  await one(
    `INSERT INTO settings (key, value, updated_at) VALUES ('tracking', $1::jsonb, now())
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now() RETURNING key`,
    [JSON.stringify(value)],
  )
  revalidatePath('/', 'layout')
  return json({ ok: true, tracking: value })
}, { role: ['administrator', 'seo'] })
