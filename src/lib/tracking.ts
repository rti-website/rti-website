import 'server-only'
import { cache as perRequest } from 'react'
import { q } from '@/lib/db'
import { SITE } from '@/lib/site'

/**
 * Tracking — one place for all of it, 23 Sep 2026.
 *
 * Asim passed on the SEO specialist's brief ("add these things … in the way
 * it is mentioned"). What it asks for, and where each piece lives:
 *
 *   GTM, GA4, Google Ads IDs     Admin -> Settings -> Analytics & Tracking,
 *                                stored in settings.tracking (db/006)
 *   GTM on every public page     trackingBootstrap() below, emitted ONCE by
 *                                src/app/layout.tsx — never in page content
 *   UTM + click ID capture       the same bootstrap, into the rti_attr cookie
 *   Page context in dataLayer    page_view_custom, from the <meta name="rti:…">
 *                                tags buildMetadata() writes (src/lib/seo.ts)
 *   Per-post switches            posts.tracking_disabled / analytics_excluded /
 *                                custom_datalayer / custom_tracking_id, set in
 *                                the post editor's SEO & Tracking block
 *   Lead attribution             /api/leads reads the rti_attr cookie and
 *                                writes lead_attribution (db/006)
 *   generate_lead + Ads          trackLead() in src/components/client/track.ts
 *                                after a successful submission
 *
 * WHERE IT LOADS. GTM (or gtag.js) loads only on a production build of the
 * live site: NODE_ENV production, DEPLOY_ENV production and indexing on. The
 * dev server (staging, noindex) and `npm run dev` on a laptop never send
 * traffic into the real GA4 property — unless "Also load on the dev server"
 * is ticked in the admin, for testing in GTM Preview. Attribution capture
 * runs everywhere, because it is our own first-party data, not a tag.
 */

export const ATTRIBUTION_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid',
  'campaign_id', 'adgroup_id', 'keyword', 'matchtype', 'device',
] as const
export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number]

/** The cookie: first party, 90 days, path=/, SameSite=Lax (the lead spec's terms). */
export const ATTR_COOKIE = 'rti_attr'
export const ATTR_MAX_AGE = 90 * 24 * 60 * 60

export type TrackingSettings = {
  gtmEnabled: boolean
  gtmId: string
  ga4Id: string
  adsConversionId: string
  adsConversionLabel: string
  loadOnStaging: boolean
}

export const TRACKING_DEFAULTS: TrackingSettings = {
  gtmEnabled: true,
  gtmId: 'GTM-WXH55D9',
  ga4Id: '',
  adsConversionId: '',
  adsConversionLabel: '',
  loadOnStaging: false,
}

/** Format checks, shared by the admin route and the reader. Empty is allowed. */
export const TRACKING_FORMATS = {
  gtmId: /^GTM-[A-Z0-9]{4,12}$/,
  ga4Id: /^G-[A-Z0-9]{4,15}$/,
  adsConversionId: /^AW-\d{6,15}$/,
  adsConversionLabel: /^[A-Za-z0-9_-]{4,40}$/,
} as const

export function cleanTracking(raw: unknown): TrackingSettings {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
  const s = (k: keyof typeof TRACKING_FORMATS) => {
    const v = typeof r[k] === 'string' ? (r[k] as string).trim() : ''
    const up = k === 'adsConversionLabel' ? v : v.toUpperCase()
    return TRACKING_FORMATS[k].test(up) ? up : ''
  }
  return {
    gtmEnabled: r.gtmEnabled !== false,
    gtmId: s('gtmId'),
    ga4Id: s('ga4Id'),
    adsConversionId: s('adsConversionId'),
    adsConversionLabel: s('adsConversionLabel'),
    loadOnStaging: r.loadOnStaging === true,
  }
}

/*
 * A build renders ~430 pages and each reads this, so during the build each
 * worker reads it once. After the build a page is only re-rendered when the
 * admin revalidates it, and it must then see what was just saved — a
 * process-wide copy would hand it the old IDs (the same trap posts-db.ts fell
 * into). So at run time it is read per request, shared by that request's
 * layout and page through React's cache().
 */
const BUILD = process.env.NEXT_PHASE === 'phase-production-build'
let kept: Promise<TrackingSettings> | null = null

const readSettings = perRequest(async (): Promise<TrackingSettings> => {
  try {
    const rows = await q<{ value: unknown }>(`SELECT value FROM settings WHERE key = 'tracking'`)
    if (rows[0]) return cleanTracking(rows[0].value)
  } catch {
    // No database (a clone, a CI build): the defaults, which are the live
    // site's own container.
  }
  return TRACKING_DEFAULTS
})

export function trackingSettings(): Promise<TrackingSettings> {
  return BUILD ? (kept ??= readSettings()) : readSettings()
}

/** What the page actually loads, after the environment rules above. */
export type TrackingRuntime = {
  /** Load GTM. */
  gtm: string | null
  /** Load gtag.js directly — only when GTM is off but GA4/Ads IDs are set. */
  gtag: boolean
  ga4Id: string
  adsId: string
  adsLabel: string
}

export async function trackingRuntime(): Promise<TrackingRuntime> {
  const t = await trackingSettings()
  const live = process.env.NODE_ENV === 'production'
    && (process.env.DEPLOY_ENV ?? 'production') === 'production'
    && !SITE.noindex
  const allowed = live || (t.loadOnStaging && process.env.NODE_ENV === 'production')
  const gtm = allowed && t.gtmEnabled && t.gtmId ? t.gtmId : null
  return {
    gtm,
    gtag: allowed && !gtm && Boolean(t.ga4Id || t.adsConversionId),
    ga4Id: t.ga4Id,
    adsId: t.adsConversionId,
    adsLabel: t.adsConversionLabel,
  }
}

