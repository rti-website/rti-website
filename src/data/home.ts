import { caseStudyHref, href, QUOTE_HREF, PICKUP_HREF } from '@/lib/urls'
import type { ServiceCard, ServiceGroup } from '@/data/services'
import type { CaseStudyCard } from '@/data/case-studies'
import type { Faq } from '@/data/faqs'

/* Homepage content, transcribed from the Figma frame 6023:3801.
   Titles keep the design's explicit line breaks. Every href is the LIVE URL. */

/**
 * The tab strip and its cards are the SAME catalogue that /services/ renders
 * flat — see src/data/services.ts. Derived rather than copied, because the two
 * pages drifting apart (a card here, a URL there) is exactly the kind of bug
 * that survives review and then shows up as a 404 in the crawl.
 *
 * Functions since 27 Sep 2026 (Admin -> Pages): OurServices calls them with
 * the "Services page" document's SERVICE_GROUPS, so an edit there reaches the
 * homepage tabs too.
 */
export type Card = ServiceCard

export type ServiceTab = { id: string; label: string; sub: string; iconOn: string; iconOff: string }

export function serviceTabs(groups: ServiceGroup[]): ServiceTab[] {
  return groups.map((g) => ({
    id: g.id, label: g.tab, sub: g.tabSub, iconOn: g.tabIconOn, iconOff: g.tabIconOff,
  }))
}

/**
 * The homepage draws a service as a photo card (Figma 6532:2049), so a card
 * is on the homepage only when the catalogue carries a photo for it — see the
 * `photo` note in src/data/services.ts for the one that has none. menuOnly
 * cards are live services with no Figma card at all: header menu only.
 */
export function serviceCards(groups: ServiceGroup[]): Record<string, Card[]> {
  return Object.fromEntries(
    groups.map((g) => [
      g.id,
      g.cards.filter((c): c is Card => Boolean(c.photo || c.cut) && !c.menuOnly && !c.unbuilt),
    ]),
  )
}

/* ------------------------------------------------------------------ hero --
 * The hero's words (Hero.tsx), moved out of the markup on 27 Sep 2026 so
 * Admin -> Pages -> Homepage can edit them. Layout, icons, the R2v3 link and
 * the phone's tel: link stay in the component.
 *
 * !! ONE <h1>, TWO WORDINGS — and Google reads the phone one. The phone frame
 * (6590:2312) sets "Certified E-Waste Recycling and ITAD" on two lines; the
 * board (6023:13162) sets "Certified E-Waste Recycling & IT Assets
 * Disposition". Each wording is display:none at the other width. Google
 * indexes mobile-first, so the phone wording is the H1 search sees — flagged
 * to Asim for the SEO team, 24 Sep 2026. `l1` and `l2` are the two lines.
 *
 * `stats` are the three figures, in the board's order (R2v3 · 50 States ·
 * 30+ Years): `v` the figure, `l` the line under it on the board, `short`
 * the phone's one-line label (6604:5043). Icons, sizes and the phone's order
 * are in Hero.tsx, by position.
 *
 * !! The R2v3 tile says "R2v3 Certified Locations" over "Minnesota.
 * Wisconsin", but only Blaine, Minnesota holds R2v3; New Berlin is pending.
 * See the note in Hero.tsx — flagged to Asim 22 Sep 2026.
 */
