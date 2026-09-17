'use client'

import { BarForm } from '@/components/client/BarForm'
import { NEWSLETTER } from '@/data/blog'

/**
 * Blog newsletter sign-up — Figma 6385:1337, the shared BarForm at 560 wide.
 *
 * Named Blog- because the footer has its own, different newsletter input
 * (6382:5677, a 329x46 field with a square submit) in NewsletterForm.tsx.
 *
 * No list behind it yet, so submitting does nothing. It is the fourth unwired
 * form in the build and belongs in the same Phase 0 tracking decision as the
 * two contact forms and the location search.
 */
export function BlogNewsletterForm() {
  return (
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
      onSubmit={() => {
        // TODO(phase-2): post to whichever list the team picks.
      }}
    />
  )
}
