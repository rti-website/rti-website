'use client'

import { useCallback, useEffect, useState } from 'react'
import { PostEditor } from './PostEditor'
import { AskDialog, ConfirmDialog, Dialog } from './Dialog'
import { MediaLibrary } from './MediaLibrary'
import { SeoDesk } from './SeoDesk'
import { Users } from './Users'
import { slugify } from '@/lib/slug'
import { api, getJSON, sendJSON } from './api'

/**
 * RTI Publisher — the admin shell.
 *
 * WHY THIS IS A CLIENT COMPONENT (CLAUDE.md rule 7), and why the whole admin is
 * one page: app/layout.tsx carries `dynamic = 'error'`, which forbids any page
 * beneath it from reading request-time data. That line is what guarantees
 * Googlebot gets full HTML on 600 ranking URLs and rule 2 forbids removing it.
 *
 * So rather than splitting the root layout in two — an invasive refactor that
 * touches every global import on the public site — the admin is a STATIC shell
 * that fetches from /api/admin/*. Route handlers are not wrapped by a layout, so
 * they can read cookies freely. The public site is untouched, and the admin is
 * behind a login where server rendering buys nothing anyway.
 */

type Role = 'administrator' | 'editor' | 'author'
type User = { id: number; email: string; name: string; role: Role }
type Category = {
  id: number; name: string; slug: string; landing_built: boolean
  parent_id: number | null; parent_name?: string | null
}
type CategoryRow = Category & {
  description: string | null; sort_order: number; post_count: number; published_count: number
}
type Counts = { published: number; draft: number; scheduled: number; subscribers: number; leads: number; media: number }
type SocialLink = { id: number; platform: string; url: string }
type Boot = {
  user: User; counts: Counts; categories: Category[]
  authors: { id: number; name: string }[]; social: SocialLink[]
  settings: Record<string, unknown>
}

type View = 'dash' | 'posts' | 'editor' | 'cats' | 'media' | 'seo' | 'subs' | 'leads' | 'users' | 'settings'

const TITLES: Record<View, string> = {
  dash: 'Overview', posts: 'All Posts', editor: 'Edit post', cats: 'Categories',
  media: 'Media library', seo: 'SEO', subs: 'Subscribers', leads: 'Enquiries',
  users: 'People & access', settings: 'Settings',
}

const LOGO = '/images/logo.png'

