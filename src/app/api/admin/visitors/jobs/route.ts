import { guard, json, body } from '@/lib/admin-route'
import { canSeeVisitors } from '@/lib/visitor/config'
import { dailyDigest, sweep, weeklyReport } from '@/lib/visitor/jobs'
import { chicago, previousYmd } from '@/lib/visitor/schedule'

/**
 * POST { job: 'sweep' | 'digest' | 'weekly', day?: 'YYYY-MM-DD' } — run a
 * visitor job now, for testing (brief M2: "daily test email to Aaqib"). The
 * digest still goes only to VISITOR_DIGEST_TO. Administrators who can see
 * visitors only. Does not change when the scheduled jobs next run.
 */
export const POST = guard(async ({ req, user }) => {
  if (!canSeeVisitors(user)) return json({ error: 'Your account cannot see visitors.' }, 403)
  const b = await body<{ job: string; day: string }>(req)
  const day = typeof b.day === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(b.day) ? b.day : previousYmd(chicago(new Date()).ymd)
  if (b.job === 'sweep') { await sweep(); return json({ ok: true, ran: 'sweep' }) }
  if (b.job === 'digest') return json({ ok: true, ran: 'digest', day, sent: await dailyDigest(day) })
  if (b.job === 'weekly') return json({ ok: true, ran: 'weekly', sent: await weeklyReport(chicago(new Date()).ymd, []) })
  return json({ error: 'Which job? sweep, digest or weekly.' }, 400)
}, { role: ['administrator'] })
