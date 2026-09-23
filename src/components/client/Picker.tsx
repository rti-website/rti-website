'use client'

import Image from 'next/image'

/** Glass select — Figma 6098:544 / 6199:4848. 50px, r14, white/5 on white/20 border. */
export function Picker({
  id, name, placeholder, srLabel, options,
}: {
  id: string
  /** Set it and the choice posts with a surrounding form. */
  name?: string
  placeholder: string
  srLabel: string
  options: readonly string[]
}) {
  return (
    <div className="relative size-full">
      <label htmlFor={id} className="sr-only">{srLabel}</label>
      <select
        id={id}
        name={name}
        defaultValue=""
        className="h-[50px] w-full appearance-none rounded-[14px] border border-white/20 bg-white/5 px-[16px] py-[12px] font-inter text-[16px] text-white/40 outline-none backdrop-blur-[24px] focus-visible:border-white/60 [&>option]:text-ink"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <Image
        src="/images/icons/chevron-24.svg"
        alt=""
        width={24}
        height={24}
        className="pointer-events-none absolute right-[16px] top-1/2 size-[24px] -translate-y-1/2"
      />
    </div>
  )
}
