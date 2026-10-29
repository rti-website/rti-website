import 'server-only'
import { parseCidrs, type Cidr } from './ip.ts'
import type { AdminUser } from '@/lib/auth'

/**
 * Visitor identification settings, all from the server environment
 * (docs/visitor-identification/README.md lists them). Names only ever live in
 * .env.example; values are set on the server by Aaqib or Anees.
 *
 *   VISITOR_CAPTURE      on | off (default off). Off: no tracker on the page,
 *                        /api/e/ stores nothing, no cookie. The switch that
 *                        keeps production dark until the privacy paragraph
 *                        is approved.
 *   VISITOR_JOBS         on | off (default off). The one minute job timer
 *                        (digest, weekly report, retention, catch-up). Dev and
 *                        live share a database, so turn it on in ONE app; a
 *                        Postgres lock stops two runs overlapping anyway.
 *   IPAPI_KEY            ipapi.is key. Without it nothing is looked up.
 *   IP_HASH_SALT         salt for the IP hash. Without it nothing is stored
 *                        (an unsalted hash of an IP is reversible).
 *   VISITOR_EXCLUDED_IPS our offices and VPNs, CIDR list, never looked up.
 *   VISITOR_DIGEST_TO    who gets the digest, weekly report and warnings.
 *                        aaqib@99technologies.com only until sign off.
 *   VISITOR_ADMIN_ROLES  roles that see Admin -> Visitors and Visitor leads
 *                        (default: administrator).
 *   VISITOR_ADMIN_EMAILS optional: also these people, whatever their role
 *                        (the dark launch: "Aaqib only").
 *   CLIENT_IP_HEADER     the proxy header with the client IP (default
 *                        x-forwarded-for, first entry).
 *   VISITOR_DEBUG_IP     on: log which proxy headers arrive, masked. Off by default.
 *   MAXMIND_LICENSE_KEY  not used: the EU/UK check uses the DB-IP country
 *                        database the site already has (src/lib/geoip.ts).
 */

const on = (v: string | undefined) => /^(on|true|1|yes)$/i.test((v ?? '').trim())

export const visitorConfig = {
  captureOn: () => on(process.env.VISITOR_CAPTURE),
  jobsOn: () => on(process.env.VISITOR_JOBS),
  debugIp: () => on(process.env.VISITOR_DEBUG_IP),
  salt: () => process.env.IP_HASH_SALT ?? '',
  ipapiKey: () => process.env.IPAPI_KEY ?? '',
  clientIpHeader: () => process.env.CLIENT_IP_HEADER || 'x-forwarded-for',
  digestTo: () => (process.env.VISITOR_DIGEST_TO ?? '').split(',').map((s) => s.trim()).filter(Boolean),
}

let cidrCache: { raw: string; list: Cidr[] } | null = null
export function excludedCidrs(): Cidr[] {
  const raw = process.env.VISITOR_EXCLUDED_IPS ?? ''
  if (!cidrCache || cidrCache.raw !== raw) cidrCache = { raw, list: parseCidrs(raw) }
  return cidrCache.list
}

/** Who may see Admin -> Visitors and the Visitor leads tab (brief section 8). */
export function canSeeVisitors(user: Pick<AdminUser, 'role' | 'email'>): boolean {
  const roles = (process.env.VISITOR_ADMIN_ROLES ?? 'administrator').split(',').map((s) => s.trim()).filter(Boolean)
  const emails = (process.env.VISITOR_ADMIN_EMAILS ?? '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)
  return roles.includes(user.role) || emails.includes(user.email.toLowerCase())
}
