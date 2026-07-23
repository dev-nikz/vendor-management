import { dateFormatter } from '@/shared/lib/formatters'
import type { AuditEvent } from '../types'

export function AuditTimelineTab({ events }: { events: AuditEvent[] }) {
  return (
    <ol className="relative space-y-6 border-l border-gray-200 pl-6 dark:border-gray-800">
      {events.map((event) => (
        <li key={event.id} className="relative">
          <span className="absolute top-1 -left-[29px] size-2.5 rounded-full bg-indigo-500" aria-hidden="true" />
          <p className="text-xs text-gray-500 dark:text-gray-400">{dateFormatter.format(new Date(event.date))}</p>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{event.action}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">by {event.actor}</p>
        </li>
      ))}
    </ol>
  )
}
