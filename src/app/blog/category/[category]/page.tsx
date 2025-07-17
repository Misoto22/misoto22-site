import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageHeader from '@/components/layout/PageHeader'
import BlogCard from '@/components/blog/BlogCard'
import { getBlogPosts, getBlogCategories } from '@/lib/data'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

// Create cached versions
const getCachedBlogPosts = unstable_cache(
  getBlogPosts,
  ['blog-posts-by-category'],
  {
    revalidate: 3600,
    tags: ['blog-posts']
  }
)

const getCachedCategories = unstable_cache(
  getBlogCategories,
  ['blog-categories'],
  {
    revalidate: 3600,
    tags: ['blog-categories']
  }
)

// Generate metadata for the category page
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const categoryName = decodeURIComponent(category)
  
  return {
    title: `${categoryName} - Blog - Henry Chen`,
    description: `Browse blog posts in the ${categoryName} category.`,
  }
}

// Generate static params for all categories
export async function generateStaticParams() {
  try {
    const categories = await getCachedCategories()
    
    return categories.map((category) => ({
      category: encodeURIComponent(category.name),
    }))
  } catch (error) {
    console.error('Error generating static params for categories:', error)
    return []
  }
}

// Enable ISR with revalidation every 3600 seconds (1 hour)
export const revalidate = 3600

// Force static generation
export const dynamic = 'force-static'

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const categoryName = decodeURIComponent(category)
  
  // Fetch posts for this category
  const { posts, totalCount } = await getCachedBlogPosts({
    category: categoryName,
    limit: 50, // Show more posts on category pages
    published: true
  })

  // Verify category exists
  const categories = await getCachedCategories()
  const categoryExists = categories.some(cat => cat.name === categoryName)

  if (!categoryExists) {
    notFound()
  }

  return (
    <section className="pt-24 min-h-screen bg-(--background)">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back to Blog Link */}
        <Link 
          href="/blog"
          className="inline-flex items-center text-(--secondary-text) hover:text-(--foreground) transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <PageHeader
          title={`${categoryName} Posts`}
          description={`Browse all blog posts in the ${categoryName} category (${totalCount} post${totalCount !== 1 ? 's' : ''}).`}
          showDivider={true}
        />

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-(--secondary-text) text-lg">
              No posts found in the {categoryName} category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
