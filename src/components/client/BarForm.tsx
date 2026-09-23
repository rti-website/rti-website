'use client'

import Image from 'next/image'

/**
 * The inline bar form: white, 1px #e2e2e2, r10, 56 tall, pl 20 / pr 8, with a
 * small grey glyph, a borderless input, and the shared teal button on the right.
 *
 * Two instances so far — the locator on /all-locations/ (Figma 6377:975, 680
 * wide) and the newsletter on /blog/ (6385:1337, 560 wide) — and they are the
 * same frame at two widths, so they are one component.
 *
 * Client only because it owns a submit handler. Neither instance has an endpoint
 * yet, so both are inert; see the note each wrapper carries.
 */
const GLYPHS = {
  search: 'M8.75 2a6.75 6.75 0 1 0 4.08 12.13l3.52 3.52a.9.9 0 0 0 1.27-1.27l-3.52-3.52A6.75 6.75 0 0 0 8.75 2Zm0 1.8a4.95 4.95 0 1 1 0 9.9 4.95 4.95 0 0 1 0-9.9Z',
  mail:   'M2.5 5.3c0-.8.6-1.4 1.4-1.4h12.2c.8 0 1.4.6 1.4 1.4v9.4c0 .8-.6 1.4-1.4 1.4H3.9c-.8 0-1.4-.6-1.4-1.4V5.3Zm2 .5L10 10l5.5-4.2h-11Zm11 1.7L10.5 11.4a.9.9 0 0 1-1 0L4.5 7.5v7h11v-7Z',
} as const

export function BarForm({
  width, glyph, iconSize = 20, label, placeholder, button, type = 'text', name, textSize = 15, onSubmit,
  stacked = false, busy = false, onEscape,
}: {
  /**
   * Below lg, draw the phone frame's shape for the locator (6747:5744): a
   * 50px bordered input with the full-width button 12px under it, instead of
   * one 56px bar. The bar shape is kept as the default because the blog
   * newsletter's phone frame keeps it. This used to be done from OUTSIDE by
   * the locations finder, with a stack of `max-lg:[&>form]:…!` overrides;
   * that wrapper is gone now that the form answers the frame itself.
   */
  stacked?: boolean
  /** Disables the button while a lookup is in flight. */
  busy?: boolean
  /** Escape in the field — the locator uses it to clear a result. */
  onEscape?: (form: HTMLFormElement) => void
  width: number
  glyph: keyof typeof GLYPHS
  iconSize?: number
  /** Real, visually hidden label — the frames draw a placeholder and nothing else. */
  label: string
  placeholder: string
  button: string
  type?: 'text' | 'search' | 'email'
  name: string
  textSize?: number
  /**
   * Handed the field's current value, and the form element so a caller can
   * reset it. Took no arguments until 22 Sep 2026, when the blog newsletter
   * needed the address it had just collected — every caller had the value
   * sitting in an uncontrolled input it could not reach.
   */
  onSubmit: (value: string, form: HTMLFormElement) => void
}) {
  return (
    <form
      // The width was an inline `style={{ width }}` until 22 Sep 2026, which
      // applied at EVERY viewport: 560px on the blog newsletter and 680px on
      // the locations finder, both inside a 350px column on a phone. It is a
      // custom property now, read only at lg, so below lg the bar is as wide
      // as its column. Callers restack the row from their own mobile frames.
      className={stacked
        ? 'flex w-full flex-col gap-[12px] lg:h-[56px] lg:flex-row lg:items-center lg:justify-between lg:rounded-[10px] lg:border lg:border-field lg:bg-white lg:pl-[20px] lg:pr-[8px] lg:w-[var(--bar-w)]'
        : 'flex h-[56px] w-full items-center justify-between rounded-[10px] border border-field bg-white pl-[20px] pr-[8px] lg:w-[var(--bar-w)]'}
      style={{ '--bar-w': `${width}px` } as React.CSSProperties}
      onKeyDown={onEscape ? (e) => { if (e.key === 'Escape') onEscape(e.currentTarget) } : undefined}
      onSubmit={(e) => {
        e.preventDefault()
        const form = e.currentTarget
        onSubmit(String(new FormData(form).get(name) ?? '').trim(), form)
      }}
    >
      <div className={stacked
        ? 'flex h-[50px] w-full items-center gap-[12px] rounded-[8px] border border-field bg-white px-[16px] lg:h-auto lg:w-auto lg:flex-1 lg:rounded-none lg:border-0 lg:px-0'
        : 'flex flex-1 items-center gap-[12px]'}>
        <svg viewBox="0 0 20 20" className="shrink-0 fill-muted" style={{ width: iconSize, height: iconSize }} aria-hidden="true">
          <path d={GLYPHS[glyph]} />
        </svg>
        <label htmlFor={name} className="sr-only">{label}</label>
        <input
          id={name} name={name} type={type} placeholder={placeholder}
          className="w-full bg-transparent font-poppins text-ink outline-none placeholder:text-muted"
          style={{ fontSize: textSize }}
        />
      </div>
      <button
        type="submit"
        disabled={busy}
        className={`btn-pop inline-flex h-[48.05px] shrink-0 items-center gap-[8.008px] rounded-[8px] border border-brand bg-brand px-[28.029px] font-roboto text-[15.016px] font-medium leading-[22.523px] tracking-[-0.0801px] text-white disabled:opacity-70 ${stacked ? 'w-full justify-center lg:w-auto' : ''}`}
      >
        <span className="whitespace-nowrap">{button}</span>
        <Image src="/images/icons/arrow-white.svg" alt="" width={18} height={14} className="h-[14.252px] w-[18.213px] shrink-0" />
      </button>
    </form>
  )
}
