#!/usr/bin/env node
/**
 * The M0 check for visitor identification: look one IP up with the same code
 * the site uses (src/lib/visitor/lookup-ip.ts) and say what it would decide.
 *
 *   npm run visitor:lookup -- 144.92.1.1
 *
 * Reads IPAPI_KEY from the environment or .env.local (never printed). The IP
 * is printed masked. Uses Node 22's built-in TypeScript support, so no build.
 */
import fs from 'node:fs'
import path from 'node:path'
import { lookupIp } from '../src/lib/visitor/lookup-ip.ts'
import { classify } from '../src/lib/visitor/classify.ts'
import { maskIp, normaliseIp } from '../src/lib/visitor/ip.ts'

const ROOT = path.resolve(import.meta.dirname, '..')
const ip = normaliseIp(process.argv[2])
if (!ip) { console.error('Usage: npm run visitor:lookup -- <ip address>'); process.exit(1) }

let key = process.env.IPAPI_KEY
if (!key) {
  for (const f of ['.env.local', '.env']) {
    const p = path.join(ROOT, f)
    if (!fs.existsSync(p)) continue
    const m = fs.readFileSync(p, 'utf8').match(/^IPAPI_KEY\s*=\s*(.*)$/m)
    if (m && m[1].trim()) { key = m[1].trim().replace(/^["']|["']$/g, ''); break }
  }
}
if (!key) { console.error('IPAPI_KEY is not set (environment or .env.local).'); process.exit(1) }

const r = await lookupIp(ip, { key })
if (!r.ok) { console.error(`Lookup for ${maskIp(ip)} failed: ${r.error}`); process.exit(2) }
const c = classify(r)
console.log(`IP:            ${maskIp(ip)}`)
console.log(`Organisation:  ${r.orgName ?? '—'}${r.orgDomain ? ` (${r.orgDomain})` : ''}`)
console.log(`Type:          ${r.orgType ?? '—'}`)
console.log(`Location:      ${[r.city, r.region, r.countryCode].filter(Boolean).join(', ') || '—'}`)
console.log(`Flags:         ${['VPN', 'Proxy', 'Tor', 'Datacenter', 'Mobile'].filter((_, i) => [r.isVpn, r.isProxy, r.isTor, r.isDatacenter, r.isMobile][i]).join(', ') || 'none'}`)
console.log(`Decision:      ${c.classification === 'business' ? 'Business IP (company kept)' : c.classification}`)
