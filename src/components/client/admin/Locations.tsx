'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Empty, Table } from './Bits'
import { getJSON, sendJSON } from './api'

/**
 * Admin -> Locations — the location based service pages from the SEO
 * manager's brief (24 Sep 2026): ten sites, three services each.
 *
 * One table: a row per site, a cell per service. Click a site to edit its
 * address, hours, what it offers and (for partner sites) its own page; click
 * a service to edit that page. Every page starts as a draft; the checklist
 * beside each form is what "ready to publish" means, and the server enforces
 * the same list (src/lib/service-locations.ts). "View page" opens the page at
 * its real URL: a draft answers there with noindex and a Draft banner.
 *
 * Client component (CLAUDE.md rule 7) because the whole admin is one.
 */

type Check = { label: string; done: boolean; required: boolean }
type Pair = { label: string; text: string }
type Faq = { q: string; a: string }
type Review = { quote: string; author: string; place: string }
type Pickup = 'yes' | 'no' | 'ask'

type SiteData = {
  name: string; city: string; state: string; address: string; addressConfirmed: boolean
  phone: string; hours: string; hoursConfirmed: boolean; operator: 'rti' | 'partner'
  dropoff: boolean; pickup: Pickup; mailin: boolean; intro: string; logistics: string
  nearby: string[]; certifications: string[]; photo: string; seoTitle: string; seoDescription: string; notes: string
}
type PageData = {
  intro: string; audiences: string[]; accepted: Pair[]; acceptedConfirmed: boolean; notAccepted: string[]
  steps: Pair[]; packaging: string[]; certificate: string; compliance: string; complianceSource: string
  complianceVerifiedBy: string; complianceVerifiedAt: string; reviews: Review[]; faqs: Faq[]
  trackingPhone: string; h1: string; seoTitle: string; seoDescription: string; notes: string
}
type Seo = { h1: string; title: string; description: string }
type SiteRow = { slug: string; hubPath: string; published: boolean; partner: boolean; data: SiteData; checks: Check[]; ready: boolean; seo: Seo }
type PageRow = {
  site: string; service: string; offered: boolean; published: boolean; data: PageData
  url: string; checks: Check[]; ready: boolean; seo: Seo; updatedAt: string | null
}
type Service = { slug: string; name: string }
type Payload = { sites: SiteRow[]; pages: PageRow[]; services: Service[] }

type Sel = { kind: 'site'; slug: string } | { kind: 'page'; site: string; service: string } | null

