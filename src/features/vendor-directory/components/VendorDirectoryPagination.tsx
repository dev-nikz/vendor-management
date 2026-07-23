import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useVendorDirectoryStore } from '../store/useVendorDirectoryStore'

const PAGE_SIZE_OPTIONS = [25, 50, 100]

interface VendorDirectoryPaginationProps {
  total: number
}

export function VendorDirectoryPagination({ total }: VendorDirectoryPaginationProps) {
  const { page, pageSize, setPage, setPageSize } = useVendorDirectoryStore()
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const rangeStart = total === 0 ? 0 : (page - 1) * pageSize + 1
  const rangeEnd = Math.min(page * pageSize, total)

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 px-4 py-3 text-sm dark:border-gray-800">
      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
        <span>
          {rangeStart}-{rangeEnd} of {total}
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="rounded-md border border-gray-300 bg-white py-1 pl-2 pr-6 text-sm dark:border-gray-700 dark:bg-gray-900"
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="flex size-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        <span className="px-2 text-gray-600 dark:text-gray-300">
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="flex size-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
