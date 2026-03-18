import React from 'react'
import Image from 'next/image'
import Badge from '@/components/ui/Badge'
import MarkdownRenderer from './MarkdownRenderer'
import TableOfContents from './TableOfContents'
import { BlogPost } from '@/lib/supabase'
import { Link } from 'next-view-transitions'
import { estimateReadingTime, formatDate } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface BlogPostContentProps {
  post: BlogPost
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ post }) => {
  const t = useTranslations('Blog')
  const readingTime = estimateReadingTime(post.content)

  return (
    <>
      <TableOfContents content={post.content} />

      <article className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-(--secondary-text) hover:text-(--foreground) transition-colors duration-200 mb-8 gap-2"
        >
          <span aria-hidden="true">&larr;</span> {t('backToBlogShort')}
        </Link>

        {/* Cover Image — wider than content */}
        {post.coverImage && (
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden mb-10 -mx-2 sm:-mx-4 md:-mx-16 sm:w-[calc(100%+2rem)] md:w-[calc(100%+8rem)]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-10 space-y-4">
          {post.category && (
            <span className="font-mono text-xs uppercase tracking-widest text-(--accent)">
              {post.category.name}
            </span>
          )}

          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-(--foreground) leading-tight">
            {post.title}
          </h1>

          {post.summary && (
            <p className="text-lg text-(--secondary-text) leading-relaxed">
              {post.summary}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-(--secondary-text) pt-2">
            {post.author && <span>{post.author.name}</span>}
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
            <span>{t('minRead', { time: readingTime })}</span>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag) => (
                <Badge key={tag.id}>#{tag.name}</Badge>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <MarkdownRenderer
          content={post.content}
          className="text-(--foreground-muted) leading-relaxed"
        />

        {/* Author bio */}
        {post.author && post.author.bio && (
          <div className="mt-16 pt-8 border-t border-(--border-color)">
            <div className="flex items-start gap-4">
              {post.author.avatar && (
                <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="font-heading text-lg text-(--foreground) mb-1">
                  {post.author.name}
                </h3>
                <p className="text-sm text-(--secondary-text) leading-relaxed">
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
