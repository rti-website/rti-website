'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { href } from '@/lib/urls'

/**
 * Cookie consent — management, 27 Oct 2026. Figma BVtf2AOuUOcYbiMIlcKmbC:
 * 7401:8934 (banner, desktop), 7401:9062 (preferences, desktop), 7401:9221
 * (banner, phone) and 7401:9279 (preferences, phone).
 *
 * WHY A CLIENT COMPONENT (CLAUDE.md rule 7): it owns open/closed state and
 * button handlers. The consent itself lives in the inline tracking bootstrap
 * (src/lib/tracking.ts): window.rtiConsent, window.rtiSetConsent() and the
 * `rti:consent` event, so tags are gated before React ever runs. This file is
 * only the interface to it.
 *
 * TWO CATEGORIES, NOT THE FRAME'S FOUR. Management asked for Necessary
 * (always on) and Analytics (off until accepted); the frames also draw
 * Functional and Marketing. The site sets no functional or marketing cookies
 * of its own, and a switch that controls nothing is worse than no switch, so
 * those two rows are left out. Everything Google (GTM, GA4, Ads) sits under
 * Analytics.
 *
 * Global Privacy Control: the bootstrap already counts it as declined, so the
 * banner never shows; Cookie settings still opens the panel, with the
 * Analytics switch locked off and a line saying why.
 *
 * At lg the banner and the panel take the page's --canvas-zoom (the 1920
 * board scaled to the window, src/lib/canvas-zoom.ts), so they line up with
 * the 1282 column and the type matches the page around them.
 *
 * The footer's "Cookie settings" link opens the panel by firing
 * OPEN_EVENT on window (CookieSettingsLink below).
 */
export const OPEN_EVENT = 'rti:cookie-settings'

type Consent = { necessary: true; analytics: boolean; decided: boolean; gpc: boolean }
type W = Window & { rtiConsent?: Consent; rtiSetConsent?: (analytics: boolean) => { reload: boolean } }

const POLICY = href('/cookies-and-personal-information/')

const BTN = 'flex items-center justify-center rounded-[10px] px-[20px] py-[13px] font-sans text-[15px] font-semibold leading-[1.3] whitespace-nowrap transition-colors lg:px-[24px]'
const FILLED = `${BTN} bg-brand text-white hover:bg-[#04717a]`
const OUTLINE = `${BTN} border border-brand text-brand hover:bg-[#eaf4f5]`
const GHOST = `${BTN} text-brand hover:bg-[#eaf4f5]`

