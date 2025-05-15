'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DatePicker } from '@/components/ui/date-picker'
import { Card } from '@/components/ui/card'

// Form schemas for each step
const basicInfoSchema = z.object({
  name: z.string().min(3, 'Campaign name must be at least 3 characters'),
  managerName: z.string().min(2, 'Manager name must be at least 2 characters'),
  website: z.string().url('Please enter a valid website URL'),
  platform: z.string().min(1, 'Please select a platform'),
  objective: z.string().min(1, 'Please select an objective'),
  startDate: z.date(),
  endDate: z.date(),
  budget: z.number().min(0, 'Budget must be greater than 0'),
})

const targetingSchema = z.object({
  ageRange: z.object({
    min: z.number().min(13).max(65),
    max: z.number().min(13).max(65),
  }).refine((data) => data.min <= data.max, {
    message: "Minimum age must be less than or equal to maximum age",
  }),
  gender: z.array(z.string()).min(1, "Please select at least one gender"),
  languages: z.array(z.string()).min(1, "Please select at least one language"),
  devices: z.array(z.string()).min(1, "Please select at least one device"),
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
  behaviors: z.array(z.string()).min(1, "Please select at least one behavior"),
})

const utmSchema = z.object({
  source: z.string().min(1, 'Source is required'),
  medium: z.string().min(1, 'Medium is required'),
  creative: z.string().optional(),
})

type Step = 'basic' | 'targeting' | 'utm' | 'review'

