'use client'

import { BarForm } from '@/components/client/BarForm'
import { FINDER } from '@/data/locations'

/**
 * The locator search bar — Figma 6377:975, the shared BarForm at 680 wide.
 *
 * There is no locator service behind it yet — the doc marks the map "needs
 * directions" — so submitting does nothing, the same state the two contact
 * forms are in. Deliberately inert rather than sending the visitor somewhere
 * that cannot answer the question.
 */
export function LocationSearch() {
  const s = FINDER.search
  return (
    <BarForm
      width={680}
      glyph="search"
      label={s.label}
      placeholder={s.placeholder}
      button={s.button}
      type="search"
      name="location-search"
      onSubmit={() => {
        // TODO(phase-2): wire to the store locator once the team supplies
        // directions data.
      }}
    />
  )
}
