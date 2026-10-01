'use client'

import { useState, useEffect } from 'react'
import { Icon, PasswordInput } from './Bits'
import { getJSON, sendJSON } from './api'

/**
 * The two "site" screens of the admin, split out of the old Settings screen
 * on 24 Sep 2026 (Asim: "we add both these google ads thing and social links
 * in one place, can we make 2 places for it … remove this settings thing so
 * it will be organized"):
 *
 *   Google & Tracking   GTM, GA4, Google Ads, and the Google Maps key.
 *                       Administrators and the SEO desk.
 *   Social Links        the header and footer icons. Everyone can look;
 *                       administrators save.
 *
 * !! EVERYTHING SEO STAYS IN THE SEO SECTION (Asim, 17 Sep 2026): site name,
 * title template, the AI crawler switches and the redirect table are all
 * under SEO -> Defaults and SEO -> Redirects. Two places to set a title
 * template is how a site ends up with two title templates, so they are not
 * mirrored here; Google & Tracking links there instead.
 *
 * Client component (CLAUDE.md rule 7) because the whole admin is one; see
 * the note at the top of AdminApp.tsx.
 */

export type SocialLink = { id: number; platform: string; url: string }

type CallRow = { number: string; label: string }
type TrackingForm = {
  gtmEnabled: boolean; gtmId: string; ga4Id: string
  adsConversionId: string; adsConversionLabel: string; callNumbers: CallRow[]; loadOnStaging: boolean
}

/** Mirrors MAX_CALL_NUMBERS in src/lib/tracking.ts. */
const MAX_CALLS = 6

/**
 * Analytics & Tracking — the SEO brief's "CMS -> Settings -> Analytics &
 * Tracking", 23 Sep 2026. GTM goes onto every public page from the site's
 * root layout; nobody pastes a tag into a page. Saving reaches the live
 * pages without a rebuild. See src/lib/tracking.ts.
 */
