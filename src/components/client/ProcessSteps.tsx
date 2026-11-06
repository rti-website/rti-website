'use client'

import { useRef, useState, type ReactNode } from 'react'

/**
 * The steps of a service page's "How Do We Recycle …" section, Figma
 * "Option 2" (TL, 6 Nov 2026): desktop 7615:12852, mobile 7615:13977 in file
 * BVtf2AOuUOcYbiMIlcKmbC. Built by ServiceProcess, which renders everything
 * around it on the server.
 *
 * Client because a tab has to open its step (CLAUDE.md rule 7).
 *
 * ONE DOM FOR BOTH FRAMES (as Frame.tsx asks), with no copy written twice:
 *
 *   desktop  a grid. Column 1 the step tabs (340, a #dde4e1 rule on the right),
 *            column 2 the step text, column 3 the 500-wide photo. Every step's
 *            text sits in the SAME cell of column 2; only the chosen one is
 *            visible, the rest are `visibility: hidden`, so the cell is as tall
 *            as the longest step and the section never changes height when a
 *            tab is clicked (the canvas is measured once, at build).
 *   phone    the same elements in source order: the photo, then each step's
 *            row with its text straight under it, an accordion. A closed step's
 *            text is `display: none`.
 *
 * Every step's text is in the HTML either way, so crawlers read all of it.
 */
export type ProcessStep = { title: string; text: string }

export function ProcessSteps({ steps, nextLabel, image, idPrefix = 'process' }: {
  steps: ProcessStep[]
  /** "Next:" — SERVICE_PAGE_TEXT.process.next, editable in Admin. */
  nextLabel: string
  /** The photo, drawn by the server (next/image). */
  image: ReactNode
  idPrefix?: string
}) {
  /* `active` is the desktop tab and the phone's open row. On a phone the open
     row can also be closed (`open` null); a desktop tab is never "closed". */
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState<number | null>(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const n = steps.length

  const phone = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 63.99rem)').matches

  function choose(i: number) {
    if (i === active && phone()) { setOpen(open === i ? null : i); return }
    setActive(i)
    setOpen(i)
  }
  function next(i: number) {
    setActive(i + 1)
    setOpen(i + 1)
    tabs.current[i + 1]?.focus()
  }

  return (
    <div
      className="flex w-full flex-col lg:grid lg:min-h-[520px] lg:grid-cols-[340px_minmax(0,1fr)_500px] lg:gap-x-[40px]"
      style={{ gridTemplateRows: `repeat(${n}, auto) 1fr` }}
    >
      {/* The photo: 350x200 r12 above the steps on a phone, 500 wide r16 down
          the whole right column at lg. */}
      <div
        className="relative mb-[12px] h-[200px] w-full overflow-hidden rounded-[12px] lg:mb-0 lg:h-auto lg:rounded-[16px]"
        style={{ gridColumn: '3', gridRow: '1 / -1' }}
      >
        {image}
      </div>

      {/* The tab column's right-hand rule, the full height of the body. */}
      <span aria-hidden="true" className="hidden border-r border-[#dde4e1] lg:block" style={{ gridColumn: '1', gridRow: '1 / -1' }} />

      {steps.map((s, i) => {
        const on = active === i
        const openHere = open === i
        const panelId = `${idPrefix}-step-${i + 1}`
        return [
          <button
            key={`t${i}`}
            ref={(el) => { tabs.current[i] = el }}
            type="button"
            aria-expanded={openHere}
            aria-controls={panelId}
            onClick={() => choose(i)}
            className={`relative z-[1] flex w-full items-center gap-[16px] border-b border-[#dde4e1] px-[16px] py-[18px] text-left lg:mr-px lg:w-auto lg:gap-[20px] lg:py-[24px] lg:pl-[20px] lg:pr-[24px] ${
              on ? 'border-l-4 border-l-brand bg-[#e6f3f4]' : 'cursor-pointer hover:bg-[#f1f7f6]'
            } ${openHere ? 'max-lg:border-b-0' : ''} ${on && !openHere ? 'max-lg:border-l-0 max-lg:bg-transparent' : ''}`}
            style={{ gridColumn: '1', gridRow: `${i + 1}` }}
          >
            <span className={`shrink-0 font-roboto text-[15px] leading-[20px] lg:hidden ${openHere ? 'font-bold text-brand' : 'font-medium text-muted'}`}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className={`min-w-px flex-1 font-sans text-[17px] font-semibold leading-[1.22] lg:text-[19px] ${
              openHere ? 'text-brand' : 'text-heading'
            } ${on ? 'lg:text-brand' : 'lg:text-heading'}`}>
              {s.title}
            </span>
            {/* chevron-down / -up on a phone, chevron-right on an idle desktop tab */}
            <Chevron dir={openHere ? 'up' : 'down'} className="lg:hidden" />
            {!on && <Chevron dir="right" className="hidden lg:block" />}
          </button>,
          <div
            key={`p${i}`}
            id={panelId}
            className={`flex flex-col gap-[14px] border-b border-[#dde4e1] px-[16px] pb-[24px] pt-[20px] lg:gap-[20px] lg:border-b-0 lg:px-0 lg:pb-0 lg:pt-[48px] ${
              openHere ? '' : 'max-lg:hidden'
            } ${on ? '' : 'lg:invisible'}`}
            style={{ gridColumn: '2', gridRow: '1 / -1' }}
          >
            <h3 className="font-sans text-[22px] font-semibold leading-[1.2] text-heading lg:text-[36px]">{s.title}</h3>
            <p className="font-roboto text-[15px] leading-[24px] text-muted lg:text-[17px] lg:leading-[28px]">{s.text}</p>
            {i < n - 1 && (
              <button
                type="button"
                onClick={() => next(i)}
                tabIndex={on ? undefined : -1}
                className="cursor-pointer self-start text-left font-sans text-[16px] font-semibold leading-[1.22] text-brand hover:text-heading lg:mt-[12px] lg:text-[18px]"
              >
                {/* Inline, so a long step name wraps left aligned with the arrow after its last word. */}
                <NextText label={nextLabel} title={steps[i + 1]!.title} />
              </button>
            )}
          </div>,
        ]
      })}
    </div>
  )
}

/** Figma icon/chevron-*: 20px, a 1.67 stroke in #132119. */
function Chevron({ dir, className = '' }: { dir: 'down' | 'up' | 'right'; className?: string }) {
  const d = dir === 'down' ? 'M5 7.5l5 5 5-5' : dir === 'up' ? 'M5 12.5l5-5 5 5' : 'M7.5 5l5 5-5 5'
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={`size-[20px] shrink-0 text-heading ${className}`} fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

/** "Next: <step>", the last word held to the arrow so the arrow never wraps alone. */
function NextText({ label, title }: { label: string; title: string }) {
  const cut = title.lastIndexOf(' ')
  const head = cut > 0 ? `${title.slice(0, cut)} ` : ''
  const last = cut > 0 ? title.slice(cut + 1) : title
  return <>{label} {head}<span className="whitespace-nowrap">{last}<Arrow /></span></>
}

/** The "Next:" link's arrow, 18 on a phone and 20 at lg. */
function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="ml-[8px] inline-block size-[18px] -translate-y-px align-middle lg:ml-[10px] lg:size-[20px]" fill="none" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.17 10h11.66M10 4.17L15.83 10 10 15.83" />
    </svg>
  )
}
