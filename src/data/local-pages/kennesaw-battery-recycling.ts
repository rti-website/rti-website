import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Battery Recycling in Kennesaw, GA — /georgia/kennesaw/battery-recycling/
 * Management sheet "RTI ALL PLAN" (5 Nov 2026), Georgia tab; copy from the content
 * team's Google Doc "Kennesaw Battery Recycling Page", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const KENNESAW_BATTERY_RECYCLING: LocalPage = {
  url: href('/georgia/kennesaw/battery-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Battery Recycling in Kennesaw, GA | Recycle Technologies",
    description: "Recycle lithium-ion, alkaline, sealed lead-acid, NiCd, button cell, UPS and EV batteries in Kennesaw, GA. Weekday drop-off, business pickup and mail-in kits.",
  },
  schema: { service: "Battery Recycling", areaServed: ["Kennesaw, GA", "Cobb County, GA", "Georgia"] },
  hero: {
    crumb: "Battery Recycling in Kennesaw, GA",
    h1: "Battery Recycling in Kennesaw, GA",
    body: ["Battery recycling for Kennesaw, Marietta and metro Atlanta, with weekday drop-off on Town Point Drive, business pickup within about 100 miles, and prepaid battery kits by mail."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `A loose lithium battery in a trash cart or curbside bin can start a fire, and many scrap yards won't take anything but car batteries. Recycle Technologies accepts nearly every chemistry at our [Kennesaw facility](${href('/kennesaw-georgia/')}), 3400 Town Point Dr NW, Suite 130, in Cobb County. We take alkaline and zinc, lithium-ion, sealed lead-acid, nickel-cadmium, and button cell batteries, along with power tool packs, UPS and backup units, and EV batteries. Residents and businesses can drop off on weekdays, small batches can ship in a kit, and companies can schedule pickup across metro Atlanta.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Kennesaw Battery Recycling Center",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Kennesaw Recycling Center](${href('/kennesaw-georgia/')}) (Cobb County)`,
          rows: [
            {
              label: "Address",
              value: "[3400 Town Point Dr NW, Suite 130, Kennesaw, GA 30144](https://www.google.com/maps/dir/?api=1&destination=3400%20Town%20Point%20Dr%20NW%2C%20Suite%20130%2C%20Kennesaw%2C%20GA%2030144)",
            },
            { label: "Phone", value: "770-426-5000" },
            { label: "Email", value: "dispatch@recycletechnologies.com" },
            { label: "Hours", value: "Monday to Friday, 9:00 AM to 4:00 PM" },
            {
              label: "Visiting",
              value: "You can walk in, but booking a time is preferred. Call before you head over, and the team will tell you where to unload.",
            },
          ],
        },
        {
          kind: "options",
          heading: "Available Service Options",
          items: [
            {
              icon: "pin",
              title: "Drop-off",
              body: "Residents and businesses, weekdays, appointments preferred.",
            },
            {
              icon: "truck",
              title: "Business pickup",
              body: "For commercial sites within roughly 100 miles of Kennesaw.",
            },
            { icon: "mail", title: "Mail-in", body: "Prepaid battery kits, with batteries sorted by type." },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Batteries We Accept in Kennesaw",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "A coffee can of dead AAs from a Woodstock kitchen and a rack of UPS batteries from a Cumberland data room are both welcome. We take:",
          ],
        },
        {
          kind: "grid",
          items: [
            { icon: "battery", title: "Alkaline and zinc batteries" },
            { icon: "zap", title: "Lithium-ion batteries" },
            { icon: "battery", title: "Sealed lead-acid batteries" },
            { icon: "repeat", title: "Nickel-cadmium (NiCd) batteries" },
            { icon: "target", title: "Button cells" },
            { icon: "tool", title: "Power tool battery packs" },
            { icon: "plug", title: "UPS and battery backup units" },
            { icon: "car", title: "EV and Tesla batteries (call ahead so we can plan for size and weight)" },
          ],
        },
        {
          kind: "note",
          body: [
            "Mercury oxide batteries and other unusual types are reviewed case by case. Any mercury recovered from them goes to our Greenwood, Indiana facility. If you're not sure about a battery, call 770-426-5000 before you come.",
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "Storing and Transporting Batteries Safely",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Storing and Transporting Batteries Safely",
          body: [`Our main [battery recycling page](${href('/battery-recycling/')}) has more on each type.`],
          checks: [
            "**Tape the ends.** Covering terminals before storage or transport cuts down on fire risk.",
            "**Keep chemistries apart.** Our staff sort every battery by type, but a pre-sorted box goes through faster, and mail-in kits must be sorted.",
            "**Isolate damaged batteries.** Put swollen, cracked, or leaking batteries in a separate container and call before bringing them.",
            "**Use a sturdy container.** A plastic tub or lined box keeps batteries from shifting on the drive.",
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "From Drop-Off to Recycling",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Pick a method",
              body: "Bring batteries to Town Point Drive, schedule a business pickup, or order a mail-in kit.",
            },
            { title: "Prep them", body: "Tape terminals and set aside anything damaged." },
            {
              title: "Hand them off",
              body: "Unload at our facility, stage them for the driver, or ship your kit.",
            },
            { title: "Sorting", body: "Trained staff separate every battery by chemistry." },
            {
              title: "Recycling and records",
              body: "Each component is processed and recycled, and a certificate confirms the batteries were disposed of safely.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Battery Recycling Options in Kennesaw, GA",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off",
          body: [
            "Searching for battery recycling near you in Kennesaw, Acworth, Marietta, or Powder Springs? Bring batteries to 3400 Town Point Dr NW Monday through Friday, 9:00 AM to 4:00 PM. Households and companies are both welcome. Walk-ins work, but a call to 770-426-5000 to set a time makes unloading quicker, especially for EV packs or a large batch.",
            `The same trip can include [electronics](${href('/electronic-recycle/')}), [light bulbs](${href('/light-bulbs/')}), and [ballasts](${href('/ballasts/')}).`,
            `See every [Recycle Technologies drop-off location](${href('/dropoff/')}).`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Business Pickup",
          dark: true,
          body: [
            "Property managers changing smoke detector and exit sign batteries, contractors with worn tool packs, schools, hospitals, offices with UPS units, warehouses along I-75 and I-575, and fleets with EV batteries can book collection instead of hauling. Business pickup covers roughly 100 miles around Kennesaw, reaching Atlanta, Smyrna, Roswell, Alpharetta, Sandy Springs, Canton, Cartersville and Rome.",
          ],
          listIntro: "Include these details for a quote:",
          list: [
            "**Pickup address:** street, city and ZIP code",
            "**Chemistries:** lithium-ion, lead-acid, NiCd, alkaline, EV or mixed",
            "**Volume:** count, weight, boxes or pallets",
            "**Condition:** any swollen, leaking or damaged batteries",
            "**Frequency:** a one-time cleanout or repeat pickups",
            "**Extras:** lamps, ballasts or electronics to collect too",
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
            `For a home office or a remote branch, order a prepaid [battery recycling kit](https://ezontheearth.com/collections/battery-recycle-kit?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits), sort the batteries by type, tape the ends, and ship it back. Our [mail-in recycling program](${href('/mail-in-recycling/')}) page explains the steps.`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Battery Recycling Rules in Georgia",
      grey: true,
      blocks: [
        {
          kind: "callout",
          body: [
            "Businesses can manage used batteries as universal waste under federal rules that Georgia follows (40 CFR Part 273), and shipping used lithium batteries falls under U.S. DOT hazardous materials rules. Households aren't held to those rules, but Georgia communities warn against tossing batteries: Athens-Clarke County calls them the top cause of fires at its solid waste facilities (Athens-Clarke County).",
            "Scrap yards around metro Atlanta mostly take car and industrial lead-acid batteries and turn away lithium and button cells. Our Kennesaw facility accepts household and business chemistries on any weekday.",
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Why Cobb County Recycles Batteries With Us",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "layers",
              title: "Nearly every chemistry in one place",
              body: "Alkaline, lithium-ion, SLA, NiCd, button cells, tool packs, UPS units and EV batteries.",
            },
            {
              icon: "pin",
              title: "Weekday walk-in site",
              body: "Town Point Drive drop-off for households and businesses.",
            },
            {
              icon: "sort",
              title: "Hand-sorted by type",
              body: "Trained staff separate each battery before recycling.",
            },
            {
              icon: "pin",
              title: "Mercury handled in-house",
              body: "Mercury from case-by-case batteries goes to our Greenwood, Indiana facility.",
            },
            {
              icon: "truck",
              title: "Pickup across metro Atlanta",
              body: "Business collection within roughly 100 miles.",
            },
            {
              icon: "shield",
              title: "Certified operations",
              body: "R2v3 and RIOS certified, and a Certified Minority Business Enterprise (MBE).",
            },
            {
              icon: "file",
              title: "Paperwork included",
              body: "A certificate documenting safe disposal of your batteries.",
            },
            { icon: "clock", title: "Since 1993", body: "More than three decades of recycling experience." },
          ],
        },
      ],
    },
    {
      figma: "doc-8",
      heading: "Georgia Counties We Serve",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "grid",
          items: [
            { icon: "landmark", title: "Cobb County" },
            { icon: "landmark", title: "Cherokee County" },
            { icon: "landmark", title: "Bartow County" },
            { icon: "landmark", title: "Paulding County" },
            { icon: "landmark", title: "Douglas County" },
            { icon: "landmark", title: "Fulton County" },
            { icon: "landmark", title: "DeKalb County" },
            { icon: "landmark", title: "Gwinnett County" },
            { icon: "landmark", title: "Forsyth County" },
            { icon: "landmark", title: "Clayton County" },
            { icon: "landmark", title: "Henry County" },
            { icon: "landmark", title: "Fayette County" },
            { icon: "landmark", title: "Coweta County" },
            { icon: "landmark", title: "Carroll County" },
            { icon: "landmark", title: "Floyd County" },
            { icon: "landmark", title: "Gordon County" },
            { icon: "landmark", title: "Pickens County" },
            { icon: "landmark", title: "Hall County" },
            { icon: "landmark", title: "Clarke County" },
            { icon: "landmark", title: "Bibb County" },
          ],
        },
      ],
    },
  ],
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
    items: [
      { q: "What does battery recycling cost in Kennesaw?", a: "Fees depend on the battery type and quantity. Call 770-426-5000 or request a quote." },
      { q: "Can I recycle smoke detector batteries here?", a: "Yes. They're usually alkaline or lithium, and we accept both." },
      { q: "Can I bring a laptop with the battery still inside?", a: "Yes. Laptops are accepted with our electronics, so the whole unit can come in." },
      { q: "Can a property manager drop off batteries from several buildings at once?", a: "Yes. Drop-off is open to businesses, and a call ahead helps with larger loads." },
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
            { label: "Mail-In Recycling Program", href: href('/mail-in-recycling/') },
            { label: "Georgia Recycling", href: href('/georgia/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Recycle Batteries in Kennesaw, GA",
    body: ["Drop batteries off on a weekday, ship a sorted batch in a prepaid kit, or send us your site and battery mix for a business pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Battery Pickup in Kennesaw", href: PICKUP_HREF },
  },
  todo: ["Damaged batteries: the doc asks to confirm damaged-battery handling at Kennesaw (the call-first line is kept, the note is not)", "FAQ \"Do you take e-bike or scooter batteries?\" left out (answer is [Confirm e-bike and scooter battery acceptance] in the doc)", "Related link \"Georgia Recycling\" pointed to /georgia-recycling/ (being moved)", "linked to the state page /georgia/ instead", "\"light bulbs,s\" in the doc read as \"light bulbs,\"", "\"Certified Minority Business Enterprise\" written with \"(MBE)\" to match the approved wording"],
}
