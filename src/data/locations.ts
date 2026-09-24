import { QUOTE_HREF, href } from '@/lib/urls'

/**
 * /all-locations/ — copy from the "Locations" doc, geometry from Figma
 * 6374:4194.
 *
 * Same rule as every other page: where the doc and the frame disagree on words,
 * the doc wins; where they disagree on a fact the page would assert, the
 * verifiable version wins. Both kinds of divergence are listed in
 * TODO_FOR_DESIGN at the bottom.
 */

export const LIVE_SEO = {
  /**
   * Verbatim from the live page, captured 15 Sep 2026. url-map.csv had the
   * title but no description; the description below is the live one and the
   * row has been completed.
   */
  title: 'Electronics Recycling in USA | Recycle technologies',
  description: 'Explore electronics recycling facility in USA. Drop-off your E-waste: old TVs, printers, computer, phones, monitors, small appliances, and more at one platform in your area.',
}

export const PROPOSED_SEO = {
  title: 'Recycling Locations in Minnesota & Wisconsin | Recycle Technologies',
  description: 'Find a Recycle Technologies drop-off near you in Minnesota or Wisconsin, or ship from any of the 50 states through the nationwide Mail-In Program.',
}

/**
 * Hero — 6374:4196.
 *
 * The frame's breadcrumb reads "Home / Resources", which is left over from
 * whichever frame it was copied from; this page is not under Resources. Built
 * as "Home / Locations".
 */
export const HERO = {
  crumbs: [
    { label: 'Home',      href: href('/') },
    { label: 'Locations', href: null },
  ],
  h1: 'Locations',
  // Asim, 23 Sep 2026.
  lead: 'Two licensed facilities, nationwide Mail-In reach, and pickup and drop-off options across Minnesota and Wisconsin, find the option that works for you.',
}

/** Finder — 6377:967. Heading, search bar and the map. */
export const FINDER = {
  eyebrow: 'Find a Location',
  heading: 'Find a Recycling Location Near You',
  lead: 'Search by city or zip code to find the closest drop-off, or browse our licensed facilities below.',
  search: {
    label: 'Search for a recycling location by city or zip code',
    placeholder: 'Enter your city or zip code',
    button: 'Search',
    searching: 'Searching…',
  },
  /** The locator's answer, drawn inside the map panel — see LocationFinder.tsx. */
  result: {
    searching: 'Finding the nearest facility…',
    nearestTo: 'Nearest to',
    about: 'about',
    miles: 'miles',
    also: 'Also:',
    details: 'View Location Details',
    directions: 'Get Directions',
    clear: 'Clear search',
    notFound: 'We couldn’t find “{q}”. Try a 5-digit ZIP code, or a city and state like “Madison, WI”.',
    error: 'The locator isn’t responding right now. Call us and we’ll point you to the nearest facility.',
  },
  /**
   * The map panel is Google's map since 23 Sep 2026 (see LocationFinder.tsx);
   * the two pin labels are now the switch between the two facilities.
   *
   * The facility ROWS that used to sit beside the map are gone: the designer
   * replaced them with two full cards in a section of their own, which read
   * src/data/facilities.ts — see LocationCards.tsx.
   */
  map: {
    pins: [
      { label: 'Blaine, MN',     x: 420, y: 90 },
      { label: 'New Berlin, WI', x: 760, y: 220 },
    ],
  },
}

/** Coverage — 6377:968. Same two-column shape as the About Us story section. */
export const COVERAGE = {
  eyebrow: 'Coverage',
  heading: 'Growing Coverage, Wherever You Are',
  body: [
    'We currently offer in-person recycling and shredding services throughout Minnesota and Wisconsin, with expanded operations in the greater Chicago area. If you’re searching for a location and don’t see one nearby, that means we haven’t opened a facility in your area yet.',
    'That’s exactly why our Mail-In Program exists: the same secure, certified recycling and data destruction you’d get in person, using recycling kits you order online and drop off at the nearest FedEx.',
  ],
  cardTitle: 'Where We Operate',
  card: [
    'In-person service across Minnesota',
    'In-person service across Wisconsin',
    'Expanded operations in the Chicago area (not yet a certified facility)',
    'All 50 states covered via Mail-In Program',
  ],
}

/**
 * Closing CTA — 6377:969, the shared GradientCta frame at 161.565°.
 *
 * "Start Mail-In Recycling" goes to ezontheearth.com, matching every other
 * mail-in link on the site. Repointing them at the new /mail-in-recycling/ page
 * is a commercial decision waiting on Asim — see src/data/services.ts.
 */
export const CTA = {
  heading: 'Don’t See Your City Listed?',
  body: 'Our Mail-In Program brings the same certified recycling and shredding to all 50 states — order a kit, pack it up, and drop it at the nearest FedEx.',
  primary:   { label: 'Start Mail-In Recycling', href: 'https://ezontheearth.com/', external: true },
  secondary: { label: 'Get a Quote',             href: QUOTE_HREF },
}

/** Gaps between Figma 6374:4194 and the Locations doc, for Aqeel and Musaveer. */
export const TODO_FOR_DESIGN = [
  'Hero breadcrumb in the frame reads "Home / Resources". Built as "Home / Locations".',
  'The doc badges the Minnesota row "42mi" and the Outside-MN-&-WI row "Nationwide". A distance is meaningless until the search actually geolocates, so the frame\'s factual badges are used instead: "R2v3", "Pursuing R2v3", and none on the third row.',
  'Coverage paragraph two differs between the doc and the frame; the doc\'s wording is built.',
  'The doc\'s "Where We Operate" list qualifies Chicago with "(not yet a certified facility)", which the frame omits. Built with the qualifier — it matches the Chicago card on the About Us page.',
  'The map panel is Google\'s map since 23 Sep 2026 (keyless embed, one facility at a time with a switch). Showing both facilities on one map needs the Maps JavaScript API and a key.',
]
