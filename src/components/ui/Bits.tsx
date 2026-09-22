import Image from 'next/image'
import Link from 'next/link'

/* Shared design primitives, values read directly off the Figma nodes. */

/** Pill eyebrow — Figma "Container" + "Text", h34 / px20 / r-full. */
export function Eyebrow({ children, tone = 'green' }: { children: React.ReactNode; tone?: 'green' | 'glass' }) {
  /* Wraps below lg. /faqs/ has an eyebrow reading "COMPLIANCE, CERTIFICATIONS &
     RESPONSIBLE RECYCLING", which at 11px with 0.89px tracking is ~370px — it
     was being cut off at the right edge of a 390px screen behind the shell's
     overflow clip, where no scrollbar gives it away. At lg the pill is exactly
     what it was: 34 tall, one line. */
  const base = 'inline-flex min-h-[34px] items-center justify-center rounded-full px-[20px] py-[7px] text-center font-roboto text-[11px] font-bold uppercase leading-[16.5px] tracking-[0.89px] lg:h-[34px] lg:py-0 lg:whitespace-nowrap'
  return (
    <span className={tone === 'green'
      ? `${base} bg-accent-soft text-accent`
      : `${base} border border-white bg-white/20 text-white`}>
      {children}
    </span>
  )
}

/**
 * Section title — IBM Plex Sans SemiBold 40px, 26/32 on a phone.
 *
 * The mobile figure is the one every mobile frame in BVtf2AOuUOcYbiMIlcKmbC
 * uses — Certifications 6605:2330, Our Services, Industries, all of them — so
 * it is set once here rather than fourteen times in fourteen sections.
 */
export function Title({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-sans text-[26px] font-semibold leading-[32px] text-black lg:text-[40px] lg:leading-[1.18] ${className}`}>
      {children}
    </h2>
  )
}

/** Section lead — Roboto 17.018 / 27.654, #7e7e7e. 15/22 on a phone. */
export function Lead({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-roboto text-[15px] leading-[22px] text-muted lg:text-[17.018px] lg:leading-[27.654px] ${className}`}>
      {children}
    </p>
  )
}

type BtnVariant =
  | 'colored'       // teal fill, white text
  | 'bordered'      // teal outline, teal text
  | 'coloredWhite'  // white fill, teal text  (Figma draws white-on-white — see note)
  | 'white'         // transparent, white text
  | 'whiteFill'     // white fill, teal text, used on dark panels

const BTN: Record<BtnVariant, { box: string; text: string; arrow: string }> = {
  colored:      { box: 'border border-brand bg-brand',       text: 'text-white', arrow: '/images/icons/arrow-white.svg' },
  bordered:     { box: 'border border-brand bg-transparent', text: 'text-brand', arrow: '/images/icons/arrow-teal.svg' },
  coloredWhite: { box: 'bg-white',                            text: 'text-brand', arrow: '/images/icons/arrow-teal.svg' },
  white:        { box: 'bg-transparent',                      text: 'text-white', arrow: '/images/icons/arrow-white.svg' },
  whiteFill:    { box: 'bg-white',                            text: 'text-brand', arrow: '/images/icons/arrow-teal.svg' },
}

/**
 * Figma's button family. Note on `coloredWhite`: the design draws these as
 * white text on a white fill, which is invisible. Rendered with teal text,
 * which is how it reads in the Figma preview.
 */
export function Btn({
  href, children, variant = 'colored', italic = false, className = '', external = false,
}: {
  href: string
  children: React.ReactNode
  variant?: BtnVariant
  italic?: boolean
  className?: string
  external?: boolean
}) {
  const v = BTN[variant]
  const cls = `inline-flex h-[48.05px] items-center gap-[8.008px] rounded-[8px] px-[28.029px] font-roboto text-[15.016px] leading-[22.523px] tracking-[-0.0801px] ${italic ? 'font-light italic' : 'font-medium'} ${v.box} ${v.text} ${className}`
  const inner = (
    <>
      <span className="whitespace-nowrap">{children}</span>
      <Image src={v.arrow} alt="" width={18} height={14} className="h-[14.252px] w-[18.213px] shrink-0" />
    </>
  )
  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
    : <Link href={href} className={cls}>{inner}</Link>
}
