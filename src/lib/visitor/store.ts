import 'server-only'
import { randomUUID } from 'node:crypto'
import { one, q, tx } from '@/lib/db'
import { deviceType, FLOOD_LIMIT, FLOOD_WINDOW_MINUTES } from './bot.ts'
import { cleanAttribution, sourceOf, type Attribution } from './source.ts'
import { ensureVisitorLead, markBusinessLeads } from './leads.ts'
import { freshLookup, applyLookup, queueLookup } from './enrich.ts'
import { hashIp, isPrivateIp } from './ip.ts'
import { visitorConfig } from './config.ts'
import { lookupIp as placeOfIp } from '@/lib/geoip'

/**
 * What /api/e/ stores for one page view (brief sections 3.3 and 3.4), after
 * the route has checked consent, Global Privacy Control, the origin and the
 * user agent. Runs after the response has been sent (after()), so the
 * visitor's page never waits on the database.
 *
 *   visitors    created on the first event, with first touch; last_seen
 *   visits      the session continues if its last page was under 30
 *               minutes ago, otherwise a new one starts; a new one gets its
 *               city, state and country from the DB-IP file (db/019, read
 *               on this server, never sent anywhere)
 *   page_views  one row; the previous one gets its seconds on page
 *   leads       the Visitor lead, on the visitor's first stored event
 *   ip_lookups  cache hit -> linked now; miss -> queued (enrich.ts)
 */

export const SESSION_IDLE_MINUTES = 30
/** How far back the same IP still means the same visitor (resolveVisitor, mergeByIp). */
export const SAME_IP_DAYS = 30
const MAX_SECONDS = 30 * 60

export type PageViewInput = {
  visitorId: string
  ip: string | null
  userAgent: string
  path: string
  title: string | null
  /** document.referrer on the page that was loaded (an in-app navigation keeps the first one). */
  referrer: string | null
  /** Campaign parameters on the URL of this page (gclid, utm_*…). */
  params: Attribution
  /** What the browser holds as the visit's attribution (window.__rtiAttr), for first touch. */
  firstTouch: Attribution
  /** Seconds the visitor spent on the previous page of this visit, if the browser knows. */
  previousSeconds: number | null
}

/**
 * WHICH VISITOR A REQUEST IS (management, 30 Oct 2026: "group visits from the
 * same organization and IP into one visitor, not one row per session").
 *
 *   1. The rti_vid cookie, when that visitor still exists.
 *   2. Otherwise a visitor seen from the same IP (its salted hash) in the last
 *      SAME_IP_DAYS days on a computer or tablet: a new private window, a
 *      cleared cookie or a second browser in the same office joins the same
 *      visitor instead of starting a new row. Phones on mobile data share
 *      addresses with strangers, so a phone never joins by IP.
 *   3. Otherwise a new random id.
 *
 * `excluded`: the IP is a cloud or data centre network already looked up
 * (classify.ts 'datacenter'): nothing is stored and no cookie is set.
 * Two visitors that both have cookies are joined later by mergeByIp().
 */
export async function resolveVisitor(known: string | null, ip: string | null, userAgent: string): Promise<{ id: string; excluded: boolean }> {
  const salt = visitorConfig.salt()
  const ipHash = ip && salt && !isPrivateIp(ip) ? hashIp(ip, salt) : null
  if (ipHash) {
    const dc = await one<{ n: number }>(`
      SELECT 1 AS n FROM ip_lookups WHERE ip_hash = $1 AND classification = 'datacenter'
         AND looked_up_at > now() - interval '30 days'`, [ipHash])
    if (dc) return { id: known ?? '', excluded: true }
  }
  if (known && await one('SELECT 1 FROM visitors WHERE id = $1', [known])) return { id: known, excluded: false }
  if (ipHash && deviceType(userAgent) !== 'mobile') {
    const same = await one<{ visitor_id: string }>(`
      SELECT x.visitor_id FROM visits x
       WHERE x.ip_hash = $1 AND x.started_at > now() - make_interval(days => $2)
         AND coalesce(x.device_type, 'desktop') <> 'mobile'
       ORDER BY x.ended_at DESC LIMIT 1`, [ipHash, SAME_IP_DAYS])
    if (same) return { id: same.visitor_id, excluded: false }
  }
  return { id: known ?? randomUUID(), excluded: false }
}

