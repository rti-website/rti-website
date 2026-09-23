/**
 * US phone numbers, "accepted loosely" — the lead-form spec of 23 Sep 2026.
 *
 * Any punctuation, spaces or a leading +1 are fine; what counts is the
 * digits: ten of them, or eleven starting with the country code 1. Shared by
 * the contact form (checks before posting) and /api/leads (checks again and
 * stores the result), so the two cannot disagree about what a valid number is.
 */
export function usPhoneDigits(raw: string): string | null {
  const d = raw.replace(/\D/g, '')
  if (d.length === 10) return d
  if (d.length === 11 && d.startsWith('1')) return d.slice(1)
  return null
}

/** E.164, as the spec stores it: +1XXXXXXXXXX. */
export function toE164(raw: string): string | null {
  const d = usPhoneDigits(raw)
  return d ? `+1${d}` : null
}
