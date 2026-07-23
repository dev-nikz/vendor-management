import { delay, http, HttpResponse } from 'msw'
import { mockVendorDirectory } from './mockData'
import type { VendorDirectoryEntry, VendorSortField } from '../types'

const NETWORK_DELAY_MS = 500

function compare(a: VendorDirectoryEntry, b: VendorDirectoryEntry, field: VendorSortField) {
  const av = a[field]
  const bv = b[field]
  if (typeof av === 'number' && typeof bv === 'number') return av - bv
  return String(av).localeCompare(String(bv))
}

export const vendorDirectoryHandlers = [
  http.get('/api/vendors', async ({ request }) => {
    await delay(NETWORK_DELAY_MS)

    const url = new URL(request.url)
    const search = (url.searchParams.get('search') ?? '').trim().toLowerCase()
    const category = url.searchParams.get('category')
    const status = url.searchParams.get('status')
    const sortField = (url.searchParams.get('sortField') ?? 'vendorName') as VendorSortField
    const sortDirection = url.searchParams.get('sortDirection') === 'desc' ? 'desc' : 'asc'
    const page = Number(url.searchParams.get('page') ?? '1')
    const pageSize = Number(url.searchParams.get('pageSize') ?? '25')

    let rows = mockVendorDirectory

    if (search) {
      rows = rows.filter(
        (v) =>
          v.vendorName.toLowerCase().includes(search) ||
          v.vendorCode.toLowerCase().includes(search) ||
          v.contactPerson.toLowerCase().includes(search) ||
          v.city.toLowerCase().includes(search),
      )
    }
    if (category) rows = rows.filter((v) => v.category === category)
    if (status) rows = rows.filter((v) => v.status === status)

    rows = [...rows].sort((a, b) => {
      const result = compare(a, b, sortField)
      return sortDirection === 'asc' ? result : -result
    })

    const total = rows.length
    const start = (page - 1) * pageSize
    const paged = pageSize >= total ? rows : rows.slice(start, start + pageSize)

    return HttpResponse.json({ data: paged, total, page, pageSize })
  }),
]
