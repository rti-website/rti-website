import Image from 'next/image'
import { Box, Section } from '@/components/design/Frame'
import { Btn } from '@/components/ui/Bits'

/**
 * The closing CTA band that ends every page — Figma 6107:2950 in the file
 * Aqeel sent on 16 Sep 2026, fFS1bD6V6j1RhhmzfPxpHk.
 *
 * ====================================================================
 * ONE BAND, EVERY PAGE — Asim, 16 Sep 2026: "do it exactly like this in
 * all pages"
 * ====================================================================
 * Three different closing CTAs used to ship: the homepage's left-aligned block
 * with artwork on the right, `ServicesCta`'s near-identical twin, and
 * `GradientCta`'s centred column on a diagonal navy-to-green gradient. They are
 * now one component. Anything that wants a closing CTA renders this; nothing
 * re-implements it.
 *
 * What the redesign changed:
 *   - the content is CENTRED, not a left column at x317
 *   - the e-waste artwork is gone from the band entirely (it was only added
 *     that morning, at x1079 y65 — the designer took it back out)
 *   - the body runs the full 1084 rather than 686, so it sets three lines
 *
 * Layout: the design pins the heading at y112.98 (h53), the body at y187.98
 * (h83) and the buttons at y292.98 (h49) — 22px between each, and the stack
 * ends 114 from the bottom having started 112.98 from the top. So it is a
 * vertically centred column with a 22px gap, which reproduces those offsets to
 * within half a pixel AND lets a heading that wraps to two lines push the body
 * down instead of printing through it. Several pages have headings far longer
 * than "Ready to Recycle Responsibly?".
 *
 * Both background layers are mirrored in the design (`rotate-180` plus
 * `-scale-y-100`, which composes to a horizontal flip), so the green wash ends
 * up on the RIGHT. An earlier note in ServicesCta claimed the flip was a no-op
 * for a horizontal gradient — it is not, it reverses it, which is why that
 * build had green on the left where the design has it on the right.
 */

/** The band's height. Figma 456, and the same on every frame that carries it. */
export const CTA_H = 456

/** Shape of the band's copy. Every page supplies its own. */
export type CtaContent = {
  heading: string
  /**
   * Width of the heading box. 723 is the design's. Kept as an override because
   * a much longer heading reads better given more room before it wraps.
   */
  headingWidth?: number
  /** One paragraph or several. The six pages that used the old GradientCta
      supply a single string; the rest supply a list. */
  body: string | string[]
  primary: { label: string; href: string; external?: boolean }
  secondary: { label: string; href: string; external?: boolean }
}

/**
 * The band's contents, filling whatever box they are dropped into.
 *
 * Separate from `ClosingCta` because the homepage nests its CTA inside the
 * FAQ/CTA/footer section at y736 rather than placing it on the canvas, so it
 * needs the innards without another <Section> around them.
 */
export function ClosingCtaBand({ content }: { content: CtaContent }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-[22px] overflow-hidden bg-[#0c4e5a]">
      {/* Watermark — 6107:3979, 1920x1081 at y-312.02, 10% opacity, flipped. */}
      <Box x={0} y={-312.02} w={1920} h={1081} className="opacity-10">
        <Image src="/images/home/cta-bg.png" alt="" fill sizes="1920px" className="-scale-x-100 object-cover" />
      </Box>

      {/* Green wash — 6107:3981. Drawn at 270deg rather than 90deg: that is the
          design's horizontal flip, and it is what puts the green on the right. */}
      <Box
        x={4} y={-259.02} w={1920} h={974.39}
        style={{ backgroundImage: 'linear-gradient(270deg, rgba(27,122,61,0.639) 0%, rgba(27,122,61,0) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)' }}
      />

      {/* 6107:2952 */}
      <h2
        className="text-center font-sans text-[40px] font-semibold leading-[53.7px] text-white"
        style={{ width: content.headingWidth ?? 723 }}
      >
        {content.heading}
      </h2>

      {/* 6107:3101. Figma holds this as ONE text node, so the second sentence
          carries on along the first's last line — three lines at 1084 wide, not
          four. Pages that supply a list get it joined rather than stacked, or
          the block sets to a different shape than the frame. */}
      <p className="w-[1084px] text-center font-roboto text-[17.018px] leading-[27.654px] text-white/80">
        {(Array.isArray(content.body) ? content.body : [content.body]).join(' ')}
      </p>

      {/* 6491:6403 — 449.279 wide: a 210 filled button, 6px, then the bordered
          one at its own width. `min-w` rather than `w` so a page with a longer
          primary label gets a wider button instead of a clipped one. */}
      <div className="flex items-start gap-[6px]">
        <Btn
          href={content.primary.href}
          variant="whiteFill"
          external={content.primary.external}
          className="min-w-[210px] justify-center"
        >
          {content.primary.label}
        </Btn>
        <Btn href={content.secondary.href} variant="white" external={content.secondary.external}>
          {content.secondary.label}
        </Btn>
      </div>
    </div>
  )
}

/** The band as a section on the canvas — what every page except home uses. */
export function ClosingCta({
  top, label, content, height = CTA_H,
}: {
  top: number
  label?: string
  content: CtaContent
  /** Only for a frame that genuinely draws the band at another height. */
  height?: number
}) {
  return (
    <Section top={top} height={height} label={label}>
      <ClosingCtaBand content={content} />
    </Section>
  )
}
