'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { milesBetween, type LatLng } from '@/lib/geo'
import { path } from '@/lib/urls'
import type { DropoffSite } from '@/lib/dropoff-sites'
import type { NO_PICKUP } from '@/data/contact'

/**
 * "We do not offer residential pickup" — Asim, 29 Sep 2026.
 *
 * Shown in the Contact Us and Get a Quote forms when "Is it for?" is
 * Residential (above that row), and at the top of the Schedule a Pickup form,
 * which is business only. The form still sends either way. Two links, each
 * opening a pop-up:
 *
 *   NEAREST DROP-OFF. The browser asks for the visitor's location first (its
 *   own permission prompt); once allowed, the pop-up opens with "We found N
 *   drop-off locations near you" and a card for each: within RADIUS miles,
 *   or the nearest three when none is. The distance is worked out here, in
 *   the browser, against the sites the server passed in (dropoffSites()), so
 *   the location is never sent anywhere. If the visitor says no, or the
 *   browser has no location, the pop-up asks for a ZIP code instead and
 *   looks its centre up in our own ZIP table (/api/zip).
 *
 *   MAIL-IN. The program in three steps, with "Buy Recycling Kits" (the kit
 *   store) and a link to /mail-in-recycling/.
 *
 * Client only: it owns the geolocation call and the two pop-ups.
 *
 * The pop-ups are native <dialog>s in a portal to <body>, like SuccessDialog
 * (focus held, Escape closes, not scaled by the design canvas' zoom). React
 * still bubbles events from a portal to its parent in the React tree, which
 * is the lead form: so there is no <form> in here and every button is
 * type="button", or Enter in the ZIP box would send the enquiry.
 */

type Copy = typeof NO_PICKUP
/** "Near you": the pickup area is 100 miles; drop-off is a drive, so a bit more. */
const RADIUS = 150

type Origin = LatLng & { from: 'device' | 'zip'; zip?: string }
type Panel = null | 'dropoff' | 'mailin'

export function ResidentialHelp({ mode, copy, sites, mailInHref }: {
  /** residential: the Residential notice in Contact Us / Get a Quote; business: the pickup form's. */
  mode: 'residential' | 'business'
  copy: Copy
  sites: DropoffSite[]
  /** The kit store (MAIL_IN.href). */
  mailInHref: string
}) {
  const [panel, setPanel] = useState<Panel>(null)
  const [locating, setLocating] = useState(false)
  const [origin, setOrigin] = useState<Origin | null>(null)
  const [denied, setDenied] = useState(false)

  function findNearest() {
    if (locating) return
    if (!('geolocation' in navigator)) { setDenied(true); setPanel('dropoff'); return }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false)
        setDenied(false)
        setOrigin({ lat: pos.coords.latitude, lng: pos.coords.longitude, from: 'device' })
        setPanel('dropoff')
      },
      () => {
        setLocating(false)
        setDenied(true)
        setPanel('dropoff')
      },
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 10 * 60 * 1000 },
    )
  }

  return (
    <div role="note" className="flex w-full gap-[12px] rounded-[10px] border border-[#cfe5e7] bg-brand-soft px-[16px] py-[14px] lg:px-[18px]">
      <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-[1px] size-[20px] shrink-0 fill-brand">
        <path d="M10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm0 4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Zm1.3 9.2H8.7v-1.3h.6V9.8h-.6V8.5h2v4.9h.6v1.3Z" />
      </svg>
      <div className="flex min-w-px flex-col gap-[6px] font-roboto text-[14px] leading-[20px] text-label">
        <p className="font-medium text-heading">{mode === 'business' ? copy.business : copy.residential}</p>
        <button type="button" onClick={findNearest} disabled={locating}
          className="w-fit text-left font-medium text-brand underline underline-offset-2 hover:no-underline disabled:opacity-70">
          {locating ? copy.dropoff.finding : copy.dropoffLink}
        </button>
        <button type="button" onClick={() => setPanel('mailin')}
          className="w-fit text-left font-medium text-brand underline underline-offset-2 hover:no-underline">
          {copy.mailinLink}
        </button>
      </div>

      {panel === 'dropoff' && (
        <Modal onClose={() => setPanel(null)} title={copy.dropoff.title}>
          <Dropoffs copy={copy} sites={sites} origin={origin} denied={denied}
            onOrigin={(o) => { setOrigin(o); setDenied(false) }} onMailIn={() => setPanel('mailin')} />
        </Modal>
      )}
      {panel === 'mailin' && (
        <Modal onClose={() => setPanel(null)} title={copy.mailin.title}>
          <MailIn copy={copy} mailInHref={mailInHref} />
        </Modal>
      )}
    </div>
  )
}

