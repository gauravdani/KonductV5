import { render, screen } from '@testing-library/react'
import HeroSection from '@/components/landing/hero-section'

describe('HeroSection', () => {
  it('renders the hero section with correct content', () => {
    render(<HeroSection />)
    
    // Check for main headline
    expect(screen.getByText(/Streamline Your Marketing Campaigns with Smart ID Generation/i)).toBeInTheDocument()
    
    // Check for subheadline
    expect(screen.getByText(/Generate, track, and manage campaign IDs across multiple platforms with ease/i)).toBeInTheDocument()
    
    // Check for CTA buttons
    expect(screen.getByRole('button', { name: /Start Free Trial/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Schedule Demo/i })).toBeInTheDocument()
  })

  it('displays key features', () => {
    render(<HeroSection />)
    
    // Check for key features
    expect(screen.getByText(/Campaign Management/i)).toBeInTheDocument()
    expect(screen.getByText(/Analytics & Reporting/i)).toBeInTheDocument()
    expect(screen.getByText(/Team Collaboration/i)).toBeInTheDocument()
  })

  it('shows dashboard preview image', () => {
    render(<HeroSection />)
    
    // Check for dashboard preview image
    const dashboardImage = screen.getByAltText(/Dashboard Preview/i)
    expect(dashboardImage).toBeInTheDocument()
    expect(dashboardImage).toHaveAttribute('src')
  })
}) 