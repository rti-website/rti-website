/**
 * Page copy overrides for Admin -> Pages (27 Sep 2026). Plain TypeScript, no
 * server or browser APIs, so the editor and the server share it.
 *
 * THE MODEL. Every editable document has DEFAULTS: the objects in
 * src/data/*.ts, as the developers wrote them. What an editor changes is kept
 * as a PATCH, a map of path -> value:
 *
 *   { "HERO.h1": "New heading", "FAQS.2.a": "New answer" }
 *
 * A path is dot separated; a number is an index into a list. When a list
 * changes length or order the whole list is stored at its own path
 * ("FAQS": [...]), since index paths would no longer line up.
 *
 * Why a patch and not a full copy: a field no one has edited keeps following
 * the code. A developer fixing a typo in src/data still reaches the site,
 * unless that exact field was edited in the admin.
 *
 * WHAT IS EDITABLE is decided here too (`isHiddenKey`, `fieldKind`): strings
 * and lists of them are; numbers, booleans, layout switches, Figma ids, SEO
 * and ids are not. Titles and meta descriptions stay in the SEO desk.
 */

export type Patch = Record<string, unknown>
type Obj = Record<string, unknown>

/** Longest string a field takes. The longest paragraph on the site is ~1,400. */
export const MAX_TEXT = 5000
/** Most items a list takes. The longest list on the site (FAQ groups) is ~40. */
export const MAX_ITEMS = 100

/**
 * Keys that are configuration, not copy: which layout a section uses, Figma
 * node ids, slugs, icons drawn as glyph names, SEO (edited in the SEO desk),
 * notes for the team. Never shown in the editor, never changed by a patch
 * (except as part of a whole list, where they travel with their item).
 */
const HIDDEN_KEYS = new Set([
  'layout', 'id', 'ids', 'glyph', 'figma', 'slug', 'tone', 'fit', 'kind', 'operator', 'pickup',
  'focusKeyword', 'seoTitle', 'seoDescription', 'mark', 'overlay', 'liveSeo', 'proposedSeo', 'seo',
  'schema', 'url', 'todo', 'key', 'variant', 'arrows', 'wide', 'external', 'noPicker', 'align',
  'tel', 'mapQuery', 'embed', 'lat', 'lng', 'zip', 'state', 'color', 'accent', 'size', 'position',
  'object', 'objectPosition', 'crop', 'group', 'category', 'type', 'date', 'updated',
  'service', 'areaServed', 'stars', 'order', 'sort', 'bands', 'phoneSkip', 'phoneStack', 'compact',
  'board', 'phoneFrame', 'node', 'nodes', 'width', 'height', 'w', 'h', 'top', 'left', 'className',
])

/**
 * Keys hidden only when they hold a plain value (`state: 'MN'`, `service:
 * 'Battery Recycling'`), because they are used to match things; the same
 * key holding a group of words (the contact form's `state: { label, … }`)
 * is copy and shows.
 */
const VALUE_ONLY = new Set(['state', 'zip', 'service', 'type', 'group', 'category', 'kind', 'size', 'position', 'color'])

export function isHiddenKey(key: string, value?: unknown): boolean {
  if (VALUE_ONLY.has(key) && value !== null && typeof value === 'object') return false
  return HIDDEN_KEYS.has(key) || /(^|_)(SEO|TODO)/i.test(key) || /^todo/i.test(key)
}

export type FieldKind = 'text' | 'long' | 'image' | 'link'

const IMAGE_RE = /\.(png|jpe?g|webp|gif|svg|avif)(\?.*)?$/i
const LONG_KEYS = /^(body|text|a|answer|lead|intro|description|desc|note|notes|outro|quote|summary|excerpt|paragraph|copy|detail|details|footnote|blurb)$/i

