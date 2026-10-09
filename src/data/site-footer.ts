import { href } from '@/lib/urls'

/**
 * The footer's copy (every page), moved out of Footer.tsx on 27 Sep 2026 so
 * Admin -> Pages -> "Footer (every page)" can edit it. The layout, logos,
 * facility cards (from src/data/contact.ts) and social links (Admin ->
 * Settings) stay where they were. Comments on the link choices below are the
 * ones that were in Footer.tsx.
 */

/** Words that were written straight into the footer markup. */
export const FOOTER_TEXT = {
  about: 'Recycle Technologies has been providing services to the community since 1993. We are a Midwest-based recycling and shredding company with locations across the US.',
  connectHeading: 'Connect with Us',
  chatPrompt: 'Hi! How can we help?',
  /* The chat card's two buttons since 30 Sep 2026 (Figma 6778:4359, phone
     6620:5197): Get a Quote, and a call to the Minnesota line, which shows
     the number itself. Were "I have a question" and "Tell me more". */
  quoteButton: 'Get a Quote',
  backToTop: 'Back to Top',
  copyright: 'Copyright@2026. All rights are reserved.',
}

/** The newsletter box under the blurb. */
export const FOOTER_NEWSLETTER = {
  placeholder: 'Email Address',
  consent: 'Send the latest news or something new crops up to my mail box directly.',
  button: 'Yes, Please',
}

export type FooterLink = { l: string; h: string; external?: boolean }
export type FooterGroup = { heading: string; headingHref?: string; links: FooterLink[] }

export const COL_1: FooterGroup[] = [
  {
    heading: 'Learn More',
    links: [
      { l: 'Home',            h: href('/') },
      { l: 'About',           h: href('/about-us-commercial-recycling-solutions/') },
      // The Mail-In landing page, like the Services menu (7 Oct 2026).
      { l: 'Mail In Program', h: href('/mail-in-recycling/') },
      { l: 'All Locations',   h: href('/all-locations/') },
    ],
  },
  {
    heading: 'News & Blogs',
    links: [
      { l: 'Blogs', h: href('/blog/') },
      { l: 'News',  h: href('/category/news/') },
      // Moved here from Resources — Asim, 24 Sep 2026.
      { l: 'ITAD & Recycling Guides', h: href('/itad-recycling-guides/') },
    ],
  },
  {
    heading: 'Services',
    links: [
      { l: 'View all Services', h: href('/services/') },
      // Asim, 23 Sep 2026, when /it-asset-disposition/ was built: "add ITAD
      // here in services". Its one link from the site chrome — ITAD is not in
      // the header menu (see the note in src/lib/nav.ts).
      { l: 'IT Asset Disposition', h: href('/it-asset-disposition/') },
    ],
  },
]

export const COL_2: FooterGroup[] = [
  {
    heading: 'Resources',
    // The heading itself opens /resources/ since 21 Sep 2026, when Resources
    // came out of the header bar — this is now the page's link.
    headingHref: href('/resources/'),
    links: [
      { l: 'Contact Us',     h: href('/contact-us/') },
      { l: 'Certifications', h: href('/certifications/') },
      { l: 'Why Choose Us',  h: href('/why-choose-us/') },
      { l: 'Sustainability', h: href('/sustainability/') },
      { l: 'Compliance Center', h: href('/compliance-center/') },
      { l: 'Case Studies',      h: href('/case-studies/') },
      // Asim, 16 Sep 2026: Downloads goes under this heading. Figma 6382:7043.
      { l: 'Downloads',         h: href('/downloads/') },
      // ITAD & Recycling Guides sat here until 24 Sep 2026; now under News & Blogs.
      // Asim, 17 Sep 2026, when the FAQ page was built.
      { l: 'FAQs', h: href('/faqs/') },
    ],
  },
  {
    heading: 'Terms & Conditions',
    links: [
      { l: 'Privacy Policy',    h: href('/privacy-policy/') },
      { l: 'Terms of Services', h: href('/terms-of-services/') },
      { l: 'Cookies Policy',    h: href('/cookies-and-personal-information/') },
      { l: 'Other Information', h: href('/faqs/') },
    ],
  },
]

