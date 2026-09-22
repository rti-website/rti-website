import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { ACCOUNTABILITY } from '@/data/certifications-page'

/**
 * Accountability practices — Figma 6380:1098. py 100, gap 50: heading block on
 * a 780px column, then two 629px cards on a 24px gutter (1282 total, x319).
 *
 * On a phone — 6704:5142 in BVtf2AOuUOcYbiMIlcKmbC, 22 Sep 2026 — px20 / py40
 * on a 24px rhythm, the two cards stacked full width at p24 / gap 16, the
 * title at 19 and the bullets at 14 / 1.5 on a 12px gap. The frame draws the
 * cards WITHOUT a hairline and puts the section on #fafafa instead of the
 * board's #fcfcfc, and both are followed below lg: a white card with no border
 * needs the darker plate to read as a card at all.
 */
const MARKS: Record<string, string[]> = {
  link: [
    'M8.6 6.4H6.4a4.6 4.6 0 0 0 0 9.2h2.2v-2.1H6.4a2.5 2.5 0 0 1 0-5h2.2V6.4Z',
    'M13.4 6.4h2.2a4.6 4.6 0 0 1 0 9.2h-2.2v-2.1h2.2a2.5 2.5 0 0 0 0-5h-2.2V6.4Z',
    'M6.9 9.9h8.2V12H6.9V9.9Z',
  ],
  network: [
    'M16.4 1.5a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6Zm-10.8 6.2a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6Zm10.8 6.2a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6Z',
    'M8 9.4 14.1 6.3l1 1.9-6.2 3.1L8 9.4Zm0 3.2 1-1.9 6.2 3.1-1 1.9L8 12.6Z',
  ],
}

export function CertAccountability({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6380:1098"
      className="flex flex-col items-center gap-[24px] bg-[#fafafa] px-[20px] py-[40px] lg:gap-[50px] lg:bg-[#fcfcfc] lg:px-0 lg:py-[100px]">
      <div className="flex w-full flex-col items-center gap-[10px] text-center lg:w-[780px]">
        <Eyebrow>{ACCOUNTABILITY.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[26px] font-semibold leading-normal text-black lg:text-[40px] lg:leading-[1.3]">{ACCOUNTABILITY.heading}</h2>
        <p className="font-roboto text-[15px] leading-normal text-muted lg:text-[17px] lg:leading-[1.175]">{ACCOUNTABILITY.lead}</p>
      </div>

      <div className="flex w-full flex-col items-start gap-[24px] lg:w-[1282px] lg:flex-row">
        {ACCOUNTABILITY.cards.map((c) => (
          <article key={c.title} className="grad-card flex w-full flex-col items-start gap-[16px] rounded-[12px] border-line bg-white p-[24px] lg:w-[629px] lg:shrink-0 lg:gap-[18px] lg:border lg:p-[36px]">
            <span className="grad-card__disc grid size-[48px] shrink-0 place-items-center rounded-full bg-brand transition-colors">
              <svg viewBox="0 0 22 22" className="size-[22px] fill-white" aria-hidden="true">
                {(MARKS[c.glyph] ?? []).map((d) => <path key={d} d={d} />)}
              </svg>
            </span>
            <h3 className="w-full font-sans text-[19px] font-medium leading-normal text-heading lg:w-[557px] lg:text-[22px] lg:leading-[1.3]">{c.title}</h3>
            <ul className="flex w-full flex-col gap-[12px] lg:w-[557px] lg:gap-[10px]">
              {c.points.map((t) => (
                <li key={t} className="flex items-start gap-[10px]">
                  <span className="grad-card__dot mt-[7px] size-[6px] shrink-0 rounded-full bg-brand transition-colors" aria-hidden="true" />
                  <span className="min-w-px flex-1 font-roboto text-[14px] leading-[1.5] text-muted lg:w-[535px] lg:flex-none lg:text-[15px]">{t}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
