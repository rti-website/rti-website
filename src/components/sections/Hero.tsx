import Image from 'next/image'
import { Box, Section } from '@/components/design/Frame'
import { Btn } from '@/components/ui/Bits'
import { href } from '@/lib/urls'
import { HERO_H } from '@/lib/layout'
import { Picker } from '@/components/client/Picker'

/**
 * Hero — Figma 6023:13152, 1920x940.
 * Layers bottom-to-top: #0b1f3a base, photo at 55%, green wash L→R,
 * navy wash bottom→top, then content.
 *
 * THE PHOTO — two traps, both hit once:
 *
 * 1. Figma's photo frame (6023:13153) stacks two images: a dark data-centre
 *    corridor, and over it an opaque e-waste photo (6107:2803) that covers the
 *    frame completely. Exporting the FRAME id returns the hidden corridor shot.
 *    hero.png must be exported from 6107:2803.
 *
 * 2. That export comes back 1920x940 — node clipped to the hero frame — and
 *    Figma bakes the frame's 55% opacity AND the #0b1f3a base into the pixels.
 *    Proof: the darkest pixel in the file is exactly (5,14,26) = 0.45 x #0b1f3a.
 *    So the file IS the finished photo layer and is drawn at FULL opacity here.
 *    Re-applying opacity-55 in CSS dims it a second time and the whole section
 *    reads as a flat dark gradient instead of a photograph.
 *
 * If this ever looks like a gradient again, check those two things before
 * touching the two wash layers below — both of them are real Figma layers.
 *
 * The file is hero-photo.png, not hero.png, because Next's image optimizer
 * caches by URL: replacing the bytes under a path it has already optimized
 * keeps serving the old picture until .next is cleared. A new name is a new
 * cache key. public/images/home/hero.png is the dead corridor shot and can be
 * deleted.
 */
const STATS = [
  { v: '30+ Years', l: 'Of recycling experience' },
  { v: '50 States', l: 'Accessible through our Mail-In Program' },
  { v: 'R2v3 Certified Locations', l: 'Minnesota. Wisconsin' },
]

