import { delay, http, HttpResponse } from 'msw'
import { mockVendorDirectory } from '@/features/vendor-directory/api/mockData'
import type { VendorDirectoryEntry } from '@/features/vendor-directory/types'

function guessCityFromAddress(address: string): string {
  const parts = address
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean)
  return parts[1] ?? parts[0] ?? 'Unknown'
}

export const vendorFormHandlers = [
  http.post('/api/vendors', async ({ request }) => {
    await delay(600)
    const body = (await request.json()) as Record<string, unknown>

    if (!body.vendorName || !body.gst || !body.pan) {
      return HttpResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    const vendorCode = `NEW-${Math.floor(1000 + Math.random() * 8999)}`
    const id = `${vendorCode}-${Date.now()}`

    const newEntry: VendorDirectoryEntry = {
      id,
      vendorName: String(body.vendorName),
      vendorCode,
      category: String(body.category ?? 'Uncategorized'),
      contactPerson: String(body.contactPerson ?? ''),
      city: guessCityFromAddress(String(body.address ?? '')),
      rating: 0,
      status: 'Pending',
      lastTransactionDate: new Date().toISOString().slice(0, 10),
      totalPurchaseValue: 0,
    }

    // Newly created vendors need to show up in the Vendor Directory immediately,
    // so this mutates the same in-memory array the directory's GET handler reads from.
    mockVendorDirectory.unshift(newEntry)

    return HttpResponse.json({ id, vendorCode, status: 'Pending' }, { status: 201 })
  }),
]
