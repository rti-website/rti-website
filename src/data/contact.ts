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
  // Asim, 23 Sep 2026.
  lead: 'Questions about recycling, drop-off, or getting a quote? Reach out to our team and get a quick response to your queries.',
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
/**
 * The services a visitor can pick — ONE list for the contact form's "Service
 * Interest" and the homepage hero's "Pick Your Service", so a service chosen
 * in the hero always exists in the form it lands on (Asim, 23 Sep 2026: "when
 * someone selects the service it must automatically come to [the] contact
 * form"). The form spec says the options "mirror the Services page", so this
 * is that page's list, plus Other.
 */
export const SERVICE_INTEREST = [
  'IT Asset Disposition (ITAD)',
  'Electronics Recycling',
  'Battery Recycling',
  'Light Bulb Recycling',
  'Ballast Recycling',
  'TV Recycling',
  'Airbag Recycling',
  'Hard Drive Destruction',
  'Paper Shredding',
  'Off-Site Shredding',
  'Phone Shredding',
  'Mail-In Program',
  'Other',
] as const

/**
 * The contact form — rebuilt to the lead-form spec Asim sent on 23 Sep 2026
 * ("2.1 Visible fields"), which replaces the frame's eleven fields:
 *
 *   First name   text      required, 2 to 60 chars
 *   Last name    text      required, 2 to 60 chars
 *   Email        email     required, lowercased on save
 *   Phone        tel       required, US format accepted loosely, stored as +1XXXXXXXXXX
 *   Company      text      optional
 *   Address      text      optional              } back from the frame
 *   City         text      optional              } (6365:1082) on Asim's
 *   State        text      optional              } instruction, 23 Sep 2026
 *   Zip code     text      optional, 5 digits
 *   What would you like to recycle?  select, SERVICE_INTEREST above (the
 *                          spec's "Service Interest", relabelled as the frame
 *                          draws it; still `service`, so the hero preselect
 *                          keeps working)
 *   Is it for?   select    Residential (default) or Commercial
 *   Message      textarea  optional, max 2000 chars
 *   Consent      checkbox  required: "I agree to be contacted by Recycle Technologies"
 *
 * No "(optional)" markers on the labels — Asim, 23 Sep 2026: "remove the
 * optional things". Which fields are required is unchanged; the form says so
 * when one is missed.
 *
 * The rules are enforced twice: in the browser (ContactForm), and again in
 * /api/leads, which is the one that counts — see validateSpecForm there.
 */
export const FORM = {
  eyebrow: 'Get In Touch',
  heading: 'Get a Quote',
  lead: 'Questions about a pickup, drop-off, or your recycling program? Fill out the short form below and our team will get back to you shortly.',
  fields: {
    firstName: { label: 'First Name',       placeholder: 'John' },
    lastName:  { label: 'Last Name',        placeholder: 'Smith' },
    email:     { label: 'Email Address',    placeholder: 'jamie@company.com' },
    phone:     { label: 'Phone Number',     placeholder: '(XXX) XXX-XXXX' },
    company:   { label: 'Company Name',     placeholder: 'Company name' },
    // "--" is the frame's placeholder for the four address fields.
    address:   { label: 'Address',          placeholder: '--' },
    city:      { label: 'City',             placeholder: '--' },
    state:     { label: 'State',            placeholder: '--' },
    zip:       { label: 'Zip code',         placeholder: '--' },
    service:   { label: 'What would you like to recycle?', placeholder: 'Select' },
    audience:  { label: 'Is it for?',       placeholder: '' },
    message:   { label: 'Message',          placeholder: 'Let us know what you’d like to recycle, your preferred timing, or any other details.' },
  },
  /** "Is it for?" — the first is the default, as the frame draws it. */
  audiences: ['Residential', 'Commercial'] as const,
  consent: 'I agree to be contacted by Recycle Technologies',
  messageMax: 2000,
  submit: 'Send Message',
  sent: 'Thanks — your message is with us. We usually reply within one business day.',
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
