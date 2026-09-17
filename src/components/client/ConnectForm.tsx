'use client'

import Image from 'next/image'

/**
 * "Don't See Your Item?" email capture — Figma 6166:2773.
 *
 * Client only because it owns a submit handler. Input 971 wide, button takes
 * the rest of the 1168 content width (187 in the design).
 *
 * Figma draws the button label white on a white fill, which is invisible; it
 * is rendered teal here, matching every other "Bordered colored White V1"
 * instance in the file and how it reads in the Figma preview.
 */
export function ConnectForm({ placeholder, cta }: { placeholder: string; cta: string }) {
  return (
    <form
      className="flex w-full items-start gap-[10px]"
      onSubmit={(e) => {
        e.preventDefault()
        // TODO(phase-2): post to the quote-intake Worker once the Phase 0
        // tracking inventory says where submissions should land.
      }}
    >
      <div className="relative h-[50px] w-[971px] shrink-0 overflow-hidden rounded-[8px] border border-white/20 bg-white/5 backdrop-blur-[24px]">
        <label htmlFor="services-email" className="sr-only">Email address</label>
        <input
          id="services-email"
          type="email"
          required
          placeholder={placeholder}
          className="size-full bg-transparent px-[16px] py-[12px] pr-[52px] font-inter text-[16px] text-white outline-none placeholder:text-white/40"
        />
        <Image
          src="/images/icons/mail-24.svg"
          alt=""
          width={24}
          height={24}
          className="pointer-events-none absolute right-[16px] top-1/2 size-[24px] -translate-y-1/2"
        />
      </div>

      <button
        type="submit"
        className="flex h-[50px] min-w-px flex-1 items-center justify-center gap-[8.008px] rounded-[8px] bg-white px-[28.029px] font-roboto text-[15.016px] font-medium leading-[22.523px] tracking-[-0.0801px] text-brand backdrop-blur-[4.004px]"
      >
        <span className="whitespace-nowrap">{cta}</span>
        <Image src="/images/icons/arrow-teal.svg" alt="" width={18} height={14} className="h-[14.252px] w-[18.213px] shrink-0" />
      </button>
    </form>
  )
}
