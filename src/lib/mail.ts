import 'server-only'
import { createTransport, type Transporter } from 'nodemailer'

/**
 * Outgoing mail — one transport, configured entirely from the environment.
 *
 * WHY A DEPENDENCY (CLAUDE.md rule 10). Sending SMTP by hand means writing
 * EHLO/STARTTLS/AUTH, MIME encoding and header folding, and getting any of that
 * subtly wrong is how mail silently lands in spam rather than failing loudly.
 * nodemailer is the standard for this and is SERVER ONLY — `server-only` above
 * makes importing it from a component a build error, so it adds nothing to the
 * client bundle a visitor downloads.
 *
 * SMTP rather than a transactional HTTP API because the team already has
 * mailboxes on 99technologies.com: an app password on that account works today,
 * with no new vendor and no card. Swapping to Resend or Postmark later is a
 * change to this file alone — everything upstream just calls sendMail().
 *
 * NOTHING HERE THROWS AT IMPORT TIME. A missing SMTP_HOST is a normal state:
 * the sandbox has no mail server, and the site must still build and run. The
 * transport is created on first use and `configured` tells a caller whether
 * there is any point.
 */

let cached: Transporter | null = null

/** True when the environment carries enough to talk to a mail server. */
export function mailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
}

function transport(): Transporter | null {
  if (!mailConfigured()) return null
  if (cached) return cached
  const port = Number(process.env.SMTP_PORT ?? 587)
  cached = createTransport({
    host: process.env.SMTP_HOST,
    port,
    // 465 is implicit TLS; 587 and 25 start plain and upgrade with STARTTLS.
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
  return cached
}

export type Mail = {
  to: string
  subject: string
  text: string
  /** Optional HTML body; `text` is always sent too, for clients that want it. */
  html?: string
  /** Sender override — mail to customers goes out as the company, not "RTI Website". */
  from?: string
  /** So a reply from the notification goes to the person who filled the form. */
  replyTo?: string
}

/**
 * Sends, and says whether it went.
 *
 * Deliberately does NOT throw. Every caller is handling something a visitor
 * just did, and a mail server having a bad minute must never turn into a failed
 * form submission — the enquiry is already in the database by the time this
 * runs. Failures are logged with enough to diagnose and swallowed.
 */
export async function sendMail(mail: Mail): Promise<{ sent: boolean; reason?: string }> {
  const t = transport()
  if (!t) return { sent: false, reason: 'SMTP is not configured' }
  try {
    await t.sendMail({
      from: mail.from ?? process.env.MAIL_FROM ?? process.env.SMTP_USER,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
      ...(mail.html ? { html: mail.html } : {}),
      replyTo: mail.replyTo,
    })
    return { sent: true }
  } catch (err) {
    console.error('[mail] send failed:', (err as Error).message)
    return { sent: false, reason: (err as Error).message }
  }
}

/**
 * Where form notifications go.
 *
 * On the dev server this is rizwan.haider@99technologies.com — Asim, 21 Sep
 * 2026 — set in `.env.local` there rather than hardcoded, so production does
 * not inherit a tester's inbox when it ships.
 */
export function notifyAddress(): string | null {
  return process.env.LEAD_NOTIFY_TO?.trim() || null
}
