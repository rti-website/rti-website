'use client'

import Image from 'next/image'
import { useState } from 'react'
import { PICKUP } from '@/data/itad'
import { path } from '@/lib/urls'

/**
 * "Book a Pickup Today" — the ITAD page's form, Figma 6780:2712 (desktop) and
 * 6783:8650 (phone).
 *
 * WHY THIS IS A CLIENT COMPONENT (CLAUDE.md rule 7): it owns a submit handler
 * and a sent/error state, like ContactForm. It is its own component rather
 * than ContactForm with props because the two frames ask for different
 * fields — first and last name, "how did you hear about us?" — and a form
 * that grows a mode per page is how a field ends up posted from one and
 * silently dropped from the other.
 *
 * Posts to /api/leads as a `quote` (the leads table's type for "give me an
 * estimate"). First and last name are joined into the one `name` column;
 * the address, the Residential/Business answer and the referral source ride
 * in `details`, which is what that column is for. Same honeypot as the
 * contact form.
 *
 * DESKTOP: a 900px card, p40, gap 20; fields two-up on a 20px gap, each a
 * 14px label over a 46px input; the textarea is 100 tall; Submit is a 200px
 * button centred under the fields.
 * PHONE: one field per row in a 350px card at px24 / py28, gap 16; 13px
 * labels over 44px inputs; a 90px textarea; Submit full width.
 */
const INPUT = 'h-[44px] w-full rounded-[8px] border border-field bg-white px-[14px] font-poppins text-[13px] text-ink outline-none transition-colors placeholder:text-muted focus-visible:border-brand lg:h-[46px] lg:px-[16px] lg:text-[14px]'
const LABEL = 'font-sans text-[13px] font-medium leading-[1.3] text-label lg:text-[14px]'
const ROW = 'flex w-full flex-col gap-[16px] lg:flex-row lg:items-start lg:gap-[20px]'
const FIELD = 'flex w-full min-w-px flex-col gap-[6px] lg:flex-1 lg:gap-[8px]'

type State = 'idle' | 'sending' | 'sent' | 'error'
const F = PICKUP.fields

export function PickupForm() {
  const [state, setState] = useState<State>('idle')
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (state === 'sending') return
    setState('sending')
    setError(null)
    // Held before the await — see the note in ContactForm about currentTarget.
    const form = e.currentTarget
    const data = new FormData(form)
    const value = (k: string) => String(data.get(k) ?? '').trim()
    const name = [value('firstName'), value('lastName')].filter(Boolean).join(' ')

    try {
      const res = await fetch(path('/api/leads/'), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'quote',
          name,
          email: value('email'),
          phone: value('phone'),
          company: value('company'),
          address: value('address'),
          audience: value('audience'),
          referral: value('heard'),
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
    <form
      onSubmit={submit}
      className="relative flex w-full flex-col items-start gap-[16px] rounded-[16px] border border-line bg-white px-[24px] py-[28px] lg:w-[900px] lg:items-center lg:gap-[20px] lg:p-[40px]"
    >
      {/* Honeypot — see /api/leads. Out of sight, out of the tab order. */}
      <div aria-hidden="true" className="absolute size-px overflow-hidden opacity-0">
        <label htmlFor="pickup-website">Leave this empty</label>
        <input id="pickup-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={ROW}>
        <Field id="firstName" f={F.firstName} autoComplete="given-name" />
        <Field id="lastName" f={F.lastName} autoComplete="family-name" />
      </div>
      <div className={ROW}>
        <Field id="company" f={F.company} autoComplete="organization" />
        <Field id="email" f={F.email} type="email" autoComplete="email" required />
      </div>
      <div className={ROW}>
        <Field id="phone" f={F.phone} type="tel" autoComplete="tel" />
        <Field id="address" f={F.address} autoComplete="street-address" />
      </div>
      <div className={ROW}>
        <Select id="heard" f={F.heard} options={PICKUP.heard} />
        <Select id="audience" f={F.audience} options={PICKUP.audiences} />
      </div>

      <div className="flex w-full flex-col gap-[6px] lg:gap-[8px]">
        <label htmlFor="pickup-message" className={LABEL}>{F.message.label}</label>
        <textarea
          id="pickup-message"
          name="message"
          rows={3}
          placeholder={F.message.placeholder}
          className="h-[90px] w-full resize-none rounded-[8px] border border-field bg-white px-[14px] pt-[12px] font-poppins text-[13px] leading-[20px] text-ink outline-none transition-colors placeholder:text-muted focus-visible:border-brand lg:h-[100px] lg:px-[16px] lg:pt-[14px] lg:text-[14px] lg:leading-[22px]"
        />
      </div>

      <button
        type="submit"
        disabled={state === 'sending'}
        className="inline-flex h-[46px] w-full items-center justify-center gap-[8.008px] rounded-[8px] border border-brand bg-brand px-[28.029px] font-roboto text-[15.016px] font-medium leading-[22.523px] tracking-[-0.0801px] text-white transition-opacity disabled:opacity-60 lg:h-[48px] lg:w-[200px]"
      >
        {state === 'sending' ? 'Sending…' : PICKUP.submit}
        <Image src="/images/icons/arrow-white.svg" alt="" width={18} height={14} className="h-[14.252px] w-[18.213px]" />
      </button>

      {/* Announced as well as drawn. Empty until there is something to say, so
          it takes no room in the card the frame measures. */}
      <p aria-live="polite" className="w-full text-center font-roboto text-[14px] leading-[22px] empty:hidden">
        {state === 'sent' && <span className="text-brand">{PICKUP.sent}</span>}
        {state === 'error' && error && <span className="text-[#b3261e]">{error}</span>}
      </p>
    </form>
  )
}

function Field({
  id, f, type = 'text', autoComplete, required,
}: {
  id: string
  f: { label: string; placeholder: string }
  type?: string
  autoComplete?: string
  required?: boolean
}) {
  return (
    <div className={FIELD}>
      <label htmlFor={`pickup-${id}`} className={LABEL}>{f.label}</label>
      <input id={`pickup-${id}`} name={id} type={type} autoComplete={autoComplete} required={required} placeholder={f.placeholder} className={INPUT} />
    </div>
  )
}

function Select({ id, f, options }: { id: string; f: { label: string; placeholder: string }; options: readonly string[] }) {
  return (
    <div className={FIELD}>
      <label htmlFor={`pickup-${id}`} className={LABEL}>{f.label}</label>
      <div className="relative">
        <select id={`pickup-${id}`} name={id} defaultValue="" className={`${INPUT} appearance-none pr-[40px] text-muted`}>
          <option value="" disabled>{f.placeholder}</option>
          {options.map((o) => <option key={o} value={o} className="text-ink">{o}</option>)}
        </select>
        {/* The same 16px chevron ContactForm's selects carry (Figma 6780:2744,
            14px on the phone). */}
        <Image
          src="/images/icons/chevron-16.svg"
          alt=""
          width={16}
          height={16}
          className="pointer-events-none absolute right-[14px] top-1/2 size-[14px] -translate-y-1/2 lg:right-[16px] lg:size-[16px]"
        />
      </div>
    </div>
  )
}
