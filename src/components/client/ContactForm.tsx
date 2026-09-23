'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FORM, SERVICE_INTEREST } from '@/data/contact'
import { path } from '@/lib/urls'
import { usPhoneDigits } from '@/lib/phone'
import { CONNECT_EMAIL_KEY } from '@/components/client/ConnectForm'

/**
 * Contact form — Figma 6370:758 / 6365:1082 for the look, and since 23 Sep
 * 2026 the lead-form spec for the fields (see FORM in src/data/contact.ts):
 *
 *   first / last · email / phone · company · address · city / state / zip ·
 *   what to recycle / is it for · message · consent · button
 *
 * Address, city, state and "Is it for?" came back from the frame on
 * 23 Sep 2026 (Asim), and "Service Interest" took the frame's label, "What
 * would you like to recycle?". No "(optional)" markers on any label.
 *
 * Each field keeps the frame's look: a 14px IBM Plex Sans Medium label over a
 * 48px input (white, 1px #e2e2e2, r8, px16), Poppins placeholders, a 16px
 * chevron on the select. Pairs sit side by side at lg and stack on a phone.
 *
 * VALIDATION, IN THE BROWSER — the same rules /api/leads enforces, so most
 * mistakes are caught before a round trip: names 2 to 60 characters, a real
 * email, a US phone number (10 digits, or 11 starting with 1, in any
 * punctuation), a 5-digit zip if one is given, a 2000-character message cap
 * with a counter, and the consent box. The server repeats every check and is
 * the one that decides; a field it rejects gets focus and its message.
 *
 * THE SERVICE ARRIVES FROM THE HERO. The homepage's "Pick Your Service" posts
 * `?service=<name>` here (Asim, 23 Sep 2026: "when someone selects the service
 * it must automatically come to [the] contact form"); the effect below picks
 * it out of the URL and selects it.
 *
 * Client only because it owns a submit handler and that state.
 */
const INPUT = 'h-[48px] w-full rounded-[8px] border border-field bg-white px-[16px] font-poppins text-[14px] text-ink outline-none transition-colors placeholder:text-muted focus-visible:border-brand aria-[invalid=true]:border-[#b3261e]'
const LABEL = 'font-sans text-[14px] font-medium leading-none text-label'
/** A pair of fields: one under the other on a phone, side by side at lg. */
const ROW = 'flex w-full flex-col gap-[16px] lg:flex-row lg:items-start lg:gap-[20px]'
const FIELD = 'flex w-full min-w-px flex-col gap-[8px] lg:flex-1'

type State = 'idle' | 'sending' | 'sent' | 'error'
type FieldName = 'firstName' | 'lastName' | 'email' | 'phone' | 'company' | 'address' | 'city' | 'state' | 'zip' | 'service' | 'audience' | 'message' | 'consent'

