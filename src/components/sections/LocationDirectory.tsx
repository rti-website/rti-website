import Link from 'next/link'
import { Box } from '@/components/design/Frame'
import { href } from '@/lib/urls'
import { DIRECTORY_COLS, DIRECTORY_H, DIRECTORY_ROW_GAP, DIRECTORY_ROW_H } from '@/lib/layout'
import type { DirectoryCopyGroup } from '@/data/county-pages/directory'
import { content } from '@/lib/page-content'

/**
 * The location directory in the footer (29 Sep 2026) — Asim: "add the
 * location below the footer as u see the reference … make it like main city
 * name heading and their county below it … for all the counties". The
 * reference is a store footer: columns, each a heading, "See all", and the
 * links under it.
 *
 * One column per county or main city (src/data/county-pages/directory.ts):
 * the heading links to its own page when it has one, "See all" to the
 * state's Counties We Serve, and the links are the pages under it.
 *
 * No frame draws it, so it is set in the footer's own type: 16px IBM Plex
 * Medium headings (the link columns' HEADING) over 13.5px Poppins links in
 * the muted grey, on the footer's #fcfcfc, ruled off above like the bottom
 * bar. At lg a fixed band, DIRECTORY_H tall, seven columns a row
 * (DIRECTORY_COLS) at a fixed row height, which is what lets FOOTER_H stay a
 * number; below lg two columns in the flow.
 */
export async function LocationDirectory({ y }: { y: number }) {
  // The words as Admin -> Pages has them ("Location directory", 1 Oct 2026).
  const { DIRECTORY_COPY: d } = await content('locations-directory')
  return (
    <Box x={0} y={y} w={1920} h={DIRECTORY_H} className="w-full border-t border-line pt-[28px] lg:pt-0">
      <nav aria-labelledby="location-directory-title" className="lg:absolute lg:left-[319px] lg:top-[40px] lg:w-[1282px]">
        <h2 id="location-directory-title" className="font-sans text-[18px] font-semibold leading-[24px] text-ink lg:text-[20px] lg:leading-[26px]">
          {d.title}
        </h2>
        <div
          className="mt-[20px] grid grid-cols-2 gap-x-[20px] gap-y-[24px] lg:mt-[24px] lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))] lg:auto-rows-[var(--row-h)] lg:gap-x-[24px] lg:gap-y-[var(--row-gap)]"
          style={{ '--cols': DIRECTORY_COLS, '--row-h': `${DIRECTORY_ROW_H}px`, '--row-gap': `${DIRECTORY_ROW_GAP}px` } as React.CSSProperties}
        >
          {d.groups.map((g, i) => <Column key={`${g.heading}-${i}`} g={g} seeAllLabel={d.seeAll} />)}
        </div>
      </nav>
    </Box>
  )
}

/** Where "See all" goes: the state's Counties We Serve, or the mail-in program. */
function seeAll(g: DirectoryCopyGroup): string {
  if (g.state === 'Minnesota') return `${href('/minnesota-recycling/')}#counties-we-serve`
  if (g.state === 'Wisconsin') return `${href('/wisconsin-recycling/')}#counties-we-serve`
  return href('/mail-in-recycling/')
}

function Column({ g, seeAllLabel }: { g: DirectoryCopyGroup; seeAllLabel: string }) {
  return (
    <div className="min-w-0">
      <h3 className="font-sans text-[15px] font-medium leading-[20px] tracking-[0.48px] text-black lg:text-[16px] lg:leading-[21px]">
        {g.url ? <Link href={href(g.url)} className="hover:text-brand">{g.heading}</Link> : g.heading}
      </h3>
      <Link href={seeAll(g)} className="mt-[4px] inline-block font-roboto text-[13px] font-medium leading-[18px] text-brand hover:underline">
        {seeAllLabel}
      </Link>
      {g.links.length > 0 && (
        <ul className="mt-[8px] flex flex-col gap-[2px] lg:mt-[12px] lg:gap-[5px]">
          {g.links.map((x) => (
            <li key={x.url}>
              <Link href={href(x.url)} className="block py-[4px] font-roboto text-[13.5px] leading-[20px] text-muted hover:text-brand lg:py-0 lg:font-poppins">
                {x.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