export function CampaignWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('basic')
  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const basicInfoForm = useForm({
    resolver: zodResolver(basicInfoSchema),
  })

  const targetingForm = useForm({
    resolver: zodResolver(targetingSchema),
  })

  const utmForm = useForm({
    resolver: zodResolver(utmSchema),
  })

  const handleBasicInfoSubmit = (data: any) => {
    setFormData({ ...formData, ...data })
    setCurrentStep('targeting')
  }

  const handleTargetingSubmit = (data: any) => {
    console.log('Targeting form data:', data) // Debug log
    setFormData((prev) => ({ ...prev, ...data }))
    setCurrentStep('utm')
  }

  const handleUtmSubmit = (data: any) => {
    setFormData({ ...formData, ...data })
    setCurrentStep('review')
  }

  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true)
      // TODO: Implement campaign creation API call
      console.log('Final form data:', formData)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Navigate to dashboard after successful submission
      router.push('/dashboard')
    } catch (error) {
      console.error('Error creating campaign:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {['basic', 'targeting', 'utm', 'review'].map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === step
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                {index + 1}
              </div>
              {index < 3 && (
                <div className="w-24 h-1 bg-gray-200 dark:bg-gray-700 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <div className="space-y-6">
        {currentStep === 'basic' && (
          <form onSubmit={basicInfoForm.handleSubmit(handleBasicInfoSubmit)}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Campaign Name
                </label>
                <Input
                  placeholder="e.g., Summer Sale 2024"
                  {...basicInfoForm.register('name')}
                  error={basicInfoForm.formState.errors.name?.message}
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Give your campaign a descriptive name
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Marketing Manager Name
                </label>
                <Input
                  placeholder="e.g., John Smith"
                  {...basicInfoForm.register('managerName')}
                  error={basicInfoForm.formState.errors.managerName?.message}
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  The person responsible for this campaign
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Website URL
                </label>
                <Input
                  type="url"
                  placeholder="https://www.example.com"
                  {...basicInfoForm.register('website')}
                  error={basicInfoForm.formState.errors.website?.message}
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  The website where your campaign will direct users
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Platform
                </label>
                <Select
                  value={basicInfoForm.watch('platform')}
                  onValueChange={(value) => basicInfoForm.setValue('platform', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select advertising platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="google">Google Ads</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                  </SelectContent>
                </Select>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Choose where your campaign will run
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Campaign Objective
                </label>
                <Select
                  value={basicInfoForm.watch('objective')}
                  onValueChange={(value) => basicInfoForm.setValue('objective', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select campaign goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="awareness">Brand Awareness</SelectItem>
                    <SelectItem value="reach">Reach</SelectItem>
                    <SelectItem value="traffic">Traffic</SelectItem>
                    <SelectItem value="engagement">Engagement</SelectItem>
                    <SelectItem value="conversions">Conversions</SelectItem>
                  </SelectContent>
                </Select>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  What do you want to achieve with this campaign?
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Date
                  </label>
                  <DatePicker
                    date={basicInfoForm.watch('startDate')}
                    onSelect={(date) => basicInfoForm.setValue('startDate', date)}
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    When should the campaign begin?
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    End Date
                  </label>
                  <DatePicker
                    date={basicInfoForm.watch('endDate')}
                    onSelect={(date) => basicInfoForm.setValue('endDate', date)}
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    When should the campaign end?
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Budget
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 1000"
                  {...basicInfoForm.register('budget', { valueAsNumber: true })}
                  error={basicInfoForm.formState.errors.budget?.message}
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Enter your campaign budget in dollars
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit">Next: Targeting</Button>
            </div>
          </form>
        )}

        {currentStep === 'targeting' && (
          <form onSubmit={targetingForm.handleSubmit(handleTargetingSubmit)}>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Demographics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Minimum Age
                    </label>
                    <Input
                      type="number"
                      placeholder="e.g., 18"
                      min={13}
                      max={65}
                      {...targetingForm.register('ageRange.min', { 
                        valueAsNumber: true,
                        required: "Minimum age is required"
                      })}
                      error={targetingForm.formState.errors.ageRange?.min?.message}
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Minimum age of your target audience
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Maximum Age
                    </label>
                    <Input
                      type="number"
                      placeholder="e.g., 45"
                      min={13}
                      max={65}
                      {...targetingForm.register('ageRange.max', { 
                        valueAsNumber: true,
                        required: "Maximum age is required"
                      })}
                      error={targetingForm.formState.errors.ageRange?.max?.message}
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Maximum age of your target audience
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Gender</h3>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Target Gender
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...targetingForm.register('gender')}
                        value="male"
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Male</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...targetingForm.register('gender')}
                        value="female"
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Female</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...targetingForm.register('gender')}
                        value="other"
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Other</span>
                    </label>
                  </div>
                  {targetingForm.formState.errors.gender && (
                    <p className="text-sm text-red-500">{targetingForm.formState.errors.gender.message}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Select the gender(s) you want to target
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Languages</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Target Languages
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          {...targetingForm.register('languages')}
                          value="en"
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">English</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          {...targetingForm.register('languages')}
                          value="es"
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Spanish</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          {...targetingForm.register('languages')}
                          value="fr"
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">French</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          {...targetingForm.register('languages')}
                          value="de"
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">German</span>
                      </label>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          {...targetingForm.register('languages')}
                          value="it"
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Italian</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          {...targetingForm.register('languages')}
                          value="pt"
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Portuguese</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          {...targetingForm.register('languages')}
                          value="ru"
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Russian</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          {...targetingForm.register('languages')}
                          value="zh"
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Chinese</span>
                      </label>
                    </div>
                  </div>
                  {targetingForm.formState.errors.languages && (
                    <p className="text-sm text-red-500">{targetingForm.formState.errors.languages.message}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Select all languages your target audience speaks
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Devices</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Target Devices
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...targetingForm.register('devices')}
                        value="desktop"
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Desktop</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...targetingForm.register('devices')}
                        value="mobile"
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Mobile</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...targetingForm.register('devices')}
                        value="tablet"
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Tablet</span>
                    </label>
                  </div>
                  {targetingForm.formState.errors.devices && (
                    <p className="text-sm text-red-500">{targetingForm.formState.errors.devices.message}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Select the devices your target audience uses
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Interests & Behaviors</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Interests
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Shopping & Fashion</h4>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('interests')}
                            value="fashion"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Fashion & Apparel</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('interests')}
                            value="beauty"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Beauty & Cosmetics</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('interests')}
                            value="luxury"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Luxury Goods</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('interests')}
                            value="home"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Home & Garden</span>
                        </label>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Entertainment & Media</h4>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('interests')}
                            value="movies"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Movies & TV</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('interests')}
                            value="music"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Music</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('interests')}
                            value="gaming"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Gaming</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('interests')}
                            value="sports"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Sports</span>
                        </label>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Technology & Business</h4>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('interests')}
                            value="tech"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Technology</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('interests')}
                            value="business"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Business & Finance</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('interests')}
                            value="education"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Education</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('interests')}
                            value="career"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Career Development</span>
                        </label>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Lifestyle & Health</h4>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('interests')}
                            value="fitness"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Fitness & Health</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('interests')}
                            value="food"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Food & Dining</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('interests')}
                            value="travel"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Travel & Tourism</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('interests')}
                            value="automotive"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Automotive</span>
                        </label>
                      </div>
                    </div>
                    {targetingForm.formState.errors.interests && (
                      <p className="text-sm text-red-500">{targetingForm.formState.errors.interests.message}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Select interests that match your target audience
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Behaviors
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Purchase Behavior</h4>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('behaviors')}
                            value="frequent_shoppers"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Frequent Online Shoppers</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('behaviors')}
                            value="luxury_shoppers"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Luxury Shoppers</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('behaviors')}
                            value="deal_seekers"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Deal Seekers</span>
                        </label>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Digital Behavior</h4>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('behaviors')}
                            value="early_adopters"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Early Adopters</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('behaviors')}
                            value="content_creators"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Content Creators</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('behaviors')}
                            value="mobile_users"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Mobile-First Users</span>
                        </label>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Travel & Lifestyle</h4>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('behaviors')}
                            value="frequent_travelers"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Frequent Travelers</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('behaviors')}
                            value="business_travelers"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Business Travelers</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('behaviors')}
                            value="fitness_enthusiasts"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Fitness Enthusiasts</span>
                        </label>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Business & Career</h4>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('behaviors')}
                            value="business_owners"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Business Owners</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('behaviors')}
                            value="professionals"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Professionals</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...targetingForm.register('behaviors')}
                            value="job_seekers"
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Job Seekers</span>
                        </label>
                      </div>
                    </div>
                    {targetingForm.formState.errors.behaviors && (
                      <p className="text-sm text-red-500">{targetingForm.formState.errors.behaviors.message}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Select behaviors that match your target audience
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <Button type="button" variant="outline" onClick={() => setCurrentStep('basic')}>
                Back
              </Button>
              <Button type="submit">Next: UTM Parameters</Button>
            </div>
          </form>
        )}

        {currentStep === 'utm' && (
          <form onSubmit={utmForm.handleSubmit(handleUtmSubmit)}>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">UTM Parameters</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  UTM parameters help you track the effectiveness of your marketing campaigns. They are added to your URLs to identify where your traffic is coming from.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Source (utm_source)
                    </label>
                    <Input
                      placeholder="e.g., facebook, google, email"
                      {...utmForm.register('source')}
                      error={utmForm.formState.errors.source?.message}
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      The platform or channel where your traffic originates (e.g., facebook, google, email)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Medium (utm_medium)
                    </label>
                    <Input
                      placeholder="e.g., cpc, display, social"
                      {...utmForm.register('medium')}
                      error={utmForm.formState.errors.medium?.message}
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      The marketing medium or ad group (e.g., cpc, display, social, email)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Creative (utm_creative)
                    </label>
                    <Input
                      placeholder="e.g., banner_1, video_ad"
                      {...utmForm.register('creative')}
                      error={utmForm.formState.errors.creative?.message}
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Optional: Identifies specific ad creatives or variations (e.g., banner_1, video_ad)
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Example URL:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {utmForm.watch('source') && utmForm.watch('medium') ? (
                      `https://yourwebsite.com/?utm_source=${utmForm.watch('source')}&utm_medium=${utmForm.watch('medium')}${
                        utmForm.watch('creative') ? `&utm_creative=${utmForm.watch('creative')}` : ''
                      }`
                    ) : (
                      'https://yourwebsite.com/?utm_source=facebook&utm_medium=cpc&utm_creative=banner_1'
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <Button type="button" variant="outline" onClick={() => setCurrentStep('targeting')}>
                Back
              </Button>
              <Button type="submit">Next: Review</Button>
            </div>
          </form>
        )}

        {currentStep === 'review' && (
          <div>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Campaign Summary</h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </Card>
            <div className="mt-6 flex justify-between">
              <Button type="button" variant="outline" onClick={() => setCurrentStep('utm')}>
                Back
              </Button>
              <Button onClick={handleFinalSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Creating Campaign...' : 'Create Campaign'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 