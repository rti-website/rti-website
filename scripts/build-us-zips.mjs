#!/usr/bin/env node
/**
 * Builds data/us-zips.tsv, the table behind the contact form's ZIP / city /
 * state lookup (src/lib/zips.ts, /api/zip). Run by hand when the data should
 * be refreshed, a few times a year at most; the output is committed.
 *
 *   node scripts/build-us-zips.mjs <folder>
 *
 * <folder> holds the two source files, downloaded by hand:
 *
 *   US.txt  GeoNames postal codes, from
 *           https://download.geonames.org/export/zip/US.zip (unzip it).
 *           Every US ZIP with the city the Postal Service gives it and its
 *           state. License CC BY 4.0: credit GeoNames where the data is shown
 *           (the contact form links to geonames.org under its ZIP hint).
 *
 *   tab20_zcta520_place20_natl.txt  US Census Bureau, 2020 ZCTA to place
 *           relationship file, from
 *           https://www2.census.gov/geo/docs/maps-data/data/rel2020/zcta520/
 *           Which cities and towns each ZIP area actually covers, with the
 *           land area of the overlap. Public domain.
 *
 * WHY BOTH. GeoNames alone names the Postal Service's city, which around big
 * cities is the big city: RTI's own ZIP, 55449, is "Minneapolis" there, and
 * Blaine does not appear anywhere in Minnesota. Someone in Blaine types
 * "Blaine", and a lookup that only knows "Minneapolis" would call them wrong
 * and could never find a ZIP for their town. The Census file knows 55449 is
 * almost all Blaine. So each ZIP gets:
 *
 *   the city to fill in   the Postal Service's name when it is a town inside
 *                         the ZIP; otherwise the incorporated city covering at
 *                         least half of the ZIP's land; else the Postal
 *                         Service's name (24 Sep 2026: 55304 fills "Andover",
 *                         as addressed on letters, not "Ham Lake")
 *   the names to accept   that, the Postal Service's name, and every city,
 *                         town or census-designated place with a real share
 *                         of the ZIP (at least 5% of the ZIP's land or of the
 *                         place's own), in the same state
 *
 * Output, one ZIP per line, tab separated, names joined with "|", then the
 * ZIP's centre point and county from GeoNames (added 24 Sep 2026 for the
 * enquiry location in the admin, src/lib/lead-location.ts; blank for the few
 * Census-only ZIPs GeoNames does not list):
 *   55449	MN	Blaine|Minneapolis	45.1697	-93.1889	Anoka
 */
import fs from 'node:fs'
import path from 'node:path'

const dir = process.argv[2]
if (!dir) {
  console.error('usage: node scripts/build-us-zips.mjs <folder with US.txt and tab20_zcta520_place20_natl.txt>')
  process.exit(1)
}

// State FIPS code -> postal abbreviation (50 states and DC; the territories
// are not in the GeoNames US file and RTI does not serve them).
const FIPS = {
  '01': 'AL', '02': 'AK', '04': 'AZ', '05': 'AR', '06': 'CA', '08': 'CO', '09': 'CT', '10': 'DE',
  '11': 'DC', '12': 'FL', '13': 'GA', '15': 'HI', '16': 'ID', '17': 'IL', '18': 'IN', '19': 'IA',
  '20': 'KS', '21': 'KY', '22': 'LA', '23': 'ME', '24': 'MD', '25': 'MA', '26': 'MI', '27': 'MN',
  '28': 'MS', '29': 'MO', '30': 'MT', '31': 'NE', '32': 'NV', '33': 'NH', '34': 'NJ', '35': 'NM',
  '36': 'NY', '37': 'NC', '38': 'ND', '39': 'OH', '40': 'OK', '41': 'OR', '42': 'PA', '44': 'RI',
  '45': 'SC', '46': 'SD', '47': 'TN', '48': 'TX', '49': 'UT', '50': 'VT', '51': 'VA', '53': 'WA',
  '54': 'WV', '55': 'WI', '56': 'WY',
}
const STATES = new Set(Object.values(FIPS))

/** "Blaine city" -> "Blaine", "Indianapolis city (balance)" -> "Indianapolis". */
function placeName(namelsad) {
  return namelsad
    .replace(/\s+\(balance\)$/, '')
    .replace(/\s+(city and borough|consolidated government|metropolitan government|metro government|unified government|urban county|municipality|borough|village|town|city|CDP)$/, '')
    .trim()
}

