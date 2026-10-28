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

/** The 23 Sep sheet, as applied then. Kept for the record; RESTORED below wins. */
const SHEET_SEO: Record<string, PageSeo> = {
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
    title: 'Mail-In Recycling Kits: Electronics, Bulbs & Batteries',
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
    description: "A Certified Minority Business Enterprise (MBE) operating since 1993, Recycle Technologies delivers certified, sustainable e-waste and ITAD solutions.",
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

/**
 * BACK TO THE WORDPRESS TITLES AND DESCRIPTIONS — 29 Sep 2026.
 *
 * Asim, 29 Sep 2026, from RTI-Backup-vs-Live-Audit.xlsx, tab "Title and H1
 * changes": the 20 pages below go back to the title and meta description they
 * had on WordPress (column "Old title (WordPress)" and "Old meta
 * description"), word for word, typos included ("Recyling", "inquires"),
 * because they were ranking with them. Their H1s went back the same day (see
 * each page's hero). The sheet's focus keyword stays as the keywords tag.
 *
 * /recycle-symbol/ is a blog post and /category/news/ a category archive: an
 * entry here beats what the post or category holds in the database, so their
 * titles can no longer be changed from Admin until the entry is removed.
 */
const RESTORED: Record<string, { title: string; description: string }> = {
  "/": {
    title: 'Recycle Technologies: Electronics Recycling, ITAD & Shredding',
    description: "Full-service recycling facility for businesses handling e-waste, electronics, metals, bulbs, batteries, data destruction and logistics. Call (800) 969-5166.",
  },
  "/wisconsin-recycling/": {
    title: 'Electronics Recycling in Wisconsin | Recycle Technologies',
    description: "Recycling Wisconsin for electronics, computers, lamps, batteries, televisions, and devices, accepted through documented intake and processing procedures. Call (800) 969-5166.",
  },
  // M-02, 12 Oct 2026 ("RTI State & Country Pages Content Corrections").
  "/minnesota-recycling/": {
    title: 'MN Electronics Recycling & Shredding | Recycle Technologies',
    description: "Recycling center in Minnesota handling electronics, batteries, lamps, paper, and secure material processing for businesses and facilities. Call (800) 969-5166.",
  },
  "/it-asset-disposition/": {
    title: 'IT Asset Disposition (ITAD) Services | Recycle Technologies',
    description: "IT asset disposition for retired laptops, servers, storage hardware, networking equipment, and office technology. Call (800) 969-5166 to arrange service.",
  },
  "/all-locations/": {
    title: 'Recycling Drop-Off Locations Near You | Recycle Technologies',
    description: "Explore electronics recycling facility in USA. Drop-off your E-waste: old TVs, printers, computer, phones, monitors, small appliances, and more at one platform in your area.",
  },
  "/hard-drive-destruction-services/": {
    title: 'Hard Drive Destruction Services | Certified Data Destruction',
    description: "Commercial hard drive destruction for businesses, offices & organizations. Securely destroy HDDs, SSDs and data storage devices with verified service.",
  },
  "/airbag-recycling/": {
    title: 'Airbag Disposal: Deployed & Undeployed Recycling',
    description: "Commercial airbag recycling for auto shops, dealerships & facilities. Recycle deployed and undeployed vehicle airbags with a reliable recycling service.",
  },
  "/battery-recycling/": {
    title: 'Battery Recycling Near Me: Lithium, Lead Acid & More',
    description: "Commercial battery recycling for businesses, offices & facilities. Recycle non-hazardous batteries from electronics and devices with reliable service.",
  },
  "/recycle-symbol/": {
    title: "Recycling Symbols Explained - Recycle Technologies",
    description: "This guide will break down the most common recycling symbols, which will help you understand it much better and what you are supposed to do with each symbol.",
  },
  "/tv-recycling/": {
    title: 'TV Recycling Near Me: CRT, LCD, LED & Plasma Disposal',
    description: "Commercial TV recycling for businesses, offices, and facilities. Recycle LCD, LED, plasma & flat-screen TVs. Call (800) 969-5166.",
  },
  "/light-bulbs/": {
    title: 'Fluorescent Tube & Light Bulb Recycling for Business',
    description: "Commercial light bulb recycling for businesses, facilities, and organizations. Recycle fluorescent, CFL, LED & other lamps. Call (800) 969-5166.",
  },
  "/contact-us/": {
    title: "Contact Us for inquires about E-Waste | Recycle Technologies",
    description: "Contact Us- for Recycle Technologies' safe recycling and shredding services in MN & WI. A reliable and eco-friendly waste management solutions.",
  },
  "/paper-shredding-services/": {
    title: 'Paper Shredding Services for MN & WI Businesses',
    description: "Commercial paper shredding covering files, records, reports, and office paperwork using controlled destruction to reduce exposure risks. Call (800) 969-5166",
  },
  "/electronic-recycle/": {
    title: 'Electronics Recycling Near Me: Drop-Off & Mail-In',
    description: "Commercial electronics recycling for businesses, offices & facilities. Recycle computers, servers, monitors & more with reliable e-waste pickup.",
  },
  "/services/": {
    title: "Recycling Services | Call (800) 969-5166",
    description: "Recycling services for electronics, batteries, light bulbs, paper, shredding, and more. Call (800) 969-5166 for recycling services today.",
  },
  "/about-us-commercial-recycling-solutions/": {
    title: 'Commercial Recycling Solutions',
    description: "Recycle Technologies Offering full-service commercial recycling as a recycling solution for e-waste, batteries, and lightbulbs in Minnesota and Wisconsin.",
  },
  "/category/news/": {
    title: "Recyling & E-waste latest news in USA | Recycle Technologies",
    description: "Explore the ever-evolving landscape of US Recycling & E-waste through Recycle Technologies – delivering the latest updates for a sustainable tomorrow.",
  },
  "/blog/": {
    title: 'Recyling & E-waste recycling trends Blog',
    description: "Stay updated with our blog on recycling and E-waste trends. From emerging technologies to consumer behaviors, gain valuable insights into the evolving world.",
  },
  // At /on-site-off-site-shredding/ 30 Sep to 1 Oct 2026, back on /off-site-shredding/ since (see src/data/off-site-shredding.ts).
  "/off-site-shredding/": {
    title: 'Off-Site Shredding Services | Secure Document Destruction',
    description: "On-site and off-site shredding for confidential paperwork, shredded at your location or collected and securely destroyed at our certified facilities. Call (800) 969-5166",
  },
  // 9 Oct 2026, SEO sheet "Technical Fixes" (Title Fixes): "Too short".
  "/faqs/": {
    title: "Recycling FAQs: Drop-Off, Pickup & Pricing",
    description: "Explore FAQs about recycling technologies. Discover why recycling is crucial, what items are considered electronics, and how recycling can make a difference.",
  },
}


/**
 * 14 Oct 2026, the SEO team's "recycle_technologies_content_action_plan_finale"
 * sheet, tabs 01 Title Missing, 03 Meta Missing, 05 Title Over 60, 06 Meta
 * Over 155 and 10 Title Same as H1: the new title (column "Suggested Change"
 * of 05, "New Title" of 10, "Title 1" of 01) and the new description
 * ("Shortened Meta Description" of 06, "Meta Description 1" of 03), word for
 * word, for the pages built in code. Blog posts are in the database; their
 * rows are in db/016. Wins over SHEET_SEO and RESTORED; a field left out keeps
 * what the page had. The trailing comment is the sheet tab(s).
 */
const CONTENT_PLAN_14_OCT: Record<string, { title?: string; description?: string }> = {
  "/minnesota-recycling/ramsey/": { title: "Electronics Recycling Ramsey MN | Drop-Off & Pickup", description: "Need electronics recycling in Ramsey, MN? Drop off or mail in your old devices, batteries and bulbs. Business pickup within 100 miles. Call for a free quote." }, // 01,03
  "/": { title: "E-Waste Recycling, ITAD & Shredding | Recycle Technologies", description: "Full-service recycling facility for businesses handling e-waste, electronics, metals, bulbs, batteries, data destruction and logistics." }, // 05,06
  "/minnesota-recycling/hennepin-county-recycling-center/": { title: "Hennepin County Recycling: Electronics, Batteries & Bulbs", description: "Recycling center Hennepin County receiving electronics, computers, lamps, batteries, and devices, managed through documented intake and processing steps." }, // 05,06
  "/minnesota-recycling/off-site-shredding/": { title: "Off-Site Shredding in Blaine, MN | Recycle Technologies" }, // 05
  "/wisconsin-recycling/off-site-shredding/": { title: "Off-Site Shredding in New Berlin, WI | Recycle Technologies" }, // 05
  "/minnesota-recycling/light-bulb-recycling/": { title: "Light Bulb Recycling in Blaine, MN | Recycle Technologies", description: "Drop off, schedule a commercial pickup or mail in fluorescent tubes, CFLs, HID and other lamps at our Blaine, Minnesota facility. Processed in-house, not" }, // 05,06
  "/minnesota-recycling/paper-shredding/": { title: "Paper Shredding in Blaine, MN | Recycle Technologies" }, // 05
  "/wisconsin-recycling/phone-shredding/": { title: "Phone Shredding in New Berlin, WI | Recycle Technologies" }, // 05
  "/wisconsin-recycling/paper-shredding/": { title: "Paper Shredding in New Berlin, WI | Recycle Technologies" }, // 05
  "/minnesota-recycling/phone-shredding/": { title: "Phone Shredding in Blaine, MN | Recycle Technologies" }, // 05
  "/wisconsin-recycling/electronic-recycling/": { title: "E-Waste Recycling in New Berlin, WI | Recycle Technologies", description: "Drop off, business pickup or mail in computers, monitors, printers, phones and other e-waste at our New Berlin, Wisconsin facility. Dismantled" }, // 05,06
  "/minnesota-recycling/hard-drive-destruction/": { title: "Hard Drive Destruction in Blaine, MN | Recycle Technologies" }, // 05
  "/minnesota-recycling/electronic-recycling/": { title: "E-Waste Recycling in Blaine, MN | Recycle Technologies", description: "Drop off, business pickup or mail in computers, monitors, printers, phones and other e-waste at our R2v3 certified Blaine, Minnesota facility. Dismantled" }, // 05,06
  "/wisconsin-recycling/light-bulb-recycling/": { title: "Bulb Recycling in New Berlin, WI | Recycle Technologies", description: "Drop off, schedule a commercial pickup or mail in fluorescent tubes, CFLs, HID and other lamps at our New Berlin, Wisconsin facility. Processed in-house" }, // 05,06
  "/phone-shredding-chicago/": { title: "Phone Shredding in Chicago, IL | Recycle Technologies" }, // 05
  "/paper-shredding-chicago/": { title: "Paper Shredding in Chicago, IL | Recycle Technologies" }, // 05
  "/light-bulb-recycling-chicago/": { title: "Light Bulb Recycling in Chicago, IL | Recycle Technologies", description: "Commercial light bulb and lamp recycling for Chicago businesses by scheduled pickup, with mail-in kits for residents. Fluorescent, CFL, HID and more" }, // 05,06
  "/ballast-recycling-chicago/": { title: "Ballast Recycling in Chicago, IL | Recycle Technologies" }, // 05
  "/hard-drive-destruction-chicago/": { title: "Hard Drive Destruction in Chicago, IL | Recycle Technologies" }, // 05
  "/off-site-shredding-chicago/": { title: "Off-Site Shredding in Chicago, IL | Recycle Technologies" }, // 05
  "/tv-recycling-chicago/": { title: "TV Recycling in Chicago, IL | Recycle Technologies" }, // 05
  "/battery-recycling-chicago/": { title: "Battery Recycling in Chicago, IL | Recycle Technologies", description: "Commercial battery recycling for Chicago businesses by scheduled pickup, with a mail-in program for residents. Processed at our R2v3 certified Midwest" }, // 05,06
  "/tv-recycling-in-wisconsin/": { description: "TV recycling Wisconsin for smart televisions, LCD panels, plasma screens, CRT units, and display equipment, accepted through verified intake" }, // 06
  "/minnesota-recycling/ramsey/blaine/": { description: "Recycling Services in Blaine offering collection for electronic items, battery units, lighting remnants, paper materials, and managed processing support." }, // 06
  "/recycling-kits-in-florida/": { description: "Recycling kits Florida for desktops, network hubs, rechargeable packs, tube lamps, and power modules, supplied with containers and handling steps." }, // 06
  "/shredding-minnesota/duluth/": { description: "Duluth shredding service for secure disposal of business paperwork, archived files, and sensitive documents with scheduled pickup options." }, // 06
  "/ocala-florida/": { description: "Recycling services Ocala coordinating receipt of electronics, lamp debris, mixed battery groups, paper volumes, and approved items for proper routing." }, // 06
  "/minnesota-recycling/scott-county/": { description: "Recycling services Scott County arranging intake for electronics, lighting scrap, assorted battery formats, paper loads, and approved materials." }, // 06
  "/minnesota-recycling/dakota-county/lakeville-recycling-center/": { description: "Recycling center in Lakeville supporting collection of electronic hardware, spent batteries, lighting materials, paper output, and controlled processing." }, // 06
  "/wisconsin-recycling/": { description: "Recycling Wisconsin for electronics, computers, lamps, batteries, televisions, and devices, accepted through documented intake and processing procedures." }, // 06
  "/shredding-wisconsin/green-bay/": { description: "Secure shredding services in Green Bay & its surroundings at Recycle Technologies. AAA NAID-certified paper shredding ensures ultimate data protection" }, // 06
  "/fort-worth-texas/": { description: "Recycling services Texas coordinating collection of electronic hardware, spent lighting, varied battery formats, paper volumes, and approved discards" }, // 06
  "/wisconsin-recycling/battery-recycling-waukesha/": { description: "Battery recycling Waukesha for lithium primary cells, nickel cadmium packs, silver oxide batteries, and sealed power units, handled through approved" }, // 06
  "/wisconsin-recycling/battery-recycling-appleton/": { description: "Battery recycling Appleton for alkaline cells, zinc air batteries, lithium coin cells, and sealed backup units, received and processed under approved" }, // 06
  "/wisconsin-recycling/fluorescent-bulb-recycle-madison/": { description: "Bulb recycling Madison WI collecting spent CFLs, linear lamps, specialty lighting, and commercial bulb waste from offices and facilities." }, // 06
  "/minnesota-recycling/hennepin-county-recycling-center/brooklyn-park-recycling-center/": { description: "Recycling center Brooklyn Park accepts electronics, lamps, batteries, TVs and paper shredding; certified processing with data destruction." }, // 06
  "/wisconsin-recycling/computer-recycling-madison/": { description: "Eco-friendly computer recycling Madison Wisconsin for laptops, all-in-ones, thin clients, storage arrays, and peripherals, received and processed under" }, // 06
  "/minnesota-recycling/electronic-recycling-in-woodbury/": { description: "Electronic recycling Woodbury for computers, servers, tablets, cabling, and components, received through documented intake and approved processing methods." }, // 06
  "/minnesota-recycling/battery-recycling-in-minneapolis/": { description: "Battery recycling Minneapolis for lithium iron phosphate packs, zinc chloride cells, silver zinc units, and sealed energy modules, received through" }, // 06
  "/wisconsin-recycling/green-bay-recycling/": { description: "Recycling center Green Bay accepting electronics, lamps, batteries, computers, and devices, managed through verified intake and processing procedures." }, // 06
  "/minnesota-recycling/battery-recycling-st-paul/": { description: "Battery recycling in St. Paul for power tool batteries, medical batteries, backup batteries, and small energy units. Call (800) 969-5166 to schedule" }, // 06
  "/minnesota-recycling/": { description: "Recycling center in Minnesota handling electronics, batteries, lamps, paper, and secure material processing for businesses and facilities." }, // 06
  "/wisconsin-recycling/calumet-county/appleton-recycling/": { description: "Resource recycling Appleton WI accepting electronics, spent lighting, varied battery types, paper loads, and approved discards through scheduled drop-off." }, // 06
  "/minnesota-recycling/hennepin-county-recycling-center/plymouth-recycling-center/": { description: "Recycling center in Plymouth providing intake for electronic hardware, battery packs, lighting components, paper streams, and regulated material flow." }, // 06
  "/wisconsin-recycling/waukesha-electronic-recycling/": { description: "Sustainable electronic recycling Waukesha Wisconsin for servers, desktops, tablets, network gear, and components, managed through verified intake" }, // 06
  "/electronics-recycling-kit/": { description: "Recycle electronics from anywhere with Recycle Technologies’ mail-in Electronics Recycling Kit. No local drop-off needed; open to individuals" }, // 06
  "/phone-shredding-service/": { description: "Phone shredding services providing physical destruction of mobile devices, SIM cards, memory chips, and handheld electronics to prevent data exposure." }, // 06
  "/faqs/": { description: "Explore FAQs about recycling technologies. Discover why recycling is crucial, what items are considered electronics, and how recycling can make" }, // 06
  "/wisconsin-recycling/bulb-recycle-milwaukee/": { description: "Bulb recycling Milwaukee for linear fluorescents, CFLs, metal halide lamps, induction lights, and pin-based bulbs, accepted through approved handling" }, // 06
  "/wisconsin-recycling/tv-recycling-waukesha/": { description: "TV recycling Waukesha for flat-panel sets, smart displays, projection units, gaming screens, and television hardware, received through controlled intake" }, // 06
  "/shredding-minnesota/rochester/": { description: "Shredding service Rochester for files, folders, binders, and archived paperwork, destroyed through scheduled processing with documented completion." }, // 06
  "/wisconsin-recycling/milwaukee/": { description: "Recycling center Milwaukee coordinating drop-off and collection for electronics, lighting units, assorted batteries, paper stock, and approved items." }, // 06
  "/wisconsin-recycling/tv-recycling-green-bay/": { description: "TV recycling Green Bay Wisconsin for LED panels, smart televisions, plasma units, CRT sets, and display screens, accepted through verified intake" }, // 06
  "/wisconsin-recycling/battery-recycling-green-bay/": { description: "Battery recycling Green Bay drop-off and collection for power packs, backup cells, sealed units, and mixed chemistries from local users." }, // 06
  "/wisconsin-recycling/racine/": { description: "Recycling center Racine County coordinating acceptance of electronics, lamp waste, varied battery categories, paper materials, and approved discard" }, // 06
  "/minnesota-recycling/hennepin-county-recycling-center/minnetonka-recycling-center/": { description: "Recycling center Minnetonka receiving phones, routers, circuit boards, ink cartridges, and small devices, accepted through controlled intake" }, // 06
  "/wisconsin-recycling/madison/": { description: "Recycling center Madison managing electronics intake, lighting waste, battery assortments, paper volumes, and approved material streams." }, // 06
  "/all-locations/": { description: "Explore electronics recycling facility in USA. Drop-off your E-waste: old TVs, printers, computer, phones, monitors, small appliances, and more at one" }, // 06
  "/minnesota-recycling/east-bethel/": { description: "Recycling East Bethel for consoles, modems, power cords, ink units, and small electronics, received through verified intake and processing steps." }, // 06
  "/tv-recycling-in-minnesota/": { description: "TV recycling in Minnesota homes and facilities trust for disposal of flat screens, broken units, outdated models, and large televisions." }, // 06
  "/minnesota-recycling/electronic-recycling-duluth/": { description: "Sustainable electronic recycling Duluth Minnesota for POS terminals, barcode scanners, AV gear, and tablets, managed through verified intake steps." }, // 06
  "/wisconsin-recycling/sheboygan/": { description: "Recycling services Sheboygan facilitating collection of electronics, lighting remnants, battery varieties, paper batches, and approved materials." }, // 06
  "/minnesota-recycling/dakota-county/burnsville-recycling-center/": { description: "Recycling center in Burnsville accepting electronic equipment, spent power cells, lighting waste, paper materials, and managed material intake." }, // 06
  "/recycling-kits-in-ohio/": { description: "Recycling kits Ohio for control boards, handheld scanners, lithium polymer cells, T12 lamps, and power assemblies, supplied with containers and packing" }, // 06
  "/paper-shredding-services/": { description: "Commercial paper shredding covering files, records, reports, and office paperwork using controlled destruction to reduce exposure risks." }, // 06
  "/minnesota-recycling/benton-county-recycling/": { description: "Recycling center in Benton County supporting electronic equipment, spent batteries, lighting waste, paper streams, and secure material handling." }, // 06
  "/ontario-california/": { description: "Recycle lamps, ballasts, batteries and electronics at Recycle Technologies in Ontario, California. Drop off at 805 E Francis St or schedule a business" }, // 06
  "/shredding-wisconsin/waukesha/": { description: "Shredding service Waukesha for documents, invoices, manuals, and confidential papers, destroyed through controlled procedures with recorded completion." }, // 06
  "/minnesota-recycling/benton-county-recycling/st-cloud-recycling-center/": { description: "Recycling center St Cloud offering electronics intake, device clearing, lamp handling, battery acceptance, and secure shredding services." }, // 06
  "/johnson-city-buffalo-tennessee/": { description: "Recycling services Johnson City Buffalo supporting intake of electronic equipment, lighting waste, battery varieties, paper materials, and approved items." }, // 06
  "/privacy-policy/": { description: "Read Recycle Technologies' Privacy Policy to understand how we collect, use, and protect your personal information. Stay informed with our updated" }, // 06
  "/minnesota-recycling/dakota-county/": { description: "Recycling center in Dakota County providing intake for e-waste, lighting waste, used batteries, paper streams, and controlled material processing." }, // 06
  "/wisconsin-recycling/battery-recycling-madison/": { description: "Battery recycling Madison for household and commercial batteries, including alkaline, lithium, nickel-based, and button cells, accepted for proper" }, // 06
  "/phoenix-arizona/": { description: "Recycling services Arizona coordinating collection of electronics, lighting waste, battery types, paper materials, and approved items statewide." }, // 06
  "/wisconsin-recycling/battery-recycling-milwaukee/": { description: "Non-hazardous battery recycling Milwaukee for dry cells, sealed units, backup packs, and consumer batteries accepted through organized recovery." }, // 06
  "/minnesota-recycling/hennepin-county-recycling-center/maple-grove-recycling-center/": { description: "Recycling center in Maple Grove receiving electronic equipment, spent batteries, lighting waste, paper materials, and organized material intake." }, // 06
  "/quote/": { description: "Request a quote for personalized Recycling, E-waste and Shredding services with Recycle Technologies. Eco-friendly solutions tailored to your recycling" }, // 06
  "/wisconsin-recycling/appleton-electronic-recycling-center/": { description: "Electronic recycling Appleton for desktops, laptops, network switches, circuit cards, and peripherals, received through documented intake and approved" }, // 06
  "/wisconsin-recycling/washington-county-recycling-center/": { description: "Recycling center Washington County WI accepting circuit boards, cables, lamps, dry cell batteries, and small equipment, managed through approved intake" }, // 06
  "/kennesaw-georgia/": { description: "Recycling services Kennesaw coordinating acceptance of electronics, lamp remnants, battery assortments, paper loads, and approved materials for processing." }, // 06
  "/minnesota-recycling/olmsted-county/": { description: "Recycling center Olmsted County handling electronics, batteries, lamps, devices, and records through approved acceptance and processing methods." }, // 06
  "/minnesota-recycling/bulb-recycle-minneapolis/": { description: "Bulb recycling Minneapolis Minnesota for fluorescent tubes, CFLs, LEDs, and HID lamps, received, packed, and routed through approved handling steps." }, // 06
  "/cookies-and-personal-information/": { description: "Discover how Recycle Technologies handles COOKIES and personal information, ensuring your data's safety and compliance with state regulations. Learn more" }, // 06
  "/minnesota-recycling/washington-county/": { description: "Recycling center in Washington County MN accepting electronics, batteries, lighting, paper, and approved materials from homes and facilities." }, // 06
  "/greenwood-indiana/": { description: "Recycling services Greenwood organizing drop-off and pickup for electronics, lighting debris, battery groups, paper materials, and approved waste streams." }, // 06
  "/request-a-pickup/": { description: "Request a pickup for recycling your electronic waste. Recycle Technologies offers efficient pickup services. Request a pickup now for a cleaner" }, // 06
  "/minnesota-recycling/hennepin-county-recycling-center/bloomington-recycling-center/": { description: "Recycling center in Bloomington supporting intake of electronic assets, battery units, lighting materials, paper flow, and material processing. (800)" }, // 06
  "/wisconsin-recycling/milwaukee/oak-creek/": { description: "Recycling center Oak Creek handling printers, switches, power adapters, lamps, and mixed electronics, accepted through documented intake and processing" }, // 06
  "/blog/": { description: "Stay updated with our blog on recycling and E-waste trends. From emerging technologies to consumer behaviors, gain valuable insights into the evolving" }, // 06
  "/wisconsin-recycling/tv-recycling-appleton/": { description: "TV recycling Appleton WI for LCD screens, OLED units, plasma panels, rear-projection sets, and flat displays, received through documented intake steps." }, // 06
  "/wisconsin-recycling/battery-recycling/": { description: "Drop off, business pickup or mail in spent batteries at our New Berlin, Wisconsin facility. Alkaline, lithium-ion, lead-acid, NiCd and EV batteries sorted" }, // 06
  "/minnesota-recycling/battery-recycling/": { description: "Drop off, business pickup or mail in spent batteries at our R2v3 certified Blaine, Minnesota facility. Alkaline, lithium-ion, lead-acid, NiCd and EV" }, // 06
  "/recycle-symbol/": { description: "This guide will break down the most common recycling symbols, which will help you understand it much better and what you are supposed to do with each" }, // 06
}

/** Per URL, the newest sheet's words for each field (any field may be absent). */
export const PAGE_SEO: Record<string, Partial<PageSeo>> = Object.fromEntries(
  [...new Set([...Object.keys(SHEET_SEO), ...Object.keys(RESTORED), ...Object.keys(CONTENT_PLAN_14_OCT)])].map((url) => [
    url,
    { focusKeyword: '', ...SHEET_SEO[url], ...RESTORED[url], ...CONTENT_PLAN_14_OCT[url] },
  ]),
)
