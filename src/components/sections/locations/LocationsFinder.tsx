import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { GLYPHS } from '@/components/ui/Glyph'
import { LocationSearch } from '@/components/client/LocationSearch'
import { FINDER } from '@/data/locations'

/**
 * Location finder — Figma 6377:967. py 90, gap 40: heading block on a 780px
 * column, the search bar, then a 1282px row of a 760px map panel and a 490px
 * facility list with a 32px gutter.
 *
 * THE MAP IS NOT A MAP. The frame draws a gradient panel with two pinned labels
 * and captions itself "Illustrative map — search above for exact directions",
 * and the content doc marks the map as still needing directions. So it is built
 * as drawn rather than dropped in as an embed: an embed would promise routing
 * the page cannot deliver, and would put a third-party script on a page that
 * has none.
 */
const PIN_36 = 'M18 2a11 11 0 0 0-11 11c0 7.9 9.8 19.1 10.2 19.6a1 1 0 0 0 1.5 0C19.2 32.1 29 20.9 29 13A11 11 0 0 0 18 2Zm0 15.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z'

export function LocationsFinder({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6377:967"
      className="flex flex-col items-center gap-[40px] bg-white py-[90px]">
      <div className="flex w-[780px] flex-col items-center gap-[10px] text-center">
        <Eyebrow>{FINDER.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[40px] font-semibold leading-[1.3] text-black">{FINDER.heading}</h2>
        <p className="font-roboto text-[17px] leading-[1.175] text-muted">{FINDER.lead}</p>
      </div>

      <LocationSearch />

      <div className="flex items-start gap-[32px]">
        {/* Map panel — 6377:7041, 760x460, r16, 125.301deg gradient. */}
        <div
          className="relative h-[460px] w-[760px] shrink-0 overflow-hidden rounded-[16px]"
          style={{ backgroundImage: 'linear-gradient(125.301deg, #eaf4f5 10%, #d8eef0 90%)' }}
        >
          <p className="absolute left-[24px] top-[24px] flex h-[32px] items-center rounded-[8px] bg-white/85 px-[14px] font-roboto text-[12.5px] leading-[1.175] text-muted">
            {FINDER.map.note}
          </p>
          {FINDER.map.pins.map((p) => (
            <div key={p.label} className="absolute flex flex-col items-center gap-[8px]" style={{ left: p.x, top: p.y }}>
              <svg viewBox="0 0 36 36" className="size-[36px] fill-brand drop-shadow-[0px_2px_4px_rgba(0,0,0,0.18)]" aria-hidden="true">
                <path d={PIN_36} />
              </svg>
              <span className="flex h-[30px] items-center whitespace-nowrap rounded-full bg-white px-[14px] font-sans text-[13px] font-medium leading-[1.3] text-heading shadow-[0px_2px_6px_0px_rgba(0,0,0,0.12)]">
                {p.label}
              </span>
            </div>
          ))}
        </div>

        {/* Facility list — 6377:7056, three 490x90 rows, gap 16. */}
        <ul className="flex w-[490px] shrink-0 flex-col gap-[16px]">
          {FINDER.facilities.map((f) => (
            <li key={f.name}
              className={`flex h-[90px] w-[490px] items-center gap-[16px] rounded-[12px] p-[20px] ${
                f.tone === 'teal' ? 'bg-brand-soft' : 'border border-line bg-white'}`}>
              <span className="grid size-[32px] shrink-0 place-items-center rounded-full bg-brand">
                <svg viewBox="0 0 16 16" className="size-[16px] fill-white" aria-hidden="true"><path d={GLYPHS[f.glyph]} /></svg>
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-[4px]">
                <span className="font-sans text-[16px] font-medium leading-[1.3] text-heading">{f.name}</span>
                <span className="font-poppins text-[13.5px] leading-[1.3] text-muted">{f.detail}</span>
              </span>
              {f.badge && (
                <span className="shrink-0 whitespace-nowrap font-sans text-[13px] font-medium leading-[1.3] text-brand">{f.badge}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
