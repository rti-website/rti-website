/**
 * BLOG POSTS DELETED FROM THE SITE (3 Nov 2026, the team lead: "delete all
 * these urls"). They are imported WordPress posts that still sit in the
 * posts table, which dev and live share, so they are removed here in code:
 * src/lib/posts-db.ts leaves them out of every list, so their URLs 404 and
 * they drop out of /blog/, the category pages, the Blogs menu and the
 * sitemap. No redirect. Deleting them in Admin -> Publisher as well is fine;
 * this list then does nothing for them.
 */
export const DELETED_POST_URLS = new Set<string>([
  '/the-need-for-recycling-centers-in-rochester-a-green-solution-for-environmental-preservation/',
  '/5-misconceptions-concerning-certified-data-destruction-services/',
  '/addressing-common-misconceptions-about-recycling-centers-in-maple-grove/',
  '/electronics-recycling-provides-environmental-opportunities/',
  '/epa-awards-kansas-state-university/',
  '/how-alkaline-battery-recycling-varies-from-state-to-state/',
  '/making-minnesota-greener-how-recycle-technologies-is-promoting-responsible-recycling/',
  '/trademark-metal-recycling-and-recycle-technologies/',
  '/waste-stream-or-source-material/',
  '/what-is-the-best-way-to-do-commercial-recycling-of-your-electronics/',
  '/why-recycling-electronic-waste-is-our-last-golden-opportunity/',
])
