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
 *
 * ===========================================================================
 * !! WHY THE CONTENT IS `relative` AND THE TWO BACKGROUND LAYERS ARE
 * !! `pointer-events-none`. DO NOT REMOVE EITHER.
 * ===========================================================================
 * Asim, 22 Sep 2026: "these find a location and start mail in recycling is not
 * working", and separately the same two buttons on /why-choose-us/. It was
 * every closing CTA on the site — this band ends every page — and the cause
 * was CSS painting order, not the links, which were correct all along.
 *
 * A positioned element paints ABOVE non-positioned content in the same stacking
 * context, whatever the source order. The watermark and the green wash are
 * absolutely positioned; the heading, body and button row were static. So the
 * wash was painted over the buttons and swallowed every click, and because it
 * is a mostly-transparent gradient nothing looked wrong.
 *
 * Two changes, either of which would fix the clicks and both of which are
 * correct on their own terms: the decoration takes no pointer events, because
 * decoration never should, and the content is positioned, so it paints above
 * the wash instead of under it — which is also what the design draws.
 *
 * This is the same trap as `after:z-[1]` on the stretched link in
 * CaseStudyCard. If a band on this site has a decorative absolute layer, check
 * the content above it is positioned too.
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
  /**
   * The /all-locations/ band as its own frames draw it (6491:6580 board,
   * 6750:8507 phone; Asim, 25 Sep 2026: "make it exactly like the figma").
   * Board: the heading at 38/1.18 and the body at 17/1.6 in a 686 column,
   * 20 apart, the buttons 12 below and 16 apart, the second one outlined in
   * white. Phone: a navy to green gradient in place of the watermark, py56,
   * 18 apart, the heading at 26/1.25, `bodyMobile` at 14.5/1.55, and 46 tall
   * buttons. Nothing else sets it, so every other page is unchanged.
   */
  narrow?: boolean
  /** A shorter body for the phone (narrow only). */
  bodyMobile?: string
}

/**
 * The band's contents, filling whatever box they are dropped into.
 *
 * Separate from `ClosingCta` because the homepage nests its CTA inside the
 * FAQ/CTA/footer section at y736 rather than placing it on the canvas, so it
 * needs the innards without another <Section> around them.
 */
export function ClosingCtaBand({ content }: { content: CtaContent }) {
  const n = content.narrow === true
  const body = (Array.isArray(content.body) ? content.body : [content.body]).join(' ')
  return (
    /*
     * Below lg this is an ordinary block in flow carrying the mobile frame's own
     * shell — 6619:2356: px20 / py48 / gap20 on #0c4e5a. It stays `relative` so
     * the watermark's `fill` box still has something to cover. At lg it goes
     * back to `absolute inset-0`, filling whatever Box or Section holds it.
     */
    <div
      className={`relative flex flex-col items-center overflow-hidden bg-[#0c4e5a] px-[20px] lg:absolute lg:inset-0 lg:justify-center lg:p-0 ${n
        ? 'gap-[18px] py-[56px] max-lg:bg-[linear-gradient(125.81deg,#0b1f3a_7.25%,#1b7a3d_79.71%)] lg:gap-[20px]'
        : 'gap-[20px] py-[48px] lg:gap-[22px]'}`}
    >
      {/* Watermark — 6107:3979, 1920x1081 at y-312.02, 10% opacity, flipped;
          6619:2366 on the phone, where it covers the band at 390x462. `fill`
          is what keeps it covering below lg — without it the wrapper collapses
          to zero height in flow and the picture is simply not there. */}
      <Box x={0} y={-312.02} w={1920} h={1081} fill className={`pointer-events-none opacity-10 ${n ? 'max-lg:hidden' : ''}`}>
        <Image src="/images/home/cta-bg.png" alt="" fill sizes="(min-width: 1024px) 1920px, 100vw" className="-scale-x-100 object-cover" />
      </Box>

      {/* Green wash — 6107:3981. Drawn at 270deg rather than 90deg: that is the
          design's horizontal flip, and it is what puts the green on the right.
          Desktop only: the mobile frame draws the watermark alone, with no
          gradient layer over it. */}
      <Box
        x={4} y={-259.02} w={1920} h={974.39}
        className="pointer-events-none hidden lg:block"
        style={{ backgroundImage: 'linear-gradient(270deg, rgba(27,122,61,0.639) 0%, rgba(27,122,61,0) 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)' }}
      />

      {/* 6107:2952 / 6619:2357 — 40/53.7 on the board, 26/32 on the phone.
          The heading width goes out as a CUSTOM PROPERTY rather than an inline
          `width`, because an inline width applies at every viewport: at 390 a
          723px heading is 333px of horizontal overflow. */}
      <h2
        className={`relative w-full text-center font-sans text-[26px] font-semibold text-white lg:w-[var(--cta-hw)] ${n
          ? 'leading-[1.25] lg:text-[38px] lg:leading-[1.18]'
          : 'leading-[32px] lg:text-[40px] lg:leading-[53.7px]'}`}
        style={{ '--cta-hw': `${content.headingWidth ?? (n ? 686 : 723)}px` } as React.CSSProperties}
      >
        {content.heading}
      </h2>

      {/* 6107:3101 / 6619:2358. Figma holds this as ONE text node, so the second
          sentence carries on along the first's last line — three lines at 1084
          wide, not four. Pages that supply a list get it joined rather than
          stacked, or the block sets to a different shape than the frame. */}
      {n ? (
        <p className="relative w-full text-center font-roboto text-[14.5px] leading-[1.55] text-white/80 lg:w-[686px] lg:text-[17px] lg:leading-[1.6]">
          {content.bodyMobile
            ? <><span className="lg:hidden">{content.bodyMobile}</span><span className="max-lg:hidden">{body}</span></>
            : body}
        </p>
      ) : (
        <p className="relative w-full text-center font-roboto text-[15px] leading-[22px] text-white/80 lg:w-[1084px] lg:text-[17.018px] lg:leading-[27.654px]">
          {body}
        </p>
      )}

      {/* 6491:6403 — 449.279 wide: a 210 filled button, 6px, then the bordered
          one at its own width. `min-w` rather than `w` so a page with a longer
          primary label gets a wider button instead of a clipped one.
          6619:2359 stacks them full-width at 12px apart on the phone. */}
      <div className={`relative flex w-full flex-col gap-[12px] lg:w-auto lg:flex-row lg:items-start ${n ? 'pt-[8px] lg:gap-[16px] lg:pt-[12px]' : 'lg:gap-[6px]'}`}>
        <Btn
          href={content.primary.href}
          variant="whiteFill"
          external={content.primary.external}
          className={`w-full justify-center lg:w-auto ${n ? 'max-lg:h-[46px]' : 'lg:min-w-[210px]'}`}
        >
          {content.primary.label}
        </Btn>
        <Btn
          href={content.secondary.href}
          variant="white"
          external={content.secondary.external}
          className={`w-full justify-center lg:w-auto ${n ? 'border border-white max-lg:h-[46px]' : ''}`}
        >
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
