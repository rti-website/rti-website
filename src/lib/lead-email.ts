import 'server-only'

/**
 * The notification email a new lead sends to LEAD_NOTIFY_TO.
 *
 * Laid out to the old WordPress form's email, which Asim sent as the model on
 * 26 Sep 2026 ("make the email we receive in html format like this"). It
 * replaces the bold-label table of 24 Sep. Four sections, each an uppercase
 * grey heading over label / value rows separated by a thin rule, in one
 * narrow column:
 *
 *   SELECT SERVICE
 *     Choose any one                       Recycling
 *   QUOTE TYPE
 *     What would you like to Recycle       Electronic
 *     or Shred?
 *     Is it for?                           Commercial
 *     How did you hear about us?           google search
 *   PERSONAL INFO
 *     Name / Phone Number / Email / Company Name / Company Address
 *   MORE INFO
 *     Please describe in detail what       We have (170) 4' t-8 CFL bulbs …
 *     you would like to recycle or
 *     shred, and include other
 *     questions or comments here.
 *
 * "Choose any one" is Recycling or Shredding, read off the service the
 * visitor picked (shredding and hard drive destruction are Shredding; the
 * rest, and a pickup request with no service, are Recycling). The old form
 * asked that as a first question; ours does not, so it is derived here.
 *
 * A row with nothing in it is left out, and a section with no rows is left
 * out with it, so the pickup form (no service, no city) gets the same layout
 * with fewer rows. When and where it was sent go in a small grey line at the
 * end. How the visitor found the site (campaign, keyword, landing page) is
 * not in the email; it is on the enquiry in Admin -> Enquiries.
 *
 * Inline styles and tables only: that is what Outlook, which the team reads
 * this in, renders reliably. Every value is escaped; it is visitor input.
 */

export type LeadForEmail = {
  type: string
  name: string | null
  /** Null for an enquiry the team logged from a phone call or a tap to call. */
  email: string | null
  phone: string | null
  company: string | null
  message: string | null
  details: Record<string, string>
  submittedAt?: Date
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

/** +17632086506 -> +1 763-208-6506, the way the reference prints it; with
 *  `spaced`, +1 763 208 6506 (the assignment email, 27 Sep 2026). */
function phoneForEmail(p: string | null, spaced = false): string | null {
  if (!p) return null
  const m = p.match(/^\+1(\d{3})(\d{3})(\d{4})$/)
  if (!m) return p
  return spaced ? `+1 ${m[1]} ${m[2]} ${m[3]}` : `+1 ${m[1]}-${m[2]}-${m[3]}`
}

/** "2026-09-23 20:37:11 CT": the company's own time, Minnesota and Wisconsin. */
function submittedAt(d: Date): string {
  const parts = chicagoParts(d)
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second} CT`
}

/** "23 Sep 2026 at 20:37 CT", for prose. */
export function spokenTime(d: Date): string {
  const parts = chicagoParts(d)
  const month = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', month: 'short' }).format(d)
  return `${Number(parts.day)} ${month} ${parts.year} at ${parts.hour}:${parts.minute} CT`
}

function chicagoParts(d: Date): Record<string, string> {
  return Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
    }).formatToParts(d).map((p) => [p.type, p.value]),
  )
}

const INTRO: Record<string, { title: string; line: string; subject: string }> = {
  contact: { title: 'New Website Enquiry', line: 'A new contact enquiry came in from the website.', subject: 'New Website Enquiry' },
  quote: { title: 'New Pickup Request', line: 'A new pickup request came in from the website.', subject: 'New Pickup Request' },
}

type Row = [string, string]
export type Section = { title: string; rows: Row[] }

/**
 * The enquiry as the notification lays it out: four sections of label /
 * value rows, empty rows and empty sections left out. Shared by the
 * notification, the "View form" button in Admin -> Enquiries and the email
 * an agent gets when an enquiry is assigned to them, so all three read the
 * same.
 */
export function leadSections(l: LeadForEmail, opts: { spacedPhone?: boolean } = {}): Section[] {
  const d = l.details
  const what = (d.service ?? d.item ?? '').trim()
  const kind = /shred|destruction|degauss/i.test(what) ? 'Shredding' : 'Recycling'
  const place = [d.city, [d.state, d.zip].filter(Boolean).join(' ')].filter(Boolean).join(', ')
  const address = [d.address, place].filter(Boolean).join(', ')
  const name = leadName(l)

  const all: Section[] = [
    { title: 'Select Service', rows: [['Choose any one', kind]] },
    { title: 'Quote Type', rows: [
      ['What would you like to Recycle or Shred?', what],
      ['Is it for?', d.audience ?? ''],
      ['How did you hear about us?', d.referral ?? ''],
    ] },
    { title: 'Personal Info', rows: [
      ['Name', name],
      ['Phone Number', phoneForEmail(l.phone, opts.spacedPhone) ?? ''],
      ['Email', l.email ?? ''],
      ['Company Name', l.company ?? ''],
      ['Company Address', address],
    ] },
    { title: 'More Info', rows: [
      ['Please describe in detail what you would like to recycle or shred, and include other questions or comments here.', (l.message ?? '').trim()],
    ] },
  ]
  return all
    .map((s): Section => ({ ...s, rows: s.rows.filter(([, v]) => v.trim().length > 0) }))
    .filter((s) => s.rows.length > 0)
}

export const leadName = (l: LeadForEmail) =>
  (l.name ?? [l.details.firstName, l.details.lastName].filter(Boolean).join(' ')).trim()

// The model: a 375px column, 13px Arial, grey labels, a #e6e6e6 rule under
// every row, headings uppercase in #555.
const HEAD = 'padding:22px 0 6px;font-size:15px;font-weight:700;letter-spacing:.3px;text-transform:uppercase;color:#555555'
const LABEL = 'padding:10px 8px 10px 0;width:170px;color:#555555;font-size:13px;line-height:18px;vertical-align:middle;border-bottom:1px solid #e6e6e6'
const VALUE = 'padding:10px 0;color:#333333;font-size:13px;line-height:18px;vertical-align:middle;border-bottom:1px solid #e6e6e6'

function sectionsHtml(sections: Section[]): string {
  return sections.map((s) => `<table role="presentation" cellpadding="0" cellspacing="0" width="375" style="border-collapse:collapse;width:375px">
<tr><td colspan="2" style="${HEAD}">${esc(s.title)}</td></tr>
${s.rows.map(([k, v]) => `<tr><td style="${LABEL}">${esc(k)}</td><td style="${VALUE}">${esc(v).replace(/\r?\n/g, '<br>')}</td></tr>`).join('\n')}
</table>`).join('\n')
}

const sectionsText = (sections: Section[]) => sections.flatMap((s) => [
  s.title.toUpperCase(),
  ...s.rows.map(([k, v]) => `  ${k}: ${v}`),
  '',
])

/**
 * The notification. `intro` replaces the heading and first line: Admin ->
 * Enquiries passes one for an enquiry that did not come from a website form
 * (a phone call, a tap to call), which never sent this email.
 */
export function leadNotification(l: LeadForEmail, intro?: { title: string; line: string }): { subject: string; text: string; html: string } {
  const d = l.details
  const base = INTRO[l.type] ?? {
    title: 'New Website Enquiry', line: `A new ${l.type} enquiry came in from the website.`, subject: 'New Website Enquiry',
  }
  const head = intro ?? base
  const sections = leadSections(l)
  const name = leadName(l)

  const sent = `Sent ${submittedAt(l.submittedAt ?? new Date())}${d.consent ? ' · Consent given' : ''}`
  const subject = `${base.subject}: ${name || l.email || 'no name given'}`

  const text = [head.title, '', ...sectionsText(sections), sent].join('\n')

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#ffffff">
<div style="font-family:Arial,Helvetica,sans-serif;color:#333333;max-width:420px">
<p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#222222">${esc(head.title)}</p>
<p style="margin:0;font-size:13px;color:#777777">${esc(head.line)}</p>
${sectionsHtml(sections)}
<p style="margin:22px 0 0;font-size:11px;color:#999999">${esc(sent)}</p>
</div>
</body></html>`

  return { subject, text, html }
}

