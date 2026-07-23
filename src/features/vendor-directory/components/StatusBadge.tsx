import type { VendorStatus } from '../types'

const STATUS_STYLES: Record<VendorStatus, string> = {
  Active: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  Blacklisted: 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400',
  Pending: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
  'On Hold': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
}

const STATUS_DOT: Record<VendorStatus, string> = {
  Active: 'bg-emerald-500',
  Blacklisted: 'bg-red-500',
  Pending: 'bg-amber-500',
  'On Hold': 'bg-gray-400',
}

export function StatusBadge({ status }: { status: VendorStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${STATUS_STYLES[status]}`}
    >
      <span className={`size-1.5 rounded-full ${STATUS_DOT[status]}`} aria-hidden="true" />
      {status}
    </span>
  )
}
