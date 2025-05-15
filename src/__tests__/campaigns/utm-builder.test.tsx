import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UTMBuilder from '@/components/campaigns/utm-builder'

describe('UTMBuilder', () => {
  const mockCampaignId = 'FB-BAW-20240320-12345678'

  it('renders UTM parameter inputs', () => {
    render(<UTMBuilder campaignId={mockCampaignId} />)
    
    // Check for UTM parameter inputs
    expect(screen.getByLabelText(/Source/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Campaign/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Medium/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Creative/i)).toBeInTheDocument()
  })

  it('pre-fills campaign ID in UTM parameters', () => {
    render(<UTMBuilder campaignId={mockCampaignId} />)
    
    const campaignInput = screen.getByLabelText(/Campaign/i)
    expect(campaignInput).toHaveValue(mockCampaignId)
  })

  it('generates tracking URL with UTM parameters', async () => {
    render(<UTMBuilder campaignId={mockCampaignId} />)
    
    // Fill in UTM parameters
    await userEvent.type(screen.getByLabelText(/Source/i), 'facebook')
    await userEvent.type(screen.getByLabelText(/Medium/i), 'cpc')
    await userEvent.type(screen.getByLabelText(/Creative/i), 'banner_1')
    
    // Generate URL
    fireEvent.click(screen.getByText(/Generate URL/i))
    
    await waitFor(() => {
      const urlPreview = screen.getByTestId('url-preview')
      expect(urlPreview).toHaveTextContent(/utm_source=facebook/)
      expect(urlPreview).toHaveTextContent(/utm_campaign=FB-BAW-20240320-12345678/)
      expect(urlPreview).toHaveTextContent(/utm_medium=cpc/)
      expect(urlPreview).toHaveTextContent(/utm_creative=banner_1/)
    })
  })

  it('validates URL format', async () => {
    render(<UTMBuilder campaignId={mockCampaignId} />)
    
    // Try to generate URL without source
    fireEvent.click(screen.getByText(/Generate URL/i))
    
    await waitFor(() => {
      expect(screen.getByText(/Source is required/i)).toBeInTheDocument()
    })
  })

  it('copies generated URL to clipboard', async () => {
    render(<UTMBuilder campaignId={mockCampaignId} />)
    
    // Mock clipboard API
    const mockClipboard = {
      writeText: jest.fn(),
    }
    Object.assign(navigator, {
      clipboard: mockClipboard,
    })
    
    // Fill in UTM parameters
    await userEvent.type(screen.getByLabelText(/Source/i), 'facebook')
    await userEvent.type(screen.getByLabelText(/Medium/i), 'cpc')
    await userEvent.type(screen.getByLabelText(/Creative/i), 'banner_1')
    
    // Generate and copy URL
    fireEvent.click(screen.getByText(/Generate URL/i))
    fireEvent.click(screen.getByText(/Copy URL/i))
    
    await waitFor(() => {
      expect(mockClipboard.writeText).toHaveBeenCalled()
      expect(screen.getByText(/URL copied to clipboard/i)).toBeInTheDocument()
    })
  })

  it('generates QR code for mobile sharing', async () => {
    render(<UTMBuilder campaignId={mockCampaignId} />)
    
    // Fill in UTM parameters
    await userEvent.type(screen.getByLabelText(/Source/i), 'facebook')
    await userEvent.type(screen.getByLabelText(/Medium/i), 'cpc')
    await userEvent.type(screen.getByLabelText(/Creative/i), 'banner_1')
    
    // Generate URL and QR code
    fireEvent.click(screen.getByText(/Generate URL/i))
    fireEvent.click(screen.getByText(/Generate QR Code/i))
    
    await waitFor(() => {
      expect(screen.getByTestId('qr-code')).toBeInTheDocument()
    })
  })
}) 