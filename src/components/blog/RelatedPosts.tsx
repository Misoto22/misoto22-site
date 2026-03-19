import React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { BlogPost } from '@/lib/data'
import { estimateReadingTime, formatDate } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface RelatedPostsProps {
  posts: BlogPost[]
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  const t = useTranslations('Blog')

  if (posts.length === 0) return null

  return (
    <div className="mt-16 pt-10 border-t border-(--border-color)">
      <h2 className="font-heading text-2xl text-(--foreground) mb-8">
        {t('relatedArticles')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            {post.coverImage && (
              <div className="aspect-video relative rounded-lg overflow-hidden mb-3">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            )}
            <p className="font-mono text-[11px] text-(--secondary-text) mb-1.5">
              {post.publishedAt && formatDate(post.publishedAt)}
              {' · '}
              {t('minRead', { time: estimateReadingTime(post.content) })}
            </p>
            <h3 className="font-heading text-lg text-(--foreground) group-hover:text-(--accent) transition-colors duration-200 leading-snug">
              {post.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RelatedPosts
