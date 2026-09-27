import 'server-only'
import { one } from '@/lib/db'

/**
 * The Google Maps key — Admin -> Google & Tracking -> Google Maps, added
 * 24 Sep 2026 when Asim was handed one ("we have to add [a] place for it").
 * One settings row, key 'maps' (db/007).
 *
 * WHAT KIND OF KEY IT IS decides what it can do, so it is stored as
 * `browserKey`. The one given is restricted to recycletechnologies.com web
 * pages (checked 24 Sep 2026: it answers for www. and dev., refuses
 * localhost and any other site, and Google turns it away for server lookups
 * such as the Geocoding API). So it is used where a browser on our own domain
 * asks Google for something: the map of each enquiry in Admin -> Enquiries,
 * through the Maps Embed API, which Google does not charge for.
 *
 * It is not a secret in the way a password is: a website key is meant to sit
 * in a web page, and its domain restriction is what protects it. It should
 * stay restricted to recycletechnologies.com in Google Cloud.
 *
 * NOT SHOWN IN THE ADMIN (management, 27 Sep 2026: "mask this api so it is
 * not showing"). Since then the key never leaves the server: the settings
 * screen gets `maskKey()` and a yes / no, and every map in the admin is an
 * iframe pointing at /api/admin/maps/embed/, which adds the key and sends
 * the browser on to Google. So it is not in the page, the DOM or the JSON.
 */

export type MapsSettings = { browserKey: string }

export const MAPS_DEFAULTS: MapsSettings = { browserKey: '' }

/** Google API keys: "AIza" and 35 more characters. */
export const MAPS_KEY_FORMAT = /^AIza[0-9A-Za-z_-]{35}$/

export function cleanMaps(raw: unknown): MapsSettings {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
  const k = typeof r.browserKey === 'string' ? r.browserKey.trim() : ''
  return { browserKey: MAPS_KEY_FORMAT.test(k) ? k : '' }
}

/** The stored settings; the defaults on a database that has not run db/007. */
export async function getMaps(): Promise<MapsSettings> {
  try {
    const row = await one<{ value: unknown }>(`SELECT value FROM settings WHERE key = 'maps'`)
    return row ? cleanMaps(row.value) : MAPS_DEFAULTS
  } catch {
    return MAPS_DEFAULTS
  }
}

/** "AIza••••••••••••••••••••••••••••••••lFw": enough to recognise a key, not enough to use it. */
export function maskKey(key: string): string {
  if (!key) return ''
  return `${key.slice(0, 4)}${'\u2022'.repeat(Math.max(4, key.length - 7))}${key.slice(-3)}`
}

/** The Maps Embed API place URL with the key, or Google's keyless embed without one. */
export function embedUrl(key: string, q: string, zoom: number): string {
  return key
    ? `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(key)}&q=${encodeURIComponent(q)}&zoom=${zoom}`
    : `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=${zoom}&hl=en&output=embed`
}