function TrackingSettingsCard({ canEdit, onToast }: { canEdit: boolean; onToast: (m: string) => void }) {
  const [t, setT] = useState<TrackingForm | null>(null)
  const [busy, setBusy] = useState(false)
  useEffect(() => {
    void getJSON<{ tracking: TrackingForm }>('/tracking').then((r) => {
      if (!r.ok) return
      /* Two empty rows to start with, one per facility number (MN, WI). */
      const calls = r.data.tracking.callNumbers ?? []
      setT({ ...r.data.tracking, callNumbers: calls.length ? calls : [{ number: '', label: '' }, { number: '', label: '' }] })
    })
  }, [])
  if (!t) return null
  const up = (k: keyof TrackingForm, v: string | boolean) => setT({ ...t, [k]: v })
  const setCall = (i: number, k: keyof CallRow, v: string) =>
    setT({ ...t, callNumbers: t.callNumbers.map((c, j) => (j === i ? { ...c, [k]: v } : c)) })
  const field = (k: 'gtmId' | 'ga4Id' | 'adsConversionId' | 'adsConversionLabel', label: string, ph: string) => (
    <div className="a-field">
      <label htmlFor={`trk-${k}`}>{label}</label>
      <input id={`trk-${k}`} className="a-inp a-mono" value={t[k]} placeholder={ph} disabled={!canEdit}
        onChange={(e) => up(k, e.target.value)} />
    </div>
  )

  async function save() {
    setBusy(true)
    const r = await sendJSON('/tracking', 'PUT', t)
    setBusy(false)
    onToast(r.ok ? 'Tracking saved. Pages pick it up as they are next visited.' : r.error)
  }

  return (
    <section className="a-card" style={{ marginBottom: 22 }}>
      <h3>Analytics &amp; Tracking</h3>
      <p className="a-hint" style={{ marginTop: 0 }}>
        Google Tag Manager loads on every public page from here, including pages created later. It loads on the
        live site only; the dev server and local copies stay out of your reports unless the last box is ticked.
        Visitors&rsquo; UTM tags and ad click IDs are captured automatically and attached to every enquiry.
      </p>

      <h4 style={{ margin: '16px 0 8px' }}>Google Tag Manager</h4>
      <label className="a-check">
        <input type="checkbox" checked={t.gtmEnabled} disabled={!canEdit} onChange={(e) => up('gtmEnabled', e.target.checked)} />
        <span>Enable GTM</span>
      </label>
      <div style={{ maxWidth: 360, marginTop: 10 }}>{field('gtmId', 'GTM Container ID', 'GTM-XXXXXXX')}</div>

      <h4 style={{ margin: '18px 0 8px' }}>Google Analytics 4</h4>
      <div style={{ maxWidth: 360 }}>{field('ga4Id', 'GA4 Measurement ID', 'G-XXXXXXXXXX')}</div>

      <h4 style={{ margin: '18px 0 8px' }}>Google Ads</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, maxWidth: 740 }}>
        {field('adsConversionId', 'Conversion ID', 'AW-XXXXXXXXXXX or the number')}
        {field('adsConversionLabel', 'Conversion Label', 'XXXXXXXXXXXX')}
      </div>
      <p className="a-hint">
        The GA4 Measurement ID is sent to directly by the site, beside GTM: page views and the{' '}
        <span className="a-mono">cta_click</span> event (Schedule a Pickup, Get a Quote, Contact Us, Call Us Now) go to it.
        Do not also add the same ID inside GTM, or it counts twice. The Google Ads IDs are handed to GTM in the dataLayer
        (<span className="a-mono">rti_ads_conversion_id</span>, <span className="a-mono">rti_ads_conversion_label</span>); with GTM
        off, the site loads Google&rsquo;s tag itself with them. A successful enquiry always fires{' '}
        <span className="a-mono">generate_lead</span>.
      </p>

      {/* Laid out 28 Sep 2026 (Asim: the one long line of help did not read
          well). A short lead, three steps, the rows as cards that stack on a
          narrow screen, and the tag the site writes folded away. */}
      <div className="a-calltrack">
        <h4>Call tracking numbers</h4>
        <p className="a-calltrack-lead">
          For Google Ads &ldquo;calls from website&rdquo; conversions. People who arrive from an ad see a Google forwarding
          number in place of the one below, and Google counts their calls.
        </p>
        <ol className="a-calltrack-steps">
          <li>Type the number <b>exactly as the site shows it</b>, for example <code className="a-code">763-559-5130</code>.</li>
          <li>Paste the label of its call conversion action from Google Ads.</li>
          <li>Leave a row empty to skip it, then <b>Save tracking</b>.</li>
        </ol>
        <div className="a-callrows">
          {t.callNumbers.map((c, i) => (
            <div key={i} className="a-callrow">
              <div className="a-field">
                <label htmlFor={`call-num-${i}`}>Display number {i + 1}</label>
                <input id={`call-num-${i}`} className="a-inp a-mono" value={c.number} placeholder="763-559-5130" disabled={!canEdit}
                  inputMode="tel" onChange={(e) => setCall(i, 'number', e.target.value)} />
              </div>
              <div className="a-field">
                <label htmlFor={`call-lbl-${i}`}>Call conversion label {i + 1}</label>
                <input id={`call-lbl-${i}`} className="a-inp a-mono" value={c.label} placeholder="XXXXXXXXXXXX" disabled={!canEdit}
                  spellCheck={false} onChange={(e) => setCall(i, 'label', e.target.value.trim())} />
              </div>
              {canEdit && (
                <button type="button" className="a-btn" aria-label={`Remove tracked number ${i + 1}`}
                  onClick={() => setT({ ...t, callNumbers: t.callNumbers.filter((_, j) => j !== i) })}>Remove</button>
              )}
            </div>
          ))}
        </div>
        {canEdit && t.callNumbers.length < MAX_CALLS && (
          <button type="button" className="a-btn sm" style={{ marginTop: 10 }}
            onClick={() => setT({ ...t, callNumbers: [...t.callNumbers, { number: '', label: '' }] })}>+ Add tracked number</button>
        )}
        <details className="a-calltrack-code">
          <summary>What the site adds for each row</summary>
          <code className="a-code">gtag(&apos;config&apos;, &apos;{t.adsConversionId || 'AW-…'}/LABEL&apos;, {'{'} phone_conversion_number: &apos;NUMBER&apos; {'}'})</code>
          <span className="a-hint">Added after the Google Ads tag, one line per filled row.</span>
        </details>
      </div>

      <label className="a-check" style={{ marginTop: 14 }}>
        <input type="checkbox" checked={t.loadOnStaging} disabled={!canEdit} onChange={(e) => up('loadOnStaging', e.target.checked)} />
        <span>Also load on the dev server
          <small style={{ display: 'block', color: 'var(--a-muted)', marginTop: 2 }}>Only while testing in GTM Preview. Untick it after.</small></span>
      </label>

      {canEdit && <div style={{ marginTop: 16 }}><button className="a-btn p" disabled={busy} onClick={() => void save()}>{busy ? 'Saving…' : 'Save tracking'}</button></div>}
    </section>
  )
}

