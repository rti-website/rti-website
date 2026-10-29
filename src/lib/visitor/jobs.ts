import 'server-only'
import { one, q, tx } from '@/lib/db'
import { sendMail } from '@/lib/mail'
import { SITE } from '@/lib/site'
import { visitorConfig } from './config.ts'
import { applyLookup, refreshCompanies } from './enrich.ts'
import { markBusinessLeads } from './leads.ts'
import { chicago, chicagoDayBounds, dailyDue, monthlyDue, previousYmd, weeklyDue } from './schedule.ts'
import { INTENT_PATHS, sourceOf } from './source.ts'

/**
 * The scheduled side of visitor identification (brief sections 6, 7, 8 and 5).
 *
 *   every 10 minutes   sweep: link visits to lookups another process made,
 *                      bring Visitor leads up to date (name, company,
 *                      Business IP), refresh company counts
 *   daily, 7 am CT     the digest to VISITOR_DIGEST_TO
 *   Mondays, 7 am CT   the weekly report
 *   monthly            retention
 *
 * WHO RUNS IT: a one minute timer started by src/instrumentation.ts when
 * VISITOR_JOBS=on. Every tick takes a Postgres transaction-level advisory
 * lock first, so even with the switch on in both apps (dev and live share the
 * database) or a pm2 cluster, one process does the work and the others skip.
 * When each job last ran is kept in settings.visitor_jobs, so a restart
 * (frequent on this server) neither repeats a digest nor skips one: a job is
 * due when its time has passed and it has not run for that day/week/month.
 */

const LOCK = 'rti-visitor-jobs'
const SWEEP_MINUTES = 10

type JobState = { sweep?: string; daily?: string; weekly?: string; monthly?: string; skipped?: string[] }

export async function runDueJobs(now = new Date()): Promise<string[]> {
  const done: string[] = []
  await tx(async (run) => {
    const [got] = await run<{ ok: boolean }>('SELECT pg_try_advisory_xact_lock(hashtext($1)) AS ok', [LOCK])
    if (!got?.ok) return
    const row = await one<{ value: JobState }>("SELECT value FROM settings WHERE key = 'visitor_jobs'")
    const state: JobState = row?.value ?? {}
    const c = chicago(now)

    /* Each job on its own: one failing never stops the others, and a job that
       failed is still marked as run for its day (a digest is never sent twice
       because a later step threw; the failure is in the log). */
    const step = async (name: string, fn: () => Promise<unknown>) => {
      try { await fn(); done.push(name) } catch (err) { console.error(`[visitor] job ${name} failed:`, (err as Error).message); done.push(`${name}-failed`) }
    }
    if (!state.sweep || now.getTime() - Date.parse(state.sweep) >= SWEEP_MINUTES * 60_000) {
      await step('sweep', sweep); state.sweep = now.toISOString()
    }
    if (dailyDue(state.daily, now)) {
      const day = previousYmd(c.ymd)
      await step('digest', async () => {
        const sent = await dailyDigest(day)
        if (!sent) state.skipped = [...(state.skipped ?? []).slice(-13), day]
      })
      state.daily = c.ymd
    }
    if (weeklyDue(state.weekly, now)) {
      await step('weekly', () => weeklyReport(c.ymd, state.skipped ?? []))
      state.weekly = c.ymd; state.skipped = []
    }
    if (monthlyDue(state.monthly, now)) {
      await step('retention', retention); state.monthly = c.ym
    }
    await q(`INSERT INTO settings (key, value) VALUES ('visitor_jobs', $1::jsonb)
             ON CONFLICT (key) DO UPDATE SET value = excluded.value, updated_at = now()`, [JSON.stringify(state)])
  })
  return done
}

/* ------------------------------------------------------------------ sweep */

export async function sweep(): Promise<void> {
  // Visits whose IP was looked up by another process, or before the visit was stored.
  const pending = await q<{ id: number; ip_hash: string }>(`
    SELECT DISTINCT ON (l.id) l.id, l.ip_hash FROM visits s JOIN ip_lookups l ON l.ip_hash = s.ip_hash
     WHERE s.ip_lookup_id IS NULL AND s.ip_hash IS NOT NULL LIMIT 500`)
  for (const p of pending) await applyLookup(p.id, p.ip_hash)
  // Visitors linked to a company whose lead is not marked yet (a lead made after the link).
  const unmarked = await q<{ id: string }>(`
    SELECT v.id FROM visitors v JOIN leads l ON l.visitor_id = v.id AND l.lead_type = 'visitor'
     WHERE v.company_id IS NOT NULL AND NOT l.is_business_ip LIMIT 500`)
  if (unmarked.length) await markBusinessLeads(unmarked.map((u) => u.id))
  await refreshCompanies()
}