// ------------------------------------------------------------------ GeoNames --
const zips = new Map() // zip -> { state, usps, lat, lng, county, places: [{ name, inc, part, zShare, pShare }] }
for (const line of fs.readFileSync(path.join(dir, 'US.txt'), 'utf8').split('\n')) {
  const f = line.split('\t')
  if (f.length < 5 || !/^\d{5}$/.test(f[1]) || !STATES.has(f[4])) continue
  // Columns 5, 9 and 10: county, latitude, longitude.
  const lat = Number(f[9]), lng = Number(f[10])
  zips.set(f[1], {
    state: f[4], usps: f[2].trim(), places: [],
    county: (f[5] ?? '').trim(),
    lat: Number.isFinite(lat) && f[9] !== '' ? lat.toFixed(4) : '',
    lng: Number.isFinite(lng) && f[10] !== '' ? lng.toFixed(4) : '',
  })
}

// -------------------------------------------------------------------- Census --
const rel = fs.readFileSync(path.join(dir, 'tab20_zcta520_place20_natl.txt'), 'utf8').replace(/^﻿/, '')
for (const line of rel.split('\n').slice(1)) {
  const f = line.split('|')
  const zip = f[1], placeId = f[9]
  if (!zip || !placeId || !/^\d{5}$/.test(zip)) continue
  const state = FIPS[placeId.slice(0, 2)]
  if (!state) continue
  if (!['A', 'S'].includes(f[15])) continue // active places and CDPs only
  const zLand = Number(f[3]) || 0, pLand = Number(f[11]) || 0, part = Number(f[16]) || 0
  let z = zips.get(zip)
  if (!z) { z = { state, usps: '', places: [], county: '', lat: '', lng: '' }; zips.set(zip, z) }
  if (z.state !== state) continue // a ZIP across a state line keeps its own state's places
  z.places.push({
    name: placeName(f[10]),
    inc: f[13] === 'G4110',
    part,
    zShare: zLand ? part / zLand : 0,
    pShare: pLand ? part / pLand : 0,
  })
}

// -------------------------------------------------------------------- output --
const out = []
let fromCensus = 0
for (const zip of [...zips.keys()].sort()) {
  const z = zips.get(zip)
  const real = z.places
    .filter((p) => p.zShare >= 0.05 || p.pShare >= 0.05)
    .sort((a, b) => b.part - a.part)
  const bigInc = real.find((p) => p.inc && p.zShare >= 0.5)
  // The Postal Service's own name wins when it is a real town inside this ZIP
  // (55304 is "Andover" on letters even though Ham Lake covers more of it).
  // Only when that name is a big city elsewhere (55449 "Minneapolis") does
  // the town that actually covers the ZIP take over.
  const uspsIsHere = z.usps && real.some((p) => p.name.toLowerCase().replace(/^saint /, 'st. ') === z.usps.toLowerCase().replace(/^saint /, 'st. '))
  const primary = (uspsIsHere ? z.usps : bigInc?.name) || z.usps || real[0]?.name
  if (!primary) continue
  if (z.usps && primary !== z.usps) fromCensus++
  const names = []
  for (const n of [primary, z.usps, ...real.filter((p) => p.inc).map((p) => p.name), ...real.filter((p) => !p.inc).map((p) => p.name)]) {
    if (n && !names.some((m) => m.toLowerCase() === n.toLowerCase())) names.push(n)
  }
  out.push(`${zip}\t${z.state}\t${names.join('|')}\t${z.lat}\t${z.lng}\t${z.county}`)
}

const header = [
  '# US ZIP codes -> state and city names. Built by scripts/build-us-zips.mjs; do not edit by hand.',
  '# Sources: GeoNames postal codes (CC BY 4.0, www.geonames.org) and the US Census Bureau 2020 ZCTA to place relationship file.',
  `# Built ${new Date().toISOString().slice(0, 10)}. Columns: zip, state, names (first = the one to fill in), latitude, longitude, county.`,
]
const file = path.join(process.cwd(), 'data', 'us-zips.tsv')
fs.writeFileSync(file, header.concat(out).join('\n') + '\n')
console.log(`${out.length} ZIP codes written to data/us-zips.tsv (${fromCensus} fill in a Census city over the Postal Service's).`)
