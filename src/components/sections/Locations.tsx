import Image from 'next/image'
import { HOME_BELOW_SERVICES_SHIFT } from '@/lib/layout'
import { Box, CenterBox, Section } from '@/components/design/Frame'
import { Btn, Eyebrow, Lead, Title } from '@/components/ui/Bits'
import { LOCATION_CARDS } from '@/data/home'
import { href } from '@/lib/urls'

/**
 * Our Strategic National Network — Figma 6024:14077. 1920x1472.
 * Mobile frame 6609:5070 (390x1562), BVtf2AOuUOcYbiMIlcKmbC.
 *
 * This is the section that forced the fixed-canvas approach: the map is a
 * single image with hand-placed pins, cards and connector lines. It cannot be
 * reflowed without a redesign.
 *
 * So below lg it is not reflowed — it is taken apart, the way the mobile frame
 * takes it apart. The map becomes a plain responsive picture with nothing
 * pinned to it, the pins and connector rules go away (`hidden lg:block` — they
 * are decoration that means nothing once they point at a resized map), and the
 * three facility cards, which on the board are hung off the map at hand-picked
 * coordinates, stack as an ordinary 16px-gap list. Nothing is duplicated and no
 * card copy is dropped: all three still carry their descriptor and their city
 * at 390.
 */
const PINS = [
  { x: 897,  y: 544 },
  { x: 1006, y: 585 },
  { x: 918,  y: 624 },
  { x: 890,  y: 683.84 },
]

