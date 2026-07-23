import { useMemo, useState } from 'react'
import { QueryBoundary } from '@/shared/ui/QueryBoundary'
import { NotificationItem } from './components/NotificationItem'
import { NotificationsSkeleton } from './components/NotificationsSkeleton'
import { useMarkAllNotificationsRead, useNotifications } from './hooks/useNotifications'
import type { NotificationType } from './types'

const TYPES: NotificationType[] = [
  'Approval Pending',
  'Document Expiring',
  'Low Vendor Rating',
  'Delayed Delivery',
  'Payment Due',
]

export function NotificationsPage() {
  const query = useNotifications()
  const markAllRead = useMarkAllNotificationsRead()
  const [typeFilter, setTypeFilter] = useState<NotificationType | ''>('')

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Notifications</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Approvals, expiring documents, low ratings, delayed deliveries, and payments due.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as NotificationType | '')}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
          >
            <option value="">All types</option>
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <QueryBoundary query={query} loadingFallback={null}>
            {(notifications) => {
              const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n.id)
              return (
                <button
                  type="button"
                  onClick={() => markAllRead.mutate(unreadIds)}
                  disabled={unreadIds.length === 0 || markAllRead.isPending}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Mark all as read
                </button>
              )
            }}
          </QueryBoundary>
        </div>
      </div>

      <QueryBoundary
        query={query}
        isEmpty={(data) => data.length === 0}
        loadingFallback={<NotificationsSkeleton />}
        emptyFallback={
          <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
            No notifications right now.
          </div>
        }
      >
        {(notifications) => <NotificationListFiltered notifications={notifications} typeFilter={typeFilter} />}
      </QueryBoundary>
    </div>
  )
}

function NotificationListFiltered({
  notifications,
  typeFilter,
}: {
  notifications: import('./types').NotificationEntry[]
  typeFilter: NotificationType | ''
}) {
  const filtered = useMemo(
    () => (typeFilter ? notifications.filter((n) => n.type === typeFilter) : notifications),
    [notifications, typeFilter],
  )

  if (filtered.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
        No notifications match this filter.
      </div>
    )
  }

  return (
    <ul className="space-y-2">
      {filtered.map((n) => (
        <NotificationItem key={n.id} notification={n} />
      ))}
    </ul>
  )
}
