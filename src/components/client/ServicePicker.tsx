'use client'

import Image from 'next/image'
import { useEffect, useId, useRef, useState } from 'react'

/**
 * "What would you like to recycle?" — several at once, and anything else in
 * the visitor's own words (Asim, 30 Sep 2026: "multiple selection for user if
 * he want to select multiple … also give text option like he can write
 * option from his own side").
 *
 * A combobox: the picks sit in the field as chips, the text box after them
 * filters the list, and Enter (or a comma) adds whatever was typed when it is
 * not on the list. The list stays open while picking, so several go in one
 * pass; each row is a checkbox. Backspace in an empty box takes the last
 * chip off.
 *
 * ONE LINE TALL, ALWAYS. The forms sit in pinned sections of a fixed height
 * (the quote and pickup pages' FORM_H), so the chips scroll sideways inside
 * the 48px field instead of wrapping it taller.
 *
 * What posts is one field, `service`, the picks joined with ", " — the shape
 * the enquiry emails, the admin and /api/leads already read. The server
 * splits it again to match each one to the list (src/app/api/leads/route.ts).
 * Controlled by ContactForm, which prefills it from ?service= links and the
 * hero's location, and clears it when the form resets.
 */
export const SERVICE_SEPARATOR = ', '
/** The server keeps this much of the joined value; the picker stops adding before it. */
export const SERVICE_MAX = 300

