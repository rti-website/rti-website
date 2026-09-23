'use client'

import Image from 'next/image'
import { useState } from 'react'
import { path } from '@/lib/urls'

/**
 * Newsletter signup — Figma 6059:21192, mobile 6620:2375..2382.
 * Order per the design: input, then the checkbox carrying the long consent
 * line, then the "Yes, Please" button.
 *
 * The phone frame draws the consent line ABOVE the input, so below lg the form
 * is a flex column and the three controls are re-ordered with `order-*`. The
 * DOM order is unchanged — one markup, re-flowed, not a second copy.
 *
 * NOTE(design): that frame also drops the consent CHECKBOX and leaves the line
 * as plain text. Kept as a checkbox here: it is a required consent control, and
 * a form that asks for consent on a desktop and not on a phone is a functional
 * difference rather than a layout one. Flagged for Asim/Aqeel.
 *
 * ===========================================================================
 * IT POSTS NOW — Asim, 22 Sep 2026: "the -> button and yes please buttons is
 * not working"
 * ===========================================================================
 * Both buttons are `type="submit"` and always were, so both always ran this
 * handler; the handler called preventDefault() and stopped. It posts to
 * /api/subscribe, which writes the row the admin's Subscribers screen has been
 * reading since day one. See the note at the top of that route.
 *
 * TWO BUTTONS, ONE FORM, and that is the design — the arrow inside the field
 * and "Yes, Please" below it do the same thing. Nothing distinguishes them, so
 * nothing here tries to.
 */
type State = 'idle' | 'sending' | 'sent' | 'error'

export function NewsletterForm() {
  const [state, setState] = useState<State>('idle')
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (state === 'sending') return
    const form = e.currentTarget
    const data = new FormData(form)

    setState('sending')
    setError(null)
    try {
      const res = await fetch(path('/api/subscribe/'), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: data.get('email'),
          source: 'footer',
          sourcePage: location.pathname,
          // Honeypot; see the route.
          website: data.get('website'),
        }),
      })
      const body = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setError(body.error ?? 'Something went wrong. Please try again.')
        setState('error')
        return
      }
      form.reset()
      setState('sent')
    } catch {
      setError('Could not reach the server. Please try again.')
      setState('error')
    }
  }

  /*
   * The thank-you REPLACES the form rather than sitting under it. The footer
   * column is a fixed-height box on the board, so a message added below would
   * push the consent line and the button out of the footer.
   */
  if (state === 'sent') {
    return (
      <p role="status" className="font-roboto text-[15px] leading-[22px] text-brand lg:text-[14px]">
        Thanks — you are on the list. We will only send the occasional update.
      </p>
    )
  }

  return (
    /* method + action: a submit before hydration posts here instead of
       GETting the address into the URL (RTI-10, src/lib/form-post.ts). */
    <form method="post" action={path('/api/subscribe/')} className="flex w-full flex-col gap-[16px] lg:block" onSubmit={submit}>
      <input type="hidden" name="source" value="footer" />
      {/* Honeypot. Hidden from people, irresistible to bots — see /api/leads.
          Same recipe as ContactForm's, and NOT `left:-9999px`: an element
          parked off-canvas still has text rects at -9999, and
          check-overlaps.mjs unions every text rect in the footer — so the
          footer's "text box" grew to cover the whole page above it and the
          checker reported the FAQ and CTA printing through the footer. A 1px
          clipped invisible box keeps the glyphs where the form is. */}
      <div aria-hidden="true" className="absolute size-px overflow-hidden opacity-0">
        <label htmlFor="newsletter-website">Leave this empty</label>
        <input id="newsletter-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* 6620:2375 — full width and 48 tall on the phone; 285x46 on the board
          since the footer frame of 23 Sep 2026 (6778:3900), which narrowed it
          from 329 to sit under the 296px intro above it. */}
      <div className="relative order-2 h-[48px] w-full rounded-[4px] bg-white ring-1 ring-line lg:order-none lg:h-[46px] lg:w-[285px]">
        <Image src="/images/icons/foot-mail.png" alt="" width={25} height={18} className="absolute left-[15px] top-1/2 h-[18px] w-[25px] -translate-y-1/2" />
        <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="Email Address"
          className="size-full rounded-[4px] bg-transparent pl-[53px] pr-[56px] font-roboto text-[15px] text-ink outline-none placeholder:text-muted lg:font-poppins lg:text-[14px]"
        />
        {/* 46 wide and a pixel proud of the box top and bottom, so it is 49 on
            the phone's 48px input and 47 on the board's 46 — over the 44px
            minimum either way. */}
        <button
          type="submit"
          disabled={state === 'sending'}
          aria-label="Subscribe"
          className="btn-pop absolute right-[-1px] top-[-1px] grid h-[49px] w-[46px] place-items-center rounded-r-[4px] bg-brand text-white disabled:opacity-60 lg:h-[47px]"
        >
          &rarr;
        </button>
      </div>

      {/* 6620:2374 — 14/20.7 on the phone, and on the board too since
          6778:3899: the checkbox at y386, the 260px line 7px after it. */}
      <label className="order-1 flex items-start gap-[10px] font-roboto text-[14px] leading-[20.7px] text-muted lg:order-none lg:mt-[21px] lg:max-w-[284px] lg:gap-[7px]">
        <input type="checkbox" required className="mt-[2px] size-[17px] shrink-0 rounded-[4px] border border-line bg-white" />
        Send the latest news or something new crops up to my mail box directly.
      </label>

      {error && (
        <p role="alert" className="order-4 font-roboto text-[13px] leading-[19px] text-[#b42318] lg:mt-[10px]">
          {error}
        </p>
      )}

      {/* 6620:2382 — full width and centred on the phone. */}
      <button
        type="submit"
        disabled={state === 'sending'}
        className="btn-pop order-3 inline-flex h-[48.05px] w-full items-center justify-center gap-[8.008px] rounded-[8px] border border-brand px-[28.029px] font-roboto text-[15.016px] font-medium leading-[22.523px] tracking-[-0.0801px] text-brand disabled:opacity-60 lg:order-none lg:mt-[20.6px] lg:w-auto"
      >
        {state === 'sending' ? 'Signing you up…' : 'Yes, Please'}
        <Image src="/images/icons/arrow-teal.svg" alt="" width={18} height={14} className="h-[14.252px] w-[18.213px] shrink-0" />
      </button>
    </form>
  )
}