/* -------------------------------------------------------------- retention */

/** Brief section 5: lookups 90 days, visits and page views 13 months, plain Visitor leads 13 months. */
export async function retention(): Promise<void> {
  await q("DELETE FROM ip_lookups WHERE looked_up_at < now() - interval '90 days'")
  await q("UPDATE visits SET ip_hash = NULL WHERE ip_hash IS NOT NULL AND started_at < now() - interval '90 days'")
  await q("DELETE FROM visits WHERE started_at < now() - interval '13 months'")
  await q(`
    DELETE FROM leads WHERE lead_type = 'visitor' AND NOT is_business_ip AND converted_lead_id IS NULL
       AND coalesce(visitor_status, 'new') <> 'converted'
       AND visitor_id IN (SELECT id FROM visitors WHERE last_seen < now() - interval '13 months')`)
  await q(`
    DELETE FROM visitors v WHERE v.last_seen < now() - interval '13 months'
       AND NOT EXISTS (SELECT 1 FROM leads l WHERE l.visitor_id = v.id)`)
}

/* ----------------------------------------------------------------- emails */

const esc = (s: unknown) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!)
const adminLink = (view: string) => `${SITE.origin}/admin/?view=${view}`

type NewCompany = {
  id: number; name: string; domain: string | null; type: string; city: string | null; region: string | null
  pages: string[] | null; first_touch: Record<string, string> | null; intent: boolean
}

async function companiesFirstSeen(start: Date, end: Date): Promise<NewCompany[]> {
  return q<NewCompany>(`
    SELECT c.id, c.name, c.domain, c.type, c.city, c.region,
           (SELECT array_agg(DISTINCT p.path) FROM visitors v JOIN visits s ON s.visitor_id = v.id
              JOIN page_views p ON p.visit_id = s.id WHERE v.company_id = c.id) AS pages,
           (SELECT v.first_touch FROM visitors v WHERE v.company_id = c.id ORDER BY v.first_seen LIMIT 1) AS first_touch,
           EXISTS (SELECT 1 FROM visitors v JOIN visits s ON s.visitor_id = v.id JOIN page_views p ON p.visit_id = s.id
                    WHERE v.company_id = c.id AND p.path = ANY($3::text[])) AS intent
      FROM companies c
     WHERE c.first_seen >= $1 AND c.first_seen < $2 AND c.status <> 'ignore'
     ORDER BY c.first_seen`, [start, end, INTENT_PATHS])
}

/** Companies that viewed a pickup, quote or contact page in the window without a form lead from them. */
async function intentCompanies(start: Date, end: Date): Promise<{ name: string; domain: string | null; pages: string[] }[]> {
  return q(`
    SELECT c.name, c.domain, array_agg(DISTINCT p.path) AS pages
      FROM companies c JOIN visitors v ON v.company_id = c.id JOIN visits s ON s.visitor_id = v.id
      JOIN page_views p ON p.visit_id = s.id
     WHERE p.viewed_at >= $1 AND p.viewed_at < $2 AND p.path = ANY($3::text[]) AND c.status <> 'ignore'
       AND NOT EXISTS (SELECT 1 FROM leads f WHERE f.lead_type = 'form' AND f.visitor_id = v.id)
     GROUP BY c.id ORDER BY c.name`, [start, end, INTENT_PATHS])
}

