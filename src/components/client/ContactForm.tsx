'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { FORM, HERO_LOCATIONS, SERVICE_INTEREST } from '@/data/contact'
import { path } from '@/lib/urls'
import { usPhoneDigits } from '@/lib/phone'
import { cityKey, stateCode } from '@/lib/us-address'
import { CONNECT_EMAIL_KEY } from '@/components/client/ConnectForm'
import { trackLead } from '@/components/client/track'
import { SuccessDialog } from '@/components/client/SuccessDialog'

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
 * mistakes are caught before a round trip. Everything is required except the
 * street address and the message (Asim, 23 Sep 2026): names 2 to 60
 * characters, a real email, a US phone number (10 digits, or 11 starting with
 * 1, in any punctuation), company, city, a US state ("MN" or "Minnesota"), a
 * 5 digit ZIP, what to recycle, and the consent box; the message is capped at
 * 2000 characters with a counter. The server repeats every check and is the
 * one that decides; a field it rejects gets focus and its message.
 *
 * ZIP <-> CITY AND STATE (Asim, 23 Sep 2026: "when someone adds the zip code,
 * automatically fetch the state and city, and vice versa, and give a message
 * below it: change if not correct"). Asked of /api/zip as the fields are
 * filled in; the line under City / State / Zip says what happened:
 *
 *   ZIP typed, city/state empty   both filled in, "change them if they are
 *                                 not correct"
 *   ZIP typed, city/state typed   checked; if they disagree, says where the
 *                                 ZIP is and offers a button to use that
 *   city + state typed, no ZIP    one ZIP: filled in. A few: offered as
 *                                 buttons. Many: "please enter yours"
 *   ZIP or city not found         says so
 *
 * A value we filled in is ours to replace when the other side changes; a
 * value the visitor typed is never overwritten, only questioned. None of it
 * blocks sending: towns go by more than one name and the table can be behind
 * the Postal Service, so a mismatch is pointed out, not refused.
 * The ZIP data is GeoNames' (CC BY 4.0), credited under every hint that uses
 * it.
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
/** Chrome and Safari draw their own arrow on an input with a datalist. It is
 *  made invisible and stretched over the right 44px, where our 16px chevron
 *  sits, so the chevron looks like the design and a click on it still opens
 *  the list. */
const LIST_ARROW = '[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:top-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-[44px] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0'
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
  // Business only since 24 Sep 2026: a Residential enquiry has no company
  // field on screen, so nothing to require.
  if (v('audience') !== 'Residential' && !v('company')) return { field: 'company', message: 'Please enter your company name.' }
  if (!v('city')) return { field: 'city', message: 'Please enter your city.' }
  if (!stateCode(v('state'))) return { field: 'state', message: 'Please enter a US state, e.g. MN or Minnesota.' }
  if (!/^\d{5}$/.test(v('zip'))) return { field: 'zip', message: 'Please enter a 5 digit ZIP code.' }
  if (!v('service')) return { field: 'service', message: 'Please choose or type what you would like to recycle.' }
  if (v('message').length > FORM.messageMax) return { field: 'message', message: `Please keep the message under ${FORM.messageMax} characters.` }
  if (!consent) return { field: 'consent', message: 'Please tick the box so we can contact you.' }
  return null
}

/** The line under City / State / Zip. */
type Hint = {
  tone: 'info' | 'warn'
  text: string
  /** A few ZIP codes to pick from, as buttons. */
  zips?: string[]
  /** "Use Blaine, MN" — replaces what the visitor typed with what the ZIP says. */
  fix?: { city: string; state: string }
  /** The text comes from the ZIP table: credit GeoNames (CC BY 4.0). */
  credit?: boolean
}
type ZipInfo = { found: true; zip: string; state: string; city: string; cities: string[] }
type AddrField = 'city' | 'state' | 'zip'

const addr = (f: AddrField) => document.getElementById(`contact-${f}`) as HTMLInputElement | null

/** "the city and state", "the city", "the state" — for the filled-in note. */
function filledNote(city: boolean, state: boolean): string {
  const what = city && state ? 'the city and state' : city ? 'the city' : 'the state'
  return `We filled in ${what} from your ZIP code. Change ${city && state ? 'them' : 'it'} if ${city && state ? 'they are' : 'it is'} not correct.`
}

