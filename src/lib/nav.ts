/**
 * Navigation.
 *
 * Labels come from the Figma design. HREFs come from the LIVE site, verified
 * against www.recycletechnologies.com on 15 Sep 2026 — the redesign must not
 * change a single URL. Every path goes through href() so the trailing-slash
 * rule is applied in exactly one place.
 */
import { href } from './urls'
import type { IndustryMark } from '@/components/ui/IndustryMarks'

export type NavItem = {
  label: string
  href: string
  external?: boolean
  hasDropdown?: boolean
}

/**
 * Order and labels are the design's — lRkITk6QLzsscWUO40karx 6107:1812, which
 * runs About, Services, Industries, Blogs, Locations. Reordered to match on
 * Asim's instruction, 16 Sep 2026 ("make the navbar exactly like this"); the
 * list used to lead with Services.
 *
 * Resources was added here on 16 Sep 2026 (it is not in the design's header
 * module) and taken out again on 21 Sep 2026, on Asim's instruction, so the
 * bar matches the frame. /resources/ is still linked: the footer's "Resources"
 * heading points at it (Footer.tsx), and the page keeps its sitemap entry.
 */
export const MAIN_NAV: NavItem[] = [
  { label: 'About',      href: href('/about-us-commercial-recycling-solutions/'), hasDropdown: true },
  { label: 'Services',   href: href('/services/'), hasDropdown: true },
  { label: 'Industries', href: href('/industries/'), hasDropdown: true },
  // "Blogs", plural, is the design's label. The page is still /blog/.
  { label: 'Blogs',      href: href('/blog/'), hasDropdown: true },
  // Was "Drop off Locations" pointing at /dropoff/, which has no page and 404s.
  // Renamed and repointed at the built locations page on Asim's instruction,
  // 15 Sep 2026. /dropoff/ is still a KEEP row in url-map.csv with nothing
  // captured and no page — decide there whether it redirects here or gets built.
  { label: 'Locations',  href: href('/all-locations/') },
]

/*
 * ITAD was removed from this list on Asim's instruction, 15 Sep 2026.
 * /it-asset-disposition/ is NOT orphaned by that: the homepage's "Learn
 * Complete Process" button (HowItWorks.tsx) and the Healthcare and Financial
 * Services pages' service lists still link it. Restore the item here if that
 * stops being true.
 */

/** Live site sends this to ezontheearth.com, not to an internal page. */
export const MAIL_IN: NavItem = {
  label: 'Mail In Program',
  href: 'https://ezontheearth.com/',
  external: true,
}

/**
 * !! THE WISCONSIN NUMBER IS DISPUTED, AND THIS IS THE OUTLIER !!
 * phoneWi below is (800) 205-3040, ported verbatim from the live site's header.
 * But the live /contact-us/ page lists the general Wisconsin line as
 * (800) 305-3040, and so does every one of the eight content docs written so
 * far. The live site contradicts itself and the header is almost certainly the
 * typo — eight sources against one.
 *
 * Nothing has been changed on inference: the header still says what the live
 * header says, and the industry pages' closing copy still says 205-3040 for the
 * same reason. Confirm with Asim, then fix BOTH in one pass — this line and the
 * `ctaBody` strings in src/data/industries/*.ts.
 */
export const TOP_BAR = {
  /**
   * The announcement. Real copy since 22 Sep 2026 — Asim replaced the Figma
   * file's lorem ipsum ("It is a long established fact that a reader will be
   * distracted…") and pointed Learn More at /sustainability/ rather than the
   * contact page it borrowed while the text was placeholder.
   *
   * It lives here rather than in Header.tsx because the bar is rendered TWICE:
   * once in the desktop header and once inside MobileNav's drawer. Hardcoding
   * it in both is how the two quietly say different things.
   */
  announce: {
    text: 'Ensuring a sustainable future together.',
    cta: 'Learn More',
    href: href('/sustainability/'),
  },
  /*
   * Points at /all-locations/, the built Locations page — Asim, 22 Sep 2026:
   * "land this on location page".
   *
   * It pointed at /dropoff/, which is a KEEP row in data/url-map.csv (it
   * exists on the live WordPress site) but has no page in this build yet, so
   * this link 404'd from the top bar of every page. When /dropoff/ is built,
   * decide deliberately which of the two this should point at rather than
   * assuming it goes back. The same swap was made on the three "Find
   * Locations" CTAs in the service page data, for the same reason.
   */
  dropOff: { label: 'Drop Off Locations', href: href('/all-locations/') },
  phoneMn: { label: 'MN:(800)969-5166', tel: 'tel:+18009695166' },
  phoneWi: { label: 'WI:(800)205-3040', tel: 'tel:+18002053040' },
  contact: { label: 'Contact Us', href: href('/contact-us/') },
  // `quote` was here until 21 Sep 2026. Asim removed the second button from
  // the announcement bar and gave Contact Us its filled style; nothing else
  // read this row, so it went with the button rather than sitting unused.
}

