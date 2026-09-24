'use client'

import { useState, useEffect } from 'react'
import { Icon } from './Bits'
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

type TrackingForm = {
  gtmEnabled: boolean; gtmId: string; ga4Id: string
  adsConversionId: string; adsConversionLabel: string; loadOnStaging: boolean
}

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
    void getJSON<{ tracking: TrackingForm }>('/tracking').then((r) => { if (r.ok) setT(r.data.tracking) })
  }, [])
  if (!t) return null
  const up = (k: keyof TrackingForm, v: string | boolean) => setT({ ...t, [k]: v })
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
        {field('adsConversionId', 'Conversion ID', 'AW-XXXXXXXXX')}
        {field('adsConversionLabel', 'Conversion Label', 'XXXXXXXXXXXX')}
      </div>
      <p className="a-hint">
        With GTM on, these IDs are handed to GTM in the dataLayer (<span className="a-mono">rti_ga4_id</span>,{' '}
        <span className="a-mono">rti_ads_conversion_id</span>, <span className="a-mono">rti_ads_conversion_label</span>) for its
        tags to use. With GTM off, the site loads Google&rsquo;s tag itself with them. A successful enquiry always fires{' '}
        <span className="a-mono">generate_lead</span>.
      </p>

      <label className="a-check" style={{ marginTop: 12 }}>
        <input type="checkbox" checked={t.loadOnStaging} disabled={!canEdit} onChange={(e) => up('loadOnStaging', e.target.checked)} />
        <span>Also load on the dev server <small style={{ color: 'var(--a-muted)' }}>(only while testing in GTM Preview; untick after)</small></span>
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
 * The preview draws a real map with the key, so whoever pastes it sees at
 * once whether Google accepts it. On a laptop (localhost) Google refuses a
 * website key by design, so the preview says so instead of showing an error.
 */
function GoogleMapsCard({ canEdit, onToast }: { canEdit: boolean; onToast: (m: string) => void }) {
  const [key, setKey] = useState<string | null>(null)
  const [saved, setSaved] = useState('')
  const [busy, setBusy] = useState(false)
  const [onOurDomain] = useState(() =>
    typeof window !== 'undefined' && /(^|\.)recycletechnologies\.com$/i.test(window.location.hostname))
  useEffect(() => {
    void getJSON<{ maps: { browserKey: string } }>('/maps').then((r) => {
      if (r.ok) { setKey(r.data.maps.browserKey); setSaved(r.data.maps.browserKey) }
    })
  }, [])
  if (key === null) return null

  async function save() {
    setBusy(true)
    const r = await sendJSON<{ maps: { browserKey: string } }>('/maps', 'PUT', { browserKey: key })
    setBusy(false)
    if (r.ok) setSaved(r.data.maps.browserKey)
    onToast(r.ok ? (key ? 'Maps key saved. Enquiry maps use it from now on.' : 'Maps key removed.') : r.error)
  }

  return (
    <section className="a-card" style={{ marginBottom: 22 }}>
      <h3>Google Maps</h3>
      <p className="a-hint" style={{ marginTop: 0, marginBottom: 14 }}>
        Draws the map of where each enquiry is, in Enquiries. This is a website key: Google only accepts it on
        recycletechnologies.com pages (the live site and dev), and maps drawn this way are free. Keep it restricted
        to <span className="a-mono">*.recycletechnologies.com/*</span> in Google Cloud.
      </p>
      <div className="a-field" style={{ maxWidth: 520 }}>
        <label htmlFor="maps-key">Maps API key</label>
        <input id="maps-key" className="a-inp a-mono" value={key} placeholder="AIza…" disabled={!canEdit}
          autoComplete="off" spellCheck={false} onChange={(e) => setKey(e.target.value.trim())} />
      </div>
      {canEdit && (
        <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
          <button className="a-btn p" disabled={busy || key === saved} onClick={() => void save()}>
            {busy ? 'Saving…' : 'Save Maps key'}
          </button>
          {saved && <button className="a-btn" disabled={busy} onClick={() => setKey('')}>Clear</button>}
        </div>
      )}
      {saved && (
        <div style={{ marginTop: 16, maxWidth: 520 }}>
          <p className="a-hint" style={{ margin: '0 0 8px' }}>
            {onOurDomain
              ? 'Preview with the saved key. A map means Google accepts it; a grey box with an error means it does not.'
              : 'Preview not shown here: this admin is running on a laptop, where Google refuses a website key by design. Enquiry maps fall back to Google\u2019s keyless map here. Check the preview on the dev or live admin.'}
          </p>
          {onOurDomain && (
            <iframe title="Maps key preview" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"
              src={`https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(saved)}&q=${encodeURIComponent(PREVIEW_ADDRESS)}&zoom=13`}
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
