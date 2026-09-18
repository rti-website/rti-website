'use client'

import Image from 'next/image'

/**
 * Newsletter signup — Figma 6059:21192.
 * Order per the design: input, then the checkbox carrying the long consent
 * line, then the "Yes, Please" button.
 */
export function NewsletterForm() {
  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault()
        // TODO(phase-2): point at the quote-intake Worker or the CRM, once the
        // Phase 0 tracking inventory says where submissions should land.
      }}
    >
      <div className="relative h-[46px] w-[329px] rounded-[4px] bg-white ring-1 ring-line">
        <Image src="/images/icons/foot-mail.png" alt="" width={25} height={18} className="absolute left-[15px] top-1/2 h-[18px] w-[25px] -translate-y-1/2" />
        <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="Email Address"
          className="size-full rounded-[4px] bg-transparent pl-[53px] pr-[56px] font-roboto text-[15px] text-ink outline-none placeholder:text-muted"
        />
        <button type="submit" aria-label="Subscribe" className="absolute right-[-1px] top-[-1px] grid h-[47px] w-[46px] place-items-center rounded-r-[4px] bg-brand text-white">
          &rarr;
        </button>
      </div>

      <label className="mt-[16px] flex max-w-[300px] items-start gap-[10px] font-roboto text-[13px] leading-[19px] text-muted">
        <input type="checkbox" required className="mt-[2px] size-[17px] shrink-0 rounded-[4px] border border-line bg-white" />
        Send the latest news or something new crops up to my mail box directly.
      </label>

      <button
        type="submit"
        className="mt-[18px] inline-flex h-[48.05px] items-center gap-[8.008px] rounded-[8px] border border-brand px-[28.029px] font-roboto text-[15.016px] font-medium leading-[22.523px] tracking-[-0.0801px] text-brand"
      >
        Yes, Please
        <Image src="/images/icons/arrow-teal.svg" alt="" width={18} height={14} className="h-[14.252px] w-[18.213px]" />
      </button>
    </form>
  )
}