/** How the editor draws a string field. */
export function fieldKind(key: string, value: string): FieldKind {
  if (IMAGE_RE.test(value) || /^(image|photo|src|logo|icon|picture|thumbnail|avatar|poster)$/i.test(key)) return 'image'
  if (/^(href|link|to)$/i.test(key) || (/^(\/|https?:\/\/|mailto:|#)/.test(value) && !/\s/.test(value))) return 'link'
  return LONG_KEYS.test(key) || value.length > 90 ? 'long' : 'text'
}

/* ------------------------------------------------------------------ paths -- */

export function splitPath(path: string): string[] {
  return path === '' ? [] : path.split('.')
}

export function getAt(root: unknown, path: string): unknown {
  let cur: unknown = root
  for (const seg of splitPath(path)) {
    if (cur === null || typeof cur !== 'object') return undefined
    cur = (cur as Obj)[seg]
  }
  return cur
}

/** "FAQS.2.a" -> "FAQS.*.a": the shape of a path, for the rendered-fields list. */
export function shapeOf(path: string): string {
  return splitPath(path).map((s) => (/^\d+$/.test(s) ? '*' : s)).join('.')
}

const isObj = (v: unknown): v is Obj => v !== null && typeof v === 'object' && !Array.isArray(v)
const clone = <T>(v: T): T => (v === undefined ? v : JSON.parse(JSON.stringify(v)))

/* ------------------------------------------------------------------ clean -- */

/**
 * Makes `value` the same shape as `template`, or returns undefined when it
 * cannot be. Strings are trimmed to MAX_TEXT, lists to MAX_ITEMS; a list's
 * items are shaped by the template's first item (so a new FAQ comes back as
 * {q, a} whatever the browser sent). Keys the template does not have are
 * dropped; keys it has that the value lacks are taken from the template, so
 * a new item carries the same icons and switches as its neighbours.
 */
export function cleanLike(template: unknown, value: unknown): unknown {
  if (typeof template === 'string') return typeof value === 'string' ? value.slice(0, MAX_TEXT) : undefined
  if (typeof template === 'number') return typeof value === 'number' && Number.isFinite(value) ? value : undefined
  if (typeof template === 'boolean') return typeof value === 'boolean' ? value : undefined
  if (template === null) return value === null ? null : undefined
  if (Array.isArray(template)) {
    if (!Array.isArray(value)) return undefined
    const item = template[0]
    if (item === undefined) return value.filter((v) => typeof v === 'string').slice(0, MAX_ITEMS)
    const out: unknown[] = []
    for (const v of value.slice(0, MAX_ITEMS)) {
      const c = cleanLike(item, v)
      if (c !== undefined) out.push(c)
    }
    return out
  }
  if (isObj(template)) {
    if (!isObj(value)) return undefined
    const out: Obj = {}
    for (const [k, t] of Object.entries(template)) {
      if (!(k in value)) { out[k] = clone(t); continue }
      const c = cleanLike(t, value[k])
      out[k] = c === undefined ? clone(t) : c
    }
    // Optional keys a sibling item has but the first item does not (a
    // `more` link on one card only): keep them when they are plain copy.
    for (const [k, v] of Object.entries(value)) {
      if (k in out) continue
      if (typeof v === 'string') out[k] = v.slice(0, MAX_TEXT)
      else if (isObj(v) && Object.keys(v).length > 0 && Object.values(v).every((x) => typeof x === 'string')) out[k] = Object.fromEntries(Object.entries(v).map(([a, b]) => [a, (b as string).slice(0, MAX_TEXT)]))
    }
    return out
  }
  return undefined
}

/* ------------------------------------------------------------------ apply -- */

/**
 * The defaults with a patch laid over them. Returns a new object; the
 * defaults are never mutated (they are module level constants). A path whose
 * parent no longer exists, or whose value no longer fits the default's
 * shape (the code changed since the edit), is skipped rather than breaking
 * the page.
 */
export function applyPatch<T>(defaults: T, patch: Patch | null | undefined): T {
  if (!patch || Object.keys(patch).length === 0) return defaults
  const out = clone(defaults) as unknown
  // Shallow paths first, so a whole list is in place before any later path
  // points into it (a patch from diffPatch never holds both, but an older
  // row might).
  const paths = Object.keys(patch).sort((a, b) => splitPath(a).length - splitPath(b).length)
  for (const path of paths) {
    const segs = splitPath(path)
    if (!segs.length) continue
    const parent = getAt(out, segs.slice(0, -1).join('.'))
    const last = segs[segs.length - 1]!
    if (parent === null || typeof parent !== 'object') continue
    const current = (parent as Obj)[last]
    if (current === undefined) {
      // A key the defaults lack (an optional link someone added to a card).
      if (typeof patch[path] === 'string') (parent as Obj)[last] = (patch[path] as string).slice(0, MAX_TEXT)
      continue
    }
    const template = Array.isArray(current) && current.length === 0
      ? getTemplate(defaults, path) ?? current
      : current
    const c = cleanLike(template, patch[path])
    if (c !== undefined) (parent as Obj)[last] = c
  }
  return out as T
}

/** The first item of the default list at `path`, wrapped as a template list. */
function getTemplate(defaults: unknown, path: string): unknown {
  const d = getAt(defaults, path)
  return Array.isArray(d) && d.length ? d : undefined
}

/* ------------------------------------------------------------------- diff -- */

/**
 * What changed between the defaults and an edited copy, as a patch. Lists of
 * the same length are compared item by item; a list that grew, shrank or was
 * reordered is stored whole. Only paths the editor may change are kept.
 */
export function diffPatch(defaults: unknown, edited: unknown): Patch {
  const out: Patch = {}
  walk(defaults, edited, '')
  return out

  function walk(d: unknown, e: unknown, path: string) {
    if (Array.isArray(d)) {
      if (!Array.isArray(e)) return
      if (d.length !== e.length || reordered(d, e)) {
        const c = cleanLike(d.length ? d : e, e)
        if (c !== undefined && JSON.stringify(c) !== JSON.stringify(d)) out[path] = c
        return
      }
      d.forEach((item, i) => walk(item, e[i], join(path, String(i))))
      return
    }
    if (isObj(d)) {
      if (!isObj(e)) return
      for (const k of Object.keys(d)) {
        if (isHiddenKey(k, d[k])) continue
        walk(d[k], e[k], join(path, k))
      }
      // A plain copy key added to an object that did not have it.
      for (const k of Object.keys(e)) {
        if (k in d || isHiddenKey(k, e[k]) || typeof e[k] !== 'string' || e[k] === '') continue
        out[join(path, k)] = (e[k] as string).slice(0, MAX_TEXT)
      }
      return
    }
    if (typeof d === 'string') {
      if (typeof e === 'string' && e !== d) out[path] = e.slice(0, MAX_TEXT)
    }
    // Numbers and booleans are configuration: not diffed.
  }
}

/**
 * True when a same-length list was reordered (or items swapped for others):
 * then it is stored whole. Compared on the items' hidden keys where they have
 * any (an id, an icon), since those never change inside an item.
 */
function reordered(d: unknown[], e: unknown[]): boolean {
  const sig = (v: unknown) => (isObj(v)
    ? JSON.stringify(Object.entries(v).filter(([k, x]) => isHiddenKey(k, x)))
    : '')
  const a = d.map(sig)
  if (a.every((s) => s === a[0])) return false
  return a.some((s, i) => s !== sig(e[i]))
}

const join = (a: string, b: string) => (a ? `${a}.${b}` : b)

/* ----------------------------------------------------------------- fields -- */

export type Field = { path: string; key: string; kind: FieldKind }

/** Every editable string in a document, in order. For the coverage check. */
export function editableFields(data: unknown): Field[] {
  const out: Field[] = []
  walk(data, '', '')
  return out

  function walk(v: unknown, path: string, key: string) {
    if (typeof v === 'string') { out.push({ path, key, kind: fieldKind(key, v) }); return }
    if (Array.isArray(v)) { v.forEach((x, i) => walk(x, join(path, String(i)), key)); return }
    if (isObj(v)) for (const [k, x] of Object.entries(v)) if (!isHiddenKey(k, x)) walk(x, join(path, k), k)
  }
}

/** "whyCards" -> "Why cards", "FAQ_INTRO" -> "Faq intro", "3" -> "Item 4". */
export function humanize(key: string): string {
  if (/^\d+$/.test(key)) return `Item ${Number(key) + 1}`
  const LABELS: Record<string, string> = {
    h1: 'H1 heading', h2: 'Heading', q: 'Question', a: 'Answer', href: 'Link', cta: 'Button',
    tel: 'Phone link', img: 'Image', alt: 'Image description (alt text)', eyebrow: 'Small label above the heading',
    lead: 'Lead paragraph', body: 'Paragraphs', crumbs: 'Breadcrumb', crumb: 'Breadcrumb label',
  }
  if (LABELS[key]) return LABELS[key]
  const words = key.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase().trim()
  return words.charAt(0).toUpperCase() + words.slice(1)
}