export async function recordPageView(input: PageViewInput): Promise<'stored' | 'flood'> {
  const { visitorId } = input
  const path = input.path.slice(0, 500)
  const title = input.title ? input.title.slice(0, 300) : null
  const salt = visitorConfig.salt()
  const ipHash = input.ip && salt && !isPrivateIp(input.ip) ? hashIp(input.ip, salt) : null

  /* One visitor's events are handled one at a time (a transaction lock on the
     visitor id): two pages sent a moment apart must not both decide they
     start a new visit, and the flood count must see every earlier page. */
  const out = await tx(async (run) => {
    await run('SELECT pg_advisory_xact_lock(hashtext($1))', [`rti-visitor:${visitorId}`])
    const [existing] = await run<{ id: string; lead_id: number | null }>('SELECT id, lead_id FROM visitors WHERE id = $1', [visitorId])
    if (existing) {
      // The brief's flood rule: over 60 page views in 10 minutes is a bot.
      const [flood] = await run<{ n: number }>(`
        SELECT count(*)::int AS n FROM page_views p JOIN visits s ON s.id = p.visit_id
         WHERE s.visitor_id = $1 AND p.viewed_at > now() - make_interval(mins => $2)`, [visitorId, FLOOD_WINDOW_MINUTES])
      if ((flood?.n ?? 0) >= FLOOD_LIMIT) return { flood: true as const }
    } else {
      await run(`INSERT INTO visitors (id, first_touch) VALUES ($1, $2::jsonb) ON CONFLICT (id) DO NOTHING`,
        [visitorId, JSON.stringify(cleanAttribution({ ...input.firstTouch, ...input.params }))])
    }

    const [current] = await run<{ id: number; ip_hash: string | null }>(`
      SELECT id, ip_hash FROM visits
       WHERE visitor_id = $1 AND ended_at > now() - make_interval(mins => $2)
       ORDER BY ended_at DESC LIMIT 1`, [visitorId, SESSION_IDLE_MINUTES])

    let visitId: number
    if (current) {
      visitId = current.id
      if (input.previousSeconds !== null) {
        await run(`
          UPDATE page_views SET seconds_on_page = $2
           WHERE id = (SELECT id FROM page_views WHERE visit_id = $1 ORDER BY viewed_at DESC, id DESC LIMIT 1)
             AND seconds_on_page IS NULL`, [visitId, Math.min(Math.max(0, Math.round(input.previousSeconds)), MAX_SECONDS)])
      }
      await run(`UPDATE visits SET ended_at = now(), exit_path = $2, page_count = page_count + 1,
                      ip_hash = coalesce(ip_hash, $3) WHERE id = $1`, [visitId, path, ipHash])
    } else {
      // This session's own source: the page it started on, its referrer and campaign parameters.
      const attr: Attribution = cleanAttribution({ ...input.params, landing_page: path, referrer: externalReferrer(input.referrer) ?? undefined })
      const place = input.ip ? placeOfIp(input.ip) : null
      const [row] = await run<{ id: number }>(`
        INSERT INTO visits (visitor_id, ip_hash, device_type, entry_path, exit_path, page_count, source, attribution, city, region, country_code)
        VALUES ($1, $2, $3, $4, $4, 1, $5, $6::jsonb, $7, $8, $9) RETURNING id`,
        [visitorId, ipHash, deviceType(input.userAgent), path, sourceOf(attr).kind, JSON.stringify(attr),
          place?.city || null, place?.region || null, place?.countryCode || null])
      if (!row) throw new Error('visit not created')
      visitId = row.id
      await run('UPDATE visitors SET visit_count = visit_count + 1 WHERE id = $1', [visitorId])
    }
    await run('INSERT INTO page_views (visit_id, path, title) VALUES ($1, $2, $3)', [visitId, path, title])
    await run('UPDATE visitors SET last_seen = now() WHERE id = $1', [visitorId])
    return { flood: false as const, leadId: existing?.lead_id ?? null, lookup: Boolean(ipHash && (!current || !current.ip_hash)) }
  })
  if (out.flood) return 'flood'

  // The Visitor lead, on the visitor's first stored event (or if it was ever lost).
  if (!out.leadId) await ensureVisitorLead(visitorId, path)

  // The organisation: from the cache now, or looked up right after this.
  if (out.lookup && ipHash && input.ip) {
    const hit = await freshLookup(ipHash)
    if (hit) await applyLookup(hit.id, ipHash)
    else queueLookup(input.ip, ipHash)
  }
  return 'stored'
}

/** The seconds on the last page, sent when the tab is hidden or closed. */
export async function recordLeave(visitorId: string, seconds: number): Promise<void> {
  await q(`
    UPDATE page_views SET seconds_on_page = $2
     WHERE id = (SELECT p.id FROM page_views p JOIN visits s ON s.id = p.visit_id
                  WHERE s.visitor_id = $1 AND s.ended_at > now() - make_interval(mins => $3)
                  ORDER BY p.viewed_at DESC LIMIT 1)`,
    [visitorId, Math.min(Math.max(0, Math.round(seconds)), MAX_SECONDS), SESSION_IDLE_MINUTES])
}

function externalReferrer(ref: string | null): string | null {
  if (!ref) return null
  try {
    const host = new URL(ref).hostname.replace(/^www\./, '')
    if (/(^|\.)recycletechnologies\.com$/i.test(host)) return null
    return ref.slice(0, 500)
  } catch { return null }
}

