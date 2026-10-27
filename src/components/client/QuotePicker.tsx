'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { KIT_STORE } from '@/lib/nav'
import { QUOTE_HREF, path } from '@/lib/urls'

/**
 * "Who is this for?" — the choice every Get a Quote button now asks first
 * (28 Oct 2026). Figma BVtf2AOuUOcYbiMIlcKmbC: 7461:19125 (desktop, the modal
 * is 7461:19632) and 7465:9971 (phone, a bottom sheet, 7465:10236).
 *
 *   Home / Household       → Shop Recycling Kits, the EZ on the Earth kit
 *                            store in a new tab (KIT_STORE, the site's usual
 *                            "buy a kit" link with its utm tags). The frame
 *                            links mailin.recycletechnologies.com; Aaqib asked
 *                            for EZ on the Earth instead.
 *   Business / Commercial  → Get a Quote: on to the link that was clicked
 *                            (/quote/, with any ?service= it carried), where
 *                            the form shows the Business / Commercial chip.
 *
 * HOW IT HOOKS IN. Nothing else on the site had to change: one click
 * listener on the document (capture phase) catches any link whose path is
 * /quote/ and opens the picker instead of following it. The link is still a
 * real link, so without JavaScript, or with a modifier key (new tab), it goes
 * straight to the form as before. The Business button itself carries
 * data-quote-direct so it is let through. The form's "Change" link opens the
 * picker by firing OPEN_EVENT.
 *
 * WHY A CLIENT COMPONENT (CLAUDE.md rule 7): it owns open/closed state, the
 * click listener and the dialog's keyboard handling.
 *
 * At lg the modal takes the page's --canvas-zoom, like the cookie panel, so it
 * is drawn at the board's size and scales with the page.
 */
export const OPEN_EVENT = 'rti:quote-picker'

const QUOTE_PATH = path('/quote/')

export function QuotePicker() {
  const [open, setOpen] = useState(false)
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
      if (url.origin !== window.location.origin || url.pathname !== QUOTE_PATH) return
      e.preventDefault()
      e.stopPropagation()
      opener.current = a
      setTarget(url.pathname + url.search + url.hash)
      setOpen(true)
    }
    const onOpen = () => {
      opener.current = document.activeElement as HTMLElement | null
      setTarget(QUOTE_HREF)
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
    const el = dialog.current
    el?.querySelector<HTMLElement>('[data-first]')?.focus()
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

  const onBusiness = () => {
    setOpen(false)
    // Already on the form: no page load, so say who it is for and scroll to it.
    const url = new URL(target, window.location.href)
    if (url.pathname === window.location.pathname) {
      window.history.replaceState(null, '', url.pathname + url.search + url.hash)
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.location.assign(target)
    }
  }

  const CARD = 'flex w-full flex-col items-start gap-[16px] rounded-[18px] bg-white px-[22px] py-[24px] lg:min-w-px lg:flex-1 lg:self-stretch lg:px-[32px] lg:py-[36px]'
  const BTN = 'btn-pop mt-auto flex w-full items-center justify-center gap-[10px] rounded-[10px] px-[24px] py-[14px] font-sans text-[15.5px] font-semibold leading-[1.3]'
  const ICON = 'grid size-[64px] shrink-0 place-items-center rounded-[32px] bg-[#eaf4f5]'
  const H = 'font-sans text-[21px] font-semibold leading-[1.25] text-[#132119] lg:text-[26px]'
  const P = 'font-sans text-[15px] leading-[1.55] text-[#474747] lg:text-[16.5px]'

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-[rgba(11,31,58,0.6)] lg:items-center" onClick={(e) => { if (e.target === e.currentTarget) close() }}>
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-picker-title"
        className="flex max-h-[92vh] w-full flex-col items-center gap-[18px] overflow-y-auto rounded-t-[22px] bg-white px-[20px] pb-[28px] pt-[14px] shadow-[0px_24px_30px_rgba(0,26,51,0.28)] lg:max-h-[calc(92vh/var(--canvas-zoom,1))] lg:w-[1000px] lg:gap-[28px] lg:rounded-[22px] lg:px-[48px] lg:pb-[48px] lg:pt-[44px] lg:[zoom:var(--canvas-zoom,1)]"
      >
        <span aria-hidden="true" className="h-[4px] w-[40px] shrink-0 rounded-[2px] bg-[#cdd2d0] lg:hidden" />
        <div className="flex w-full items-center">
          {/* Centred on the board: an empty box the close button's size on the left. */}
          <span aria-hidden="true" className="hidden size-[40px] shrink-0 lg:block" />
          <h2 id="quote-picker-title" className="min-w-px flex-1 font-sans text-[24px] font-semibold leading-[1.25] text-[#132119] lg:text-center lg:text-[34px]">Who is this for?</h2>
          <button type="button" aria-label="Close" onClick={close} className="grid size-[40px] shrink-0 place-items-center rounded-[20px] bg-[#f4f9f6] hover:bg-[#e8f1ec]">
            <Image src="/images/quote/close.svg" alt="" width={18} height={18} unoptimized className="size-[18px]" />
          </button>
        </div>
        <div className="flex w-full flex-col gap-[14px] lg:flex-row lg:items-stretch lg:gap-[24px]">
          <div className={`${CARD} border border-[#dce2e0]`}>
            <span className={ICON}><Image src="/images/quote/home.svg" alt="" width={30} height={30} unoptimized className="size-[30px]" /></span>
            <h3 className={H}>Home / Household</h3>
            <p className={P}>Recycling a few items from home? Order a mail in recycling kit.</p>
            <a data-first href={KIT_STORE} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
              className={`${BTN} border border-brand text-brand hover:bg-[#eaf4f5]`}>
              Shop Recycling Kits
              <Image src="/images/quote/arrow-teal.svg" alt="" width={16} height={16} unoptimized className="size-[16px]" />
            </a>
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