export function Hero() {
  return (
    <Section top={140} height={HERO_H} label="6023:13152" className="bg-navy">
      {/* Photo — 6023:13153 flattened, full-bleed, full opacity. See note above. */}
      <Box x={0} y={0} w={1920} h={HERO_H}>
        <Image src="/images/home/hero-photo.png" alt="" fill priority sizes="1920px" className="object-cover" />
      </Box>
      {/* Green wash — 6023:13154 */}
      <Box x={0} y={0} w={1920} h={974.39}
        style={{ backgroundImage: 'linear-gradient(90deg, rgba(27,122,61,0.639) 0%, rgba(27,122,61,0) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)' }} />
      {/* Navy wash — 6023:13155 */}
      <Box x={0} y={0} w={1920} h={HERO_H}
        style={{ backgroundImage: 'linear-gradient(0deg, rgba(11,31,58,0.6) 0%, rgba(11,31,58,0) 50%, rgba(0,0,0,0) 100%)' }} />

      {/* The "Responsible Recycling & ITAD" pill (6062:21416, x323 y119) was
          removed on Asim's instruction, 16 Sep 2026, and everything below it
          moved up into the space it left so the hero reads full rather than
          top-padded. */}

      {/* H1 — 6023:13162. Figma centres the text box on y=276.5; three lines at
          74.7px is 224.1 tall, so the top edge is 276.5 - 112 = 164.4. Using
          the centre value as a top offset was what pushed the headline down
          into the paragraph. */}
      {/* H1 — 6023:13162. Two lines, not three: Asim, 16 Sep 2026. The break
          is explicit because the line has to clear the quote card at x1203, and
          the size is set by that same limit — 844px of room between the 319
          gutter and the card. */}
      <Box x={319} y={88} w={860}>
        <h1 className="font-sans text-[46px] font-semibold leading-[54px] tracking-[-1.8px] text-white">
          Recycle Responsibly. Protect the Planet.<br />Build a Cleaner Tomorrow.
        </h1>
      </Box>

      {/* Lead — 6023:13164, moved up with the headline. */}
      <Box x={319} y={228} w={688}>
        <p className="font-roboto text-[18px] leading-[27px] text-white/70">
          Recycle Technologies provides certified e-waste recycling, destruction, and
          shredding solutions that keeps electronics out of landfills and valuable
          materials in circulation.
        </p>
      </Box>

      {/* Location picker — 6199:4848, moved up with the headline. 393x50. */}
      <Box x={319} y={337} w={393} h={50}>
        <Picker id="hero-location" placeholder="Select Your Location" srLabel="Select your location"
          options={['Minnesota', 'Wisconsin', 'Nationwide (Mail-In)']} />
      </Box>

      {/* Get Started — 6032:16992, moved up with the headline. */}
      <Box x={724} y={337}><Btn href={href('/quote/')} variant="colored">Get Started</Btn></Box>

      {/* Glass quote card — 6098:518, moved up with the headline. w398. */}
      <Box x={1203} y={88} w={398}>
        {/* Padding and gaps are tighter than Figma's on purpose. This card is the
            tallest thing in the band, so its height is what sets how far down the
            stats strip has to sit — at the drawn 457 it left a 190px hole under
            the left column's buttons. Trimmed to ~405, which pulls the strip up
            without stretching the column. */}
          <div className="rounded-[24px] border border-white/20 bg-white/10 p-[28px] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] backdrop-blur-[40px]">
          <p className="text-center font-sans text-[22px] font-medium leading-[32px] text-white">
            What Do You Want to Recycle?
          </p>
          <p className="pt-[8px] text-center font-inter text-[14px] leading-[20px] text-white/60">
            Let&rsquo;s do it quickly!
          </p>

          <div className="flex flex-col gap-[16px] pt-[24px]">
            <div>
              <label htmlFor="hero-service" className="block pb-[8px] font-inter text-[14px] font-medium leading-[20px] text-white/70">
                Pick Your Service
              </label>
              <div className="h-[50px]">
                <Picker id="hero-service" placeholder="Select Service" srLabel="Pick your service" options={[
                  'Electronics Recycling', 'Battery Recycling', 'Light Bulb & Ballast Recycling',
                  'TV Recycling', 'Airbag Recycling', 'Paper Shredding', 'Hard Drive Destruction',
                  'Mobile Shredding', 'Off-Site Shredding', 'IT Asset Disposition (ITAD)',
                ]} />
              </div>
            </div>
            <Btn href={href('/quote/')} variant="whiteFill" className="w-full justify-center font-bold">
              Get a Quote
            </Btn>
          </div>

          <div className="py-[20px]">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          <Btn href={href('/services/')} variant="white" italic className="w-full justify-center">
            See all Services
          </Btn>
        </div>
      </Box>

      {/* Stats strip — 6023:13173, lifted off the bottom of the band so the
          figures are on screen when the page opens. Asim, 16 Sep 2026.
          
          The gap above it is set by the QUOTE CARD, not by the left column: the
          card is 457 tall against the column's ~290, so the card is what holds
          the strip down. The block below moved as far down as the card's 26px
          clearance allows, and the column's own spacing was eased out to bring
          its buttons closer to the strip. Moving everything down together does
          nothing — the strip moves with it. */}
      <Box x={319} y={519} w={1281.335} className="flex border-t-[1.001px] border-white/40 pt-[10px]">
        {STATS.map((s, i) => (
          <div key={s.v} className={`flex-1 px-[28.029px] py-[20.021px] ${i < 2 ? 'border-r-[1.001px] border-white/40' : ''}`}>
            <p className="whitespace-nowrap font-sans text-[38.04px] font-semibold leading-[38.04px] tracking-[-1.1512px] text-white">{s.v}</p>
            <p className="pt-[4.004px] font-roboto text-[14px] font-medium leading-[19.52px] tracking-[-0.0801px] text-white/80">{s.l}</p>
          </div>
        ))}
      </Box>
    </Section>
  )
}
