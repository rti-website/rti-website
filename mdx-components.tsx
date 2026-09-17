import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

/**
 * Required by @next/mdx with the App Router — MDX will not work without this
 * file at the project root.
 *
 * Body copy is migrated verbatim from WordPress, so keep overrides structural
 * (styling, link handling) and never rewrite content here.
 *
 * The type scale is Figma 6494:1749 "Section - Article Body" in
 * RJFB6BtCpcCW1C3isO8809: h2 at 26/34, body at 17/27, lists at 17/26, the
 * reference table at 46-tall rows. Sizes are read off the frame's measured
 * heights rather than guessed — an h2 box is 34 tall, a three-line paragraph
 * 81, which is 3 x 27.
 *
 * The bespoke blocks (KeyTakeaways, PullQuote, SymbolGrid) are exported for MDX
 * to use by name. They are components rather than raw markup in every post so
 * a change to the callout style is one edit, not one per article.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (p) => (
      <h2 className="mt-[60px] scroll-mt-[90px] font-sans text-[26px] font-semibold leading-[34px] text-[#132119]" {...p} />
    ),
    h3: (p) => (
      <h3 className="mt-[36px] font-sans text-[20px] font-medium leading-[28px] text-[#132119]" {...p} />
    ),
    p: (p) => (
      <p className="mt-[20px] font-roboto text-[17px] leading-[27px] text-[#4a4a4a]" {...p} />
    ),
    ul: (p) => <ul className="mt-[20px] flex flex-col gap-[10px]" {...p} />,
    ol: (p) => <ol className="mt-[20px] flex list-decimal flex-col gap-[10px] pl-[22px]" {...p} />,
    li: (p) => (
      <li className="relative pl-[18px] font-roboto text-[17px] leading-[26px] text-[#4a4a4a] marker:text-brand
                     before:absolute before:left-0 before:top-[10px] before:size-[6px] before:rounded-full before:bg-brand
                     [ol>&]:pl-0 [ol>&]:before:hidden" {...p} />
    ),
    strong: (p) => <strong className="font-semibold text-[#132119]" {...p} />,
    a: ({ href = '', ...p }) => {
      const external = /^https?:\/\//.test(href)
      return external
        ? <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-2" {...p} />
        : <Link href={href} className="text-brand underline underline-offset-2" {...p} />
    },
    blockquote: (p) => <PullQuote {...p} />,
    table: (p) => (
      // border-separate, not the Tailwind preflight's collapse: a collapsed
      // table ignores its own border radius and the overflow-hidden that rounds
      // it. Row rules therefore live on the cells, never on the <tr>.
      <div className="mt-[28px] overflow-hidden rounded-[10px] border border-[#e5e5e5]">
        <table className="w-full border-separate border-spacing-0 text-left" {...p} />
      </div>
    ),
    th: (p) => (
      <th className="border-b border-[#e5e5e5] bg-[#f7faf9] px-[20px] py-[14px] font-sans text-[14px] font-semibold text-[#132119]" {...p} />
    ),
    td: (p) => (
      <td className="border-b border-[#e5e5e5] px-[20px] py-[14px] font-roboto text-[14px] text-[#4a4a4a] last:[&]:border-b-0" {...p} />
    ),
    img: (p) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img className="mt-[28px] w-full rounded-[12px]" alt="" {...p} />
    ),
    KeyTakeaways,
    PullQuote,
    SymbolGrid,
    ...components,
  }
}

/**
 * The bordered callout under the intro — 6497:1766, 760x229 on #f4f9f6 with a
 * teal left rule.
 */
export function KeyTakeaways({ children }: { children?: React.ReactNode }) {
  return (
    <div className="mt-[34px] rounded-[12px] border border-[#dbe9e2] bg-[#f4f9f6] p-[31px]">
      <p className="flex items-center gap-[10px] font-sans text-[17px] font-semibold text-[#132119]">
        <svg viewBox="0 0 20 20" className="size-[20px] fill-brand" aria-hidden="true">
          <path d="M10 1.6a6 6 0 0 0-3.4 10.9c.5.4.8.9.9 1.5h5a2.6 2.6 0 0 1 .9-1.5A6 6 0 0 0 10 1.6ZM7.6 15.4h4.8v1.2H7.6v-1.2Zm.7 2.4h3.4a1.7 1.7 0 0 1-3.4 0Z" />
        </svg>
        Key Takeaways
      </p>
      <div className="mt-[14px] flex flex-col gap-[14px]">{children}</div>
    </div>
  )
}

/** One takeaway line, with the tick — 6497:1771 and siblings. */
export function Takeaway({ children }: { children?: React.ReactNode }) {
  return (
    <p className="flex items-start gap-[12px] font-roboto text-[15.5px] leading-[23px] text-[#3f4a44]">
      <svg viewBox="0 0 18 18" className="mt-[3px] size-[18px] shrink-0 fill-brand" aria-hidden="true">
        <path d="M9 .8a8.2 8.2 0 1 0 0 16.4A8.2 8.2 0 0 0 9 .8Zm-1 12L4.3 9.1l1.3-1.3L8 10.2l4.4-4.4 1.3 1.3L8 12.8Z" />
      </svg>
      <span>{children}</span>
    </p>
  )
}

/** The emphasised paragraph — 6499:1753, 760x100 with a teal left rule. */
export function PullQuote({ children }: { children?: React.ReactNode }) {
  return (
    <blockquote className="mt-[34px] border-l-[3px] border-brand bg-[#fafbfb] py-[8px] pl-[26px] pr-[23px]">
      <div className="font-sans text-[18px] font-medium italic leading-[29px] text-[#132119] [&>p]:m-0">
        {children}
      </div>
    </blockquote>
  )
}

/**
 * The cheat-sheet cards — 6498:1754. Three 240-wide cards per row on a 752 grid
 * with a 16px gutter, each a 48px tinted disc, a title and a short gloss.
 */
export function SymbolGrid({ children }: { children?: React.ReactNode }) {
  return <div className="mt-[30px] grid grid-cols-3 gap-[16px]">{children}</div>
}

/** One cheat-sheet card — 6498:1755. */
export function SymbolCard({ label, children }: { label: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-[12px] border border-[#e5e5e5] bg-white p-[20px]">
      <span className="grid size-[48px] place-items-center rounded-[12px] bg-[#eaf4f5]">
        <svg viewBox="0 0 26 26" className="size-[26px] fill-brand" aria-hidden="true">
          <path d="M13 2.6a10.4 10.4 0 1 0 0 20.8 10.4 10.4 0 0 0 0-20.8Zm0 2.6 3.2 5.5h-2.1v4.2h-2.2v-4.2H9.8L13 5.2Zm-6 8.9 2 3.5-1.8 1 1.1 1.9h-4l2-3.4-1.8-1 2.5-2Zm12 0 2.5 2-1.8 1 2 3.4h-4l1.1-1.9-1.8-1 2-3.5Z" />
        </svg>
      </span>
      <p className="mt-[14px] font-sans text-[15px] font-medium text-[#132119]">{label}</p>
      <p className="mt-[8px] font-roboto text-[13.5px] leading-[20px] text-[#7e7e7e]">{children}</p>
    </div>
  )
}