export function Locations({ canEdit, onToast }: { canEdit: boolean; onToast: (m: string) => void }) {
  const [data, setData] = useState<Payload | null>(null)
  const [error, setError] = useState('')
  const [sel, setSel] = useState<Sel>(null)

  const load = useCallback(() => {
    void getJSON<Payload>('/locations').then((r) => {
      if (r.ok) { setData(r.data); setError('') } else setError(r.error)
    })
  }, [])
  useEffect(load, [load])

  if (error) return <main className="a-sheet"><div className="a-err">{error}</div></main>
  if (!data) return <main className="a-sheet"><p className="a-hint">Loading…</p></main>

  const pageOf = (site: string, service: string) => data.pages.find((p) => p.site === site && p.service === service)
  const live = data.pages.filter((p) => p.published).length
  const offered = data.pages.filter((p) => p.offered).length

  async function save(body: Record<string, unknown>, done: string) {
    const r = await sendJSON<Payload>('/locations', 'PUT', body)
    if (r.ok) { setData(r.data); onToast(done) } else onToast(r.error)
    return r.ok
  }

  const site = sel?.kind === 'site' ? data.sites.find((s) => s.slug === sel.slug) : null
  const page = sel?.kind === 'page' ? pageOf(sel.site, sel.service) : null
  const pageSite = page ? data.sites.find((s) => s.slug === page.site) : null

  return (
    <main className="a-sheet">
      <div className="a-note"><span>
        <b>Location pages for the SEO brief: 3 services at 10 sites.</b>{' '}
        {live} of {offered} pages are live. Every page starts as a draft and goes live on its own, once its checklist is met:
        an intro written for that page, accepted items checked for that site, local rules verified by a named person, at least
        5 FAQs, and the site&rsquo;s address and hours confirmed. Drafts open at their address for review but are hidden from Google,
        not in any sitemap and not linked.
      </span></div>

      <Table head={['Site', 'Site page', ...data.services.map((s) => s.name), '']}>
        {data.sites.length === 0 && <Empty>No sites yet.</Empty>}
        {data.sites.map((s) => (
          <tr key={s.slug}>
            <td>
              <span className="a-ttl">{s.data.name}</span>
              <span className="a-slug">{s.data.operator === 'rti' ? 'RTI facility' : 'Partner drop-off'} · {s.data.address || 'no address'}</span>
            </td>
            <td>
              {s.partner
                ? <Status on={s.published} ready={s.ready} checks={s.checks} />
                : <span className="a-pill live" style={{ whiteSpace: 'nowrap' }}>Existing page</span>}
            </td>
            {data.services.map((svc) => {
              const p = pageOf(s.slug, svc.slug)
              return (
                <td key={svc.slug}>
                  <button className="a-link" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }}
                    onClick={() => setSel({ kind: 'page', site: s.slug, service: svc.slug })}>
                    {p ? (p.offered ? <Status on={p.published} ready={p.ready} checks={p.checks} /> : <span className="a-pill off">Not offered</span>) : '—'}
                  </button>
                </td>
              )
            })}
            <td><button className="a-btn sm" onClick={() => setSel({ kind: 'site', slug: s.slug })}>Edit site</button></td>
          </tr>
        ))}
      </Table>

      {site && (
        <SiteEditor key={site.slug + (site.data.name)} site={site} canEdit={canEdit}
          onClose={() => setSel(null)}
          onSave={(d, published) => save({ kind: 'site', slug: site.slug, data: d, published }, published && !site.published ? 'Site page published' : 'Site saved')} />
      )}
      {page && pageSite && (
        <PageEditor key={page.site + page.service} page={page} site={pageSite}
          serviceName={data.services.find((x) => x.slug === page.service)?.name ?? page.service}
          canEdit={canEdit} onClose={() => setSel(null)}
          onSave={(d, offered, published) => save({ kind: 'page', site: page.site, service: page.service, data: d, offered, published },
            published && !page.published ? 'Page published' : !published && page.published ? 'Page taken down (draft again)' : 'Page saved')} />
      )}
    </main>
  )
}

function Status({ on, ready, checks }: { on: boolean; ready: boolean; checks: Check[] }) {
  const req = checks.filter((c) => c.required)
  const done = req.filter((c) => c.done).length
  if (on) return <span className="a-pill live">Live</span>
  return <span className={`a-pill ${ready ? 'sched' : 'draft'}`} style={{ whiteSpace: 'nowrap' }}>{ready ? 'Ready to publish' : `Draft · ${done}/${req.length}`}</span>
}

function Checklist({ checks }: { checks: Check[] }) {
  return (
    <ul className="a-checks">
      {checks.map((c) => (
        <li key={c.label} className={c.done ? 'ok' : c.required ? 'no' : 'off'}>
          <span className="m">{c.done ? '✓' : c.required ? '!' : '·'}</span>
          <span><b>{c.label}</b>{!c.required && <small>Recommended</small>}</span>
        </li>
      ))}
    </ul>
  )
}

/* ------------------------------------------------------------ form bits -- */

const lines = (s: string) => s.split('\n').map((x) => x.trim()).filter(Boolean)

function Text({ label, value, onChange, disabled, placeholder, mono, hint }: {
  label: string; value: string; onChange: (v: string) => void; disabled?: boolean; placeholder?: string; mono?: boolean; hint?: string
}) {
  return (
    <div className="a-field">
      <label>{label}</label>
      <input className={`a-inp${mono ? ' a-mono' : ''}`} value={value} placeholder={placeholder} disabled={disabled} onChange={(e) => onChange(e.target.value)} />
      {hint && <span className="a-hint">{hint}</span>}
    </div>
  )
}

