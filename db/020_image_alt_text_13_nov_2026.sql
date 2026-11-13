-- 020: alt text for the blog images (Aaqib, 13 Nov 2026, "alt text for images RTI.csv").
--
-- The sheet gives one alt text per image: 280 rows, 282 post and image
-- pairs (two images are used in two posts each). Three places take it:
--
--   1. posts.featured_alt, when the image is the post's featured image (its
--      og_image_url). The site now prints it as the hero picture's alt and as
--      og:image:alt / twitter:image:alt (src/lib/posts-db.ts, InteriorHeroArt,
--      src/lib/seo.ts). It is the "Alt text" field under Featured image in
--      Admin -> Posts, so it can be changed there afterwards.
--   2. The <img> tags in the post's own body (content_html) whose src is the
--      image: alt="" (or no alt) becomes the sheet's text. Only two posts have
--      body images in the sheet (EPA and Argonne). Posts written in the editor
--      keep their body in content_json too; an image node there gets the same alt.
--   3. media.alt, for the same file in the media library, so a later pick of it
--      as a featured image starts with this alt.
--
-- updated_at is NOT touched: this changes no text a reader sees, and the posts'
-- "Updated" dates and article:modified_time stay as they are.
--
-- Run once (dev and live share the database), BEFORE `npm run build`:
--   psql "$DATABASE_URL" -P pager=off -v ON_ERROR_STOP=1 -f db/020_image_alt_text_13_nov_2026.sql
-- Safe to run twice. It prints what it changed, then the sheet rows that
-- matched nothing, for a person to look at.

BEGIN;

