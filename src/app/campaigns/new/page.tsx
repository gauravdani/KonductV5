import { Metadata } from 'next'
import { CampaignWizard } from '@/components/campaigns/campaign-wizard'

export const metadata: Metadata = {
  title: 'Create Campaign - Konduct',
  description: 'Create a new marketing campaign with advanced targeting options',
}

export default function NewCampaignPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Campaign</h1>
            <p className="text-gray-600 dark:text-gray-300">Follow the steps below to create your campaign</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <CampaignWizard />
          </div>
        </div>
      </div>
    </main>
  )
} 