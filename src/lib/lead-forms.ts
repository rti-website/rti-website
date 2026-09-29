/**
 * Which website form an enquiry came from — 29 Sep 2026 (Asim: the admin
 * and the email must show "that the lead came from Contact Us or Quote or
 * Schedule a Pickup").
 *
 * The forms post `form` (ContactForm's variant); /api/leads keeps it in
 * details.form. Older enquiries, and the ITAD page's pickup form, have none:
 * they are named from the lead's type and the page they were sent from.
 * Shared by the notification email and Admin -> Enquiries, so both say the
 * same thing. No server-only imports: the admin (a client) uses it too.
 */
export const LEAD_FORMS = {
  contact: 'Contact Us',
  quote: 'Get a Quote',
  pickup: 'Schedule a Pickup',
} as const
export type LeadFormKey = keyof typeof LEAD_FORMS

export function isLeadFormKey(v: unknown): v is LeadFormKey {
  return typeof v === 'string' && Object.hasOwn(LEAD_FORMS, v)
}

/** The form's key, from details.form or worked out; null for enquiries not from a form. */
export function leadFormKey(l: { type: string; details?: Record<string, string> | null; source_page?: string | null; channel?: string | null }): LeadFormKey | null {
  const d = l.details ?? {}
  if (isLeadFormKey(d.form)) return d.form
  if (l.channel && l.channel !== 'website') return null
  if (d.callClick) return null
  const page = l.source_page ?? ''
  if (page.startsWith('/request-a-pickup/') || page.startsWith('/it-asset-disposition/')) return 'pickup'
  if (page.startsWith('/quote/')) return 'quote'
  if (l.type === 'quote') return 'pickup'
  if (l.type === 'contact') return 'contact'
  return null
}

export function leadFormName(l: Parameters<typeof leadFormKey>[0]): string | null {
  const k = leadFormKey(l)
  return k ? LEAD_FORMS[k] : null
}
