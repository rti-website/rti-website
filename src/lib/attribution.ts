/**
 * Lead attribution: the campaign keys and the one cleaner both the server and
 * the browser use. Kept apart from src/lib/tracking.ts, which is server-only,
 * so the forms (src/components/client/AttributionFields.tsx) can import the
 * key list too.
 *
 * WHY THE FORM CARRIES IT TOO (management, Peter, 4 Nov 2026: "store the
 * gclid/UTM in the form"). /api/leads used to read attribution only from the
 * rti_attr cookie. A visitor whose cookie was never written (it waited for
 * cookie consent until 4 Nov) or was deleted (Reject) arrived with nothing, and
 * the lead showed as direct/unknown. Now every form also sends the visit's
 * attribution itself, as hidden fields and in the JSON body, and the server
 * takes whichever of the two actually has the campaign (pickAttribution).
 */

export const ATTRIBUTION_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid',
  'campaign_id', 'adgroup_id', 'keyword', 'matchtype', 'device',
] as const
export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number]

/** Every field a lead's attribution can hold, campaign keys first. */
export const ATTRIBUTION_FIELDS = [...ATTRIBUTION_KEYS, 'landing_page', 'referrer', 'captured_at'] as const
export type AttributionField = (typeof ATTRIBUTION_FIELDS)[number]

export type Attribution = Partial<Record<AttributionField, string>>

/** Only known keys, every value trimmed and capped: it is visitor-controlled input. */
export function cleanAttribution(raw: unknown): Attribution | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  const out: Attribution = {}
  for (const k of ATTRIBUTION_FIELDS) {
    const v = r[k]
    if (typeof v === 'string' && v.trim()) out[k] = v.trim().slice(0, k === 'landing_page' || k === 'referrer' ? 500 : 200)
  }
  return Object.keys(out).length ? out : null
}

/** True when the record names a campaign or an ad click, not only a landing page. */
export function hasCampaign(a: Attribution | null | undefined): boolean {
  return !!a && ATTRIBUTION_KEYS.some((k) => !!a[k])
}

/**
 * The cookie's record or the form's, never a mix of the two (a utm_source
 * from one visit beside a gclid from another would be a lie). The form's
 * wins when it has a campaign, since it is this visit's own; otherwise the
 * cookie, which may remember an ad click from an earlier visit; otherwise
 * whatever the form had (landing page and referrer).
 */
export function pickAttribution(cookie: Attribution | null, form: Attribution | null): Attribution | null {
  if (hasCampaign(form)) return form
  return cookie ?? form
}
