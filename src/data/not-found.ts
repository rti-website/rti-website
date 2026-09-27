/**
 * The "page not found" page (src/app/not-found.tsx), editable in Admin ->
 * Pages since 27 Sep 2026 like every other page. Copy as it was in the
 * component.
 */
export const NOT_FOUND = {
  eyebrow: 'Error 404',
  heading: 'We could not find that page',
  text: 'The address may have changed, or the page may have been retired. Everything below is still where it should be.',
  go: 'Go',
}

export const NOT_FOUND_LINKS = [
  { label: 'Services', to: '/services/', blurb: 'Recycling, shredding and data destruction.' },
  { label: 'Industries', to: '/industries/', blurb: 'What we do for healthcare, finance, education and more.' },
  { label: 'Locations', to: '/all-locations/', blurb: 'Facilities and service areas across the Midwest.' },
  { label: 'Resources', to: '/resources/', blurb: 'Guides, downloads and recycling how-tos.' },
  { label: 'Blog', to: '/blog/', blurb: 'Every article we have published.' },
  { label: 'Contact us', to: '/contact-us/', blurb: 'Talk to someone about a pickup or a quote.' },
]
