'use client'

import { useEffect } from 'react'

/**
 * SNITCHER (management, 30 Oct 2026: the installation email Snitcher sent on
 * Aaqib's behalf). Snitcher is a paid B2B visitor identification service: its
 * script reports each visit to Snitcher, which names the company behind the
 * IP in Snitcher's own dashboard. It runs beside our own visitor
 * identification (src/lib/visitor/), it does not replace it.
 *
 * WHY A CLIENT COMPONENT (CLAUDE.md rule 7, and why it is not pasted into
 * <head> as the email says): it is third party tracking, so like GTM it may
 * only load after the visitor accepts Analytics cookies in our banner
 * (window.rtiConsent / the rti:consent event, src/lib/tracking.ts). Pasted in
 * <head> it would run before consent. The snippet below is Snitcher's own,
 * unchanged apart from its settings coming from SNITCHER_PROFILE_ID; once it
 * loads, giveCookieConsent() tells it consent was given. Withdrawing consent
 * reloads the page (rtiSetConsent), so it is gone after that.
 *
 * Never in the admin, never in an editor's preview, never with the page's
 * rti:tracking meta off; only when the build has SNITCHER_PROFILE_ID
 * (src/app/layout.tsx).
 */

type Consent = { analytics?: boolean }
type W = Window & { rtiConsent?: Consent; Snitcher?: { giveCookieConsent?: () => void } & unknown[] }

const SNIPPET = (profileId: string) => `!function(e){"use strict";var t=e&&e.namespace;if(t&&e.profileId&&e.cdn){var i=window[t];if(i&&Array.isArray(i)||(i=window[t]=[]),!i.initialized&&!i._loaded)if(i._loaded)console&&console.warn("[Radar] Duplicate initialization attempted");else{i._loaded=!0;["track","page","identify","company","group","alias","ready","debug","on","off","once","trackClick","trackSubmit","trackLink","trackForm","pageview","screen","reset","register","setAnonymousId","addSourceMiddleware","addIntegrationMiddleware","addDestinationMiddleware","giveCookieConsent","denyCookieConsent"].forEach((function(e){var a;i[e]=(a=e,function(){var e=window[t];if(e.initialized)return e[a].apply(e,arguments);var i=[].slice.call(arguments);return i.unshift(a),e.push(i),e})})),-1===e.apiEndpoint.indexOf("http")&&(e.apiEndpoint="https://"+e.apiEndpoint),i.bootstrap=function(){var t,i=document.createElement("script");i.async=!0,i.type="text/javascript",i.id="__radar__",i.setAttribute("data-settings",JSON.stringify(e)),i.src=[-1!==(t=e.cdn).indexOf("http")?"":"https://",t,"/releases/latest/radar.min.js"].join("");var a=document.scripts[0];a.parentNode.insertBefore(i,a)},i.bootstrap()}}else"undefined"!=typeof console&&console.error("[Radar] Configuration incomplete")}(${JSON.stringify({
  apiEndpoint: 'radar.snitcher.com',
  cdn: 'cdn.snitcher.com',
  namespace: 'Snitcher',
  profileId,
})});`

function trackingOff(): boolean {
  return document.querySelector('meta[name="rti:tracking"]')?.getAttribute('content') === 'off'
}

export function SnitcherTag({ profileId }: { profileId: string }) {
  useEffect(() => {
    if (!/^[A-Za-z0-9_-]{4,40}$/.test(profileId)) return
    let done = false
    const load = () => {
      if (done || (window as W).rtiConsent?.analytics !== true) return
      if (trackingOff() || window.location.pathname.startsWith('/admin')) return
      if (document.getElementById('__radar__') || document.getElementById('snitcher-loader')) { done = true; return }
      done = true
      const s = document.createElement('script')
      s.id = 'snitcher-loader'
      s.text = SNIPPET(profileId)
      document.head.appendChild(s)
      try { (window as W).Snitcher?.giveCookieConsent?.() } catch { /* never matters to the visitor */ }
    }
    load()
    const onConsent = (e: Event) => { if ((e as CustomEvent<Consent>).detail?.analytics) load() }
    window.addEventListener('rti:consent', onConsent)
    return () => window.removeEventListener('rti:consent', onConsent)
  }, [profileId])
  return null
}
