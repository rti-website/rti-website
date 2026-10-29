/**
 * Next calls register() once when a server process starts (not during
 * `next build`). Used for one thing: the visitor identification job timer
 * (src/lib/visitor/jobs.ts), and only when VISITOR_JOBS=on for this app.
 *
 * Dev and live share one database, so the switch is meant to be on in one of
 * them; a Postgres advisory lock makes a second one harmless anyway. The timer
 * is unref()'d so it never keeps a process alive, and every error is caught:
 * a job problem must never take the site down.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  if (process.env.NEXT_PHASE === 'phase-production-build') return
  if (!/^(on|true|1|yes)$/i.test((process.env.VISITOR_JOBS ?? '').trim())) return
  const { startVisitorJobs } = await import('./lib/visitor/timer')
  startVisitorJobs()
}
