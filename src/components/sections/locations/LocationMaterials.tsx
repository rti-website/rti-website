import Image from 'next/image'
import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { DETAIL_COPY, type Facility } from '@/data/facilities'

/**
 * "What This Location Accepts" — Figma 6744:8796 (Minnesota, six tiles) /
 * 6746:8547 (Wisconsin, four). White, py90, gap 44: a 780px heading block
 * (eyebrow, 36px title, 16px lead) over a row of 196px tiles 20 apart, each
 * #eaf4f5 r12 px20 py24 with a 44px teal r12 icon box and a 14.5px label.
 *
 * The row is centred, so four tiles sit narrower than six without a second
 * layout — the frame itself starts the Wisconsin row at x538 rather than 322
 * for exactly that reason.
 *
 * Icons are the frame's own exports, one per material, white on the teal box
 * — see data/figma-assets.json. They are NOT the teal line-art the service
 * cards use (svc-*.png): those are teal on transparent and cannot be
 * recoloured to white without re-exporting, and the designer drew a different
 * set here.
 *
 * MOBILE — 6751:2591. A two-column grid of 169x107 tiles, 12 apart, icon box
 * 40 with an 18px glyph, label 14; the lead is not drawn.
 */
export function LocationMaterials({ top, height, f }: { top: number; height: number; f: Facility }) {
  return (
    <Section top={top} height={height} label="6744:8796" className="flex flex-col items-center gap-[24px] bg-white px-[20px] py-[44px] lg:gap-[44px] lg:px-0 lg:py-[90px]">
      <div className="flex w-full flex-col items-center gap-[10px] text-center lg:w-[780px]">
        <Eyebrow>{DETAIL_COPY.materials.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[24px] font-semibold leading-[30px] text-black lg:text-[36px] lg:leading-normal">{DETAIL_COPY.materials.heading}</h2>
        <p className="font-roboto text-[16px] leading-normal text-muted max-lg:hidden">{f.materialsLead}</p>
      </div>

      <ul className="grid w-full grid-cols-2 gap-[12px] lg:flex lg:w-auto lg:gap-[20px]">
        {f.materials.map((m) => (
          <li key={m.label} className="flex flex-col gap-[10px] rounded-[12px] bg-[#eaf4f5] px-[16px] py-[20px] lg:w-[196px] lg:gap-[12px] lg:px-[20px] lg:py-[24px]">
            <span className="grid size-[40px] place-items-center rounded-[12px] bg-brand lg:size-[44px]">
              <Image src={m.icon} alt="" width={20} height={20} unoptimized className="size-[18px] lg:size-[20px]" />
            </span>
            <span className="font-sans text-[14px] font-medium leading-[1.3] text-heading lg:text-[14.5px]">{m.label}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
