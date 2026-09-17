'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { EditorContent, useEditor, useEditorState, type Editor } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import { EDITOR_EXTENSIONS } from '@/lib/editor-extensions'
import { slugify } from '@/lib/slug'
import { AskDialog, ConfirmDialog, Dialog } from './Dialog'
import { MediaLibrary, type MediaRow } from './MediaLibrary'
import { Menu, MenuItem, MenuDivider, MenuNote, MenuTile } from './Menu'
import { BULLET_STYLES, NUMBER_STYLES } from '@/lib/editor-marks'
import { isImage } from '@/lib/media-kinds'
import { api } from './api'

/**
 * The post editor — the screen Asim sketched: article title, meta title, meta
 * description, a formatting bar, the outline rail on the left, search appearance
 * and publishing on the right, actions along the bottom.
 *
 * WHY THIS IS A CLIENT COMPONENT (CLAUDE.md rule 7): it is a text editor. It
 * lives under src/components/client/ with the rest, and none of it ships on a
 * public page — the whole admin is one route behind a login.
 *
 * !! HEADING LEVELS. The toolbar says "Heading 1/2/3" and emits h2/h3/h4. The
 * article title above is the page's only h1. See src/lib/editor-extensions.ts
 * for why, and do not "fix" the labels to match the tags.
 */

type Post = {
  id: number
  slug: string
  title: string
  meta_title: string
  meta_description: string
  excerpt: string
  focus_keyword: string
  canonical_url: string | null
  robots_index: boolean
  robots_follow: boolean
  allow_ai_answers: boolean
  in_sitemap: boolean
  status: 'draft' | 'scheduled' | 'published'
  category_id: number | null
  author_id: number | null
  content_json: object
  word_count: number
  reading_minutes: number
  featured_media_id: number | null
  featured_alt: string | null
  /* Joined from media on GET so the rail can show the picture without a second
     request. Not sent back on save — the id is the only thing posts owns. */
  featured_url?: string | null
  featured_filename?: string | null
  featured_width?: number | null
  featured_height?: number | null
  featured_media_alt?: string | null
  published_at?: string | null
  /** 'wordpress' until somebody converts it — see the note on loading below. */
  source?: 'editor' | 'wordpress'
  content_html?: string
}

type Named = { id: number; name: string }


/* ------------------------------------------------ toolbar vocabulary ------
 * Kept up here as data so the toolbar markup stays readable, and so the empty
 * string — "whatever the stylesheet says" — is a real, selectable choice rather
 * than a state you can only reach by undoing. */

const FONTS = [
  { value: '', label: 'IBM Plex Sans' },
  { value: 'Roboto, sans-serif', label: 'Roboto' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: '"IBM Plex Mono", monospace', label: 'Monospace' },
]

const SIZES = [
  { value: '', label: '15.5' },
  ...['12px', '13px', '14px', '16px', '18px', '20px', '22px', '26px', '32px']
    .map((v) => ({ value: v, label: v.replace('px', '') })),
]

const ALIGNMENTS = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Centre' },
  { value: 'right', label: 'Right' },
  { value: 'justify', label: 'Justified' },
] as const

/* No `Record<string, string>` here on purpose: an index signature turns every
   lookup into `string | undefined` under noUncheckedIndexedAccess, while the
   literal keys below type each lookup exactly. */
const ALIGN_ICON = {
  left: 'M3 6h18M3 12h12M3 18h15',
  center: 'M3 6h18M6 12h12M4 18h16',
  right: 'M3 6h18M9 12h12M6 18h15',
  justify: 'M3 6h18M3 12h18M3 18h18',
}

const LINE_HEIGHTS = [
  { value: '1', label: 'Single' },
  { value: '1.15', label: '1.15' },
  { value: '1.5', label: '1.5' },
  { value: '2', label: 'Double' },
]

/* Google truncates search results on WIDTH, not character count, and renders in
   Arial. Measuring anything else would be a lie, so a canvas does the work. */
let measureCtx: CanvasRenderingContext2D | null = null
function pixels(text: string, font: string): number {
  if (typeof document === 'undefined') return 0
  measureCtx ??= document.createElement('canvas').getContext('2d')
  if (!measureCtx) return 0
  measureCtx.font = font
  return Math.round(measureCtx.measureText(text || '').width)
}

