import Image from 'next/image'
import { Box, Section } from '@/components/design/Frame'
import { Btn, Eyebrow } from '@/components/ui/Bits'
import { QUOTE_HREF, href } from '@/lib/urls'
import { HERO_H } from '@/lib/layout'
import { Picker } from '@/components/client/Picker'
import { R2_DIRECTORY } from '@/data/certifications'

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
/**
 * Three tiles, exactly as Figma 6023:13173 draws them — Asim, 22 Sep 2026:
 * "see the home hero section, we have to make the numbers like this".
 *
 * ICON TILES AND ORDER, 23 Sep 2026 — Asim: "we have to make the hero sec
 * like this", with a screenshot of the frame's new strip. The designer gave
 * each figure a 64x66 glass tile (white/30, r10) holding its icon, and the
 * row now reads R2v3 · 50 States · 30+ Years, left to right — the reverse of
 * what was built. The phone frame (6604:5043) got the same tiles at 43px.
 *
 * Icons: all three are the frame's own fills, in data/figma-assets.json as
 * stat-r2.png, stat-pin.png and stat-years.png (nodes 6778:10432 / 10452 /
 * 10455) — run `node scripts/fetch-figma-assets.mjs --missing` to pull them.
 * Not the certifications strip's certs/1.png for the R2v3 mark: that export
 * sits on an opaque white ground, which reads as a white square on the glass.
 *
 * `board` / `phone` are each icon's drawn size in that frame.
 *
 * HISTORY, because this row has gone back and forth:
 *   - built as the frame's three tiles
 *   - 21 Sep: Asim asked for a locations tile back, so it ran FOUR — "3
 *     Locations / Minnesota. Wisconsin. Chicago" and "R2v3 Certified /
 *     Recycling" as separate claims
 *   - 22 Sep: Asim pointed at the frame and asked for it as drawn. Three.
 *   - 23 Sep: icon tiles and the frame's order.
 *
 * !! TWO FACTS TO KNOW ABOUT THE R2v3 TILE, both flagged to Asim 22 Sep:
 *   1. It drops Chicago, which "Where We Serve" further down this same page
 *      still names. That was the reason for the 21 Sep change.
 *   2. It says "R2v3 Certified Locations" over "Minnesota. Wisconsin". The
 *      site's own copy (src/data/industries.ts CERTIFICATIONS_BODY, and the
 *      FAQ on every industry page) says the New Berlin, Wisconsin facility is
 *      PURSUING R2v3 and is PENDING. Only Blaine, Minnesota holds it. So as
 *      drawn, this tile claims a certification for a facility that does not
 *      have it yet, on the first screen of the homepage, and the R2v3 badge
 *      lower down links to SERI's directory where anyone can check.
 *      The fix is one word in the label; it is Asim's word to choose.
 */
/*
 * The R2v3 tile is a link — Asim, 23 Sep 2026: "also make the r2v3 clickable".
 * It goes where every other R2v3 mark on the site goes: SERI's directory entry
 * (R2_DIRECTORY, shared with the certifications strip and the footer), in a
 * new tab. The whole tile is the link, icon and text together.
 */
type Stat = { v: string; l: string; icon: string; href?: string; board: { w: number; h: number }; phone: { w: number; h: number } }

const STATS: Stat[] = [
  { v: 'R2v3 Certified Locations', l: 'Minnesota. Wisconsin', icon: '/images/home/stat-r2.png', href: R2_DIRECTORY,
    board: { w: 44.602, h: 46.46 }, phone: { w: 27, h: 28 } },
  { v: '50 States', l: 'Accessible through our Mail-In Program', icon: '/images/home/stat-pin.png',
    board: { w: 31, h: 46 }, phone: { w: 19, h: 28 } },
  { v: '30+ Years', l: 'Of recycling experience', icon: '/images/home/stat-years.png',
    board: { w: 42, h: 42 }, phone: { w: 25.496, h: 25.63 } },
]

