/**
 * NO LONG OR SHORT DASHES IN SITE COPY (management, 19 Nov 2026: "remove all
 * the - from content … full website"; Aaqib chose the em dash — and the en
 * dash – only. Hyphenated words such as drop-off, e-waste, lithium-ion, K-12,
 * I-35W and phone numbers keep their hyphen.)
 *
 * undash(text) rewrites one piece of visible text:
 *
 *   ranges         1–4 pallets, 7:30 AM–4:00 PM, $5–$10   ->  "1 to 4", "7:30 AM to 4:00 PM"
 *                  Monday – Friday, Mon–Fri, January–March ->  "Monday to Friday" …
 *   names          University of Wisconsin–Madison          ->  "University of Wisconsin Madison"
 *   a pair         what we accept — a, b, and c — organized ->  "what we accept (a, b, and c) organized"
 *   one, before a list   base materials — plastic, wire, glass ->  "base materials: plastic, wire, glass"
 *   one, before a new sentence (a capital, not a name)  ->  ". "
 *   one, otherwise       quote — or set up a pickup      ->  "quote, or set up a pickup"
 *   on its own     "—" as an empty value                 ->  left alone (not prose)
 *
 * Plain JavaScript with no imports, so the one-off code rewrite, the database
 * script (scripts/remove-dashes-db.mjs) and the tests all use the same rules.
 */

const DASH = '–—‒―'
const D = `[${DASH}]`
/** Marks a spot this file changed, so the tidy-up never touches other text. */
const M = '\u0001'
const DAYS = '(?:Mon(?:day)?|Tue(?:s|sday)?|Wed(?:nesday)?|Thu(?:r|rs|rsday)?|Fri(?:day)?|Sat(?:urday)?|Sun(?:day)?)'
const MONTHS = '(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?|July?|Aug(?:ust)?|Sep(?:t|tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)'

/** Proper names written with a dash, and what they become. Checked first. */
const NAMES = [
  [new RegExp(`Wisconsin\\s*${D}\\s*Madison`, 'g'), 'Wisconsin Madison'],
  [new RegExp(`Universal Waste\\s*${D}\\s*Lamps`, 'g'), 'Universal Waste, Lamps'],
]

export function hasDash(s) {
  return typeof s === 'string' && new RegExp(D).test(s)
}

