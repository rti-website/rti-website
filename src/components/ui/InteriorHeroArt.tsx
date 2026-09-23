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
export type HeroFill = { y: number; h: number; overlay: string }

/** Where the two washes sit, when a frame moves them off the default. */
export type HeroWashes = { navy: { x: number; w: number }; green: { x: number; w: number } }

export function InteriorHeroArt({
  src, fill: fillBox, washes,
}: {
  /** The page's own hero photograph, exported 1920x470 — or a raw fill, see `fill`. */
  src?: string
  fill?: HeroFill
  washes?: HeroWashes
} = {}) {
  const photo = src ?? SHARED_HERO
  const navy = washes?.navy ?? { x: 0, w: 1920 }
  const green = washes?.green ?? { x: 0, w: 1935 }
  return (
    <>
      {/* All three take `fill` — they are layers, not content. Without it they
          join the flow below lg, the picture's wrapper collapses to nothing and
          every interior hero on the site goes flat navy. Added 22 Sep 2026. */}
      <Box x={0} y={fillBox?.y ?? 0} w={1920} h={fillBox?.h ?? 470} fill>
        <Image
          src={photo}
          alt=""
          fill
          priority
          sizes="(width < 64rem) 100vw, 1920px"
          className="object-cover"
        />
        {fillBox && <div className="absolute inset-0" style={{ backgroundImage: fillBox.overlay }} />}
      </Box>

      {/* Navy wash, bottom to top — 6472:3968. The green wash is its child. */}
      <Box
        x={navy.x} y={0} w={navy.w} h={470} fill
        style={{ backgroundImage: 'linear-gradient(0deg, rgba(11,31,58,0.6) 0%, rgba(11,31,58,0) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)' }}
      >
        {/* 6472:3969. Figma draws it 1935 wide inside a 1920 frame; kept as
            drawn because the section clips and the extra 15px never shows. */}
        <Box
          x={green.x} y={0} w={green.w} h={470} fill
          style={{ backgroundImage: 'linear-gradient(90deg, rgba(27,122,61,0.639) 0%, rgba(27,122,61,0) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)' }}
        />
      </Box>
    </>
  )
}
