/**
 * When the visitor jobs are due, in Chicago time (the brief: "7 am Central",
 * which moves with daylight saving). Pure, see ip.ts.
 *
 * The jobs run from a one minute timer in whichever process holds the lock
 * (jobs.ts), and the server restarts often, so nothing here depends on being
 * called at an exact moment: a job is due when its time has passed and it has
 * not yet run for that day, week or month.
 */

export type ChicagoTime = { ymd: string; ym: string; hour: number; weekday: number }

export function chicago(now: Date): ChicagoTime {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23', weekday: 'short',
  }).formatToParts(now).map((p) => [p.type, p.value]))
  const days: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  return {
    ymd: `${parts.year}-${parts.month}-${parts.day}`,
    ym: `${parts.year}-${parts.month}`,
    hour: Number(parts.hour),
    weekday: days[String(parts.weekday)] ?? 0,
  }
}

export const DIGEST_HOUR = 7

/** The daily digest: after 7 am Chicago, once per Chicago day. */
export function dailyDue(lastYmd: string | null | undefined, now: Date): boolean {
  const c = chicago(now)
  return c.hour >= DIGEST_HOUR && lastYmd !== c.ymd
}

/** The weekly report: Monday after 7 am Chicago, once per Monday. */
export function weeklyDue(lastYmd: string | null | undefined, now: Date): boolean {
  const c = chicago(now)
  return c.weekday === 1 && c.hour >= DIGEST_HOUR && lastYmd !== c.ymd
}

/** Retention: once per Chicago calendar month, after 3 am. */
export function monthlyDue(lastYm: string | null | undefined, now: Date): boolean {
  const c = chicago(now)
  return c.hour >= 3 && lastYm !== c.ym
}

/** Yesterday's start and end in Chicago, as instants (for "new companies yesterday"). */
export function chicagoDayBounds(ymd: string): { start: Date; end: Date } {
  // Noon UTC on that date is always inside the Chicago day; step back to its midnight.
  const noon = new Date(`${ymd}T12:00:00Z`)
  const offsetHours = 12 - chicago(noon).hour // 5 in CDT, 6 in CST
  const start = new Date(`${ymd}T00:00:00Z`)
  start.setUTCHours(offsetHours)
  const end = new Date(start.getTime() + 24 * 3600 * 1000)
  return { start, end }
}

export function previousYmd(ymd: string): string {
  const d = new Date(`${ymd}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() - 1)
  return d.toISOString().slice(0, 10)
}
