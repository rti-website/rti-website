import { QUOTE_HREF, href } from '@/lib/urls'

/**
 * /contact-us/ — copy from the "Contact Us" doc, geometry from Figma 6365:1082.
 *
 * Unlike the industry pages this URL is real: /contact-us/ exists on the live
 * site with its own title and H1, so rule 6 applies and the live metadata ships.
 *
 * !! THE PHONE NUMBER CONFLICT IS RESOLVED — AND THE HEADER IS THE ODD ONE OUT !!
 * The live /contact-us/ page lists the general Wisconsin line as (800) 305-3040,
 * which is what all seven content docs say. The live site's own HEADER says
 * (800) 205-3040, and this build ported that verbatim into TOP_BAR. So the live
 * site contradicts itself and the header is almost certainly the typo. Nothing
 * was changed on either side without a decision: see the note in
 * src/lib/nav.ts. The facility cards below use the direct lines, which every
 * source agrees on, so this page is unaffected either way.
 */

export const LIVE_SEO = {
  // Verbatim from the live page, "inquires" included — rule 6 says port typos
  // and fix them in the second wave, not at launch. Flagged for Rizwan.
  title: 'Contact Us for inquires about E-Waste | Recycle Technologies',
  description:
    'Contact Us- for Recycle Technologies’ safe recycling and shredding services in MN & WI. '
    + 'A reliable and eco-friendly waste management solutions.',
}

export const HERO = {
  crumbs: [
    { label: 'Home',       href: href('/') },
    { label: 'Contact Us', href: null },
  ],
  // Live H1 is "contact us" (lowercase). Built as designed, like every other page.
  h1: 'Contact Us',
  lead: 'Recycle Technologies has been providing services to the community since 1993.',
}

/**
 * Left column — Figma 6370:758, as redrawn in 6365:1082 on 21 Sep 2026.
 *
 * The form grew from four fields to ten: name / email, phone / company, a full
 * width address, city / state / zip, then "What would you like to recycle?"
 * beside "Is it for?", a message and the button. The frame draws that last
 * pair of selects TWICE and labels the message box with the same question — a
 * copy-paste slip Asim caught on 21 Sep 2026 ("don't repeat this, add it one
 * time"), so the pair appears once and the message keeps its own label.
 *
 * The earlier "I'm Contacting About" topic select is not in the redrawn form
 * and is gone with it.
 *
 * Placeholders for the fields the content doc names are the doc's. The frame
 * draws "--" in the address fields and "Select" in Company name, which are
 * stand-ins, not copy; those say what the field is.
 */
export const FORM = {
  eyebrow: 'Get In Touch',
  heading: 'Get a Quote',
  lead: 'Questions about a pickup, drop-off, or your recycling program? Fill out the short form below and our team will get back to you shortly.',
  fields: {
    name:    { label: 'Full Name',     placeholder: 'John Smith' },
    email:   { label: 'Email Address', placeholder: 'jamie@company.com' },
    phone:   { label: 'Phone Number',  placeholder: '(XXX) XXX-XXXX' },
    company: { label: 'Company name',  placeholder: 'Company name' },
    address: { label: 'Address',       placeholder: 'Street address' },
    city:    { label: 'City',          placeholder: 'City' },
    state:   { label: 'State',         placeholder: 'State' },
    zip:     { label: 'Zip code',      placeholder: 'Zip code' },
    item:    { label: 'What would you like to recycle?', placeholder: 'Select' },
    audience:{ label: 'Is it for?',    placeholder: 'Select' },
    message: { label: 'Message',       placeholder: 'Let us know what you’d like to recycle, your preferred timing, or any other details.' },
  },
  /**
   * TODO(content): the frame shows the closed select only, so the options are
   * not designed. These are the services the site offers, in catalogue order,
   * plus a catch-all; Musaveer should confirm the list.
   */
  items: [
    'Lighting bulbs',
    'Electronics',
    'Batteries',
    'Ballasts',
    'Televisions',
    'Hard drives',
    'Paper',
    'Off-site shredding',
    'Cell phones',
    'Airbags',
    'Something else',
  ],
  /** The frame shows "Residential" in the closed select; the other case is the business one. */
  audiences: ['Residential', 'Commercial'],
  submit: 'Send Message',
}

/** Right column — Figma 6370:764. Details match the live contact page exactly. */
export const FACILITIES = {
  eyebrow: 'Our Facilities',
  heading: 'Visit or Ship to Us',
  lead: 'Reach out directly to either of our licensed Midwest facilities.',
  cards: [
    {
      name: 'Minnesota Facility',
      address: '1525 99th Ln NE, Blaine, Minnesota 55449',
      phone: '+1-763-559-5130',
      email: 'dispatch@recycletechnologies.com',
    },
    {
      name: 'Wisconsin Facility',
      address: '2815 South 171st Street, New Berlin, WI 53151',
      phone: '+1-262-798-3040',
      email: 'widispatch@recycletechnologies.com',
    },
  ],
}

/** Figma 6369:759 — six questions here, where the other pages carry five. */
export const FAQ = {
  eyebrow: 'FAQs',
  heading: 'Frequently Asked Questions',
  lead: 'A few quick answers before you reach out — if you don’t see what you need, our team is happy to help.',
  items: [
    { q: 'Why should I recycle?', a: 'Recycling is essential not only for conserving resources and reducing pollution but also for promoting economic sustainability.' },
    { q: 'What items are electronics?', a: 'Electronics include a wide range of items but are generally considered devices that use electricity and electronic circuits to function.' },
    { q: 'Why shouldn’t I throw e-waste in a landfill?', a: 'Tossing e-waste in landfills poisons you, everyone around you, pollutes the planet and other life forms, and wastes precious resources.' },
    { q: 'Can I donate my electronic assets?', a: 'Yes, you can donate your electronic assets. Donating old electronics can help reduce e-waste by extracting precious metals and plastic for other uses. It can also help those who can’t afford a new device.' },
    { q: 'Is my electronic equipment worth something?', a: 'Yes, your electronics can be worth quite a lot. The value depends on age, condition, model, and demand. You should research and compare online for a specific estimate.' },
    { q: 'Why does it cost money to recycle electronics?', a: 'Recycling can be expensive because of the labor and equipment costs, hazardous waste handling, recycling and reprocessing services, and certification fees.' },
  ],
}

/** Figma 6365:3459. Its heading sits lower than the other pages' — y104.43. */
export const CTA = {
  heading: 'Ready to Get Your Recycling Scheduled?',
  body: [
    'Recycle Technologies has been providing services to the community since 1993. Tell us what you need to recycle and we’ll send a fast, no-obligation quote — or set up a pickup with one of our licensed Minnesota or Wisconsin facilities.',
  ],
  primary:   { label: 'Get a Quote',       href: QUOTE_HREF },
  secondary: { label: 'Schedule a Pickup', href: href('/request-a-pickup/') },
}
