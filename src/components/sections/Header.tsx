import Image from 'next/image'
import Link from 'next/link'
import { Box, Section } from '@/components/design/Frame'
import { ABOUT_NAV, BLOG_NAV, INDUSTRY_NAV, MAIL_IN, MAIN_NAV, TOP_BAR, type IntroMenu, type NavItem } from '@/lib/nav'
import { INDUSTRY_MARKS } from '@/components/ui/IndustryMarks'
import { SERVICE_MARKS } from '@/components/ui/ServiceMarks'
import { SERVICE_GROUPS } from '@/data/services'
import { HeaderNav, type NavEntry } from '@/components/client/HeaderNav'
import { MobileNav } from '@/components/client/MobileNav'
import { CONTACT_FORM_HREF, QUOTE_HREF, href } from '@/lib/urls'
import { blogMenuColumns } from '@/lib/blog-index'
import { HEADER_H } from '@/lib/layout'

/**
 * Header — Figma 6107:2737 for the bar itself, and the "MainMenu Module 2"
 * component set in file lRkITk6QLzsscWUO40karx for the nav row and everything
 * that opens out of it. 1920 x HEADER_H: a 41px teal announcement bar plus the
 * white bar. Figma draws 140; see src/lib/layout.ts for why it is 120.
 *
 * ! THAT FILE SUPERSEDES Zr9obaa2Aj1R9qnYgOBmmD, which the header was first
 * built from. Asim pointed at it twice on 16 Sep 2026 — "we have to make the
 * navbar like this exactly". Where the two disagree, the newer file wins: it
 * reordered the items, added the About and Blogs panels, dropped the rules
 * between mega-menu rows and drew the column heading badge as a ring.
 *
 * The top bar and the logo are server-rendered here. Everything that opens is
 * in HeaderNav — see the note at the top of that file for why it has to be a
 * client component.
 *
 * TWO DEPARTURES FROM THE DESIGN'S ITEM LIST, both Asim's, both 15 Sep 2026:
 * ITAD is not in the nav, and "Drop off Locations" is "Locations" pointing at
 * the built page rather than at /dropoff/, which has no page and would 404 from
 * the header of every page on the site. Resources was added on 16 Sep and
 * removed again on 21 Sep; the footer links the page now. See src/lib/nav.ts.
 */
export async function Header() {
  /*
   * The Blogs panel's rows are the WordPress categories, read at build time.
   * That is the only reason this component is async — everything else in the
   * header is static. See blogMenuColumns() in src/lib/blog-index.ts.
   */
  const NAV = buildNav(await blogMenuColumns())

  return (
    <>
      {/* Below lg the bar and its mega-menus are replaced wholesale by the
          drawer — Figma BVtf2AOuUOcYbiMIlcKmbC "MainMenu Module 2 - Mobile".
          Same NAV object, so the two lists cannot drift. See MobileNav.tsx for
          why the header is the one place this build renders two trees. */}
      <MobileNav
        nav={NAV}
        mailIn={{ label: MAIL_IN.label, href: MAIL_IN.href }}
        topBar={TOP_BAR}
        quoteHref={QUOTE_HREF}
        pickupHref={CONTACT_FORM_HREF}
        announce={TOP_BAR.announce}
      />

    {/* overflow="visible" so the menus can hang below the 140px bar. Every other
        section clips on purpose; this one must not. */}
    <Section top={0} height={HEADER_H} label="6107:2737" overflow="visible" className="z-30 hidden border-b border-line bg-white lg:block">
      {/* Announcement bar */}
      <Box x={0} y={0} w={1920} h={41} className="bg-brand">
        {/* Copy and destination both come from TOP_BAR.announce — the drawer
            renders this same bar, and two hardcoded copies drift. */}
        <Box x={319} y={0} h={41} className="flex items-center">
          <p className="font-roboto text-[12px] leading-[14px] text-white">
            {TOP_BAR.announce.text}
          </p>
          <Link href={TOP_BAR.announce.href} className="ml-[10px] font-roboto text-[12px] leading-[14px] text-white underline-offset-2 hover:underline">
            {TOP_BAR.announce.cta}
          </Link>
        </Box>

        {/* Right-hand group: Drop Off Locations, the two numbers and Contact
            Us, in ONE flex row anchored to the 1601 gutter, 30px apart.

            It was two boxes — the links pinned at x1110 (Figma's 998, moved
            right on 22 Sep to close the hole Get a Quote left) and the button
            right-anchored in a 221px box at x1380. That only held while the
            numbers were the short toll-free ones. On 23 Sep 2026 Asim swapped
            them for the facility lines ("add this numbers in navbar for their
            respective locations"), which are two characters longer each, and
            the WI number ran into Contact Us with 1px between them at 1920.
            One right-anchored row cannot collide with itself, whatever the
            labels say, and it retires the pointer-events workaround the old
            overlapping box needed.

            The frame drew two buttons here; Asim dropped Get a Quote on
            21 Sep 2026 and gave Contact Us its filled style. The quote is one
            click away from the hero and every section CTA. No fixed button
            width — padding sets it. */}
        <div className="absolute right-[319px] top-0 flex h-[41px] items-center gap-[30px]">
          <Link href={TOP_BAR.dropOff.href} className="font-roboto text-[12px] leading-[14px] text-white hover:underline">
            {TOP_BAR.dropOff.label}
          </Link>
          <a href={TOP_BAR.phoneMn.tel} className="font-roboto text-[12px] leading-[14px] text-white hover:underline">{TOP_BAR.phoneMn.label}</a>
          <a href={TOP_BAR.phoneWi.tel} className="font-roboto text-[12px] leading-[14px] text-white hover:underline">{TOP_BAR.phoneWi.label}</a>
          <Link
            href={TOP_BAR.contact.href}
            className="btn-pop flex h-[26.5px] items-center rounded-[2.426px] border-[0.606px] border-brand bg-white px-[19.406px] font-sans text-[12.129px] font-semibold capitalize leading-[12.129px] tracking-[0.2426px] text-brand"
          >
            {TOP_BAR.contact.label}
          </Link>
        </div>
      </Box>

      {/* Logo — Figma 6107:1841 at x319, 194x46, centred in the white bar, whose
          height is HEADER_H minus the 41px announcement bar. */}
      <Box x={319} y={41 + (HEADER_H - 41 - 46) / 2} w={194} h={46}>
        <Link href="/" aria-label="Recycle Technologies — home" className="block size-full">
          <Image src="/images/logo.png" alt="Recycle Technologies" width={194} height={46} priority className="size-full object-contain" />
        </Link>
      </Box>

      <HeaderNav nav={NAV} mailIn={{ label: MAIL_IN.label, href: MAIL_IN.href }} />
    </Section>
    </>
  )
}

