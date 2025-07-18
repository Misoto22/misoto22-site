'use client'

import Link from 'next/link'
import FadeInSlideUp from '@/components/animations/FadeInSlideUp'

export default function NotFound() {
  return (
    <section className="pt-24 min-h-screen bg-(--background) flex flex-col justify-center">
      <FadeInSlideUp className="max-w-3xl mx-auto px-6 text-center">
        <h1 className="text-6xl font-semibold mb-8 tracking-wide text-(--foreground)">
          404
        </h1>
        
        <FadeInSlideUp delay={0.1}>
          <h2 className="text-2xl font-medium mb-6 text-(--foreground)">
            Page Not Found
          </h2>
          <p className="text-(--secondary-text) mb-12 text-lg">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </FadeInSlideUp>

        <FadeInSlideUp delay={0.2}>
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-(--foreground) text-(--background) rounded-lg hover:bg-opacity-90 transition-all duration-300"
          >
            Return Home
            <svg 
              className="w-5 h-5 ml-2" 
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
          </Link>
        </FadeInSlideUp>
      </FadeInSlideUp>
    </section>
  )
} 