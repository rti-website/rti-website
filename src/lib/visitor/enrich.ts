import 'server-only'
import { one, q } from '@/lib/db'
import { sendMail } from '@/lib/mail'
import { lookupIp as placeOf } from '@/lib/geoip'
import { visitorConfig, excludedCidrs } from './config.ts'
import { lookupIp } from './lookup-ip.ts'
import { classify, companyKey, NO_LOOKUP_COUNTRIES, type IpLookupResult } from './classify.ts'
import { inCidrs, isPrivateIp, maskIp } from './ip.ts'
import { markBusinessLeads } from './leads.ts'
import { chicago } from './schedule.ts'

/**
 * Organisation lookups (brief sections 3.5, 3.6 and 6).
 *
 * WHY A QUEUE IN MEMORY AND NOT A TABLE: the provider needs the raw IP, and
 * the raw IP is never written anywhere (brief section 4). So /api/e/ hands
 * the IP and its hash to this queue, the lookup runs right after the response
 * has gone (Next's after()), and the IP is gone from memory once it is done.
 * Only the hash and the organisation result reach the database (ip_lookups).
 * A restart loses whatever is still queued; those visits stay anonymous until
 * the same IP comes back, which is the price of never storing it.
 *
 * Rules:
 *   - one call per IP per 30 days (ip_lookups is the cache, by hash);
 *   - our offices (VISITOR_EXCLUDED_IPS), private addresses and EU/UK
 *     visitors are never looked up (EU/UK from the DB-IP country database);
 *   - a failed call is tried once more a minute later, then recorded as
 *     failed and retried after a day;
 *   - past 800 calls in a (Chicago) day, a warning goes to VISITOR_DIGEST_TO
 *     once that day; at 1,000 (the free plan's cap) lookups stop until tomorrow.
 */

const CACHE_DAYS = 30
const RETRY_FAILED_HOURS = 24
const WARN_AT = 800
const STOP_AT = 1000

type Job = { ip: string; hash: string; attempts: number; notBefore: number }

declare global {
  // Survives hot reloads in dev; one per process in production.
  var __rtiVisitorQueue: { jobs: Map<string, Job>; running: boolean } | undefined
}
const queue = (globalThis.__rtiVisitorQueue ??= { jobs: new Map(), running: false })

/** Hands an IP to the queue (deduplicated by hash) and starts the worker. */
export function queueLookup(ip: string, hash: string): void {
  if (!queue.jobs.has(hash)) queue.jobs.set(hash, { ip, hash, attempts: 0, notBefore: 0 })
  void drain()
}

/** A lookup still fresh for this hash, if any. */
export async function freshLookup(hash: string): Promise<{ id: number } | null> {
  return one<{ id: number }>(`
    SELECT id FROM ip_lookups
     WHERE ip_hash = $1
       AND looked_up_at > now() - make_interval(days => $2)
       AND (classification <> 'failed' OR looked_up_at > now() - make_interval(hours => $3))`,
    [hash, CACHE_DAYS, RETRY_FAILED_HOURS])
}

async function drain(): Promise<void> {
  if (queue.running) return
  queue.running = true
  try {
    while (queue.jobs.size > 0) {
      const now = Date.now()
      const job = [...queue.jobs.values()].find((j) => j.notBefore <= now)
      if (!job) { setTimeout(() => void drain(), 15_000).unref?.(); break }
      queue.jobs.delete(job.hash)
      try { await handle(job) } catch (err) {
        console.error(`[visitor] lookup for ${maskIp(job.ip)} failed:`, (err as Error).message)
      }
    }
  } finally {
    queue.running = false
  }
}

async function handle(job: Job): Promise<void> {
  // Another process (dev and live share the database) may have done it already.
  const cached = await freshLookup(job.hash)
  if (cached) { await applyLookup(cached.id, job.hash); return }

  if (isPrivateIp(job.ip)) return void (await save(job.hash, 'private', null))
  if (inCidrs(job.ip, excludedCidrs())) return void (await save(job.hash, 'excluded', null))

  /* EU and UK: never sent to the provider (brief section 6). The country comes
     from the DB-IP file already on the server. Without that file the provider
     is asked and an EU/UK answer is thrown away unused, which is logged. */
  const place = placeOf(job.ip)
  if (place && NO_LOOKUP_COUNTRIES.has(place.countryCode.toUpperCase())) {
    return void (await save(job.hash, 'eu', null, { countryCode: place.countryCode.toUpperCase() }))
  }

  if (!visitorConfig.ipapiKey()) return // nothing to ask with; stays anonymous
  const today = await callsToday()
  if (today >= STOP_AT) {
    console.warn(`[visitor] ${today} lookups today, at the free plan's cap: ${maskIp(job.ip)} not looked up`)
    return
  }

  const r = await lookupIp(job.ip, { key: visitorConfig.ipapiKey() })
  if (!r.ok) {
    if (job.attempts === 0) {
      queue.jobs.set(job.hash, { ...job, attempts: 1, notBefore: Date.now() + 60_000 })
      console.warn(`[visitor] lookup for ${maskIp(job.ip)} failed (${r.error}); trying once more in a minute`)
      return
    }
    console.warn(`[visitor] lookup for ${maskIp(job.ip)} failed again (${r.error}); next try after a day`)
    return void (await save(job.hash, 'failed', null, r))
  }
  if (r.countryCode && NO_LOOKUP_COUNTRIES.has(r.countryCode)) {
    if (!place) console.warn('[visitor] EU/UK result discarded: install the DB-IP file (npm run geoip:update) so these are never sent')
    return void (await save(job.hash, 'eu', null, { countryCode: r.countryCode }))
  }

  const { classification } = classify(r)
  let companyId: number | null = null
  if (classification === 'business' && r.orgName && r.orgType) {
    const c = await one<{ id: number }>(`
      INSERT INTO companies (key, name, domain, type, city, region)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (key) DO UPDATE SET last_seen = now(),
        city = coalesce(companies.city, excluded.city), region = coalesce(companies.region, excluded.region)
      RETURNING id`,
      [companyKey(r.orgName, r.orgDomain), r.orgName.slice(0, 200), r.orgDomain, r.orgType, r.city, r.region])
    companyId = c?.id ?? null
  }
  await save(job.hash, classification, companyId, r)
  await maybeWarn(today + 1)
}