export function PostEditor({
  postId, categories, authors, canPublish, onClose, onToast, onAuthorAdded,
}: {
  postId: number
  categories: { id: number; name: string; parent_id?: number | null }[]
  authors: Named[]
  canPublish: boolean
  onClose: () => void
  onToast: (msg: string) => void
  /** Puts a newly added byline into the shared list, so the dropdown has it
      without a full reload of the admin. */
  onAuthorAdded: (a: Named) => void
}) {
  const [post, setPost] = useState<Post | null>(null)
  const [saving, setSaving] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [error, setError] = useState('')
  /* The toolbar's link and picture buttons used to be window.prompt(). See the
     note at the top of Dialog.tsx for why they are not any more. */
  const [inserting, setInserting] = useState<null | 'link' | 'image' | 'featured' | 'author' | 'alt'>(null)
  /* Focus mode hides both rails and widens the writing column; preview swaps the
     whole editor for the article as a reader gets it. Neither touches the
     document, so leaving either is instant and lossless. */
  const [focusMode, setFocusMode] = useState(false)
  const [previewing, setPreviewing] = useState(false)
  const [converting, setConverting] = useState(false)
  const dirty = useRef(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const editor = useEditor({
    extensions: EDITOR_EXTENSIONS,
    content: '',
    // Mandatory in the App Router: without it Tiptap renders during SSR and
    // React reports a hydration mismatch. This is the single most common
    // Tiptap-in-Next bug.
    immediatelyRender: false,
    editorProps: {
      attributes: { class: 'tiptap', 'data-placeholder': 'Start writing…' },
      /* Content is drafted in Google Docs, and a raw paste from Docs carries two
         defects into the published page:
           1. every span is tattooed with font-family:Arial; font-size:11pt;
              color:#000000, which overrides the site's own typography, and
           2. every link points at google.com/url?q=… rather than the real URL,
              which is dead outbound links and lost link equity.
         Neither editor fixes this on its own. Sixty lines here does. */
      transformPastedHTML: cleanGoogleDocsHtml,
    },
    onUpdate: () => { dirty.current = true; queueSave() },
  })

  /* -------------------------------------------------------------- loading */
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const res = await fetch(api(`/posts/${postId}`))
      const data = await res.json()
      if (cancelled) return
      if (!res.ok) { setError(data.error ?? 'Could not open that post.'); return }
      setPost(data.post)

      /* !! AN IMPORTED POST IS NOT LOADED INTO THE EDITOR, AND THAT IS ON PURPOSE.
         A post with source='wordpress' has its original markup in content_html
         and an empty content_json. Pouring that HTML into Tiptap here would be
         convenient and wrong: Tiptap's schema has no node for the inline-styled
         CTA panels, hand-built comparison tables or <script type="ld+json">
         blocks these posts carry, so the conversion silently drops them — and
         the autosave would then write the reduced version over a live page
         nobody asked to change.
         So the editor stays empty, the screen shows the article as it is, and a
         person presses Convert when they actually mean to edit it. */
      const imported = data.post.source === 'wordpress'
      if (!imported) {
        // emitUpdate: false — otherwise loading a post fires onUpdate, marks it
        // dirty and saves it straight back over itself before anyone has typed.
        editor?.commands.setContent(data.post.content_json ?? { type: 'doc', content: [] }, { emitUpdate: false })
      }
      dirty.current = false
      // Setting content moves the selection and the browser scrolls to follow
      // it, landing the reader below the title with the sticky toolbar parked
      // over it. The scroll happens after this tick, so undo it on the next
      // frame — a plain scrollTo here runs too early and does nothing.
      requestAnimationFrame(() => window.scrollTo({ top: 0 }))
    })()
    return () => { cancelled = true }
  }, [postId, editor])

  /* --------------------------------------------------------------- saving */
  /* !! THE SAVE READS A REF, NOT THE CLOSURE, AND THAT IS A BUG FIX.
     field() calls setPost() and then queueSave(). queueSave schedules a timer
     holding the save() from the CURRENT render — whose `post` is the state as it
     was BEFORE that keystroke. Each keystroke clears and re-arms the timer, so
     the one that finally fires always carried the second-to-last value: every
     metadata field silently lost its last character, and a field filled in one
     go (paste, autofill, a browser test) saved as empty. Keeping the live post
     in a ref means the timer reads what is on screen when it fires. */
  const live = useRef<Post | null>(null)
  useEffect(() => { live.current = post }, [post])

  const save = useCallback(async (extra: Partial<Post> = {}) => {
    const now = live.current
    if (!now) return
    setSaving('saving')
    const payload: Record<string, unknown> = {
      title: now.title,
      slug: now.slug,
      meta_title: now.meta_title,
      meta_description: now.meta_description,
      excerpt: now.excerpt,
      focus_keyword: now.focus_keyword,
      canonical_url: now.canonical_url,
      robots_index: now.robots_index,
      robots_follow: now.robots_follow,
      allow_ai_answers: now.allow_ai_answers,
      in_sitemap: now.in_sitemap,
      category_id: now.category_id,
      author_id: now.author_id,
      featured_media_id: now.featured_media_id,
      featured_alt: now.featured_alt,
      ...extra,
    }
    if (editor) payload.content_json = editor.getJSON()

    const res = await fetch(api(`/posts/${now.id}`), {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok) { setSaving('idle'); onToast(data.error ?? 'Could not save.'); return }
    if (data.redirected) onToast('Slug changed — a 301 from the old URL was created')
    if (data.bodyLocked) onToast('Title and settings saved. The article itself is still the WordPress original — press Convert to edit it.')
    dirty.current = false
    setSaving('saved')
  }, [editor, onToast])

  const queueSave = useCallback(() => {
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => { void save() }, 1200)
  }, [save])

  // Escape is the way out of both full-screen modes; without it the only exit is
  // a button that full screen has just moved.
  useEffect(() => {
    if (!focusMode && !previewing) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      // A dialog open on top of focus mode gets the key first and stops it.
      if (document.querySelector('.a-scrim')) return
      setFocusMode(false); setPreviewing(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [focusMode, previewing])

  // Nobody should lose an afternoon's writing to a closed tab.
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => { if (dirty.current) e.preventDefault() }
    addEventListener('beforeunload', warn)
    return () => removeEventListener('beforeunload', warn)
  }, [])

  const field = <K extends keyof Post>(key: K, value: Post[K]) => {
    setPost((p) => {
      const next = p ? { ...p, [key]: value } : p
      // Updated here as well as in the effect above, so a save() called
      // synchronously right after a field() still sees the new value.
      live.current = next
      return next
    })
    dirty.current = true
    queueSave()
  }

  /* ------------------------------------------------------------- derived */
  /* !! THIS READS THE SELECTION, IT DOES NOT JUST TRACK CLICKS. Every control in
     the toolbar is driven from here, so putting the cursor in 22px Georgia shows
     22 and Georgia in the boxes — which is the thing Asim asked for, and the
     thing a toolbar of uncontrolled <select defaultValue> can never do. */
  const toolbar = useEditorState({
    editor,
    selector: ({ editor: e }) => {
      if (!e) return null
      const style = e.getAttributes('textStyle')
      const list = e.isActive('orderedList') ? e.getAttributes('orderedList')
        : e.isActive('bulletList') ? e.getAttributes('bulletList') : {}
      const block = e.state.selection.$from.parent.attrs ?? {}
      return {
        bold: e.isActive('bold'), italic: e.isActive('italic'), underline: e.isActive('underline'),
        strike: e.isActive('strike'), link: e.isActive('link'),
        bullet: e.isActive('bulletList'), ordered: e.isActive('orderedList'),
        task: e.isActive('taskList'), quote: e.isActive('blockquote'), table: e.isActive('table'),
        image: e.isActive('image'),
        imageAlt: (e.getAttributes('image').alt as string) ?? '',
        align: (['left', 'center', 'right', 'justify'] as const).find((a) => e.isActive({ textAlign: a })) ?? 'left',
        font: (style.fontFamily as string) ?? '',
        size: (style.fontSize as string) ?? '',
        colour: (style.color as string) ?? '',
        lineSpacing: (block.lineSpacing as string) ?? '',
        listStyle: (list.listStyle as string) ?? '',
        spaceBefore: (block.spaceBefore as string) ?? '',
        spaceAfter: (block.spaceAfter as string) ?? '',
        blockName: e.state.selection.$from.parent.type.name,
        block: e.isActive('heading', { level: 2 }) ? 'h2'
             : e.isActive('heading', { level: 3 }) ? 'h3'
             : e.isActive('heading', { level: 4 }) ? 'h4'
             : e.isActive('blockquote') ? 'quote' : 'p',
        words: e.storage.characterCount?.words?.() ?? 0,
      }
    },
  })

  const outline = useOutline(editor)

  const metaTitle = post?.meta_title || post?.title || ''
  const metaDesc = post?.meta_description ?? ''
  const titleWidth = pixels(metaTitle, '17px Arial')
  const descWidth = pixels(metaDesc, '13px Arial')
  const words = toolbar?.words ?? post?.word_count ?? 0

  const checks = useMemo(() => {
    if (!post) return []
    const hasImage = JSON.stringify(post.content_json ?? {}).includes('"image"')
    return [
      { k: post.meta_title ? 'ok' : 'er', t: 'Meta title set',
        n: post.meta_title ? (titleWidth > 580 ? 'Too wide — Google will cut it' : 'Fits Google’s width') : 'Empty — Google will write its own' },
      { k: metaDesc.length > 60 ? 'ok' : 'no', t: 'Meta description set',
        n: metaDesc.length > 60 ? 'Long enough to be used as written' : 'Under 60 characters is usually rewritten' },
      { k: 'ok', t: 'One H1 on the page', n: 'The article title. Body headings start at H2.' },
      { k: outline.length >= 2 ? 'ok' : 'no', t: 'Heading structure',
        n: `${outline.length} section heading${outline.length === 1 ? '' : 's'}` },
      { k: post.slug ? 'ok' : 'er', t: 'URL set', n: post.slug ? `/${post.slug}/` : 'No slug yet' },
      { k: hasImage ? 'no' : 'ok', t: 'Images', n: hasImage ? 'Click each one and check it has alt text' : 'No images in this post' },
      { k: words > 300 ? 'ok' : 'no', t: 'Length', n: `${words.toLocaleString()} words` },
    ]
  }, [post, metaDesc, titleWidth, outline.length, words])

  /* ------------------------------------------------------------ publishing */
  async function publish(action: 'publish' | 'unpublish') {
    if (dirty.current) await save()
    const res = await fetch(api(`/posts/${postId}/publish`), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action }),
    })
    const data = await res.json()
    if (!res.ok) { onToast(data.error ?? 'Could not publish.'); return }
    setPost((p) => (p ? { ...p, status: data.status } : p))
    onToast(action === 'publish' ? `Published — live at ${data.path}` : 'Moved back to draft')
  }

  if (error) return <div className="a-sheet"><div className="a-err">{error}</div></div>
  if (!post) return <div className="a-sheet"><p className="a-hint">Opening…</p></div>

  /**
   * Turns an imported post into an editable one, once, when a person asks.
   *
   * setContent parses the WordPress HTML with Tiptap's own schema — which is
   * exactly the lossy step this screen has been avoiding — so the count of what
   * will not survive is shown BEFORE it happens, not discovered afterwards.
   */
  async function convert() {
    if (!post || !editor) return
    editor.commands.setContent(post.content_html ?? '', { emitUpdate: false })
    dirty.current = true
    await save({ source: 'editor', content_json: editor.getJSON() } as Partial<Post>)
    setPost((p) => (p ? { ...p, source: 'editor' } : p))
    setConverting(false)
    onToast('Converted — the article is now editable here.')
  }

  /* A FUNCTION, not a value. `editor.chain().focus()` evaluated during render
     builds a command chain on every keystroke and pulls focus into the editor
     as the post loads — which scrolls the article title off the top of the
     screen. Called only from a click handler, it does neither. */
  const cmd = () => editor?.chain().focus()

  if (previewing) {
    return <Preview post={post} html={editor?.getHTML() ?? ''} words={words}
      category={categories.find((c) => c.id === post.category_id)?.name ?? null}
      author={authors.find((a) => a.id === post.author_id)?.name ?? null}
      onClose={() => setPreviewing(false)} />
  }

  return (
    <div className={`a-ed${focusMode ? ' focus' : ''}`}>
      {/* ---- outline rail ---- */}
      <aside className="a-edrail">
        <p className="a-railh">In this post</p>
        <ul className="a-outline">
          <li className="lv1"><button type="button" onClick={() => document.getElementById('articleTitle')?.focus()}>
            {post.title || 'Untitled'}<small>H1</small>
          </button></li>
          {outline.length === 0 && <li className="a-empty">Headings you add will appear here.</li>}
          {outline.map((h) => (
            <li key={h.pos} className={`lv${h.level}`}>
              <button type="button" onClick={() => editor?.chain().focus().setTextSelection(h.pos).scrollIntoView().run()}>
                {h.text || 'Untitled'}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* ---- title, meta, toolbar, body ---- */}
      <div className="a-edmid">
        <div className="a-titlebox">
          {/* ! THIS FIELD IS THE PAGE'S ONLY H1. The toolbar's "Heading 1" emits
              an <h2> for exactly this reason — see editor-extensions.ts. The
              badge is not decoration: writers kept treating this as a filename
              because it looked like one, and typed the real headline again as
              the first line of the body, which ships two H1s. */}
          <div className="a-titlehead">
            <label htmlFor="articleTitle">Article title</label>
            <span className="a-h1tag" title="This is the heading readers and Google see first">H1</span>
            <span className="a-spacer" />
            <button type="button" className="a-btn sm" onClick={() => setPreviewing(true)}>
              <PathIcon d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z M12 9.2a2.8 2.8 0 1 0 .01 0" /> Preview
            </button>
            <button type="button" className="a-btn sm" onClick={() => setFocusMode((f) => !f)}
              title={focusMode ? 'Bring the outline back' : 'Hide the outline and widen the page'}>
              {focusMode
                ? <><PathIcon d="M9 3v6H3M15 21v-6h6M9 9 3 3M15 15l6 6" /> Exit full screen</>
                : <><PathIcon d="M8 3H3v5M16 21h5v-5M21 8V3h-5M3 16v5h5" /> Full screen</>}
            </button>
          </div>
          <input
            id="articleTitle"
            className="a-title" value={post.title} placeholder="Article title"
            onChange={(e) => field('title', e.target.value)}
            onBlur={() => { if (!post.slug && post.title) field('slug', slugify(post.title)) }}
          />
          <div className="a-metarow">
            <div className="a-field">
              <label htmlFor="metaTitle">Meta title</label>
              <input id="metaTitle" className="a-inp" value={post.meta_title}
                placeholder={post.title || 'Falls back to the article title'}
                onChange={(e) => field('meta_title', e.target.value)} />
            </div>
            <div className="a-field">
              <label htmlFor="metaDesc">Meta description</label>
              <input id="metaDesc" className="a-inp" value={post.meta_description}
                placeholder="One or two sentences for the search result"
                onChange={(e) => field('meta_description', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="a-toolbar" role="toolbar" aria-label="Formatting">
          <select className="a-tbsel" aria-label="Paragraph style" value={toolbar?.block ?? 'p'}
            onChange={(e) => {
              const v = e.target.value
              if (v === 'p') cmd()?.setParagraph().run()
              else if (v === 'quote') cmd()?.toggleBlockquote().run()
              else cmd()?.setHeading({ level: Number(v.slice(1)) as 2 | 3 | 4 }).run()
            }}>
            <option value="p">Normal text</option>
            <option value="h2">Heading 1</option>
            <option value="h3">Heading 2</option>
            <option value="h4">Heading 3</option>
            <option value="quote">Pull quote</option>
          </select>
          <span className="a-tbdiv" />

          {/* Font, size and colour are CONTROLLED by the selection — see the
              useEditorState above. Put the cursor in 22px Georgia and these say
              22 and Georgia. */}
          <select className="a-tbsel" style={{ maxWidth: 118 }} aria-label="Font" value={toolbar?.font ?? ''}
            onChange={(e) => (e.target.value ? cmd()?.setFontFamily(e.target.value).run() : cmd()?.unsetFontFamily().run())}>
            {FONTS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
          <select className="a-tbsel" style={{ maxWidth: 74 }} aria-label="Text size" value={toolbar?.size ?? ''}
            onChange={(e) => (e.target.value ? cmd()?.setFontSize(e.target.value).run() : cmd()?.unsetFontSize().run())}>
            {SIZES.map((v) => <option key={v.value} value={v.value}>{v.label}</option>)}
          </select>
          <span className="a-tbdiv" />

          <Tb on={toolbar?.bold} label="Bold" onClick={() => cmd()?.toggleBold().run()}><PathIcon d="M7 5h6.5a3.5 3.5 0 0 1 0 7H7zM7 12h7.5a3.5 3.5 0 0 1 0 7H7z" w={2.2} /></Tb>
          <Tb on={toolbar?.italic} label="Italic" onClick={() => cmd()?.toggleItalic().run()}><PathIcon d="M15 5h-5M14 19H9M14.5 5 10 19" w={2.2} /></Tb>
          <Tb on={toolbar?.underline} label="Underline" onClick={() => cmd()?.toggleUnderline().run()}><PathIcon d="M7 4v6a5 5 0 0 0 10 0V4M6 20h12" w={2.2} /></Tb>
          <Tb on={toolbar?.strike} label="Strikethrough" onClick={() => cmd()?.toggleStrike().run()}><PathIcon d="M4 12h16M7 8a4 3 0 0 1 8-1M17 15a4 3 0 0 1-9 2" w={2} /></Tb>
          <label className="a-swatch" title="Text colour">
            <span style={{ fontFamily: 'var(--a-sans)', fontWeight: 600, fontSize: 13 }}>A</span>
            <span className="a-bar" style={{ background: toolbar?.colour || '#05838b' }} />
            <input type="color" value={toolbar?.colour || '#05838b'} aria-label="Text colour"
              onChange={(e) => cmd()?.setColor(e.target.value).run()} />
          </label>
          <label className="a-swatch" title="Highlight">
            <PathIcon d="m9 11-6 6v3h3l6-6M14.5 5.5 18 2l4 4-3.5 3.5M9 11l4.5-4.5 4 4L13 15z" />
            <span className="a-bar" style={{ background: '#fff3a3' }} />
            <input type="color" defaultValue="#fff3a3" aria-label="Highlight colour"
              onChange={(e) => cmd()?.setHighlight({ color: e.target.value }).run()} />
          </label>
          <span className="a-tbdiv" />

          {/* ---- alignment ---- */}
          <Menu label="Alignment" active={toolbar?.align !== 'left'} width={186}
            icon={<PathIcon d={ALIGN_ICON[toolbar?.align ?? 'left']} />}>
            {(close) => (
              <>
                {ALIGNMENTS.map((a) => (
                  <MenuItem key={a.value} on={toolbar?.align === a.value}
                    onClick={() => { cmd()?.setTextAlign(a.value).run(); close() }}>
                    <span className="a-menuglyph"><PathIcon d={ALIGN_ICON[a.value]} /></span>{a.label}
                  </MenuItem>
                ))}
              </>
            )}
          </Menu>

          {/* ---- line and paragraph spacing ---- */}
          <Menu label="Line spacing" width={236}
            active={Boolean(toolbar?.lineSpacing || toolbar?.spaceBefore || toolbar?.spaceAfter)}
            icon={<PathIcon d="M8 6h13M8 12h13M8 18h13M4 5v14M2.4 7 4 5l1.6 2M2.4 17 4 19l1.6-2" />}>
            {(close) => (
              <>
                {LINE_HEIGHTS.map((h) => (
                  <MenuItem key={h.label} on={(toolbar?.lineSpacing || '1.5') === h.value}
                    onClick={() => { cmd()?.setLineSpacing(h.value).run(); close() }}>{h.label}</MenuItem>
                ))}
                <MenuDivider />
                <MenuItem on={toolbar?.spaceBefore === '0em'}
                  onClick={() => { cmd()?.setBlockSpacing({ before: toolbar?.spaceBefore === '0em' ? null : 0 }).run(); close() }}>
                  {toolbar?.spaceBefore === '0em' ? 'Add space before paragraph' : 'Remove space before paragraph'}
                </MenuItem>
                <MenuItem on={toolbar?.spaceAfter === '0em'}
                  onClick={() => { cmd()?.setBlockSpacing({ after: toolbar?.spaceAfter === '0em' ? null : 0 }).run(); close() }}>
                  {toolbar?.spaceAfter === '0em' ? 'Add space after paragraph' : 'Remove space after paragraph'}
                </MenuItem>
                <MenuDivider />
                <MenuNote>
                  Docs also offers Keep with next, Keep lines together and page breaks.
                  Those are print pagination — a web page has no pages to break across,
                  so they are left out rather than left doing nothing.
                </MenuNote>
              </>
            )}
          </Menu>
          <span className="a-tbdiv" />

          {/* ---- lists, each with its markers ---- */}
          <SplitButton
            on={toolbar?.bullet} label="Bulleted list" menuLabel="Bullet style"
            onClick={() => cmd()?.toggleBulletList().run()}
            icon={<PathIcon d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />}
          >
            {(close) => (
              <>
                {BULLET_STYLES.map((style) => (
                  <MenuTile key={style} label={style.replace(/"/g, '')} on={toolbar?.listStyle === style}
                    onClick={() => {
                      if (!editor?.isActive('bulletList')) cmd()?.toggleBulletList().run()
                      cmd()?.setListStyle(style).run(); close()
                    }}>
                    <ul style={{ listStyleType: style }}><li /><li /><li /></ul>
                  </MenuTile>
                ))}
              </>
            )}
          </SplitButton>

          <SplitButton
            on={toolbar?.ordered} label="Numbered list" menuLabel="Numbering style"
            onClick={() => cmd()?.toggleOrderedList().run()}
            icon={<PathIcon d="M9 6h12M9 12h12M9 18h12M3 6h1.5M3 12h2M3 18h2" />}
          >
            {(close) => (
              <>
                {NUMBER_STYLES.map((style) => (
                  <MenuTile key={style} label={style.replace(/-/g, ' ')} on={toolbar?.listStyle === style}
                    onClick={() => {
                      if (!editor?.isActive('orderedList')) cmd()?.toggleOrderedList().run()
                      cmd()?.setListStyle(style).run(); close()
                    }}>
                    <ol style={{ listStyleType: style }}><li /><li /><li /></ol>
                  </MenuTile>
                ))}
              </>
            )}
          </SplitButton>

          <Tb on={toolbar?.task} label="Checklist" onClick={() => cmd()?.toggleTaskList().run()}><PathIcon d="M10 6h11M10 12h11M10 18h11m-18-12 1.4 1.4L7 4.8M3 16.5 4.4 18 7 15.3" /></Tb>
          <Tb label="Decrease indent" onClick={() => cmd()?.liftListItem('listItem').run()}><PathIcon d="M9 6h12M9 12h12M9 18h12M6 9l-3 3 3 3" /></Tb>
          <Tb label="Increase indent" onClick={() => cmd()?.sinkListItem('listItem').run()}><PathIcon d="M9 6h12M9 12h12M9 18h12M3 9l3 3-3 3" /></Tb>
          <span className="a-tbdiv" />

          <Tb on={toolbar?.link} label="Insert link" onClick={() => setInserting('link')}
            ><PathIcon d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7L12.5 19.5" /></Tb>
          <Tb label="Insert picture" onClick={() => setInserting('image')}
            ><PathIcon d="M3 4h18v16H3zM9 10a2 2 0 1 1-.01 0M21 17l-5-5-6 6" /></Tb>

          {/* ---- table ---- */}
          <Menu label="Table" active={toolbar?.table} width={230}
            icon={<PathIcon d="M3 4h18v16H3zM3 10h18M9 10v10" />}>
            {(close) => (
              <TableMenu editor={editor} inTable={Boolean(toolbar?.table)} close={close} />
            )}
          </Menu>
          <span className="a-tbdiv" />

          <button className="a-tb wide" title="Clear formatting"
            onClick={() => cmd()?.unsetAllMarks().clearNodes().run()}>Clear</button>
          <Tb label="Undo" onClick={() => cmd()?.undo().run()}><PathIcon d="M3 8h11a5 5 0 0 1 0 10H8M7 4 3 8l4 4" /></Tb>
          <Tb label="Redo" onClick={() => cmd()?.redo().run()}><PathIcon d="M21 8H10a5 5 0 0 0 0 10h6M17 4l4 4-4 4" /></Tb>
        </div>


        {post.source === 'wordpress' && (
          <div className="a-imported">
            <div className="a-importedbar">
              <span className="a-pill sched">Imported from WordPress</span>
              <span className="a-hint">
                Shown exactly as it is on the live site. Converting rewrites it in the
                editor&rsquo;s format, which is the only way to edit it here.
              </span>
              <span className="a-spacer" />
              <button className="a-btn p" onClick={() => setConverting(true)}>Convert to edit</button>
            </div>
            {/* Read-only, and the same markup the public page serves — see
                ImportedArticle for why this string is safe to render. */}
            <div className="a-importedbody wp-content"
              dangerouslySetInnerHTML={{ __html: post.content_html ?? '' }} />
          </div>
        )}

        <div className="a-canvas" hidden={post.source === 'wordpress'}>
          {/* ---- what is selected, where it is selected ----
              The toolbar already reflects the selection (see useEditorState),
              but the toolbar can be a screen away in a long article. This says
              the same thing under your thumb: the font, the size, and the marks
              actually on the words you highlighted. Tiptap only mounts it while
              there is a text selection, so it never covers a cursor. */}
          {editor && (
            <BubbleMenu editor={editor} options={{ placement: 'top', offset: 9 }}
              shouldShow={({ editor: e, from, to }) => from !== to && !e.isActive('image')}>
              <div className="a-bubble">
                <span className="a-bubblefacts">
                  <b>{FONTS.find((f) => f.value === (toolbar?.font ?? ''))?.label ?? 'Mixed'}</b>
                  <span>{(toolbar?.size || '15.5px').replace('px', '')} px</span>
                  {toolbar?.block !== 'p' && <span className="a-bubbletag">
                    {toolbar?.block === 'quote' ? 'Quote' : `H${Number((toolbar?.block ?? 'h2').slice(1)) - 1}`}
                  </span>}
                  {toolbar?.colour && <span className="a-bubbledot" style={{ background: toolbar.colour }} />}
                </span>
                <span className="a-tbdiv" />
                <Tb on={toolbar?.bold} label="Bold" onClick={() => cmd()?.toggleBold().run()}><PathIcon d="M7 5h6.5a3.5 3.5 0 0 1 0 7H7zM7 12h7.5a3.5 3.5 0 0 1 0 7H7z" w={2.2} /></Tb>
                <Tb on={toolbar?.italic} label="Italic" onClick={() => cmd()?.toggleItalic().run()}><PathIcon d="M15 5h-5M14 19H9M14.5 5 10 19" w={2.2} /></Tb>
                <Tb on={toolbar?.underline} label="Underline" onClick={() => cmd()?.toggleUnderline().run()}><PathIcon d="M7 4v6a5 5 0 0 0 10 0V4M6 20h12" w={2.2} /></Tb>
                <Tb on={toolbar?.strike} label="Strikethrough" onClick={() => cmd()?.toggleStrike().run()}><PathIcon d="M4 12h16M7 8a4 3 0 0 1 8-1M17 15a4 3 0 0 1-9 2" w={2} /></Tb>
                <Tb on={toolbar?.link} label="Link" onClick={() => setInserting('link')}><PathIcon d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7L12.5 19.5" /></Tb>
                <span className="a-tbdiv" />
                <select className="a-tbsel sm" aria-label="Text size of the selection" value={toolbar?.size ?? ''}
                  onChange={(e) => (e.target.value ? cmd()?.setFontSize(e.target.value).run() : cmd()?.unsetFontSize().run())}>
                  {SIZES.map((v) => <option key={v.value} value={v.value}>{v.label}</option>)}
                </select>
                <button className="a-tb wide" title="Clear the formatting on the selection"
                  onClick={() => cmd()?.unsetAllMarks().run()}>Clear</button>
              </div>
            </BubbleMenu>
          )}

          {/* ---- a picture in the article ----
              !! WITHOUT THIS THERE IS NO WAY TO FIX AN IMAGE'S ALT TEXT. The
              library's Alt text button sets the file's default; this sets what
              THIS article says about it, which is what actually ships in the
              <img>. Before, an image inserted without alt text could only be
              deleted and re-inserted. */}
          {editor && (
            <BubbleMenu editor={editor} options={{ placement: 'top', offset: 9 }}
              shouldShow={({ editor: e }) => e.isActive('image')}>
              <div className="a-bubble">
                <span className="a-bubblefacts">
                  {toolbar?.imageAlt
                    ? <><b>Alt text</b><span className="a-bubbletrunc">“{toolbar.imageAlt}”</span></>
                    : <span className="a-pill draft">No alt text</span>}
                </span>
                <span className="a-tbdiv" />
                <button className="a-tb wide" onClick={() => setInserting('alt')}>
                  {toolbar?.imageAlt ? 'Edit alt text' : 'Add alt text'}
                </button>
                <Tb label="Remove picture" onClick={() => cmd()?.deleteSelection().run()}>
                  <PathIcon d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" w={1.8} />
                </Tb>
              </div>
            </BubbleMenu>
          )}
          <EditorContent editor={editor} />
        </div>

        <div className="a-status">
          <span className="a-tnum">{words.toLocaleString()} words</span>
          <span className="a-dotsep" />
          <span className="a-tnum">{Math.max(1, Math.round(words / 225))} min read</span>
          <span className="a-dotsep" />
          <span>{saving === 'saving' ? 'Saving…' : saving === 'saved' ? 'Saved' : 'All changes saved'}</span>
        </div>

        <div className="a-actionbar">
          <button className="a-btn" onClick={onClose}>Back to posts</button>
          <button className="a-btn" onClick={() => void save()}>Save now</button>
          <span className="a-spacer" />
          <span className={`a-pill ${post.status === 'published' ? 'live' : post.status === 'scheduled' ? 'sched' : 'draft'}`}>
            {post.status === 'published' ? 'Published' : post.status === 'scheduled' ? 'Scheduled' : 'Draft'}
          </span>
          {canPublish ? (
            post.status === 'published'
              ? <button className="a-btn" onClick={() => void publish('unpublish')}>Move to draft</button>
              : <button className="a-btn go" onClick={() => void publish('publish')}>Publish</button>
          ) : (
            <span className="a-hint">Ask an editor to publish this.</span>
          )}
        </div>
      </div>

      {/* ---- search appearance and publishing ---- */}
      <aside className="a-edside">
        <div className="a-card">
          <h3>Search appearance</h3>
          <div className="a-serp">
            <div className="crumb">
              <span className="fav" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#05838b" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M7 19H4a2 2 0 0 1-1.7-3l1.6-2.7M17 19h3a2 2 0 0 0 1.7-3l-4.4-7.5M9 19h6" />
                </svg>
              </span>
              <span className="host">Recycle Technologies
                <small>recycletechnologies.com{post.slug ? ` › ${post.slug}` : ''}</small>
              </span>
            </div>
            <div className="t">{metaTitle || 'Untitled post'}</div>
            <div className="d">{metaDesc || 'Google will write its own description from the page.'}</div>
          </div>
          <div className="a-stack" style={{ marginTop: 12 }}>
            <Meter label="Title width" value={titleWidth} limit={580} />
            <Meter label="Description width" value={descWidth} limit={920} />
          </div>
          <p className="a-hint" style={{ margin: '10px 0 0' }}>
            Measured in pixels, the way Google truncates — not characters.
          </p>
        </div>

        <div className="a-card">
          <h3>URL</h3>
          <div className="a-field">
            <label htmlFor="slug">Slug</label>
            <input id="slug" className="a-inp a-mono" value={post.slug}
              onChange={(e) => field('slug', e.target.value)} />
          </div>
          <p className="a-hint" style={{ margin: '8px 0 10px' }}>
            {post.status === 'published'
              ? 'This post is live at that URL. Changing it creates a 301 from the old one automatically.'
              : 'Not published yet, so changing this breaks nothing.'}
          </p>

          {/* ! CANONICAL IS A DECLARATION, NOT A REDIRECT. Filled in, it tells
              Google "the real version of this page is over there", and the
              ranking goes there instead. Empty is the right answer for almost
              every post; it is here for the two cases that matter — a piece
              syndicated to a partner site, and near-duplicate location pages
              that should all credit one original. */}
          <div className="a-field">
            <label htmlFor="canonical">Canonical URL <span className="a-hint">optional</span></label>
            <input id="canonical" className="a-inp a-mono" value={post.canonical_url ?? ''}
              placeholder="Leave empty — this post is the original"
              onChange={(e) => field('canonical_url', e.target.value || null)} />
            <p className="a-hint">
              {post.canonical_url
                ? 'Set. Google will credit that URL and not this one — make sure that is what you want.'
                : 'Only fill this in if this article is a copy of one that lives somewhere else.'}
            </p>
          </div>
        </div>

        {/* ---- featured image ---- */}
        <div className="a-card">
          <h3>Featured image</h3>
          {post.featured_url ? (
            <>
              <div className="a-featured">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.featured_url} alt="" />
              </div>
              <p className="a-hint" style={{ margin: '8px 0 10px' }}>
                {post.featured_filename}
                {post.featured_width ? ` · ${post.featured_width}×${post.featured_height}` : ''}
              </p>
              <div className="a-field">
                <label htmlFor="featuredAlt">Alt text</label>
                <input id="featuredAlt" className="a-inp"
                  value={post.featured_alt ?? post.featured_media_alt ?? ''}
                  placeholder="What is in the picture"
                  onChange={(e) => field('featured_alt', e.target.value)} />
                <p className="a-hint">Read aloud instead of the image, read by Google to rank it in image search, and shown if the image fails to load.</p>
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                <button className="a-btn sm" onClick={() => setInserting('featured')}>Replace</button>
                <button className="a-btn sm stop" onClick={() => {
                  setPost((pp) => {
                    const next = pp ? { ...pp, featured_media_id: null, featured_url: null, featured_alt: null } : pp
                    live.current = next
                    return next
                  })
                  dirty.current = true
                  void save({ featured_media_id: null, featured_alt: null })
                }}>Remove</button>
              </div>
            </>
          ) : (
            <>
              <button className="a-featuredempty" onClick={() => setInserting('featured')}>
                <PathIcon d="M3 4h18v16H3zM9 10a2 2 0 1 1-.01 0M21 17l-5-5-6 6" />
                <span>Choose or upload a picture</span>
              </button>
              <p className="a-hint" style={{ margin: '9px 0 12px' }}>
                The image at the top of the article, and the one that shows when the
                link is posted to LinkedIn or Facebook. Landscape, at least 1200px wide.
              </p>
              {/* The alt text box is here before the picture is, because it is
                  the sentence a writer has in their head while they are choosing
                  one — and because a field that appears only after some other
                  step is a field nobody knows exists. */}
              <div className="a-field">
                <label htmlFor="featuredAltEmpty">Alt text</label>
                <input id="featuredAltEmpty" className="a-inp" value={post.featured_alt ?? ''}
                  placeholder="What is in the picture"
                  onChange={(e) => field('featured_alt', e.target.value)} />
                <p className="a-hint">
                  Read aloud instead of the image and read by Google. Saved now and used
                  the moment you choose a picture.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="a-card">
          <h3>Checks</h3>
          <ul className="a-checks">
            {checks.map((c) => (
              <li key={c.t} className={c.k}>
                <span className="m">{c.k === 'ok' ? '✓' : c.k === 'no' ? '!' : '×'}</span>
                <span><b>{c.t}</b><small>{c.n}</small></span>
              </li>
            ))}
          </ul>
        </div>

        <div className="a-card">
          <h3>Publishing</h3>
          <div className="a-stack">
            <div className="a-field">
              <label htmlFor="cat">Category</label>
              <select id="cat" className="a-inp" value={post.category_id ?? ''}
                onChange={(e) => field('category_id', e.target.value ? Number(e.target.value) : null)}>
                <option value="">No category</option>
                {/* Sub-categories are indented rather than put in <optgroup>,
                    because an optgroup label is not selectable and a main
                    category has to stay choosable in its own right. */}
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.parent_id ? `\u00a0\u00a0— ${c.name}` : c.name}</option>
                ))}
              </select>
            </div>
            <div className="a-field">
              <label htmlFor="author">Author</label>
              <div style={{ display: 'flex', gap: 6 }}>
                <select id="author" className="a-inp" value={post.author_id ?? ''}
                  onChange={(e) => field('author_id', e.target.value ? Number(e.target.value) : null)}>
                  <option value="">No author</option>
                  {authors.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
                <button className="a-btn sm" style={{ flex: 'none' }} title="Add an author"
                  onClick={() => setInserting('author')}>
                  <PathIcon d="M12 5v14M5 12h14" w={2.2} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="a-card">
          <h3>Indexing</h3>
          <Switch on={post.robots_index} label="Allow search engines" note="index, follow"
            onToggle={() => field('robots_index', !post.robots_index)} />
          <Switch on={post.in_sitemap} label="Show in sitemap" note="Rebuilt when you publish"
            onToggle={() => field('in_sitemap', !post.in_sitemap)} />
          <Switch on={post.allow_ai_answers} label="Allow AI answer engines" note="ChatGPT, Perplexity, Claude search"
            onToggle={() => field('allow_ai_answers', !post.allow_ai_answers)} />
        </div>
      </aside>

      {inserting === 'link' && (
        <LinkDialog
          initial={editor?.getAttributes('link').href ?? ''}
          selectedText={editor ? editor.state.doc.textBetween(
            editor.state.selection.from, editor.state.selection.to, ' ') : ''}
          onCancel={() => setInserting(null)}
          onRemove={() => { cmd()?.unsetLink().run(); setInserting(null) }}
          onSubmit={(href, text, newTab) => {
            const attrs = newTab
              ? { href, target: '_blank', rel: 'noopener noreferrer' }
              : { href, target: null }
            /* !! setLink ALONE DOES NOTHING WHEN NOTHING IS SELECTED. It applies
               a mark to a range, and an empty cursor is a range of zero — so the
               dialog closes, the document is unchanged, and it looks like the
               button is broken. With no selection we insert the words ourselves
               and carry the mark in with them. */
            if (text) cmd()?.insertContent({ type: 'text', text, marks: [{ type: 'link', attrs }] }).run()
            else cmd()?.setLink(attrs).run()
            setInserting(null)
          }}
        />
      )}

      {inserting === 'image' && (
        <PictureDialog
          title="Insert a picture"
          onCancel={() => setInserting(null)}
          onToast={onToast}
          onInsert={(m) => {
            cmd()?.setImage({ src: m.url, alt: m.alt ?? '' }).run()
            setInserting(null)
            // The advice used to be "add one from the Media screen", which was
            // the only place you could. Now you can do it where you are.
            if (!m.alt) onToast('Inserted — click it to add alt text.')
          }}
        />
      )}

      {inserting === 'featured' && (
        <PictureDialog
          title="Featured image"
          onCancel={() => setInserting(null)}
          onToast={onToast}
          onInsert={(m) => {
            setPost((pp) => {
              const next = pp ? {
                ...pp, featured_media_id: m.id, featured_url: m.url,
                featured_filename: m.filename, featured_width: m.width, featured_height: m.height,
                featured_media_alt: m.alt, featured_alt: pp.featured_alt || m.alt,
              } : pp
              live.current = next
              return next
            })
            dirty.current = true
            void save({ featured_media_id: m.id, featured_alt: post.featured_alt || m.alt })
            setInserting(null)
          }}
        />
      )}

      {converting && (
        <ConfirmDialog
          title="Convert this post to the editor's format?"
          confirmLabel="Convert"
          busyLabel="Converting…"
          onCancel={() => setConverting(false)}
          onConfirm={convert}
        >
          <p>The article is currently stored exactly as WordPress wrote it, and the
            live page serves that markup unchanged.</p>
          <p><b>Converting reads it into this editor, and anything the editor has no
            place for is dropped.</b> On these posts that usually means the green
            call-to-action panels, hand-built comparison tables, and the FAQ schema
            block that earns the rich result in Google.</p>
          <p>Check the page afterwards. Nothing changes on the site until you save,
            and the version you see now is what visitors get until then.</p>
        </ConfirmDialog>
      )}

      {inserting === 'alt' && (
        <AskDialog
          title={toolbar?.imageAlt ? 'Edit the alt text' : 'Alt text for this picture'}
          label="Alt text"
          initial={toolbar?.imageAlt ?? ''}
          placeholder="A hard drive shredder on the Blaine processing line"
          confirmLabel="Save alt text"
          required={false}
          multiline
          intro={<>Alt text is read aloud instead of the picture, is what Google reads to
            rank it in image search, and is what shows if the image fails to load. Describe
            what is in it, in a sentence.</>}
          help="Leave it empty only for a picture that is pure decoration and says nothing the words do not."
          onCancel={() => setInserting(null)}
          onSubmit={(alt) => {
            cmd()?.updateAttributes('image', { alt }).run()
            setInserting(null)
            onToast(alt ? 'Alt text saved' : 'Alt text cleared')
          }}
        />
      )}

      {inserting === 'author' && (
        <AuthorDialog
          onCancel={() => setInserting(null)}
          onAdded={(a) => { setInserting(null); field('author_id', a.id); onAuthorAdded(a) }}
        />
      )}
    </div>
  )
}


/**
 * A button with a caret beside it: clicking the button does the obvious thing
 * (toggle the list), clicking the caret opens the markers. Google Docs works
 * this way and it is the reason the toolbar does not need two buttons per list.
 */
function SplitButton({ on, label, menuLabel, onClick, icon, children }: {
  on?: boolean; label: string; menuLabel: string; onClick: () => void
  icon: React.ReactNode
  children: (close: () => void) => React.ReactNode
}) {
  return (
    <span className="a-split">
      <button type="button" className={`a-tb${on ? ' on' : ''}`} title={label} aria-label={label} onClick={onClick}>
        {icon}
      </button>
      <Menu label={menuLabel} width={216} grid icon={<span className="a-splitcaret" />}>{children}</Menu>
    </span>
  )
}

/**
 * Everything you can do to a table.
 *
 * The old toolbar had one button that inserted a 3×3 and then abandoned you:
 * no way to add a row, no header, no way to get rid of it. Tiptap ships all of
 * these commands; nothing was exposing them.
 */
function TableMenu({ editor, inTable, close }: { editor: Editor | null; inTable: boolean; close: () => void }) {
  const run = (fn: () => void) => () => { fn(); close() }
  const chain = () => editor?.chain().focus()

  if (!inTable) {
    return (
      <>
        <MenuItem onClick={run(() => { chain()?.insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() })}>
          Insert table<small>3 × 3 with a header row</small>
        </MenuItem>
        <MenuItem onClick={run(() => { chain()?.insertTable({ rows: 2, cols: 2, withHeaderRow: true }).run() })}>
          Insert small table<small>2 × 2</small>
        </MenuItem>
        <MenuDivider />
        <MenuNote>Put the cursor inside a table and this menu fills up with rows, columns and headers.</MenuNote>
      </>
    )
  }
  return (
    <>
      <MenuItem onClick={run(() => { chain()?.addRowBefore().run() })}>Insert row above</MenuItem>
      <MenuItem onClick={run(() => { chain()?.addRowAfter().run() })}>Insert row below</MenuItem>
      <MenuItem onClick={run(() => { chain()?.addColumnBefore().run() })}>Insert column left</MenuItem>
      <MenuItem onClick={run(() => { chain()?.addColumnAfter().run() })}>Insert column right</MenuItem>
      <MenuDivider />
      <MenuItem onClick={run(() => { chain()?.toggleHeaderRow().run() })}>
        Header row<small>Bold, and read as headings by screen readers</small>
      </MenuItem>
      <MenuItem onClick={run(() => { chain()?.toggleHeaderColumn().run() })}>Header column</MenuItem>
      <MenuItem onClick={run(() => { chain()?.mergeOrSplit().run() })}>Merge or split cells</MenuItem>
      <MenuDivider />
      <MenuItem onClick={run(() => { chain()?.deleteRow().run() })}>Delete row</MenuItem>
      <MenuItem onClick={run(() => { chain()?.deleteColumn().run() })}>Delete column</MenuItem>
      <MenuItem onClick={run(() => { chain()?.deleteTable().run() })}>Delete table</MenuItem>
    </>
  )
}


/**
 * How the post will read once it is published.
 *
 * !! WHAT THIS IS AND IS NOT. It renders the editor's own HTML in the site's
 * article typography — the column width, the heading scale, the link colour — so
 * a writer can see rhythm and length rather than guess at them. It is NOT the
 * live template: the public page is still built from MDX and does not read the
 * database yet, so the header, footer and related-posts strip are not here. When
 * /[slug] starts reading from posts, this should be replaced by an iframe of the
 * real draft URL, and the honest thing until then is to say so, which the strip
 * along the bottom does.
 *
 * dangerouslySetInnerHTML is safe here in a way it would not be on a public
 * page: this exact string came out of our own editor a millisecond ago, through
 * a schema that only admits the nodes in editor-extensions.ts, and it is being
 * shown to its own author in an admin behind a login.
 */
function Preview({ post, html, words, category, author, onClose }: {
  post: Post; html: string; words: number
  category: string | null; author: string | null
  onClose: () => void
}) {
  const date = new Date(post.published_at ?? Date.now()).toLocaleDateString('en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="a-preview">
      <header className="a-previewbar">
        <span className="a-pill sched">Preview</span>
        <span className="a-mono">recycletechnologies.com/{post.slug}/</span>
        <span className="a-spacer" />
        <button className="a-btn" onClick={onClose}>
          <PathIcon d="M6 6l12 12M18 6L6 18" /> Close preview
        </button>
      </header>

      <div className="a-previewscroll">
        <article className="a-article">
          {category && <p className="kicker">{category}</p>}
          <h1>{post.title || 'Untitled'}</h1>
          <p className="byline">
            {author && <>By {author} · </>}{date} · {Math.max(1, Math.round(words / 225))} min read
          </p>
          {post.featured_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="hero" src={post.featured_url}
              alt={post.featured_alt || post.featured_media_alt || ''} />
          )}
          <div className="tiptap" dangerouslySetInnerHTML={{ __html: html }} />
        </article>

        <p className="a-previewnote">
          This is the article in the site&rsquo;s own typography. The header, footer and
          related posts are not here — the public page is still built from MDX and does
          not read the database yet.
        </p>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- inserting */

/**
 * A link.
 *
 * Two things this does that the old prompt() could not: it offers to remove a
 * link you are standing on, and it makes "open in a new tab" a choice rather
 * than something nobody can express. The rel is not optional when target is
 * _blank — without noopener the page you link to gets a handle on ours.
 */
function LinkDialog({ initial, selectedText, onCancel, onRemove, onSubmit }: {
  initial: string; selectedText: string
  onCancel: () => void; onRemove: () => void
  onSubmit: (href: string, insertText: string, newTab: boolean) => void
}) {
  const [href, setHref] = useState(initial)
  const [text, setText] = useState('')
  const [newTab, setNewTab] = useState(false)
  const value = href.trim()
  const hasSelection = selectedText.trim().length > 0

  // A bare domain typed into a link box means https, not a relative path.
  const normalised = !value ? ''
    : /^(https?:|mailto:|tel:|#|\/)/.test(value) ? value
    : `https://${value}`

  return (
    <Dialog
      title={initial ? 'Edit link' : 'Add a link'}
      onClose={onCancel}
      intro={hasSelection
        ? <>“{selectedText.slice(0, 60)}{selectedText.length > 60 ? '…' : ''}” becomes the link.</>
        : <>Nothing is selected, so the words below are inserted as the link.</>}
      footer={<>
        {initial && <button className="a-btn stop" onClick={onRemove}>Remove link</button>}
        <span className="a-spacer" />
        <button className="a-btn" onClick={onCancel}>Cancel</button>
        <button className="a-btn p" disabled={!value} onClick={() => onSubmit(normalised, hasSelection ? '' : (text.trim() || normalised), newTab)}>
          {initial ? 'Update link' : 'Add link'}
        </button>
      </>}
    >
      <div className="a-stack">
        <div className="a-field">
          <label htmlFor="link-href">Address</label>
          <input id="link-href" className="a-inp a-mono" value={href} autoComplete="off"
            placeholder="/services/electronics-recycling/  or  recycletechnologies.com"
            onChange={(e) => setHref(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && value) { e.preventDefault(); onSubmit(normalised, hasSelection ? '' : (text.trim() || normalised), newTab) } }} />
          {normalised !== href.trim() && normalised && <p className="a-hint a-mono">Saved as {normalised}</p>}
          <p className="a-hint">Start with <b>/</b> for a page on this site — that keeps the link working
            if the domain ever changes.</p>
        </div>
        {!hasSelection && (
          <div className="a-field">
            <label htmlFor="link-text">Words to show</label>
            <input id="link-text" className="a-inp" value={text} placeholder={normalised || 'our e-waste services'}
              onChange={(e) => setText(e.target.value)} />
            <p className="a-hint">“Click here” is the one to avoid — it tells a reader using a screen
              reader nothing, and Google reads link text as a description of what it points at.</p>
          </div>
        )}
        <label className="a-check">
          <input type="checkbox" checked={newTab} onChange={(e) => setNewTab(e.target.checked)} />
          <span>Open in a new tab<br />
            <span className="a-hint">Worth it for a different site. Irritating for our own pages.</span></span>
        </label>
      </div>
    </Dialog>
  )
}


/**
 * Adding a byline.
 *
 * !! THIS DOES NOT CREATE A LOGIN. It is a name that can appear on an article —
 * a users row with no password, which nothing can sign in as. Giving somebody
 * access to the admin is a separate, deliberate act by an administrator, and
 * conflating the two is how a CMS ends up with six live accounts nobody meant
 * to create.
 */
function AuthorDialog({ onCancel, onAdded }: {
  onCancel: () => void; onAdded: (a: Named) => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function go() {
    setBusy(true); setError('')
    const res = await fetch(api('/authors'), {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), email: email.trim() }),
    })
    const data = await res.json().catch(() => ({}))
    setBusy(false)
    if (!res.ok) { setError(data.error ?? 'Could not add that author.'); return }
    onAdded({ id: data.author.id, name: data.author.name })
  }

  return (
    <Dialog
      title="Add an author"
      onClose={onCancel}
      intro={<>A name that can appear on an article. It does not create a login — an
        administrator does that separately if this person needs one.</>}
      footer={<>
        <button className="a-btn" onClick={onCancel} disabled={busy}>Cancel</button>
        <button className="a-btn p" disabled={busy || !name.trim()} onClick={() => void go()}>
          {busy ? 'Adding…' : 'Add author'}
        </button>
      </>}
    >
      <div className="a-stack">
        <div className="a-field">
          <label htmlFor="authorName">Name</label>
          <input id="authorName" className="a-inp" value={name} placeholder="Rizwan Haider"
            onChange={(e) => { setName(e.target.value); setError('') }}
            onKeyDown={(e) => { if (e.key === 'Enter' && name.trim()) { e.preventDefault(); void go() } }} />
          <p className="a-hint">Exactly as it should read under the headline.</p>
        </div>
        <div className="a-field">
          <label htmlFor="authorEmail">Email <span className="a-hint">optional</span></label>
          <input id="authorEmail" className="a-inp" type="email" value={email}
            placeholder="rizwan@recycletechnologies.com"
            onChange={(e) => { setEmail(e.target.value); setError('') }} />
          <p className="a-hint">Only needed if they will be given a login later.</p>
        </div>
        {error && <div className="a-err">{error}</div>}
      </div>
    </Dialog>
  )
}

/** The media library, in a dialog, with Insert on every tile. */
function PictureDialog({ title, onCancel, onInsert, onToast }: {
  title: string; onCancel: () => void; onInsert: (m: MediaRow) => void; onToast: (m: string) => void
}) {
  return (
    <Dialog
      title={title}
      wide
      onClose={onCancel}
      intro={<>Drop a file in to upload it, or pick something already in the library.</>}
      footer={<button className="a-btn" onClick={onCancel}>Close</button>}
    >
      <MediaLibrary mode="pick" canDelete={false} onToast={onToast}
        onPick={(m) => { if (isImage(m.mime)) onInsert(m); else onToast('That is a PDF. Link to it instead of inserting it.') }} />
    </Dialog>
  )
}

/* -------------------------------------------------------------- fragments */

function Tb({ on, label, onClick, children }: {
  on?: boolean; label: string; onClick: () => void; children: React.ReactNode
}) {
  return (
    <button type="button" className={`a-tb${on ? ' on' : ''}`} title={label} aria-label={label}
      aria-pressed={on ? 'true' : 'false'}
      onMouseDown={(e) => e.preventDefault()} onClick={onClick}>{children}</button>
  )
}

function PathIcon({ d, w = 2 }: { d: string; w?: number }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

function Meter({ label, value, limit }: { label: string; value: number; limit: number }) {
  const pct = Math.min(100, Math.round((value / limit) * 100))
  const cls = value > limit ? ' bad' : pct > 88 ? ' warn' : ''
  return (
    <div>
      <div className={`a-meter${cls}`}><i style={{ width: `${pct}%` }} /></div>
      <div className="a-counter"><span>{label}</span><span className="a-tnum">{value} / {limit} px</span></div>
    </div>
  )
}

function Switch({ on, label, note, onToggle }: { on: boolean; label: string; note: string; onToggle: () => void }) {
  return (
    <div className="a-switch">
      <span><p>{label}</p><small>{note}</small></span>
      <button type="button" className="a-sw" aria-pressed={on ? 'true' : 'false'} aria-label={label} onClick={onToggle} />
    </div>
  )
}

/* ---------------------------------------------------------------- outline */
type Heading = { pos: number; level: number; text: string }

/** Reads the headings straight out of the document, so the rail can never
 *  disagree with what is written. */
function useOutline(editor: Editor | null): Heading[] {
  const [headings, setHeadings] = useState<Heading[]>([])
  useEffect(() => {
    if (!editor) return
    const read = () => {
      const found: Heading[] = []
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'heading') {
          found.push({ pos, level: Number(node.attrs.level ?? 2), text: node.textContent })
        }
      })
      setHeadings(found)
    }
    /* 'transaction' rather than 'update': loading a post calls setContent with
       emitUpdate off (so it does not immediately save itself back), and that
       fires no update event at all — which left the outline empty on every post
       you opened. docChanged filters out the selection-only transactions. */
    const onTx = ({ transaction }: { transaction: { docChanged: boolean } }) => {
      if (transaction.docChanged) read()
    }
    read()
    editor.on('transaction', onTx)
    return () => { editor.off('transaction', onTx) }
  }, [editor])
  return headings
}

/* ------------------------------------------------------ Google Docs paste */
/**
 * Runs on every paste. Three jobs, in this order:
 *   1. turn inline font-weight / font-style into real <strong> and <em>, BEFORE
 *      the styles are stripped, or the emphasis is lost with them;
 *   2. strip the Docs presentation junk that would override the site's fonts;
 *   3. unwrap google.com/url?q=… back to the real destination.
 *
 * Runs in the browser, so DOMParser is available.
 */
export function cleanGoogleDocsHtml(html: string): string {
  if (typeof DOMParser === 'undefined') return html
  const doc = new DOMParser().parseFromString(html, 'text/html')

  // Docs wraps the whole payload in <b id="docs-internal-guid-…" style="font-weight:normal">.
  doc.querySelectorAll('b[id^="docs-internal-guid"]').forEach((b) => b.replaceWith(...Array.from(b.childNodes)))

  doc.querySelectorAll<HTMLElement>('[style]').forEach((el) => {
    const s = el.style
    const weight = s.fontWeight
    const italic = s.fontStyle === 'italic'
    const underline = (s.textDecoration || s.textDecorationLine || '').includes('underline')

    if (weight && (weight === 'bold' || Number(weight) >= 600)) wrapInner(doc, el, 'strong')
    if (italic) wrapInner(doc, el, 'em')
    if (underline) wrapInner(doc, el, 'u')

    // Keep a deliberate highlight; drop everything Docs adds to every span.
    const keepBg = s.backgroundColor && s.backgroundColor !== 'transparent' && !/rgba\(0, 0, 0, 0\)/.test(s.backgroundColor)
    for (const prop of ['font-family', 'font-size', 'line-height', 'font-weight', 'font-style',
      'text-decoration', 'text-decoration-line', 'vertical-align', 'white-space', 'margin', 'padding']) {
      s.removeProperty(prop)
    }
    if (!keepBg) s.removeProperty('background-color')
    // Docs writes #000000 on everything; it is not a choice, it is the default.
    if (/^(rgb\(0, 0, 0\)|#000000|#000)$/i.test(s.color ?? '')) s.removeProperty('color')
    if (!el.getAttribute('style')) el.removeAttribute('style')
    el.removeAttribute('class')
    el.removeAttribute('dir')
  })

  // The one that silently damages SEO: every pasted link is a Google redirect.
  doc.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href') ?? ''
    const m = href.match(/^https?:\/\/(?:www\.)?google\.com\/url\?(.*)$/)
    if (!m) return
    const real = new URLSearchParams(m[1]).get('q')
    if (real) a.setAttribute('href', real)
  })

  return doc.body.innerHTML
}

function wrapInner(doc: Document, el: HTMLElement, tag: string) {
  const wrapper = doc.createElement(tag)
  while (el.firstChild) wrapper.appendChild(el.firstChild)
  el.appendChild(wrapper)
}
