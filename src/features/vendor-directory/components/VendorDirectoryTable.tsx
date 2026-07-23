import { useMemo } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { COLUMNS } from './columns'
import { useVendorDirectoryStore } from '../store/useVendorDirectoryStore'
import type { VendorDirectoryEntry } from '../types'

const CONTAINER_HEIGHT = 560

interface VendorDirectoryTableProps {
  rows: VendorDirectoryEntry[]
}

export function VendorDirectoryTable({ rows }: VendorDirectoryTableProps) {
  const { sortField, sortDirection, toggleSort, columnVisibility } = useVendorDirectoryStore()
  const visibleColumns = useMemo(
    () => COLUMNS.filter((col) => columnVisibility[col.field] !== false),
    [columnVisibility],
  )

  return (
    <div className="overflow-auto" style={{ maxHeight: CONTAINER_HEIGHT }}>
      <table className="w-full min-w-[900px] border-collapse text-sm">
        <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900">
          <tr>
            {visibleColumns.map((col) => (
              <th
                key={col.field}
                className={`${col.width} border-b border-gray-200 px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase dark:border-gray-800 dark:text-gray-400 ${
                  col.align === 'right' ? 'text-right' : 'text-left'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleSort(col.field)}
                  className={`inline-flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-100 ${
                    col.align === 'right' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {col.label}
                  {sortField === col.field ? (
                    sortDirection === 'asc' ? (
                      <ArrowUp className="size-3" aria-hidden="true" />
                    ) : (
                      <ArrowDown className="size-3" aria-hidden="true" />
                    )
                  ) : (
                    <ArrowUpDown className="size-3 opacity-30" aria-hidden="true" />
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((vendor) => (
            <tr
              key={vendor.id}
              className="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-800/60 dark:hover:bg-gray-900/60"
            >
              {visibleColumns.map((col) => (
                <td
                  key={col.field}
                  className={`px-4 py-3 text-gray-700 dark:text-gray-300 ${
                    col.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                >
                  {col.render ? col.render(vendor) : String(vendor[col.field])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
