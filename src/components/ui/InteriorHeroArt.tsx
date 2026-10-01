import Image from 'next/image'
import { Box } from '@/components/design/Frame'

/**
 * The art behind every interior page hero.
 *
 * ====================================================================
 * REPLACED 16 Sep 2026 — the designer swapped the photograph
 * ====================================================================
 * Source: Aqeel's updated file, jWPItVReOYx661IlH738fg, hero node 6472:3964
 * with the picture at 6472:3967. Same node ids as the original file elsewhere,
 * so this is a copy of E9vPA3ZvIjK6kx8MVLqY6R with two images changed — this
 * one and the final-CTA artwork (see FaqCtaFooter / ServicesCta).
 *
 * What changed structurally, not just which file is loaded:
 *
 *   BEFORE  a 974.39-tall box at 55% opacity holding TWO exports — a base
 *           plate (6142:787) with a second 1081-tall photo inset at y-53
 *           (6142:788) — then a green wash and a navy wash, both 974.39 tall.
 *   NOW     ONE image at full opacity, full bleed across the 470-tall band.
 *           The navy-to-transparent left-to-right fade that used to come from
 *           the 55% plate is a gradient fill on the image node itself, so it
 *           is baked into the export rather than layered here.
 *
 * The two washes survive but are now 470 tall instead of 974.39, and the green
 * one is nested INSIDE the navy one (6472:3969 inside 6472:3968), so green
 * paints on top. That is the reverse of the old order.
 *
 * ! WHY THE BOX IS 470 AND NOT 1081. Figma draws the picture 1920x1081 pinned
 * at y-422, so only its middle shows through the band. But a node export is
 * CLIPPED TO ITS FRAME: hero-bg.png comes back 1920x470 — already just the
 * visible strip, gradient and all. Drawing it into the Figma-sized 1081 box
 * therefore scaled a 470-tall picture up by 2.3x and showed a slice of that.
 * Built at 470 at y0 so one image pixel is one design pixel. The 1081/-422 in
 * the design file is the frame's arithmetic, not this component's.
 *
 * ! EVERY PAGE HAS ITS OWN PHOTOGRAPH NOW. In the 17 Sep file
 * (fFS1bD6V6j1RhhmzfPxpHk) each interior hero carries a different picture —
 * eleven distinct exports, same node ids as before because the designer swapped
 * the FILL rather than replacing the layer, which is why a node-id diff does not
 * catch this kind of change. /services/ was the first one Asim asked for; the
 * rest still point at the shared default until they are pulled in one by one.
 *
 * The washes, the geometry and the baked-in navy fade are identical on all of
 * them, so only `src` varies.
 *
 * This lives in its own file rather than in either hero because the service
 * detail pages all draw the same art, and the last time one number was copied
 * into two hero files (FOOTER_H) one of the copies went stale.
 */
/**
 * What every page still shows unless it has been given its own. Pulled from
 * node 6472:3967, the green-roof aerial.
 */
const SHARED_HERO = '/images/services/hero-bg.png'

/**
 * A photograph that arrives as the raw IMAGE FILL rather than as a clipped
 * 1920x470 node export — the ITAD hero, 23 Sep 2026, and anything pulled the
 * same way since. The Figma MCP now hands back the fill itself, which is the
 * full picture with no gradient baked in, so it is drawn the way the frame
 * draws it: in its own box (6778:2951: 1920x1081 at y-332, object-cover) with
 * the node's gradient laid over it.
 */
export type HeroFill = {
  y: number
  h: number
  /** A gradient drawn on the photo itself. The 28 Sep heroes have none. */
  overlay?: string
  /** Mirrored left to right (Figma's `-scale-y-100 rotate-180`), desktop only. */
  flip?: boolean
  /**
   * The photo's opacity over the navy band, where a bright photo drowns the
   * white text — Asim, 28 Sep 2026, on Healthcare and Automotive: "decrease
   * the opacity of the bg image … by 50% so the text become readable".
   * Applies on the phone too.
   */
  opacity?: number
  /** Where the phone frame puts the same photo — see PhoneFill. */
  phone?: PhoneFill
}

/**
 * THE PHONE FRAMES PLACE THE PHOTO THEMSELVES — 28 Sep 2026.
 *
 * Each "- Mobile" frame draws the picture in its own box, far larger than the
 * 390-wide band (About: 679x382 at x0 y-69 in a band 276 tall), so the phone
 * shows a closer crop than simply covering the band would. `x y w h` are that
 * box, relative to the band's top-left, read straight off the frame.
 *
 * The bands in the build are not all 276 tall (the service hero is 360 below
 * lg, and a long H1 can grow any of them), so the box is written in `cqh`: one
 * band height is 100cqh, so at 276 it is exactly the frame and a taller band
 * scales the whole box up about its top-left, still covering the band instead
 * of leaving a strip of bare navy under the photo.
 *
 * `band` is the frame's band height when it is not 276 (the service detail
 * phone frame is 360). `under` is true where the frame nests the photo INSIDE
 * the 60% navy container, so that navy paints under the picture rather than
 * over it (FAQs, Downloads, Locations, Location Details, ITAD, All
 * Industries). `green` moves the green wash when the frame does.
 */
export type PhoneFill = {
  x: number; y: number; w: number; h: number
  band?: number
  under?: boolean
  green?: { x: number; w: number }
}

/** Where the two washes sit, when a frame moves them off the default. */
export type HeroWashes = { navy: { x: number; w: number }; green: { x: number; w: number } }

