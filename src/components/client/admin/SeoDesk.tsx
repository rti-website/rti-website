'use client'

import { useEffect, useMemo, useState } from 'react'
import { getJSON, sendJSON } from './api'
import { Empty, Icon, Retry, Table } from './Bits'
import {
  analyse, lengthStatus, TITLE_MAX, DESCRIPTION_MAX, DESCRIPTION_MIN,
  type Analysis, type Check, type CheckStatus,
} from '@/lib/seo-analysis'

/**
 * The SEO desk — every field in PRJ/002 "SEO Fields for CMS" (17 Sept 2026),
 * in the document's own five groups, plus the site-wide defaults and the
 * redirect table that used to sit under Settings.
 *
 * WHY IT IS ITS OWN SECTION AND NOT A PANEL IN THE POST EDITOR: the person
 * doing this job works across the archive, not down one article. They arrive
 * wanting "every post with no meta description" or "everything scoring under
 * 50", fix twenty of them, and leave. The post editor keeps its own SEO summary
 * for the writer; this is the same data with the whole list in front of it.
 *
 * WHY IT IS A CLIENT COMPONENT (CLAUDE.md rule 7): it is a form with live
 * analysis. Every keystroke in the title box moves a pixel counter, recolours
 * nine checks and redraws the Google preview. Round-tripping that to the server
 * is what makes those panels feel broken in other tools.
 *
 * The analysis itself is in src/lib/seo-analysis.ts, deliberately outside this
 * file: the same function scores a post here and when the score is stored.
 */

/* ------------------------------------------------------------------ types */

type PostRow = {
  id: number; slug: string; title: string; status: string; source: string
  meta_title: string; meta_description: string; focus_keyword: string
  secondary_keywords: string[] | null
  canonical_url: string | null; robots_index: boolean; robots_follow: boolean
  in_sitemap: boolean; redirect_to: string | null; redirect_type: number | null
  schema_type: string | null
  seo_score: number | null; readability_score: number | null; seo_checked_at: string | null
  word_count: number; published_at: string | null; updated_at: string
  category_name: string | null
}

type Index = {
  posts: PostRow[]
  settings: Record<string, unknown>
  redirects: { id: number; from_path: string; to_path: string; status_code: number; source: string; hits: string }[]
  duplicateKeywords: Record<string, number>
}

type FullPost = Record<string, unknown> & { id: number; slug: string; title: string; content_html: string }

const SCHEMA_TYPES = [
  'Article', 'BlogPosting', 'NewsArticle', 'WebPage', 'FAQPage', 'HowTo',
  'Product', 'Review', 'Recipe', 'Event', 'Organization', 'Person', 'LocalBusiness',
] as const

const CARD_TYPES = [
  { id: 'summary_large_image', label: 'Summary with large image' },
  { id: 'summary', label: 'Summary' },
  { id: 'app', label: 'App' },
  { id: 'player', label: 'Player' },
] as const

const SITE = 'https://www.recycletechnologies.com'

/* ------------------------------------------------------------------ shell */

export function SeoDesk({ canEdit, onToast }: { canEdit: boolean; onToast: (m: string) => void }) {
  const [tab, setTab] = useState<'content' | 'defaults' | 'redirects'>('content')
  const [data, setData] = useState<Index | null>(null)
  const [error, setError] = useState('')
  const [openId, setOpenId] = useState<number | null>(null)

  async function load() {
    const r = await getJSON<Index>('/seo')
    if (r.ok) { setData(r.data); setError('') } else setError(r.error)
  }
  useEffect(() => { void load() }, [])

  if (openId !== null) {
    return (
      <SeoEditor
        postId={openId} canEdit={canEdit} onToast={onToast}
        onBack={() => { setOpenId(null); void load() }}
      />
    )
  }

  return (
    <main className="a-sheet">
      <div className="a-tabs" role="tablist">
        {([['content', 'Content'], ['defaults', 'Defaults'], ['redirects', 'Redirects']] as const).map(([t, label]) => (
          <button key={t} className="a-tab" role="tab" aria-selected={tab === t} onClick={() => setTab(t)}>
            {label}
          </button>
        ))}
      </div>

      {error && <Retry error={error} onRetry={() => void load()} />}
      {!data && !error && <p className="a-hint">Loading…</p>}

      {data && tab === 'content' && (
        <SeoList posts={data.posts} dupes={data.duplicateKeywords} onOpen={setOpenId} />
      )}
      {data && tab === 'defaults' && (
        <SeoDefaults values={data.settings} canEdit={canEdit} onToast={onToast} onSaved={() => void load()} />
      )}
      {data && tab === 'redirects' && <Redirects rows={data.redirects} />}
    </main>
  )
}

/* ------------------------------------------------------------------- list */