export const HOME_HERO = {
  /* 29 Sep 2026: back to the WordPress H1, "PAVE THE WAY For A Cleaner Future"
     (RTI-Backup-vs-Live-Audit, tab Title and H1 changes). Was phone "Certified
     E-Waste Recycling and ITAD", board "Certified E-Waste Recycling & IT Assets
     Disposition". When both wordings are the same the hero prints it once. */
  h1Phone: { l1: 'PAVE THE WAY', l2: 'For A Cleaner Future' },
  h1Board: { l1: 'PAVE THE WAY', l2: 'For A Cleaner Future' },
  /* Lead — 6023:13164. Board only: the phone frame has no lead. */
  lead: 'Recycle Technologies provides certified e-waste recycling, ITAD, data destruction, and '
    + 'shredding solutions that keep electronics out of landfills and valuable materials in '
    + 'circulation.',
  quoteButton: 'Get a Quote',
  /* The call button's label. Its tel: link is the header's Minnesota line
     (TOP_BAR.phoneMn in "Header (every page)"): change both together. */
  phone: '+1-763-559-5130',
  stats: [
    { v: 'R2v3 Certified Locations', l: 'Minnesota. Wisconsin', short: 'R2v3 Certified' },
    { v: '50 States', l: 'Accessible through our Mail-In Program', short: '50 States' },
    { v: '30+ Years', l: 'Of recycling experience', short: '30+ Years' },
  ],
}

/* Our Services heading block (OurServices.tsx). The tabs and cards come from
   the "Services page" document. */
export const HOME_SERVICES = {
  eyebrow: 'What We Do',
  title: 'Our Services',
  lead: 'Responsible recycling, destruction, and shredding solutions for materials that need proper handling.',
  /** The words that slide up on a card when it is hovered. */
  more: 'Learn More',
}

/* Industries We Serve heading block (Industries.tsx). */
export const HOME_INDUSTRIES = {
  eyebrow: 'Who We Serve',
  title: 'Industries We Serve',
  lead: 'From corporate facilities to schools and healthcare networks, we provide reliable '
    + 'recycling, secure shredding, ITAD, and data destruction solutions for organizations '
    + 'with different waste and equipment needs.',
  /** The words that slide up on a card when it is hovered. */
  more: 'Learn More',
}

/* How It Works heading block and button (HowItWorks.tsx). The one button is
   the quote link — Asim, 23 Sep 2026; see the note in the component. */
export const HOME_HOW_IT_WORKS = {
  eyebrow: 'Simple & Secure',
  title: 'How It Works',
  lead: 'Responsible recycling made simple — from ordering your kit to receiving your '
    + 'recycling documentation.',
  button: 'Get a Quote',
}

/**
 * Why Choose Recycle Technologies (WhyChooseUs.tsx). `heading` is the two
 * lines of the title. The card positions are in the component, by position.
 *
 * Copy: Asim, 23 Sep 2026 — Chicago is "expanded operations", no longer
 * listed with the R2v3 facilities.
 *
 * The four stat cards: the frame repeats "92% / Diversion Rate" in all four,
 * and Asim supplied the real set on 21 Sep 2026, in this order. They are
 * claims about the business, so Rizwan should check them against the impact
 * report before launch. 25 Sep 2026 (Asim): two cards carry the same figures,
 * in the same words, as IMPACT_STATS below — one set of numbers on the page.
 */
export const HOME_WHY_CHOOSE = {
  heading: { l1: 'Why Choose', l2: 'Recycle Technologies?' },
  body: [
    'With over 30 years of experience, Recycle Technologies provides responsible '
    + 'electronics recycling, IT asset recycling, and document shredding across the '
    + 'Midwest. We are the region’s only minority-owned document destruction and '
    + 'recycling company, backed by R2v3-certified facilities in Minnesota and Wisconsin '
    + 'with expanded operations in Chicago.',
    'Our convenient local and nationwide mail-in recycling options make electronics '
    + 'recycling near you simple, secure, and environmentally responsible.',
  ],
  estimateButton: 'Get a Free Estimate',
  aboutButton: 'Read More About Us',
  stats: [
    { v: '18M+',   l: 'Lbs of E-Waste Recycled' },
    { v: '95%',    l: 'Diversion Rate' },
    { v: '1,500+', l: 'Businesses Served' },
    { v: '2.3M+',  l: 'Devices Destroyed' },
  ],
}

