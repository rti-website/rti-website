import { Section } from '@/components/design/Frame'
import { HOME_BELOW_CERT_SHIFT } from '@/lib/layout'
import { IMPACT_STATS } from '@/data/home'

/**
 * Impact figures — Figma 6873:13941 (board) and 6873:14158 (phone), placed
 * under Our Services on 25 Sep 2026. Asim: "move the numbers below our
 * services section from the testimonial section".
 *
 * Board: 1282 x 154 at x319, 150 under Our Services (the frame's gap), a
 * black-to-teal band (r20, p30) holding four equal glass cards 20 apart —
 * white/8 with a white/15 border, r14, px16 py18 — each a 26px IBM Plex Bold
 * figure over a 14/16 Roboto Medium label at white/65, centred.
 *
 * Phone: the same band at 350 wide, r16, px16 py20, the cards two by two
 * (12 across, 16 down), figure 22 and label 11. It follows the "Don't See
 * Your Item?" card, 20 under it (OurServices ends its phone padding at 20).
 *
 * The top is Our Services' own (1679) plus the frame's 969 and 150. It sits
 * in page.tsx's moving wrapper, so it follows Our Services when a one-row tab
 * makes that section shorter.
 */
export const IMPACT_H = 154

export function ImpactStats() {
  return (
    <Section
      top={1679 + 969 + 150 - HOME_BELOW_CERT_SHIFT} left={319} width={1282} height={IMPACT_H}
      label="6873:13941"
      className="bg-white px-[20px] pb-[48px] lg:bg-transparent lg:p-0"
    >
      <div
        className="flex size-full flex-col justify-center rounded-[16px] px-[16px] py-[20px] lg:rounded-[20px] lg:p-[30px]"
        style={{ backgroundImage: 'linear-gradient(270deg, #05838b 0%, #000 102.1%)' }}
      >
        <dl className="grid w-full grid-cols-2 gap-x-[12px] gap-y-[16px] text-center lg:flex lg:gap-[20px]">
          {IMPACT_STATS.map((s) => (
            <div key={s.l} className="flex min-w-px flex-col items-center gap-[8px] rounded-[14px] border border-white/15 bg-white/[0.08] px-[16px] py-[18px] lg:flex-1">
              <dt className="order-2 w-full font-roboto text-[11px] font-medium leading-[16px] text-white/65 lg:text-[14px]">{s.l}</dt>
              <dd className="order-1 w-full font-sans text-[22px] font-bold leading-normal text-white lg:text-[26px]">{s.n}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
