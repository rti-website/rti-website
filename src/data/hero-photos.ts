import type { HeroFill, HeroTone, HeroWashes } from '@/components/ui/InteriorHeroArt'

/**
 * The interior page heroes, redrawn 28 Sep 2026.
 *
 * Source: Figma BVtf2AOuUOcYbiMIlcKmbC. Asim, 28 Sep 2026: "change all the
 * images of these pages according to the updated figma". Every interior hero
 * now carries a full 1920x1081 photograph (layers named "ChatGPT Image Aug 28,
 * 2026") drawn object-cover at a per-page y inside the 470-tall band, with a
 * 90% navy wash and a solid green one over it (tone 'deep', see HeroTone). The
 * photo is the raw image fill, so there is no navy fade baked into it any more.
 *
 * `phone` is where the "- Mobile" frame puts the SAME photo (checked: each
 * phone asset is the desktop file, or a 1024 copy of it). See PhoneFill.
 *
 * One object per page, spread straight into <ServiceHero {...HERO_PHOTOS.x} />.
 * Every file is in data/figma-assets.json with its node; the URLs expire about
 * 5 Oct 2026, so `node scripts/fetch-figma-assets.mjs --missing` has to run
 * before then.
 */
export type HeroPhoto = {
  image: string
  imageFill: HeroFill
  washes?: HeroWashes
  tone: HeroTone
}

const deep = (image: string, y: number, phone: HeroFill['phone'], more: Partial<HeroFill> = {}, washes?: HeroWashes): HeroPhoto =>
  ({ image, imageFill: { y, h: 1081, phone, ...more }, tone: 'deep', ...(washes ? { washes } : {}) })

/**
 * The per-page frames Asim sent on 28 Sep 2026 (a second batch): every
 * service and industry detail page has its own 1920x470 hero component with
 * the 16 Sep washes (navy 60%, green 64%, both 1920 wide) over a raw photo
 * fill. Most service ones also paint a gradient on the photo itself — see
 * TEAL_R and DARK_B. There are no phone frames for these, so below lg the
 * photo simply covers the band, as it did before.
 */
const TEAL_R = 'linear-gradient(to right, rgba(5,131,139,0.7) 0%, rgba(5,131,139,0) 45%)'
const DARK_B = 'linear-gradient(to bottom, rgba(5,131,139,0) 0%, #012325 100%)'
const classic = (image: string, y: number, h = 1081, more: Partial<HeroFill> = {}): HeroPhoto =>
  ({ image, imageFill: { y, h, ...more }, tone: 'classic', washes: { navy: { x: 0, w: 1920 }, green: { x: 0, w: 1920 } } })
const S = '/images/services'
const I = '/images/industries'

