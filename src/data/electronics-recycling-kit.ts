import type { ServicePageContent } from '@/data/service-page'
import { MAIL_IN } from '@/lib/nav'
import { href } from '@/lib/urls'

/**
 * /electronics-recycling-kit/ — the "Electronics Recycling Kit" doc, supplied
 * by Asim on 24 Sep 2026.
 *
 * !! A NEW URL. Until now the header's "Electronic Recycling Kit" row opened
 * /electronic-recycle/, the commercial electronics SERVICE page, which is not
 * the kit. The kit now has its own page, and the old WordPress kit URL
 * /recycling-kits/electronics-recycling-kits/ 301s here instead of to the
 * service page (data/url-map.csv). /electronic-recycle/ is untouched.
 *
 * The doc's SEO title and description ship as written: there is no live page
 * at this URL whose title rule 6 would protect.
 *
 * !! THE DOC IS PART PLACEHOLDER, as the mail-in doc was. Its bracketed
 * "[Placeholder: ...]" lines are not rendered (a placeholder must never reach
 * a live page); they are listed in `todo` below. Its dashes are commas, the
 * site's style since 24 Sep 2026.
 *
 * "Get a Recycling Kit" goes where every "Mail In Program" link on the site
 * goes (MAIL_IN in src/lib/nav.ts), the online store the kits are sold from,
 * so the two can never point at different shops.
 */
