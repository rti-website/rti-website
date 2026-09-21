import { href } from '@/lib/urls'
import { SERVICE_GROUPS, type ServiceCard } from '@/data/services'
import { ALL_FAQS, type Faq } from '@/data/faqs'

/**
 * Pulls named questions out of the full FAQ set, in the order given.
 *
 * Throws on a question that is not there, on purpose: a silent miss would leave
 * the homepage band one row short and nobody would notice until a screenshot.
 */
function pickFaqs(questions: string[]): Faq[] {
  return questions.map((q) => {
    const found = ALL_FAQS.find((f) => f.q === q)
    if (!found) throw new Error(`Homepage FAQ not found in src/data/faqs.ts: "${q}"`)
    return found
  })
}

/* Homepage content, transcribed from the Figma frame 6023:3801.
   Titles keep the design's explicit line breaks. Every href is the LIVE URL. */

/**
 * The tab strip and its cards are the SAME catalogue that /services/ renders
 * flat — see src/data/services.ts. Derived rather than copied, because the two
 * pages drifting apart (a card here, a URL there) is exactly the kind of bug
 * that survives review and then shows up as a 404 in the crawl.
 */
export type Card = ServiceCard & { photo: string }

export const SERVICE_TABS = SERVICE_GROUPS.map((g) => ({
  id: g.id, label: g.tab, sub: g.tabSub, iconOn: g.tabIconOn, iconOff: g.tabIconOff,
}))

/**
 * The homepage draws a service as a photo card (Figma 6532:2049), so a card
 * is on the homepage only when the catalogue carries a photo for it — see the
 * `photo` note in src/data/services.ts for the one that has none. menuOnly
 * cards are live services with no Figma card at all: header menu only.
 */
export const SERVICE_CARDS: Record<string, Card[]> = Object.fromEntries(
  SERVICE_GROUPS.map((g) => [
    g.id,
    g.cards.filter((c): c is Card => Boolean(c.photo) && !c.menuOnly && !c.unbuilt),
  ]),
)

/** Industries — Figma 6023:12500. Eight cards, 310x226, two rows of four. */
export const INDUSTRIES = [
  { t: 'Retail',                  img: '/images/home/ind-retail.png',        b: 'Responsible electronics recycling and secure shredding to help stores manage outdated equipment and sensitive materials.' },
  { t: 'Manufacturing',           img: '/images/home/ind-manufacturing.png', b: 'Electronics recycling, battery disposal, and material recovery solutions for facilities managing equipment and production waste.' },
  { t: 'Healthcare',              img: '/images/home/ind-healthcare.png',    b: 'Secure electronics recycling and data destruction for devices and materials containing sensitive information.' },
  { t: 'Construction',            img: '/images/home/ind-construction.png',  b: 'Responsible recycling for electronics, lighting, batteries, and other materials used across active project sites.' },
  { t: 'Distribution & Logistics',img: '/images/home/ind-logistics.png',     b: 'Convenient recycling and shredding solutions for outdated electronics, equipment, documents, and other materials.' },
  { t: 'Banking & Finance',       img: '/images/home/ind-banking.png',       b: 'Secure hard drive destruction and document shredding to protect sensitive financial and customer information.' },
  { t: 'Food Services',           img: '/images/home/ind-food.png',          b: 'Electronics, lighting, battery recycling, and secure shredding solutions for restaurants and food service facilities.' },
  { t: 'Education & Government',  img: '/images/home/ind-education.png',     b: 'Reliable electronics recycling, data destruction, and shredding services for schools and public institutions.' },
]

/** How It Works — Figma 6040:18591. Steps 3 and 4 share a glyph in the design. */
export const STEPS = [
  { n: 1, glyph: '/images/home/step-1.svg', t: 'Order Online',        b: 'Select the recycling kit that matches your recycling needs.' },
  { n: 2, glyph: '/images/home/step-2.svg', t: 'Pack Securely',       b: 'Place your materials inside the recycling kit while keeping the provided safety packaging intact.' },
  { n: 3, glyph: '/images/home/step-3.svg', t: 'Drop Off',            b: 'Attach the prepaid return shipping label and drop the package at your nearest FedEx location.' },
  { n: 4, glyph: '/images/home/step-3.svg', t: 'Get Your Certificate',b: 'Use the documentation included with your kit to obtain your recycling certificate online.' },
]