export const HERO_PHOTOS = {
  /* ---- service pages, second batch (node = the hero component) ---- */
  lightBulbs:  classic(`${S}/hero-light-bulbs-v2.png`, -478, 1280),                                // 6963:12916
  /* 6965:12989 — mirrored, and its teal edge mirrors with it, so it sits on the right. */
  batteries:   classic(`${S}/hero-batteries-v2.png`, -305, 1081,
    { flip: true, overlay: 'linear-gradient(to left, rgba(5,131,139,0.7) 0%, rgba(5,131,139,0) 45%)' }),
  ballasts:    classic(`${S}/hero-ballasts-v2.png`, -195, 1081, { overlay: TEAL_R }),              // 6989:13113
  tv:          classic(`${S}/hero-television-v2.png`, -245, 1081, { overlay: DARK_B }),            // 6975:13023
  airbag:      classic(`${S}/hero-airbag.png`, -195, 1081, { overlay: TEAL_R }),                   // 6989:13121
  hardDrive:   classic(`${S}/hero-hard-drives-v2.png`, -245, 1081, { overlay: DARK_B }),           // 6979:13042
  paper:       classic(`${S}/hero-paper-shredding-v2.png`, -70, 1081, { overlay: DARK_B }),        // 6982:13056
  offSite:     classic(`${S}/hero-off-site-shredding-v2.png`, -105, 1081, { overlay: DARK_B }),    // 6982:13067
  phone:       classic(`${S}/hero-phone-shredding.png`, -70, 1081, { overlay: DARK_B }),           // 6982:13075
  /* 6982:13083 — the same photo as /electronic-recycle/, with the navy wash. */
  kit:         classic(`${S}/hero-electronics-v2.png`, -205, 1081, { overlay: DARK_B }),
  mailIn:      classic(`${S}/hero-mail-in-v2.png`, -269, 1081, { overlay: DARK_B }),               // 6982:13091

  /* ---- industry pages, second batch ---- */
  // Photo at 50% over the navy, like Healthcare and Automotive (Asim, 28 Sep 2026).
  retail:        classic(`${I}/hero-retail-v2.png`, -478, 1280, { opacity: 0.5 }), // 6989:13199
  manufacturing: classic(`${I}/hero-manufacturing-v2.png`, -505, 1280),  // 6989:13203
  /* 6989:13195 — replaces the "Industries details" frame's photo (6491:5403)
     that this page carried for a few hours earlier the same day. */
  // Photo at 50% over the navy (Asim, 28 Sep 2026: the white desk made the
  // hero text unreadable). Same on Automotive below.
  healthcare:    classic(`${I}/hero-healthcare-v3.png`, -690, 1281, { opacity: 0.5 }), // 6989:13195
  automotive:    classic(`${I}/hero-automotive-v2.png`, -245, 1081, { opacity: 0.5 }), // 6989:13215
  banking:       classic(`${I}/hero-banking-v2.png`, -195),              // 6989:13207
  education:     classic(`${I}/hero-education-v2.png`, -245),            // 6989:13219
  government:    classic(`${I}/hero-government.png`, -245),              // 6989:13245

  /* 6472:3889 — the only mirrored one, and its washes are 1937 wide at x-17.
     Phone 6687:3499. */
  about: deep('/images/pages/hero-about-v2.png', -448, { x: 0, y: -69, w: 679, h: 382 },
    { flip: true }, { navy: { x: -17, w: 1937 }, green: { x: 0, w: 1937 } }),

  /* /services/ — 6472:3859. Phone 6640:2305, whose green wash is 401 wide. */
  services: deep('/images/services/hero-services-v2.png', -611,
    { x: -86, y: -41, w: 562, h: 317, green: { x: -5, w: 401 } }),

  /* /industries/ — 6472:3844. Phone 6687:3473 draws two copies; only the top
     one (6687:3476, inside the navy container) shows. */
  industries: deep('/images/industries/hero-industries-v2.png', -412,
    { x: -152, y: -52, w: 624, h: 351, under: true, green: { x: -1, w: 392 } }),

  /* 6472:3874. Phone 6687:3490. */
  contact: deep('/images/pages/hero-contact-v2.png', -332, { x: -232, y: -165, w: 854, h: 480 }),

  /* 6472:3904. Phone 6687:3508. */
  resources: deep('/images/pages/hero-resources-v2.png', -602, { x: -62, y: -50, w: 609, h: 343 }),

  /* /all-locations/ — 6472:3919. Phone 6747:2569. */
  locations: deep('/images/pages/hero-locations-v2.png', -372, { x: 0, y: -77, w: 794, h: 447, under: true }),

  /* /minnesota-recycling/ — 6744:8394 ("Location Details - Minnesota"), and
     /wisconsin-recycling/ — 6746:8473, which has a photo of its own. There is
     one phone frame (6745:6477, the Minnesota photo); Wisconsin uses its
     geometry with its own picture. */
  minnesota: deep('/images/pages/hero-minnesota.png', -372, { x: 0, y: -103, w: 815, h: 459, under: true }),
  wisconsin: deep('/images/pages/hero-wisconsin.png', -372, { x: 0, y: -103, w: 815, h: 459, under: true }),

  /* 6472:3934. Phone 6687:3526. */
  whyChooseUs: deep('/images/pages/hero-why-choose-us-v2.png', -422, { x: -75, y: -42, w: 582, h: 328 }),

  /* 6472:3949. Phone 6695:3648. */
  certifications: deep('/images/pages/hero-certifications-v2.png', -422, { x: -53.66, y: 0, w: 497.317, h: 280 }),

  /* 6472:3964 — green wash 1935 wide at x-15. Phone 6687:3535. */
  sustainability: deep('/images/pages/hero-sustainability.png', -422, { x: -13, y: -34, w: 592, h: 333 },
    {}, { navy: { x: 0, w: 1920 }, green: { x: -15, w: 1935 } }),

  /* 6478:5152. Phone 6687:3554. */
  faqs: deep('/images/pages/hero-faqs-v2.png', -422, { x: 0, y: -13, w: 514, h: 289, under: true }),

  /* 6478:5167. Phone 6687:3545. */
  downloads: deep('/images/pages/hero-downloads-v2.png', -422, { x: 0, y: -9, w: 505, h: 285, under: true }),

  /* /it-asset-disposition/ — 6778:2948. The washes moved back to 1937 at
     x-17 (they were pushed off to the left on 23 Sep). Phone 6778:3347. */
  itad: deep('/images/itad/hero-v2.png', -332, { x: 0, y: -60, w: 705, h: 397, under: true },
    {}, { navy: { x: -17, w: 1937 }, green: { x: 0, w: 1937 } }),

  /* 6478:4384. Phone 6687:3581, whose washes start at x-194. */
  guides: deep('/images/pages/hero-guides-v2.png', -422,
    { x: -223, y: -241.94, w: 1127.711, h: 634.675, green: { x: -194, w: 1127.489 } }),

  /* 6478:4672. Phone 6687:3572, green from x-174. */
  compliance: deep('/images/pages/hero-compliance-v2.png', -422,
    { x: 0, y: -9, w: 507, h: 285, green: { x: -174, w: 1127.489 } }),

  /* 6478:5137. Phone 6687:3563. */
  caseStudies: deep('/images/pages/hero-case-studies-v2.png', -422, { x: 0, y: -25, w: 536, h: 301 }),

  /* /blog/ — 6478:4369. The Blogs phone frame (6638:2247) is a light hero
     with the photo in a card, not a navy band; the build keeps the navy band
     every other page has, so the phone placement here is Why Choose Us's. */
  blog: deep('/images/pages/hero-blog-v2.png', -422, { x: -75, y: -42, w: 582, h: 328 }),

  /* /electronic-recycle/ — the "Service Details" frame, 6989:13263 ("Hard
     drive destruction" is only the layer name). Teal: the photo fades to
     #012325 at the bottom and two greens sit over it, no navy. Phone
     6638:10136 is 360 tall. */
  electronics: {
    image: '/images/services/hero-electronics-v2.png',
    imageFill: {
      y: -205, h: 1081,
      overlay: 'linear-gradient(to bottom, rgba(5,131,139,0) 0%, #012325 100%)',
      phone: { x: -229, y: -10, w: 848, h: 478, band: 360 },
    },
    tone: 'teal',
  },
} satisfies Record<string, HeroPhoto>
