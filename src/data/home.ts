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
export type Card = ServiceCard

export const SERVICE_TABS = SERVICE_GROUPS.map((g) => ({
  id: g.id, label: g.tab, icon: g.tabIcon, w: g.tabW, h: g.tabH,
}))

export const SERVICE_CARDS: Record<string, Card[]> = Object.fromEntries(
  // menuOnly cards are live services with no Figma card — header menu only.
  SERVICE_GROUPS.map((g) => [g.id, g.cards.filter((c) => !c.menuOnly && !c.unbuilt)]),
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
 * TODO(content): the Figma file repeats one review three times and the
 * designer's note in the frame says: "The current homepage's testimonial
 * section contains placeholder Lorem Ipsum, so you should not use those
 * testimonials." Replace with real Google reviews before launch.
 */
export const TESTIMONIAL = {
  quote: '“These guys are great to work with. I get to work with eWaste Solutions regularly, always professional, punctual, and they handle everything correctly. Highest recommendation.”',
  name: 'John Barrett',
  meta: 'Local Guide · 123 reviews',
  source: 'Google Review',
}

/** Case studies — Figma 6026:14726. All three carry the same placeholder title. */
export const CASE_STUDIES = [
  { x: 319,  img: '/images/home/case-1.png', tall: true  },
  { x: 753,  img: '/images/home/case-2.png', tall: false },
  { x: 1187, img: '/images/home/case-3.png', tall: false },
]

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
