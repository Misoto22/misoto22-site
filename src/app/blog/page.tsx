import React from 'react'
import { Metadata } from 'next'
import PageHeader from '@/components/layout/PageHeader'
import BlogClient from './BlogClient'
import { getBlogPosts } from '@/lib/data'
import { unstable_cache } from 'next/cache'

export const metadata: Metadata = {
  title: 'Blog - Henry Chen',
  description: 'Thoughts, insights, and experiences in IT and photography and life.',
}

// Enable ISR with revalidation every 3600 seconds (1 hour)
export const revalidate = 3600;

// Force static generation
export const dynamic = 'force-static';

// Create a cached version of getBlogPosts
const getCachedBlogPosts = unstable_cache(
  getBlogPosts,
  ['blog-posts'],
  {
    revalidate: 3600,
    tags: ['blog-posts']
  }
)

export default async function BlogPage() {
  // Fetch initial blog posts
  const initialData = await getCachedBlogPosts({ page: 1, limit: 10 })

  return (
    <section className="pt-24 min-h-screen bg-(--background)">
      <div className="max-w-6xl mx-auto px-6">
        <PageHeader
          title="Blog"
          description="Sharing thoughts, insights, and experiences in fullstack development, DevOps, photography and life."
          showDivider={true}
        />

        <BlogClient initialData={initialData} />
      </div>
    </section>
  )
}
