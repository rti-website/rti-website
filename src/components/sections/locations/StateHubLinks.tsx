import Link from 'next/link'
import { Section } from '@/components/design/Frame'
import { Eyebrow, Lead } from '@/components/ui/Bits'
import { GLYPHS } from '@/components/ui/Glyph'
import { ALL_STATE_HUBS } from '@/data/state-hubs'
import { content } from '@/lib/page-content'
import { href } from '@/lib/urls'

/**
 * "Recycling by State" on /all-locations/ (14 Oct 2026): one card per state
 * hub, all nine, A to Z. No Figma frame; built in the state pages' county
 * card style (StateCounties). Copy: STATES in src/data/locations.ts.
 *
 * Desktop: py90, the heading block at 820, then a 1276 grid three to a row,
 * 20 apart. Phone: one column, py44 px20.
 */
export async function StateHubLinks({ top, height }: { top: number; height: number }) {
  const { STATES } = await content('locations')
  return (
    <Section top={top} height={height} label="state-hubs"
      className="flex flex-col items-center gap-[24px] bg-[#f3f3f3] px-[20px] py-[44px] lg:gap-[44px] lg:px-0 lg:py-[90px]">
      <div className="flex w-full flex-col items-center gap-[24px] text-center lg:w-[820px] lg:gap-[10px]">
        <Eyebrow>{STATES.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[26px] font-semibold leading-[30px] text-black lg:text-[38px] lg:leading-[1.3]">{STATES.heading}</h2>
        <Lead>{STATES.lead}</Lead>
      </div>
      <ul className="grid w-full grid-cols-1 gap-[14px] lg:w-[1276px] lg:grid-cols-3 lg:gap-[20px]">
        {ALL_STATE_HUBS.map((h) => (
          <li key={h.url}>
            <Link href={href(h.url)}
              className="group flex items-center gap-[14px] rounded-[12px] border border-[#e0e7ea] bg-white p-[18px] transition-[border-color,box-shadow] hover:border-brand hover:shadow-[0_10px_30px_rgba(5,131,139,0.12)] lg:p-[24px]">
              <span className="grid size-[40px] shrink-0 place-items-center rounded-[10px] bg-[#eaf4f5]">
                <svg viewBox="0 0 16 16" className="size-[18px] fill-brand" aria-hidden="true"><path d={GLYPHS.pin} /></svg>
              </span>
              <span className="flex min-w-px flex-1 flex-col gap-[2px]">
                <span className="font-sans text-[17px] font-semibold leading-[1.3] text-navy lg:text-[18px]">{h.state}</span>
                <span className="font-roboto text-[13px] font-medium text-brand group-hover:underline">{STATES.link} <span aria-hidden="true">&rarr;</span></span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
