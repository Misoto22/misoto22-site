import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostContent from '@/components/blog/BlogPostContent'
import RelatedPosts from '@/components/blog/RelatedPosts'
import { getBlogPostBySlug, getBlogPosts, getRelatedPosts } from '@/lib/data'
import { unstable_cache } from 'next/cache'
import { getLocale } from 'next-intl/server'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

function getCachedBlogPost(slug: string, locale: 'en' | 'zh') {
  return unstable_cache(
    () => getBlogPostBySlug(slug, locale),
    ['blog-post', slug, locale],
    { revalidate: 3600, tags: [`blog-post-${slug}`] }
  )()
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const locale = await getLocale() as 'en' | 'zh'
  const post = await getCachedBlogPost(slug, locale)

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

export const revalidate = 3600

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const locale = await getLocale() as 'en' | 'zh'
  const post = await getCachedBlogPost(slug, locale)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post, 3, locale)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name ?? 'Henry Chen',
    },
  }

  return (
    <section className="pt-24 min-h-screen bg-(--background)">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <BlogPostContent post={post} />
        <div className="max-w-3xl mx-auto">
          <RelatedPosts posts={relatedPosts} />
        </div>
      </div>
    </section>
  )
}
