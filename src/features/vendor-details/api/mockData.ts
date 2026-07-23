import { mockVendorDirectory } from '@/features/vendor-directory/api/mockData'
import type { VendorDirectoryEntry } from '@/features/vendor-directory/types'
import type {
  AuditEvent,
  PurchaseHistoryEntry,
  VendorContact,
  VendorDetails,
  VendorDocument,
  VendorIssue,
  VendorPayment,
  VendorProject,
} from '../types'

// Simple string-seeded PRNG so each vendor's generated detail is stable across reloads.
function seededRandom(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0
  return function random() {
    h = (Math.imul(h ^ (h >>> 15), 1 | h) + 0x6d2b79f5) | 0
    let t = Math.imul(h ^ (h >>> 7), 61 | h)
    t = (t + Math.imul(t ^ (t >>> 14), 2246822519)) ^ t
    return ((t ^ (t >>> 16)) >>> 0) / 4294967296
  }
}

const FIRST_NAMES = ['Rohan', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anjali', 'Rajesh', 'Kavita']
const LAST_NAMES = ['Sharma', 'Verma', 'Patel', 'Reddy', 'Nair', 'Iyer', 'Gupta', 'Singh']
const ROLES = ['Accounts Manager', 'Sales Lead', 'Site Supervisor', 'Operations Head']
const CERTIFICATIONS = ['ISO 9001', 'ISO 14001', 'OHSAS 18001', 'MSME Registered', 'GST Compliant']
const DOC_TYPES = ['GST Certificate', 'PAN Card', 'ISO Certificate', 'Insurance Policy', 'Trade License']
const PROJECT_NAMES = [
  'Metro Rail Extension',
  'Riverside Township',
  'Highway Bridge Phase 2',
  'Industrial Park Setup',
  'Solar Plant Installation',
  'Warehouse Complex',
]
const ISSUE_TITLES = [
  'Delayed material delivery',
  'Invoice discrepancy',
  'Quality below spec',
  'Missing safety documentation',
  'Communication delay',
]

function buildVendorDetails(base: VendorDirectoryEntry): VendorDetails {
  const rand = seededRandom(base.id)
  const pick = <T,>(items: T[]) => items[Math.floor(rand() * items.length)]
  const dateOffset = (maxDays: number) =>
    new Date(Date.now() - Math.floor(rand() * maxDays) * 86_400_000).toISOString().slice(0, 10)

  const contacts: VendorContact[] = Array.from({ length: 2 + Math.floor(rand() * 2) }, (_, i) => ({
    name: `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`,
    role: pick(ROLES),
    email: `contact${i + 1}@${base.vendorCode.toLowerCase()}.example.com`,
    phone: `+91 98${Math.floor(10000000 + rand() * 89999999)}`,
    isPrimary: i === 0,
  }))

  const documents: VendorDocument[] = DOC_TYPES.map((type, i) => {
    const expiresInDays = Math.floor(rand() * 400) - 60
    const status = expiresInDays < 0 ? 'Expired' : expiresInDays < 30 ? 'Expiring Soon' : 'Valid'
    return {
      name: `${type} - ${base.vendorCode}`,
      type,
      uploadedOn: dateOffset(500),
      expiresOn: i < 3 ? new Date(Date.now() + expiresInDays * 86_400_000).toISOString().slice(0, 10) : null,
      status,
    }
  })

  const payments: VendorPayment[] = Array.from({ length: 6 }, (_, i) => ({
    id: `PAY-${base.vendorCode}-${i + 1}`,
    date: dateOffset(365),
    invoiceRef: `INV-${1000 + Math.floor(rand() * 8999)}`,
    amount: Math.round((20_000 + rand() * 500_000) / 1000) * 1000,
    status: pick(['Paid', 'Paid', 'Paid', 'Pending', 'Overdue'] as const),
  }))

  const projects: VendorProject[] = Array.from({ length: 2 + Math.floor(rand() * 2) }, (_, i) => {
    const isOngoing = rand() > 0.5
    return {
      id: `PRJ-${base.vendorCode}-${i + 1}`,
      name: pick(PROJECT_NAMES),
      role: pick(ROLES),
      startDate: dateOffset(600),
      endDate: isOngoing ? null : dateOffset(100),
      status: isOngoing ? 'Ongoing' : 'Completed',
    }
  })

  const issues: VendorIssue[] = Array.from({ length: Math.floor(rand() * 3) + 1 }, (_, i) => ({
    id: `ISS-${base.vendorCode}-${i + 1}`,
    title: pick(ISSUE_TITLES),
    raisedOn: dateOffset(300),
    severity: pick(['Low', 'Medium', 'High'] as const),
    status: pick(['Open', 'Resolved', 'Resolved'] as const),
  }))

  const auditTimeline: AuditEvent[] = [
    { id: `AUD-${base.id}-1`, date: dateOffset(700), actor: 'System', action: 'Vendor onboarded' },
    { id: `AUD-${base.id}-2`, date: dateOffset(500), actor: 'Priya Sharma', action: 'Documents verified' },
    {
      id: `AUD-${base.id}-3`,
      date: dateOffset(300),
      actor: 'Approval Workflow',
      action: base.status === 'Blacklisted' ? 'Vendor blacklisted' : 'Vendor approved',
    },
    { id: `AUD-${base.id}-4`, date: dateOffset(60), actor: 'Rohan Mehta', action: 'Rating updated' },
  ].sort((a, b) => a.date.localeCompare(b.date))

  const purchaseHistory: PurchaseHistoryEntry[] = Array.from({ length: 8 }, (_, i) => ({
    id: `PO-${base.vendorCode}-${i + 1}`,
    date: dateOffset(500),
    poNumber: `PO-${20000 + Math.floor(rand() * 9999)}`,
    amount: Math.round((30_000 + rand() * 800_000) / 1000) * 1000,
    status: pick(['Delivered', 'Delivered', 'Delivered', 'In Transit', 'Cancelled'] as const),
  }))

  return {
    ...base,
    gst: `27${base.vendorCode}1Z${Math.floor(rand() * 9)}`,
    pan: `${base.vendorCode.slice(0, 5)}${1000 + Math.floor(rand() * 8999)}${pick(['A', 'B', 'C'])}`,
    address: `${Math.floor(rand() * 900) + 100}, Industrial Area, ${base.city}, India`,
    bankAccountMasked: `XXXX XXXX ${1000 + Math.floor(rand() * 8999)}`,
    paymentTerms: pick(['Net 30', 'Net 45', 'Net 60', 'Advance 20% / Net 30']),
    certifications: CERTIFICATIONS.filter(() => rand() > 0.4),
    contacts,
    documents,
    payments,
    projects,
    issues,
    auditTimeline,
    performance: {
      qualityScore: Math.round((base.rating - 0.3 + rand() * 0.6) * 20),
      deliveryScore: Math.round(60 + rand() * 40),
      responseTimeHours: Math.round(2 + rand() * 46),
      paymentHistoryScore: Math.round(60 + rand() * 40),
      riskScore: base.status === 'Blacklisted' ? Math.round(70 + rand() * 30) : Math.round(rand() * 40),
    },
    purchaseHistory,
  }
}

export function getMockVendorDetails(id: string): VendorDetails | undefined {
  const base = mockVendorDirectory.find((v) => v.id === id)
  return base ? buildVendorDetails(base) : undefined
}