type Filter = 'all' | 'no-description' | 'no-keyword' | 'noindex' | 'weak' | 'duplicate' | 'unchecked'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Everything' },
  { id: 'no-description', label: 'No meta description' },
  { id: 'no-keyword', label: 'No focus keyword' },
  { id: 'duplicate', label: 'Duplicate keyword' },
  { id: 'weak', label: 'Score under 50' },
  { id: 'noindex', label: 'Not indexed' },
  { id: 'unchecked', label: 'Never checked' },
]

function SeoList({ posts, dupes, onOpen }: {
  posts: PostRow[]; dupes: Record<string, number>; onOpen: (id: number) => void
}) {
  const [filter, setFilter] = useState<Filter>('all')
  const [term, setTerm] = useState('')

  const shown = useMemo(() => {
    const t = term.trim().toLowerCase()
    return posts.filter((p) => {
      if (t && !`${p.title} ${p.slug} ${p.focus_keyword ?? ''}`.toLowerCase().includes(t)) return false
      switch (filter) {
        case 'no-description': return !(p.meta_description ?? '').trim()
        case 'no-keyword': return !(p.focus_keyword ?? '').trim()
        case 'duplicate': return Boolean(dupes[(p.focus_keyword ?? '').toLowerCase()])
        case 'weak': return p.seo_score !== null && p.seo_score < 50
        case 'noindex': return !p.robots_index
        case 'unchecked': return p.seo_checked_at === null
        default: return true
      }
    })
  }, [posts, filter, term, dupes])

  const counts = useMemo(() => ({
    noDescription: posts.filter((p) => !(p.meta_description ?? '').trim()).length,
    noKeyword: posts.filter((p) => !(p.focus_keyword ?? '').trim()).length,
    noindex: posts.filter((p) => !p.robots_index).length,
  }), [posts])

  return (
    <>
      <div className="a-note"><span>
        <b>Everything published, and everything still a draft.</b>{' '}
        {counts.noDescription} with no meta description, {counts.noKeyword} with no focus keyword,
        {' '}{counts.noindex} set to noindex. Open any row to edit every SEO field on it.
        {' '}Scores are from the last check — opening a post recalculates it against the body as it stands now.
      </span></div>

      <div className="a-toolbar" style={{ marginBottom: 14 }}>
        <div className="a-search">
          <Icon d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3" />
          <input className="a-inp" placeholder="Search title, slug or keyword"
            value={term} onChange={(e) => setTerm(e.target.value)} aria-label="Search posts" />
        </div>
        <select className="a-inp" style={{ maxWidth: 230 }} value={filter}
          aria-label="Filter" onChange={(e) => setFilter(e.target.value as Filter)}>
          {FILTERS.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
        </select>
        <span className="a-spacer" />
        <span className="a-hint">{shown.length.toLocaleString()} of {posts.length.toLocaleString()}</span>
      </div>

      <Table head={['Post', 'Focus keyword', 'SEO', 'Reading', 'Robots', 'Checked', '']}>
        {shown.length === 0 && <Empty>Nothing matches that.</Empty>}
        {shown.map((p) => {
          const dupe = Boolean(dupes[(p.focus_keyword ?? '').toLowerCase()])
          return (
            <tr key={p.id}>
              <td>
                <button className="a-link" onClick={() => onOpen(p.id)} style={{ textAlign: 'left' }}>
                  {p.meta_title || p.title}
                </button>
                <div className="a-mono" style={{ color: 'var(--a-muted)' }}>/{p.slug}/</div>
                {!(p.meta_description ?? '').trim() && (
                  <span className="a-pill draft" style={{ marginTop: 4 }}>No description</span>
                )}
              </td>
              <td>
                {(p.focus_keyword ?? '').trim()
                  ? <>{p.focus_keyword}{dupe && <div><span className="a-pill bad">Also used elsewhere</span></div>}</>
                  : <span style={{ color: 'var(--a-muted)' }}>—</span>}
              </td>
              <td><Score value={p.seo_score} /></td>
              <td><Score value={p.readability_score} /></td>
              <td>
                {p.robots_index
                  ? <span className="a-pill live">Index</span>
                  : <span className="a-pill bad">Noindex</span>}
                {!p.robots_follow && <span className="a-pill off">Nofollow</span>}
              </td>
              <td className="a-mono" style={{ color: 'var(--a-muted)' }}>
                {p.seo_checked_at ? new Date(p.seo_checked_at).toISOString().slice(0, 10) : 'never'}
              </td>
              <td><button className="a-btn sm" onClick={() => onOpen(p.id)}>Edit SEO</button></td>
            </tr>
          )
        })}
      </Table>
    </>
  )
}

function Score({ value }: { value: number | null }) {
  if (value === null) return <span style={{ color: 'var(--a-muted)' }}>—</span>
  const k = value >= 75 ? 'live' : value >= 50 ? 'sched' : 'bad'
  return <span className={`a-pill ${k} a-tnum`}>{value}</span>
}

/* ----------------------------------------------------------------- editor */

function SeoEditor({ postId, canEdit, onBack, onToast }: {
  postId: number; canEdit: boolean; onBack: () => void; onToast: (m: string) => void
}) {
  const [post, setPost] = useState<FullPost | null>(null)
  const [usedBy, setUsedBy] = useState<string[]>([])
  const [error, setError] = useState('')
  const [dirty, setDirty] = useState(false)
  const [busy, setBusy] = useState(false)
  const [group, setGroup] = useState<'core' | 'social' | 'advanced' | 'schema'>('core')

  useEffect(() => {
    void (async () => {
      const r = await getJSON<{ post: FullPost; keywordUsedBy: string[] }>(`/seo/${postId}`)
      if (!r.ok) { setError(r.error); return }
      setPost(r.data.post); setUsedBy(r.data.keywordUsedBy); setError('')
    })()
  }, [postId])

  const str = (k: string) => String(post?.[k] ?? '')
  const bool = (k: string, fallback = true) => (post?.[k] === undefined || post?.[k] === null ? fallback : Boolean(post[k]))
  const field = (k: string, v: unknown) => { setPost((p) => (p ? { ...p, [k]: v } : p)); setDirty(true) }

  const analysis: Analysis | null = useMemo(() => {
    if (!post) return null
    return analyse({
      title: str('meta_title') || String(post.title ?? ''),
      metaDescription: str('meta_description'),
      slug: String(post.slug ?? ''),
      h1: String(post.title ?? ''),
      focusKeyword: str('focus_keyword'),
      secondaryKeywords: Array.isArray(post.secondary_keywords) ? post.secondary_keywords as string[] : [],
      html: String(post.content_html ?? ''),
      keywordUsedBy: usedBy,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post, usedBy])

  async function save() {
    if (!post || !analysis) return
    setBusy(true)
    const payload: Record<string, unknown> = {
      slug: post.slug,
      meta_title: str('meta_title'), meta_description: str('meta_description'),
      focus_keyword: str('focus_keyword'),
      secondary_keywords: Array.isArray(post.secondary_keywords) ? post.secondary_keywords : [],
      canonical_url: str('canonical_url'), breadcrumb_title: str('breadcrumb_title'),
      robots_index: bool('robots_index'), robots_follow: bool('robots_follow'),
      robots_archive: bool('robots_archive'), in_sitemap: bool('in_sitemap'),
      allow_ai_answers: bool('allow_ai_answers'),
      robots_max_snippet: post.robots_max_snippet ?? null,
      robots_image_preview: str('robots_image_preview') || null,
      robots_max_video: post.robots_max_video ?? null,
      redirect_to: str('redirect_to'), redirect_type: post.redirect_type ?? null,
      og_title: str('og_title'), og_description: str('og_description'), og_image_url: str('og_image_url'),
      twitter_title: str('twitter_title'), twitter_description: str('twitter_description'),
      twitter_image_url: str('twitter_image_url'), twitter_card: str('twitter_card') || null,
      schema_type: str('schema_type') || null, schema_headline: str('schema_headline'),
      schema_description: str('schema_description'), schema_image_url: str('schema_image_url'),
      schema_author: str('schema_author'), schema_publisher: str('schema_publisher'),
      schema_published_at: post.schema_published_at ?? null,
      schema_modified_at: post.schema_modified_at ?? null,
      schema_custom: str('schema_custom'),
      // Stored so the list can sort 307 posts without re-reading 307 bodies.
      seo_score: analysis.score, readability_score: analysis.readability,
    }
    const r = await sendJSON(`/seo/${postId}`, 'PUT', payload)
    setBusy(false)
    if (!r.ok) { onToast(r.error); return }
    setDirty(false)
    onToast('SEO saved')
  }

  if (error) return <main className="a-sheet"><Retry error={error} onRetry={onBack} /></main>
  if (!post || !analysis) return <main className="a-sheet"><p className="a-hint">Loading…</p></main>

  const titleShown = str('meta_title') || String(post.title ?? '')
  const descShown = str('meta_description')

  return (
    <main className="a-sheet">
      <div className="a-seohead">
        <button className="a-btn sm" onClick={onBack}>
          <Icon d="M19 12H5M12 19l-7-7 7-7" />Back to the list
        </button>
        <div className="a-seohead__t">
          <strong>{String(post.title ?? '')}</strong>
          <span className="a-mono">/{String(post.slug ?? '')}/</span>
        </div>
        <span className="a-spacer" />
        {post.source === 'wordpress' && (
          <span className="a-pill sched">Imported — rule 6 applies</span>
        )}
        {canEdit && (
          <button className="a-btn p" disabled={busy || !dirty} onClick={() => void save()}>
            {busy ? 'Saving…' : dirty ? 'Save SEO' : 'Saved'}
          </button>
        )}
      </div>

      {post.source === 'wordpress' && (
        <div className="a-note"><span>
          <b>This title and description are the live site&rsquo;s.</b> They were captured from the
          WordPress page during the import. Changing them changes what Google shows for a URL that
          already ranks, so treat that as a deliberate decision rather than a tidy-up.
        </span></div>
      )}

      <div className="a-seogrid">
        <div className="a-seomain">
          <div className="a-tabs" role="tablist">
            {([['core', 'Core'], ['social', 'Social'], ['advanced', 'Advanced'], ['schema', 'Schema']] as const)
              .map(([g, label]) => (
                <button key={g} className="a-tab" role="tab" aria-selected={group === g} onClick={() => setGroup(g)}>
                  {label}
                </button>
              ))}
          </div>

          {group === 'core' && (
            <div className="a-stack">
              <Text label="SEO Title" value={str('meta_title')} disabled={!canEdit}
                onChange={(v) => field('meta_title', v)}
                hint="What Google prints as the blue link. Empty falls back to the post title."
                count={{ n: titleShown.length, max: TITLE_MAX }} />

              <Area label="Meta Description" value={str('meta_description')} disabled={!canEdit}
                onChange={(v) => field('meta_description', v)}
                hint="The grey paragraph under the link. Google rewrites it when it does not answer the query."
                count={{ n: descShown.length, max: DESCRIPTION_MAX, min: DESCRIPTION_MIN }} />

              <Text label="Focus Keyword / Keyphrase" value={str('focus_keyword')} disabled={!canEdit}
                onChange={(v) => field('focus_keyword', v)}
                hint="The one phrase this page is trying to win. Everything in Analysis is measured against it." />

              <Chips label="Secondary Keywords / Keyphrases" disabled={!canEdit}
                values={Array.isArray(post.secondary_keywords) ? post.secondary_keywords as string[] : []}
                onChange={(v) => field('secondary_keywords', v)}
                hint="Variations worth tracking. They do not change the score." />

              <div className="a-field">
                <label htmlFor="seo-slug">SEO Slug</label>
                <div className="a-prefixed">
                  <span className="a-mono">/</span>
                  <input id="seo-slug" className="a-inp a-mono" value={String(post.slug ?? '')} disabled={!canEdit}
                    onChange={(e) => field('slug', e.target.value)} />
                  <span className="a-mono">/</span>
                </div>
                <p className="a-hint">
                  Changing this on a published post writes a 301 from the old address automatically,
                  and flattens any chain it would have created.
                </p>
              </div>

              <Text label="Canonical URL" value={str('canonical_url')} disabled={!canEdit} mono
                onChange={(v) => field('canonical_url', v)}
                hint="Leave empty unless this page is a duplicate of another. Then point it at the original." />

              <div className="a-field">
                <label>Robots Meta</label>
                <div className="a-switches">
                  <Switch on={bool('robots_index')} disabled={!canEdit} onToggle={(v) => field('robots_index', v)}
                    title="Robots Index" note="Off emits noindex — the page disappears from Google." />
                  <Switch on={bool('robots_follow')} disabled={!canEdit} onToggle={(v) => field('robots_follow', v)}
                    title="Robots Follow" note="Off tells crawlers to ignore every link on the page." />
                </div>
              </div>
            </div>
          )}

          {group === 'social' && (
            <div className="a-stack">
              <div className="a-note"><span>
                <b>X reads the Facebook tags when its own are missing.</b> Fill in the Facebook three
                and leave X empty unless it genuinely needs different words.
              </span></div>

              <Text label="Facebook Title" value={str('og_title')} disabled={!canEdit}
                onChange={(v) => field('og_title', v)} hint="og:title. Empty falls back to the SEO title." />
              <Area label="Facebook Description" value={str('og_description')} disabled={!canEdit}
                onChange={(v) => field('og_description', v)} hint="og:description." />
              <Text label="Facebook Image" value={str('og_image_url')} disabled={!canEdit} mono
                onChange={(v) => field('og_image_url', v)} hint="og:image. 1200x630 is the size that survives every crop." />

              <Text label="Twitter/X Title" value={str('twitter_title')} disabled={!canEdit}
                onChange={(v) => field('twitter_title', v)} />
              <Area label="Twitter/X Description" value={str('twitter_description')} disabled={!canEdit}
                onChange={(v) => field('twitter_description', v)} />
              <Text label="Twitter/X Image" value={str('twitter_image_url')} disabled={!canEdit} mono
                onChange={(v) => field('twitter_image_url', v)} />

              <div className="a-field">
                <label htmlFor="tw-card">Twitter/X Card Type</label>
                <select id="tw-card" className="a-inp" value={str('twitter_card')} disabled={!canEdit}
                  onChange={(e) => field('twitter_card', e.target.value)}>
                  <option value="">Use the site default</option>
                  {CARD_TYPES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
            </div>
          )}

          {group === 'advanced' && (
            <div className="a-stack">
              <div className="a-field">
                <label>Robots directives</label>
                <div className="a-switches">
                  <Switch on={bool('robots_index')} disabled={!canEdit} onToggle={(v) => field('robots_index', v)}
                    title="Robots Index" note="noindex when off." />
                  <Switch on={bool('robots_follow')} disabled={!canEdit} onToggle={(v) => field('robots_follow', v)}
                    title="Robots Follow" note="nofollow when off." />
                  <Switch on={bool('robots_archive')} disabled={!canEdit} onToggle={(v) => field('robots_archive', v)}
                    title="Robots Archive" note="noarchive when off — no cached copy in results." />
                  <Switch on={bool('in_sitemap')} disabled={!canEdit} onToggle={(v) => field('in_sitemap', v)}
                    title="In sitemap" note="Off removes the URL from sitemap.xml." />
                  <Switch on={bool('allow_ai_answers')} disabled={!canEdit} onToggle={(v) => field('allow_ai_answers', v)}
                    title="AI answer engines" note="Off asks ChatGPT, Perplexity and Claude search not to quote it." />
                </div>
              </div>

              <Num label="Robots Snippet" value={post.robots_max_snippet as number | null} disabled={!canEdit}
                onChange={(v) => field('robots_max_snippet', v)}
                hint="max-snippet, in characters. -1 for no limit, 0 for no snippet at all. Empty says nothing." />

              <div className="a-field">
                <label htmlFor="img-prev">Robots Image Preview</label>
                <select id="img-prev" className="a-inp" value={str('robots_image_preview')} disabled={!canEdit}
                  onChange={(e) => field('robots_image_preview', e.target.value)}>
                  <option value="">Say nothing</option>
                  <option value="large">Large</option>
                  <option value="standard">Standard</option>
                  <option value="none">None</option>
                </select>
                <p className="a-hint">max-image-preview. &ldquo;Large&rdquo; is what gets a thumbnail in Discover.</p>
              </div>

              <Num label="Robots Video Preview" value={post.robots_max_video as number | null} disabled={!canEdit}
                onChange={(v) => field('robots_max_video', v)}
                hint="max-video-preview, in seconds. -1 for no limit." />

              <Text label="Canonical URL" value={str('canonical_url')} disabled={!canEdit} mono
                onChange={(v) => field('canonical_url', v)}
                hint="The same field as on the Core tab — one canonical, two places to reach it." />

              <Text label="Breadcrumb Title" value={str('breadcrumb_title')} disabled={!canEdit}
                onChange={(v) => field('breadcrumb_title', v)}
                hint="Short form for the breadcrumb trail. Empty uses the post title." />

              <Text label="Redirect URL" value={str('redirect_to')} disabled={!canEdit} mono
                onChange={(v) => field('redirect_to', v)}
                hint="Retires this address. Filling it in adds a rule to the redirect table; clearing it removes the rule." />

              <div className="a-field">
                <label htmlFor="redir-type">Redirect Type</label>
                <select id="redir-type" className="a-inp" value={String(post.redirect_type ?? '')} disabled={!canEdit}
                  onChange={(e) => field('redirect_type', e.target.value ? Number(e.target.value) : null)}>
                  <option value="">No redirect</option>
                  <option value="301">301 — moved permanently</option>
                  <option value="302">302 — found, temporary</option>
                  <option value="307">307 — temporary, method preserved</option>
                  <option value="308">308 — permanent, method preserved</option>
                  <option value="410">410 — gone</option>
                </select>
                <p className="a-hint">301 unless you genuinely mean to move it back.</p>
              </div>
            </div>
          )}

          {group === 'schema' && (
            <div className="a-stack">
              <div className="a-field">
                <label htmlFor="schema-type">Schema Type</label>
                <select id="schema-type" className="a-inp" value={str('schema_type')} disabled={!canEdit}
                  onChange={(e) => field('schema_type', e.target.value)}>
                  <option value="">Use the site default</option>
                  {SCHEMA_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <p className="a-hint">
                  BlogPosting for an article, HowTo for a step-by-step guide, LocalBusiness for a
                  location page. FAQPage still describes the content correctly even though Google
                  stopped showing FAQ rich results in May 2026.
                </p>
              </div>

              <Text label="Schema Headline" value={str('schema_headline')} disabled={!canEdit}
                onChange={(v) => field('schema_headline', v)} hint="Empty uses the post title." />
              <Area label="Schema Description" value={str('schema_description')} disabled={!canEdit}
                onChange={(v) => field('schema_description', v)} hint="Empty uses the meta description." />
              <Text label="Schema Image" value={str('schema_image_url')} disabled={!canEdit} mono
                onChange={(v) => field('schema_image_url', v)} hint="Empty uses the featured image." />
              <Text label="Schema Author" value={str('schema_author')} disabled={!canEdit}
                onChange={(v) => field('schema_author', v)} hint="Empty uses the post's byline." />
              <Text label="Schema Publisher" value={str('schema_publisher')} disabled={!canEdit}
                onChange={(v) => field('schema_publisher', v)} hint="Empty uses the organisation name from Defaults." />

              <DateField label="Schema Date Published" value={post.schema_published_at as string | null}
                disabled={!canEdit} onChange={(v) => field('schema_published_at', v)}
                hint="Empty uses the post's publish date." />
              <DateField label="Schema Date Modified" value={post.schema_modified_at as string | null}
                disabled={!canEdit} onChange={(v) => field('schema_modified_at', v)}
                hint="Empty uses the last edit." />

              <div className="a-field">
                <label htmlFor="schema-custom">Custom Schema JSON-LD</label>
                <textarea id="schema-custom" className="a-ta a-mono" rows={9} disabled={!canEdit}
                  value={typeof post.schema_custom === 'string'
                    ? post.schema_custom
                    : post.schema_custom ? JSON.stringify(post.schema_custom, null, 2) : ''}
                  onChange={(e) => field('schema_custom', e.target.value)} />
                <p className="a-hint">
                  Emitted <b>alongside</b> the generated block, not instead of it. Anything that is not
                  valid JSON is refused on save rather than shipped to a live page.
                </p>
              </div>
            </div>
          )}
        </div>

        <aside className="a-seoside">
          <SerpPreview slug={String(post.slug ?? '')} title={titleShown} description={descShown} />
          <ScorePanel analysis={analysis} />
          <ChecksPanel analysis={analysis} />
        </aside>
      </div>
    </main>
  )
}

/* -------------------------------------------------------------- the panels */

function SerpPreview({ slug, title, description }: { slug: string; title: string; description: string }) {
  return (
    <div className="a-card">
      <h3 className="a-h">Google preview</h3>
      <div className="a-serp">
        <div className="crumb">
          <span className="fav"><Icon d="M12 3l9 5v8l-9 5-9-5V8l9-5Z" /></span>
          <span className="host">Recycle Technologies<small>{SITE.replace('https://', '')} › {slug}</small></span>
        </div>
        <div className="t">{title || 'Untitled'}</div>
        <div className="d">{description || 'No meta description. Google will pick a sentence out of the page instead.'}</div>
      </div>
      <Meter label="Title" n={title.length} max={TITLE_MAX} />
      <Meter label="Description" n={description.length} max={DESCRIPTION_MAX} min={DESCRIPTION_MIN} />
    </div>
  )
}

function Meter({ label, n, max, min = 0 }: { label: string; n: number; max: number; min?: number }) {
  const status = lengthStatus(n, min || 1, max)
  const cls = status === 'good' ? '' : status === 'ok' ? ' warn' : ' bad'
  return (
    <>
      <div className={`a-meter${cls}`}><i style={{ width: `${Math.min(100, (n / max) * 100)}%` }} /></div>
      <div className="a-counter"><span>{label}</span><span className="a-tnum">{n} / {max}</span></div>
    </>
  )
}

function ScorePanel({ analysis }: { analysis: Analysis }) {
  const k = (n: number) => (n >= 75 ? 'good' : n >= 50 ? 'ok' : 'bad')
  return (
    <div className="a-card">
      <h3 className="a-h">Scores</h3>
      <div className="a-scores">
        <div className={`a-score ${k(analysis.score)}`}>
          <strong className="a-tnum">{analysis.score}</strong>
          <span>SEO Score</span>
        </div>
        <div className={`a-score ${k(analysis.readability)}`}>
          <strong className="a-tnum">{analysis.readability}</strong>
          <span>Readability<small>{analysis.readabilityLabel}</small></span>
        </div>
      </div>
      <dl className="a-stats">
        <div><dt>Content Length</dt><dd className="a-tnum">{analysis.stats.words} words</dd></div>
        <div><dt>Internal Links</dt><dd className="a-tnum">{analysis.stats.internalLinks}</dd></div>
        <div><dt>External Links</dt><dd className="a-tnum">{analysis.stats.externalLinks}</dd></div>
        <div><dt>Images</dt><dd className="a-tnum">{analysis.stats.imagesWithAlt}/{analysis.stats.images} with alt</dd></div>
        <div><dt>Headings</dt><dd className="a-tnum">{analysis.stats.headings}</dd></div>
        <div><dt>Keyword Density</dt><dd className="a-tnum">{analysis.stats.density}%</dd></div>
      </dl>
      <p className="a-hint">
        Advice, not a rule. Nothing here blocks a save, and a red light on a page that has ranked for
        years is a reason to leave it alone.
      </p>
    </div>
  )
}

const MARK: Record<CheckStatus, { cls: string; glyph: string }> = {
  good: { cls: 'ok', glyph: '✓' },
  ok: { cls: 'no', glyph: '!' },
  bad: { cls: 'er', glyph: '×' },
  na: { cls: 'off', glyph: '–' },
}

function ChecksPanel({ analysis }: { analysis: Analysis }) {
  const groups: { id: Check['group']; label: string }[] = [
    { id: 'keyword', label: 'Focus keyword' },
    { id: 'structure', label: 'Content' },
    { id: 'links', label: 'Links' },
  ]
  return (
    <div className="a-card">
      <h3 className="a-h">Analysis</h3>
      {groups.map((g) => {
        const rows = analysis.checks.filter((c) => c.group === g.id)
        if (rows.length === 0) return null
        return (
          <div key={g.id} style={{ marginBottom: 14 }}>
            <p className="a-navlabel" style={{ margin: '0 0 8px' }}>{g.label}</p>
            <ul className="a-checks">
              {rows.map((c) => (
                <li key={c.id} className={MARK[c.status].cls}>
                  <span className="m">{MARK[c.status].glyph}</span>
                  <span><b>{c.label}</b><small>{c.detail}</small></span>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

/* ---------------------------------------------------------------- defaults */

function SeoDefaults({ values, canEdit, onToast, onSaved }: {
  values: Record<string, unknown>; canEdit: boolean; onToast: (m: string) => void; onSaved: () => void
}) {
  const [v, setV] = useState(values)
  const s = (k: string) => String(v[k] ?? '')
  const set = (k: string, val: unknown) => setV((o) => ({ ...o, [k]: val }))

  async function save() {
    const r = await sendJSON('/seo', 'PUT', { settings: v })
    onToast(r.ok ? 'Defaults saved' : r.error)
    if (r.ok) onSaved()
  }

  return (
    <div style={{ maxWidth: 620 }} className="a-stack">
      <div className="a-note"><span>
        <b>What every page falls back to.</b> A post that leaves a field empty uses the value here,
        so this is the one place to change the organisation name or the fallback share image.
      </span></div>

      <Text label="Site name" value={s('site_name')} disabled={!canEdit} onChange={(x) => set('site_name', x)} />
      <Text label="Title template" value={s('title_template')} disabled={!canEdit} mono
        onChange={(x) => set('title_template', x)}
        hint="%title% and %sitename% are replaced. This is what a page with no SEO title gets." />
      <Text label="Title separator" value={s('seo_title_separator')} disabled={!canEdit}
        onChange={(x) => set('seo_title_separator', x)} hint="The character between the two halves. | is the live site's." />
      <Text label="Default share image" value={s('seo_default_og_image')} disabled={!canEdit} mono
        onChange={(x) => set('seo_default_og_image', x)}
        hint="Used when a post has no featured image. 1200x630." />
      <Text label="X / Twitter account" value={s('seo_twitter_site')} disabled={!canEdit}
        onChange={(x) => set('seo_twitter_site', x)} hint="With the @." />

      <div className="a-field">
        <label htmlFor="d-card">Default card type</label>
        <select id="d-card" className="a-inp" value={s('seo_twitter_card')} disabled={!canEdit}
          onChange={(e) => set('seo_twitter_card', e.target.value)}>
          {CARD_TYPES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </div>

      <div className="a-field">
        <label htmlFor="d-schema">Default schema type</label>
        <select id="d-schema" className="a-inp" value={s('seo_default_schema')} disabled={!canEdit}
          onChange={(e) => set('seo_default_schema', e.target.value)}>
          {SCHEMA_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <Text label="Organisation name" value={s('seo_org_name')} disabled={!canEdit}
        onChange={(x) => set('seo_org_name', x)} hint="The publisher in every Article schema block." />
      <Text label="Organisation logo" value={s('seo_org_logo')} disabled={!canEdit} mono
        onChange={(x) => set('seo_org_logo', x)} />

      <div className="a-field">
        <label htmlFor="d-orgtype">Organisation schema type</label>
        <select id="d-orgtype" className="a-inp" value={s('seo_org_type')} disabled={!canEdit}
          onChange={(e) => set('seo_org_type', e.target.value)}>
          <option value="Organization">Organization</option>
          <option value="LocalBusiness">LocalBusiness</option>
        </select>
        <p className="a-hint">LocalBusiness, because the company has physical sites people drive to.</p>
      </div>

      <div className="a-field">
        <label>Crawlers</label>
        <div className="a-switches">
          <Switch on={String(v.ai_training_crawlers ?? 'block') === 'allow'} disabled={!canEdit}
            onToggle={(on) => set('ai_training_crawlers', on ? 'allow' : 'block')}
            title="AI training crawlers" note="GPTBot, ClaudeBot, CCBot. They take content and send almost no traffic back." />
          <Switch on={String(v.ai_answer_crawlers ?? 'allow') === 'allow'} disabled={!canEdit}
            onToggle={(on) => set('ai_answer_crawlers', on ? 'allow' : 'block')}
            title="AI answer crawlers" note="ChatGPT, Perplexity, Claude search. These do send referrals." />
          <Switch on={Boolean(v.seo_noindex_paginated)} disabled={!canEdit}
            onToggle={(on) => set('seo_noindex_paginated', on)}
            title="Noindex paginated archives" note="/blog/page/2/ and beyond. Off is the safer default." />
        </div>
      </div>

      {canEdit && <div><button className="a-btn p" onClick={() => void save()}>Save defaults</button></div>}
    </div>
  )
}

function Redirects({ rows }: { rows: Index['redirects'] }) {
  return (
    <>
      <div className="a-note"><span>
        <b>Moved here from Settings.</b> Imported from the migration map; change a published
        post&rsquo;s slug, or fill in its Redirect URL, and a rule appears on its own with any chain
        flattened so A → B → C becomes A → C.
      </span></div>
      <Table head={['From', 'To', 'Type', 'Source', 'Hits']}>
        {rows.length === 0 && <Empty>No redirects yet.</Empty>}
        {rows.map((r) => (
          <tr key={r.id}>
            <td className="a-mono">{r.from_path}</td>
            <td className="a-mono">{r.to_path}</td>
            <td>{r.status_code}</td>
            <td>{r.source}</td>
            <td className="a-tnum">{r.hits}</td>
          </tr>
        ))}
      </Table>
    </>
  )
}

/* ---------------------------------------------------------------- controls */

function Text({ label, value, onChange, hint, disabled, mono, count }: {
  label: string; value: string; onChange: (v: string) => void
  hint?: string; disabled?: boolean; mono?: boolean
  count?: { n: number; max: number; min?: number }
}) {
  const id = `f-${label.replace(/\W+/g, '-').toLowerCase()}`
  return (
    <div className="a-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} className={`a-inp${mono ? ' a-mono' : ''}`} value={value} disabled={disabled}
        onChange={(e) => onChange(e.target.value)} />
      {count && <Meter label={label} n={count.n} max={count.max} min={count.min ?? 0} />}
      {hint && <p className="a-hint">{hint}</p>}
    </div>
  )
}

function Area({ label, value, onChange, hint, disabled, count }: {
  label: string; value: string; onChange: (v: string) => void
  hint?: string; disabled?: boolean; count?: { n: number; max: number; min?: number }
}) {
  const id = `f-${label.replace(/\W+/g, '-').toLowerCase()}`
  return (
    <div className="a-field">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} className="a-ta" rows={3} value={value} disabled={disabled}
        onChange={(e) => onChange(e.target.value)} />
      {count && <Meter label={label} n={count.n} max={count.max} min={count.min ?? 0} />}
      {hint && <p className="a-hint">{hint}</p>}
    </div>
  )
}

function Num({ label, value, onChange, hint, disabled }: {
  label: string; value: number | null; onChange: (v: number | null) => void; hint?: string; disabled?: boolean
}) {
  const id = `f-${label.replace(/\W+/g, '-').toLowerCase()}`
  return (
    <div className="a-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} className="a-inp a-mono" type="number" value={value ?? ''} disabled={disabled}
        onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))} />
      {hint && <p className="a-hint">{hint}</p>}
    </div>
  )
}

function DateField({ label, value, onChange, hint, disabled }: {
  label: string; value: string | null; onChange: (v: string | null) => void; hint?: string; disabled?: boolean
}) {
  const id = `f-${label.replace(/\W+/g, '-').toLowerCase()}`
  // A timestamptz round-trips as an ISO string; the input wants yyyy-mm-dd.
  const asDate = value ? new Date(value).toISOString().slice(0, 10) : ''
  return (
    <div className="a-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} className="a-inp" type="date" value={asDate} disabled={disabled}
        onChange={(e) => onChange(e.target.value ? new Date(`${e.target.value}T00:00:00Z`).toISOString() : null)} />
      {hint && <p className="a-hint">{hint}</p>}
    </div>
  )
}

function Switch({ on, onToggle, title, note, disabled }: {
  on: boolean; onToggle: (v: boolean) => void; title: string; note: string; disabled?: boolean
}) {
  return (
    <div className="a-switch">
      <div><p>{title}</p><small>{note}</small></div>
      <button type="button" className="a-sw" aria-pressed={on} aria-label={title} disabled={disabled}
        onClick={() => onToggle(!on)} />
    </div>
  )
}

/** Comma or Enter adds one. Backspace on an empty box removes the last. */
function Chips({ label, values, onChange, hint, disabled }: {
  label: string; values: string[]; onChange: (v: string[]) => void; hint?: string; disabled?: boolean
}) {
  const [draft, setDraft] = useState('')
  const id = `f-${label.replace(/\W+/g, '-').toLowerCase()}`
  const add = (raw: string) => {
    const next = raw.split(',').map((s) => s.trim()).filter(Boolean)
      .filter((s) => !values.some((v) => v.toLowerCase() === s.toLowerCase()))
    if (next.length) onChange([...values, ...next])
    setDraft('')
  }
  return (
    <div className="a-field">
      <label htmlFor={id}>{label}</label>
      <div className="a-chips">
        {values.map((v) => (
          <span className="a-chip" key={v}>
            {v}
            {!disabled && (
              <button type="button" aria-label={`Remove ${v}`}
                onClick={() => onChange(values.filter((x) => x !== v))}>×</button>
            )}
          </span>
        ))}
        <input id={id} className="a-inp" value={draft} disabled={disabled}
          placeholder={values.length ? 'Add another' : 'Type a phrase and press Enter'}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(draft) }
            else if (e.key === 'Backspace' && !draft && values.length) onChange(values.slice(0, -1))
          }}
          onBlur={() => draft && add(draft)} />
      </div>
      {hint && <p className="a-hint">{hint}</p>}
    </div>
  )
}