/**
 * The email an agent gets when an enquiry is assigned to them (Asim, 27 Sep
 * 2026: "when we assign the task to agent he also receive the mail
 * automatically"). The enquiry in the notification's layout, who assigned
 * it, and a button straight to it in Publisher. No hyphens or dashes in the
 * words (house style for email copy); the phone number is spaced for the
 * same reason.
 */
export function leadAssignedEmail(a: {
  lead: LeadForEmail; id: number; agentName: string; assignedBy: string; link: string; how?: string | null
}): { subject: string; text: string; html: string } {
  const l = a.lead
  const first = a.agentName.trim().split(/\s+/)[0] || 'there'
  const who = leadName(l) || l.email || (l.phone ? phoneForEmail(l.phone, true) : null) || `Enquiry ${a.id}`
  const sections = leadSections(l, { spacedPhone: true })
  const received = spokenTime(l.submittedAt ?? new Date())
  const subject = `Enquiry assigned to you: ${who}`
  const lines = [
    `${a.assignedBy} assigned this enquiry to you in Publisher.`,
    'Please get in touch with the customer, then set the status and add a note after each call so the team can see where it stands.',
  ]
  const meta = `Enquiry number ${a.id}, received ${received}${a.how ? `, ${a.how}` : ''}.`

  const text = [
    `Hi ${first},`, '', ...lines, '', ...sectionsText(sections),
    `Open the enquiry: ${a.link}`, '', meta,
  ].join('\n')

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#ffffff">
<div style="font-family:Arial,Helvetica,sans-serif;color:#333333;max-width:420px">
<p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#222222">Hi ${esc(first)},</p>
${lines.map((t) => `<p style="margin:8px 0 0;font-size:13px;line-height:19px;color:#555555">${esc(t)}</p>`).join('\n')}
${sectionsHtml(sections)}
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 0"><tr><td style="background:#05838b;border-radius:6px">
<a href="${esc(a.link)}" style="display:inline-block;padding:11px 20px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none">Open the enquiry</a>
</td></tr></table>
<p style="margin:22px 0 0;font-size:11px;color:#999999">${esc(meta)}</p>
</div>
</body></html>`

  return { subject, text, html }
}
