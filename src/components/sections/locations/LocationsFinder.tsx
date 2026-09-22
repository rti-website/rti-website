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
 *
 * MOBILE — Figma 6669:2420 ("Locations - Mobile" 6638:2230). 390 wide:
 * px20 / py48 on white and a flat 24px gap down the whole section, so the
 * heading block, the search, the map and the facility list are all one rhythm
 * apart. The two-column map/list row collapses with `lg:contents` rather than
 * being re-nested.
 *
 * !! THE PINS STAY. The homepage Locations section hides its map furniture
 * below lg because those pins point at board coordinates. Here they do not:
 * 6669:2434 sits at x119.74 y62.17 of a 350x260 panel, which is the SAME
 * fraction (34.21% / 23.91%) as x260 y110 of the desktop 760x460 panel. So the
 * coordinates are expressed as percentages of the panel and one rule serves
 * both frames — at 760 wide `34.21%` computes back to exactly 260px, so the
 * desktop render is unchanged. (The second pin's mobile x is 191.45 where the
 * proportional value is 216.4; the frame nudged it. The proportional position
 * is used, since it is the one that matches the desktop drawing.)
 */
const PIN_36 = 'M18 2a11 11 0 0 0-11 11c0 7.9 9.8 19.1 10.2 19.6a1 1 0 0 0 1.5 0C19.2 32.1 29 20.9 29 13A11 11 0 0 0 18 2Zm0 15.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z'

/** The panel the pin coordinates in src/data/locations.ts were measured on. */
const MAP_W = 760
const MAP_H = 460

export function LocationsFinder({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6377:967"
      className="flex flex-col items-center gap-[24px] bg-white px-[20px] py-[48px] lg:gap-[40px] lg:px-0 lg:py-[90px]">
      {/* Heading block — 6377:970 / 6669:2421..2424. The phone runs the same
          24px gap the section does, so the block reads as part of the rhythm. */}
      <div className="flex w-full flex-col items-center gap-[24px] text-center lg:w-[780px] lg:gap-[10px]">
        <Eyebrow>{FINDER.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[26px] font-semibold leading-[32px] text-black lg:text-[40px] lg:leading-[1.3]">{FINDER.heading}</h2>
        <p className="font-roboto text-[15px] leading-[22px] text-muted lg:text-[17px] lg:leading-[1.175]">{FINDER.lead}</p>
      </div>

      {/*
        6669:2425 + 6669:2430 — the phone splits the 680px bar into a 350x50
        input and a full-width Search button 24px under it. `client/BarForm.tsx`
        still draws one 56px row with an inline `width`, and that file belongs to
        another pass, so the reshape is driven from here: `!` because an inline
        width and `h-[56px]` both have to be out-ranked. `lg:contents` puts the
        form straight back on the board. Delete this wrapper's utilities once
        BarForm answers the frame itself; it is a no-op then.
      */}
      <div className="w-full lg:contents
        max-lg:[&>form]:h-auto! max-lg:[&>form]:w-full! max-lg:[&>form]:flex-col max-lg:[&>form]:items-stretch max-lg:[&>form]:gap-[24px] max-lg:[&>form]:rounded-none! max-lg:[&>form]:border-0! max-lg:[&>form]:bg-transparent! max-lg:[&>form]:p-0!
        max-lg:[&>form>div]:h-[50px] max-lg:[&>form>div]:rounded-[8px] max-lg:[&>form>div]:border max-lg:[&>form>div]:border-field max-lg:[&>form>div]:bg-white max-lg:[&>form>div]:px-[16px]
        max-lg:[&>form>button]:w-full max-lg:[&>form>button]:justify-center">
        <LocationSearch />
      </div>

      {/* The map/list row is two columns at lg and two more items in the
          section's own 24px column below it — see lesson 3 in the pattern note. */}
      <div className="flex items-start gap-[32px] max-lg:contents">
        {/* Map panel — 6377:7041, 760x460, r16, 125.301deg gradient;
            6669:2433 at 350x260 on the phone. */}
        <div
          className="relative h-[260px] w-full shrink-0 overflow-hidden rounded-[16px] lg:h-[460px] lg:w-[760px]"
          style={{ backgroundImage: 'linear-gradient(125.301deg, #eaf4f5 10%, #d8eef0 90%)' }}
        >
          <p className="absolute left-[10px] top-[10px] flex h-[32px] w-[300px] max-w-[calc(100%-20px)] items-center rounded-[8px] bg-white/85 px-[14px] font-roboto text-[12.5px] leading-[1.175] text-muted lg:left-[24px] lg:top-[24px] lg:w-auto lg:max-w-none">
            {FINDER.map.note}
          </p>
          {FINDER.map.pins.map((p) => (
            <div
              key={p.label}
              className="absolute flex flex-col items-center gap-[8px]"
              style={{ left: `${(p.x / MAP_W) * 100}%`, top: `${(p.y / MAP_H) * 100}%` }}
            >
              <svg viewBox="0 0 36 36" className="size-[36px] fill-brand drop-shadow-[0px_2px_4px_rgba(0,0,0,0.18)]" aria-hidden="true">
                <path d={PIN_36} />
              </svg>
              <span className="flex h-[30px] items-center whitespace-nowrap rounded-full bg-white px-[14px] font-sans text-[13px] font-medium leading-[1.3] text-heading shadow-[0px_2px_6px_0px_rgba(0,0,0,0.12)]">
                {p.label}
              </span>
            </div>
          ))}
        </div>

        {/* Facility list — 6377:7056, three 490x90 rows, gap 16; 6669:2448 on
            the phone, where the rows are full width, 12 apart, and as tall as
            an address that wraps to two lines rather than a fixed 90. */}
        <ul className="flex w-full flex-col gap-[12px] lg:w-[490px] lg:shrink-0 lg:gap-[16px]">
          {FINDER.facilities.map((f) => (
            <li key={f.name}
              className={`flex w-full items-center gap-[16px] rounded-[12px] p-[20px] lg:h-[90px] lg:w-[490px] ${
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
