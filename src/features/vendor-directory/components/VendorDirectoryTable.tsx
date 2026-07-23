import { ArrowDown, ArrowUp, ArrowUpDown, Star } from 'lucide-react'
import { StatusBadge } from './StatusBadge'
import { useVendorDirectoryStore } from '../store/useVendorDirectoryStore'
import type { VendorDirectoryEntry, VendorSortField } from '../types'

interface Column {
  field: VendorSortField
  label: string
  width: string
  render?: (vendor: VendorDirectoryEntry) => React.ReactNode
  align?: 'right'
}

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const dateFormatter = new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' })

const COLUMNS: Column[] = [
  {
    field: 'vendorName',
    label: 'Vendor Name',
    width: 'w-56',
    render: (v) => <span className="font-medium text-gray-900 dark:text-gray-100">{v.vendorName}</span>,
  },
  { field: 'vendorCode', label: 'Vendor Code', width: 'w-32' },
  { field: 'category', label: 'Category', width: 'w-44' },
  { field: 'contactPerson', label: 'Contact Person', width: 'w-40' },
  { field: 'city', label: 'City', width: 'w-32' },
  {
    field: 'rating',
    label: 'Rating',
    width: 'w-24',
    render: (v) => (
      <span className="inline-flex items-center gap-1">
        <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
        {v.rating.toFixed(1)}
      </span>
    ),
  },
  {
    field: 'status',
    label: 'Status',
    width: 'w-32',
    render: (v) => <StatusBadge status={v.status} />,
  },
  {
    field: 'lastTransactionDate',
    label: 'Last Transaction',
    width: 'w-36',
    render: (v) => dateFormatter.format(new Date(v.lastTransactionDate)),
  },
  {
    field: 'totalPurchaseValue',
    label: 'Total Purchase Value',
    width: 'w-40',
    align: 'right',
    render: (v) => currencyFormatter.format(v.totalPurchaseValue),
  },
]

const CONTAINER_HEIGHT = 560

interface VendorDirectoryTableProps {
  rows: VendorDirectoryEntry[]
}

export function VendorDirectoryTable({ rows }: VendorDirectoryTableProps) {
  const { sortField, sortDirection, toggleSort } = useVendorDirectoryStore()

  return (
    <div className="overflow-auto" style={{ maxHeight: CONTAINER_HEIGHT }}>
      <table className="w-full min-w-[900px] border-collapse text-sm">
        <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900">
          <tr>
            {COLUMNS.map((col) => (
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
              {COLUMNS.map((col) => (
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
