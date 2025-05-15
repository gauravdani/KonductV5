// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Debug mode utilities
const DEBUG = process.env.DEBUG === 'true'

// Custom matchers for debug mode
expect.extend({
  toBeInDebugMode(received) {
    const pass = DEBUG === true
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}be in debug mode`,
      pass,
    }
  },
})

// Debug mode console overrides
if (DEBUG) {
  const originalConsole = { ...console }
  console.log = (...args) => {
    originalConsole.log('[DEBUG]', ...args)
  }
  console.error = (...args) => {
    originalConsole.error('[DEBUG]', ...args)
  }
  console.warn = (...args) => {
    originalConsole.warn('[DEBUG]', ...args)
  }
}

// Mock IntersectionObserver
class IntersectionObserver {
  observe = jest.fn()
  disconnect = jest.fn()
  unobserve = jest.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
})

// Mock ResizeObserver
class ResizeObserver {
  observe = jest.fn()
  disconnect = jest.fn()
  unobserve = jest.fn()
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: ResizeObserver,
}) 