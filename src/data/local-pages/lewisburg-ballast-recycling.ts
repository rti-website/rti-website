import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Ballast Recycling in Tennessee — /tennessee/lewisburg/ballast-recycling/
 * New page, 3 Nov 2026 (management sheet "all plan rti 1", Lewisburg tab).
 * Copy: the content team's Google Doc "Tennessee Ballast Recycling Page", with typos fixed and
 * the doc's placeholders ([CONFIRM], review placeholders) left out (see `todo`).
 * Generated from the doc; inline [label](link) text is drawn as links.
 */
export const LEWISBURG_BALLAST_RECYCLING: LocalPage = {
  url: href('/tennessee/lewisburg/ballast-recycling/'),
  figma: { board: "doc", phone: "doc" },
  seo: {
    title: "Ballast Recycling in Tennessee | Recycle Technologies",
    description: "Ballast recycling in Tennessee: drop off PCB, non-PCB, HID, and leaking ballasts in Lewisburg or Johnson City, or book business pickup.",
  },
  schema: { service: "Ballast Recycling", areaServed: ["Lewisburg, TN", "Johnson City, TN", "Tennessee"] },
  hero: {
    crumb: "Ballast Recycling in Tennessee",
    h1: "Ballast Recycling in Tennessee",
    body: [
      "Ballast recycling for Tennessee businesses, with drop-off centers in Lewisburg and Johnson City, commercial pickup options, and mail-in kits for eligible non-PCB ballasts.",
      "Recycle Technologies helps Tennessee businesses manage used lighting ballasts from commercial buildings, warehouses, industrial facilities, and lighting replacement projects. Our Tennessee centers are located at 1580 Old Columbia Road in Lewisburg and 2212 Buffalo Road in Johnson City. Contact our team to confirm acceptance requirements for PCB, non-PCB, HID, and damaged ballasts, arrange business pickup, or explore mail-in options for eligible non-PCB ballasts. Ask about recycling documentation for your shipment.",
    ],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  bands: [
    {
      figma: "doc-1",
      heading: "Our Tennessee Ballast Recycling Centers",
      grey: false,
      blocks: [
        { kind: "h3", text: "Lewisburg Recycling Center (Middle Tennessee)" },
        { kind: "text", body: [`[Lewisburg Recycling Center](${href('/tennessee/lewisburg/')})`] },
        { kind: "info", rows: [
            { label: "Address", value: "[1580 Old Columbia Road, Lewisburg, TN 37091](https://www.google.com/maps/dir/?api=1&destination=1580+Old+Columbia+Road%2C+Lewisburg%2C+TN+37091)" },
            { label: "Phone", value: "615-214-4768" },
            { label: "Hours", value: "Monday to Friday, 8:00 AM to 4:00 PM" },
        ] },
        { kind: "text", body: ["Contact the Lewisburg center before bringing ballasts. Confirm whether your material is accepted, whether an appointment is needed, and what handling or packaging requirements apply."] },
        { kind: "h3", text: "Johnson City Recycling Center (East Tennessee)" },
        { kind: "text", body: [`[Johnson City Recycling Center](${href('/johnson-city-buffalo-tennessee/')})`] },
        { kind: "info", rows: [
            { label: "Address", value: "2212 Buffalo Road #210, Johnson City, TN 37604" },
            { label: "Phone", value: "423-328-7012" },
            { label: "Hours", value: "Monday to Friday, 7:30 AM to 3:00 PM" },
        ] },
        { kind: "text", body: ["The Johnson City center may be an option for businesses managing used lighting ballasts. Contact the team first to verify acceptance, quantity limits, and drop-off arrangements."] },
        { kind: "h3", text: "At Both Centers" },
        { kind: "info", rows: [
            { label: "Drop-off", value: "Confirm ballast acceptance and any restrictions before visiting." },
            { label: "Business pickup", value: "Ask whether your location and material qualify for commercial pickup." },
            { label: "Mail-in", value: "Prepaid mail-in options may be available for eligible non-PCB ballasts." },
        ] },
      ],
    },
    {
      figma: "doc-2",
      heading: "Ballasts We Handle in Tennessee",
      grey: true,
      blocks: [
        { kind: "text", body: ["Lighting projects can produce different types of used ballasts. The appropriate recycling or disposal route depends on the ballast type, condition, and applicable requirements."] },
        { kind: "bullets", rows: [
            ["**PCB ballasts:** Older ballasts that may contain polychlorinated biphenyls (PCBs).", "**Non-PCB ballasts:** Ballasts that may qualify for standard recycling or an eligible mail-in program."],
            ["**HID ballasts:** Ballasts used in high-intensity discharge lighting systems.", "**Damaged or leaking ballasts:** Contact our team before handling or transporting these units."],
            ["**Ballasts from commercial lighting projects:** Materials generated during facility upgrades, renovations, and equipment replacements."],
        ] },
        { kind: "text", body: ["If you are unsure what type of ballast you have, describe the equipment and approximate quantity when you contact us."] },
      ],
    },
    {
      figma: "doc-3",
      heading: "How Ballast Recycling Works",
      grey: false,
      blocks: [
        { kind: "cards", rows: [
            [
              { n: 1, title: "Identify your ballasts", body: ["Determine whether they are PCB, non-PCB, HID, or another type. If you are unsure, ask our team for guidance."] },
              { n: 2, title: "Confirm the service", body: ["Share your location, ballast type, approximate quantity, and whether any units are damaged or leaking."] },
              { n: 3, title: "Choose a recycling option", body: ["Depending on eligibility, arrange a drop-off, request a commercial pickup, or order an approved mail-in kit."] },
            ],
            [
              { n: 4, title: "Follow handling instructions", body: ["Confirm packaging, transportation, and acceptance requirements before moving or shipping the material."] },
              { n: 5, title: "Keep your records", body: ["Ask about a Certificate of Recycling and other documentation available for your shipment."] },
            ],
        ] },
      ],
    },
    {
      figma: "doc-4",
      heading: "Ballast Recycling Options in Tennessee",
      grey: true,
      blocks: [
        { kind: "h3", text: "Drop-Off" },
        { kind: "text", body: ["Looking for ballast recycling in Middle or East Tennessee? Recycle Technologies has centers in Lewisburg and Johnson City. Contact the appropriate location before visiting to confirm current hours, ballast acceptance, quantity limits, and any special handling requirements.", `If your project also involves other materials, our Tennessee centers may offer additional recycling services. Ask about [electronics recycling](${href('/electronic-recycle/')}) and [light bulb recycling](${href('/light-bulbs/')}) to see whether your materials can be managed through the same location.`] },
        { kind: "h3", text: "Business Pickup" },
        { kind: "text", body: ["Businesses replacing commercial lighting may generate large quantities of used ballasts. Contact Recycle Technologies to discuss pickup availability for your facility, contractor project, warehouse, office building, or industrial site.", "When requesting a quote, provide:"] },
        { kind: "bullets", rows: [
            ["Your pickup address", "The type of ballasts"],
            ["The approximate quantity or number of containers", "Whether any units are damaged or leaking"],
            ["Any known PCB-related information"],
        ] },
        { kind: "text", body: ["Pickup availability and service-area limits must be confirmed with our team. We can then discuss the available service and scheduling options."] },
        { kind: "buttons", primary: { label: "Request a Ballast Recycling Quote", href: QUOTE_HREF }, secondary: { label: "Schedule a Pickup", href: PICKUP_HREF } },
        { kind: "h3", text: "Mail-In Recycling" },
        { kind: "text", body: ["Eligible non-PCB ballasts may qualify for a prepaid mail-in recycling option. This can be useful for smaller quantities that do not justify a dedicated pickup.", "Explore the [Non-PCB Ballast Mail-In Program](https://ezontheearth.com/collections/non-pcb-ballast?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits) to review the available options.", `Read how the [mail-in recycling program](${href('/mail-in-recycling/')}) works before ordering. Confirm that your ballast type and quantity meet the program's requirements.`, "**Important:** Do not send PCB-containing or leaking ballasts through a non-PCB mail-in program unless the provider explicitly confirms that the material is accepted."] },
      ],
    },
    {
      figma: "doc-5",
      heading: "Ballast Disposal Rules in Tennessee",
      grey: false,
      blocks: [
        { kind: "text", body: ["PCB-containing fluorescent light ballasts may be subject to specific federal storage, transportation, and disposal requirements. The correct procedure depends on the material and the applicable regulations.", "Under applicable federal PCB storage rules, PCB fluorescent light ballasts taken out of service for disposal generally must be sent to an approved disposal facility within nine months and disposed of within one year. Confirm the requirements for your specific waste stream before storing or transporting the material.", "For further guidance, consult the EPA's information on [PCB-containing fluorescent light ballasts](https://www.epa.gov/pcbs/polychlorinated-biphenyl-pcb-containing-fluorescent-light-ballasts-flbs).", "Businesses managing PCB ballasts should verify their obligations rather than assume that ordinary lighting waste procedures apply."] },
      ],
    },
    {
      figma: "doc-6",
      heading: "Why Recycle Technologies for Ballast Recycling in Tennessee?",
      grey: true,
      blocks: [
        { kind: "bullets", rows: [
            ["**Two Tennessee locations:** Contact our Lewisburg or Johnson City center to confirm available services.", "**Support for different ballast types:** Ask about the correct route for PCB, non-PCB, and HID ballasts."],
            ["**Commercial recycling options:** Discuss material generated during lighting upgrades, renovations, and facility cleanouts.", "**Mail-in options:** Eligible non-PCB ballasts may qualify for a prepaid mail-in program."],
            ["**Recycling documentation:** Ask about a Certificate of Recycling and other records available for your shipment.", "**Guidance before delivery:** Confirm acceptance and handling requirements before transporting potentially regulated materials."],
        ] },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQ",
    heading: "FAQs",
    items: [
      { q: "Where can I recycle ballasts in Tennessee?", a: "Recycle Technologies has centers in Lewisburg and Johnson City. Contact the relevant location to confirm current hours, ballast acceptance, and any restrictions before visiting." },
      { q: "Does Recycle Technologies accept PCB ballasts?", a: "Contact our team to confirm acceptance and the appropriate service route for your PCB-containing ballasts. Do not assume that every drop-off or mail-in option accepts PCB materials." },
      { q: "Can I recycle non-PCB ballasts by mail?", a: "Eligible non-PCB ballasts may qualify for a prepaid mail-in program. Review the Non-PCB Ballast Mail-In Program and confirm the current requirements before ordering." },
      { q: "Do you pick up ballasts from businesses in Tennessee?", a: "Commercial pickup may be available depending on your location, material type, and quantity. Request a quote to confirm coverage and scheduling." },
      { q: "What should I do with a leaking ballast?", a: "Call Recycle Technologies before handling or transporting it. Our team can advise you on appropriate next steps and confirm whether a service option is available." },
      { q: "How long can PCB ballasts be stored before disposal?", a: "Applicable federal PCB storage rules generally require PCB fluorescent light ballasts taken out of service for disposal to be sent to an approved disposal facility within nine months and disposed of within one year. Verify the requirements that apply to your specific material." },
      { q: "Can I receive a Certificate of Recycling?", a: "Ask our team which records are available for your shipment, including whether a Certificate of Recycling can be provided for your specific service." },
    ],
  },
  after: [
    {
      figma: "doc-related",
      heading: "Related Recycling Services",
      grey: false,
      blocks: [
        { kind: "chips", links: [
            { label: "Ballast Recycling", href: href('/ballasts/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Light Bulb Recycling", href: href('/light-bulbs/') },
            { label: "Battery Recycling", href: href('/battery-recycling/') },
            { label: "Tennessee Recycling Services", href: href('/tennessee/') },
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
        ] },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Ballast Recycling in Tennessee",
    body: ["Need to manage used lighting ballasts from a commercial or industrial project? Contact Recycle Technologies with your location, ballast type, and estimated quantity. Our team can help you confirm acceptance requirements and determine an appropriate recycling option.", "Lewisburg: 615-214-4768 | Johnson City: 423-328-7012"],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Ballast Pickup in Tennessee", href: PICKUP_HREF },
  },
  todo: ["Lewisburg phone: the doc says \"615-214-4768, confirm current number\" (the number is shown, the note is not)", "The doc is Tennessee-wide (both sites)", "it sits at the Lewisburg URL as the sheet asks"],
}
