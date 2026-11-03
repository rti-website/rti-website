import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Battery Recycling in Ocala, FL — /florida/ocala/battery-recycling/
 * Management sheet "all plan rti 1", Florida tab; copy from the content
 * team's Google Doc "Ocala Battery Recycling Page", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const OCALA_BATTERY_RECYCLING: LocalPage = {
  url: href('/florida/ocala/battery-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Battery Recycling in Ocala, FL | Recycle Technologies",
    description: "Battery recycling in Ocala, FL: drop off lithium-ion, lead-acid, EV, e-bike, and damaged batteries by appointment, or book business pickup.",
  },
  schema: { service: "Battery Recycling", areaServed: ["Ocala, FL", "Marion County, FL", "Florida"] },
  hero: {
    crumb: "Battery Recycling in Ocala, FL",
    h1: "Battery Recycling in Ocala, FL",
    body: ["Battery recycling for Ocala and Marion County, with appointment drop-off at our partner center on SW 16th Lane, business pickup across North Central Florida, and prepaid kits for small batches."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Recycle Technologies accepts used batteries through our partner recycling center in [Ocala](${href('/florida/ocala/')}), at 1007 SW 16th Lane, near the US-27, US-301 and US-441 corridor. Accepted types include alkaline, zinc, lithium-ion, lead-acid, NiCd and button cells, as well as EV, Tesla, e-bike, e-scooter, power tool and UPS batteries. We also handle swollen or damaged batteries with advance arrangements. Businesses and residents can book weekday drop-off appointments, companies can request pickup within about 100 miles, and smaller quantities may qualify for a prepaid mail-in kit. A recycling certificate is provided after the job is completed.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Ocala Battery Recycling Center",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Ocala Recycling Center](${href('/florida/ocala/')}) (partner location, Marion County)`,
          rows: [
            {
              label: "Address",
              value: "[1007 SW 16th Lane, Ocala, FL 34471](https://www.google.com/maps/dir/?api=1&destination=1007+SW+16th+Lane%2C+Ocala%2C+FL+34471)",
            },
            { label: "Phone", value: "813-534-5735" },
            { label: "Hours", value: "Monday to Friday, 6:00 AM to 2:30 PM" },
            { label: "Call ahead", value: "Appointment needed" },
            { label: "Landmark", value: "By the 17th Street bridge, next door to Fakhoury Chiropractic" },
          ],
        },
        {
          kind: "options",
          heading: "At the Ocala Center",
          items: [
            { icon: "pin", title: "Drop-off", body: "Available to businesses and residents by appointment" },
            { icon: "truck", title: "Business pickup", body: "Available within roughly 100 miles of Ocala" },
            {
              icon: "mail",
              title: "Mail-in",
              body: "Prepaid kits for eligible alkaline, lithium, and lead-acid batteries",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Batteries We Take in Ocala",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Whether you're clearing out household batteries or managing backup power units at a commercial site, the Ocala center accepts:",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "battery", title: "Alkaline and zinc batteries (AA, AAA, C, D, 9V)" },
            { icon: "zap", title: "Lithium-ion batteries from phones, laptops, tablets and cordless tools" },
            { icon: "battery", title: "Lead-acid batteries, including car, truck, marine and sealed units" },
            { icon: "target", title: "NiCd and button cell batteries" },
            { icon: "car", title: "EV and Tesla batteries" },
            { icon: "battery", title: "E-bike and e-scooter batteries" },
            { icon: "plug", title: "UPS and other battery backup systems" },
            {
              icon: "battery",
              title: "Swollen, cracked, leaking or damaged batteries (contact us before handling or transporting them)",
            },
          ],
        },
        {
          kind: "note",
          body: [
            `Mercury oxide batteries and other rare types are reviewed individually. Tell us what you have when you call so we can confirm the available recycling options. For more detail, visit our [battery recycling](${href('/battery-recycling/')}) page.`,
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "How Battery Recycling Works",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Identify the battery type",
              body: "Check the label if it is safe to do so. Keep different battery chemistries separate, and don't open or dismantle batteries.",
            },
            {
              title: "Prepare batteries for transport",
              body: "For intact batteries, follow the handling and terminal-protection instructions provided for your battery type. Don't handle swollen, leaking, cracked, or otherwise damaged batteries as if they were ordinary used cells. Contact us for instructions before moving or transporting them.",
            },
            {
              title: "Set the appointment",
              body: "Call 813-534-5735 to arrange a drop-off, schedule a business pickup online, or ask about a suitable mail-in kit.",
            },
            {
              title: "Sorting on arrival",
              body: "Trained staff check the batteries and route accepted types to the appropriate recycling process.",
            },
            {
              title: "Get your paperwork",
              body: "After the job is completed, you receive a recycling certificate for your records.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "Battery Recycling Options in Ocala",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Need battery recycling near you in Ocala, Belleview, or elsewhere in Marion County? Call ahead to book a weekday appointment at the SW 16th Lane partner center. Businesses and residents can both use the service. Before your visit, separate intact batteries by type and follow the handling instructions provided when you book. If you have swollen, leaking, or damaged batteries, tell us first and wait for instructions before transporting them.",
            `You can also bring eligible [electronics](${href('/electronic-recycle/')}), [fluorescent lamps](${href('/light-bulbs/')}) and [ballasts](${href('/ballasts/')}) as part of a larger workplace or property cleanout. See our other [drop-off locations](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Business Pickup",
          dark: true,
          body: [
            "Auto repair shops, fleet operators, marinas, golf courses, warehouses, hospitals and data centers can request battery pickup within about 100 miles of Ocala. The service area includes Ocklawaha, Summerfield, Inverness, Gainesville and The Villages, among other North Central Florida communities.",
            "When requesting a quote, include the battery types, estimated weight or pallet count, and pickup address. This helps our team assess the load and provide a schedule and price.",
          ],
          buttons: {
            primary: { label: "Request a Battery Pickup Quote", href: QUOTE_HREF },
            secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "mail",
          title: "Mail-In Recycling",
          body: [
            "For smaller quantities, such as spent household or office batteries, a prepaid [battery recycling kit](https://ezontheearth.com/collections/battery-recycle-kit?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits) may be a convenient option. Choose a kit approved for your battery type and follow its packaging, terminal-protection, and shipping instructions.",
            `Check how our [mail-in recycling program](${href('/mail-in-recycling/')}) works before sending anything, since some batteries have specific shipping restrictions. Do not send EV packs or damaged lithium batteries through a standard kit. Contact us to discuss an appropriate arrangement.`,
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Battery Disposal Rules in Florida",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "Florida's battery disposal requirements depend on battery chemistry and the type of waste generator. Under section 403.7192 of state law, nickel-cadmium and small sealed lead-acid rechargeable batteries cannot go in the garbage, and the rule covers homes as well as businesses, schools, hospitals, and government offices. Lead-acid batteries are also restricted from disposal, and Florida DEP's homeowner guide says auto and boat battery retailers must accept old batteries as trade-ins. Ordinary alkaline batteries are the exception: state rules allow them in household trash.",
            "Public collection programs can help households, but they may not suit businesses with larger loads or ongoing battery disposal needs:",
          ],
        },
        {
          kind: "list",
          items: [
            {
              icon: "landmark",
              title: "Marion County",
              body: "County recycling centers list batteries among accepted items, but businesses that don't pay the solid waste assessment fee can't use the centers.",
            },
            {
              icon: "landmark",
              title: "Citrus County",
              body: "Batteries go to a dedicated battery section at the county landfill in Lecanto, not the green recycling bins.",
            },
            {
              icon: "landmark",
              title: "Alachua County",
              body: "The Hazardous Waste Collection Center in Gainesville takes residents' waste at no charge; businesses can only use it as very small quantity generators and pay for disposal.",
            },
          ],
        },
        {
          kind: "note",
          body: [
            "Commercial generators also have federal requirements. The EPA advises businesses to manage used lithium-ion batteries under its universal waste rules, since most are likely hazardous waste when discarded ([EPA](https://epa.gov/recycle/used-lithium-ion-batteries)).",
            "For businesses that generate batteries regularly, the challenge isn't just finding a place that accepts them. It's finding an option that fits the battery types, quantity, pickup needs, and documentation requirements. Recycle Technologies offers appointment-based drop-off through its Ocala partner center, business pickup across the service area, and mail-in options for eligible smaller loads. Contact us to discuss your batteries and determine the appropriate route.",
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Why Recycle Technologies for Battery Recycling in Ocala",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "pin",
              body: "A partner recycling center in Ocala, not a retail counter or a once-a-year event",
            },
            { icon: "layers", body: "Multiple common battery chemistries handled through one service" },
            {
              icon: "battery",
              body: "A way to discuss swollen, leaking, and damaged batteries before transport",
            },
            { icon: "pin", body: "Weekday drop-off by appointment, starting at 6:00 AM" },
            { icon: "truck", body: "Business pickup across roughly 100 miles of North Central Florida" },
            { icon: "battery", body: "Electronics, lamps and ballasts accepted alongside eligible batteries" },
            {
              icon: "clock",
              body: "A minority-owned recycler with more than three decades in the business, since 1993",
            },
          ],
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
    items: [
      { q: "Is battery recycling free in Ocala?", a: "Pricing depends on the battery type and quantity. Call (352) 509-3019 or request a quote first." },
      { q: "Do you recycle golf cart batteries?", a: "Yes. Golf cart batteries, both lead-acid and lithium, are accepted at drop-off or through business pickup." },
      { q: "Do you pick up from businesses in Dunnellon and Lady Lake?", a: "Yes. Both are within the stated pickup area around Ocala. Confirm your address when you book." },
      { q: "How long can my business keep used batteries on site?", a: "Under federal universal waste rules, eligible batteries can generally be accumulated for up to one year from when they're generated. Specific requirements may apply, so arrange pickups before you reach that limit." },
    ],
  },
  after: [
    {
      figma: "doc-related",
      heading: "Related Recycling Services",
      grey: true,
      blocks: [
        {
          kind: "chips",
          links: [
            { label: "Battery Recycling", href: href('/battery-recycling/') },
            { label: "Electronics Recycling", href: href('/electronic-recycle/') },
            { label: "Light Bulb Recycling", href: href('/light-bulbs/') },
            { label: "Ballast Recycling", href: href('/ballasts/') },
            { label: "Mail-In Program", href: href('/mail-in-recycling/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Started With Battery Recycling in Ocala",
    body: ["Book a weekday drop-off at our Ocala partner center, order a suitable prepaid kit for eligible batteries, or request a quote for business pickup across North Central Florida.", "Ocala: 813-534-5735"],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Battery Pickup in Ocala", href: PICKUP_HREF },
  },
  todo: ["Reviews section left out until genuine Ocala reviews are supplied", "Phone: the doc gives 813-534-5735 for the center and (352) 509-3019 in the cost FAQ, both kept as written (confirm which is right)", "The doc's URL line (/battery-recycling-ocala-fl/) not used: the sheet's URL is"],
}