CREATE TEMP TABLE alt_sheet (slug text, file text, file_re text, alt text) ON COMMIT DROP;
INSERT INTO alt_sheet (slug, file, file_re, alt) VALUES
  ('recycling-revolution-how-schools-go-green-in-back-to-school', '1111x694-04-1ff95e.webp', '1111x694-04-1ff95e\.webp', 'Students sorting recyclables into bins at school during a back-to-school green initiative'),
  ('university-graz-launches-battery-recycling-initiative', '1111x694-13-1-926d64.webp', '1111x694-13-1-926d64\.webp', 'Used batteries collected for recycling at a university battery recycling program'),
  ('challenges-with-e-cigarette-waste-amid-safe-disposal-shortage', '1111x694-16-0e559b.webp', '1111x694-16-0e559b\.webp', 'Discarded disposable e-cigarettes and vapes awaiting safe disposal'),
  ('tax-benefits-and-rebates-for-solar-panel-recycling', '1111x694-17-b16714.webp', '1111x694-17-b16714\.webp', 'Old solar panels being collected for recycling'),
  ('epa-awards-over-7-million-to-indiana-university', '1111x694-18-fef783.webp', '1111x694-18-fef783\.webp', 'EPA grant funding environmental research at an Indiana university'),
  ('united-states-environmental-protection-agency-news', '1111x694-19-1551dd.webp', '1111x694-19-1551dd\.webp', 'US Environmental Protection Agency news on recycling and the environment'),
  ('home-depot-banned-products', '1111x694-20-977a79.webp', '1111x694-20-977a79\.webp', 'Hazardous household products being pulled from store shelves'),
  ('drinking-water-warning-issued-nationwide', '1111x694-24-893b1a.webp', '1111x694-24-893b1a\.webp', 'Glass of tap water illustrating a nationwide drinking water warning'),
  ('rhode-island-solar-energy', '1111x694-26-0-afc76c.webp', '1111x694-26-0-afc76c\.webp', 'Solar panels installed in Rhode Island generating renewable energy'),
  ('waste-management-acquires-stericycle', '1111x694-27-1-9f981c.webp', '1111x694-27-1-9f981c\.webp', 'Waste management trucks representing the Stericycle acquisition'),
  ('national-drinking-water-standard-to-protect-100m-people-from-pfas-pollution', '1111x694-28-1-8aab8f.webp', '1111x694-28-1-8aab8f\.webp', 'Clean water flowing from a faucet, illustrating new PFAS drinking water standards'),
  ('american-stadard-rules-on-car-for-green-future', '1111x694-29-f1ca04.webp', '1111x694-29-f1ca04\.webp', 'Electric car charging, representing new vehicle emission rules for a greener future'),
  ('clean-earth-camp-lejeune', '1111x694-31-306cfd.webp', '1111x694-31-306cfd\.webp', 'Environmental cleanup work at Camp Lejeune'),
  ('fire-breaks-out-at-midtown-manhattan-e-bike-shop', '1111x694-32-1ab843.webp', '1111x694-32-1ab843\.webp', 'E-bike lithium battery fire risk at a Manhattan bike shop'),
  ('massachusetts-based-lt-governor-kim-driscoll-bags-the-recycling-impact-award-2024', '1111x694-9-61356d.png', '1111x694-9-61356d\.png', 'Massachusetts recycling award recognizing environmental leadership'),
  ('how-recycle-technologies-is-leading-the-way-in-washington-county', '7xm-xyz340682-1-aadac5.jpg', '7xm-xyz340682-1-aadac5\.jpg', 'Electronic waste collected for recycling in Washington County, Minnesota'),
  ('sustainability-in-richfield-recycling-with-recycle-technologies', '7xm-xyz380890-1-27d6f3.jpg', '7xm-xyz380890-1-27d6f3\.jpg', 'Recycling bins for sustainable waste disposal in Richfield, Minnesota'),
  ('effortless-recycling-in-minnetonka-recycle-technologies-flexible-e-waste-recycling-services', '7xm-xyz385662-1-1430ce.jpg', '7xm-xyz385662-1-1430ce\.jpg', 'Old electronics gathered for e-waste recycling in Minnetonka, Minnesota'),
  ('embracing-a-greener-tomorrow-recycling-electronics-responsibly-in-blaine-mn', '7xm-xyz468733-1-973efa.jpg', '7xm-xyz468733-1-973efa\.jpg', 'Electronics recycled responsibly at Recycle Technologies in Blaine, MN'),
  ('recycle-technologies-pioneering-green-innovations-in-edina', '7xm-xyz587785-1-9edf7b.jpg', '7xm-xyz587785-1-9edf7b\.jpg', 'Sorted e-waste ready for green recycling in Edina, Minnesota'),
  ('promoting-sustainable-practices-recycling-in-scott-county-with-recycle-technologies', '7xm-xyz634593-1-4d7e68.jpg', '7xm-xyz634593-1-4d7e68\.jpg', 'Recycling collection supporting sustainable practices in Scott County, Minnesota'),
  ('how-recycle-technologies-is-elevating-e-waste-management-in-brooklyn-park', '7xm-xyz664254-1-40258f.jpg', '7xm-xyz664254-1-40258f\.jpg', 'E-waste management and electronics recycling in Brooklyn Park, Minnesota'),
  ('recycle-technologies-plymouths-cutting-edge-recycling-center', '7xm-xyz868436-1-02f03e.jpg', '7xm-xyz868436-1-02f03e\.jpg', 'Electronics recycling center serving Plymouth, Minnesota'),
  ('how-recycle-technologies-is-transforming-duluths-environmental-landscape', '7xm-xyz939687-1-5539b8.jpg', '7xm-xyz939687-1-5539b8\.jpg', 'Electronic waste recycling supporting the environment in Duluth, Minnesota'),
  ('on-transforming-recycling-solutions-in-olmsted-county', '7xm-xyz964500-1-975c2c.jpg', '7xm-xyz964500-1-975c2c\.jpg', 'Recycling solutions for electronics in Olmsted County, Minnesota'),
  ('how-businesses-in-east-bethel-are-embracing-recycling', 'east-bethel-ebfa21.jpg', 'east-bethel-ebfa21\.jpg', 'Local businesses recycling electronics in East Bethel, Minnesota'),
  ('florida-fluorescent-bulb-recycling-regulations', 'florida-fluorescent-bulb-recycling-regulations-b02b49.jpg', 'florida-fluorescent-bulb-recycling-regulations-b02b49\.jpg', 'Used fluorescent bulbs collected for recycling under Florida regulations'),
  ('year-in-review-2023-e-waste-recycling-news-that-amazed-us-part-3-of-4', 'lakeville-35edd6.webp', 'lakeville-35edd6\.webp', 'E-waste recycling in Lakeville, Minnesota'),
  ('unveiling-oak-creek-e-waste-revolution', 'oak-creek-7b859b.jpg', 'oak-creek-7b859b\.jpg', 'Electronic waste recycling in Oak Creek, Wisconsin'),
  ('year-in-review-2023-e-waste-recycling-news-that-amazed-us-part-4', 'oak-creek-7b859b.jpg', 'oak-creek-7b859b\.jpg', 'Electronic waste recycling in Oak Creek, Wisconsin'),
  ('e-waste-recycling-services-and-solutions-in-oakdale', 'oakdale-minnesota-31e3e3.jpg', 'oakdale-minnesota-31e3e3\.jpg', 'E-waste recycling services in Oakdale, Minnesota'),
  ('argonne-national-laboratory-strives-to-reduce-e-waste-through-biodegradable-luminescent-polymers', 'unnamed-1-c5c126.png', 'unnamed-1-c5c126\.png', 'Argonne National Laboratory research on biodegradable polymers to reduce e-waste'),
  ('epa-and-white-house-honor-environmental-leaders-with-prestigious-awards', 'unnamed-a67196.png', 'unnamed-a67196\.png', 'Environmental leaders honored by the EPA and the White House'),
  ('fluorescent-tube-disposal-kits-through-mail-in-recycling-service', 'untitled-design-1-1-cbdf3f.png', 'untitled-design-1-1-cbdf3f\.png', 'Fluorescent tubes packed in a mail-in disposal kit'),
  ('about-mercury-recycling-future-trends', 'untitled-design-1-32e3db.png', 'untitled-design-1-32e3db\.png', 'Mercury-containing lamps and thermostats collected for mercury recycling'),
  ('five-every-day-items-to-recycle', 'untitled-design-1-64afff.png', 'untitled-design-1-64afff\.png', 'Everyday recyclable items such as bottles, cans and paper'),
  ('how-e-waste-recycling-create-opportunities', 'untitled-design-10-1-6168ca.png', 'untitled-design-10-1-6168ca\.png', 'Workers sorting e-waste, showing job opportunities created by recycling'),
  ('are-there-any-electronics-recycling-near-me', 'untitled-design-10-912a2b.png', 'untitled-design-10-912a2b\.png', 'Old electronics dropped off at a nearby electronics recycling center'),
  ('battery-recycling-and-bipartisan-law', 'untitled-design-11-0f6904.png', 'untitled-design-11-0f6904\.png', 'Used batteries collected for recycling under new bipartisan legislation'),
  ('how-has-ev-battery-recycling-progressed-over-the-years', 'untitled-design-11-1-873415.png', 'untitled-design-11-1-873415\.png', 'Electric vehicle battery packs being recycled'),
  ('how-important-is-the-future-of-ev-battery-recycling', 'untitled-design-12-1-88c4d0.png', 'untitled-design-12-1-88c4d0\.png', 'Electric vehicle battery recycling for a sustainable future'),
  ('battery-recycling-and-recycle-techn', 'untitled-design-12-bc7a76.png', 'untitled-design-12-bc7a76\.png', 'Spent batteries collected by Recycle Technologies for recycling'),
  ('how-lamp-recycling-will-help-reduce-carbon-emissions-and-e-waste', 'untitled-design-13-1-8fc2d0.png', 'untitled-design-13-1-8fc2d0\.png', 'Used lamps recycled to reduce carbon emissions and e-waste'),
  ('battery-recycling-in-bloomington-minnesota', 'untitled-design-13-941a3e.png', 'untitled-design-13-941a3e\.png', 'Household batteries collected for recycling in Bloomington, Minnesota'),
  ('how-recycle-technologies-is-boosting-e-waste-recycling-in-st-cloud', 'untitled-design-14-1-be56c7.png', 'untitled-design-14-1-be56c7\.png', 'E-waste recycling in St. Cloud, Minnesota'),
  ('battery-recycling-is-a-dilemma-and-why-should-we-be-serious-about-it', 'untitled-design-14-665aeb.png', 'untitled-design-14-665aeb\.png', 'Pile of discarded batteries highlighting the battery recycling problem'),
  ('how-recycle-technologies-promotes-sustainability-for-coon-rapids-residents', 'untitled-design-15-1-1caa04.png', 'untitled-design-15-1-1caa04\.png', 'Electronics recycling supporting sustainability in Coon Rapids, Minnesota'),
  ('benefits-of-recycling-e-waste', 'untitled-design-15-9c1e67.png', 'untitled-design-15-9c1e67\.png', 'Recycling bins for e-waste showing the benefits of recycling electronics'),
  ('how-recycle-technologies-reduces-of-electronic-waste', 'untitled-design-16-1-45d3f7.png', 'untitled-design-16-1-45d3f7\.png', 'Electronic waste being reduced through responsible recycling'),
  ('better-recycling', 'untitled-design-16-879b0a.png', 'untitled-design-16-879b0a\.png', 'Paper documents and computer screens showing how technology is changing recycling'),
  ('electronic-waste-recycling-greener-planet-secure-data', 'untitled-design-17-07003d.png', 'untitled-design-17-07003d\.png', 'Old computers recycled with secure data destruction for a greener planet'),
  ('burnsvilles-sustainable-recycling-revolution-with-recycle-technologies', 'untitled-design-17-1-1024x716-4367a6.png', 'untitled-design-17-1-1024x716-4367a6\.png', 'Sustainable recycling services in Burnsville, Minnesota'),
  ('how-to-dispose-a-laptop-battery', 'untitled-design-17-1-e9f0a7.png', 'untitled-design-17-1-e9f0a7\.png', 'Used laptop battery ready for safe disposal'),
  ('how-to-dispose-of-a-coffee-maker', 'untitled-design-18-1-7e2270.png', 'untitled-design-18-1-7e2270\.png', 'Old coffee maker ready for recycling'),
  ('can-proper-electronic-disposal-help-us-reduce-our-carbon-footprint', 'untitled-design-18-123ce8.png', 'untitled-design-18-123ce8\.png', 'Electronic waste disposal helping reduce carbon footprint'),
  ('how-to-dispose-of-a-computer-monitor', 'untitled-design-19-1-265d6c.png', 'untitled-design-19-1-265d6c\.png', 'Old computer monitor ready for proper disposal'),
  ('celebrating-america-recycles-day-2023', 'untitled-design-19-1-e268ee.png', 'untitled-design-19-1-e268ee\.png', 'Recycling bins celebrating America Recycles Day 2023'),
  ('top-five-benefits-of-recycling-e-waste-using-recycling-kits', 'untitled-design-19-9dd4a8.png', 'untitled-design-19-9dd4a8\.png', 'Mail-in e-waste recycling kit with old electronics'),
  ('from-waste-to-resource-benefits-business-can-reap-from-recycling-centers-in-st-p', 'untitled-design-2-1-161254.png', 'untitled-design-2-1-161254\.png', 'Business recycling waste at a recycling center in St. Paul, Minnesota'),
  ('amazing-benefits-of-mobile-shredding', 'untitled-design-2-42f75b.png', 'untitled-design-2-42f75b\.png', 'Mobile shredding truck securely destroying confidential documents on site'),
  ('how-to-dispose-of-a-flat-screen-tv', 'untitled-design-20-1-3c147e.png', 'untitled-design-20-1-3c147e\.png', 'Old flat screen TV ready for recycling'),
  ('circular-economy-battery-recycling', 'untitled-design-20-59b0eb.png', 'untitled-design-20-59b0eb\.png', 'Recycled battery materials in a circular economy'),
  ('pros-of-recycling-ways-to-build-a-greener-tomorrow', 'untitled-design-2024-05-13t155118-109-1-97d194.png', 'untitled-design-2024-05-13t155118-109-1-97d194\.png', 'Recycling bins sorting waste for a greener tomorrow'),
  ('uncovering-the-cons-of-recycling-and-its-impact-on-the-environment', 'untitled-design-2024-05-13t162640-532-1-532aed.png', 'untitled-design-2024-05-13t162640-532-1-532aed\.png', 'Overflowing waste illustrating the drawbacks of recycling'),
  ('how-to-properly-dispose-of-a-microwave', 'untitled-design-2024-05-13t170811-403-1-c05a33.png', 'untitled-design-2024-05-13t170811-403-1-c05a33\.png', 'Old microwave ready for proper disposal'),
  ('how-to-get-rid-of-a-microwave', 'untitled-design-2024-05-13t171834-626-b1fc6e.png', 'untitled-design-2024-05-13t171834-626-b1fc6e\.png', 'Unwanted microwave oven ready to be recycled'),
  ('what-to-do-with-an-old-microwave', 'untitled-design-2024-05-27t160449-536-2-1dbf44.png', 'untitled-design-2024-05-27t160449-536-2-1dbf44\.png', 'Old microwave oven set aside for recycling'),
  ('happy-40th-anniversary-earth-day-2', 'untitled-design-2024-07-10t175815-576-165c46.png', 'untitled-design-2024-07-10t175815-576-165c46\.png', 'Earth Day celebration of environmental protection'),
  ('why-your-choice-of-recycling-center-vital', 'untitled-design-2024-07-10t175950-380-296488.png', 'untitled-design-2024-07-10t175950-380-296488\.png', 'Recycling center accepting electronics and other materials'),
  ('why-there-is-a-need-for-better-strategies-for-e-waste-recycling', 'untitled-design-2024-07-10t180220-868-a46421.png', 'untitled-design-2024-07-10t180220-868-a46421\.png', 'Piles of e-waste showing the need for better recycling strategies'),
  ('why-the-next-decade-is-essential-for-battery-recycling', 'untitled-design-2024-07-10t180547-551-818379.png', 'untitled-design-2024-07-10t180547-551-818379\.png', 'Spent batteries highlighting the importance of battery recycling'),
  ('why-television-recycling-will-become-obsolete-in-the-future', 'untitled-design-2024-07-10t180817-714-0956f5.png', 'untitled-design-2024-07-10t180817-714-0956f5\.png', 'Stack of old televisions awaiting recycling'),
  ('why-should-we-recycle-electronic-waste', 'untitled-design-2024-07-10t181443-638-aedf6f.png', 'untitled-design-2024-07-10t181443-638-aedf6f\.png', 'Discarded electronic waste collected for recycling'),
  ('why-recycling-batteries-is-important-if-we-want-to-reduce-our-carbon-footprint', 'untitled-design-2024-07-10t182257-216-cded65.png', 'untitled-design-2024-07-10t182257-216-cded65\.png', 'Used batteries recycled to reduce carbon footprint'),
  ('why-reduce-reuse-recycle-is-more-relevant-now-than-before', 'untitled-design-2024-07-10t182445-246-b78e59.png', 'untitled-design-2024-07-10t182445-246-b78e59\.png', 'Reduce, reuse, recycle symbol on recycling bins'),
  ('why-recycle-technologies-is-great-for-hard-drive-degaussing', 'untitled-design-2024-07-10t182858-032-531df5.png', 'untitled-design-2024-07-10t182858-032-531df5\.png', 'Hard drive being degaussed to securely erase data'),
  ('why-it-is-illegal-to-throw-away-electronics-why-does-electronics-recycling-matter', 'untitled-design-2024-07-10t183428-474-4c745d.png', 'untitled-design-2024-07-10t183428-474-4c745d\.png', 'Discarded electronics that cannot legally be thrown in the trash'),
  ('why-is-tv-recycling-preferable-choice-to-minimize-ecological-footprint', 'untitled-design-2024-07-10t183738-361-ed8bf6.png', 'untitled-design-2024-07-10t183738-361-ed8bf6\.png', 'Old televisions recycled to minimize environmental impact'),
  ('why-is-rti-the-best-ballast-recycling-company', 'untitled-design-2024-07-10t184151-480-4268c1.png', 'untitled-design-2024-07-10t184151-480-4268c1\.png', 'Lighting ballasts collected for recycling'),
  ('why-is-recycling-a-computer-important', 'untitled-design-2024-07-10t184434-416-dd624a.png', 'untitled-design-2024-07-10t184434-416-dd624a\.png', 'Old desktop computer ready for recycling'),
  ('why-is-legislation-important-for-electronic-waste-recycling', 'untitled-design-2024-07-10t184724-832-5bb772.png', 'untitled-design-2024-07-10t184724-832-5bb772\.png', 'Electronic waste regulated by recycling legislation'),
  ('why-is-it-crucial-to-recycle-mercury', 'untitled-design-2024-07-10t184916-469-374396.png', 'untitled-design-2024-07-10t184916-469-374396\.png', 'Mercury-containing items collected for safe mercury recycling'),
  ('why-electronic-waste-disposal-is-the-culprit-for-growing-e-waste', 'untitled-design-2024-07-10t185101-499-1724e6.png', 'untitled-design-2024-07-10t185101-499-1724e6\.png', 'Growing pile of improperly discarded electronic waste'),
  ('why-e-waste-recycling-is-the-only-solution-to-this-toxic-crisis', 'untitled-design-2024-07-11t112427-392-044346.png', 'untitled-design-2024-07-11t112427-392-044346\.png', 'Toxic e-waste dump showing the need for proper recycling'),
  ('why-e-waste-recycling-in-minnesota-is-in-a-tailspin', 'untitled-design-2024-07-11t113333-253-e32953.png', 'untitled-design-2024-07-11t113333-253-e32953\.png', 'Electronic waste piling up in Minnesota'),
  ('why-does-the-future-of-electronic-waste-disposal-rest-on-our-shoulders', 'untitled-design-2024-07-11t114055-203-e07b0b.png', 'untitled-design-2024-07-11t114055-203-e07b0b\.png', 'Hands holding old electronics, showing shared responsibility for e-waste'),
  ('why-does-recycle-technologies-offer-the-best-lamp-recycling-in-minnesota', 'untitled-design-2024-07-11t114627-818-aecbf8.png', 'untitled-design-2024-07-11t114627-818-aecbf8\.png', 'Used lamps and bulbs collected for recycling in Minnesota'),
  ('why-does-battery-recycling-matter-what-are-the-benefits-of-battery-recycling', 'untitled-design-2024-07-11t120701-261-c61375.png', 'untitled-design-2024-07-11t120701-261-c61375\.png', 'Assorted used batteries collected for recycling'),
  ('why-does-battery-recycling-matter-more', 'untitled-design-2024-07-11t122658-369-aea41d.png', 'untitled-design-2024-07-11t122658-369-aea41d\.png', 'Spent household batteries ready for recycling'),
  ('why-do-you-need-smoke-detector-kits-for-proper-disposal', 'untitled-design-2024-07-11t123248-613-84aee5.png', 'untitled-design-2024-07-11t123248-613-84aee5\.png', 'Old smoke detectors packed in a disposal kit'),
  ('why-cobalt-and-lithium-crucial-for-battery-recycling', 'untitled-design-2024-07-11t123736-822-8f5197.png', 'untitled-design-2024-07-11t123736-822-8f5197\.png', 'Cobalt and lithium materials recovered through battery recycling'),
  ('why-choose-recycle-technologies-for-your-laptop-recycling-in-wisconsin', 'untitled-design-2024-07-11t124555-317-5bab09.png', 'untitled-design-2024-07-11t124555-317-5bab09\.png', 'Used laptops collected for recycling in Wisconsin'),
  ('why-chemical-recycling-is-a-bad-call-for-resolving-our-electronic-waste-problem', 'untitled-design-2024-07-11t130619-353-39da3e.png', 'untitled-design-2024-07-11t130619-353-39da3e\.png', 'Electronic waste awaiting recycling, illustrating the chemical recycling debate'),
  ('why-are-recycle-laptops-gaining-global-attention-to-reduce-energy-intensive-production', 'untitled-design-2024-07-11t132440-591-6a9315.png', 'untitled-design-2024-07-11t132440-591-6a9315\.png', 'Old laptops collected for recycling to reduce energy-intensive production'),
  ('why-are-microwave-ovens-the-focus-of-electronic-waste', 'untitled-design-2024-07-11t133217-943-1-1c2eb0.png', 'untitled-design-2024-07-11t133217-943-1-1c2eb0\.png', 'Discarded microwave ovens contributing to electronic waste'),
  ('which-is-the-best-tv-recycling-near-me', 'untitled-design-2024-07-11t133942-949-9b5f50.png', 'untitled-design-2024-07-11t133942-949-9b5f50\.png', 'Old televisions at a TV recycling drop-off'),
  ('what-to-do-with-your-old-printers-and-scanners', 'untitled-design-2024-07-11t134416-768-04b899.png', 'untitled-design-2024-07-11t134416-768-04b899\.png', 'Old printers and scanners ready for recycling'),
  ('what-to-do-with-old-printers', 'untitled-design-2024-07-11t135239-089-e806ed.png', 'untitled-design-2024-07-11t135239-089-e806ed\.png', 'Used printer ready for recycling'),
  ('what-to-do-with-old-phones', 'untitled-design-2024-07-11t135645-617-c2909d.png', 'untitled-design-2024-07-11t135645-617-c2909d\.png', 'Old smartphones collected for recycling'),
  ('what-to-do-with-old-cds', 'untitled-design-2024-07-11t152420-809-203da1.png', 'untitled-design-2024-07-11t152420-809-203da1\.png', 'Stack of old CDs ready for recycling'),
  ('what-to-do-with-a-dead-graphic-card-should-i-recycle-it-or-not', 'untitled-design-2024-07-11t152830-483-d3599c.png', 'untitled-design-2024-07-11t152830-483-d3599c\.png', 'Dead graphics card removed from a computer for recycling'),
  ('what-is-the-process-of-electronic-recycling', 'untitled-design-2024-07-11t153532-527-6afdea.png', 'untitled-design-2024-07-11t153532-527-6afdea\.png', 'Electronic waste sorted at a recycling facility'),
  ('what-is-the-importance-of-cpu-in-computer-recycling', 'untitled-design-2024-07-11t154342-412-ee65fc.png', 'untitled-design-2024-07-11t154342-412-ee65fc\.png', 'Computer CPU chips recovered during computer recycling'),
  ('what-is-recycling-is-electronic-recycling-free', 'untitled-design-2024-07-11t160803-450-d8ef6b.png', 'untitled-design-2024-07-11t160803-450-d8ef6b\.png', 'Electronics dropped off for free recycling'),
  ('what-happens-to-keyboards-during-electronic-scrap-recycling', 'untitled-design-2024-07-11t161352-118-ee6d38.png', 'untitled-design-2024-07-11t161352-118-ee6d38\.png', 'Old computer keyboards being broken down for scrap recycling'),
  ('what-dangers-of-e-waste-lurk-when-you-dont-recycle', 'untitled-design-2024-07-11t162340-910-5538a5.png', 'untitled-design-2024-07-11t162340-910-5538a5\.png', 'Hazardous electronic waste left in a landfill'),
  ('watch-battery-recycling', 'untitled-design-2024-07-11t164247-089-339ac8.png', 'untitled-design-2024-07-11t164247-089-339ac8\.png', 'Used watch batteries ready for recycling'),
  ('waste-not-want-not-the-electronic-waste-dilemma-and-how-to-reduce-it', 'untitled-design-2024-07-11t172812-532-bdbd0a.png', 'untitled-design-2024-07-11t172812-532-bdbd0a\.png', 'Heap of electronic waste showing the e-waste problem'),
  ('unveiling-the-willingness-for-electronic-recycling-to-adopt-a-sustainable-approach', 'untitled-design-2024-07-11t173553-296-7c33f6.png', 'untitled-design-2024-07-11t173553-296-7c33f6\.png', 'Electronics recycling supporting a sustainable approach'),
  ('unveiling-the-hidden-side-the-disadvantages-of-recycling-explained', 'untitled-design-2024-07-11t175014-332-7b1bc4.png', 'untitled-design-2024-07-11t175014-332-7b1bc4\.png', 'Recycling materials illustrating the hidden disadvantages of recycling'),
  ('top-reasons-to-choose-recycle-technologies-for-e-waste-recycling-in-racine', 'untitled-design-2024-07-11t181134-175-193afe.png', 'untitled-design-2024-07-11t181134-175-193afe\.png', 'E-waste recycling services in Racine, Wisconsin'),
  ('this-thanksgiving-choose-recycle-technologies-to-dispose-your-electronic-waste', 'untitled-design-2024-07-11t183524-510-590f32.png', 'untitled-design-2024-07-11t183524-510-590f32\.png', 'Old electronics collected for recycling at Thanksgiving'),
  ('the-right-battery-recycling-company', 'untitled-design-2024-07-11t190149-251-a9f18c.png', 'untitled-design-2024-07-11t190149-251-a9f18c\.png', 'Used batteries handed to a battery recycling company'),
  ('the-power-of-car-battery-recycling', 'untitled-design-2024-07-11t191857-810-fe7008.png', 'untitled-design-2024-07-11t191857-810-fe7008\.png', 'Used car battery being removed for recycling'),
  ('the-importance-of-air-conditioner-disposal-and-its-effects', 'untitled-design-2024-07-12t113158-623-16268b.png', 'untitled-design-2024-07-12t113158-623-16268b\.png', 'Old air conditioner unit ready for proper disposal'),
  ('the-environmental-benefits-of-car-battery-recycling', 'untitled-design-2024-07-12t113724-759-1dab0c.png', 'untitled-design-2024-07-12t113724-759-1dab0c\.png', 'Used car batteries collected for environmentally safe recycling'),
  ('the-economics-of-mercury-recycling', 'untitled-design-2024-07-12t114207-826-debb66.png', 'untitled-design-2024-07-12t114207-826-debb66\.png', 'Mercury lamps and devices with recoverable value through recycling'),
  ('the-benefits-of-it-asset-disposition-services-in-the-usa', 'untitled-design-2024-07-12t115258-106-1024x683-6f3899.png', 'untitled-design-2024-07-12t115258-106-1024x683-6f3899\.png', 'Retired IT equipment processed by IT asset disposition services'),
  ('tesla-battery-recycling-secrets', 'untitled-design-2024-07-12t120952-866-2b6e32.png', 'untitled-design-2024-07-12t120952-866-2b6e32\.png', 'Tesla battery pack being recycled'),
  ('taking-responsibility-for-sustainability-initiatives-in-green-bay', 'untitled-design-2024-07-12t122025-598-0595ed.png', 'untitled-design-2024-07-12t122025-598-0595ed\.png', 'Electronics recycling supporting sustainability in Green Bay, Wisconsin'),
  ('sustainable-ups-battery-recycling', 'untitled-design-2024-07-12t123951-394-0ccc86.png', 'untitled-design-2024-07-12t123951-394-0ccc86\.png', 'UPS backup batteries collected for sustainable recycling'),
  ('social-responsibility-recycling', 'untitled-design-2024-07-12t124603-885-5fbea7.png', 'untitled-design-2024-07-12t124603-885-5fbea7\.png', 'Community recycling as part of corporate social responsibility'),
  ('significance-of-ups-battery-recycling', 'untitled-design-2024-07-12t125044-122-0f1e13.png', 'untitled-design-2024-07-12t125044-122-0f1e13\.png', 'Used UPS backup batteries ready for recycling'),
  ('sham-lighting-recyclers-are-you-at-risk', 'untitled-design-2024-07-12t130144-194-4218c0.png', 'untitled-design-2024-07-12t130144-194-4218c0\.png', 'Fluorescent lamps at risk of being handled by sham recyclers'),
  ('rti-make-difference-with-mercury-recycling', 'untitled-design-2024-07-12t132110-475-220b50.png', 'untitled-design-2024-07-12t132110-475-220b50\.png', 'Mercury-containing waste safely handled for recycling'),
  ('reliable-recycling-centers-in-woodbury-an-easy-solution-for-citizens', 'untitled-design-2024-07-12t133201-777-da9eca.png', 'untitled-design-2024-07-12t133201-777-da9eca\.png', 'Recycling center serving residents in Woodbury, Minnesota'),
  ('reduce-reuse-recycle-re-examine', 'untitled-design-2024-07-12t134643-574-6dc123.png', 'untitled-design-2024-07-12t134643-574-6dc123\.png', 'Reduce, reuse, recycle symbol with recyclable materials'),
  ('year-in-review-2023-e-waste-recycling-news-that-amazed-us-part-2-of-4', 'untitled-design-2024-07-12t134643-574-6dc123.png', 'untitled-design-2024-07-12t134643-574-6dc123\.png', 'Reduce, reuse, recycle symbol with recyclable materials'),
  ('reduce-reuse-and-recycle-e-waste', 'untitled-design-2024-07-12t135247-148-7c94e7.png', 'untitled-design-2024-07-12t135247-148-7c94e7\.png', 'Electronic waste being reduced, reused and recycled'),
  ('recycling-technologies-in-bloomington-all-what-you-need-to-know', 'untitled-design-2024-07-12t140745-396-e5c7f3.png', 'untitled-design-2024-07-12t140745-396-e5c7f3\.png', 'Recycling services in Bloomington, Minnesota'),
  ('recycling-myths-busted-by-recycle-technologies', 'untitled-design-2024-07-12t141218-222-d82652.png', 'untitled-design-2024-07-12t141218-222-d82652\.png', 'Recycling bins with common recycling myths explained'),
  ('recycling-is-a-dirty-word', 'untitled-design-2024-07-12t153155-438-708cde.png', 'untitled-design-2024-07-12t153155-438-708cde\.png', 'Mixed recyclables in a bin, rethinking how we recycle'),
  ('recycling-benefits-and-challenges', 'untitled-design-2024-07-12t155618-361-75ba57.png', 'untitled-design-2024-07-12t155618-361-75ba57\.png', 'Recycled materials showing the benefits and challenges of recycling'),
  ('recycling-batteries', 'untitled-design-2024-07-12t160338-831-3745cc.png', 'untitled-design-2024-07-12t160338-831-3745cc\.png', 'Used batteries sorted for recycling'),
  ('recycle-technologies-spotlight-electronic-recycling-in-ramsey', 'untitled-design-2024-07-12t161847-214-409ddd.png', 'untitled-design-2024-07-12t161847-214-409ddd\.png', 'Electronic recycling in Ramsey County, Minnesota'),
  ('recycle-technologies-services-in-hennepin-county-partnering-for-a-greener-future', 'untitled-design-2024-07-12t163433-634-158a2f.png', 'untitled-design-2024-07-12t163433-634-158a2f\.png', 'Electronics recycling services in Hennepin County, Minnesota'),
  ('recycle-technologies-leading-the-charge-in-sustainable-solutions-for-waukesha', 'untitled-design-2024-07-12t172422-218-d40cb8.png', 'untitled-design-2024-07-12t172422-218-d40cb8\.png', 'Sustainable recycling solutions in Waukesha, Wisconsin'),
  ('recycle-technologies-empowers-lakeville-for-a-better-future', 'untitled-design-2024-07-12t173432-539-1832a0.png', 'untitled-design-2024-07-12t173432-539-1832a0\.png', 'Recycling services in Lakeville, Minnesota'),
  ('manage-you-waste-by-recycling', 'untitled-design-2024-07-13t083428-931-13ea7a.png', 'untitled-design-2024-07-13t083428-931-13ea7a\.png', 'Sorted recycling bins for better waste management'),
  ('making-recycling-easier-with-recycling-kits-this-christmas', 'untitled-design-2024-07-13t084021-340-59b1d0.png', 'untitled-design-2024-07-13t084021-340-59b1d0\.png', 'Mail-in recycling kit for unwanted electronics at Christmas'),
  ('lithium-ion-batteries-recycling', 'untitled-design-2024-07-13t090316-687-e249d4.png', 'untitled-design-2024-07-13t090316-687-e249d4\.png', 'Lithium-ion batteries collected for recycling'),
  ('lithium-battery-recycling-in-wisconsin-is-this-the-new-normal', 'untitled-design-2024-07-13t091325-110-175116.png', 'untitled-design-2024-07-13t091325-110-175116\.png', 'Lithium batteries collected for recycling in Wisconsin'),
  ('led-bulb-recycling', 'untitled-design-2024-07-13t091532-901-8847c6.png', 'untitled-design-2024-07-13t091532-901-8847c6\.png', 'Used LED bulbs ready for recycling'),
  ('how-to-dispose-small-appliances-safely-and-responsibly', 'untitled-design-2024-07-23t142844-640-08134a.png', 'untitled-design-2024-07-23t142844-640-08134a\.png', 'Small kitchen appliances ready for safe disposal'),
  ('how-to-dispose-of-washer-and-dryer-a-complete-guide', 'untitled-design-2024-07-23t151535-175-42c5cb.png', 'untitled-design-2024-07-23t151535-175-42c5cb\.png', 'Old washer and dryer ready for disposal'),
  ('itad-services-explained-secure-your-it-asset-disposal', 'untitled-design-2024-07-23t170452-542-ce3d44.png', 'untitled-design-2024-07-23t170452-542-ce3d44\.png', 'Retired IT equipment handled through secure IT asset disposition'),
  ('understanding-what-is-e-waste-recycling', 'untitled-design-2024-07-24t170836-031-5b1a6e.png', 'untitled-design-2024-07-24t170836-031-5b1a6e\.png', 'Electronic waste collected for recycling'),
  ('why-is-recycling-important-10-benefits-of-e-waste-recycling', 'untitled-design-2024-07-24t172812-887-7e1e26.png', 'untitled-design-2024-07-24t172812-887-7e1e26\.png', 'Old electronics recycled for environmental benefits'),
  ('what-is-e-waste-how-does-e-waste-recycling-work', 'untitled-design-2024-07-24t180313-035-079151.png', 'untitled-design-2024-07-24t180313-035-079151\.png', 'E-waste being sorted at a recycling facility'),
  ('electronics-recycling-near-me-recycle-technologies-services', 'untitled-design-2024-07-24t181631-110-699d7f.png', 'untitled-design-2024-07-24t181631-110-699d7f\.png', 'Electronics dropped off at a nearby recycling center'),
  ('where-to-recycle-batteries-battery-recycling-near-me', 'untitled-design-2024-07-24t190632-421-8b838a.png', 'untitled-design-2024-07-24t190632-421-8b838a\.png', 'Used batteries at a battery recycling drop-off'),
  ('lithium-ion-battery-recycling-process-a-definitive-guide', 'untitled-design-2024-07-24t191640-379-64eff5.png', 'untitled-design-2024-07-24t191640-379-64eff5\.png', 'Lithium-ion battery recycling process at a facility'),
  ('the-basics-of-e-waste-recycling', 'untitled-design-2024-07-24t193019-682-ff3c76.png', 'untitled-design-2024-07-24t193019-682-ff3c76\.png', 'Assorted e-waste explaining the basics of electronics recycling'),
  ('household-battery-recycling-near-me-a-comprehensive-guide', 'untitled-design-2024-07-25t120951-232-4f9614.png', 'untitled-design-2024-07-25t120951-232-4f9614\.png', 'Household batteries collected for recycling'),
  ('best-choice-for-computer-recycling', 'untitled-design-2024-07-25t122245-912-abdd2a.png', 'untitled-design-2024-07-25t122245-912-abdd2a\.png', 'Old computers collected for recycling'),
  ('recycling-near-me-the-best-choice-for-business-e-waste', 'untitled-design-2024-07-25t124420-221-1ebab7.png', 'untitled-design-2024-07-25t124420-221-1ebab7\.png', 'Business e-waste collected for recycling'),
  ('finding-the-perfect-recycle-center-near-me', 'untitled-design-2024-07-25t133847-831-79da1c.png', 'untitled-design-2024-07-25t133847-831-79da1c\.png', 'Recycling center accepting electronic waste'),
  ('how-recycling-practices-can-lead-to-environmental-sustainability', 'untitled-design-2024-07-25t140230-298-19b878.png', 'untitled-design-2024-07-25t140230-298-19b878\.png', 'Recycling practices supporting environmental sustainability'),
  ('whom-to-trust-if-i-want-to-recycle-my-phone', 'untitled-design-2024-07-25t152249-092-1e096d.png', 'untitled-design-2024-07-25t152249-092-1e096d\.png', 'Old phone ready to be recycled'),
  ('effortless-waste-management-best-way-disposal-revealed', 'untitled-design-2024-07-25t153530-398-16c106.png', 'untitled-design-2024-07-25t153530-398-16c106\.png', 'Sorted waste bins for easy and proper disposal'),
  ('exploring-the-positive-effects-of-e-waste-recycling', 'untitled-design-2024-07-26t120149-982-4118d8.png', 'untitled-design-2024-07-26t120149-982-4118d8\.png', 'Recycled e-waste materials showing positive environmental effects'),
  ('recycling-leading-the-way-in-sustainable-waste-management', 'untitled-design-2024-07-26t121230-369-92135c.png', 'untitled-design-2024-07-26t121230-369-92135c\.png', 'Recycling bins supporting sustainable waste management'),
  ('best-buy-recycling-company-recycletechnology-choose-wisely', 'untitled-design-2024-07-30t162702-554-d6d5cd.png', 'untitled-design-2024-07-30t162702-554-d6d5cd\.png', 'Old electronics compared at a store recycling program'),
  ('secure-it-asset-disposition-services-near-me-as-a-business-owner', 'untitled-design-2024-07-30t164026-797-baf122.png', 'untitled-design-2024-07-30t164026-797-baf122\.png', 'Secure IT asset disposition services for business equipment'),
  ('reliable-ev-battery-recycling-companies', 'untitled-design-2024-07-30t165619-279-124446.png', 'untitled-design-2024-07-30t165619-279-124446\.png', 'Electric vehicle batteries handled by an EV battery recycling company'),
  ('eco-friendly-solutions-led-bulb-recycling-near-me', 'untitled-design-2024-07-30t172819-377-0215e7.png', 'untitled-design-2024-07-30t172819-377-0215e7\.png', 'Used LED bulbs collected for eco-friendly recycling'),
  ('is-glass-recyclable-understanding-the-benefits-and-challenges', 'untitled-design-2024-09-04t184250-765-ab0140.png', 'untitled-design-2024-09-04t184250-765-ab0140\.png', 'Glass bottles and jars sorted for recycling'),
  ('is-bubble-wrap-recyclable-understanding-the-challenges-and-eco-friendly-alternatives', 'untitled-design-2024-09-04t185537-179-093035.png', 'untitled-design-2024-09-04t185537-179-093035\.png', 'Bubble wrap packaging and eco-friendly alternatives'),
  ('is-aluminum-foil-recyclable-unwrapping-the-myths-and-facts', 'untitled-design-2024-09-05t132504-027-97836a.png', 'untitled-design-2024-09-05t132504-027-97836a\.png', 'Aluminum foil being sorted for recycling'),
  ('is-tissue-paper-recyclable-unraveling-the-truth', 'untitled-design-2024-09-05t134330-695-f63e95.png', 'untitled-design-2024-09-05t134330-695-f63e95\.png', 'Used tissue paper in a recycling bin'),
  ('are-milk-cartons-recyclable-heres-what-you-need-to-know', 'untitled-design-2024-09-05t135816-698-3d5755.png', 'untitled-design-2024-09-05t135816-698-3d5755\.png', 'Empty milk cartons ready for recycling'),
  ('where-to-recycle-ink-cartridges-a-comprehensive-guide', 'untitled-design-2024-09-05t183753-185-18cf1e.png', 'untitled-design-2024-09-05t183753-185-18cf1e\.png', 'Used ink cartridges collected for recycling'),
  ('are-magazines-recyclable-heres-what-you-need-to-know', 'untitled-design-2024-09-06t121907-544-d48b50.png', 'untitled-design-2024-09-06t121907-544-d48b50\.png', 'Stack of old magazines ready for recycling'),
  ('can-you-recycle-wrapping-paper-heres-what-you-need-to-know', 'untitled-design-2024-09-06t124436-476-34effb.png', 'untitled-design-2024-09-06t124436-476-34effb\.png', 'Used wrapping paper after gift opening'),
  ('how-to-dispose-of-oil-safely-and-responsibly', 'untitled-design-2024-09-06t130632-505-1abb82.png', 'untitled-design-2024-09-06t130632-505-1abb82\.png', 'Used cooking oil being disposed of safely'),
  ('can-you-recycle-styrofoam-understanding-the-challenges-and-alternatives', 'untitled-design-2024-09-06t131730-846-564710.png', 'untitled-design-2024-09-06t131730-846-564710\.png', 'Styrofoam packaging and recycling alternatives'),
  ('home-depot-bulb-recycling-vs-recycle-technologies', 'untitled-design-2024-09-06t171904-886-f8a9af.png', 'untitled-design-2024-09-06t171904-886-f8a9af\.png', 'Used light bulbs compared at a store recycling program'),
  ('best-buy-tv-recycling-vs-recycle-technologies', 'untitled-design-2024-09-06t173544-356-afe070.png', 'untitled-design-2024-09-06t173544-356-afe070\.png', 'Old televisions collected for recycling'),
  ('e-waste-recycling-ups-drop-box-vs-recycle-technologies', 'untitled-design-2024-09-09t160827-255-0eb2ea.png', 'untitled-design-2024-09-09t160827-255-0eb2ea\.png', 'Electronics placed in a drop box for e-waste recycling'),
  ('how-much-does-best-buy-charge-for-recycling-a-tv', 'untitled-design-2024-09-09t163226-574-9700b7.png', 'untitled-design-2024-09-09t163226-574-9700b7\.png', 'Old television at a store TV recycling program'),
  ('best-buy-geek-squad-vs-recycle-technologies', 'untitled-design-2024-09-09t165357-335-4fa7ce.png', 'untitled-design-2024-09-09t165357-335-4fa7ce\.png', 'Electronics brought in for recycling'),
  ('electric-vehicle-battery-manufacturing-waste', 'untitled-design-2024-12-24t152250-204-6848cb.png', 'untitled-design-2024-12-24t152250-204-6848cb\.png', 'Waste from electric vehicle battery manufacturing'),
  ('lithium-ion-battery-recycling', 'untitled-design-2024-12-24t162958-098-361846.png', 'untitled-design-2024-12-24t162958-098-361846\.png', 'Used lithium-ion batteries collected for recycling'),
  ('dispose-of-fire-extinguisher', 'untitled-design-2024-12-24t163654-903-b8aeb4.png', 'untitled-design-2024-12-24t163654-903-b8aeb4\.png', 'Used fire extinguisher ready for safe disposal'),
  ('how-to-dispose-of-lighter-fluid', 'untitled-design-2024-12-24t164325-556-d3da11.png', 'untitled-design-2024-12-24t164325-556-d3da11\.png', 'Lighter fluid container set aside for safe disposal'),
  ('how-to-dispose-of-a-refrigerator', 'untitled-design-2024-12-24t164608-027-edc46e.png', 'untitled-design-2024-12-24t164608-027-edc46e\.png', 'Old refrigerator ready for disposal and recycling'),
  ('how-to-dispose-of-old-laptop', 'untitled-design-2024-12-24t165228-369-19a17a.png', 'untitled-design-2024-12-24t165228-369-19a17a\.png', 'Old laptop ready for disposal and data wiping'),
  ('how-to-dispose-of-old-printer-machine', 'untitled-design-2024-12-24t165442-701-6adb9f.png', 'untitled-design-2024-12-24t165442-701-6adb9f\.png', 'Old printer ready for disposal'),
  ('how-to-recycle-old-iphone', 'untitled-design-2024-12-24t165554-760-20dd2b.png', 'untitled-design-2024-12-24t165554-760-20dd2b\.png', 'Old iPhone ready to be recycled'),
  ('how-to-dispose-of-batteries-responsibly', 'untitled-design-21-2bfdde.png', 'untitled-design-21-2bfdde\.png', 'Household batteries sorted for responsible disposal'),
  ('how-to-dispose-of-broken-tv', 'untitled-design-22-1-1db3ea.png', 'untitled-design-22-1-1db3ea\.png', 'Broken TV with a cracked screen ready for disposal'),
  ('circular-economy-is-laptop-recycling-the-ultimate-answer', 'untitled-design-22-c6020d.png', 'untitled-design-22-c6020d\.png', 'Used laptops recycled as part of a circular economy'),
  ('how-to-dispose-of-crt-tv', 'untitled-design-23-1-813758.png', 'untitled-design-23-1-813758\.png', 'Old CRT television ready for disposal'),
  ('computer-recycling-near-me-quality-it-asset-disposal', 'untitled-design-24-1-551588.png', 'untitled-design-24-1-551588\.png', 'Old computers collected for certified IT asset disposal'),
  ('how-to-dispose-of-fluorescent-tubes', 'untitled-design-24-1-cf2671.png', 'untitled-design-24-1-cf2671\.png', 'Used fluorescent tubes ready for disposal'),
  ('all-you-need-to-know-about-batteries-recycling-in-2024', 'untitled-design-24-ca4e2b.png', 'untitled-design-24-ca4e2b\.png', 'Assorted batteries collected for recycling in 2024'),
  ('declutter-your-home-get-rid-of-large-junk-items-with-recycle-technologies', 'untitled-design-25-0a67ec.png', 'untitled-design-25-0a67ec\.png', 'Large junk items removed from a home for recycling'),
  ('how-to-find-certified-computer-recycling-near-me', 'untitled-design-26-1-2b6168.png', 'untitled-design-26-1-2b6168\.png', 'Old computers at a certified computer recycling center'),
  ('designing-the-best-sustainable-future-for-dryer-recycling', 'untitled-design-26-1-472643.png', 'untitled-design-26-1-472643\.png', 'Old clothes dryer ready for recycling'),
  ('how-to-get-rid-of-an-old-tv', 'untitled-design-27-1-c088a6.png', 'untitled-design-27-1-c088a6\.png', 'Old TV set aside for disposal'),
  ('how-to-lessen-our-carbon-footprint-with-electronic-waste-recycling', 'untitled-design-28-1-29dcf1.png', 'untitled-design-28-1-29dcf1\.png', 'Electronic waste recycled to lower carbon footprint'),
  ('environmentally-conscious-your-guide-to-microwave-recycling-near-you', 'untitled-design-28-fc7978.png', 'untitled-design-28-fc7978\.png', 'Old microwave at a microwave recycling drop-off'),
  ('how-to-protect-your-identity-using-mobile-shredding-services', 'untitled-design-29-1-dfe346.png', 'untitled-design-29-1-dfe346\.png', 'Mobile shredding service protecting personal identity'),
  ('e-waste-7-things-that-are-recyclable', 'untitled-design-29-90a046.png', 'untitled-design-29-90a046\.png', 'Assorted recyclable electronic waste items'),
  ('global-recycling-day', 'untitled-design-3-1-fddc2a.png', 'untitled-design-3-1-fddc2a\.png', 'Recycling bins celebrating Global Recycling Day'),
  ('america-recycles-day-november-15th', 'untitled-design-3-63d6ac.png', 'untitled-design-3-63d6ac\.png', 'Recycling bins on a residential street for America Recycles Day'),
  ('how-to-recycle-a-car-battery', 'untitled-design-30-1-a2618d.png', 'untitled-design-30-1-a2618d\.png', 'Used car battery being recycled'),
  ('e-waste-recycling-news-you-may-have-missed-november-edition', 'untitled-design-30-d69984.png', 'untitled-design-30-d69984\.png', 'E-waste recycling news, November edition'),
  ('how-to-recycle-e-waste', 'untitled-design-31-1-57423c.png', 'untitled-design-31-1-57423c\.png', 'Electronic circuit boards and parts sorted for e-waste recycling'),
  ('managing-waste-how-to-recycle-christmas-lights-irrespective-of-condition', 'untitled-design-31-1-6bd60c.png', 'untitled-design-31-1-6bd60c\.png', 'Tangled Christmas lights ready for recycling'),
  ('e-waste-recycling-news-you-may-have-missed-october-edition', 'untitled-design-31-f49a02.png', 'untitled-design-31-f49a02\.png', 'E-waste recycling news, October edition'),
  ('how-to-recycle-electronics-the-easy-way', 'untitled-design-32-1-f8a9f7.png', 'untitled-design-32-1-f8a9f7\.png', 'Old electronics and cables gathered for easy recycling'),
  ('how-to-recycle-responsibly-in-benton-county', 'untitled-design-33-c91f65.png', 'untitled-design-33-c91f65\.png', 'Recycling responsibly in Benton County, Minnesota'),
  ('how-to-reduce-liability-with-certified-itad-services', 'untitled-design-34-1-01a281.png', 'untitled-design-34-1-01a281\.png', 'Certified ITAD services reducing data liability'),
  ('e-waste-recycling-why-do-monitor-recycling-how-it-helps', 'untitled-design-34-1-c58803.png', 'untitled-design-34-1-c58803\.png', 'Old computer monitors recycled to reduce e-waste'),
  ('common-mistakes-when-recycling-old-laptops', 'untitled-design-34-c988b7.png', 'untitled-design-34-c988b7\.png', 'Old laptops piled for recycling'),
  ('earth-day-secure-hard-drive-destruction', 'untitled-design-35-d09fbc.png', 'untitled-design-35-d09fbc\.png', 'Hard drive being destroyed for secure data disposal on Earth Day'),
  ('effective-it-asset-disposition-strategies', 'untitled-design-36-1-076f24.png', 'untitled-design-36-1-076f24\.png', 'IT equipment handled with effective IT asset disposition'),
  ('hp-laptop-battery-recycling', 'untitled-design-36-1-195a65.png', 'untitled-design-36-1-195a65\.png', 'HP laptop battery removed for recycling'),
  ('lithium-ion-battery-disposal', 'untitled-design-36-e2ac36.png', 'untitled-design-36-e2ac36\.png', 'Used lithium-ion batteries ready for disposal'),
  ('importance-of-recycling-e-waste', 'untitled-design-37-1-4491f2.png', 'untitled-design-37-1-4491f2\.png', 'Electronic waste highlighting the importance of recycling'),
  ('electric-car-battery-recycling', 'untitled-design-37-1bca99.png', 'untitled-design-37-1bca99\.png', 'Electric car battery pack being recycled'),
  ('innovative-ways-our-light-bulb-recycling-kit-can-refine-sustainability', 'untitled-design-38-1-2a6a34.png', 'untitled-design-38-1-2a6a34\.png', 'Light bulb recycling kit supporting sustainability'),
  ('electric-vehicle-battery-recycling', 'untitled-design-38-c625f4.png', 'untitled-design-38-c625f4\.png', 'Electric vehicle battery being recycled'),
  ('is-tempered-glass-recyclable', 'untitled-design-39-1-6c8d27.png', 'untitled-design-39-1-6c8d27\.png', 'Broken tempered glass sheet'),
  ('electronic-recycle-provides-environmental-opportunities', 'untitled-design-39-c16e06.png', 'untitled-design-39-c16e06\.png', 'Electronic recycling creating environmental opportunities'),
  ('hard-drive-disposal-in-anoka-county', 'untitled-design-4-1-18d29e.png', 'untitled-design-4-1-18d29e\.png', 'Hard drives collected for secure disposal in Anoka County'),
  ('anoka-countys-sustainable-future-recycle-technologies-role-in-electronic-waste-recycling', 'untitled-design-4-1-639973.png', 'untitled-design-4-1-639973\.png', 'Electronic waste recycling in Anoka County, Minnesota'),
  ('why-is-recycling-important', 'untitled-design-4-d9085f.png', 'untitled-design-4-d9085f\.png', 'Recyclable materials showing why recycling is important'),
  ('items-not-to-be-thrown-into-curbside-recycling', 'untitled-design-40-1-60a4c4.png', 'untitled-design-40-1-60a4c4\.png', 'Items that should not go in a curbside recycling bin'),
  ('health-benefits-of-e-waste-recycling', 'untitled-design-40-1-eaafff.png', 'untitled-design-40-1-eaafff\.png', 'Proper e-waste recycling protecting community health'),
  ('empower-your-community-with-recycle-technologies-comprehensive-recycling-service', 'untitled-design-40-bbf533.png', 'untitled-design-40-bbf533\.png', 'Community recycling services from Recycle Technologies'),
  ('monitor-recycling-pt-1-why-is-it-hard-to-recycle-old-monitors', 'untitled-design-40-bce9a8.png', 'untitled-design-40-bce9a8\.png', 'Stack of old computer monitors awaiting recycling'),
  ('comprehensive-recycling-services-for-businesses-by-recycle-technologies-in-des-moines', 'untitled-design-41-1-1-6ddb03.png', 'untitled-design-41-1-1-6ddb03\.png', 'Business recycling services in Des Moines, Iowa'),
  ('everything-you-need-to-know-about-e-waste-recycling-in-2024', 'untitled-design-41-1-28971b.png', 'untitled-design-41-1-28971b\.png', 'Electronic waste recycling in 2024'),
  ('news-you-missed-for-e-waste-recycling-september-edition', 'untitled-design-42-0dd974.png', 'untitled-design-42-0dd974\.png', 'E-waste recycling news, September edition'),
  ('solutions-for-old-tvs-recycling', 'untitled-design-43-1-378eaa.png', 'untitled-design-43-1-378eaa\.png', 'Old televisions being recycled'),
  ('epa-enforcement-action-in-chicago-sham-recycling-alleged', 'untitled-design-43-aa7a1a.png', 'untitled-design-43-aa7a1a\.png', 'Illegally dumped electronics in a sham recycling case'),
  ('how-to-properly-dispose-of-light-bulbs', 'untitled-design-44-1-0998af.png', 'untitled-design-44-1-0998af\.png', 'Used light bulbs ready for proper disposal'),
  ('e-scrap-processor-charged-with-illegal-dumping', 'untitled-design-44-c31bbc.png', 'untitled-design-44-c31bbc\.png', 'Illegally dumped electronic scrap'),
  ('why-recycle-technologies-is-best-for-tesla-battery-recycling', 'untitled-design-4544b4.jpg', 'untitled-design-4544b4\.jpg', 'Tesla battery being recycled'),
  ('epa-enforcement-action-in-chicago-sham-recycling-alleged-2', 'untitled-design-46-549858.png', 'untitled-design-46-549858\.png', 'Electronic scrap stockpiled in a sham recycling operation'),
  ('how-do-you-recycle-old-computers', 'untitled-design-47-1-8ae47c.png', 'untitled-design-47-1-8ae47c\.png', 'Old computer being recycled'),
  ('recycle-smarter-in-dakota-county-solution-from-recycle-technologies', 'untitled-design-47-86c646.png', 'untitled-design-47-86c646\.png', 'E-waste recycling in Dakota County, Minnesota'),
  ('recycle-responsibly-your-guide-to-recycle-technologiess-facilities-for-wisconsin-residents', 'untitled-design-48-3894e8.png', 'untitled-design-48-3894e8\.png', 'Recycle Technologies facilities for Wisconsin residents'),
  ('disadvantages-of-recycling-an-in-depth-overview-of-e-waste-recycling-challenges', 'untitled-design-49-71d10d.png', 'untitled-design-49-71d10d\.png', 'Electronic waste showing the challenges of recycling'),
  ('hard-drive-shredding-3-ways-it-helps-with-it-asset-disposition', 'untitled-design-5-1-7a6f25.png', 'untitled-design-5-1-7a6f25\.png', 'Hard drives shredded for secure IT asset disposition'),
  ('apple-lightning-cables-what-it-means-for-recycling', 'untitled-design-5-1-cc122b.png', 'untitled-design-5-1-cc122b\.png', 'Apple Lightning cables collected for recycling'),
  ('can-lithium-batteries-be-recycled', 'untitled-design-5-b6f3b9.png', 'untitled-design-5-b6f3b9\.png', 'Used lithium batteries ready for recycling'),
  ('why-r2-certification-matters', 'untitled-design-50-7faa7a.png', 'untitled-design-50-7faa7a\.png', 'R2 certified electronics recycling facility'),
  ('cathode-ray-tube-tv-recycling-on-this-earth-day', 'untitled-design-51-1-5f4395.png', 'untitled-design-51-1-5f4395\.png', 'Old CRT television recycled on Earth Day'),
  ('phase-out-your-fluorescent-light-bulbs-with-recycle-technologies', 'untitled-design-51-43f2d1.png', 'untitled-design-51-43f2d1\.png', 'Fluorescent light bulbs being phased out for recycling'),
  ('tesla-powerwall-recycling-on-earth-day', 'untitled-design-52-2f4e18.png', 'untitled-design-52-2f4e18\.png', 'Tesla Powerwall battery recycled on Earth Day'),
  ('tackling-the-haphazardness-of-mercury-with-mercury-recycling-kits', 'untitled-design-52-7bc6d0.png', 'untitled-design-52-7bc6d0\.png', 'Mercury recycling kit for safe disposal'),
  ('document-destruction-services-and-its-importance-in-todays-world', 'untitled-design-53-a4eb72.png', 'untitled-design-53-a4eb72\.png', 'Confidential documents being shredded for secure destruction'),
  ('recycle-and-repurpose-your-old-phone-on-this-earth-day', 'untitled-design-54-1-8b889a.png', 'untitled-design-54-1-8b889a\.png', 'Old phone recycled and repurposed on Earth Day'),
  ('happy-40th-anniversary-earth-day', 'untitled-design-54-495444.png', 'untitled-design-54-495444\.png', 'Earth Day anniversary celebrating environmental protection'),
  ('non-pcb-ballasts-illuminating-a-guaranteed-path-to-sustainable-recycling', 'untitled-design-55-ffa66b.png', 'untitled-design-55-ffa66b\.png', 'Non-PCB lighting ballasts collected for recycling'),
  ('an-uncommon-path-to-e-scrap-ceo', 'untitled-design-56-796ac5.png', 'untitled-design-56-796ac5\.png', 'Scrap metal pile at an e-scrap recycling yard'),
  ('usa-recycling-paves-the-way-for-a-greener-future-on-earth-day-2024', 'untitled-design-57-7cda1f.png', 'untitled-design-57-7cda1f\.png', 'Recycling supporting a greener future on Earth Day 2024'),
  ('appliance-recycling-better-than-replace', 'untitled-design-6-b49d82.png', 'untitled-design-6-b49d82\.png', 'Old home appliances ready for recycling'),
  ('options-beyond-best-buy-recycling-electronics-services', 'untitled-design-61-1-a10b6c.png', 'untitled-design-61-1-a10b6c\.png', 'Electronics recycling as an alternative to store drop-off programs'),
  ('old-computer-monitor-recycling-on-earth-day', 'untitled-design-64-1-bb2353.png', 'untitled-design-64-1-bb2353\.png', 'Old computer monitor recycled on Earth Day'),
  ('mac-recycle-program-to-sustain-the-earth-on-this-earth-day', 'untitled-design-67-1-3c9d34.png', 'untitled-design-67-1-3c9d34\.png', 'Old Mac computer recycled on Earth Day'),
  ('tesla-wall-battery-recycling-unveiled-on-2024-earth-day', 'untitled-design-69-800ccf.png', 'untitled-design-69-800ccf\.png', 'Tesla Powerwall battery recycling on Earth Day 2024'),
  ('how-battery-recycling-helps-us', 'untitled-design-7-1-c7f4a3.png', 'untitled-design-7-1-c7f4a3\.png', 'Used batteries recycled for environmental benefits'),
  ('appliance-recycling-for-the-humidifiers-and-purifiers-a-like', 'untitled-design-7-28b332.png', 'untitled-design-7-28b332\.png', 'Old humidifier and air purifier ready for recycling'),
  ('unveiling-the-impact-of-human-environment-interaction-on-recycling-e-waste', 'untitled-design-73-1-bda6f5.png', 'untitled-design-73-1-bda6f5\.png', 'Electronic waste piling up due to human activity'),
  ('how-did-we-get-paper-shredding-so-wrong-can-we-make-it-better', 'untitled-design-8-1-d267bc.png', 'untitled-design-8-1-d267bc\.png', 'Paper shredding for secure document disposal'),
  ('appliance-recycling', 'untitled-design-8-2d4030.png', 'untitled-design-8-2d4030\.png', 'Old appliances collected for recycling'),
  ('how-do-companies-recycle-mercury-waste', 'untitled-design-9-1-a2b68c.png', 'untitled-design-9-1-a2b68c\.png', 'Mercury waste being safely recycled'),
  ('battery-recycling-sustainable-future', 'untitled-design-9-1-fc2f33.png', 'untitled-design-9-1-fc2f33\.png', 'Recycled batteries supporting a sustainable future'),
  ('are-light-bulbs-recyclable', 'untitled-design-9-6db3c9.png', 'untitled-design-9-6db3c9\.png', 'Used light bulbs ready for recycling'),
  ('6-reasons-of-microwave-recycling', 'untitled-design-95-1-87812a.png', 'untitled-design-95-1-87812a\.png', 'Old microwave oven being recycled'),
  ('a-review-of-recycle-technologies-services-for-businesses-in-minneapolis', 'untitled-design-e319cd.png', 'untitled-design-e319cd\.png', 'Business recycling services in Minneapolis, Minnesota'),
  ('does-63-million-power-play-to-boost-battery-recycling-and-modernize-manufacturing', 'whatsapp-image-2024-08-15-at-18-19-31-35ea3032-7c5d65.jpg', 'whatsapp-image-2024-08-15-at-18-19-31-35ea3032-7c5d65\.jpg', 'Battery recycling funding to boost US manufacturing'),
  ('epa-and-white-house-honor-environmental-leaders-with-prestigious-awards', 'whatsapp-image-2024-08-16-at-18-52-30-42d3d278-a069a2.jpg', 'whatsapp-image-2024-08-16-at-18-52-30-42d3d278-a069a2\.jpg', 'EPA and White House environmental award ceremony'),
  ('argonne-national-laboratory-strives-to-reduce-e-waste-through-biodegradable-luminescent-polymers', 'whatsapp-image-2024-08-16-at-18-52-30-4b686aff-9d7c51.jpg', 'whatsapp-image-2024-08-16-at-18-52-30-4b686aff-9d7c51\.jpg', 'Argonne National Laboratory researchers developing biodegradable polymers'),
  ('your-guide-on-how-to-dispose-big-appliances-efficiently', 'Untitled-design-2024-07-23T141629.334.png', 'Untitled-design-2024-07-23T141629\.334\.png', 'Large appliances ready for disposal'),
  ('argonne-national-laboratory-strives-to-reduce-e-waste-through-biodegradable-luminescent-polymers', 'unnamed-1-768x768.png', 'unnamed-1-768x768\.png', 'Argonne National Laboratory biodegradable luminescent polymer research'),
  ('epa-and-white-house-honor-environmental-leaders-with-prestigious-awards', 'unnamed-150x150.png', 'unnamed-150x150\.png', 'EPA and White House environmental leadership awards'),
  ('how-to-dispose-of-grease-a-comprehensive-guide', 'Untitled-design-2024-09-04T182904.234.png', 'Untitled-design-2024-09-04T182904\.234\.png', 'Used cooking grease being disposed of safely');

