import { Metadata } from 'next'
import Link from 'next/link'
import { CampaignList } from '@/components/campaigns/campaign-list'
import { CampaignStats } from '@/components/campaigns/campaign-stats'
import { QuickActions } from '@/components/campaigns/quick-actions'

export const metadata: Metadata = {
  title: 'Dashboard - Konduct',
  description: 'Manage your marketing campaigns and track their performance',
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campaign Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage and track your marketing campaigns</p>
          </div>
          <Link
            href="/campaigns/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Create Campaign
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mb-8">
          <CampaignStats />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <QuickActions />
        </div>

        {/* Campaign List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <CampaignList />
        </div>
      </div>
    </main>
  )
} 