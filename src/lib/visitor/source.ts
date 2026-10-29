/**
 * Where a visit came from (brief section 7, and management's 30 Oct 2026
 * list: "How they found us (Google Ads, organic, LinkedIn, direct)"). Six
 * kinds, each with a label the admin shows:
 *
 *   ad        a click ID (gclid, gbraid, wbraid: Google Ads; msclkid: Microsoft
 *             Ads), or a paid utm_medium ("LinkedIn Ads", "Facebook Ads" …)
 *   organic   a search engine sent it ("Organic: Google")
 *   social    LinkedIn, Facebook, Instagram, X, YouTube … not paid ("LinkedIn")
 *   email     utm_medium=email or a webmail referrer ("Email")
 *   referral  any other site ("mprnews.org"; AI assistants by name, "ChatGPT")
 *   direct    nothing said where from: typed, bookmarked, or a referrer that
 *             was stripped (many apps do that)
 *
 * Pure, see ip.ts. Shared by the admin endpoints and the emails.
 */

export type Attribution = Partial<Record<string, string>>
export type SourceKind = 'ad' | 'organic' | 'social' | 'email' | 'referral' | 'direct'
export type Source = { kind: SourceKind; label: string }

export const SOURCE_KINDS: { kind: SourceKind; label: string }[] = [
  { kind: 'ad', label: 'Ads' }, { kind: 'organic', label: 'Organic search' }, { kind: 'social', label: 'Social' },
  { kind: 'email', label: 'Email' }, { kind: 'referral', label: 'Referral' }, { kind: 'direct', label: 'Direct' },
]

const SEARCH: [RegExp, string][] = [
  [/(^|\.)google\./, 'Google'], [/(^|\.)bing\.com$/, 'Bing'], [/(^|\.)yahoo\./, 'Yahoo'], [/(^|\.)duckduckgo\.com$/, 'DuckDuckGo'],
  [/(^|\.)ecosia\.org$/, 'Ecosia'], [/(^|\.)baidu\.com$/, 'Baidu'], [/(^|\.)yandex\./, 'Yandex'], [/(^|\.)startpage\.com$/, 'Startpage'],
  [/(^|\.)search\.brave\.com$/, 'Brave'], [/(^|\.)qwant\.com$/, 'Qwant'], [/(^|\.)aol\.com$/, 'AOL'], [/(^|\.)ask\.com$/, 'Ask'],
]
const SOCIAL: [RegExp, string][] = [
  [/(^|\.)(linkedin\.com|lnkd\.in)$/, 'LinkedIn'], [/(^|\.)(facebook\.com|fb\.com|fb\.me)$/, 'Facebook'],
  [/(^|\.)instagram\.com$/, 'Instagram'], [/(^|\.)(twitter\.com|x\.com|t\.co)$/, 'X (Twitter)'],
  [/(^|\.)(youtube\.com|youtu\.be)$/, 'YouTube'], [/(^|\.)reddit\.com$/, 'Reddit'], [/(^|\.)pinterest\./, 'Pinterest'],
  [/(^|\.)tiktok\.com$/, 'TikTok'], [/(^|\.)nextdoor\.com$/, 'Nextdoor'],
]
const AI: [RegExp, string][] = [
  [/(^|\.)(chatgpt\.com|chat\.openai\.com)$/, 'ChatGPT'], [/(^|\.)perplexity\.ai$/, 'Perplexity'], [/(^|\.)claude\.ai$/, 'Claude'],
  [/(^|\.)gemini\.google\.com$/, 'Gemini'], [/(^|\.)copilot\.microsoft\.com$/, 'Copilot'],
]
const WEBMAIL = /(^|\.)(mail\.google\.com|outlook\.(live|office|office365)\.com|mail\.yahoo\.com)$/
const PAID = /^(cpc|ppc|paid|paidsearch|paid_search|paid-search|paid-social|paid_social|paidsocial|display|cpm|cpv|sponsored|ads?)$/