/**
 * The Industries dropdown — Figma lRkITk6QLzsscWUO40karx 6491:6934 (Variant4).
 * Three columns of icon + title + a two-line blurb, split 3 / 2 / 2.
 *
 * ================================================================
 * !! THE FRAME'S SEVEN INDUSTRIES ARE NOT THE SEVEN THAT HAVE PAGES
 * ================================================================
 * The frame draws Retail, Manufacturing, Healthcare | Distribution & Logistics,
 * Banking & Finance | Construction, Education & Government. That is the
 * HOMEPAGE's category list (see INDUSTRIES in src/data/home.ts), which
 * src/data/industries.ts has flagged since 15 Sep 2026 as not mapping onto the
 * real industry pages. Concretely:
 *
 *   Distribution & Logistics   no page
 *   Construction               no page
 *   Education & Government     TWO pages here, not one
 *   Automotive & Fleet         a real page the frame omits
 *
 * So the LAYOUT is the frame's, exactly — three tinted columns, 36px mark, a
 * 16px title, a two-line 14/20 blurb, rows 86 tall gapped 10, split 3 / 2 / 2 —
 * and the CONTENT is the seven pages that exist. A menu row that 404s is the
 * one thing this build does not ship; the Services menu filters `unbuilt` cards
 * for exactly the same reason.
 *
 * Positions follow the frame where a real page exists: Retail, Manufacturing
 * and Healthcare hold column 1, Banking stays in column 2, and Education &
 * Government becomes the two rows of column 3 the frame gave that pairing.
 * Automotive & Fleet takes the Distribution & Logistics slot.
 *
 * TODO(content): the blurbs below are the industry cards' own sentences from
 * src/data/industries.ts with the trailing "through our licensed services"
 * dropped, so each fits the frame's two-line box. Nothing was invented, but
 * Rizwan should still read them as menu copy. The frame's own blurbs are
 * placeholder — the designer pasted them from the Services menu.
 */
export type IndustryNavItem = {
  label: string
  href: string
  desc: string
  mark: IndustryMark
}

export const INDUSTRY_NAV: IndustryNavItem[][] = [
  [
    { label: 'Retail & Corporate Offices',   href: href('/industries/retail-corporate-offices/'),   mark: 'retail',
      desc: 'Retailers and offices can recycle retired computers, batteries, and IT equipment.' },
    { label: 'Manufacturing & Industrial',   href: href('/industries/manufacturing-industrial/'),   mark: 'manufacturing',
      desc: 'Manufacturers and plants can recycle retired computers, batteries, and IT equipment.' },
    { label: 'Healthcare',                   href: href('/industries/healthcare/'),                 mark: 'healthcare',
      desc: 'Hospitals and clinics can recycle retired computers and IT equipment.' },
  ],
  [
    { label: 'Automotive & Fleet',           href: href('/industries/automotive-fleet/'),           mark: 'automotive',
      desc: 'Auto shops and fleets can recycle airbags, computers, and IT equipment.' },
    { label: 'Financial Services & Banking', href: href('/industries/financial-services-banking/'), mark: 'banking',
      desc: 'Banks and financial offices can recycle retired computers and IT equipment.' },
  ],
  [
    { label: 'Education (K-12 & Higher Ed)', href: href('/industries/education/'),                  mark: 'education',
      desc: 'Schools and universities can recycle retired computers and IT equipment.' },
    { label: 'Government & Municipal',       href: href('/industries/government-municipal/'),       mark: 'government',
      desc: 'Government offices can recycle retired computers and IT equipment.' },
  ],
]

