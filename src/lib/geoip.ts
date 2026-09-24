import 'server-only'
import fs from 'node:fs'
import path from 'node:path'
import { Reader, type CityResponse } from 'mmdb-lib'

/**
 * Where an IP address is, from the free DB-IP "IP to City Lite" database
 * (CC BY 4.0, https://db-ip.com). Installed with `npm run geoip:update`, which
 * explains why a file and not Google (Google cannot look up an IP) or a paid
 * API (every visitor's IP would go to a third party). Used only for enquiries,
 * by src/lib/lead-location.ts.
 *
 * OPTIONAL. No file, no IP location: every lookup answers null and the rest of
 * the enquiry location (ZIP, county, nearest facility) still works.
 *
 * MEMORY. The file is about 120 MB and has to be read whole. The live site
 * shares a VM with little RAM to spare (deploy/PRODUCTION-SAME-VM.md), and an
 * enquiry is a few a day, so the file is NOT kept loaded: it is read when a
 * lookup needs it (about 70 ms), kept for two minutes in case a batch follows
 * (Admin -> Enquiries filling in older rows), then let go.
 *
 * Accuracy is city level at best and often only the region: a phone network
 * or a VPN can put someone a state away. The admin says "approximate".
 */

const IDLE_MS = 2 * 60 * 1000

let reader: Reader<CityResponse> | null = null
let loadedFrom = ''
let loadedMtime = 0
let timer: NodeJS.Timeout | null = null

export function geoipPath(): string {
  return process.env.GEOIP_DB || path.join(process.cwd(), 'var', 'geoip', 'dbip-city-lite.mmdb')
}

export function geoipAvailable(): boolean {
  try { return fs.statSync(geoipPath()).size > 0 } catch { return false }
}

function open(): Reader<CityResponse> | null {
  const file = geoipPath()
  let mtime = 0
  try { mtime = fs.statSync(file).mtimeMs } catch { return null }
  // A monthly update swaps the file in place; notice it without a restart.
  if (!reader || loadedFrom !== file || loadedMtime !== mtime) {
    try {
      reader = new Reader<CityResponse>(fs.readFileSync(file))
      loadedFrom = file
      loadedMtime = mtime
    } catch (err) {
      console.error('[geoip] could not read', file, (err as Error).message)
      reader = null
      return null
    }
  }
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => { reader = null; timer = null }, IDLE_MS)
  timer.unref?.()
  return reader
}

export type IpPlace = {
  city: string
  region: string
  country: string
  countryCode: string
  lat: number | null
  lng: number | null
}

/** Private, loopback and link-local addresses have no place: a laptop test, a proxy. */
export function isPrivateIp(raw: string): boolean {
  const ip = normaliseIp(raw) ?? ''
  return /^(10\.|127\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|0\.)/.test(ip)
    || ip === '::1' || /^f[cd][0-9a-f]{2}:/i.test(ip) || /^fe80:/i.test(ip)
}

/** "::ffff:1.2.3.4" (how IPv4 can arrive through an IPv6 socket) -> "1.2.3.4". */
export function normaliseIp(raw: string | null | undefined): string | null {
  if (!raw) return null
  const ip = raw.trim().replace(/^::ffff:/i, '').replace(/\/\d+$/, '')
  return ip || null
}

/**
 * The place for one IP address, or null when there is no database, the
 * address is private, or the database has nothing for it.
 */
export function lookupIp(raw: string | null | undefined): IpPlace | null {
  const ip = normaliseIp(raw)
  if (!ip || isPrivateIp(ip)) return null
  const r = open()
  if (!r) return null
  let rec: CityResponse | null = null
  try { rec = r.get(ip) } catch { return null }
  if (!rec?.country) return null
  return {
    city: rec.city?.names?.en ?? '',
    region: rec.subdivisions?.[0]?.names?.en ?? '',
    country: rec.country.names?.en ?? rec.country.iso_code ?? '',
    countryCode: rec.country.iso_code ?? '',
    lat: rec.location?.latitude ?? null,
    lng: rec.location?.longitude ?? null,
  }
}
