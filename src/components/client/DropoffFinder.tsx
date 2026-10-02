'use client'

import Image from 'next/image'
import { useState } from 'react'
import { milesBetween, type LatLng } from '@/lib/geo'
import { path } from '@/lib/urls'

/**
 * Find a Drop-off Location — /dropoff/, Figma 7206:3216 (phone 7210:6498).
 *
 * WHY CLIENT: it searches. A city or ZIP goes to /api/locate (the same
 * geocoder the Locations page uses) and comes back as a point; "Use my
 * location" asks the browser for one instead. Either way the distance to each
 * of the ten locations is worked out HERE, from points the page hands in, so
 * a visitor's own position never leaves the browser.
 *
 * THE MAP is the frame's "illustrative map": the light panel with a pin per
 * location, placed by a simple longitude/latitude projection of the lower 48,
 * not a real map. The two RTI facilities carry their labels as the frame
 * draws them; the others are pins with a tooltip. After a search the nearest
 * one is labelled and highlighted, and the results list under the map gives
 * the exact details and Google directions.
 */
export type FinderSite = {
  name: string
  address: string
  phone: string
  hours: string
  acceptsLabel: string
  accepts: string
  /** This site's page, or Google Maps where the location has none. */
  view: string
  directions: string
  /** The two RTI facilities: labelled on the map. */
  primary: boolean
  /** Short map label, "Blaine, MN". */
  short: string
  lat: number
  lng: number
}

export type FinderCopy = {
  placeholder: string
  find: string
  useMine: string
  mapNote: string
  labels: { distance: string; address: string; hours: string; phone: string; accepts: string; directions: string; view: string }
  resultsHeading: string
  nearMiles: number
  noneNear: string
  noneNearLink: { label: string; href: string }
  chicago: string
  chicagoLink: { label: string; href: string }
  notFound: string
  error: string
  locating: string
  denied: string
}

type State =
  | { kind: 'idle' }
  | { kind: 'busy'; message: string }
  | { kind: 'found'; place: string; point: LatLng }
  | { kind: 'message'; message: string }

/* The lower 48, padded inside the panel. Illustrative, so a plain
   equirectangular placement is all it needs. */
const W = { lng: [-125, -66.5], lat: [24, 49.5] } as const
function place(p: LatLng): { left: string; top: string } {
  const x = (p.lng - W.lng[0]) / (W.lng[1] - W.lng[0])
  const y = (W.lat[1] - p.lat) / (W.lat[1] - W.lat[0])
  return { left: `${8 + x * 84}%`, top: `${10 + y * 76}%` }
}

const tel = (p: string) => `tel:+1${p.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '')}`

