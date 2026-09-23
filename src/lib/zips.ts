import 'server-only'
import fs from 'node:fs'
import path from 'node:path'
import { cityKey } from '@/lib/us-address'

/**
 * ZIP <-> city and state, for the contact form (Asim, 23 Sep 2026: "when
 * someone adds the zip code, automatically fetch the state and city, and vice
 * versa"). Answers /api/zip; the form calls it as fields are filled in.
 *
 * The table is data/us-zips.tsv, about 41,000 ZIP codes, built from GeoNames
 * and the Census by scripts/build-us-zips.mjs (which explains why both).
 * It is read on the first lookup and kept for the life of the process —
 * unlike posts, it never changes between deploys, so that is correct here.
 * About 1 MB on disk and a few MB in memory, on the server only; none of it
 * reaches a browser.
 */

export type ZipInfo = {
  zip: string
  state: string
  /** The city to fill in. */
  city: string
  /** Every name the ZIP answers to, `city` first. */
  cities: string[]
}

type Table = { byZip: Map<string, ZipInfo>; byCity: Map<string, ZipInfo[]> }
let table: Table | null = null

function load(): Table {
  if (table) return table
  const byZip = new Map<string, ZipInfo>()
  const byCity = new Map<string, ZipInfo[]>()
  let text = ''
  try {
    text = fs.readFileSync(path.join(process.cwd(), 'data', 'us-zips.tsv'), 'utf8')
  } catch (err) {
    // Missing file: every lookup answers "not found" and the form still works
    // as a plain form. Said once, loudly.
    console.error('[zips] data/us-zips.tsv could not be read; ZIP lookup is off.', err)
  }
  for (const line of text.split('\n')) {
    if (!line || line.startsWith('#')) continue
    const [zip, state, names] = line.split('\t')
    if (!zip || !state || !names) continue
    const cities = names.split('|')
    const info: ZipInfo = { zip, state, city: cities[0] ?? '', cities }
    byZip.set(zip, info)
    for (const c of cities) {
      const key = `${state}|${cityKey(c)}`
      const list = byCity.get(key)
      if (list) { if (!list.includes(info)) list.push(info) } else byCity.set(key, [info])
    }
  }
  table = { byZip, byCity }
  return table
}

export function lookupZip(zip: string): ZipInfo | null {
  return /^\d{5}$/.test(zip) ? load().byZip.get(zip) ?? null : null
}

/**
 * The ZIP codes of a city, those where it is the main city first — so
 * "Blaine, MN" lists 55434 and 55449 ahead of 55014, which is mostly Lino
 * Lakes and only partly Blaine.
 */
export function zipsForCity(city: string, state: string): string[] {
  const list = load().byCity.get(`${state}|${cityKey(city)}`) ?? []
  const key = cityKey(city)
  return [...list]
    .sort((a, b) => Number(cityKey(b.city) === key) - Number(cityKey(a.city) === key) || a.zip.localeCompare(b.zip))
    .map((z) => z.zip)
}

/** Does this city belong to this ZIP (under any of its names)? */
export function cityMatchesZip(city: string, info: ZipInfo): boolean {
  const key = cityKey(city)
  return info.cities.some((c) => cityKey(c) === key)
}
