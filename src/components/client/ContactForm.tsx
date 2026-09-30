'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { FORM as FORM_DEFAULTS, HERO_LOCATIONS as LOCATION_DEFAULTS, matchService } from '@/data/contact'
import { path } from '@/lib/urls'
import { usPhoneDigits } from '@/lib/phone'
import { cityKey, stateCode } from '@/lib/us-address'
import { CONNECT_EMAIL_KEY } from '@/components/client/ConnectForm'
import { trackLead } from '@/components/client/track'
import { SuccessDialog } from '@/components/client/SuccessDialog'
import { ResidentialHelp } from '@/components/client/ResidentialHelp'
import { ServicePicker } from '@/components/client/ServicePicker'
import type { DropoffSite } from '@/lib/dropoff-sites'
import type { NO_PICKUP } from '@/data/contact'
import type { AddressSuggestion } from '@/app/api/address/route'

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
 * THREE FORMS, ONE COMPONENT (Asim, 29 Sep 2026). `variant` says which:
 *   contact  /contact-us/          "Is it for?" preselected Commercial
 *   quote    /quote/               the same form
 *   pickup   /request-a-pickup/    business only: no "Is it for?" (it posts
 *                                  Commercial) and the business notice on top
 * It posts `form` with the variant, so the enquiry says where it came from.
 * Picking Residential on contact / quote shows the "We do not offer
 * residential pickup" notice under that row (ResidentialHelp: nearest
 * drop-off and Mail-In pop-ups); the form still sends.
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

/** The words, from Admin -> Pages -> Contact Us (src/data/contact.ts). */
type Form = typeof FORM_DEFAULTS
type Location = (typeof LOCATION_DEFAULTS)[number]

/**
 * "Is it for?" posts the option's value as written in src/data/contact.ts
 * ("Commercial", "Residential"), whatever the admin renames its label to:
 * /api/leads, the residential auto-reply and the Lead Hub all key on those
 * two words. The label shown is the edited one at the same position.
 */
const AUDIENCES = FORM_DEFAULTS.audiences

