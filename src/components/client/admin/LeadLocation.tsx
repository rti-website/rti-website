'use client'

import { Fragment, useState } from 'react'

/**
 * Where an enquiry is from, in Admin -> Enquiries (Asim, 24 Sep 2026: "fetch
 * the location of [the] lead … from where the lead is come"). The server
 * works it out (src/lib/lead-location.ts, stored as leads.geo, db/007); this
 * file only shows it: a short line in the list, and a block with a map when
 * an enquiry is opened.
 *
 * Client component (CLAUDE.md rule 7) because the whole admin is one — see
 * the note at the top of AdminApp.tsx.
 */

/** Mirrors LeadGeo in src/lib/lead-location.ts. */
export type LeadGeo = {
  v: 1
  at: string
  given: null | { from: 'zip' | 'city'; zip: string; city: string; state: string; county: string; lat: number; lng: number }
  nearest: null | { facility: string; miles: number; inPickupArea: boolean }
  ip: null | { city: string; region: string; country: string; countryCode: string; lat: number | null; lng: number | null }
  ipLookup: 'found' | 'not-found' | 'private' | 'no-ip' | 'no-database'
  ipCheck: null | 'same-state' | 'other-state' | 'outside-us'
}

type Details = Record<string, string> | null | undefined

const PICKUP_MILES = 100

/** "Minneapolis, Minnesota, United States", skipping blanks and repeats. */
export function ipPlace(g: LeadGeo | null | undefined): string {
  const p = g?.ip
  if (!p) return ''
  return [p.city, p.region, p.country].filter((x, i, a) => x && a.indexOf(x) === i).join(', ')
}

function givenPlace(g: LeadGeo): string {
  const x = g.given
  if (!x) return ''
  return `${x.city}, ${x.state} ${x.zip}`
}

/** What the IP says against what they typed, in words. */
function ipCheckText(g: LeadGeo): string {
  switch (g.ipCheck) {
    case 'same-state': return 'same state as the address they gave'
    case 'other-state': return 'a different state from the address they gave'
    case 'outside-us': return 'outside the United States: check this one before acting on it'
    default: return ''
  }
}

function ipStatusText(g: LeadGeo): string {
  switch (g.ipLookup) {
    case 'no-database': return 'Not set up yet: run npm run geoip:update on the server (see the deploy notes).'
    case 'private': return 'A private or local address: a test from the office, a laptop, or the dev server.'
    case 'no-ip': return 'No IP address was recorded for this enquiry.'
    case 'not-found': return 'This IP address is not in the location database.'
    default: return ''
  }
}

/** Flat text for the global search and the CSV. */
export function locationText(g: LeadGeo | null | undefined): string {
  if (!g) return ''
  return [
    g.given ? `${givenPlace(g)} ${g.given.county} County` : '',
    g.nearest ? `${g.nearest.miles} mi ${g.nearest.facility} ${g.nearest.inPickupArea ? 'pickup area' : 'outside pickup area'}` : '',
    ipPlace(g),
    g.ipCheck === 'outside-us' ? 'outside US' : '',
  ].filter(Boolean).join(' ')
}

/** CSV columns, in order. */
export const LOCATION_CSV_HEAD = ['Location (from ZIP)', 'County', 'Nearest facility', 'Miles to facility', 'In pickup area', 'IP location', 'IP check']
export function locationCsv(g: LeadGeo | null | undefined): string[] {
  if (!g) return LOCATION_CSV_HEAD.map(() => '')
  return [
    g.given ? givenPlace(g) : '',
    g.given?.county ?? '',
    g.nearest?.facility ?? '',
    g.nearest ? String(g.nearest.miles) : '',
    g.nearest ? (g.nearest.inPickupArea ? 'yes' : 'no') : '',
    ipPlace(g),
    ipCheckText(g),
  ]
}

/** The list's Location cell. */
export function LocationCell({ geo }: { geo: LeadGeo | null | undefined }) {
  if (!geo?.given) return <span style={{ color: 'var(--a-muted)' }}>—</span>
  return (
    <>
      <div style={{ whiteSpace: 'nowrap' }}>{geo.given.city}, {geo.given.state}</div>
      {geo.nearest && (
        <div className="a-slug" style={{ marginTop: 3 }}>
          <span className={`a-pill ${geo.nearest.inPickupArea ? 'live' : 'off'}`}
            title={geo.nearest.inPickupArea
              ? `Inside the ${PICKUP_MILES} mile pickup area of ${geo.nearest.facility}`
              : `More than ${PICKUP_MILES} miles from either facility`}>
            {geo.nearest.miles < 1 ? 'under 1' : geo.nearest.miles} mi
          </span>
        </div>
      )}
      {geo.ipCheck === 'outside-us' && geo.ip && (
        <div style={{ marginTop: 3 }}><span className="a-pill bad" style={{ whiteSpace: 'nowrap' }} title="Where the connection came from">Sent from {geo.ip.country}</span></div>
      )}
    </>
  )
}

