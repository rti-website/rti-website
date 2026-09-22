import 'server-only'
import { q } from '@/lib/db'

/**
 * The footer's social links.
 *
 * ===========================================================================
 * WHY THIS FILE EXISTS — Asim, 22 Sep 2026: "i add the facebook link on admin
 * side setting but it is not working"
 * ===========================================================================
 * It wasn't working because nothing read it. The admin has saved to the
 * `social_links` table since db/001_init.sql, and the settings API comment even
 * calls it "the social links the footer reads" — but Footer.tsx carried a
 * hardcoded array with `href: '#'` on every row. Saving in the admin wrote a
 * row that no page ever looked at.
 *
 * Now the footer reads this. The DB wins where a row has a URL; DEFAULTS fill
 * the gaps, so the links work on a clone with no database (CI, a fresh
 * checkout) and the admin can still override any of them without a deploy.
 *
 * !! A ROW WITH AN EMPTY URL HIDES ITS ICON. That is the schema's own rule —
 * "Empty url = the icon is hidden on the site rather than linking nowhere" —
 * and it is how someone removes a platform from the footer. Note the
 * difference from a MISSING row, which falls back to the default below.
 *
 * Read at BUILD time, like posts-db.ts. See the rule-2 note there: this is
 * build-time data fetching, not request-time, so `dynamic = 'error'` is happy
 * and the footer still prerenders into static HTML.
 */

export type SocialLink = {
  platform: string
  label: string
  url: string
  /** Inline brand glyph, drawn at 22x22. */
  path: string
}

/**
 * Real accounts, supplied by Asim 22 Sep 2026. These are the fallback AND the
 * glyph source — the table stores a platform key and a URL, not artwork.
 *
 * LinkedIn replaced Twitter/X here: the Figma footer drew a bird, but RTI has
 * no Twitter account and does have a company LinkedIn page, so an icon that
 * went nowhere became one that goes somewhere.
 */
const DEFAULTS: SocialLink[] = [
  {
    platform: 'facebook',
    label: 'Facebook',
    url: 'https://www.facebook.com/people/Recycle-Technologies-Inc/100092032864881/',
    path: 'M14 8.5h-2V7c0-.6.2-1 1-1h1V3.6C13.6 3.5 13 3.5 12.3 3.5c-2 0-3.3 1.2-3.3 3.4v1.6H7V11h2v7h3v-7h2l.4-2.5Z',
  },
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/company/recycle-technologies/',
    path: 'M5.4 7.5H2.8V18h2.6V7.5ZM4.1 3.2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM19.2 18h-2.6v-5.1c0-1.2-.4-2-1.5-2-.8 0-1.3.6-1.5 1.1-.1.2-.1.5-.1.8V18h-2.6s0-8.5 0-9.4V7.5h2.6v1.1c.3-.5 1-1.3 2.5-1.3 1.8 0 3.2 1.2 3.2 3.8V18Z',
  },
  {
    platform: 'youtube',
    label: 'YouTube',
    url: 'https://www.youtube.com/channel/UCjhjl8fXa1Ju8XycO2hbjvw',
    path: 'M19 8.2a2 2 0 0 0-1.4-1.4C16.4 6.5 11 6.5 11 6.5s-5.4 0-6.6.3A2 2 0 0 0 3 8.2 21 21 0 0 0 2.7 12 21 21 0 0 0 3 15.8a2 2 0 0 0 1.4 1.4c1.2.3 6.6.3 6.6.3s5.4 0 6.6-.3a2 2 0 0 0 1.4-1.4c.2-1.3.3-2.5.3-3.8 0-1.3-.1-2.5-.3-3.8ZM9.3 14.4V9.6l4.5 2.4-4.5 2.4Z',
  },
]

/**
 * Cached for the life of the process — but ONLY in a production build.
 *
 * A build renders hundreds of pages and every one has this footer, so without
 * a cache that is hundreds of identical queries. In `next dev` the same cache
 * is a trap: the server component re-renders per request, but this module
 * stays loaded, so the first value read is the value you keep seeing. Edit a
 * link in the admin, refresh, and the footer still shows the old one until you
 * restart the dev server — which is exactly what it looked like when the
 * YouTube URL "would not change" locally on 22 Sep 2026.
 */
let cache: SocialLink[] | null = null
const CACHE = process.env.NODE_ENV === 'production'

export async function socialLinks(): Promise<SocialLink[]> {
  if (CACHE && cache) return cache

  let rows: { platform: string; url: string }[] = []
  try {
    rows = await q<{ platform: string; url: string }>(
      'SELECT platform, url FROM social_links ORDER BY sort_order',
    )
  } catch {
    // No database, or the table predates this feature. Defaults are correct
    // links, so a clone with no DB still ships a working footer.
    rows = []
  }

  const saved = new Map(rows.map((r) => [r.platform.trim().toLowerCase(), (r.url ?? '').trim()]))

  const resolved = DEFAULTS
    .map((d) => (saved.has(d.platform) ? { ...d, url: saved.get(d.platform) ?? '' } : d))
    // An explicit empty URL hides the icon; see the note above.
    .filter((d) => d.url !== '')

  if (CACHE) cache = resolved
  return resolved
}