/** The first rule a filled-in form breaks, or null. Mirrors /api/leads. */
function check(v: (k: FieldName) => string, consent: boolean, form: Form): { field: FieldName; message: string } | null {
  const E = form.errors
  const first = v('firstName'), last = v('lastName')
  if (first.length < 2 || first.length > 60) return { field: 'firstName', message: E.firstName }
  if (last.length < 2 || last.length > 60) return { field: 'lastName', message: E.lastName }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email'))) return { field: 'email', message: E.email }
  if (!usPhoneDigits(v('phone'))) return { field: 'phone', message: E.phone }
  // Business only since 24 Sep 2026: a Residential enquiry has no company
  // field on screen, so nothing to require.
  if (v('audience') !== 'Residential' && !v('company')) return { field: 'company', message: E.company }
  if (!v('city')) return { field: 'city', message: E.city }
  if (!stateCode(v('state'))) return { field: 'state', message: E.usState }
  if (!/^\d{5}$/.test(v('zip'))) return { field: 'zip', message: E.zipCode }
  if (!v('service')) return { field: 'service', message: E.recycle }
  if (v('message').length > form.messageMax) return { field: 'message', message: E.tooLong.replace('{max}', String(form.messageMax)) }
  if (!consent) return { field: 'consent', message: E.consent }
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

export type FormVariant = 'contact' | 'quote' | 'pickup'

export function ContactForm({
  form: FORM, serviceInterest, heroLocations, variant = 'contact', help,
}: {
  /** FORM, SERVICE_INTEREST and HERO_LOCATIONS as edited in the admin, from the server parent. */
  form: Form
  serviceInterest: readonly string[]
  heroLocations: readonly Location[]
  /** Which of the three forms this is (see above). */
  variant?: FormVariant
  /** The no-residential-pickup notice: its words, the drop-off sites and the kit store. */
  help: { copy: typeof NO_PICKUP; sites: DropoffSite[]; mailInHref: string }
}) {
  const pickup = variant === 'pickup'
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
  const [audience, setAudience] = useState<string>(AUDIENCES[0])
  /** What would you like to recycle? — the picks (ServicePicker). */
  const [services, setServices] = useState<string[]>([])
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
    const wanted = params.get('service')?.trim().toLowerCase()
    if (wanted) {
      // The edited list first; a link naming a service by its old wording
      // still finds it (matchService, src/data/contact.ts).
      const match = matchService(serviceInterest, wanted)
      if (match) setServices([match])
    }

    /* The hero's "Select Your Location" (24 Sep 2026): a facility state fills
       State, as if the ZIP lookup had — so a ZIP typed later may still replace
       it — and Nationwide picks the Mail-In service if none was chosen. */
    const place = params.get('location')?.trim().toLowerCase()
    // Matched on the labels as edited, then as written: the hero may link
    // with either. `state` and `service` are settings and travel with the row.
    const loc = place
      ? heroLocations.find((l) => l.label.toLowerCase() === place)
        ?? LOCATION_DEFAULTS.find((l) => l.label.toLowerCase() === place)
      : undefined
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
    if (loc?.service) {
      const preset = matchService(serviceInterest, loc.service) ?? loc.service
      setServices((cur) => (cur.length ? cur : [preset]))
    }
    // Read once, on arrival, as before; the lists do not change on the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setHint({ tone: 'warn', text: FORM.errors.usState })
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

  /** An address picked from the suggestions: it fills City, State and Zip as
   *  if the visitor had typed them (theirs, not ours to replace). */
  function pickAddress(a: AddressSuggestion) {
    put('city', a.city, false)
    put('state', a.state, false)
    put('zip', a.zip, false)
    setBad(null)
    setHint(null)
    seq.current++
    if (!a.zip) void fromCity()
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

    const problem = check((k) => value(k), consent, FORM)
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
          form: variant,
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
        setError(out.error ?? FORM.errors.failed)
        setState('error')
        if (out.field) focusField(out.field)
        return
      }
      trackLead({ type: 'contact', formId: `${variant}_form`, service: value('service'), audience: value('audience') })
      const firstName = value('firstName')
      form.reset()
      filled.current = { city: false, state: false, zip: false }
      setHint(null)
      setCount(0)
      setAudience(AUDIENCES[0])
      setServices([])
      setState('sent')
      setPopup({ name: firstName })
    } catch {
      setError(FORM.errors.offline)
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
      <input type="hidden" name="form" value={variant} />
      {/* Schedule a Pickup is business only: every pickup posts Commercial. */}
      {pickup && <input type="hidden" name="audience" value="Commercial" />}
      {pickup && <ResidentialHelp mode="business" {...help} />}
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

      {/* Suggestions as the visitor types (29 Sep 2026): picking one fills
          City, State and Zip too. See AddressField below. */}
      <AddressField f={F.address} onPick={pickAddress} />

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
          <label htmlFor="contact-service" className={LABEL}>{F.service.label}<Req /></label>
          {/* Several at once, or the visitor's own words (30 Sep 2026): see
              ServicePicker. Was a single text box with a <datalist>. */}
          <ServicePicker options={serviceInterest} value={services} onChange={(v) => { setServices(v); setBad(null) }}
            placeholder={F.service.placeholder} invalid={invalid('service')} inputClass={INPUT} />
        </div>
        {!pickup && <div className={FIELD}>
          <label htmlFor="contact-audience" className={LABEL}>{F.audience.label}<Req /></label>
          <div className="relative">
            <select id="contact-audience" name="audience" defaultValue={AUDIENCES[0]} onChange={(e) => { setAudience(e.target.value); if (bad === 'company') { setBad(null); setError(null); setState('idle') } }} className={`${INPUT} appearance-none pr-[44px]`}>
              {AUDIENCES.map((o, i) => <option key={o} value={o}>{FORM.audiences[i] ?? o}</option>)}
            </select>
            <Chevron />
          </div>
        </div>}
      </div>

      {/* Under the row with "Is it for?" (Asim, 29 Sep 2026: "move these
          precautions below the is this for place"). */}
      {!pickup && !business && <ResidentialHelp mode="residential" {...help} />}

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
        <span>{FORM.consent}<Req /></span>
      </label>

      <div className="flex w-full flex-col gap-[12px]">
        <button
          type="submit"
          disabled={state === 'sending'}
          className="btn-pop inline-flex h-[48.05px] w-fit items-center gap-[8.008px] rounded-[8px] border border-brand bg-brand px-[28.029px] font-roboto text-[15.016px] font-medium leading-[22.523px] tracking-[-0.0801px] text-white disabled:opacity-60"
        >
          {state === 'sending' ? FORM.sending : FORM.submit}
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

/**
 * Address with suggestions — Asim, 29 Sep 2026 ("auto fill the address,
 * give suggestions like the one in Find a Recycling Location Near You").
 * After 3 characters and a short pause it asks /api/address (US addresses,
 * see that route) and lists up to six under the field; arrow keys and Enter
 * or a click pick one, which also fills City, State and Zip. Escape or
 * leaving the field closes the list. Anything typed is still accepted as it
 * is: the suggestions help, they are never required.
 *
 * autoComplete "off" so the browser's own address list does not open on top
 * of ours.
 */
function AddressField({ f, onPick }: { f: { label: string; placeholder: string }; onPick: (a: AddressSuggestion) => void }) {
  const [items, setItems] = useState<AddressSuggestion[]>([])
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const ask = useRef(0)
  const listId = 'contact-address-list'

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  function onInput(e: React.FormEvent<HTMLInputElement>) {
    const q = e.currentTarget.value.trim()
    if (timer.current) clearTimeout(timer.current)
    if (q.length < 3) { ask.current++; setItems([]); setOpen(false); return }
    timer.current = setTimeout(async () => {
      const n = ++ask.current
      try {
        const res = await fetch(`${path('/api/address/')}?q=${encodeURIComponent(q)}`)
        const r = res.ok ? ((await res.json()) as { suggestions?: AddressSuggestion[] }) : null
        if (n !== ask.current) return
        const list = r?.suggestions ?? []
        setItems(list)
        setActive(-1)
        setOpen(list.length > 0)
      } catch {
        if (n === ask.current) { setItems([]); setOpen(false) }
      }
    }, 300)
  }

  function choose(a: AddressSuggestion) {
    const input = document.getElementById('contact-address') as HTMLInputElement | null
    if (input) input.value = a.line
    ask.current++
    setOpen(false)
    setItems([])
    onPick(a)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || items.length === 0) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => (i + 1) % items.length) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => (i <= 0 ? items.length - 1 : i - 1)) }
    else if (e.key === 'Enter' && active >= 0) { e.preventDefault(); choose(items[active]!) }
    else if (e.key === 'Escape') { setOpen(false) }
  }

  return (
    <div className={FIELD}>
      <label htmlFor="contact-address" className={LABEL}>{f.label}</label>
      <div className="relative">
        <input id="contact-address" name="address" type="text" maxLength={200} autoComplete="off"
          role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls={listId}
          aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
          placeholder={f.placeholder} className={INPUT}
          onInput={onInput} onKeyDown={onKeyDown}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onFocus={() => { if (items.length) setOpen(true) }} />
        {open && (
          <ul id={listId} role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-[10px] border border-field bg-white py-[6px] shadow-[0_12px_30px_rgba(12,34,48,0.14)]">
            {items.map((a, i) => (
              <li key={a.label} id={`${listId}-${i}`} role="option" aria-selected={i === active}
                onMouseDown={(e) => { e.preventDefault(); choose(a) }}
                onMouseEnter={() => setActive(i)}
                className={`flex cursor-pointer items-start gap-[10px] px-[14px] py-[9px] font-roboto text-[14px] leading-[20px] text-label ${i === active ? 'bg-brand-soft' : ''}`}>
                <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-[2px] size-[16px] shrink-0 fill-brand">
                  <path d="M8 1a5 5 0 0 0-5 5c0 3.6 4.5 8.6 4.7 8.8a.4.4 0 0 0 .6 0C8.5 14.6 13 9.6 13 6a5 5 0 0 0-5-5Zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
                </svg>
                <span><span className="font-medium text-heading">{a.line}</span>{`, ${a.city}, ${a.state}${a.zip ? ` ${a.zip}` : ''}`}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

/**
 * The red asterisk on a required field's label (Asim, 30 Sep 2026: "add red
 * compulsory sign … so lead know that these things are compulsory"). The
 * inputs carry `required` too, which is what a screen reader announces, so
 * the mark itself is hidden from one.
 */
function Req() {
  return <span aria-hidden="true" className="ml-[3px] text-[#d92d20]">*</span>
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
      <label htmlFor={`contact-${id}`} className={LABEL}>{f.label}{required && <Req />}</label>
      <input id={`contact-${id}`} name={id} type={type} inputMode={inputMode} autoComplete={autoComplete}
        required={required} minLength={minLength} maxLength={maxLength} pattern={pattern}
        aria-invalid={invalid} aria-describedby={describedBy} onInput={onInput} onBlur={onBlur}
        placeholder={f.placeholder} className={INPUT} />
    </div>
  )
}
