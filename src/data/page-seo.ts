/**
 * Meta titles, meta descriptions and focus keywords for the site's pages —
 * RecycleTechnologies_MetaData_SEO.xlsx ("Status: Ready for go-live"), applied
 * on Asim's instruction, 23 Sep 2026: "add the meta title, meta description
 * and focus keywords … for all of the listed pages in the sheet".
 *
 * !! THIS OVERRIDES CLAUDE.md RULE 6 FOR THESE URLS, BY THE OWNER'S DECISION.
 * Until now every title and description was the live WordPress one from
 * data/url-map.csv, word for word. For the pages below, this sheet wins:
 * src/lib/seo.ts buildMetadata() looks the page's URL up here first. Pages
 * not listed (blog posts, category archives, legal pages, /ballasts/, …)
 * keep what they had. H1s are not touched.
 *
 * The focus keyword is the sheet's primary keyword for the page. It is
 * published as <meta name="keywords"> and kept here so the team has one list;
 * search engines give that tag little or no weight.
 *
 * MAPPING NOTES
 *   - "Light Bulb & Ballast Recycling" is one row for two pages. It is applied
 *     to /light-bulbs/; /ballasts/ keeps its own title rather than sharing a
 *     duplicate one.
 *   - Not applied, because the page does not exist on this site: #10 Mobile
 *     Shredding, #25 Davenport Recycling Hub, #33 Get a Quote (the contact
 *     page is the quote page and carries #42), #34 Schedule a Pickup, #35
 *     Drop-Off Locator (the locations page carries #22), #40 Leadership Team,
 *     #41 Careers. Add a row here the day each page ships.
 *
 * CORRECTED, where the sheet contradicts facts Asim confirmed on 23 Sep 2026
 * (R2v3 in Minnesota, NAID AAA in Wisconsin, RIOS; two facilities, Blaine MN
 * and New Berlin WI):
 *   - #22 named a Davenport facility, which does not exist: dropped.
 *   - #23 named "Blaine and Minneapolis, MN facilities … R2v3 & NAID AAA":
 *     one Minnesota facility, Blaine, which holds R2v3.
 *   - #37 and #38 claimed e-Stewards, which the company does not hold:
 *     RIOS in its place.
 * Every title is 60 characters or fewer and every description 160 or fewer,
 * the sheet's own limits.
 */
export type PageSeo = {
  title: string
  description: string
  focusKeyword: string
}

