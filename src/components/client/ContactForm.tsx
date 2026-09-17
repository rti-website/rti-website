'use client'

import Image from 'next/image'
import { FORM } from '@/data/contact'

/**
 * Contact form — Figma 6370:758.
 *
 * Column gap 24 down to the Fields group, which is gap 20; each field is a
 * label (IBM Plex Sans Medium 14) over a 48px input (white, 1px #e2e2e2, r8,
 * px16). Placeholders are Poppins 14, self-hosted — see globals.css.
 *
 * Client only because it owns a submit handler.
 */
const INPUT = 'h-[48px] w-full rounded-[8px] border border-field bg-white px-[16px] font-poppins text-[14px] text-ink outline-none transition-colors placeholder:text-muted focus-visible:border-brand'
const LABEL = 'font-sans text-[14px] font-medium leading-none text-label'

export function ContactForm() {
  return (
    <form
      className="flex w-full flex-col gap-[20px]"
      onSubmit={(e) => {
        e.preventDefault()
        // TODO(phase-2): post to the quote-intake Worker once the Phase 0
        // tracking inventory says where submissions should land. Until then
        // nothing is sent — this is the third form in the build waiting on it.
      }}
    >
      <div className="flex w-full items-start gap-[20px]">
        <Field id="contact-name" f={FORM.fields.name} type="text" autoComplete="name" />
        <Field id="contact-email" f={FORM.fields.email} type="email" autoComplete="email" required />
      </div>

      <div className="flex w-full items-start gap-[20px]">
        <Field id="contact-phone" f={FORM.fields.phone} type="tel" autoComplete="tel" />
        <div className="flex min-w-px flex-1 flex-col gap-[8px]">
          <label htmlFor="contact-topic" className={LABEL}>{FORM.fields.topic.label}</label>
          <div className="relative">
            <select id="contact-topic" defaultValue="" className={`${INPUT} appearance-none pr-[44px] text-muted`}>
              <option value="" disabled>{FORM.fields.topic.placeholder}</option>
              {FORM.topics.map((t) => <option key={t} value={t} className="text-ink">{t}</option>)}
            </select>
            <Image
              src="/images/icons/chevron-14.svg"
              alt=""
              width={16}
              height={16}
              className="pointer-events-none absolute right-[16px] top-1/2 size-[16px] -translate-y-1/2"
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-[8px]">
        <label htmlFor="contact-message" className={LABEL}>{FORM.fields.message.label}</label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder={FORM.fields.message.placeholder}
          className="h-[110px] w-full resize-none rounded-[8px] border border-field bg-white px-[16px] pt-[14px] font-poppins text-[14px] leading-[22px] text-ink outline-none transition-colors placeholder:text-muted focus-visible:border-brand"
        />
      </div>

      <button
        type="submit"
        className="inline-flex h-[48.05px] w-fit items-center gap-[8.008px] rounded-[8px] border border-brand bg-brand px-[28.029px] font-roboto text-[15.016px] font-medium leading-[22.523px] tracking-[-0.0801px] text-white"
      >
        {FORM.submit}
        <Image src="/images/icons/arrow-white.svg" alt="" width={18} height={14} className="h-[14.252px] w-[18.213px]" />
      </button>
    </form>
  )
}

function Field({
  id, f, type, autoComplete, required,
}: {
  id: string
  f: { label: string; placeholder: string }
  type: string
  autoComplete?: string
  required?: boolean
}) {
  return (
    <div className="flex min-w-px flex-1 flex-col gap-[8px]">
      <label htmlFor={id} className={LABEL}>{f.label}</label>
      <input id={id} type={type} autoComplete={autoComplete} required={required} placeholder={f.placeholder} className={INPUT} />
    </div>
  )
}
