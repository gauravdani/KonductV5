'use client'

import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/ui/card'
import { ArrowUp, ArrowDown } from 'lucide-react'

// TODO: Replace with actual API call
const fetchCampaignStats = async () => {
  // Mock data for now
  return {
    totalCampaigns: 12,
    activeCampaigns: 5,
    totalBudget: 25000,
    spentBudget: 12500,
    averageEngagement: 4.2,
    engagementChange: 0.8,
    conversionRate: 2.5,
    conversionChange: -0.3,
  }
}

export function CampaignStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['campaignStats'],
    queryFn: fetchCampaignStats,
  })

  if (isLoading) {
    return <div>Loading stats...</div>
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Campaigns */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Campaigns
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {stats?.totalCampaigns}
            </p>
          </div>
          <div className="p-3 bg-primary/10 rounded-full">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {stats?.activeCampaigns} active campaigns
          </p>
        </div>
      </Card>

      {/* Budget */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Budget
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              ${stats?.totalBudget.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-primary/10 rounded-full">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ${stats?.spentBudget.toLocaleString()} spent
          </p>
        </div>
      </Card>

      {/* Engagement Rate */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Avg. Engagement
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {stats?.averageEngagement}%
            </p>
          </div>
          <div className="p-3 bg-primary/10 rounded-full">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          {stats?.engagementChange > 0 ? (
            <ArrowUp className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDown className="w-4 h-4 text-red-500" />
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400 ml-1">
            {Math.abs(stats?.engagementChange || 0)}% from last month
          </p>
        </div>
      </Card>

      {/* Conversion Rate */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Conversion Rate
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {stats?.conversionRate}%
            </p>
          </div>
          <div className="p-3 bg-primary/10 rounded-full">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          {stats?.conversionChange > 0 ? (
            <ArrowUp className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDown className="w-4 h-4 text-red-500" />
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400 ml-1">
            {Math.abs(stats?.conversionChange || 0)}% from last month
          </p>
        </div>
      </Card>
    </div>
  )
} 