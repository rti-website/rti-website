/**
 * Emails the site sends to the people who fill in its forms.
 *
 * RESIDENTIAL DROP OFF REPLY — Asim, 23 Sep 2026: "when [a] residential lead
 * fill[s] the form we should send this mail automatically to that user". The
 * copy is the office's own reply to residential pickup requests, polished.
 * Pickup is for business customers only, so a household that asks for one is
 * pointed at the two drop off locations instead, straight away rather than
 * after someone in the office gets to it.
 *
 * Sent by /api/leads when "Is it for?" (contact form) or "Residential or
 * Business?" (ITAD pickup form) is Residential. See the note there on the
 * once a day limit.
 *
 * Written without dashes or hyphens (Asim's house style for email), which is
 * why the phone numbers use dots.
 *
 * The Wisconsin number is the office's: 800.305.3040. The site's thank you
 * page and the industry pages still print (800) 205-3040; one of the two is
 * wrong, and this is the one the office sends.
 */

export const RESIDENTIAL_REPLY = {
  subject: 'Your recycling drop off options at Recycle Technologies',
  intro: [
    'Thank you for contacting Recycle Technologies.',
    'Our pickup service is available to business customers only, so we are not able to collect items from homes. You are very welcome to bring your items to either of our drop off locations.',
  ],
  locations: [
    { state: 'Minnesota', lines: ['Recycle Technologies, Inc.', '1525 99th Ln NE', 'Blaine, MN 55449'], phone: '800.969.5166', tel: '+18009695166' },
    { state: 'Wisconsin', lines: ['Recycle Technologies, Inc.', '2815 South 171st Street', 'New Berlin, WI 53151'], phone: '800.305.3040', tel: '+18003053040' },
  ],
  confirm: 'Please give the location a call before your visit to confirm drop off details.',
  acceptsTitle: 'What we accept',
  accepts: [
    'All types of electronics',
    'All types of batteries',
    'All types of light bulbs and lamps',
    'Mattresses',
    'Tires',
    'Treadmills and other exercise equipment',
    'Propane tanks',
  ],
  bikes: 'Bike donations: we gladly accept bicycles as donations, at no charge. This applies to bicycles only.',
  outro: 'Don’t see your item listed? Give our office a call and our team will be happy to help.',
  signoff: ['Best regards,', 'The Recycle Technologies Team'],
} as const

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

/** Plain text version. `first` is the person's first name when the form had one. */
export function residentialReplyText(first: string | null): string {
  const r = RESIDENTIAL_REPLY
  return [
    `Hi ${first ?? 'there'},`,
    '',
    r.intro[0],
    '',
    r.intro[1],
    '',
    ...r.locations.flatMap((l) => [l.state, ...l.lines, `Phone: ${l.phone}`, '']),
    r.confirm,
    '',
    `${r.acceptsTitle}:`,
    ...r.accepts.map((a) => `  • ${a}`),
    '',
    r.bikes,
    '',
    r.outro,
    '',
    ...r.signoff,
  ].join('\n')
}

/** HTML version: the same words, simple inline styles every mail client keeps. */
export function residentialReplyHtml(first: string | null): string {
  const r = RESIDENTIAL_REPLY
  const p = (t: string) => `<p style="margin:0 0 14px">${esc(t)}</p>`
  const loc = r.locations.map((l) => `
    <td valign="top" style="padding:0 24px 0 0">
      <p style="margin:0 0 4px;font-weight:bold;color:#0b1f3a">${esc(l.state)}</p>
      <p style="margin:0">${l.lines.map(esc).join('<br>')}<br>
      Phone: <a href="tel:${l.tel}" style="color:#046c73">${esc(l.phone)}</a></p>
    </td>`).join('')
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f6f7f8">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:8px;border-top:4px solid #05838b">
<tr><td style="padding:28px 32px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#212529">
${p(`Hi ${first ?? 'there'},`)}
${r.intro.map(p).join('\n')}
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 18px"><tr>${loc}</tr></table>
${p(r.confirm)}
<p style="margin:0 0 6px;font-weight:bold;color:#0b1f3a">${esc(r.acceptsTitle)}</p>
<ul style="margin:0 0 14px;padding-left:20px">${r.accepts.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>
${p(r.bikes)}
${p(r.outro)}
<p style="margin:0">${r.signoff.map(esc).join('<br>')}</p>
</td></tr></table>
</td></tr></table>
</body></html>`
}
