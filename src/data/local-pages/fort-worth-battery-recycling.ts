import { PICKUP_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { type LocalPage } from './types'

/**
 * Battery Recycling in Fort Worth, TX — /texas/fort-worth/battery-recycling/
 * Management sheet "RTI ALL PLAN" (5 Nov 2026), Texas tab; copy from the content
 * team's Google Doc "Battery Recycling in Fort Worth, TX", typos fixed, placeholders left out (see
 * `todo`). Laid out in the 4 Nov 2026 design (Figma 7566:9207 / 7577:10185,
 * `design: 2`). Generated from the doc; inline [label](link) text is drawn as
 * links, phone numbers and emails as tel: and mailto: links.
 */
export const FORT_WORTH_BATTERY_RECYCLING: LocalPage = {
  url: href('/texas/fort-worth/battery-recycling/'),
  figma: { board: "7566:9207", phone: "7577:10185" },
  design: 2,
  seo: {
    title: "Battery Recycling in Fort Worth, TX | Recycle Technologies",
    description: "Lithium-ion, lead-acid, alkaline, NiCd, button cell, and backup battery recycling in Fort Worth, TX. Drop off at our partner location, book commercial pickup or order a kit.",
  },
  schema: { service: "Battery Recycling", areaServed: ["Fort Worth, TX", "Tarrant County, TX", "Texas"] },
  hero: {
    crumb: "Battery Recycling in Fort Worth, TX",
    h1: "Battery Recycling in Fort Worth, TX",
    body: ["Battery recycling for warehouses, hospitals, schools, contractors and homes across Tarrant County and Dallas-Fort Worth, through our Near Southside partner location, commercial pickup reaching about 100 miles, and prepaid battery kits."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule a Pickup", href: PICKUP_HREF },
  },
  summary: [
    `Spent batteries are a fire and leak hazard when they sit in a supply closet or get tossed in a dumpster, and Fort Worth's city battery drop-offs are open to residents only. Recycle Technologies collects batteries from companies and households through our [Fort Worth partner location](${href('/fort-worth-texas/')}) at 101 E Bowie St. From AA cells and watch batteries to lithium-ion tool packs, sealed lead-acid UPS units and EV batteries, every load is sorted by chemistry, and you get paperwork confirming the batteries were recycled and handled safely.`,
  ],
  bands: [
    {
      figma: "doc-1",
      heading: "Our Fort Worth Battery Recycling Partner Location",
      grey: false,
      blocks: [
        {
          kind: "center",
          title: `[Fort Worth Partner Location](${href('/fort-worth-texas/')}) (Tarrant County)`,
          rows: [
            {
              label: "Address",
              value: "[101 E Bowie St, Fort Worth, TX 76110](https://www.google.com/maps/dir/?api=1&destination=101+E+Bowie+St%2C+Fort+Worth%2C+TX+76110)",
            },
            { label: "Phone", value: "817-921-1440" },
            { label: "Email", value: "lrtlogistics@lightingresourcesinc.com" },
            { label: "Hours", value: "Monday to Friday, 8:00 AM to 3:30 PM" },
            {
              label: "Arriving",
              value: "Off I-35 in the Berry Street and Main Street area. Turn into the East Bowie Street lot; heavy pallets come off by forklift or at the two 53-foot docks along the west wall.",
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
              body: "Open weekdays to residents and businesses; call before bringing large or mixed loads.",
            },
            {
              icon: "truck",
              title: "Business pickup",
              body: "Scheduled collection up to roughly 100 miles away.",
            },
            { icon: "mail", title: "Mail-in", body: "Prepaid battery kits for smaller amounts." },
          ],
        },
      ],
    },
    {
      figma: "doc-2",
      heading: "Battery Types We Recycle in Fort Worth",
      grey: false,
      mint: true,
      blocks: [
        {
          kind: "text",
          body: [
            "Whether it's a shoebox of spent AAs from a Keller household or a pallet of UPS batteries from a Westlake data hall, bring it here. Through the partner location, Recycle Technologies takes:",
          ],
        },
        {
          kind: "grid",
          items: [
            {
              icon: "battery",
              title: "Single-use cells",
              body: "Alkaline and zinc batteries (AA, AAA, C, D, 9-volt)",
            },
            { icon: "zap", title: "Lithium-ion", body: "Laptop, phone and power tool packs" },
            { icon: "plug", title: "Sealed lead-acid", body: "UPS and battery backup units" },
            {
              icon: "repeat",
              title: "Nickel-cadmium (NiCd)",
              body: "Older cordless tools and equipment packs",
            },
            { icon: "target", title: "Button cells", body: "Watch, hearing aid and key fob batteries" },
            { icon: "car", title: "Electric vehicle batteries", body: "Including Tesla packs" },
            {
              icon: "search",
              title: "Mercury oxide and other uncommon types",
              body: "Reviewed case by case. Mercury-bearing batteries are sent on to RTI's facility in Greenwood, Indiana.",
            },
          ],
        },
        {
          kind: "note",
          body: [
            "Planning to bring EV packs or large backup systems? Call 817-921-1440 first so the crew can plan unloading.",
            `Replacing old equipment at the same time? [Electronics](${href('/electronic-recycle/')}), [lamps](${href('/light-bulbs/')}) and [ballasts](${href('/ballasts/')}) can share the trip, with PCB ballasts arriving under a manifest.`,
          ],
        },
      ],
    },
    {
      figma: "doc-3",
      heading: "Storing and Packing Batteries Safely",
      grey: false,
      blocks: [
        {
          kind: "split",
          heading: "Storing and Packing Batteries Safely",
          body: [
            "Stored the wrong way, batteries can start fires or leak chemicals. Before your drop-off or pickup:",
          ],
          checks: [
            "Cover the terminals with tape or a non-conductive cap, especially on lithium and 9-volt batteries.",
            "Group by chemistry where you can. Kits must arrive already sorted by type.",
            "Keep containers cool and dry, away from heat and direct sun.",
            "Set aside swollen, leaking, or damaged batteries and call before bringing them.",
            "Have more than 5 pallets? Talk to the operations team before you schedule.",
          ],
        },
      ],
    },
    {
      figma: "doc-4",
      heading: "From Your Shelf to Recycling: The Process",
      grey: false,
      blocks: [
        {
          kind: "timeline",
          steps: [
            {
              title: "Get them to us",
              body: "Unload at the East Bowie Street partner location, set up a business pickup, or send a kit.",
            },
            {
              title: "Sorting by chemistry",
              body: "Trained staff separate lithium, lead-acid, alkaline, nickel, and other types, since mixed loads are riskier to handle.",
            },
            {
              title: "Safe storage",
              body: "Batteries are held by type until they move on for recycling, with mercury-bearing cells headed to RTI's Indiana facility in Greenwood.",
            },
            {
              title: "Paperwork",
              body: "After your drop-off or pickup is processed, Recycle Technologies sends a certificate confirming recycling and safe disposal, useful for audits and sustainability reports.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-5",
      heading: "Fort Worth Battery Recycling Options",
      grey: true,
      blocks: [
        {
          kind: "option",
          icon: "pin",
          title: "Drop-Off at the Partner Location",
          body: [
            "People in Fort Worth, Forest Hill, Everman, Richland Hills, and Lake Worth looking up battery recycling near you can bring taped, boxed batteries to 101 E Bowie St, the partner location. Weekday hours run 8:00 AM to 3:30 PM for both households and businesses. Call 817-921-1440 before larger or mixed loads so the team knows what's coming.",
            `Other Recycle Technologies sites are on the [drop-off locations](${href('/dropoff/')}) page.`,
          ],
        },
        {
          kind: "option",
          icon: "truck",
          title: "Scheduled Business Pickup",
          dark: true,
          body: [
            "Warehouse managers, facility directors, IT teams, fleet shops and building owners can book collection instead of hauling batteries across town. Pickup reaches roughly 100 miles from Fort Worth, including Arlington, Dallas, Irving, Grand Prairie, Grapevine, Euless, Denton, Waxahachie, Decatur, Mineral Wells and Granbury.",
          ],
          listIntro: "When you request a quote, include:",
          list: [
            "**Site:** pickup address and ZIP code",
            "**Battery mix:** lithium-ion, lead-acid, alkaline, NiCd, button cells, EV or backup units",
            "**Volume:** pounds, drums, boxes or pallets",
            "**Condition:** note anything swollen, cracked, or leaking",
            "**Loading:** dock, forklift or hand-carry access",
            "**Frequency:** a single cleanout or regular service",
          ],
          buttons: {
            primary: { label: "Get a Battery Pickup Quote", href: QUOTE_HREF },
            secondary: { label: "Book a Pickup", href: PICKUP_HREF },
          },
        },
        {
          kind: "option",
          icon: "battery",
          title: "Prepaid Battery Kits",
          body: [
            `For a small office in Fort Worth or a branch in Abilene, Austin or Tyler beyond the pickup range, a [battery recycling kit](https://ezontheearth.com/collections/battery-recycle-kit?utm_source=recycletechnologies&utm_medium=referral&utm_campaign=kits) lets you ship batteries straight from your desk. Sort them by type first. Details are on the [mail-in recycling program](${href('/mail-in-recycling/')}) page.`,
          ],
        },
      ],
    },
    {
      figma: "doc-6",
      heading: "Battery Recycling for North Texas Businesses",
      grey: false,
      blocks: [
        {
          kind: "list",
          items: [
            {
              icon: "warehouse",
              title: "Warehouses and logistics hubs",
              body: "Distribution centers along the AllianceTexas corridor, I-20 and near DFW Airport go through handheld scanner batteries and backup units constantly.",
            },
            {
              icon: "server",
              title: "Data centers and telecom",
              body: "Sealed lead-acid UPS strings from server rooms in Westlake, Fort Worth and Dallas can be collected on a scheduled pickup.",
            },
            {
              icon: "heart",
              title: "Hospitals and clinics",
              body: "Medical District facilities replace batteries in monitors, carts and backup systems year-round.",
            },
            {
              icon: "school",
              title: "Schools and universities",
              body: "Districts like Fort Worth ISD and campuses such as TCU and UT Arlington collect laptop, calculator and alkaline batteries in volume.",
            },
            {
              icon: "building",
              title: "Property managers",
              body: "Smoke detector, keypad lock and maintenance tool batteries from apartment communities add up fast.",
            },
            {
              icon: "tool",
              title: "Contractors and electricians",
              body: "Spent lithium-ion tool packs and the old lamps and ballasts from a retrofit can come in together.",
            },
            {
              icon: "car",
              title: "Auto and fleet operations",
              body: "Shops and fleets servicing hybrid or electric vehicles can ask about EV battery recycling.",
            },
            {
              icon: "truck",
              title: "Recycling organizations and haulers",
              body: "Collection programs can bring sorted batteries to the west-side docks.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-7",
      heading: "Household and Business Batteries in Fort Worth",
      grey: false,
      blocks: [
        {
          kind: "text",
          body: [
            "Fort Worth residents can drop household and car batteries at the city's four drop-off stations or the Environmental Collection Center on Bridge Street. Those programs don't accept business waste, and Arlington's center turns away contractors too. Companies and households with more than a few batteries or unusual types can use our partner location or a kit.",
          ],
        },
      ],
    },
    {
      figma: "doc-8",
      heading: "Texas Battery Disposal Rules",
      grey: true,
      blocks: [
        {
          kind: "checks",
          items: [
            "**Universal waste:** Texas adopts the federal universal waste rule for batteries (30 TAC §335.261), so businesses can manage spent batteries under simpler handling and shipping requirements.",
            "**Lead-acid batteries:** they can't go in household or municipal trash. They must go to a battery retailer, wholesaler, secondary lead smelter, or an authorized collection or recycling facility (30 TAC §328.13).",
            "**Single-use alkalines:** Take Care of Texas notes that most can legally go in household trash, but rechargeables should always be recycled (Take Care of Texas).",
          ],
        },
      ],
    },
    {
      figma: "doc-9",
      heading: "Why Fort Worth Chooses Recycle Technologies for Batteries",
      grey: false,
      dark: true,
      blocks: [
        {
          kind: "why",
          items: [
            {
              icon: "layers",
              title: "Every major chemistry in one place",
              body: "Alkaline, lithium-ion, sealed lead-acid, NiCd, button cells and EV batteries.",
            },
            {
              icon: "pin",
              title: "Room for big loads",
              body: "A forklift and two 53-foot docks at the Near Southside site.",
            },
            {
              icon: "sort",
              title: "Sorted by trained staff",
              body: "Batteries are separated by type on arrival instead of handled as a mixed pile.",
            },
            {
              icon: "file",
              title: "Audit-ready paperwork",
              body: "A certificate after each processed drop-off or pickup.",
            },
            {
              icon: "pin",
              title: "Mercury handled properly",
              body: "Mercury-bearing cells ship to our Greenwood, Indiana facility.",
            },
            {
              icon: "battery",
              title: "Fewer trips",
              body: "Batteries, electronics, lamps, and ballasts can leave your building together.",
            },
            {
              icon: "truck",
              title: "Reach across North Texas",
              body: "Commercial pickup up to around 100 miles from Fort Worth.",
            },
            {
              icon: "clock",
              title: "In the business since 1993",
              body: "More than three decades handling spent batteries and other recyclables.",
            },
          ],
        },
      ],
    },
    {
      figma: "doc-10",
      heading: "Texas Counties for Battery Recycling Service",
      grey: true,
      blocks: [{ kind: "places", links: [{ label: "Tarrant County", href: "" }] }],
    },
  ],
  faq: {
    eyebrow: "FAQs",
    heading: "Frequently Asked Questions",
    items: [
      { q: "Do you take NiMH rechargeable batteries?", a: "They aren't on the standard list, so call 817-921-1440. Battery types not listed are reviewed case by case." },
      { q: "Can I drop off a regular car battery?", a: "Sealed lead-acid batteries are accepted. Call first to confirm other lead-acid types before you bring them." },
      { q: "I'm a homeowner. Can you pick batteries up from my house?", a: "Pickup is for businesses. Homeowners can use drop-off at the Fort Worth partner location or a mail-in kit." },
      { q: "Is the Fort Worth location a Recycle Technologies facility?", a: "It's a partner location where Recycle Technologies customers can drop off batteries." },
    ],
  },
  after: [
    {
      figma: "doc-related",
      heading: "More Recycling Services",
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
            { label: "Texas Recycling", href: href('/texas/') },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Get Spent Batteries Out of Your Fort Worth Building",
    body: ["Tape the terminals, then bring your batteries to the Bowie Street partner location, ship a small batch with a battery recycling kit, or tell us your battery mix and volume for a pickup quote."],
    primary: { label: "Get a Quote", href: QUOTE_HREF },
    secondary: { label: "Schedule Battery Pickup in Fort Worth", href: PICKUP_HREF },
  },
  todo: ["[PLACEHOLDER: Confirm whether EV, forklift, and large UPS batteries are accepted at drop-off or by pickup only] left out (the call-first line before it is kept)", "[PLACEHOLDER: Confirm damaged-battery handling at the Fort Worth partner location] left out (the set-aside-and-call bullet is kept)", "Related link \"Texas Recycling\" pointed at the old /texas-recycling/", "linked to the state page /texas/ instead", "Band heading \"Reasons Fort Worth Chooses Recycle Technologies for Batteries\" written as \"Why Fort Worth Chooses Recycle Technologies for Batteries\" so it draws as the Why band", "\"Drop Off at the Partner Location\" heading written as \"Drop-Off at the Partner Location\"", "\"battery recycling near you\" written as \"near you\" as on the earlier pages", "Meta description is 173 characters (kept as the doc wrote it)", "The doc's Counties band lists only Tarrant County (one chip, kept as written)", "Email row is a Lighting Resources address (lrtlogistics@lightingresourcesinc.com), kept as written", "confirm it should show on an RTI page", "NiMH: the FAQ says NiMH isn't on the standard list (call first), kept as written"],
}
