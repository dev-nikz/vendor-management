import { Link } from 'react-router-dom'
import { dateFormatter } from '@/shared/lib/formatters'
import { useMarkNotificationRead } from '../hooks/useNotifications'
import { NOTIFICATION_CONFIG } from './notificationConfig'
import type { NotificationEntry } from '../types'

export function NotificationItem({ notification }: { notification: NotificationEntry }) {
  const { icon: Icon, iconClass, bgClass } = NOTIFICATION_CONFIG[notification.type]
  const markRead = useMarkNotificationRead()

  return (
    <li
      className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${
        notification.isRead
          ? 'border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900'
          : 'border-indigo-200 bg-indigo-50/50 dark:border-indigo-900 dark:bg-indigo-950/20'
      }`}
    >
      <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${bgClass}`}>
        <Icon className={`size-4 ${iconClass}`} aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
            {notification.type}
          </p>
          <p className="shrink-0 text-xs text-gray-400">{dateFormatter.format(new Date(notification.date))}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-800 dark:text-gray-200">{notification.message}</p>
        <div className="mt-1.5 flex items-center gap-3">
          <Link
            to={`/vendors/${notification.vendorId}`}
            className="text-xs text-indigo-600 hover:underline dark:text-indigo-400"
          >
            View vendor
          </Link>
          {!notification.isRead && (
            <button
              type="button"
              onClick={() => markRead.mutate(notification.id)}
              disabled={markRead.isPending}
              className="text-xs font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Mark as read
            </button>
          )}
        </div>
      </div>
    </li>
  )
}
