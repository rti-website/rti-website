import { revalidatePath } from 'next/cache'

/**
 * Put a saved post's changes on the live site straight away (15 Oct 2026).
 *
 * Posts are prerendered at build time. Before this, only Publish and Delete
 * told Next.js a post had changed, so a meta title or description saved in the
 * SEO desk (or the post editor) sat in the database while the live page kept
 * serving the copy from the last build, until the next deploy. Aaqib: "meta
 * descriptions are not merging instantly in live".
 *
 * Marks the post's page (old and new address after a slug change), the blog
 * index and the sitemap stale, then requests the page once so the fresh copy
 * is rendered for us rather than for the first visitor or Google. A failed warm
 * request is not an error: the page is correct, just rendered on first visit.
 */
export function refreshPost(req: Request, slugs: (string | null | undefined)[]): void {
  const paths = [...new Set(slugs.filter((s): s is string => Boolean(s)).map((s) => `/${s}/`))]
  for (const p of paths) revalidatePath(p)
  revalidatePath('/blog')
  revalidatePath('/sitemap.xml')
  const origin = new URL(req.url).origin
  const last = paths.at(-1)
  if (last) void fetch(origin + last, { cache: 'no-store' }).catch(() => {})
}