export function Locations() {
  return (
    <Section
      top={5117 - HOME_BELOW_SERVICES_SHIFT}
      height={1472}
      label="6024:14077"
      overflow="visible"
      /* Mobile 6609:5070: flex column, gap 24, px 20 / py 48 on white.
         Every child either is a CenterBox (already width:100% below lg) or
         centres its own contents, so the default items-stretch is what the
         frame's items-center draws. */
      className="flex flex-col gap-[24px] bg-white px-[20px] py-[48px] lg:block lg:gap-0 lg:p-0"
    >
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

      {/* Map — 6024:14083, 707x804 centred at y301. Mobile 6609:5079 keeps it,
          as a rounded 16px card with the map inside and nothing on top of it.

          The frame's card is 260 tall around a landscape export we do not have
          ("Frame 827 1", 350x260). Forcing our 707x804 portrait map.png into a
          260px band with object-cover would crop the country to a horizontal
          strip, so the radius and the clip are taken from the frame and the
          height is left to the picture's own aspect (350x398 at 390). Flagged —
          if the 260px band matters, Aqeel needs to export that crop.

          `max-lg:` rather than a `lg:` reset for the geometry: `.design-center`
          sets width/height from the Figma custom properties inside its own
          media query, so a mobile-only height must simply not exist at lg. */}
      <CenterBox y={301} w={707} h={804} className="max-lg:overflow-hidden max-lg:rounded-[16px]">
        <Image src="/images/home/map.png" alt="Recycle Technologies service coverage across the United States" width={707} height={804} className="size-full object-cover max-lg:h-auto" />
      </CenterBox>

      {/* Connector lines — 6044:19104/19106/19037/19092/19094.
          Hairlines drawn between the map and the cards' board positions. Once
          the cards are a stacked list they connect nothing, and the mobile
          frame has none of them. */}
      <Box x={509} y={629} w={305} h={1} className="hidden bg-[#d6e6de] lg:block" />
      <Box x={509} y={503} w={1} h={126} className="hidden bg-[#d6e6de] lg:block" />
      <Box x={946} y={636.84} w={300} h={1} className="hidden bg-[#d6e6de] lg:block" />
      <Box x={716} y={703} w={177} h={1} className="hidden bg-[#d6e6de] lg:block" />
      <Box x={716} y={703} w={1} h={88} className="hidden bg-[#d6e6de] lg:block" />

      {/* Pins — 6044:19535 etc. Placed against the 707x804 map at board scale;
          there is no honest position for them once the map resizes, so they are
          desktop-only, as the mobile frame draws it. */}
      {PINS.map((p, i) => (
        <Box key={i} x={p.x} y={p.y} w={25} h={25} className="hidden lg:block">
          <Image src="/images/icons/map-pin.svg" alt="" width={25} height={25} className="size-full" />
        </Box>
      ))}
      <Box x={816} y={616} w={25} h={25} className="hidden lg:block">
        <Image src="/images/icons/map-dot-outer.svg" alt="" width={25} height={25} className="size-full" />
        <Image src="/images/icons/map-dot-inner.svg" alt="" width={11} height={11} className="absolute left-[7px] top-[7px] size-[10.714px]" />
      </Box>

      {/* Facility cards — 6044:19529 / 6062:21439 / 6062:21443, 278x125.
          Mobile 6610:2332: a 16px-gap stack of full-width rows, pin left and
          text right. The stack sits 16px apart, not the section's 24px, hence
          the wrapper — `lg:contents` makes it generate no box at lg, so each
          Box still resolves its absolute position against the Section. */}
      <div className="flex w-full flex-col gap-[16px] lg:contents">
        {LOCATION_CARDS.map((c) => (
          <Box key={c.t} x={c.x} y={c.y} w={278} h={125}
            className="flex items-center gap-[16px] rounded-[8px] bg-white p-[20px] shadow-[0px_4px_12px_0px_rgba(13,39,80,0.12)] lg:block lg:p-0 lg:shadow-[0px_0px_20px_0px_#ebebeb,0px_0px_20px_0px_rgba(13,39,80,0.1)]">
            <Image src="/images/icons/pin-card.png" alt="" width={22} height={34}
              className="h-[34px] w-[22px] shrink-0 object-contain lg:absolute lg:left-[18px] lg:top-[24px]" />
            {/* Same `lg:contents` trick: a flow column on the phone, and at lg
                the two paragraphs go back to being absolutely placed inside the
                card, at the coordinates they have always had. */}
            <div className="flex min-w-0 flex-1 flex-col gap-[6px] lg:contents">
              <p className="font-sans text-[17px] font-semibold leading-[1.25] text-brand lg:absolute lg:left-[55px] lg:top-[23px] lg:w-[160px] lg:text-[18px]">{c.t}</p>
              <p className="font-roboto text-[14px] leading-[20px] text-muted lg:absolute lg:left-[55px] lg:top-[58px] lg:w-[209px] lg:leading-[22px]">
                {c.l1}<br />{c.l2}
              </p>
            </div>
          </Box>
        ))}
      </div>

      {/* Impact banner — 6044:19121, 1282x243 at x319 y1162.
          Mobile 6610:5062: a 20px-gap column, px24 / py32, with the brochure
          art last, in flow, at the full width of the card. */}
      <Box x={319} y={1162} w={1282} h={243}
        className="flex flex-col gap-[20px] rounded-[20px] bg-brand px-[24px] py-[32px] max-lg:overflow-hidden lg:block lg:gap-0 lg:p-0">
        <p className="font-sans text-[22px] font-bold leading-[28px] text-white lg:absolute lg:left-[57px] lg:top-[35px] lg:text-[24px] lg:leading-[31.511px]">
          See Our Impact in Action
        </p>
        <p className="font-inter text-[15px] leading-[22px] text-white/80 lg:absolute lg:left-[57px] lg:top-[75px] lg:w-[654px] lg:text-[15.958px] lg:leading-[24.239px]">
          Transparency drives everything we do. Dive into our impact reports, brochures,
          whitepapers, newsletters, and industry insights to understand the measurable
          difference we actually make through responsible e-waste recycling
        </p>
        <Box x={57} y={164}>
          <Btn href={href('/blog/')} variant="whiteFill" className="w-full justify-center lg:w-auto lg:justify-start">Download Resources</Btn>
        </Box>
        {/* Brochure art — 6557:12912, a 566x309 clip at x772 y-22 holding the
            image at 110.91% of its height, top-aligned. It breaks out of the
            card top, bottom and right on purpose; that overhang is the whole
            effect, so the card must not clip.
            The art is the RTI-branded report mock-up (Asim, 21 Sep 2026;
            Figma carried a competitor's cover before). Its teal plate is the
            brand teal and it is transparent elsewhere, so the plate reads as
            the card itself — including the rounded corner it adds past the
            card's right edge, exactly as the frame draws it.

            On the phone there is nothing to break out of: 6593:5945 puts the
            art in flow at 302x165, the full content width of the card, and the
            card clips (hence `max-lg:overflow-hidden` above, which must not
            reach the desktop or the overhang is cut off). The 110.91% crop is
            the same at both sizes. */}
        <Box x={772} y={-22} w={566} h={309} className="overflow-hidden max-lg:h-[165px]">
          <Image src="/images/home/impact.webp" alt="" width={1132} height={685} className="h-[110.91%] w-full max-w-none object-cover object-top" />
        </Box>
      </Box>
    </Section>
  )
}
