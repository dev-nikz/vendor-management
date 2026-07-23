import { Card } from '@/shared/ui/Card'
import { Badge } from '@/shared/ui/Badge'
import type { VendorDetails } from '../types'

function StatTile({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {value}
        {suffix && <span className="ml-0.5 text-sm font-normal text-gray-400">{suffix}</span>}
      </p>
    </div>
  )
}

export function PerformanceTab({ vendor }: { vendor: VendorDetails }) {
  const { performance, issues } = vendor
  const riskTone = performance.riskScore >= 70 ? 'danger' : performance.riskScore >= 40 ? 'warning' : 'success'

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatTile label="Quality Score" value={performance.qualityScore} suffix="/100" />
        <StatTile label="Delivery Score" value={performance.deliveryScore} suffix="/100" />
        <StatTile label="Response Time" value={performance.responseTimeHours} suffix="hrs" />
        <StatTile label="Payment History" value={performance.paymentHistoryScore} suffix="/100" />
        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">Risk Score</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {performance.riskScore}
            </span>
            <Badge tone={riskTone}>{riskTone === 'danger' ? 'High' : riskTone === 'warning' ? 'Medium' : 'Low'}</Badge>
          </div>
        </div>
      </div>

      <Card title="Recent Issues">
        {issues.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No issues raised.</p>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            {issues.map((issue) => (
              <li key={issue.id} className="flex items-center justify-between py-2 text-sm">
                <span className="text-gray-700 dark:text-gray-300">{issue.title}</span>
                <div className="flex items-center gap-2">
                  <Badge tone={issue.severity === 'High' ? 'danger' : issue.severity === 'Medium' ? 'warning' : 'neutral'}>
                    {issue.severity}
                  </Badge>
                  <Badge tone={issue.status === 'Open' ? 'warning' : 'success'}>{issue.status}</Badge>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
