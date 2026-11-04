import { Fragment, type ReactNode } from 'react'
import Link from 'next/link'
import { outboundRel } from '@/lib/urls'

/**
 * Links inside a paragraph of copy, written `[words](/path/)` — the same
 * convention the FAQ answers already use (src/components/client/Accordion.tsx).
 * Added 5 Nov 2026 for the industry pages' internal linking (Aaqib: "there is
 * no internal linking … do relevant internal linking for my industries pages").
 *
 * A site path becomes a Next <Link>; an https link a plain anchor with the
 * site's outbound rel. Text without the pattern comes back unchanged, so every
 * other page that shares a template renders exactly as before. The link text
 * is the paragraph's own words, so a measured section height does not move.
 */
export function inlineLinks(text: string): ReactNode {
  const parts: ReactNode[] = []
  const re = /\[([^\]]+)\]\((\/[^)\s]*|https:\/\/[^)\s]+)\)/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    const [, label, href] = m
    const cls = 'font-medium text-brand underline underline-offset-2 hover:text-heading'
    parts.push(href!.startsWith('/')
      ? <Link key={m.index} href={href!} className={cls}>{label}</Link>
      : <a key={m.index} href={href!} rel={outboundRel(href!)} className={cls}>{label}</a>)
    last = m.index + m[0].length
  }
  if (!parts.length) return text
  if (last < text.length) parts.push(text.slice(last))
  return parts.map((p, i) => <Fragment key={i}>{p}</Fragment>)
}
