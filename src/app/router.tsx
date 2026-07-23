import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout'

const DashboardPage = lazy(() =>
  import('@/features/dashboard/DashboardPage').then((m) => ({ default: m.DashboardPage })),
)
const VendorDirectoryPage = lazy(() =>
  import('@/features/vendor-directory/VendorDirectoryPage').then((m) => ({
    default: m.VendorDirectoryPage,
  })),
)
const VendorDetailsPage = lazy(() =>
  import('@/features/vendor-details/VendorDetailsPage').then((m) => ({
    default: m.VendorDetailsPage,
  })),
)
const VendorFormPage = lazy(() =>
  import('@/features/vendor-form/VendorFormPage').then((m) => ({ default: m.VendorFormPage })),
)
const VendorPerformancePage = lazy(() =>
  import('@/features/vendor-performance/VendorPerformancePage').then((m) => ({
    default: m.VendorPerformancePage,
  })),
)
const ApprovalWorkflowPage = lazy(() =>
  import('@/features/approval-workflow/ApprovalWorkflowPage').then((m) => ({
    default: m.ApprovalWorkflowPage,
  })),
)
const NotificationsPage = lazy(() =>
  import('@/features/notifications/NotificationsPage').then((m) => ({
    default: m.NotificationsPage,
  })),
)

function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-gray-500">Loading…</div>}>
      <Component />
    </Suspense>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: withSuspense(DashboardPage) },
      { path: 'vendors', element: withSuspense(VendorDirectoryPage) },
      { path: 'vendors/new', element: withSuspense(VendorFormPage) },
      { path: 'vendors/:vendorId', element: withSuspense(VendorDetailsPage) },
      { path: 'performance', element: withSuspense(VendorPerformancePage) },
      { path: 'approvals', element: withSuspense(ApprovalWorkflowPage) },
      { path: 'notifications', element: withSuspense(NotificationsPage) },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
