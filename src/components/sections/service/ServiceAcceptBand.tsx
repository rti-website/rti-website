import Link from 'next/link'
import { Section } from '@/components/design/Frame'

/**
 * "What We Accept" — Figma 6142:2067. 1920x446.36, white, px340,
 * column, gap 30, justify-center.
 *
 * The grid is Figma's "Paragraph+Border" component: two columns, gap 20, each
 * cell a 1px #e5e5e5 box, px24 py10, with a fixed 145px label column in IBM
 * Plex Mono and the description filling the rest.
 *
 * The design fills it with six numbered placeholder rows; real content is four
 * equipment categories, so the grid runs two rows. The band is justify-center,
 * so it keeps its Figma height and the shorter grid simply centres.
 */
export function ServiceAcceptBand({
  top, height = 446.36, label, heading, intro, items, outro, id,
}: {
  top: number
  /** Anchor target for the preceding block's "Read More" link. */
  id?: string
  height?: number
  label?: string
  heading: string
  intro?: string
  /** May be empty: the mail-in doc has no published eligibility list yet. */
  items: { label: string; text: string; href?: string; external?: boolean }[]
  outro?: string
}) {
  const rows: typeof items[] = []
  for (let i = 0; i < items.length; i += 2) rows.push(items.slice(i, i + 2))

  return (
    <Section
      top={top} height={height} label={label}
      className="flex flex-col items-center justify-center gap-[30px] bg-white px-[340px]"
    >
      {id && <span id={id} className="absolute -top-[140px]" aria-hidden="true" />}
      {/* 75px is Figma's box for a one-line heading; longer ones wrap, so the
          height is a minimum. Same fix as ServiceSplit's heading. */}
      <h2 className="flex min-h-[75px] w-[829px] items-center justify-center text-center font-sans text-[40px] font-semibold leading-[1.15] text-black">
        {heading}
      </h2>

      {intro && (
        <p className="w-full text-center font-roboto text-[17.018px] leading-[27.654px] text-muted">
          {intro}
        </p>
      )}

      {items.length > 0 && (
      <div className="flex w-full flex-col gap-[20px]">
        {rows.map((row, i) => (
          <div key={i} className="flex w-full items-stretch gap-[20px]">
            {row.map((item) => <Cell key={item.label} item={item} />)}
            {row.length === 1 && <div className="min-w-px flex-1" aria-hidden="true" />}
          </div>
        ))}
      </div>
      )}

      {outro && (
        <p className="w-full text-center font-roboto text-[17.018px] leading-[27.654px] text-muted">
          {outro}
        </p>
      )}
    </Section>
  )
}

/**
 * One bordered cell. On the industry pages each names a service and links to
 * its page, so the whole cell is the link; on the service pages there is
 * nothing to link to and it stays a plain div.
 */
function Cell({ item }: { item: { label: string; text: string; href?: string; external?: boolean } }) {
  const cls = 'flex min-w-px flex-1 items-center gap-[10px] border border-line px-[24px] py-[10px]'
  const inner = (
    <>
      <span className="w-[145px] shrink-0 font-mono text-[14px] font-medium uppercase leading-[15.95px] tracking-[1.32px] text-brand">
        {item.label}
      </span>
      <span className="min-w-px flex-1 font-roboto text-[14px] leading-[21.6px] text-muted">
        {item.text}
      </span>
    </>
  )
  if (!item.href) {
    return <div className={cls} style={{ minHeight: 71.787 }}>{inner}</div>
  }
  const linked = `${cls} transition-colors hover:border-brand`
  return item.external
    ? <a href={item.href} target="_blank" rel="noopener noreferrer" className={linked} style={{ minHeight: 71.787 }}>{inner}</a>
    : <Link href={item.href} className={linked} style={{ minHeight: 71.787 }}>{inner}</Link>
}
