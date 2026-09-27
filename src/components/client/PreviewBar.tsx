'use client'

import { useEffect, useState } from 'react'

/**
 * The bar across the foot of the site while an editor is previewing
 * unpublished copy (Admin -> Pages, 27 Sep 2026). Client side for two
 * reasons the server cannot know: it stays out of the way inside the
 * editor's own preview frame (the editor already says it is a preview), and
 * off the admin screens.
 *
 * Only ever rendered when draft mode is on (see app/layout.tsx), so it adds
 * nothing to a visitor's page.
 */
export function PreviewBar() {
  const [show, setShow] = useState(false)
  const [here, setHere] = useState('/')
  useEffect(() => {
    const framed = window.self !== window.top
    setShow(!framed && !location.pathname.startsWith('/admin'))
    setHere(location.pathname + location.search)
  }, [])
  if (!show) return null
  return (
    <div role="status" className="fixed inset-x-0 bottom-0 z-[100] flex flex-wrap items-center justify-center gap-x-[16px] gap-y-[6px] bg-[#1d2939] px-[16px] py-[10px] font-roboto text-[14px] text-white shadow-[0_-2px_12px_rgba(0,0,0,0.25)]">
      <span><strong className="font-semibold">Preview.</strong> You are seeing unpublished changes from Admin → Pages. Visitors do not see these.</span>
      <a href={`/api/admin/pages/preview/exit/?to=${encodeURIComponent(here)}`} className="rounded-[6px] bg-white px-[12px] py-[5px] font-medium text-[#1d2939] hover:bg-[#eaecf0]">
        Exit preview
      </a>
    </div>
  )
}
