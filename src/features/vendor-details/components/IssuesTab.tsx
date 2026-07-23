import { Badge } from '@/shared/ui/Badge'
import { dateFormatter } from '@/shared/lib/formatters'
import type { VendorIssue } from '../types'

export function IssuesTab({ issues }: { issues: VendorIssue[] }) {
  if (issues.length === 0) {
    return <p className="text-sm text-gray-500 dark:text-gray-400">No issues raised for this vendor.</p>
  }

  return (
    <ul className="space-y-2">
      {issues.map((issue) => (
        <li
          key={issue.id}
          className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-800"
        >
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{issue.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Raised {dateFormatter.format(new Date(issue.raisedOn))}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge tone={issue.severity === 'High' ? 'danger' : issue.severity === 'Medium' ? 'warning' : 'neutral'}>
              {issue.severity}
            </Badge>
            <Badge tone={issue.status === 'Open' ? 'warning' : 'success'}>{issue.status}</Badge>
          </div>
        </li>
      ))}
    </ul>
  )
}
