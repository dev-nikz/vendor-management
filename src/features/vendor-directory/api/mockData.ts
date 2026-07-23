import type { VendorDirectoryEntry, VendorStatus } from '../types'

// Deterministic PRNG (mulberry32) so the mock dataset is stable across reloads.
function mulberry32(seed: number) {
  let a = seed
  return function random() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rng = mulberry32(248)

function shuffle<T>(items: T[]): T[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function pick<T>(items: T[]): T {
  return items[Math.floor(rng() * items.length)]
}

// Matches the Module 1 dashboard's category-wise distribution exactly.
const CATEGORY_COUNTS: Record<string, number> = {
  'Civil Works': 68,
  Electrical: 52,
  Mechanical: 41,
  'Logistics & Transport': 33,
  'Safety & PPE': 21,
  'IT & Software': 18,
  HVAC: 15,
}

// Matches the Module 1 dashboard's KPI cards exactly.
const STATUS_COUNTS: Record<VendorStatus, number> = {
  Active: 212,
  Blacklisted: 9,
  Pending: 14,
  'On Hold': 13,
  Rejected: 0,
}

const CATEGORY_CODE_PREFIX: Record<string, string> = {
  'Civil Works': 'CIV',
  Electrical: 'ELE',
  Mechanical: 'MEC',
  'Logistics & Transport': 'LOG',
  'Safety & PPE': 'SAF',
  'IT & Software': 'ITS',
  HVAC: 'HVC',
}

const COMPANY_PREFIXES = [
  'Bharat',
  'Apex',
  'Shakti',
  'National',
  'Sunrise',
  'Prime',
  'Metro',
  'Continental',
  'Everest',
  'Global',
  'Precision',
  'Vertex',
  'Reliance',
  'Sterling',
  'Pioneer',
  'Trident',
  'Horizon',
  'Unity',
  'Coastal',
  'Summit',
]

const COMPANY_SUFFIXES = [
  'Engineering Works',
  'Constructions',
  'Industries',
  'Fabricators',
  'Enterprises',
  'Solutions',
  'Contractors',
  'Systems',
  'Traders',
  'Infra Projects',
  'Equipments',
  'Services',
]

const CITIES = [
  'Mumbai',
  'Pune',
  'Ahmedabad',
  'Chennai',
  'Bengaluru',
  'Hyderabad',
  'Kolkata',
  'Nagpur',
  'Surat',
  'Jaipur',
  'Vadodara',
  'Coimbatore',
  'Indore',
  'Visakhapatnam',
  'Bhubaneswar',
  'Ludhiana',
]

const FIRST_NAMES = [
  'Rohan',
  'Priya',
  'Amit',
  'Sneha',
  'Vikram',
  'Anjali',
  'Rajesh',
  'Kavita',
  'Suresh',
  'Neha',
  'Arjun',
  'Divya',
  'Manoj',
  'Pooja',
  'Sandeep',
  'Ritu',
]

const LAST_NAMES = [
  'Sharma',
  'Verma',
  'Patel',
  'Reddy',
  'Nair',
  'Iyer',
  'Gupta',
  'Singh',
  'Rao',
  'Mehta',
  'Joshi',
  'Kulkarni',
  'Desai',
  'Chatterjee',
]

function buildPool<T extends string>(counts: Record<T, number>): T[] {
  const pool: T[] = []
  for (const key in counts) {
    for (let i = 0; i < counts[key]; i++) pool.push(key)
  }
  return shuffle(pool)
}

function randomDateWithinLast(days: number): string {
  const now = Date.now()
  const offsetMs = Math.floor(rng() * days) * 24 * 60 * 60 * 1000
  return new Date(now - offsetMs).toISOString().slice(0, 10)
}

function generateVendors(): VendorDirectoryEntry[] {
  const categoryPool = buildPool(CATEGORY_COUNTS)
  const statusPool = buildPool(STATUS_COUNTS)
  const codeSeqByCategory: Record<string, number> = {}

  return categoryPool.map((category, index) => {
    const status = statusPool[index]
    const seq = (codeSeqByCategory[category] = (codeSeqByCategory[category] ?? 0) + 1)
    const vendorCode = `${CATEGORY_CODE_PREFIX[category]}-${String(seq).padStart(4, '0')}`
    const vendorName = `${pick(COMPANY_PREFIXES)} ${pick(COMPANY_SUFFIXES)}`
    const contactPerson = `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`
    const city = pick(CITIES)

    // Blacklisted vendors skew toward lower ratings; everyone else is broadly healthy.
    const rating =
      status === 'Blacklisted'
        ? Math.round((1.5 + rng() * 1.5) * 10) / 10
        : Math.round((3.2 + rng() * 1.8) * 10) / 10

    const totalPurchaseValue = Math.round((50_000 + rng() * 4_500_000) / 1000) * 1000

    return {
      id: `${vendorCode}-${index}`,
      vendorName,
      vendorCode,
      category,
      contactPerson,
      city,
      rating,
      status,
      lastTransactionDate: randomDateWithinLast(540),
      totalPurchaseValue,
    }
  })
}

export const mockVendorDirectory: VendorDirectoryEntry[] = generateVendors()
