import { runDueJobs } from './jobs.ts'

/**
 * The one minute tick for the visitor jobs (started by src/instrumentation.ts).
 * Kept apart from jobs.ts so the instrumentation hook imports as little as
 * possible. The first tick waits a minute so a restart never adds work to the
 * moment the server comes back up.
 */

declare global {
  var __rtiVisitorTimer: NodeJS.Timeout | undefined
}

export function startVisitorJobs(): void {
  if (globalThis.__rtiVisitorTimer) return
  const tick = async () => {
    try {
      const done = await runDueJobs()
      if (done.some((d) => d !== 'sweep')) console.log(`[visitor] jobs: ${done.join(', ')}`)
    } catch (err) {
      console.error('[visitor] jobs tick failed:', (err as Error).message)
    }
  }
  globalThis.__rtiVisitorTimer = setInterval(() => void tick(), 60_000)
  globalThis.__rtiVisitorTimer.unref?.()
  console.log('[visitor] job timer started (VISITOR_JOBS=on)')
}
