import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { getVendorDirectory } from '../api/vendorDirectoryApi'
import { COLUMNS, currencyFormatter, dateFormatter } from './columns'
import { useVendorDirectoryStore } from '../store/useVendorDirectoryStore'
import type { VendorDirectoryEntry } from '../types'

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`
  return value
}

function toCsvValue(vendor: VendorDirectoryEntry, field: keyof VendorDirectoryEntry): string {
  if (field === 'totalPurchaseValue') return currencyFormatter.format(vendor.totalPurchaseValue)
  if (field === 'lastTransactionDate') return dateFormatter.format(new Date(vendor.lastTransactionDate))
  return String(vendor[field])
}

export function ExportButton() {
  const [isExporting, setIsExporting] = useState(false)
  const { search, category, status, sortField, sortDirection, columnVisibility } = useVendorDirectoryStore()

  async function handleExport() {
    setIsExporting(true)
    try {
      const response = await getVendorDirectory({
        search,
        category,
        status,
        sortField,
        sortDirection,
        page: 1,
        pageSize: 10_000,
      })

      const visibleColumns = COLUMNS.filter((col) => columnVisibility[col.field] !== false)
      const header = visibleColumns.map((col) => csvEscape(col.label)).join(',')
      const rows = response.data.map((vendor) =>
        visibleColumns.map((col) => csvEscape(toCsvValue(vendor, col.field))).join(','),
      )
      const csv = [header, ...rows].join('\n')

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `vendor-directory-${new Date().toISOString().slice(0, 10)}.csv`
      link.click()
      URL.revokeObjectURL(url)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={isExporting}
      className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
    >
      {isExporting ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        <Download className="size-4" aria-hidden="true" />
      )}
      Export
    </button>
  )
}
