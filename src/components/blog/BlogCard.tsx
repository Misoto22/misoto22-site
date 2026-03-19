import React from 'react'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import type { BlogPost } from '@/lib/data'
import { estimateReadingTime, formatDate } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface BlogCardProps {
  post: BlogPost
  index: number
  featured?: boolean
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index, featured = false }) => {
  const t = useTranslations('Blog')
  const readingTime = estimateReadingTime(post.content)

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {post.coverImage && (
            <div className="relative aspect-video md:aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                priority
              />
            </div>
          )}
          <div className="flex flex-col justify-center space-y-4">
            {post.category && (
              <span className="font-mono text-xs uppercase tracking-widest text-(--accent) w-fit">
                {post.category.name}
              </span>
            )}
            <h2 className="font-heading text-2xl md:text-3xl text-(--foreground) group-hover:text-(--accent) transition-colors duration-200">
              {post.title}
            </h2>
            {post.summary && (
              <p className="text-(--secondary-text) leading-relaxed line-clamp-3">
                {post.summary}
              </p>
            )}
            <div className="flex items-center gap-4 text-xs font-mono text-(--secondary-text)">
              {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
              <span>{t('minRead', { time: readingTime })}</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="space-y-3">
        {post.coverImage && (
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              priority={index < 3}
            />
          </div>
        )}
        <p className="font-mono text-xs text-(--secondary-text)">
          {post.publishedAt && formatDate(post.publishedAt)}
          {post.category && <span> &middot; {post.category.name}</span>}
        </p>
        <h2 className="font-heading text-xl text-(--foreground) group-hover:text-(--accent) transition-colors duration-200 line-clamp-2">
          {post.title}
        </h2>
        {post.summary && (
          <p className="text-sm text-(--secondary-text) line-clamp-2">{post.summary}</p>
        )}
      </div>
    </Link>
  )
}

export default BlogCard
