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
  email: string
  phone: string | null
  company: string | null
  message: string | null
  details: Record<string, string>
  submittedAt?: Date
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

/** +17632086506 -> +1 763-208-6506, the way the reference prints it. */
function phoneForEmail(p: string | null): string | null {
  if (!p) return null
  const m = p.match(/^\+1(\d{3})(\d{3})(\d{4})$/)
  return m ? `+1 ${m[1]}-${m[2]}-${m[3]}` : p
}

/** "2026-09-23 20:37:11 CT": the company's own time, Minnesota and Wisconsin. */
function submittedAt(d: Date): string {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
    }).formatToParts(d).map((p) => [p.type, p.value]),
  )
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second} CT`
}

const INTRO: Record<string, { title: string; line: string; subject: string }> = {
  contact: { title: 'New Website Enquiry', line: 'A new contact enquiry came in from the website.', subject: 'New Website Enquiry' },
  quote: { title: 'New Pickup Request', line: 'A new pickup request came in from the website.', subject: 'New Pickup Request' },
}

export function leadNotification(l: LeadForEmail): { subject: string; text: string; html: string } {
  const d = l.details
  const intro = INTRO[l.type] ?? {
    title: 'New Website Enquiry', line: `A new ${l.type} enquiry came in from the website.`, subject: 'New Website Enquiry',
  }

  const what = (d.service ?? d.item ?? '').trim()
  const kind = /shred|destruction|degauss/i.test(what) ? 'Shredding' : 'Recycling'
  const place = [d.city, [d.state, d.zip].filter(Boolean).join(' ')].filter(Boolean).join(', ')
  const address = [d.address, place].filter(Boolean).join(', ')
  const name = (l.name ?? [d.firstName, d.lastName].filter(Boolean).join(' ')).trim()

  type Row = [string, string]
  type Section = { title: string; rows: Row[] }
  const all: Section[] = [
    { title: 'Select Service', rows: [['Choose any one', kind]] },
    { title: 'Quote Type', rows: [
      ['What would you like to Recycle or Shred?', what],
      ['Is it for?', d.audience ?? ''],
      ['How did you hear about us?', d.referral ?? ''],
    ] },
    { title: 'Personal Info', rows: [
      ['Name', name],
      ['Phone Number', phoneForEmail(l.phone) ?? ''],
      ['Email', l.email],
      ['Company Name', l.company ?? ''],
      ['Company Address', address],
    ] },
    { title: 'More Info', rows: [
      ['Please describe in detail what you would like to recycle or shred, and include other questions or comments here.', (l.message ?? '').trim()],
    ] },
  ]
  const sections = all
    .map((s): Section => ({ ...s, rows: s.rows.filter(([, v]) => v.trim().length > 0) }))
    .filter((s) => s.rows.length > 0)

  const sent = `Sent ${submittedAt(l.submittedAt ?? new Date())}${d.consent ? ' · Consent given' : ''}`
  const subject = `${intro.subject}: ${name || l.email}`

  const text = [
    intro.title,
    '',
    ...sections.flatMap((s) => [
      s.title.toUpperCase(),
      ...s.rows.map(([k, v]) => `  ${k}: ${v}`),
      '',
    ]),
    sent,
  ].join('\n')

  // The model: a 375px column, 13px Arial, grey labels, a #e6e6e6 rule under
  // every row, headings uppercase in #555.
  const HEAD = 'padding:22px 0 6px;font-size:15px;font-weight:700;letter-spacing:.3px;text-transform:uppercase;color:#555555'
  const LABEL = 'padding:10px 8px 10px 0;width:170px;color:#555555;font-size:13px;line-height:18px;vertical-align:middle;border-bottom:1px solid #e6e6e6'
  const VALUE = 'padding:10px 0;color:#333333;font-size:13px;line-height:18px;vertical-align:middle;border-bottom:1px solid #e6e6e6'
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#ffffff">
<div style="font-family:Arial,Helvetica,sans-serif;color:#333333;max-width:420px">
<p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#222222">${esc(intro.title)}</p>
<p style="margin:0;font-size:13px;color:#777777">${esc(intro.line)}</p>
${sections.map((s) => `<table role="presentation" cellpadding="0" cellspacing="0" width="375" style="border-collapse:collapse;width:375px">
<tr><td colspan="2" style="${HEAD}">${esc(s.title)}</td></tr>
${s.rows.map(([k, v]) => `<tr><td style="${LABEL}">${esc(k)}</td><td style="${VALUE}">${esc(v).replace(/\r?\n/g, '<br>')}</td></tr>`).join('\n')}
</table>`).join('\n')}
<p style="margin:22px 0 0;font-size:11px;color:#999999">${esc(sent)}</p>
</div>
</body></html>`

  return { subject, text, html }
}
