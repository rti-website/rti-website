import { href } from '@/lib/urls'

/**
 * /about-us-commercial-recycling-solutions/ — copy from the "About Us" doc,
 * geometry from Figma 6371:3478.
 *
 * WHERE THE DOC AND THE DESIGN DISAGREE, THE DOC WINS. Aqeel wrote placeholder
 * copy into several of these frames before the doc existed and the two have
 * since diverged — the mission, vision and values paragraphs, both story
 * paragraphs and the leadership paragraph are all different in Figma. Every
 * one of those is the doc's version here, which is the same call every other
 * page in this build has made. The divergences are listed in TODO_FOR_DESIGN
 * at the bottom so Aqeel can reconcile the frame.
 */

export const LIVE_SEO = {
  /**
   * Verbatim from the live page, captured 15 Sep 2026. `data/url-map.csv` had
   * a different, unverified pair in it ("About Us | Recycle Technologies" /
   * "Commercial recycling solutions from a certified R2v3 and NAID AAA
   * facility.") that does not appear anywhere on the live site; the row has
   * been corrected and marked verified. This URL carries 1,120 organic clicks
   * and 8 referring domains, the most of any page after the homepage, so the
   * live strings ship untouched under CLAUDE.md rule 6.
   */
  title: 'Commercial recycling | Recycling solution | Recycle technologies',
  description: 'Recycle Technologies Offering full-service commercial recycling as a recycling solution for e-waste, batteries, and lightbulbs in Minnesota and Wisconsin.',
}

export const PROPOSED_SEO = {
  title: 'About Recycle Technologies | Minority-Owned Midwest Recycler',
  description: 'Recycle Technologies has recycled e-waste and fluorescent lamps since 1993 from licensed Minnesota and Wisconsin facilities, with nationwide mail-in service.',
}

/** Hero — 6371:3480. Same frame as every other interior hero. */
export const HERO = {
  crumbs: [
    { label: 'Home',     href: href('/') },
    { label: 'About Us', href: null },
  ],
  h1: 'About Us',
  lead: 'Recycle Technologies has been providing services to the community since 1993.',
}

/** Company story — 6372:841. */
export const STORY = {
  eyebrow: 'Our Story',
  heading: 'Recycling Responsibly Since 1993',
  body: [
    'Recycle Technologies, Inc. is a Midwest-based, Minority-Owned e-waste and fluorescent lamp recycler. With licensed facilities in Minnesota and Wisconsin, we offer a wide range of services and are able to schedule local commercial pickups or accept residential drop-offs. Our Mail-In Program allows us to service customers across the country, and our Certificate of Recycling gives customers peace of mind.',
    'We’re proud to be the only Minority-Owned document destruction and recycling company in the Midwest region. Our Blaine, Minnesota facility carries R2v3 certification, with our New Berlin, Wisconsin facility currently pursuing R2v3 certification as well.',
  ],
  factsTitle: 'Quick Facts',
  facts: [
    'Founded in 1993 — 30+ years in business',
    'Licensed facilities in Minnesota and Wisconsin',
    'The only Minority-Owned recycler in the Midwest',
    'Nationwide reach through our Mail-In Program',
  ],
}

/** Mission, vision and values — 6372:842. */
export const VALUES = {
  eyebrow: 'What Drives Us',
  heading: 'Mission, Vision & Values',
  lead: 'The principles that have guided our work since 1993.',
  cards: [
    {
      glyph: 'target' as const,
      title: 'Mission',
      body: 'To help businesses and individuals recycle responsibly — offering secure, compliant, and convenient recycling and shredding services across the Midwest.',
    },
    {
      glyph: 'eye' as const,
      title: 'Vision',
      body: 'To be a trusted recycling partner for the communities we serve, growing our reach while staying true to the standards that have guided us since 1993.',
    },
    {
      glyph: 'heart' as const,
      title: 'Values',
      body: 'Integrity, environmental stewardship, and proactive service. We hold ourselves to strict compliance standards and stay easy to reach, work with, and count on.',
    },
  ],
}

