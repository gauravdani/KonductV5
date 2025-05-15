import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CampaignWizard from '@/components/campaigns/campaign-wizard'

describe('CampaignWizard', () => {
  const mockSubmit = jest.fn()

  beforeEach(() => {
    mockSubmit.mockClear()
  })

  it('renders all campaign setup tabs', () => {
    render(<CampaignWizard onSubmit={mockSubmit} />)
    
    // Check for tab navigation
    expect(screen.getByText(/Campaign Setup/i)).toBeInTheDocument()
    expect(screen.getByText(/Audience Targeting/i)).toBeInTheDocument()
    expect(screen.getByText(/UTM Parameters/i)).toBeInTheDocument()
  })

  it('validates required fields in campaign setup', async () => {
    render(<CampaignWizard onSubmit={mockSubmit} />)
    
    // Try to submit without filling required fields
    fireEvent.click(screen.getByText(/Next/i))
    
    // Check for validation messages
    await waitFor(() => {
      expect(screen.getByText(/Marketing Manager name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/Website domain is required/i)).toBeInTheDocument()
      expect(screen.getByText(/Platform is required/i)).toBeInTheDocument()
    })
  })

  it('allows platform selection', async () => {
    render(<CampaignWizard onSubmit={mockSubmit} />)
    
    // Select platform
    const platformSelect = screen.getByLabelText(/Platform/i)
    await userEvent.selectOptions(platformSelect, 'facebook')
    
    expect(platformSelect).toHaveValue('facebook')
  })

  it('handles campaign period selection', async () => {
    render(<CampaignWizard onSubmit={mockSubmit} />)
    
    // Select start date
    const startDateInput = screen.getByLabelText(/Start Date/i)
    await userEvent.type(startDateInput, '2024-03-20')
    
    // Select end date
    const endDateInput = screen.getByLabelText(/End Date/i)
    await userEvent.type(endDateInput, '2024-04-20')
    
    expect(startDateInput).toHaveValue('2024-03-20')
    expect(endDateInput).toHaveValue('2024-04-20')
  })

  it('validates audience targeting criteria', async () => {
    render(<CampaignWizard onSubmit={mockSubmit} />)
    
    // Navigate to audience targeting tab
    fireEvent.click(screen.getByText(/Audience Targeting/i))
    
    // Try to submit without selecting any targeting criteria
    fireEvent.click(screen.getByText(/Next/i))
    
    await waitFor(() => {
      expect(screen.getByText(/Please select at least one targeting criteria/i)).toBeInTheDocument()
    })
  })

  it('generates campaign ID on successful submission', async () => {
    render(<CampaignWizard onSubmit={mockSubmit} />)
    
    // Fill in required fields
    await userEvent.type(screen.getByLabelText(/Marketing Manager/i), 'John Doe')
    await userEvent.type(screen.getByLabelText(/Website Domain/i), 'example.com')
    await userEvent.selectOptions(screen.getByLabelText(/Platform/i), 'facebook')
    
    // Submit form
    fireEvent.click(screen.getByText(/Generate Campaign ID/i))
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled()
      expect(screen.getByText(/Campaign ID Generated/i)).toBeInTheDocument()
    })
  })
}) 