import { dateFormatter } from '@/shared/lib/formatters'
import type { ApprovalTimelineEvent } from '../types'

export function ApprovalTimeline({ events }: { events: ApprovalTimelineEvent[] }) {
  return (
    <ol className="relative space-y-5 border-l border-gray-200 pl-6 dark:border-gray-800">
      {events.map((event) => (
        <li key={event.id} className="relative">
          <span className="absolute top-1 -left-[29px] size-2.5 rounded-full bg-indigo-500" aria-hidden="true" />
          <p className="text-xs text-gray-500 dark:text-gray-400">{dateFormatter.format(new Date(event.date))}</p>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{event.action}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">by {event.actor}</p>
          {event.comment && (
            <p className="mt-1 rounded-md bg-gray-50 px-2.5 py-1.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              {event.comment}
            </p>
          )}
        </li>
      ))}
    </ol>
  )
}
