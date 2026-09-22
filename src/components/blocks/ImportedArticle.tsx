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
      {/*
        PHONE CONTAINMENT — added 22 Sep 2026, and deliberately all CSS.
        Rewriting the markup would break the one promise this component makes
        (the body a crawler sees is byte-identical to WordPress's), so the phone
        is answered entirely from the wrapper.

        `.wp-content`'s own rules sit OUTSIDE any cascade layer in globals.css,
        so an unlayered declaration beats every Tailwind utility whatever its
        specificity — which is why the two type rules carry `!`. globals.css is
        another agent's file; move these into it when both passes have landed.

        What each rule is for, checked against the 302 imported bodies:
         - 16/26 is 6638:8714's body setting; the board keeps 16.5/1.78.
         - h2 at 30px is two words a line in a 350px column, so 22/1.3
           (6638:8788 measures a 29px line box), and h3 follows it down.
         - six posts carry hand-built comparison tables. globals.css scrolls a
           table that is a DIRECT child of .wp-content; Gutenberg just as often
           wraps one in a <figure class="wp-block-table">, so the scroller is
           widened to any descendant table here.
         - `max-w-full` on anything carrying an inline width, because a legacy
           `width:700px` on a panel or an image is the other way these bodies
           escape a 390px viewport.
         - bare URLs in link text are long enough in this archive to push the
           page out on their own; `break-words` wraps them instead.
      */}
      <div
        className="wp-content max-lg:text-[16px]! max-lg:leading-[26px]! max-lg:[&_[style*=width]]:max-w-full max-lg:[&_a]:break-words max-lg:[&_h2]:text-[22px]! max-lg:[&_h2]:leading-[1.3]! max-lg:[&_h3]:text-[19px]! max-lg:[&_pre]:overflow-x-auto max-lg:[&_table]:block max-lg:[&_table]:overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </ArticleTemplate>
  )
}
