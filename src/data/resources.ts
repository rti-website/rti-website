import { href } from '@/lib/urls'

/**
 * /resources/ — Figma 6374:3828 in fFS1bD6V6j1RhhmzfPxpHk.
 *
 * NEW URL. /resources/ does not resolve on the live site and is not in
 * data/url-map.csv's capture, so there is no live title, description or H1 to
 * preserve and CLAUDE.md rule 6 does not bite.
 *
 * !! THE POSTS THEMSELVES ARE NOT BUILT YET. Every guide and article below
 * names a real, ranking post and is wired to its real URL, all of which are
 * KEEP rows in url-map.csv — but this Next app does not serve them until the
 * post migration runs, so the links 404 in the meantime. This is exactly the
 * call already taken on /blog/ (see the note at the top of src/data/blog.ts):
 * cards that do not link would make the page pointless, and pointing them at
 * invented slugs would be worse than pointing them at the URLs that will exist.
 *
 * The one exception is "Tackling EV Battery Manufacturing Waste", which has no
 * matching row in the URL map. It is sent to the blog index rather than to a
 * slug nobody has verified — flag it to Rizwan for the real URL.
 */

export const SEO = {
  title: 'Recycling Resources | Guides, Articles & How-Tos | Recycle Technologies',
  description:
    'Step-by-step recycling guides and articles on electronics, batteries, appliances, bulbs and data destruction, from a recycler operating since 1993.',
}

/** Hero — 6472:3904. */
export const HERO = {
  crumbs: [
    { label: 'Home',      href: href('/') },
    { label: 'Resources', href: null },
  ],
  h1: 'Resources',
  lead: 'Recycle Technologies has been providing services to the community since 1993.',
}

/**
 * Search band — 6375:905.
 *
 * ! THE SEARCH BOX IS PRESENTATIONAL. There is no search index to query: the
 * site has no server-side search and the posts are not built yet. It is drawn
 * as the design draws it and the chips are real links into /blog/'s category
 * filter, so nothing on the band is a dead end. Wire the input to a real query
 * when the post migration lands — do not ship a box that silently does nothing.
 */
export const SEARCH = {
  heading: 'Find What You Need',
  lead: 'Search our library of recycling guides and articles, or browse by topic below.',
  placeholder: 'Search guides and articles (e.g. "laptop recycling")',
  button: 'Search',
  /** Where the (presentational) Search button goes: the blog, as before the
   *  chips were pointed at service pages. */
  searchHref: href('/blog/'),
  /**
   * Each topic opens its service page — Asim, 23 Sep 2026: "when someone
   * clicks on these buttons land them on that page, for example electronics
   * on the electronics service page". They all went to /blog/ before.
   *
   * !! APPLIANCES HAS NO SERVICE PAGE. It opens the site's appliance guide,
   * "How to Dispose of a Refrigerator" — the same post the Appliances card in
   * Popular Articles below links to. A live WordPress post, served from the
   * database on the laptop and dev (not in the sandbox build).
   */
  chips: [
    { label: 'Electronics',      href: href('/electronic-recycle/') },
    { label: 'Batteries',        href: href('/battery-recycling/') },
    { label: 'Appliances',       href: href('/how-to-dispose-of-a-refrigerator/') },
    { label: 'Bulbs & Ballasts', href: href('/light-bulbs/') },
    { label: 'Data Destruction', href: href('/hard-drive-destruction-services/') },
  ],
}

export type Guide = {
  glyph: 'laptop' | 'phone' | 'printer' | 'loop'
  category: string
  title: string
  body: string
  href: string
}

/** Featured guides — 6375:906. Four cards, 617 wide, two per row. */
export const GUIDES: { eyebrow: string; heading: string; lead: string; cards: Guide[] } = {
  eyebrow: 'FEATURED GUIDES',
  heading: 'Recycling Guides Worth Bookmarking',
  lead: 'Step-by-step guidance for the items people ask us about most.',
  cards: [
    {
      glyph: 'laptop',
      category: 'Electronics',
      title: 'A Definitive Guide On How to Dispose of Old Laptop',
      body: 'How to wipe your data and recycle an old laptop responsibly so its components get reused instead of landfilled.',
      href: href('/how-to-dispose-of-old-laptop/'),
    },
    {
      glyph: 'phone',
      category: 'Electronics',
      title: 'How to Recycle Old iPhone',
      body: "What to do with your old iPhone once you've upgraded — from data wipe to responsible drop-off or mail-in.",
      href: href('/how-to-recycle-old-iphone/'),
    },
    {
      glyph: 'printer',
      category: 'Electronics',
      title: 'How to Dispose of Old Printer Machine Eco-Friendly',
      body: 'Eco-friendly options for retiring an old printer, plus why it matters for reducing your footprint.',
      href: href('/how-to-dispose-of-old-printer-machine/'),
    },
    {
      glyph: 'loop',
      category: 'Guides',
      title: 'Recycling Symbols Explained: A Complete Guide',
      body: 'A plain-language breakdown of common recycling symbols so you always know what goes where.',
      href: href('/recycle-symbol/'),
    },
  ],
}

export type Article = {
  category: string
  date: string
  title: string
  body: string
  href: string
}

/** Popular articles — 6375:907. Six rows, 1282 wide. */
export const ARTICLES: { eyebrow: string; heading: string; lead: string; rows: Article[] } = {
  eyebrow: 'POPULAR ARTICLES',
  heading: 'What Readers Are Checking Out',
  lead: 'More reading on batteries, appliances, and how we compare to other options.',
  rows: [
    {
      category: 'Batteries',
      date: 'Dec 24, 2024',
      title: 'Lithium-Ion Battery Recycling Process with Recycle Technologies',
      body: 'How li-ion batteries reach end of life, and the safe way to recycle the ones powering your devices and EVs.',
      href: href('/battery-recycling/'),
    },
    {
      category: 'Sustainability',
      date: 'Dec 24, 2024',
      title: 'Tackling EV Battery Manufacturing Waste',
      body: 'Environmental challenges around EV battery production, and how recycling helps close the loop.',
      // No row in url-map.csv for this one — see the note at the top.
      href: href('/blog/'),
    },
    {
      category: 'Appliances',
      date: 'Dec 24, 2024',
      title: 'How to Dispose of a Refrigerator',
      body: 'What to know before you get rid of an old fridge, from hazardous materials to responsible pickup options.',
      href: href('/how-to-dispose-of-a-refrigerator/'),
    },
    {
      category: 'Household',
      date: 'Dec 24, 2024',
      title: 'How to Dispose of Fire Extinguisher Properly',
      body: "Fire extinguishers need special handling — here's how to retire one safely and legally.",
      href: href('/dispose-of-fire-extinguisher/'),
    },
    {
      category: 'Household',
      date: 'Dec 24, 2024',
      title: 'How to Dispose of Lighter Fluid the Right Way',
      body: "Why lighter fluid can't just go in the trash, and the safer alternatives for disposal.",
      href: href('/how-to-dispose-of-lighter-fluid/'),
    },
    {
      category: 'Comparison',
      date: 'Sep 9, 2024',
      title: 'Best Buy Geek Squad vs. Recycle Technologies',
      body: 'How our approach to the circular economy compares to big-box electronics recycling programs.',
      href: href('/best-buy-geek-squad-vs-recycle-technologies/'),
    },
  ],
}
