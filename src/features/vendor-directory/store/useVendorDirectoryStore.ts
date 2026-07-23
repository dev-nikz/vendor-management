import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  VendorColumnVisibility,
  VendorDirectorySavedView,
  VendorSortField,
  VendorStatus,
} from '../types'

const DEFAULT_PAGE_SIZE = 25

interface VendorDirectoryState {
  search: string
  category: string | null
  status: VendorStatus | null
  sortField: VendorSortField
  sortDirection: 'asc' | 'desc'
  page: number
  pageSize: number
  columnVisibility: VendorColumnVisibility
  savedViews: VendorDirectorySavedView[]

  setSearch: (search: string) => void
  setCategory: (category: string | null) => void
  setStatus: (status: VendorStatus | null) => void
  toggleSort: (field: VendorSortField) => void
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  resetFilters: () => void
  toggleColumnVisibility: (field: VendorSortField) => void
  saveCurrentView: (name: string) => void
  applyView: (id: string) => void
  deleteView: (id: string) => void
}

export const useVendorDirectoryStore = create<VendorDirectoryState>()(
  persist(
    (set, get) => ({
      search: '',
      category: null,
      status: null,
      sortField: 'vendorName',
      sortDirection: 'asc',
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      columnVisibility: {},
      savedViews: [],

      setSearch: (search) => set({ search, page: 1 }),
      setCategory: (category) => set({ category, page: 1 }),
      setStatus: (status) => set({ status, page: 1 }),
      toggleSort: (field) =>
        set((state) => {
          if (state.sortField !== field) return { sortField: field, sortDirection: 'asc', page: 1 }
          return { sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc', page: 1 }
        }),
      setPage: (page) => set({ page }),
      setPageSize: (pageSize) => set({ pageSize, page: 1 }),
      resetFilters: () => set({ search: '', category: null, status: null, page: 1 }),

      toggleColumnVisibility: (field) =>
        set((state) => ({
          columnVisibility: { ...state.columnVisibility, [field]: state.columnVisibility[field] === false },
        })),

      saveCurrentView: (name) => {
        const state = get()
        const view: VendorDirectorySavedView = {
          id: crypto.randomUUID(),
          name,
          search: state.search,
          category: state.category,
          status: state.status,
          sortField: state.sortField,
          sortDirection: state.sortDirection,
          pageSize: state.pageSize,
          columnVisibility: state.columnVisibility,
        }
        set({ savedViews: [...state.savedViews, view] })
      },

      applyView: (id) => {
        const view = get().savedViews.find((v) => v.id === id)
        if (!view) return
        set({
          search: view.search,
          category: view.category,
          status: view.status,
          sortField: view.sortField,
          sortDirection: view.sortDirection,
          pageSize: view.pageSize,
          columnVisibility: view.columnVisibility,
          page: 1,
        })
      },

      deleteView: (id) => set((state) => ({ savedViews: state.savedViews.filter((v) => v.id !== id) })),
    }),
    {
      name: 'vendor-directory-store',
      partialize: (state) => ({ savedViews: state.savedViews, columnVisibility: state.columnVisibility }),
    },
  ),
)
