/**
 * Lead tracking from the browser — the GA4 `generate_lead` event and the
 * Google Ads conversion the SEO brief asks for on a successful submission
 * (23 Sep 2026). Called by ContactForm and PickupForm after /api/leads says
 * ok, never before: a conversion for a lead that failed to save is a lie in
 * the report.
 *
 *   GTM loaded     -> dataLayer.push of `generate_lead`, then the two names
 *                     the live container actually fires on: `lead_form_submit`
 *                     (Google Ads lead conversion) and `form_submit` (GA4
 *                     Form Submission). See the note in the function.
 *   gtag.js only   -> gtag('event', 'generate_lead') and, when an Ads ID and
 *                     label are set, gtag('event', 'conversion').
 *   neither        -> the dataLayer push still happens and harms nothing.
 *
 * Not a component and no 'use client' needed: it only runs inside event
 * handlers of components that already are client ones.
 *
 * ENHANCED CONVERSIONS FOR LEADS (22 Oct 2026, Usman Nawaz): the visitor's
 * email and phone ride on the `lead_form_submit` push as
 *   user_data: { email: 'name@company.com', phone_number: '+17635551234' }
 * GTM's Google Ads tag hashes them (SHA-256) before anything leaves the
 * browser, so Google Ads can match the lead to the ad click. Only on that
 * push: GA4 does not allow personal data in event parameters, so
 * `generate_lead` and `form_submit` stay without it. Email trimmed and lower
 * case, phone in E.164; a value that does not look right is left out. With
 * gtag.js only (no GTM), gtag('set', 'user_data', …) before the conversion.
 */
import { toE164 } from '@/lib/phone'

type Attr = Record<string, string | undefined>
type Cfg = { gtm: string | null; gtag: boolean; ga4: string; ads: string; label: string }

export function trackLead(lead: {
  type: 'contact' | 'quote'; formId: string; service?: string; audience?: string; email?: string; phone?: string
}) {
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void; __rtiAttr?: Attr; __rtiTracking?: Cfg }
  const attr = w.__rtiAttr ?? {}
  const cfg = w.__rtiTracking
  const source = attr.utm_source || (attr.gclid || attr.gbraid || attr.wbraid ? 'google' : attr.referrer ? hostOf(attr.referrer) : '(direct)')
  const fields = {
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
  const email = (lead.email ?? '').trim().toLowerCase()
  const phone = toE164(lead.phone ?? '')
  const userData: { email?: string; phone_number?: string } = {}
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) userData.email = email
  if (phone) userData.phone_number = phone
  const hasUserData = Object.keys(userData).length > 0

  const event = { event: 'generate_lead', ...fields }
  const dl = (w.dataLayer = w.dataLayer || [])
  dl.push(event)
  /*
   * THE LIVE GTM CONTAINER LISTENS FOR DIFFERENT NAMES (checked 27 Sep 2026,
   * GTM-WXH55D9): the Google Ads "Lead Form Submit (New)" conversion
   * (AW-11155126235 / k-tECLG58IMdENvvlscp) fires on `lead_form_submit`, and
   * the GA4 "Form Submission" event on `form_submit`. Nothing in GTM fires on
   * `generate_lead`, so without these two pushes a lead was saved but never
   * counted in Google Ads. Same fields ride along on both.
   */
  dl.push({ event: 'lead_form_submit', ...fields, ...(hasUserData ? { user_data: userData } : {}) })
  dl.push({ event: 'form_submit', ...fields })

  if (cfg && !cfg.gtm && typeof w.gtag === 'function') {
    w.gtag('event', 'generate_lead', { service_interest: event.service_interest, source: event.source, campaign: event.campaign })
    if (cfg.ads && cfg.label) {
      if (hasUserData) w.gtag('set', 'user_data', userData)
      w.gtag('event', 'conversion', { send_to: `${cfg.ads}/${cfg.label}` })
    }
  }
}

function hostOf(u: string): string {
  try { return new URL(u).hostname.replace(/^www\./, '') } catch { return 'referral' }
}
