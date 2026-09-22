import Image from 'next/image'
import { GRID, type CaseStudyCard as Card } from '@/data/case-studies'

/**
 * One case-study card — Figma 6391:1549 on /case-studies/ and 6390:1533 on
 * /compliance-center/. Byte-identical frames, so one component serves both.
 *
 * ===========================================================================
 * REDRAWN 22 Sep 2026 — Asim: "show the case study cards like this, small
 * cards, our pdf preview", with an ERI resources page as the reference.
 * ===========================================================================
 *   BEFORE  a tall card carrying the whole story: challenge, approach, the
 *           key-benefits list, the customer quote and a download link. Three
 *           of them made a 1345px row, and nobody reads a case study in a grid.
 *   NOW     a small card that SELLS the PDF: page one as a preview, the title,
 *           one line of why you would open it, and a download control. The
 *           full story lives in the document, which is where it was written.
 *
 * The long-form fields (challenge, approach, benefits, quote) stay in
 * src/data/case-studies.ts on purpose. They are not dead: they are the page's
 * only machine-readable description of each engagement, and if a detail page
 * per case study is ever built it should read them rather than re-typing the
 * PDFs. Do not delete them to "tidy up" this component.
 *
 * THE WHOLE CARD OPENS THE PDF. Done with the stretched-link pattern rather
 * than by wrapping the <article> in an <a>: the card also carries a download
 * control, and an anchor inside an anchor is invalid HTML that browsers
 * silently un-nest, breaking both. The title is the card's one real link and
 * its ::after covers the card; the download button sets `relative z-10` to sit
 * above that pseudo-element and keep its own clicks.
 *
 * `after:z-[1]` is load-bearing — without it the overlay is painted in normal
 * flow order and every element AFTER the heading covers it, so clicks on the
 * blurb did nothing.
 */
export function CaseStudyCardView({ card }: { card: Card }) {
  return (
    <article className="group relative flex w-full flex-col self-stretch overflow-hidden rounded-[12px] border border-line bg-white transition-shadow hover:shadow-[0_10px_28px_rgba(15,23,42,0.10)] lg:w-[410px] lg:shrink-0">
      {/* Preview — page one of the PDF, anchored to the top so the masthead and
          headline are what you see. `pointer-events-none` keeps the image from
          eating the stretched link; the whole tile is still clickable. */}
      <div className="relative h-[230px] w-full shrink-0 overflow-hidden bg-mist lg:h-[248px]">
        <Image
          src={card.preview}
          alt=""
          fill
          sizes="(min-width: 1024px) 410px, 100vw"
          className="pointer-events-none object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" aria-hidden="true" />
      </div>

      <div className="flex flex-1 flex-col gap-[10px] p-[24px]">
        <p className="font-roboto text-[11px] font-bold uppercase tracking-[0.6px] text-brand">
          {card.industry}
        </p>

        <div className="flex items-start justify-between gap-[14px]">
          <h3 className="min-w-px flex-1 font-sans text-[18px] font-semibold leading-[1.3] text-heading">
            <a
              href={card.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 after:absolute after:inset-0 after:z-[1] after:rounded-[12px] after:content-[''] group-hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              {card.title}
            </a>
          </h3>

          {/* Download. `download` asks the browser to SAVE, where the card
              itself opens the PDF for reading. 44px so it is a real touch
              target, and `relative z-10` to clear the stretched link. */}
          <a
            href={card.pdf}
            download
            className="relative z-10 grid size-[44px] shrink-0 place-items-center rounded-[8px] border border-line text-brand transition-colors hover:border-brand hover:bg-brand hover:text-white"
            aria-label={`${GRID.downloadLabel}: ${card.title} (PDF, ${card.pdfSize})`}
          >
            <svg viewBox="0 0 20 20" className="size-[18px] fill-current" aria-hidden="true">
              <path d="M9 2h2v7.2l2.6-2.6 1.4 1.4-5 5-5-5 1.4-1.4L9 9.2V2Z" />
              <path d="M3 14h14v2.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5V14Z" />
            </svg>
          </a>
        </div>

        <p className="font-roboto text-[14px] leading-[1.55] text-muted">{card.blurb}</p>

        <p className="mt-auto pt-[6px] font-roboto text-[12px] text-muted/80">PDF · {card.pdfSize}</p>
      </div>
    </article>
  )
}
