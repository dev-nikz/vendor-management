import { z } from 'zod'

export const VENDOR_CATEGORIES = [
  'Civil Works',
  'Electrical',
  'Mechanical',
  'Logistics & Transport',
  'Safety & PPE',
  'IT & Software',
  'HVAC',
] as const

export const PAYMENT_TERMS_OPTIONS = ['Net 30', 'Net 45', 'Net 60', 'Advance 20% / Net 30'] as const

export const CERTIFICATION_OPTIONS = [
  'ISO 9001',
  'ISO 14001',
  'OHSAS 18001',
  'MSME Registered',
  'GST Compliant',
] as const

const GSTIN_REGEX = /^\d{2}[A-Z]{5}\d{4}[A-Z]\d[A-Z][A-Z\d]$/
const PAN_REGEX = /^[A-Z]{5}\d{4}[A-Z]$/
const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/

export const createVendorSchema = z.object({
  vendorName: z.string().trim().min(2, 'Vendor name must be at least 2 characters'),
  gst: z
    .string()
    .trim()
    .toUpperCase()
    .regex(GSTIN_REGEX, 'Enter a valid 15-character GSTIN (e.g. 27ABCDE1234F1Z5)'),
  pan: z
    .string()
    .trim()
    .toUpperCase()
    .regex(PAN_REGEX, 'Enter a valid 10-character PAN (e.g. ABCDE1234F)'),
  category: z.enum(VENDOR_CATEGORIES, { message: 'Select a vendor category' }),
  address: z.string().trim().min(10, 'Address must be at least 10 characters'),
  contactPerson: z.string().trim().min(2, 'Contact person name is required'),
  contactEmail: z.string().trim().email('Enter a valid email address'),
  contactPhone: z
    .string()
    .trim()
    .regex(/^\+?\d{10,13}$/, 'Enter a valid phone number (10-13 digits)'),
  bankAccountNumber: z.string().trim().min(6, 'Enter a valid bank account number'),
  ifscCode: z.string().trim().toUpperCase().regex(IFSC_REGEX, 'Enter a valid IFSC code (e.g. HDFC0001234)'),
  bankName: z.string().trim().min(2, 'Bank name is required'),
  paymentTerms: z.enum(PAYMENT_TERMS_OPTIONS, { message: 'Select payment terms' }),
  certifications: z.array(z.enum(CERTIFICATION_OPTIONS)),
  documents: z.array(z.instanceof(File)),
})

export type CreateVendorFormValues = z.infer<typeof createVendorSchema>
