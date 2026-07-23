import { NavLink, Outlet } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/vendors', label: 'Vendor Directory' },
  { to: '/vendors/new', label: 'Create Vendor' },
  { to: '/performance', label: 'Performance' },
  { to: '/approvals', label: 'Approvals' },
  { to: '/notifications', label: 'Notifications' },
]

export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col md:flex-row">
      <aside className="shrink-0 border-b border-gray-200 bg-gray-50 md:w-60 md:border-b-0 md:border-r dark:border-gray-800 dark:bg-gray-900">
        <div className="px-4 py-4 text-base font-semibold text-gray-900 dark:text-gray-100">
          Vendor Management
        </div>
        <nav className="flex flex-row flex-wrap gap-1 px-2 pb-3 md:flex-col md:pb-4">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="min-w-0 flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}