export function ContactForm() {
  const [state, setState] = useState<State>('idle')
  const [error, setError] = useState<string | null>(null)
  const [bad, setBad] = useState<FieldName | null>(null)
  const [count, setCount] = useState(0)

  const [hint, setHint] = useState<Hint | null>(null)
  /** The success pop-up, and the first name it greets (read before the reset). */
  const [popup, setPopup] = useState<{ name: string } | null>(null)
  /**
   * "Is it for?" — held here only to show or hide Company Name. Asim,
   * 24 Sep 2026: "when someone selects Residential remove the company from the
   * form". The select itself stays uncontrolled; this follows its onChange and
   * goes back to the default when the form resets.
   */
  const [audience, setAudience] = useState<string>(FORM.audiences[0])
  const business = audience !== 'Residential'
  /** Which of the three we filled in (ours to replace) vs the visitor typed. */
  const filled = useRef<Record<AddrField, boolean>>({ city: false, state: false, zip: false })
  /** Only the latest lookup may write: a slow answer to an old ZIP is dropped. */
  const seq = useRef(0)

  /**
   * Two things arrive from other pages, both written to the DOM in an effect
   * (the form is uncontrolled and prerendered, so filling them during render
   * would not match the server's HTML):
   *   - an email typed into the "Don't See Your Item?" band (sessionStorage),
   *     read once and removed;
   *   - a service and a location picked in the homepage hero (`?service=`
   *     and `?location=` in the URL).
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

    const params = new URLSearchParams(window.location.search)
    const select = document.getElementById('contact-service')
    const wanted = params.get('service')?.trim().toLowerCase()
    if (wanted) {
      const match = SERVICE_INTEREST.find((o) => o.toLowerCase() === wanted)
      if (match && select instanceof HTMLInputElement) select.value = match
    }

    /* The hero's "Select Your Location" (24 Sep 2026): a facility state fills
       State, as if the ZIP lookup had — so a ZIP typed later may still replace
       it — and Nationwide picks the Mail-In service if none was chosen. */
    const place = params.get('location')?.trim().toLowerCase()
    const loc = place ? HERO_LOCATIONS.find((l) => l.label.toLowerCase() === place) : undefined
    /* A location page (24 Sep 2026) sends its place as "Phoenix, AZ": the
       state after the comma fills State the same way. The city is the drop-off
       site's, not necessarily the visitor's, so it is left for them. */
    const fromPage = place?.match(/,\s*([a-z]{2})$/)?.[1]
    const prefillState = loc?.state ?? (fromPage ? stateCode(fromPage) : null)
    if (prefillState) {
      const state = document.getElementById('contact-state')
      if (state instanceof HTMLInputElement && state.value === '') {
        state.value = prefillState
        filled.current.state = true
      }
    }
    if (loc?.service && select instanceof HTMLInputElement && select.value === '') select.value = loc.service
  }, [])

  function focusField(f: FieldName) {
    setBad(f)
    document.getElementById(`contact-${f}`)?.focus()
  }

  /* ---------------------------------------------- ZIP <-> city and state -- */

  function put(f: AddrField, v: string, ours: boolean) {
    const input = addr(f)
    if (input) input.value = v
    filled.current[f] = ours
  }

  async function ask<T>(query: string): Promise<T | null> {
    try {
      const res = await fetch(`${path('/api/zip/')}?${query}`)
      return res.ok ? ((await res.json()) as T) : null
    } catch {
      return null // offline or the server is down: say nothing, the form still sends
    }
  }

  /** A full ZIP was typed: fill in or check the city and state. */
  async function fromZip(zip: string) {
    const n = ++seq.current
    const r = await ask<ZipInfo | { found: false }>(`zip=${zip}`)
    if (n !== seq.current || !r) return
    if (!r.found) {
      setHint({ tone: 'warn', text: `We could not find ZIP code ${zip}. Please check it.` })
      return
    }
    const cityNow = addr('city')?.value.trim() ?? ''
    const stateNow = addr('state')?.value.trim() ?? ''
    const cityFree = !cityNow || filled.current.city
    const stateFree = !stateNow || filled.current.state
    if (cityFree) put('city', r.city, true)
    if (stateFree) put('state', r.state, true)
    const cityOk = cityFree || r.cities.some((c) => cityKey(c) === cityKey(cityNow))
    const stateOk = stateFree || stateCode(stateNow) === r.state
    if (cityOk && stateOk) {
      setHint(cityFree || stateFree ? { tone: 'info', text: filledNote(cityFree, stateFree), credit: true } : null)
    } else {
      setHint({
        tone: 'warn',
        text: `ZIP code ${zip} is in ${r.city}, ${r.state}. Please check the city, state and ZIP code.`,
        fix: { city: r.city, state: r.state },
        credit: true,
      })
    }
  }

  /** City and state are both in: find the ZIP, unless the visitor typed one. */
  async function fromCity() {
    const city = addr('city')?.value.trim() ?? ''
    const stateInput = addr('state')
    const typed = stateInput?.value.trim() ?? ''
    const code = stateCode(typed)
    if (typed && !code) {
      setHint({ tone: 'warn', text: 'Please enter a US state, e.g. MN or Minnesota.' })
      return
    }
    // "minnesota" -> "MN", so every lead reads alike (the server does the same).
    if (code && stateInput && stateInput.value !== code) stateInput.value = code
    if (!city || !code) return

    const zipNow = addr('zip')?.value.trim() ?? ''
    if (/^\d{5}$/.test(zipNow) && !filled.current.zip) {
      await fromZip(zipNow) // theirs: check the city against it, change nothing
      return
    }
    const n = ++seq.current
    const r = await ask<{ zips: string[]; count: number }>(`city=${encodeURIComponent(city)}&state=${code}`)
    if (n !== seq.current || !r) return
    const keep = filled.current.zip && r.zips.includes(zipNow)
    if (filled.current.zip && !keep) put('zip', '', false)
    if (r.count === 0) {
      setHint({ tone: 'warn', text: `We could not find ${city}, ${code}. Please check the city and state.` })
    } else if (r.count === 1) {
      put('zip', r.zips[0] ?? '', true)
      setHint({ tone: 'info', text: 'We filled in the ZIP code from your city. Change it if it is not correct.', credit: true })
    } else if (keep) {
      setHint(null)
    } else if (r.count <= 8) {
      setHint({ tone: 'info', text: `${city}, ${code} has ${r.count} ZIP codes. Pick yours:`, zips: r.zips, credit: true })
    } else {
      setHint({ tone: 'info', text: `${city}, ${code} has ${r.count} ZIP codes. Please enter yours.`, credit: true })
    }
  }

  function onZipInput(e: React.FormEvent<HTMLInputElement>) {
    setBad(null)
    filled.current.zip = false
    const input = e.currentTarget
    const digits = input.value.replace(/\D/g, '').slice(0, 5)
    if (digits !== input.value) input.value = digits
    if (digits.length === 5) void fromZip(digits)
    else { seq.current++; setHint(null) }
  }

  function onCityOrStateInput(f: 'city' | 'state') {
    setBad(null)
    filled.current[f] = false
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
          // Full URL, query included — the "submit_page" of the lead's
          // attribution (the campaign itself comes from the rti_attr cookie).
          submitPage: window.location.href,
        }),
      })
      const out = (await res.json().catch(() => ({}))) as { error?: string; field?: FieldName }
      if (!res.ok) {
        setError(out.error ?? 'Something went wrong. Please try again.')
        setState('error')
        if (out.field) focusField(out.field)
        return
      }
      trackLead({ type: 'contact', formId: 'contact_form', service: value('service'), audience: value('audience') })
      const firstName = value('firstName')
      form.reset()
      filled.current = { city: false, state: false, zip: false }
      setHint(null)
      setCount(0)
      setAudience(FORM.audiences[0])
      setState('sent')
      setPopup({ name: firstName })
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

      {/* Business only: not rendered for a Residential enquiry, so it is
          neither shown nor posted. /api/leads applies the same rule. */}
      {business && (
        <Field id="company" f={F.company} autoComplete="organization" required maxLength={160} invalid={invalid('company')} onInput={() => setBad(null)} />
      )}

      <Field id="address" f={F.address} autoComplete="street-address" maxLength={200} />

      {/* City / State / Zip — three across at lg, stacked on a phone — and the
          ZIP hint under them. The hint's box is empty (no height) until there
          is something to say, so the fixed-canvas section keeps its layout. */}
      <div className="flex w-full flex-col">
        <div className={ROW}>
          <Field id="city" f={F.city} autoComplete="address-level2" required maxLength={80} invalid={invalid('city')}
            describedBy="contact-address-hint" onInput={() => onCityOrStateInput('city')} onBlur={() => void fromCity()} />
          <Field id="state" f={F.state} autoComplete="address-level1" required maxLength={80} invalid={invalid('state')}
            describedBy="contact-address-hint" onInput={() => onCityOrStateInput('state')} onBlur={() => void fromCity()} />
          <Field id="zip" f={F.zip} inputMode="numeric" autoComplete="postal-code" required maxLength={5} pattern="\d{5}" invalid={invalid('zip')}
            describedBy="contact-address-hint" onInput={onZipInput} />
        </div>
        <div id="contact-address-hint" aria-live="polite">
          {hint && (
            <div className={`flex flex-wrap items-center gap-x-[8px] gap-y-[6px] pt-[8px] font-roboto text-[13px] leading-[20px] ${hint.tone === 'warn' ? 'text-[#b3261e]' : 'text-label'}`}>
              <span>{hint.text}</span>
              {hint.fix && (
                <button type="button" className="font-medium text-brand underline underline-offset-2"
                  onClick={() => { put('city', hint.fix!.city, true); put('state', hint.fix!.state, true); setHint(null) }}>
                  Use {hint.fix.city}, {hint.fix.state}
                </button>
              )}
              {hint.zips?.map((z) => (
                <button key={z} type="button"
                  className="h-[28px] rounded-[6px] border border-field bg-white px-[10px] font-poppins text-[13px] text-ink transition-colors hover:border-brand focus-visible:border-brand"
                  onClick={() => { put('zip', z, false); setBad(null); setHint(null) }}>
                  {z}
                </button>
              ))}
              {hint.credit && (
                <a href="https://www.geonames.org/" target="_blank" rel="noopener noreferrer" className="text-[12px] text-muted underline underline-offset-2">
                  ZIP data: GeoNames
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={ROW}>
        <div className={FIELD}>
          <label htmlFor="contact-service" className={LABEL}>{F.service.label}</label>
          {/* Pick from the list OR type anything (Asim, 24 Sep 2026: "make it
              editable, the user can write in it if they want"). A text input
              with a <datalist>: the browser offers the services as the
              visitor clicks or types, and any other wording is kept as
              written. No script and no new dependency; it works before
              hydration and on every phone. autoComplete off so the list is
              the services, not the browser's history of this box. */}
          <div className="relative">
            <input id="contact-service" name="service" type="text" list="contact-service-options" required maxLength={80}
              autoComplete="off" placeholder={F.service.placeholder} aria-invalid={invalid('service')}
              onInput={() => setBad(null)} className={`${INPUT} ${LIST_ARROW} relative pr-[44px]`} />
            <datalist id="contact-service-options">
              {SERVICE_INTEREST.map((o) => <option key={o} value={o} />)}
            </datalist>
            <Chevron />
          </div>
        </div>
        <div className={FIELD}>
          <label htmlFor="contact-audience" className={LABEL}>{F.audience.label}</label>
          <div className="relative">
            <select id="contact-audience" name="audience" defaultValue={FORM.audiences[0]} onChange={(e) => { setAudience(e.target.value); if (bad === 'company') { setBad(null); setError(null); setState('idle') } }} className={`${INPUT} appearance-none pr-[44px]`}>
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

      <SuccessDialog
        open={popup !== null}
        onClose={() => setPopup(null)}
        title={popup?.name ? `${FORM.popup.title}, ${popup.name}!` : `${FORM.popup.title}!`}
        message={FORM.popup.body}
      />
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
  id, f, type = 'text', autoComplete, inputMode, required, minLength, maxLength, pattern, invalid, describedBy, onInput, onBlur,
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
  describedBy?: string
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void
  onBlur?: () => void
}) {
  return (
    <div className={FIELD}>
      <label htmlFor={`contact-${id}`} className={LABEL}>{f.label}</label>
      <input id={`contact-${id}`} name={id} type={type} inputMode={inputMode} autoComplete={autoComplete}
        required={required} minLength={minLength} maxLength={maxLength} pattern={pattern}
        aria-invalid={invalid} aria-describedby={describedBy} onInput={onInput} onBlur={onBlur}
        placeholder={f.placeholder} className={INPUT} />
    </div>
  )
}
