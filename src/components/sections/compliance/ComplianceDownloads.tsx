import Link from 'next/link'
import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { Mark } from './ComplianceMarks'
import { DOWNLOADS } from '@/data/compliance-center'

/**
 * Compliance documentation — Figma 6389:1530, and on a phone 6674:5400 in
 * "Compliance Center - Mobile" (6638:8303, file BVtf2AOuUOcYbiMIlcKmbC).
 *
 * py 100 on #fcfcfc, gap 50: a 780px heading block, then three 410px cards on a
 * 24px gutter (1278, x321).
 *
 * MOBILE — 6674:5406. px20 / py48 / gap24, the heading block left-aligned, the
 * three cards stacked full width on a 16px gap at p24 with 14/21 body copy.
 * The frame draws "Request Download" as a bare 15px text line; kept as a
 * 44px-high row with its mark, both because a 15px link is not a tap target
 * and because the /downloads/ mobile frame (6638:10270) draws exactly that.
 *
 * !! THE THREE PDFs DO NOT EXIST. The frame's action label is "Request
 * Download", not "Download", so each card links to /contact-us/ rather than to
 * a file that would 404. See the note above DOWNLOADS in
 * src/data/compliance-center.ts for what to change when the files are produced.
 */
export function ComplianceDownloads({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6389:1530"
      className="flex flex-col items-start gap-[24px] bg-[#fcfcfc] px-[20px] py-[48px] lg:items-center lg:gap-[50px] lg:px-0 lg:py-[100px]">
      {/* Heading block — 6390:1559 */}
      <div className="flex w-full flex-col items-start gap-[24px] text-left lg:w-[780px] lg:items-center lg:gap-[10px] lg:text-center">
        <Eyebrow>{DOWNLOADS.eyebrow}</Eyebrow>
        <h2 className="w-[780px] font-sans text-[40px] font-semibold leading-[1.3] text-black max-lg:w-full max-lg:text-[26px] max-lg:leading-[32px]">
          {DOWNLOADS.heading}
        </h2>
        <p className="w-[780px] font-roboto text-[17px] leading-[1.175] text-muted max-lg:w-full max-lg:text-[16px] max-lg:leading-[24px]">{DOWNLOADS.lead}</p>
      </div>

      {/* Cards — 6390:1564 */}
      <div className="flex items-start gap-[24px] max-lg:w-full max-lg:flex-col max-lg:gap-[16px]">
        {DOWNLOADS.cards.map((c) => (
          <article key={c.title}
            className="flex w-[410px] shrink-0 flex-col items-start gap-[16px] rounded-[12px] border border-line bg-white p-[32px] max-lg:w-full max-lg:p-[24px]">
            <div className="flex h-[44px] w-[346px] items-center justify-between max-lg:w-full">
              <span className="grid size-[44px] shrink-0 place-items-center rounded-full bg-brand fill-white">
                <Mark glyph={c.glyph} size={20} />
              </span>
              <span className="font-roboto text-[11px] font-bold tracking-[0.6px] text-[#a6a6a6]">{c.kind}</span>
            </div>
            <h3 className="w-[346px] font-sans text-[19px] font-medium leading-[1.3] text-heading max-lg:w-full">{c.title}</h3>
            <p className="w-[346px] font-roboto text-[14.5px] leading-[1.55] text-muted max-lg:w-full max-lg:text-[14px] max-lg:leading-[21px]">{c.body}</p>
            <Link href={c.href}
              className="flex items-center gap-[8px] fill-brand font-roboto text-[14px] font-bold text-brand hover:underline max-lg:min-h-[44px]">
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
