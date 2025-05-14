import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">Konduct</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link href="/docs" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                Docs
              </Link>
              <Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all"
              >
                Sign up
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button type="button" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                <span className="sr-only">Open menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary mb-6 backdrop-blur-sm">
              <span className="mr-2">✨</span> The Ultimate Campaign ID Management Platform
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
              Stop Losing Campaign Data. Start Tracking Everything.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Marketing teams waste countless hours managing campaign metadata across platforms. 
              Konduct streamlines this process, ensuring accurate tracking and reporting across your entire marketing stack.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signup"
                className="rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all hover:scale-105"
              >
                Start Free Trial
              </Link>
              <Link
                href="/demo"
                className="text-base font-semibold leading-6 text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors group"
              >
                Watch Demo <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-20 sm:py-32 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              The Hidden Cost of Poor Campaign Tracking
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Marketing teams face significant challenges when managing campaign metadata across multiple platforms
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Inaccurate Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Inconsistent campaign IDs lead to fragmented data, making it impossible to get a clear picture of campaign performance.
              </p>
            </div>
            <div className="relative p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Wasted Time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Teams spend hours manually creating and managing campaign IDs across different platforms and tools.
              </p>
            </div>
            <div className="relative p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Poor Reporting</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Leadership can't make data-driven decisions when campaign data is scattered and inconsistent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 sm:py-32 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              How Konduct Solves These Problems
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              A comprehensive solution for campaign metadata management
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative group">
              <div className="rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-lg transition-all duration-300 hover:shadow-xl group-hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Centralized Management</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">✓</span>
                    One-click campaign ID generation
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">✓</span>
                    Consistent naming conventions
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">✓</span>
                    Cross-platform compatibility
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative group">
              <div className="rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-lg transition-all duration-300 hover:shadow-xl group-hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Accurate Analytics</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">✓</span>
                    Seamless integration with analytics tools
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">✓</span>
                    Automated UTM parameter generation
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">✓</span>
                    Real-time campaign tracking
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative group">
              <div className="rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-lg transition-all duration-300 hover:shadow-xl group-hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Enterprise Ready</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">✓</span>
                    Team collaboration features
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">✓</span>
                    Role-based access control
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">✓</span>
                    Audit trail and history
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 sm:py-32 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Trusted by Marketing Teams Worldwide
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Join hundreds of companies that have transformed their campaign management
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {/* Add company logos here */}
            <div className="flex items-center justify-center p-4">
              <div className="h-12 w-32 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-lg"></div>
            </div>
            <div className="flex items-center justify-center p-4">
              <div className="h-12 w-32 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-lg"></div>
            </div>
            <div className="flex items-center justify-center p-4">
              <div className="h-12 w-32 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-lg"></div>
            </div>
            <div className="flex items-center justify-center p-4">
              <div className="h-12 w-32 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-lg"></div>
            </div>
            <div className="flex items-center justify-center p-4">
              <div className="h-12 w-32 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-lg"></div>
            </div>
            <div className="flex items-center justify-center p-4">
              <div className="h-12 w-32 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-r from-primary to-primary/90 dark:from-primary/90 dark:to-primary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Transform Your Campaign Management?
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Join thousands of marketing teams who trust Konduct for their campaign tracking needs
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signup"
                className="rounded-full bg-white px-8 py-3.5 text-base font-semibold text-primary shadow-lg hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all hover:scale-105"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="text-base font-semibold leading-6 text-white hover:text-white/90 transition-colors group"
              >
                Contact Sales <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 