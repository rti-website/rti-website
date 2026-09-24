import Image from 'next/image'
import { Box, Section } from '@/components/design/Frame'
import { Btn } from '@/components/ui/Bits'
import { CONTACT_FORM_HREF, href } from '@/lib/urls'
import { HERO_H } from '@/lib/layout'
import { Picker } from '@/components/client/Picker'
import { R2_DIRECTORY } from '@/data/certifications'
import { HERO_LOCATIONS, SERVICE_INTEREST } from '@/data/contact'
import { TOP_BAR } from '@/lib/nav'

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
      /* Phone padding: 80 above the heading, not the frame's 40 — Asim,
         24 Sep 2026, twice: "give some space to heading from top", then
         "give some space between heading and above nav". 40 below. Phone
         only: lg:p-0 resets it on the board. */
      className="flex flex-col gap-[20px] bg-navy px-[20px] pb-[40px] pt-[80px] lg:block lg:p-0"
    >
      {/* Photo — 6023:13153 flattened, full-bleed, full opacity. See note above.
          Board only since 24 Sep 2026; the phone has its own photo below. */}
      <Box x={0} y={0} w={1920} h={HERO_H} fill className="max-lg:hidden">
        {/* `sizes` says 1px below lg because the picture is not shown there.
            Both hero photos are `priority`, so both are preloaded at every
            width whether shown or not; this makes the unused one a few bytes
            instead of a second full photo. Same trick on the phone photo. */}
        <Image src="/images/home/hero-photo.png" alt="" fill priority sizes="(width < 64rem) 1px, 1920px" className="object-cover" />
      </Box>
      {/* PHONE PHOTO — 6595:2313, the frame's own picture (green foliage and a
          truck), not the board's e-waste shot. The frame draws it 2028x1142,
          centred, 53px above the hero's top, inside a 55% opacity layer over
          the navy base; the same geometry here, so the phone shows the same
          centre slice as the frame. public/images/home/hero-photo-phone.png,
          registered in data/figma-assets.json (fetch with
          `node scripts/fetch-figma-assets.mjs --missing`). It is a soft,
          out-of-focus picture at 55%, so it is served at 640 CSS px rather
          than its drawn 2028: a phone downloads a fraction of the bytes and
          the picture looks the same. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-55 lg:hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-[-53px] h-[1142px] w-[2028px] -translate-x-1/2">
          <Image src="/images/home/hero-photo-phone.png" alt="" fill priority sizes="(width >= 64rem) 1px, 640px" className="object-cover" />
        </div>
      </div>
      {/* Green wash — 6023:13154 */}
      <Box x={0} y={0} w={1920} h={974.39} fill
        style={{ backgroundImage: 'linear-gradient(90deg, rgba(27,122,61,0.639) 0%, rgba(27,122,61,0) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)' }} />
      {/* Navy wash — 6023:13155 */}
      <Box x={0} y={0} w={1920} h={HERO_H} fill
        style={{ backgroundImage: 'linear-gradient(0deg, rgba(11,31,58,0.6) 0%, rgba(11,31,58,0) 50%, rgba(0,0,0,0) 100%)' }} />

      {/* ===================================================================
          THE PHONE HERO, REDRAWN 24 Sep 2026 — Asim: "in mobile only change
          the hero sec like this" (Figma 6590:2308 in 6588:2308). Top to
          bottom: the heading, centred, on two lines; "Get a Quick Quote" and
          the Minnesota phone number as two full-width buttons; the three
          stats, smaller. The "Responsible Recycling & ITAD" pill, the lead
          paragraph and the glass quote card are gone from the phone (the
          card is hidden below lg, not removed: the board still has it).
          Nothing at lg changes.
          =================================================================== */}

      {/* H1 — 6023:13162. Figma centres the text box on y=276.5; three lines at
          74.7px is 224.1 tall, so the top edge is 276.5 - 112 = 164.4. Using
          the centre value as a top offset was what pushed the headline down
          into the paragraph. */}
      {/* H1 — 6023:13162 AS DRAWN since 23 Sep 2026: three lines, IBM Plex
          Sans SemiBold 70 / 74.7, tracking -4.03, broken after "Responsibly."
          and "Build a". Asim sent the frame's own render ("make the hero
          section text like this"). It had been two lines at 46 since 16 Sep.
          The widest line is ~740 of the frame's 759 box, well clear of the
          quote card at x1203; nowrap so a browser that sets zoomed text a
          hair wider cannot push "a" onto a fourth line. 225 tall, so the lead
          and the picker row below move down with it. */}
      <Box x={319} y={88} w={860}>
        {/* 6590:2312 sets the phone at 28/38. The forced break is a desktop
            measure — it exists to clear the quote card at x1203, and there is
            no card beside the headline on a phone — so it is switched off
            below lg and the line wraps where the column ends. */}
        {/* !! ONE <h1>, TWO WORDINGS — and Google reads the phone one.
            The phone frame (6590:2312) sets "Certified E-Waste Recycling and
            ITAD", centred, 28/38, on two lines; the board keeps its three-line
            headline. Each wording is display:none at the other width, so a
            screen reader and a crawler rendering the page each get only the
            visible one. Google indexes mobile-first, so the homepage's H1 as
            far as search is concerned is now the phone wording. Flagged to
            Asim for the SEO team on 24 Sep 2026. */}
        <h1 className="text-center font-sans text-[28px] font-semibold leading-[38px] text-white lg:whitespace-nowrap lg:text-left lg:text-[70px] lg:leading-[74.7px] lg:tracking-[-4.0315px]">
          <span className="lg:hidden">Certified E-Waste{' '}<br />Recycling and ITAD</span>
          <span className="max-lg:hidden">Recycle Responsibly.{' '}<br />Protect the Planet. Build a{' '}<br />Cleaner Tomorrow.</span>
        </h1>
      </Box>

      {/* Lead — 6023:13164, 14px under the headline as in the frame
          (389 -> 403), and at the frame's Roboto 20 / 30.03: three lines in
          the 688 column, as Asim's screenshot shows. 6590:2313 on the phone. */}
      {/* Board only since 24 Sep 2026: the phone frame has no lead. */}
      <Box x={319} y={327} w={688} className="max-lg:hidden">
        <p className="font-roboto text-[16px] leading-[24px] text-white/70 lg:text-[20px] lg:leading-[30.031px]">
          Recycle Technologies provides certified e-waste recycling, destruction, and
          shredding solutions that keeps electronics out of landfills and valuable
          materials in circulation.
        </p>
      </Box>

      {/* The location picker and "Get Started" that sat here (6199:4848,
          6032:16992) are gone since 24 Sep 2026: Asim moved the location into
          the quote card, above Pick Your Service, so one form carries both to
          the contact form. See HERO_LOCATIONS in src/data/contact.ts. */}

      {/* Glass quote card — 6098:518, moved up with the headline. w398.
          Board only since 24 Sep 2026: the phone has the two buttons below. */}
      <Box x={1203} y={88} w={398} className="max-lg:hidden">
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

          {/* A plain GET form to the contact form: the chosen service rides
              along as ?service=… and ContactForm selects it on arrival.
              Asim, 23 Sep 2026: "when someone selects the service it must
              automatically come to [the] contact form". No script needed — it
              works before hydration, and a form with no choice just opens
              the contact form. The options are the contact form's own list
              (SERVICE_INTEREST), so every choice exists over there. */}
          <form method="get" action={CONTACT_FORM_HREF} className="flex flex-col gap-[12px] pt-[16px] lg:pt-[18px]">
            {/* Location, above the service (Asim, 24 Sep 2026). Posts as
                ?location=; ContactForm fills State from it (see HERO_LOCATIONS). */}
            <div>
              <label htmlFor="hero-location" className="block pb-[8px] font-inter text-[14px] font-medium leading-[20px] text-white/70">
                Your Location
              </label>
              <div className="h-[50px]">
                <Picker id="hero-location" name="location" placeholder="Select Your Location" srLabel="Select your location"
                  options={HERO_LOCATIONS.map((l) => l.label)} />
              </div>
            </div>
            <div>
              <label htmlFor="hero-service" className="block pb-[8px] font-inter text-[14px] font-medium leading-[20px] text-white/70">
                Pick Your Service
              </label>
              <div className="h-[50px]">
                <Picker id="hero-service" name="service" placeholder="Select Service" srLabel="Pick your service" options={SERVICE_INTEREST} />
              </div>
            </div>
            <Btn submit variant="whiteFill" className="w-full justify-center font-bold">
              Get a Quote
            </Btn>
          </form>

          <div className="py-[16px] lg:py-[14px]">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          <Btn href={href('/services/')} variant="white" italic className="w-full justify-center">
            See all Services
          </Btn>
        </div>
      </Box>

      {/* PHONE ONLY — 6861:12956: two full-width 48px buttons, 10 apart.
          "Get a Quick Quote" is the site's teal button (arrow and all) and
          goes where the board's quote card sends people, the contact form.
          The second is a call button for the Minnesota line (6861:12950):
          white, teal text, and the frame's own phone glyph (image 450,
          6861:12954, 17px) — public/images/home/hero-phone.png, registered in
          data/figma-assets.json; fetch it with
          `node scripts/fetch-figma-assets.mjs --missing`. The frame sets that
          label white on white; it is teal here, as its own preview shows. */}
      <div className="flex w-full flex-col gap-[10px] lg:hidden">
        <Btn href={CONTACT_FORM_HREF} variant="colored" className="w-full justify-center backdrop-blur-[4.004px]">
          Get a Quick Quote
        </Btn>
        <a
          href={TOP_BAR.phoneMn.tel}
          className="btn-pop flex h-[48px] w-full items-center justify-center gap-[8.008px] rounded-[8px] bg-white px-[28.029px] font-roboto text-[15.016px] font-medium leading-[22.523px] tracking-[-0.0801px] text-brand backdrop-blur-[4.004px]"
        >
          <span className="whitespace-nowrap">+1-763-559-5130</span>
          <Image src="/images/home/hero-phone.png" alt="" width={34} height={34} className="size-[17px] shrink-0 object-cover" />
        </a>
      </div>

      {/* Stats strip — 6023:13173, lifted off the bottom of the band so the
          figures are on screen when the page opens. Asim, 16 Sep 2026.

          y556 since 24 Sep 2026 (was 519): the quote card grew by the location
          picker to ~441 tall, ending at ~529, and the strip keeps ~27 clear of
          it. HERO_H grew by the same 37 (src/lib/layout.ts).
          
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
          the figure drops 38.04 -> 16 (the 24 Sep 2026 frame; it was 26).

          Three rows, the same three the desktop shows, in the same order.
          See the STATS note above for what the R2v3 tile claims.
      */}
      {/* The three columns are the frame's widths, not equal thirds: the
          R2v3 column is as wide as its one-line figure (547.66), the middle
          one is 417, the last takes the rest. With a 64px tile in front of
          each figure, equal thirds would push "R2v3 Certified Locations"
          120px past its rule. */}
      <Box x={319} y={556} w={1281.335} className="flex flex-col gap-[8px] lg:flex-row lg:gap-0 lg:border-t-[1.001px] lg:border-white/40 lg:pt-[24.025px]">
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
              {/* Phone sizes from the 24 Sep 2026 frame (6778:10481/10482):
                  the figure 16/27 with no tracking, the line under it 10/19.5,
                  no gap. The board keeps 38.04 and 14. */}
              <span className="flex min-w-px flex-1 flex-col lg:flex-none">
                <span className="block font-sans text-[16px] font-semibold leading-[27px] text-white lg:whitespace-nowrap lg:text-[38.04px] lg:leading-[38.04px] lg:tracking-[-1.1512px]">{s.v}</span>
                <span className="block font-roboto text-[10px] font-medium leading-[19.52px] tracking-[-0.0801px] text-white/80 lg:whitespace-nowrap lg:pt-[4.004px] lg:text-[14px]">{s.l}</span>
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
