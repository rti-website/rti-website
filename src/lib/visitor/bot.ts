/**
 * Bot and device detection from the User-Agent string only (no fingerprinting:
 * docs/visitor-identification/BRIEF.md section 4). Pure, see ip.ts.
 */

/** Crawlers, monitors, preview fetchers, headless browsers and HTTP libraries. */
const BOT = new RegExp([
  'bot\\b', 'bot/', 'bot;', 'spider', 'crawl', 'slurp', 'mediapartners', 'adsbot', 'googleother', 'google-inspectiontool',
  'google-read-aloud', 'feedfetcher', 'apis-google', 'bingpreview', 'ahrefs', 'semrush', 'mj12', 'dotbot', 'petalbot',
  'yandex', 'baiduspider', 'duckduckbot', 'sogou', 'exabot', 'facebookexternalhit', 'facebot', 'meta-externalagent',
  'twitterbot', 'linkedinbot', 'slackbot', 'discordbot', 'telegrambot', 'whatsapp', 'skypeuripreview', 'pinterestbot',
  'applebot', 'amazonbot', 'bytespider', 'gptbot', 'chatgpt-user', 'oai-searchbot', 'claudebot', 'claude-web',
  'anthropic', 'perplexity', 'ccbot', 'cohere', 'diffbot', 'screaming frog', 'sitebulb', 'lighthouse', 'pagespeed',
  'gtmetrix', 'pingdom', 'uptimerobot', 'statuscake', 'site24x7', 'newrelic', 'datadog', 'headlesschrome', 'phantomjs',
  'puppeteer', 'playwright', 'selenium', 'python-requests', 'python-urllib', 'aiohttp', 'httpx', 'curl/', 'wget/',
  'go-http-client', 'okhttp', 'java/', 'libwww', 'axios/', 'node-fetch', 'undici', 'postmanruntime', 'insomnia',
  'scrapy', 'httpclient', 'monitor', 'preview', 'validator', 'checker', 'archive.org_bot', 'ia_archiver',
].join('|'), 'i')

/** True for a crawler, a script, or a request with no User-Agent at all. */
export function isBotUserAgent(ua: string | null | undefined): boolean {
  if (!ua || ua.length < 12) return true
  return BOT.test(ua)
}

export type DeviceType = 'desktop' | 'mobile' | 'tablet'

export function deviceType(ua: string | null | undefined): DeviceType {
  const s = ua ?? ''
  if (/iPad|Tablet|PlayBook|Silk|Kindle|(Android(?!.*Mobile))/i.test(s)) return 'tablet'
  if (/Mobi|iPhone|iPod|Android|Windows Phone|IEMobile|Opera Mini/i.test(s)) return 'mobile'
  return 'desktop'
}

/** The brief's flood rule: more page views than this in WINDOW is a bot, and is not stored. */
export const FLOOD_LIMIT = 60
export const FLOOD_WINDOW_MINUTES = 10