function companyRows(list: NewCompany[]): string {
  return list.map((c) => `<tr>
    <td style="padding:6px 10px;border-bottom:1px solid #eee"><b>${esc(c.name)}</b>${c.domain ? `<br><span style="color:#666">${esc(c.domain)}</span>` : ''}</td>
    <td style="padding:6px 10px;border-bottom:1px solid #eee">${esc(c.type)}</td>
    <td style="padding:6px 10px;border-bottom:1px solid #eee">${esc([c.city, c.region].filter(Boolean).join(', '))}</td>
    <td style="padding:6px 10px;border-bottom:1px solid #eee">${esc((c.pages ?? []).slice(0, 5).join(', '))}${(c.pages?.length ?? 0) > 5 ? ` +${(c.pages!.length - 5)}` : ''}</td>
    <td style="padding:6px 10px;border-bottom:1px solid #eee">${esc(sourceOf(c.first_touch).label)}</td>
    <td style="padding:6px 10px;border-bottom:1px solid #eee">${c.intent ? 'Yes' : ''}</td></tr>`).join('')
}

const TABLE_HEAD = `<tr style="background:#f4f9f6;text-align:left">${['Company', 'Type', 'Location', 'Pages', 'Source', 'Intent']
  .map((h) => `<th style="padding:6px 10px">${h}</th>`).join('')}</tr>`

function wrap(title: string, body: string): string {
  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#132119;max-width:900px">
<h2 style="margin:0 0 12px">${esc(title)}</h2>${body}
<p style="margin-top:24px;color:#777;font-size:12px">Sent by the RTI website (visitor identification). Business IP means the visit came from an organisation's network: a signal, not proof of who visited. Home, mobile and VPN visits stay anonymous.</p></div>`
}

async function send(subject: string, text: string, html: string): Promise<boolean> {
  const to = visitorConfig.digestTo()
  if (to.length === 0) { console.warn(`[visitor] "${subject}" not sent: VISITOR_DIGEST_TO is empty`); return false }
  const r = await sendMail({ to: to.join(', '), subject, text, html })
  if (!r.sent) console.warn(`[visitor] "${subject}" not sent: ${r.reason}`)
  return r.sent
}

/** "RTI visitors: N new companies yesterday" (brief section 8). False when there were none (no email). */
export async function dailyDigest(ymd: string): Promise<boolean> {
  const { start, end } = chicagoDayBounds(ymd)
  const fresh = await companiesFirstSeen(start, end)
  if (fresh.length === 0) { console.log(`[visitor] digest for ${ymd}: no new companies, not sent`); return false }
  const intent = await intentCompanies(start, end)
  const [anon] = await q<{ n: number }>(`
    SELECT count(*)::int AS n FROM leads WHERE lead_type = 'visitor' AND NOT is_business_ip
       AND created_at >= $1 AND created_at < $2`, [start, end])
  const subject = `RTI visitors: ${fresh.length} new compan${fresh.length === 1 ? 'y' : 'ies'} yesterday`
  const csv = `${SITE.origin}/api/admin/visitor-leads/?format=csv&day=${ymd}`
  const html = wrap(subject, `
<p>${fresh.length} organisation${fresh.length === 1 ? '' : 's'} visited the site for the first time on ${esc(ymd)} (Chicago time).</p>
<table style="border-collapse:collapse;width:100%">${TABLE_HEAD}${companyRows(fresh)}</table>
${intent.length ? `<h3 style="margin:20px 0 6px">Looked at pickup, quote or contact without sending a form</h3><ul>${intent.map((i) =>
    `<li><b>${esc(i.name)}</b>${i.domain ? ` (${esc(i.domain)})` : ''}: ${esc(i.pages.join(', '))}</li>`).join('')}</ul>` : ''}
<p>Anonymous Visitor leads yesterday: <b>${anon?.n ?? 0}</b>.</p>
<p><a href="${adminLink('visitors')}">Open Visitors</a> · <a href="${adminLink('visitor-leads')}">Open Visitor leads</a> · <a href="${csv}">Yesterday's Visitor leads as CSV</a> (sign in needed)</p>`)
  const text = `${subject}\n\n${fresh.map((c) => `- ${c.name}${c.domain ? ` (${c.domain})` : ''}, ${c.type}, ${[c.city, c.region].filter(Boolean).join(', ')}; pages: ${(c.pages ?? []).slice(0, 5).join(', ')}; source: ${sourceOf(c.first_touch).label}${c.intent ? '; INTENT' : ''}`).join('\n')}\n\n`
    + (intent.length ? `Intent (pickup, quote or contact viewed, no form):\n${intent.map((i) => `- ${i.name}: ${i.pages.join(', ')}`).join('\n')}\n\n` : '')
    + `Anonymous Visitor leads yesterday: ${anon?.n ?? 0}\n\nVisitors: ${adminLink('visitors')}\nVisitor leads: ${adminLink('visitor-leads')}\nCSV: ${csv}\n`
  return send(subject, text, html)
}

