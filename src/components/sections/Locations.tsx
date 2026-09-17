import Image from 'next/image'
import { HOME_BELOW_CERT_SHIFT } from '@/lib/layout'
import { Box, CenterBox, Section } from '@/components/design/Frame'
import { Btn, Eyebrow, Lead, Title } from '@/components/ui/Bits'
import { LOCATION_CARDS } from '@/data/home'
import { href } from '@/lib/urls'

/**
 * Our Strategic National Network — Figma 6024:14077. 1920x1472.
 *
 * This is the section that forced the fixed-canvas approach: the map is a
 * single image with hand-placed pins, cards and connector lines. It cannot be
 * reflowed without a redesign.
 */
const PINS = [
  { x: 897,  y: 544 },
  { x: 1006, y: 585 },
  { x: 918,  y: 624 },
  { x: 890,  y: 683.84 },
]

export function Locations() {
  return (
    <Section top={5117 - HOME_BELOW_CERT_SHIFT} height={1472} label="6024:14077" className="bg-white" overflow="visible">
      <CenterBox y={0} w={400} className="flex justify-center"><Eyebrow>Where We Serve</Eyebrow></CenterBox>
      <CenterBox y={52} w={700}><Title className="text-center">Our Strategic National Network</Title></CenterBox>
      <CenterBox y={130} w={819}>
        <Lead className="text-center">
          Recycle Technologies has licensed facilities in Minnesota, Wisconsin, and Chicago.
          Our mail-in recycling program is available in all 50 states.
        </Lead>
      </CenterBox>
      <CenterBox y={210} w={300} offset={13.78} className="flex justify-center">
        <Btn href={href('/all-locations/')} variant="colored">See all Locations</Btn>
      </CenterBox>

      {/* Map — 6024:14083, 707x804 centred at y301 */}
      <CenterBox y={301} w={707} h={804}>
        <Image src="/images/home/map.png" alt="Recycle Technologies service coverage across the United States" width={707} height={804} className="size-full object-cover" />
      </CenterBox>

      {/* Connector lines — 6044:19104/19106/19037/19092/19094 */}
      <Box x={509} y={629} w={305} h={1} className="bg-[#d6e6de]" />
      <Box x={509} y={503} w={1} h={126} className="bg-[#d6e6de]" />
      <Box x={946} y={636.84} w={300} h={1} className="bg-[#d6e6de]" />
      <Box x={716} y={703} w={177} h={1} className="bg-[#d6e6de]" />
      <Box x={716} y={703} w={1} h={88} className="bg-[#d6e6de]" />

      {/* Pins — 6044:19535 etc */}
      {PINS.map((p, i) => (
        <Box key={i} x={p.x} y={p.y} w={25} h={25}>
          <Image src="/images/icons/map-pin.svg" alt="" width={25} height={25} className="size-full" />
        </Box>
      ))}
      <Box x={816} y={616} w={25} h={25}>
        <Image src="/images/icons/map-dot-outer.svg" alt="" width={25} height={25} className="size-full" />
        <Image src="/images/icons/map-dot-inner.svg" alt="" width={11} height={11} className="absolute left-[7px] top-[7px] size-[10.714px]" />
      </Box>

      {/* Facility cards — 6044:19529 / 6062:21439 / 6062:21443, 278x125 */}
      {LOCATION_CARDS.map((c) => (
        <Box key={c.t} x={c.x} y={c.y} w={278} h={125}
          className="rounded-[8px] bg-white shadow-[0px_0px_20px_0px_#ebebeb,0px_0px_20px_0px_rgba(13,39,80,0.1)]">
          <Image src="/images/icons/pin-card.png" alt="" width={22} height={34} className="absolute left-[18px] top-[24px] h-[34px] w-[22px] object-contain" />
          <p className="absolute left-[55px] top-[23px] w-[160px] font-sans text-[18px] font-semibold leading-[1.25] text-brand">{c.t}</p>
          <p className="absolute left-[55px] top-[58px] w-[209px] font-roboto text-[14px] leading-[22px] text-muted">
            {c.l1}<br />{c.l2}
          </p>
        </Box>
      ))}

      {/* Impact banner — 6044:19121, 1282x243 at x319 y1162 */}
      <Box x={319} y={1162} w={1282} h={243} className="rounded-[20px] bg-brand">
        <p className="absolute left-[57px] top-[35px] font-sans text-[24px] font-bold leading-[31.511px] text-white">
          See Our Impact in Action
        </p>
        <p className="absolute left-[57px] top-[75px] w-[654px] font-inter text-[15.958px] leading-[24.239px] text-white/80">
          Transparency drives everything we do. Dive into our impact reports, brochures,
          whitepapers, newsletters, and industry insights to understand the measurable
          difference we actually make through responsible e-waste recycling
        </p>
        <Box x={57} y={164}>
          <Btn href={href('/blog/')} variant="whiteFill">Download Resources</Btn>
        </Box>
        {/* Brochure art — 6044:19124, 576.695x349.613 at x751 y-37. It breaks
            out of the card top, bottom and right on purpose; that overhang is
            the whole effect, so neither this box nor the card may clip. */}
        <Box x={751} y={-37} w={576.695} h={349.6125}>
          <Image src="/images/home/impact.png" alt="" width={577} height={350} className="size-full" />
        </Box>
      </Box>
    </Section>
  )
}
