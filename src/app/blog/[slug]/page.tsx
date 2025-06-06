import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostContent from '@/components/blog/BlogPostContent'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/data'
import { unstable_cache } from 'next/cache'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Create a cached version of getBlogPostBySlug
const getCachedBlogPost = unstable_cache(
  getBlogPostBySlug,
  ['blog-post'],
  {
    revalidate: 3600,
    tags: ['blog-post']
  }
)

// Generate metadata for the blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getCachedBlogPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found - Henry Chen',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: `${post.title} - Henry Chen`,
    description: post.summary || `Read ${post.title} on Henry Chen's blog`,
    openGraph: {
      title: post.title,
      description: post.summary || `Read ${post.title} on Henry Chen's blog`,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: post.author ? [post.author.name] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary || `Read ${post.title} on Henry Chen's blog`,
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}

// Generate static params for all published blog posts
export async function generateStaticParams() {
  try {
    const { posts } = await getBlogPosts({ limit: 100, published: true })
    
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params for blog posts:', error)
    return []
  }
}

// Enable ISR with revalidation every 3600 seconds (1 hour)
export const revalidate = 3600

// Force static generation
export const dynamic = 'force-static'

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getCachedBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <section className="pt-24 min-h-screen bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <BlogPostContent post={post} />
      </div>
    </section>
  )
}
