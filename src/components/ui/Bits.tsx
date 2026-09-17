import Image from 'next/image'
import Link from 'next/link'

/* Shared design primitives, values read directly off the Figma nodes. */

/** Pill eyebrow — Figma "Container" + "Text", h34 / px20 / r-full. */
export function Eyebrow({ children, tone = 'green' }: { children: React.ReactNode; tone?: 'green' | 'glass' }) {
  const base = 'inline-flex h-[34px] items-center rounded-full px-[20px] font-roboto text-[11px] font-bold uppercase leading-[16.5px] tracking-[0.89px] whitespace-nowrap'
  return (
    <span className={tone === 'green'
      ? `${base} bg-accent-soft text-accent`
      : `${base} border border-white bg-white/20 text-white`}>
      {children}
    </span>
  )
}

/** Section title — IBM Plex Sans SemiBold 40px. */
export function Title({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-sans text-[40px] font-semibold leading-[1.18] text-black ${className}`}>
      {children}
    </h2>
  )
}

/** Section lead — Roboto 17.018 / 27.654, #7e7e7e. */
export function Lead({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-roboto text-[17.018px] leading-[27.654px] text-muted ${className}`}>
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
