import Image from 'next/image'
import { HOME_BELOW_SERVICES_SHIFT } from '@/lib/layout'
import { Box, Section } from '@/components/design/Frame'
import { Btn } from '@/components/ui/Bits'
import { QUOTE_HREF, href } from '@/lib/urls'

/**
 * Why Choose Recycle Technologies — Figma 6065:21652. 1280x532 at x320, r40.
 * Mobile frame 6609:2326 (390x916), BVtf2AOuUOcYbiMIlcKmbC.
 *
 * The four stat cards. The frame repeats "92% / Diversion Rate" in all four —
 * one real number and three copies of it — and Asim supplied the real set on
 * 21 Sep 2026, in this order. They are claims about the business, so Rizwan
 * should check them against the impact report before launch; the frame's 92%
 * and this 95% cannot both be the diversion rate.
 *
 * The mobile frame repeats the same placeholder (92% four times, star icons
 * back above each figure). It is the SAME stale draw as the desktop frame, not
 * new direction, so the real figures and the starless cards stand.
 *
 * 25 Sep 2026 (Asim): two cards now carry the same figures, in the same
 * words, as the impact strip under Our Services (IMPACT_STATS in
 * src/data/home.ts): "5,000+ Tons / E-Waste Processed" became "18M+ / Lbs of
 * E-Waste Recycled", and "100,000+ / Devices Securely Destroyed" became
 * "2.3M+ / Devices Destroyed". One set of numbers on the page, not two.
 */
const STATS = [
  { x: 0,      y: 0,     v: '18M+',   l: 'Lbs of E-Waste Recycled' },
  { x: 288.94, y: 0,     v: '95%',    l: 'Diversion Rate' },
  { x: 0,      y: 177.4, v: '1,500+', l: 'Businesses Served' },
  { x: 288.94, y: 177.4, v: '2.3M+',  l: 'Devices Destroyed' },
]

