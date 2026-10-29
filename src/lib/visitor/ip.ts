import { createHash } from 'node:crypto'

/**
 * IP helpers for visitor identification (docs/visitor-identification/).
 *
 * Pure: no database, no `server-only`, no `@/` imports, so node:test runs it
 * as is (tests/visitor/*.test.ts). Never imported by browser code.
 *
 * THE RAW IP IS NEVER STORED OR LOGGED. It is read from the request, hashed
 * with IP_HASH_SALT for the database, masked for any log line, and held in
 * memory only as long as the organisation lookup takes (src/lib/visitor/enrich.ts).
 */

/** "::ffff:1.2.3.4" -> "1.2.3.4"; trims, drops a CIDR suffix or a port on IPv4. */
export function normaliseIp(raw: string | null | undefined): string | null {
  if (!raw) return null
  let ip = raw.trim().replace(/^\[|\](:\d+)?$/g, '').replace(/^::ffff:/i, '').replace(/\/\d+$/, '')
  if (/^\d{1,3}(\.\d{1,3}){3}:\d+$/.test(ip)) ip = ip.replace(/:\d+$/, '')
  return isIpv4(ip) || isIpv6(ip) ? ip.toLowerCase() : null
}

export function isIpv4(ip: string): boolean {
  const m = ip.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/)
  return Boolean(m && m.slice(1).every((n) => Number(n) <= 255))
}

export function isIpv6(ip: string): boolean {
  return ip.includes(':') && /^[0-9a-f:.]+$/i.test(ip) && ipv6ToBigInt(ip) !== null
}

/** Private, loopback, link local, CGNAT and unique local: no organisation to find. */
export function isPrivateIp(ip: string): boolean {
  if (isIpv4(ip)) {
    return /^(10\.|127\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|0\.|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.)/.test(ip)
  }
  const v = ip.toLowerCase()
  return v === '::1' || v === '::' || /^f[cd][0-9a-f]{2}:/.test(v) || /^fe[89ab][0-9a-f]:/.test(v)
}

/** For logs only: "203.0.113.7" -> "203.0.x.x", "2001:db8:1::5" -> "2001:db8:x:x". */
export function maskIp(ip: string | null | undefined): string {
  if (!ip) return '(none)'
  if (isIpv4(ip)) return ip.split('.').slice(0, 2).join('.') + '.x.x'
  return ip.split(':').filter(Boolean).slice(0, 2).join(':') + ':x:x'
}

/** SHA-256 of salt + IP, hex. The only form an IP takes in the database. */
export function hashIp(ip: string, salt: string): string {
  if (!salt) throw new Error('IP_HASH_SALT is not set')
  return createHash('sha256').update(`${salt}|${ip}`).digest('hex')
}

/* ------------------------------------------------------------- CIDR lists */

export type Cidr = { v: 4 | 6; base: bigint; bits: number }

function ipv4ToBigInt(ip: string): bigint {
  return ip.split('.').reduce((acc, n) => (acc << 8n) + BigInt(Number(n)), 0n)
}

function ipv6ToBigInt(ip: string): bigint | null {
  let s = ip.toLowerCase()
  // A trailing dotted quad ("::ffff:1.2.3.4").
  const v4 = s.match(/(\d+\.\d+\.\d+\.\d+)$/)
  if (v4) {
    if (!isIpv4(v4[1]!)) return null
    const n = ipv4ToBigInt(v4[1]!)
    s = s.slice(0, -v4[1]!.length) + ((n >> 16n) & 0xffffn).toString(16) + ':' + (n & 0xffffn).toString(16)
  }
  const halves = s.split('::')
  if (halves.length > 2) return null
  const head = halves[0] ? halves[0].split(':') : []
  const tail = halves.length === 2 && halves[1] ? halves[1].split(':') : []
  const fill = halves.length === 2 ? 8 - head.length - tail.length : 0
  if (fill < 0 || (halves.length === 1 && head.length !== 8)) return null
  const groups = [...head, ...Array(fill).fill('0'), ...tail]
  if (groups.length !== 8 || groups.some((g) => !/^[0-9a-f]{1,4}$/.test(g))) return null
  return groups.reduce((acc, g) => (acc << 16n) + BigInt(parseInt(g, 16)), 0n)
}

/** "203.0.113.0/24, 198.51.100.7, 2001:db8::/32" -> parsed ranges. Bad entries are skipped. */
export function parseCidrs(list: string | null | undefined): Cidr[] {
  const out: Cidr[] = []
  for (const part of (list ?? '').split(/[,\s]+/)) {
    if (!part) continue
    const [addr, b] = part.split('/')
    const ip = normaliseIp(addr)
    if (!ip) continue
    const v: 4 | 6 = isIpv4(ip) ? 4 : 6
    const max = v === 4 ? 32 : 128
    const bits = b === undefined ? max : Number(b)
    if (!Number.isInteger(bits) || bits < 0 || bits > max) continue
    const n = v === 4 ? ipv4ToBigInt(ip) : ipv6ToBigInt(ip)
    if (n === null) continue
    const shift = BigInt(max - bits)
    out.push({ v, base: (n >> shift) << shift, bits })
  }
  return out
}

export function inCidrs(ip: string, cidrs: Cidr[]): boolean {
  const v: 4 | 6 = isIpv4(ip) ? 4 : 6
  const n = v === 4 ? ipv4ToBigInt(ip) : ipv6ToBigInt(ip)
  if (n === null) return false
  return cidrs.some((c) => {
    if (c.v !== v) return false
    const shift = BigInt((v === 4 ? 32 : 128) - c.bits)
    return (n >> shift) << shift === c.base
  })
}

/**
 * The client's IP from the proxy header named by CLIENT_IP_HEADER (default
 * x-forwarded-for). Our nginx (deploy/nginx/recycletechnologies.com.conf)
 * SETS X-Forwarded-For to $remote_addr rather than appending, so the first
 * entry is the address that reached the server; the existing form, subscribe
 * and locate routes rely on the same rule.
 */
export function clientIpFrom(headers: Headers, headerName?: string | null): string | null {
  const name = (headerName || 'x-forwarded-for').toLowerCase()
  const raw = headers.get(name)
  if (!raw) return null
  if (name === 'forwarded') {
    const m = raw.match(/for="?\[?([^\]";,]+)/i)
    return normaliseIp(m?.[1])
  }
  return normaliseIp(raw.split(',')[0])
}
