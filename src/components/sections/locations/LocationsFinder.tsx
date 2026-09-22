import { Section } from '@/components/design/Frame'
import { Eyebrow } from '@/components/ui/Bits'
import { LocationFinder } from '@/components/client/LocationFinder'
import { FINDER } from '@/data/locations'

/**
 * Location finder — Figma 6377:967. py 90, gap 40: heading block on a 780px
 * column, the search bar, then the map panel at the full 1282 width.
 *
 * ===========================================================================
 * REDRAWN 22 Sep 2026 — the designer's updated frame
 * ===========================================================================
 *   BEFORE  a 760x460 map beside a 490px list of three facility rows
 *   NOW     one 1282x380 map, and the facilities moved out to their own
 *           section below — two full cards, see LocationCards.tsx — so the
 *           row list is gone from here. The pins moved with the panel: they
 *           are now at (420,90) and (760,220) of a 1282x380 board, and the
 *           percentages below are recomputed from THOSE numbers.
 *
 * THE MAP IS NOT A MAP — but the search in front of it is real. The frame
 * draws a gradient panel with two pinned labels and captions itself
 * "Illustrative map"; that is still what is drawn, with no embed and no
 * third-party script. Since 22 Sep 2026 a search turns the panel into the
 * answer: the nearest facility's pin lights up and a result card overlays the
 * panel. All of that is LocationFinder.tsx (client) and /api/locate.
 *
 * MOBILE — 6747:5739 (search) and 6747:8865 (map) in the updated
 * "Locations - Mobile" 6747:2557. 390 wide: px20 / py48 on white and a flat
 * 24px gap down the section; the map is 350x220 with the two pins drawn BARE
 * (no label pills) and a short "Illustrative map" tag.
 *
 * !! THE PINS STAY, as percentages of the panel. The phone frame puts them at
 * (90,60) and (210,130) of 350x220 — 25.7%/27.3% and 60%/59% — against the
 * board's (420,90) and (760,220) of 1282x380 — 32.8%/23.7% and 59.3%/57.9%.
 * Close, not identical; the board's fractions are used, since the board is the
 * drawing with labels on it and one rule has to serve both.
 */
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

      {/* The search bar AND the map panel, together — a search lights up a
          pin, so both live in one client component. See LocationFinder.tsx. */}
      <LocationFinder />
    </Section>
  )
}
