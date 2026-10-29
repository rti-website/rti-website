'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { path as sitePath } from '@/lib/urls'

/**
 * VISITOR IDENTIFICATION, the browser half (docs/visitor-identification/
 * BRIEF.md section 3). Sends one small POST to /api/e/ per page.
 *
 * Client only because it has to watch the route and the consent choice
 * (CLAUDE.md rule 7). It renders nothing, runs after hydration, and adds no
 * dependency.
 *
 * CONSENT FIRST. Nothing is sent, and the server sets no cookie, until the
 * cookie banner reports Analytics consent (window.rtiConsent, the rti:consent
 * event; src/lib/tracking.ts). Before that, the first touch values (landing
 * page, referrer, gclid, utm_…) are held by the banner's own bootstrap in
 * sessionStorage (rti_attr_held) and exposed as window.__rtiAttr; this reads
 * the same record, so rti_attr and the visitor's first touch can never
 * disagree. Accepting on page 2 sends page 2 with the first touch from page 1.
 * Declining or withdrawing sends { t: 'forget' }, which deletes rti_vid
 * (HttpOnly, so only the server can). Global Privacy Control counts as a
 * decline (the banner sets analytics false), and the server checks Sec-GPC too.
 *
 * Never on /admin, in a draft preview (the layout leaves it out), or on a page
 * with <meta name="rti:tracking" content="off">. What it sends: path (no query
 * string), title, the referrer of the loaded page, the campaign parameters on
 * the URL, the held attribution, and seconds on the previous page. No
 * fingerprinting, no form contents, no scroll or click recording.
 */

type Consent = { analytics?: boolean; decided?: boolean }
type W = Window & { rtiConsent?: Consent; __rtiAttr?: Record<string, string>; __rtiTracking?: { keys?: string[] } }

const ENDPOINT = sitePath('/api/e/')

function consented(): boolean {
  return (window as W).rtiConsent?.analytics === true
}

function trackingOff(): boolean {
  return document.querySelector('meta[name="rti:tracking"]')?.getAttribute('content') === 'off'
}

function send(body: Record<string, unknown>, beacon = false) {
  const data = JSON.stringify(body)
  try {
    if (beacon && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([data], { type: 'application/json' }))
      return
    }
    void fetch(ENDPOINT, { method: 'POST', headers: { 'content-type': 'application/json' }, body: data, keepalive: true, credentials: 'same-origin' })
      .catch(() => { /* never matters to the visitor */ })
  } catch { /* ditto */ }
}

/** Campaign parameters on this URL, by the bootstrap's own key list. */
function campaignParams(): Record<string, string> {
  const keys = (window as W).__rtiTracking?.keys ?? []
  const p = new URLSearchParams(window.location.search)
  const out: Record<string, string> = {}
  for (const k of keys) { const v = p.get(k); if (v) out[k] = v.slice(0, 200) }
  return out
}

export function VisitorTracker() {
  const pathname = usePathname()
  const search = useSearchParams()
  /** The page last sent, and when, for "seconds on the previous page". */
  const last = useRef<{ key: string; at: number } | null>(null)

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) return
    const key = `${pathname}?${search?.toString() ?? ''}`
    const go = () => {
      if (!consented() || trackingOff()) return
      if (last.current?.key === key) return
      const now = Date.now()
      const sec = last.current ? Math.round((now - last.current.at) / 1000) : undefined
      send({
        t: 'pv', path: pathname, title: document.title.slice(0, 300), ref: document.referrer || undefined,
        qs: campaignParams(), attr: (window as W).__rtiAttr ?? undefined, sec,
      })
      last.current = { key, at: now }
    }
    // After Next has swapped in the new page's <title> and <meta> tags.
    const t = window.setTimeout(go, 80)
    return () => window.clearTimeout(t)
  }, [pathname, search])

  useEffect(() => {
    const onConsent = (e: Event) => {
      const d = (e as CustomEvent<Consent>).detail
      if (d?.analytics) {
        if (trackingOff() || window.location.pathname.startsWith('/admin')) return
        last.current = null
        send({
          t: 'pv', path: window.location.pathname, title: document.title.slice(0, 300), ref: document.referrer || undefined,
          qs: campaignParams(), attr: (window as W).__rtiAttr ?? undefined,
        })
        last.current = { key: `${window.location.pathname}?${window.location.search.replace(/^\?/, '')}`, at: Date.now() }
      } else {
        last.current = null
        send({ t: 'forget' })
      }
    }
    const onHide = () => {
      if (document.visibilityState !== 'hidden' || !last.current || !consented()) return
      send({ t: 'leave', sec: Math.round((Date.now() - last.current.at) / 1000) }, true)
    }
    window.addEventListener('rti:consent', onConsent)
    document.addEventListener('visibilitychange', onHide)
    return () => {
      window.removeEventListener('rti:consent', onConsent)
      document.removeEventListener('visibilitychange', onHide)
    }
  }, [])

  return null
}
