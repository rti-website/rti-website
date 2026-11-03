import { absolute } from '@/lib/urls'
import REDIRECTS from '../../../data/redirects.json'

/**
 * /sitemap-locations.xml — the location pages' own sitemap. robots.txt lists
 * it next to /sitemap.xml.
 *
 * 14 Oct 2026: replaced with the SEO team's hand-made list (Aaqib: "upload
 * this sitemap"), grouped and in their order: the hub pages, Chicago, the
 * Minnesota and Wisconsin county and city pages, and the mail-in locations.
 * The seven state hubs of the same day are added after the hub pages, as the
 * hub brief asks ("add all 7 hubs to sitemap.xml and sitemap-locations.xml").
 * All 77 of their URLs answered 200 on live when this was written.
 * 28 Oct 2026 (redirect sheet): the four restored pages added, Rochester
 * shredding and Light Bulb Recycling Minneapolis out (they now 301).
 * 29 Oct 2026: the whole sheet is pages again; its 30 other URLs added
 * (Rochester shredding and Light Bulb Recycling Minneapolis back).
 * 2 Nov 2026 (management): 13 of them deleted again (404, no redirect).
 * 3 Nov 2026 (management sheet "all plan rti 1"): Arizona and Tennessee hubs
 * at /arizona/ and /tennessee/, Lewisburg at /tennessee/lewisburg/, Document
 * Shredding MN at /minnesota/blaine/shredding/, TV Recycling MN out (it 301s),
 * and the 17 new service pages in their own groups.
 * 4 Nov 2026 (the same sheet, Florida, Indiana and California tabs): hubs at
 * /florida/, /indiana/ and /california/, Ocala, Greenwood and Ontario at
 * /florida/ocala/, /indiana/greenwood/ and /california/ontario/, and their
 * 11 service pages.
 *
 * Until now this file was built from Admin -> Locations (published partner
 * hubs and service pages); those are no longer listed here. Every page is
 * still in /sitemap.xml.
 *
 * To add or remove a page, edit GROUPS. A URL that 301s elsewhere is never
 * written out, so a later redirect in url-map.csv drops it on its own.
 */
