/**
 * Where a visit came from, in the four buckets the Visitors page shows
 * (brief section 7): ad, organic, referral, direct. Pure, see ip.ts. Also
 * shared by the browser-free admin endpoints.
 */

export type Attribution = Partial<Record<string, string>>
export type Source = { kind: 'ad' | 'organic' | 'referral' | 'direct'; label: string }

const SEARCH = /(^|\.)(google|bing|yahoo|duckduckgo|ecosia|baidu|yandex|startpage|brave|qwant|aol|ask)\./i

function hostOf(url: string | undefined): string | null {
  if (!url) return null
  try { return new URL(url).hostname.replace(/^www\./, '').toLowerCase() } catch { return null }
}

export function sourceOf(a: Attribution | null | undefined, ownHost = 'recycletechnologies.com'): Source {
  if (!a) return { kind: 'direct', label: 'Direct' }
  if (a.gclid || a.gbraid || a.wbraid) return { kind: 'ad', label: 'Google Ads' }
  if (a.msclkid) return { kind: 'ad', label: 'Microsoft Ads' }
  if (a.fbclid) return { kind: 'ad', label: 'Meta' }
  const medium = (a.utm_medium ?? '').toLowerCase()
  if (/^(cpc|ppc|paid|paidsearch|paid_search|paid-social|paidsocial|display|cpm)$/.test(medium)) {
    return { kind: 'ad', label: a.utm_source ? `Ad: ${a.utm_source}` : 'Ad' }
  }
  const ref = hostOf(a.referrer)
  const own = ownHost.replace(/^www\./, '')
  if (ref && ref !== own && !ref.endsWith(`.${own}`)) {
    if (SEARCH.test(ref)) return { kind: 'organic', label: `Organic: ${ref.replace(/^(.*\.)?([^.]+)\.[^.]+(\.[^.]+)?$/, '$2')}` }
    return { kind: 'referral', label: ref }
  }
  if (a.utm_source) return { kind: 'referral', label: a.utm_source }
  return { kind: 'direct', label: 'Direct' }
}

/** Pages that show intent: viewing one without submitting a form flags the company (brief section 7). */
export const INTENT_PATHS = ['/request-a-pickup/', '/quote/', '/contact-us/']

export function isIntentPath(p: string): boolean {
  const path = p.endsWith('/') ? p : `${p}/`
  return INTENT_PATHS.includes(path)
}

/** The attribution keys first touch keeps (all of rti_attr's, plus landing page and referrer). */
export const FIRST_TOUCH_KEYS = [
  'landing_page', 'referrer', 'captured_at', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'campaign_id', 'adgroup_id', 'keyword', 'matchtype', 'device',
] as const

/** Keeps the known keys, as short strings. Anything else a browser sends is dropped. */
export function cleanAttribution(raw: unknown): Attribution {
  const out: Attribution = {}
  if (!raw || typeof raw !== 'object') return out
  for (const k of FIRST_TOUCH_KEYS) {
    const v = (raw as Record<string, unknown>)[k]
    if (typeof v === 'string' && v.trim()) out[k] = v.trim().slice(0, k === 'landing_page' || k === 'referrer' ? 500 : 200)
  }
  return out
}
