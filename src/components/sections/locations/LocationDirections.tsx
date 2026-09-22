import Image from 'next/image'
import { Section } from '@/components/design/Frame'
import { DETAIL_COPY, type Facility } from '@/data/facilities'

/**
 * Map & Directions — Figma 6744:8795 (Minnesota) / 6746:8520 (Wisconsin).
 *
 * #fcfcfc, py70. A 1282px row: a 700x380 map panel on the left (the same
 * illustrative gradient as the hub, one pin dead centre with a label pill and
 * the note tag top-left), then a 550px column 32 to its right — "Getting
 * Here" at 28px, a 15.5/1.65 paragraph, a #eaf4f5 facts plate (p24, r12,
 * three label/value rows) and two buttons: directions, and a tel: link.
 *
 * THE MAP IS NOT A MAP, for the same reason as the hub's — see
 * LocationsFinder. The button beside it IS real: it opens Google Maps
 * directions to the street address, in a new tab. So the caption's promise
 * ("tap Get Directions for turn-by-turn navigation") is kept.
 *
 * MOBILE — 6751:2575. Map 350x200 with the pin only (no note tag), then the
 * heading, the SHORT intro, and the two buttons stacked full width. The facts
 * plate is not drawn on the phone and is hidden rather than dropped, so the
 * copy stays in one DOM.
 *
 * The two buttons are plain anchors, not `Btn`: one is a tel: link and the
 * other an off-site https link that must open in a new tab, and Btn's
 * `external` flag would put target=_blank on the phone number too.
 */
const PIN_40 = 'M20 2a12 12 0 0 0-12 12c0 8.7 10.8 21.3 11.3 21.8a1 1 0 0 0 1.4 0C21.2 35.3 32 22.7 32 14A12 12 0 0 0 20 2Zm0 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z'
const BTN = 'inline-flex h-[46px] items-center justify-center gap-[8.008px] rounded-[8px] px-[28.029px] font-roboto text-[15.016px] font-medium leading-[22.523px] tracking-[-0.0801px] transition-colors lg:h-[48.05px]'

export function LocationDirections({ top, height, f }: { top: number; height: number; f: Facility }) {
  const tel = `tel:${f.phone.replace(/[^+\d]/g, '')}`
  return (
    <Section top={top} height={height} label="6744:8795" className="flex flex-col items-center bg-[#fcfcfc] px-[20px] py-[44px] lg:px-0 lg:py-[70px]">
      <div className="flex w-full flex-col gap-[20px] lg:w-[1282px] lg:flex-row lg:items-start lg:gap-[32px]">
        {/* Map panel — 6746:2528 / 6751:2576 */}
        <div
          className="relative h-[200px] w-full shrink-0 overflow-hidden rounded-[16px] lg:h-[380px] lg:w-[700px]"
          style={{ backgroundImage: 'linear-gradient(128.29deg, #eaf4f5 10%, #d8eef0 90%)' }}
        >
          <p className="absolute left-[24px] top-[24px] flex h-[32px] items-center rounded-[8px] bg-white/85 px-[14px] font-roboto text-[12.5px] text-muted max-lg:hidden">
            {DETAIL_COPY.directions.mapNote}
          </p>
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[8px]">
            <svg viewBox="0 0 40 40" className="size-[34px] fill-brand drop-shadow-[0px_2px_4px_rgba(0,0,0,0.18)] lg:size-[40px]" aria-hidden="true">
              <path d={PIN_40} />
            </svg>
            <span className="flex h-[28px] items-center whitespace-nowrap rounded-full bg-white px-[12px] font-sans text-[13px] font-medium text-heading shadow-[0px_2px_6px_0px_rgba(0,0,0,0.12)] lg:h-[32px] lg:px-[14px]">
              {f.mapLabel}
            </span>
          </div>
        </div>

        {/* Getting here — 6746:2537 */}
        <div className="flex w-full flex-col gap-[16px] lg:w-[550px] lg:gap-[20px]">
          <h2 className="font-sans text-[24px] font-semibold leading-[29px] text-heading lg:text-[28px] lg:leading-normal">{DETAIL_COPY.directions.heading}</h2>
          <p className="font-roboto text-[15px] leading-[22px] text-muted lg:hidden">{f.directions.introShort}</p>
          <p className="font-roboto text-[15.5px] leading-[1.65] text-muted max-lg:hidden">{f.directions.intro}</p>

          <dl className="flex flex-col gap-[12px] rounded-[12px] bg-[#eaf4f5] p-[24px] text-[14px] max-lg:hidden">
            {f.directions.rows.map((r) => (
              <div key={r.label} className="flex h-[20px] items-start justify-between">
                <dt className="font-roboto text-muted">{r.label}</dt>
                <dd className="font-sans font-medium text-heading">{r.value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-[10px] lg:flex-row lg:gap-[14px] lg:pt-[6px]">
            <a href={f.mapsHref} target="_blank" rel="noopener noreferrer" className={`${BTN} border border-brand bg-brand text-white hover:bg-brand/90`}>
              <span className="whitespace-nowrap">{DETAIL_COPY.directions.primary}</span>
              <Image src="/images/icons/arrow-white.svg" alt="" width={18} height={14} className="h-[14.252px] w-[18.213px] shrink-0" />
            </a>
            <a href={tel} className={`${BTN} border border-brand bg-transparent text-brand hover:bg-brand-soft`}>
              <span className="whitespace-nowrap">{DETAIL_COPY.directions.secondary}</span>
              <Image src="/images/icons/arrow-teal.svg" alt="" width={18} height={14} className="h-[14.252px] w-[18.213px] shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}