/** Impact numbers — 6372:843. */
export const IMPACT = {
  heading: 'Our Impact So Far',
  lead: 'Three decades of responsible recycling, backed by certified facilities and a nationwide reach.',
  stats: [
    { v: '32+',  l: 'Years in Business' },
    { v: '2',    l: 'Licensed Facilities' },
    { v: '50',   l: 'States Served via Mail-In Program' },
    { v: 'R2v3', l: 'Certified Recycling Operations' },
  ],
}

/** Leadership — 6372:844. The three pills are design, not doc; they restate
 *  the paragraph and carry no claim the doc does not already make. */
export const LEADERSHIP = {
  eyebrow: 'Leadership',
  heading: 'Locally Owned. Community Led.',
  body: 'Recycle Technologies is proud to be the only Minority-Owned document destruction and recycling company in the Midwest, having served both businesses and individuals with integrity since 1993.',
  pills: ['Minority-Owned Business', 'Hands-On Since 1993', 'Community-Rooted Service'],
}

/**
 * Facilities — 6372:845.
 *
 * ONE DELIBERATE DEPARTURE FROM THE DOC: under "Wisconsin Facility" the doc
 * lists "R2v3 Certified", but its own prose says twice that New Berlin is
 * *pursuing* certification, the Figma card says "Pursuing R2v3 Certification",
 * and the Manufacturing & Industrial FAQ already published on this site says
 * the same. Four sources to one, and the wrong way round is a false
 * certification claim, so the card reads "Pursuing R2v3 Certification". Flagged
 * to Musaveer to fix in the doc.
 *
 * The phone numbers are in the doc but have no row in the Figma card, so the
 * cards carry a third row and are taller than the frame draws them. Growing the
 * box beats dropping the writer's content.
 */
export const FACILITIES = {
  eyebrow: 'Our Facilities',
  heading: 'Licensed, Certified Facilities',
  lead: 'Our Blaine, Minnesota facility is R2v3 certified, with our New Berlin, Wisconsin facility currently pursuing R2v3 certification.',
  cards: [
    {
      name: 'Minnesota Facility',
      address: '1525 99th Ln NE, Blaine, Minnesota 55449',
      phone: '+1-763-559-5130',
      status: 'R2v3 Certified',
    },
    {
      name: 'Wisconsin Facility',
      address: '2815 South 171st Street, New Berlin, WI 53151',
      phone: '+1-262-798-3040',
      status: 'Pursuing R2v3 Certification',
    },
    {
      name: 'Chicago Operations',
      address: 'Expanding our reach into Illinois to serve more businesses and communities in the region.',
      status: 'Not yet a certified facility',
    },
  ],
}

/** Closing CTA — 6372:846. Its own frame, not the shared ServicesCta one:
 *  centred column on a diagonal navy-to-green gradient, no artwork. */
export const CTA = {
  heading: 'Ready to Partner With a Team You Can Trust?',
  body: 'From the first pickup to the final Certificate of Recycling, our Midwest-based team handles your materials responsibly, securely, and on time.',
  primary:   { label: 'Get a Quote', href: href('/quote/') },
  secondary: { label: 'Contact Us',  href: href('/contact-us/') },
}

/** Gaps between Figma 6371:3478 and the About Us doc, for Aqeel and Musaveer. */
export const TODO_FOR_DESIGN = [
  'Mission / Vision / Values: the frame carries older copy ("To be the primary recycling resource…", "A future where responsible recycling is the norm…", "…treat every customer’s materials with care"). The doc’s wording is built.',
  'Company story: the frame’s two paragraphs are a rewrite of the doc’s. The doc’s wording is built, which makes the left column taller than the 319px the frame allows.',
  'Leadership: the frame adds "…building direct relationships with the businesses and communities we serve — not a distant corporate office", which the doc does not say. Built from the doc, so the block is shorter.',
  'Facility cards have no row for a phone number, but the doc gives one for each of the two licensed sites. A third row was added.',
  'Doc fix needed: the Wisconsin facility is listed as "R2v3 Certified" in the facilities list while the same doc says twice that it is pursuing certification.',
]