CREATE TEMP TABLE alt_hits (slug text, file text, place text) ON COMMIT DROP;

-- 1. Featured images.
WITH u AS (
  UPDATE posts p
     SET featured_alt = a.alt
    FROM alt_sheet a
   WHERE p.slug = a.slug
     AND p.og_image_url ~ ('/' || a.file_re || '$')
  RETURNING p.slug, a.file
)
INSERT INTO alt_hits SELECT slug, file, 'featured' FROM u;

-- 2. Body images. One post can hold several of the sheet's images, and an
-- UPDATE ... FROM applies only one joined row per post, so this walks the
-- sheet a row at a time.
--   content_html: alt after src, alt before src, then an <img> with no alt.
--   content_json (posts written in the editor): jsonb keeps an image node's
--   keys sorted, so its "alt" sits right before its "src".
DO $do$
DECLARE
  a record;
  n int;
BEGIN
  FOR a IN SELECT * FROM alt_sheet ORDER BY slug, file LOOP
    UPDATE posts p
       SET content_html = regexp_replace(
             regexp_replace(
               regexp_replace(p.content_html,
                 '(<img(?:\s[^>]*)?\ssrc="[^"]*/' || a.file_re || '"[^>]*\salt=")[^"]*(")', '\1' || a.alt || '\2', 'g'),
               '(<img(?:\s[^>]*)?\salt=")[^"]*("[^>]*\ssrc="[^"]*/' || a.file_re || '")', '\1' || a.alt || '\2', 'g'),
             '<img((?:(?!\salt=)[^>])*\ssrc="[^"]*/' || a.file_re || '"(?:(?!\salt=)[^>])*)>', '<img alt="' || a.alt || '"\1>', 'g')
     WHERE p.slug = a.slug
       AND p.content_html ~ ('<img(?:\s[^>]*)?\ssrc="[^"]*/' || a.file_re || '"');
    GET DIAGNOSTICS n = ROW_COUNT;
    IF n > 0 THEN INSERT INTO alt_hits VALUES (a.slug, a.file, 'body'); END IF;

    UPDATE posts p
       SET content_json = regexp_replace(p.content_json::text,
             '"alt": (?:null|"[^"\\]*"), ("src": "[^"\\]*/' || a.file_re || '")', '"alt": "' || a.alt || '", \1', 'g')::jsonb
     WHERE p.slug = a.slug
       AND p.content_json::text ~ ('"src": "[^"\\]*/' || a.file_re || '"');
    GET DIAGNOSTICS n = ROW_COUNT;
    IF n > 0 THEN INSERT INTO alt_hits VALUES (a.slug, a.file, 'body json'); END IF;
  END LOOP;
END
$do$;

-- 3. The media library.
WITH u AS (
  UPDATE media m
     SET alt = a.alt
    FROM (SELECT DISTINCT ON (file) file, file_re, alt FROM alt_sheet ORDER BY file, slug) a
   WHERE m.filename = a.file OR m.url ~ ('/' || a.file_re || '$')
  RETURNING a.file
)
INSERT INTO alt_hits SELECT NULL, file, 'media' FROM u;

-- What changed.
SELECT place, count(*) AS rows FROM alt_hits GROUP BY place ORDER BY place;

-- Sheet rows that matched no featured image and no body image (should be
-- empty; a row here is an image the sheet puts on a post that does not use it).
SELECT a.slug, a.file
  FROM alt_sheet a
 WHERE NOT EXISTS (SELECT 1 FROM posts p
                    WHERE p.slug = a.slug
                      AND (p.og_image_url ~ ('/' || a.file_re || '$')
                           OR p.content_html ~ ('/' || a.file_re || '"')
                           OR p.content_html ~ ('/' || a.file_re || ' ')))
 ORDER BY a.slug;

COMMIT;
