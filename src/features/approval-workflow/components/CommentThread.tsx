import { useState } from 'react'
import { dateFormatter } from '@/shared/lib/formatters'
import { useAddApprovalComment } from '../hooks/useApprovalWorkflow'
import type { ApprovalComment } from '../types'

export function CommentThread({ vendorId, comments }: { vendorId: string; comments: ApprovalComment[] }) {
  const [message, setMessage] = useState('')
  const mutation = useAddApprovalComment(vendorId)

  function handleSubmit() {
    const trimmed = message.trim()
    if (!trimmed) return
    mutation.mutate(trimmed, { onSuccess: () => setMessage('') })
  }

  return (
    <div className="space-y-3">
      {comments.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No comments yet.</p>
      ) : (
        <ul className="space-y-2.5">
          {comments.map((comment) => (
            <li key={comment.id} className="rounded-md border border-gray-200 p-2.5 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{comment.author}</p>
                <p className="text-xs text-gray-400">{dateFormatter.format(new Date(comment.createdAt))}</p>
              </div>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{comment.message}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-start gap-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={2}
          placeholder="Add a comment…"
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!message.trim() || mutation.isPending}
          className="shrink-0 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Comment
        </button>
      </div>
    </div>
  )
}
