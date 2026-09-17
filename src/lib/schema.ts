import { CERTIFICATIONS, FACILITIES, SITE } from './site'
import { absolute } from './urls'

/**
 * JSON-LD. One consolidated @graph per page with @id cross-references, rather
 * than scattered <script> blocks — more robust and easier to validate.
 *
 * NOTE ON FAQPage: Google removed FAQ rich results from Search on 7 May 2026
 * and deleted the documentation on 15 June 2026. The markup is harmless and
 * still helps extraction, but the Rich Results Test will NOT report it, so the
 * launch gate must not require an FAQ rich result to validate.
 */

const ORG_ID = `${SITE.origin}/#organization`
const SITE_ID = `${SITE.origin}/#website`

type Node = Record<string, unknown>

export function organizationNode(): Node {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.origin,
    logo: absolute('/logo.png'),
    sameAs: [], // real profile URLs — the plan flags bare facebook.com links as a bug
    hasCredential: CERTIFICATIONS.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: c.name,
      ...(c.issuer ? { recognizedBy: { '@type': 'Organization', name: c.issuer } } : {}),
    })),
    department: FACILITIES.map((f) => ({ '@id': `${SITE.origin}/#${f.id}` })),
  }
}

export function facilityNodes(): Node[] {
  return FACILITIES.map((f) => ({
    '@type': 'LocalBusiness',
    '@id': `${SITE.origin}/#${f.id}`,
    name: f.name,
    parentOrganization: { '@id': ORG_ID },
    address: {
      '@type': 'PostalAddress',
      streetAddress: f.street,
      addressLocality: f.locality,
      addressRegion: f.region,
      postalCode: f.postalCode,
      addressCountry: f.country,
    },
    ...(f.telephone ? { telephone: f.telephone } : {}),
    ...(f.geo.lat !== 0 ? {
      geo: { '@type': 'GeoCoordinates', latitude: f.geo.lat, longitude: f.geo.lng },
    } : {}),
    ...(f.hours.length > 0 ? {
      openingHoursSpecification: f.hours.map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
    } : {}),
  }))
}

export function websiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE.origin,
    name: SITE.name,
    publisher: { '@id': ORG_ID },
  }
}

export function breadcrumbNode(trail: { name: string; url: string }[]): Node {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: absolute(t.url),
    })),
  }
}

export function serviceNode(opts: {
  name: string
  url: string
  description: string
  areaServed?: string[]
}): Node {
  return {
    '@type': 'Service',
    '@id': `${absolute(opts.url)}#service`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.name,
    provider: { '@id': ORG_ID },
    ...(opts.areaServed ? { areaServed: opts.areaServed } : {}),
  }
}

export function articleNode(opts: {
  headline: string
  url: string
  datePublished: string
  dateModified?: string
  image?: string
}): Node {
  return {
    '@type': 'Article',
    '@id': `${absolute(opts.url)}#article`,
    headline: opts.headline,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    ...(opts.image ? { image: absolute(opts.image) } : {}),
    mainEntityOfPage: absolute(opts.url),
  }
}

export function faqNode(qa: { q: string; a: string }[]): Node {
  return {
    '@type': 'FAQPage',
    mainEntity: qa.map((x) => ({
      '@type': 'Question',
      name: x.q,
      acceptedAnswer: { '@type': 'Answer', text: x.a },
    })),
  }
}

/** Serialise a graph for embedding. Always render via <JsonLd> in the layout. */
export function graph(...nodes: Node[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes })
}