/** Writes (or refreshes) the lookup for a hash and applies it to the visits that wait for it. */
async function save(hash: string, classification: string, companyId: number | null, r?: Partial<IpLookupResult>): Promise<void> {
  const row = await one<{ id: number }>(`
    INSERT INTO ip_lookups (ip_hash, classification, org_name, org_domain, org_type, city, region, country_code,
                            is_vpn, is_hosting, company_id, looked_up_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, now())
    ON CONFLICT (ip_hash) DO UPDATE SET
      classification = excluded.classification, org_name = excluded.org_name, org_domain = excluded.org_domain,
      org_type = excluded.org_type, city = excluded.city, region = excluded.region, country_code = excluded.country_code,
      is_vpn = excluded.is_vpn, is_hosting = excluded.is_hosting, company_id = excluded.company_id, looked_up_at = now()
    RETURNING id`,
    [hash, classification, r?.orgName ?? null, r?.orgDomain ?? null, r?.orgType ?? null, r?.city ?? null,
      r?.region ?? null, r?.countryCode ?? null, Boolean(r?.isVpn || r?.isProxy || r?.isTor), Boolean(r?.isDatacenter),
      companyId])
  if (row) await applyLookup(row.id, hash)
}

/**
 * Links the visits with this IP hash to the lookup and, for a business result,
 * their visitors to the company and their Visitor leads to Business IP.
 * The sweep job calls it too (jobs.ts), for anything that slipped through.
 */
export async function applyLookup(lookupId: number, hash?: string): Promise<void> {
  if (hash) {
    await q('UPDATE visits SET ip_lookup_id = $1 WHERE ip_hash = $2 AND ip_lookup_id IS NULL', [lookupId, hash])
  }
  const touched = await q<{ id: string }>(`
    UPDATE visitors v SET company_id = l.company_id
      FROM visits s JOIN ip_lookups l ON l.id = s.ip_lookup_id
     WHERE s.visitor_id = v.id AND l.id = $1 AND l.company_id IS NOT NULL AND v.company_id IS NULL
    RETURNING v.id`, [lookupId])
  if (touched.length) {
    await markBusinessLeads(touched.map((t) => t.id))
    await refreshCompanies(touched.map((t) => t.id))
  }
}

/** Last seen and visit count on the companies of these visitors. */
export async function refreshCompanies(visitorIds?: string[]): Promise<void> {
  await q(`
    UPDATE companies c SET
      visit_count = s.n, last_seen = greatest(c.last_seen, s.last)
      FROM (SELECT v.company_id, count(x.id)::int AS n, max(x.ended_at) AS last
              FROM visitors v JOIN visits x ON x.visitor_id = v.id
             WHERE v.company_id IS NOT NULL
               ${visitorIds ? 'AND v.company_id IN (SELECT company_id FROM visitors WHERE id = ANY($1::uuid[]))' : "AND x.ended_at > now() - interval '1 day'"}
             GROUP BY v.company_id) s
     WHERE c.id = s.company_id`, visitorIds ? [visitorIds] : [])
}

/** Paid lookups so far today, Chicago time. */
async function callsToday(): Promise<number> {
  const row = await one<{ n: number }>(`
    SELECT count(*)::int AS n FROM ip_lookups
     WHERE classification IN ('business', 'anonymous', 'noise', 'failed')
       AND (looked_up_at AT TIME ZONE 'America/Chicago')::date = (now() AT TIME ZONE 'America/Chicago')::date`)
  return row?.n ?? 0
}

/** One email per day once lookups pass 800, so the paid plan can be approved first (brief section 6). */
async function maybeWarn(count: number): Promise<void> {
  if (count < WARN_AT) return
  const day = chicago(new Date()).ymd
  const claimed = await one<{ key: string }>(`
    INSERT INTO settings (key, value) VALUES ('visitor_lookup_warning', to_jsonb($1::text))
    ON CONFLICT (key) DO UPDATE SET value = excluded.value WHERE settings.value IS DISTINCT FROM excluded.value
    RETURNING key`, [day])
  if (!claimed) return
  const to = visitorConfig.digestTo()
  console.warn(`[visitor] ${count} IP lookups today (warning at ${WARN_AT}, free plan stops at ${STOP_AT})`)
  if (to.length === 0) return
  await sendMail({
    to: to.join(', '),
    subject: `RTI visitors: ${count} IP lookups today, near the free limit`,
    text: `The visitor identification lookups passed ${WARN_AT} today (${count} so far, Chicago time).\n\n`
      + `The free ipapi.is plan stops at ${STOP_AT} a day; after that, new visitors stay anonymous until tomorrow.\n`
      + `If this keeps happening, the $20 a month plan (20,000 a day) needs approval.`,
  })
}
