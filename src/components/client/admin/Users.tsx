'use client'

import { useEffect, useState } from 'react'
import { getJSON, sendJSON } from './api'
import { Empty, Icon, Retry, Table } from './Bits'
import { ConfirmDialog, Dialog } from './Dialog'

/**
 * Accounts and what each one is allowed to do.
 *
 * Administrators only — the guard is on the endpoint as well, because a screen
 * that hides a button is not a permission.
 *
 * !! ADDING SOMEBODY HERE IS DIFFERENT FROM ADDING A BYLINE. The Authors list
 * in the post editor creates a name with no password, which can never sign in.
 * This creates a login. Both are rows in `users`, so a writer's byline and
 * their account are the same person rather than two spellings of one.
 *
 * Nobody is deleted. An account that has written anything is deactivated, so
 * the posts keep their author; a byline pointing at a hole is worse than a
 * byline belonging to somebody who left.
 */

type Row = {
  id: number; email: string; name: string; role: string; active: boolean
  last_active_at: string | null; created_at: string
  can_sign_in: boolean; post_count: number
}
type RoleInfo = { id: string; label: string; blurb: string }

export function Users({ meId, onToast }: { meId: number; onToast: (m: string) => void }) {
  const [rows, setRows] = useState<Row[]>([])
  const [roles, setRoles] = useState<RoleInfo[]>([])
  const [error, setError] = useState('')
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<Row | null>(null)
  const [deactivating, setDeactivating] = useState<Row | null>(null)

  async function load() {
    const r = await getJSON<{ users: Row[]; roles: RoleInfo[] }>('/users')
    if (r.ok) { setRows(r.data.users); setRoles(r.data.roles); setError('') } else setError(r.error)
  }
  useEffect(() => { void load() }, [])

  async function setRole(u: Row, role: string) {
    const r = await sendJSON(`/users/${u.id}`, 'PATCH', { role })
    onToast(r.ok ? `${u.name} is now ${roles.find((x) => x.id === role)?.label ?? role}` : r.error)
    void load()
  }

  const label = (id: string) => roles.find((r) => r.id === id)?.label ?? id

  return (
    <main className="a-sheet">
      <div className="a-note"><span>
        <b>Who can sign in, and what they can touch.</b> A writer drafts; an editor publishes; the
        SEO desk changes every SEO field but cannot edit the words or publish; an administrator does
        everything including this screen. Changing somebody&rsquo;s role takes effect on their next click.
      </span></div>

      {error && <Retry error={error} onRetry={() => void load()} />}

      <div className="a-toolbar" style={{ marginBottom: 14 }}>
        <span className="a-hint">{rows.filter((r) => r.active).length} active</span>
        <span className="a-spacer" />
        <button className="a-btn p" onClick={() => setAdding(true)}>
          <Icon d="M12 5v14M5 12h14" w={2.2} /> Add person
        </button>
      </div>

      <Table head={['Name', 'Signs in with', 'Role', 'Posts', 'Last active', '']}>
        {rows.length === 0 && <Empty>Nobody yet.</Empty>}
        {rows.map((u) => (
          <tr key={u.id} style={u.active ? undefined : { opacity: 0.55 }}>
            <td>
              <strong>{u.name}</strong>
              {u.id === meId && <span className="a-pill sched" style={{ marginLeft: 8 }}>You</span>}
              {!u.active && <span className="a-pill off" style={{ marginLeft: 8 }}>Deactivated</span>}
            </td>
            <td className="a-mono">
              {u.can_sign_in ? u.email : <span style={{ color: 'var(--a-muted)' }}>byline only</span>}
            </td>
            <td>
              {u.can_sign_in && u.active ? (
                <select className="a-inp" style={{ maxWidth: 190 }} value={u.role}
                  aria-label={`Role for ${u.name}`}
                  onChange={(e) => void setRole(u, e.target.value)}>
                  {roles.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
                </select>
              ) : label(u.role)}
            </td>
            <td className="a-tnum">{u.post_count}</td>
            <td className="a-mono" style={{ color: 'var(--a-muted)' }}>
              {u.last_active_at ? new Date(u.last_active_at).toISOString().slice(0, 10) : '—'}
            </td>
            <td>
              <div className="a-rowacts">
                <button className="a-btn sm" onClick={() => setEditing(u)}>Edit</button>
                {u.active && u.id !== meId && (
                  <button className="a-btn sm" onClick={() => setDeactivating(u)}>Deactivate</button>
                )}
                {!u.active && (
                  <button className="a-btn sm" onClick={async () => {
                    const r = await sendJSON(`/users/${u.id}`, 'PATCH', { active: true })
                    onToast(r.ok ? `${u.name} can sign in again` : r.error); void load()
                  }}>Reactivate</button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </Table>

      <div className="a-roles">
        {roles.map((r) => (
          <div key={r.id} className="a-card">
            <h3 className="a-h">{r.label}</h3>
            <p className="a-hint" style={{ margin: 0 }}>{r.blurb}</p>
          </div>
        ))}
      </div>

      {adding && (
        <PersonDialog roles={roles} title="Add person"
          onClose={() => setAdding(false)}
          onSave={async (v) => {
            const r = await sendJSON('/users', 'POST', v)
            if (!r.ok) return r.error
            setAdding(false); onToast(`${v.name} can now sign in`); void load()
            return null
          }} />
      )}

      {editing && (
        <PersonDialog roles={roles} title={`Edit ${editing.name}`} person={editing}
          onClose={() => setEditing(null)}
          onSave={async (v) => {
            const payload: Record<string, unknown> = { name: v.name, role: v.role }
            if (v.password) payload.password = v.password
            const r = await sendJSON(`/users/${editing.id}`, 'PATCH', payload)
            if (!r.ok) return r.error
            setEditing(null); onToast('Saved'); void load()
            return null
          }} />
      )}

      {deactivating && (
        <ConfirmDialog
          title={`Deactivate ${deactivating.name}?`}
          confirmLabel="Deactivate" busyLabel="Deactivating…"
          onCancel={() => setDeactivating(null)}
          onConfirm={async () => {
            const r = await sendJSON(`/users/${deactivating.id}`, 'DELETE')
            onToast(r.ok ? `${deactivating.name} deactivated` : r.error)
            setDeactivating(null); void load()
          }}>
          <p>
            They will not be able to sign in. Their {deactivating.post_count} post
            {deactivating.post_count === 1 ? '' : 's'} keep their byline, and you can turn the
            account back on at any time.
          </p>
        </ConfirmDialog>
      )}
    </main>
  )
}

/* ------------------------------------------------------------------ dialog */

function PersonDialog({ roles, title, person, onClose, onSave }: {
  roles: RoleInfo[]
  title: string
  person?: Row
  onClose: () => void
  /** Returns an error message, or null when it worked. */
  onSave: (v: { name: string; login: string; role: string; password: string }) => Promise<string | null>
}) {
  const [name, setName] = useState(person?.name ?? '')
  const [login, setLogin] = useState(person?.email ?? '')
  const [role, setRole] = useState(person?.role ?? 'author')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const chosen = roles.find((r) => r.id === role)

  return (
    <Dialog title={title} onClose={onClose} footer={
      <>
        <button className="a-btn" onClick={onClose} disabled={busy}>Cancel</button>
        <button className="a-btn p" disabled={busy} onClick={async () => {
          setBusy(true)
          const err = await onSave({ name, login, role, password })
          setBusy(false)
          if (err) setError(err)
        }}>{busy ? 'Saving…' : person ? 'Save' : 'Add person'}</button>
      </>
    }>
      {error && <div className="a-err">{error}</div>}
      <div className="a-stack">
        <div className="a-field">
          <label htmlFor="u-name">Name</label>
          <input id="u-name" className="a-inp" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
          <p className="a-hint">This is the byline that appears on their posts.</p>
        </div>

        <div className="a-field">
          <label htmlFor="u-login">Email or username</label>
          <input id="u-login" className="a-inp a-mono" value={login} disabled={Boolean(person)}
            onChange={(e) => setLogin(e.target.value)} />
          <p className="a-hint">
            {person
              ? 'What somebody signs in with cannot be changed here — deactivate the account and add a new one.'
              : 'An email address, or a short username like “admin”.'}
          </p>
        </div>

        <div className="a-field">
          <label htmlFor="u-role">Role</label>
          <select id="u-role" className="a-inp" value={role} onChange={(e) => setRole(e.target.value)}>
            {roles.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
          </select>
          {chosen && <p className="a-hint">{chosen.blurb}</p>}
        </div>

        <div className="a-field">
          <label htmlFor="u-pass">{person ? 'New password' : 'Password'}</label>
          <input id="u-pass" className="a-inp" type="password" autoComplete="new-password"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <p className="a-hint">
            {person
              ? 'Leave empty to keep the current one.'
              : 'At least 6 characters. Tell them in person, and ask them to change it.'}
          </p>
        </div>
      </div>
    </Dialog>
  )
}
