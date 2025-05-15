import { render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import CampaignWizard from '@/components/campaigns/campaign-wizard'

// Mock server setup
const server = setupServer(
  rest.get('/api/campaigns', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        campaigns: [
          {
            id: 'FB-BAW-20240320-12345678',
            name: 'Test Campaign',
            platform: 'facebook',
          },
        ],
      })
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('CORS Integration', () => {
  it('handles cross-origin requests in development', async () => {
    // Mock fetch with CORS headers
    const mockFetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            campaigns: [
              {
                id: 'FB-BAW-20240320-12345678',
                name: 'Test Campaign',
                platform: 'facebook',
              },
            ],
          }),
        headers: new Headers({
          'access-control-allow-origin': '*',
          'access-control-allow-methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          'access-control-allow-headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
        }),
      })
    )
    global.fetch = mockFetch

    render(<CampaignWizard onSubmit={jest.fn()} />)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled()
      expect(mockFetch.mock.calls[0][1]).toHaveProperty('mode', 'cors')
    })
  })

  it('handles CORS preflight requests', async () => {
    const mockFetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 204,
        headers: new Headers({
          'access-control-allow-origin': '*',
          'access-control-allow-methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          'access-control-allow-headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
        }),
      })
    )
    global.fetch = mockFetch

    render(<CampaignWizard onSubmit={jest.fn()} />)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled()
      expect(mockFetch.mock.calls[0][1]).toHaveProperty('method', 'OPTIONS')
    })
  })

  it('handles CORS errors gracefully', async () => {
    const mockFetch = jest.fn().mockImplementation(() =>
      Promise.reject(new Error('CORS error'))
    )
    global.fetch = mockFetch

    render(<CampaignWizard onSubmit={jest.fn()} />)

    await waitFor(() => {
      expect(screen.getByText(/Error loading campaigns/i)).toBeInTheDocument()
    })
  })
}) 