export function DropoffFinder({ copy: C, sites }: { copy: FinderCopy; sites: FinderSite[] }) {
  const [state, setState] = useState<State>({ kind: 'idle' })

  const ranked = state.kind === 'found'
    ? sites.map((s) => ({ s, miles: Math.round(milesBetween(state.point, s)) })).sort((a, b) => a.miles - b.miles)
    : []
  const nearest = ranked[0]
  const near = nearest && nearest.miles <= C.nearMiles

  async function search(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const input = e.currentTarget.elements.namedItem('q') as HTMLInputElement | null
    const q = input?.value.trim() ?? ''
    if (!q) { input?.focus(); return }
    setState({ kind: 'busy', message: '' })
    try {
      const res = await fetch(path('/api/locate/'), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ q }),
      })
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; found?: boolean; label?: string; point?: LatLng; error?: string }
      if (!res.ok || !body.ok) { setState({ kind: 'message', message: body.error ?? C.error }); return }
      if (!body.found || !body.point) { setState({ kind: 'message', message: C.notFound }); return }
      setState({ kind: 'found', place: body.label ?? q, point: body.point })
    } catch {
      setState({ kind: 'message', message: C.error })
    }
  }

  function useMine() {
    if (!('geolocation' in navigator)) { setState({ kind: 'message', message: C.denied }); return }
    setState({ kind: 'busy', message: C.locating })
    navigator.geolocation.getCurrentPosition(
      (pos) => setState({ kind: 'found', place: 'your location', point: { lat: pos.coords.latitude, lng: pos.coords.longitude } }),
      () => setState({ kind: 'message', message: C.denied }),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 },
    )
  }

  return (
    <div className="flex w-full flex-col items-center gap-[24px] lg:gap-[40px]">
      {/* Search Row — 7206:15313: a 680 bar holding the input and the filled
          button, the outlined "Use my location" beside it. On the phone the
          three stack full width. */}
      <div className="flex w-full flex-col gap-[12px] lg:w-auto lg:flex-row lg:items-center">
        <form onSubmit={search} role="search" className="flex w-full flex-col gap-[12px] lg:h-[56px] lg:w-[680px] lg:flex-row lg:items-center lg:justify-between lg:rounded-[10px] lg:border lg:border-field lg:bg-white lg:pl-[20px] lg:pr-[8px]">
          <label className="flex h-[48px] items-center gap-[12px] rounded-[10px] border border-field bg-white px-[16px] lg:h-auto lg:flex-1 lg:border-0 lg:px-0">
            <Image src="/images/dropoff/search-pin.svg" alt="" width={20} height={20} className="size-[20px] shrink-0" unoptimized />
            <span className="sr-only">{C.placeholder}</span>
            <input name="q" type="text" maxLength={80} autoComplete="postal-code" placeholder={C.placeholder}
              className="w-full min-w-0 bg-transparent font-poppins text-[15px] text-ink outline-none placeholder:text-muted" />
          </label>
          <button type="submit" disabled={state.kind === 'busy'}
            className="btn-pop inline-flex h-[48.05px] shrink-0 items-center justify-center gap-[8px] rounded-[8px] border border-brand bg-brand px-[28px] font-roboto text-[15.016px] font-medium tracking-[-0.0801px] text-white disabled:opacity-60">
            {C.find}
            <Image src="/images/icons/arrow-white.svg" alt="" width={18} height={14} className="h-[14.252px] w-[18.213px]" />
          </button>
        </form>
        <button type="button" onClick={useMine} disabled={state.kind === 'busy'}
          className="btn-pop inline-flex h-[48.05px] shrink-0 items-center justify-center gap-[8px] rounded-[8px] border border-brand bg-white px-[28px] font-roboto text-[15.016px] font-medium tracking-[-0.0801px] text-brand disabled:opacity-60">
          {C.useMine}
          <Image src="/images/icons/arrow-teal.svg" alt="" width={18} height={14} className="h-[14.252px] w-[18.213px]" />
        </button>
      </div>

      {/* Map Panel — 7206:3230, 1282x380 r16. */}
      <div className="relative h-[220px] w-full overflow-hidden rounded-[16px] lg:h-[380px] lg:w-[1282px]"
        style={{ backgroundImage: 'linear-gradient(145.33deg, rgb(234,244,245) 10%, rgb(216,238,240) 90%)' }}>
        <span className="absolute left-[12px] top-[12px] rounded-[8px] bg-white/85 px-[10px] py-[6px] font-roboto text-[11px] text-muted lg:left-[24px] lg:top-[24px] lg:px-[14px] lg:text-[12.5px]">
          {C.mapNote}
        </span>
        {sites.map((s) => {
          const hit = nearest?.s === s
          const showLabel = s.primary || hit
          return (
            <span key={s.name} title={s.name} className={`absolute flex -translate-x-1/2 -translate-y-[18px] flex-col items-center gap-[6px] lg:-translate-y-[36px] lg:gap-[8px] ${hit ? 'z-20' : s.primary ? 'z-10' : ''}`}
              style={place(s)}>
              <Image src="/images/dropoff/map-pin.svg" alt="" width={36} height={36} unoptimized
                className={`size-[22px] lg:size-[36px] ${hit ? 'scale-125' : s.primary ? '' : 'opacity-70'}`} />
              {showLabel && (
                <span className={`whitespace-nowrap rounded-full px-[10px] py-[4px] font-sans text-[11px] font-medium shadow-[0_2px_6px_rgba(0,0,0,0.12)] lg:px-[14px] lg:py-[6px] lg:text-[13px] ${hit ? 'bg-brand text-white' : 'bg-white text-heading'}`}>
                  {s.short}
                </span>
              )}
            </span>
          )
        })}
        {state.kind === 'found' && (
          <span aria-hidden="true" title="You" className="absolute size-[12px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-[#1b7a3d] shadow-[0_0_0_3px_rgba(27,122,61,0.35)]"
            style={place(state.point)} />
        )}
      </div>

      {/* Results — under the map, after a search. */}
      <div aria-live="polite" className="w-full lg:w-[1282px]">
        {state.kind === 'busy' && state.message && <p className="font-roboto text-[15px] text-muted">{state.message}</p>}
        {state.kind === 'message' && <p className="font-roboto text-[15px] text-[#b3261e]">{state.message}</p>}
        {state.kind === 'found' && !near && (
          <p className="rounded-[12px] border border-brand/30 bg-white px-[20px] py-[16px] font-roboto text-[15px] leading-[24px] text-ink lg:px-[32px]">
            {C.noneNear}{' '}
            <a href={C.noneNearLink.href} target="_blank" rel="noopener noreferrer" className="font-bold text-brand underline">{C.noneNearLink.label}</a>
          </p>
        )}
        {state.kind === 'found' && near && (
          <div className="flex flex-col gap-[16px]">
            <h3 className="font-sans text-[20px] font-semibold text-heading lg:text-[24px]">{C.resultsHeading.replace('{place}', state.place)}</h3>
            <ul className="grid grid-cols-1 gap-[16px] lg:grid-cols-3 lg:gap-[24px]">
              {ranked.filter((r) => r.miles <= C.nearMiles * 2).slice(0, 3).map(({ s, miles }) => (
                <li key={s.name} className="flex flex-col gap-[10px] rounded-[12px] border border-line bg-white p-[20px] font-poppins text-[14px] leading-[22px] text-[#4d4d4d] lg:p-[24px]">
                  <p className="font-sans text-[18px] font-semibold text-heading">{s.name}</p>
                  <p><span className="font-medium text-heading">{C.labels.distance}:</span> {miles} miles</p>
                  <p><span className="font-medium text-heading">{C.labels.address}:</span> {s.address}</p>
                  <p><span className="font-medium text-heading">{C.labels.hours}:</span> {s.hours}</p>
                  <p><span className="font-medium text-heading">{C.labels.phone}:</span> <a href={tel(s.phone)} className="text-brand">{s.phone}</a></p>
                  <p><span className="font-medium text-heading">{C.labels.accepts}:</span> {s.accepts}</p>
                  <div className="mt-[6px] flex flex-wrap gap-[16px] font-roboto text-[15px] font-bold">
                    <a href={s.directions} target="_blank" rel="noopener noreferrer" className="text-brand underline">{C.labels.directions} →</a>
                    <a href={s.view} {...(s.view.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="text-brand underline">{C.labels.view} →</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Search Status Row — 7206:15317: two tinted panels, side by side on
          the board, stacked on the phone. */}
      <div className="flex w-full flex-col gap-[16px] lg:w-[1282px] lg:flex-row lg:gap-[24px]">
        <StatusPanel text={C.noneNear} link={C.noneNearLink} external />
        <StatusPanel text={C.chicago} link={C.chicagoLink} />
      </div>
    </div>
  )
}

function StatusPanel({ text, link, external = false }: { text: string; link: { label: string; href: string }; external?: boolean }) {
  return (
    <div className="flex flex-1 flex-col items-start gap-[12px] rounded-[12px] bg-[#eaf4f5] px-[20px] py-[20px] lg:flex-row lg:items-center lg:gap-[20px] lg:px-[32px] lg:py-[24px]">
      <p className="flex-1 font-roboto text-[15px] leading-[24px] text-[#333] lg:text-[16px] lg:leading-[26px]">{text}</p>
      <a href={link.href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="shrink-0 font-roboto text-[15px] font-bold text-brand underline">
        {link.label}&nbsp;&nbsp;→
      </a>
    </div>
  )
}
