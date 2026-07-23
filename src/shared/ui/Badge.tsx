import type { ReactNode } from 'react'

type BadgeTone = 'success' | 'warning' | 'danger' | 'neutral' | 'info'

const TONE_STYLES: Record<BadgeTone, string> = {
  success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  warning: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
  danger: 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400',
  neutral: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  info: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400',
}

export function Badge({ tone = 'neutral', children }: { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${TONE_STYLES[tone]}`}>
      {children}
    </span>
  )
}
