import type { ContentEntry } from '@/lib/content'

/**
 * Service template.
 *
 * Rules for every template in this folder:
 *  - The H1 comes from entry.h1, ported verbatim from url-map.csv. Never
 *    hardcode or rewrite it — the staging crawl diffs H1s against baseline.
 *  - No 'use client'. Templates are server components. Interactive widgets live
 *    in src/components/client/ and are imported as islands.
 *  - Internal links use href() from lib/urls, never a raw string.
 */
export function ServiceTemplate({
  entry,
  children,
}: {
  entry: ContentEntry
  children: React.ReactNode
}) {
  return (
    <main>
      <h1>{entry.h1}</h1>
      <article>{children}</article>
    </main>
  )
}