/**
 * The two "intro" dropdowns — About (6503:7676) and Blogs (6503:8116). Both are
 * the same shape: column 1 is a heading, an arrow badge and a blurb; columns 2
 * and 3 are rows. Typed once so Header.tsx can build them with one function.
 */
export type IntroMenu = {
  heading: string
  headingHref: string
  blurb: string
  /** One array per panel column, after the intro. */
  columns: { title: string; href: string; desc?: string }[][]
}

/**
 * The About dropdown — Figma lRkITk6QLzsscWUO40karx 6503:7676 (Variant5).
 *
 * Three columns: an intro with a heading and a blurb, then two columns of
 * title + description rows.
 *
 * !! TWO CONTENT PROBLEMS, BOTH THE FRAME'S, BOTH LEFT AS DRAWN on Asim's
 * instruction (16 Sep 2026, "build them exactly"):
 *
 *   1. The intro blurb is lorem ipsum. So is the one in the announcement bar —
 *      same call there, same TODO.
 *   2. The row descriptions do not match their titles. "Certifications" is
 *      described as "Easy collection and recycling of unwanted electronics";
 *      "Leadership Team" as "Secure shredding and recycling of unwanted
 *      phones". The designer clearly pasted them from the Services menu.
 *
 * Rizwan needs to write real copy for all five.
 *
 * Hrefs: three of the four rows are exact title matches for pages that exist,
 * so they are linked. "Leadership Team" has no page and no agreed URL, so it is
 * inert rather than pointed at a slug nobody decided on (CLAUDE.md rule 3).
 */
export const ABOUT_NAV: IntroMenu = {
  heading: 'About RTI',
  headingHref: href('/about-us-commercial-recycling-solutions/'),
  // Was the frame's lorem ipsum. Asim supplied this copy on 17 Sep 2026; it is
  // the last placeholder text that was reaching the header of every page.
  blurb:
    'Recycle Technologies provides responsible recycling and secure shredding solutions. We help '
    + 'businesses manage electronics, lighting, batteries, documents, and other materials through '
    + 'reliable, environmentally responsible programs. Our certified processes make recycling '
    + 'simple, secure, compliant, and accessible.',
  columns: [
    [
      { title: 'Why Choose Us', href: href('/why-choose-us/'),
        desc: 'As one of the first fluorescent lamp recyclers in the US, Recycle Technologies has' },
      { title: 'Certifications', href: href('/certifications/'),
        desc: 'Easy collection and recycling of unwanted electronics.' },
    ],
    [
      { title: 'Sustainability & Environmental Impact', href: href('/sustainability/'),
        desc: 'Secure destruction and responsible recycling of hard drives.' },
      // No page, no agreed URL. Inert until there is one.
      { title: 'Leadership Team', href: '#',
        desc: 'Secure shredding and recycling of unwanted phones.' },
    ],
  ],
}

/**
 * The Blogs dropdown — Figma 6503:8116 (Variant6). Intro column, then two
 * columns of category rows.
 *
 * !! THE CATEGORY ROWS ARE NOT IN THIS FILE ANY MORE. They come from the
 * database — the six categories the WordPress import brought over — through
 * blogMenuColumns() in src/lib/blog-index.ts, and each one links to the
 * /category/<slug>/ archive that already answers on the live site.
 *
 * What was here before: ten hand-typed rows (Universal Waste & Lighting
 * Recycling, E-Waste & Electronics Disposal, …) from the planned taxonomy, every
 * one of them href="#" because no page existed for any of them. Asim asked on
 * 17 Sep 2026 for the fetched categories here, clicking through to that
 * category's posts. `columns` stays as the no-database fallback; Header.tsx
 * substitutes a single "All Articles" row when it is empty, because an empty
 * panel is worse than a short one.
 */
export const BLOG_NAV: IntroMenu = {
  heading: 'Our Blogs',
  headingHref: href('/blog/'),
  // Was lorem ipsum, straight off the frame. Replaced 17 Sep 2026 — placeholder
  // copy in the header of every page is not something to ship. The About panel
  // below still has its lorem and still needs real copy.
  blurb:
    'Recycling guides, industry news and practical how-tos from the Recycle Technologies '
    + 'team. Browse everything we have published, or go straight to a category.',
  columns: [],
}