/** "linkedin" -> "LinkedIn", "google" -> "Google", anything else capitalised. */
function prettySource(s: string): string {
  const k = s.trim().toLowerCase()
  const known: Record<string, string> = {
    google: 'Google', adwords: 'Google', bing: 'Microsoft', microsoft: 'Microsoft', linkedin: 'LinkedIn', li: 'LinkedIn',
    facebook: 'Facebook', fb: 'Facebook', meta: 'Facebook', instagram: 'Instagram', ig: 'Instagram', twitter: 'X (Twitter)', x: 'X (Twitter)',
    youtube: 'YouTube', reddit: 'Reddit', tiktok: 'TikTok', newsletter: 'Newsletter', email: 'Email',
  }
  return known[k] ?? (k ? k.charAt(0).toUpperCase() + k.slice(1) : '')
}

function hostOf(url: string | undefined): string | null {
  if (!url) return null
  try { return new URL(url).hostname.replace(/^www\./, '').toLowerCase() } catch { return null }
}

const match = (host: string, list: [RegExp, string][]) => list.find(([re]) => re.test(host))?.[1] ?? null

export function sourceOf(a: Attribution | null | undefined, ownHost = 'recycletechnologies.com'): Source {
  if (!a) return { kind: 'direct', label: 'Direct' }
  const medium = (a.utm_medium ?? '').trim().toLowerCase()
  const utmSource = a.utm_source ? prettySource(a.utm_source) : ''
  if (a.gclid || a.gbraid || a.wbraid) return { kind: 'ad', label: 'Google Ads' }
  if (a.msclkid) return { kind: 'ad', label: 'Microsoft Ads' }
  if (PAID.test(medium)) return { kind: 'ad', label: utmSource ? `${utmSource} Ads` : 'Ads' }
  if (a.fbclid) return { kind: 'social', label: 'Facebook' }
  if (medium === 'email' || medium === 'e-mail' || medium === 'newsletter') return { kind: 'email', label: utmSource && utmSource !== 'Email' ? `Email: ${utmSource}` : 'Email' }
  const ref = hostOf(a.referrer)
  const own = ownHost.replace(/^www\./, '')
  if (ref && ref !== own && !ref.endsWith(`.${own}`)) {
    if (WEBMAIL.test(ref)) return { kind: 'email', label: 'Email' }
    const ai = match(ref, AI)
    if (ai) return { kind: 'referral', label: ai }
    const search = match(ref, SEARCH)
    if (search) return { kind: 'organic', label: `Organic: ${search}` }
    const social = match(ref, SOCIAL)
    if (social) return { kind: 'social', label: social }
    return { kind: 'referral', label: ref }
  }
  if (medium === 'social' || medium === 'social-media' || medium === 'organic_social') return { kind: 'social', label: utmSource || 'Social' }
  if (utmSource) {
    const social = ['LinkedIn', 'Facebook', 'Instagram', 'X (Twitter)', 'YouTube', 'Reddit', 'TikTok'].includes(utmSource)
    return { kind: social ? 'social' : 'referral', label: utmSource }
  }
  return { kind: 'direct', label: 'Direct' }
}

/** Pages that show intent: viewing one without submitting a form flags the company (brief section 7). */
export const INTENT_PATHS = ['/request-a-pickup/', '/quote/', '/quote-by-location/', '/contact-us/']

export function isIntentPath(p: string): boolean {
  const path = p.endsWith('/') ? p : `${p}/`
  return INTENT_PATHS.includes(path)
}

/** The attribution keys first touch keeps (all of rti_attr's, plus landing page and referrer). */
export const FIRST_TOUCH_KEYS = [
  'landing_page', 'referrer', 'captured_at', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'campaign_id', 'adgroup_id', 'keyword', 'matchtype', 'device',
] as const

/** Keeps the known keys, as short strings. Anything else a browser sends is dropped. */
export function cleanAttribution(raw: unknown): Attribution {
  const out: Attribution = {}
  if (!raw || typeof raw !== 'object') return out
  for (const k of FIRST_TOUCH_KEYS) {
    const v = (raw as Record<string, unknown>)[k]
    if (typeof v === 'string' && v.trim()) out[k] = v.trim().slice(0, k === 'landing_page' || k === 'referrer' ? 500 : 200)
  }
  return out
}
