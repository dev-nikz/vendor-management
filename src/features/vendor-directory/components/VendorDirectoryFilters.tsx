import { useEffect, useState } from 'react'
import { Search, X } from 'lucide-react'
import { useDebouncedValue } from '@/shared/lib/useDebouncedValue'
import { useVendorDirectoryStore } from '../store/useVendorDirectoryStore'

const CATEGORIES = [
  'Civil Works',
  'Electrical',
  'Mechanical',
  'Logistics & Transport',
  'Safety & PPE',
  'IT & Software',
  'HVAC',
]

const STATUSES = ['Active', 'Blacklisted', 'Pending', 'On Hold'] as const

const selectClasses =
  'rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200'

export function VendorDirectoryFilters() {
  const { search, category, status, setSearch, setCategory, setStatus, resetFilters } =
    useVendorDirectoryStore()
  const [searchInput, setSearchInput] = useState(search)
  const debouncedSearch = useDebouncedValue(searchInput, 300)

  useEffect(() => {
    setSearch(debouncedSearch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  const hasActiveFilters = Boolean(search || category || status)

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400"
          aria-hidden="true"
        />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search name, code, contact, city…"
          className="w-72 rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
        />
      </div>

      <select
        value={category ?? ''}
        onChange={(e) => setCategory(e.target.value || null)}
        className={selectClasses}
      >
        <option value="">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={status ?? ''}
        onChange={(e) => setStatus((e.target.value || null) as typeof status)}
        className={selectClasses}
      >
        <option value="">All statuses</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => {
            setSearchInput('')
            resetFilters()
          }}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="size-3.5" aria-hidden="true" />
          Clear filters
        </button>
      )}
    </div>
  )
}