function Area({ label, value, onChange, disabled, rows = 4, hint, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; disabled?: boolean; rows?: number; hint?: string; placeholder?: string
}) {
  return (
    <div className="a-field">
      <label>{label}</label>
      <textarea className="a-inp" rows={rows} value={value} placeholder={placeholder} disabled={disabled} onChange={(e) => onChange(e.target.value)} />
      {hint && <span className="a-hint">{hint}</span>}
    </div>
  )
}

function Tick({ label, checked, onChange, disabled }: { label: React.ReactNode; checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <label className="a-check">
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  )
}

/** Rows of two or three fields, with add and remove. */
function Rows<T extends Record<string, string>>({ label, rows, fields, onChange, disabled, blank, hint }: {
  label: string; rows: T[]; fields: { key: keyof T & string; label: string; area?: boolean }[]
  onChange: (rows: T[]) => void; disabled?: boolean; blank: T; hint?: string
}) {
  const set = (i: number, k: keyof T, v: string) => onChange(rows.map((r, j) => (j === i ? { ...r, [k]: v } : r)))
  return (
    <div className="a-field">
      <label>{label}</label>
      {hint && <span className="a-hint" style={{ marginBottom: 4 }}>{hint}</span>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: `${fields.map((f) => (f.area ? '2fr' : '1fr')).join(' ')} auto`, gap: 8, alignItems: 'start' }}>
            {fields.map((f) => f.area
              ? <textarea key={f.key} className="a-inp" rows={2} aria-label={f.label} placeholder={f.label} value={r[f.key]} disabled={disabled} onChange={(e) => set(i, f.key, e.target.value)} />
              : <input key={f.key} className="a-inp" aria-label={f.label} placeholder={f.label} value={r[f.key]} disabled={disabled} onChange={(e) => set(i, f.key, e.target.value)} />)}
            <button className="a-btn sm" disabled={disabled} aria-label="Remove" onClick={() => onChange(rows.filter((_, j) => j !== i))}>Remove</button>
          </div>
        ))}
        {!disabled && <div><button className="a-btn sm" onClick={() => onChange([...rows, { ...blank }])}>+ Add</button></div>}
      </div>
    </div>
  )
}

function Panel({ title, sub, children, side, onClose }: { title: string; sub: React.ReactNode; children: React.ReactNode; side: React.ReactNode; onClose: () => void }) {
  // The form opens under the table; bring it into view when it opens.
  const ref = useRef<HTMLElement>(null)
  useEffect(() => { ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, [])
  return (
    <section ref={ref} className="a-card" style={{ marginTop: 22, padding: 20, scrollMarginTop: 16 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: 18 }}>{title}</h2>
          <div className="a-hint" style={{ marginTop: 4, fontSize: 12.5 }}>{sub}</div>
        </div>
        <button className="a-btn sm" onClick={onClose}>Close</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 24, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>
        <aside style={{ position: 'sticky', top: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>{side}</aside>
      </div>
    </section>
  )
}

const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ margin: '10px 0 0', fontSize: 12, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--a-muted)' }}>{children}</h3>
)
const Two = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>{children}</div>
)

/* ----------------------------------------------------------- site editor -- */

