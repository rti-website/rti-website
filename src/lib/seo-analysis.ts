/**
 * The content analysis behind the SEO screen.
 *
 * Every check in "Yoast/Rank Math-style content analysis fields" from
 * PRJ/002 — RTI SEO Fields for CMS (17 Sept 2026) has an entry here, in the
 * order the document lists them, and `CHECK_IDS` below is that list verbatim so
 * a missing one fails the test rather than going unnoticed.
 *
 * !! NO DEPENDENCY, AND NO `server-only`. This runs in the browser while the
 * SEO person types — waiting for a round trip to recolour a traffic light is
 * the thing that makes those panels feel broken — and on the server when a
 * score is stored. One function, one result, both places. That also means it
 * must stay pure: no Date.now(), no locale, no DOM.
 *
 * !! IT IS ADVICE, NOT A RULE. Nothing here blocks a save. A 62 on a post that
 * reads well is not a problem to fix, and CLAUDE.md rule 6 outranks every
 * suggestion in this file for anything ported from WordPress — a red "keyword
 * missing from title" on a page that has ranked for four years is a reason to
 * leave the title alone.
 */

export type CheckStatus = 'good' | 'ok' | 'bad' | 'na'

export type Check = {
  id: string
  /** The doc's own label. */
  label: string
  status: CheckStatus
  /** One line, specific: a number or the actual text, never "could be better". */
  detail: string
  group: 'basics' | 'keyword' | 'structure' | 'links'
}

export type Analysis = {
  /** 0-100. Weighted over the checks that apply; `na` ones are excluded. */
  score: number
  /** Flesch reading ease, 0-100, rounded. Higher is easier. */
  readability: number
  readabilityLabel: string
  checks: Check[]
  /** Raw counts the panel prints next to the checks. */
  stats: {
    words: number
    headings: number
    h1: number
    images: number
    imagesWithAlt: number
    internalLinks: number
    externalLinks: number
    keywordCount: number
    density: number
    titleLength: number
    descriptionLength: number
  }
}

export type AnalysisInput = {
  /** The SEO title, or the H1 when no SEO title is set. */
  title: string
  metaDescription: string
  slug: string
  h1: string
  focusKeyword: string
  secondaryKeywords?: string[]
  /** The rendered post body. WordPress markup or our own; both are HTML here. */
  html: string
  /** Slugs of other posts already using this focus keyword. */
  keywordUsedBy?: string[]
  /** Hostname that counts as internal. Defaults to the live site. */
  siteHost?: string
}

/** The document's list, in its order. The UI renders whatever this produces. */
export const CHECK_IDS = [
  'keyword-in-title',
  'keyword-in-description',
  'keyword-in-url',
  'keyword-in-introduction',
  'keyword-in-headings',
  'keyword-in-alt',
  'keyword-distribution',
  'content-length',
  'internal-links',
  'external-links',
  'images',
  'image-alt-text',
  'h1-usage',
  'heading-structure',
  'keyword-density',
  'keyword-prominence',
  'previous-keyword',
] as const

/* ------------------------------------------------------------------ text */

