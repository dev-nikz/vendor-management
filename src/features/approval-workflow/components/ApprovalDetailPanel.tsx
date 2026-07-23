import { Card } from '@/shared/ui/Card'
import { StatusBadge } from '@/features/vendor-directory/components/StatusBadge'
import { ApprovalTimeline } from './ApprovalTimeline'
import { CommentThread } from './CommentThread'
import { ApprovalActions } from './ApprovalActions'
import type { ApprovalDetail } from '../types'

export function ApprovalDetailPanel({ detail }: { detail: ApprovalDetail }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{detail.vendorName}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {detail.vendorCode} · {detail.category} · {detail.city} · {detail.contactPerson}
          </p>
        </div>
        <StatusBadge status={detail.status} />
      </div>

      <Card title="Decision">
        <ApprovalActions vendorId={detail.id} status={detail.status} />
      </Card>

      <Card title="Approval Timeline">
        <ApprovalTimeline events={detail.timeline} />
      </Card>

      <Card title="Comments">
        <CommentThread vendorId={detail.id} comments={detail.comments} />
      </Card>
    </div>
  )
}
