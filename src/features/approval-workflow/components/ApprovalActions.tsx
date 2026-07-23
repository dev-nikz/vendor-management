import { useState } from 'react'
import { Check, MessageCircleWarning, X } from 'lucide-react'
import { useApprovalAction } from '../hooks/useApprovalWorkflow'
import type { ApprovalAction } from '../types'

const ACTIONABLE_STATUSES = new Set(['Pending', 'On Hold'])

export function ApprovalActions({ vendorId, status }: { vendorId: string; status: string }) {
  const [comment, setComment] = useState('')
  const mutation = useApprovalAction(vendorId)

  if (!ACTIONABLE_STATUSES.has(status)) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        This vendor is already {status.toLowerCase()} - no further approval action needed.
      </p>
    )
  }

  function handleAction(action: ApprovalAction) {
    mutation.mutate(
      { action, comment: comment.trim() || `${action.replace('-', ' ')} without additional comment` },
      { onSuccess: () => setComment('') },
    )
  }

  return (
    <div className="space-y-3">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={2}
        placeholder="Add a decision comment (optional)…"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
      />
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => handleAction('approve')}
          disabled={mutation.isPending}
          className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          <Check className="size-4" aria-hidden="true" />
          Approve
        </button>
        <button
          type="button"
          onClick={() => handleAction('reject')}
          disabled={mutation.isPending}
          className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
        >
          <X className="size-4" aria-hidden="true" />
          Reject
        </button>
        <button
          type="button"
          onClick={() => handleAction('request-changes')}
          disabled={mutation.isPending}
          className="inline-flex items-center gap-1.5 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700 hover:bg-amber-100 disabled:opacity-50 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-400"
        >
          <MessageCircleWarning className="size-4" aria-hidden="true" />
          Request Changes
        </button>
      </div>
      {mutation.isError && (
        <p className="text-sm text-red-600 dark:text-red-400">Something went wrong. Please try again.</p>
      )}
    </div>
  )
}
