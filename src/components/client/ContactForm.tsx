'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FORM } from '@/data/contact'
import { path } from '@/lib/urls'

/**
 * Contact form — Figma 6370:758, redrawn in 6365:1082.
 *
 * Column gap 24 down to the Fields group, which is gap 20; each field is a
 * label (IBM Plex Sans Medium 14) over a 48px input (white, 1px #e2e2e2, r8,
 * px16). Placeholders are Poppins 14, self-hosted — see globals.css. Selects
 * carry a 16px chevron at the right edge (Figma "Frame", 16 square).
 *
 * Rows, top to bottom, exactly as the frame stacks them:
 *   name / email · phone / company · address · city / state / zip ·
 *   what to recycle / who for · message · button
 * See the FORM note in src/data/contact.ts for the pair the frame repeats.
 *
 * Client only because it owns a submit handler.
 */
const INPUT = 'h-[48px] w-full rounded-[8px] border border-field bg-white px-[16px] font-poppins text-[14px] text-ink outline-none transition-colors placeholder:text-muted focus-visible:border-brand'
const LABEL = 'font-sans text-[14px] font-medium leading-none text-label'
const ROW = 'flex w-full items-start gap-[20px]'

type State = 'idle' | 'sending' | 'sent' | 'error'

export function ContactForm() {
  const [state, setState] = useState<State>('idle')
  const [error, setError] = useState<string | null>(null)

  /**
   * Posts to /api/leads, which saves the enquiry and emails whoever
   * LEAD_NOTIFY_TO names. Until 21 Sep 2026 this handler called
   * preventDefault() and stopped — every submission on the site was silently
   * dropped.
   *
   * The fields are read off the form rather than held in state: there are
   * eleven of them, none of them needs to re-render anything as it is typed,
   * and controlled inputs here would be eleven useState calls that exist only
   * to be read once on submit.
   */
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (state === 'sending') return
    setState('sending')
    setError(null)

    /* Hold the element, do not reach for e.currentTarget after an await.
       React nulls currentTarget once the handler returns synchronously, so
       `e.currentTarget.reset()` below the fetch throws — and because it throws
       inside the try, it surfaces as "could not reach the server" on a
       submission that in fact arrived, was saved and was emailed. Caught doing
       exactly that on 21 Sep 2026. */
    const form = e.currentTarget
    const data = new FormData(form)
    const value = (k: string) => String(data.get(k) ?? '')

    try {
      // path(), not a hand-written string (CLAUDE.md rule 3): trailingSlash is
      // on, so "/api/leads" answers with a 308 to "/api/leads/" and every
      // submission would pay for a redirect before it even starts.
      const res = await fetch(path('/api/leads/'), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name: value('name'),
          email: value('email'),
          phone: value('phone'),
          company: value('company'),
          address: value('address'),
          city: value('city'),
          state: value('state'),
          zip: value('zip'),
          item: value('item'),
          audience: value('audience'),
          message: value('message'),
          website: value('website'),
          sourcePage: window.location.pathname,
        }),
      })
      const out = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setError(out.error ?? 'Something went wrong. Please try again.')
        setState('error')
        return
      }
      form.reset()
      setState('sent')
    } catch {
      setError('Could not reach the server. Please check your connection and try again.')
      setState('error')
    }
  }

  return (
    <form className="flex w-full flex-col gap-[20px]" onSubmit={submit}>
      {/* Honeypot. Hidden from sight AND from screen readers, and out of the
          tab order, so no person is ever offered it — only a bot that fills
          every input it finds. See the check in /api/leads. */}
      <div aria-hidden="true" className="absolute size-px overflow-hidden opacity-0">
        <label htmlFor="contact-website">Leave this empty</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={ROW}>
        <Field id="contact-name" f={FORM.fields.name} type="text" autoComplete="name" />
        <Field id="contact-email" f={FORM.fields.email} type="email" autoComplete="email" required />
      </div>

      <div className={ROW}>
        <Field id="contact-phone" f={FORM.fields.phone} type="tel" autoComplete="tel" />
        <Field id="contact-company" f={FORM.fields.company} type="text" autoComplete="organization" />
      </div>

      <div className={ROW}>
        <Field id="contact-address" f={FORM.fields.address} type="text" autoComplete="street-address" />
      </div>

      <div className={ROW}>
        <Field id="contact-city" f={FORM.fields.city} type="text" autoComplete="address-level2" />
        <Field id="contact-state" f={FORM.fields.state} type="text" autoComplete="address-level1" />
        <Field id="contact-zip" f={FORM.fields.zip} type="text" inputMode="numeric" autoComplete="postal-code" />
      </div>

      <div className={ROW}>
        <Select id="contact-item" f={FORM.fields.item} options={FORM.items} />
        <Select id="contact-audience" f={FORM.fields.audience} options={FORM.audiences} />
      </div>

      <div className="flex w-full flex-col gap-[8px]">
        <label htmlFor="contact-message" className={LABEL}>{FORM.fields.message.label}</label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder={FORM.fields.message.placeholder}
          className="h-[110px] w-full resize-none rounded-[8px] border border-field bg-white px-[16px] pt-[14px] font-poppins text-[14px] leading-[22px] text-ink outline-none transition-colors placeholder:text-muted focus-visible:border-brand"
        />
      </div>

      <div className="flex w-full flex-col gap-[12px]">
        <button
          type="submit"
          disabled={state === 'sending'}
          className="inline-flex h-[48.05px] w-fit items-center gap-[8.008px] rounded-[8px] border border-brand bg-brand px-[28.029px] font-roboto text-[15.016px] font-medium leading-[22.523px] tracking-[-0.0801px] text-white transition-opacity disabled:opacity-60"
        >
          {state === 'sending' ? 'Sending…' : FORM.submit}
          <Image src="/images/icons/arrow-white.svg" alt="" width={18} height={14} className="h-[14.252px] w-[18.213px]" />
        </button>

        {/* aria-live so the result is announced, not just drawn. A sighted user
            sees the line appear; without this a screen reader user submits the
            form and is told nothing at all. */}
        <p aria-live="polite" className="min-h-[22px] font-roboto text-[14px] leading-[22px]">
          {state === 'sent' && (
            <span className="text-brand">
              Thanks — your message is with us. We usually reply within one business day.
            </span>
          )}
          {state === 'error' && error && <span className="text-[#b3261e]">{error}</span>}
        </p>
      </div>
    </form>
  )
}

