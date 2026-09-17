import '@/styles/admin.css'
import { buildMetadata } from '@/lib/seo'
import { AdminApp } from '@/components/client/admin/AdminApp'

/**
 * RTI Publisher — one route, behind a login.
 *
 * This page is STATIC. It reads no request-time data, so `dynamic = 'error'` in
 * app/layout.tsx is satisfied and the public site's guarantee (CLAUDE.md rule 2)
 * is untouched. Everything the admin needs comes from /api/admin/*, which are
 * route handlers and therefore not wrapped by that layout at all.
 *
 * admin.css is imported here rather than in globals.css so none of it is
 * downloaded by a visitor reading a blog post.
 */
export const metadata = buildMetadata({
  url: '/admin/',
  title: 'RTI Publisher',
  description: 'Content administration for recycletechnologies.com.',
  noindex: true,
})

export default function AdminPage() {
  return (
    <div className="rti-admin">
      <AdminApp />
    </div>
  )
}
