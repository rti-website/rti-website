'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { KIT_STORE } from '@/lib/nav'
import { PICKUP_HREF, QUOTE_HREF, path } from '@/lib/urls'

/**
 * "Who is this for?" — the choice every Get a Quote button now asks first
 * (28 Oct 2026). Figma BVtf2AOuUOcYbiMIlcKmbC: 7461:19125 (desktop, the modal
 * is 7461:19632) and 7465:9971 (phone, a bottom sheet, 7465:10236).
 *
 *   Home / Household       → See Home Options: a second step, "Recycling
 *                            from home?" (7506:10307, 29 Oct 2026). Pickup is
 *                            business only, so it offers Drop off nearby
 *                            (/dropoff/) and Ship it to us: Order a mail-in
 *                            kit, the EZ on the Earth kit store in a new tab
 *                            (KIT_STORE, the site's usual "buy a kit" link
 *                            with its utm tags; the frame links
 *                            mailin.recycletechnologies.com, Aaqib asked for
 *                            EZ on the Earth). Back returns to the choice,
 *                            and "Get a quote" under it goes on as Business.
 *   Business / Commercial  → Get a Quote: on to the link that was clicked
 *                            (/quote/, with any ?service= it carried), where
 *                            the form shows the Business / Commercial chip.
 *
 * HOW IT HOOKS IN. Nothing else on the site had to change: one click
 * listener on the document (capture phase) catches any link whose path is
 * /quote/ or /contact-us/ and opens the picker instead of following it. The link is still a
 * real link, so without JavaScript, or with a modifier key (new tab), it goes
 * straight to the form as before. The Business button itself carries
 * data-quote-direct so it is let through. The form's "Change" link opens
 * the picker by firing OPEN_EVENT. Under the two cards, "Existing Customer?
 * Schedule a Pickup" links to the pickup form (7505:20291).
 *
 * WHY A CLIENT COMPONENT (CLAUDE.md rule 7): it owns open/closed state, the
 * click listener and the dialog's keyboard handling.
 *
 * At lg the modal takes the page's --canvas-zoom, like the cookie panel, so it
 * is drawn at the board's size and scales with the page.
 */
export const OPEN_EVENT = 'rti:quote-picker'

/** Links that open the picker first: Get a Quote, and since 29 Oct 2026
 *  Contact Us too (Aaqib). Business then goes on to the link clicked. */
const PICKER_PATHS = [path('/quote/'), path('/contact-us/')]

