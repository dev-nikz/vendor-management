import { useRef, useState } from 'react'
import { Bookmark, Trash2 } from 'lucide-react'
import { useClickOutside } from '@/shared/lib/useClickOutside'
import { useVendorDirectoryStore } from '../store/useVendorDirectoryStore'

export function SavedViewsMenu() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const { savedViews, saveCurrentView, applyView, deleteView } = useVendorDirectoryStore()

  useClickOutside(ref, () => setOpen(false))

  function handleSave() {
    const trimmed = name.trim()
    if (!trimmed) return
    saveCurrentView(trimmed)
    setName('')
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        <Bookmark className="size-4" aria-hidden="true" />
        Saved Views
        {savedViews.length > 0 && (
          <span className="rounded-full bg-gray-100 px-1.5 text-xs dark:bg-gray-800">{savedViews.length}</span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-1 w-72 rounded-md border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-2 flex items-center gap-1.5 border-b border-gray-100 pb-2 dark:border-gray-800">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              placeholder="Name this view…"
              className="min-w-0 flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800"
            />
            <button
              type="button"
              onClick={handleSave}
              disabled={!name.trim()}
              className="rounded-md bg-indigo-600 px-2.5 py-1 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-40"
            >
              Save
            </button>
          </div>

          {savedViews.length === 0 ? (
            <p className="px-2 py-3 text-sm text-gray-500 dark:text-gray-400">
              No saved views yet. Set your filters/columns, then save them above.
            </p>
          ) : (
            <ul className="max-h-64 space-y-0.5 overflow-y-auto">
              {savedViews.map((view) => (
                <li key={view.id} className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      applyView(view.id)
                      setOpen(false)
                    }}
                    className="flex-1 truncate rounded px-2 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    {view.name}
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteView(view.id)}
                    className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50"
                    aria-label={`Delete view ${view.name}`}
                  >
                    <Trash2 className="size-3.5" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