/** Where the preview map points: the Blaine facility, a known good address. */
const PREVIEW_ADDRESS = '1525 99th Ln NE, Blaine, MN 55449'

/**
 * Google Maps — the key Asim was handed on 24 Sep 2026. It is a WEBSITE key:
 * Google only answers it for pages on recycletechnologies.com (and refuses it
 * for server lookups), so it is used where a browser on our domain draws a
 * map: each enquiry's map in Enquiries. See src/lib/maps.ts.
 *
 * THE KEY IS NEVER SHOWN (management, 27 Sep 2026: "mask this api so it is
 * not showing"). The server only tells this card that a key is set and how
 * it starts and ends ("AIza••••lFw"); a new key is typed into a password box
 * (with the eye, for checking a paste) and is gone from the screen once
 * saved. The preview is an iframe on /api/admin/maps/embed/, which adds the
 * key on the server, so whoever pastes a key still sees at once whether
 * Google accepts it. On a laptop (localhost) Google refuses a website key by
 * design, so the preview says so instead of showing an error.
 */
type MapsState = { set: boolean; masked: string }

function GoogleMapsCard({ canEdit, onToast }: { canEdit: boolean; onToast: (m: string) => void }) {
  const [saved, setSaved] = useState<MapsState | null>(null)
  const [draft, setDraft] = useState<string | null>(null)   // null: not editing
  const [busy, setBusy] = useState(false)
  const [onOurDomain] = useState(() =>
    typeof window !== 'undefined' && /(^|\.)recycletechnologies\.com$/i.test(window.location.hostname))
  useEffect(() => {
    void getJSON<{ maps: MapsState }>('/maps').then((r) => { if (r.ok) setSaved(r.data.maps) })
  }, [])
  if (saved === null) return null

  async function put(browserKey: string) {
    setBusy(true)
    const r = await sendJSON<{ maps: MapsState }>('/maps', 'PUT', { browserKey })
    setBusy(false)
    if (r.ok) { setSaved(r.data.maps); setDraft(null) }
    onToast(r.ok ? (browserKey ? 'Maps key saved. Enquiry maps use it from now on.' : 'Maps key removed.') : r.error)
  }

  const editing = draft !== null || !saved.set
  return (
    <section className="a-card" style={{ marginBottom: 22 }}>
      <h3>Google Maps</h3>
      <p className="a-hint" style={{ marginTop: 0, marginBottom: 14 }}>
        Draws the map of where each enquiry is, in Enquiries. This is a website key: Google only accepts it on
        recycletechnologies.com pages (the live site and dev), and maps drawn this way are free. Keep it restricted
        to <span className="a-mono">*.recycletechnologies.com/*</span> in Google Cloud. The key is never shown here
        once saved.
      </p>
      <div className="a-field" style={{ maxWidth: 520 }}>
        <label htmlFor="maps-key">Maps API key</label>
        {editing
          ? (canEdit
            ? <PasswordInput id="maps-key" value={draft ?? ''} onChange={(v) => setDraft(v.trim())} autoComplete="off"
                placeholder="AIza…" mono label="key" />
            : <input id="maps-key" className="a-inp a-mono" value="" placeholder="Not set" disabled readOnly />)
          : <input id="maps-key" className="a-inp a-mono" value={saved.masked} readOnly disabled
              title="Saved. The key itself is not shown." />}
      </div>
      {canEdit && (
        <div style={{ marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {editing ? (
            <>
              <button className="a-btn p" disabled={busy || !draft} onClick={() => void put(draft ?? '')}>
                {busy ? 'Saving…' : 'Save Maps key'}
              </button>
              {saved.set && <button className="a-btn" disabled={busy} onClick={() => setDraft(null)}>Cancel</button>}
            </>
          ) : (
            <>
              <button className="a-btn" disabled={busy} onClick={() => setDraft('')}>Replace key</button>
              <button className="a-btn" disabled={busy} onClick={() => { if (window.confirm('Remove the Maps key? Enquiry maps fall back to the keyless Google map.')) void put('') }}>Remove key</button>
            </>
          )}
        </div>
      )}
      {saved.set && (
        <div style={{ marginTop: 16, maxWidth: 520 }}>
          <p className="a-hint" style={{ margin: '0 0 8px' }}>
            {onOurDomain
              ? 'Preview with the saved key. A map means Google accepts it; a grey box with an error means it does not.'
              : 'Preview not shown here: this admin is running on a laptop, where Google refuses a website key by design. Enquiry maps fall back to Google\u2019s keyless map here. Check the preview on the dev or live admin.'}
          </p>
          {onOurDomain && (
            <iframe title="Maps key preview" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"
              src={`/api/admin/maps/embed/?q=${encodeURIComponent(PREVIEW_ADDRESS)}&zoom=13`}
              style={{ width: '100%', height: 220, border: '1px solid var(--rule)', borderRadius: 10, display: 'block' }} />
          )}
        </div>
      )}
    </section>
  )
}

/** Admin -> Google & Tracking. */
export function GoogleTracking({ canEdit, onToast, onGoSeo }: {
  canEdit: boolean; onToast: (m: string) => void; onGoSeo: () => void
}) {
  return (
    <main className="a-sheet">
      <div className="a-note"><span>
        <b>Looking for titles, descriptions, robots or redirects?</b> They are in{' '}
        <button className="a-link" onClick={onGoSeo}>SEO</button> — the whole set, on one screen,
        for whoever owns it.
      </span></div>
      {canEdit ? (
        <>
          <TrackingSettingsCard canEdit={canEdit} onToast={onToast} />
          <GoogleMapsCard canEdit={canEdit} onToast={onToast} />
        </>
      ) : (
        <p className="a-hint">Only administrators and the SEO desk can see and change the tracking IDs and the Maps key.</p>
      )}
    </main>
  )
}

/** Admin -> Social Links. */
export function SocialLinks({ social, canEdit, onToast }: {
  social: SocialLink[]; canEdit: boolean; onToast: (m: string) => void
}) {
  const [links, setLinks] = useState(social)

  async function save() {
    const r = await sendJSON('/settings', 'PUT',
      { settings: {}, social: links.map((l) => ({ id: l.id, url: l.url })) })
    onToast(r.ok ? 'Social links saved' : r.error)
  }

  return (
    <main className="a-sheet">
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
      {canEdit
        ? <div style={{ marginTop: 16 }}><button className="a-btn p" onClick={() => void save()}>Save links</button></div>
        : <p className="a-hint" style={{ marginTop: 12 }}>Only administrators can change these.</p>}
    </main>
  )
}
