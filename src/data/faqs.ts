import { href } from '@/lib/urls'

/**
 * /faqs/ — the whole FAQ, Figma 6382:6819.
 *
 * !! EVERY QUESTION AND EVERY ANSWER HERE IS ASIM'S, VERBATIM. Supplied
 * 17 Sep 2026 as one document of seventeen groups. Nothing has been reworded,
 * shortened or "improved" — these answers are deliberately careful about what
 * the company does and does not commit to ("can be", "applicable service",
 * "contact us to confirm"), and softening that into marketing copy would be
 * changing a legal position, not a sentence.
 *
 * The one thing written here rather than supplied is each group's one-line
 * `lead`. The frame draws a three-part heading block — eyebrow, heading, lead —
 * and the document has no lead lines, so these are plain descriptions of what
 * the group covers. They make no claims. Flagged in TODO_FOR_CONTENT.
 *
 * The frame draws four groups with names of its own (Services & Pricing,
 * Compliance & Certifications, Data Destruction & Security, Locations &
 * Logistics) and four placeholder questions each. The pattern is the design's;
 * the groups and the questions are the real content, which is seventeen groups
 * and 114 questions.
 */

export type Faq = { q: string; a: string }

export type FaqGroup = {
  /** Anchor id, so a group can be linked to directly from a service page. */
  id: string
  eyebrow: string
  heading: string
  lead: string
  items: Faq[]
}

/** Hero — the same 470px interior hero every other page uses. */
export const FAQ_HERO = {
  crumbs: [
    { label: 'Home', href: href('/') },
    { label: 'FAQs', href: null },
  ],
  h1: 'FAQs',
  lead: 'Recycle Technologies has been providing services to the community since 1993.',
}

export const FAQ_INTRO = {
  heading: 'Frequently Asked Questions',
  lead: 'Find answers to common questions about electronics recycling, e-waste recycling, battery '
    + 'recycling, light bulb recycling, hard drive destruction, shredding, mail-in recycling, '
    + 'pickups, drop-offs, and responsible recycling services.',
}