export function AdminApp() {
  const [boot, setBoot] = useState<Boot | null>(null)
  const [state, setState] = useState<'loading' | 'out' | 'in' | 'setup'>('loading')
  const [setupError, setSetupError] = useState('')
  const [view, setView] = useState<View>('dash')
  const [editing, setEditing] = useState<number | null>(null)
  const [railOpen, setRailOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [asking, setAsking] = useState<null | 'post'>(null)

  const say = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2600)
  }, [])

  const load = useCallback(async () => {
    let res: Response
    try {
      res = await fetch(api('/bootstrap'))
    } catch {
      // The server is not answering at all — a dev restart, a dropped
      // connection. Saying so beats a blank screen or a thrown error.
      setSetupError('Could not reach the server. If the dev server is restarting, wait a moment and reload.')
      setState('setup'); return
    }
    if (res.status === 401) { setState('out'); return }
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      if (data.setup) { setSetupError(data.error); setState('setup'); return }
      setState('out'); return
    }
    setBoot(data)
    setState('in')
  }, [])

  useEffect(() => { void load() }, [load])

  if (state === 'loading') return <div className="a-login"><p className="a-hint">Loading…</p></div>
  if (state === 'setup') return <SetupHelp error={setupError} />
  if (state === 'out' || !boot) return <Login onDone={load} />

  const canPublish = boot.user.role !== 'author'

  /* Switching screens starts at the top. Without this, opening a post from
     halfway down the list leaves the editor scrolled past its own title, with
     the sticky toolbar parked over where the title should be. */
  function show(next: View) { setView(next); setRailOpen(false); window.scrollTo({ top: 0 }) }
  function open(id: number) { setEditing(id); show('editor') }

  async function newPost(title: string) {
    const r = await sendJSON<{ id: number }>('/posts', 'POST', { title })
    if (!r.ok) { say(r.error); return }
    setAsking(null)
    open(r.data.id)
    void load()
  }

  return (
    <div className="a-app">
      <nav className={`a-rail${railOpen ? ' open' : ''}`} aria-label="Sections">
        <div className="a-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="Recycle Technologies" width={170} height={40} />
          <span>Publisher</span>
        </div>

        <p className="a-navlabel">Content</p>
        <NavBtn on={view === 'dash'} go={() => show('dash')} label="Overview"
          icon="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
        <NavBtn on={view === 'posts' || view === 'editor'} go={() => show('posts')} label="All Posts"
          count={boot.counts.published + boot.counts.draft + boot.counts.scheduled}
          icon="M4 4h16v16H4zM8 9h8M8 13h8M8 17h5" />
        <NavBtn on={view === 'cats'} go={() => show('cats')} label="Categories"
          count={boot.categories.length} icon="M3 7h18M3 12h18M3 17h10" />
        <NavBtn on={view === 'media'} go={() => show('media')} label="Media"
          count={boot.counts.media} icon="M3 4h18v16H3zM9 10a2 2 0 1 1-.01 0M21 17l-5-5-6 6" />
        {/* Below Media, where Asim asked for it on 17 Sep 2026. A writer sees it
            too — they cannot save from it, and knowing the title tag is empty is
            half the job. */}
        <NavBtn on={view === 'seo'} go={() => show('seo')} label="SEO"
          icon="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3M8.5 11.5l2 2 4-4.5" />

        <p className="a-navlabel">People</p>
        <NavBtn on={view === 'subs'} go={() => show('subs')} label="Subscribers"
          count={boot.counts.subscribers} icon="M3 5h18v14H3zM3 7l9 6 9-6" />
        <NavBtn on={view === 'leads'} go={() => show('leads')} label="Enquiries"
          count={boot.counts.leads} icon="M9 11 3 7v10l6-4zM9 7h12v10H9z" />

        <p className="a-navlabel">Site</p>
        {boot.user.role === 'administrator' && (
          <NavBtn on={view === 'users'} go={() => show('users')} label="People & access"
            icon="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
        )}
        <NavBtn on={view === 'settings'} go={() => show('settings')} label="Settings"
          icon="M12 9a3 3 0 1 1-.01 0M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />

        <div className="a-railfoot">
          <div className="a-who">
            <span className="a-av">{boot.user.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
            <span><strong>{boot.user.name}</strong><small>{boot.user.role}</small></span>
          </div>
          <button className="a-nav" onClick={async () => {
            await fetch(api('/session'), { method: 'DELETE' })
            setState('out'); setBoot(null)
          }}>Sign out</button>
        </div>
      </nav>

      <div className="a-work">
        <header className="a-top">
          <button className="a-railtoggle" aria-label="Show sections" onClick={() => setRailOpen((o) => !o)}>
            <Icon d="M3 6h18M3 12h18M3 18h18" />
          </button>
          <div>
            <h1>{TITLES[view]}</h1>
            <div className="a-sub">{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
          </div>
          <span className="a-spacer" />
          {/* The primary action follows the screen. A "New post" button on the
              Categories page is how people end up with a post called
              "Universal Waste" instead of the category they came to add. */}
          {view !== 'media' && view !== 'cats' && view !== 'seo' && view !== 'users' && (
            <button className="a-btn p" onClick={() => setAsking('post')}>
              <Icon d="M12 5v14M5 12h14" w={2.2} /> New post
            </button>
          )}
        </header>

        {view === 'dash' && <Dashboard counts={boot.counts} onOpen={open} onNew={() => setAsking('post')} />}
        {view === 'posts' && <Posts onOpen={open} canDelete={canPublish} role={boot.user.role}
          userId={boot.user.id} onToast={say} onChanged={load} />}
        {view === 'editor' && editing !== null && (
          <PostEditor postId={editing} categories={boot.categories} authors={boot.authors}
            canPublish={canPublish} onClose={() => { show('posts'); void load() }} onToast={say}
            onAuthorAdded={(a) => setBoot((b) => (b ? { ...b, authors: [...b.authors, a].sort((x, y) => x.name.localeCompare(y.name)) } : b))} />
        )}
        {view === 'cats' && <Categories canEdit={canPublish} onToast={say} onChanged={load} />}
        {/* !! THE <main className="a-sheet"> IS NOT OPTIONAL. It is what gives
            every screen its side padding. MediaLibrary has none of its own
            because it is also used inside the picture dialog, which supplies its
            own — so when this view swapped the old inline component for it, the
            media screen quietly lost its margins and ran to both edges. */}
        {view === 'media' && (
          <main className="a-sheet">
            <MediaLibrary mode="manage" canDelete={canPublish} onToast={say}
              /* Keeps the count in the rail honest after an upload or a delete,
                 without refetching the whole bootstrap payload for one number. */
              onCount={(n) => setBoot((b) => (b ? { ...b, counts: { ...b.counts, media: n } } : b))} />
          </main>
        )}
        {view === 'seo' && (
          <SeoDesk
            /* A writer can look; the SEO desk, editors and administrators can
               save. The endpoint enforces the same thing — this only decides
               whether the inputs are greyed out. */
            canEdit={boot.user.role !== 'author'}
            onToast={say} />
        )}
        {view === 'users' && <Users meId={boot.user.id} onToast={say} />}
        {view === 'subs' && <Subscribers />}
        {view === 'leads' && <Leads onToast={say} />}
        {view === 'settings' && <Settings social={boot.social}
          canEdit={boot.user.role === 'administrator'} onToast={say} onGoSeo={() => show('seo')} />}
      </div>

      {asking === 'post' && (
        <AskDialog
          title="New post"
          label="Working title"
          placeholder="Recycling Symbols Explained"
          confirmLabel="Start writing"
          required={false}
          intro={<>This becomes the H1 and the web address, and both can be changed later.
            Leave it empty and you get an untitled draft.</>}
          help="Keep the real headline for when the piece is written — nothing here is public until you publish."
          onCancel={() => setAsking(null)}
          onSubmit={(title) => newPost(title)}
        />
      )}

      <div className={`a-toast${toast ? ' show' : ''}`} role="status" aria-live="polite">{toast}</div>
    </div>
  )
}

/* ============================================================== fragments */

function Icon({ d, w = 2 }: { d: string; w?: number }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
  )
}

