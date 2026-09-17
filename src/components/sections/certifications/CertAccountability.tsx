import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { ACCOUNTABILITY } from '@/data/certifications-page'

/**
 * Accountability practices — Figma 6380:1098. py 100, gap 50: heading block on
 * a 780px column, then two 629px cards on a 24px gutter (1282 total, x319).
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
      className="flex flex-col items-center gap-[50px] bg-[#fcfcfc] py-[100px]">
      <div className="flex w-[780px] flex-col items-center gap-[10px] text-center">
        <Eyebrow>{ACCOUNTABILITY.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[40px] font-semibold leading-[1.3] text-black">{ACCOUNTABILITY.heading}</h2>
        <p className="font-roboto text-[17px] leading-[1.175] text-muted">{ACCOUNTABILITY.lead}</p>
      </div>

      <div className="flex w-[1282px] items-start gap-[24px]">
        {ACCOUNTABILITY.cards.map((c) => (
          <article key={c.title} className="flex w-[629px] shrink-0 flex-col items-start gap-[18px] rounded-[12px] border border-line bg-white p-[36px]">
            <span className="grid size-[48px] shrink-0 place-items-center rounded-full bg-brand">
              <svg viewBox="0 0 22 22" className="size-[22px] fill-white" aria-hidden="true">
                {(MARKS[c.glyph] ?? []).map((d) => <path key={d} d={d} />)}
              </svg>
            </span>
            <h3 className="w-[557px] font-sans text-[22px] font-medium leading-[1.3] text-heading">{c.title}</h3>
            <ul className="flex w-[557px] flex-col gap-[10px]">
              {c.points.map((t) => (
                <li key={t} className="flex items-start gap-[10px]">
                  <span className="mt-[7px] size-[6px] shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  <span className="w-[535px] font-roboto text-[15px] leading-[1.5] text-muted">{t}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
