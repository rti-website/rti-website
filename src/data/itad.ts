import { QUOTE_HREF, href } from '@/lib/urls'

/**
 * /it-asset-disposition/ — Figma 6778:2946 (desktop) and 6778:3335 (mobile),
 * both in BVtf2AOuUOcYbiMIlcKmbC. Built 23 Sep 2026 on Asim's instruction:
 * "now we have to make the ITAD page".
 *
 * A KEEP ROW, NOT A NEW URL. /it-asset-disposition/ is live on WordPress and
 * sits in data/url-map.csv with its title, description and H1, so those three
 * are the url-map's, word for word (CLAUDE.md rule 6) — see SEO and HERO.h1.
 * Until today it was the one KEEP row the redesign linked to without serving:
 * seven industry pages, /itad-recycling-guides/ and (until this morning) the
 * homepage all pointed here and got a 404.
 *
 * !! THE FRAME'S H1 IS "ITAD"; THE PAGE'S IS "IT Asset Disposition". The
 * url-map row, the live page and every inbound link say the long form, and an
 * H1 that changes on a KEEP URL is exactly the regression rule 6 exists to
 * stop. The breadcrumb keeps the designer's "ITAD". Flag for second wave if the
 * short form is wanted.
 *
 * COPY IS THE FRAME'S. The live page carries an older version of the same
 * sections ("Upgrade Your IT Asset Disposal Plan with Recycle Technologies",
 * "Process for Our ITAD Services", "Book a Pickup Today!") and — under the
 * heading "The importance of Air Conditioner Disposal and its Effects" — a
 * paragraph pasted from another page. The designer's rewrite keeps the same
 * section order and meaning, so it is built as drawn.
 *
 * THE PHONE FRAME SHORTENS MOST OF THE PROSE (e.g. the intro's two paragraphs
 * become one line each). Not followed: one DOM serves both widths on this site,
 * and the desktop sentences fit the phone column without crowding. What the
 * phone frame DROPS — the leads under three section headings — is dropped
 * below lg with `max-lg:hidden`, so the words stay in the HTML.
 */

export const SEO = {
  title: 'IT Asset Disposition | Call (800) 969-5166',
  description:
    'IT asset disposition for retired laptops, servers, storage hardware, networking equipment, and office technology. Call (800) 969-5166 to arrange service.',
}

/** Hero — 6778:2948. Photo 6778:2951, the frame's own. */
export const HERO = {
  crumbs: [
    { label: 'Home', href: href('/') },
    { label: 'ITAD', href: null },
  ],
  h1: 'IT Asset Disposition',
  // Asim, 24 Sep 2026 (the doc's dash as a comma, like every other hero).
  lead: 'Secure, documented, and fully compliant IT asset disposition, from decommissioning to certified data destruction. Every device is tracked, every outcome is recorded, and nothing leaves your control until it’s verifiably handled.',
  image: '/images/itad/hero.png',
  /* The photo is the node's raw IMAGE FILL (the MCP no longer returns a
     clipped 1920x470 export), so it is drawn as the frame draws it: 1920x1081
     at y-332, with the node's own navy fade over it. The frame also moves the
     two washes left — navy at x-257, green a further -373 inside it — which
     leaves only a faint green on the left edge. All as drawn, 6778:2951-2953. */
  imageFill: {
    y: -332,
    h: 1081,
    overlay: 'linear-gradient(89.28deg, rgb(11,31,58) 10.212%, rgba(30,86,160,0) 99.651%)',
  },
  // navy runs to the right edge (2177, not the frame's 1937): its gradient is
  // vertical, so the extra width only covers x1680-1920, where the frame's
  // box stopped short and left a visible seam in the bottom shade.
  washes: { navy: { x: -257, w: 2177 }, green: { x: -373, w: 1937 } },
}

/** Intro — 6779:2661 / 6783:2667. */
export const INTRO = {
  eyebrow: 'IT Asset Disposition',
  heading: 'Upgrade Your IT Asset Disposal Plan',
  paragraphs: [
    'Every industry has its own approach to disposal, but IT assets are a different challenge entirely. Retiring laptops, servers, storage hardware, and networking equipment raises real concerns around data security, hardware recovery, and environmental responsibility — all at once.',
    'Recycle Technologies offers a one-stop solution for IT asset disposition — our team ensures your retired equipment is securely wiped, responsibly recycled, and fully documented, so security, sustainability, and brand reputation are never in tension.',
  ],
  cta: { label: 'Get a Quote', href: QUOTE_HREF },
  included: {
    title: 'What’s Included',
    items: [
      'Certified, secure data destruction',
      'Certificate of Destruction or Recycling',
      'Free pickup scheduling',
      'Zero-landfill disposal policy',
    ],
  },
}