function SiteEditor({ site, canEdit, onClose, onSave }: {
  site: SiteRow; canEdit: boolean; onClose: () => void; onSave: (d: SiteData, published: boolean) => Promise<boolean>
}) {
  const [d, setD] = useState<SiteData>(site.data)
  const [nearby, setNearby] = useState(site.data.nearby.join('\n'))
  const [certs, setCerts] = useState(site.data.certifications.join('\n'))
  const [busy, setBusy] = useState(false)
  const up = <K extends keyof SiteData>(k: K, v: SiteData[K]) => setD({ ...d, [k]: v })
  const dis = !canEdit
  const full = (): SiteData => ({ ...d, nearby: lines(nearby), certifications: lines(certs) })

  async function go(published: boolean) {
    setBusy(true)
    await onSave(full(), published)
    setBusy(false)
  }

  const side = (
    <>
      <div className="a-card" style={{ margin: 0 }}>
        <h3>{site.partner ? 'Ready to publish?' : 'Site facts'}</h3>
        <Checklist checks={site.checks} />
        <p className="a-hint" style={{ marginTop: 10 }}>The checklist updates when you save.</p>
      </div>
      <div className="a-card" style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <a className="a-btn" href={site.hubPath} target="_blank" rel="noopener noreferrer">View page</a>
        {canEdit && <button className="a-btn" disabled={busy} onClick={() => void go(site.published)}>{busy ? 'Saving…' : 'Save'}</button>}
        {canEdit && site.partner && (site.published
          ? <button className="a-btn" disabled={busy} onClick={() => void go(false)}>Take down (back to draft)</button>
          : <button className="a-btn p" disabled={busy || !site.ready} title={site.ready ? '' : 'Finish the required items first, then save'} onClick={() => void go(true)}>Publish site page</button>)}
        {site.partner && !site.published && !site.ready && <p className="a-hint">Publish unlocks when every required item is ticked. Save first to update the list.</p>}
      </div>
    </>
  )

  return (
    <Panel title={`Site: ${site.data.name}`} onClose={onClose} side={side}
      sub={site.partner ? <>Its own page: <span className="a-mono">{site.hubPath}</span></> : <>Its hub is the existing facility page <span className="a-mono">{site.hubPath}</span>; these facts feed its service pages.</>}>
      <H>Place</H>
      <Two>
        <Text label="Name used on pages" value={d.name} onChange={(v) => up('name', v)} disabled={dis} hint='"Phoenix, AZ" or "Minnesota"' />
        <Text label="City" value={d.city} onChange={(v) => up('city', v)} disabled={dis} />
        <Text label="State (2 letters)" value={d.state} onChange={(v) => up('state', v.toUpperCase().slice(0, 2))} disabled={dis} />
      </Two>
      <Text label="Street address" value={d.address} onChange={(v) => up('address', v)} disabled={dis} hint="As it should appear, with ZIP: 1545 E. Victory St, Phoenix, AZ 85040" />
      <Tick label="Address confirmed as current (called the site or checked with operations)" checked={d.addressConfirmed} onChange={(v) => up('addressConfirmed', v)} disabled={dis} />
      <Two>
        <Text label="Phone" value={d.phone} onChange={(v) => up('phone', v)} disabled={dis} />
        <Text label="Hours" value={d.hours} onChange={(v) => up('hours', v)} disabled={dis} placeholder="Mon to Fri 8:00 AM to 4:30 PM" />
      </Two>
      <Tick label="Phone and hours confirmed" checked={d.hoursConfirmed} onChange={(v) => up('hoursConfirmed', v)} disabled={dis} />

      <H>What this site offers</H>
      <Two>
        <div className="a-field"><label>Run by</label>
          <select className="a-inp" value={d.operator} disabled={dis} onChange={(e) => up('operator', e.target.value as SiteData['operator'])}>
            <option value="partner">Partner drop-off site</option>
            <option value="rti">RTI facility</option>
          </select>
        </div>
        <div className="a-field"><label>Business pickup from here</label>
          <select className="a-inp" value={d.pickup} disabled={dis} onChange={(e) => up('pickup', e.target.value as Pickup)}>
            <option value="ask">Not confirmed (page says: call to ask)</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </Two>
      <Tick label="Drop-off accepted at this site" checked={d.dropoff} onChange={(v) => up('dropoff', v)} disabled={dis} />
      <Tick label="Mail-in kits offered (nationwide program)" checked={d.mailin} onChange={(v) => up('mailin', v)} disabled={dis} />
      <Area label="Certifications this site holds (one per line)" value={certs} onChange={setCerts} disabled={dis} rows={2}
        hint="Only what is verified for THIS site. Leave empty for partner sites unless confirmed." />

      <H>Content</H>
      {site.partner && (
        <Area label="Site intro" value={d.intro} onChange={(v) => up('intro', v)} disabled={dis} rows={4}
          hint={`${d.intro.trim().length} characters, 80 or more. What can be recycled here, for whom, how to get started. Blank line = new paragraph.`} />
      )}
      <Area label="Dock, parking and check-in notes" value={d.logistics} onChange={(v) => up('logistics', v)} disabled={dis} rows={2} />
      <Area label="Nearby cities served (one per line)" value={nearby} onChange={setNearby} disabled={dis} rows={4} hint="At least 3. Shown on the page and in the schema's areaServed." />
      <Text label="Photo of the site (media library URL)" value={d.photo} onChange={(v) => up('photo', v)} disabled={dis} mono placeholder="/uploads/2026/09/phoenix-site.jpg" hint="A real photo of the site. Copy the address from Media." />

      {site.partner && (
        <>
          <H>SEO (leave blank to use the generated text)</H>
          <Text label="Title" value={d.seoTitle} onChange={(v) => up('seoTitle', v)} disabled={dis} placeholder={site.seo.title} />
          <Area label="Meta description" value={d.seoDescription} onChange={(v) => up('seoDescription', v)} disabled={dis} rows={2} placeholder={site.seo.description} />
        </>
      )}
      <Area label="Internal notes (never shown)" value={d.notes} onChange={(v) => up('notes', v)} disabled={dis} rows={2} />
    </Panel>
  )
}