const GROUPS: { group: string; urls: string[] }[] = [
  { group: "Hub pages", urls: [
    "/all-locations/",
    "/minnesota-recycling/",
    "/wisconsin-recycling/",
    "/mail-in-recycling/"
  ] },
  { group: "State hubs (14 Oct 2026)", urls: [
    "/arizona/",
    "/california/",
    "/florida/",
    "/georgia-recycling/",
    "/indiana/",
    "/tennessee/",
    "/texas-recycling/"
  ] },
  { group: "Chicago", urls: [
    "/electronic-recycling-chicago/"
  ] },
  { group: "Minnesota: Hennepin County", urls: [
    "/minnesota-recycling/hennepin-county-recycling-center/",
    "/minnesota-recycling/hennepin-county-recycling-center/bloomington-recycling-center/",
    "/minnesota-recycling/hennepin-county-recycling-center/edina-recycling-services/",
    "/minnesota-recycling/hennepin-county-recycling-center/maple-grove-recycling-center/",
    "/minnesota-recycling/hennepin-county-recycling-center/minnetonka-recycling-center/",
    "/minnesota-recycling/hennepin-county-recycling-center/plymouth-recycling-center/",
    "/minnesota-recycling/hennepin-county-recycling-center/brooklyn-park-recycling-center/",
    "/minnesota-recycling/hennepin-county-recycling-center/richfield-recycling-services/",
    "/minnesota-recycling/hennepin-county-recycling-center/minneapolis-recycling-center/"
  ] },
  { group: "Minnesota: Anoka County", urls: [
    "/minnesota-recycling/anoka-county-recycling/",
    "/minnesota-recycling/ramsey/blaine/",
    "/minnesota-recycling/coon-rapids/",
    "/minnesota-recycling/east-bethel/"
  ] },
  { group: "Minnesota: Ramsey County", urls: [
    "/minnesota-recycling/ramsey/",
    "/minnesota-recycling/battery-recycling-st-paul/",
    "/shredding-minnesota/st-paul/",
    "/minnesota-recycling/ramsey/roseville/",
    "/minnesota-recycling/ramsey/electronic-recycling/roseville-electronic-recycling/"
  ] },
  { group: "Minnesota: Dakota County", urls: [
    "/minnesota-recycling/dakota-county/",
    "/minnesota-recycling/dakota-county/burnsville-recycling-center/",
    "/minnesota-recycling/dakota-county/lakeville-recycling-center/"
  ] },
  { group: "Minnesota: Washington County", urls: [
    "/minnesota-recycling/washington-county/",
    "/minnesota-recycling/electronic-recycling-in-woodbury/"
  ] },
  { group: "Minnesota: Scott County", urls: [
    "/minnesota-recycling/scott-county/"
  ] },
  { group: "Minnesota: Olmsted County", urls: [
    "/minnesota-recycling/olmsted-county/"
  ] },
  { group: "Minnesota: Benton County", urls: [
    "/minnesota-recycling/benton-county-recycling/",
    "/minnesota-recycling/benton-county-recycling/st-cloud-recycling-center/"
  ] },
  { group: "Minnesota: Minneapolis", urls: [
    "/minnesota-recycling/minneapolis/",
    "/minnesota-recycling/battery-recycling-in-minneapolis/",
    "/minnesota-recycling/bulb-recycle-minneapolis/",
    "/minnesota-recycling/computer-recycle-minneapolis/",
    "/light-bulb-recycling-minneapolis/"
  ] },
  { group: "Minnesota: statewide services", urls: [
    "/minnesota/blaine/shredding/",
    "/minnesota-recycling/electronic-recycling-duluth/",
    "/shredding-minnesota/duluth/"
  ] },
  { group: "Wisconsin: Milwaukee County", urls: [
    "/wisconsin-recycling/milwaukee/",
    "/wisconsin-recycling/battery-recycling-milwaukee/",
    "/wisconsin-recycling/bulb-recycle-milwaukee/",
    "/wisconsin-recycling/milwaukee/oak-creek/",
    "/shredding-wisconsin/milwaukee/",
    "/wisconsin-recycling/computer-recycle-milwaukee/",
    "/wisconsin-recycling/tv-recycling-milwaukee/"
  ] },
  { group: "Wisconsin: Waukesha County", urls: [
    "/wisconsin-recycling/waukesha-electronic-recycling/",
    "/wisconsin-recycling/battery-recycling-waukesha/",
    "/wisconsin-recycling/tv-recycling-waukesha/",
    "/shredding-wisconsin/waukesha/",
    "/wisconsin-recycling/oconomowoc-recycling-center/",
    "/wisconsin-recycling/new-berlin-recycling-center/"
  ] },
  { group: "Wisconsin: Madison", urls: [
    "/wisconsin-recycling/madison/",
    "/wisconsin-recycling/battery-recycling-madison/",
    "/wisconsin-recycling/fluorescent-bulb-recycle-madison/",
    "/wisconsin-recycling/computer-recycling-madison/",
    "/wisconsin-recycling/electronic-recycling-madison/",
    "/wisconsin-recycling/madison/electronic-recycling/",
    "/wisconsin-recycling/tv-recycling-madison/",
    "/shredding-wisconsin/madison/"
  ] },
  { group: "Wisconsin: Green Bay", urls: [
    "/wisconsin-recycling/green-bay-recycling/",
    "/wisconsin-recycling/battery-recycling-green-bay/",
    "/shredding-wisconsin/green-bay/",
    "/wisconsin-recycling/tv-recycling-green-bay/",
    "/wisconsin-recycling/electronics-recycling-green-bay/",
    "/wisconsin-recycling/electronic-recycling-green-bay/"
  ] },
  { group: "Wisconsin: Calumet County", urls: [
    "/wisconsin-recycling/calumet-county/",
    "/wisconsin-recycling/appleton-electronic-recycling-center/",
    "/wisconsin-recycling/calumet-county/appleton-recycling/",
    "/wisconsin-recycling/battery-recycling-appleton/",
    "/wisconsin-recycling/tv-recycling-appleton/",
    "/shredding-wisconsin/appleton/",
    "/wisconsin-recycling/electronic-recycling-appleton/"
  ] },
  { group: "Wisconsin: Racine and Washington County", urls: [
    "/wisconsin-recycling/racine/",
    "/shredding-wisconsin/racine/",
    "/wisconsin-recycling/washington-county-recycling-center/"
  ] },
  { group: "Wisconsin: statewide services and cities", urls: [
    "/tv-recycling-in-wisconsin/",
    "/shredding-wisconsin/",
    "/wisconsin-recycling/sheboygan/",
    "/wisconsin-recycling/fond-du-lac-recycling/"
  ] },
  { group: "Des Moines, Iowa (29 Oct 2026)", urls: [
    "/electronic-recycling-des-moines/",
    "/computer-recycle-des-moines/",
    "/tv-recycling-des-moines/",
    "/shredding-minnesota/des-moines/"
  ] },
  { group: "Minnesota: Blaine service pages (3 Nov 2026)", urls: [
    "/minnesota/blaine/electronic-recycling/",
    "/minnesota/blaine/battery-recycling/",
    "/minnesota/blaine/light-bulb-recycling/",
    "/minnesota/blaine/ballast-recycling/",
    "/minnesota/blaine/paper-shredding/",
    "/minnesota/blaine/phone-shredding/",
    "/minnesota/blaine/off-site-shredding/",
    "/minnesota/blaine/hard-drive-destruction/",
    "/minnesota/blaine/television-recycling/",
    "/minnesota/blaine/airbag-recycling/"
  ] },
  { group: "Arizona: Phoenix service pages (3 Nov 2026)", urls: [
    "/arizona/phoenix/electronic-recycling/",
    "/arizona/phoenix/battery-recycling/",
    "/arizona/phoenix/light-bulb-recycling/",
    "/arizona/phoenix/ballast-recycling/"
  ] },
  { group: "Tennessee: Lewisburg service pages (3 Nov 2026)", urls: [
    "/tennessee/lewisburg/electronic-recycling/",
    "/tennessee/lewisburg/battery-recycling/",
    "/tennessee/lewisburg/light-bulb-recycling/",
    "/tennessee/lewisburg/ballast-recycling/"
  ] },
  { group: "Florida: Ocala service pages (4 Nov 2026)", urls: [
    "/florida/ocala/electronic-recycling/",
    "/florida/ocala/battery-recycling/",
    "/florida/ocala/light-bulb-recycling/",
    "/florida/ocala/ballast-recycling/"
  ] },
  { group: "Indiana: Greenwood service pages (4 Nov 2026)", urls: [
    "/indiana/greenwood/electronic-recycling/",
    "/indiana/greenwood/battery-recycling/",
    "/indiana/greenwood/light-bulb-recycling/"
  ] },
  { group: "California: Ontario service pages (4 Nov 2026)", urls: [
    "/california/ontario/electronic-recycling/",
    "/california/ontario/battery-recycling/",
    "/california/ontario/light-bulb-recycling/",
    "/california/ontario/ballast-recycling/"
  ] },
  { group: "Mail-in recycling locations", urls: [
    "/phoenix-arizona/",
    "/florida/ocala/",
    "/kennesaw-georgia/",
    "/indiana/greenwood/",
    "/fort-worth-texas/",
    "/california/ontario/",
    "/johnson-city-buffalo-tennessee/",
    "/tennessee/lewisburg/",
    "/recycling-kits-in-ohio/",
    "/recycling-kits-in-florida/"
  ] },
]

const REDIRECTED = new Set(REDIRECTS.map((r) => r.source))

export const dynamic = 'force-static'

export function GET(): Response {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${GROUPS.map((g) => {
    const rows = g.urls.filter((u) => !REDIRECTED.has(u)).map((u) => `  <url><loc>${esc(absolute(u))}</loc></url>`)
    return rows.length ? `  <!-- ${g.group} -->\n${rows.join('\n')}` : ''
  }).filter(Boolean).join('\n\n')}
</urlset>
`
  return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8' } })
}
