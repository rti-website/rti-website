/**
 * The one slug rule, in its own file so both sides can have it.
 *
 * It lives here rather than in post-content.ts because that module imports the
 * Tiptap static renderer, and the admin's Address field needs to show a live
 * preview of what the server will do — not drag a document renderer into the
 * browser bundle to find out. post-content.ts re-exports this, so existing
 * imports are unaffected and there is still only one implementation.
 */
export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 80)
}