/**
 * Which set of washes the frame draws.
 *
 *   classic  the 16 Sep set: navy 60% bottom-up, green 64% left to right.
 *   deep     the 28 Sep redesign (every interior hero now carries a full
 *            1920x1081 photograph named "ChatGPT Image Aug 28"): navy 90% and
 *            a SOLID green, both 1920 wide. The phone frames keep the lighter
 *            pair and add the 90% navy again at 80% opacity on top.
 *   teal     the Electronics Recycling Services hero (6989:13263): no navy at
 *            all; the photo fades to #012325 at the bottom (its `overlay`) and
 *            two green washes, 64% then solid, sit over it.
 */
export type HeroTone = 'classic' | 'deep' | 'teal'

const NAVY = (a: number) => `linear-gradient(0deg, rgba(11,31,58,${a}) 0%, rgba(11,31,58,0) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)`
const GREEN = (a: number) => `linear-gradient(90deg, rgba(27,122,61,${a}) 0%, rgba(27,122,61,0) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)`

export function InteriorHeroArt({
  src, fill: fillBox, washes, tone = 'classic',
}: {
  /** The page's own hero photograph, exported 1920x470 — or a raw fill, see `fill`. */
  src?: string
  fill?: HeroFill
  washes?: HeroWashes
  tone?: HeroTone
} = {}) {
  const photo = src ?? SHARED_HERO
  /* A post hero set in the admin to a picture on another site: next/image only
     optimises hosts listed in remotePatterns and answers 400 for the rest, so
     it is drawn as is. Our own pictures arrive as paths (localImagePath). */
  const external = /^https?:\/\//i.test(photo)
  const wide = tone === 'classic' ? 1935 : 1920
  const navy = washes?.navy ?? { x: 0, w: 1920 }
  const green = washes?.green ?? { x: 0, w: wide }
  const ph = fillBox?.phone
  const phBand = ph?.band ?? 276
  /* Frame px -> cqh, so the box scales with the band (see PhoneFill). */
  const q = (v: number) => `${(v / phBand) * 100}cqh`
  const navyGrad = NAVY(tone === 'deep' ? 0.9 : 0.6)
  const greenGrad = tone === 'deep' ? GREEN(1) : GREEN(0.639)
  return (
    <>
      {/* All three take `fill` — they are layers, not content. Without it they
          join the flow below lg, the picture's wrapper collapses to nothing and
          every interior hero on the site goes flat navy. Added 22 Sep 2026.
          With a phone placement the phone draws its own copy below, so these
          are desktop only. */}
      <Box x={0} y={fillBox?.y ?? 0} w={1920} h={fillBox?.h ?? 470} fill className={ph ? 'max-lg:hidden' : ''}>
        <Image
          src={photo}
          alt=""
          fill
          priority
          unoptimized={external}
          sizes="(width < 64rem) 100vw, 1920px"
          className={`object-cover ${fillBox?.flip ? 'lg:-scale-x-100' : ''}`}
          style={fillBox?.opacity !== undefined ? { opacity: fillBox.opacity } : undefined}
        />
        {fillBox?.overlay && <div className="absolute inset-0" style={{ backgroundImage: fillBox.overlay }} />}
      </Box>

      {tone === 'teal' ? (
        /* 6989:13265 "Gradient Overlay", 64% green, with the solid green
           6989:13266 inside it. No navy on this frame. */
        <Box x={0} y={0} w={1920} h={470} fill className={ph ? 'max-lg:hidden' : ''} style={{ backgroundImage: GREEN(0.64) }}>
          <Box x={0} y={0} w={1920} h={470} fill style={{ backgroundImage: GREEN(1) }} />
        </Box>
      ) : (
        /* Navy wash, bottom to top — 6472:3968. The green wash is its child. */
        <Box
          x={navy.x} y={0} w={navy.w} h={470} fill className={ph ? 'max-lg:hidden' : ''}
          style={{ backgroundImage: navyGrad }}
        >
          {/* 6472:3969. The 16 Sep frame drew it 1935 wide inside a 1920
              frame; kept as drawn because the section clips and the extra
              15px never shows. */}
          <Box x={green.x} y={0} w={green.w} h={470} fill style={{ backgroundImage: greenGrad }} />
        </Box>
      )}

      {ph && (
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden [container-type:size] lg:hidden">
          {ph.under && tone !== 'teal' && <div className="absolute inset-0" style={{ backgroundImage: NAVY(0.6) }} />}
          <div className="absolute" style={{ left: q(ph.x), top: q(ph.y), width: q(ph.w), height: q(ph.h) }}>
            <Image src={photo} alt="" fill priority unoptimized={external} sizes="(width < 64rem) 200vw, 1px" className="object-cover"
              style={fillBox?.opacity !== undefined ? { opacity: fillBox.opacity } : undefined} />
            {fillBox?.overlay && <div className="absolute inset-0" style={{ backgroundImage: fillBox.overlay }} />}
          </div>
          {!ph.under && tone !== 'teal' && <div className="absolute inset-0" style={{ backgroundImage: NAVY(0.6) }} />}
          <div
            className="absolute inset-y-0"
            style={{ left: q(ph.green?.x ?? 0), width: q(ph.green?.w ?? (tone === 'teal' ? 390 : 1127.489)), backgroundImage: GREEN(0.639) }}
          />
          {tone === 'deep' && <div className="absolute inset-0 opacity-80" style={{ backgroundImage: NAVY(0.9) }} />}
        </div>
      )}
    </>
  )
}
