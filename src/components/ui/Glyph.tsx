/**
 * The small marks that sit on a teal disc next to a line of detail —
 * Figma draws them at 16px white inside a 32px circle, on /contact-us/
 * (6370:764) and on /about-us.../ (6372:931 and friends).
 *
 * They are drawn inline rather than exported as assets: each is one or two
 * trivial paths, and figma.com is unreachable from the build sandbox, so every
 * exported asset costs a manual fetch step on someone's machine. Node ids are
 * recorded above each path if anyone wants to swap in the byte-exact artwork.
 */
export const GLYPHS = {
  pin:   'M8 1.5a4.6 4.6 0 0 0-4.6 4.6c0 3.3 4.1 8 4.3 8.2a.4.4 0 0 0 .6 0c.2-.2 4.3-4.9 4.3-8.2A4.6 4.6 0 0 0 8 1.5Zm0 6.5a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8Z',
  phone: 'M5.2 2.2c.3 0 .6.2.7.5l.9 2.1c.1.3 0 .7-.3.9l-1 .7a7.7 7.7 0 0 0 3.3 3.3l.7-1c.2-.3.6-.4.9-.3l2.1.9c.3.1.5.4.5.7v2.1c0 .5-.4.9-.9.9A11.3 11.3 0 0 1 2.3 3.1c0-.5.4-.9.9-.9h2Z',
  mail:  'M2 4.2c0-.6.5-1.1 1.1-1.1h9.8c.6 0 1.1.5 1.1 1.1v7.6c0 .6-.5 1.1-1.1 1.1H3.1c-.6 0-1.1-.5-1.1-1.1V4.2Zm1.6.5L8 8l4.4-3.3H3.6Zm8.8 1.4L8.4 9.2a.7.7 0 0 1-.8 0L3.6 6.1v5.3h8.8V6.1Z',
  /** Certification seal — Figma 6372:939, on the facility cards. */
  badge: 'M8 1.2a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 1.6a3.1 3.1 0 1 1 0 6.2 3.1 3.1 0 0 1 0-6.2Zm-2.8 8.5L3.9 15 8 13.4 12.1 15l-1.3-3.7a6.2 6.2 0 0 1-5.6 0Z',
} as const

/**
 * One detail row: teal disc, glyph, text. `href` makes the whole row a link,
 * which is how the phone and email rows on /contact-us/ work.
 */
export function InfoRow({
  glyph, text, href,
}: {
  glyph: keyof typeof GLYPHS
  text: string
  href?: string
}) {
  const body = (
    <>
      {/* grad-card__disc does nothing on its own — it only bites inside a card
          carrying `grad-card`, where it inverts to a white plate so the mark
          survives the gradient. See globals.css. */}
      <span className="grad-card__disc grid size-[32px] shrink-0 place-items-center rounded-full bg-brand transition-colors">
        <svg viewBox="0 0 16 16" className="size-[16px] fill-white" aria-hidden="true"><path d={GLYPHS[glyph]} /></svg>
      </span>
      <span className="font-poppins text-[14.5px] leading-[22px] text-muted">{text}</span>
    </>
  )
  return href
    ? <a href={href} className="flex items-center gap-[14px] transition-colors hover:[&>span:last-child]:text-brand">{body}</a>
    : <div className="flex items-center gap-[14px]">{body}</div>
}