export function QuotePicker() {
  const [open, setOpen] = useState(false)
  /** Which screen: the choice, or the Home / Household options. */
  const [step, setStep] = useState<'pick' | 'home'>('pick')
  const [target, setTarget] = useState(QUOTE_HREF)
  const dialog = useRef<HTMLDivElement>(null)
  const opener = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (window.location.pathname.startsWith('/admin')) return
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element | null)?.closest?.('a[href]')
      if (!(a instanceof HTMLAnchorElement) || a.hasAttribute('data-quote-direct') || a.target === '_blank') return
      let url: URL
      try { url = new URL(a.href, window.location.href) } catch { return }
      if (url.origin !== window.location.origin || !PICKER_PATHS.includes(url.pathname)) return
      e.preventDefault()
      e.stopPropagation()
      opener.current = a
      setTarget(url.pathname + url.search + url.hash)
      setStep('pick')
      setOpen(true)
    }
    const onOpen = () => {
      opener.current = document.activeElement as HTMLElement | null
      setTarget(QUOTE_HREF)
      setStep('pick')
      setOpen(true)
    }
    document.addEventListener('click', onClick, true)
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => { document.removeEventListener('click', onClick, true); window.removeEventListener(OPEN_EVENT, onOpen) }
  }, [])

  const close = useCallback(() => { setOpen(false); opener.current?.focus?.() }, [])

  // Escape closes; focus starts on the first card's button and stays inside.
  useEffect(() => {
    if (!open) return
    dialog.current?.querySelector<HTMLElement>('[data-first]')?.focus()
  }, [open, step])

  useEffect(() => {
    if (!open) return
    const el = dialog.current
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { close(); return }
      if (e.key !== 'Tab' || !el) return
      const f = [...el.querySelectorAll<HTMLElement>('button, a[href]')]
      if (!f.length) return
      const first = f[0]!, last = f[f.length - 1]!
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = overflow }
  }, [open, close])

  if (!open) return null

  const onBusiness = (dest: string = target) => {
    setOpen(false)
    // Already on the form: no page load, so say who it is for and scroll to it.
    const url = new URL(dest, window.location.href)
    if (url.pathname === window.location.pathname) {
      window.history.replaceState(null, '', url.pathname + url.search + url.hash)
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.location.assign(dest)
    }
  }

  const CARD = 'flex w-full flex-col items-start gap-[16px] rounded-[18px] bg-white px-[22px] py-[24px] lg:min-w-px lg:flex-1 lg:self-stretch lg:px-[32px] lg:py-[36px]'
  const BTN = 'btn-pop mt-auto flex w-full items-center justify-center gap-[10px] rounded-[10px] px-[24px] py-[14px] font-sans text-[15.5px] font-semibold leading-[1.3]'
  const ICON = 'grid size-[64px] shrink-0 place-items-center rounded-[32px] bg-[#eaf4f5]'
  const H = 'font-sans text-[21px] font-semibold leading-[1.25] text-[#132119] lg:text-[26px]'
  const P = 'font-sans text-[15px] leading-[1.55] text-[#474747] lg:text-[16.5px]'
  const CLOSE = (
    <button type="button" aria-label="Close" onClick={close} className="grid size-[40px] shrink-0 place-items-center rounded-[20px] bg-[#f4f9f6] hover:bg-[#e8f1ec]">
      <Image src="/images/quote/close.svg" alt="" width={18} height={18} unoptimized className="size-[18px]" />
    </button>
  )
  /* "Recycling from home?" (7506:10307): 760 wide, pt36 px44 pb40, gap20;
     two option cards r16, px24 py26, gap8, 18 apart. */
  const OPT = 'flex w-full flex-col items-start gap-[8px] rounded-[16px] border border-[#dce2e0] bg-white px-[22px] py-[22px] lg:min-w-px lg:flex-1 lg:self-stretch lg:px-[24px] lg:py-[26px]'
  const OPT_BTN = 'btn-pop mt-auto flex w-full items-center justify-center gap-[10px] rounded-[10px] px-[20px] py-[14px] font-sans text-[15px] font-semibold leading-[1.3]'

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-[rgba(11,31,58,0.6)] lg:items-center" onClick={(e) => { if (e.target === e.currentTarget) close() }}>
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-picker-title"
        className={`flex max-h-[92vh] w-full flex-col items-center overflow-y-auto rounded-t-[22px] bg-white px-[20px] pb-[28px] pt-[14px] shadow-[0px_24px_30px_rgba(0,26,51,0.28)] lg:max-h-[calc(92vh/var(--canvas-zoom,1))] lg:rounded-[22px] lg:[zoom:var(--canvas-zoom,1)] ${step === 'pick'
          ? 'gap-[18px] lg:w-[1000px] lg:gap-[28px] lg:px-[48px] lg:pb-[48px] lg:pt-[44px]'
          : 'gap-[16px] lg:w-[760px] lg:gap-[20px] lg:px-[44px] lg:pb-[40px] lg:pt-[36px]'}`}
      >
        <span aria-hidden="true" className="h-[4px] w-[40px] shrink-0 rounded-[2px] bg-[#cdd2d0] lg:hidden" />

        {step === 'pick' ? (
          <>
            <div className="flex w-full items-center">
              {/* Centred on the board: an empty box the close button's size on the left. */}
              <span aria-hidden="true" className="hidden size-[40px] shrink-0 lg:block" />
              <h2 id="quote-picker-title" className="min-w-px flex-1 font-sans text-[24px] font-semibold leading-[1.25] text-[#132119] lg:text-center lg:text-[34px]">Who is this for?</h2>
              {CLOSE}
            </div>
            <div className="flex w-full flex-col gap-[14px] lg:flex-row lg:items-stretch lg:gap-[24px]">
              <div className={`${CARD} border border-[#dce2e0]`}>
                <span className={ICON}><Image src="/images/quote/home.svg" alt="" width={30} height={30} unoptimized className="size-[30px]" /></span>
                <h3 className={H}>Home / Household</h3>
                <p className={P}>A few items from home? Drop off or use a mail-in kit.</p>
                <button data-first type="button" onClick={() => setStep('home')}
                  className={`${BTN} border border-brand text-brand hover:bg-[#eaf4f5]`}>
                  See Home Options
                  <Image src="/images/quote/arrow-teal.svg" alt="" width={16} height={16} unoptimized className="size-[16px]" />
                </button>
              </div>
              <div className={`${CARD} border-2 border-brand`}>
                <span className={ICON}><Image src="/images/quote/building.svg" alt="" width={30} height={30} unoptimized className="size-[30px]" /></span>
                <h3 className={H}>Business / Commercial</h3>
                <p className={P}>Pickups and recycling for businesses, schools and organizations.</p>
                <a data-quote-direct href={target} onClick={(e) => { e.preventDefault(); onBusiness() }}
                  className={`${BTN} bg-brand text-white hover:bg-[#04717a]`}>
                  Get a Quote
                  <Image src="/images/quote/arrow-white.svg" alt="" width={16} height={16} unoptimized className="size-[16px]" />
                </a>
              </div>
            </div>
            <p className="flex flex-wrap items-center justify-center gap-[8px] text-center">
              <span className="font-sans text-[15px] leading-[1.55] text-[#474747] lg:text-[16.5px]">Existing Customer?</span>
              <a href={PICKUP_HREF} onClick={() => setOpen(false)} className="font-sans text-[15px] font-medium leading-[normal] text-brand underline underline-offset-2 hover:text-[#04717a]">Schedule a Pickup</a>
            </p>
          </>
        ) : (
          <>
            <div className="flex w-full items-center gap-[12px]">
              <button type="button" onClick={() => setStep('pick')} className="flex items-center gap-[6px] font-sans text-[14px] font-medium leading-[1.3] text-brand hover:underline">
                <Image src="/images/quote/back.svg" alt="" width={16} height={16} unoptimized className="size-[16px]" />
                Back
              </button>
              <span className="min-w-px flex-1" />
              {CLOSE}
            </div>
            <h2 id="quote-picker-title" className="w-full text-center font-sans text-[26px] font-semibold leading-[1.2] text-[#132119] lg:text-[36px]">Recycling from home?</h2>
            <div className="flex w-full items-start gap-[12px] rounded-[14px] border border-[#dce2e0] bg-[#f4f9f6] px-[16px] py-[14px] lg:px-[18px] lg:py-[16px]">
              <Image src="/images/quote/info.svg" alt="" width={20} height={20} unoptimized className="mt-[2px] size-[20px] shrink-0" />
              <p className="min-w-px flex-1 font-sans text-[15px] font-medium leading-[1.5] text-[#132119] lg:text-[16px]">Pickup is for businesses only. Drop off at one of our facilities, or ship your items with a mail-in kit.</p>
            </div>
            <div className="flex w-full flex-col gap-[14px] lg:flex-row lg:items-stretch lg:gap-[18px]">
              <div className={OPT}>
                <Image src="/images/quote/pin.svg" alt="" width={22} height={22} unoptimized className="size-[22px]" />
                <h3 className="font-sans text-[20px] font-semibold leading-[1.28] text-[#132119]">Drop off nearby</h3>
                <p className="font-sans text-[14.5px] leading-[1.5] text-[#474747]">See hours and addresses</p>
                <a data-first href={path('/dropoff/')} onClick={() => setOpen(false)} className={`${OPT_BTN} border border-brand text-brand hover:bg-[#eaf4f5]`}>
                  Find a drop-off location
                  <Image src="/images/landing/arrow-right-teal.svg" alt="" width={16} height={16} unoptimized className="size-[16px]" />
                </a>
              </div>
              <div className={OPT}>
                <Image src="/images/quote/box.svg" alt="" width={22} height={22} unoptimized className="size-[22px]" />
                <h3 className="font-sans text-[20px] font-semibold leading-[1.28] text-[#132119]">Ship it to us</h3>
                <p className="font-sans text-[14.5px] leading-[1.5] text-[#474747]">Prepaid kit, any US address</p>
                <a href={KIT_STORE} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className={`${OPT_BTN} bg-brand text-white hover:bg-[#04717a]`}>
                  Order a mail-in kit
                  <Image src="/images/landing/arrow-right-white.svg" alt="" width={16} height={16} unoptimized className="size-[16px]" />
                </a>
              </div>
            </div>
            <p className="w-full text-center font-sans text-[14.5px] leading-[1.4] text-[#7e7e7e]">
              Need a pickup for a business?{' '}
              <a data-quote-direct href={QUOTE_HREF} onClick={(e) => { e.preventDefault(); onBusiness(QUOTE_HREF) }} className="font-semibold text-brand underline underline-offset-2 hover:text-[#04717a]">Get a quote</a>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

/** The form's "Change" link: reopens the picker (Figma 7465:9290). */
export function QuoteChangeButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Change
    </button>
  )
}
