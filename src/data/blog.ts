import { href } from '@/lib/urls'

/**
 * /blog/ — the blog index. Geometry from Figma 6382:5541.
 *
 * WHAT IS LEFT IN HERE: the copy the frame carries — the hero, the intro block
 * and the newsletter band. The article list itself is no longer in this file.
 * It now comes from the database, through lib/blog-index.ts, because the
 * WordPress import brought 307 real posts in and hardcoded cards would be a
 * list that goes stale the first time somebody publishes.
 *
 * The one exception is ARTICLES below, which survives as the fallback for a
 * machine with no database — a fresh clone, or CI. It is the same ten rows the
 * page shipped with before the import.
 */
export const LIVE_SEO = {
  /** Verbatim from the live page, captured 15 Sep 2026. "Recyling" is the live
   *  site's typo; CLAUDE.md rule 6 says port it and fix it in the second wave. */
  title: 'Recyling & E-waste recycling trends Blog | Recycle Technologies',
  description: 'Stay updated with our blog on recycling and E-waste trends. From emerging technologies to consumer behaviors, gain valuable insights into the evolving world.',
}

/** Hero — 6382:5543. The live H1 is "Blogs" and so is the design's: no conflict. */
export const HERO = {
  crumbs: [
    { label: 'Home',  href: href('/') },
    { label: 'Blogs', href: null },
  ],
  h1: 'Blogs',
  lead: 'Recycle Technologies has been providing services to the community since 1993.',
}

export const INTRO = {
  eyebrow: 'Our Blog',
  heading: 'Latest Articles',
  lead: 'Recycling guides, industry news, and practical how-tos from our team.',
}

export type Article = {
  category: string
  title: string
  date: string
  href: string
  /** Key into the glyph table in components/ui/PostCard.tsx. */
  glyph: string
}

/**
 * FALLBACK ONLY — 6385:1225, in the frame's order.
 *
 * lib/blog-index.ts uses these ten rows when the database returns nothing, so
 * the page still has something on it before `npm run wp:import` has run. Every
 * href is a real, ranking URL that the app serves once the import is done; they
 * are all recorded in data/url-map.csv as KEEP.
 */
export const ARTICLES: Article[] = [
  { category: 'Guides',         glyph: 'recycle',      title: 'Recycling Symbols Explained: A Complete Guide',            date: 'Dec 24, 2024', href: href('/recycle-symbol/') },
  { category: 'Electronics',    glyph: 'laptop',       title: 'A Definitive Guide On How to Dispose of Old Laptop',       date: 'Dec 24, 2024', href: href('/how-to-dispose-of-old-laptop/') },
  { category: 'Electronics',    glyph: 'printer',      title: 'How to Dispose of Old Printer Machine Eco-Friendly',       date: 'Dec 24, 2024', href: href('/how-to-dispose-of-old-printer-machine/') },
  { category: 'Electronics',    glyph: 'phone',        title: 'How to Recycle Old iPhone',                                date: 'Dec 24, 2024', href: href('/how-to-recycle-old-iphone/') },
  { category: 'Batteries',      glyph: 'battery',      title: 'Lithium-Ion Battery Recycling Process with Recycle Technologies', date: 'Dec 24, 2024', href: href('/lithium-ion-battery-recycling/') },
  { category: 'Sustainability', glyph: 'car',          title: 'Tackling EV Battery Manufacturing Waste',                  date: 'Dec 24, 2024', href: href('/electric-vehicle-battery-manufacturing-waste/') },
  { category: 'Appliances',     glyph: 'fridge',       title: 'How to Dispose of a Refrigerator',                         date: 'Dec 24, 2024', href: href('/how-to-dispose-of-a-refrigerator/') },
  { category: 'Household',      glyph: 'extinguisher', title: 'How to Dispose of Fire Extinguisher Properly',             date: 'Dec 24, 2024', href: href('/dispose-of-fire-extinguisher/') },
  { category: 'Household',      glyph: 'droplet',      title: 'How to Dispose of Lighter Fluid the Right Way',            date: 'Dec 24, 2024', href: href('/how-to-dispose-of-lighter-fluid/') },
  { category: 'Comparisons',    glyph: 'compare',      title: 'Best Buy Geek Squad vs. Recycle Technologies',             date: 'Sep 9, 2024',  href: href('/best-buy-geek-squad-vs-recycle-technologies/') },
]

/** Newsletter — 6384:1226. */
export const NEWSLETTER = {
  heading: 'Stay in the Loop',
  lead: 'Send the latest news or something new crops up to my mail box directly.',
  label: 'Email address for the newsletter',
  placeholder: 'Enter your email address',
  button: 'Subscribe',
  disclaimer: 'By subscribing, you agree to receive occasional updates. Unsubscribe anytime.',
}

/** Gaps between Figma 6382:5541, the live blog and this build. */
export const TODO_FOR_DESIGN = [
  'The chips the frame draws (Electronics, Batteries, Appliances, Household, Guides, Comparisons) are a planned taxonomy that no post is filed under. The six real WordPress categories are Blog, Recycling, News, Customer Spotlight, From Another Publication and Uncategorized, and those are what the chips show. Reconciling the two is second-wave work and needs 301s.',
  'Pagination is not in the frame. 307 posts at twelve a page is 26 pages, so components/ui/Pager.tsx invents a pager from the button family\'s own colours. Aqeel should draw the real one.',
  'The card disc is a glyph chosen from the post slug. Most imported posts now have a real og:image, so a thumbnail card is available if the design wants one.',
  'A blog card has room for two lines of title; real WordPress titles run to 90 characters and are clamped at two. Worth checking a few against the frame.',
]
