import type { ReactNode } from 'react'
import type { UseQueryResult } from '@tanstack/react-query'
import { ApiError } from '@/shared/api/apiError'

interface QueryBoundaryProps<T> {
  query: UseQueryResult<T, Error>
  children: (data: T) => ReactNode
  isEmpty?: (data: T) => boolean
  loadingFallback: ReactNode
  emptyFallback?: ReactNode
}

export function QueryBoundary<T>({
  query,
  children,
  isEmpty,
  loadingFallback,
  emptyFallback,
}: QueryBoundaryProps<T>) {
  if (query.isPending) {
    return <>{loadingFallback}</>
  }

  if (query.isError) {
    const error = query.error
    if (error instanceof ApiError && error.isUnauthorized) {
      return <UnauthorizedState />
    }
    return <ErrorState onRetry={() => query.refetch()} />
  }

  if (isEmpty?.(query.data)) {
    return <>{emptyFallback ?? <EmptyState />}</>
  }

  return <>{children(query.data)}</>
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/30">
      <p className="text-sm font-medium text-red-700 dark:text-red-400">
        Something went wrong loading this data.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  )
}

function UnauthorizedState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-8 text-center dark:border-amber-900/50 dark:bg-amber-950/30">
      <p className="text-sm font-medium text-amber-800 dark:text-amber-400">
        Your session has expired.
      </p>
      <p className="text-sm text-amber-700 dark:text-amber-500">Please sign in again to continue.</p>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">No data available.</p>
    </div>
  )
}