export const CONTENT: ServicePageContent = {
  url: '/electronics-recycling-kit/',
  liveSeo: {
    title: 'Electronics Recycling Kit | Mail-In E-Waste Program',
    description: 'Recycle electronics from anywhere with Recycle Technologies’ mail-in Electronics Recycling Kit. No local drop-off needed; open to individuals and businesses.',
  },
  proposedSeo: {
    title: 'Electronics Recycling Kit | Mail-In E-Waste Program',
    description: 'Recycle electronics from anywhere with Recycle Technologies’ mail-in Electronics Recycling Kit. No local drop-off needed; open to individuals and businesses.',
  },
  hero: {
    crumb: 'Electronics Recycling Kit',
    h1: 'Electronics Recycling Kit',
    lead: 'Recycle Technologies’ Electronics Recycling Kit is a mail-in option that lets you recycle electronics from home when a local drop-off or pickup isn’t available, with kits purchased online and mailed back once filled.',
    cta: { label: 'Get a Recycling Kit', href: MAIL_IN.href, external: true },
    noPicker: true,
    image: '/images/services/hero-electronics.png',
  },
  intro: {
    heading: 'What Is the Electronics Recycling Kit?',
    body: [
      'Not everyone lives near a Recycle Technologies drop-off location, and not everyone qualifies for business pickup service. The Electronics Recycling Kit fills that gap. It’s a mail-in program built for people and organizations who need to recycle electronics but don’t have a convenient local option.',
      'The program works around a simple idea: if a nearby “electronics recycling near me” search doesn’t turn up anything useful, you can still get your electronics into Recycle Technologies’ recycling process by mail. Kits are purchased online, and once you’ve filled yours, you send it back for processing.',
      'This countrywide mail-in option is open to individuals as well as businesses, which sets it apart from Recycle Technologies’ pickup service, which is limited to commercial clients. If you’re a household user with a handful of old devices, or a small business without enough volume to justify a scheduled pickup, the kit program is designed with you in mind.',
    ],
    image: '/images/services/mail-in-intro.jpg',
  },
  accept: {
    heading: 'What Can Go in the Kit?',
    // The doc's first paragraph here is a placeholder (no published list of
    // kit-approved items), so the section is its two real paragraphs only.
    intro: [
      'Recycle Technologies’ broader electronics recycling process is built around dismantling devices into base materials, including plastic, wire, circuit boards, metals, and glass, which gives a general sense of the kind of electronics the company is equipped to handle.',
      'Whether every device type is approved for the mail-in kit specifically should be confirmed before you order.',
    ],
    items: [],
  },
  process: {
    heading: 'How Does the Electronics Recycling Kit Work?',
    intro: 'The Mail-In Kit lets you recycle electronics from anywhere in the country, no drop-off or pickup required. Order a kit, pack your items, and send it back; Recycle Technologies handles the rest.',
    steps: [
      { label: 'Order Your Kit:',            text: 'Request a recycling kit online through Recycle Technologies’ Mail-In Program. Each kit ships with all necessary packaging materials and prepaid postage included, so there are no hidden shipping costs.' },
      { label: 'Pack Your Electronics:',     text: 'Place your electronics securely inside the provided packaging. You may seek guidance from our operations team about any item-specific packing, e.g., removing batteries, bagging cracked screens, and whether a weight or size limit applies per kit.' },
      { label: 'Send the Kit Back:',         text: 'Use the prepaid shipping label included with your kit to send it back to Recycle Technologies via any of the listed courier services, no separate postage purchase or account needed.' },
      { label: 'Recycling and Processing:',  text: 'Once received, your electronics enter Recycle Technologies’ certified recycling process, which has operated from licensed facilities in Minnesota and Wisconsin since 1993.' },
    ],
    image: '/images/services/mail-in-process.jpg',
  },
  audience: {
    heading: 'Who Is the Program For?',
    intro: 'The Electronics Recycling Kit is intended for anyone who can’t easily reach a local drop-off location, including:',
    items: [
      { label: 'Individuals recycling electronics from home, regardless of where they’re located', text: '' },
      { label: 'Small businesses or organizations with electronics to recycle but no need for a scheduled commercial pickup', text: '' },
      { label: 'Customers outside Recycle Technologies’ Minnesota and Wisconsin service area who still want to use its recycling process', text: '' },
    ],
    outro: 'This is different from Recycle Technologies’ business pickup service, which is available exclusively to commercial clients. The mail-in kit program, by contrast, is described as open to anyone, wherever they’re located in the country.',
  },
  faqs: [
    { q: 'Can I use the Electronics Recycling Kit if I don’t live in Minnesota or Wisconsin?', a: 'Yes. The kit program is described as countrywide and designed for customers who don’t have a nearby drop-off option.' },
    { q: 'Is the Electronics Recycling Kit available to individuals, or just businesses?', a: 'Individuals can use it. This differs from Recycle Technologies’ pickup service, which is limited to commercial clients.' },
    { q: 'What happens to my electronics after I send back the kit?', a: 'They’re processed through Recycle Technologies’ recycling operations, the same system used across its other electronics recycling services.' },
  ],
  cta: {
    heading: 'Ready to Recycle From Home?',
    body: [
      'If a local option isn’t available to you, get a recycling kit to start recycling your electronics by mail. Business pickup service is available exclusively to commercial clients; the mail-in kit program is open to individuals and businesses alike.',
    ],
    primary:   { label: 'Get a Recycling Kit', href: MAIL_IN.href, external: true },
    secondary: { label: 'Find Locations',      href: href('/all-locations/') },
  },
  todo: [
    'What Can Go in the Kit: no published list of kit-approved electronics. The placeholder paragraph is not rendered.',
    'FAQ "How much does an Electronics Recycling Kit cost?": pricing not published. Question omitted.',
    'FAQ "Do I get documentation after my electronics are recycled?": whether mail-in kit customers get a Certificate of Recycling is not confirmed. Question omitted.',
    'Case Studies & Testimonials: the doc says kit-specific ones are "to be added"; the page shows the shared case study carousel meanwhile.',
    'Compliance: the doc gives the older compliance line; the page shows the site-wide one (CERT_COPY), as every other band does.',
    'Hero and CTA buttons go to the Mail In Program store (MAIL_IN.href). If the store has an electronics kit product page, point them at it.',
  ],
}