/**
 * The one inline script in <head>. Plain ES2017, no framework, ~2 KB.
 *
 *  1. dataLayer exists before anything else runs.
 *  2. Attribution: any campaign parameter on this URL replaces the cookie
 *     (latest click wins). With none, a first visit still records its
 *     landing page and outside referrer, so a direct or organic lead is not
 *     blank; a later campaign click overwrites it.
 *  3. The IDs go into dataLayer as rti_ga4_id / rti_ads_conversion_id /
 *     rti_ads_conversion_label, so GTM tags read them from the CMS rather
 *     than having them typed into GTM twice. rti_ads_conversion_number is the
 *     ID without "AW-", which is the form GTM's Google Ads conversion tag
 *     asks for.
 *  4. Once the document is parsed (the page's <meta name="rti:…"> tags are
 *     then all present): page_view_custom, then GTM, unless this page has
 *     tracking switched off.
 *
 * window.__rtiPageView is exposed so the client component can repeat step 4's
 * page view on in-app navigations, which do not re-run this script.
 */
export function trackingBootstrap(rt: TrackingRuntime): string {
  const C = JSON.stringify({
    gtm: rt.gtm, gtag: rt.gtag, ga4: rt.ga4Id, ads: rt.adsId, label: rt.adsLabel,
    keys: ATTRIBUTION_KEYS, cookie: ATTR_COOKIE, maxAge: ATTR_MAX_AGE,
  }).replace(/</g, '\\u003c')
  return `(function(){var C=${C},w=window,d=document;w.dataLayer=w.dataLayer||[];w.__rtiTracking=C;
try{var p=new URLSearchParams(location.search),hit={},any=false;C.keys.forEach(function(k){var v=p.get(k);if(v){hit[k]=v.slice(0,200);any=true}});
var m=d.cookie.match(new RegExp('(?:^|;\\\\s*)'+C.cookie+'=([^;]*)')),cur=null;if(m){try{cur=JSON.parse(decodeURIComponent(m[1]))}catch(e){}}
if(any||!cur){var a=any?hit:{};a.landing_page=(location.origin+location.pathname+location.search).slice(0,500);var r=d.referrer;
if(r){try{if(new URL(r).host!==location.host)a.referrer=r.slice(0,500)}catch(e){}}a.captured_at=new Date().toISOString();
d.cookie=C.cookie+'='+encodeURIComponent(JSON.stringify(a))+';max-age='+C.maxAge+';path=/;SameSite=Lax'+(location.protocol==='https:'?';Secure':'');cur=a}
w.__rtiAttr=cur}catch(e){}
w.dataLayer.push({rti_ga4_id:C.ga4,rti_ads_conversion_id:C.ads,rti_ads_conversion_number:(C.ads||'').replace(/^AW-/,''),rti_ads_conversion_label:C.label});
function meta(n){var e=d.querySelector('meta[name="'+n+'"]');return e?e.getAttribute('content'):null}
w.__rtiPageView=function(){var ev={event:'page_view_custom',page_type:meta('rti:page-type')||'page',page_name:meta('rti:page-name')||d.title,
page_category:meta('rti:page-category')||'',page_url:location.href,analytics_excluded:meta('rti:analytics')==='exclude',tracking_disabled:meta('rti:tracking')==='off'};
var id=meta('rti:tracking-id');if(id)ev.custom_tracking_id=id;var x=meta('rti:datalayer');if(x){try{var o=JSON.parse(x);for(var k in o)if(!(k in ev))ev[k]=o[k]}catch(e){}}
w.dataLayer.push(ev)};
function start(){w.__rtiPageView();if(meta('rti:tracking')==='off')return;
if(C.gtm){w.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});var j=d.createElement('script');j.async=true;
j.src='https://www.googletagmanager.com/gtm.js?id='+encodeURIComponent(C.gtm);d.head.appendChild(j)}
else if(C.gtag){w.gtag=function(){w.dataLayer.push(arguments)};var g=d.createElement('script');g.async=true;
g.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(C.ga4||C.ads);d.head.appendChild(g);w.gtag('js',new Date());
if(C.ga4)w.gtag('config',C.ga4);if(C.ads)w.gtag('config',C.ads)}}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',start);else start()})();`
}

/**
 * The attribution cookie, read on the server. /api/leads calls this with the
 * request's Cookie header: the browser sends rti_attr with the form post, so
 * a lead submitted days later, on another page, still carries the click that
 * brought the visitor — and it works for a form posted before hydration too.
 * Only known keys, every value capped: it is visitor-controlled input.
 */
export type Attribution = Partial<Record<AttributionKey | 'landing_page' | 'referrer' | 'captured_at', string>>

export function readAttribution(cookieHeader: string | null): Attribution | null {
  if (!cookieHeader) return null
  const m = cookieHeader.match(new RegExp(`(?:^|;\\s*)${ATTR_COOKIE}=([^;]*)`))
  if (!m?.[1]) return null
  let raw: unknown
  try { raw = JSON.parse(decodeURIComponent(m[1])) } catch { return null }
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  const out: Attribution = {}
  for (const k of [...ATTRIBUTION_KEYS, 'landing_page', 'referrer', 'captured_at'] as const) {
    const v = r[k]
    if (typeof v === 'string' && v.trim()) out[k] = v.trim().slice(0, k === 'landing_page' || k === 'referrer' ? 500 : 200)
  }
  return Object.keys(out).length ? out : null
}
