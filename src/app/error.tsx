'use client'

import { useEffect } from 'react'
import FadeInSlideUp from '@/components/animations/FadeInSlideUp'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <section className="pt-24 min-h-screen bg-(--background) flex flex-col justify-center">
      <FadeInSlideUp className="max-w-3xl mx-auto px-6 text-center">
        <div className="mb-8">
          <svg
            className="w-20 h-20 mx-auto text-(--foreground) opacity-80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-semibold mb-4 tracking-wide text-(--foreground)">
          Something went wrong
        </h1>

        <FadeInSlideUp delay={0.1}>
          <p className="text-(--secondary-text) mb-8 text-lg">
            An unexpected error has occurred. Please try again.
          </p>
          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="mb-8 p-4 bg-(--card-background) rounded-lg border border-(--border) text-left">
              <p className="text-sm font-mono text-(--secondary-text) break-words">
                {error.message}
              </p>
            </div>
          )}
        </FadeInSlideUp>

        <FadeInSlideUp delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center px-6 py-3 bg-(--foreground) text-(--background) rounded-lg hover:opacity-90 transition-all duration-300"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try again
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-(--border) text-(--foreground) rounded-lg hover:bg-(--card-background) transition-all duration-300"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Return Home
            </a>
          </div>
        </FadeInSlideUp>
      </FadeInSlideUp>
    </section>
  )
}