/* Our Strategic National Network (Locations.tsx): the heading block, its
   button, and the "See Our Impact in Action" banner. The facility cards are
   LOCATION_CARDS below. Copy: Asim, 23 Sep 2026 — Chicago is "expanded
   operations", not a licensed facility. The banner button opens /resources/
   (Asim, 23 Sep 2026). */
export const HOME_LOCATIONS = {
  eyebrow: 'Where We Serve',
  title: 'Our Strategic National Network',
  lead: 'Recycle Technologies has licensed facilities in Minnesota and Wisconsin, with '
    + 'expanded operations in Chicago. Our mail-in recycling program is available in '
    + 'all 50 states.',
  button: 'See all Locations',
  impact: {
    heading: 'See Our Impact in Action',
    body: 'Transparency drives everything we do. Dive into our impact reports, brochures, '
      + 'whitepapers, newsletters, and industry insights to understand the measurable '
      + 'difference we actually make through responsible e-waste recycling',
    button: 'Download Resources',
  },
}

/* Client's Testimonials heading (Testimonials.tsx). The cards are
   TESTIMONIALS below. */
export const HOME_TESTIMONIALS = {
  eyebrow: 'Why Enterprises Choose Us',
  title: 'Client’s Testimonials',
}

/* Client's Stories heading block (CaseStudies.tsx), also shown on every
   service detail page that carries the band. `lead` is the two lines the
   board breaks it into (the phone runs them together). `readStory` is the
   link label on each carousel card. The stories themselves come from the
   "Case Studies" document. */
export const HOME_CASE_STUDIES = {
  eyebrow: 'Case Studies',
  title: 'Client’s Stories',
  lead: [
    'Real results from real partnerships. See how organizations simplify ITAD,',
    'strengthen data security, and recover value from retired hardware.',
  ],
  allButton: 'View All Stories',
  estimateButton: 'Get a Free Estimate',
  readStory: 'Read Story',
}

/* The FAQ band's heading block (FaqCtaFooter.tsx). The questions are FAQS
   below. */
export const HOME_FAQ = {
  eyebrow: 'FAQs',
  title: 'Frequently Asked Questions',
  lead: 'Recycling helps conserve resources, reduce pollution and support economic sustainability.',
}

/**
 * Industries — Figma 6023:12500. 310x226 cards; the grid runs 4 + 3.
 *
 * ===========================================================================
 * RECONCILED WITH THE REAL PAGES, 22 Sep 2026
 * ===========================================================================
 * This list used to be eight MARKETING categories that nobody had checked
 * against the seven industry pages that exist. Four of them lined up, and
 * four did not: Food Services, Construction and Distribution & Logistics had
 * no page at all, "Education & Government" was one card over two pages, and
 * Automotive & Fleet had a page with no card. So every card sat unlinked —
 * half of them would have 404'd.
 *
 * Asim asked for Food Services out and the rest linked ("remove the food as
 * it is not build and land all the other on their respective pages"), then
 * chose to reconcile the whole list rather than leave two more dead cards on
 * the page. So this is now exactly the seven built industries, each pointing
 * at its own page, and INDUSTRIES in src/data/industries.ts is its sibling —
 * same seven, longer names, written for the /industries/ catalogue.
 *
 * !! IF AN INDUSTRY PAGE IS ADDED OR REMOVED, BOTH FILES CHANGE. They are not
 * derived from one another on purpose: the copy differs (these blurbs are the
 * homepage's shorter marketing voice) and a shared source would force one of
 * the two to read wrong.
 *
 * TODO(design): Government and Automotive have no photo of their own in the
 * Figma file and borrow one, exactly as /industries/ does — same industry,
 * same picture on both pages, so the two cannot look like different things.
 * Aqeel to supply both. ind-food.png is now unused; leave it in public/ until
 * the design file drops it too.
 */
/* 28 Sep 2026: the homepage frame's industry cards got new photos (Figma
   BVtf2AOuUOcYbiMIlcKmbC, Home 6023:3801 and Home - Mobile 6588:2308), -v2
   files so /industries/ — whose frame did not change — keeps the old ones.
   Retail is unchanged; Government still borrows the logistics picture. */
