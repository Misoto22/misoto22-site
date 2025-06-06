import React from 'react'
import Image from 'next/image'
import Badge from '@/components/ui/Badge'
import MarkdownRenderer from './MarkdownRenderer'
import TableOfContents from './TableOfContents'
import { BlogPost } from '@/lib/supabase'
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface BlogPostContentProps {
  post: BlogPost
}

// Function to estimate reading time
function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ post }) => {
  const readingTime = estimateReadingTime(post.content)

  return (
    <>
      {/* Table of Contents */}
      <TableOfContents content={post.content} />

      <article className="max-w-4xl mx-auto">{/* Center content with max width */}
        {/* Back to Blog Link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-[var(--secondary-text)] hover:text-[var(--foreground)] transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

      {/* Cover Image - Optimized for 21:9 aspect ratio on desktop, 16:9 on mobile */}
      {post.coverImage && (
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-8">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Header */}
      <header className="mb-8 space-y-6">
        {/* Category */}
        {post.category && (
          <span className="inline-block px-4 py-2 text-sm font-bold rounded bg-[var(--foreground)] text-[var(--background)] shadow-sm tracking-widest uppercase">
            {post.category.name}
          </span>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-heading text-[var(--foreground)] leading-tight">
          {post.title}
        </h1>

        {/* Summary */}
        {post.summary && (
          <p className="text-xl text-[var(--secondary-text)] leading-relaxed">
            {post.summary}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--secondary-text)]">
          {/* Author */}
          {post.author && (
            <div className="flex items-center space-x-3">
              {post.author.avatar && (
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {post.author.name}
              </div>
            </div>
          )}

          {/* Published Date */}
          {post.publishedAt && (
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(post.publishedAt)}
            </div>
          )}

          {/* Reading Time */}
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {readingTime} min read
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag.id} className="text-sm">
                #{tag.name}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <MarkdownRenderer
        content={post.content}
        className="text-[var(--foreground)] leading-relaxed"
      />

      {/* Author Bio */}
      {post.author && post.author.bio && (
        <div className="mt-12 p-6 bg-[var(--card-background)] rounded-2xl border border-[var(--border-color)]">
          <div className="flex items-start space-x-4">
            {post.author.avatar && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
                About {post.author.name}
              </h3>
              <p className="text-[var(--secondary-text)] leading-relaxed">
                {post.author.bio}
              </p>
            </div>
          </div>
        </div>
      )}
    </article>
    </>
  )
}

export default BlogPostContent
