interface ChartTooltipPayloadEntry {
  value: number | string
  color?: string
}

interface ChartTooltipProps {
  active?: boolean
  label?: string
  payload?: ChartTooltipPayloadEntry[]
  valueFormatter?: (value: number | string) => string
}

export function ChartTooltip({ active, label, payload, valueFormatter }: ChartTooltipProps) {
  if (!active || !payload?.length) return null

  const entry = payload[0]
  const value = valueFormatter ? valueFormatter(entry.value) : entry.value

  return (
    <div
      className="rounded-md border px-3 py-2 shadow-md"
      style={{
        background: 'var(--chart-surface)',
        borderColor: 'var(--chart-gridline)',
      }}
    >
      <p className="text-xs" style={{ color: 'var(--chart-text-secondary)' }}>
        {label}
      </p>
      <p className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--chart-text-primary)' }}>
        <span
          aria-hidden="true"
          className="inline-block h-0.5 w-3 rounded-full"
          style={{ background: entry.color ?? 'var(--series-1)' }}
        />
        {value}
      </p>
    </div>
  )
}