/**
 * The `name` the field posts under is the id minus its "contact-" prefix, so
 * the two can never drift apart — an id renamed without its name is a field
 * that silently stops arriving in the enquiry.
 */
const fieldName = (id: string) => id.replace(/^contact-/, '')

function Field({
  id, f, type, autoComplete, inputMode, required,
}: {
  id: string
  f: { label: string; placeholder: string }
  type: string
  autoComplete?: string
  inputMode?: 'numeric'
  required?: boolean
}) {
  return (
    <div className="flex min-w-px flex-1 flex-col gap-[8px]">
      <label htmlFor={id} className={LABEL}>{f.label}</label>
      <input id={id} name={fieldName(id)} type={type} inputMode={inputMode} autoComplete={autoComplete} required={required} placeholder={f.placeholder} className={INPUT} />
    </div>
  )
}

function Select({
  id, f, options,
}: {
  id: string
  f: { label: string; placeholder: string }
  options: readonly string[]
}) {
  return (
    <div className="flex min-w-px flex-1 flex-col gap-[8px]">
      <label htmlFor={id} className={LABEL}>{f.label}</label>
      <div className="relative">
        <select id={id} name={fieldName(id)} defaultValue="" className={`${INPUT} appearance-none pr-[44px] text-muted`}>
          <option value="" disabled>{f.placeholder}</option>
          {options.map((o) => <option key={o} value={o} className="text-ink">{o}</option>)}
        </select>
        <Image
          src="/images/icons/chevron-16.svg"
          alt=""
          width={16}
          height={16}
          className="pointer-events-none absolute right-[16px] top-1/2 size-[16px] -translate-y-1/2"
        />
      </div>
    </div>
  )
}