/** Locations — Figma 6024:14077. Cards and pins are hand-placed on the map. */
export const LOCATION_CARDS = [
  { x: 370,  y: 370.84, t: 'Minnesota', l1: 'Licensed recycling facilities', l2: 'Blaine, MN' },
  { x: 1246, y: 561.84, t: 'Wisconsin', l1: 'Licensed recycling facility',   l2: 'New Berlin, WI' },
  { x: 499,  y: 790.84, t: 'Chicago',   l1: 'Expanded service coverage',     l2: 'Business recycling & e-waste' },
]

/**
 * Client's Testimonials — Figma 6024:14149 in L79HFCNBww8pW6pPGfQi3e, the
 * four-card version of 21 Sep 2026. The frame repeats one review four times.
 *
 * TODO(content): the designer's note on the earlier frame still stands — "the
 * current homepage's testimonial section contains placeholder Lorem Ipsum, so
 * you should not use those testimonials." Replace with four real Google
 * reviews before launch; the shape below is what each one needs.
 */
export type Testimonial = {
  quote: string
  name: string
  /** "Local Guide", or whatever Google shows under the reviewer. */
  role: string
  reviews: string
}

const REVIEW: Testimonial = {
  quote: 'No more guessing where your e-waste ends up — every shipment comes back with documented proof.',
  name: 'John Dev',
  role: 'Local Guide',
  reviews: '123 Reviews',
}

export const TESTIMONIALS: Testimonial[] = [REVIEW, REVIEW, REVIEW, REVIEW]

/** The stats strip under the reviews — 6554:2121. Agrees with the hero's strip. */
export const TESTIMONIAL_STATS = [
  { n: '30+',  l: 'Years serving the Midwest' },
  { n: '2',    l: 'R2v3-certified facilities' },
  { n: '50',   l: 'States reached nationwide' },
  { n: '100%', l: 'Shipments documented' },
]

/**
 * Case studies — Figma 6557:12903, the carousel that replaced the three-up row
 * (6026:14726) on 21 Sep 2026. Same three photos, same placeholder copy on all
 * three cards, as drawn. The frame opens with the server-rack story in the
 * middle, which is why `CASE_STUDIES_START` is 1.
 *
 * TODO(content): the copy is the frame's placeholder. /case-studies/ now has
 * five written stories (src/data/case-studies.ts) — swap these for three of
 * them, with matching photos, once Asim picks which.
 */
export const CASE_STUDIES = [
  { img: '/images/home/case-1.png', tag: 'Technology', title: 'SaaS Company Completes Data Center Migration with Zero Downtime and Full Asset Transparency', href: href('/case-studies/') },
  { img: '/images/home/case-2.png', tag: 'Technology', title: 'SaaS Company Completes Data Center Migration with Zero Downtime and Full Asset Transparency', href: href('/case-studies/') },
  { img: '/images/home/case-3.png', tag: 'Technology', title: 'SaaS Company Completes Data Center Migration with Zero Downtime and Full Asset Transparency', href: href('/case-studies/') },
]
export const CASE_STUDIES_START = 1

/**
 * The homepage FAQ band — Figma 6044:19905.
 *
 * !! THE SIX QUESTIONS CHANGED ON 17 Sep 2026, AND HERE IS WHY. The frame drew
 * six questions with no answers, so the band opened onto "Answer copy to be
 * supplied." Asim supplied a content document the same day — seventeen groups,
 * 114 questions, every one with a written answer — and asked for answers on the
 * homepage. Four of the frame's six have a near-twin in that document and two
 * ("How do I prepare electronics for recycling?", "Can I recycle electronics
 * that still work?") have none at all.
 *
 * Rather than write answers to questions nobody has answered, these are six of
 * his, verbatim, chosen for a homepage: broad, high-intent, one per service
 * area. The full set is on /faqs/ and in src/data/faqs.ts, which is the source
 * both draw from — so an answer edited there is edited here too.
 *
 * The two dropped questions are worth asking for: they are good questions and a
 * visitor asks them. Logged in TODO_FOR_CONTENT in src/data/faqs.ts.
 */
export const FAQS: Faq[] = pickFaqs([
  'What does Recycle Technologies recycle?',
  'Does Recycle Technologies offer recycling for businesses?',
  'What happens to electronics after they are collected?',
  'How do I safely dispose of an old hard drive?',
  'Does Recycle Technologies offer recycling pickup?',
  'How do I get started with Recycle Technologies?',
])

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
  primary:   { label: 'Find a Location',         href: href('/all-locations/') },
  secondary: { label: 'Start Mail-In Recycling', href: 'https://ezontheearth.com/', external: true },
}
