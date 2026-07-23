import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { QueryBoundary } from '@/shared/ui/QueryBoundary'
import { StatusBadge } from '@/features/vendor-directory/components/StatusBadge'
import { useVendorDetails } from './hooks/useVendorDetails'
import { VendorDetailsSkeleton } from './components/VendorDetailsSkeleton'
import { OverviewTab } from './components/OverviewTab'
import { ContactsTab } from './components/ContactsTab'
import { PerformanceTab } from './components/PerformanceTab'
import { PurchaseHistoryTab } from './components/PurchaseHistoryTab'
import { DocumentsTab } from './components/DocumentsTab'
import { PaymentsTab } from './components/PaymentsTab'
import { ProjectsTab } from './components/ProjectsTab'
import { IssuesTab } from './components/IssuesTab'
import { AuditTimelineTab } from './components/AuditTimelineTab'
import type { VendorDetails } from './types'

const TABS = [
  'Overview',
  'Contacts',
  'Performance',
  'Purchase History',
  'Documents',
  'Payments',
  'Projects Associated',
  'Issues Raised',
  'Audit Timeline',
] as const

type Tab = (typeof TABS)[number]

function TabContent({ tab, vendor }: { tab: Tab; vendor: VendorDetails }) {
  switch (tab) {
    case 'Overview':
      return <OverviewTab vendor={vendor} />
    case 'Contacts':
      return <ContactsTab vendor={vendor} />
    case 'Performance':
      return <PerformanceTab vendor={vendor} />
    case 'Purchase History':
      return <PurchaseHistoryTab purchaseHistory={vendor.purchaseHistory} />
    case 'Documents':
      return <DocumentsTab documents={vendor.documents} />
    case 'Payments':
      return <PaymentsTab payments={vendor.payments} />
    case 'Projects Associated':
      return <ProjectsTab projects={vendor.projects} />
    case 'Issues Raised':
      return <IssuesTab issues={vendor.issues} />
    case 'Audit Timeline':
      return <AuditTimelineTab events={vendor.auditTimeline} />
  }
}

export function VendorDetailsPage() {
  const { vendorId } = useParams<{ vendorId: string }>()
  const query = useVendorDetails(vendorId ?? '')
  const [activeTab, setActiveTab] = useState<Tab>('Overview')

  return (
    <QueryBoundary query={query} loadingFallback={<VendorDetailsSkeleton />}>
      {(vendor) => (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{vendor.vendorName}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {vendor.vendorCode} · {vendor.category} · {vendor.city}
              </p>
            </div>
            <StatusBadge status={vendor.status} />
          </div>

          <div className="overflow-x-auto border-b border-gray-200 dark:border-gray-800">
            <nav className="flex min-w-max gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`shrink-0 border-b-2 px-3 py-2 text-sm font-medium whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <TabContent tab={activeTab} vendor={vendor} />
        </div>
      )}
    </QueryBoundary>
  )
}