export function Hero() {
  return (
    <Section
      top={140} height={HERO_H} label="6023:13152"
      className="flex flex-col gap-[20px] bg-navy px-[20px] pb-[32px] pt-[40px] lg:block lg:p-0"
    >
      {/* Photo — 6023:13153 flattened, full-bleed, full opacity. See note above. */}
      <Box x={0} y={0} w={1920} h={HERO_H} fill>
        <Image src="/images/home/hero-photo.png" alt="" fill priority sizes="(width < 64rem) 100vw, 1920px" className="object-cover" />
      </Box>
      {/* Green wash — 6023:13154 */}
      <Box x={0} y={0} w={1920} h={974.39} fill
        style={{ backgroundImage: 'linear-gradient(90deg, rgba(27,122,61,0.639) 0%, rgba(27,122,61,0) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)' }} />
      {/* Navy wash — 6023:13155 */}
      <Box x={0} y={0} w={1920} h={HERO_H} fill
        style={{ backgroundImage: 'linear-gradient(0deg, rgba(11,31,58,0.6) 0%, rgba(11,31,58,0) 50%, rgba(0,0,0,0) 100%)' }} />

      {/* The "Responsible Recycling & ITAD" pill (6062:21416, x323 y119) was
          removed from the DESKTOP hero on Asim's instruction, 16 Sep 2026, and
          everything below it moved up into the space it left.

          The mobile frame (6590:2309) draws it, so it is here and hidden at lg.
          That leaves one line of copy on the phone that is not on the desktop —
          deliberate, and worth a second look: Google indexes the mobile page. */}
      {/* The shared Eyebrow, not a hand-rolled pill: it is the same 34px
          flex row the frame draws (6590:2309 -> 6590:2310 -> 6590:2311), so
          the label centres on both axes instead of sitting on the baseline of
          a box with padding on one axis only. Asim, 22 Sep 2026. */}
      <Box x={0} y={0} className="self-start lg:hidden">
        <Eyebrow tone="glass">Responsible Recycling &amp; ITAD</Eyebrow>
      </Box>

      {/* H1 — 6023:13162. Figma centres the text box on y=276.5; three lines at
          74.7px is 224.1 tall, so the top edge is 276.5 - 112 = 164.4. Using
          the centre value as a top offset was what pushed the headline down
          into the paragraph. */}
      {/* H1 — 6023:13162. Two lines, not three: Asim, 16 Sep 2026. The break
          is explicit because the line has to clear the quote card at x1203, and
          the size is set by that same limit — 844px of room between the 319
          gutter and the card. */}
      <Box x={319} y={88} w={860}>
        {/* 6590:2312 sets the phone at 28/38. The forced break is a desktop
            measure — it exists to clear the quote card at x1203, and there is
            no card beside the headline on a phone — so it is switched off
            below lg and the line wraps where the column ends. */}
        <h1 className="font-sans text-[28px] font-semibold leading-[38px] text-white lg:text-[46px] lg:leading-[54px] lg:tracking-[-1.8px]">
          {/* The space before the break is load-bearing below lg, where the
              break is switched off and the two halves become one line. */}
          Recycle Responsibly. Protect the Planet.{' '}<br className="hidden lg:inline" />Build a Cleaner Tomorrow.
        </h1>
      </Box>

      {/* Lead — 6023:13164, moved up with the headline. 6590:2313 on the phone. */}
      <Box x={319} y={228} w={688}>
        <p className="font-roboto text-[16px] leading-[24px] text-white/70 lg:text-[18px] lg:leading-[27px]">
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

      {/* Get Started — 6032:16992, moved up with the headline.
          The phone's CTA Row (6590:2314) gaps these two by 12 where the section
          gaps everything else by 20, so this one pulls back the difference
          rather than the section carrying a second gap value. */}
      <Box x={724} y={337} className="-mt-[8px] lg:mt-0">
        <Btn href={QUOTE_HREF} variant="colored" className="w-full justify-center lg:w-auto">Get Started</Btn>
      </Box>

      {/* Glass quote card — 6098:518, moved up with the headline. w398. */}
      <Box x={1203} y={88} w={398}>
        {/* Padding and gaps are tighter than Figma's on purpose. This card is the
            tallest thing in the band, so its height is what sets how far down the
            stats strip has to sit — at the drawn 457 it left a 190px hole under
            the left column's buttons. Trimmed to ~405, which pulls the strip up
            without stretching the column. */}
          <div className="rounded-[24px] border border-white/20 bg-white/10 p-[24px] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] backdrop-blur-[40px] lg:p-[28px]">
          <p className="text-center font-sans text-[20px] font-medium leading-[36px] text-white lg:text-[22px] lg:leading-[32px]">
            What Do You Want to Recycle?
          </p>
          <p className="font-inter text-[14px] leading-[20px] text-white/60 lg:pt-[8px] lg:text-center">
            Let&rsquo;s do it quickly!
          </p>

          <div className="flex flex-col gap-[16px] pt-[16px] lg:pt-[24px]">
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
            <Btn href={QUOTE_HREF} variant="whiteFill" className="w-full justify-center font-bold">
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
      {/*
          ON THE PHONE (6604:5043) the row becomes a column: no top rule, no
          vertical rules, a 1px white/15 divider between rows instead, 8px
          either side of it, each row a 43px icon tile 12px from its text, and
          the figure drops 38.04 -> 26 so "R2v3 Certified Locations" fits the
          295px text column on one line.

          Three rows, the same three the desktop shows, in the same order.
          See the STATS note above for what the R2v3 tile claims.
      */}
      {/* The three columns are the frame's widths, not equal thirds: the
          R2v3 column is as wide as its one-line figure (547.66), the middle
          one is 417, the last takes the rest. With a 64px tile in front of
          each figure, equal thirds would push "R2v3 Certified Locations"
          120px past its rule. */}
      <Box x={319} y={519} w={1281.335} className="flex flex-col gap-[8px] lg:flex-row lg:gap-0 lg:border-t-[1.001px] lg:border-white/40 lg:pt-[24.025px]">
        {STATS.map((s, i) => {
          const cls = `flex items-center gap-[12px] lg:gap-[20px] lg:px-[28.029px] lg:py-[20.021px] ${
            i === 0 ? 'lg:shrink-0' : i === 1 ? 'lg:w-[417px] lg:shrink-0' : 'lg:min-w-px lg:flex-1'
          } ${
            i < STATS.length - 1 ? 'border-b border-white/15 pb-[8px] lg:border-b-0 lg:border-r-[1.001px] lg:border-white/40' : ''
          }`
          const body = (
            <>
              {/* Icon tile — 6778:10435 (64.6x66.46, r10) / 6778:10478 (43, r9). */}
              <span className="grid size-[43px] shrink-0 place-items-center rounded-[8.978px] bg-white/30 lg:h-[66.46px] lg:w-[64.602px] lg:rounded-[10px]">
                <Image
                  src={s.icon} alt="" width={Math.round(s.board.w * 2)} height={Math.round(s.board.h * 2)} unoptimized
                  className="h-[var(--ph)] w-[var(--pw)] object-cover lg:h-[var(--bh2)] lg:w-[var(--bw2)]"
                  style={{ '--pw': `${s.phone.w}px`, '--ph': `${s.phone.h}px`, '--bw2': `${s.board.w}px`, '--bh2': `${s.board.h}px` } as React.CSSProperties}
                />
              </span>
              <span className="flex min-w-px flex-1 flex-col gap-[2px] lg:flex-none lg:gap-0">
                <span className="block font-sans text-[26px] font-semibold leading-[38.04px] tracking-[-1.1512px] text-white lg:whitespace-nowrap lg:text-[38.04px] lg:leading-[38.04px]">{s.v}</span>
                <span className="block font-roboto text-[14px] font-medium leading-[19.52px] tracking-[-0.0801px] text-white/80 lg:whitespace-nowrap lg:pt-[4.004px]">{s.l}</span>
              </span>
            </>
          )
          return s.href ? (
            <a key={s.v} href={s.href} target="_blank" rel="noopener noreferrer"
              aria-label={`${s.v}, ${s.l} — see Recycle Technologies in the R2 certified facility directory (opens in a new tab)`}
              className={`${cls} transition-opacity hover:opacity-80`}>
              {body}
            </a>
          ) : (
            <div key={s.v} className={cls}>{body}</div>
          )
        })}
      </Box>
    </Section>
  )
}