export const INDUSTRIES = [
  { t: 'Retail',             img: '/images/home/ind-retail.png',        href: href('/industries/retail-corporate-offices/'),   b: 'Responsible electronics recycling and secure shredding to help stores manage outdated equipment and sensitive materials.' },
  { t: 'Manufacturing',      img: '/images/home/ind-manufacturing-v2.png', href: href('/industries/manufacturing-industrial/'),   b: 'Electronics recycling, battery disposal, and material recovery solutions for facilities managing equipment and production waste.' },
  { t: 'Healthcare',         img: '/images/home/ind-healthcare-v2.png',    href: href('/industries/healthcare/'),                 b: 'Secure electronics recycling and data destruction for devices and materials containing sensitive information.' },
  { t: 'Banking & Finance',  img: '/images/home/ind-banking-v2.png',       href: href('/industries/financial-services-banking/'), b: 'Secure hard drive destruction and document shredding to protect sensitive financial and customer information.' },
  // The old "Education & Government" card, split: two pages, two cards.
  { t: 'Education',          img: '/images/home/ind-education-v2.png',     href: href('/industries/education/'),                  b: 'Reliable electronics recycling, data destruction, and shredding services for schools, districts, and universities.' },
  // placeholder art — see the TODO above
  { t: 'Government',         img: '/images/home/ind-logistics.png',     href: href('/industries/government-municipal/'),       b: 'Electronics recycling, data destruction, and secure shredding for government offices and municipal departments.' },
  // Its own photo since 28 Sep 2026 (the homepage frame's Automotive card)
  { t: 'Automotive & Fleet', img: '/images/home/ind-automotive.png',    href: href('/industries/automotive-fleet/'),           b: 'Airbag recycling, electronics disposal, and battery collection for auto shops, dealerships, and fleet operations.' },
]

/**
 * How It Works — Figma 6040:18591.
 *
 * Icons redrawn 23 Sep 2026 (Asim: "change the logos in this section") —
 * one per step now, nodes 6814:2671 / 2680 / 2685 / 2689, where the old set
 * had steps 3 and 4 sharing a glyph. `gw` x `gh` is each icon's drawn size;
 * they differ, and each sits centred in the 89.4px dashed square exactly as
 * the frame places it. Registered in data/figma-assets.json — run
 * `node scripts/fetch-figma-assets.mjs --missing` to pull them.
 */
export const STEPS = [
  { n: 1, glyph: '/images/home/how-order-online.svg',  gw: 52.762, gh: 52.731, t: 'Order Online',        b: 'Select the recycling kit that matches your recycling needs.' },
  { n: 2, glyph: '/images/home/how-pack-securely.svg', gw: 47.573, gh: 54.451, t: 'Pack Securely',       b: 'Place your materials inside the recycling kit while keeping the provided safety packaging intact.' },
  { n: 3, glyph: '/images/home/how-drop-off.svg',      gw: 49.595, gh: 49.595, t: 'Drop Off',            b: 'Attach the prepaid return shipping label and drop the package at your nearest FedEx location.' },
  { n: 4, glyph: '/images/home/how-certificate.svg',   gw: 49.595, gh: 49.595, t: 'Get Your Certificate',b: 'Use the documentation included with your kit to obtain your recycling certificate online.' },
]

/** Locations — Figma 6024:14077. Cards and pins are hand-placed on the map. */
export const LOCATION_CARDS = [
  { x: 370,  y: 370.84, t: 'Minnesota', l1: 'Licensed recycling facilities', l2: 'Blaine, MN' },
  { x: 1246, y: 561.84, t: 'Wisconsin', l1: 'Licensed recycling facility',   l2: 'New Berlin, WI' },
  { x: 499,  y: 790.84, t: 'Chicago',   l1: 'Expanded service coverage',     l2: 'Business recycling & e-waste' },
]