/* ----------------------------------------------------------- page editor -- */

function PageEditor({ page, site, serviceName, canEdit, onClose, onSave }: {
  page: PageRow; site: SiteRow; serviceName: string; canEdit: boolean; onClose: () => void
  onSave: (d: PageData, offered: boolean, published: boolean) => Promise<boolean>
}) {
  const [d, setD] = useState<PageData>(page.data)
  const [offered, setOffered] = useState(page.offered)
  const [aud, setAud] = useState(page.data.audiences.join('\n'))
  const [notAcc, setNotAcc] = useState(page.data.notAccepted.join('\n'))
  const [pack, setPack] = useState(page.data.packaging.join('\n'))
  const [busy, setBusy] = useState(false)
  const up = <K extends keyof PageData>(k: K, v: PageData[K]) => setD({ ...d, [k]: v })
  const dis = !canEdit
  const full = (): PageData => ({ ...d, audiences: lines(aud), notAccepted: lines(notAcc), packaging: lines(pack) })

  async function go(published: boolean) {
    setBusy(true)
    await onSave(full(), offered, published)
    setBusy(false)
  }

  const side = (
    <>
      <div className="a-card" style={{ margin: 0 }}>
        <h3>Ready to publish?</h3>
        <Checklist checks={page.checks} />
        <p className="a-hint" style={{ marginTop: 10 }}>The checklist updates when you save.</p>
      </div>
      <div className="a-card" style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {page.offered && <a className="a-btn" href={page.url} target="_blank" rel="noopener noreferrer">View page</a>}
        {canEdit && <button className="a-btn" disabled={busy} onClick={() => void go(page.published && offered)}>{busy ? 'Saving…' : 'Save'}</button>}
        {canEdit && (page.published
          ? <button className="a-btn" disabled={busy} onClick={() => void go(false)}>Take down (back to draft)</button>
          : <button className="a-btn p" disabled={busy || !page.ready || !offered} title={page.ready ? '' : 'Finish the required items first, then save'} onClick={() => void go(true)}>Publish page</button>)}
        {!page.published && !page.ready && <p className="a-hint">Publish unlocks when every required item is ticked. Save first to update the list.</p>}
      </div>
      <div className="a-card" style={{ margin: 0 }}>
        <h3>Google will see</h3>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>{page.seo.title}</p>
        <p className="a-mono" style={{ margin: '4px 0', fontSize: 11.5, color: 'var(--a-accent)' }}>{page.url}</p>
        <p style={{ margin: 0, fontSize: 12.5, color: 'var(--a-muted)' }}>{page.seo.description}</p>
      </div>
    </>
  )

  return (
    <Panel title={`${serviceName} · ${site.data.name}`} onClose={onClose} side={side}
      sub={<><span className="a-mono">{page.url}</span>{page.published ? ' · live' : ' · draft'}</>}>
      <Tick label={<><b>This site offers {serviceName.toLowerCase()}.</b> Untick if it does not: the page then does not exist (404), whatever else is filled in.</>}
        checked={offered} onChange={setOffered} disabled={dis} />

      <H>Intro and audience</H>
      <Area label="Intro (2 to 3 sentences)" value={d.intro} onChange={(v) => up('intro', v)} disabled={dis} rows={4}
        hint={`${d.intro.trim().length} characters, 120 or more. Written for THIS site: what it accepts, who it serves, how to get started. Not the same text with the city swapped.`} />
      <Area label="Who this is for (one per line)" value={aud} onChange={setAud} disabled={dis} rows={3} />

      <H>What we accept</H>
      <Rows label="Accepted items" rows={d.accepted} blank={{ label: '', text: '' }} disabled={dis}
        fields={[{ key: 'label', label: 'Item' }, { key: 'text', label: 'Details', area: true }]}
        onChange={(v) => up('accepted', v)} hint="The starter list is general. Check it against what this site really takes." />
      <Tick label="These items are checked for this site" checked={d.acceptedConfirmed} onChange={(v) => up('acceptedConfirmed', v)} disabled={dis} />
      <Area label="Not accepted here (one per line)" value={notAcc} onChange={setNotAcc} disabled={dis} rows={3} />

      <H>How it works</H>
      <Rows label="Steps" rows={d.steps} blank={{ label: '', text: '' }} disabled={dis}
        fields={[{ key: 'label', label: 'Step' }, { key: 'text', label: 'What happens', area: true }]}
        onChange={(v) => up('steps', v)} />
      <Area label="Packing safely (one per line)" value={pack} onChange={setPack} disabled={dis} rows={3}
        hint={page.service === 'battery-recycling' ? 'Batteries: keep the terminal taping guidance for lithium batteries.' : undefined} />
      <Area label="Certificate of recycling" value={d.certificate} onChange={(v) => up('certificate', v)} disabled={dis} rows={2}
        hint="Only if this site can issue one." />

      <H>Local rules</H>
      <Area label={`${site.data.state} rules for this service`} value={d.compliance} onChange={(v) => up('compliance', v)} disabled={dis} rows={5}
        hint="State and local rules (for example universal waste rules for lamps and batteries). Must be checked by someone qualified." />
      <Text label="Source (link or reference)" value={d.complianceSource} onChange={(v) => up('complianceSource', v)} disabled={dis} />
      <Two>
        <Text label="Verified by (name)" value={d.complianceVerifiedBy} onChange={(v) => up('complianceVerifiedBy', v)} disabled={dis} />
        <div className="a-field"><label>Verified on</label>
          <input className="a-inp" type="date" value={d.complianceVerifiedAt} disabled={dis} onChange={(e) => up('complianceVerifiedAt', e.target.value)} />
        </div>
      </Two>

      <H>Reviews and FAQs</H>
      <Rows label="Reviews (real ones from the area)" rows={d.reviews} blank={{ quote: '', author: '', place: '' }} disabled={dis}
        fields={[{ key: 'quote', label: 'Review text', area: true }, { key: 'author', label: 'Name or company' }, { key: 'place', label: 'City' }]}
        onChange={(v) => up('reviews', v)} hint="Only genuine reviews, with permission. Leave empty rather than invent one." />
      <Rows label="FAQs (at least 5, local)" rows={d.faqs} blank={{ q: '', a: '' }} disabled={dis}
        fields={[{ key: 'q', label: 'Question' }, { key: 'a', label: 'Answer', area: true }]}
        onChange={(v) => up('faqs', v)} />

      <H>Tracking and SEO (blank = generated)</H>
      <Text label="Tracking phone number for this page" value={d.trackingPhone} onChange={(v) => up('trackingPhone', v)} disabled={dis}
        hint={`Blank uses the site's number (${site.data.phone || 'none'}). Quote requests from this page are already tagged with its URL in Enquiries.`} />
      <Text label="H1" value={d.h1} onChange={(v) => up('h1', v)} disabled={dis} placeholder={page.seo.h1} />
      <Text label="Title" value={d.seoTitle} onChange={(v) => up('seoTitle', v)} disabled={dis} placeholder={page.seo.title} />
      <Area label="Meta description" value={d.seoDescription} onChange={(v) => up('seoDescription', v)} disabled={dis} rows={2} placeholder={page.seo.description} />
      <Area label="Internal notes (never shown)" value={d.notes} onChange={(v) => up('notes', v)} disabled={dis} rows={2} />
      {page.updatedAt && <p className="a-hint">Last saved {new Date(page.updatedAt).toLocaleString()}</p>}
    </Panel>
  )
}
