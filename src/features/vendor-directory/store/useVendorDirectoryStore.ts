import { create } from 'zustand'
import type { VendorSortField, VendorStatus } from '../types'

const DEFAULT_PAGE_SIZE = 25

interface VendorDirectoryState {
  search: string
  category: string | null
  status: VendorStatus | null
  sortField: VendorSortField
  sortDirection: 'asc' | 'desc'
  page: number
  pageSize: number

  setSearch: (search: string) => void
  setCategory: (category: string | null) => void
  setStatus: (status: VendorStatus | null) => void
  toggleSort: (field: VendorSortField) => void
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  resetFilters: () => void
}

export const useVendorDirectoryStore = create<VendorDirectoryState>((set) => ({
  search: '',
  category: null,
  status: null,
  sortField: 'vendorName',
  sortDirection: 'asc',
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,

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
}))