/**
 * About and Blogs — Figma 6503:7676 and 6503:8116. Both panels are the mega
 * shell with an intro in place of the first column's heading-and-rows, so they
 * differ from Services only in the data handed to it.
 *
 * Neither list is derived from anything, unlike Services: About's four rows are
 * three real pages plus one that does not exist, and Blogs' ten rows are
 * categories with no pages at all. See src/lib/nav.ts for why they are inert.
 */
function introMenu(item: NavItem, menu: IntroMenu): NavEntry {
  return {
    label: item.label,
    href: item.href,
    menu: {
      columns: [
        { heading: menu.heading, href: menu.headingHref, blurb: menu.blurb, items: [] },
        ...menu.columns.map((col) => ({
          items: col.map((row) => ({ title: row.title, desc: row.desc, href: row.href })),
        })),
      ],
    },
  }
}

/**
 * What each nav item holds.
 *
 * Services is built from the service catalogue, so a service can never appear
 * on /services/ and be missing from the menu, and the menu's icons and blurbs
 * are the same ones the service cards use. `unbuilt` entries are filtered out:
 * a menu row that links to a 404 is worse than one that is missing.
 *
 * The catalogue's three groups line up one-for-one with the design's three
 * mega-menu columns — Recycling Services, Destruction & Shredding, Recycling
 * Programs.
 */
function buildNav(blogColumns: { title: string; href: string }[][]): NavEntry[] {
  /* No database, no categories — one honest row rather than an empty panel or,
     as before, ten rows that all went nowhere. */
  const blogMenu: IntroMenu = {
    ...BLOG_NAV,
    columns: blogColumns.length > 0
      ? blogColumns
      : [[{ title: 'All Articles', href: href('/blog/') }]],
  }

  return MAIN_NAV.map((item): NavEntry => {
    if (item.label === 'Services') {
      return {
        label: item.label,
        href: item.href,
        menu: {
          columns: SERVICE_GROUPS.map((g) => ({
            heading: g.heading,
            href: href('/services/'),
            items: g.cards
              .filter((c) => !c.unbuilt)
              .map((c) => ({
                title: `${c.l1} ${c.l2}`,
                desc: c.blurb,
                icon: c.icon,
                markLine: c.mark && SERVICE_MARKS[c.mark],
                href: c.href,
                external: c.external,
              })),
          })),
        },
      }
    }
    if (item.label === 'About') return introMenu(item, ABOUT_NAV)
    if (item.label === 'Blogs') return introMenu(item, blogMenu)
    /*
     * Industries — 6491:6934. Three columns of icon rows and no heading at all,
     * so it is MegaColumns with every column's `heading` left off. INDUSTRY_NAV
     * is already shaped as the frame's three columns; the note there explains why
     * its seven industries are not the frame's seven.
     */
    if (item.label === 'Industries') {
      return {
        label: item.label,
        href: item.href,
        menu: {
          columns: INDUSTRY_NAV.map((col) => ({
            rowGap: 15 as const,
            items: col.map((i) => ({
              title: i.label,
              desc: i.desc,
              mark: INDUSTRY_MARKS[i.mark],
              href: i.href,
            })),
          })),
        },
      }
    }
    return { label: item.label, href: item.href }
  })
}