/* ------------------------------------------------------------ drop-off -- */

function Dropoffs({ copy, sites, origin, denied, onOrigin, onMailIn }: {
  copy: Copy
  sites: DropoffSite[]
  origin: Origin | null
  denied: boolean
  onOrigin: (o: Origin) => void
  onMailIn: () => void
}) {
  const C = copy.dropoff
  const ranked = origin
    ? sites.map((s) => ({ ...s, miles: milesBetween(origin, s) })).sort((a, b) => a.miles - b.miles)
    : []
  const near = ranked.filter((s) => s.miles <= RADIUS)
  const shown = near.length ? near.slice(0, 6) : ranked.slice(0, 3)
  const headline = !origin ? null
    : near.length === 1 ? C.foundOne
      : near.length > 1 ? C.found.replace('{n}', String(near.length))
        : C.none.replace('{miles}', String(RADIUS))

  return (
    <div className="flex flex-col gap-[16px]">
      {(denied || origin?.from === 'zip') && <ZipSearch copy={copy} initial={origin?.zip ?? ''} showNote={denied && !origin} onFound={onOrigin} />}

      {headline && (
        <p aria-live="polite" className={`font-sans text-[17px] font-semibold leading-[1.35] ${near.length ? 'text-heading' : 'text-[#8a5a00]'}`}>
          {headline}
        </p>
      )}

      {shown.length > 0 && (
        <ul className="flex flex-col gap-[12px]">
          {shown.map((s) => (
            <li key={s.name} className="flex flex-col gap-[6px] rounded-[12px] border border-[#e3ebe9] bg-white p-[16px]">
              <div className="flex flex-wrap items-center justify-between gap-x-[10px] gap-y-[4px]">
                <h3 className="font-sans text-[16px] font-semibold leading-[1.3] text-heading">{s.name}</h3>
                <span className="whitespace-nowrap rounded-full bg-brand-soft px-[10px] py-[3px] font-roboto text-[12px] font-medium text-brand">
                  {s.miles < 1 ? C.close : C.away.replace('{miles}', s.miles < 10 ? s.miles.toFixed(1) : String(Math.round(s.miles)))}
                </span>
              </div>
              <span className="font-roboto text-[12px] font-medium uppercase tracking-[0.5px] text-muted">
                {s.kind === 'facility' ? C.facility : C.partner}
              </span>
              <p className="font-roboto text-[14px] leading-[20px] text-label">{s.address}</p>
              <p className="font-roboto text-[14px] leading-[20px] text-label">
                <a href={`tel:${s.phone.replace(/[^\d+]/g, '')}`} className="text-brand hover:underline">{s.phone}</a>
                {s.hours && <span className="text-muted"> · {s.hours}</span>}
              </p>
              <div className="flex flex-wrap gap-x-[16px] gap-y-[4px] pt-[2px] font-roboto text-[14px] font-medium">
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(s.address)}`}
                  target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-2 hover:no-underline">
                  {C.directions}
                </a>
                {s.page && <a href={s.page} className="text-brand underline underline-offset-2 hover:no-underline">{s.name.split(', ').slice(1).join(', ')} facility page</a>}
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-x-[18px] gap-y-[6px] border-t border-[#eef2f1] pt-[14px] font-roboto text-[14px] font-medium">
        <a href={path('/all-locations/')} className="text-brand underline underline-offset-2 hover:no-underline">{C.viewAll}</a>
        <button type="button" onClick={onMailIn} className="text-brand underline underline-offset-2 hover:no-underline">{C.mailin}</button>
      </div>
    </div>
  )
}

/** When the visitor will not share their location: their ZIP's centre, from our own table. */
function ZipSearch({ copy, initial, showNote, onFound }: {
  copy: Copy
  initial: string
  showNote: boolean
  onFound: (o: Origin) => void
}) {
  const C = copy.dropoff
  const id = useId()
  const [zip, setZip] = useState(initial)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  async function search() {
    const z = zip.trim()
    if (!/^\d{5}$/.test(z)) { setErr(C.notFound); return }
    setBusy(true); setErr('')
    try {
      const res = await fetch(`${path('/api/zip/')}?zip=${z}`)
      const r = res.ok ? ((await res.json()) as { found: boolean; lat?: number; lng?: number }) : null
      if (r?.found && typeof r.lat === 'number' && typeof r.lng === 'number') onFound({ lat: r.lat, lng: r.lng, from: 'zip', zip: z })
      else setErr(C.notFound)
    } catch {
      setErr(C.notFound)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-col gap-[8px]">
      {showNote && <p className="font-roboto text-[14px] leading-[20px] text-label">{C.denied}</p>}
      <label htmlFor={id} className="font-sans text-[14px] font-medium leading-none text-label">{C.zipLabel}</label>
      <div className="flex gap-[8px]">
        <input id={id} value={zip} inputMode="numeric" maxLength={5} autoComplete="postal-code" placeholder="55449"
          onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); void search() } }}
          className="h-[44px] w-full max-w-[160px] rounded-[8px] border border-field bg-white px-[14px] font-poppins text-[14px] text-ink outline-none focus-visible:border-brand" />
        <button type="button" onClick={() => void search()} disabled={busy}
          className="btn-pop h-[44px] rounded-[8px] border border-brand bg-brand px-[20px] font-roboto text-[14px] font-medium text-white disabled:opacity-60">
          {C.search}
        </button>
      </div>
      {err && <p className="font-roboto text-[13px] text-[#b3261e]">{err}</p>}
    </div>
  )
}

/* ------------------------------------------------------------- mail-in -- */

function MailIn({ copy, mailInHref }: { copy: Copy; mailInHref: string }) {
  const C = copy.mailin
  return (
    <div className="flex flex-col gap-[16px]">
      <p className="font-roboto text-[15px] leading-[1.55] text-label">{C.body}</p>
      <ol className="flex flex-col gap-[10px]">
        {C.steps.map((s, i) => (
          <li key={s} className="flex items-start gap-[12px] font-roboto text-[15px] leading-[1.5] text-label">
            <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-brand font-sans text-[13px] font-semibold text-white">{i + 1}</span>
            <span className="pt-[2px]">{s}</span>
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap items-center gap-x-[18px] gap-y-[10px] pt-[4px]">
        <a href={mailInHref} target="_blank" rel="noopener noreferrer"
          className="btn-pop inline-flex h-[46px] items-center rounded-[8px] border border-brand bg-brand px-[24px] font-roboto text-[15px] font-medium text-white">
          {C.buy}
        </a>
        <a href={path('/mail-in-recycling/')} className="font-roboto text-[14px] font-medium text-brand underline underline-offset-2 hover:no-underline">
          {C.more}
        </a>
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- modal -- */

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  useEffect(() => {
    const d = ref.current
    if (d && !d.open) d.showModal()
  }, [])
  return createPortal(
    <dialog ref={ref} aria-labelledby={titleId} onClose={onClose}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      className="m-auto max-h-[calc(100dvh-40px)] w-[calc(100%-32px)] max-w-[560px] overflow-y-auto rounded-[16px] border-0 bg-[#f9fbfb] p-0 shadow-[0_24px_60px_rgba(12,34,48,0.25)] backdrop:bg-[#0c2230]/55">
      <div className="flex flex-col gap-[16px] px-[20px] pb-[24px] pt-[20px] lg:px-[28px] lg:pb-[28px] lg:pt-[24px]">
        <div className="flex items-start justify-between gap-[16px]">
          <h2 id={titleId} className="font-sans text-[21px] font-semibold leading-[1.25] text-heading lg:text-[24px]">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close"
            className="grid size-[36px] shrink-0 place-items-center rounded-full text-[22px] leading-none text-muted hover:bg-brand-soft hover:text-heading">
            ×
          </button>
        </div>
        {children}
      </div>
    </dialog>,
    document.body,
  )
}
