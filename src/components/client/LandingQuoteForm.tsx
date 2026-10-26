'use client'

import Image from 'next/image'
import { useState } from 'react'
import { path } from '@/lib/urls'
import { trackLead } from '@/components/client/track'
import { SuccessDialog } from '@/components/client/SuccessDialog'

/**
 * "Request a Quote" — the short form in the hero of the Google Ads landing
 * pages (Figma 7374:15821 board, phone in 7374:16419; 27 Oct 2026).
 *
 * WHY A CLIENT COMPONENT (CLAUDE.md rule 7): it owns a submit handler and a
 * sending / sent / error state, like PickupForm.
 *
 * Four fields only: full name, work email, phone, and what they want to
 * recycle (the message). Posts to /api/leads as a Get a Quote enquiry
 * (`form: 'quote'`), audience Commercial: the pages are business ads and ask
 * for a work email, so the lead routes like every business enquiry (Christine,
 * Usman in CC). The page it was sent from rides along as sourcePage, and the
 * ad click comes from the rti_attr cookie as on every form. Same honeypot,
 * same success pop-up, same lead_form_submit event (with user_data for
 * enhanced conversions) as the other forms. Without JavaScript it still posts
 * (RTI-10, src/lib/form-post.ts).
 */
const INPUT = 'w-full rounded-[8px] border border-[#e6e6e6] bg-[#fafafa] px-[16px] py-[14px] font-sans text-[15px] leading-[1.4] text-ink outline-none transition-colors placeholder:text-[#7e7e7e] focus-visible:border-brand focus-visible:bg-white'

type State = 'idle' | 'sending' | 'sent' | 'error'

export function LandingQuoteForm({ service }: { service: string }) {
  const [state, setState] = useState<State>('idle')
  const [error, setError] = useState<string | null>(null)
  const [popup, setPopup] = useState<{ name: string } | null>(null)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (state === 'sending') return
    const form = e.currentTarget
    const data = new FormData(form)
    const value = (k: string) => String(data.get(k) ?? '').trim()
    setState('sending')
    setError(null)
    try {
      const res = await fetch(path('/api/leads/'), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          form: 'quote',
          audience: 'Commercial',
          name: value('name'),
          email: value('email'),
          phone: value('phone'),
          message: value('message'),
          item: service,
          website: value('website'),
          sourcePage: window.location.pathname,
          submitPage: window.location.href,
        }),
      })
      const out = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setError(out.error ?? 'We could not send that just now. Please call us instead.')
        setState('error')
        return
      }
      trackLead({ type: 'contact', formId: 'landing_quote_form', service, audience: 'Commercial', email: value('email'), phone: value('phone') })
      const first = value('name').split(/\s+/)[0] ?? ''
      form.reset()
      setState('sent')
      setPopup({ name: first })
    } catch {
      setError('We could not send that just now. Please check your connection or call us.')
      setState('error')
    }
  }

  return (
    <form
      id="landing-quote"
      method="post"
      action={path('/api/leads/')}
      onSubmit={submit}
      className="relative flex w-full scroll-mt-[120px] flex-col gap-[14px] rounded-[16px] bg-white px-[22px] py-[24px] shadow-[0px_16px_20px_rgba(0,26,51,0.18)] lg:w-[500px] lg:shrink-0 lg:p-[32px]"
    >
      <input type="hidden" name="type" value="contact" />
      <input type="hidden" name="form" value="quote" />
      <input type="hidden" name="audience" value="Commercial" />
      <input type="hidden" name="item" value={service} />
      <div aria-hidden="true" className="absolute size-px overflow-hidden opacity-0">
        <label htmlFor="lq-website">Leave this empty</label>
        <input id="lq-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <h2 className="font-sans text-[20px] font-semibold leading-[1.25] text-[#132119] lg:text-[24px]">Request a Quote</h2>
      <label htmlFor="lq-name" className="sr-only">Full name</label>
      <input id="lq-name" name="name" type="text" autoComplete="name" required placeholder="Full name" className={INPUT} />
      <label htmlFor="lq-email" className="sr-only">Work email</label>
      <input id="lq-email" name="email" type="email" autoComplete="email" required placeholder="Work email" className={INPUT} />
      <label htmlFor="lq-phone" className="sr-only">Phone number</label>
      <input id="lq-phone" name="phone" type="tel" autoComplete="tel" placeholder="Phone number" className={INPUT} />
      <label htmlFor="lq-message" className="sr-only">What would you like to recycle?</label>
      <textarea id="lq-message" name="message" rows={3} placeholder="What would you like to recycle?" className={`${INPUT} h-[99px] resize-none`} />

      <button
        type="submit"
        disabled={state === 'sending'}
        className="btn-pop flex w-full items-center justify-center gap-[10px] rounded-[8px] bg-brand px-[26px] py-[14px] font-sans text-[15px] font-semibold leading-[1.3] text-white transition-opacity disabled:opacity-60"
      >
        {state === 'sending' ? 'Sending…' : 'Submit Request'}
        <Image src="/images/landing/arrow-right-white.svg" alt="" width={16} height={16} className="size-[16px]" />
      </button>

      <p aria-live="polite" className="text-center font-sans text-[14px] leading-[1.4] empty:hidden">
        {state === 'error' && error && <span className="text-[#b3261e]">{error}</span>}
      </p>

      <SuccessDialog
        open={popup !== null}
        onClose={() => setPopup(null)}
        title={popup?.name ? `Thank you, ${popup.name}!` : 'Thank you!'}
        message="We received your request. Our team will get back to you shortly with the right recycling option."
      />
    </form>
  )
}
