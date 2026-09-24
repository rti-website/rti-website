'use client'

import Image from 'next/image'
import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'

/**
 * The "message sent" pop-up — Asim, 24 Sep 2026: "when someone fills the form
 * show the success message pop up". Until then a sent form only printed one
 * line of small teal text under the button, easy to miss once the form had
 * cleared itself.
 *
 * Used by ContactForm (every contact form on the site) and PickupForm (ITAD).
 * The one-line status under each button stays: it is the aria-live
 * announcement, and it is still there after the pop-up is closed.
 *
 * WHY A NATIVE <dialog> WITH showModal(): the browser supplies what a modal
 * has to have, and hand-rolled ones usually miss: focus moves into it and is
 * held there, Escape closes it, the page behind is inert, and it paints in the
 * top layer above every section and the sticky header, whatever their z-index.
 *
 * WHY A PORTAL TO <body>: the forms sit inside the fixed design canvas, which
 * carries CSS zoom on desktop. A dialog inside it would be scaled with the
 * board; at body level it is the same size on every page and screen.
 *
 * Rendered only while `open`, and `open` only becomes true after a submit in
 * the browser, so `document` always exists by the time the portal is made.
 *
 * The tick is the site's own accept-tick (the What We Accept rows), so there
 * is no second check-mark style anywhere.
 */
export function SuccessDialog({
  open, onClose, title, message,
}: {
  open: boolean
  onClose: () => void
  title: string
  message: string
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const bodyId = useId()

  useEffect(() => {
    const d = ref.current
    if (open && d && !d.open) d.showModal()
  }, [open])

  if (!open) return null

  return createPortal(
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={bodyId}
      // Escape fires `close`; so does the button below via onClose -> unmount.
      onClose={onClose}
      // A click on the dialog element itself is a click on the backdrop: the
      // card inside fills the dialog, so its own clicks target the card.
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      className="m-auto w-[calc(100%-40px)] max-w-[440px] rounded-[16px] border-0 bg-white p-0 shadow-[0_24px_60px_rgba(12,34,48,0.25)] backdrop:bg-[#0c2230]/55"
    >
      <div className="flex flex-col items-center gap-[14px] px-[24px] pb-[28px] pt-[32px] text-center lg:px-[36px] lg:pb-[32px] lg:pt-[40px]">
        <span className="grid size-[68px] place-items-center rounded-full bg-brand-soft" aria-hidden="true">
          <Image src="/images/icons/accept-tick.png" alt="" width={90} height={83} className="h-[33px] w-[36px] object-contain" />
        </span>
        <h2 id={titleId} className="font-sans text-[22px] font-semibold leading-[1.25] text-heading lg:text-[26px]">
          {title}
        </h2>
        <p id={bodyId} className="font-roboto text-[15px] leading-[1.55] text-muted lg:text-[16px]">
          {message}
        </p>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="btn-pop mt-[8px] inline-flex h-[46px] min-w-[140px] items-center justify-center rounded-[8px] border border-brand bg-brand px-[28px] font-roboto text-[15px] font-medium text-white"
        >
          Close
        </button>
      </div>
    </dialog>,
    document.body,
  )
}