/**
 * Client's Testimonials — Figma 6024:14149 in L79HFCNBww8pW6pPGfQi3e.
 *
 * ===========================================================================
 * REAL GOOGLE REVIEWS — Asim, 23 Sep 2026
 * ===========================================================================
 * The frame repeated one placeholder ("No more guessing where your e-waste
 * ends up…", John Dev, Local Guide 123 Reviews) four times. These are the six
 * reviews Asim screenshotted from Recycle Technologies' Google reviews widget,
 * newest first as the widget orders them, copied VERBATIM — punctuation and
 * all, including Maia Holm's missing full stop. Do not tidy them: they are
 * other people's words under their names.
 *
 * The frame's second line under the name ("Local Guide · 123 Reviews") is a
 * reviewer statistic the screenshots do not show, so it is the review's date
 * instead, which they do.
 *
 * !! iDental Wisconsin's review is TRUNCATED. The widget cuts it at "All the
 * work was done…" behind a Read more, and the full text was not in the
 * screenshot — so it stops at the last whole sentence and `truncated` adds
 * the ellipsis. Paste the full text in and drop the flag when it is to hand.
 * Note what it says, too: "my initial review was more critical of them due to
 * unannounced charges". It is a five-star review and it is real, but it is the
 * one review here a reader will read twice. Shown because Asim included it.
 */
export type Testimonial = {
  quote: string
  name: string
  /** A client testimonial's job title, shown under the name. */
  role?: string
  /** ISO date of a Google review, as the widget shows it, shown under the name
   *  when there is no role. */
  date?: string
  /** Every review here is five stars; kept as data so a four is not a code change. */
  stars: number
  /** The quote is cut short; the card appends an ellipsis. See the note above. */
  truncated?: boolean
}

/**
 * CLIENT TESTIMONIALS — the four from the Figma frame (6554:2055), word for
 * word. Until 25 Sep 2026 these were treated as the designer's sample content
 * and shown only on `next dev` and the dev server. That evening Asim
 * confirmed, in answer to "did these four clients give or approve these exact
 * words, and agree to be named on the RTI website?": "Yes, confirmed". On that
 * confirmation they are the live testimonials, first in the list, so they are
 * the four cards the homepage shows. They carry a job title where the Google
 * reviews carry a date. Asim, same evening: "these are our new client, not
 * from old website", which is why none of them is among the Google reviews.
 *
 * Asim holds the clients' approval. If any of them withdraws it, delete that
 * entry and the next review below takes its card.
 */
export const TESTIMONIALS: Testimonial[] = [
  { name: 'Rachel Simmons', role: 'IT Director', stars: 5,
    quote: 'No more guessing where your e-waste ends up — every shipment comes back with documented proof of responsible recycling. That transparency changed everything for us.' },
  { name: 'Marcus Chen', role: 'Sustainability Manager', stars: 5,
    quote: 'We recycled over 2,000 laptops last year through their service. The pickup scheduling was seamless, and our compliance team loved the detailed audit reports.' },
  { name: 'Sarah Okonkwo', role: 'Small Business Owner', stars: 5,
    quote: 'As a small business, I wasn’t sure how to dispose of old equipment safely. They made it incredibly easy — one call and everything was handled from start to finish.' },
  { name: 'David Hartwell', role: 'CTO', stars: 5,
    quote: 'The data destruction certificates gave us total peace of mind. Our clients trust us with sensitive information, and now we can prove it’s securely handled at end-of-life.' },

  /* The real Google reviews (23 Sep 2026, see the note above), newest first.
     Not shown while the four above fill the cards; kept for when the cards
     rotate or a client entry is removed. */
  { name: 'Dan Kane', date: '2023-04-03', stars: 5,
    quote: 'Absolutely the best. Bar none. Quick, clean, prompt and always outstanding customer service. Soerens Ford appreciates your service!' },
  { name: 'Debbie Clark', date: '2023-03-08', stars: 5,
    quote: 'Courteous, friendly and very easy.' },
  { name: 'Maia Holm', date: '2021-10-21', stars: 5,
    quote: 'They are very friendly and the service was quick and easy' },
  { name: 'Robb Syverson', date: '2021-06-18', stars: 5,
    quote: 'Very easy to work with.' },
  { name: 'iDental Wisconsin', date: '2020-12-21', stars: 5, truncated: true,
    quote: 'My initial review was more critical of them due to unannounced charges however they have made the corrections now and we have settled.' },
  { name: 'Lydia Keith', date: '2020-12-18', stars: 5,
    quote: 'Efficient, friendly and knowledgeable.' },
]

