#!/usr/bin/env node
/**
 * Downloads the free DB-IP "IP to City Lite" database, which is what turns an
 * enquiry's IP address into "Minneapolis, Minnesota, United States" in
 * Admin -> Enquiries (src/lib/geoip.ts). Run it once, then once a month:
 *
 *   npm run geoip:update
 *
 * WHERE IT GOES: the GEOIP_DB path in .env.local, or var/geoip/dbip-city-lite.mmdb
 * in this folder when that is not set. var/ is git-ignored. On the live server
 * .env.local points it into ~/apps/rti-website-data/geoip/ so a fresh clone
 * does not lose it (deploy/PRODUCTION-SAME-VM.md).
 *
 * WHY THIS FILE AND NOT AN API. Google's Maps key cannot look up where an IP
 * address is (its Geolocation API only locates the machine making the call,
 * which would be our own server). The paid lookup services send every
 * visitor's IP to a third party. This file is looked up on our own server and
 * nothing leaves it. About 60 MB to download, 120 MB on disk, new each month.
 *
 * LICENCE: Creative Commons Attribution 4.0, "IP Geolocation by DB-IP"
 * (https://db-ip.com). The admin credits it wherever it shows an IP location.
 *
 * Plain node, no build step, works the same on Windows and on the server.
 */
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'

const ROOT = path.resolve(import.meta.dirname, '..')

function target() {
  if (process.env.GEOIP_DB) return process.env.GEOIP_DB
  const env = path.join(ROOT, '.env.local')
  if (fs.existsSync(env)) {
    const m = /^GEOIP_DB\s*=\s*(.+)$/m.exec(fs.readFileSync(env, 'utf8'))
    if (m) return m[1].trim().replace(/^["']|["']$/g, '')
  }
  return path.join(ROOT, 'var', 'geoip', 'dbip-city-lite.mmdb')
}

/** This month's file, else last month's (a new month's file appears a day or two in). */
function candidates() {
  const now = new Date()
  const months = [0, 1].map((back) => {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - back, 1))
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`
  })
  return months.map((m) => ({ month: m, url: `https://download.db-ip.com/free/dbip-city-lite-${m}.mmdb.gz` }))
}

const dest = target()
fs.mkdirSync(path.dirname(dest), { recursive: true })
const part = `${dest}.download`

let done = null
for (const c of candidates()) {
  process.stdout.write(`Downloading DB-IP City Lite ${c.month} … `)
  let res
  try {
    res = await fetch(c.url)
  } catch (err) {
    console.log(`could not connect (${err.message})`)
    continue
  }
  if (!res.ok || !res.body) { console.log(`not there (${res.status})`); continue }
  await pipeline(Readable.fromWeb(res.body), zlib.createGunzip(), fs.createWriteStream(part))
  done = c.month
  console.log('done')
  break
}
if (!done) {
  console.error('\nNo database downloaded. Check the server can reach download.db-ip.com, then run it again.')
  process.exit(1)
}

// A real MMDB file ends with its metadata block, marked by these bytes.
const size = fs.statSync(part).size
const fd = fs.openSync(part, 'r')
const tail = Buffer.alloc(Math.min(size, 128 * 1024))
fs.readSync(fd, tail, 0, tail.length, size - tail.length)
fs.closeSync(fd)
if (size < 10_000_000 || tail.indexOf(Buffer.from([0xab, 0xcd, 0xef, ...Buffer.from('MaxMind.com')])) === -1) {
  fs.rmSync(part, { force: true })
  console.error('\nThe download is not a valid database file; the old one (if any) is untouched.')
  process.exit(1)
}

// Swap it in in one step, so a running site never reads half a file.
fs.renameSync(part, dest)
console.log(`\nSaved ${dest}`)
console.log(`${(size / 1_048_576).toFixed(0)} MB, DB-IP City Lite ${done}. The site picks it up on the next enquiry; no restart needed.`)
