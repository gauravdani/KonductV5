'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'

// TODO: Replace with actual API call
const fetchCampaigns = async () => {
  // Mock data for now
  return [
    {
      id: '1',
      name: 'Summer Sale 2024',
      platform: 'facebook',
      objective: 'conversions',
      status: 'active',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-08-31'),
      budget: 5000,
    },
    // Add more mock campaigns
  ]
}

export function CampaignList() {
  const [search, setSearch] = useState('')
  const [platform, setPlatform] = useState('')
  const [status, setStatus] = useState('')

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: fetchCampaigns,
  })

  const filteredCampaigns = campaigns?.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(search.toLowerCase())
    const matchesPlatform = platform === 'all' || campaign.platform === platform
    const matchesStatus = status === 'all' || campaign.status === status
    return matchesSearch && matchesPlatform && matchesStatus
  })

  if (isLoading) {
    return <div className="p-6">Loading campaigns...</div>
  }

  return (
    <div>
      {/* Filters */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Input
            placeholder="Search campaigns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger>
              <SelectValue placeholder="All Platforms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="google">Google Ads</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Campaign List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {filteredCampaigns?.map((campaign) => (
          <div key={campaign.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {campaign.name}
                </h3>
                <div className="mt-1 flex items-center space-x-4">
                  <Badge variant="outline" className="capitalize">
                    {campaign.platform}
                  </Badge>
                  <Badge
                    variant={
                      campaign.status === 'active'
                        ? 'success'
                        : campaign.status === 'paused'
                        ? 'warning'
                        : 'default'
                    }
                    className="capitalize"
                  >
                    {campaign.status}
                  </Badge>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {format(campaign.startDate, 'MMM d, yyyy')} -{' '}
                    {format(campaign.endDate, 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  ${campaign.budget.toLocaleString()}
                </span>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCampaigns?.length === 0 && (
        <div className="p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">No campaigns found</p>
        </div>
      )}
    </div>
  )
} 