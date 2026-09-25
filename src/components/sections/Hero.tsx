import { Fragment } from 'react'
import Image from 'next/image'
import { Box, Section } from '@/components/design/Frame'
import { Btn } from '@/components/ui/Bits'
import { CONTACT_FORM_HREF } from '@/lib/urls'
import { HERO_H } from '@/lib/layout'
import { R2_DIRECTORY } from '@/data/certifications'
import { TOP_BAR } from '@/lib/nav'

/**
 * Hero — Figma 6023:13152, 1920x940.
 * Layers bottom-to-top: #0b1f3a base, photo at 55%, green wash L→R,
 * navy wash bottom→top, then content.
 *
 * THE PHOTO — SUPERSEDED 25 Sep 2026 (see PHOTO in the component): the board
 * now draws the bin photo at 55% over navy, the same as the phone. The note
 * below is kept for how the old flattened hero-photo.png was made.
 *
 * THE OLD PHOTO — two traps, both hit once:
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
type Stat = {
  v: string; l: string; icon: string; href?: string
  /** The phone's one-line label (6604:5043, 25 Sep 2026): "R2v3 Certified". */
  short: string
  /** Position in the phone's row, which runs R2v3 · 30+ Years · 50 States. */
  phoneOrder: number
  board: { w: number; h: number }; phone: { w: number; h: number }
}

const STATS: Stat[] = [
  { v: 'R2v3 Certified Locations', l: 'Minnesota. Wisconsin', icon: '/images/home/stat-r2.png', href: R2_DIRECTORY,
    short: 'R2v3 Certified', phoneOrder: 0, board: { w: 44.602, h: 46.46 }, phone: { w: 27, h: 28 } },
  { v: '50 States', l: 'Accessible through our Mail-In Program', icon: '/images/home/stat-pin.png',
    short: '50 States', phoneOrder: 2, board: { w: 31, h: 46 }, phone: { w: 19, h: 28 } },
  { v: '30+ Years', l: 'Of recycling experience', icon: '/images/home/stat-years.png',
    short: '30+ Years', phoneOrder: 1, board: { w: 42, h: 42 }, phone: { w: 25.496, h: 25.63 } },
]

