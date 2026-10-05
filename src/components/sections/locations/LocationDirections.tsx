import Image from 'next/image'
import { Section } from '@/components/design/Frame'
import { mapEmbed, type Facility } from '@/data/facilities'
import { content } from '@/lib/page-content'

/**
 * Map & Directions — Figma 6744:8795 (Minnesota) / 6746:8520 (Wisconsin).
 *
 * #fcfcfc, py70. A 1282px row: a 700x380 map panel on the left, then a
 * 550px column 32 to its right — "Getting
 * Here" at 28px, a 15.5/1.65 paragraph, a #eaf4f5 facts plate (p24, r12,
 * three label/value rows) and two buttons: directions, and a tel: link.
 *
 * A REAL MAP SINCE 23 Sep 2026 — Asim: "we have to add [a] map here". The
 * panel was the frame's illustrative gradient with a drawn pin and an
 * "Illustrative map" tag; it is now Google's map of the street address (see
 * mapEmbed in src/data/facilities.ts), in the same 700x380 r16 box. The pin
 * and the tag went with the gradient — Google draws its own marker. The
 * iframe is lazy, so the map only loads when the section scrolls near.
 * "Get Directions" beside it still opens turn-by-turn in Google Maps.
 *
 * MOBILE — 6751:2575. Map 350x200, then the
 * heading, the SHORT intro, and the two buttons stacked full width. The facts
 * plate is not drawn on the phone and is hidden rather than dropped, so the
 * copy stays in one DOM.
 *
 * The two buttons are plain anchors, not `Btn`: one is a tel: link and the
 * other an off-site https link that must open in a new tab, and Btn's
 * `external` flag would put target=_blank on the phone number too.
 */
const BTN = 'btn-pop inline-flex h-[46px] items-center justify-center gap-[8.008px] rounded-[8px] px-[28.029px] font-roboto text-[15.016px] font-medium leading-[22.523px] tracking-[-0.0801px] transition-colors lg:h-[48.05px]'

export async function LocationDirections({ top, height, f }: { top: number; height: number; f: Facility }) {
  const { DETAIL_COPY } = await content('facilities')
  return (
    <Section top={top} height={height} label="6744:8795" className="flex flex-col items-center bg-[#fcfcfc] px-[20px] py-[44px] lg:px-0 lg:py-[70px]">
      <DirectionsPanel
        heading={DETAIL_COPY.directions.heading}
        primary={DETAIL_COPY.directions.primary}
        secondary={DETAIL_COPY.directions.secondary}
        name={f.name} address={f.address} phone={f.phone} mapsHref={f.mapsHref}
        intro={f.directions.intro} introShort={f.directions.introShort} rows={f.directions.rows}
      />
    </Section>
  )
}

export type DirectionsCopy = {
  heading: string
  intro: string
  introShort: string
  rows: { label: string; value: string }[]
  primary: string
  secondary: string
}

/**
 * The 1282 row without its section, so a flow page can draw it too: the New
 * Berlin center page (7233:9372, "Drop off here", 5 Oct 2026).
 */
export function DirectionsPanel({ heading, intro, introShort, rows, primary, secondary, name, address, phone, mapsHref }: DirectionsCopy & {
  name: string; address: string; phone: string; mapsHref: string
}) {
  const tel = `tel:${phone.replace(/[^+\d]/g, '')}`
  return (
      <div className="flex w-full flex-col gap-[20px] lg:w-[1282px] lg:flex-row lg:items-start lg:gap-[32px]">
        {/* Map panel — 6746:2528 / 6751:2576: Google's map of the address. */}
        <div className="relative h-[200px] w-full shrink-0 overflow-hidden rounded-[16px] bg-[#eaf4f5] lg:h-[380px] lg:w-[700px]">
          <iframe
            src={mapEmbed(address)}
            title={`Map of ${name}, ${address}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0"
          />
        </div>

        {/* Getting here — 6746:2537 */}
        <div className="flex w-full flex-col gap-[16px] lg:w-[550px] lg:gap-[20px]">
          <h2 className="font-sans text-[24px] font-semibold leading-[29px] text-heading max-lg:text-center lg:text-[28px] lg:leading-normal">{heading}</h2>
          <p className="font-roboto text-[15px] leading-[22px] text-muted max-lg:text-center lg:hidden">{introShort}</p>
          <p className="font-roboto text-[15.5px] leading-[1.65] text-muted max-lg:hidden">{intro}</p>

          <dl className="flex flex-col gap-[12px] rounded-[12px] bg-[#eaf4f5] p-[24px] text-[14px] max-lg:hidden">
            {rows.map((r) => (
              <div key={r.label} className="flex h-[20px] items-start justify-between">
                <dt className="font-roboto text-muted">{r.label}</dt>
                <dd className="font-sans font-medium text-heading">{r.value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-[10px] lg:flex-row lg:gap-[14px] lg:pt-[6px]">
            <a href={mapsHref} target="_blank" rel="noopener noreferrer" className={`${BTN} border border-brand bg-brand text-white hover:bg-brand/90`}>
              <span className="whitespace-nowrap">{primary}</span>
              <Image src="/images/icons/arrow-white.svg" alt="" width={18} height={14} className="h-[14.252px] w-[18.213px] shrink-0" />
            </a>
            <a href={tel} className={`${BTN} border border-brand bg-transparent text-brand hover:bg-brand-soft`}>
              <span className="whitespace-nowrap">{secondary}</span>
              <Image src="/images/icons/arrow-teal.svg" alt="" width={18} height={14} className="h-[14.252px] w-[18.213px] shrink-0" />
            </a>
          </div>
        </div>
      </div>
  )
}
