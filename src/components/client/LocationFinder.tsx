'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { BarForm } from '@/components/client/BarForm'
import { FACILITIES, mapEmbed, type Facility } from '@/data/facilities'
import { FINDER } from '@/data/locations'
import { path } from '@/lib/urls'

/**
 * The locator on /all-locations/ — the search bar (Figma 6377:975) and the
 * map panel (6377:7041) together, because a search changes what the map
 * shows.
 *
 * ===========================================================================
 * IT WORKS NOW — Asim, 22 Sep 2026: "when user search a code show the
 * nearest location to him"
 * ===========================================================================
 * Type a city or a ZIP, press Search, and the panel answers: the nearest
 * facility, how far it is, and the other one for comparison. See
 * /api/locate for how the text becomes a point; this component never talks
 * to a third party itself.
 *
 * THE RESULT LIVES INSIDE THE MAP PANEL, not under the bar. This page is a
 * fixed-height canvas section — the sections below it sit at fixed offsets —
 * so nothing may grow when a result appears. A result card sits over the
 * map's right half (its bottom on the phone), the map moves to the nearest
 * facility, and the height never changes.
 *
 * THE BROWSER'S OWN "x" IS GONE. `type="search"` made Chrome draw a clear
 * button at the right edge of the field — which, since the field runs the
 * width of the bar, put it hard against the Search button (Asim's second
 * screenshot). It cannot be moved next to the text without measuring glyphs,
 * and Firefox and Safari never drew it at all, so it is hidden everywhere
 * (see `input[type="search"]` in globals.css) and the result card carries a
 * real Clear control instead. Escape clears too.
 *
 * MOBILE — 6747:5739 (bar) and 6747:8865 (map). BarForm's `stacked` mode
 * draws the phone frame's input-over-button; the panel is 220 tall, and the
 * result card takes its bottom edge.
 *
 * ===========================================================================
 * A REAL MAP SINCE 23 Sep 2026 — Asim: "we have to add [a] map here"
 * ===========================================================================
 * The panel was the frame's illustrative gradient with two drawn pins. It is
 * now Google's map (mapEmbed in src/data/facilities.ts), one facility at a
 * time, with a two-button switch — "Blaine, MN" / "New Berlin, WI" — where
 * the drawn pin labels were. A search moves the map to the nearest facility
 * and the switch follows it. Google's keyless embed takes one place, which is
 * why it is a switch and not both pins at once; showing both needs the Maps
 * JavaScript API and a key.
 *
 * Same box, same heights, so nothing below the section moves.
 */

const PIN_36 = 'M18 2a11 11 0 0 0-11 11c0 7.9 9.8 19.1 10.2 19.6a1 1 0 0 0 1.5 0C19.2 32.1 29 20.9 29 13A11 11 0 0 0 18 2Zm0 15.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z'

/** Switch label → facility. */
const PIN_TO_SLUG: Record<string, Facility['slug']> = {
  'Blaine, MN': 'minnesota-recycling',
  'New Berlin, WI': 'wisconsin-recycling',
}

type Result = { slug: Facility['slug']; miles: number }
type State =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'found'; q: string; label: string; results: Result[] }
  | { kind: 'notFound'; q: string }
  | { kind: 'error'; message: string }