/** The first rule a filled-in form breaks, or null. Mirrors /api/leads. */
function check(v: (k: FieldName) => string, consent: boolean): { field: FieldName; message: string } | null {
  const first = v('firstName'), last = v('lastName')
  if (first.length < 2 || first.length > 60) return { field: 'firstName', message: 'Please enter your first name (2 to 60 characters).' }
  if (last.length < 2 || last.length > 60) return { field: 'lastName', message: 'Please enter your last name (2 to 60 characters).' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email'))) return { field: 'email', message: 'Please check the email address.' }
  if (!usPhoneDigits(v('phone'))) return { field: 'phone', message: 'Please enter a US phone number, e.g. (763) 559-5130.' }
  if (v('zip') && !/^\d{5}$/.test(v('zip'))) return { field: 'zip', message: 'Zip code should be 5 digits.' }
  if (v('message').length > FORM.messageMax) return { field: 'message', message: `Please keep the message under ${FORM.messageMax} characters.` }
  if (!consent) return { field: 'consent', message: 'Please tick the box so we can contact you.' }
  return null
}

export function ContactForm() {
  const [state, setState] = useState<State>('idle')
  const [error, setError] = useState<string | null>(null)
  const [bad, setBad] = useState<FieldName | null>(null)
  const [count, setCount] = useState(0)

  /**
   * Two things arrive from other pages, both written to the DOM in an effect
   * (the form is uncontrolled and prerendered, so filling them during render
   * would not match the server's HTML):
   *   - an email typed into the "Don't See Your Item?" band (sessionStorage),
   *     read once and removed;
   *   - a service picked in the homepage hero (`?service=` in the URL).
   */
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(CONNECT_EMAIL_KEY)
      if (saved) {
        sessionStorage.removeItem(CONNECT_EMAIL_KEY)
        const field = document.getElementById('contact-email')
        if (field instanceof HTMLInputElement && field.value === '') field.value = saved
      }
    } catch { /* storage blocked — nothing to carry over */ }

    const wanted = new URLSearchParams(window.location.search).get('service')?.trim().toLowerCase()
    if (wanted) {
      const match = SERVICE_INTEREST.find((o) => o.toLowerCase() === wanted)
      const select = document.getElementById('contact-service')
      if (match && select instanceof HTMLSelectElement) select.value = match
    }
  }, [])

  function focusField(f: FieldName) {
    setBad(f)
    document.getElementById(`contact-${f}`)?.focus()
  }

  /**
   * Posts to /api/leads, which validates, saves the enquiry and emails
   * whoever LEAD_NOTIFY_TO names. Fields are read off the form rather than
   * held in state — none of them needs to re-render anything as it is typed.
   */
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (state === 'sending') return

    /* Hold the element, do not reach for e.currentTarget after an await —
       React nulls it once the handler returns (caught 21 Sep 2026). */
    const form = e.currentTarget
    const data = new FormData(form)
    const value = (k: string) => String(data.get(k) ?? '').trim()
    const consent = data.get('consent') === 'yes'

    const problem = check((k) => value(k), consent)
    if (problem) {
      setError(problem.message)
      setState('error')
      focusField(problem.field)
      return
    }

    setState('sending')
    setError(null)
    setBad(null)
    try {
      // path(), not a hand-written string (CLAUDE.md rule 3).
      const res = await fetch(path('/api/leads/'), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          firstName: value('firstName'),
          lastName: value('lastName'),
          email: value('email'),
          phone: value('phone'),
          company: value('company'),
          address: value('address'),
          city: value('city'),
          state: value('state'),
          zip: value('zip'),
          service: value('service'),
          audience: value('audience'),
          message: value('message'),
          consent,
          website: value('website'),
          sourcePage: window.location.pathname,
        }),
      })
      const out = (await res.json().catch(() => ({}))) as { error?: string; field?: FieldName }
      if (!res.ok) {
        setError(out.error ?? 'Something went wrong. Please try again.')
        setState('error')
        if (out.field) focusField(out.field)
        return
      }
      form.reset()
      setCount(0)
      setState('sent')
    } catch {
      setError('Could not reach the server. Please check your connection and try again.')
      setState('error')
    }
  }

  const invalid = (f: FieldName) => (bad === f ? true : undefined)
  const F = FORM.fields

  return (
    /* method + action: a submit before hydration posts here instead of
       GETting the fields into the address bar (RTI-10, src/lib/form-post.ts). */
    <form method="post" action={path('/api/leads/')} className="flex w-full flex-col gap-[16px] lg:gap-[20px]" onSubmit={submit} noValidate>
      <input type="hidden" name="type" value="contact" />
      {/* Honeypot. Hidden from sight AND from screen readers, and out of the
          tab order, so no person is ever offered it — only a bot that fills
          every input it finds. See the check in /api/leads. */}
      <div aria-hidden="true" className="absolute size-px overflow-hidden opacity-0">
        <label htmlFor="contact-website">Leave this empty</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={ROW}>
        <Field id="firstName" f={F.firstName} autoComplete="given-name" required minLength={2} maxLength={60} invalid={invalid('firstName')} onInput={() => setBad(null)} />
        <Field id="lastName" f={F.lastName} autoComplete="family-name" required minLength={2} maxLength={60} invalid={invalid('lastName')} onInput={() => setBad(null)} />
      </div>

      <div className={ROW}>
        <Field id="email" f={F.email} type="email" autoComplete="email" required maxLength={200} invalid={invalid('email')} onInput={() => setBad(null)} />
        <Field id="phone" f={F.phone} type="tel" autoComplete="tel" required maxLength={25} invalid={invalid('phone')} onInput={() => setBad(null)} />
      </div>

      <Field id="company" f={F.company} autoComplete="organization" maxLength={160} />

      <Field id="address" f={F.address} autoComplete="street-address" maxLength={200} />

      {/* City / State / Zip — three across at lg, stacked on a phone. */}
      <div className={ROW}>
        <Field id="city" f={F.city} autoComplete="address-level2" maxLength={80} />
        <Field id="state" f={F.state} autoComplete="address-level1" maxLength={80} />
        <Field id="zip" f={F.zip} inputMode="numeric" autoComplete="postal-code" maxLength={5} pattern="\d{5}" invalid={invalid('zip')} onInput={() => setBad(null)} />
      </div>

      <div className={ROW}>
        <div className={FIELD}>
          <label htmlFor="contact-service" className={LABEL}>{F.service.label}</label>
          <div className="relative">
            <select id="contact-service" name="service" defaultValue="" className={`${INPUT} appearance-none pr-[44px] has-[option[value='']:checked]:text-muted`}>
              <option value="">{F.service.placeholder}</option>
              {SERVICE_INTEREST.map((o) => <option key={o} value={o} className="text-ink">{o}</option>)}
            </select>
            <Chevron />
          </div>
        </div>
        <div className={FIELD}>
          <label htmlFor="contact-audience" className={LABEL}>{F.audience.label}</label>
          <div className="relative">
            <select id="contact-audience" name="audience" defaultValue={FORM.audiences[0]} className={`${INPUT} appearance-none pr-[44px]`}>
              {FORM.audiences.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <Chevron />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-[8px]">
        <label htmlFor="contact-message" className={LABEL}>{F.message.label}</label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          maxLength={FORM.messageMax}
          placeholder={F.message.placeholder}
          aria-invalid={invalid('message')}
          aria-describedby="contact-message-count"
          onInput={(e) => { setCount(e.currentTarget.value.length); setBad(null) }}
          className="h-[110px] w-full resize-none rounded-[8px] border border-field bg-white px-[16px] pt-[14px] font-poppins text-[14px] leading-[22px] text-ink outline-none transition-colors placeholder:text-muted focus-visible:border-brand"
        />
        <span id="contact-message-count" className="self-end font-roboto text-[12px] leading-none text-muted">
          {count}/{FORM.messageMax}
        </span>
      </div>

      <label className="flex items-start gap-[10px] font-roboto text-[14px] leading-[20px] text-label">
        <input id="contact-consent" name="consent" value="yes" type="checkbox" required aria-invalid={invalid('consent')}
          onChange={() => setBad(null)}
          className="mt-[1px] size-[18px] shrink-0 accent-brand" />
        <span>{FORM.consent}</span>
      </label>

      <div className="flex w-full flex-col gap-[12px]">
        <button
          type="submit"
          disabled={state === 'sending'}
          className="btn-pop inline-flex h-[48.05px] w-fit items-center gap-[8.008px] rounded-[8px] border border-brand bg-brand px-[28.029px] font-roboto text-[15.016px] font-medium leading-[22.523px] tracking-[-0.0801px] text-white disabled:opacity-60"
        >
          {state === 'sending' ? 'Sending…' : FORM.submit}
          <Image src="/images/icons/arrow-white.svg" alt="" width={18} height={14} className="h-[14.252px] w-[18.213px]" />
        </button>

        {/* aria-live so the result is announced, not just drawn. */}
        <p aria-live="polite" className="min-h-[22px] font-roboto text-[14px] leading-[22px]">
          {state === 'sent' && <span className="text-brand">{FORM.sent}</span>}
          {state === 'error' && error && <span className="text-[#b3261e]">{error}</span>}
        </p>
      </div>
    </form>
  )
}

function Chevron() {
  return (
    <Image src="/images/icons/chevron-16.svg" alt="" width={16} height={16}
      className="pointer-events-none absolute right-[16px] top-1/2 size-[16px] -translate-y-1/2" />
  )
}

/** The input's id is `contact-<name>` and it posts under `<name>`. */
function Field({
  id, f, type = 'text', autoComplete, inputMode, required, minLength, maxLength, pattern, invalid, onInput,
}: {
  id: FieldName
  f: { label: string; placeholder: string }
  type?: string
  autoComplete?: string
  inputMode?: 'numeric'
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: string
  invalid?: boolean
  onInput?: () => void
}) {
  return (
    <div className={FIELD}>
      <label htmlFor={`contact-${id}`} className={LABEL}>{f.label}</label>
      <input id={`contact-${id}`} name={id} type={type} inputMode={inputMode} autoComplete={autoComplete}
        required={required} minLength={minLength} maxLength={maxLength} pattern={pattern}
        aria-invalid={invalid} onInput={onInput}
        placeholder={f.placeholder} className={INPUT} />
    </div>
  )
}
