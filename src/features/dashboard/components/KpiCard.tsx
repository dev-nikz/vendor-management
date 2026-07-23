import { memo } from 'react'
import type { LucideIcon } from 'lucide-react'

type Accent = 'default' | 'success' | 'danger' | 'warning'

interface KpiCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  accent?: Accent
}

const ACCENT_STYLES: Record<Accent, string> = {
  default: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400',
  success: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400',
  danger: 'bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400',
  warning: 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400',
}

function KpiCardComponent({ label, value, icon: Icon, accent = 'default' }: KpiCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className={`flex size-11 shrink-0 items-center justify-center rounded-lg ${ACCENT_STYLES[accent]}`}>
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-sm leading-snug text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{value}</p>
      </div>
    </div>
  )
}

export const KpiCard = memo(KpiCardComponent)