export function ServicePicker({
  options, value, onChange, placeholder, invalid, inputClass,
}: {
  options: readonly string[]
  value: string[]
  onChange: (next: string[]) => void
  placeholder: string
  invalid?: boolean
  /** The form's own field classes, for the box. */
  inputClass: string
}) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  /** Chips while the box is being used; a one-line summary of the picks when it is not. */
  const [focused, setFocused] = useState(false)
  const [active, setActive] = useState(-1)
  const input = useRef<HTMLInputElement>(null)
  const box = useRef<HTMLDivElement>(null)
  // Keep the text box in view as chips go in.
  useEffect(() => { if (focused && box.current) box.current.scrollLeft = box.current.scrollWidth }, [focused, value.length])
  const listId = useId()

  const q = query.trim().toLowerCase()
  const shown = options.filter((o) => !q || o.toLowerCase().includes(q))
  const exact = options.find((o) => o.toLowerCase() === q)
  const custom = q && !exact && !value.some((v) => v.toLowerCase() === q) ? query.trim() : null
  /** Rows of the list: the typed text first when it is new, then the matching services. */
  const rows: { label: string; custom: boolean }[] = [
    ...(custom ? [{ label: custom, custom: true }] : []),
    ...shown.map((o) => ({ label: o, custom: false })),
  ]

  const has = (s: string) => value.some((v) => v.toLowerCase() === s.toLowerCase())
  const fits = (next: string[]) => next.join(SERVICE_SEPARATOR).length <= SERVICE_MAX

  function add(raw: string) {
    // A typed "tvs, monitors" is two entries.
    const parts = raw.split(',').map((s) => s.replace(/\s+/g, ' ').trim()).filter(Boolean)
    let next = [...value]
    for (const p of parts) {
      const listed = options.find((o) => o.toLowerCase() === p.toLowerCase())
      const item = listed ?? p.slice(0, 80)
      if (!next.some((v) => v.toLowerCase() === item.toLowerCase()) && fits([...next, item])) next = [...next, item]
    }
    onChange(next)
    setQuery('')
    setActive(-1)
  }
  function toggle(s: string) {
    if (has(s)) onChange(value.filter((v) => v.toLowerCase() !== s.toLowerCase()))
    else add(s)
    input.current?.focus()
  }
  function remove(s: string) {
    onChange(value.filter((v) => v !== s))
    input.current?.focus()
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive((i) => (rows.length ? (i + 1) % rows.length : -1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setOpen(true); setActive((i) => (rows.length ? (i <= 0 ? rows.length - 1 : i - 1) : -1)) }
    else if (e.key === 'Enter') {
      // Never submits the form from here: Enter picks or adds.
      e.preventDefault()
      if (open && active >= 0 && rows[active]) toggle(rows[active].label)
      else if (query.trim()) add(query)
    } else if (e.key === ',') {
      if (query.trim()) { e.preventDefault(); add(query) }
    } else if (e.key === 'Backspace' && query === '' && value.length) {
      onChange(value.slice(0, -1))
    } else if (e.key === 'Escape') setOpen(false)
  }

  return (
    <div className="relative">
      {/* Text typed but not yet added still posts: a click on Send blurs the box
          after the form has already read its fields. */}
      <input type="hidden" name="service" value={[...value, ...(custom && !has(custom) ? [custom] : [])].join(SERVICE_SEPARATOR)} />
      <div
        ref={box}
        onMouseDown={(e) => { if (e.target === e.currentTarget) { e.preventDefault(); input.current?.focus(); setOpen(true) } }}
        aria-invalid={invalid}
        className={`${inputClass} flex cursor-text items-center gap-[6px] overflow-x-auto pr-[44px] focus-within:border-brand [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        {!focused && value.length > 0 && (
          <button type="button" tabIndex={-1} onMouseDown={(e) => { e.preventDefault(); input.current?.focus() }}
            className="flex min-w-0 flex-1 items-center gap-[8px] text-left font-poppins text-[14px] text-ink">
            <span className="truncate">{value.join(SERVICE_SEPARATOR)}</span>
            {value.length > 1 && (
              <span className="shrink-0 rounded-full bg-brand-soft px-[8px] py-[2px] font-roboto text-[12px] font-medium text-brand">{value.length}</span>
            )}
          </button>
        )}
        {focused && value.map((v) => (
          <span key={v} className="inline-flex h-[30px] shrink-0 items-center gap-[4px] whitespace-nowrap rounded-full bg-brand-soft pl-[12px] pr-[6px] font-roboto text-[13px] text-heading">
            {v}
            <button type="button" aria-label={`Remove ${v}`} onClick={() => remove(v)}
              className="grid size-[20px] place-items-center rounded-full text-[15px] leading-none text-muted hover:bg-white hover:text-heading">
              &times;
            </button>
          </span>
        ))}
        <input
          ref={input}
          id="contact-service"
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && active >= 0 ? `${listId}-${active}` : undefined}
          aria-required="true"
          aria-invalid={invalid}
          autoComplete="off"
          maxLength={80}
          value={query}
          placeholder={value.length ? 'Add more' : placeholder}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setActive(-1) }}
          onFocus={() => { setOpen(true); setFocused(true) }}
          onKeyDown={onKeyDown}
          onBlur={() => setTimeout(() => {
            setOpen(false)
            setFocused(false)
            // What was typed and never added is not thrown away.
            if (query.trim()) add(query)
          }, 150)}
          className={`${!focused && value.length ? 'w-0 min-w-0 flex-none opacity-0' : 'min-w-[110px] flex-1'} h-full bg-transparent font-poppins text-[14px] text-ink outline-none placeholder:text-muted`}
        />
      </div>
      <button type="button" tabIndex={-1} aria-hidden="true"
        onMouseDown={(e) => { e.preventDefault(); input.current?.focus(); setOpen((o) => !o) }}
        className="absolute right-[4px] top-1/2 grid size-[40px] -translate-y-1/2 place-items-center">
        <Image src="/images/icons/chevron-16.svg" alt="" width={16} height={16} className={`size-[16px] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && rows.length > 0 && (
        <ul id={listId} role="listbox" aria-multiselectable="true"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-[264px] overflow-y-auto rounded-[10px] border border-field bg-white py-[6px] shadow-[0_12px_30px_rgba(12,34,48,0.14)]">
          {rows.map((r, i) => {
            const on = !r.custom && has(r.label)
            return (
              <li key={`${r.custom ? '+' : ''}${r.label}`} id={`${listId}-${i}`} role="option" aria-selected={on}
                onMouseDown={(e) => { e.preventDefault(); toggle(r.label) }}
                onMouseEnter={() => setActive(i)}
                className={`flex cursor-pointer items-center gap-[10px] px-[14px] py-[9px] font-roboto text-[14px] leading-[20px] text-label ${i === active ? 'bg-brand-soft' : ''}`}>
                {r.custom ? (
                  <span aria-hidden="true" className="grid size-[16px] shrink-0 place-items-center rounded-[4px] bg-brand text-[13px] font-bold leading-none text-white">+</span>
                ) : (
                  <span aria-hidden="true" className={`grid size-[16px] shrink-0 place-items-center rounded-[4px] border ${on ? 'border-brand bg-brand' : 'border-field bg-white'}`}>
                    {on && <svg viewBox="0 0 12 12" className="size-[10px] fill-none stroke-white stroke-[2]"><path d="M2 6.2 4.8 9 10 3" /></svg>}
                  </span>
                )}
                <span>{r.custom ? <>Add &ldquo;<span className="font-medium text-heading">{r.label}</span>&rdquo;</> : r.label}</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