/* One visitor's events run one after another in this process, so a burst
   from one browser (or a bot) holds at most one database connection at a time
   instead of queueing on the lock with the whole pool. The lock above still
   covers two processes (dev and live share the database). */
const chains = new Map<string, Promise<unknown>>()
export function inTurn<T>(visitorId: string, fn: () => Promise<T>): Promise<T> {
  const prev = chains.get(visitorId) ?? Promise.resolve()
  const next = prev.catch(() => undefined).then(fn)
  chains.set(visitorId, next)
  void next.finally(() => { if (chains.get(visitorId) === next) chains.delete(visitorId) }).catch(() => undefined)
  return next
}

/**
 * ONE VISITOR PER IP (management, 30 Oct 2026), for the visitors that
 * resolveVisitor() could not join at capture because each already had its own
 * cookie (two browsers in one office, or rows from before the rule). Visitors
 * seen from the same IP hash in the last SAME_IP_DAYS days, on a computer or
 * tablet, become one: the one first seen keeps its id, first touch and
 * Visitor lead, and takes the others' visits, enquiries and conversion. The
 * others' Visitor leads go. The 10 minute sweep runs it (jobs.ts).
 * Returns how many visitors were folded in.
 */
export async function mergeByIp(limit = 200): Promise<number> {
  const groups = await q<{ ids: string[] }>(`
    SELECT array_agg(DISTINCT x.visitor_id::text) AS ids
      FROM visits x
     WHERE x.ip_hash IS NOT NULL AND x.started_at > now() - make_interval(days => $1)
       AND coalesce(x.device_type, 'desktop') <> 'mobile'
     GROUP BY x.ip_hash HAVING count(DISTINCT x.visitor_id) > 1
     LIMIT $2`, [SAME_IP_DAYS, limit])
  let folded = 0
  const merged: string[] = []
  for (const g of groups) {
    const out = await tx(async (run) => {
      // Lock in a fixed order, like recordPageView does per visitor.
      for (const id of [...g.ids].sort()) await run('SELECT pg_advisory_xact_lock(hashtext($1))', [`rti-visitor:${id}`])
      const vs = await run<{ id: string; first_seen: string; last_seen: string; company_id: number | null }>(
        'SELECT id, first_seen, last_seen, company_id FROM visitors WHERE id = ANY($1::uuid[]) ORDER BY first_seen, id', [g.ids])
      if (vs.length < 2) return null
      const target = vs[0]!
      const dups = vs.slice(1).map((v) => v.id)
      await run('UPDATE visits SET visitor_id = $1 WHERE visitor_id = ANY($2::uuid[])', [target.id, dups])
      await run("UPDATE leads SET visitor_id = $1 WHERE lead_type = 'form' AND visitor_id = ANY($2::uuid[])", [target.id, dups])
      const conv = await run<{ converted_lead_id: number }>(`
        SELECT converted_lead_id FROM leads WHERE lead_type = 'visitor' AND visitor_id = ANY($1::uuid[])
           AND converted_lead_id IS NOT NULL ORDER BY created_at LIMIT 1`, [dups])
      await run("UPDATE visitors SET lead_id = NULL WHERE id = ANY($1::uuid[])", [dups])
      await run("DELETE FROM leads WHERE lead_type = 'visitor' AND visitor_id = ANY($1::uuid[])", [dups])
      if (conv[0]) {
        await run(`UPDATE leads SET converted_lead_id = $2, visitor_status = 'converted'
                    WHERE lead_type = 'visitor' AND visitor_id = $1 AND converted_lead_id IS NULL`, [target.id, conv[0].converted_lead_id])
      }
      const company = target.company_id ?? vs.find((v) => v.company_id !== null)?.company_id ?? null
      await run('DELETE FROM visitors WHERE id = ANY($1::uuid[])', [dups])
      await run(`
        UPDATE visitors v SET
          first_seen = least(v.first_seen, $2::timestamptz), last_seen = greatest(v.last_seen, $3::timestamptz),
          visit_count = (SELECT count(*)::int FROM visits x WHERE x.visitor_id = v.id),
          company_id = coalesce(v.company_id, $4::bigint)
         WHERE v.id = $1`,
        [target.id, vs.map((v) => v.first_seen).sort()[0], vs.map((v) => v.last_seen).sort().at(-1), company])
      return { target: target.id, n: dups.length }
    })
    if (out) { folded += out.n; merged.push(out.target) }
  }
  for (const id of merged) {
    const entry = await one<{ entry_path: string | null }>('SELECT entry_path FROM visits WHERE visitor_id = $1 ORDER BY started_at LIMIT 1', [id])
    await ensureVisitorLead(id, entry?.entry_path ?? null)
  }
  if (merged.length) {
    await markBusinessLeads(merged)
    console.log(`[visitor] same IP: ${folded} visitor(s) joined into ${merged.length}`)
  }
  return folded
}
