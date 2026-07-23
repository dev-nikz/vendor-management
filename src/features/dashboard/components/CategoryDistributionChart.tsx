import { memo, useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartTooltip } from '@/shared/ui/ChartTooltip'
import type { CategoryDistributionSlice } from '../types'

interface CategoryDistributionChartProps {
  data: CategoryDistributionSlice[]
}

function CategoryDistributionChartComponent({ data }: CategoryDistributionChartProps) {
  const sorted = useMemo(
    () => [...data].sort((a, b) => b.vendorCount - a.vendorCount),
    [data],
  )

  return (
    <div className="viz-root">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{ top: 8, right: 32, bottom: 0, left: 0 }}
          barCategoryGap="24%"
        >
          <CartesianGrid horizontal={false} stroke="var(--chart-gridline)" strokeDasharray="0" />
          <XAxis type="number" domain={[0, 'dataMax']} hide />
          <YAxis
            type="category"
            dataKey="category"
            tickLine={false}
            axisLine={false}
            width={150}
            tick={{ fill: 'var(--chart-text-secondary)', fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: 'var(--chart-gridline)', opacity: 0.4 }}
            content={<ChartTooltip valueFormatter={(v) => `${v} vendors`} />}
          />
          <Bar
            dataKey="vendorCount"
            fill="var(--series-1)"
            radius={[0, 4, 4, 0]}
            maxBarSize={20}
            isAnimationActive={false}
          >
            <LabelList
              dataKey="vendorCount"
              position="right"
              fill="var(--chart-text-primary)"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export const CategoryDistributionChart = memo(CategoryDistributionChartComponent)