/** Why it matters — 6779:2662 / 6783:2668. */
export const WHY = {
  eyebrow: 'Why It Matters',
  heading: 'ITAD for Businesses, Hospitals & Institutions',
  lead: 'Retiring IT assets the right way protects your data, recovers real value, and clears IT waste off your hands responsibly — whatever your project’s size or complexity.',
  cards: [
    { title: 'Data Protection',  body: 'Every device is securely wiped or destroyed before it leaves your hands — closing the door on unauthorized access to sensitive data.' },
    { title: 'Recovery Value',   body: 'Retired hardware often still has resale or materials value. Our team maximizes what’s recoverable instead of writing it off as waste.' },
    { title: 'IT Waste Removal', body: 'One call clears your IT waste responsibly — no landfill, no lingering liability, and a documented trail for every asset.' },
  ],
}

/** Complete IT disposal services — 6779:2663 / 6783:2669. Photos are the frame's. */
export const SERVICES = {
  eyebrow: 'Full Service',
  heading: 'Complete IT Disposal Services',
  lead: 'Follow your own ITAD policy, or let our team handle the project from scratch — the choice is yours.',
  cards: [
    { img: '/images/itad/asset-destruction.png',       title: 'Asset Destruction',         body: 'Physical destruction of hard drives and storage media when policy calls for it, not just secure wiping.' },
    { img: '/images/itad/complete-data-removal.png',   title: 'Complete Data Removal',     body: 'Certified data sanitization that goes beyond formatting or deleting files, for devices being resold or recycled.' },
    { img: '/images/itad/hardware-categorization.png', title: 'Hardware Categorization',   body: 'Assets are sorted and tracked by type and condition, so you know exactly what happened to each item.' },
    { img: '/images/itad/recycling-it-equipment.png',  title: 'Recycling of IT Equipment', body: 'Everything that can’t be reused is broken down responsibly, following our zero-landfill policy.' },
  ],
}

/** How our ITAD services work — 6779:2664 / 6783:2670. No lead in either frame. */
export const PROCESS = {
  eyebrow: 'Our Process',
  heading: 'How Our ITAD Services Work',
  steps: [
    { title: 'Discussion', body: 'Tell us about your IT assets by form or on a call with our ITAD experts.' },
    { title: 'Estimation', body: 'We evaluate the details and provide a recycling plan with a return estimate.' },
    { title: 'Planning',   body: 'A pickup plan is scheduled at your convenience, delivering assets to our facility.' },
    { title: 'Disposal',   body: 'Hardware is sorted, data is cleared, and materials are recycled per our zero-landfill policy.' },
  ],
}

/** Our prominent features — 6779:2665 / 6783:2671. Icons are the frame's own. */
export const FEATURES = {
  eyebrow: 'Why Work With Us',
  heading: 'Our Prominent Features',
  lead: 'Client trust is what keeps us going — we go the extra mile to do every project the right way.',
  items: [
    { icon: '/images/itad/feature-eco.svg',         text: 'Eco-friendly, efficient recycling methods' },
    { icon: '/images/itad/feature-return.svg',      text: 'Maximum return on your retired assets' },
    { icon: '/images/itad/feature-security.svg',    text: 'Data security guaranteed, every time' },
    { icon: '/images/itad/feature-certificate.svg', text: 'Certificate of Recycling for every client' },
    { icon: '/images/itad/feature-waste.svg',       text: 'Responsible IT waste management' },
    { icon: '/images/itad/feature-compliance.svg',  text: 'Disposal in compliance with legal guidelines' },
  ],
}

/**
 * Book a pickup — 6779:2666 / 6783:2672. The form is the live page's own
 * field list (First/Last Name, Company, Email, Phone, Address, How did you
 * hear about us?, Residential or Business, What would you like to recycle),
 * so a lead from here carries what the team already asks for.
 *
 * Posts to /api/leads as a `quote` — see PickupForm.
 *
 * !! `heard` OPTIONS ARE OURS. Neither the frame nor the live page's HTML
 * lists them (the live form fills them in with script). These five are
 * placeholders for the team to replace with whatever they already track.
 */
export const PICKUP = {
  eyebrow: 'Get Started',
  heading: 'Book a Pickup Today',
  lead: 'Call us at +1-800-969-5166 or get a free estimate by filling out the form below.',
  fields: {
    firstName: { label: 'First Name',     placeholder: 'Jane' },
    lastName:  { label: 'Last Name',      placeholder: 'Smith' },
    company:   { label: 'Company Name',   placeholder: 'Acme Corp' },
    email:     { label: 'Email',          placeholder: 'jane@company.com' },
    phone:     { label: 'Phone',          placeholder: '(000) 000-0000' },
    address:   { label: 'Address',        placeholder: 'Street, City, State' },
    heard:     { label: 'How Did You Hear About Us?', placeholder: 'Select an option' },
    audience:  { label: 'Residential or Business?',   placeholder: 'Select an option' },
    message:   { label: 'What Would You Like to Recycle?', placeholder: 'Please describe the assets you’d like picked up in detail — quantity, type, and condition.' },
  },
  heard: ['Search engine', 'Referral', 'Social media', 'Returning customer', 'Other'],
  audiences: ['Residential', 'Business'],
  submit: 'Submit',
  sent: 'Thanks — your request is with us. We usually reply within one business day.',
  /** The pop-up a sent request opens (SuccessDialog), 24 Sep 2026. */
  popup: {
    title: 'Thank you',
    body: 'Your pickup request has been sent. Our team usually replies within one business day.',
  },
}