export function Hero() {
  return (
    <Section
      top={140} height={HERO_H} label="6023:13152"
      /* Phone padding: 80 above the heading, not the frame's 40 — Asim,
         24 Sep 2026, twice: "give some space to heading from top", then
         "give some space between heading and above nav". 40 below. Phone
         only: lg:p-0 resets it on the board. */
      className="flex flex-col gap-[20px] bg-navy px-[20px] pb-[40px] pt-[80px] lg:block lg:p-0"
    >
      {/* PHOTO — one picture at both widths since 25 Sep 2026: the e-waste
          bin in the foliage ("ChatGPT Image Aug 28, 2026"), which the board
          (6107:2803 in 6023:13153) and the phone (6595:2313) now both draw.
          public/images/home/hero-photo-phone.png — the name is from when only
          the phone had it. Each frame puts it in a 55% opacity layer over the
          navy base, 53px above the hero's top and centred: 1920x1081 on the
          board, 2028x1142 on the phone. The old flattened board photo
          (hero-photo.png) is no longer used. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-55" aria-hidden="true">
        <div className="absolute left-1/2 top-[-53px] h-[1142px] w-[2028px] -translate-x-1/2 lg:h-[1081px] lg:w-[1920px]">
          <Image src="/images/home/hero-photo-phone.png" alt="" fill priority sizes="(width < 64rem) 640px, 1920px" className="object-cover" />
        </div>
      </div>
      {/* Green wash — 6023:13154 */}
      <Box x={0} y={0} w={1920} h={974.39} fill
        style={{ backgroundImage: 'linear-gradient(90deg, rgba(27,122,61,0.639) 0%, rgba(27,122,61,0) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)' }} />
      {/* Navy wash — 6023:13155 */}
      <Box x={0} y={0} w={1920} h={HERO_H} fill
        style={{ backgroundImage: 'linear-gradient(0deg, rgba(11,31,58,0.6) 0%, rgba(11,31,58,0) 50%, rgba(0,0,0,0) 100%)' }} />

      {/* ===================================================================
          THE HERO, REDRAWN 25 Sep 2026 — Asim, from the updated frames:
          board 6023:13152, phone 6590:2308.
            board  a two-line headline, the lead under it, and two equal
                   buttons (Get a Quick Quote, the Minnesota number) where the
                   glass quote card and its location/service pickers used to
                   be; the card is gone. The stats strip is unchanged.
            phone  the same buttons full width; the stats become one row of
                   three small tiles.
          The frame draws the band 940 tall with the text at y162; the build
          keeps HERO_H (752) so the stats strip is still on screen when the
          page opens (Asim, 16 Sep), and the text block is centred in the
          556px above the strip: H1 100, lead 275, buttons 401.
          =================================================================== */}

      {/* !! ONE <h1>, TWO WORDINGS — and Google reads the phone one.
          The phone frame (6590:2312) sets "Certified E-Waste Recycling and
          ITAD", centred, 28/38, on two lines; the board (6023:13162) sets
          "Certified E-Waste Recycling & IT Assets Disposition", 70/74.7, two
          lines in a 952 box. Each wording is display:none at the other width.
          Google indexes mobile-first, so the phone wording is the H1 search
          sees — flagged to Asim for the SEO team, 24 Sep 2026. */}
      <Box x={319} y={100} w={952}>
        <h1 className="text-center font-sans text-[28px] font-semibold leading-[38px] text-white lg:text-left lg:text-[70px] lg:leading-[74.7px]">
          <span className="lg:hidden">Certified E-Waste{' '}<br />Recycling and ITAD</span>
          <span className="max-lg:hidden">Certified E-Waste Recycling{' '}<br />&amp; IT Assets Disposition</span>
        </h1>
      </Box>

      {/* Lead — 6023:13164, Roboto 20 / 30.03 at white/70, 715 wide. Board
          only: the phone frame has no lead. */}
      <Box x={319} y={275} w={715} className="max-lg:hidden">
        <p className="font-roboto text-[20px] leading-[30.031px] text-white/70">
          Recycle Technologies provides certified e-waste recycling, ITAD, data destruction, and
          shredding solutions that keep electronics out of landfills and valuable materials in
          circulation.
        </p>
      </Box>

      {/* Buttons — 6870:13895 on the board (681 wide, two equal buttons 10
          apart) and 6861:12956 on the phone (full width, stacked 10 apart).
          "Get a Quick Quote" is the site's teal button and goes to the
          contact form. The second is a call button for the Minnesota line:
          white, teal text, and the frames' own phone glyph (image 450,
          hero-phone.png). The frames set that label white on white; it is
          teal here, as their previews show. The glyph sits BEFORE the number
          (Asim, 25 Sep 2026: "move the phone icon to before the number"); the
          frames draw it after. */}
      <Box x={319} y={401} w={681} className="flex flex-col gap-[10px] lg:flex-row">
        <Btn href={CONTACT_FORM_HREF} variant="colored" className="w-full justify-center backdrop-blur-[4.004px] lg:h-[48px] lg:w-auto lg:min-w-px lg:flex-1">
          Get a Quick Quote
        </Btn>
        <a
          href={TOP_BAR.phoneMn.tel}
          className="btn-pop flex h-[48px] w-full items-center justify-center gap-[8.008px] rounded-[8px] bg-white px-[28.029px] font-roboto text-[15.016px] font-medium leading-[22.523px] tracking-[-0.0801px] text-brand backdrop-blur-[4.004px] lg:w-auto lg:min-w-px lg:flex-1"
        >
          <Image src="/images/home/hero-phone.png" alt="" width={34} height={34} className="size-[17px] shrink-0 object-cover" />
          <span className="whitespace-nowrap">+1-763-559-5130</span>
        </a>
      </Box>

      {/* PHONE STATS — 6604:5043 as redrawn 25 Sep 2026: one row of three,
          each a 43px glass icon tile over a one-line label (IBM Plex 14
          SemiBold), a 1px white/15 rule between them, in the order R2v3 ·
          30+ Years · 50 States. The R2v3 tile still links to SERI's
          directory. The board keeps its own strip below. `relative` because
          it is the one plain block in the hero: without a position it paints
          under the absolutely placed photo and washes, and looked faded. */}
      <div className="relative flex w-full items-stretch gap-[8px] lg:hidden">
        {[...STATS].sort((a, b) => a.phoneOrder - b.phoneOrder).map((s, i) => {
          const body = (
            <>
              <span className="grid size-[43px] place-items-center rounded-[8.978px] bg-white/30">
                <Image
                  src={s.icon} alt="" width={Math.round(s.board.w * 2)} height={Math.round(s.board.h * 2)} unoptimized
                  className="object-cover" style={{ width: s.phone.w, height: s.phone.h }}
                />
              </span>
              <span className="font-sans text-[14px] font-semibold leading-[19px] text-white">{s.short}</span>
            </>
          )
          const cls = 'flex min-w-px flex-1 flex-col items-center gap-[12px] text-center'
          return (
            <Fragment key={s.v}>
              {i > 0 && <span className="w-px shrink-0 self-stretch bg-white/15" aria-hidden="true" />}
              {s.href ? (
                <a href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={`${s.v}, ${s.l} — see Recycle Technologies in the R2 certified facility directory (opens in a new tab)`}
                  className={`${cls} transition-opacity hover:opacity-80`}>
                  {body}
                </a>
              ) : (
                <div className={cls}>{body}</div>
              )}
            </Fragment>
          )
        })}
      </div>

      {/* BOARD STATS — 6023:13173, unchanged: three columns under a rule at
          y556, the frame's widths (547.66 · 417 · the rest), a 64px glass
          tile in front of each figure. Board only since 25 Sep 2026; the
          phone has its own row above. */}
      <Box x={319} y={556} w={1281.335} className="flex-row border-t-[1.001px] border-white/40 pt-[24.025px] max-lg:hidden lg:flex">
        {STATS.map((s, i) => {
          const cls = `flex items-center gap-[20px] px-[28.029px] py-[20.021px] ${
            i === 0 ? 'shrink-0' : i === 1 ? 'w-[417px] shrink-0' : 'min-w-px flex-1'
          } ${i < STATS.length - 1 ? 'border-r-[1.001px] border-white/40' : ''}`
          const body = (
            <>
              {/* Icon tile — 6778:10435, 64.6 x 66.46, r10. */}
              <span className="grid h-[66.46px] w-[64.602px] shrink-0 place-items-center rounded-[10px] bg-white/30">
                <Image
                  src={s.icon} alt="" width={Math.round(s.board.w * 2)} height={Math.round(s.board.h * 2)} unoptimized
                  className="object-cover" style={{ width: s.board.w, height: s.board.h }}
                />
              </span>
              <span className="flex flex-col">
                <span className="block whitespace-nowrap font-sans text-[38.04px] font-semibold leading-[38.04px] tracking-[-1.1512px] text-white">{s.v}</span>
                <span className="block whitespace-nowrap pt-[4.004px] font-roboto text-[14px] font-medium leading-[19.52px] tracking-[-0.0801px] text-white/80">{s.l}</span>
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
