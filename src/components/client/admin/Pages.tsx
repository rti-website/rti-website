'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Dialog, ConfirmDialog } from './Dialog'
import { MediaLibrary } from './MediaLibrary'
import { SplitGrip, useSplit } from './Split'
import { getJSON, sendJSON } from './api'
import { ICON_CHOICES, fieldKind, getAt, humanize, isHiddenKey, shapeOf, type FieldKind } from '@/lib/content-patch'

/**
 * Admin -> Pages (Asim, 27 Sep 2026: "make pages here from where we can access
 * all our pages ... edit it from admin side and also add the button preview
 * so admin can see his change in preview and from here admin can change text,
 * images, everything in pages").
 *
 * Two screens: the list of every editable document (src/content/registry.ts),
 * and the editor for one of them: a form built from the document's own shape
 * on the left, the real page on the right in a frame, showing the saved draft.
 *
 * Draft -> Preview -> Publish (Asim's choice): Save draft keeps the change
 * where only editors see it; the preview frame shows it on the real page
 * (Next draft mode, see /api/admin/pages/preview/); Publish puts it live and
 * keeps the previous version in History. Administrators and editors.
 *
 * The form is generic on purpose: it walks the document's data, so a new
 * section added to a page in code shows up here with no admin work. What is
 * hidden (layout switches, ids, Figma nodes, SEO) is decided in
 * src/lib/content-patch.ts, shared with the server so the two cannot disagree.
 *
 * CLICK TO EDIT (1 Oct 2026, Asim: "when user click on the part of the page
 * on the right side it open the editable place in the left side"). A click
 * in the preview finds the field holding the words (or picture) clicked,
 * opens its section, scrolls to it and puts the cursor in it. Words that
 * live in a shared block (navbar, footer, location directory…) name that
 * block, with a button to open it. "Click to edit" off lets the preview be
 * used as a normal page again.
 *
 * TITLE AND DESCRIPTION (1 Oct 2026): every page's <title> and meta
 * description are the first section of its document (META), empty meaning
 * "the page's own". See src/lib/page-meta.ts.
 */

type DocSummary = {
  key: string; title: string; group: string; urls: string[]; note: string | null
  /** A page row that opens another document (the facility pages, 1 Oct 2026): that document's key. */
  docKey?: string
  /** 'elsewhere': a page whose words are edited on another admin screen. */
  status: 'original' | 'published' | 'draft' | 'elsewhere'
  draftUpdatedAt: string | null; draftBy: string | null; publishedAt: string | null; publishedBy: string | null
  /** Only on 'elsewhere' rows: which screen, the post id, live or not. */
  manage?: Manage; id?: number | null; live?: boolean; updatedAt?: string | null
}
/** The screens that edit the pages Pages lists but does not edit itself. */
export type Manage = 'posts' | 'cats' | 'locations' | 'code'
type Other = {
  key: string; title: string; group: string; url: string; note: string | null
  manage: Manage; id: number | null; live: boolean; updatedAt: string | null
}
const MANAGE: Record<Manage, { button: string; where: string }> = {
  posts: { button: 'Edit post', where: 'All Posts' },
  cats: { button: 'Open Categories', where: 'Categories' },
  locations: { button: 'Open Locations', where: 'Locations' },
  code: { button: '', where: 'the code' },
}
/** More rows than this in one section fold behind "Show all". */
const FOLD = 25
type Revision = { id: number; published_at: string; by: string | null; edits: number }
type DocState = {
  key: string; title: string; group: string; urls: string[]; note: string | null
  defaults: Json; current: Json; live: Json
  hasDraft: boolean; editsLive: number; editsDraft: number | null
  draftUpdatedAt: string | null; draftBy: string | null; publishedAt: string | null; publishedBy: string | null
  rendered: string[] | null
  revisions: Revision[]
}
type Json = string | number | boolean | null | Json[] | { [k: string]: Json }

const when = (s: string | null) => (s ? new Date(s).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '')

export function Pages({ onToast, onFocusChange, onManage, readOnly = false }: {
  onToast: (m: string) => void; onFocusChange?: (on: boolean) => void
  /** Look, do not touch (the Ads manager, 28 Sep 2026). The server refuses the writes too. */
  readOnly?: boolean
  /** Opens the screen that edits a page Pages only lists (a post, a location…). */
  onManage?: (where: Manage, id: number | null) => void
}) {
  /** The document open in the editor, and the page its preview starts on. */
  const [open, setOpenState] = useState<{ key: string; url?: string } | null>(null)
  const setOpen = useCallback((key: string | null, url?: string) => setOpenState(key ? { key, url } : null), [])
  /* The editor gets the whole window (Asim, 27 Sep 2026: "hide the blue
     side bar so it has more space"): the admin rail and page header fold
     away, as in the post editor's full screen, and come back on the list. */
  useEffect(() => {
    onFocusChange?.(open !== null)
    return () => onFocusChange?.(false)
  }, [open, onFocusChange])
  if (open) return <main className="a-sheet a-pgsheet"><PageEditor key={`${open.key}${open.url ?? ''}`} docKey={open.key} initialUrl={open.url} onClose={() => setOpen(null)} onOpenDoc={(k) => setOpen(k)} onToast={onToast} readOnly={readOnly} /></main>
  return <main className="a-sheet"><PageList onOpen={setOpen} onManage={onManage} readOnly={readOnly} /></main>
}

/* ================================================================== list == */

type Sort = 'group' | 'name' | 'status' | 'recent' | 'oldest'
const SORTS: { k: Sort; label: string }[] = [
  { k: 'group', label: 'By section' },
  { k: 'recent', label: 'Last change, newest first' },
  { k: 'oldest', label: 'Last change, oldest first' },
  { k: 'name', label: 'Name, A to Z' },
  { k: 'status', label: 'Status (drafts first)' },
]
const STATUS_RANK: Record<DocSummary['status'], number> = { draft: 0, published: 1, original: 2, elsewhere: 3 }
/** When the page last changed: its draft if it has one, else its last publish. */
const changedAt = (d: DocSummary) => d.status === 'elsewhere' ? (d.updatedAt ?? null) : d.status === 'draft' ? d.draftUpdatedAt : d.publishedAt
const changedBy = (d: DocSummary) => d.status === 'elsewhere' ? null : d.status === 'draft' ? d.draftBy : d.publishedBy
const fromOther = (o: Other): DocSummary => ({
  key: o.key, title: o.title, group: o.group, urls: [o.url], note: o.note, status: 'elsewhere',
  draftUpdatedAt: null, draftBy: null, publishedAt: null, publishedBy: null,
  manage: o.manage, id: o.id, live: o.live, updatedAt: o.updatedAt,
})

