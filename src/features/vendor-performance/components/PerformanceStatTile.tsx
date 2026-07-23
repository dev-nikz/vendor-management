import { Badge } from '@/shared/ui/Badge'

interface PerformanceStatTileProps {
  label: string
  value: number
  suffix?: string
  riskTone?: boolean
}

export function PerformanceStatTile({ label, value, suffix, riskTone }: PerformanceStatTileProps) {
  const tone = riskTone ? (value >= 70 ? 'danger' : value >= 40 ? 'warning' : 'success') : undefined

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {value}
          {suffix && <span className="ml-0.5 text-sm font-normal text-gray-400">{suffix}</span>}
        </span>
        {tone && (
          <Badge tone={tone}>{tone === 'danger' ? 'High' : tone === 'warning' ? 'Medium' : 'Low'}</Badge>
        )}
      </div>
    </div>
  )
}
