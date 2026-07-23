import { Link } from 'react-router-dom'
import { Badge } from '@/shared/ui/Badge'
import { dateFormatter } from '@/shared/lib/formatters'
import type { RecentIssueEntry } from '../types'

export function RecentIssuesList({ issues }: { issues: RecentIssueEntry[] }) {
  if (issues.length === 0) {
    return <p className="text-sm text-gray-500 dark:text-gray-400">No issues raised recently.</p>
  }

  return (
    <ul className="divide-y divide-gray-100 dark:divide-gray-800">
      {issues.map((issue) => (
        <li key={issue.id} className="flex items-center justify-between gap-4 py-2.5 text-sm">
          <div className="min-w-0">
            <p className="truncate font-medium text-gray-900 dark:text-gray-100">{issue.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              <Link to={`/vendors/${issue.vendorId}`} className="text-indigo-600 hover:underline dark:text-indigo-400">
                {issue.vendorName}
              </Link>{' '}
              · {dateFormatter.format(new Date(issue.raisedOn))}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
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
