import { QueryBoundary } from '@/shared/ui/QueryBoundary'
import { VendorDirectoryFilters } from './components/VendorDirectoryFilters'
import { VendorDirectoryTable } from './components/VendorDirectoryTable'
import { VendorDirectoryTableSkeleton } from './components/VendorDirectoryTableSkeleton'
import { VendorDirectoryPagination } from './components/VendorDirectoryPagination'
import { useVendorDirectory } from './hooks/useVendorDirectory'
import { useVendorDirectoryStore } from './store/useVendorDirectoryStore'

export function VendorDirectoryPage() {
  const { search, category, status, sortField, sortDirection, page, pageSize } =
    useVendorDirectoryStore()

  const query = useVendorDirectory({ search, category, status, sortField, sortDirection, page, pageSize })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Vendor Directory</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Search, filter, and drill into every registered vendor.
        </p>
      </div>

      <VendorDirectoryFilters />

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <QueryBoundary
          query={query}
          isEmpty={(data) => data.data.length === 0}
          loadingFallback={<VendorDirectoryTableSkeleton />}
          emptyFallback={
            <div className="p-12 text-center text-sm text-gray-500 dark:text-gray-400">
              No vendors match your filters.
            </div>
          }
        >
          {(data) => (
            <>
              <VendorDirectoryTable rows={data.data} />
              <VendorDirectoryPagination total={data.total} />
            </>
          )}
        </QueryBoundary>
      </div>
    </div>
  )
}
