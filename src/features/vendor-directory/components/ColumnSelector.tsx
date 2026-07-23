import { useRef, useState } from 'react'
import { Columns3 } from 'lucide-react'
import { useClickOutside } from '@/shared/lib/useClickOutside'
import { COLUMNS } from './columns'
import { useVendorDirectoryStore } from '../store/useVendorDirectoryStore'

export function ColumnSelector() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { columnVisibility, toggleColumnVisibility } = useVendorDirectoryStore()

  useClickOutside(ref, () => setOpen(false))

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        <Columns3 className="size-4" aria-hidden="true" />
        Columns
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-1 w-56 rounded-md border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-900">
          {COLUMNS.map((col) => (
            <label
              key={col.field}
              className="flex items-center gap-2 rounded px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <input
                type="checkbox"
                checked={columnVisibility[col.field] !== false}
                onChange={() => toggleColumnVisibility(col.field)}
                className="rounded border-gray-300"
              />
              {col.label}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
