import { pageMetadata } from '@/lib/page-meta'
import QuotePage from '../quote/page'

/**
 * Quote by Location, /quote-by-location/ (29 Oct 2026).
 *
 * The old WordPress URL, 301'd to /quote/ since launch and a page again
 * (management: the sheet "RTI Currently redirect pages" has no redirects).
 * On WordPress it was a multi-step online order form; here it is the Get a
 * Quote page and its quote form, so an enquiry sent from it is a quote
 * enquiry like any other. Title and description are the WordPress ones
 * (Wayback Machine capture of 11 May 2026; data/url-map.csv), and the page is
 * its own canonical, as it was on WordPress.
 */
export const generateMetadata = () => pageMetadata({
  url: '/quote-by-location/',
  title: 'Quote by Location - Recycle Technologies',
  description: 'Get quotes by location at Recycle Technologies. Find expert recycling solutions tailored to your area in the USA. Contact us for a quote today!',
})

export default QuotePage