/** The map query: the full address when they gave one, else the ZIP. */
function mapQuery(geo: LeadGeo | null | undefined, d: Details): { q: string; exact: boolean } | null {
  const street = d?.address?.trim()
  const city = d?.city?.trim() || geo?.given?.city || ''
  const state = d?.state?.trim() || geo?.given?.state || ''
  const zip = d?.zip?.trim() || geo?.given?.zip || ''
  if (street) return { q: [street, city, [state, zip].filter(Boolean).join(' ')].filter(Boolean).join(', '), exact: true }
  if (zip || (city && state)) return { q: [city, [state, zip].filter(Boolean).join(' ')].filter(Boolean).join(', '), exact: false }
  return null
}

/**
 * The map. With the Maps key and on our own domain, Google's Maps Embed API
 * (free, no per view charge); the key is a website key restricted to
 * recycletechnologies.com, so on a laptop (localhost) Google would refuse it
 * and the keyless embed the public location pages use is shown instead.
 */
function LeadMap({ q, exact, mapsKey }: { q: string; exact: boolean; mapsKey: string }) {
  const [onOurDomain] = useState(() =>
    typeof window !== 'undefined' && /(^|\.)recycletechnologies\.com$/i.test(window.location.hostname))
  const zoom = exact ? 14 : 11
  const src = mapsKey && onOurDomain
    ? `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(mapsKey)}&q=${encodeURIComponent(q)}&zoom=${zoom}`
    : `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=${zoom}&hl=en&output=embed`
  return (
    <iframe
      title={`Map: ${q}`} src={src} loading="lazy" referrerPolicy="strict-origin-when-cross-origin"
      style={{ width: '100%', height: 280, border: '1px solid var(--rule)', borderRadius: 10, display: 'block', background: '#eef1f4' }}
    />
  )
}

const DT = { color: 'var(--a-muted)', fontSize: 13 } as const
const GRID = { display: 'grid', gridTemplateColumns: 'minmax(140px, max-content) 1fr', gap: '6px 20px', margin: 0, padding: '0 4px 8px' } as const

/** The "Where they are" block in an opened enquiry. */
export function LocationBlock({ geo, details, mapsKey }: { geo: LeadGeo | null | undefined; details: Details; mapsKey: string }) {
  const map = mapQuery(geo, details)
  const rows: [string, React.ReactNode][] = []
  if (geo?.given) {
    rows.push(['Location they gave', <Fragment key="given">
      {givenPlace(geo)}{geo.given.county ? ` · ${geo.given.county} County` : ''}
      {geo.given.from === 'city' && <span style={{ color: 'var(--a-muted)' }}> (from the city and state; no ZIP on this form)</span>}
    </Fragment>])
  }
  if (geo?.nearest) {
    rows.push(['Nearest facility', <Fragment key="nearest">
      {geo.nearest.facility}, {geo.nearest.miles < 1 ? 'under a mile' : `${geo.nearest.miles} miles`} in a straight line{' '}
      <span className={`a-pill ${geo.nearest.inPickupArea ? 'live' : 'off'}`} style={{ marginLeft: 6 }}>
        {geo.nearest.inPickupArea ? `Inside the ${PICKUP_MILES} mile pickup area` : `Outside the ${PICKUP_MILES} mile pickup area`}
      </span>
      {!geo.nearest.inPickupArea && <div style={{ color: 'var(--a-muted)', fontSize: 13, marginTop: 4 }}>The Mail-In Program is the usual fit.</div>}
    </Fragment>])
  }
  if (geo) {
    rows.push(['Sent from (IP)', geo.ip ? <Fragment key="ip">
      {ipPlace(geo)} <span style={{ color: 'var(--a-muted)' }}>(approximate)</span>
      {geo.ipCheck && (
        <div style={{ fontSize: 13, marginTop: 4, color: geo.ipCheck === 'outside-us' ? 'var(--a-stop)' : 'var(--a-muted)' }}>
          {ipCheckText(geo).replace(/^./, (c) => c.toUpperCase())}.
        </div>
      )}
      <div style={{ fontSize: 12, marginTop: 4 }}>
        <a className="a-link" href="https://db-ip.com" target="_blank" rel="noopener noreferrer">IP Geolocation by DB-IP</a>
      </div>
    </Fragment> : <span key="ip-none" style={{ color: 'var(--a-muted)' }}>{ipStatusText(geo)}</span>])
  }

  return (
    <>
      <p style={{ margin: '14px 4px 6px', fontWeight: 600 }}>Where they are</p>
      {!geo && (
        <p style={{ margin: '0 4px 8px', color: 'var(--a-muted)', fontSize: 13 }}>
          Not worked out yet. This database needs db/007_lead_location.sql (npm run db:setup).
        </p>
      )}
      {rows.length > 0 && (
        <dl style={GRID}>
          {rows.map(([k, v]) => (
            <Fragment key={k}>
              <dt style={DT}>{k}</dt>
              <dd style={{ margin: 0 }}>{v}</dd>
            </Fragment>
          ))}
        </dl>
      )}
      {map && (
        <div style={{ padding: '4px 4px 10px', maxWidth: 760 }}>
          <LeadMap q={map.q} exact={map.exact} mapsKey={mapsKey} />
          <div style={{ fontSize: 12, marginTop: 6, color: 'var(--a-muted)' }}>
            {map.exact ? 'Pinned on the street address they typed.' : 'Centred on their ZIP code; they did not give a street address.'}{' '}
            <a className="a-link" target="_blank" rel="noopener noreferrer"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(map.q)}`}>Open in Google Maps</a>
          </div>
        </div>
      )}
    </>
  )
}