function PageList({ onOpen, onManage, readOnly = false }: { onOpen: (key: string, url?: string) => void; onManage?: (where: Manage, id: number | null) => void; readOnly?: boolean }) {
  const [docs, setDocs] = useState<DocSummary[] | null>(null)
  const [migrated, setMigrated] = useState(true)
  const [error, setError] = useState('')
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<'all' | DocSummary['status']>('all')
  const [group, setGroup] = useState('all')
  const [who, setWho] = useState('all')
  const [sort, setSort] = useState<Sort>('group')
  const [unfolded, setUnfolded] = useState<Set<string>>(new Set())

  const load = useCallback(async () => {
    setError('')
    const r = await getJSON<{ docs: DocSummary[]; others?: Other[]; migrated: boolean }>('/pages')
    if (!r.ok) { setError(r.error); return }
    setDocs([...r.data.docs, ...(r.data.others ?? []).map(fromOther)]); setMigrated(r.data.migrated)
  }, [])
  /** A row's own action: the editor for a document, the right screen for the rest. */
  const act = (d: DocSummary) => {
    if (d.status !== 'elsewhere') onOpen(d.docKey ?? d.key, d.docKey ? d.urls[0] : undefined)
    else if (d.manage && d.manage !== 'code') onManage?.(d.manage, d.id ?? null)
  }
  useEffect(() => { void load() }, [load])

  if (error) return <div className="a-err" style={{ display: 'flex', gap: 12, alignItems: 'center' }}><span style={{ flex: 1 }}>{error}</span><button className="a-btn sm" onClick={load}>Try again</button></div>
  if (!docs) return <p className="a-hint">Loading pages…</p>

  const groups = [...new Set(docs.map((d) => d.group))]
  const people = [...new Set(docs.map(changedBy).filter((x): x is string => !!x))].sort()
  const needle = q.trim().toLowerCase()
  const shown = docs
    .filter((d) => !needle || d.title.toLowerCase().includes(needle) || d.urls.some((u) => u.toLowerCase().includes(needle)))
    .filter((d) => status === 'all' || d.status === status)
    .filter((d) => group === 'all' || d.group === group)
    .filter((d) => who === 'all' || changedBy(d) === who)
  const time = (d: DocSummary) => { const t = changedAt(d); return t ? new Date(t).getTime() : 0 }
  const sorted = sort === 'group' ? shown : [...shown].sort((a, b) =>
    sort === 'name' ? a.title.localeCompare(b.title)
      : sort === 'status' ? STATUS_RANK[a.status] - STATUS_RANK[b.status] || time(b) - time(a)
        : sort === 'recent' ? time(b) - time(a) || a.title.localeCompare(b.title)
          : (time(a) || Infinity) - (time(b) || Infinity) || a.title.localeCompare(b.title))
  const count = (k: DocSummary['status']) => docs.filter((d) => d.status === k).length
  const filtered = needle || status !== 'all' || group !== 'all' || who !== 'all'

  /** A column heading that sorts by it; clicking again flips newest/oldest. */
  const Th = ({ k, children }: { k: Sort; children: React.ReactNode }) => {
    const on = sort === k || (k === 'recent' && sort === 'oldest')
    return (
      <th aria-sort={on ? (sort === 'oldest' ? 'ascending' : 'descending') : undefined}>
        <button type="button" className={`a-pgth${on ? ' on' : ''}`}
          onClick={() => setSort(k === 'recent' ? (sort === 'recent' ? 'oldest' : 'recent') : sort === k ? 'group' : k)}>
          {children}{on && <span aria-hidden="true">{sort === 'oldest' ? ' ↑' : ' ↓'}</span>}
        </button>
      </th>
    )
  }

  const table = (rows: DocSummary[], showGroup: boolean) => (
    <div className="a-tablewrap"><div className="a-scroll">
      <table>
        <thead><tr>
          <Th k="name">Page</Th>
          {showGroup && <th>Section</th>}
          <Th k="status">Status</Th>
          <Th k="recent">Last change</Th>
          <th />
        </tr></thead>
        <tbody>
          {rows.map((d) => {
            const other = d.status === 'elsewhere'
            const actionable = !other || (d.manage && d.manage !== 'code')
            // A real page to open: not the 404 preview address, not the email.
            const view = d.urls[0] && d.key !== 'not-found' ? d.urls[0] : null
            return (
              <tr key={d.key} className={actionable ? 'a-click' : undefined} onClick={() => actionable && act(d)}>
                <td>
                  <span className="a-ttl">{d.title}</span>
                  <span className="a-slug">{d.urls[0] ?? 'email'}</span>
                  {d.note && <span className="a-hint" style={{ display: 'block', marginTop: 3 }}>{d.note}</span>}
                </td>
                {showGroup && <td className="a-hint" style={{ whiteSpace: 'nowrap' }}>{d.group}</td>}
                <td style={{ whiteSpace: 'nowrap' }}><StatusPill d={d} /></td>
                <td className="a-hint" style={{ minWidth: 170 }}>
                  {other
                    ? <>{changedAt(d) ? <>Updated {when(changedAt(d))}<br /></> : null}Edited in {MANAGE[d.manage ?? 'code'].where}</>
                    : changedAt(d)
                      ? <>{d.status === 'draft' ? 'Draft saved' : 'Published'} {when(changedAt(d))}{changedBy(d) ? <><br />by {changedBy(d)}</> : ''}</>
                      : 'Original copy'}
                </td>
                <td className="a-rowacts" style={{ whiteSpace: 'nowrap' }}>
                  {view && (!other || d.live) && (
                    <a className="a-btn sm" href={view} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                      title={`Open ${view} in a new tab`}>View</a>
                  )}
                  {actionable && (
                    <button className="a-btn sm" style={{ marginLeft: 6 }} onClick={(e) => { e.stopPropagation(); act(d) }}>
                      {other ? (readOnly && d.manage === 'posts' ? 'Open post' : MANAGE[d.manage ?? 'code'].button) : readOnly ? 'Open' : 'Edit'}
                    </button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div></div>
  )

  return (
    <>
      {!migrated && (
        <div className="a-err">The page copy tables are not in this database yet. Run <span className="a-mono">db/011_page_content.sql</span> first; until then pages show their original copy and nothing can be saved.</div>
      )}
      <div className="a-note"><span>
        <b>Every page&rsquo;s words and pictures, in one place.</b> Open a page, change what you need, <b>Save draft</b> and
        check it in the preview beside the form, then <b>Publish</b>. Visitors see nothing until you publish, and every
        publish can be undone from History. Every page on the site is listed: the ones whose words live on another screen
        (blog posts, categories, partner location pages) open that screen. Titles and meta descriptions are edited under SEO.
      </span></div>

      <div className="a-pgbar">
        <label className="a-search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3" /></svg>
          <input className="a-inp" type="search" placeholder="Find a page by name or URL" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Find a page" />
        </label>
        <select className="a-inp a-pgsel" value={status} onChange={(e) => setStatus(e.target.value as typeof status)} aria-label="Status">
          <option value="all">All statuses ({docs.length})</option>
          <option value="draft">Unpublished drafts ({count('draft')})</option>
          <option value="published">Edited, live ({count('published')})</option>
          <option value="original">Original copy ({count('original')})</option>
          <option value="elsewhere">Edited on another screen ({count('elsewhere')})</option>
        </select>
        <select className="a-inp a-pgsel" value={group} onChange={(e) => setGroup(e.target.value)} aria-label="Section">
          <option value="all">All sections</option>
          {groups.map((g) => <option key={g} value={g}>{g} ({docs.filter((d) => d.group === g).length})</option>)}
        </select>
        <select className="a-inp a-pgsel" value={who} onChange={(e) => setWho(e.target.value)} aria-label="Changed by">
          <option value="all">Changed by anyone</option>
          {people.map((p) => <option key={p} value={p}>Changed by {p}</option>)}
        </select>
        <select className="a-inp a-pgsel" value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort">
          {SORTS.map((o) => <option key={o.k} value={o.k}>Sort: {o.label}</option>)}
        </select>
        {(filtered || sort !== 'group') && (
          <button className="a-btn sm" onClick={() => { setQ(''); setStatus('all'); setGroup('all'); setWho('all'); setSort('group') }}>Clear</button>
        )}
      </div>

      <p className="a-hint" style={{ margin: '0 0 12px' }}>{sorted.length} of {docs.length} pages</p>
      {sorted.length === 0 && <p className="a-hint">No page matches that.</p>}
      {sort === 'group'
        ? groups.filter((g) => sorted.some((d) => d.group === g)).map((g) => (
          <section key={g} style={{ marginBottom: 22 }}>
            <h2 className="a-h2">{g} <span className="a-hint" style={{ fontWeight: 400 }}>({sorted.filter((d) => d.group === g).length})</span></h2>
            {(() => {
              const rows = sorted.filter((d) => d.group === g)
              const fold = !filtered && rows.length > FOLD && !unfolded.has(g)
              return <>
                {table(fold ? rows.slice(0, FOLD) : rows, false)}
                {fold && (
                  <button className="a-btn sm" style={{ marginTop: 8 }} onClick={() => setUnfolded((u) => new Set(u).add(g))}>
                    Show all {rows.length} {g.toLowerCase()}
                  </button>
                )}
              </>
            })()}
          </section>
        ))
        : sorted.length > 0 && table(sorted, true)}
    </>
  )
}

function StatusPill({ d }: { d: DocSummary }) {
  const status = d.status
  if (status === 'elsewhere') return d.live ? <span className="a-pill live">Live</span> : <span className="a-pill off">Not published</span>
  if (status === 'draft') return <span className="a-pill draft">Unpublished draft</span>
  if (status === 'published') return <span className="a-pill live">Edited, live</span>
  return <span className="a-pill off">Original</span>
}

/* ================================================================ editor == */

function PageEditor({ docKey, initialUrl, onClose, onOpenDoc, onToast, readOnly = false }: {
  docKey: string; onClose: () => void; onToast: (m: string) => void; readOnly?: boolean
  /** Which of the document's pages the preview starts on (a page row's own URL). */
  initialUrl?: string
  /** Opens another document (a shared block the preview click landed in). */
  onOpenDoc: (key: string) => void
}) {
  const [doc, setDoc] = useState<DocState | null>(null)
  const [data, setData] = useState<Json | null>(null)
  const [saved, setSaved] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState<'' | 'save' | 'publish' | 'other'>('')
  const [ask, setAsk] = useState<'' | 'publish' | 'discard' | 'original' | 'history' | 'leave'>('')
  const [picking, setPicking] = useState<string | null>(null)
  const [url, setUrl] = useState('')
  const [frameKey, setFrameKey] = useState(0)
  const [device, setDevice] = useState<'desktop' | 'phone'>('desktop')
  const [filter, setFilter] = useState('')
  const [pickMode, setPickMode] = useState(true)
  /** Where a preview click landed when it was not in this document. */
  const [elsewhere, setElsewhere] = useState<{ key: string; title: string; text: string } | null>(null)
  /** Each page's own title and description as the site renders them, for the META placeholders. */
  const [ownMeta, setOwnMeta] = useState<Record<string, { title: string; description: string }>>({})
  const formRef = useRef<HTMLDivElement>(null)
  const docRef = useRef<DocState | null>(null)
  const sharedDocs = useRef<Map<string, DocState>>(new Map())

  const dirty = data !== null && JSON.stringify(data) !== saved

  const adopt = useCallback((s: DocState, reloadFrame = true) => {
    docRef.current = s
    setDoc(s); setData(s.current); setSaved(JSON.stringify(s.current))
    setUrl((u) => u || (initialUrl && s.urls.includes(initialUrl) ? initialUrl : s.urls[0]) || '')
    if (reloadFrame) setFrameKey((k) => k + 1)
  }, [initialUrl])

  useEffect(() => {
    void (async () => {
      const r = await getJSON<DocState>('/pages/doc', new URLSearchParams({ key: docKey }))
      if (!r.ok) { setError(r.error); return }
      adopt(r.data)
    })()
  }, [docKey, adopt])

  /* The page's own title and description, read off the page itself, so an
     empty META field can show what it leaves in place. Fetched once, before
     any edit to them is saved. */
  const metaUrls = doc ? metaUrlsOf(doc.current) : ''
  useEffect(() => {
    if (!metaUrls) return
    let gone = false
    void Promise.all(metaUrls.split('\n').map(async (u) => {
      try {
        const html = await (await fetch(u, { credentials: 'same-origin' })).text()
        const d = new DOMParser().parseFromString(html, 'text/html')
        return [u, { title: d.title.trim(), description: d.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() ?? '' }] as const
      } catch { return null }
    })).then((rows) => { if (!gone) setOwnMeta(Object.fromEntries(rows.filter((r) => r !== null))) })
    return () => { gone = true }
  }, [metaUrls])

  /** Opens the field at `path` in the form: its section, scrolled to, the cursor in it, a flash. */
  const jump = useCallback((path: string) => {
    setFilter('')
    setElsewhere(null)
    // After the filter clears and the section renders.
    setTimeout(() => {
      const form = formRef.current
      if (!form) return
      let el: HTMLElement | null = null
      for (let p = path; p && !el; p = p.split('.').slice(0, -1).join('.')) {
        el = form.querySelector<HTMLElement>(`[data-path="${CSS.escape(p)}"]`)
      }
      if (!el) return
      for (let d = el.closest('details'); d; d = d.parentElement?.closest('details') ?? null) d.open = true
      el.scrollIntoView({ block: 'center', behavior: 'smooth' })
      const input = el.querySelector<HTMLElement>('textarea, input:not([type=hidden]), select')
      input?.focus({ preventScroll: true })
      el.classList.remove('a-pgflash'); void el.offsetWidth; el.classList.add('a-pgflash')
    }, 30)
  }, [])

  /** A click in the preview: find what was clicked, here or in a shared block. */
  const pick = useCallback(async (hit: PreviewHit) => {
    const d = docRef.current
    if (!d) return
    const rendered = d.rendered ? new Set(d.rendered) : null
    const here = findField(d.current, hit, rendered)
    if (here && here.score >= 100) { jump(here.path); return }
    let best: { key: string; title: string; score: number } | null = null
    for (const key of SHARED_SEARCH) {
      if (key === d.key) continue
      let s = sharedDocs.current.get(key)
      if (!s) {
        const r = await getJSON<DocState>('/pages/doc', new URLSearchParams({ key }))
        if (!r.ok) continue
        s = r.data; sharedDocs.current.set(key, s)
      }
      const m = findField(s.current, hit, s.rendered ? new Set(s.rendered) : null)
      if (m && (!best || m.score > best.score)) best = { key, title: s.title, score: m.score }
    }
    if (here && (!best || here.score >= best.score)) { jump(here.path); return }
    if (best) { setElsewhere({ key: best.key, title: best.title, text: hit.text.slice(0, 80) }); formRef.current?.scrollIntoView({ block: 'start' }); return }
    onToast(hit.text ? 'That part of the page is not editable text (it is built from other pages or the design).' : 'Nothing editable there. Click on words or a picture.')
  }, [jump, onToast])

  /* Unsaved work is not lost to a closed tab. */
  useEffect(() => {
    if (!dirty) return
    const warn = (e: BeforeUnloadEvent) => { e.preventDefault() }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  /* Leaving the editor leaves preview, so browsing the site afterwards shows
     what visitors see. Best effort: a failure only means the bar stays. */
  useEffect(() => () => { void fetch('/api/admin/pages/preview/exit/', { redirect: 'manual' }).catch(() => {}) }, [])

  const save = useCallback(async (): Promise<boolean> => {
    if (!data) return false
    setBusy('save')
    const r = await sendJSON<DocState>('/pages/doc', 'PUT', { data }, new URLSearchParams({ key: docKey }))
    setBusy('')
    if (!r.ok) { onToast(r.error); return false }
    adopt(r.data)
    onToast('Draft saved. The preview shows it; visitors do not see it yet.')
    return true
  }, [data, docKey, adopt, onToast])

  const act = useCallback(async (action: string, extra: Record<string, unknown> = {}, msg = '') => {
    setBusy(action === 'publish' ? 'publish' : 'other')
    const r = await sendJSON<DocState>('/pages/doc', 'POST', { action, ...extra }, new URLSearchParams({ key: docKey }))
    setBusy('')
    setAsk('')
    if (!r.ok) { onToast(r.error); return }
    adopt(r.data)
    if (msg) onToast(msg)
  }, [docKey, adopt, onToast])

  async function publish() {
    if (dirty && !(await save())) return
    await act('publish', {}, 'Published. Pages update as they are next opened, usually within a minute.')
  }

  const setAt = useCallback((path: string, value: Json) => {
    setData((d) => (d === null ? d : put(d, path.split('.'), value)))
  }, [])

  // Destructured, as in SeoDesk: `x.hostRef` would teach the lint that `x` is a ref.
  const { hostRef: splitRef, hostStyle: splitStyle, dragging: splitDragging, grip: splitGrip } =
    useSplit('rti.admin.pagesRail', { min: 360, mainMin: 420, initial: (w) => Math.round(w * 0.55) })

  if (error) return <div className="a-err">{error} <button className="a-btn sm" onClick={onClose}>Back to pages</button></div>
  if (!doc || data === null) return <p className="a-hint">Loading…</p>

  const rendered = doc.rendered ? new Set(doc.rendered) : null
  const sections = Object.entries(data as Record<string, Json>).filter(([k, v]) => !isHiddenKey(k, v, k) && visible(v, k, rendered))
    .sort(([a], [b]) => rank(a) - rank(b))
  const isObjDoc = typeof data === 'object' && !Array.isArray(data)
  const previewable = doc.urls.length > 0
  const status = dirty ? 'Unsaved changes' : doc.hasDraft ? 'Draft saved, not published' : doc.editsLive ? 'Live (edited)' : 'Live (original copy)'
  const f = filter.trim().toLowerCase()

  return (
    <div className="a-pg">
      <div className="a-pghead">
        <button className="a-btn sm" onClick={() => (dirty ? setAsk('leave') : onClose())}>&larr; All pages</button>
        <div style={{ minWidth: 0 }}>
          <strong className="a-pgtitle">{doc.title}</strong>
          <span className={`a-pill ${dirty || doc.hasDraft ? 'draft' : 'live'}`} style={{ marginLeft: 8 }}>{status}</span>
          <div className="a-hint">
            {doc.hasDraft && doc.draftUpdatedAt && <>Draft saved {when(doc.draftUpdatedAt)}{doc.draftBy ? ` by ${doc.draftBy}` : ''}. </>}
            {doc.publishedAt && <>Last published {when(doc.publishedAt)}{doc.publishedBy ? ` by ${doc.publishedBy}` : ''}.</>}
          </div>
        </div>
        <span className="a-spacer" />
        <button className="a-btn sm" onClick={() => setAsk('history')}>History ({doc.revisions.length})</button>
        {readOnly ? <span className="a-pill off">View only</span> : <>
          {doc.hasDraft && <button className="a-btn sm stop" disabled={!!busy} onClick={() => setAsk('discard')}>Discard draft</button>}
          <button className="a-btn" disabled={!dirty || !!busy} onClick={() => void save()}>{busy === 'save' ? 'Saving…' : 'Save draft'}</button>
          <button className="a-btn go" disabled={(!dirty && !doc.hasDraft) || !!busy} onClick={() => setAsk('publish')}>{busy === 'publish' ? 'Publishing…' : 'Publish'}</button>
        </>}
      </div>

      <div ref={splitRef} className={`a-pggrid${splitDragging ? ' dragging' : ''}`} style={splitStyle}>
        <div className="a-pgform" ref={formRef}>
          {doc.note && <div className="a-note"><span>{doc.note}</span></div>}
          {elsewhere && (
            <div className="a-note a-pgelse">
              <span>&ldquo;{elsewhere.text}{elsewhere.text.length >= 80 ? '…' : ''}&rdquo; is edited in <b>{elsewhere.title}</b>, a block shared by many pages.</span>
              <span style={{ display: 'flex', gap: 6 }}>
                <button className="a-btn sm p" onClick={() => (dirty ? onToast('Save or undo your changes here first.') : onOpenDoc(elsewhere.key))}>Open it</button>
                <button className="a-btn sm" onClick={() => setElsewhere(null)}>Close</button>
              </span>
            </div>
          )}
          <div className="a-hint" style={{ marginBottom: 12 }}>
            Desktop sections on this site are laid out to the design, so much longer text can crowd or clip a section.
            Save the draft and check the preview, on Desktop and Phone, before publishing.
          </div>
          <input className="a-inp" type="search" placeholder="Filter fields (e.g. heading, faq, phone)" value={filter}
            onChange={(e) => setFilter(e.target.value)} style={{ marginBottom: 14 }} aria-label="Filter fields" />
          {!isObjDoc && <p className="a-hint">This document has no editable fields.</p>}
          {/* disabled: every box, list button and picture picker at once. */}
          <fieldset disabled={readOnly} style={{ border: 0, padding: 0, margin: 0, minWidth: 0, display: 'contents' }}>
          {sections.map(([k, v]) => (
            <details key={k} className="a-card a-pgsec" open={sections.length <= 3 || !!f || k === 'META'}>
              <summary>{sectionTitle(k, sections.map(([x]) => x))}</summary>
              {k === 'META'
                ? <MetaFields value={v as Json[]} def={getAt(doc.defaults, k) as Json[] | undefined} own={ownMeta} filter={f} set={setAt} />
                : <Node value={v} def={getAt(doc.defaults, k) as Json | undefined} live={getAt(doc.live, k) as Json | undefined}
                    path={k} name={k} depth={0} rendered={rendered} filter={f} set={setAt} onPick={setPicking} />}
            </details>
          ))}
          </fieldset>
          {!readOnly && (
            <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap' }}>
              <button className="a-btn sm" disabled={!!busy} onClick={() => setAsk('original')}>Back to the original copy…</button>
            </div>
          )}
        </div>

        <SplitGrip label="Preview width" {...splitGrip} />

        <aside className="a-pgside">
          <div className="a-pgprevbar">
            {previewable ? (
              <>
                {doc.urls.length > 1
                  ? <select className="a-inp" style={{ height: 30, width: 'auto', maxWidth: 220 }} value={url} onChange={(e) => { setUrl(e.target.value); setFrameKey((k) => k + 1) }} aria-label="Page to preview">
                      {doc.urls.map((u) => <option key={u} value={u}>{u}</option>)}
                    </select>
                  : <span className="a-mono" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{url}</span>}
                <span className="a-spacer" />
                <label className="a-pgpick" title="Click words or a picture in the preview to edit them on the left. Off: the preview works like the real page.">
                  <input type="checkbox" checked={pickMode} onChange={(e) => setPickMode(e.target.checked)} /> Click to edit
                </label>
                <div className="a-seg" role="group" aria-label="Preview size">
                  <button className={`a-btn sm${device === 'desktop' ? ' p' : ''}`} onClick={() => setDevice('desktop')}>Desktop</button>
                  <button className={`a-btn sm${device === 'phone' ? ' p' : ''}`} onClick={() => setDevice('phone')}>Phone</button>
                </div>
                <button className="a-btn sm" onClick={async () => { if (dirty && !(await save())) return; setFrameKey((k) => k + 1) }}>
                  {dirty ? 'Save & preview' : 'Reload'}
                </button>
                <a className="a-btn sm" href={`/api/admin/pages/preview/?to=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">Open ↗</a>
              </>
            ) : <span className="a-hint">This copy is not on a web page (an email), so there is no preview. Publish, then send a test enquiry.</span>}
          </div>
          {previewable && (
            <>
              {dirty && <div className="a-pgstale">The preview shows the last saved draft. Save to see your latest changes.</div>}
              <PreviewFrame key={`${frameKey}:${url}`} url={url} device={device} onPick={pickMode ? pick : null} />
            </>
          )}
        </aside>
      </div>

      {picking && (
        <Dialog title="Choose an image" wide onClose={() => setPicking(null)}
          intro={<>Drop a file in to upload it, or pick one already in the library. Use a picture close to the original&rsquo;s shape so the section keeps its layout.</>}
          footer={<button className="a-btn" onClick={() => setPicking(null)}>Close</button>}>
          <MediaLibrary mode="pick" canDelete={false} onToast={onToast}
            onPick={(m) => {
              if (!m.mime.startsWith('image/')) { onToast('That is not an image.'); return }
              setAt(picking, m.url); setPicking(null)
            }} />
        </Dialog>
      )}

      {ask === 'publish' && (
        <ConfirmDialog title="Publish to the live site?" confirmLabel="Publish" busyLabel="Publishing…"
          onCancel={() => setAsk('')} onConfirm={publish}>
          {dirty ? 'Your unsaved changes will be saved and ' : 'The saved draft will be '}published on {doc.urls.length ? doc.urls.join(', ') : 'the auto-reply email'}
          {doc.group === 'Shared blocks' ? ' and every other page that shows this block' : ''}. The current version is kept in History.
        </ConfirmDialog>
      )}
      {ask === 'discard' && (
        <ConfirmDialog title="Discard the draft?" confirmLabel="Discard" busyLabel="Discarding…"
          onCancel={() => setAsk('')} onConfirm={() => act('discard', {}, 'Draft discarded. The editor shows the live copy.')}>
          The unpublished changes are thrown away. What is live does not change.
        </ConfirmDialog>
      )}
      {ask === 'original' && (
        <ConfirmDialog title="Go back to the original copy?" confirmLabel="Make draft" busyLabel="Working…"
          onCancel={() => setAsk('')} onConfirm={() => act('original', {}, 'A draft with the original copy is ready. Check it, then Publish to apply it.')}>
          This makes a draft with the page&rsquo;s original words and pictures, as built. Nothing changes on the live site until you publish it.
        </ConfirmDialog>
      )}
      {ask === 'leave' && (
        <ConfirmDialog title="Leave without saving?" confirmLabel="Leave" busyLabel="Leaving…"
          onCancel={() => setAsk('')} onConfirm={onClose}>
          Your changes since the last save will be lost.
        </ConfirmDialog>
      )}
      {ask === 'history' && (
        <Dialog title="History" onClose={() => setAsk('')} footer={<button className="a-btn" onClick={() => setAsk('')}>Close</button>}
          intro={<>Every publish of this page. Restoring one makes it a draft, so you can check it before publishing.</>}>
          {doc.revisions.length === 0 ? <p className="a-hint">Nothing has been published from here yet.</p> : (
            <ul className="a-pghist">
              {doc.revisions.map((r, i) => (
                <li key={r.id}>
                  <span><strong>{when(r.published_at)}</strong>{r.by ? ` by ${r.by}` : ''}{i === 0 ? ' (live now)' : ''}
                    <span className="a-hint"> · {r.edits === 0 ? 'original copy' : `${r.edits} change${r.edits === 1 ? '' : 's'} from the original`}</span></span>
                  {!readOnly && <button className="a-btn sm" disabled={!!busy} onClick={() => act('restore', { revision: r.id }, 'That version is now the draft. Check it, then Publish.')}>Restore as draft</button>}
                </li>
              ))}
            </ul>
          )}
        </Dialog>
      )}
    </div>
  )
}

/* -------------------------------------------------------------- preview -- */

/**
 * The real page, in draft mode, scaled to fit the panel. Desktop renders at
 * 1440 wide (the site scales its 1920 board to the window) and is shrunk to
 * the panel; Phone renders at 390.
 */
function PreviewFrame({ url, device, onPick }: { url: string; device: 'desktop' | 'phone'; onPick: ((hit: PreviewHit) => void) | null }) {
  const box = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const [loaded, setLoaded] = useState(0)
  const pickRef = useRef(onPick)
  useEffect(() => { pickRef.current = onPick }, [onPick])
  /* Click to edit: an outline on what the pointer is over, and a click
     reports what was clicked instead of following a link. Same origin (the
     preview is this site), so the frame's document is reachable. Re-attached
     on every load (a page the visitor navigated to in the frame too). */
  useEffect(() => {
    const doc = frame.current?.contentDocument
    if (!doc || !loaded || !onPick) return
    const style = doc.createElement('style')
    style.textContent = '.rti-pick{outline:2px solid #1b7a3d!important;outline-offset:2px!important;cursor:pointer!important}'
    doc.head.appendChild(style)
    let over: Element | null = null
    const move = (e: Event) => {
      const t = e.target as Element | null
      if (over === t) return
      over?.classList.remove('rti-pick'); over = t && t !== doc.body && t !== doc.documentElement ? t : null
      over?.classList.add('rti-pick')
    }
    const click = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      if (!t) return
      // Links and sending a form are stopped; an accordion, a tab or a
      // Load More still works, so what it opens can be clicked next.
      if (t.closest('a[href], [type="submit"], form button:not([type="button"])')) { e.preventDefault(); e.stopPropagation() }
      pickRef.current?.(hitOf(t))
    }
    doc.addEventListener('mouseover', move, true)
    doc.addEventListener('click', click, true)
    return () => {
      doc.removeEventListener('mouseover', move, true)
      doc.removeEventListener('click', click, true)
      over?.classList.remove('rti-pick'); style.remove()
    }
  }, [loaded, onPick])
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const el = box.current
    if (!el) return
    const read = () => setSize({ w: el.clientWidth, h: el.clientHeight })
    read()
    const ro = new ResizeObserver(read)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const W = device === 'desktop' ? 1440 : 390
  const scale = size.w ? Math.min(1, size.w / W) : 1
  const src = `/api/admin/pages/preview/?to=${encodeURIComponent(url)}`
  return (
    <div ref={box} className="a-pgframe">
      {loading && <div className="a-pgload">Loading preview…</div>}
      {size.w > 0 && (
        <iframe ref={frame} title="Page preview" src={src} onLoad={() => { setLoading(false); setLoaded((n) => n + 1) }}
          style={{
            width: W, height: size.h / scale, transform: `scale(${scale})`, transformOrigin: '0 0',
            marginLeft: device === 'phone' ? Math.max(0, (size.w - W * scale) / 2) : 0,
          }} />
      )}
    </div>
  )
}

/* ---------------------------------------------------------------- form -- */

type NodeProps = {
  value: Json; def: Json | undefined; live: Json | undefined; path: string; name: string; depth: number
  rendered: Set<string> | null; filter: string
  set: (path: string, v: Json) => void; onPick: (path: string) => void
}

function Node(p: NodeProps) {
  const { value, def, path } = p
  if (typeof value === 'string') return <StringField {...p} value={value} />
  if (Array.isArray(value)) return <ListField {...p} value={value} />
  if (value && typeof value === 'object') {
    const entries = Object.entries(value).filter(([k, v]) => !isHiddenKey(k, v, `${path}.${k}`) && visible(v, `${path}.${k}`, p.rendered))
    if (!entries.length) return null
    return (
      <div className={p.depth > 0 ? 'a-pgobj' : ''}>
        {entries.map(([k, v]) => (
          <Node key={k} {...p} value={v} path={`${path}.${k}`} name={k} depth={p.depth + 1}
            def={def && typeof def === 'object' && !Array.isArray(def) ? (def as Record<string, Json>)[k] : undefined}
            live={p.live && typeof p.live === 'object' && !Array.isArray(p.live) ? (p.live as Record<string, Json>)[k] : undefined} />
        ))}
      </div>
    )
  }
  return null
}

function StringField({ value, def, path, name, filter, set, onPick }: NodeProps & { value: string }) {
  const kind: FieldKind = fieldKind(name, typeof def === 'string' ? def : value)
  const label = fieldLabel(path)
  if (filter && !(label.toLowerCase().includes(filter) || value.toLowerCase().includes(filter))) return null
  const changed = typeof def === 'string' && def !== value
  const h1 = /^h1/i.test(name)
  return (
    <div className="a-field a-pgfield" data-path={path}>
      <label>
        {label}
        {changed && <button type="button" className="a-pgreset" title={`Original: ${def}`} onClick={() => set(path, def as string)}>changed · undo</button>}
      </label>
      {kind === 'choice' ? (
        <select className="a-inp" value={value} onChange={(e) => set(path, e.target.value)}>
          {[...new Set([value, ...ICON_CHOICES])].map((o) => <option key={o} value={o}>{humanize(o)}</option>)}
        </select>
      ) : kind === 'long' ? (
        <textarea className="a-inp" rows={Math.min(10, Math.max(2, Math.ceil(value.length / 70)))} value={value} onChange={(e) => set(path, e.target.value)} />
      ) : kind === 'image' ? (
        <div className="a-pgimg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {value ? <img src={value} alt="" /> : <span className="a-hint">No image</span>}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <input className="a-inp a-mono" value={value} onChange={(e) => set(path, e.target.value)} />
            <div><button type="button" className="a-btn sm" onClick={() => onPick(path)}>Choose image…</button></div>
          </div>
        </div>
      ) : (
        <input className={`a-inp${kind === 'link' ? ' a-mono' : ''}`} value={value} onChange={(e) => set(path, e.target.value)} />
      )}
      {h1 && <span className="a-hint">This is the page&rsquo;s H1 heading, which Google reads. Agree changes with the SEO team.</span>}
      {kind === 'link' && <span className="a-hint">A page on this site starts with / and ends with / (e.g. /contact-us/). Other sites start with https://.</span>}
    </div>
  )
}

function ListField(p: NodeProps & { value: Json[] }) {
  const { value, path, name, set } = p
  const label = fieldLabel(path)
  const template = Array.isArray(p.def) && p.def.length ? p.def[p.def.length - 1] : value[value.length - 1]
  const plain = value.every((v) => typeof v === 'string')
  const move = (i: number, d: number) => {
    const next = [...value]; const [x] = next.splice(i, 1); next.splice(i + d, 0, x!); set(path, next)
  }
  const add = () => { if (template !== undefined) set(path, [...value, blank(template)]) }
  /* Items that are pages (a hidden `url`): renamed, reordered or removed,
     never added here, since a page is made in code. */
  const fixed = isRecord(template) && typeof template.url === 'string'
  /* A list mixing kinds of item (a location page's blocks): Add offers each. */
  const pool = [...(Array.isArray(p.def) ? p.def : []), ...value].filter(isRecord)
  const kinds = [...new Set(pool.map((x) => x.kind).filter((k): k is string => typeof k === 'string'))]
  const [addKind, setAddKind] = useState('')
  const addOf = (k: string) => {
    const t = [...pool].reverse().find((x) => x.kind === k)
    if (t) set(path, [...value, blank(t)])
  }
  const remove = (i: number) => set(path, value.filter((_, j) => j !== i))
  const itemName = (i: number) => {
    const v = value[i]
    const t = v && typeof v === 'object' && !Array.isArray(v)
      ? Object.entries(v).find(([k, x]) => typeof x === 'string' && x && !isHiddenKey(k, x) && fieldKind(k, x) !== 'image' && fieldKind(k, x) !== 'link')?.[1]
      : typeof v === 'string' ? v : null
    const kind = isRecord(v) && typeof v.kind === 'string' && kinds.length > 1 ? `[${KIND_NAMES[v.kind] ?? humanize(v.kind)}] ` : ''
    return `${i + 1}. ${kind}${typeof t === 'string' ? (t.length > 60 ? `${t.slice(0, 60)}…` : t) : ''}`
  }
  if (p.filter && !label.toLowerCase().includes(p.filter)) {
    // Filter inside the items instead of hiding the whole list.
    return <div>{value.map((v, i) => <Node key={i} {...p} value={v} path={`${path}.${i}`} name={plain ? name : String(i)} depth={p.depth + 1}
      def={Array.isArray(p.def) ? p.def[i] : undefined} live={Array.isArray(p.live) ? p.live[i] : undefined} />)}</div>
  }
  return (
    <div className="a-pglist">
      <div className="a-pglisthead" data-path={path}><span>{label}</span><span className="a-hint">{value.length} item{value.length === 1 ? '' : 's'}</span></div>
      {value.map((v, i) => (
        <div key={i} className="a-pgitem">
          <div className="a-pgitemhead">
            <span className="a-hint">{plain ? `${i + 1}.` : itemName(i)}</span>
            <span className="a-spacer" />
            <button type="button" className="a-btn sm" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up">↑</button>
            <button type="button" className="a-btn sm" disabled={i === value.length - 1} onClick={() => move(i, 1)} aria-label="Move down">↓</button>
            <button type="button" className="a-btn sm stop" onClick={() => remove(i)} aria-label="Remove">Remove</button>
          </div>
          <Node {...p} value={v} path={`${path}.${i}`} name={plain ? name : String(i)} depth={p.depth + 1}
            def={Array.isArray(p.def) ? p.def[i] : undefined} live={Array.isArray(p.live) ? p.live[i] : undefined} />
        </div>
      ))}
      {template !== undefined && !fixed && kinds.length > 1 ? (
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <select className="a-inp" style={{ height: 30, width: 'auto' }} value={addKind || kinds[0]} onChange={(e) => setAddKind(e.target.value)} aria-label="Kind of block to add">
            {kinds.map((k) => <option key={k} value={k}>{KIND_NAMES[k] ?? humanize(k)}</option>)}
          </select>
          <button type="button" className="a-btn sm" onClick={() => addOf(addKind || kinds[0]!)}>+ Add block</button>
        </div>
      ) : template !== undefined && !fixed && <button type="button" className="a-btn sm" onClick={add}>+ Add {plain ? 'line' : 'item'}</button>}
    </div>
  )
}

/* -------------------------------------------------------------- helpers -- */

/** Does this value have anything the editor shows? */
function visible(v: Json, path: string, rendered: Set<string> | null): boolean {
  if (path === 'META' || path.startsWith('META.')) return true   // the page's title and description, never on the page itself
  if (typeof v === 'string') {
    if (/^\d+:\d+$/.test(v)) return false          // a Figma node id
    return !rendered || rendered.has(shapeOf(path))
  }
  if (Array.isArray(v)) {
    if (v.length === 0) return !rendered || [...rendered].some((s) => s.startsWith(`${shapeOf(path)}.`) || s === `${shapeOf(path)}.*`)
    return v.some((x, i) => visible(x, `${path}.${i}`, rendered))
  }
  if (v && typeof v === 'object') return Object.entries(v).some(([k, x]) => !isHiddenKey(k, x, `${path}.${k}`) && visible(x, `${path}.${k}`, rendered))
  return false
}

/** Immutable set at a path. */
function put(root: Json, segs: string[], value: Json): Json {
  if (!segs.length) return value
  const [head, ...rest] = segs as [string, ...string[]]
  if (Array.isArray(root)) {
    const next = [...root]; next[Number(head)] = put(next[Number(head)] as Json, rest, value); return next
  }
  const obj = (root && typeof root === 'object' ? root : {}) as Record<string, Json>
  return { ...obj, [head]: put(obj[head] as Json, rest, value) }
}

/** A new list item shaped like `t`: its words emptied, its pictures, links and switches kept. */
function blank(t: Json, key = ''): Json {
  if (typeof t === 'string') { const k = fieldKind(key, t); return k === 'image' || k === 'link' || k === 'choice' || isHiddenKey(key, t) ? t : '' }
  if (Array.isArray(t)) return t.length && typeof t[0] === 'string' ? [''] : t.map((x) => blank(x, key))
  if (t && typeof t === 'object') return Object.fromEntries(Object.entries(t).map(([k, v]) => [k, isHiddenKey(k, v) ? v : blank(v, k)]))
  return t
}

/**
 * Sections in page order where it is known. A module's exports arrive in
 * alphabetical order (that is how JavaScript lists them), which put FAQs
 * above the hero; the top of the page comes first and the closing call to
 * action last. Anything not listed keeps its place in between.
 */
const FIRST = ['META', 'MAIN_NAV', 'TOP_BAR', 'HEADER_CTA', 'MOBILE_NAV', 'HERO', 'HOME_HERO', 'FAQ_HERO', 'SERVICES_HERO', 'INTRO', 'STORY', 'NOTICE']
const LAST = ['FAQ_INTRO', 'FAQ', 'FAQS', 'HOME_FAQ', 'FAQ_HEAD', 'RELATED', 'CTA', 'HOME_CTA', 'SERVICES_CTA', 'faq', 'after', 'cta']
function rank(k: string): number {
  const f = FIRST.indexOf(k); if (f >= 0) return f - 100
  const l = LAST.indexOf(k); if (l >= 0) return 100 + l
  return 0
}

/** Friendly names for the section keys most pages share. */
const SECTION_NAMES: Record<string, string> = {
  HERO: 'Hero (top of the page)', CTA: 'Closing call to action', HOME_CTA: 'Closing call to action',
  CONTENT: 'Page content', FAQS: 'FAQs', FAQ: 'FAQ heading', FAQ_INTRO: 'FAQ heading', INTRO: 'Intro',
  HOME_HERO: 'Hero (top of the page)', MAIN_NAV: 'Navbar menu', TOP_BAR: 'Top bar', HEADER_CTA: 'Header button', MOBILE_NAV: 'Phone header buttons',
  ABOUT_NAV: 'About menu', INDUSTRY_NAV: 'Industries menu', BLOG_NAV: 'Blogs menu', COL_1: 'Footer links, column 1',
  COL_2: 'Footer links, column 2', FOOTER_TEXT: 'Footer words', FOOTER_NEWSLETTER: 'Footer newsletter box',
  SERVICE_GROUPS: 'Service cards', SERVICE_PAGE_TEXT: 'Service page text (every service page)',
  MINNESOTA: 'Minnesota facility', WISCONSIN: 'Wisconsin facility', DETAIL_COPY: 'Facility page labels',
  META: 'Page title and meta description (Google)',
  // The location and landing pages (src/data/local-pages/types.ts).
  hero: 'Hero (top of the page)', bands: 'Page sections', faq: 'FAQ', after: 'Sections after the FAQ',
  cta: 'Closing call to action', stats: 'Stats strip', about: 'About section', certBody: 'Certifications band text',
  // The county and area pages (src/data/county-pages/).
  servicesHeading: 'Service options heading', sections: 'More sections', company: 'Company card', items: 'Items we accept',
  features: 'Feature cards', sights: 'Top sights',
  COUNTY_SERVICES: 'Service cards (pickup, drop-off, mail-in)', COUNTY_CTA: 'Free estimate banner', COUNTY_ITEMS: 'Items We Accept',
  COUNTY_FEATURE_ICONS: 'Feature card icons', COUNTY_LINE_ICONS: 'Hours and phone icons',
  DIRECTORY_COPY: 'Location directory', BODY: 'Page text',
}

/** What a location page's block kinds are called in the form. */
const KIND_NAMES: Record<string, string> = {
  text: 'Paragraphs', h3: 'Sub-heading', card: 'Single card', cards: 'Rows of cards', info: 'Service table',
  bullets: 'Bullet cards', chips: 'Link pills', button: 'Button', buttons: 'Two buttons', banner: 'Pickup banner',
  items: 'Items We Accept', features: 'Feature cards', sights: 'Top sights',
}

/**
 * A section's heading. A HOME_ block is the heading over a list of the same
 * name (HOME_INDUSTRIES over INDUSTRIES), so the two are told apart.
 */
function sectionTitle(k: string, all: string[] = []): string {
  if (SECTION_NAMES[k]) return SECTION_NAMES[k]
  const bare = k.replace(/^(HOME|SERVICES)_/, '')
  if (bare !== k && all.includes(bare)) return `${humanize(bare.toLowerCase().replace(/_/g, ' '))} (heading)`
  return humanize(bare.toLowerCase().replace(/_/g, ' ')) || k
}

/** The last two meaningful parts of a path: "HERO.cta.label" -> "Button · Label". */
function fieldLabel(path: string): string {
  const parts = path.split('.').slice(1).filter((s) => !/^\d+$/.test(s))
  const last = parts.slice(-2).map(humanize)
  return last.length ? last.join(' · ') : humanize(path.split('.').pop() ?? path)
}


const isRecord = (v: unknown): v is Record<string, Json> => !!v && typeof v === 'object' && !Array.isArray(v)

/* ------------------------------------------------------ title and meta -- */

/** The URLs whose title and description a document carries, one per line (an effect dependency). */
function metaUrlsOf(data: Json): string {
  const m = isRecord(data) ? data.META : null
  return Array.isArray(m) ? m.filter(isRecord).map((x) => String(x.url)).join('\n') : ''
}

/**
 * The META section: per page, its <title> (60 characters, the SEO sheet's
 * limit) and meta description (160). Empty keeps the page's own, which is
 * shown in grey with a button to start from it.
 */
function MetaFields({ value, def, own, filter, set }: {
  value: Json[]; def: Json[] | undefined; own: Record<string, { title: string; description: string }>
  filter: string; set: (path: string, v: Json) => void
}) {
  return (
    <div>
      <p className="a-hint" style={{ marginTop: 0 }}>
        What Google shows for the page. Leave a box empty to keep the page&rsquo;s own (shown in grey). Agree changes with the SEO team.
      </p>
      {value.map((m, i) => {
        if (!isRecord(m)) return null
        const url = String(m.url)
        const page = own[url]
        const box = (key: 'title' | 'description', label: string, max: number) => {
          const v = typeof m[key] === 'string' ? (m[key] as string) : ''
          const was = isRecord(def?.[i]) ? (def![i] as Record<string, Json>)[key] : ''
          if (filter && !(label.toLowerCase().includes(filter) || v.toLowerCase().includes(filter) || (page?.[key] ?? '').toLowerCase().includes(filter))) return null
          const n = (v || page?.[key] || '').length
          return (
            <div className="a-field a-pgfield" data-path={`META.${i}.${key}`}>
              <label>
                {label}
                <span className={`a-hint${n > max ? ' a-pgover' : ''}`} style={{ marginLeft: 'auto' }}>{n}/{max}</span>
                {v !== was && <button type="button" className="a-pgreset" title="Back to the page's own" onClick={() => set(`META.${i}.${key}`, (was as string) ?? '')}>changed · undo</button>}
              </label>
              {key === 'title'
                ? <input className="a-inp" value={v} placeholder={page?.title ?? 'The page’s own title'} onChange={(e) => set(`META.${i}.${key}`, e.target.value)} />
                : <textarea className="a-inp" rows={3} value={v} placeholder={page?.description ?? 'The page’s own description'} onChange={(e) => set(`META.${i}.${key}`, e.target.value)} />}
              {!v && page?.[key] && (
                <div><button type="button" className="a-btn sm" style={{ marginTop: 6 }} onClick={() => set(`META.${i}.${key}`, page[key])}>Start from the current {key}</button></div>
              )}
            </div>
          )
        }
        return (
          <div key={url} className={value.length > 1 ? 'a-pgitem' : ''}>
            {value.length > 1 && <div className="a-pgitemhead"><span className="a-mono a-hint">{url}</span></div>}
            {box('title', 'Meta title', 60)}
            {box('description', 'Meta description', 160)}
          </div>
        )
      })}
    </div>
  )
}

/* -------------------------------------------------------- click to edit -- */

/** What was clicked in the preview: its words, or the picture's file. */
type PreviewHit = { text: string; src: string }

/** The shared blocks a click is looked for in when it is not in the open document. */
const SHARED_SEARCH = ['site-header', 'site-footer', 'locations-directory', 'county-shared', 'certifications', 'facilities', 'contact', 'services', 'case-studies', 'home']

function hitOf(el: HTMLElement): PreviewHit {
  const img = el instanceof HTMLImageElement ? el : el.querySelector('img')
  let src = ''
  if (img && (!el.innerText?.trim() || el === img)) {
    src = img.getAttribute('src') ?? ''
    // next/image: /_next/image?url=%2Fimages%2F…&w=…
    if (src.includes('/_next/image')) src = new URL(src, location.origin).searchParams.get('url') ?? src
  }
  return { text: (el.innerText ?? el.textContent ?? '').trim(), src }
}

const flat = (s: string) => s
  .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/\*\*|__|^#+\s*|^[-*]\s+/gm, '')
  .replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, '-')
  .replace(/\s+/g, ' ').trim().toLowerCase()

/**
 * The field holding what was clicked, scored: 100 the same words, 80 the
 * field holds the clicked words (a word in a sentence the page splits up),
 * 60 the clicked block holds the field (a card clicked on its padding: the
 * longest field in it wins). A picture matches its file.
 */
function findField(data: Json, hit: PreviewHit, rendered: Set<string> | null): { path: string; score: number } | null {
  const t = flat(hit.text)
  const src = hit.src.split('?')[0]
  let best: { path: string; score: number } | null = null
  const consider = (path: string, score: number) => { if (!best || score > best.score) best = { path, score } }
  const walk = (v: Json, path: string, key: string) => {
    if (typeof v === 'string') {
      if (!v.trim() || /^\d+:\d+$/.test(v) || !visible(v, path, rendered)) return
      const kind = fieldKind(key, v)
      if (kind === 'image') { if (src && (v === src || src.endsWith(v) || v.endsWith(src))) consider(path, 100); return }
      if (kind === 'link' || !t) return
      const f = flat(v)
      if (!f) return
      if (f === t) consider(path, 100)
      else if (t.length >= 3 && f.includes(t)) consider(path, 80 - Math.min(19, (f.length - t.length) / 100))
      else if (f.length >= 4 && t.length < 2000 && t.includes(f)) consider(path, 60 + Math.min(19, f.length / 100))
      return
    }
    if (Array.isArray(v)) { v.forEach((x, i) => walk(x, `${path}.${i}`, key)); return }
    if (isRecord(v)) for (const [k, x] of Object.entries(v)) {
      const p = path ? `${path}.${k}` : k
      if (k === 'META' && !path) continue
      if (!isHiddenKey(k, x, p)) walk(x, p, k)
    }
  }
  walk(data, '', '')
  return best
}
