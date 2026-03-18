import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageHeader from '@/components/layout/PageHeader'
import BlogCard from '@/components/blog/BlogCard'
import { getBlogPosts, getBlogCategories } from '@/lib/data'
import { unstable_cache } from 'next/cache'
import { Link } from 'next-view-transitions'
import { ArrowLeft } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

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

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const categoryName = decodeURIComponent(category)

  return {
    title: `${categoryName} - Blog - Henry Chen`,
    description: `Browse blog posts in the ${categoryName} category.`,
  }
}

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

export const revalidate = 3600

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const categoryName = decodeURIComponent(category)
  const t = await getTranslations('Blog')

  const { posts, totalCount } = await getCachedBlogPosts({
    category: categoryName,
    limit: 50,
    published: true
  })

  const categories = await getCachedCategories()
  const categoryExists = categories.some(cat => cat.name === categoryName)

  if (!categoryExists) {
    notFound()
  }

  return (
    <section className="pt-24 min-h-screen bg-(--background)">
      <div className="max-w-6xl mx-auto px-6">
        <Link
          href="/blog"
          className="inline-flex items-center text-(--secondary-text) hover:text-(--foreground) transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('backToBlog')}
        </Link>

        <PageHeader
          title={t('categoryPosts', { category: categoryName })}
          description={t('categoryDescription', { category: categoryName, count: totalCount })}
          showDivider={true}
        />

        {posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-(--secondary-text) text-lg">
              {t('categoryEmpty', { category: categoryName })}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