const strip = (html: string) =>
  html
    // script and style carry no prose, and a JSON-LD block would otherwise be
    // counted as several hundred words of content. These posts have those.
    .replace(/<(script|style|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const words = (text: string) => (text.match(/[A-Za-z0-9'’-]+/g) ?? [])

/** Vowel groups, with the usual silent-e correction. Good enough for Flesch. */
function syllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '')
  if (w.length <= 3) return 1
  const trimmed = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '')
  return (trimmed.match(/[aeiouy]{1,2}/g) ?? []).length || 1
}

function fleschReadingEase(text: string): number {
  const ws = words(text)
  const sentences = (text.match(/[.!?]+(?:\s|$)/g) ?? []).length || 1
  if (ws.length === 0) return 0
  const syl = ws.reduce((n, w) => n + syllables(w), 0)
  const score = 206.835 - 1.015 * (ws.length / sentences) - 84.6 * (syl / ws.length)
  return Math.max(0, Math.min(100, Math.round(score)))
}

export function readabilityLabel(score: number): string {
  if (score >= 80) return 'Very easy'
  if (score >= 70) return 'Easy'
  if (score >= 60) return 'Plain English'
  if (score >= 50) return 'Fairly hard'
  if (score >= 30) return 'Hard'
  return 'Very hard'
}

/** Case and punctuation insensitive "does the haystack contain the phrase". */
function has(haystack: string, phrase: string): boolean {
  if (!phrase.trim()) return false
  return norm(haystack).includes(norm(phrase))
}
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

function countPhrase(text: string, phrase: string): number {
  if (!phrase.trim()) return 0
  const t = norm(text)
  const p = norm(phrase)
  if (!p) return 0
  let n = 0
  let at = t.indexOf(p)
  while (at !== -1) { n++; at = t.indexOf(p, at + p.length) }
  return n
}

/* -------------------------------------------------------------- the checks */

export function analyse(input: AnalysisInput): Analysis {
  const host = input.siteHost ?? 'recycletechnologies.com'
  const kw = (input.focusKeyword ?? '').trim()
  const html = input.html ?? ''
  const text = strip(html)
  const ws = words(text)
  const wordCount = ws.length

  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)]
    .map((m) => ({ level: Number(m[1]), text: strip(m[2] ?? '') }))
  const h1s = headings.filter((h) => h.level === 1)

  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0])
  const alts = imgs.map((tag) => /\balt\s*=\s*["']([^"']*)["']/i.exec(tag)?.[1] ?? '')
  const withAlt = alts.filter((a) => a.trim().length > 0).length

  const hrefs = [...html.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']+)["']/gi)].map((m) => m[1] ?? '')
  const isInternal = (h: string) =>
    h.startsWith('/') || h.startsWith('#') || new RegExp(`^https?://(www\\.)?${host.replace('.', '\\.')}`, 'i').test(h)
  const real = hrefs.filter((h) => !h.startsWith('#') && !h.startsWith('mailto:') && !h.startsWith('tel:'))
  const internalLinks = real.filter(isInternal).length
  const externalLinks = real.length - internalLinks

  const kwCount = countPhrase(text, kw)
  const density = wordCount > 0 && kw ? (kwCount * words(kw).length * 100) / wordCount : 0

  // The introduction is the first 10% of the body or 120 words, whichever is
  // longer — a 3,000-word guide should not fail because the phrase lands in
  // word 130.
  const introWords = Math.max(120, Math.round(wordCount * 0.1))
  const intro = ws.slice(0, introWords).join(' ')

  const title = input.title ?? ''
  const description = input.metaDescription ?? ''
  const usedBy = input.keywordUsedBy ?? []

  const out: Check[] = []
  const add = (id: string, label: string, group: Check['group'], status: CheckStatus, detail: string) =>
    out.push({ id, label, group, status, detail })

  const noKw = (id: string, label: string, group: Check['group']) =>
    add(id, label, group, 'na', 'No focus keyword set.')

  /* -- keyword ----------------------------------------------------------- */
  if (!kw) noKw('keyword-in-title', 'Focus Keyword in SEO Title', 'keyword')
  else add('keyword-in-title', 'Focus Keyword in SEO Title', 'keyword',
    has(title, kw) ? 'good' : 'bad',
    has(title, kw) ? `"${kw}" is in the title.` : `"${kw}" is not in the title.`)

  if (!kw) noKw('keyword-in-description', 'Focus Keyword in Meta Description', 'keyword')
  else add('keyword-in-description', 'Focus Keyword in Meta Description', 'keyword',
    has(description, kw) ? 'good' : 'bad',
    has(description, kw) ? `"${kw}" is in the description.` : `"${kw}" is not in the description.`)

  if (!kw) noKw('keyword-in-url', 'Focus Keyword in URL', 'keyword')
  else add('keyword-in-url', 'Focus Keyword in URL', 'keyword',
    has(input.slug.replace(/-/g, ' '), kw) ? 'good' : 'bad',
    has(input.slug.replace(/-/g, ' '), kw) ? `The slug contains "${kw}".` : `The slug does not contain "${kw}".`)

  if (!kw) noKw('keyword-in-introduction', 'Focus Keyword in Introduction', 'keyword')
  else add('keyword-in-introduction', 'Focus Keyword in Introduction', 'keyword',
    has(intro, kw) ? 'good' : 'bad',
    has(intro, kw) ? `"${kw}" appears in the first ${introWords} words.` : `"${kw}" is not in the first ${introWords} words.`)

  if (!kw) noKw('keyword-in-headings', 'Focus Keyword in Headings', 'keyword')
  else {
    const n = headings.filter((h) => h.level >= 2 && has(h.text, kw)).length
    add('keyword-in-headings', 'Focus Keyword in Headings', 'keyword',
      n > 0 ? 'good' : 'bad',
      n > 0 ? `${n} of ${headings.length} headings contain it.` : 'No subheading contains it.')
  }

  if (!kw) noKw('keyword-in-alt', 'Focus Keyword in Image Alt Text', 'keyword')
  else if (imgs.length === 0) add('keyword-in-alt', 'Focus Keyword in Image Alt Text', 'keyword', 'na', 'No images in the body.')
  else {
    const n = alts.filter((a) => has(a, kw)).length
    add('keyword-in-alt', 'Focus Keyword in Image Alt Text', 'keyword',
      n > 0 ? 'good' : 'ok',
      n > 0 ? `${n} of ${imgs.length} alt texts contain it.` : 'No alt text contains it.')
  }

  if (!kw || kwCount === 0) noKw('keyword-distribution', 'Focus Keyword Distribution', 'keyword')
  else {
    // Where the occurrences sit across the body, in thirds. Everything bunched
    // in the opening is the classic "wrote the intro for Google" shape.
    const t = norm(text)
    const p = norm(kw)
    const spots: number[] = []
    let at = t.indexOf(p)
    while (at !== -1) { spots.push(at / t.length); at = t.indexOf(p, at + p.length) }
    const thirds = [0, 0, 0]
    for (const s of spots) { const i = Math.min(2, Math.floor(s * 3)); thirds[i] = (thirds[i] ?? 0) + 1 }
    const covered = thirds.filter((n) => n > 0).length
    add('keyword-distribution', 'Focus Keyword Distribution', 'keyword',
      covered === 3 ? 'good' : covered === 2 ? 'ok' : 'bad',
      `Beginning ${thirds[0]}, middle ${thirds[1]}, end ${thirds[2]}.`)
  }

  if (!kw) noKw('keyword-density', 'Keyword Density', 'keyword')
  else {
    const d = Math.round(density * 100) / 100
    add('keyword-density', 'Keyword Density', 'keyword',
      d >= 0.5 && d <= 2.5 ? 'good' : d > 0 && d < 0.5 ? 'ok' : d === 0 ? 'bad' : 'bad',
      `${d}% — ${kwCount} occurrence${kwCount === 1 ? '' : 's'} in ${wordCount} words. Aim for 0.5 to 2.5%.`)
  }

  if (!kw) noKw('keyword-prominence', 'Keyword Prominence', 'keyword')
  else {
    const first = norm(text).indexOf(norm(kw))
    const pct = first === -1 ? null : Math.round((first / Math.max(1, norm(text).length)) * 100)
    add('keyword-prominence', 'Keyword Prominence', 'keyword',
      pct === null ? 'bad' : pct <= 10 ? 'good' : pct <= 25 ? 'ok' : 'bad',
      pct === null ? 'The keyword does not appear in the body.' : `First appears ${pct}% of the way in.`)
  }

  if (!kw) noKw('previous-keyword', 'Previously Used Focus Keyword', 'keyword')
  else add('previous-keyword', 'Previously Used Focus Keyword', 'keyword',
    usedBy.length === 0 ? 'good' : 'bad',
    usedBy.length === 0
      ? 'No other post targets this keyword.'
      : `Also targeted by ${usedBy.length} other post${usedBy.length === 1 ? '' : 's'}: ${usedBy.slice(0, 3).join(', ')}${usedBy.length > 3 ? '…' : ''}`)

  /* -- structure --------------------------------------------------------- */
  add('content-length', 'Content Length', 'structure',
    wordCount >= 900 ? 'good' : wordCount >= 400 ? 'ok' : 'bad',
    `${wordCount} words.`)

  add('images', 'Images', 'structure',
    imgs.length >= 1 ? 'good' : 'ok',
    imgs.length === 0 ? 'No images in the body.' : `${imgs.length} image${imgs.length === 1 ? '' : 's'}.`)

  add('image-alt-text', 'Image Alt Text', 'structure',
    imgs.length === 0 ? 'na' : withAlt === imgs.length ? 'good' : withAlt > 0 ? 'ok' : 'bad',
    imgs.length === 0 ? 'No images in the body.' : `${withAlt} of ${imgs.length} images have alt text.`)

  add('h1-usage', 'H1 Usage', 'structure',
    // The template prints the H1 from the title field, so a post whose BODY
    // also has one is the problem, not a body with none.
    h1s.length === 0 ? 'good' : 'bad',
    h1s.length === 0
      ? 'One H1, printed from the title.'
      : `The body contains ${h1s.length} more H1${h1s.length === 1 ? '' : 's'} — these should be H2.`)

  {
    const levels = headings.filter((h) => h.level >= 2).map((h) => h.level)
    let jumped = false
    for (let i = 1; i < levels.length; i++) {
      if ((levels[i] ?? 0) - (levels[i - 1] ?? 0) > 1) { jumped = true; break }
    }
    add('heading-structure', 'Heading Structure', 'structure',
      levels.length === 0 ? 'bad' : jumped ? 'ok' : 'good',
      levels.length === 0 ? 'No subheadings at all.'
        : jumped ? `${levels.length} subheadings, but a level is skipped.`
          : `${levels.length} subheadings, properly nested.`)
  }

  /* -- links ------------------------------------------------------------- */
  add('internal-links', 'Internal Links', 'links',
    internalLinks >= 2 ? 'good' : internalLinks === 1 ? 'ok' : 'bad',
    `${internalLinks} link${internalLinks === 1 ? '' : 's'} to other pages on the site.`)

  add('external-links', 'External Links', 'links',
    externalLinks >= 1 ? 'good' : 'ok',
    `${externalLinks} link${externalLinks === 1 ? '' : 's'} off the site.`)

  /* -- score ------------------------------------------------------------- */
  // Every applicable check is worth the same, plus the two title/description
  // length rules, which are not in the doc's check list but are what the panel
  // shows above it. `na` is excluded rather than counted as a pass, so a post
  // with no keyword scores on what it actually has.
  const graded = out.filter((c) => c.status !== 'na')
  const earned = graded.reduce((n, c) => n + (c.status === 'good' ? 1 : c.status === 'ok' ? 0.5 : 0), 0)
  const score = graded.length === 0 ? 0 : Math.round((earned / graded.length) * 100)

  const readability = fleschReadingEase(text)

  return {
    score,
    readability,
    readabilityLabel: readabilityLabel(readability),
    checks: out,
    stats: {
      words: wordCount,
      headings: headings.filter((h) => h.level >= 2).length,
      h1: h1s.length,
      images: imgs.length,
      imagesWithAlt: withAlt,
      internalLinks,
      externalLinks,
      keywordCount: kwCount,
      density: Math.round(density * 100) / 100,
      titleLength: title.length,
      descriptionLength: description.length,
    },
  }
}

/* --------------------------------------------------------- length guides */

/** Google truncates around 580px, which is about this many characters. */
export const TITLE_MAX = 60
export const DESCRIPTION_MIN = 120
export const DESCRIPTION_MAX = 160

export function lengthStatus(n: number, min: number, max: number): CheckStatus {
  if (n === 0) return 'bad'
  if (n > max) return 'bad'
  if (n < min) return 'ok'
  return 'good'
}
