import Link from 'next/link'
import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { Mark } from './ComplianceMarks'
import { DOWNLOADS } from '@/data/compliance-center'

/**
 * Compliance documentation — Figma 6389:1530. py 100 on #fcfcfc, gap 50: a
 * 780px heading block, then three 410px cards on a 24px gutter (1278, x321).
 *
 * !! THE THREE PDFs DO NOT EXIST. The frame's action label is "Request
 * Download", not "Download", so each card links to /contact-us/ rather than to
 * a file that would 404. See the note above DOWNLOADS in
 * src/data/compliance-center.ts for what to change when the files are produced.
 */
export function ComplianceDownloads({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6389:1530"
      className="flex flex-col items-center gap-[50px] bg-[#fcfcfc] py-[100px]">
      {/* Heading block — 6390:1559 */}
      <div className="flex w-[780px] flex-col items-center gap-[10px] text-center">
        <Eyebrow>{DOWNLOADS.eyebrow}</Eyebrow>
        <h2 className="w-[780px] font-sans text-[40px] font-semibold leading-[1.3] text-black">
          {DOWNLOADS.heading}
        </h2>
        <p className="w-[780px] font-roboto text-[17px] leading-[1.175] text-muted">{DOWNLOADS.lead}</p>
      </div>

      {/* Cards — 6390:1564 */}
      <div className="flex items-start gap-[24px]">
        {DOWNLOADS.cards.map((c) => (
          <article key={c.title}
            className="flex w-[410px] shrink-0 flex-col items-start gap-[16px] rounded-[12px] border border-line bg-white p-[32px]">
            <div className="flex h-[44px] w-[346px] items-center justify-between">
              <span className="grid size-[44px] shrink-0 place-items-center rounded-full bg-brand fill-white">
                <Mark glyph={c.glyph} size={20} />
              </span>
              <span className="font-roboto text-[11px] font-bold tracking-[0.6px] text-[#a6a6a6]">{c.kind}</span>
            </div>
            <h3 className="w-[346px] font-sans text-[19px] font-medium leading-[1.3] text-heading">{c.title}</h3>
            <p className="w-[346px] font-roboto text-[14.5px] leading-[1.55] text-muted">{c.body}</p>
            <Link href={c.href}
              className="flex items-center gap-[8px] fill-brand font-roboto text-[14px] font-bold text-brand hover:underline">
              <Mark glyph="arrow" size={16} />
              <span className="whitespace-nowrap">
                {DOWNLOADS.action}
                <span className="sr-only"> — {c.title}</span>
              </span>
            </Link>
          </article>
        ))}
      </div>
    </Section>
  )
}
