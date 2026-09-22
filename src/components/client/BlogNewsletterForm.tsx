'use client'

import { useState } from 'react'
import { BarForm } from '@/components/client/BarForm'
import { NEWSLETTER } from '@/data/blog'
import { path } from '@/lib/urls'

/**
 * Blog newsletter sign-up — Figma 6385:1337, the shared BarForm at 560 wide.
 *
 * Named Blog- because the footer has its own, different newsletter input
 * (6382:5677, a 329x46 field with a square submit) in NewsletterForm.tsx.
 *
 * Posts to /api/subscribe as `blog_inline`, which is how the two sign-up points
 * are told apart in the admin's Subscribers screen. Wired 22 Sep 2026 with the
 * footer one; see the note at the top of that route for why the row lands as
 * 'pending' rather than 'confirmed'.
 *
 * No honeypot here. BarForm is a single-field bar shared with the locations
 * finder and has nowhere to hide one, so this endpoint's per-IP throttle is the
 * only brake. If sign-up spam ever becomes real, the field belongs in BarForm.
 */
export function BlogNewsletterForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  if (state === 'sent') {
    return (
      <p role="status" className="font-roboto text-[15px] leading-[24px] text-brand">
        Thanks — you are on the list.
      </p>
    )
  }

  return (
    <div className="flex w-full flex-col gap-[8px]">
      <BarForm
        width={560}
        glyph="mail"
        iconSize={18}
        textSize={14.5}
        label={NEWSLETTER.label}
        placeholder={NEWSLETTER.placeholder}
        button={NEWSLETTER.button}
        type="email"
        name="blog-newsletter-email"
        onSubmit={(email, form) => {
          if (state === 'sending') return
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please check the email address.')
            setState('error')
            return
          }
          setState('sending')
          setError(null)
          void fetch(path('/api/subscribe/'), {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email, source: 'blog_inline', sourcePage: location.pathname }),
          })
            .then(async (res) => {
              const body = (await res.json().catch(() => ({}))) as { error?: string }
              if (!res.ok) {
                setError(body.error ?? 'Something went wrong. Please try again.')
                setState('error')
                return
              }
              form.reset()
              setState('sent')
            })
            .catch(() => {
              setError('Could not reach the server. Please try again.')
              setState('error')
            })
        }}
      />
      {error && (
        <p role="alert" className="font-roboto text-[13px] leading-[19px] text-[#b42318]">{error}</p>
      )}
    </div>
  )
}