export function LocationFinder() {
  const [state, setState] = useState<State>({ kind: 'idle' })
  /** Which facility the map shows. A search result moves it to the nearest. */
  const [shown, setShown] = useState<Facility['slug']>(FACILITIES[0]!.slug)
  const s = FINDER.search
  const nearest = state.kind === 'found' ? state.results[0]?.slug : null
  const shownF = FACILITIES.find((x) => x.slug === shown) ?? FACILITIES[0]!

  async function search(q: string, form: HTMLFormElement) {
    if (!q) { form.querySelector('input')?.focus(); return }
    setState({ kind: 'loading' })
    try {
      const res = await fetch(path('/api/locate/'), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ q }),
      })
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean; found?: boolean; q?: string; label?: string; results?: Result[]; error?: string
      }
      if (!res.ok || !body.ok) {
        setState({ kind: 'error', message: body.error ?? FINDER.result.error })
        return
      }
      if (!body.found || !body.results?.length) {
        setState({ kind: 'notFound', q })
        return
      }
      setState({ kind: 'found', q, label: body.label ?? q, results: body.results })
      if (body.results[0]) setShown(body.results[0].slug)
    } catch {
      setState({ kind: 'error', message: FINDER.result.error })
    }
  }

  function clear(form?: HTMLFormElement | null) {
    setState({ kind: 'idle' })
    form?.reset()
  }

  return (
    <>
      <BarForm
        width={680}
        glyph="search"
        label={s.label}
        placeholder={s.placeholder}
        button={state.kind === 'loading' ? s.searching : s.button}
        type="search"
        name="location-search"
        stacked
        busy={state.kind === 'loading'}
        onSubmit={search}
        onEscape={(form) => clear(form)}
      />

      {/* Map panel — 6377:7041, 1282x380, r16; 6747:8866 on the phone at
          350x220. Google's map of the facility in `shown`. The wrapper holds
          the facility switch: over the map's top right on the board, and in
          a row ABOVE the map on a phone, where Google's own place card
          (top left, ~270 wide) leaves no room for it inside a 350px map. */}
      <div className="relative flex w-full flex-col items-center gap-[10px] lg:block lg:w-[1282px]">
      {/* Always there on a phone (so the map does not jump when a result
          comes in); on the board it steps aside for the result card, which
          takes the same corner and names the other facility. */}
      {(
        <div role="group" aria-label="Show a facility on the map"
          className={`flex gap-[4px] rounded-full bg-white p-[4px] shadow-[0px_2px_8px_rgba(0,0,0,0.15)] lg:absolute lg:right-[16px] lg:top-[16px] lg:z-10 ${state.kind === 'idle' ? '' : 'lg:hidden'}`}>
          {FINDER.map.pins.map((p) => {
            const slug = PIN_TO_SLUG[p.label]!
            const on = slug === shown
            return (
              <button key={p.label} type="button" aria-pressed={on} onClick={() => setShown(slug)}
                className={`btn-pop flex h-[34px] items-center gap-[6px] whitespace-nowrap rounded-full px-[14px] font-sans text-[13px] font-medium leading-none transition-colors ${on ? 'bg-brand text-white' : 'text-heading hover:bg-brand-soft'}`}>
                <svg viewBox="0 0 36 36" className={`size-[14px] ${on ? 'fill-white' : 'fill-brand'}`} aria-hidden="true"><path d={PIN_36} /></svg>
                {p.label}
              </button>
            )
          })}
        </div>
      )}
      <div className="relative h-[220px] w-full overflow-hidden rounded-[16px] bg-[#eaf4f5] lg:h-[380px]" aria-live="polite">
        <iframe
          key={shownF.slug}
          src={mapEmbed(shownF.address, 12)}
          title={`Map of ${shownF.name}, ${shownF.address}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full border-0"
        />

        {/* The answer — over the right half of the panel on the board, along
            the bottom on the phone. Nothing outside the panel moves. */}
        {state.kind !== 'idle' && (
          <div data-finder-result className="absolute inset-x-[12px] bottom-[12px] rounded-[12px] border border-[#e6e6e6] bg-white p-[16px] shadow-[0px_8px_24px_rgba(15,23,42,0.10)] lg:inset-x-auto lg:right-[24px] lg:top-[24px] lg:bottom-auto lg:w-[440px] lg:p-[24px]">
            {state.kind === 'loading' && (
              <p className="font-roboto text-[14px] text-muted">{FINDER.result.searching}</p>
            )}

            {state.kind === 'error' && (
              <p role="alert" className="font-roboto text-[14px] leading-[1.5] text-[#b42318]">{state.message}</p>
            )}

            {state.kind === 'notFound' && (
              <>
                <p className="font-roboto text-[14px] leading-[1.5] text-muted">
                  {FINDER.result.notFound.replace('{q}', state.q)}
                </p>
                <ClearButton onClick={() => clear(document.querySelector<HTMLFormElement>('form:has(#location-search)'))} />
              </>
            )}

            {state.kind === 'found' && (() => {
              const first = state.results[0]!
              const f = FACILITIES.find((x) => x.slug === first.slug)!
              const other = state.results[1]
              const otherF = other && FACILITIES.find((x) => x.slug === other.slug)
              const directions = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(state.q)}&destination=${encodeURIComponent(f.address)}`
              return (
                <>
                  <p className="font-roboto text-[11px] font-bold uppercase tracking-[0.6px] text-accent">
                    {FINDER.result.nearestTo} {state.label}
                  </p>
                  <p className="mt-[4px] font-sans text-[18px] font-semibold leading-[1.3] text-heading lg:text-[20px]">
                    {f.name} <span className="font-roboto text-[14px] font-normal text-muted">· {FINDER.result.about} {first.miles} {FINDER.result.miles}</span>
                  </p>
                  <p className="mt-[6px] font-poppins text-[13.5px] leading-[1.5] text-[#4d4d4d] max-lg:hidden">{f.address}</p>
                  <p className="font-poppins text-[13.5px] leading-[1.5] text-[#4d4d4d] max-lg:hidden">
                    <a href={`tel:${f.phone.replace(/[^+\d]/g, '')}`} className="hover:text-brand">{f.phone}</a> · {f.hoursShort}
                  </p>

                  <div className="mt-[12px] flex flex-col gap-[8px] lg:mt-[16px] lg:flex-row lg:gap-[10px]">
                    <Link href={f.url} className="btn-pop inline-flex h-[42px] items-center justify-center gap-[8px] rounded-[8px] border border-brand bg-brand px-[18px] font-roboto text-[14px] font-medium text-white hover:bg-brand/90">
                      {FINDER.result.details}
                      <Image src="/images/icons/arrow-white.svg" alt="" width={18} height={14} className="h-[12px] w-[15px]" />
                    </Link>
                    <a href={directions} target="_blank" rel="noopener noreferrer" className="btn-pop inline-flex h-[42px] items-center justify-center gap-[8px] rounded-[8px] border border-brand px-[18px] font-roboto text-[14px] font-medium text-brand hover:bg-brand-soft">
                      {FINDER.result.directions}
                      <Image src="/images/icons/arrow-teal.svg" alt="" width={18} height={14} className="h-[12px] w-[15px]" />
                    </a>
                  </div>

                  {otherF && other && (
                    <p className="mt-[12px] font-roboto text-[12.5px] leading-[1.5] text-muted max-lg:hidden">
                      {FINDER.result.also} <Link href={otherF.url} className="underline underline-offset-2 hover:text-brand">{otherF.name}</Link> · {other.miles} {FINDER.result.miles}
                    </p>
                  )}
                  <ClearButton onClick={() => clear(document.querySelector<HTMLFormElement>('form:has(#location-search)'))} />
                </>
              )
            })()}
          </div>
        )}
      </div>
      </div>
    </>
  )
}

function ClearButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-[12px] top-[12px] grid size-[28px] place-items-center rounded-full text-muted transition-colors hover:bg-mist hover:text-heading lg:right-[16px] lg:top-[16px]"
      aria-label={FINDER.result.clear}
      title={FINDER.result.clear}
    >
      <svg viewBox="0 0 16 16" className="size-[14px] fill-current" aria-hidden="true">
        <path d="M3.3 2.2 8 6.9l4.7-4.7 1.1 1.1L9.1 8l4.7 4.7-1.1 1.1L8 9.1l-4.7 4.7-1.1-1.1L6.9 8 2.2 3.3l1.1-1.1Z" />
      </svg>
    </button>
  )
}
