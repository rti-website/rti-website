import { ArticleTemplate } from '@/components/blocks/ArticleTemplate'
import type { ContentEntry } from '@/lib/content'
import type { DbPost } from '@/lib/posts-db'

/**
 * A post that lives in the database rather than in an MDX file.
 *
 * It reuses ArticleTemplate verbatim — same hero, same breadcrumb, same sidebar,
 * same related-articles band — so a migrated post and a hand-built one are the
 * same page. Only the body differs, and only in where it came from.
 *
 * !! WHY dangerouslySetInnerHTML IS THE RIGHT ANSWER HERE, AND ONLY HERE.
 *
 * For a post with source='wordpress' this string is the ORIGINAL WordPress
 * markup, untouched. That is the entire point: the page Google crawls after the
 * switch is byte-identical in its body to the one it crawled before, so nothing
 * that ranks has to be re-earned. Running it through a converter first would
 * silently drop the inline-styled CTA panels, the hand-built comparison tables
 * and the <script type="application/ld+json"> Article and FAQPage schema that
 * several of these posts carry.
 *
 * The safety argument is not "it is probably fine" — it is that this string has
 * exactly two origins, both of them ours: markup exported from the company's own
 * WordPress by scripts/wp-import.mjs, or markup this application generated
 * itself from Tiptap JSON through a fixed schema. Nothing a visitor can
 * influence reaches it, and neither does anything a logged-out person can post.
 * If that ever stops being true — comments, user submissions, a second importer
 * pointed somewhere else — this needs a sanitiser in front of it, and the
 * comment above the call is where to say so.
 */
export function ImportedArticle({ post }: { post: DbPost }) {
  // ContentEntry is ContentMeta plus the two file fields, which a database post
  // does not have. They are only used to import the MDX body, which this page
  // does not do.
  const entry = { ...post, file: '', rel: '' } as ContentEntry

  return (
    <ArticleTemplate entry={entry}>
      <div className="wp-content" dangerouslySetInnerHTML={{ __html: post.html }} />
    </ArticleTemplate>
  )
}
