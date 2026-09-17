'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ACCEPT, MAX_BYTES, describeRejection, isImage } from '@/lib/media-kinds'
import { ConfirmDialog, Dialog } from './Dialog'
import { api, getJSON, sendJSON } from './api'

/**
 * The media library — one component, two jobs.
 *
 *   mode="manage"  the Media screen: upload, alt text, delete
 *   mode="pick"    inside a dialog from the editor: the same grid, plus Insert
 *
 * They are the same component because they were never going to stay in sync as
 * two. The editor's "insert a picture" is the moment people actually want to
 * upload one, so the upload box has to be there too.
 */

export type MediaRow = {
  id: number; filename: string; url: string; mime: string
  width: number | null; height: number | null; bytes: string | number | null; alt: string | null
  created_at?: string
}

export function MediaLibrary({ mode, canDelete, onPick, onToast, onCount }: {
  mode: 'manage' | 'pick'
  canDelete: boolean
  onPick?: (m: MediaRow) => void
  onToast: (msg: string) => void
  onCount?: (n: number) => void
}) {
  const [rows, setRows] = useState<MediaRow[]>([])
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState('')
  const [busy, setBusy] = useState(false)
  const [over, setOver] = useState(false)
  const [editing, setEditing] = useState<MediaRow | null>(null)
  const [removing, setRemoving] = useState<MediaRow | null>(null)
  const [usedBy, setUsedBy] = useState<{ title: string; slug: string; status: string }[]>([])
  const input = useRef<HTMLInputElement>(null)

  const reload = useCallback(async () => {
    /* !! NOT A BARE fetch().then(). This runs in a useEffect on mount, and a
       network failure there — the dev server recompiling, the database gone —
       used to surface as a full-screen "Failed to fetch" runtime error that
       took the whole editor with it. getJSON never throws. */
    const r = await getJSON<{ media: MediaRow[] }>('/media')
    setLoading(false)
    if (!r.ok) { setFailed(r.error); return }
    setFailed('')
    const list = r.data.media ?? []
    setRows(list); onCount?.(list.length)
  }, [onCount])
  useEffect(() => { void reload() }, [reload])

  const upload = useCallback(async (files: FileList | File[]) => {
    const picked = [...files]
    if (picked.length === 0) return

    // Say no here rather than after a 20 MB round trip. The server checks again;
    // this is only about not wasting somebody's morning on a slow connection.
    const form = new FormData()
    const refused: string[] = []
    for (const f of picked) {
      const no = describeRejection(f)
      if (no) refused.push(`${f.name} — ${no}`)
      else form.append('files', f)
    }
    if (refused.length && form.getAll('files').length === 0) { onToast(refused[0]!); return }

    setBusy(true)
    let res: Response
    try {
      res = await fetch(api('/media'), { method: 'POST', body: form })
    } catch {
      setBusy(false); onToast('The upload did not reach the server. Try again.'); return
    }
    const data = await res.json().catch(() => ({}))
    setBusy(false)
    if (!res.ok) { onToast(data.error ?? 'The upload failed.'); return }

    const added: MediaRow[] = data.media ?? []
    setRows((r) => [...added, ...r])
    onCount?.(rows.length + added.length)
    const skipped = [...refused, ...(data.refused ?? [])]
    onToast(skipped.length
      ? `${added.length} uploaded, ${skipped.length} skipped — ${skipped[0]}`
      : `${added.length} file${added.length === 1 ? '' : 's'} uploaded`)
    /* Ask for the alt text straight away — it is the one moment anyone will
       actually write it. Except inside the picker: that is already a dialog, and
       stacking a second one on top of it to interrupt somebody who is halfway
       through inserting a picture is the kind of "helpful" that gets an editor
       sworn at. There it goes in beside the tile as a No alt text pill and the
       Alt text button next to it. */
    if (mode === 'manage' && added.length === 1 && added[0] && isImage(added[0].mime)) setEditing(added[0])
  }, [onToast, onCount, rows.length, mode])

  async function saveAlt(row: MediaRow, alt: string) {
    const r = await sendJSON<{ media: MediaRow }>('/media', 'PATCH', { id: row.id, alt })
    if (!r.ok) { onToast(r.error); return }
    const data = r.data
    setRows((rows2) => rows2.map((m) => (m.id === row.id ? { ...m, alt: data.media.alt } : m)))
    setEditing(null)
    onToast('Alt text saved')
  }

  async function doDelete(row: MediaRow, force: boolean) {
    let res: Response
    const params = new URLSearchParams(force ? { id: String(row.id), force: '1' } : { id: String(row.id) })
    try {
      res = await fetch(api('/media', params), { method: 'DELETE' })
    } catch {
      onToast('Could not reach the server — nothing was deleted.'); setRemoving(null); return
    }
    const data = await res.json().catch(() => ({}))
    if (res.status === 409 && data.error === 'in-use') { setUsedBy(data.usedBy ?? []); return }
    if (!res.ok) { onToast(data.error ?? 'Could not delete that.'); setRemoving(null); return }
    setRows((r) => r.filter((m) => m.id !== row.id))
    onCount?.(rows.length - 1)
    setRemoving(null); setUsedBy([])
    onToast(`${row.filename} deleted`)
  }

  return (
    <>
      <div
        className={`a-drop${over ? ' over' : ''}${busy ? ' busy' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setOver(true) }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); void upload(e.dataTransfer.files) }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 16V4m0 0L8 8m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        </svg>
        <p><b>{busy ? 'Uploading…' : 'Drop files here'}</b>{!busy && <> or <button className="a-link" onClick={() => input.current?.click()}>choose them</button></>}</p>
        <p className="a-hint">PNG, JPG, WebP, GIF and PDF · up to {MAX_BYTES / 1024 / 1024} MB each</p>
        <input ref={input} type="file" multiple accept={ACCEPT} hidden
          onChange={(e) => { void upload(e.target.files ?? []); e.target.value = '' }} />
      </div>

      {failed && (
        <div className="a-err" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ flex: 1 }}>{failed}</span>
          <button className="a-btn sm" onClick={() => { setLoading(true); void reload() }}>Try again</button>
        </div>
      )}
      {loading ? <p className="a-hint">Loading…</p>
        : failed ? null
        : rows.length === 0 ? <p className="a-hint">Nothing in the library yet.</p>
        : <div className="a-media">
            {rows.map((m) => (
              <figure className="a-asset" key={m.id}>
                <div className="th"><Thumb row={m} /></div>
                <figcaption>
                  <b title={m.filename}>{m.filename}</b>
                  <span>
                    {m.width && m.height ? `${m.width}×${m.height}` : ''}
                    {m.bytes ? `${m.width ? ' · ' : ''}${Math.round(Number(m.bytes) / 1024).toLocaleString()} KB` : ''}
                  </span>
                  {isImage(m.mime) && !m.alt && <div className="mt"><span className="a-pill draft">No alt text</span></div>}
                  <div className="acts">
                    {mode === 'pick' && <button className="a-btn sm p" onClick={() => onPick?.(m)}>Insert</button>}
                    <button className="a-btn sm" onClick={() => setEditing(m)}>{isImage(m.mime) ? 'Alt text' : 'Label'}</button>
                    {canDelete && <button className="a-btn sm stop" onClick={() => { setUsedBy([]); setRemoving(m) }}>Delete</button>}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>}

      {editing && <AltDialog row={editing} onCancel={() => setEditing(null)} onSave={saveAlt} />}

      {removing && (
        <ConfirmDialog
          title={usedBy.length ? 'That file is on a page' : `Delete ${removing.filename}?`}
          confirmLabel={usedBy.length ? 'Delete it anyway' : 'Delete'}
          onCancel={() => { setRemoving(null); setUsedBy([]) }}
          onConfirm={() => doDelete(removing, usedBy.length > 0)}
        >
          {usedBy.length > 0 ? (
            <>
              <p>It is still used by {usedBy.length} post{usedBy.length === 1 ? '' : 's'}. Deleting it leaves
                a broken image there, which readers see as a grey box.</p>
              <ul className="a-list">
                {usedBy.map((p) => <li key={p.slug}><b>{p.title || 'Untitled'}</b> <span className="a-mono">/{p.slug}/</span> — {p.status}</li>)}
              </ul>
            </>
          ) : (
            <p>The file is removed from the library and from the disk. This cannot be undone from here.</p>
          )}
        </ConfirmDialog>
      )}
    </>
  )
}

/**
 * A thumbnail that admits when there is nothing behind it.
 *
 * A row whose file is gone is a real state — someone cleared the folder, or the
 * host threw the disk away on redeploy (see media-store.ts). Left alone the
 * browser renders the alt text in a dotted box, which reads as a bug in the
 * admin rather than as a missing file, and nobody knows to go and look.
 */
function Thumb({ row }: { row: MediaRow }) {
  const [broken, setBroken] = useState(false)
  if (!isImage(row.mime)) return <span className="pdf">PDF</span>
  if (broken) return <span className="gone" title={`${row.url} is not there`}>File missing</span>
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={row.url} alt="" loading="lazy" onError={() => setBroken(true)} />
  )
}

/**
 * Alt text, asked for properly — and CALLED alt text, everywhere.
 *
 * It was labelled "Description" for one round, on the theory that plain English
 * beats jargon. It does not here: "alt text" is what WordPress, Google Docs,
 * LinkedIn and every SEO article call it, so "Description" left people asking
 * whether it was the same field. It is not a caption and it is not a filename —
 * it is what somebody using a screen reader hears instead of the picture, and
 * what Google reads to rank it in image search. "Photo" and "image of a thing"
 * are worse than nothing.
 */
function AltDialog({ row, onCancel, onSave }: {
  row: MediaRow; onCancel: () => void; onSave: (row: MediaRow, alt: string) => void | Promise<void>
}) {
  const [alt, setAlt] = useState(row.alt ?? '')
  const [busy, setBusy] = useState(false)
  return (
    <Dialog
      title="Alt text"
      onClose={onCancel}
      footer={<>
        <button className="a-btn" onClick={onCancel} disabled={busy}>Cancel</button>
        <button className="a-btn p" disabled={busy} onClick={async () => {
          setBusy(true); try { await onSave(row, alt) } finally { setBusy(false) }
        }}>{busy ? 'Saving…' : 'Save alt text'}</button>
      </>}
      intro={isImage(row.mime)
        ? <>Alt text is read aloud instead of the picture, is what Google reads to rank it
            in image search, and is what shows if the image fails to load. Describe what is
            in it, in a sentence.</>
        : <>A short label for what is in the file.</>}
    >
      <div className="a-altrow">
        <div className="a-altthumb"><Thumb row={row} /></div>
        <div className="a-field" style={{ flex: 1 }}>
          <label htmlFor="alt-text">Alt text</label>
          <textarea id="alt-text" className="a-inp a-ta" rows={3} value={alt}
            placeholder="A hard drive shredder on the Blaine processing line"
            onChange={(e) => setAlt(e.target.value)} />
          <p className="a-hint a-mono" style={{ wordBreak: 'break-all' }}>{row.url}</p>
        </div>
      </div>
    </Dialog>
  )
}
