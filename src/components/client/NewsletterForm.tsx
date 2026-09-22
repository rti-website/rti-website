'use client'

import Image from 'next/image'

/**
 * Newsletter signup — Figma 6059:21192, mobile 6620:2375..2382.
 * Order per the design: input, then the checkbox carrying the long consent
 * line, then the "Yes, Please" button.
 *
 * The phone frame draws the consent line ABOVE the input, so below lg the form
 * is a flex column and the three controls are re-ordered with `order-*`. The
 * DOM order is unchanged — one markup, re-flowed, not a second copy.
 *
 * NOTE(design): that frame also drops the consent CHECKBOX and leaves the line
 * as plain text. Kept as a checkbox here: it is a required consent control, and
 * a form that asks for consent on a desktop and not on a phone is a functional
 * difference rather than a layout one. Flagged for Asim/Aqeel.
 */
export function NewsletterForm() {
  return (
    <form
      className="flex w-full flex-col gap-[16px] lg:block"
      onSubmit={(e) => {
        e.preventDefault()
        // TODO(phase-2): point at the quote-intake Worker or the CRM, once the
        // Phase 0 tracking inventory says where submissions should land.
      }}
    >
      {/* 6620:2375 — full width and 48 tall on the phone, the board's 329x46. */}
      <div className="relative order-2 h-[48px] w-full rounded-[4px] bg-white ring-1 ring-line lg:order-none lg:h-[46px] lg:w-[329px]">
        <Image src="/images/icons/foot-mail.png" alt="" width={25} height={18} className="absolute left-[15px] top-1/2 h-[18px] w-[25px] -translate-y-1/2" />
        <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="Email Address"
          className="size-full rounded-[4px] bg-transparent pl-[53px] pr-[56px] font-roboto text-[15px] text-ink outline-none placeholder:text-muted"
        />
        {/* 46 wide and a pixel proud of the box top and bottom, so it is 49 on
            the phone's 48px input and 47 on the board's 46 — over the 44px
            minimum either way. */}
        <button type="submit" aria-label="Subscribe" className="absolute right-[-1px] top-[-1px] grid h-[49px] w-[46px] place-items-center rounded-r-[4px] bg-brand text-white lg:h-[47px]">
          &rarr;
        </button>
      </div>

      {/* 6620:2374 — 14/20.7 on the phone, 13/19 on the board. */}
      <label className="order-1 flex items-start gap-[10px] font-roboto text-[14px] leading-[20.7px] text-muted lg:order-none lg:mt-[16px] lg:max-w-[300px] lg:text-[13px] lg:leading-[19px]">
        <input type="checkbox" required className="mt-[2px] size-[17px] shrink-0 rounded-[4px] border border-line bg-white" />
        Send the latest news or something new crops up to my mail box directly.
      </label>

      {/* 6620:2382 — full width and centred on the phone. */}
      <button
        type="submit"
        className="order-3 inline-flex h-[48.05px] w-full items-center justify-center gap-[8.008px] rounded-[8px] border border-brand px-[28.029px] font-roboto text-[15.016px] font-medium leading-[22.523px] tracking-[-0.0801px] text-brand lg:order-none lg:mt-[18px] lg:w-auto"
      >
        Yes, Please
        <Image src="/images/icons/arrow-teal.svg" alt="" width={18} height={14} className="h-[14.252px] w-[18.213px] shrink-0" />
      </button>
    </form>
  )
}