function NavBtn({ on, go, label, icon, count }: {
  on: boolean; go: () => void; label: string; icon: string; count?: number
}) {
  return (
    <button className="a-nav" aria-current={on ? 'page' : undefined} onClick={go}>
      <Icon d={icon} />{label}
      {count !== undefined && <span className="a-count">{count.toLocaleString()}</span>}
    </button>
  )
}

function Pill({ status }: { status: string }) {
  const k = status === 'published' || status === 'confirmed' || status === 'won' ? 'live'
    : status === 'draft' || status === 'pending' ? 'draft'
    : status === 'scheduled' || status === 'new' ? 'sched'
    : status === 'spam' || status === 'lost' || status === 'bounced' ? 'bad' : 'off'
  return <span className={`a-pill ${k}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
}

/** Shown in place of a list that could not be loaded. A network blip is not a
 *  reason to lose the screen — it is a reason to offer a second go. */
function Retry({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="a-err" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ flex: 1 }}>{error}</span>
      <button className="a-btn sm" onClick={onRetry}>Try again</button>
    </div>
  )
}

function Empty({ children }: { children: React.ReactNode }) {
  return <tr><td colSpan={9} style={{ color: 'var(--a-muted)' }}>{children}</td></tr>
}

function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <div className="a-tablewrap"><div className="a-scroll"><table>
      <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
      <tbody>{children}</tbody>
    </table></div></div>
  )
}

/* ================================================================== views */

function Dashboard({ counts, onOpen, onNew }: { counts: Counts; onOpen: (id: number) => void; onNew: () => void }) {
  const [recent, setRecent] = useState<PostRow[]>([])
  useEffect(() => {
    void getJSON<{ posts: PostRow[] }>('/posts').then((r) => { if (r.ok) setRecent(r.data.posts.slice(0, 6)) })
  }, [])

  return (
    <main className="a-sheet">
      <div className="a-tiles">
        <Tile k="Published" v={counts.published} n="Live on the site" />
        <Tile k="Drafts" v={counts.draft} n="Not visible to anyone" />
        <Tile k="Scheduled" v={counts.scheduled} n="Waiting for their date" />
        <Tile k="Subscribers" v={counts.subscribers} n="Confirmed and pending" />
      </div>
      <h2 className="a-h2">Recently edited</h2>
      <Table head={['Post', 'Status', 'Category', 'Updated']}>
        {recent.length === 0 && <Empty>No posts yet. <button className="a-link" onClick={onNew}>Write the first one.</button></Empty>}
        {recent.map((p) => (
          <tr key={p.id} className="a-click" onClick={() => onOpen(p.id)}>
            <td><span className="a-ttl">{p.title || 'Untitled'}</span><span className="a-slug">/{p.slug}/</span></td>
            <td><Pill status={p.status} /></td>
            <td>{p.category ?? '—'}</td>
            <td>{when(p.updated_at)}</td>
          </tr>
        ))}
      </Table>
    </main>
  )
}

function Tile({ k, v, n }: { k: string; v: number; n: string }) {
  return <div className="a-tile"><div className="k">{k}</div><div className="v a-tnum">{v.toLocaleString()}</div><div className="n">{n}</div></div>
}

type PostRow = {
  id: number; slug: string; title: string; status: string; updated_at: string
  category: string | null; author: string | null; author_id: number | null; seo_ready: boolean
}

function Posts({ onOpen, canDelete, role, userId, onToast, onChanged }: {
  onOpen: (id: number) => void
  canDelete: boolean
  role: Role
  userId: number
  onToast: (m: string) => void
  onChanged: () => void
}) {
  const [rows, setRows] = useState<PostRow[]>([])
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [range, setRange] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [removing, setRemoving] = useState<PostRow | null>(null)
  const [failed, setFailed] = useState('')

  const reload = useCallback(() => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (status) params.set('status', status)
    if (range) {
      params.set('range', range)
      // A half-filled custom range is a legitimate question — "anything since
      // the first" — so only the empty box is left out, not the whole filter.
      if (range === 'custom') { if (from) params.set('from', from); if (to) params.set('to', to) }
    }
    return getJSON<{ posts: PostRow[] }>('/posts', params).then((r) => {
      if (r.ok) { setRows(r.data.posts ?? []); setFailed('') } else setFailed(r.error)
    })
  }, [q, status, range, from, to])

  useEffect(() => {
    const t = setTimeout(() => { void reload() }, 200)
    return () => clearTimeout(t)
  }, [reload])

  /* An author may bin their own draft and nothing else. They cannot unpublish,
     so letting them delete a published post would hand them the same power
     through a door with no warning on it. The endpoint enforces this too. */
  const mayDelete = (p: PostRow) =>
    canDelete || (role === 'author' && p.status === 'draft' && p.author_id === userId)

  return (
    <main className="a-sheet">
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
        <span className="a-search">
          <Icon d="M11 4a7 7 0 1 1-.01 0M20 20l-3.5-3.5" />
          <input className="a-inp" type="search" placeholder="Search posts and slugs"
            aria-label="Search posts" value={q} onChange={(e) => setQ(e.target.value)} />
        </span>
        <select className="a-inp" style={{ width: 'auto' }} aria-label="Filter by status"
          value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
        </select>
        {/* Dates read published_at for anything published and updated_at
            otherwise — "last 7 days" means when the post last mattered, which
            is the question people are actually asking. */}
        <select className="a-inp" style={{ width: 'auto' }} aria-label="Filter by date"
          value={range} onChange={(e) => setRange(e.target.value)}>
          <option value="">Any date</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 3 months</option>
          <option value="365d">Last 12 months</option>
          <option value="custom">Between…</option>
        </select>
        {range === 'custom' && (
          <span className="a-daterange">
            <input className="a-inp" type="date" aria-label="From" value={from} max={to || undefined}
              onChange={(e) => setFrom(e.target.value)} />
            <span className="a-hint">to</span>
            <input className="a-inp" type="date" aria-label="To" value={to} min={from || undefined}
              onChange={(e) => setTo(e.target.value)} />
          </span>
        )}
        {(status || range || q) && (
          <button className="a-btn sm" onClick={() => { setQ(''); setStatus(''); setRange(''); setFrom(''); setTo('') }}>
            Clear filters
          </button>
        )}
      </div>
      {failed && <Retry error={failed} onRetry={() => void reload()} />}
      <Table head={['Post', 'Status', 'Category', 'Author', 'Updated', 'SEO', '']}>
        {rows.length === 0 && !failed && <Empty>Nothing matches that.</Empty>}
        {rows.map((p) => (
          <tr key={p.id} className="a-click" onClick={() => onOpen(p.id)}>
            <td><span className="a-ttl">{p.title || 'Untitled'}</span><span className="a-slug">/{p.slug}/</span></td>
            <td><Pill status={p.status} /></td>
            <td>{p.category ?? '—'}</td>
            <td>{p.author ?? '—'}</td>
            <td>{when(p.updated_at)}</td>
            <td>{p.seo_ready ? <span className="a-pill live">Ready</span> : <span className="a-pill draft">No meta</span>}</td>
            <td className="a-rowacts">
              {mayDelete(p) && (
                /* stopPropagation, because the row itself opens the post. Without
                   it, "delete" would also load the thing being deleted. */
                <button className="a-icobtn stop" title={`Delete ${p.title || 'this post'}`}
                  aria-label={`Delete ${p.title || 'this post'}`}
                  onClick={(e) => { e.stopPropagation(); setRemoving(p) }}>
                  <Icon d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v6M14 11v6" w={1.7} />
                </button>
              )}
            </td>
          </tr>
        ))}
      </Table>

      {removing && (
        <DeletePost post={removing} onCancel={() => setRemoving(null)}
          onDone={(msg) => { setRemoving(null); onToast(msg); void reload(); onChanged() }} />
      )}
    </main>
  )
}

/**
 * Deleting a post, in one or two steps.
 *
 * A draft has no address, so it is one question. A PUBLISHED post is a live URL
 * that other sites, Google and old newsletters already point at, so deleting it
 * without saying where those visitors should go is how a replatform loses
 * traffic it spent years earning (CLAUDE.md rule 6). The endpoint refuses to
 * guess; this is the screen that asks.
 */
function DeletePost({ post, onCancel, onDone }: {
  post: PostRow; onCancel: () => void; onDone: (msg: string) => void
}) {
  const [to, setTo] = useState('')
  const [accept404, setAccept404] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const live = post.status === 'published'

  async function go() {
    setBusy(true); setError('')
    const res = await fetch(api(`/posts/${post.id}`), {
      method: 'DELETE', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ redirect_to: to.trim(), accept404 }),
    })
    const data = await res.json().catch(() => ({}))
    setBusy(false)
    if (!res.ok) { setError(data.error === 'published' ? 'Say where its address should go first.' : (data.error ?? 'Could not delete it.')); return }
    onDone(data.redirected ? `Deleted — /${post.slug}/ now redirects to ${data.redirected}` : `“${post.title || 'Untitled'}” deleted`)
  }

  if (!live) {
    return (
      <ConfirmDialog title={`Delete “${post.title || 'Untitled'}”?`} onCancel={onCancel} onConfirm={go}>
        <p>It is a draft, so nothing on the site changes. The post and its saved versions go for good.</p>
        {error && <div className="a-err">{error}</div>}
      </ConfirmDialog>
    )
  }

  const ready = accept404 || to.trim().length > 0
  return (
    <Dialog
      title={`Delete “${post.title || 'Untitled'}”?`}
      onClose={onCancel}
      intro={<>This post is <b>live</b> at <span className="a-mono">/{post.slug}/</span>. Anything linking to
        that address — other pages, Google, a newsletter somebody sent last year — has to land somewhere.</>}
      footer={<>
        <button className="a-btn" onClick={onCancel} disabled={busy}>Cancel</button>
        <button className="a-btn stop" disabled={busy || !ready} onClick={() => void go()}>
          {busy ? 'Deleting…' : 'Delete post'}
        </button>
      </>}
    >
      <div className="a-stack">
        <div className="a-field">
          <label htmlFor="redir">Send its visitors to</label>
          <input id="redir" className="a-inp a-mono" placeholder="/blog/" value={to} disabled={accept404}
            onChange={(e) => { setTo(e.target.value); setError('') }} />
          <p className="a-hint">A permanent redirect (301) is written for you, and any rule that pointed at
            this post is repointed too, so you never get a chain.</p>
        </div>
        <label className="a-check">
          <input type="checkbox" checked={accept404}
            onChange={(e) => { setAccept404(e.target.checked); if (e.target.checked) setTo('') }} />
          <span>No redirect — this address should stop existing.<br />
            <span className="a-hint">Only right when the page should never have been published.</span></span>
        </label>
        {error && <div className="a-err">{error}</div>}
      </div>
    </Dialog>
  )
}

/**
 * Categories.
 *
 * A category's slug is a public address — /blog/<slug>/ — which is why renaming
 * one is not the same as retitling it, and why the endpoint refuses to move a
 * slug out from under a landing page that has been built. None of the ten have
 * pages yet, so today everything here is free; the guard is for the week after
 * they exist.
 */
function Categories({ canEdit, onToast, onChanged }: {
  canEdit: boolean; onToast: (m: string) => void; onChanged: () => void
}) {
  const [rows, setRows] = useState<CategoryRow[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<CategoryRow | null>(null)
  const [removing, setRemoving] = useState<CategoryRow | null>(null)
  const [orphans, setOrphans] = useState<number | null>(null)
  const [failed, setFailed] = useState('')

  const reload = useCallback(async () => {
    const r = await getJSON<{ categories: CategoryRow[] }>('/categories')
    if (r.ok) { setRows(r.data.categories ?? []); setFailed('') } else setFailed(r.error)
    setLoading(false)
  }, [])
  useEffect(() => { void reload() }, [reload])

  async function save(input: Partial<CategoryRow>, id?: number) {
    const res = await fetch(api('/categories'), {
      method: id ? 'PATCH' : 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify(id ? { ...input, id } : input),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) return data.error ?? 'Could not save that.'
    await reload(); onChanged()
    setAdding(false); setEditing(null)
    onToast(id ? 'Category updated' : `${data.category.name} added`)
    return null
  }

  async function doDelete(row: CategoryRow, force: boolean) {
    const res = await fetch(api('/categories', new URLSearchParams(
      force ? { id: String(row.id), force: '1' } : { id: String(row.id) })), { method: 'DELETE' })
    const data = await res.json().catch(() => ({}))
    if (res.status === 409 && data.error === 'in-use') { setOrphans(data.orphans); return }
    if (!res.ok) { onToast(data.error ?? 'Could not delete that.'); setRemoving(null); return }
    await reload(); onChanged()
    setRemoving(null); setOrphans(null)
    onToast(data.orphans
      ? `${row.name} deleted — ${data.orphans} post${data.orphans === 1 ? '' : 's'} moved to no category`
      : `${row.name} deleted`)
  }

  return (
    <main className="a-sheet">
      <div className="a-note"><span>
        <b>These are the categories in the Blogs menu.</b> Each one needs a landing page
        before its menu link stops being dead — that is still open from the navbar work.
        The slug is the public address, so it is treated more carefully than the name.
      </span></div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <span className="a-spacer" />
        {canEdit && (
          <button className="a-btn p" onClick={() => setAdding(true)}>
            <Icon d="M12 5v14M5 12h14" w={2.2} /> Add category
          </button>
        )}
      </div>

      {failed && <Retry error={failed} onRetry={() => void reload()} />}
      <Table head={['Category', 'Address', 'Posts', 'Landing page', '']}>
        {loading && <Empty>Loading…</Empty>}
        {!loading && rows.length === 0 && <Empty>No categories yet.</Empty>}
        {rows.map((c) => (
          <tr key={c.id} className={c.parent_id ? 'a-sub' : undefined}>
            <td>
              <span className="a-ttl">
                {c.parent_id && <span className="a-subtick" aria-hidden="true" />}
                {c.name}
              </span>
              {c.parent_id
                ? <span className="a-slug">under {c.parent_name}</span>
                : c.description && <span className="a-slug">{c.description}</span>}
            </td>
            <td className="a-mono">/blog/{c.slug}/</td>
            <td className="a-tnum">
              {c.post_count === 0
                ? <span style={{ color: 'var(--a-muted)' }}>—</span>
                : <><span className="a-ttl">{c.post_count}</span>
                    {c.published_count > 0 && <span className="a-slug">{c.published_count} published</span>}</>}
            </td>
            <td>{c.landing_built ? <span className="a-pill live">Built</span> : <span className="a-pill bad">Not built</span>}</td>
            <td className="a-rowacts">
              {canEdit && <>
                <button className="a-icobtn" title={`Edit ${c.name}`} aria-label={`Edit ${c.name}`}
                  onClick={() => setEditing(c)}>
                  <Icon d="M4 20h4l10-10a2.8 2.8 0 0 0-4-4L4 16z" w={1.7} />
                </button>
                <button className="a-icobtn stop" title={`Delete ${c.name}`} aria-label={`Delete ${c.name}`}
                  onClick={() => { setOrphans(null); setRemoving(c) }}>
                  <Icon d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v6M14 11v6" w={1.7} />
                </button>
              </>}
            </td>
          </tr>
        ))}
      </Table>

      {(adding || editing) && (
        <CategoryDialog row={editing} all={rows} onCancel={() => { setAdding(false); setEditing(null) }}
          onSave={(input) => save(input, editing?.id)} />
      )}

      {removing && (
        <ConfirmDialog
          title={orphans === null ? `Delete ${removing.name}?` : `${removing.name} is in use`}
          confirmLabel={orphans === null ? 'Delete' : 'Delete it anyway'}
          onCancel={() => { setRemoving(null); setOrphans(null) }}
          onConfirm={() => doDelete(removing, orphans !== null)}
        >
          {orphans === null
            ? <p>The category disappears from the Blogs menu. No posts are deleted.</p>
            : <p><b>{orphans} post{orphans === 1 ? '' : 's'}</b> {orphans === 1 ? 'is' : 'are'} filed
                under it. They are not deleted — they move to “no category”, where you can refile
                them from the Posts screen.</p>}
        </ConfirmDialog>
      )}
    </main>
  )
}

function CategoryDialog({ row, all, onCancel, onSave }: {
  row: CategoryRow | null
  all: CategoryRow[]
  onCancel: () => void
  onSave: (input: Partial<CategoryRow>) => Promise<string | null>
}) {
  const [name, setName] = useState(row?.name ?? '')
  const [slug, setSlug] = useState(row?.slug ?? '')
  const [touched, setTouched] = useState(Boolean(row))
  const [description, setDescription] = useState(row?.description ?? '')
  const [built, setBuilt] = useState(row?.landing_built ?? false)
  const [parentId, setParentId] = useState<number | null>(row?.parent_id ?? null)
  /* '' = none, a number = an existing main category, NEW = one being typed here.
     The third option exists because the alternative is telling somebody to
     cancel, add a main category, and come back — for a thing they are already
     halfway through adding. */
  const [newParent, setNewParent] = useState('')
  const [makingParent, setMakingParent] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  /* Only a top-level category can be a parent, and nothing can be its own. One
     level is all the API allows — see the note in the categories endpoint. */
  const parents = all.filter((c) => !c.parent_id && c.id !== row?.id)
  const hasChildren = all.some((c) => c.parent_id === row?.id)
  const isSub = makingParent || parentId !== null

  // The slug follows the name until somebody edits it by hand, and then it stops
  // — otherwise a deliberate address gets overwritten by a typo in the title.
  const suggested = slugify(touched ? slug : name)

  async function go() {
    setBusy(true); setError('')

    // A main category typed in here is created first, then the sub-category is
    // hung off it. Two writes, one button — which is the whole point.
    let parent = parentId
    if (makingParent) {
      const res = await fetch(api('/categories'), {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name: newParent.trim() }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) { setBusy(false); setError(data.error ?? 'Could not add that main category.'); return }
      parent = data.category.id
    }

    const err = await onSave({ name, slug: suggested, description, landing_built: built, parent_id: parent })
    setBusy(false)
    if (err) setError(err)
  }

  return (
    <Dialog
      title={row ? `Edit ${row.name}` : isSub ? 'Add a sub-category' : 'Add a category'}
      onClose={onCancel}
      intro={<>Categories are the groups in the Blogs menu. The address is what a reader sees
        in the URL bar, so keep it short and leave it alone once the page is live.</>}
      footer={<>
        <button className="a-btn" onClick={onCancel} disabled={busy}>Cancel</button>
        <button className="a-btn p" onClick={() => void go()}
          disabled={busy || !name.trim() || !suggested || (makingParent && !newParent.trim())}>
          {busy ? 'Saving…' : row ? 'Save changes' : isSub ? 'Add sub-category' : 'Add category'}
        </button>
      </>}
    >
      <div className="a-stack">
        <div className="a-field">
          <label htmlFor="cat-parent">Main category</label>
          <select id="cat-parent" className="a-inp" disabled={hasChildren}
            value={makingParent ? '__new' : (parentId ?? '')}
            onChange={(e) => {
              setError('')
              if (e.target.value === '__new') { setMakingParent(true); setParentId(null) }
              else { setMakingParent(false); setNewParent(''); setParentId(e.target.value ? Number(e.target.value) : null) }
            }}>
            <option value="">None — this is a main category</option>
            {parents.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            <option value="__new">+ Add a new main category…</option>
          </select>
          <p className="a-hint">
            {hasChildren
              ? 'This one has sub-categories under it, so it has to stay a main category.'
              : isSub
                ? 'It will appear indented under that category in the Blogs menu.'
                : 'Leave as None for a top-level entry in the Blogs menu.'}
          </p>
        </div>

        {makingParent && (
          <div className="a-field a-nested">
            <label htmlFor="cat-newparent">New main category name</label>
            <input id="cat-newparent" className="a-inp" value={newParent} autoFocus
              placeholder="Battery &amp; Hazardous Disposal"
              onChange={(e) => { setNewParent(e.target.value); setError('') }} />
            <p className="a-hint">
              Created first, at <span className="a-mono">/blog/{slugify(newParent) || '…'}/</span>,
              then the sub-category below goes under it.
            </p>
          </div>
        )}

        <div className="a-field">
          <label htmlFor="cat-name">{isSub ? 'Sub-category name' : 'Category name'}</label>
          <input id="cat-name" className="a-inp" value={name}
            placeholder={isSub ? 'Lithium Batteries' : 'Battery & Hazardous Disposal'}
            onChange={(e) => { setName(e.target.value); setError('') }} />
        </div>
        <div className="a-field">
          <label htmlFor="cat-slug">Address</label>
          <div className="a-prefixed">
            <span className="a-mono">/blog/</span>
            <input id="cat-slug" className="a-inp a-mono" value={touched ? slug : suggested}
              onChange={(e) => { setTouched(true); setSlug(e.target.value); setError('') }} />
            <span className="a-mono">/</span>
          </div>
          {row?.landing_built && <p className="a-hint">This one has a live page, so its address is locked. Moving it needs a redirect.</p>}
        </div>
        <div className="a-field">
          <label htmlFor="cat-desc">Description <span className="a-hint">optional</span></label>
          <textarea id="cat-desc" className="a-inp a-ta" rows={2} value={description}
            placeholder="What belongs in here — for the team, not for the site."
            onChange={(e) => setDescription(e.target.value)} />
        </div>
        <label className="a-check">
          <input type="checkbox" checked={built} onChange={(e) => setBuilt(e.target.checked)} />
          <span>Its landing page is built.<br />
            <span className="a-hint">Tick this once /blog/{suggested || '…'}/ actually answers. It turns the menu link live.</span></span>
        </label>
        {error && <div className="a-err">{error}</div>}
      </div>
    </Dialog>
  )
}

type SubRow = { id: number; email: string; status: string; source_page: string | null; source_type: string; consent_at: string }

function Subscribers() {
  const [rows, setRows] = useState<SubRow[]>([])
  const [q, setQ] = useState('')
  useEffect(() => {
    const t = setTimeout(() => {
      void getJSON<{ subscribers: SubRow[] }>('/subscribers', new URLSearchParams({ q }))
        .then((r) => { if (r.ok) setRows(r.data.subscribers ?? []) })
    }, 200)
    return () => clearTimeout(t)
  }, [q])

  return (
    <main className="a-sheet">
      <div className="a-note"><span>
        <b>Consent is stored per person, with the page and the timestamp.</b> Someone who
        asked for a quote is not on this list unless they ticked the box separately — the
        two never merge.
      </span></div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
        <span className="a-search">
          <Icon d="M11 4a7 7 0 1 1-.01 0M20 20l-3.5-3.5" />
          <input className="a-inp" type="search" placeholder="Search by email" aria-label="Search subscribers"
            value={q} onChange={(e) => setQ(e.target.value)} />
        </span>
      </div>
      <Table head={['Email', 'Status', 'Signed up from', 'Consent given']}>
        {rows.length === 0 && <Empty>Nobody on the list yet.</Empty>}
        {rows.map((s) => (
          <tr key={s.id}>
            <td className="a-mono">{s.email}</td>
            <td><Pill status={s.status} /></td>
            <td>{s.source_page ?? s.source_type}</td>
            <td>{when(s.consent_at)}</td>
          </tr>
        ))}
      </Table>
    </main>
  )
}

type LeadRow = { id: number; type: string; name: string | null; email: string | null; company: string | null; message: string | null; status: string; created_at: string }

function Leads({ onToast }: { onToast: (m: string) => void }) {
  const [rows, setRows] = useState<LeadRow[]>([])
  const reload = useCallback(() => {
    void getJSON<{ leads: LeadRow[] }>('/leads').then((r) => { if (r.ok) setRows(r.data.leads ?? []) })
  }, [])
  useEffect(reload, [reload])

  async function setStatus(id: number, status: string) {
    const r = await sendJSON('/leads', 'PATCH', { id, status })
    onToast(r.ok ? 'Enquiry updated' : r.error)
    reload()
  }

  return (
    <main className="a-sheet">
      <Table head={['From', 'Type', 'What they want', 'Received', 'Status']}>
        {rows.length === 0 && <Empty>No enquiries yet. They arrive here from the contact and quote forms.</Empty>}
        {rows.map((l) => (
          <tr key={l.id}>
            <td><span className="a-ttl">{l.name ?? l.email ?? 'Anonymous'}</span>
              {l.company && <span className="a-slug">{l.company}</span>}</td>
            <td>{l.type}</td>
            <td>{l.message ?? '—'}</td>
            <td>{when(l.created_at)}</td>
            <td>
              <select className="a-inp" style={{ height: 28, fontSize: 12, width: 'auto' }}
                value={l.status} onChange={(e) => void setStatus(l.id, e.target.value)} aria-label="Status">
                {['new', 'contacted', 'qualified', 'won', 'lost', 'spam'].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </td>
          </tr>
        ))}
      </Table>
    </main>
  )
}

/**
 * Settings is now the social links and nothing else.
 *
 * !! EVERYTHING SEO MOVED TO THE SEO SECTION on Asim's instruction, 17 Sep 2026:
 * site name, title template, the AI crawler switches and the redirect table are
 * all under SEO -> Defaults and SEO -> Redirects. Two places to set a title
 * template is how a site ends up with two title templates, so they are not
 * mirrored here — this screen links there instead.
 */
function Settings({ social, canEdit, onToast, onGoSeo }: {
  social: SocialLink[]; canEdit: boolean; onToast: (m: string) => void; onGoSeo: () => void
}) {
  const [links, setLinks] = useState(social)

  async function save() {
    const r = await sendJSON('/settings', 'PUT',
      { settings: {}, social: links.map((l) => ({ id: l.id, url: l.url })) })
    onToast(r.ok ? 'Settings saved' : r.error)
  }

  return (
    <main className="a-sheet">
      <div className="a-note"><span>
        <b>Looking for titles, descriptions, robots or redirects?</b> They are in{' '}
        <button className="a-link" onClick={onGoSeo}>SEO</button> now — the whole set, on one screen,
        for whoever owns it.
      </span></div>

      <div className="a-note"><span>
        <b>Whatever you put here is what the footer and header icons point at.</b>{' '}
        Leave a link empty and that icon disappears from the site rather than linking nowhere.
      </span></div>
      <div className="a-social">
        {links.map((l) => (
          <div className="a-socialrow" key={l.id}>
            <span className="plat"><span className="ic">
              <Icon d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7L12.5 19.5" />
            </span>{l.platform}</span>
            <input className="a-inp a-mono" value={l.url} aria-label={`${l.platform} link`}
              placeholder={`https://…/recycletechnologies`} disabled={!canEdit}
              onChange={(e) => setLinks((ls) => ls.map((x) => (x.id === l.id ? { ...x, url: e.target.value } : x)))} />
            <button className="a-btn sm" disabled={!canEdit}
              onClick={() => setLinks((ls) => ls.map((x) => (x.id === l.id ? { ...x, url: '' } : x)))}>Clear</button>
          </div>
        ))}
      </div>
      {canEdit && <div style={{ marginTop: 16 }}><button className="a-btn p" onClick={() => void save()}>Save links</button></div>}
    </main>
  )
}

