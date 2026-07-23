import { StatusBadge } from '@/features/vendor-directory/components/StatusBadge'
import { dateFormatter } from '@/shared/lib/formatters'
import type { ApprovalQueueEntry } from '../types'

interface ApprovalQueueListProps {
  entries: ApprovalQueueEntry[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function ApprovalQueueList({ entries, selectedId, onSelect }: ApprovalQueueListProps) {
  if (entries.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
        No vendors currently need approval action.
      </div>
    )
  }

  return (
    <ul className="space-y-1.5">
      {entries.map((entry) => (
        <li key={entry.id}>
          <button
            type="button"
            onClick={() => onSelect(entry.id)}
            className={`w-full rounded-lg border px-3 py-2.5 text-left transition-colors ${
              selectedId === entry.id
                ? 'border-indigo-500 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-950/40'
                : 'border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                {entry.vendorName}
              </p>
              <StatusBadge status={entry.status} />
            </div>
            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              {entry.category} · Submitted {dateFormatter.format(new Date(entry.submittedOn))}
            </p>
          </button>
        </li>
      ))}
    </ul>
  )
}
