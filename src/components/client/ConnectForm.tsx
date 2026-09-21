'use client'

import Image from 'next/image'

/**
 * "Don't See Your Item?" email capture.
 *
 * Two tones, one form:
 *   dark   Figma 6166:2773 on /services/ — glass input on the teal panel, a
 *          white button. Input 971 wide, button takes the rest of the 1168
 *          content width (187 in the design).
 *   light  Figma 6534:2011 on the homepage — white input on the #eaf4f5
 *          banner, a teal button. Input 588 wide, button takes the rest of
 *          the 761 content width.
 *
 * Client only because it owns a submit handler.
 *
 * Figma draws the dark button's label white on a white fill, which is
 * invisible; it is rendered teal here, matching every other "Bordered colored
 * White V1" instance in the file and how it reads in the Figma preview.
 */
const TONE = {
  dark: {
    input: 'border-white/20 bg-white/5',
    text: 'text-white placeholder:text-white/40',
    icon: '/images/icons/mail-24.svg',
    button: 'bg-white text-brand',
    arrow: '/images/icons/arrow-teal.svg',
  },
  light: {
    input: 'border-[rgba(174,174,174,0.4)] bg-white',
    text: 'text-ink placeholder:text-[#aeaeae]',
    icon: '/images/icons/mail-24-grey.svg',
    button: 'bg-brand text-white',
    arrow: '/images/icons/arrow-white.svg',
  },
} as const

export function ConnectForm({
  placeholder, cta, tone = 'dark', inputWidth = 971, id = 'services-email',
}: {
  placeholder: string
  cta: string
  tone?: keyof typeof TONE
  /** Fixed input width; the button takes the rest of the row. */
  inputWidth?: number
  id?: string
}) {
  const t = TONE[tone]
  return (
    <form
      className="flex w-full items-start gap-[10px]"
      onSubmit={(e) => {
        e.preventDefault()
        // TODO(phase-2): post to the quote-intake Worker once the Phase 0
        // tracking inventory says where submissions should land.
      }}
    >
      <div
        className={`relative h-[50px] shrink-0 overflow-hidden rounded-[8px] border backdrop-blur-[24px] ${t.input}`}
        style={{ width: inputWidth }}
      >
        <label htmlFor={id} className="sr-only">Email address</label>
        <input
          id={id}
          type="email"
          required
          placeholder={placeholder}
          className={`size-full bg-transparent px-[16px] py-[12px] pr-[52px] font-inter text-[16px] outline-none ${t.text}`}
        />
        <Image
          src={t.icon}
          alt=""
          width={24}
          height={24}
          className="pointer-events-none absolute right-[16px] top-1/2 size-[24px] -translate-y-1/2"
        />
      </div>

      <button
        type="submit"
        className={`flex h-[50px] min-w-px flex-1 items-center justify-center gap-[8.008px] rounded-[8px] px-[28.029px] font-roboto text-[15.016px] font-medium leading-[22.523px] tracking-[-0.0801px] backdrop-blur-[4.004px] ${t.button}`}
      >
        <span className="whitespace-nowrap">{cta}</span>
        <Image src={t.arrow} alt="" width={18} height={14} className="h-[14.252px] w-[18.213px] shrink-0" />
      </button>
    </form>
  )
}