/**
 * The widget's own summary line, verbatim: "Google rating score: 4.9 of 5,
 * based on 13 reviews". A SNAPSHOT from Asim's screenshot of 23 Sep 2026 —
 * the widget on the live site reads it live, this does not. Update both
 * numbers when the Google profile moves, or this line starts to lie.
 */
export const GOOGLE_RATING = { score: '4.9', outOf: 5, count: 13 }

/**
 * The impact figures under Our Services — 6873:13941 (board) and 6873:14158
 * (phone), 25 Sep 2026. They replace the four figures that sat under the
 * reviews (30+ years, 2 facilities, 50 states, 100% documented), which the
 * new frames drop.
 *
 * !! THESE ARE THE DESIGN FILE'S NUMBERS, NOT A SOURCE WE HAVE SEEN. Four
 * specific claims on the homepage (2.3M devices destroyed, 950,000 wiped,
 * 18M lbs recycled, 4,200 tons CO2 avoided). Flagged to Asim to confirm
 * against RTI's own records before they go live.
 */
export const IMPACT_STATS = [
  { n: '2.3M+',    l: 'Devices Destroyed' },
  { n: '950,000+', l: 'Data-Bearing Devices Securely Wiped' },
  { n: '18M+',     l: 'Lbs of E-Waste Recycled' },
  { n: '4,200+',   l: 'Tons of CO2 Emissions Avoided' },
]

/**
 * Case studies — Figma 6557:12903, the carousel that replaced the three-up row
 * (6026:14726) on 21 Sep 2026.
 *
 * ===========================================================================
 * THE THREE REAL CASE STUDIES — Asim, 23 Sep 2026
 * ===========================================================================
 * Until today these were three copies of the frame's placeholder ("SaaS
 * Company Completes Data Center Migration…", tagged Technology) over stock
 * photos. They are now the three stories on /case-studies/, each with the
 * photo the designer drew for it:
 *
 *   Automotive          6766:2600  671x428  drawn in the LEFT slot
 *   Healthcare          6766:2601  821x524  drawn in the CENTRE slot
 *   Corporate Offices   6766:2607  671x428  drawn in the RIGHT slot
 *
 * which is the order below, and why `CASE_STUDIES_START` stays 1 — the
 * hospital story opens in the middle, as drawn. All three are in
 * BVtf2AOuUOcYbiMIlcKmbC and in data/figma-assets.json; new file names, not
 * case-1..3 overwritten, so Next's image cache cannot serve the old photos.
 *
 * The tag, title and one-line "See how…" summary come FROM the case study
 * itself (src/data/case-studies.ts) rather than being typed again here, so the
 * carousel and the /case-studies/ card cannot disagree. Asim asked for "one or
 * 2 liner" of detail under the title — the summary is exactly that line on
 * the case studies page. Each story links to its own card there.
 */
export type Story = {
  img: string
  tag: string
  title: string
  blurb: string
  href: string
}

/* The homepage's own photo for each story, in carousel order. Kept here, not
   in the editable document: the text comes from the case study card. */
const CASE_STUDY_PHOTOS: { id: string; img: string }[] = [
  { id: 'auto-repair-shop',  img: '/images/home/case-auto-repair.png' },
  { id: 'hospital-system',   img: '/images/home/case-healthcare.png' },
  { id: 'midwest-business',  img: '/images/home/case-midwest-business.png' },
]