export const PAGE_SEO: Record<string, PageSeo> = {
  // #1 Homepage
  "/": {
    title: "Certified Electronics & IT Recycling | Recycle Technologies",
    description: "R2v3 & NAID AAA certified e-waste, ITAD, and data destruction serving MN, WI & beyond since 1993. Get a free quote today.",
    focusKeyword: "certified electronics recycling",
  },
  // #2 Services Mega Page
  "/services/": {
    title: "Recycling & Data Destruction Services | Recycle Tech",
    description: "Explore certified electronics recycling, shredding, ITAD & data destruction services built for compliance and security.",
    focusKeyword: "recycling services",
  },
  // #3 Electronic Recycling
  "/electronic-recycle/": {
    title: "Electronics Recycling Services | Recycle Technologies",
    description: "R2v3-certified electronics recycling for businesses. Secure, compliant e-waste disposal with full chain-of-custody documentation.",
    focusKeyword: "electronics recycling services",
  },
  // #4 Battery Recycling
  "/battery-recycling/": {
    title: "Battery Recycling Services | Recycle Technologies",
    description: "Safe, compliant battery recycling for lithium-ion, alkaline & industrial batteries. EPA-compliant handling and documented disposal.",
    focusKeyword: "battery recycling services",
  },
  // #5 Light Bulb & Ballast Recycling
  "/light-bulbs/": {
    title: "Light Bulb & Ballast Recycling | Recycle Technologies",
    description: "Compliant recycling of fluorescent bulbs, LEDs & ballasts. Mercury-safe handling that meets EPA and state regulations.",
    focusKeyword: "light bulb and ballast recycling",
  },
  // #6 TV Recycling
  "/tv-recycling/": {
    title: "TV & CRT Recycling Services | Recycle Technologies",
    description: "Certified TV and CRT recycling with safe handling of leaded glass and hazardous materials. Compliant disposal for businesses.",
    focusKeyword: "TV recycling services",
  },
  // #7 Airbag Recycling
  "/airbag-recycling/": {
    title: "Airbag Recycling Services | Recycle Technologies",
    description: "Certified airbag recycling for auto shops and fleets. Safe deployment, compliant disposal, and documented chain of custody.",
    focusKeyword: "airbag recycling services",
  },
  // #8 Paper Shredding
  "/paper-shredding-services/": {
    title: "Paper Shredding Services | Recycle Technologies",
    description: "Secure on-site and off-site paper shredding for businesses. NAID AAA certified destruction with certificates of destruction.",
    focusKeyword: "paper shredding services",
  },
  // #9 Hard Drive Destruction
  "/hard-drive-destruction-services/": {
    title: "Hard Drive Destruction Services | Recycle Technologies",
    description: "NAID AAA certified hard drive destruction with physical shredding and documented chain of custody for total data security.",
    focusKeyword: "hard drive destruction services",
  },
  // #11 Off-Site Shredding
  "/off-site-shredding/": {
    title: "Off-Site Shredding Services | Recycle Technologies",
    description: "Secure off-site document shredding with locked collection, certified transport, and full chain-of-custody tracking.",
    focusKeyword: "off-site shredding services",
  },
  // #12 IT Asset Disposition (ITAD)
  "/it-asset-disposition/": {
    title: "IT Asset Disposition (ITAD) Services | Recycle Tech",
    description: "Secure ITAD services including data destruction, asset remarketing, and R2v3-certified recycling for enterprise IT equipment.",
    focusKeyword: "IT asset disposition services",
  },
  // #13 Mail-In Recycling Program
  "/mail-in-recycling/": {
    title: "Mail-In Recycling Program | Recycle Technologies",
    description: "Order a kit, pack your e-waste, ship it in, and get a certificate of recycling with our easy nationwide mail-in program.",
    focusKeyword: "mail-in recycling program",
  },
  // #14 Industries Mega Page
  "/industries/": {
    title: "Industries We Serve | Recycle Technologies",
    description: "Recycling & ITAD solutions tailored to healthcare, finance, education, government, manufacturing, retail and more.",
    focusKeyword: "industries we serve",
  },
  // #15 Healthcare
  "/industries/healthcare/": {
    title: "Healthcare Recycling & ITAD Services | Recycle Tech",
    description: "HIPAA-aligned data destruction and e-waste recycling for hospitals, clinics, and healthcare providers. Compliant and secure.",
    focusKeyword: "healthcare data destruction",
  },
  // #16 Financial Services & Banking
  "/industries/financial-services-banking/": {
    title: "Recycling for Financial Services | Recycle Technologies",
    description: "Audit-trail-backed data destruction and ITAD services built for banks and financial institutions' compliance needs.",
    focusKeyword: "financial services data destruction",
  },
  // #17 Education (K-12 & Higher Ed)
  "/industries/education/": {
    title: "Recycling Solutions for Schools | Recycle Technologies",
    description: "Secure e-waste recycling and student data destruction for K-12 and higher education institutions. Device refresh support.",
    focusKeyword: "school district recycling services",
  },
  // #18 Government & Municipal
  "/industries/government-municipal/": {
    title: "Government & Municipal Recycling | Recycle Technologies",
    description: "Compliant e-waste recycling and data destruction for government agencies, meeting public records and sustainability mandates.",
    focusKeyword: "government recycling services",
  },
  // #19 Automotive & Fleet
  "/industries/automotive-fleet/": {
    title: "Automotive & Fleet Recycling Services | Recycle Tech",
    description: "Airbag and parts-compliant recycling solutions for auto shops and fleet operators. Certified, documented, and reliable.",
    focusKeyword: "automotive fleet recycling",
  },
  // #20 Manufacturing & Industrial
  "/industries/manufacturing-industrial/": {
    title: "Manufacturing & Industrial Recycling | Recycle Tech",
    description: "Bulk material stream recycling solutions for manufacturers, built for scale, compliance, and sustainability goals.",
    focusKeyword: "industrial recycling services",
  },
  // #21 Retail & Corporate Offices
  "/industries/retail-corporate-offices/": {
    title: "Retail & Office Recycling Services | Recycle Tech",
    description: "Multi-location pickup and recycling programs for retail chains and corporate offices, simplified across every site.",
    focusKeyword: "corporate office recycling services",
  },
  // #22 Locations Main Page — corrected, see the note above
  "/all-locations/": {
    title: "Recycling Locations | Recycle Technologies",
    description: "Find Recycle Technologies facilities in Minnesota and Wisconsin, plus nationwide mail-in recycling coverage.",
    focusKeyword: "recycling locations near me",
  },
  // #23 Minnesota Recycling Hub — corrected, see the note above
  "/minnesota-recycling/": {
    title: "Minnesota Recycling Facility | Recycle Technologies",
    description: "Certified electronics recycling and ITAD services from our R2v3-certified Blaine, MN facility, serving businesses across Minnesota.",
    focusKeyword: "Minnesota recycling facility",
  },
  // #24 Wisconsin Recycling Hub
  "/wisconsin-recycling/": {
    title: "Wisconsin Recycling Facility | Recycle Technologies",
    description: "Certified e-waste recycling and data destruction from our New Berlin, WI facility, serving businesses across Wisconsin.",
    focusKeyword: "Wisconsin recycling facility",
  },
  // #26 Resource Center Hub
  "/resources/": {
    title: "Recycling Resource Center | Recycle Technologies",
    description: "Guides, compliance tools, case studies, and FAQs to help you navigate electronics recycling and data destruction.",
    focusKeyword: "recycling resource center",
  },
  // #27 Blog
  "/blog/": {
    title: "Recycling & ITAD Blog | Recycle Technologies",
    description: "Insights on e-waste recycling, data destruction, compliance, and sustainability from the Recycle Technologies team.",
    focusKeyword: "recycling blog",
  },
  // #28 ITAD & Recycling Guides
  "/itad-recycling-guides/": {
    title: "ITAD & Recycling Guides | Recycle Technologies",
    description: "Practical guides on IT asset disposition, e-waste recycling, and compliant data destruction for businesses of any size.",
    focusKeyword: "ITAD guides",
  },
  // #29 Compliance Center
  "/compliance-center/": {
    title: "Recycling Compliance Center | Recycle Technologies",
    description: "EPA and state regulations, downstream vendor transparency, and chain-of-custody resources for compliant e-waste recycling.",
    focusKeyword: "recycling compliance resources",
  },
  // #30 Case Studies
  "/case-studies/": {
    title: "Recycling Case Studies | Recycle Technologies",
    description: "Real results from healthcare, education, government, and corporate clients who partnered with Recycle Technologies.",
    focusKeyword: "recycling case studies",
  },
  // #31 FAQs
  "/faqs/": {
    title: "Recycling FAQs | Recycle Technologies",
    description: "Answers to common questions on services, pricing, compliance, data destruction, and locations at Recycle Technologies.",
    focusKeyword: "recycling FAQs",
  },
  // #32 Downloads
  "/downloads/": {
    title: "Downloads & Resources | Recycle Technologies",
    description: "Download compliance checklists, shipping labels, packaging guides, and sample certificates of recycling and destruction.",
    focusKeyword: "recycling downloads",
  },
  // #36 About Us
  "/about-us-commercial-recycling-solutions/": {
    title: "About Recycle Technologies | Since 1993",
    description: "Minority-owned and operating since 1993, Recycle Technologies delivers certified, sustainable e-waste and ITAD solutions.",
    focusKeyword: "about Recycle Technologies",
  },
  // #37 Why Choose Us — corrected, see the note above
  "/why-choose-us/": {
    title: "Why Choose Recycle Technologies",
    description: "R2v3, NAID AAA & RIOS certified. See why businesses trust Recycle Technologies for secure, compliant recycling.",
    focusKeyword: "why choose Recycle Technologies",
  },
  // #38 Certifications — corrected, see the note above
  "/certifications/": {
    title: "Recycling Certifications | Recycle Technologies",
    description: "R2v3, NAID AAA, and RIOS certified. Learn how our credentials ensure secure, compliant, and sustainable recycling.",
    focusKeyword: "R2v3 NAID AAA certified recycler",
  },
  // #39 Sustainability & Environmental Impact
  "/sustainability/": {
    title: "Sustainability & Environmental Impact | Recycle Tech",
    description: "See our zero-landfill commitment, circular economy initiatives, and measurable environmental impact reporting.",
    focusKeyword: "sustainable e-waste recycling",
  },
  // #42 Contact Page
  "/contact-us/": {
    title: "Contact Recycle Technologies",
    description: "Get in touch with Recycle Technologies for quotes, pickups, or questions. MN and WI facility contacts and support.",
    focusKeyword: "contact Recycle Technologies",
  },
}
