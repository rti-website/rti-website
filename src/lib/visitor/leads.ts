import 'server-only'
import { one, q } from '@/lib/db'

/**
 * Visitor leads (brief section 7): one row in `leads` per consented visitor,
 * lead_type = 'visitor'. They never go through notifyRecipients(), never count
 * in the Enquiries badge or list (every form query filters lead_type =
 * 'form'), and live in Admin -> Visitor leads.
 */

export function anonymousName(visitorId: string): string {
  return `Anonymous visitor ${visitorId.replace(/-/g, '').slice(0, 8)}`
}

/** Creates the visitor's lead if it has none. Safe to call twice (unique index). */
export async function ensureVisitorLead(visitorId: string, entryPath: string | null): Promise<number | null> {
  const row = await one<{ id: number }>(`
    INSERT INTO leads (lead_type, type, name, source_page, channel, visitor_id, visitor_status, details)
    VALUES ('visitor', 'contact', $2, $3, 'website', $1, 'new', '{"visitor": true}'::jsonb)
    ON CONFLICT (visitor_id) WHERE lead_type = 'visitor' DO NOTHING
    RETURNING id`, [visitorId, anonymousName(visitorId), entryPath])
  const id = row?.id ?? (await one<{ id: number }>(
    "SELECT id FROM leads WHERE visitor_id = $1 AND lead_type = 'visitor'", [visitorId]))?.id ?? null
  if (id) await q('UPDATE visitors SET lead_id = $2 WHERE id = $1 AND lead_id IS DISTINCT FROM $2', [visitorId, id])
  return id
}

/**
 * The visitor came from an identified organisation: its Visitor lead takes the
 * company's name and is marked Business IP (brief section 7). Run whenever a
 * lookup lands, and again by the 10 minute sweep for anything missed.
 */
export async function markBusinessLeads(visitorIds: string[]): Promise<number> {
  if (visitorIds.length === 0) return 0
  const rows = await q<{ id: number }>(`
    UPDATE leads l
       SET is_business_ip = true,
           name = c.name,
           company = c.name,
           details = coalesce(l.details, '{}'::jsonb) || jsonb_build_object(
             'visitor', true, 'org_type', c.type, 'org_domain', c.domain, 'city', c.city, 'region', c.region)
      FROM visitors v JOIN companies c ON c.id = v.company_id
     WHERE l.visitor_id = v.id AND l.lead_type = 'visitor'
       AND v.id = ANY($1::uuid[])
       AND (NOT l.is_business_ip OR l.company IS DISTINCT FROM c.name)
    RETURNING l.id`, [visitorIds])
  return rows.length
}

/**
 * A form was submitted by this browser (src/app/api/leads/route.ts): the form
 * lead remembers the visitor, and the Visitor lead becomes Converted and points
 * at it (brief section 3, step 7). The form lead itself, its routing email and
 * the Enquiries list are untouched. Never throws.
 */
export async function convertVisitor(visitorId: string, formLeadId: number): Promise<void> {
  try {
    const v = await one<{ id: string }>('SELECT id FROM visitors WHERE id = $1', [visitorId])
    if (!v) return
    await q("UPDATE leads SET visitor_id = $2 WHERE id = $1 AND lead_type = 'form'", [formLeadId, visitorId])
    await q(`
      UPDATE leads SET visitor_status = 'converted', converted_lead_id = $2
       WHERE visitor_id = $1 AND lead_type = 'visitor' AND converted_lead_id IS NULL`, [visitorId, formLeadId])
    await q(`
      UPDATE companies SET status = 'lead_created'
       WHERE id = (SELECT company_id FROM visitors WHERE id = $1) AND status IN ('new', 'reviewed')`, [visitorId])
  } catch (err) {
    console.error('[visitor] form lead not linked:', (err as Error).message)
  }
}
