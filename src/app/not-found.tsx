/**
 * Returns a real HTTP 404. A 200 page that says "not found" is a soft 404 and
 * Google treats it as a quality problem.
 */
export default function NotFound() {
  return (
    <main>
      <h1>Page not found</h1>
      <p>
        The page you are looking for does not exist. Try the{' '}
        <a href="/services/">services</a> or <a href="/all-locations/">locations</a> pages.
      </p>
    </main>
  )
}