/** `orgLookup`: visitor identification is on in this build (VISITOR_CAPTURE), so Analytics also covers it. */
export function CookieConsent({ orgLookup = false }: { orgLookup?: boolean }) {
  const [consent, setConsent] = useState<Consent | null>(null)
  const [banner, setBanner] = useState(false)
  const [panel, setPanel] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const dialog = useRef<HTMLDivElement>(null)
  const opener = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // Not in the admin: it is not a public page and loads no tags.
    if (window.location.pathname.startsWith('/admin')) return
    const w = window as W
    const c = w.rtiConsent ?? { necessary: true as const, analytics: false, decided: false, gpc: false }
    setConsent(c)
    setBanner(!c.decided)
    const open = () => {
      opener.current = document.activeElement as HTMLElement | null
      const now = (window as W).rtiConsent ?? c
      setAnalytics(now.analytics)
      setPanel(true)
    }
    window.addEventListener(OPEN_EVENT, open)
    return () => window.removeEventListener(OPEN_EVENT, open)
  }, [])

  const choose = useCallback((value: boolean) => {
    const w = window as W
    const result = w.rtiSetConsent?.(value)
    setConsent(w.rtiConsent ?? null)
    setBanner(false)
    setPanel(false)
    opener.current?.focus?.()
    // Turning Analytics off after Google's tags have loaded: they cannot be
    // unloaded, so the page reloads without them.
    if (result?.reload) window.location.reload()
  }, [])

  // The panel: Escape closes it, focus starts inside it and stays there.
  useEffect(() => {
    if (!panel) return
    const el = dialog.current
    el?.querySelector<HTMLElement>('button')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setPanel(false); opener.current?.focus?.(); return }
      if (e.key !== 'Tab' || !el) return
      const f = [...el.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled])')]
      if (!f.length) return
      const first = f[0]!, last = f[f.length - 1]!
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = overflow }
  }, [panel])

  if (!consent) return null
  const gpc = consent.gpc

  return (
    <>
      {banner && !panel && (
        <section
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-[14px] rounded-t-[22px] bg-white px-[20px] pb-[24px] pt-[12px] shadow-[0px_-8px_32px_0px_rgba(0,26,51,0.2)] lg:flex-row lg:gap-[48px] lg:rounded-none lg:px-[max(20px,calc((100%-1282px)/2))] lg:py-[26px] lg:[zoom:var(--canvas-zoom,1)]"
        >
          <span aria-hidden="true" className="h-[4px] w-[40px] rounded-[2px] bg-[#cdd2d0] lg:hidden" />
          <div className="flex w-full flex-col gap-[14px] lg:min-w-px lg:flex-1 lg:flex-row lg:items-center lg:gap-[16px]">
            <div className="flex items-center gap-[12px] lg:contents">
              <span className="grid size-[44px] shrink-0 place-items-center rounded-full bg-[#eaf4f5] lg:size-[48px]">
                <Image src="/images/cookies/cookie.svg" alt="" width={24} height={24} unoptimized className="size-[24px] lg:size-[26px]" />
              </span>
              <h2 className="font-sans text-[18px] font-semibold leading-[1.25] text-[#132119] lg:hidden">We value your privacy</h2>
            </div>
            <div className="flex flex-col items-center gap-[14px] lg:min-w-px lg:flex-1 lg:items-start lg:gap-[4px]">
              <h2 className="hidden font-sans text-[18px] font-semibold leading-[1.5] text-[#132119] lg:block">We value your privacy</h2>
              <p className="font-sans text-[14px] leading-[1.55] text-[#474747] lg:text-[14.5px] lg:leading-[1.5]">
                We use cookies to keep our site working, understand how it&apos;s used, and improve your experience. You can accept all, reject non-essential cookies, or choose what you&apos;re comfortable with.
              </p>
              <Link href={POLICY} className="font-sans text-[14px] font-medium leading-[1.3] text-brand underline lg:leading-[1.5]">Read our Cookie Policy</Link>
            </div>
          </div>
          <div className="flex w-full flex-col gap-[10px] lg:w-auto lg:shrink-0 lg:flex-row-reverse lg:items-center lg:gap-[12px]">
            <button type="button" className={FILLED} onClick={() => choose(true)}>Accept all</button>
            <button type="button" className={OUTLINE} onClick={() => choose(false)}>Reject non-essential</button>
            <button type="button" className={GHOST} onClick={() => { opener.current = null; setAnalytics(consent.analytics); setPanel(true) }}>Customize</button>
          </div>
        </section>
      )}

      {panel && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-[rgba(11,31,58,0.55)] lg:items-center" onClick={(e) => { if (e.target === e.currentTarget) setPanel(false) }}>
          <div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-prefs-title"
            className="flex max-h-[95vh] w-full flex-col items-center gap-[16px] overflow-y-auto rounded-t-[22px] bg-white px-[20px] pb-[24px] pt-[12px] shadow-[0px_18px_24px_rgba(0,26,51,0.22)] lg:max-h-[calc(90vh/var(--canvas-zoom,1))] lg:w-[720px] lg:[zoom:var(--canvas-zoom,1)] lg:items-start lg:gap-[20px] lg:rounded-[20px] lg:px-[36px] lg:py-[32px]"
          >
            <span aria-hidden="true" className="h-[4px] w-[40px] shrink-0 rounded-[2px] bg-[#cdd2d0] lg:hidden" />
            <div className="flex w-full items-center gap-[12px]">
              <span className="grid size-[44px] shrink-0 place-items-center rounded-full bg-[#eaf4f5]">
                <Image src="/images/cookies/cookie.svg" alt="" width={24} height={24} unoptimized className="size-[24px]" />
              </span>
              <h2 id="cookie-prefs-title" className="min-w-px flex-1 font-sans text-[20px] font-semibold leading-[1.25] text-[#132119] lg:text-[24px]">Cookie preferences</h2>
              <button type="button" aria-label="Close" onClick={() => { setPanel(false); opener.current?.focus?.() }} className="grid size-[36px] shrink-0 place-items-center rounded-full bg-[#f4f9f6] hover:bg-[#e8f1ec]">
                <Image src="/images/cookies/close.svg" alt="" width={18} height={18} unoptimized className="size-[18px]" />
              </button>
            </div>
            <p className="w-full font-sans text-[14px] leading-[1.55] text-[#474747] lg:text-[15px]">
              Choose which cookies you&apos;re happy with. Strictly necessary cookies are always on because the site can&apos;t work without them. You can change your choices at any time.
            </p>
            <div className="flex w-full flex-col rounded-[14px] border border-[#e6e6e6]">
              <div className="flex w-full items-center gap-[16px] border-b border-[#e6e6e6] p-[16px] lg:px-[20px] lg:py-[18px]">
                <div className="flex min-w-px flex-1 flex-col gap-[4px]">
                  <h3 className="font-sans text-[15px] font-semibold leading-[1.3] text-[#132119] lg:text-[16px]">Strictly necessary</h3>
                  <p className="font-sans text-[13.5px] leading-[1.5] text-[#474747] lg:text-[14px]">Required for the site to work, such as security, forms, and remembering your cookie choices.</p>
                </div>
                <span className="flex shrink-0 items-center gap-[6px]">
                  <Image src="/images/cookies/lock.svg" alt="" width={14} height={14} unoptimized className="size-[14px]" />
                  <span className="font-sans text-[13px] font-medium leading-[1.3] text-brand whitespace-nowrap">Always on</span>
                </span>
              </div>
              <div className="flex w-full items-center gap-[16px] p-[16px] lg:px-[20px] lg:py-[18px]">
                <div className="flex min-w-px flex-1 flex-col gap-[4px]">
                  <h3 id="cookie-analytics-label" className="font-sans text-[15px] font-semibold leading-[1.3] text-[#132119] lg:text-[16px]">Analytics</h3>
                  <p id="cookie-analytics-desc" className="font-sans text-[13.5px] leading-[1.5] text-[#474747] lg:text-[14px]">
                    Helps us understand how visitors use the site so we can improve it{orgLookup ? <>, including which organization&apos;s network a visit comes from</> : null}.
                    {gpc && <span className="mt-[4px] block text-[#7e7e7e]">Off because your browser sends a Global Privacy Control signal.</span>}
                  </p>
                </div>
                <Switch on={analytics && !gpc} disabled={gpc} onChange={setAnalytics} />
              </div>
            </div>
            <div className="flex w-full flex-col gap-[10px] lg:flex-row-reverse lg:justify-start">
              <button type="button" className={FILLED} onClick={() => choose(analytics)}>Save preferences</button>
              <button type="button" className={OUTLINE} onClick={() => choose(true)} disabled={gpc}>Accept all</button>
              <button type="button" className={OUTLINE} onClick={() => choose(false)}>Reject all</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/** The frame's 44x24 toggle: #cdd2d0 off, teal on, a white 18px knob. */
function Switch({ on, disabled, onChange }: { on: boolean; disabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-labelledby="cookie-analytics-label"
      aria-describedby="cookie-analytics-desc"
      disabled={disabled}
      onClick={() => onChange(!on)}
      className={`relative h-[24px] w-[44px] shrink-0 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${on ? 'bg-brand' : 'bg-[#cdd2d0]'}`}
    >
      <span aria-hidden="true" className={`absolute top-[3px] size-[18px] rounded-full bg-white transition-[left] ${on ? 'left-[23px]' : 'left-[3px]'}`} />
    </button>
  )
}

/** The footer's "Cookie settings": opens the panel above from anywhere. */
export function CookieSettingsLink({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      {children}
    </button>
  )
}
