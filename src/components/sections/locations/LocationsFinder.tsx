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
 * THE MAP IS A REAL MAP since 23 Sep 2026 — Google's, one facility at a time
 * with a Blaine / New Berlin switch, and a search moves it to the nearest
 * facility (Asim: "we have to add [a] map here"). Before that it was the
 * frame's illustrative gradient with two drawn pins. All of it is
 * LocationFinder.tsx (client) and /api/locate.
 *
 * MOBILE — 6747:5739 (search) and 6747:8865 (map) in the updated
 * "Locations - Mobile" 6747:2557. 390 wide: px20 / py48 on white and a flat
 * 24px gap down the section; the map is 350x220.
 */
export function LocationsFinder({ top, height }: { top: number; height: number }) {
  return (
    <Section top={top} height={height} label="6377:967"
      className="flex flex-col items-center gap-[20px] bg-white px-[20px] pb-[40px] pt-[48px] lg:gap-[40px] lg:px-0 lg:py-[90px]">
      {/* Heading block — 6377:970 / 6669:2421..2424. The phone runs the same
          24px gap the section does, so the block reads as part of the rhythm. */}
      <div className="flex w-full flex-col items-center gap-[20px] text-center lg:w-[780px] lg:gap-[10px]">
        <Eyebrow>{FINDER.eyebrow}</Eyebrow>
        <h2 className="font-sans text-[26px] font-semibold leading-[1.25] text-black lg:text-[40px] lg:leading-[1.3]">{FINDER.heading}</h2>
        {/* The phone frame's shorter lead at 296 wide (6747:5743, 25 Sep 2026). */}
        <p className="max-w-[296px] font-roboto text-[14.5px] leading-normal text-muted lg:max-w-none lg:text-[17px] lg:leading-[1.175]">
          <span className="lg:hidden">{FINDER.leadMobile}</span>
          <span className="max-lg:hidden">{FINDER.lead}</span>
        </p>
      </div>

      {/* The search bar AND the map panel, together — a search lights up a
          pin, so both live in one client component. See LocationFinder.tsx. */}
      <LocationFinder />
    </Section>
  )
}
