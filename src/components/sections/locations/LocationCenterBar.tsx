import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/design/Frame'
import { GLYPHS } from '@/components/ui/Glyph'
import type { Facility } from '@/data/facilities'

/**
 * "Our Wisconsin Recycling Center" — Figma 6744:8794 on the Wisconsin
 * facility frame (Asim, 5 Oct 2026: "we add some new thing so add it in the
 * page").
 *
 * A #f3f3f3 band, py50, holding a 1282 plate like the quick-info bar's
 * (#fcfcfc, 1px #e6e6e6, r16, px36 py28): a 40px #eaf4f5 tile with the pin,
 * a 12px grey eyebrow, the center's name as an 18px teal underlined link, and
 * an Address / Phone line at 14px; on the right the two buttons, "View Center"
 * (teal, the center's page) and "Get Directions" (outlined, Google Maps).
 *
 * MOBILE: no phone frame. The plate stacks, the buttons go full width.
 */
const BTN = 'btn-pop inline-flex h-[46px] items-center justify-center gap-[8.008px] rounded-[8px] px-[28.029px] font-roboto text-[15.016px] font-medium leading-[22.523px] tracking-[-0.0801px] backdrop-blur-[4px] transition-colors lg:h-[48.05px]'

export function LocationCenterBar({ top, height, f }: { top: number; height: number; f: Facility }) {
  const c = f.center
  if (!c) return null
  const tel = `tel:${c.phone.replace(/[^+\d]/g, '')}`
  return (
    <Section top={top} height={height} label="6744:8794" className="flex flex-col items-center bg-[#f3f3f3] px-[20px] py-[32px] lg:px-0 lg:py-[50px]">
      <div className="flex w-full flex-col gap-[20px] rounded-[16px] border border-[#e6e6e6] bg-[#fcfcfc] px-[21px] py-[21px] lg:w-[1282px] lg:flex-row lg:items-center lg:justify-between lg:gap-[24px] lg:px-[36px] lg:py-[28px]">
        <div className="flex items-start gap-[12px] lg:min-w-px lg:flex-1 lg:items-center lg:gap-[14px]">
          <span className="grid size-[38px] shrink-0 place-items-center rounded-[10px] bg-[#eaf4f5] lg:size-[40px]">
            <svg viewBox="0 0 16 16" className="size-[17px] fill-brand lg:size-[18px]" aria-hidden="true"><path d={GLYPHS.pin} /></svg>
          </span>
          <div className="flex min-w-px flex-col gap-[2px] leading-normal">
            <p className="font-roboto text-[12px] text-muted">{c.eyebrow}</p>
            <Link href={c.href} className="font-sans text-[17px] font-medium text-brand underline decoration-from-font underline-offset-2 hover:text-brand/80 lg:text-[18px]">
              {c.name}
            </Link>
            <div className="flex flex-col gap-[4px] text-[14px] lg:flex-row lg:gap-[22px]">
              <p className="flex flex-wrap gap-x-[10px]">
                <span className="font-roboto text-muted">{c.addressLabel}</span>
                <span className="font-sans font-medium text-heading">{c.address}</span>
              </p>
              <p className="flex gap-[10px]">
                <span className="font-roboto text-muted">{c.phoneLabel}</span>
                <a href={tel} className="font-sans font-medium text-heading hover:text-brand">{c.phone}</a>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[10px] lg:shrink-0 lg:flex-row lg:gap-[14px] lg:pt-[6px]">
          <Link href={c.href} className={`${BTN} border border-brand bg-brand text-white hover:bg-brand/90`}>
            <span className="whitespace-nowrap">{c.primary}</span>
            <Image src="/images/icons/arrow-white.svg" alt="" width={18} height={14} className="h-[14.252px] w-[18.213px] shrink-0" />
          </Link>
          <a href={f.mapsHref} target="_blank" rel="noopener noreferrer" className={`${BTN} border border-brand bg-transparent text-brand hover:bg-brand-soft`}>
            <span className="whitespace-nowrap">{c.secondary}</span>
            <Image src="/images/icons/arrow-teal.svg" alt="" width={18} height={14} className="h-[14.252px] w-[18.213px] shrink-0" />
          </a>
        </div>
      </div>
    </Section>
  )
}
