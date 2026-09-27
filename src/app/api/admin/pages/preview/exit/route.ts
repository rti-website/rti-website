import { draftMode } from 'next/headers'

/**
 * Leaves preview: clears the draft mode cookie and goes back to the page
 * (or home). No sign in needed; anyone may stop seeing drafts. Called by the
 * "Exit preview" bar on the site and quietly by the editor when it closes.
 */
export async function GET(req: Request) {
  ;(await draftMode()).disable()
  const raw = new URL(req.url).searchParams.get('to')
  const to = raw && raw.startsWith('/') && !raw.startsWith('//') && !raw.includes('\\') ? raw : '/'
  return new Response(null, { status: 307, headers: { Location: to, 'Cache-Control': 'no-store' } })
}