/**
 * The carousel's stories, built from the case study cards CaseStudies.tsx
 * reads from the "Case Studies" document (27 Sep 2026), so an edit there
 * shows here too.
 */
export function caseStudies(cards: CaseStudyCard[]): Story[] {
  return CASE_STUDY_PHOTOS.map(({ id, img }) => {
    const c = cards.find((x) => x.id === id)
    if (!c) throw new Error(`home.ts: no case study with id "${id}" in src/data/case-studies.ts`)
    return { img, tag: c.industry, title: c.title, blurb: c.blurb, href: caseStudyHref(c.id) }
  })
}

export const CASE_STUDIES_START = 1

/**
 * The homepage FAQ band — Figma 6044:19905.
 *
 * ASIM'S OWN HOMEPAGE FAQS, 23 Sep 2026 ("Main page FAQs … update these
 * content in their places"), verbatim. They replace the six that were picked
 * out of the /faqs/ document on 17 Sep — and they include the two questions
 * the frame drew that the document never answered ("How do I prepare
 * electronics for recycling?", "Can I recycle electronics that still work?"),
 * which now have answers.
 *
 * Written out here rather than picked from src/data/faqs.ts because these are
 * homepage wording, not the FAQ page's: several are different answers to the
 * same question. /faqs/ is unchanged.
 */
export const FAQS: Faq[] = [
  {
    q: 'What items does Recycle Technologies accept?',
    a: 'We accept electronics, televisions, lighting bulbs, batteries, PCB ballasts, hard drives, phones, paper, and other materials for responsible recycling or secure shredding.',
  },
  {
    q: 'How do I prepare electronics for recycling?',
    a: 'Remove personal data from your devices and separate batteries or accessories when required. Follow the preparation instructions for your specific recycling service.',
  },
  {
    q: 'Can I recycle electronics that still work?',
    a: 'Yes. We accept working, unwanted, and outdated electronics for responsible recycling.',
  },
  {
    q: 'What happens to my electronics after I drop them off or mail them in?',
    a: 'Electronics are sorted, safely processed, shredded, and separated to recover valuable materials and keep harmful materials out of landfills.',
  },
  {
    q: 'What happens to my data when I recycle a computer or hard drive?',
    a: 'Data can remain on devices unless it is securely erased or destroyed. We offer secure hard drive destruction to help protect sensitive information.',
  },
  {
    q: 'How do I get started with electronics recycling?',
    a: 'Choose the recycling or shredding service you need, review the applicable service area and accepted materials, and contact Recycle Technologies for a quote, pickup, drop-off, or mail-in option.',
  },
]

/* ------------------------------------------------------------ closing CTA --
 * The homepage's own closing copy — Asim, 21 Sep 2026.
 *
 * The band itself is shared with every other page (see ClosingCta), and until
 * now its COPY was shared too, from SERVICES_CTA. The homepage doc and the Our
 * Services doc word the same band differently, and Asim's call was that the
 * homepage carries its own and nothing else changes. So this is the one page
 * that passes its own content into the shared band.
 *
 * If a third page ever wants its own wording, add it beside this one. Do not
 * edit SERVICES_CTA to suit a page that is not /services/ — every service
 * detail page reads it too.
 *
 * The doc writes " - " between the clauses of the second line; set as an em
 * dash, which is what that punctuation is and what the rest of the site uses.
 */
export const HOME_CTA = {
  heading: 'Ready to Recycle Responsibly?',
  body: [
    'Whether you’re a business managing IT asset disposition or an individual looking to '
    + 'recycle old electronics, Recycle Technologies makes it simple, secure, and sustainable.',
    'Find a location near you or ship your items through our Mail-In Program — certified data '
    + 'destruction and environmental impact reporting included.',
  ],
  primary:   { label: 'Get a Quote',       href: QUOTE_HREF },
  secondary: { label: 'Schedule a Pickup', href: PICKUP_HREF },
}