export function undash(input) {
  if (typeof input !== 'string' || !hasDash(input)) return input
  // A dash standing alone is an empty value in a table or a list, not prose.
  if (new RegExp(`^\\s*${D}\\s*$`).test(input)) return input
  let s = input
  for (const [re, to] of NAMES) s = s.replace(re, to)

  // ---------------------------------------------------------------- ranges
  // 1–4, 7:30 AM–4:00 PM, 9am–5pm, 2019–2020, $5–$10, 10%–20%
  // An en dash with any spacing, or an em dash with none ("Founded in 1993 —
  // 30+ years" is a sentence dash, not a range).
  const NUM = '(\\d(?:[:.,]\\d+)?%?\\s*(?:[AaPp]\\.?[Mm]\\.?)?)'
  s = s.replace(new RegExp(`${NUM}\\s*[\u2013\u2012]\\s*(\\$?\\d)`, 'g'), '$1 to $2')
  s = s.replace(new RegExp(`${NUM}\u2014(\\$?\\d)`, 'g'), '$1 to $2')
  s = s.replace(new RegExp(`\\b(${DAYS}\\.?)\\s*${D}\\s*(${DAYS}\\b\\.?)`, 'g'), '$1 to $2')
  // "Mon to Fri 7:30 AM to 4:00 PM" reads better with a comma before the time.
  s = s.replace(new RegExp(`\\b(${DAYS}\\.? to ${DAYS}\\.?) (\\d)`, 'g'), '$1, $2')
  s = s.replace(new RegExp(`\\b(${MONTHS}\\.?(?:\\s+\\d{1,2})?)\\s*${D}\\s*(${MONTHS}\\b)`, 'g'), '$1 to $2')

  // --------------------------------------------------- joined words (19 Nov)
  // An en dash with no space joins two names: "Dallas–Fort Worth",
  // "Minneapolis–St. Paul". A space keeps them one name ("Dallas Fort Worth"),
  // where a comma or colon split it in two.
  // Only between two capitalised words (20 Nov): "radon–the colorless gas" is
  // a sentence dash written without spaces, and the rules below handle it.
  s = s.replace(/\b([A-Z][A-Za-z.]*)[–‒]([A-Z])/g, '$1 $2')
  // A short heading or label joined by an em dash with no space ("Air—Pollution").
  if (s.trim().split(/\s+/).length <= 4) s = s.replace(/([A-Za-z])—([A-Z])/g, '$1 $2')

  // ------------------------------------------------------------ a pair
  // "x — a, b and c — y" in one sentence: brackets. Not across a sentence end.
  s = s.replace(new RegExp(`\\s*${D}\\s*([^${DASH}.!?\\n]{1,160}?)\\s*${D}\\s*`, 'g'), (m, inner, off, all) => {
    const after = all.slice(off + m.length)
    // The second dash ends the sentence ("… — a, b —."): only a colon fits.
    if (/^[.!?,;:)]/.test(after) || after === '') return `${M}: ${inner.trim()}`
    return ` (${inner.trim()}) `
  })

  // ------------------------------------------------------------ one dash
  s = s.replace(new RegExp(`(\\S?)(\\s*)${D}(\\s*)(\\S?)`, 'g'), (m, before, ws1, ws2, next, off, all) => {
    const rest = all.slice(off + m.length - next.length)
    const sentence = rest.split(/(?<=[.!?])\s/)[0] ?? rest
    // At the edge of the text (an HTML text node, a JSX text run): the words
    // on the other side are in the next node, so a comma joins them.
    if (!before) return ws1 ? `${M}, ${next}` : next
    if (!next) return ws2 ? `${before}${M}, ` : before
    if (/[.!?,;:]/.test(next)) return `${before}${M}${next}`
    const word = (rest.match(/^[\w’']+/)?.[0] ?? '').toLowerCase()
    const words = sentence.trim().split(/\s+/).length
    // A list follows ("base materials — plastic, wire, glass").
    const commas = (sentence.match(/,/g) ?? []).length
    if (commas >= 2 && !/ing$/.test(word) && !/^(from|to|in|on|at|by|for|with|including|especially|such|whether|which|who|and|or|but|so|because|if|when|while|whatever)$/.test(word)
      && !/\b(is|are|was|were|has|have|had|will|can|could|should|must|may|do|does|did|we|you|they|it)\b/i.test(sentence.split(',')[0] ?? '')) {
      return `${before}${M}: ${next}`
    }
    // A title's tagline ("Recycle Technologies – Bringing you …").
    if (/^[A-Z]/.test(next) && /ing$/.test(word)) return `${before}${M}: ${next}`
    // A new sentence follows: a clause that starts with a subject or a verb
    // telling the reader what to do ("… ends up — every shipment comes back",
    // "… the extra mile — we go …", "… required — request a quote").
    if (words >= 3 && /^(a|an|the|every|each|our|we|you|they|it|it’s|it's|its|this|that|these|those|one|here’s|here's|there|there’s|there's|if|when|food|most|many|some|nothing|everything|everyone|request|call|search|check|contact|see|learn|find|ask|order|bring|book|get|just|please|don’t|don't|do|recycle|let|try|make|keep|use|plan|start|send|pack|visit)$/.test(word)) {
      return `${before}${M}. ${next.toUpperCase()}`
    }
    if (/^[A-Z]/.test(next) && words >= 3 && /[a-z0-9)"'’]$/.test(before) && !/^(i|i’m|i'm)$/.test(word)
      && /^(recycle|our|your|the|we|you|they|it|this|that|every|each|no|not)$/.test(word)) {
      return `${before}${M}. ${next}`
    }
    // A name or a title part follows ("Old Phones — What to Do", "The
    // Landing—Minnesota River Heritage Park", "Blog — Page 2").
    if (/^[A-Z]/.test(next) && !/^(i|i’m|i'm)$/.test(word)) return `${before}${M}: ${next}`
    return `${before}${M}, ${next}`
  })

  // Tidy only where a dash was replaced (marked with M), never elsewhere.
  return s
    .replace(new RegExp(`\\s*${M}\\s*`, 'g'), M)
    .replace(new RegExp(`${M}([,.;:!?])\\s*([,.;:!?])`, 'g'), '$1')
    .replace(new RegExp(`${M}(,|:|\\.) +`, 'g'), '$1 ')
    .replace(new RegExp(M, 'g'), '')
    .replace(/\( +/g, '(')
    .replace(/ +\)/g, ')')
}

/** undash() over every text node of an HTML string; tags and attributes are left alone, apart from alt and title. */
export function undashHtml(html) {
  if (!hasDash(html)) return html
  return html
    .replace(/(<[^>]*>)|([^<]+)/g, (m, tag, text) => {
      if (tag) return tag.replace(/\b(alt|title)="([^"]*)"/g, (a, k, v) => `${k}="${undash(v)}"`)
      // Entities stay as written; only the dash entities are dashes.
      return undash(text.replace(/&mdash;|&#8212;|&#x2014;/gi, '—').replace(/&ndash;|&#8211;|&#x2013;/gi, '–'))
    })
}

/** undash() over every string inside a JSON value (Admin -> Pages copy, an editor document). */
export function undashJson(value, opts = {}) {
  const skip = opts.skipKeys ?? new Set(['href', 'url', 'src', 'slug', 'id', 'key', 'type', 'path'])
  const walk = (v, key) => {
    if (typeof v === 'string') return skip.has(key) ? v : undash(v)
    if (Array.isArray(v)) return v.map((x) => walk(x, key))
    if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x, k)]))
    return v
  }
  return walk(value, '')
}
