import { useEffect, useState } from 'react'
import { QueryBoundary } from '@/shared/ui/QueryBoundary'
import { ApprovalQueueList } from './components/ApprovalQueueList'
import { ApprovalDetailPanel } from './components/ApprovalDetailPanel'
import { ApprovalDetailSkeleton, ApprovalQueueSkeleton } from './components/ApprovalWorkflowSkeleton'
import { useApprovalDetail, useApprovalQueue } from './hooks/useApprovalWorkflow'

export function ApprovalWorkflowPage() {
  const queueQuery = useApprovalQueue()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    if (!selectedId && queueQuery.data && queueQuery.data.length > 0) {
      setSelectedId(queueQuery.data[0].id)
    }
  }, [queueQuery.data, selectedId])

  const detailQuery = useApprovalDetail(selectedId)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Approval Workflow</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Review vendors awaiting approval - approve, reject, or request changes.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        <div>
          <h3 className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
            Queue
          </h3>
          <QueryBoundary query={queueQuery} loadingFallback={<ApprovalQueueSkeleton />}>
            {(entries) => (
              <ApprovalQueueList entries={entries} selectedId={selectedId} onSelect={setSelectedId} />
            )}
          </QueryBoundary>
        </div>

        <div>
          {!selectedId ? (
            <div className="flex h-full min-h-48 items-center justify-center rounded-lg border border-dashed border-gray-300 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
              Select a vendor from the queue to review.
            </div>
          ) : (
            <QueryBoundary query={detailQuery} loadingFallback={<ApprovalDetailSkeleton />}>
              {(detail) => <ApprovalDetailPanel detail={detail} />}
            </QueryBoundary>
          )}
        </div>
      </div>
    </div>
  )
}