/* ================================================================== login */

function Login({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true); setError('')
    const res = await fetch(api('/session'), {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    setBusy(false)
    if (!res.ok) { setError(data.error ?? 'Could not sign in.'); return }
    onDone()
  }

  return (
    <div className="a-login">
      <form className="a-logincard" onSubmit={submit}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="Recycle Technologies" width={190} height={45} />
        <h1>Sign in to Publisher</h1>
        <p className="a-hint">Recycle Technologies content team</p>
        {error && <div className="a-err">{error}</div>}
        <div className="a-stack">
          {/* type="text", not "email": accounts may sign in with a short
              username — "admin" is one — and the browser refuses to submit a
              type="email" box that has no @ in it. The server treats whatever
              arrives as the users.email value either way. */}
          <div className="a-field">
            <label htmlFor="email">Email or username</label>
            <input id="email" className="a-inp" type="text" autoComplete="username" required
              autoCapitalize="none" spellCheck={false}
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="a-field">
            <label htmlFor="password">Password</label>
            <input id="password" className="a-inp" type="password" autoComplete="current-password" required
              value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="a-btn p" style={{ width: '100%', justifyContent: 'center' }} disabled={busy}>
            {busy ? 'Checking…' : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  )
}

/**
 * Shown when the database is not reachable. A blank login box with "something
 * went wrong" costs an hour; naming the actual missing piece costs a minute.
 */
function SetupHelp({ error }: { error: string }) {
  return (
    <div className="a-login">
      <div className="a-logincard" style={{ maxWidth: 520 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="Recycle Technologies" width={190} height={45} />
        <h1>Not set up yet</h1>
        <div className="a-err" style={{ textAlign: 'left' }}>{error}</div>
        <p style={{ fontSize: 13, lineHeight: 1.6 }}>
          Run <code className="a-mono">npm run db:setup</code> in the project folder. It finds
          PostgreSQL, creates the database, applies the schema and asks you to create the first
          administrator. If PostgreSQL is not installed it tells you the one command that installs it.
        </p>
        <p className="a-hint">See SETUP-ADMIN.md for the whole sequence.</p>
      </div>
    </div>
  )
}

/* ================================================================ helpers */

function when(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  const mins = Math.round((Date.now() - d.getTime()) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  if (mins < 60 * 24) return `${Math.round(mins / 60)} hours ago`
  if (mins < 60 * 24 * 7) return `${Math.round(mins / (60 * 24))} days ago`
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
