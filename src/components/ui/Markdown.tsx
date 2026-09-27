import { Fragment, type ReactNode } from 'react'
import { useMDXComponents } from '@/../mdx-components'

/**
 * Markdown for the content pages edited in Admin -> Pages (the legal pages
 * and /thank-you/, see src/content/mdx-docs.ts), drawn with the SAME
 * components the MDX files use (mdx-components.tsx), so an edited page looks
 * exactly like the file it came from.
 *
 * Deliberately small: it covers what those pages use and nothing that could
 * surprise an editor. Blocks: ## and ### headings, paragraphs, "- " and
 * "1. " lists. Inline: **bold**, *italic*, [text](link), a backslash at the
 * end of a line for a line break. No HTML: anything that looks like a tag is
 * shown as text. Links must be site paths, https, mailto or tel.
 */
type Map = ReturnType<typeof useMDXComponents>

export function Markdown({ source }: { source: string }) {
  // The MDX files' own components (a plain function, despite the name).
  const c = useMDXComponents({})
  const blocks = source.split(/\n[ \t]*\n/).map((b) => b.replace(/^\n+|\s+$/g, '')).filter(Boolean).map(parse)
  /* List blocks one after another, with blank lines between, are ONE list
     whose items are "loose" (each item a paragraph), as in CommonMark. */
  const merged: Block[] = []
  for (const b of blocks) {
    const prev = merged[merged.length - 1]
    if (b.type === 'list' && prev?.type === 'list' && prev.kind === b.kind) { prev.items.push(...b.items); prev.loose = true }
    else merged.push(b.type === 'list' ? { ...b, items: [...b.items] } : b)
  }
  const out: ReactNode[] = []
  merged.forEach((b, i) => {
    if (i > 0) out.push('\n')
    out.push(<Fragment key={i}>{render(b, c)}</Fragment>)
  })
  return <>{out}</>
}

type Block =
  | { type: 'heading'; level: number; text: string }
  | { type: 'list'; kind: 'ul' | 'ol'; items: string[]; loose: boolean }
  | { type: 'p'; text: string }

const BULLET = /^[ \t]{0,3}[-*+][ \t]+/, NUMBERED = /^[ \t]{0,3}\d+[.)][ \t]+/

function parse(b: string): Block {
  const heading = b.match(/^(#{2,4})[ \t]+(.+)$/)
  if (heading && !b.includes('\n')) return { type: 'heading', level: heading[1]!.length, text: heading[2]!.replace(/[ \t]+#*$/, '') }
  const lines = b.split('\n')
  const kind = BULLET.test(lines[0]!) ? 'ul' : NUMBERED.test(lines[0]!) ? 'ol' : null
  if (kind) {
    const marker = kind === 'ul' ? BULLET : NUMBERED
    const items: string[] = []
    for (const line of lines) {
      if (marker.test(line)) items.push(line.replace(marker, ''))
      else if (items.length) items[items.length - 1] += `\n${line.trim()}`
    }
    return { type: 'list', kind, items, loose: false }
  }
  return { type: 'p', text: lines.map((l) => l.trim()).join('\n') }
}

function render(b: Block, c: Map): ReactNode {
  const P = (c.p ?? 'p') as React.ElementType
  if (b.type === 'heading') {
    const Tag = ((b.level === 2 ? c.h2 : b.level === 3 ? c.h3 : c.h4) ?? `h${b.level}`) as React.ElementType
    return <Tag>{inline(b.text, c)}</Tag>
  }
  if (b.type === 'list') {
    const List = (c[b.kind] ?? b.kind) as React.ElementType, Li = (c.li ?? 'li') as React.ElementType
    const kids: ReactNode[] = ['\n']
    b.items.forEach((t, i) => {
      kids.push(b.loose ? <Li key={i}>{'\n'}<P>{inline(t, c)}</P>{'\n'}</Li> : <Li key={i}>{inline(t, c)}</Li>, '\n')
    })
    return <List>{kids}</List>
  }
  return <P>{inline(b.text, c)}</P>
}

const SAFE_HREF = /^(\/(?!\/)|#|https?:\/\/|mailto:|tel:)/i

/** Bold, italic, links and line breaks, in one pass, nesting allowed. */
function inline(text: string, c: Map): ReactNode[] {
  const Strong = (c.strong ?? 'strong') as React.ElementType, Em = (c.em ?? 'em') as React.ElementType
  const A = (c.a ?? 'a') as React.ElementType
  const out: ReactNode[] = []
  let buf = ''
  let k = 0
  const flush = () => { if (buf) { out.push(buf); buf = '' } }
  for (let i = 0; i < text.length;) {
    const rest = text.slice(i)
    // A backslash before a line break is a line break; before punctuation, the character itself.
    if (rest.startsWith('\\\n')) { flush(); out.push(<br key={k++} />, '\n'); i += 2; continue }
    if (/^\\[\\`*_{}[\]()#+\-.!|<>~]/.test(rest)) { buf += rest[1]; i += 2; continue }
    const strong = rest.match(/^\*\*(?=\S)([\s\S]*?\S)\*\*/) ?? rest.match(/^__(?=\S)([\s\S]*?\S)__/)
    if (strong) { flush(); out.push(<Strong key={k++}>{inline(strong[1]!, c)}</Strong>); i += strong[0].length; continue }
    // _underscores_ only at a word boundary, so snake_case stays as typed.
    const em = rest.match(/^\*(?=[^\s*])([\s\S]*?[^\s*])\*(?!\*)/)
      ?? (/[A-Za-z0-9]/.test(text[i - 1] ?? '') ? null : rest.match(/^_(?=\S)([\s\S]*?\S)_(?![A-Za-z0-9])/))
    if (em) { flush(); out.push(<Em key={k++}>{inline(em[1]!, c)}</Em>); i += em[0].length; continue }
    const link = rest.match(/^\[([^\]]+)\]\(([^()\s]+)\)/)
    if (link) {
      flush()
      if (SAFE_HREF.test(link[2]!)) out.push(<A key={k++} href={link[2]}>{inline(link[1]!, c)}</A>)
      else out.push(...inline(link[1]!, c))
      i += link[0].length; continue
    }
    buf += text[i]; i++
  }
  flush()
  return out
}