/** Monday's report on the week before (brief section 8). */
export async function weeklyReport(mondayYmd: string, skippedDays: string[]): Promise<boolean> {
  const end = chicagoDayBounds(mondayYmd).start
  let first = mondayYmd
  for (let i = 0; i < 7; i++) first = previousYmd(first)
  const start = chicagoDayBounds(first).start
  const fresh = await companiesFirstSeen(start, end)
  const top = await q<{ name: string; domain: string | null; type: string; visits: number }>(`
    SELECT c.name, c.domain, c.type, count(DISTINCT s.id)::int AS visits
      FROM companies c JOIN visitors v ON v.company_id = c.id JOIN visits s ON s.visitor_id = v.id
     WHERE s.started_at >= $1 AND s.started_at < $2 AND c.status <> 'ignore'
     GROUP BY c.id ORDER BY visits DESC, c.name LIMIT 10`, [start, end])
  const intent = await intentCompanies(start, end)
  const [counts] = await q<{ business: number; anon: number; converted: number }>(`
    SELECT count(*) FILTER (WHERE lead_type = 'visitor' AND is_business_ip AND created_at >= $1 AND created_at < $2)::int AS business,
           count(*) FILTER (WHERE lead_type = 'visitor' AND NOT is_business_ip AND created_at >= $1 AND created_at < $2)::int AS anon,
           count(*) FILTER (WHERE lead_type = 'form' AND visitor_id IS NOT NULL AND created_at >= $1 AND created_at < $2)::int AS converted
      FROM leads`, [start, end])
  const subject = `RTI visitors: week of ${first} — ${fresh.length} new compan${fresh.length === 1 ? 'y' : 'ies'}`
  const html = wrap(subject, `
<p>New companies: <b>${fresh.length}</b> · Business IP Visitor leads: <b>${counts?.business ?? 0}</b> · Anonymous Visitor leads: <b>${counts?.anon ?? 0}</b> · Visitor leads converted to form leads: <b>${counts?.converted ?? 0}</b></p>
<h3 style="margin:16px 0 6px">Top 10 by visits</h3>
${top.length ? `<ol>${top.map((t) => `<li><b>${esc(t.name)}</b>${t.domain ? ` (${esc(t.domain)})` : ''}, ${esc(t.type)}: ${t.visits} visit${t.visits === 1 ? '' : 's'}</li>`).join('')}</ol>` : '<p>None.</p>'}
<h3 style="margin:16px 0 6px">Intent: pickup, quote or contact viewed without a form</h3>
${intent.length ? `<ul>${intent.map((i) => `<li><b>${esc(i.name)}</b>: ${esc(i.pages.join(', '))}</li>`).join('')}</ul>` : '<p>None.</p>'}
${fresh.length ? `<h3 style="margin:16px 0 6px">New companies</h3><table style="border-collapse:collapse;width:100%">${TABLE_HEAD}${companyRows(fresh)}</table>` : ''}
${skippedDays.length ? `<p style="color:#666">No daily digest on ${esc(skippedDays.join(', '))}: no new companies those days.</p>` : ''}
<p><a href="${adminLink('visitors')}">Open Visitors</a> · <a href="${adminLink('visitor-leads')}">Open Visitor leads</a></p>`)
  const text = `${subject}\n\nNew companies: ${fresh.length}\nBusiness IP Visitor leads: ${counts?.business ?? 0}\nAnonymous Visitor leads: ${counts?.anon ?? 0}\nConverted to form leads: ${counts?.converted ?? 0}\n\nTop 10 by visits:\n${top.map((t, i) => `${i + 1}. ${t.name} (${t.visits})`).join('\n') || 'None'}\n\nIntent:\n${intent.map((i) => `- ${i.name}: ${i.pages.join(', ')}`).join('\n') || 'None'}\n`
    + (skippedDays.length ? `\nNo daily digest on ${skippedDays.join(', ')} (no new companies).\n` : '')
  return send(subject, text, html)
}
