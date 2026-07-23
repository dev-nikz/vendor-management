import { memo } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartTooltip } from '@/shared/ui/ChartTooltip'
import type { PerformanceTrendPoint } from '../types'

interface PerformanceTrendChartProps {
  data: PerformanceTrendPoint[]
}

function PerformanceTrendChartComponent({ data }: PerformanceTrendChartProps) {
  return (
    <div className="viz-root">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: -8 }}>
          <CartesianGrid vertical={false} stroke="var(--chart-gridline)" strokeDasharray="0" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={{ stroke: 'var(--chart-baseline)' }}
            tick={{ fill: 'var(--chart-muted)', fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={[0, 5]}
            ticks={[0, 1, 2, 3, 4, 5]}
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'var(--chart-muted)', fontSize: 12 }}
            width={28}
          />
          <Tooltip
            cursor={{ stroke: 'var(--chart-baseline)', strokeWidth: 1 }}
            content={<ChartTooltip valueFormatter={(v) => `${v} avg rating`} />}
          />
          <Line
            type="monotone"
            dataKey="averageRating"
            stroke="var(--series-1)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
            activeDot={{ r: 4, stroke: 'var(--chart-surface)', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export const PerformanceTrendChart = memo(PerformanceTrendChartComponent)
