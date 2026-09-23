/**
 * Lead tracking from the browser — the GA4 `generate_lead` event and the
 * Google Ads conversion the SEO brief asks for on a successful submission
 * (23 Sep 2026). Called by ContactForm and PickupForm after /api/leads says
 * ok, never before: a conversion for a lead that failed to save is a lie in
 * the report.
 *
 *   GTM loaded     -> dataLayer.push({ event: 'generate_lead', … }). GTM's
 *                     GA4 event tag and Google Ads conversion tag both fire
 *                     on it; the Ads ID and label ride along in the event
 *                     (and in rti_ads_conversion_id / _label from page load),
 *                     so they are set once, in the CMS.
 *   gtag.js only   -> gtag('event', 'generate_lead') and, when an Ads ID and
 *                     label are set, gtag('event', 'conversion').
 *   neither        -> the dataLayer push still happens and harms nothing.
 *
 * Not a component and no 'use client' needed: it only runs inside event
 * handlers of components that already are client ones.
 */
type Attr = Record<string, string | undefined>
type Cfg = { gtm: string | null; gtag: boolean; ga4: string; ads: string; label: string }

export function trackLead(lead: { type: 'contact' | 'quote'; formId: string; service?: string; audience?: string }) {
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void; __rtiAttr?: Attr; __rtiTracking?: Cfg }
  const attr = w.__rtiAttr ?? {}
  const cfg = w.__rtiTracking
  const source = attr.utm_source || (attr.gclid || attr.gbraid || attr.wbraid ? 'google' : attr.referrer ? hostOf(attr.referrer) : '(direct)')
  const event = {
    event: 'generate_lead',
    lead_type: lead.type,
    form_id: lead.formId,
    service_interest: lead.service || '(not set)',
    audience: lead.audience || '(not set)',
    source,
    medium: attr.utm_medium || (attr.gclid ? 'cpc' : attr.referrer ? 'referral' : '(none)'),
    campaign: attr.utm_campaign || '(not set)',
    ads_conversion_id: cfg?.ads || undefined,
    ads_conversion_label: cfg?.label || undefined,
  }
  ;(w.dataLayer = w.dataLayer || []).push(event)

  if (cfg && !cfg.gtm && typeof w.gtag === 'function') {
    w.gtag('event', 'generate_lead', { service_interest: event.service_interest, source: event.source, campaign: event.campaign })
    if (cfg.ads && cfg.label) w.gtag('event', 'conversion', { send_to: `${cfg.ads}/${cfg.label}` })
  }
}

function hostOf(u: string): string {
  try { return new URL(u).hostname.replace(/^www\./, '') } catch { return 'referral' }
}
