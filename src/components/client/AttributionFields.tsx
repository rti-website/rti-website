'use client'

import { useEffect, useRef } from 'react'
import { ATTRIBUTION_FIELDS, cleanAttribution, type Attribution } from '@/lib/attribution'

/**
 * THE VISIT'S GCLID / UTM INSIDE THE FORM (management, Peter, 4 Nov 2026:
 * "store the gclid/UTM in the form"). One hidden input per attribution field
 * (gclid, utm_source … landing_page, referrer), filled from the record the
 * tracking bootstrap keeps for this visit (window.__rtiAttr,
 * src/lib/tracking.ts). So a lead carries its source in the form itself, not
 * only in the rti_attr cookie: a visitor who rejected cookies, or whose cookie
 * was never written, is no longer direct/unknown. /api/leads takes the form's
 * record or the cookie's (pickAttribution, src/lib/attribution.ts).
 *
 * Client only because the values exist only in the browser (CLAUDE.md rule
 * 7). The inputs are rendered without a `value`, so React never overwrites
 * what the effect writes, and a form posted before hydration still sends the
 * cookie. The forms also put the same record in their JSON body
 * (formAttribution below), since they post with fetch.
 */

type W = Window & { __rtiAttr?: Record<string, string> }

/** This visit's attribution, cleaned, or null when there is none. */
export function formAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null
  return cleanAttribution((window as W).__rtiAttr)
}

export function AttributionFields() {
  const box = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const a = formAttribution() ?? {}
    box.current?.querySelectorAll<HTMLInputElement>('input[type="hidden"]').forEach((el) => {
      el.value = a[el.name as keyof Attribution] ?? ''
    })
  }, [])
  return (
    <span ref={box} hidden>
      {ATTRIBUTION_FIELDS.map((k) => <input key={k} type="hidden" name={k} data-rti-attr="" />)}
    </span>
  )
}