export function WhyChooseUs() {
  return (
    <Section
      top={4435 - HOME_BELOW_SERVICES_SHIFT}
      left={320}
      width={1280}
      height={532}
      label="6065:21652"
      /* Mobile 6609:2326: navy plate, flex column, gap 24, px 20 / py 48, and
         square corners because it runs full bleed at 390. */
      className="flex flex-col gap-[24px] rounded-none bg-navy px-[20px] py-[48px] lg:block lg:gap-0 lg:rounded-[40px] lg:bg-transparent lg:p-0"
    >
      {/* The three stacked full-bleed layers. `fill` is what keeps them covering
          the section below lg — in flow a wrapper around an <Image fill> is zero
          tall and the photo is simply not there.

          The mobile frame draws only the photo, on a flat navy plate, with no
          tint and no green wash. Both are kept: white body copy over a bare
          object-cover crop of why-bg.png has no contrast guarantee at 390, and
          dropping them would change what the section ships rather than how it
          reflows. Flagged for Aqeel. */}
      <Box x={0} y={0} w={1280} h={532} fill>
        <Image src="/images/home/why-bg.png" alt="" fill sizes="(width < 64rem) 100vw, 1280px" className="object-cover" />
      </Box>
      <Box x={0} y={0} w={1280} h={532} fill className="bg-[rgba(8,46,83,0.75)]" />
      <Box x={0} y={0} w={1280} h={532} fill
        style={{ backgroundImage: 'linear-gradient(90deg, rgba(27,122,61,0.639) 0%, rgba(27,122,61,0) 50%, rgba(0,0,0,0) 100%)' }} />

      <Box x={56} y={37} w={501}>
        <h2 className="font-sans text-[26px] font-semibold leading-[32px] text-white max-lg:text-center lg:text-[40px] lg:leading-[44.7px]">
          Why Choose<br />Recycle Technologies?
        </h2>
      </Box>

      {/* Copy: Asim, 23 Sep 2026 — Chicago is "expanded operations", no
          longer listed with the R2v3 facilities.

          591 wide, not the frame's 571. The new first paragraph is ~20
          characters longer and landed exactly on a line break at 571: five
          lines at some browser widths and six at others (Chrome lays zoomed
          text out a hair wider), and six left 0.5px above the buttons. 591
          keeps it five everywhere and still clears the stat grid at x667 by
          20px. */}
      <Box x={56} y={146} w={591}>
        <p className="font-roboto text-[15px] leading-[22px] text-white/80 lg:text-[17.018px] lg:leading-[27.654px]">
          With over 30 years of experience, Recycle Technologies provides responsible
          electronics recycling, IT asset recycling, and document shredding across the
          Midwest. We are the region&rsquo;s only minority-owned document destruction and
          recycling company, backed by R2v3-certified facilities in Minnesota and Wisconsin
          with expanded operations in Chicago.
        </p>
        <p className="pt-[22px] font-roboto text-[15px] leading-[22px] text-white/80 lg:pt-[27.654px] lg:text-[17.018px] lg:leading-[27.654px]">
          Our convenient local and nationwide mail-in recycling options make electronics
          recycling near you simple, secure, and environmentally responsible.
        </p>
      </Box>

      {/* CTAs — 6609:2329. The two buttons sit 12px apart on the phone, not the
          section's 24px, so they need a wrapper of their own. `lg:contents`
          makes that wrapper generate no box at lg, which leaves each Box
          resolving its absolute position against the Section exactly as before. */}
      <div className="flex w-full flex-col gap-[12px] lg:contents">
        <Box x={56} y={423}>
          <Btn href={QUOTE_HREF} variant="whiteFill" className="w-full justify-center lg:w-[210px]">Get a Free Estimate</Btn>
        </Box>
        <Box x={272} y={424}>
          <Btn href={href('/about-us-commercial-recycling-solutions/')} variant="white" className="w-full lg:w-auto">Read More About Us</Btn>
        </Box>
      </div>

      {/* Stat grid — 6065:21680 at x667, vertically centred, 563x343.9.
          Mobile 6609:5051: two rows of two, 12px gaps, cards 150 tall.
          The cards were hand-placed `absolute` divs; below lg the grid does the
          placing and the inline left/top are inert on a grid item, so they stay
          as the record of the Figma coordinates. */}
      <Box x={667} y={94} w={563} h={343.908} className="grid grid-cols-2 gap-[12px] lg:block lg:gap-0">
        {STATS.map((s, i) => (
          <div
            key={i}
            className="flex min-h-[150px] flex-col items-center justify-center gap-[6px] rounded-[12.747px] border-[1.062px] border-white/40 bg-white/10 px-[8px] lg:absolute lg:h-[166.51px] lg:w-[274.064px] lg:px-0"
            style={{ left: s.x, top: s.y }}
          >
            {/* The frame puts a star above each figure. Asim took it out on
                21 Sep 2026 — four identical stars say nothing the numbers do
                not — and the figure grew into the room it left: 23.37 -> 30,
                with line-height and tracking scaled by the same 1.284 so the
                type keeps its proportions instead of just getting taller.
                justify-center was already here, so with the star gone the
                number and its label centre themselves in the card.

                The mobile frame redraws the star, so it also redraws the
                pre-Asim 23.37. That figure is kept at 390 for a reason the
                desktop did not have: a half-width card is ~169 wide, and
                the old "5,000+ Tons" at 30px did not fit across it. min-h rather than
                h on the card so a figure that does wrap stays centred instead
                of spilling. */}
            <p className="font-sans text-[23.37px] font-bold leading-[35.055px] tracking-[-0.4674px] text-white lg:text-[30px] lg:leading-[45px] lg:tracking-[-0.6px]">{s.v}</p>
            <p className="text-center font-roboto text-[11.685px] leading-[14.606px] text-white">{s.l}</p>
          </div>
        ))}
      </Box>
    </Section>
  )
}
