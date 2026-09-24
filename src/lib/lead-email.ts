import 'server-only'

/**
 * The notification email a new lead sends to LEAD_NOTIFY_TO.
 *
 * Laid out to the reference Asim sent on 24 Sep 2026 ("when someone sends the
 * form it must be received in this format"):
 *
 *   New Website Enquiry
 *   A new contact enquiry came in from the website.
 *   ┌────────────┬─────────────────────────────┐
 *   │ Name       │ …                           │  a two column table,
 *   │ Email      │ …                           │  labels bold on grey
 *   │ Phone      │ +1 763-208-6506             │
 *   │ Company    │ …                           │
 *   │ Service    │ …                           │
 *   │ Audience   │ …                           │
 *   │ Address    │ street / City, ST ZIP       │
 *   │ Consent    │ …                           │
 *   │ Submitted  │ 2026-09-23 20:37:11 CT      │
 *   └────────────┴─────────────────────────────┘
 *   Customer Message (a boxed panel with the message, line breaks kept)
 *
 * A row with nothing in it is left out, so the pickup form (no service, no
 * city) gets the same layout with fewer rows, plus "How they heard" when it
 * was answered. How the visitor found the site (campaign, keyword, landing
 * page) is not in the email; it is on the enquiry in Admin → Enquiries.
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

  const place = [d.city, [d.state, d.zip].filter(Boolean).join(' ')].filter(Boolean).join(', ')
  const address = [d.address, place].filter(Boolean) as string[]

  // [label, lines]. Empty rows are dropped below.
  const rows: [string, string[]][] = [
    ['Name', [l.name ?? '']],
    ['Email', [l.email]],
    ['Phone', [phoneForEmail(l.phone) ?? '']],
    ['Company', [l.company ?? '']],
    ['Service', [d.service ?? d.item ?? '']],
    ['Audience', [d.audience ?? '']],
    ['Address', address],
    ['How they heard', [d.referral ?? '']],
    ['Consent', [d.consent ?? '']],
    ['Submitted At', [submittedAt(l.submittedAt ?? new Date())]],
  ]
  const shown = rows
    .map(([k, lines]) => [k, lines.map((x) => x.trim()).filter(Boolean)] as [string, string[]])
    .filter(([, lines]) => lines.length > 0)
  const message = (l.message ?? '').trim()

  const subject = `${intro.subject}: ${l.name ?? l.email}`

  const text = [
    intro.title,
    intro.line,
    '',
    ...shown.map(([k, lines]) => `${(k + ':').padEnd(16)}${lines.join(', ')}`),
    '',
    'Customer Message',
    message || '(no message)',
  ].join('\n')

  const BORDER = '1px solid #d9d9d9'
  const cellL = `padding:10px 14px;background:#f3f3f3;border:${BORDER};font-weight:700;vertical-align:top;width:190px;white-space:nowrap`
  const cellR = `padding:10px 14px;border:${BORDER};vertical-align:top`
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#ffffff">
<div style="font-family:'Segoe UI',Aptos,Calibri,Arial,sans-serif;font-size:14px;line-height:1.5;color:#1a1a1a;max-width:1000px">
<p style="margin:0 0 8px;font-size:15px;font-weight:700">${esc(intro.title)}</p>
<p style="margin:0 0 20px;color:#333333">${esc(intro.line)}</p>
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;width:100%;border:${BORDER}">
${shown.map(([k, lines]) => `<tr><td style="${cellL}">${esc(k)}</td><td style="${cellR}">${lines.map(esc).join('<br>')}</td></tr>`).join('\n')}
</table>
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;width:100%;margin-top:22px;border:${BORDER}">
<tr><td style="padding:10px 14px;background:#f3f3f3;border:${BORDER};font-weight:700">Customer Message</td></tr>
<tr><td style="padding:14px;border:${BORDER}">${message ? esc(message).replace(/\r?\n/g, '<br>') : '<span style="color:#777777">(no message)</span>'}</td></tr>
</table>
</div>
</body></html>`

  return { subject, text, html }
}
