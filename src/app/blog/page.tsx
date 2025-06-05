import React from 'react'
import { Metadata } from 'next'
import PageHeader from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: 'Blog - Henry Chen',
  description: 'Thoughts, insights, and experiences in IT and photography and life.',
}

export default function BlogPage() {
  return (
    <section className="pt-24 min-h-screen bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6">
        <PageHeader
          title="Blog"
          description="Sharing thoughts, insights, and experiences in fullstack development, DevOps, photography and life."
          showDivider={true}
        />

        {/* Content area - currently empty as requested */}
        <div className="space-y-12">
          {/* Blog content will go here */}
        </div>
      </div>
    </section>
  )
}
