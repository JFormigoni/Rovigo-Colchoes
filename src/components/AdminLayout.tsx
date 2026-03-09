import { Outlet } from 'react-router-dom'

/**
 * AdminLayout component
 * 
 * Provides a separate layout for admin pages without the main site navigation.
 * This keeps the admin interface isolated from the public-facing site.
 */
export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Outlet />
    </div>
  )
}
