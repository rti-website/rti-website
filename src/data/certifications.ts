import type { Logo } from '@/components/ui/LogoMarquee'

/**
 * The certifications strip, shared by the homepage (Figma 6044:19732) and
 * /services/ (Figma 6142:1622). Both frames draw the same seven marks at the
 * same sizes and the same per-logo opacities, so the list lives in one place.
 *
 * TODO(content): marks 3/4 repeat in the design because the partner logos were
 * not supplied. Swap in the real R2v3, RIOS, NAID AAA and e-Stewards artwork
 * before launch.
 */
export const CERT_LOGOS: Logo[] = [
  { src: '/images/home/cert-1.png', w: 120, h: 40, o: 'opacity-40' },
  { src: '/images/home/cert-2.png', w: 40,  h: 40, o: 'opacity-60' },
  { src: '/images/home/cert-3.png', w: 103, h: 60, o: 'opacity-80' },
  { src: '/images/home/cert-4.png', w: 102, h: 60, o: '' },
  { src: '/images/home/cert-3.png', w: 103, h: 60, o: 'opacity-80' },
  { src: '/images/home/cert-4.png', w: 102, h: 60, o: 'opacity-60' },
  { src: '/images/home/cert-5.png', w: 68,  h: 68, o: 'opacity-40' },
]

export const CERT_COPY = {
  eyebrow: 'Environmental Compliances',
  title: 'Certifications & Standards',
  body:
    'Recycle Technologies follows recognized environmental standards and holds leading '
    + 'industry certifications, ensuring e-waste is handled responsibly from collection '
    + 'through final processing.',
}