export const FAQ_SEO = {
  title: 'FAQs | Recycle Technologies',
  /* 158 characters. It was 166 — eight past the point Google truncates —
     which the link check caught. This URL is new, so no rule 6 string is
     involved and it can simply be shortened. */
  description: 'Answers about electronics recycling, e-waste, batteries, light bulbs, hard drive '
    + 'destruction, shredding, mail-in recycling, pickups and drop-offs.',
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: 'getting-started',
    eyebrow: 'GETTING STARTED',
    heading: 'Getting Started',
    lead: 'How to ask for a quote, a pickup or a drop-off.',
    items: [
      {
        q: 'How do I get a recycling quote?',
        a: 'Contact Recycle Technologies with information about the materials you need to recycle, the approximate quantity, your location, and whether you need pickup, drop-off, or another service option.',
      },
      {
        q: 'How do I schedule a recycling pickup?',
        a: 'Contact Recycle Technologies and provide your location, material type, approximate volume, and preferred timing. The team can determine the available pickup options.',
      },
      {
        q: 'What information do I need before contacting Recycle Technologies?',
        a: 'It helps to know what materials you have, approximately how much material needs to be recycled or destroyed, where it is located, and whether you need pickup, drop-off, mail-in recycling, or secure destruction.',
      },
      {
        q: 'What if I don\'t know whether Recycle Technologies accepts my item?',
        a: 'Contact the team before disposing of the item. Provide the name, type, and quantity of the material so the appropriate service can be confirmed.',
      },
      {
        q: 'How do I get started with Recycle Technologies?',
        a: 'Choose the recycling or shredding service you need, review the applicable service area and accepted materials, and contact Recycle Technologies for a quote, pickup, drop-off, or mail-in option.',
      },
    ],
  },
  {
    id: 'general-recycling',
    eyebrow: 'GENERAL RECYCLING QUESTIONS',
    heading: 'General Recycling Questions',
    lead: 'What we accept, and why it matters where it goes.',
    items: [
      {
        q: 'What does Recycle Technologies recycle?',
        a: 'Recycle Technologies provides recycling and secure destruction services for a wide range of materials, including electronics, computers, televisions, batteries, light bulbs, lamps, ballasts, hard drives, mobile phones, paper, and other accepted materials.',
      },
      {
        q: 'Why should I recycle electronics and other electronic waste?',
        a: 'Recycling keeps usable materials out of landfills and allows materials such as metals, plastics, glass, and electronic components to be recovered and reused. Proper recycling also helps businesses manage electronic waste responsibly.',
      },
      {
        q: 'What is electronic waste or e-waste?',
        a: 'Electronic waste, commonly called e-waste, includes discarded electrical and electronic equipment such as computers, monitors, laptops, televisions, printers, phones, networking equipment, and other electronic devices.',
      },
      {
        q: 'Why shouldn\'t I throw electronics in the trash?',
        a: 'Electronics contain materials that should be handled through appropriate recycling and disposal channels. Sending them to a qualified recycler helps recover valuable materials and reduces the risk of improper disposal.',
      },
      {
        q: 'Where can I recycle electronics near me?',
        a: 'Recycle Technologies provides recycling services in Minnesota and Wisconsin, including business pickup and drop-off options. For customers outside our local service areas, our Mail-In Recycling Program provides another way to send eligible materials for recycling.',
      },
      {
        q: 'Does Recycle Technologies offer recycling for businesses?',
        a: 'Yes. Recycle Technologies works with businesses, organizations, facilities, schools, and other customers that need ongoing or one-time recycling and secure destruction services.',
      },
      {
        q: 'Can I recycle electronics from my home?',
        a: 'Yes. Residential customers can use available drop-off services or the Mail-In Recycling Program for eligible materials. Accepted items and service options can vary, so check the specific service before bringing or shipping materials.',
      },
      {
        q: 'Does Recycle Technologies offer recycling pickup?',
        a: 'Yes. Business pickup services are available in the areas we serve. Pickup arrangements depend on the materials, quantity, location, and service required.',
      },
      {
        q: 'Can I drop off electronics for recycling?',
        a: 'Yes. Recycle Technologies has drop-off options at designated locations. Check the current locations and accepted materials before visiting.',
      },
      {
        q: 'Does Recycle Technologies provide recycling certificates?',
        a: 'Recycle Technologies provides certificates of recycling for applicable services. Documentation can help businesses maintain records of responsible recycling and material handling.',
      },
    ],
  },
  {
    id: 'electronics-recycling',
    eyebrow: 'ELECTRONICS RECYCLING',
    heading: 'Electronics Recycling',
    lead: 'What happens to equipment once it reaches us.',
    items: [
      {
        q: 'What is electronics recycling?',
        a: 'Electronics recycling is the process of collecting, sorting, dismantling, and recovering materials from unwanted electronic equipment. Recycle Technologies processes electronics so materials such as metals, plastics, circuit boards, wire, and glass can be properly managed and recovered.',
      },
      {
        q: 'What electronics can I recycle?',
        a: 'Accepted electronics can include computers, laptops, monitors, printers, networking equipment, phones, televisions, and other electronic equipment. Accepted materials can vary, so contact Recycle Technologies if you are unsure about a specific item.',
      },
      {
        q: 'Can I recycle old computers?',
        a: 'Yes. Old computers can be processed through electronics recycling services. Businesses with larger quantities can also arrange recycling pickup where available.',
      },
      {
        q: 'Can I recycle laptops?',
        a: 'Yes. Laptops are accepted through electronics recycling services, subject to the applicable service and material requirements.',
      },
      {
        q: 'Can I recycle computer monitors?',
        a: 'Yes. Computer monitors can be recycled through Recycle Technologies\' electronics recycling services.',
      },
      {
        q: 'Can I recycle printers and office equipment?',
        a: 'Many types of electronic office equipment can be recycled. If you have a large quantity or equipment that is not clearly listed, contact Recycle Technologies before scheduling service.',
      },
      {
        q: 'Can I recycle networking equipment?',
        a: 'Yes. Networking and telecommunications equipment can be included in electronics recycling programs, depending on the specific equipment and applicable service requirements.',
      },
      {
        q: 'What happens to electronics after they are collected?',
        a: 'Electronics are processed so their components and materials can be separated and managed through appropriate recycling channels. Recycle Technologies focuses on responsible material recovery rather than simply sending electronics to a landfill.',
      },
      {
        q: 'Is electronics recycling better than throwing electronics away?',
        a: 'Proper electronics recycling allows materials to be recovered and reduces the amount of electronic waste entering the waste stream. It also provides a responsible way to handle equipment that is no longer wanted or needed.',
      },
      {
        q: 'Do you recycle electronics for businesses?',
        a: 'Yes. Recycle Technologies provides commercial electronics recycling services for businesses and organizations, including pickup and other service options depending on location and volume.',
      },
    ],
  },
  {
    id: 'computer-it-equipment',
    eyebrow: 'COMPUTER & IT EQUIPMENT RECYCLING',
    heading: 'Computer & IT Equipment Recycling',
    lead: 'Retiring computers, servers and office electronics.',
    items: [
      {
        q: 'Where can I recycle old computers?',
        a: 'Old computers can be recycled through Recycle Technologies\' electronics recycling services. Businesses can arrange pickup where available, while eligible customers may also use drop-off or mail-in options.',
      },
      {
        q: 'Where can I recycle old computer equipment?',
        a: 'Recycle Technologies accepts many types of computer and electronic equipment for responsible recycling. Contact us with your equipment list if you have a large quantity or unusual equipment.',
      },
      {
        q: 'Can I recycle servers and IT equipment?',
        a: 'IT equipment can be handled through electronics recycling services. For businesses retiring larger quantities of equipment, Recycle Technologies can help determine the appropriate recycling and destruction service.',
      },
      {
        q: 'What should I do with old office electronics?',
        a: 'Old office electronics should be kept out of the regular trash and sent through an appropriate electronics recycling program. Recycle Technologies provides commercial recycling solutions for businesses and organizations.',
      },
      {
        q: 'Can you recycle electronic equipment from an office or facility?',
        a: 'Yes. Recycle Technologies works with businesses and facilities that need to recycle electronics and other materials. Pickup, drop-off, and other options depend on the location and quantity.',
      },
    ],
  },
  {
    id: 'hard-drive-destruction',
    eyebrow: 'HARD DRIVE & DATA DESTRUCTION',
    heading: 'Hard Drive & Data Destruction',
    lead: 'Why deleting is not destroying, and what we do instead.',
    items: [
      {
        q: 'How do I safely dispose of an old hard drive?',
        a: 'Simply deleting files or formatting a hard drive does not provide the same level of security as physical destruction. Recycle Technologies provides hard drive destruction services for customers who need secure destruction of storage devices.',
      },
      {
        q: 'Does deleting files permanently erase a hard drive?',
        a: 'No. Deleting files or formatting a drive does not necessarily prevent data recovery. When sensitive information must be securely destroyed, physical destruction is an option.',
      },
      {
        q: 'What is hard drive destruction?',
        a: 'Hard drive destruction is the physical destruction of a hard drive or storage device so that the data stored on it cannot be accessed through normal recovery methods.',
      },
      {
        q: 'Does Recycle Technologies destroy hard drives?',
        a: 'Yes. Recycle Technologies provides hard drive destruction services for businesses and other customers that need secure destruction of storage devices.',
      },
      {
        q: 'Where can I get hard drive destruction near me?',
        a: 'Recycle Technologies provides hard drive destruction services in its service areas, including Minnesota and Wisconsin. Contact us to determine the available pickup, drop-off, or destruction option for your location.',
      },
      {
        q: 'Can businesses use hard drive destruction services?',
        a: 'Yes. Businesses can use hard drive destruction services when retiring computers, servers, storage devices, and other equipment containing sensitive information.',
      },
      {
        q: 'Can hard drives be recycled after destruction?',
        a: 'Yes. After secure destruction, the resulting materials can be processed through appropriate recycling channels.',
      },
      {
        q: 'Do you provide documentation for hard drive destruction?',
        a: 'Documentation is available for applicable destruction services. Contact Recycle Technologies to confirm the documentation provided for your specific service.',
      },
    ],
  },
  {
    id: 'light-bulbs',
    eyebrow: 'LIGHT BULB & LAMP RECYCLING',
    heading: 'Light Bulb & Lamp Recycling',
    lead: 'Fluorescent tubes, CFLs, LEDs and everything in between.',
    items: [
      {
        q: 'Where can I recycle fluorescent light bulbs?',
        a: 'Recycle Technologies provides fluorescent lamp and light bulb recycling services. Available options include designated drop-off and commercial recycling services depending on location.',
      },
      {
        q: 'Can fluorescent tubes be recycled?',
        a: 'Yes. Fluorescent tubes can be recycled through Recycle Technologies\' lamp recycling program.',
      },
      {
        q: 'Can I recycle CFL light bulbs?',
        a: 'Yes. Compact fluorescent lamps, commonly called CFL bulbs, are among the lamp types handled through the recycling program.',
      },
      {
        q: 'Can I recycle LED light bulbs?',
        a: 'Recycle Technologies accepts various bulb types, including LED and other lamps, subject to the applicable service requirements.',
      },
      {
        q: 'Can I recycle incandescent light bulbs?',
        a: 'Incandescent bulbs can be accepted through applicable light bulb recycling services.',
      },
      {
        q: 'What types of light bulbs can be recycled?',
        a: 'Recycle Technologies handles a range of lamp and bulb types, including fluorescent tubes, CFLs, UV lamps, neon lamps, argon lamps, halogen lamps, incandescent bulbs, and other accepted lamps.',
      },
      {
        q: 'Why should fluorescent bulbs be recycled?',
        a: 'Fluorescent lamps require appropriate handling because they contain mercury. Recycling provides a controlled way to recover and manage the materials rather than sending the lamps to a landfill.',
      },
      {
        q: 'What happens to fluorescent bulbs after recycling?',
        a: 'Fluorescent lamps are processed so their components can be separated and recovered. Materials such as glass and aluminum can be directed toward further use, while mercury-containing materials are handled through appropriate processing.',
      },
      {
        q: 'Can businesses recycle large quantities of light bulbs?',
        a: 'Yes. Recycle Technologies works with businesses and facilities that have larger quantities of lamps and bulbs and can provide commercial recycling solutions.',
      },
      {
        q: 'Do you provide fluorescent bulb recycling pickup?',
        a: 'Pickup options are available for qualifying commercial customers in the service areas. Contact Recycle Technologies to arrange service based on your location and quantity.',
      },
    ],
  },
  {
    id: 'batteries',
    eyebrow: 'BATTERY RECYCLING',
    heading: 'Battery Recycling',
    lead: 'Alkaline, lithium-ion, lead-acid and EV batteries.',
    items: [
      {
        q: 'What types of batteries can be recycled?',
        a: 'Recycle Technologies handles various battery types, including alkaline, button cell, lead-acid, lithium and lithium-ion, nickel-cadmium, mercury oxide, EV batteries, and other accepted batteries.',
      },
      {
        q: 'Can lithium-ion batteries be recycled?',
        a: 'Yes. Lithium and lithium-ion batteries are among the battery types handled through Recycle Technologies\' battery recycling services.',
      },
      {
        q: 'Can I recycle rechargeable batteries?',
        a: 'Many rechargeable battery types can be recycled, including lithium-ion and nickel-cadmium batteries. Contact Recycle Technologies if you are unsure about a specific battery.',
      },
      {
        q: 'Can I recycle EV batteries?',
        a: 'Recycle Technologies lists EV batteries among the battery types accepted through its battery recycling services. For large or specialized EV battery quantities, contact the company before arranging service.',
      },
      {
        q: 'Can I recycle car batteries?',
        a: 'Lead-acid and other automotive batteries can be handled through applicable battery recycling services.',
      },
      {
        q: 'Can businesses recycle batteries?',
        a: 'Yes. Recycle Technologies provides battery recycling services for businesses and organizations that need to manage used batteries responsibly.',
      },
      {
        q: 'Why should batteries be recycled?',
        a: 'Proper battery recycling helps recover useful materials and provides a safer, more responsible alternative to disposing of batteries with ordinary waste.',
      },
      {
        q: 'How should I dispose of old lithium batteries?',
        a: 'Lithium batteries should be handled through an appropriate battery recycling program rather than placed in regular trash. Contact Recycle Technologies for information about accepted lithium and lithium-ion batteries and available service options.',
      },
    ],
  },
  {
    id: 'televisions',
    eyebrow: 'TELEVISION RECYCLING',
    heading: 'Television Recycling',
    lead: 'Old sets, one or many.',
    items: [
      {
        q: 'Can I recycle an old TV?',
        a: 'Yes. Recycle Technologies provides television recycling services for eligible televisions and related equipment.',
      },
      {
        q: 'Where can I recycle a television near me?',
        a: 'Recycle Technologies provides TV recycling services in its service areas. Check the current location and service information before bringing a television for recycling.',
      },
      {
        q: 'Can businesses recycle old televisions?',
        a: 'Yes. Businesses, facilities, schools, and other organizations can use television recycling services for eligible equipment.',
      },
      {
        q: 'What happens to an old TV after recycling?',
        a: 'Televisions are processed so their different materials and components can be separated and directed through appropriate recycling channels.',
      },
      {
        q: 'Can I recycle multiple TVs at once?',
        a: 'Yes. Businesses and organizations with multiple televisions can arrange an appropriate recycling service. Pickup options may be available depending on location and quantity.',
      },
    ],
  },
  {
    id: 'ballasts',
    eyebrow: 'BALLAST RECYCLING',
    heading: 'Ballast Recycling',
    lead: 'Lighting ballasts removed during a retrofit.',
    items: [
      {
        q: 'What is ballast recycling?',
        a: 'Ballast recycling is the proper handling and recycling of lighting ballasts removed from fluorescent and other lighting systems.',
      },
      {
        q: 'Can fluorescent light ballasts be recycled?',
        a: 'Yes. Recycle Technologies provides ballast recycling services for eligible lighting ballasts.',
      },
      {
        q: 'Why should I recycle old ballasts?',
        a: 'Some older lighting ballasts can contain materials that require appropriate handling. Recycling them through a qualified service helps businesses manage these materials responsibly.',
      },
      {
        q: 'Can businesses recycle large quantities of ballasts?',
        a: 'Yes. Commercial customers can arrange ballast recycling services based on their location and quantity.',
      },
      {
        q: 'Can ballasts be recycled with fluorescent bulbs?',
        a: 'Ballasts and lamps are separate materials and may require different processing. Recycle Technologies provides dedicated recycling services for both.',
      },
    ],
  },
  {
    id: 'paper-shredding',
    eyebrow: 'PAPER SHREDDING',
    heading: 'Paper Shredding',
    lead: 'Confidential documents, destroyed and documented.',
    items: [
      {
        q: 'Does Recycle Technologies offer paper shredding?',
        a: 'Yes. Recycle Technologies provides secure paper shredding services for businesses and organizations that need confidential documents destroyed.',
      },
      {
        q: 'What is secure paper shredding?',
        a: 'Secure paper shredding involves destroying paper documents so the information they contain cannot be read or reconstructed in their original form.',
      },
      {
        q: 'What documents should be shredded?',
        a: 'Businesses commonly shred documents containing confidential, financial, personal, customer, employee, or business information. If a document no longer needs to be retained and contains sensitive information, secure shredding can be an appropriate disposal method.',
      },
      {
        q: 'Do you offer commercial paper shredding?',
        a: 'Yes. Recycle Technologies provides paper shredding services for businesses and organizations.',
      },
      {
        q: 'Can I schedule paper shredding pickup?',
        a: 'Pickup options are available in applicable service areas. Contact Recycle Technologies to discuss your location, volume, and shredding requirements.',
      },
      {
        q: 'Where can I find paper shredding near me?',
        a: 'Recycle Technologies provides shredding services in Minnesota and Wisconsin. Availability depends on your location and the type of service required.',
      },
    ],
  },
  {
    id: 'phone-shredding',
    eyebrow: 'PHONE & MOBILE DEVICE SHREDDING',
    heading: 'Phone & Mobile Device Shredding',
    lead: 'Handsets that must never come back on.',
    items: [
      {
        q: 'Does Recycle Technologies recycle old cell phones?',
        a: 'Yes. Cell phones and other handheld electronic devices can be handled through applicable electronics recycling services.',
      },
      {
        q: 'What is phone shredding?',
        a: 'Phone shredding is the physical destruction of mobile phones and other eligible devices to prevent the information stored on them from being accessed.',
      },
      {
        q: 'Why would I need phone shredding?',
        a: 'Organizations may need physical destruction when mobile devices contain sensitive business, customer, employee, or other confidential information and must be permanently taken out of service.',
      },
      {
        q: 'Does Recycle Technologies offer phone destruction?',
        a: 'Yes. Recycle Technologies provides phone destruction services for customers that require secure destruction of eligible mobile devices.',
      },
      {
        q: 'Can businesses use phone shredding services?',
        a: 'Yes. Phone shredding can be used by businesses and organizations retiring large quantities of mobile devices.',
      },
      {
        q: 'Can phones be recycled after destruction?',
        a: 'The resulting materials can be processed through appropriate recycling channels after the devices have been securely destroyed.',
      },
    ],
  },
  {
    id: 'off-site-shredding',
    eyebrow: 'OFF-SITE SHREDDING',
    heading: 'Off-Site Shredding',
    lead: 'Collected, transported, and destroyed at our facility.',
    items: [
      {
        q: 'What is off-site shredding?',
        a: 'Off-site shredding means confidential materials are collected and transported to a secure processing facility for destruction rather than being shredded at the customer\'s location.',
      },
      {
        q: 'Does Recycle Technologies offer off-site shredding?',
        a: 'Yes. Recycle Technologies provides off-site shredding services for customers that need secure document or material destruction.',
      },
      {
        q: 'Is off-site shredding suitable for businesses?',
        a: 'Yes. Off-site shredding can be used by businesses and organizations that need to regularly dispose of confidential documents or other eligible materials.',
      },
      {
        q: 'What can be shredded off-site?',
        a: 'Paper documents and other eligible materials can be processed through applicable shredding services. Contact Recycle Technologies if you have a specific material you need destroyed.',
      },
      {
        q: 'How do I schedule off-site shredding?',
        a: 'Contact Recycle Technologies with your location, material type, approximate quantity, and preferred service requirements. The team can determine the appropriate service and scheduling options.',
      },
    ],
  },
  {
    id: 'mail-in-recycling',
    eyebrow: 'MAIL-IN RECYCLING',
    heading: 'Mail-In Recycling',
    lead: 'For everyone outside the pickup and drop-off areas.',
    items: [
      {
        q: 'What is the Recycle Technologies Mail-In Recycling Program?',
        a: 'The Mail-In Recycling Program allows customers outside the local pickup and drop-off areas to send eligible recyclable materials to Recycle Technologies using recycling kits.',
      },
      {
        q: 'Can I recycle electronics by mail?',
        a: 'Yes. Eligible electronics can be sent through the Mail-In Recycling Program using the appropriate recycling kit.',
      },
      {
        q: 'Does Recycle Technologies offer mail-in recycling nationwide?',
        a: 'The Mail-In Recycling Program provides access to eligible recycling services for customers across the United States, including customers outside Recycle Technologies\' local pickup and drop-off areas.',
      },
      {
        q: 'How does mail-in recycling work?',
        a: 'Customers order the appropriate recycling kit, prepare their eligible materials according to the instructions, and send the package through the designated shipping process for recycling.',
      },
      {
        q: 'What can I send through the Mail-In Recycling Program?',
        a: 'Accepted materials depend on the specific recycling kit. Check the kit information before ordering to make sure your material is eligible.',
      },
      {
        q: 'Where can I order a recycling kit?',
        a: 'Recycle Technologies offers recycling kits through its Mail-In Recycling Program. Select the appropriate kit based on the material you need to recycle.',
      },
      {
        q: 'Is mail-in recycling available if I don\'t live near a Recycle Technologies facility?',
        a: 'Yes. The Mail-In Recycling Program is designed to provide access to recycling for customers who are outside the company\'s local pickup and drop-off service areas.',
      },
    ],
  },
  {
    id: 'pickup-drop-off',
    eyebrow: 'RECYCLING PICKUP & DROP-OFF',
    heading: 'Recycling Pickup & Drop-Off',
    lead: 'Coming to you, or you coming to us.',
    items: [
      {
        q: 'Does Recycle Technologies offer business recycling pickup?',
        a: 'Yes. Business pickup services are available in applicable service areas. Pickup arrangements depend on location, material type, quantity, and service requirements.',
      },
      {
        q: 'Can businesses schedule a one-time recycling pickup?',
        a: 'Yes. Businesses can contact Recycle Technologies to discuss one-time recycling pickups as well as ongoing recycling requirements.',
      },
      {
        q: 'Can businesses arrange recurring recycling service?',
        a: 'Recurring service may be available for businesses with ongoing recycling needs. Contact Recycle Technologies to discuss your materials, volume, and location.',
      },
      {
        q: 'Where are Recycle Technologies\' recycling facilities located?',
        a: 'Recycle Technologies operates facilities in Minnesota and Wisconsin. Current facility information and accepted materials are available on the Locations page.',
      },
      {
        q: 'Can I visit a recycling facility without an appointment?',
        a: 'Drop-off requirements can vary by facility and material. Check the current location information or contact Recycle Technologies before visiting.',
      },
      {
        q: 'Does Recycle Technologies serve outside Minnesota and Wisconsin?',
        a: 'Yes. Local pickup and drop-off services are concentrated in the company\'s service areas, while the Mail-In Recycling Program extends access to eligible customers across the United States.',
      },
    ],
  },
  {
    id: 'business-commercial',
    eyebrow: 'BUSINESS & COMMERCIAL RECYCLING',
    heading: 'Business & Commercial Recycling',
    lead: 'Programs for offices, facilities and schools.',
    items: [
      {
        q: 'Does Recycle Technologies provide commercial recycling services?',
        a: 'Yes. Recycle Technologies provides commercial recycling and secure destruction services for businesses, facilities, schools, organizations, and other customers.',
      },
      {
        q: 'Can you handle large volumes of recyclable materials?',
        a: 'Yes. Recycle Technologies works with commercial customers managing larger quantities of electronics, lighting, batteries, documents, and other accepted materials.',
      },
      {
        q: 'How do I set up a recycling program for my business?',
        a: 'Start by identifying the materials, approximate quantities, service frequency, and location. Contact Recycle Technologies to discuss the appropriate pickup, drop-off, recycling, or destruction program.',
      },
      {
        q: 'Can Recycle Technologies help with multiple types of materials?',
        a: 'Yes. Businesses can use multiple recycling and destruction services through Recycle Technologies, including electronics, batteries, light bulbs, ballasts, hard drives, phones, paper, and other accepted materials.',
      },
      {
        q: 'Do businesses receive documentation for recycling services?',
        a: 'Applicable recycling and destruction services can include documentation such as certificates of recycling. Contact Recycle Technologies to confirm what documentation is provided for your specific service.',
      },
      {
        q: 'Why should a business use a professional recycling company?',
        a: 'A professional recycling company provides a structured way to collect, process, and document the handling of materials that should not simply be placed in ordinary waste streams.',
      },
    ],
  },
  {
    id: 'compliance',
    eyebrow: 'COMPLIANCE, CERTIFICATIONS & RESPONSIBLE RECYCLING',
    heading: 'Compliance, Certifications & Responsible Recycling',
    lead: 'R2v3, certificates, and what the standards cover.',
    items: [
      {
        q: 'Is Recycle Technologies a certified electronics recycler?',
        a: 'Recycle Technologies operates R2v3-certified facilities in Minnesota for applicable electronics recycling activities. Certification scope varies by facility and service, so customers should review the applicable facility certification information for their specific requirements.',
      },
      {
        q: 'What is R2v3 certification?',
        a: 'R2v3 is a responsible recycling standard for electronics recyclers. It addresses areas such as environmental, health and safety, data security, and responsible management of used electronics.',
      },
      {
        q: 'Why are recycling certifications important?',
        a: 'Certifications provide an independently recognized framework for responsible recycling and material management. Businesses can use certification information when evaluating recycling vendors and documenting their recycling programs.',
      },
      {
        q: 'Does Recycle Technologies provide certificates of recycling?',
        a: 'Yes. Certificates of recycling are available for applicable services and provide customers with documentation of their recycling activity.',
      },
      {
        q: 'Does Recycle Technologies follow responsible recycling practices?',
        a: 'Recycle Technologies operates licensed recycling facilities and provides documented recycling and destruction services. Its facilities and service certifications vary by location and scope.',
      },
      {
        q: 'How does Recycle Technologies handle electronic waste?',
        a: 'Electronic equipment is collected and processed for material recovery and responsible recycling. Recycle Technologies states that its electronics recycling program follows a no-landfill approach for electronics disposal.',
      },
    ],
  },
  {
    id: 'service-areas',
    eyebrow: 'SERVICE AREAS & LOCATIONS',
    heading: 'Service Areas & Locations',
    lead: 'Minnesota, Wisconsin, and the rest of the country.',
    items: [
      {
        q: 'Where does Recycle Technologies provide recycling services?',
        a: 'Recycle Technologies provides local recycling and shredding services in Minnesota and Wisconsin, with additional access through its Mail-In Recycling Program.',
      },
      {
        q: 'Does Recycle Technologies provide electronics recycling in Minnesota?',
        a: 'Yes. Recycle Technologies provides electronics recycling services throughout its Minnesota service area, including business pickup and drop-off options.',
      },
      {
        q: 'Does Recycle Technologies provide electronics recycling in Wisconsin?',
        a: 'Yes. Recycle Technologies provides recycling services in Wisconsin, including electronics and other applicable materials.',
      },
      {
        q: 'Does Recycle Technologies serve Minneapolis?',
        a: 'Yes. Recycle Technologies provides recycling services in Minneapolis and surrounding Minnesota communities.',
      },
      {
        q: 'Does Recycle Technologies serve Milwaukee?',
        a: 'Yes. Recycle Technologies provides recycling services in the Milwaukee area and throughout its Wisconsin service network.',
      },
      {
        q: 'Can I find a recycling service near my location?',
        a: 'Use the Locations and service-area pages to find the appropriate Recycle Technologies service for your area. If local service is not available, the Mail-In Recycling Program may provide an alternative for eligible materials.',
      },
    ],
  },
]

/** Every question on the page, flattened — used for the FAQPage schema block. */
export const ALL_FAQS: Faq[] = FAQ_GROUPS.flatMap((g) => g.items)

/** Gaps between the frame, the content document and this build. */
export const TODO_FOR_CONTENT = [
  'Each group\'s one-line lead under the heading was written here, not supplied. The frame needs a third line in that block and the document has none. Seventeen short lines for Musaveer to replace or approve.',
  'The frame draws four groups of four questions. The real content is seventeen groups and 114 questions, so the page is much longer than the frame. The section pattern is unchanged.',
  'Several answers point at pages by name — Locations, the Mail-In Recycling Program, service-area pages. Those are plain text today; linking them would help a reader and is a content decision.',
]
