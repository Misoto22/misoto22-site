import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { BlogPost } from '@/lib/supabase'
import { Calendar, Clock, User } from 'lucide-react'
import { estimateReadingTime, formatDate } from '@/lib/utils'

interface BlogCardProps {
  post: BlogPost
  index: number
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  const readingTime = estimateReadingTime(post.content)

  return (
    <Card
      key={post.id}
      delay={index * 0.1}
      width="full"
      className="h-full flex flex-col"
    >
      <Link href={`/blog/${post.slug}`} className="block group h-full">
        <div className="space-y-4 h-full flex flex-col">
          {/* Cover Image - Optimized for 16:9 aspect ratio */}
          {post.coverImage && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shrink-0">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority={index < 3} // Prioritize first 3 images
              />
            </div>
          )}

          {/* Content */}
          <div className="space-y-4 flex-1 flex flex-col">
            {/* Category and Date */}
            <div className="flex items-center justify-between text-sm flex-wrap gap-2">
              <div className="flex items-center space-x-3">
                {post.category && (
                  <span className="px-2 py-1 text-xs font-bold rounded-sm bg-(--foreground) text-(--background) shadow-xs tracking-widest uppercase">
                    {post.category.name}
                  </span>
                )}
                {post.publishedAt && (
                  <div className="flex items-center text-(--secondary-text)">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span className="text-xs">{formatDate(post.publishedAt)}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center text-(--secondary-text)">
                <Clock className="w-3 h-3 mr-1" />
                <span className="text-xs">{readingTime} min read</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-heading text-(--foreground) group-hover:text-(--foreground) transition-colors duration-200 line-clamp-2">
              {post.title}
            </h2>

            {/* Summary */}
            {post.summary && (
              <p className="text-(--secondary-text) leading-relaxed line-clamp-3 text-sm flex-1">
                {post.summary}
              </p>
            )}

            {/* Footer with Author and Tags */}
            <div className="space-y-3 mt-auto">
              {/* Author */}
              {post.author && (
                <div className="flex items-center space-x-2">
                  {post.author.avatar && (
                    <div className="relative w-6 h-6 rounded-full overflow-hidden">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center text-(--secondary-text)">
                    <User className="w-3 h-3 mr-1" />
                    <span className="text-xs">{post.author.name}</span>
                  </div>
                </div>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag.id} className="text-xs">
                      #{tag.name}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge className="text-xs">
                      +{post.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  )
}

export default BlogCard
