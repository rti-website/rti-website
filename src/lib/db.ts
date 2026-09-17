import 'server-only'
import pg, { Pool, type QueryResultRow } from 'pg'

/*
 * node-postgres returns bigint as a STRING, because a 64-bit integer does not
 * fit in a JavaScript number. Left alone, every `id` arrives as "1" and a
 * <select> whose value is the number 1 silently shows nothing selected — the
 * kind of bug that takes an afternoon.
 *
 * These are row ids on a marketing site's blog. They will not reach 2^53
 * (9,007,199,254,740,992) this century, so parsing them as numbers is safe and
 * makes every comparison in the app behave. Revisit only if a table ever counts
 * in the quadrillions.
 */
pg.types.setTypeParser(pg.types.builtins.INT8, (v) => Number(v))

/**
 * The Postgres connection.
 *
 * ! NOTHING THAT IS PRERENDERED MAY IMPORT THIS. The public site is built with
 * `dynamic = 'error'` and must stay that way (CLAUDE.md rule 2); every read here
 * happens inside an admin route handler, which is not wrapped by a layout and is
 * dynamic by design. `server-only` above turns a mistake into a build error
 * rather than a runtime surprise.
 *
 * One pool per process. Next reloads modules in dev, so it is parked on
 * globalThis or every save would leak a pool until Postgres refuses connections.
 */
declare global {
  // eslint-disable-next-line no-var
  var __rtiPool: Pool | undefined
}

function pool(): Pool {
  if (!globalThis.__rtiPool) {
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
      throw new Error(
        'DATABASE_URL is not set. Copy .env.example to .env.local and run `npm run db:setup`.',
      )
    }
    globalThis.__rtiPool = new Pool({
      connectionString,
      max: 8,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    })
  }
  return globalThis.__rtiPool
}

/** A parameterised query. Never build SQL by concatenating user input. */
export async function q<T extends QueryResultRow>(text: string, params: unknown[] = []): Promise<T[]> {
  const res = await pool().query<T>(text, params)
  return res.rows
}

/** The first row, or null. */
export async function one<T extends QueryResultRow>(text: string, params: unknown[] = []): Promise<T | null> {
  const rows = await q<T>(text, params)
  return rows[0] ?? null
}

/** Runs the callback inside a transaction, rolling back on any throw. */
export async function tx<T>(fn: (run: typeof q) => Promise<T>): Promise<T> {
  const client = await pool().connect()
  try {
    await client.query('BEGIN')
    const run = (async <R extends QueryResultRow>(text: string, params: unknown[] = []) =>
      (await client.query<R>(text, params)).rows) as typeof q
    const out = await fn(run)
    await client.query('COMMIT')
    return out
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}
